/**
 * DNA History Engine
 * Single Source of Truth for temporal graph reconstruction.
 */

export interface KiNode {
    id: string;
    name: string;
    group: number;
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
 * Reconstructs the graph state at a specific point in time by walking FORWARD from Genesis.
 * @param history The full ledger of KiDiff epochs.
 * @param targetTimestamp The timestamp to stop at (inclusive). If null, returns the full cumulative state.
 */
export function getHistoryState(history: KiDiff[], targetTimestamp: string | null): { nodes: KiNode[]; links: KiLink[] } {
    const nodes = new Map<string, KiNode>();
    const links = new Set<string>(); // Serialized KiLink for unique identification

    const stopIdx = targetTimestamp
        ? history.findIndex(h => h.timestamp === targetTimestamp)
        : history.length - 1;

    if (targetTimestamp && stopIdx === -1) {
        console.warn(`⚠️ Target timestamp ${targetTimestamp} not found in history.`);
    }

    // Walk FORWARD from index 0
    for (let i = 0; i <= (stopIdx === -1 ? history.length - 1 : stopIdx); i++) {
        const { delta } = history[i];

        // 1. Process Nodes
        delta.nodes.removed.forEach(id => nodes.delete(id));
        delta.nodes.added.forEach(node => nodes.set(node.id, node));

        // 2. Process Links
        delta.links.removed.forEach(link => {
            links.delete(serializeLink(link));
        });
        delta.links.added.forEach(link => {
            links.add(serializeLink(link));
        });
    }

    return {
        nodes: Array.from(nodes.values()),
        links: Array.from(links).map(l => JSON.parse(l) as KiLink)
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
export function getTimelineBatches(history: KiDiff[]): TimelineBatch[] {
    const batches: TimelineBatch[] = [];
    let currentBatch: KiDiff[] = [];

    history.forEach((diff) => {
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

function serializeLink(link: KiLink): string {
    // We normalize the link for set comparison (source + target is the unique key)
    return JSON.stringify({
        source: typeof link.source === 'object' ? (link.source as KiNode).id : link.source,
        target: typeof link.target === 'object' ? (link.target as KiNode).id : link.target,
        label: link.label,
        target_location: link.target_location,
        ref_type: link.ref_type
    });
}
