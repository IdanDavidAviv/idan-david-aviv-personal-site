import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// --- CONFIGURATION ---
const REPO_PATH = 'C:\\Users\\Idan4\\.gemini';
const KI_ROOT = 'antigravity/knowledge';
const GEMINI_RELATIVE = 'GEMINI.md'; // Root node
const OUTPUT_DIR = 'C:\\Users\\Idan4\\OneDrive\\Desktop\\idan-david-aviv-personal-site\\src\\visualizations';
const BASE_NAME = 'dna-history-backfill';

// --- CLI ARGUMENTS ---
const args = process.argv.slice(2);
const IS_FRESH = args.includes('--fresh');
const IS_SYNC = args.includes('--sync') && !IS_FRESH;
// const IS_DEEP = args.includes('--deep'); // Deprecated v0.5

const partialIdx = args.indexOf('--partial');
const MAX_EPOCHS = partialIdx !== -1 ? parseInt(args[partialIdx + 1], 10) : null;

const scopeIdx = args.indexOf('--scope');
const SCOPE_PATHS = scopeIdx !== -1 ? args[scopeIdx + 1].split(',') : [KI_ROOT, GEMINI_RELATIVE];

// --- TYPES ---
interface KiNode {
    id: string;
    name: string;
}

interface KiLink {
    source: string;
    target: string;
    label?: string;
    target_location?: 'DNA' | 'SRL' | 'OTHER';
    ref_type: 'formal' | 'bold' | 'mention';
}

interface KiDiff {
    timestamp: string;
    label: string;
    delta: {
        nodes: { added: KiNode[]; removed: string[] };
        links: { added: KiLink[]; removed: KiLink[] };
    };
}

// --- UTILS ---
function getLatestLedger(): { path: string; version: number; data: KiDiff[] | null } {
    const files = fs.readdirSync(OUTPUT_DIR);
    const versionRegex = new RegExp(`${BASE_NAME}-v(\\d+)\\.json`);
    let maxVersion = 0;
    let latestFile = '';

    for (const file of files) {
        const match = file.match(versionRegex);
        if (match) {
            const version = parseInt(match[1], 10);
            if (version > maxVersion) {
                maxVersion = version;
                latestFile = file;
            }
        }
    }

    if (!latestFile) return { path: '', version: 0, data: null };

    const fullPath = path.join(OUTPUT_DIR, latestFile);
    return {
        path: fullPath,
        version: maxVersion,
        data: JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    };
}

function extractHashFromLabel(label: string): string | null {
    const match = label.match(/\[([a-f0-9]{7,40})\]/);
    return match ? match[1] : null;
}

function canonicalKey(link: KiLink): string {
    return `${link.source}|${link.target}|${link.label || ''}|${link.ref_type}|${link.target_location || 'DNA'}`;
}

function getLinkLocation(targetId: string, targetPath?: string): 'DNA' | 'SRL' | 'OTHER' {
    if (targetPath && targetPath.includes('spirit-research-lab')) return 'SRL';
    // If it's not an external link and not in SRL, we treat it as internal DNA for now.
    // The UI handles more granular fallback if the node is missing.
    return 'DNA';
}

/**
 * DNA Archaeology Protocol v0.4
 * Stateful Walk + Intent-Aware Extraction
 */
