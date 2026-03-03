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
import dnaHistoryData from './dna-history-backfill-v24.json';

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

    // Clear registry to prevented leaked labels/ghosts
    nodeSprites.length = 0;

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
            name: `Missing: ${id}`,
            group: 404
        });
        nodeIds.add(id);
    });

    Graph3D.graphData({ nodes: finalNodes, links: sanitizedLinks });
    // Re-center camera after force simulation re-initializes
    setTimeout(() => Graph3D.zoomToFit(600, 60), 800);

    if (visNodes && visEdges) {
        visNodes.clear();
        visNodes.add(finalNodes.map(n => {
            const label = n.id.replace(/_/g, ' ');
            let bgColor: string, textColor: string;
            // Genesis/GEMINI styling
            if (n.id === 'GEMINI.md') { bgColor = '#00008b'; textColor = '#ffffff'; }
            else if (n.group === 1) { bgColor = '#fbbf24'; textColor = '#0f172a'; } // Core = Gold
            else if (n.group === 404) { bgColor = '#ef4444'; textColor = '#ffffff'; } // Red for 404
            else if (n.group === 0) { bgColor = '#94a3b8'; textColor = '#0f172a'; } // Secondary = Grey
            else { bgColor = '#22d3ee'; textColor = '#0f172a'; } // Other = Cyan

            return {
                id: n.id,
                label: label.split(' ').join('\n'),
                shape: 'circle' as const,
                margin: 10,
                color: { background: bgColor, border: n.group === 404 ? '#7f1d1d' : '#1e293b' },
                font: { color: textColor, size: 11, face: 'Inter' },
            };
        }));

        visEdges.clear();
        visEdges.add(sanitizedLinks.map(l => {
            const width = l.ref_type === 'formal' ? 3 : (l.ref_type === 'bold' ? 1.5 : 0.6);

            const targetNode = finalNodes.find(n => n.id === l.target);
            const isGroup1 = targetNode?.group === 1;

            let color = 'rgba(239, 68, 68, 0.8)'; // FALLBACK (Red)
            if (l.target_location === 'SRL') {
                color = 'rgba(168, 85, 247, 0.6)'; // Purple SRL
            } else if (l.target_location === 'DNA') {
                if (isGroup1) color = 'rgba(251, 191, 36, 0.8)'; // Core Links = Gold
                else if (targetNode?.group === 0) color = 'rgba(148, 163, 184, 0.6)'; // Group 0 = Grey
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
});

// Broadcast history on init
setTimeout(() => {
    if (window.parent !== window) {
        window.parent.postMessage(JSON.parse(JSON.stringify({ type: 'HISTORY_DATA', history: kiHistory })), '*');
    }
}, 500);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const outDeg: Record<string, number> = {};
kiData.links.forEach(l => {
    const sid = typeof l.source === 'object' ? (l.source as KiNode).id : l.source;
    outDeg[sid] = (outDeg[sid] || 0) + 1;
});
const isTerminal = (id: string) => !outDeg[id];

// ─── 3D Graph ─────────────────────────────────────────────────────────────────

// Registry for per-frame sprite projection
const nodeSprites: Array<{ sprite: InstanceType<typeof SpriteText>, node: KiNode, size: number }> = [];



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Graph3D = (ForceGraph3D as any)()(document.getElementById('view-3d') as HTMLElement)
    .backgroundColor('#050510')
    .nodeId('id')
    .nodeRelSize(1)
    .nodeThreeObject((node: object) => {
        const n = node as KiNode;
        const group = new THREE.Group();

        const color = n.group === 999 ? '#00008b'
            : (n.group === 404 ? '#ef4444' // Red for 404
                : (n.group === 0 ? '#94a3b8' // Grey for 0
                    : (isTerminal(n.id) ? '#fbbf24'
                        : (n.group === 1 ? '#fbbf24' : '#22d3ee')))); // Gold for 1, Cyan for 2

        const size = n.group === 999 ? 18
            : (n.group === 404 ? 6 // Smaller for 404
                : (n.group === 0 ? 8
                    : (isTerminal(n.id) ? 4
                        : (n.group === 1 ? 10 : 8))));

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(size, 24, 24),
            new THREE.MeshLambertMaterial({
                color,
                transparent: true,
                opacity: n.group === 404 ? 0.6 : (n.group === 0 ? 0.3 : (n.group === 999 ? 1.0 : 0.9))
            })
        );
        group.add(sphere);

        const sprite = new SpriteText(n.id.replace(/_/g, '\n'));
        sprite.color = '#ffffff';
        sprite.textHeight = Math.max(3, size * 0.5);
        sprite.padding = 1;
        sprite.backgroundColor = false as unknown as string;
        sprite.material.depthWrite = false;
        sprite.position.y = 0;
        group.add(sprite);

        // Register for per-frame camera-facing projection
        nodeSprites.push({ sprite, node: n, size });

        return group;
    })
    .linkWidth((link: object) => {
        const l = link as KiLink;
        return l.ref_type === 'formal' ? 2.5 : (l.ref_type === 'bold' ? 1.2 : 0.4);
    })
    .linkOpacity(0.5)
    .linkColor((link: object) => {
        const l = link as KiLink;
        const tid = typeof l.target === 'object' ? (l.target as KiNode).id : l.target as string;

        const srlNodes = [
            'operation_commander', 'git_strategy', 'session_lifecycle', 'dna_philosophy',
            'quality_gates', 'context_planning', 'guided_audit_protocol', 'emergency_divergence',
            'privacy_shield', 'rtl_guardian', 'premium_ui_dna', 'resilient_fetching',
            'supabase_governance', 'linguistic_curator', 'graceful_error_ui'
        ];
        const isGroup1 = srlNodes.includes(tid);
        const targetNode = kiHistory[kiHistory.length - 1].delta.nodes.added.find(n => n.id === tid);

        if (l.target_location === 'SRL') {
            return '#a855f7'; // Purple SRL External
        }
        if (l.target_location === 'DNA') {
            if (targetNode?.group === 1 || isGroup1) return '#fbbf24'; // Core KIs = Gold
            if (targetNode?.group === 0) return '#94a3b8'; // Meta/Secondary = Grey
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
        const distance = 60;
        const distRatio = 1 + distance / Math.hypot(n.x ?? 0, n.y ?? 0, n.z ?? 0);
        Graph3D.cameraPosition(
            { x: (n.x ?? 0) * distRatio, y: (n.y ?? 0) * distRatio, z: (n.z ?? 0) * distRatio },
            { x: n.x ?? 0, y: n.y ?? 0, z: n.z ?? 0 },
            2000
        );
    });

// Force Layout Tuning
Graph3D.d3Force('link').distance(80);
Graph3D.d3Force('charge').strength(-150);

// ─── Per-frame: keep sprite on node→camera vector ────────────────────────────

const _dir = new THREE.Vector3();

(function updateSpritePositions() {
    const camera = Graph3D.camera();
    nodeSprites.forEach(({ sprite, node, size }) => {
        if (node.x == null) return;
        _dir
            .set(camera.position.x - node.x, camera.position.y - (node.y ?? 0), camera.position.z - (node.z ?? 0))
            .normalize()
            .multiplyScalar(size * 1.5);
        sprite.position.set(_dir.x, _dir.y, _dir.z);
    });
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

const visNodes = new DataSet(kiData.nodes.map(n => {
    const isTerm = isTerminal(n.id);
    const label = n.id.replace(/_/g, ' ');
    let bgColor: string, textColor: string;

    if (n.id === 'GEMINI.md') {
        bgColor = '#00008b'; textColor = '#ffffff';
    } else if (isTerm) {
        bgColor = '#fbbf24'; textColor = '#0f172a';
    } else if (n.group === 1) {
        bgColor = '#a855f7'; textColor = '#ffffff';
    } else {
        bgColor = '#22d3ee'; textColor = '#0f172a';
    }

    return {
        id: n.id,
        label: label.split(' ').join('\n'),
        shape: 'circle' as const,
        margin: 10,
        widthConstraint: { minimum: 50, maximum: 100 },
        color: { background: bgColor, border: '#1e293b', highlight: { background: bgColor, border: '#ffffff' } },
        font: { color: textColor, size: 11, face: 'Inter', multi: false },
    };
}));

const visEdges = new DataSet(kiData.links.map(l => {
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
    { nodes: visNodes, edges: visEdges },
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
