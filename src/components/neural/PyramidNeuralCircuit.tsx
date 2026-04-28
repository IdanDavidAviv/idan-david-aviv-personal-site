import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PYRAMID_NODES = [
    { id: 't0', x: 100, y: 20 },

    { id: 'm0', x: 60, y: 70 },
    { id: 'm1', x: 100, y: 70 },
    { id: 'm2', x: 140, y: 70 },

    { id: 'b0', x: 20, y: 120 },
    { id: 'b1', x: 60, y: 120 },
    { id: 'b2', x: 100, y: 120 },
    { id: 'b3', x: 140, y: 120 },
    { id: 'b4', x: 180, y: 120 },
];

const EDGES = [
    // Top to mid
    ['t0', 'm0'], ['t0', 'm1'], ['t0', 'm2'],
    // Mid to bot
    ['m0', 'b0'], ['m0', 'b1'], ['m0', 'b2'],
    ['m1', 'b1'], ['m1', 'b2'], ['m1', 'b3'],
    ['m2', 'b2'], ['m2', 'b3'], ['m2', 'b4'],
    // Horizontals (Structural only, pulses stop at 'b' layer)
    ['m0', 'm1'], ['m1', 'm2'],
    ['b0', 'b1'], ['b1', 'b2'], ['b2', 'b3'], ['b3', 'b4']
];

type PulseRoute = {
    id: string;
    route: string[];
};

export function PyramidNeuralCircuit() {
    const [pulses, setPulses] = useState<PulseRoute[]>([])

    useEffect(() => {
        const generateRandomDownwardRoute = () => {
            const route = ['t0'];
            let current = 't0';
            let stuck = false;
            let transverseCount = 0; 
            
            while (!current.startsWith('b') && !stuck) {
                const currNode = PYRAMID_NODES.find(n => n.id === current)!;
                const connected = EDGES.filter(e => e[0] === current || e[1] === current)
                                       .map(e => e[0] === current ? e[1] : e[0]);
                
                const validNext = connected.filter(nId => {
                    if (route.includes(nId)) return false;
                    const nextNode = PYRAMID_NODES.find(n => n.id === nId)!;
                    
                    if (nextNode.y === currNode.y) {
                        return transverseCount < 1; 
                    }
                    return nextNode.y > currNode.y; 
                });

                if (validNext.length === 0) {
                    stuck = true;
                    break;
                }

                const next = validNext[Math.floor(Math.random() * validNext.length)];
                
                if (PYRAMID_NODES.find(n => n.id === next)!.y === currNode.y) {
                    transverseCount++;
                } else {
                    transverseCount = 0; 
                }

                route.push(next);
                current = next;
            }

            return stuck ? ['t0', 'm1', 'b2'] : route;
        };

        let timeoutId: NodeJS.Timeout;

        const triggerPulseSequence = () => {
            // Burst of 2 to 5 branches fanning out
            const numBranches = Math.floor(Math.random() * 4) + 2; 
            const newPulses: PulseRoute[] = [];
            for (let i = 0; i < numBranches; i++) {
                newPulses.push({
                    id: `p_${Date.now()}_${i}`,
                    route: generateRandomDownwardRoute()
                });
            }
            setPulses(prev => [...prev, ...newPulses].slice(-30)); 

            // Organic interval
            const nextDelay = 800 + Math.random() * 3000;
            timeoutId = setTimeout(triggerPulseSequence, nextDelay);
        };

        triggerPulseSequence();
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="w-full flex justify-center py-6 md:py-10 pointer-events-none h-40 relative">
            <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="relative z-10">
                <defs>
                    <filter id="pure-blur-pyramid" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                    </filter>
                </defs>

                {/* Structural Background Framework */}
                {EDGES.map((edge, i) => {
                    const start = PYRAMID_NODES.find(n => n.id === edge[0])!
                    const end = PYRAMID_NODES.find(n => n.id === edge[1])!
                    return (
                        <line 
                            key={`edge_${i}`}
                            x1={start.x} y1={start.y} 
                            x2={end.x} y2={end.y} 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            className="text-idan-david-aviv-gold/5" 
                        />
                    )
                })}
                
                {/* Active Synaptic Pulses */}
                {pulses.flatMap(pulse => {
                    const elements = [];
                    let accumulatedDelay = 0;

                    for (let i = 0; i < pulse.route.length - 1; i++) {
                        const start = PYRAMID_NODES.find(n => n.id === pulse.route[i])!
                        const end = PYRAMID_NODES.find(n => n.id === pulse.route[i+1])!
                        
                        const dist = Math.hypot(end.x - start.x, end.y - start.y);
                        const segmentDuration = dist * 0.007; 
                        
                        const stepDelay = accumulatedDelay;
                        accumulatedDelay += segmentDuration;
                        
                        const segmentId = `${pulse.id}_s${i}`;

                        // Line Decaying Trail
                        elements.push(
                            <motion.line
                                key={`${segmentId}_line`}
                                x1={start.x} y1={start.y}
                                x2={end.x} y2={end.y}
                                stroke="#FBBF24"
                                strokeWidth="1.5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.6, 0] }}
                                transition={{
                                    duration: segmentDuration * 3,
                                    delay: stepDelay,
                                    ease: "easeOut",
                                    times: [0, 0.1, 1] 
                                }}
                            />
                        );

                        // Comet Particle System
                        Array.from({ length: 8 }).forEach((_, trailIdx) => {
                            const isHead = trailIdx === 0;
                            const trailDelay = trailIdx * 0.04; 
                            const opacityPeak = isHead ? 1 : 0.8 * Math.pow(0.8, trailIdx); 
                            const radius = isHead ? 2.5 : Math.max(0.5, 2.5 - trailIdx * 0.25); 

                            elements.push(
                                <motion.circle
                                    key={`${segmentId}_dot_${trailIdx}`}
                                    r={radius}
                                    fill="#FBBF24"
                                    filter="url(#pure-blur-pyramid)"
                                    initial={{ cx: start.x, cy: start.y, opacity: 0 }}
                                    animate={{ 
                                        cx: [start.x, end.x], 
                                        cy: [start.y, end.y],
                                        opacity: [0, opacityPeak, opacityPeak, 0]
                                    }}
                                    transition={{
                                        duration: segmentDuration,
                                        delay: stepDelay + trailDelay,
                                        ease: "linear",
                                        times: [0, 0.1, 0.9, 1]
                                    }}
                                />
                            );
                        });
                    }
                    return elements;
                })}

                {/* Static Structural Nodes */}
                {PYRAMID_NODES.map((node) => (
                    <motion.circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r={node.id.startsWith('b') ? 1.5 : 2.5}
                        className="fill-idan-david-aviv-gold"
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