async function runArchaeology() {
    process.chdir(REPO_PATH);
    console.log('🏛️ Initializing DNA Archaeology v0.4 (Stateful Mode)...');

    const latest = getLatestLedger();
    let startHash: string | null = null;
    const liveRegistry = new Set<string>();
    let history: KiDiff[] = [];
    let prevGraph = { nodes: new Set<string>(), links: new Set<string>() };

    // --- SYNC LOGIC ---
    if (IS_SYNC && latest.data) {
        const lastEpoch = latest.data[latest.data.length - 1];
        startHash = extractHashFromLabel(lastEpoch.label);
        console.log(`🔄 Sync active. Resuming from commit [${startHash}]...`);

        // Reconstruct LiveRegistry and State from existing ledger
        latest.data.forEach(epoch => {
            // Apply Additions
            epoch.delta.nodes.added.forEach(n => {
                liveRegistry.add(n.id);
                prevGraph.nodes.add(n.id);
            });
            epoch.delta.links.added.forEach(l => {
                prevGraph.links.add(canonicalKey(l));
            });

            // Apply Removals
            if (epoch.delta.nodes.removed) {
                epoch.delta.nodes.removed.forEach(id => {
                    liveRegistry.delete(id);
                    prevGraph.nodes.delete(id);
                });
            }
            if (epoch.delta.links.removed) {
                epoch.delta.links.removed.forEach(l => {
                    prevGraph.links.delete(canonicalKey(l));
                });
            }
        });
        history = latest.data;
    }

    // --- COMMIT FETCHING ---
    const logRange = startHash ? `${startHash}..HEAD` : '';
    const scopeStr = SCOPE_PATHS.join(' ');
    const commitOutput = execSync(`git log --reverse --pretty=format:"%h|%aI|%s" ${logRange} -- ${scopeStr}`).toString();

    if (!commitOutput.trim()) {
        console.log('✅ No new commits found. Graph is up to date.');
        return;
    }

    const commitList = commitOutput.split('\n').map(line => {
        const [hash, date, message] = line.split('|');
        return { hash, date, message };
    });

    if (MAX_EPOCHS) {
        commitList.splice(MAX_EPOCHS);
        console.log(`⚠️ Partial run: Limiting to ${MAX_EPOCHS} new commits.`);
    }

    console.log(`📊 Processing ${commitList.length} new epochs...`);

    // --- THE WALK ---
    let count = 0;
    const total = commitList.length;
    for (const commit of commitList) {
        count++;
        console.log(`🔍 Epoch [${count}/${total}] ${commit.hash} [${commit.date}]`);

        // 1. Identify all files changed in this commit within scope
        const changedFiles = execSync(`git show --name-only --pretty="" ${commit.hash} -- ${scopeStr}`)
            .toString()
            .split('\n')
            .filter(f => f.trim().length > 0);

        // 2. Stateful Node Discovery (Update Registry FIRST)
        for (const file of changedFiles) {
            const id = extractIdFromFilePath(file);
            if (id) liveRegistry.add(id);
        }

        // 3. Extract Graph State
        const currentGraph = await extractGraphAtCommit(commit.hash, liveRegistry);
        const delta = computeDelta(prevGraph, currentGraph);

        // 4. Record History
        history.push({
            timestamp: commit.date,
            label: `[${commit.hash}] ${commit.message}`,
            delta: {
                nodes: { added: delta.addedNodes, removed: delta.removedNodes },
                links: { added: delta.addedLinks, removed: delta.removedLinks }
            }
        });

        prevGraph = currentGraph;
    }

    // --- OUTPUT ---
    const newVersion = latest.version + 1;
    const newPath = path.join(OUTPUT_DIR, `${BASE_NAME}-v${newVersion}.json`);

    const rawJson = JSON.stringify(history, null, 2);
    const compactedJson = compactGraphJson(rawJson);

    fs.writeFileSync(newPath, compactedJson);
    console.log(`✅ Archaeology complete. Saved v${newVersion} to ${newPath}`);
}

/**
 * Intent-Aware Extraction Engine
 */
