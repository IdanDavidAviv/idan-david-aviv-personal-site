/**
 * Ki-Network: Neural Explorer initialization module
 * ESM entry – bundled by Vite, single shared THREE instance.
 */
import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';
import SpriteText from 'three-spritetext';
import { Network, DataSet } from 'vis-network/standalone';

// ─── Data ────────────────────────────────────────────────────────────────────

interface KiNode {
    id: string;
    name: string;
    group: number;
    x?: number;
    y?: number;
    z?: number;
}

interface KiLink {
    source: string | KiNode;
    target: string | KiNode;
}

export interface KiDelta {
    nodes: { added: KiNode[]; removed: string[] };
    links: { added: KiLink[]; removed: KiLink[] };
}

export interface KiDiff {
    timestamp: string;
    label: string;
    delta: KiDelta;
}

const kiData: { nodes: KiNode[]; links: KiLink[] } = {
    nodes: [
        // Root & Synchronized DNA Nodes
        { id: 'asset_governance', name: 'asset_governance', group: 2 },
        { id: 'context_planning', name: 'context_planning', group: 2 },
        { id: 'dna_philosophy', name: 'dna_philosophy', group: 1 },
        { id: 'emergency_divergence', name: 'emergency_divergence', group: 2 },
        { id: 'GEMINI.md', name: 'GEMINI.md', group: 999 },
        { id: 'git_strategy', name: 'git_strategy', group: 1 },
        { id: 'github_project_manager', name: 'github_project_manager', group: 2 },
        { id: 'guided_audit_protocol', name: 'guided_audit_protocol', group: 2 },
        { id: 'ki_integrity_governor', name: 'ki_integrity_governor', group: 0 },
        { id: 'knowledge_center_hierarchy', name: 'knowledge_center_hierarchy', group: 0 },
        { id: 'linguistic_curator', name: 'linguistic_curator', group: 2 },
        { id: 'observability_telemetry', name: 'observability_telemetry', group: 1 },
        { id: 'operation_commander', name: 'operation_commander', group: 1 },
        { id: 'premium_ui_dna', name: 'premium_ui_dna', group: 2 },
        { id: 'privacy_shield', name: 'privacy_shield', group: 2 },
        { id: 'quality_gates', name: 'quality_gates', group: 2 },
        { id: 'resilient_fetching', name: 'resilient_fetching', group: 2 },
        { id: 'rtl_guardian', name: 'rtl_guardian', group: 2 },
        { id: 'seo_governance', name: 'seo_governance', group: 1 },
        { id: 'session_lifecycle', name: 'session_lifecycle', group: 1 },
        { id: 'state_management_governance', name: 'state_management_governance', group: 2 },
        { id: 'supabase_governance', name: 'supabase_governance', group: 2 },
        { id: 'testing_governance', name: 'testing_governance', group: 2 },
        { id: 'windows_protocol', name: 'windows_protocol', group: 2 },
    ],
    links: [
        // Automated Bridges
        { source: 'GEMINI.md', target: 'asset_governance' },
        { source: 'GEMINI.md', target: 'context_planning' },
        { source: 'GEMINI.md', target: 'git_strategy' },
        { source: 'GEMINI.md', target: 'operation_commander' },
        { source: 'GEMINI.md', target: 'premium_ui_dna' },
        { source: 'GEMINI.md', target: 'privacy_shield' },
        { source: 'GEMINI.md', target: 'quality_gates' },
        { source: 'GEMINI.md', target: 'rtl_guardian' },
        { source: 'GEMINI.md', target: 'windows_protocol' },
        { source: 'asset_governance', target: 'ki_integrity_governor' },
        { source: 'context_planning', target: 'asset_governance' },
        { source: 'context_planning', target: 'ki_integrity_governor' },
        { source: 'dna_philosophy', target: 'asset_governance' },
        { source: 'dna_philosophy', target: 'operation_commander' },
        { source: 'dna_philosophy', target: 'quality_gates' },
        { source: 'dna_philosophy', target: 'session_lifecycle' },
        { source: 'dna_philosophy', target: 'windows_protocol' },
        { source: 'emergency_divergence', target: 'guided_audit_protocol' },
        { source: 'emergency_divergence', target: 'quality_gates' },
        { source: 'emergency_divergence', target: 'testing_governance' },
        { source: 'git_strategy', target: 'github_project_manager' },
        { source: 'git_strategy', target: 'quality_gates' },
        { source: 'git_strategy', target: 'windows_protocol' },
        { source: 'github_project_manager', target: 'quality_gates' },
        { source: 'guided_audit_protocol', target: 'emergency_divergence' },
        { source: 'knowledge_center_hierarchy', target: 'premium_ui_dna' },
        { source: 'linguistic_curator', target: 'rtl_guardian' },
        { source: 'observability_telemetry', target: 'premium_ui_dna' },
        { source: 'observability_telemetry', target: 'privacy_shield' },
        { source: 'operation_commander', target: 'dna_philosophy' },
        { source: 'operation_commander', target: 'emergency_divergence' },
        { source: 'operation_commander', target: 'git_strategy' },
        { source: 'operation_commander', target: 'github_project_manager' },
        { source: 'operation_commander', target: 'guided_audit_protocol' },
        { source: 'operation_commander', target: 'ki_integrity_governor' },
        { source: 'operation_commander', target: 'quality_gates' },
        { source: 'operation_commander', target: 'session_lifecycle' },
        { source: 'operation_commander', target: 'state_management_governance' },
        { source: 'operation_commander', target: 'supabase_governance' },
        { source: 'operation_commander', target: 'testing_governance' },
        { source: 'operation_commander', target: 'windows_protocol' },
        { source: 'premium_ui_dna', target: 'asset_governance' },
        { source: 'premium_ui_dna', target: 'rtl_guardian' },
        { source: 'premium_ui_dna', target: 'seo_governance' },
        { source: 'privacy_shield', target: 'observability_telemetry' },
        { source: 'privacy_shield', target: 'supabase_governance' },
        { source: 'quality_gates', target: 'git_strategy' },
        { source: 'quality_gates', target: 'github_project_manager' },
        { source: 'quality_gates', target: 'windows_protocol' },
        { source: 'resilient_fetching', target: 'premium_ui_dna' },
        { source: 'rtl_guardian', target: 'linguistic_curator' },
        { source: 'seo_governance', target: 'premium_ui_dna' },
        { source: 'session_lifecycle', target: 'asset_governance' },
        { source: 'session_lifecycle', target: 'git_strategy' },
        { source: 'session_lifecycle', target: 'operation_commander' },
        { source: 'session_lifecycle', target: 'quality_gates' },
        { source: 'session_lifecycle', target: 'windows_protocol' },
        { source: 'state_management_governance', target: 'resilient_fetching' },
        { source: 'supabase_governance', target: 'privacy_shield' },
        { source: 'testing_governance', target: 'emergency_divergence' },
        { source: 'testing_governance', target: 'quality_gates' },
    ],
};

