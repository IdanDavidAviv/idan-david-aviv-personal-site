import { Network, DataSet } from 'vis-network/standalone';
import { KiNode, KiLink } from './ki-network-types';
import { getNodeStyle, getLinkStyle } from './ki-network-styles';

export function createGraph2D(container: HTMLElement, nodes: KiNode[], links: KiLink[]) {
    const processedVisNodes = nodes.map(n => {
        const label = n.id.replace(/_/g, ' ');
        const style = getNodeStyle(n.id);

        return {
            id: n.id,
            label: label.split(' ').join('\n'),
            shape: 'circle' as const,
            margin: { top: 10, bottom: 10, left: 10, right: 10 },
            widthConstraint: { minimum: 50, maximum: 100 },
            color: {
                background: style.color,
                border: style.isMissing ? '#7f1d1d' : '#1e293b',
                highlight: { background: style.color, border: '#ffffff' }
            },
            font: { color: style.textColor, size: 11, face: 'Inter', multi: false },
        };
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const visNodes = new DataSet<any>(processedVisNodes);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const visEdges = new DataSet<any>(links.map(l => {
        const style = getLinkStyle(l, false);
        return {
            from: typeof l.source === 'object' ? (l.source as KiNode).id : l.source,
            to: typeof l.target === 'object' ? (l.target as KiNode).id : l.target,
            width: style.width,
            color: style.color
        };
    }));

    const network = new Network(
        container,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { nodes: visNodes as any, edges: visEdges as any },
        {
            physics: {
                enabled: true,
                solver: 'forceAtlas2Based',
                forceAtlas2Based: { gravitationalConstant: -100, centralGravity: 0.015, springConstant: 0.1, springLength: 120 },
            },
            interaction: { hover: true, dragNodes: true, tooltipDelay: 200 },
            edges: { color: 'rgba(168, 85, 247, 0.4)', arrows: { to: { enabled: true, scaleFactor: 0.5 } }, width: 1 },
        }
    );

    return { network, visNodes, visEdges };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function update2DGraph(visNodes: DataSet<any>, visEdges: DataSet<any>, nodes: KiNode[], links: KiLink[]) {
    visNodes.clear();
    visNodes.add(nodes.map(n => {
        const label = n.id.replace(/_/g, ' ');
        const style = getNodeStyle(n.id);

        return {
            id: n.id,
            label: label.split(' ').join('\n'),
            shape: 'circle' as const,
            margin: { top: 10, bottom: 10, left: 10, right: 10 },
            widthConstraint: { minimum: 50, maximum: 100 },
            color: {
                background: style.color,
                border: style.isMissing ? '#7f1d1d' : '#1e293b',
                highlight: { background: style.color, border: '#ffffff' }
            },
            font: { color: style.textColor, size: 11, face: 'Inter', multi: false },
        };
    }));

    visEdges.clear();
    visEdges.add(links.map((l: KiLink) => {
        const style = getLinkStyle(l, false);
        const s = typeof l.source === 'object' ? (l.source as KiNode).id : l.source;
        const t = typeof l.target === 'object' ? (l.target as KiNode).id : l.target;
        return {
            from: s,
            to: t,
            width: style.width,
            color: style.color
        };
    }));
}
