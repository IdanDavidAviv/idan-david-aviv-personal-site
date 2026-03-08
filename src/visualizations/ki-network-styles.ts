import kiGroupsRegistry from './ki-groups.json';
import externalNodeRegistry from './external-node-refs.json';
import { KiNode, KiLink, NodeStyle, LinkStyle } from './ki-network-types';

const groupLookup: Record<string, number> = {
    ...kiGroupsRegistry,
    ...externalNodeRegistry
};

declare global {
    interface Window {
        __DEBUG_STYLE_LINK?: string;
    }
}

/**
 * Resolves a CSS variable to its value.
 * Since some variables are stored as RGB triplets (e.g., "59 130 246"),
 * we handle both direct values and triplet conversion.
 */
function resolveCssVar(name: string, fallback: string): string {
    if (typeof window === 'undefined') return fallback;
    const root = document.documentElement;
    const value = getComputedStyle(root).getPropertyValue(name).trim();
    
    // Internal Registry for deep debugging
    if (!(window as any).__DNA_THEME_REGISTRY) (window as any).__DNA_THEME_REGISTRY = {};
    
    if (!value) {
        (window as any).__DNA_THEME_REGISTRY[name] = `FALLBACK: ${fallback}`;
        return fallback;
    }
    
    // Handle modern space-separated triplets (e.g. "48 185 242")
    const parts = value.split(/[\s,]+/).filter(Boolean);
    if (parts.length === 3 && parts.every(p => !isNaN(Number(p)))) {
        const rgb = `rgb(${parts.join(',')})`;
        (window as any).__DNA_THEME_REGISTRY[name] = rgb;
        return rgb;
    }
    
    (window as any).__DNA_THEME_REGISTRY[name] = value;
    return value;
}

export const THEME = {
    get colors() {
        return {
            genesis: resolveCssVar('--idan-david-aviv-blue-genesis', '#00008b'),
            core: resolveCssVar('--idan-david-aviv-gold', '#fbbf24'),
            other: resolveCssVar('--idan-david-aviv-cyan', '#22d3ee'),
            srl: resolveCssVar('--idan-david-aviv-purple', '#a855f7'),
            meta: resolveCssVar('--idan-david-aviv-slate', '#94a3b8'),
            missing: resolveCssVar('--idan-david-aviv-red', '#ef4444'),
            text: {
                genesis: '#a4d5f8',
                core: '#78350f',
                srl: '#f3e8ff',
                meta: '#f8fafc',
                other: '#083344',
                light: '#ffffff',
                dark: '#0f172a'
            }
        };
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
    
    // Priority 1: Genesis links
    if (sourceGroup === 999 || targetGroup === 999) {
        color = THEME.colors.genesis; 
    } 
    // Priority 2: SRL / External (Purple)
    else if (link.target_location === 'SRL' || targetGroup === 3) {
        color = THEME.colors.srl;
    } 
    // Priority 3: Core (Gold)
    else if (targetGroup === 1 || link.target_location === 'DNA' && targetGroup === 1) {
        color = THEME.colors.core;
    }
    // Priority 4: Other KIs (Cyan)
    else if (targetGroup === 2 || link.target_location === 'DNA' && targetGroup === 2) {
        color = THEME.colors.other;
    }
    // Priority 5: Meta / Undefined (Slate)
    else if (targetGroup === 0 || link.target_location === 'OTHER' || link.target_location === 'DNA' && targetGroup === 0) {
        color = THEME.colors.meta;
    }

    // Width logic
    const refType = link.ref_type || 'mention';
    let width = (refType === 'formal' || refType === 'explicit') ? 4.0 : (refType === 'bold' ? 2.0 : 1.0);
    
    // 3D might need a slight scale boost if user feels they are too thin
    if (is3D) {
        width = width * 1.25; // Calibrated for 3D visibility in dark theme
    }

    // Convert to RGBA for consistency where needed
    const rgba = color.startsWith('rgb') ? color.replace('rgb', 'rgba').replace(')', ', 0.8)') : (color.startsWith('#') ? `${color}cc` : color);

    return { color, rgba, width };
}

export function getLinkLabel(l: KiLink) {
    const type = l.ref_type || 'mention';
    const typeLabel = (type === 'formal' || type === 'explicit') 
        ? 'Explicit file path' 
        : type === 'bold' 
            ? '<strong>Bold</strong> mention' 
            : 'Simple mention';
    return `<div class="link-label"><strong>${typeLabel}</strong></div>`;
}
