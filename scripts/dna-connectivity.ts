import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

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

function performSurgicalUpdate(groundTruthNodes: KINode[], dry: boolean) {
    const rawContent = fs.readFileSync(SITE_DATA_PATH, 'utf8');

    // Identify kiData block
    const startMarker = 'const kiData: { nodes: KiNode[]; links: KiLink[] } = {';
    const startIndex = rawContent.indexOf(startMarker);

    if (startIndex === -1) {
        console.error('❌ Could not locate kiData declaration.');
        return;
    }

    const searchFrom = startIndex + startMarker.length;
    let bracketCount = 1;
    let endIndex = -1;

    for (let i = searchFrom; i < rawContent.length; i++) {
        if (rawContent[i] === '{') bracketCount++;
        if (rawContent[i] === '}') {
            bracketCount--;
            if (bracketCount === 0) {
                endIndex = i;
                if (rawContent[i + 1] === ';') endIndex++;
                break;
            }
        }
    }

    if (endIndex === -1) {
        console.error('❌ Could not locate end of kiData block.');
        return;
    }

    // Capture existing groups
    const nodeDefRegex = /id:\s*'(.*?)',\s*name:\s*'.*?',\s*group:\s*(\d+)/g;
    const existingGroups: Record<string, number> = {};
    let match;
    while ((match = nodeDefRegex.exec(rawContent)) !== null) {
        existingGroups[match[1]] = parseInt(match[2], 10);
    }

    // Generate new kiData lines
    // Group 999: Root Hub (GEMINI.md)
    // Group 0: Ghosts (Untriaged/New KIs)
    // Group 1: Antigravity DNA (Core Protocols)
    // Group 2: Personal Site (Visualization Sync)
    // Group 3: Spirit Research Lab (Infra/Zero Proxy)
    const nodesArray = groundTruthNodes
        .sort((a, b) => a.id.localeCompare(b.id))
        .map(n => {
            const defaultGroup = n.id === 'GEMINI.md' ? 999 : 0;
            const group = n.id === 'GEMINI.md' ? 999 : (existingGroups[n.id] ?? defaultGroup);
            return `        { id: '${n.id}', name: '${n.id}', group: ${group} },`;
        });

    const linksArray = groundTruthNodes
        .flatMap(node => node.links
            .map(target => `        { source: '${node.id}', target: '${target}' },`)
        )
        .sort();

    const newKiDataLines = [
        startMarker,
        '    nodes: [',
        '        // Root & Synchronized DNA Nodes',
        '        // Convention: 999=Root, 0=Ghosts (Untriaged)',
        ...nodesArray,
        '    ],',
        '    links: [',
        '        // Automated Bridges',
        ...[...new Set(linksArray)],
        '    ],',
        '};'
    ];
    const newKiDataContent = newKiDataLines.join('\n');
    const updatedContent = rawContent.slice(0, startIndex) + newKiDataContent + rawContent.slice(endIndex + 1);

    if (dry) {
        console.warn('\n--- DNA Connectivity DRY RUN (Surgical) ---');
        const tempPath = SITE_DATA_PATH + '.tmp';
        fs.writeFileSync(tempPath, updatedContent);

        console.warn(`✅ GEMINI.md existing: ${nodesArray.find(l => l.includes("'GEMINI.md'"))?.includes('group: 999') ? 'VERIFIED' : 'FAILED'}`);
        console.warn(`💡 Temporary file saved: ${tempPath}`);

        console.warn('\n--- FULL SURGICAL DIFF ---');
        try {
            // Note: --no-index allows diffing files outside of git tracking or comparing untracked files
            const diff = execSync(`git diff --no-index --color "${SITE_DATA_PATH}" "${tempPath}"`).toString();
            console.warn(diff);
        } catch (e: unknown) {
            // git diff returns exit 1 if there's a difference
            const err = e as { stdout?: Buffer; stderr?: Buffer };
            if (err.stdout) {
                console.warn(err.stdout.toString());
            } else if (err.stderr) {
                console.error(`❌ Diff command failed: ${err.stderr.toString()}`);
            }
        }
    } else {
        fs.writeFileSync(SITE_DATA_PATH, updatedContent);
        const tempPath = SITE_DATA_PATH + '.tmp';
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
            console.warn(`🧹 Cleaned up: ${tempPath}`);
        }
        console.warn('✅ kiData surgically synchronized.');
    }
}

const groundTruth = scanKIs();
if (isFill) {
    performSurgicalUpdate(groundTruth, false);
} else if (isDryRun) {
    performSurgicalUpdate(groundTruth, true);
} else {
    // Default report
    console.warn(`Total Knowledge Items: ${groundTruth.length}`);
    groundTruth.forEach(n => {
        console.warn(`- ${n.id} (${n.links.length} links)`);
        n.links.forEach(link => console.warn(`    -> ${link}`));
    });
}
