/**
 * Ki-Network: Neural Explorer initialization module
 * ESM entry – bundled by Vite, single shared THREE instance.
 */
import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';
import SpriteText from 'three-spritetext';
import { Network, DataSet } from 'vis-network/standalone';

// ─── Data ────────────────────────────────────────────────────────────────────

import {
    getHistoryState,
    KiDiff,
    KiNode,
    KiLink,
    getTimelineBatches,
    TimelineBatch
} from './dna-history-engine';
// Auto-resolve Latest JSON via import.meta.glob
const ledgerModules = import.meta.glob('./dna-history-backfill-*.json', { eager: true });

interface LedgerMetadata {
    version: number;
    sync: number;
    last_hash: string;
    is_partial: boolean;
    scope: string[];
}

interface LedgerData {
    metadata: LedgerMetadata;
    epochs: KiDiff[];
}

function parseVersion(filename: string): { v: number; s: number } {
    // Only match clean versioned or synced files. Ignore _p (partial).
    const m = filename.match(/dna-history-backfill-v(\d+)(?:_s(\d+))?\.json$/);
    return m ? { v: parseInt(m[1]), s: parseInt(m[2] ?? '0') } : { v: 0, s: 0 };
}

const latestKey = Object.keys(ledgerModules)
    .sort((a, b) => {
        const av = parseVersion(a), bv = parseVersion(b);
        return av.v !== bv.v ? bv.v - av.v : bv.s - av.s;
    })[0];

if (!latestKey) {
    throw new Error('No DNA history ledger found in src/visualizations/');
}

const ledger = (ledgerModules[latestKey] as { default: LedgerData }).default;
const dnaHistoryData = ledger.epochs;
import kiGroupsRegistry from './ki-groups.json';
import externalNodeRegistry from './external-node-refs.json';

// Combine registries for lookup
const groupLookup: Record<string, number> = {
    ...kiGroupsRegistry,
    ...externalNodeRegistry
};

function getNodeGroup(id: string): number {
    if (id === 'GEMINI.md') return 999;
    return groupLookup[id] !== undefined ? groupLookup[id] : 0;
}

// Cast the imported JSON to KiDiff[]
const kiHistory: KiDiff[] = dnaHistoryData as KiDiff[];


// Pre-calculate timeline batches for the UI
const timelineBatches: TimelineBatch[] = getTimelineBatches(kiHistory);

// Initial State (Latest)
let currentTimestamp: string | null = kiHistory[kiHistory.length - 1].timestamp;
const initialGraph = getHistoryState(kiHistory, currentTimestamp);

const kiData: { nodes: KiNode[]; links: KiLink[] } = {
    nodes: initialGraph.nodes,
    links: initialGraph.links
};

// --- Temporal Engine: Delta View ---

