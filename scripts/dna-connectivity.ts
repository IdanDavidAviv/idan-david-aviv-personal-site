import fs from 'fs';
import path from 'path';
// import { execSync } from 'child_process';

const KNOWLEDGE_DIR = 'C:/Users/Idan4/.gemini/antigravity/knowledge';
const GEMINI_PATH = 'C:/Users/Idan4/.gemini/GEMINI.md';
const SITE_DATA_PATH = 'src/visualizations/ki-network.ts';

interface KINode {
    id: string;
    path: string;
    links: string[];
}

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry');
const isFill = args.includes('--fill');

function extractLinks(content: string, isGemini: boolean = false): string[] {
    const links: string[] = [];
    if (isGemini) {
        const regex = /\*\*(.*?)\*\*/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            links.push(match[1]);
        }
    } else {
        const regex = /\[.*?\]\((\.\.\/\.\.\/(.*?)\/artifacts\/SKILL\.md)\)/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            links.push(match[2]);
        }
    }
    return [...new Set(links)];
}

function scanKIs(): KINode[] {
    const nodes: KINode[] = [];

    // 1. Scan GEMINI.md (Root Node)
    if (fs.existsSync(GEMINI_PATH)) {
        const content = fs.readFileSync(GEMINI_PATH, 'utf8');
        const links = extractLinks(content, true);
        nodes.push({ id: 'GEMINI.md', path: GEMINI_PATH, links });
    }

    // 2. Scan Knowledge Directory
    const entries = fs.readdirSync(KNOWLEDGE_DIR, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            const kiName = entry.name;
            const skillPath = path.join(KNOWLEDGE_DIR, kiName, 'artifacts', 'SKILL.md');
            if (fs.existsSync(skillPath)) {
                const content = fs.readFileSync(skillPath, 'utf8');
                const links = extractLinks(content);
                nodes.push({ id: kiName, path: skillPath, links });
            }
        }
    }

    const groundTruthIds = nodes.map(n => n.id);
    nodes.forEach(node => {
        node.links = node.links.filter(link => groundTruthIds.includes(link));
    });

    return nodes;
}

interface KiHistoryNode {
    id: string;
    name: string;
    group: number;
}

interface KiDelta {
    nodes: { added: KiHistoryNode[]; removed: string[] };
    links: { added: { source: string; target: string }[]; removed: { source: string; target: string }[] };
}

interface KiDiff {
    timestamp: string;
    label: string;
    delta: KiDelta;
}

