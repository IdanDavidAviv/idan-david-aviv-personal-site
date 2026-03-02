import { execSync } from 'child_process';
import * as fs from 'fs';

// --- CONFIGURATION ---
const REPO_PATH = 'C:\\Users\\Idan4\\.gemini';
const KI_ROOT = 'antigravity/knowledge';
const OUTPUT_DIR = 'C:\\Users\\Idan4\\OneDrive\\Desktop\\idan-david-aviv-personal-site\\src\\visualizations';
const BASE_NAME = 'dna-history-backfill';

// --- AUTO-INCREMENT LOGIC ---
function getNextVersionPath(): string {
    const files = fs.readdirSync(OUTPUT_DIR);
    const versionRegex = new RegExp(`${BASE_NAME}-v(\\d+)\\.json`);
    let maxVersion = 0;

    for (const file of files) {
        const match = file.match(versionRegex);
        if (match) {
            const version = parseInt(match[1], 10);
            if (version > maxVersion) maxVersion = version;
        }
    }

    return `${OUTPUT_DIR}\\${BASE_NAME}-v${maxVersion + 1}.json`;
}

const OUTPUT_PATH = getNextVersionPath();

// --- CLI ARGUMENTS ---
const args = process.argv.slice(2);
const partialIdx = args.indexOf('--partial');
const MAX_EPOCHS = partialIdx !== -1 ? parseInt(args[partialIdx + 1], 10) : null;

interface KiNode {
    id: string;
    name: string;
    group: number;
}

interface KiLink {
    source: string;
    target: string;
    label?: string;
    target_location?: 'DNA' | 'SRL';
}

interface KiDiff {
    timestamp: string;
    label: string;
    delta: {
        nodes: { added: KiNode[]; removed: string[] };
        links: { added: KiLink[]; removed: KiLink[] };
    };
}

/**
 * DNA Archaeology Protocol v0.1
 * Reconstructs the KI Graph by analyzing Git history.
 */
