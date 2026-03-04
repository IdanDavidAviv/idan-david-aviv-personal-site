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

const partialIdx = args.indexOf('--partial');
const MAX_EPOCHS = partialIdx !== -1 ? parseInt(args[partialIdx + 1], 10) : null;

const scopeIdx = args.indexOf('--scope');
const SCOPE_PATHS = scopeIdx !== -1 ? args[scopeIdx + 1].split(',') : [KI_ROOT, GEMINI_RELATIVE];

if (args.includes('--help')) {
    console.log(`
DNA Archaeology v0.4
Usage: tsx scripts/dna-archaeology.ts [flags]

Flags:
  --fresh          Start from Genesis (ignore existing ledger)
  --sync           Resume from last known commit in the ledger
  --partial N      Only process N new commits (combine with --fresh or --sync)
  --scope a,b,...  Override scope paths, comma-separated (default: KI_ROOT + GEMINI.md)
  --help           Show this message

Flag Combinations:
  --sync                  Safe incremental update (most common)
  --sync --partial 5      Test-run: process only the last 5 new commits
  --fresh                 Full rebuild from Genesis (replaces ledger)
  --fresh --partial 20    Rebuild from Genesis, limit to first 20 commits
  --fresh --scope path    Rebuild with a custom scope path

Notes:
  --fresh overrides --sync if both are passed.
  Without flags, the script defaults to --sync (safe incremental update).
`);
    process.exit(0);
}

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

