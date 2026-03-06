/**
 * DNA History Engine
 * Single Source of Truth for temporal graph reconstruction.
 */

export interface KiNode {
    id: string;
    name: string;
    // Visualization properties (optional)
    x?: number;
    y?: number;
    z?: number;
    val?: number;
}

export interface KiLink {
    source: string | KiNode;
    target: string | KiNode;
    label?: string;
    target_location?: 'DNA' | 'SRL' | 'OTHER';
    ref_type?: 'formal' | 'bold' | 'mention';
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


export interface TimelineBatch {
    id: string; // Timestamp of the first/main item
    type: 'SIGNIFICANT' | 'EMPTY_BATCH';
    items: KiDiff[];
    label: string;
}

/**
 * Fetches the timeline data and reconstructs the cumulative graph state.
 */
export async function getGraphData(preLoadedData?: any) {
    const DATA_URL = './dna-history-backfill-v26_s1.json';
    try {
        if (preLoadedData) {
            const epochs = preLoadedData.epochs || preLoadedData;
            if (Array.isArray(epochs)) {
                return getHistoryState(epochs, null);
            }
        }

        const response = await fetch(DATA_URL);
        
        if (!response.ok) {
            console.error(`[DNA-Engine] ❌ Fetch Failed for ${DATA_URL}`);
            console.error(`   ├─ Status: ${response.status} (${response.statusText})`);
            console.error(`   └─ Type: ${response.type}`);
            return { nodes: [], links: [], metadata: { timestamp: null, label: 'Fetch Error', reconstructionTimeMs: 0, delta: { nodesAdded: 0, nodesRemoved: 0, linksAdded: 0, linksRemoved: 0 } } };
        }

        let data;
        try {
            data = await response.json();
        } catch (jsonErr) {
            console.error(`[DNA-Engine] ❌ JSON Parse Error for ${DATA_URL}`);
            console.error(`   └─ Message: ${jsonErr instanceof Error ? jsonErr.message : String(jsonErr)}`);
            return { nodes: [], links: [], metadata: { timestamp: null, label: 'JSON Error', reconstructionTimeMs: 0, delta: { nodesAdded: 0, nodesRemoved: 0, linksAdded: 0, linksRemoved: 0 } } };
        }

        const epochs = data.epochs || data;
        const metadata = data.metadata || {};
        
        console.log(`[DNA-Engine] 🛰️ Data Fetch Success: ${DATA_URL}`);
        console.log(`   ├─ Version: ${metadata.version || 'unknown'}`);
        console.log(`   ├─ Sync: ${metadata.sync || 'unknown'}`);
        console.log(`   └─ Total Epochs: ${epochs.length}`);
        
        if (!Array.isArray(epochs)) {
            console.error(`[DNA-Engine] ❌ Schema Error: Data is not an array of epochs`);
            return { nodes: [], links: [], metadata: { timestamp: null, label: 'Schema Error', reconstructionTimeMs: 0, delta: { nodesAdded: 0, nodesRemoved: 0, linksAdded: 0, linksRemoved: 0 } } };
        }

        return getHistoryState(epochs, null);
    } catch (e) {
        console.error('[DNA-Engine] ❌ Unexpected Error during getGraphData:', e);
        return { nodes: [], links: [], metadata: { timestamp: null, label: 'Unexpected Error', reconstructionTimeMs: 0, delta: { nodesAdded: 0, nodesRemoved: 0, linksAdded: 0, linksRemoved: 0 } } };
    }
}

export interface HistoryState {
    nodes: KiNode[];
    links: KiLink[];
    metadata: {
        timestamp: string | null;
        label: string;
        reconstructionTimeMs: number;
        delta: {
            nodesAdded: number;
            nodesRemoved: number;
            linksAdded: number;
            linksRemoved: number;
        };
    };
}

/**
 * Reconstructs the graph state at a specific point in time by walking FORWARD from Genesis.
 * @param epochs The full ledger of KiDiff epochs.
 * @param targetTimestamp The timestamp to stop at (inclusive). If null, returns the full cumulative state.
 */
export function getHistoryState(epochs: KiDiff[], targetTimestamp: string | null): HistoryState {
    const startTime = performance.now();
    console.warn(`[DNA-Engine] getHistoryState called for ${targetTimestamp}. Epochs count: ${epochs?.length}`);
    if (!epochs || epochs.length === 0) {
        console.error('[DNA-Engine] No epochs provided to getHistoryState');
        return { 
            nodes: [], 
            links: [], 
            metadata: { timestamp: null, label: 'Empty', reconstructionTimeMs: 0, delta: { nodesAdded: 0, nodesRemoved: 0, linksAdded: 0, linksRemoved: 0 } } 
        };
    }
    const nodes = new Map<string, KiNode>();
    const links = new Set<string>(); // Serialized KiLink for unique identification

    const getLinkId = (link: KiLink) => {
        const s = typeof link.source === 'string' ? link.source : (link.source as KiNode).id;
        const t = typeof link.target === 'string' ? link.target : (link.target as KiNode).id;
        return `${s}-${t}`;
    };

    const stopIdx = targetTimestamp
        ? epochs.findIndex(h => h.timestamp === targetTimestamp)
        : epochs.length - 1;

    if (targetTimestamp && stopIdx === -1) {
        console.warn(`⚠️ Target timestamp ${targetTimestamp} not found in history.`);
    }

    // Walk FORWARD from index 0
    let nodesAdded = 0;
    let nodesRemoved = 0;
    let linksAdded = 0;
    let linksRemoved = 0;
    let finalLabel = 'Full Cumulative State';

    const endPos = (stopIdx === -1 ? epochs.length - 1 : stopIdx);
    console.log(`[DNA-Reconstruction] 🛠️ Walking Genesis -> ${endPos}...`);

    for (let i = 0; i <= endPos; i++) {
        const { delta, label, timestamp } = epochs[i];
        if (i === endPos) finalLabel = label;

        const prevNodeCount = nodes.size;
        const prevLinkCount = links.size;

        // 1. Process Nodes
        delta.nodes.removed.forEach(id => {
            if (nodes.has(id)) {
                nodes.delete(id);
                nodesRemoved++;
            }
        });
        delta.nodes.added.forEach(node => {
            nodes.set(node.id, { ...node });
            nodesAdded++;
        });

        // 2. Process Links
        delta.links.removed.forEach(link => {
            const id = getLinkId(link);
            if (links.has(id)) {
                links.delete(id);
                linksRemoved++;
            }
        });
        delta.links.added.forEach(link => {
            const id = getLinkId(link);
            links.add(id);
            linksAdded++;
        });

        // Verbose checkpoint for major steps
        if (i % 5 === 0 || i === endPos) {
            console.log(`   [Step ${i}] ⏩ ${timestamp.split('T')[1].split('+')[0]} | ${label.substring(0, 30)}...`);
            console.log(`       └─ Cumulative State: ${nodes.size} nodes (+${nodes.size - prevNodeCount}), ${links.size} links (+${links.size - prevLinkCount})`);
        }
    }

    const finalNodes = Array.from(nodes.values());
    const finalLinks = Array.from(links).map(id => {
        const [source, target] = id.split('-');
        return { source, target };
    }) as KiLink[];

    // Data Validation
    const invalidLinks = finalLinks.filter(l => !nodes.has(typeof l.source === 'string' ? l.source : (l.source as KiNode).id) || 
                                              !nodes.has(typeof l.target === 'string' ? l.target : (l.target as KiNode).id));
    
    if (invalidLinks.length > 0) {
        console.error(`[DNA-Engine] ⚠️ Found ${invalidLinks.length} dangling links!`);
    }

    const endTime = performance.now();

    return {
        nodes: finalNodes,
        links: finalLinks,
        metadata: {
            timestamp: targetTimestamp,
            label: finalLabel,
            reconstructionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
            delta: { nodesAdded, nodesRemoved, linksAdded, linksRemoved }
        }
    };
}

/**
 * Summarizes the total delta from baseline up to a specific point.
 */
export function getDiffSummary(history: KiDiff[], targetTimestamp: string) {
    return getHistoryState(history, targetTimestamp);
}

/**
 * Checks if a diff is significant (contains node or link additions/removals).
 */
export function isSignificant(diff: KiDiff): boolean {
    return (
        diff.delta.nodes.added.length > 0 ||
        diff.delta.nodes.removed.length > 0 ||
        diff.delta.links.added.length > 0 ||
        diff.delta.links.removed.length > 0
    );
}

/**
 * Groups consecutive non-significant commits into batches.
 */
export function getTimelineBatches(epochs: KiDiff[]): TimelineBatch[] {
    console.warn(`[DNA-Engine] Generating timeline batches for ${epochs.length} epochs`);
    const batches: TimelineBatch[] = [];
    let currentBatch: KiDiff[] = [];

    epochs.forEach((diff) => {
        if (isSignificant(diff)) {
            // If we have a pending empty batch, push it
            if (currentBatch.length > 0) {
                batches.push({
                    id: currentBatch[0].timestamp,
                    type: 'EMPTY_BATCH',
                    items: [...currentBatch],
                    label: `${currentBatch.length} Maintenance Commits`
                });
                currentBatch = [];
            }
            // Push significant item
            batches.push({
                id: diff.timestamp,
                type: 'SIGNIFICANT',
                items: [diff],
                label: diff.label
            });
        } else {
            currentBatch.push(diff);
        }
    });

    // Final sweep
    if (currentBatch.length > 0) {
        batches.push({
            id: currentBatch[0].timestamp,
            type: 'EMPTY_BATCH',
            items: currentBatch,
            label: `${currentBatch.length} Maintenance Commits`
        });
    }

    return batches;
}

