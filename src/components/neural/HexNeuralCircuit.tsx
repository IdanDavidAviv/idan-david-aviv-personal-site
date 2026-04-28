import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HEX_NODES = [
    // Main Nodes
    { id: 'n0', x: 100, y: 20 },
    { id: 'n1', x: 48, y: 50 },
    { id: 'n2', x: 152, y: 50 },
    { id: 'n3', x: 48, y: 110 },
    { id: 'n4', x: 152, y: 110 },
    { id: 'n5', x: 100, y: 140 },
    { id: 'n6', x: 100, y: 80 },
    // Primary Intersections
    { id: 'i1', x: 100, y: 50 },
    { id: 'i2', x: 100, y: 110 },
    { id: 'i3', x: 74, y: 65 },
    { id: 'i4', x: 126, y: 65 },
    { id: 'i5', x: 74, y: 95 },
    { id: 'i6', x: 126, y: 95 },
    // Secondary Intersections (The missing 6)
    { id: 'i7', x: 82.67, y: 50 },
    { id: 'i8', x: 117.33, y: 50 },
    { id: 'i9', x: 65.33, y: 80 },
    { id: 'i10', x: 134.67, y: 80 },
    { id: 'i11', x: 82.67, y: 110 },
    { id: 'i12', x: 117.33, y: 110 },
];

const EDGES = [
    // Perimeter (6)
    ['n0', 'n1'], ['n0', 'n2'],
    ['n1', 'n3'], ['n2', 'n4'],
    ['n3', 'n5'], ['n4', 'n5'],
    // Horizontal y=50 (4)
    ['n1', 'i7'], ['i7', 'i1'], ['i1', 'i8'], ['i8', 'n2'],
    // Horizontal y=110 (4)
    ['n3', 'i11'], ['i11', 'i2'], ['i2', 'i12'], ['i12', 'n4'],
    // Vertical Core n0-n5 (4)
    ['n0', 'i1'], ['i1', 'n6'], ['n6', 'i2'], ['i2', 'n5'],
    // Primary Diagonal n1-n4 (4)
    ['n1', 'i3'], ['i3', 'n6'], ['n6', 'i6'], ['i6', 'n4'],
    // Primary Diagonal n2-n3 (4)
    ['n2', 'i4'], ['i4', 'n6'], ['n6', 'i5'], ['i5', 'n3'],
    // Secondary Diagonal n0-n3 (4)
    ['n0', 'i7'], ['i7', 'i3'], ['i3', 'i9'], ['i9', 'n3'],
    // Secondary Diagonal n0-n4 (4)
    ['n0', 'i8'], ['i8', 'i4'], ['i4', 'i10'], ['i10', 'n4'],
    // Secondary Diagonal n1-n5 (4)
    ['n1', 'i9'], ['i9', 'i5'], ['i5', 'i11'], ['i11', 'n5'],
    // Secondary Diagonal n2-n5 (4)
    ['n2', 'i10'], ['i10', 'i6'], ['i6', 'i12'], ['i12', 'n5']
];

type PulseRoute = {
    id: string;
    route: string[];
};

export function HexNeuralCircuit() {
    const [pulses, setPulses] = useState<PulseRoute[]>([])

    useEffect(() => {
        const generateRandomDownwardRoute = () => {
            const route = ['n0'];
            let current = 'n0';
            let stuck = false;
            let transverseCount = 0; // Track horizontal steps
            
            while (current !== 'n5' && !stuck) {
                const currNode = HEX_NODES.find(n => n.id === current)!;
                const connected = EDGES.filter(e => e[0] === current || e[1] === current)
                                       .map(e => e[0] === current ? e[1] : e[0]);
                
                const validNext = connected.filter(nId => {
                    if (route.includes(nId)) return false;
                    const nextNode = HEX_NODES.find(n => n.id === nId)!;
                    
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
                
                if (HEX_NODES.find(n => n.id === next)!.y === currNode.y) {
                    transverseCount++;
                } else {
                    transverseCount = 0; // Reset on downward movement
                }

                route.push(next);
                current = next;
            }

            return stuck ? ['n0', 'i1', 'n6', 'i2', 'n5'] : route;
        };

        let timeoutId: NodeJS.Timeout;

        const triggerPulseSequence = () => {
            const numBranches = Math.floor(Math.random() * 4) + 1; // 1 to 4 branches (chaotic burst)
            const newPulses: PulseRoute[] = [];
            for (let i = 0; i < numBranches; i++) {
                newPulses.push({
                    id: `p_${Date.now()}_${i}`,
                    route: generateRandomDownwardRoute()
                });
            }
            setPulses(prev => [...prev, ...newPulses].slice(-30)); // Keep last 30 for higher burst density

            // Organic, chaotic interval (between 600ms and 3800ms)
            const nextDelay = 600 + Math.random() * 3200;
            timeoutId = setTimeout(triggerPulseSequence, nextDelay);
        };

        triggerPulseSequence();
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="w-full flex justify-center py-10 md:py-16 pointer-events-none h-48 relative">
            <svg width="200" height="160" viewBox="0 0 200 160" fill="none" className="relative z-10">
                <defs>
                    <filter id="pure-blur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                    </filter>
                </defs>

                {/* Background faint circuit structure */}
                {EDGES.map((edge, i) => {
                    const start = HEX_NODES.find(n => n.id === edge[0])!
                    const end = HEX_NODES.find(n => n.id === edge[1])!
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
                
                {/* Dynamic Pulses & Trails */}
                {pulses.flatMap(pulse => {
                    const elements = [];
                    let accumulatedDelay = 0; // Track precise timing across complex routes

                    for (let i = 0; i < pulse.route.length - 1; i++) {
                        const start = HEX_NODES.find(n => n.id === pulse.route[i])!
                        const end = HEX_NODES.find(n => n.id === pulse.route[i+1])!
                        
                        // Constant velocity: duration is proportional to segment length
                        const dist = Math.hypot(end.x - start.x, end.y - start.y);
                        const segmentDuration = dist * 0.007; // ~140px/sec
                        
                        const stepDelay = accumulatedDelay;
                        accumulatedDelay += segmentDuration;
                        
                        const segmentId = `${pulse.id}_s${i}`;

                        // 1. Decaying line trail
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
                                    duration: segmentDuration * 3, // Decays slowly behind the dot
                                    delay: stepDelay, // Triggers exactly as the dot touches the line
                                    ease: "easeOut",
                                    times: [0, 0.1, 1] 
                                }}
                            />
                        );

                        // 2. Comet particles
                        Array.from({ length: 12 }).forEach((_, trailIdx) => {
                            const isHead = trailIdx === 0;
                            const trailDelay = trailIdx * 0.035; 
                            const opacityPeak = isHead ? 1 : 0.8 * Math.pow(0.85, trailIdx); // Slower fade so all 12 are visible
                            const radius = isHead ? 2.5 : Math.max(0.5, 2.5 - trailIdx * 0.15); // Slower taper

                            elements.push(
                                <motion.circle
                                    key={`${segmentId}_dot_${trailIdx}`}
                                    r={radius}
                                    fill="#FBBF24"
                                    filter="url(#pure-blur)"
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

                {/* Synaptic Nodes (Main Nodes & Intersection Hubs) */}
                {HEX_NODES.map((node) => (
                    <motion.circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r={node.id.startsWith('i') ? 1.5 : 2.5}
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
