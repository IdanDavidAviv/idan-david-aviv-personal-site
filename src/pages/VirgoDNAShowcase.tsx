import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DNAHero } from '@/components/dna/DNAHero'
import { PromptArchitectureSpace } from '@/components/neural/PromptArchitectureSpace'
import { CrystallineMemory } from '@/components/dna/CrystallineMemory'
import { DNAPhilosophy } from '@/components/dna/DNAPhilosophy'
import { NeuralBlueprint } from '@/components/dna/NeuralBlueprint'

/**
 * Virgo DNA Showcase Page
 * A technical deep-dive into the AI agent's evolutionary architecture and persistence protocols.
 */

// Types defined in ki-network-types.ts

// TimelineBatch imported from ki-network-types.ts

export default function VirgoDNAShowcase() {
    useEffect(() => {
        // SEO & Metadata Tuning
        document.title = "Virgo DNA — Unified Neural Network | Idan David-Aviv";
    }, [])
    return (
        <main className="min-h-screen w-full bg-core-themed pt-28 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 flex flex-col items-center">
            <DNAHero />

            <PathTransition />
            <DNAPhilosophy />

            <div className="w-full max-w-6xl">
                <NeuralBlueprint />
            </div>

            <div className="w-full">
                <CrystallineMemory />
            </div>

            <PromptArchitectureSpace />

            {/* Final Footer Label */}
            <div className="mt-40 mb-20 text-center relative z-10">
                <div className="w-1 h-20 bg-gradient-to-b from-idan-david-aviv-gold/20 to-transparent mx-auto mb-8" />
                <p className="text-white/20 font-mono text-sm tracking-[1em] uppercase">Virgo-DNA // Distributed Network Architecture</p>
            </div>
        </main>
    );
}


const HEX_NODES = [
    { id: 'n0', x: 100, y: 20 },   // Top
    { id: 'n1', x: 48, y: 50 },    // Top Left
    { id: 'n2', x: 152, y: 50 },   // Top Right
    { id: 'n3', x: 48, y: 110 },   // Bottom Left
    { id: 'n4', x: 152, y: 110 },  // Bottom Right
    { id: 'n5', x: 100, y: 140 },  // Bottom
    { id: 'n6', x: 100, y: 80 },   // Center
];

const EDGES = [
    // Hexagon Perimeter
    ['n0', 'n1'], ['n0', 'n2'],
    ['n1', 'n3'], ['n2', 'n4'],
    ['n3', 'n5'], ['n4', 'n5'],
    // Internal Spokes to Center
    ['n0', 'n6'], ['n1', 'n6'], ['n2', 'n6'],
    ['n3', 'n6'], ['n4', 'n6'], ['n5', 'n6'],
    // Cross connections
    ['n1', 'n2'], ['n3', 'n4'],
    ['n1', 'n4'], ['n2', 'n3'],
    // The missing links (poles to far wings)
    ['n0', 'n3'], ['n0', 'n4'],
    ['n1', 'n5'], ['n2', 'n5']
];

type PulseRoute = {
    id: string;
    route: string[];
    duration: number;
};

function PathTransition() {
    const [pulses, setPulses] = useState<PulseRoute[]>([])

    useEffect(() => {
        const VALID_ROUTES = [
            ['n0', 'n6', 'n5'],
            ['n0', 'n1', 'n3', 'n5'],
            ['n0', 'n2', 'n4', 'n5'],
            ['n0', 'n1', 'n6', 'n5'],
            ['n0', 'n2', 'n6', 'n5'],
            ['n0', 'n6', 'n3', 'n5'],
            ['n0', 'n6', 'n4', 'n5'],
            ['n0', 'n1', 'n4', 'n5'],
            ['n0', 'n2', 'n3', 'n5'],
            ['n0', 'n3', 'n5'],
            ['n0', 'n4', 'n5'],
            ['n0', 'n1', 'n5'],
            ['n0', 'n2', 'n5'],
        ];

        const generateWave = () => {
            const shuffled = [...VALID_ROUTES].sort(() => 0.5 - Math.random());
            const numBranches = Math.floor(Math.random() * 3) + 1; // 1 to 3 branches
            const chosenRoutes = shuffled.slice(0, numBranches);
            
            const newPulses = chosenRoutes.map((route, i) => ({
                id: `w_${Date.now()}_${i}`,
                route,
                duration: 0.6 // Duration per segment
            }));
            
            setPulses(prev => [...prev, ...newPulses].slice(-15)); // Keep last 15 wave cycles
        };

        generateWave();
        const interval = setInterval(generateWave, 3000);
        return () => clearInterval(interval);
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
                            className="text-idan-david-aviv-gold/10" 
                        />
                    )
                })}
                
                {/* Dynamic Pulses & Trails */}
                {pulses.flatMap(pulse => {
                    const elements = [];
                    for (let i = 0; i < pulse.route.length - 1; i++) {
                        const start = HEX_NODES.find(n => n.id === pulse.route[i])!
                        const end = HEX_NODES.find(n => n.id === pulse.route[i+1])!
                        const stepDelay = i * pulse.duration;
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
                                    duration: pulse.duration * 3, // Decays slowly over 3 segments
                                    delay: stepDelay, // Starts exactly when the dot touches the line
                                    ease: "easeOut",
                                    times: [0, 0.1, 1] // Instant bright, slow fade
                                }}
                            />
                        );

                        // 2. Comet particles (12 particles for a long, visible tail)
                        Array.from({ length: 12 }).forEach((_, trailIdx) => {
                            const isHead = trailIdx === 0;
                            const trailDelay = trailIdx * 0.035; // 35ms offset creates a long tail
                            const opacityPeak = isHead ? 1 : 0.8 * Math.pow(0.75, trailIdx); // Slower fade
                            const radius = isHead ? 2.5 : Math.max(0.2, 2.5 - trailIdx * 0.25); // Smooth taper

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
                                        duration: pulse.duration,
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

                {/* Synaptic Nodes */}
                {HEX_NODES.map((node, i) => (
                    <motion.circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r="2"
                        className="fill-idan-david-aviv-gold"
                        initial={{ opacity: 0.1, scale: 1 }}
                        animate={{ 
                            opacity: [0.1, 0.6, 0.1],
                            scale: [1, 1.3, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2, 
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-idan-david-aviv-gold/5 to-transparent blur-3xl opacity-50" />
        </div>
    )
}

