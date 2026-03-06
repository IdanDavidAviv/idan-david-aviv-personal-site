import kiGroupsRegistry from './ki-groups.json';
import externalNodeRegistry from './external-node-refs.json';
import { KiNode, KiLink, NodeStyle, LinkStyle } from './ki-network-types';

// Combine registries for lookup
const groupLookup: Record<string, number> = {
    ...kiGroupsRegistry,
    ...externalNodeRegistry
};

export const THEME = {
    colors: {
        genesis: '#00008b',
        core: '#fbbf24',
        other: '#22d3ee',
        srl: '#a855f7',
        meta: '#94a3b8',
        missing: '#ef4444',
        text: {
            genesis: '#a4d5f8',
            core: '#78350f',
            srl: '#f3e8ff',
            meta: '#f8fafc',
            other: '#083344',
            light: '#ffffff',
            dark: '#0f172a'
        }
    },
    sizes: {
        genesis: 18,
        core: 10,
        srl: 10,
        meta: 8,
        other: 8
    },
    opacity: {
        genesis: 1.0,
        core: 0.9,
        srl: 0.7,
        meta: 0.3,
        other: 0.9
    }
};

export function getNodeGroup(id: string): number {
    if (id === 'GEMINI.md') return 999;
    return groupLookup[id] !== undefined ? groupLookup[id] : 0;
}

export function getNodeStyle(id: string): NodeStyle {
    const group = getNodeGroup(id);
    const isMissing = !groupLookup[id] && id !== 'GEMINI.md' && !id.includes('.md');

    let color = THEME.colors.other;
    let textColor = THEME.colors.text.other;
    let size = THEME.sizes.other;
    let opacity = THEME.opacity.other;

    if (group === 999) {
        color = THEME.colors.genesis;
        textColor = THEME.colors.text.genesis;
        size = THEME.sizes.genesis;
        opacity = THEME.opacity.genesis;
    } else if (group === 1) {
        color = THEME.colors.core;
        textColor = THEME.colors.text.core;
        size = THEME.sizes.core;
        opacity = THEME.opacity.core;
    } else if (group === 3) {
        color = THEME.colors.srl;
        textColor = THEME.colors.text.srl;
        size = THEME.sizes.srl;
        opacity = THEME.opacity.srl;
    } else if (group === 0) {
        color = THEME.colors.meta;
        textColor = THEME.colors.text.meta;
        size = THEME.sizes.meta;
        opacity = THEME.opacity.meta;
    } else if (isMissing) {
        color = THEME.colors.missing;
        textColor = THEME.colors.text.light;
    }

    return { color, textColor, size, opacity, isMissing, group };
}

export function getLinkStyle(link: KiLink, is3D = true): LinkStyle {
    const targetId = typeof link.target === 'object' ? (link.target as KiNode).id : link.target as string;
    const sourceId = typeof link.source === 'object' ? (link.source as KiNode).id : link.source as string;

    const targetGroup = getNodeGroup(targetId);
    const sourceGroup = getNodeGroup(sourceId);

    // Color logic
    let color = THEME.colors.missing; // default to red/missing
    if (sourceGroup === 999 || targetGroup === 999) {
        color = '#2563eb'; // Genesis blue
    } else if (link.target_location === 'SRL' || targetGroup === 3) {
        color = THEME.colors.srl;
    } else if (link.target_location === 'DNA') {
        if (targetGroup === 1) color = THEME.colors.core;
        else if (targetGroup === 0) color = THEME.colors.meta;
        else color = THEME.colors.other;
    } else if (link.target_location === 'OTHER') {
        color = THEME.colors.meta;
    }

    // Width logic
    let width = link.ref_type === 'formal' ? 4.0 : (link.ref_type === 'bold' ? 2.0 : 1.0);
    if (is3D) {
        width = link.ref_type === 'formal' ? 4.0 : (link.ref_type === 'bold' ? 2.0 : 1.0);
    }

    // Convert to RGBA for consistency where needed
    const rgba = color.startsWith('#') ? `${color}cc` : color; // simple alpha for now

    return { color, rgba, width };
}
