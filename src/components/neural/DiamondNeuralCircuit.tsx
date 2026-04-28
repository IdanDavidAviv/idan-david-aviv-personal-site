import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createSmoothPath } from './neural-utils';

const DIAMOND_NODES = [
    { id: 'n0', x: 100, y: 30 },  // Top
    { id: 'n1', x: 140, y: 70 },  // Right
    { id: 'n2', x: 100, y: 110 }, // Bottom
    { id: 'n3', x: 60, y: 70 },   // Left
    { id: 'c',  x: 100, y: 70 },  // Center Intersection
];

const EDGES = [
    // Perimeter
    ['n0', 'n1'], ['n1', 'n2'],
    ['n2', 'n3'], ['n3', 'n0'],
    // Vertical Diagonal
    ['n0', 'c'], ['c', 'n2'],
    // Horizontal Diagonal
    ['n3', 'c'], ['c', 'n1'],
];

type PulseRoute = {
    id: string;
    route: string[];
};

export function DiamondNeuralCircuit() {
    const [pulses, setPulses] = useState<PulseRoute[]>([])

    useEffect(() => {
        const generateRandomDownwardRoute = () => {
            const route = ['n0'];
            let current = 'n0';
            let stuck = false;
            let transverseCount = 0; // Track horizontal steps
            
            while (current !== 'n2' && !stuck) {
                const currNode = DIAMOND_NODES.find(n => n.id === current)!;
                const connected = EDGES.filter(e => e[0] === current || e[1] === current)
                                       .map(e => e[0] === current ? e[1] : e[0]);
                
                const validNext = connected.filter(nId => {
                    if (route.includes(nId)) return false;
                    const nextNode = DIAMOND_NODES.find(n => n.id === nId)!;
                    
                    if (nextNode.y === currNode.y) {
                        return transverseCount < 1; // Only allow 1 consecutive horizontal step
                    }
                    return nextNode.y > currNode.y; // Downward is always allowed
                });

                if (validNext.length === 0) {
                    stuck = true;
                    break;
                }

                const next = validNext[Math.floor(Math.random() * validNext.length)];
                
                if (DIAMOND_NODES.find(n => n.id === next)!.y === currNode.y) {
                    transverseCount++;
                } else {
                    transverseCount = 0; // Reset on downward movement
                }

                route.push(next);
                current = next;
            }

            return stuck ? ['n0', 'c', 'n2'] : route;
        };

        let timeoutId: NodeJS.Timeout;

        const triggerPulseSequence = () => {
            const numBranches = Math.floor(Math.random() * 2) + 1; // 1 to 2 branches (lower activity)
            const newPulses: PulseRoute[] = [];
            for (let i = 0; i < numBranches; i++) {
                newPulses.push({
                    id: `p_${Date.now()}_${i}`,
                    route: generateRandomDownwardRoute()
                });
            }
            setPulses(prev => [...prev, ...newPulses].slice(-10)); // Keep fewer in memory

            // Slower, calmer interval for secondary separators (1.5s to 5.5s)
            const nextDelay = 1500 + Math.random() * 4000;
            timeoutId = setTimeout(triggerPulseSequence, nextDelay);
        };

        triggerPulseSequence();
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="w-full flex justify-center py-0 -my-8 md:-my-12 pointer-events-none relative z-0">
            <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="relative z-10">
                <defs>
                    <filter id="pure-blur-small" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                    </filter>
                </defs>

                {/* Structural Background Framework */}
                {EDGES.map((edge, i) => {
                    const start = DIAMOND_NODES.find(n => n.id === edge[0])!
                    const end = DIAMOND_NODES.find(n => n.id === edge[1])!
                    return (
                        <line 
                            key={`edge_${i}`}
                            x1={start.x} y1={start.y} 
                            x2={end.x} y2={end.y} 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            className="text-idan-david-aviv-gold/5" 
                            filter="url(#pure-blur-small)"
                        />
                    )
                })}
                
                {/* Active Synaptic Pulses */}
                {pulses.flatMap(pulse => {
                    const elements: JSX.Element[] = [];
                    const routePoints = pulse.route.map(id => DIAMOND_NODES.find(n => n.id === id)!);
                    
                    let totalDist = 0;
                    for (let i = 0; i < routePoints.length - 1; i++) {
                        totalDist += Math.hypot(routePoints[i+1].x - routePoints[i].x, routePoints[i+1].y - routePoints[i].y);
                    }
                    const totalDuration = totalDist * 0.009; 
                    const d = createSmoothPath(routePoints, 0.8);

                    // Comet particles using offsetDistance on the smooth path
                    Array.from({ length: 8 }).forEach((_, trailIdx) => {
                        const isHead = trailIdx === 0;
                        const trailDelay = trailIdx * 0.04; 
                        const opacityPeak = isHead ? 1 : 0.8 * Math.pow(0.8, trailIdx); 
                        const radius = isHead ? 2.5 : Math.max(0.5, 2.5 - trailIdx * 0.25); 

                        elements.push(
                            <motion.circle
                                key={`${pulse.id}_dot_${trailIdx}`}
                                r={radius}
                                fill="#FBBF24"
                                filter="url(#pure-blur-small)"
                                style={{
                                    offsetPath: `path('${d}')`,
                                    cx: 0, 
                                    cy: 0
                                } as React.CSSProperties}
                                initial={{ offsetDistance: "0%", opacity: 0 }}
                                animate={{ 
                                    offsetDistance: ["0%", "100%"],
                                    opacity: [0, opacityPeak, opacityPeak, 0]
                                }}
                                transition={{
                                    duration: totalDuration,
                                    delay: trailDelay,
                                    ease: "linear",
                                    times: [0, 0.1, 0.9, 1]
                                }}
                            />
                        );
                    });
                    return elements;
                })}

                {/* Static Structural Nodes */}
                {DIAMOND_NODES.map((node) => (
                    <motion.circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r={node.id === 'c' ? 1.5 : 2.5}
                        className="fill-idan-david-aviv-gold"
                        filter="url(#pure-blur-small)"
                        initial={{ opacity: 0.05, scale: 1 }}
                        animate={{ 
                            opacity: [0.05, 0.2, 0.05],
                            scale: [1, 1.15, 1]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-idan-david-aviv-gold/5 to-transparent blur-3xl opacity-50" />
        </div>
    )
}
