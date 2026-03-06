import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';
import SpriteText from 'three-spritetext';
import { KiNode, KiLink } from './ki-network-types';
import { getNodeStyle, getLinkStyle } from './ki-network-styles';
import { getLinkLabel } from './ki-network-ui';

export function createGraph3D(container: HTMLElement) {
    // Registry for per-frame sprite projection
    const nodeSprites = new WeakMap<object, { sprite: THREE.Object3D, size: number }>();

    console.log('[DNA-DEBUG] 🚀 Calling ForceGraph3D constructor...');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const graph = (ForceGraph3D as any)()(container)
        .backgroundColor('#050510')
        .nodeId('id')
        .nodeRelSize(1)
        .nodeThreeObject((node: object) => {
            const n = node as KiNode;
            const style = getNodeStyle(n.id);
            const group = new THREE.Group();

            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(style.size, 24, 24),
                new THREE.MeshStandardMaterial({
                    color: style.color,
                    transparent: true,
                    opacity: style.opacity,
                    emissive: style.color,
                    emissiveIntensity: 0.5,
                    roughness: 0.2,
                    metalness: 0.8
                })
            );
            group.add(sphere);

            const sprite = new SpriteText(n.id.replace(/_/g, '\n'));
            sprite.color = style.textColor;
            sprite.textHeight = Math.max(3, style.size * 0.5);
            sprite.padding = 1;
            sprite.backgroundColor = false as unknown as string;
            sprite.material.depthWrite = false;
            sprite.position.y = 0;
            group.add(sprite);

            nodeSprites.set(node, { sprite, size: style.size });
            return group;
        })
        .linkLabel((link: object) => getLinkLabel(link as KiLink))
        .linkWidth((link: object) => {
            const l = link as KiLink;
            const style = getLinkStyle(l, true);
            // Debug probe for specific link targets
            if (l.ref_type === 'bold' && Math.random() < 0.01) {
                console.log(`[DNA-FLOW] 🛰️ Bold style detected for link to: ${typeof l.target === 'object' ? (l.target as KiNode).id : l.target}`);
            }
            return style.width;
        })
        .linkOpacity(0.5)
        .linkColor((link: object) => getLinkStyle(link as KiLink, true).color)
        .linkDirectionalArrowLength(4)
        .linkDirectionalArrowRelPos(1)
        .linkCurvature(0.25)
        .linkDirectionalParticles((link: object) => {
            const l = link as KiLink;
            // Formal = 3 particles, Bold = 2 particles, Mention = 1 particle
            return l.ref_type === 'formal' ? 3 : (l.ref_type === 'bold' ? 2 : 1);
        })
        .linkDirectionalParticleSpeed(0.005);

    // Force Layout Tuning
    graph.d3Force('link').distance(80);
    graph.d3Force('charge').strength(-150).distanceMax(200);

    // Visibility Boost: Inject Lighting
    const scene = graph.scene();
    if (scene) {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(100, 100, 100);
        scene.add(pointLight);
        console.log('[DNA-3D-Engine] 💡 Custom Lighting Injected into Scene.');
    }

    // Data Binding Watcher
    const originalGraphData = graph.graphData;
    graph.graphData = function(...args: any[]) {
        if (args.length > 0) {
            const data = args[0];
            console.log(`[DNA-3D-Engine] 📥 Data Bound to Renderer: ${data.nodes?.length || 0} nodes, ${data.links?.length || 0} links`);
            if (data.nodes?.length > 0) {
                console.log('   └─ Sample Node ID:', data.nodes[0].id);
            }
        }
        return originalGraphData.apply(this, args);
    };

    return { graph, nodeSprites };
}

export function handle3DNodeClick(node: object, graph: { cameraPosition: (pos: object, target: object, duration: number) => void, graphData: () => { nodes: KiNode[] } }) {
    const n = node as KiNode;
    const { nodes } = graph.graphData();
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

    const cog = new THREE.Vector3(cogX, cogY, cogZ);
    const targetPos = new THREE.Vector3(n.x ?? 0, n.y ?? 0, n.z ?? 0);
    const dir = new THREE.Vector3().subVectors(targetPos, cog).normalize();
    if (dir.lengthSq() === 0) dir.set(0, 0, 1);

    const zoomDistance = 150;
    graph.cameraPosition(
        {
            x: targetPos.x + (dir.x * zoomDistance),
            y: targetPos.y + (dir.y * zoomDistance),
            z: targetPos.z + (dir.z * zoomDistance)
        },
        targetPos,
        2000
    );
}

const _dir = new THREE.Vector3();
export function updateSpritePositions(graph: { camera: () => THREE.Camera, graphData: () => { nodes: KiNode[] } }, nodeSprites: WeakMap<object, { sprite: THREE.Object3D, size: number }>) {
    const camera = graph.camera();
    const { nodes } = graph.graphData();

    if (nodes) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nodes.forEach((node: any) => {
            if (node.x == null) return;
            const entry = nodeSprites.get(node);
            if (!entry) return;

            const { sprite, size } = entry;
            _dir.set(camera.position.x - node.x, camera.position.y - (node.y ?? 0), camera.position.z - (node.z ?? 0)).normalize();
            const targetPos = _dir.clone().multiplyScalar(size * 1.5);
            sprite.position.set(targetPos.x, targetPos.y, targetPos.z);
        });
    }
}