// --- Temporal Engine: Delta View ---

// Always extract only primitive properties from kiData to avoid
// mutation pollution from 3d-force-graph (which adds x, y, z, vx, vy to nodes/links)
function getCleanBase(): { nodes: KiNode[]; links: KiLink[] } {
    return {
        nodes: kiData.nodes.map(n => ({ id: n.id, name: n.name, group: n.group })),
        links: kiData.links.map(l => ({
            source: typeof l.source === 'object' ? (l.source as KiNode).id : l.source as string,
            target: typeof l.target === 'object' ? (l.target as KiNode).id : l.target as string,
        })),
    };
}

function reconstructState(targetTimestamp: string | null) {
    const base = getCleanBase(); // Full latest state

    // Live State: No undos needed, just return the full aggregated data
    if (targetTimestamp === null) return base;

    let targetIdx: number;
    if (targetTimestamp === 'baseline') {
        // Baseline: Undo EVERYTHING in history to see the original ground truth
        targetIdx = -1;
    } else {
        // Epoch: Undo everything AFTER this entry to show cumulative state AT this entry
        targetIdx = kiHistory.findIndex(h => h.timestamp === targetTimestamp);
        if (targetIdx === -1) return base;
    }

    // Walk BACKWARD from latest to reconstruct historical state
    for (let i = kiHistory.length - 1; i > targetIdx; i--) {
        const { delta } = kiHistory[i];

        // Undo node additions (remove them)
        delta.nodes.added.forEach(node => {
            base.nodes = base.nodes.filter(n => n.id !== node.id);
        });
        // Undo node removals (re-add them)
        delta.nodes.removed.forEach(nodeId => {
            base.nodes.push({ id: nodeId, name: nodeId, group: 0 });
        });

        // Undo link additions (remove them)
        delta.links.added.forEach(link => {
            const ts = typeof link.source === 'object' ? (link.source as KiNode).id : link.source as string;
            const tt = typeof link.target === 'object' ? (link.target as KiNode).id : link.target as string;
            base.links = base.links.filter(l => {
                const s = typeof l.source === 'object' ? (l.source as KiNode).id : l.source as string;
                const t = typeof l.target === 'object' ? (l.target as KiNode).id : l.target as string;
                return !(s === ts && t === tt);
            });
        });
        // Undo link removals (re-add them)
        delta.links.removed.forEach(link => {
            const ts = typeof link.source === 'object' ? (link.source as KiNode).id : link.source as string;
            const tt = typeof link.target === 'object' ? (link.target as KiNode).id : link.target as string;
            base.links.push({ source: ts, target: tt });
        });
    }

    return base;
}

