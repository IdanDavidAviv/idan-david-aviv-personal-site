import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createSmoothPath } from './neural-utils';

const PENTAGON_NODES = [
    // Main Nodes
    { id: 'n0', x: 100, y: 15 },
    { id: 'n1', x: 155, y: 55 },
    { id: 'n2', x: 135, y: 115 },
    { id: 'n3', x: 65,  y: 115 },
    { id: 'n4', x: 45,  y: 55 },
    // Inner Pentagram Intersections
    { id: 'a1', x: 114, y: 55 },
    { id: 'a2', x: 86, y: 55 },
    { id: 'a3', x: 121.76, y: 77.16 },
    { id: 'a4', x: 78.24, y: 77.16 },
    { id: 'a5', x: 100, y: 91.67 },
];

const EDGES = [
    // Perimeter
    ['n0', 'n1'], ['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'], ['n4', 'n0'],
    
    // Horizontal Diagonal n1-n4
    ['n4', 'a2'], ['a2', 'a1'], ['a1', 'n1'],
    
    // Diagonal n0-n2
    ['n0', 'a1'], ['a1', 'a3'], ['a3', 'n2'],
    
    // Diagonal n0-n3
    ['n0', 'a2'], ['a2', 'a4'], ['a4', 'n3'],
    
    // Diagonal n1-n3
    ['n3', 'a5'], ['a5', 'a3'], ['a3', 'n1'],
    
    // Diagonal n4-n2
    ['n4', 'a4'], ['a4', 'a5'], ['a5', 'n2']
];

type PulseRoute = {
    id: string;
    route: string[];
};

export function PentagonNeuralCircuit() {
    const [pulses, setPulses] = useState<PulseRoute[]>([])

    useEffect(() => {
        const generateLoopRoute = () => {
            const startNodes = ['n0', 'n1', 'n2', 'n3', 'n4'];
            const startNode = startNodes[Math.floor(Math.random() * startNodes.length)];
            const route = [startNode];
            let current = startNode;
            let stuck = false;
            
            // Loop routes can travel in any direction, up to 10 steps
            while (!stuck && route.length < 10) {
                const connected = EDGES.filter(e => e[0] === current || e[1] === current)
                                       .map(e => e[0] === current ? e[1] : e[0]);
                
                const validNext = connected.filter(nId => !route.includes(nId));

                if (validNext.length === 0) {
                    stuck = true;
                    break;
                }

                const next = validNext[Math.floor(Math.random() * validNext.length)];
                route.push(next);
                current = next;
            }

            return route;
        };

        let timeoutId: NodeJS.Timeout;

        const triggerPulseSequence = () => {
            // Constant, steady orbital activity
            const numBranches = Math.floor(Math.random() * 3) + 1; 
            const newPulses: PulseRoute[] = [];
            for (let i = 0; i < numBranches; i++) {
                newPulses.push({
                    id: `p_${Date.now()}_${i}`,
                    route: generateLoopRoute()
                });
            }
            setPulses(prev => [...prev, ...newPulses].slice(-20)); 

            // Rhythmic, circular interval (faster than diamond, slower than hex)
            const nextDelay = 1200 + Math.random() * 2000;
            timeoutId = setTimeout(triggerPulseSequence, nextDelay);
        };

        triggerPulseSequence();
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="w-full flex justify-center py-0 -my-8 md:-my-12 pointer-events-none relative z-0">
            <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="relative z-10">
                <defs>
                    <filter id="pure-blur-pentagon" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                    </filter>
                </defs>

                {/* Structural Background Framework */}
                {EDGES.map((edge, i) => {
                    const start = PENTAGON_NODES.find(n => n.id === edge[0])!
                    const end = PENTAGON_NODES.find(n => n.id === edge[1])!
                    return (
                        <line 
                            key={`edge_${i}`}
                            x1={start.x} y1={start.y} 
                            x2={end.x} y2={end.y} 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            className="text-idan-david-aviv-gold/5" 
                            filter="url(#pure-blur-pentagon)"
                        />
                    )
                })}
                
                {/* Active Synaptic Pulses */}
                {pulses.flatMap(pulse => {
                    const elements: JSX.Element[] = [];
                    const routePoints = pulse.route.map(id => PENTAGON_NODES.find(n => n.id === id)!);
                    
                    let totalDist = 0;
                    for (let i = 0; i < routePoints.length - 1; i++) {
                        totalDist += Math.hypot(routePoints[i+1].x - routePoints[i].x, routePoints[i+1].y - routePoints[i].y);
                    }
                    const totalDuration = totalDist * 0.005; 
                    const d = createSmoothPath(routePoints, 0.8);

                    // Comet particles using offsetDistance on the smooth path
                    Array.from({ length: 8 }).forEach((_, trailIdx) => {
                        const isHead = trailIdx === 0;
                        const trailDelay = trailIdx * 0.035; 
                        const opacityPeak = isHead ? 1 : 0.8 * Math.pow(0.8, trailIdx); 
                        const radius = isHead ? 2.5 : Math.max(0.5, 2.5 - trailIdx * 0.25); 

                        elements.push(
                            <motion.circle
                                key={`${pulse.id}_dot_${trailIdx}`}
                                r={radius}
                                fill="#FBBF24"
                                filter="url(#pure-blur-pentagon)"
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
                {PENTAGON_NODES.map((node) => (
                    <motion.circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r={node.id === 'c' ? 3 : (node.id.startsWith('a') || node.id.startsWith('b')) ? 1.5 : 2.5}
                        className="fill-idan-david-aviv-gold"
                        filter="url(#pure-blur-pentagon)"
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
