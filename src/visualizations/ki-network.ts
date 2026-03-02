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

const kiData: { nodes: KiNode[]; links: KiLink[] } = {
    nodes: [
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
        { source: 'operation_commander', target: 'git_strategy' },
        { source: 'operation_commander', target: 'github_project_manager' },
        { source: 'operation_commander', target: 'ki_integrity_governor' },
        { source: 'operation_commander', target: 'quality_gates' },
        { source: 'operation_commander', target: 'session_lifecycle' },
        { source: 'operation_commander', target: 'state_management_governance' },
        { source: 'operation_commander', target: 'supabase_governance' },
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
        { source: 'testing_governance', target: 'quality_gates' },
    ],
};

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

let hasAligned = false;

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
    })
    .onEngineStop(() => {
        if (hasAligned) return;

        // --- PCA-based Horizontal Alignment ---
        const nodes = Graph3D.graphData().nodes as KiNode[];
        if (nodes.length < 3) return;

        console.log('[PCA] Starting alignment for', nodes.length, 'nodes');
        console.log('[PCA] First 3 nodes positions:', nodes.slice(0, 3).map(n => ({ id: n.id, x: n.x?.toFixed(2), y: n.y?.toFixed(2), z: n.z?.toFixed(2) })));

        // 1. Calculate Mean
        let mx = 0, my = 0, mz = 0;
        nodes.forEach(n => { mx += n.x || 0; my += n.y || 0; mz += n.z || 0; });
        mx /= nodes.length; my /= nodes.length; mz /= nodes.length;

        // 2. Covariance Matrix (3x3)
        let cxx = 0, cxy = 0, cxz = 0, cyy = 0, cyz = 0, czz = 0;
        nodes.forEach(n => {
            const dx = (n.x || 0) - mx;
            const dy = (n.y || 0) - my;
            const dz = (n.z || 0) - mz;
            cxx += dx * dx; cxy += dx * dy; cxz += dx * dz;
            cyy += dy * dy; cyz += dy * dz; czz += dz * dz;
        });

        console.log('[PCA] Variance:', { cxx: cxx.toFixed(0), cyy: cyy.toFixed(0), czz: czz.toFixed(0) });

        // 3. Jacobi Eigenvalue Solver (3x3 symmetric matrix)
        const A = [
            [cxx, cxy, cxz],
            [cxy, cyy, cyz],
            [cxz, cyz, czz]
        ];
        const V = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];

        for (let iter = 0; iter < 10; iter++) {
            // Find largest off-diagonal
            let p = 0, q = 1;
            if (Math.abs(A[0][2]) > Math.abs(A[p][q])) { p = 0; q = 2; }
            if (Math.abs(A[1][2]) > Math.abs(A[p][q])) { p = 1; q = 2; }

            if (Math.abs(A[p][q]) < 1e-9) break;

            const theta = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
            const cos = Math.cos(theta);
            const sin = Math.sin(theta);

            // Rotate A
            const App = A[p][p], Aqq = A[q][q], Apq = A[p][q];
            A[p][p] = cos * cos * App - 2 * sin * cos * Apq + sin * sin * Aqq;
            A[q][q] = sin * sin * App + 2 * sin * cos * Apq + cos * cos * Aqq;
            A[p][q] = A[q][p] = 0;

            for (let i = 0; i < 3; i++) {
                if (i !== p && i !== q) {
                    const Aip = A[i][p], Aiq = A[i][q];
                    A[i][p] = A[p][i] = cos * Aip - sin * Aiq;
                    A[i][q] = A[q][i] = sin * Aip + cos * Aiq;
                }
                // Rotate V
                const Vip = V[i][p], Viq = V[i][q];
                V[i][p] = cos * Vip - sin * Viq;
                V[i][q] = sin * Vip + cos * Viq;
            }
        }

        // Extract Eigenvectors and Eigenvalues
        const eigs = [
            { val: A[0][0], vec: new THREE.Vector3(V[0][0], V[1][0], V[2][0]) },
            { val: A[1][1], vec: new THREE.Vector3(V[0][1], V[1][1], V[2][1]) },
            { val: A[2][2], vec: new THREE.Vector3(V[0][2], V[1][2], V[2][2]) }
        ].sort((a, b) => b.val - a.val);

        const pc1 = eigs[0].vec.normalize(); // Long axis
        const pc3 = eigs[2].vec.normalize(); // Short axis (normal)
        const pc2 = new THREE.Vector3().crossVectors(pc3, pc1).normalize();

        console.log('[PCA] Eigenvalues:', eigs.map(e => e.val.toFixed(0)));
        console.log('[PCA] PC1 (Long):', pc1);
        console.log('[PCA] PC3 (Normal):', pc3);

        // 4. Construct Rotation Matrix
        // Goal: PC1 -> World X [1,0,0], PC3 -> World Y [0,1,0], PC2 -> World Z [0,0,1]
        const rotMat = new THREE.Matrix4().set(
            pc1.x, pc1.y, pc1.z, 0,
            pc3.x, pc3.y, pc3.z, 0,
            pc2.x, pc2.y, pc2.z, 0,
            0, 0, 0, 1
        );

        // 5. Apply Rotation to all nodes
        nodes.forEach(n => {
            const pos = new THREE.Vector3(n.x, n.y, n.z);
            pos.sub(new THREE.Vector3(mx, my, mz)); // Center
            pos.applyMatrix4(rotMat); // Exact 3-axis alignment
            pos.add(new THREE.Vector3(mx, my, mz)); // Restore
            n.x = pos.x; n.y = pos.y; n.z = pos.z;
        });

        hasAligned = true;
        Graph3D.graphData({ nodes, links: Graph3D.graphData().links });
        Graph3D.zoomToFit(1000, 50);
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