function updateGraph(data: { nodes: KiNode[]; links: KiLink[] }) {
    Graph3D.graphData(data);
    // Re-center camera after force simulation re-initializes
    setTimeout(() => Graph3D.zoomToFit(600, 60), 800);

    if (visNodes && visEdges) {
        visNodes.clear();
        visNodes.add(data.nodes.map(n => {
            const label = n.id.replace(/_/g, ' ');
            let bgColor: string, textColor: string;
            if (n.id === 'GEMINI.md') { bgColor = '#00008b'; textColor = '#ffffff'; }
            else if (n.group === 1) { bgColor = '#a855f7'; textColor = '#ffffff'; }
            else { bgColor = '#22d3ee'; textColor = '#0f172a'; }

            return {
                id: n.id,
                label: label.split(' ').join('\n'),
                shape: 'circle' as const,
                margin: 10,
                color: { background: bgColor, border: '#1e293b' },
                font: { color: textColor, size: 11, face: 'Inter' },
            };
        }));

        visEdges.clear();
        visEdges.add(data.links.map(l => ({
            from: typeof l.source === 'object' ? l.source.id : l.source,
            to: typeof l.target === 'object' ? l.target.id : l.target,
        })));
    }
}

window.addEventListener('message', (event) => {
    if (event.data.type === 'SET_EPOCH') {
        const ts: string | null = event.data.timestamp ?? null;
        console.warn(`🌀 Switching to Epoch: ${ts ?? 'LIVE'}`);
        const state = reconstructState(ts);
        updateGraph(state);
    }
    if (event.data.type === 'SET_VIEW') {
        console.warn(`🖥ï¸ Switching View Mode: ${event.data.view}`);
        switchView(null, event.data.view);
    }
    if (event.data.type === 'GET_HISTORY') {
        window.parent.postMessage({ type: 'HISTORY_DATA', history: kiHistory }, '*');
    }
});

// Broadcast history on init
setTimeout(() => {
    if (window.parent !== window) {
        window.parent.postMessage({ type: 'HISTORY_DATA', history: kiHistory }, '*');
    }
}, 500);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const outDeg: Record<string, number> = {};
kiData.links.forEach(l => {
    const sid = typeof l.source === 'object' ? l.source.id : l.source;
    outDeg[sid] = (outDeg[sid] || 0) + 1;
});
const isTerminal = (id: string) => !outDeg[id];

// ─── 3D Graph ─────────────────────────────────────────────────────────────────

// Registry for per-frame sprite projection
const nodeSprites: Array<{ sprite: InstanceType<typeof SpriteText>, node: KiNode, size: number }> = [];



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Graph3D = (ForceGraph3D as any)()(document.getElementById('view-3d') as HTMLElement)
    .backgroundColor('#050510')
    .nodeThreeObject((node: object) => {
        const n = node as KiNode;
        const group = new THREE.Group();

        const color = n.group === 999 ? '#00008b'
            : (n.group === 0 ? '#94a3b8'
                : (isTerminal(n.id) ? '#fbbf24'
                    : (n.group === 1 ? '#a855f7' : '#22d3ee')));

        const size = n.group === 999 ? 18
            : (n.group === 0 ? 8
                : (isTerminal(n.id) ? 4
                    : (n.group === 1 ? 10 : 8)));

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(size, 24, 24),
            new THREE.MeshLambertMaterial({ color, transparent: true, opacity: n.group === 0 ? 0.3 : (n.group === 999 ? 1.0 : 0.9) })
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
    .linkWidth(1.5)
    .linkOpacity(0.4)
    .linkColor(() => '#6366f1')
    .linkDirectionalArrowLength(4)
    .linkDirectionalArrowRelPos(1)
    .linkCurvature(0.25)
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

const visEdges = new DataSet(kiData.links.map(l => ({
    from: typeof l.source === 'object' ? l.source.id : l.source,
    to: typeof l.target === 'object' ? l.target.id : l.target,
})));

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
            const rootNode = kiData.nodes.find(n => n.id === 'GEMINI.md');
            if (rootNode) {
                setTimeout(() => {
                    const { x = 0, y = 0, z = 0 } = rootNode;
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
        window.parent.postMessage({ type: 'toggle-fullscreen', isFullscreen }, '*');
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

export const kiHistory: KiDiff[] = [
    {
        "timestamp": "2026-03-02 16:06:11",
        "label": "Auto-Sync: Initial Batch",
        "delta": {
            "nodes": {
                "added": [],
                "removed": []
            },
            "links": {
                "added": [
                    { "source": "emergency_divergence", "target": "guided_audit_protocol" },
                    { "source": "emergency_divergence", "target": "quality_gates" },
                    { "source": "operation_commander", "target": "testing_governance" },
                    { "source": "operation_commander", "target": "emergency_divergence" },
                    { "source": "operation_commander", "target": "guided_audit_protocol" },
                    { "source": "testing_governance", "target": "emergency_divergence" }
                ],
                "removed": []
            }
        }
    },
];