function updateGraph(data: { nodes: KiNode[]; links: KiLink[] }) {
    const nodeIds = new Set(data.nodes.map(n => n.id));
    const finalNodes = [...data.nodes];
    const missingNodeIds = new Set<string>();

    // Registry tracking is now handled automatically via WeakMap in Graph3D engine

    // Sanitize links and find missing nodes
    const sanitizedLinks = data.links.map(l => {
        const s = typeof l.source === 'object' ? (l.source as KiNode).id : l.source;
        const t = typeof l.target === 'object' ? (l.target as KiNode).id : l.target;

        if (!nodeIds.has(s)) missingNodeIds.add(s);
        if (!nodeIds.has(t)) missingNodeIds.add(t);

        return { ...l, source: s, target: t };
    });

    if (missingNodeIds.size > 0) {
        // console.warn(`[ki-network] Found ${missingNodeIds.size} missing nodes. Creating placeholders:`, Array.from(missingNodeIds));
    }

    // Create placeholders
    missingNodeIds.forEach(id => {
        finalNodes.push({
            id,
            name: `Missing: ${id}`
        });
        nodeIds.add(id);
    });

    Graph3D.graphData({ nodes: finalNodes, links: sanitizedLinks });

    if (visNodes && visEdges) {
        visNodes.clear();
        visNodes.add(finalNodes.map(n => {
            const label = n.id.replace(/_/g, ' ');
            const group = getNodeGroup(n.id);
            const isMissing = !groupLookup[n.id] && n.id !== 'GEMINI.md' && !n.id.includes('.md'); // Basic heuristic

            let bgColor: string, textColor: string;
            // Genesis/GEMINI styling
            if (group === 999) { bgColor = '#00008b'; textColor = '#ffffff'; } // Genesis = Blue
            else if (group === 1) { bgColor = '#fbbf24'; textColor = '#0f172a'; } // Core = Gold
            else if (group === 3) { bgColor = '#a855f7'; textColor = '#ffffff'; } // SRL = Purple
            else if (isMissing) { bgColor = '#ef4444'; textColor = '#ffffff'; } // Red for 404
            else if (group === 0) { bgColor = '#94a3b8'; textColor = '#0f172a'; } // Secondary = Grey
            else { bgColor = '#22d3ee'; textColor = '#0f172a'; } // Other/Group 2 = Cyan

            return {
                id: n.id,
                label: label.split(' ').join('\n'),
                shape: 'circle' as const,
                margin: { top: 10, bottom: 10, left: 10, right: 10 },
                widthConstraint: { minimum: 50, maximum: 100 },
                color: { background: bgColor, border: isMissing ? '#7f1d1d' : '#1e293b', highlight: { background: bgColor, border: '#ffffff' } },
                font: { color: textColor, size: 11, face: 'Inter', multi: false },
            };
        }));

        visEdges.clear();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        visEdges.add(sanitizedLinks.map((l: any) => {
            const width = l.ref_type === 'formal' ? 3 : (l.ref_type === 'bold' ? 1.5 : 0.6);

            const targetGroup = getNodeGroup(l.target);
            const isGroup1 = targetGroup === 1;

            let color = 'rgba(239, 68, 68, 0.8)'; // FALLBACK (Red)
            if (l.target_location === 'SRL' || targetGroup === 3) {
                color = 'rgba(168, 85, 247, 0.6)'; // Purple SRL
            } else if (l.target_location === 'DNA') {
                if (isGroup1) color = 'rgba(251, 191, 36, 0.8)'; // Core Links = Gold
                else if (targetGroup === 0) color = 'rgba(148, 163, 184, 0.6)'; // Group 0 = Grey
                else color = 'rgba(34, 211, 238, 0.6)'; // DNA / Group 2 = Cyan
            } else if (l.target_location === 'OTHER') {
                color = 'rgba(148, 163, 184, 0.6)'; // OTHER/Fallback (Slate)
            }

            return {
                from: l.source,
                to: l.target,
                width: width,
                color: color
            };
        }));
    }
}

// --- Temporal Engine: Message Handling ---

window.addEventListener('message', (event) => {
    if (!event.data) return;
    const { type, payload } = event.data;

    if (type === 'GET_TIMELINE') {
        window.parent.postMessage(JSON.parse(JSON.stringify({
            type: 'TIMELINE_DATA',
            timeline: timelineBatches,
            currentEpoch: currentTimestamp
        })), '*');
    }

    if (type === 'SET_EPOCH') {
        const targetTimestamp = (payload && payload.timestamp) !== undefined ? payload.timestamp : event.data.timestamp;

        if (targetTimestamp === null) {
            currentTimestamp = kiHistory[kiHistory.length - 1].timestamp;
        } else {
            currentTimestamp = targetTimestamp === 'baseline' ? kiHistory[0].timestamp : targetTimestamp;
        }

        const state = getHistoryState(kiHistory, currentTimestamp);
        updateGraph(state);

        // Notify parent of update completion
        window.parent.postMessage(JSON.parse(JSON.stringify({
            type: 'EPOCH_UPDATED',
            timestamp: currentTimestamp,
            nodes: state.nodes.length,
            links: state.links.length
        })), '*');
    }

    if (type === 'SET_VIEW') {
        if (payload?.view) {
            switchView(null, payload.view);
        }
    }

    if (type === 'toggle-fullscreen') {
        const targetState = payload?.isFullscreen ?? event.data.isFullscreen;
        if (targetState !== isFullscreen) {
            toggleFullscreen();
        }
    }

    if (type === 'RESYNC_SIZE') {
        const container = document.getElementById('container') as HTMLElement;
        const width = isFullscreen ? window.innerWidth : container.clientWidth;
        const height = isFullscreen ? window.innerHeight : container.clientHeight;

        Graph3D.width(width).height(height);
        network.setSize(width + 'px', height + 'px');
        network.redraw();

        if (isFullscreen) {
            Graph3D.zoomToFit(400);
            network.fit({ nodes: [], animation: true });
        }
    }
});

// Broadcast history on init
setTimeout(() => {
    if (window.parent !== window) {
        window.parent.postMessage(JSON.parse(JSON.stringify({ type: 'HISTORY_DATA', history: kiHistory })), '*');
    }
}, 500);

// ─── 3D Graph ─────────────────────────────────────────────────────────────────

