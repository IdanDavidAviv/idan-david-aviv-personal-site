import { KiNode, KiLink, KiDelta, KiDiff, TimelineBatch } from './dna-history-engine';

export interface NodeStyle {
    color: string;
    textColor: string;
    size: number;
    opacity: number;
    isMissing: boolean;
    group: number;
}

export interface LinkStyle {
    color: string;
    rgba: string;
    width: number;
}

export interface VisNode {
    id: string;
    label: string;
    shape: 'circle' | 'box' | 'dot' | 'text';
    margin?: { top: number; bottom: number; left: number; right: number };
    widthConstraint?: { minimum: number; maximum: number };
    color: {
        background: string;
        border: string;
        highlight: { background: string; border: string };
    };
    font: { color: string; size: number; face: string; multi: boolean };
}

export interface VisEdge {
    id?: string;
    from: string;
    to: string;
    width: number;
    color: string;
}

export type { KiNode, KiLink, KiDelta, KiDiff, TimelineBatch };
