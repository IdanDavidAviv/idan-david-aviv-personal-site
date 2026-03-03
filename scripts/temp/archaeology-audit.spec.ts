import { describe, it, expect } from 'vitest';

/**
 * Mocking the DNA Archaeology Extraction Logic
 * to verify the 'ref_type' tiering.
 */

interface KiLink {
    source: string;
    target: string;
    label?: string;
    ref_type: 'formal' | 'bold' | 'mention';
}

function mockExtract(content: string, registry: Set<string>, id: string = 'test_source'): KiLink[] {
    const links = new Set<string>();

    // Pass 1: Formal MD
    const mdRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let mdMatch;
    while ((mdMatch = mdRegex.exec(content)) !== null) {
        const label = mdMatch[1];
        const targetPath = mdMatch[2].replace(/\\/g, '/');
        const parts = targetPath.split('/');
        let targetId: string;

        const artifactsIdx = parts.indexOf('artifacts');
        if (artifactsIdx > 0) {
            targetId = parts[artifactsIdx - 1];
        } else {
            const skillIdx = parts.indexOf('SKILL.md');
            targetId = (skillIdx >= 0 && skillIdx > 0) ? parts[skillIdx - 1] : targetPath.split('/').pop()?.replace(/\..*$/, '') || targetPath;
        }

        links.add(JSON.stringify({
            source: id,
            target: targetId,
            label,
            ref_type: 'formal'
        }));
    }

    // Pass 2: Bold Anchored
    const boldRegex = /\*\*([a-z_]+)\*\*\s+(KI|workflow)/g;
    let boldMatch;
    while ((boldMatch = boldRegex.exec(content)) !== null) {
        const targetId = boldMatch[1];
        const alreadyLinked = Array.from(links).some(l => JSON.parse(l).target === targetId);
        if (!alreadyLinked) {
            links.add(JSON.stringify({
                source: id,
                target: targetId,
                label: targetId,
                ref_type: 'bold'
            }));
        }
    }

    // Pass 3: Mentions
    const registryList = Array.from(registry);
    for (const targetId of registryList) {
        if (targetId === id) continue;
        const mentionRegex = new RegExp(`\\b${targetId}\\b`, 'g');
        if (mentionRegex.test(content)) {
            const alreadyLinked = Array.from(links).some(l => JSON.parse(l).target === targetId);
            if (!alreadyLinked) {
                links.add(JSON.stringify({
                    source: id,
                    target: targetId,
                    label: targetId,
                    ref_type: 'mention'
                }));
            }
        }
    }

    return Array.from(links).map(l => JSON.parse(l));
}

describe('Archaeology Integrity Audit (ref_type Tiering)', () => {
    const registry = new Set(['operation_commander', 'privacy_shield', 'context_planning']);

    it('should prioritize Formal Markdown links (Shadowing)', () => {
        const content = 'Check the [commander](../../operation_commander/artifacts/SKILL.md) and mention operation_commander casually.';
        const result = mockExtract(content, registry);

        expect(result).toHaveLength(1);
        expect(result[0].ref_type).toBe('formal');
        expect(result[0].target).toBe('operation_commander');
    });

    it('should classify bolded patterns as Bold links', () => {
        const content = 'Implement the **privacy_shield** KI logic.';
        const result = mockExtract(content, registry);

        expect(result).toHaveLength(1);
        expect(result[0].ref_type).toBe('bold');
        expect(result[0].target).toBe('privacy_shield');
    });

    it('should classify residual mentions as Mention links', () => {
        const content = 'According to the context_planning, we proceed.';
        const result = mockExtract(content, registry);

        expect(result).toHaveLength(1);
        expect(result[0].ref_type).toBe('mention');
        expect(result[0].target).toBe('context_planning');
    });

    it('should respect word boundaries for mentions', () => {
        const content = 'We have the commander of the operation here.';
        const result = mockExtract(content, registry);

        expect(result).toHaveLength(0); // Should not match 'commander' inside 'operation_commander'
    });

    it('should handle complex multi-tier mixtures', () => {
        const content = `
            Formal link: [Commander](operation_commander)
            Bold link: **privacy_shield** KI
            Mention: context_planning
        `;
        const result = mockExtract(content, registry);

        expect(result).toHaveLength(3);
        const formal = result.find(r => r.ref_type === 'formal');
        const bold = result.find(r => r.ref_type === 'bold');
        const mention = result.find(r => r.ref_type === 'mention');

        expect(formal?.target).toBe('operation_commander');
        expect(bold?.target).toBe('privacy_shield');
        expect(mention?.target).toBe('context_planning');
    });
});