// Registry for per-frame sprite projection - using WeakMap to survive history transitions
const nodeSprites = new WeakMap<object, { sprite: THREE.Object3D, size: number }>();



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Graph3D = (ForceGraph3D as any)()(document.getElementById('view-3d') as HTMLElement)
    .backgroundColor('#050510')
    .nodeId('id')
    .nodeRelSize(1)
    .nodeThreeObject((node: object) => {
        const n = node as KiNode;
        const group = new THREE.Group();

        const groupNum = getNodeGroup(n.id);
        const color = groupNum === 999 ? '#00008b'
            : (groupNum === 3 ? '#a855f7' // Purple for SRL
                : (groupNum === 0 ? '#94a3b8' // Grey for 0
                    : (groupNum === 1 ? '#fbbf24' : '#22d3ee'))); // Gold for 1, Cyan for 2

        const textColor = groupNum === 999 ? '#a4d5f8ff' // Crisp sky blue for deep blue
            : (groupNum === 3 ? '#f3e8ff' // Very light purple for Purple
                : (groupNum === 0 ? '#f8fafc' // Bright off-white for Grey
                    : (groupNum === 1 ? '#78350f' : '#083344'))); // Deep amber for Gold, Deep cyan for Cyan

        const size = groupNum === 999 ? 18
            : (groupNum === 3 ? 10 // SRL size
                : (groupNum === 0 ? 8
                    : (groupNum === 1 ? 10 : 8)));

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(size, 24, 24),
            new THREE.MeshLambertMaterial({
                color,
                transparent: true,
                opacity: groupNum === 3 ? 0.7 : (groupNum === 0 ? 0.3 : (groupNum === 999 ? 1.0 : 0.9))
            })
        );
        group.add(sphere);

        const sprite = new SpriteText(n.id.replace(/_/g, '\n'));
        sprite.color = textColor;
        sprite.textHeight = Math.max(3, size * 0.5);
        sprite.padding = 1;
        sprite.backgroundColor = false as unknown as string;
        sprite.material.depthWrite = false;
        sprite.position.y = 0;
        group.add(sprite);

        // Register for per-frame camera-facing projection
        nodeSprites.set(node, { sprite, size });

        return group;
    })
    .linkLabel((link: object) => {
        const l = link as KiLink;
        const type = l.ref_type || 'mention';
        const typeLabel = type === 'formal' ? 'Explicit file path' : type === 'bold' ? '<strong>Bold</strong> mention' : 'Simple mention';
        return `<div class="link-label"><strong>${typeLabel}</strong></div>`;
    })
    .linkWidth((link: object) => {
        const l = link as KiLink;
        return l.ref_type === 'formal' ? 2.5 : (l.ref_type === 'bold' ? 1.2 : 0.4);
    })
    .linkOpacity(0.5)
    .linkColor((link: object) => {
        const l = link as KiLink;
        const sid = typeof l.source === 'object' ? (l.source as KiNode).id : l.source as string;
        const tid = typeof l.target === 'object' ? (l.target as KiNode).id : l.target as string;

        const targetGroup = getNodeGroup(tid);
        const sourceGroup = getNodeGroup(sid);

        // Root Links (from or to GEMINI.md)
        if (sourceGroup === 999 || targetGroup === 999) return '#2563eb';

        if (l.target_location === 'SRL' || targetGroup === 3) {
            return '#a855f7'; // Purple SRL External
        }
        if (l.target_location === 'DNA') {
            if (targetGroup === 1) return '#fbbf24'; // Core KIs = Gold
            if (targetGroup === 0) return '#94a3b8'; // Meta/Secondary = Grey
            return '#22d3ee'; // Group 2 / Standard = Cyan
        }
        if (l.target_location === 'OTHER') {
            return '#94a3b8'; // OTHER/Fallback is Slate
        }

        return '#ef4444'; // Final Fallback Red (Catch-all for missing/wrong tags/404)
    })
    .linkDirectionalArrowLength(4)
    .linkDirectionalArrowRelPos(1)
    .linkCurvature(0.25)
    .linkDirectionalParticles((link: object) => {
        const l = link as KiLink;
        return l.ref_type === 'formal' ? 3 : (l.ref_type === 'bold' ? 2 : 1);
    })
    .linkDirectionalParticleSpeed(0.005)
    .graphData(kiData)
    .onNodeClick((node: object) => {
        const n = node as KiNode;

        // 1. Calculate the Center of Gravity (COG) of all nodes
        const { nodes } = Graph3D.graphData();
        let cogX = 0, cogY = 0, cogZ = 0;
        let count = 0;

        if (nodes && nodes.length > 0) {
            nodes.forEach((n: KiNode) => {
                if (n.x !== undefined && n.y !== undefined && n.z !== undefined) {
                    cogX += n.x;
                    cogY += n.y;
                    cogZ += n.z;
                    count++;
                }
            });
            cogX /= count;
            cogY /= count;
            cogZ /= count;
        }

        // 2. Create a vector from COG to the target node
        const cog = new THREE.Vector3(cogX, cogY, cogZ);
        const targetPos = new THREE.Vector3(n.x ?? 0, n.y ?? 0, n.z ?? 0);

        // Direction from COG outwards through the node
        const dir = new THREE.Vector3().subVectors(targetPos, cog).normalize();

        // If the node is exactly at COG (rare), fallback to a default direction
        if (dir.lengthSq() === 0) {
            dir.set(0, 0, 1);
        }

        // 3. Set the desired zoom distance (how far from the node the camera sits)
        const zoomDistance = 150;

        // 4. Move camera to the new position (Node + (Direction * Distance))
        Graph3D.cameraPosition(
            {
                x: targetPos.x + (dir.x * zoomDistance),
                y: targetPos.y + (dir.y * zoomDistance),
                z: targetPos.z + (dir.z * zoomDistance)
            },
            targetPos, // Look exactly at the node
            2000 // 2 seconds transition
        );
    });

