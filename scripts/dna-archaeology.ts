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
const IS_DEEP = args.includes('--deep');

const partialIdx = args.indexOf('--partial');
const MAX_EPOCHS = partialIdx !== -1 ? parseInt(args[partialIdx + 1], 10) : null;

const scopeIdx = args.indexOf('--scope');
const SCOPE_PATHS = scopeIdx !== -1 ? args[scopeIdx + 1].split(',') : [KI_ROOT, GEMINI_RELATIVE];

// --- TYPES ---
interface KiNode {
    id: string;
    name: string;
    group: number;
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

/**
 * DNA Archaeology Protocol v0.4
 * Stateful Walk + Intent-Aware Extraction
 */
async function runArchaeology() {
    process.chdir(REPO_PATH);
    console.log('🏛️ Initializing DNA Archaeology v0.4 (Stateful Mode)...');

    const latest = getLatestLedger();
    let startHash: string | null = null;
    let liveRegistry = new Set<string>();
    let history: KiDiff[] = [];
    let prevGraph = { nodes: new Set<string>(), links: new Set<string>() };

    // --- SYNC LOGIC ---
    if (IS_SYNC && latest.data) {
        const lastEpoch = latest.data[latest.data.length - 1];
        startHash = extractHashFromLabel(lastEpoch.label);
        console.log(`🔄 Sync active. Resuming from commit [${startHash}]...`);

        // Reconstruct LiveRegistry from existing ledger
        latest.data.forEach(epoch => {
            epoch.delta.nodes.added.forEach(n => liveRegistry.add(n.id));
            epoch.delta.nodes.added.forEach(n => prevGraph.nodes.add(n.id));
            epoch.delta.links.added.forEach(l => prevGraph.links.add(JSON.stringify(l)));
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
    for (const commit of commitList) {
        console.log(`🔍 Epoch ${commit.hash} [${commit.date}]`);

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
        if (!id) continue;

        nodes.add(id);

        // Read content
        const content = execSync(`git show ${hash}:${filePath}`).toString();
        const registryList = Array.from(registry);

        // --- PHASE 1: Explicit MD Links ---
        const mdRegex = /\[(.*?)\]\((.*?)\)/g;
        let mMatch;
        while ((mMatch = mdRegex.exec(content)) !== null) {
            const rawLabel = mMatch[1];
            const targetPath = mMatch[2];
            if (targetPath.includes('SKILL.md')) {
                const target_location = targetPath.includes('spirit-research-lab') ? 'SRL' : 'DNA';

                // Clean label
                const label = rawLabel.replace(/[*#`[\]]/g, '').trim();

                // Advanced ID Extraction
                let targetId: string;

                // Detection: Is the label a clean ID and the target a path? (Flipped Link)
                const isPathLink = targetPath.includes('://') || targetPath.includes('/') || targetPath.includes('\\');
                const isLabelId = label.length > 0 && !label.includes('/') && !label.includes('\\') && !label.includes(' ') && label === label.toLowerCase() && /^[a-z_]+$/.test(label);

                if (isPathLink && isLabelId) {
                    targetId = label;
                } else {
                    // Extract from path: handle both forward and backslashes
                    const normalizedPath = targetPath.replace(/\\/g, '/');
                    const parts = normalizedPath.split('/');
                    const artifactsIdx = parts.indexOf('artifacts');

                    if (artifactsIdx > 0) {
                        targetId = parts[artifactsIdx - 1];
                    } else {
                        // Fallback: parent dir of SKILL.md
                        const skillIdx = parts.indexOf('SKILL.md');
                        targetId = (skillIdx > 0) ? parts[skillIdx - 1] : targetPath.replace(/.*[/\\]/, '').replace(/\..*$/, '');
                    }
                }

                links.add(JSON.stringify({
                    source: id,
                    target: targetId,
                    label: label,
                    target_location,
                    ref_type: 'formal'
                }));
            }
        }

        // --- PHASE 2: Anchored Bolds (Tiered) ---
        const anchoredRegex = /\*\*([a-z_]+)\*\*\s+(KI|workflow)/g;
        let aMatch;
        while ((aMatch = anchoredRegex.exec(content)) !== null) {
            const targetId = aMatch[1];
            const alreadyLinked = Array.from(links).some(l => JSON.parse(l).target === targetId);
            if (!alreadyLinked) {
                links.add(JSON.stringify({
                    source: id,
                    target: targetId,
                    label: targetId,
                    target_location: 'DNA',
                    ref_type: 'bold'
                }));
            }
        }

        // --- PHASE 3: Weak Reference Discovery (Registry Context) ---
        // Only if it's GEMINI.md OR --deep flag is on
        if (id === 'GEMINI.md' || IS_DEEP) {
            registryList.forEach(regId => {
                if (regId === id) return;
                const weakRegex = new RegExp(`\\b${regId}\\b`, 'g');
                if (weakRegex.test(content)) {
                    const alreadyLinked = Array.from(links).some(l => JSON.parse(l).target === regId);
                    if (!alreadyLinked) {
                        links.add(JSON.stringify({
                            source: id,
                            target: regId,
                            label: regId,
                            target_location: 'DNA',
                            ref_type: 'mention'
                        }));
                    }
                }
            });
        }
    }

    return { nodes, links };
}

function extractIdFromFilePath(filePath: string): string | null {
    if (filePath === GEMINI_RELATIVE) return 'GEMINI.md';
    if (filePath.includes('SKILL.md')) {
        const parts = filePath.split('/');
        return parts[parts.indexOf('artifacts') - 1] || null;
    }
    return null;
}

function computeDelta(prev: { nodes: Set<string>; links: Set<string> }, curr: { nodes: Set<string>; links: Set<string> }) {
    const addedNodes = Array.from(curr.nodes)
        .filter(n => !prev.nodes.has(n))
        .map(n => ({
            id: n,
            name: n,
            group: n === 'GEMINI.md' ? 999 : 0
        }));
    const removedNodes = Array.from(prev.nodes).filter(n => !curr.nodes.has(n));

    const currLinksList: KiLink[] = Array.from(curr.links).map(l => JSON.parse(l));
    const prevLinksList: KiLink[] = Array.from(prev.links).map(l => JSON.parse(l));

    const addedLinks = currLinksList.filter(l => !prevLinksList.some(p => p.source === l.source && p.target === l.target));
    const removedLinks = prevLinksList.filter(l => !currLinksList.some(c => c.source === l.source && c.target === l.target));

    return { addedNodes, removedNodes, addedLinks, removedLinks };
}

function compactGraphJson(json: string): string {
    return json
        .replace(/\{\n\s+"id": "(.*?)",\n\s+"name": "(.*?)",\n\s+"group": (.*?)\n\s+\}/g, '{ "id": "$1", "name": "$2", "group": $3 }')
        .replace(/\{\n\s+"source": "(.*?)",\n\s+"target": "(.*?)",\n\s+"label": "(.*?)",\n\s+"target_location": "(.*?)",\n\s+"ref_type": "(.*?)"\n\s+\}/g, '{ "source": "$1", "target": "$2", "label": "$3", "target_location": "$4", "ref_type": "$5" }')
        .replace(/"removed": \[\s+\]/g, '"removed": []')
        .replace(/"added": \[\s+\]/g, '"added": []');
}

runArchaeology().catch(console.error);