async function extractGraphAtCommit(hash: string, registry: Set<string>) {
    const nodes = new Set<string>();
    const links = new Set<string>();

    // List all scoped files at this commit
    const scopeStr = SCOPE_PATHS.join(' ');
    const files = execSync(`git ls-tree -r ${hash} -- ${scopeStr}`)
        .toString()
        .split('\n')
        .filter(l => l.trim().length > 0);

    for (const line of files) {
        const filePath = line.split('\t')[1];
        const id = extractIdFromFilePath(filePath);

        // Always extract links if it's a markdown file, even if it's not a "Node"
        if (!filePath.endsWith('.md')) continue;

        if (id) nodes.add(id);

        // Read content
        const content = execSync(`git show ${hash}:${filePath}`).toString();

        // Effective source for links: if file isn't a node, attribute to parent dir node or ignore
        const sourceId = id || path.basename(path.dirname(filePath));
        if (!sourceId || sourceId === '.') continue;

        // --- PHASE 1: Explicit MD Links ---
        const mdRegex = /\[(.*?)\]\((.*?)\)/g;
        let mMatch;
        while ((mMatch = mdRegex.exec(content)) !== null) {
            const rawLabel = mMatch[1];
            const targetPath = mMatch[2];
            if (targetPath.includes('SKILL.md') || targetPath.includes('GEMINI.md')) {
                // Advanced ID Extraction
                const label = rawLabel.replace(/[*#`[\]]/g, '').trim();
                let targetId: string;

                // Detection: Is the label a clean ID and the target a path? (Flipped Link)
                const isPathLink = targetPath.includes('://') || targetPath.includes('/') || targetPath.includes('\\');
                const isLabelId = label.length > 0 && !label.includes('/') && !label.includes('\\') && !label.includes(' ') && label === label.toLowerCase() && /^[a-z_]+$/.test(label);

                if (isPathLink && isLabelId) {
                    targetId = label;
                } else {
                    const normalizedPath = targetPath.replace(/\\/g, '/');
                    const parts = normalizedPath.split('/');
                    const artifactsIdx = parts.indexOf('artifacts');

                    if (artifactsIdx > 0) {
                        targetId = parts[artifactsIdx - 1];
                    } else {
                        const skillIdx = parts.indexOf('SKILL.md');
                        targetId = (skillIdx > 0) ? parts[skillIdx - 1] : targetPath.replace(/.*[/\\]/, '').replace(/\..*$/, '');
                    }
                }

                const target_location = getLinkLocation(targetId, targetPath);

                // Final Guard: Only add if it's a known node or a core concept
                if (registry.has(targetId) || targetId === 'GEMINI.md' || target_location === 'SRL') {
                    links.add(canonicalKey({
                        source: sourceId,
                        target: targetId,
                        label: label,
                        target_location,
                        ref_type: 'formal'
                    }));
                }
            }
        }

        // --- PHASE 2: Anchored Bolds (Tiered) ---
        const anchoredRegex = /\*\*([a-z_]+)\*\*\s+(KI|workflow|rule|protocol|skill)/g;
        let aMatch;
        while ((aMatch = anchoredRegex.exec(content)) !== null) {
            const targetId = aMatch[1];
            // Tight Guard: Only link if it's in our registry
            if (!registry.has(targetId) && targetId !== 'GEMINI.md') continue;

            const alreadyLinked = Array.from(links).some(l => {
                const lp = l.split('|');
                return lp[0] === sourceId && lp[1] === targetId;
            });
            if (!alreadyLinked) {
                links.add(canonicalKey({
                    source: sourceId,
                    target: targetId,
                    label: targetId,
                    target_location: getLinkLocation(targetId),
                    ref_type: 'bold'
                }));
            }
        }

        // --- PHASE 3: Weak Reference Discovery (Registry Context) ---
        // Mentions are now standard for core DNA nodes (GEMINI.md and Knowledge Items)
        const registryList = Array.from(registry);
        registryList.forEach(regId => {
            if (regId === sourceId) return;
            const weakRegex = new RegExp(`\\b${regId}\\b`, 'g');
            if (weakRegex.test(content)) {
                const alreadyLinked = Array.from(links).some(l => {
                    const lp = l.split('|');
                    return lp[0] === sourceId && lp[1] === regId;
                });
                if (!alreadyLinked) {
                    links.add(canonicalKey({
                        source: sourceId,
                        target: regId,
                        label: regId,
                        target_location: getLinkLocation(regId),
                        ref_type: 'mention'
                    }));
                }
            }
        });
    }

    // --- PHASE 4: Link Integrity Check ---
    // Prune dangling links: Any link to a 'DNA' node must have its target in the current nodes set.
    const validLinks = new Set<string>();
    Array.from(links).forEach(lStr => {
        const lp = lStr.split('|');
        const link = {
            source: lp[0],
            target: lp[1],
            label: lp[2],
            ref_type: lp[3] as KiLink['ref_type'],
            target_location: (lp[4] || 'DNA') as KiLink['target_location']
        };

        // Only prune internal DNA links
        if (nodes.has(link.target) || link.target === 'GEMINI.md' || nodes.has(link.source)) {
            validLinks.add(lStr);
        } else {
            // Check if target is a known DNA node from registry (even if not in current commit)
            if (registry.has(link.target)) {
                validLinks.add(lStr);
            }
        }
    });

    return { nodes, links: validLinks };
}

function extractIdFromFilePath(filePath: string): string | null {
    if (filePath === GEMINI_RELATIVE) return 'GEMINI.md';
    if (filePath.includes('SKILL.md')) {
        const parts = filePath.split('/');
        const artifactsIdx = parts.indexOf('artifacts');
        return (artifactsIdx > 0) ? parts[artifactsIdx - 1] : null;
    }
    // Expanded Discovery: Any file named GEMINI.md or SKILL.md in any subfolder
    if (filePath.endsWith('SKILL.md')) {
        const parts = filePath.split(/[/\\]/);
        const idx = parts.indexOf('SKILL.md');
        return idx > 0 ? parts[idx - 1] : null;
    }
    return null;
}

function computeDelta(prev: { nodes: Set<string>; links: Set<string> }, curr: { nodes: Set<string>; links: Set<string> }) {
    const addedNodes = Array.from(curr.nodes)
        .filter(n => !prev.nodes.has(n))
        .map(n => ({
            id: n,
            name: n
        }));
    const removedNodes = Array.from(prev.nodes).filter(n => !curr.nodes.has(n));

    const addedLinksRaw = Array.from(curr.links).filter(l => !prev.links.has(l));
    const removedLinksRaw = Array.from(prev.links).filter(l => !curr.links.has(l));

    const parseLink = (s: string): KiLink => {
        const [source, target, label, ref_type, location] = s.split('|');
        return {
            source,
            target,
            label,
            ref_type: ref_type as KiLink['ref_type'],
            target_location: (location || 'DNA') as KiLink['target_location']
        };
    };

    const addedLinks = addedLinksRaw.map(parseLink);
    const removedLinks = removedLinksRaw.map(parseLink);

    return { addedNodes, removedNodes, addedLinks, removedLinks };
}

function compactGraphJson(json: string): string {
    return json
        // Compact Node objects
        .replace(/\{\n\s+"id": "(.*?)",\n\s+"name": "(.*?)",\n\s+"group": (.*?)\n\s+\}/g, '{ "id": "$1", "name": "$2", "group": $3 }')
        // Compact Link objects (handling both possible field orders)
        .replace(/\{\n\s+"source": "(.*?)",\n\s+"target": "(.*?)",\n\s+"label": "(.*?)",\n\s+"target_location": "(.*?)",\n\s+"ref_type": "(.*?)"\n\s+\}/g, '{ "source": "$1", "target": "$2", "label": "$3", "target_location": "$4", "ref_type": "$5" }')
        .replace(/\{\n\s+"source": "(.*?)",\n\s+"target": "(.*?)",\n\s+"label": "(.*?)",\n\s+"ref_type": "(.*?)",\n\s+"target_location": "(.*?)"\n\s+\}/g, '{ "source": "$1", "target": "$2", "label": "$3", "ref_type": "$4", "target_location": "$5" }')
        // Compact empty arrays
        .replace(/\[\s+\]/g, '[]')
        // Wrap added/removed arrays onto single lines if they are relatively short or have been compacted
        .replace(/"added": \[\s+((?:\{.*?\}(?:,\s+)?)*)\s+\]/g, (m, content) => `"added": [ ${content.replace(/\s+/g, ' ').trim()} ]`)
        .replace(/"removed": \[\s+((?:\{.*?\}(?:,\s+)?)*)\s+\]/g, (m, content) => `"removed": [ ${content.replace(/\s+/g, ' ').trim()} ]`)
        // Compact delta structure
        .replace(/"delta": \{\n\s+"nodes": \{\n\s+"added": (.*?),\n\s+"removed": (.*?)\n\s+\},\n\s+"links": \{\n\s+"added": (.*?),\n\s+"removed": (.*?)\n\s+\}\n\s+\}/gs,
            '"delta": { "nodes": { "added": $1, "removed": $2 }, "links": { "added": $3, "removed": $4 } }');
}

runArchaeology().catch(console.error);