// Force Layout Tuning
Graph3D.d3Force('link').distance(80);
Graph3D.d3Force('charge').strength(-150).distanceMax(200);

// ─── Per-frame: keep sprite on node→camera vector ────────────────────────────

const _dir = new THREE.Vector3();

(function updateSpritePositions() {
    const camera = Graph3D.camera();
    const { nodes } = Graph3D.graphData();

    if (nodes) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nodes.forEach((node: any) => {
            if (node.x == null) return;
            const entry = nodeSprites.get(node);
            if (!entry) return;

            const { sprite, size } = entry;

            // Calculate vector from node to observer (camera)
            _dir
                .set(camera.position.x - node.x, camera.position.y - (node.y ?? 0), camera.position.z - (node.z ?? 0))
                .normalize();

            // Scale vector to exactly 1.5 * node_radius (size)
            const targetPos = _dir.clone().multiplyScalar(size * 1.5);

            // Position sprite on that vector relative to node center
            sprite.position.set(targetPos.x, targetPos.y, targetPos.z);
        });
    }
    requestAnimationFrame(updateSpritePositions);
}());

// Startup: zoom to fit + center on GEMINI.md
setTimeout(() => {
    Graph3D.zoomToFit(1000, 50);
    const rootNode = kiData.nodes.find(n => n.id === 'GEMINI.md');
    if (rootNode) {
        setTimeout(() => {
            const { x = 0, y = 0, z = 0 } = rootNode;
            const dist = 200;
            Graph3D.cameraPosition({ x: x + dist, y: y + dist, z: z + dist }, { x, y, z }, 1000);
        }, 1100);
    }
}, 1200);

// ─── 2D Graph (vis-network) ──────────────────────────────────────────────────