async function runArchaeology() {
    process.chdir(REPO_PATH);
    console.log('🏛️ Initializing DNA Archaeology...');

    // 1. Get all commits touching the KI directory (using ISO-8601 for full Date + Time)
    const commitList = execSync(`git log --reverse --pretty=format:"%h|%aI|%s" -- ${KI_ROOT}`)
        .toString()
        .split('\n')
        .map(line => {
            const [hash, date, message] = line.split('|');
            return { hash, date, message };
        });

    if (MAX_EPOCHS) {
        commitList.splice(MAX_EPOCHS);
        console.log(`⚠️ Partial run active: Limiting to first ${MAX_EPOCHS} epochs.`);
    }

    console.log(`📊 Found ${commitList.length} total epochs. Commencing Historical Reconstruction.`);

    const history: KiDiff[] = [];
    let prevGraph = { nodes: new Set<string>(), links: new Set<string>() };

    for (const commit of commitList) {
        console.log(`🔍 Analyzing Epoch ${commit.hash} [${commit.date}]`);

        // Extract nodes and links at this specific point in time
        const currentGraph = await extractGraphAtCommit(commit.hash);
        const delta = computeDelta(prevGraph, currentGraph);

        // Always push to maintain strict commit-by-commit history as requested
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

    // Save with minimal indentation and custom compaction for arrays
    const rawJson = JSON.stringify(history, null, 2);
    // Compact node/link objects to single lines for "Visual Tightness"
    const compactedJson = rawJson
        .replace(/\{\n\s+"id": "(.*?)",\n\s+"name": "(.*?)",\n\s+"group": (.*?)\n\s+\}/g, '{ "id": "$1", "name": "$2", "group": $3 }')
        .replace(/\{\n\s+"source": "(.*?)",\n\s+"target": "(.*?)",\n\s+"label": "(.*?)",\n\s+"target_location": "(.*?)"\n\s+\}/g, '{ "source": "$1", "target": "$2", "label": "$3", "target_location": "$4" }')
        .replace(/"removed": \[\s+\]/g, '"removed": []') // Tighten empty arrays
        .replace(/"added": \[\s+\]/g, '"added": []');   // Tighten empty arrays

    fs.writeFileSync(OUTPUT_PATH, compactedJson);
    console.log(`✅ Backfill complete. Saved to ${OUTPUT_PATH}`);
}

async function extractGraphAtCommit(hash: string) {
    const nodes = new Set<string>();
    const links = new Set<string>();

    // List all SKILL.md files at this commit
    const files = execSync(`git ls-tree -r ${hash} -- ${KI_ROOT}`)
        .toString()
        .split('\n')
        .filter(l => l.includes('artifacts/SKILL.md'));

    for (const line of files) {
        const filePath = line.split('\t')[1];
        const slug = filePath.split('/')[2];
        nodes.add(slug);

        // Read content of SKILL.md at this commit
        const content = execSync(`git show ${hash}:${filePath}`).toString();

        // Refined Regex: Broad MD-style intercept [...] (path)
        const mdLinkRegex = /\[(.*?)\]\((.*?)\)/g;
        let match;
        while ((match = mdLinkRegex.exec(content)) !== null) {
            const rawLabel = match[1];
            const targetPath = match[2];

            // Filter for KI links (containing SKILL.md)
            if (targetPath.includes('SKILL.md')) {
                const target_location = targetPath.includes('spirit-research-lab') ? 'SRL' : 'DNA';

                const finalLabel = rawLabel.replace(/[*#`[\]]/g, '').trim(); // Sanitize label (keep underscores)

                // Identify "flipped" links where target is a URL and label is a clean ID
                const isPathLink = targetPath.includes('://') || targetPath.includes('/') || targetPath.includes('\\');
                const isLabelId = rawLabel.length > 0 && !rawLabel.includes('/') && !rawLabel.includes('\\') && !rawLabel.includes(' ') && rawLabel === rawLabel.toLowerCase();

                let targetSlug: string;
                if (isPathLink && isLabelId) {
                    targetSlug = rawLabel;
                } else {
                    // Standard Extraction from path
                    const slugMatch = targetPath.match(/([^/]+)\/(?:artifacts\/)?SKILL\.md/);
                    targetSlug = slugMatch ? slugMatch[1] : targetPath;

                    // Final cleanup if it's still an absolute path
                    if (targetSlug.includes('://') || targetSlug.includes('/') || targetSlug.includes('\\')) {
                        const parts = targetSlug.split(/[/\\]/);
                        const leaf = parts[parts.length - 1];
                        targetSlug = (leaf === 'SKILL.md') ? parts[parts.length - 2] : leaf.replace(/\..*$/, '');
                    }
                }

                // Standardized output: source, target, target_location, label
                links.add(JSON.stringify({
                    source: slug,
                    target: targetSlug,
                    label: finalLabel,
                    target_location
                }));
            }
        }
    }

    return { nodes, links };
}

function computeDelta(prev: { nodes: Set<string>; links: Set<string> }, curr: { nodes: Set<string>; links: Set<string> }) {
    const addedNodes = Array.from(curr.nodes).filter(n => !prev.nodes.has(n)).map(n => ({ id: n, name: n, group: 0 }));
    const removedNodes = Array.from(prev.nodes).filter(n => !curr.nodes.has(n));

    const currLinksList: KiLink[] = Array.from(curr.links).map(l => JSON.parse(l));
    const prevLinksList: KiLink[] = Array.from(prev.links).map(l => JSON.parse(l));

    const addedLinks = currLinksList.filter(l => !prevLinksList.some(p => p.source === l.source && p.target === l.target));
    const removedLinks = prevLinksList.filter(l => !currLinksList.some(c => c.source === l.source && c.target === l.target));

    return {
        addedNodes,
        removedNodes,
        addedLinks,
        removedLinks
    };
}

runArchaeology().catch(console.error);