// --- UTILS ---
function getLatestLedger(): { path: string; version: number; sync: number; data: LedgerData | null } {
    const files = fs.readdirSync(OUTPUT_DIR);
    const versionRegex = new RegExp(`${BASE_NAME}-v(\\d+)(?:_s(\\d+))?\\.json`);
    let maxVersion = 0;
    let maxSync = 0;
    let latestFile = '';

    for (const file of files) {
        const match = file.match(versionRegex);
        if (match) {
            const version = parseInt(match[1], 10);
            const sync = match[2] ? parseInt(match[2], 10) : 0;
            if (version > maxVersion || (version === maxVersion && sync > maxSync)) {
                maxVersion = version;
                maxSync = sync;
                latestFile = file;
            }
        }
    }

    if (!latestFile) return { path: '', version: 0, sync: 0, data: null };

    const fullPath = path.join(OUTPUT_DIR, latestFile);
    const raw = fs.readFileSync(fullPath, 'utf8');
    let parsed = JSON.parse(raw);

    // Legacy Fallback for v26.json (array instead of object)
    if (Array.isArray(parsed)) {
        console.log("ℹ️ Legacy ledger detected. Converting to metadata format.");
        const lastEpoch = parsed[parsed.length - 1];
        parsed = {
            metadata: {
                version: maxVersion,
                sync: maxSync,
                last_hash: extractHashFromLabel(lastEpoch?.label) ?? '',
                is_partial: false,
                scope: [KI_ROOT, GEMINI_RELATIVE] // Default assumption
            },
            epochs: parsed
        };
    }

    return {
        path: fullPath,
        version: maxVersion,
        sync: maxSync,
        data: parsed as LedgerData
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

    // --- SYNC LOGIC (default behaviour unless --fresh) ---
    if (!IS_FRESH && latest.data) {
        // Scope Verification
        const prevScope = latest.data.metadata.scope || [];
        if (JSON.stringify([...prevScope].sort()) !== JSON.stringify([...SCOPE_PATHS].sort())) {
            throw new Error(`⚠️ Scope mismatch! Current scope [${SCOPE_PATHS}] differs from ledger scope [${prevScope}]. Please run --fresh.`);
        }

        const lastEpoch = latest.data.epochs[latest.data.epochs.length - 1];
        startHash = extractHashFromLabel(lastEpoch.label);

        // Hash Integrity Check
        if (latest.data.metadata.last_hash && latest.data.metadata.last_hash !== startHash) {
            throw new Error(`⛔ Sync Aborted: Ledger metadata hash [${latest.data.metadata.last_hash}] does not match the actual last epoch hash [${startHash}].`);
        }

        console.log(`🔄 Sync active. Resuming from commit [${startHash}]...`);

        // Reconstruct LiveRegistry and State from existing ledger
        latest.data.epochs.forEach(epoch => {
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
        history = [...latest.data.epochs];
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
        console.log(`🔍 [${count}/${total}] ${commit.hash} | +${delta.addedNodes.length}n +${delta.addedLinks.length}l -${delta.removedNodes.length}n -${delta.removedLinks.length}l`);

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
    const isFresh = IS_FRESH || !latest.path;
    const isPartial = MAX_EPOCHS !== null && commitList.length >= MAX_EPOCHS;
    const suffix = isPartial ? '_p' : '';

    const outPath = isFresh
        ? path.join(OUTPUT_DIR, `${BASE_NAME}-v${latest.version + 1}${suffix}.json`)
        : path.join(OUTPUT_DIR, `${BASE_NAME}-v${latest.version}_s${latest.sync + 1}${suffix}.json`);

    const currentMetadata: LedgerMetadata = {
        version: isFresh ? latest.version + 1 : latest.version,
        sync: isFresh ? 0 : latest.sync + 1,
        last_hash: history[history.length - 1]?.label.match(/\[(.*?)\]/)?.[1] ?? '',
        is_partial: isPartial,
        scope: SCOPE_PATHS
    };

    const finalData: LedgerData = { metadata: currentMetadata, epochs: history };
    const compactedJson = serializeHistory(finalData);

    fs.writeFileSync(outPath, compactedJson);
    const outLabel = isFresh ? `v${currentMetadata.version} (fresh${suffix})` : `v${currentMetadata.version}_s${currentMetadata.sync}${suffix} (sync)`;
    console.log(`✅ Archaeology complete. Saved ${outLabel} → ${outPath}`);
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

        // Validate: target must be in current nodes, registry, or GEMINI.md
        if (nodes.has(link.target) || link.target === 'GEMINI.md' || registry.has(link.target)) {
            validLinks.add(lStr);
        } else {
            // Preserve unresolved links — re-tag as OTHER instead of pruning
            const otherKey = canonicalKey({ ...link, target_location: 'OTHER' });
            validLinks.add(otherKey);
        }
    });

    return { nodes, links: validLinks };
}

function extractIdFromFilePath(filePath: string): string | null {
    if (filePath === GEMINI_RELATIVE) return 'GEMINI.md';
    if (filePath.includes('SKILL.md')) {
        const parts = filePath.split(/[/\\]/);
        const artifactsIdx = parts.indexOf('artifacts');
        if (artifactsIdx > 0) return parts[artifactsIdx - 1];
        const skillIdx = parts.indexOf('SKILL.md');
        return skillIdx > 0 ? parts[skillIdx - 1] : null;
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

function serializeHistory(data: LedgerData): string {
    const metaStr = JSON.stringify(data.metadata, null, 2);
    const epochsStr = data.epochs.map(epoch => {
        const nodesAdded = epoch.delta.nodes.added
            .map(n => '          ' + JSON.stringify(n))
            .join(',\n');
        const nodesRemoved = JSON.stringify(epoch.delta.nodes.removed);
        const linksAdded = epoch.delta.links.added
            .map(l => ' ' + JSON.stringify(l))
            .join(', ');
        const linksRemoved = epoch.delta.links.removed
            .map(l => ' ' + JSON.stringify(l))
            .join(', ');

        const nodesBlock = nodesAdded.length > 0
            ? `[\n${nodesAdded}\n        ]`
            : '[]';
        const linksAddedBlock = linksAdded.length > 0 ? `[${linksAdded} ]` : '[]';
        const linksRemovedBlock = linksRemoved.length > 0 ? `[${linksRemoved} ]` : '[]';

        return `    {\n      "timestamp": ${JSON.stringify(epoch.timestamp)},\n      "label": ${JSON.stringify(epoch.label)},\n      "delta": { "nodes": { "added": ${nodesBlock}, "removed": ${nodesRemoved} }, "links": { "added": ${linksAddedBlock}, "removed": ${linksRemovedBlock} } }\n    }`;
    }).join(',\n');

    return `{\n  "metadata": ${metaStr},\n  "epochs": [\n${epochsStr}\n  ]\n}`;
}

runArchaeology().catch(console.error);