const processedVisNodes = kiData.nodes.map(n => {
    const label = n.id.replace(/_/g, ' ');
    const group = getNodeGroup(n.id);
    const isMissing = !groupLookup[n.id] && n.id !== 'GEMINI.md' && !n.id.includes('.md');

    let bgColor: string, textColor: string;

    if (group === 999) {
        bgColor = '#00008b'; textColor = '#ffffff';
    } else if (group === 1) {
        bgColor = '#fbbf24'; textColor = '#0f172a'; // Gold
    } else if (group === 3) {
        bgColor = '#a855f7'; textColor = '#ffffff'; // Purple
    } else if (isMissing) {
        bgColor = '#ef4444'; textColor = '#ffffff'; // Red
    } else if (group === 0) {
        bgColor = '#94a3b8'; textColor = '#0f172a'; // Grey
    } else {
        bgColor = '#22d3ee'; textColor = '#0f172a'; // Cyan
    }

    return {
        id: n.id,
        label: label.split(' ').join('\n'),
        shape: 'circle' as const,
        margin: { top: 10, bottom: 10, left: 10, right: 10 },
        widthConstraint: { minimum: 50, maximum: 100 },
        color: { background: bgColor, border: '#1e293b', highlight: { background: bgColor, border: '#ffffff' } },
        font: { color: textColor, size: 11, face: 'Inter', multi: false },
    };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const visNodes = new DataSet<any>(processedVisNodes);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const visEdges = new DataSet<any>(kiData.links.map(l => {
    const width = l.ref_type === 'formal' ? 3 : (l.ref_type === 'bold' ? 1.5 : 0.6);
    return {
        from: typeof l.source === 'object' ? (l.source as KiNode).id : l.source,
        to: typeof l.target === 'object' ? (l.target as KiNode).id : l.target,
        width: width,
        color: l.ref_type === 'formal' ? 'rgba(168, 85, 247, 0.8)' : 'rgba(168, 85, 247, 0.3)'
    };
}));

const network = new Network(
    document.getElementById('view-2d') as HTMLElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { nodes: visNodes as any, edges: visEdges as any },
    {
        physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            forceAtlas2Based: { gravitationalConstant: -100, centralGravity: 0.015, springConstant: 0.1, springLength: 120 },
        },
        interaction: { hover: true, dragNodes: true, tooltipDelay: 200 },
        edges: { color: 'rgba(168, 85, 247, 0.4)', arrows: { to: { enabled: true, scaleFactor: 0.5 } }, width: 1 },
    }
);

setTimeout(() => {
    network.fit({ nodes: [], animation: false });
    network.focus('GEMINI.md', { scale: 1.2, offset: { x: 0, y: 0 }, animation: { duration: 1000, easingFunction: 'easeInOutQuad' } });
}, 1000);

// ─── View Switching ───────────────────────────────────────────────────────────

let isFullscreen = false;
let currentView = '3d';

function switchView(btn: HTMLElement | null, view: string) {
    currentView = view;
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
    document.getElementById('view-' + view)?.classList.add('active');
    if (btn) btn.classList.add('active');

    const title = document.getElementById('overlay-title') as HTMLElement;
    const desc = document.getElementById('overlay-desc') as HTMLElement;

    if (view === '3d') {
        title.innerText = 'Immersive Neural Graph';
        desc.innerText = "Explore the high-dimensional dependency mapping of the agent's memory. Drag to rotate, Scroll to zoom.";
        setTimeout(() => {
            Graph3D.zoomToFit(800, 50);
            const gData = Graph3D.graphData();
            const targetNode = (gData.nodes as KiNode[]).find(n => n.id === 'GEMINI.md');
            if (targetNode) {
                setTimeout(() => {
                    const { x = 0, y = 0, z = 0 } = targetNode;
                    Graph3D.cameraPosition({ x: x + 200, y: y + 200, z: z + 200 }, { x, y, z }, 800);
                }, 850);
            }
        }, 50);
    } else if (view === '2d') {
        title.innerText = 'Kinetic Physics Map';
        desc.innerText = 'Flat relational mapping with force-directed stabilization. Direct SSOT verification.';
        network.fit({ nodes: [], animation: false });
        network.focus('GEMINI.md', { scale: 1.2, animation: { duration: 1000, easingFunction: 'easeInOutQuad' } });
    }
}

function toggleFullscreen() {
    isFullscreen = !isFullscreen;
    document.body.classList.toggle('is-fullscreen', isFullscreen);
    if (window.parent !== window) {
        window.parent.postMessage(JSON.parse(JSON.stringify({ type: 'toggle-fullscreen', isFullscreen })), '*');
    }
    setTimeout(() => {
        const container = document.getElementById('container') as HTMLElement;
        const width = isFullscreen ? window.innerWidth : container.clientWidth;
        const height = isFullscreen ? window.innerHeight : container.clientHeight;
        Graph3D.width(width).height(height);
        if (isFullscreen) Graph3D.zoomToFit(400);
        network.setSize(width + 'px', height + 'px');
        network.redraw();
        if (isFullscreen) network.fit({ nodes: [], animation: false });
    }, 50);
}

window.addEventListener('resize', () => {
    if (isFullscreen) {
        const { innerWidth: w, innerHeight: h } = window;
        Graph3D.width(w).height(h);
        network.setSize(w + 'px', h + 'px');
    }
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isFullscreen) toggleFullscreen();
});

// Expose to HTML onclick handlers
declare global {
    interface Window {
        switchView: typeof switchView;
        toggleFullscreen: typeof toggleFullscreen;
        currentView: string;
    }
}
window.switchView = switchView;
window.toggleFullscreen = toggleFullscreen;
Object.defineProperty(window, 'currentView', {
    get: () => currentView,
    set: (v: string) => { currentView = v; },
});

// Final Startup Sweep
setTimeout(() => {
    if (window.parent !== window) {
        window.parent.postMessage(JSON.parse(JSON.stringify({
            type: 'TIMELINE_DATA',
            timeline: timelineBatches,
            currentEpoch: currentTimestamp
        })), '*');
    }
}, 500);

updateGraph(initialGraph);
