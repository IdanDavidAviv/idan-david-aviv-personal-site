import * as fs from 'fs';
import * as path from 'path';

const REPO_PATH = 'C:\\Users\\Idan4\\.gemini';
const OUTPUT_DIR = 'C:\\Users\\Idan4\\OneDrive\\Desktop\\idan-david-aviv-personal-site\\src\\visualizations';
const BASE_NAME = 'dna-history-backfill';
const KI_ROOT = 'antigravity/knowledge';

function getLatestLedger() {
    const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.startsWith(BASE_NAME) && f.endsWith('.json'));
    const sorted = files.sort((a, b) => {
        const vA = parseInt(a.match(/-v(\d+)\./)?.[1] || '0');
        const vB = parseInt(b.match(/-v(\d+)\./)?.[1] || '0');
        return vB - vA;
    });
    const latest = sorted[0];
    if (!latest) throw new Error('No ledger found');
    return { path: path.join(OUTPUT_DIR, latest), version: latest.match(/-v(\d+)\./)?.[1], filename: latest };
}

function audit() {
    const { path: ledgerPath, version, filename } = getLatestLedger();
    console.log(`🔍 Auditing DNA Ledger ${filename} (v${version})...`);
    const data = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));

    const ledgerNodes = new Set<string>();
    const ledgerLinks = new Set<string>();
    let totalAddedNodes = 0;
    let totalRemovedNodes = 0;
    let totalAddedLinks = 0;
    let totalRemovedLinks = 0;

    data.forEach(epoch => {
        // Nodes
        epoch.delta.nodes.added.forEach(n => {
            ledgerNodes.add(n.id);
            totalAddedNodes++;
        });
        if (epoch.delta.nodes.removed) {
            epoch.delta.nodes.removed.forEach(id => {
                if (!ledgerNodes.has(id)) {
                    console.warn(`⚠️ Attempted to remove non-existent node: ${id} at epoch ${epoch.label}`);
                }
                ledgerNodes.delete(id);
                totalRemovedNodes++;
            });
        }
        // Links
        epoch.delta.links.added.forEach(l => {
            const key = `${l.source}|${l.target}|${l.label}|${l.ref_type}`;
            ledgerLinks.add(key);
            totalAddedLinks++;
        });
        if (epoch.delta.links.removed) {
            epoch.delta.links.removed.forEach(l => {
                const key = `${l.source}|${l.target}|${l.label}|${l.ref_type}`;
                if (!ledgerLinks.has(key)) {
                    console.warn(`⚠️ Attempted to remove non-existent link: ${key} at epoch ${epoch.label}`);
                }
                ledgerLinks.delete(key);
                totalRemovedLinks++;
            });
        }
    });

    // Check disk
    const diskNodes = new Set<string>();

    // Check GEMINI
    if (fs.existsSync(path.join(REPO_PATH, 'GEMINI.md'))) {
        diskNodes.add('GEMINI.md');
    }

    function walk(dir: string) {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
            } else if (file === 'SKILL.md') {
                const parts = fullPath.split(path.sep);
                const artIdx = parts.indexOf('artifacts');
                if (artIdx > 0) {
                    diskNodes.add(parts[artIdx - 1]);
                } else {
                    diskNodes.add(parts[parts.length - 2]);
                }
            }
        });
    }

    walk(path.join(REPO_PATH, KI_ROOT));

    console.log(`--- Cumulative History Audit ---`);
    console.log(`Nodes: +${totalAddedNodes} | -${totalRemovedNodes} | Net: ${totalAddedNodes - totalRemovedNodes}`);
    console.log(`Links: +${totalAddedLinks} | -${totalRemovedLinks} | Net: ${totalAddedLinks - totalRemovedLinks}`);
    console.log(`-------------------------------`);

    console.log(`📊 Ledger Nodes (Net): ${ledgerNodes.size}`);
    console.log(`📂 Disk Nodes: ${diskNodes.size}`);

    const zombies = [...ledgerNodes].filter(n => !diskNodes.has(n));
    const ghosts = [...diskNodes].filter(n => !ledgerNodes.has(n));

    if (zombies.length > 0) {
        console.log(`🧟 ZOMBIES (In Ledger but NOT on Disk):`, zombies);
    }
    if (ghosts.length > 0) {
        console.log(`👻 GHOSTS (On Disk but NOT in Ledger):`, ghosts);
    }

    if (zombies.length === 0 && ghosts.length === 0) {
        console.log('✅ DNA Cumulative Integrity matches Physical Reality.');
    } else {
        console.log(`❌ DNA Inconsistency detected: ${zombies.length} zombies, ${ghosts.length} ghosts.`);
    }
}

try {
    audit();
} catch (e) {
    console.error(e);
}
