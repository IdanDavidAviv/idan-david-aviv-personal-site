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

export type { KiNode, KiLink, KiDelta, KiDiff, TimelineBatch };