function performSurgicalUpdate(groundTruthNodes: KINode[], dry: boolean) {
    const rawContent = fs.readFileSync(SITE_DATA_PATH, 'utf8');

    // --- PART 1: Parse Existing kiData ---
    const startDataMarker = 'const kiData: { nodes: KiNode[]; links: KiLink[] } = {';
    const startDataIndex = rawContent.indexOf(startDataMarker);
    if (startDataIndex === -1) {
        console.error('❌ Could not locate kiData declaration.');
        return;
    }

    // Logic to find the end of the ACTUAL data object block (ignoring type definition brackets)
    const findEndOfDataBlock = (content: string, startIndex: number): number => {
        if (startIndex === -1) return -1;
        const afterAssignment = content.indexOf('=', startIndex) + 1;
        if (afterAssignment === 0) return -1;

        // Skip to the first structural character ( { or [ )
        let i = afterAssignment;
        while (i < content.length && content[i] !== '{' && content[i] !== '[') {
            i++;
        }
        if (i >= content.length) return -1;

        const opener = content[i];
        const closer = opener === '{' ? '}' : ']';
        let bracketCount = 0;
        let started = false;

        for (; i < content.length; i++) {
            if (content[i] === opener) {
                bracketCount++;
                started = true;
            }
            if (content[i] === closer) {
                bracketCount--;
                if (started && bracketCount === 0) {
                    let end = i;
                    if (content[i + 1] === ';') end++;
                    return end;
                }
            }
        }
        return -1;
    };

    const endDataIndex = findEndOfDataBlock(rawContent, startDataIndex);
    if (endDataIndex === -1) {
        console.error('❌ Could not locate end of kiData block.');
        return;
    }

    // Extract current nodes and links for delta comparison
    const nodeDefRegex = /id:\s*'(.*?)'/g;
    const linkDefRegex = /source:\s*'(.*?)',\s*target:\s*'(.*?)'/g;

    const currentNodes: string[] = [];
    const currentLinks: { source: string; target: string }[] = [];

    const kiDataContent = rawContent.slice(startDataIndex, endDataIndex + 1);
    let nMatch;
    while ((nMatch = nodeDefRegex.exec(kiDataContent)) !== null) {
        currentNodes.push(nMatch[1]);
    }
    let lMatch;
    while ((lMatch = linkDefRegex.exec(kiDataContent)) !== null) {
        currentLinks.push({ source: lMatch[1], target: lMatch[2] });
    }

    // Capture existing groups from the FULL file (to preserve manual triaging)
    const groupDefRegex = /id:\s*'(.*?)',\s*name:\s*'.*?',\s*group:\s*(\d+)/g;
    const existingGroups: Record<string, number> = {};
    let gMatch;
    while ((gMatch = groupDefRegex.exec(rawContent)) !== null) {
        existingGroups[gMatch[1]] = parseInt(gMatch[2], 10);
    }

    // --- PART 2: Compute Delta ---
    const newNodes = groundTruthNodes.map(n => n.id);
    const newLinks = groundTruthNodes.flatMap(n => n.links.map(t => ({ source: n.id, target: t })));

    const addedNodeIds = newNodes.filter(n => !currentNodes.includes(n));
    const removedNodes = currentNodes.filter(n => !newNodes.includes(n));

    const addedLinks = newLinks.filter(nl => !currentLinks.some(cl => cl.source === nl.source && cl.target === nl.target));
    const removedLinks = currentLinks.filter(cl => !newLinks.some(nl => nl.source === cl.source && nl.target === cl.target));

    // Construct full objects for additions
    const addedNodesObjects = groundTruthNodes
        .filter(n => addedNodeIds.includes(n.id))
        .map(n => ({
            id: n.id,
            name: n.id,
            group: n.id === 'GEMINI.md' ? 999 : (existingGroups[n.id] ?? 0)
        }));

    const hasChanges = addedNodeIds.length > 0 || removedNodes.length > 0 || addedLinks.length > 0 || removedLinks.length > 0;

    // --- PART 3: Generate New kiData ---
    const nodesArray = groundTruthNodes
        .sort((a, b) => a.id.localeCompare(b.id))
        .map(n => {
            const defaultGroup = n.id === 'GEMINI.md' ? 999 : 0;
            const group = n.id === 'GEMINI.md' ? 999 : (existingGroups[n.id] ?? defaultGroup);
            return `        { id: '${n.id}', name: '${n.id}', group: ${group} },`;
        });

    const linksArray = [...new Set(newLinks.map(l => `        { source: '${l.source}', target: '${l.target}' },`))].sort();

    const newKiDataLines = [
        startDataMarker,
        '    nodes: [',
        '        // Root & Synchronized DNA Nodes',
        ...nodesArray,
        '    ],',
        '    links: [',
        '        // Automated Bridges',
        ...linksArray,
        '    ],',
        '};'
    ];
    const newKiDataContent = newKiDataLines.join('\n');

    // --- PART 4: Update kiHistory ---
    const historyStartMarker = 'export const kiHistory: KiDiff[] = [';
    const historyStartIndex = rawContent.indexOf(historyStartMarker);
    let existingHistoryContent = '';

    if (historyStartIndex !== -1) {
        const historyEndIndex = findEndOfDataBlock(rawContent, historyStartIndex);
        existingHistoryContent = rawContent.slice(historyStartIndex + historyStartMarker.length, historyEndIndex).trim();
    }

    let newEntry = '';
    if (hasChanges) {
        const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
        const deltaObj: KiDiff = {
            timestamp,
            label: `Auto-Sync: ${addedNodeIds.length} nodes, ${addedLinks.length} edges`,
            delta: {
                nodes: { added: addedNodesObjects, removed: removedNodes },
                links: { added: addedLinks, removed: removedLinks }
            }
        };
        newEntry = `    ${JSON.stringify(deltaObj, null, 4)},`.replace(/\n/g, '\n    ');
    }

    const finalHistoryContent = hasChanges
        ? (existingHistoryContent ? `${existingHistoryContent}\n${newEntry}` : newEntry)
        : existingHistoryContent;

    const newHistoryBlock = `${historyStartMarker}\n${finalHistoryContent}\n];`;

    // --- PART 5: Construct Final File ---
    let updatedContent = rawContent.slice(0, startDataIndex) + newKiDataContent + rawContent.slice(endDataIndex + 1);

    // Update or Append History
    if (historyStartIndex !== -1) {
        // Find fresh indices in the ALREADY updatedContent (since indices shifted)
        const freshHistoryStart = updatedContent.indexOf(historyStartMarker);
        const freshHistoryEnd = findEndOfDataBlock(updatedContent, freshHistoryStart);
        updatedContent = updatedContent.slice(0, freshHistoryStart) + newHistoryBlock + updatedContent.slice(freshHistoryEnd + 1);
    }
    else {
        // Append to end of file if not present
        updatedContent = updatedContent.trim() + '\n\n' + newHistoryBlock + '\n';
    }

    if (dry) {
        console.log('\n--- DNA Connectivity DRY RUN (with History) ---');
        const tempPath = SITE_DATA_PATH + '.tmp';
        fs.writeFileSync(tempPath, updatedContent);
        console.log(`💡 Temporary file saved: ${tempPath}`);
        console.log(`📊 Changes Detected: ${hasChanges ? 'YES' : 'NO'}`);
        if (hasChanges) {
            console.log(`   + Nodes: ${addedNodeIds.join(', ')}`);
            console.log(`   - Nodes: ${removedNodes.join(', ')}`);
            console.log(`   + Edges: ${addedLinks.length}`);
            console.log(`   - Edges: ${removedLinks.length}`);
        }
    } else {
        fs.writeFileSync(SITE_DATA_PATH, updatedContent);
        console.log('✅ kiData and kiHistory synchronized.');
    }
}

const groundTruth = scanKIs();
if (isFill) {
    performSurgicalUpdate(groundTruth, false);
} else if (isDryRun) {
    performSurgicalUpdate(groundTruth, true);
} else {
    // Default report
    console.log(`Total Knowledge Items: ${groundTruth.length}`);
    groundTruth.forEach(n => {
        console.log(`- ${n.id} (${n.links.length} links)`);
        n.links.forEach(link => console.log(`    -> ${link}`));
    });
}
