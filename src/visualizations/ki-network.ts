import { KiNode, KiLink, KiDiff } from './ki-network-types';
import { getGraphData, getHistoryState, getTimelineBatches } from './dna-history-engine';
import { createGraph3D, handle3DNodeClick, updateSpritePositions } from './ki-network-3d';
import { createGraph2D, update2DGraph } from './ki-network-2d';
import { switchView, updateFullscreenUI } from './ki-network-ui';
import historyData from './dna-history-backfill-v26_s1.json';

async function initNetwork() {
    const container3D = document.getElementById('graph-3d');
    const container2D = document.getElementById('graph-2d');
    if (!container3D || !container2D) return;

    let currentView = '3d';
    let isFullscreen = false;
    const epochs = (historyData as unknown as { epochs: KiDiff[] }).epochs;

    // Initialize 3D Graph
    const { graph: graph3D, nodeSprites } = createGraph3D(container3D);
    graph3D.onNodeClick((node: object) => handle3DNodeClick(node, graph3D));

    // Initialize 2D Graph (Empty first)
    const { visNodes, visEdges } = createGraph2D(container2D, [], []);

    // Load and Hydrate Initial State
    const graphData: { nodes: KiNode[], links: KiLink[] } = await getGraphData();
    
    function refreshGraphs(data: { nodes: KiNode[], links: KiLink[] }) {
        graph3D.graphData(data);
        update2DGraph(visNodes, visEdges, data.nodes, data.links);
        
        // Report stats to parent for HUD
        window.parent.postMessage({
            type: 'EPOCH_UPDATED',
            nodes: data.nodes.length,
            links: data.links.length
        }, '*');    
    }

    refreshGraphs(graphData);

    // Animation Loop
    function animate() {
        if (currentView === '3d') {
            updateSpritePositions(graph3D, nodeSprites);
        }
        requestAnimationFrame(animate);
    }
    animate();

    // Message Handling (Inter-component Sync)
    window.addEventListener('message', (event) => {
        const msg = event.data;

        if (msg.type === 'SET_EPOCH') {
            const newState = getHistoryState(epochs, msg.timestamp);
            refreshGraphs(newState);
        }

        if (msg.type === 'GET_TIMELINE') {
            window.parent.postMessage({
                type: 'TIMELINE_DATA',
                timeline: getTimelineBatches(epochs),
                currentEpoch: epochs[epochs.length - 1].timestamp
            }, '*');
        }

        if (msg.type === 'SET_VIEW') {
            currentView = switchView(null, msg.view);
        }

        if (msg.type === 'RESYNC_SIZE') {
            graph3D.width(container3D.clientWidth);
            graph3D.height(container3D.clientHeight);
        }
    });

    // Local UI Event Listeners
    document.getElementById('btn-3d')?.addEventListener('click', (e) => {
        currentView = switchView(e.target as HTMLElement, '3d');
    });

    document.getElementById('btn-2d')?.addEventListener('click', (e) => {
        currentView = switchView(e.target as HTMLElement, '2d');
    });

    document.getElementById('btn-fullscreen')?.addEventListener('click', () => {
        isFullscreen = updateFullscreenUI(!isFullscreen);
        // Delay to allow DOM reflow for graph resize
        setTimeout(() => {
            graph3D.width(container3D.clientWidth);
            graph3D.height(container3D.clientHeight);
        }, 100);
    });

    window.addEventListener('resize', () => {
        graph3D.width(container3D.clientWidth);
        graph3D.height(container3D.clientHeight);
    });
}

// Global entry
initNetwork().catch(console.error);
