import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { DNAHero } from '@/components/dna/DNAHero'
import Toolchain from '@/components/sections/Toolchain'
import { PromptArchitectureSpace } from '@/components/neural/PromptArchitectureSpace'
import { CrystallineMemory } from '@/components/dna/CrystallineMemory'
import { DNAPhilosophy } from '@/components/dna/DNAPhilosophy'
import { NeuralBlueprint } from '@/components/dna/NeuralBlueprint'
import { HexNeuralCircuit } from '@/components/neural/HexNeuralCircuit'
import { DiamondNeuralCircuit } from '@/components/neural/DiamondNeuralCircuit'
import { PyramidNeuralCircuit } from '@/components/neural/PyramidNeuralCircuit'
import { PentagonNeuralCircuit } from '@/components/neural/PentagonNeuralCircuit'

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
        <main className="min-h-screen w-full bg-core-themed pt-24 md:pt-32 pb-4 px-4 md:px-8 lg:px-12 flex flex-col items-center">
            <div className="w-full mb-2 md:mb-6">
                <DNAHero />
            </div>

            <div id="interactive-circuits" className="w-full -mt-6">
                <HexNeuralCircuit />
            </div>
            {/* Practical Core (Centralized) */}
            <div className="w-full relative mt-0 flex flex-col items-center">
                {/* Massive ambient core glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[150%] bg-idan-david-aviv-gold/5 blur-[150px] rounded-[100%] pointer-events-none -z-20" />

                <div className="w-full max-w-6xl">
                    <Toolchain />
                </div>

                {/* Global CTA - Moved up to follow the practical workbench */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full max-w-3xl mx-auto flex flex-col items-center text-center pt-12 pb-12 px-6 relative z-20 space-y-4"
                >
                    <span className="text-xs uppercase tracking-[0.3em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-idan-david-aviv-gold to-idan-david-aviv-gold/60">
                        Initiate Deployment
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                        Let&apos;s Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-gold to-idan-david-aviv-gold/60">Your Agent</span>
                    </h2>

                    <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10">
                        I use this core DNA to build custom AI agents for high-performing professionals. Instead of generic tools, I take these advanced capabilities and wire them directly into your workflow, creating a dedicated, sovereign agent that handles exactly what you need.
                    </p>

                    <Link
                        to="/#contact"
                        className="px-8 py-4 bg-[#050510]/80 hover:bg-idan-david-aviv-gold/10 text-white border border-white/10 hover:border-idan-david-aviv-gold/50 rounded-full transition-all duration-500 font-medium tracking-wide flex items-center gap-3 group backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]"
                    >
                        Set a meeting
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white/50 group-hover:text-idan-david-aviv-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>

            <div className="w-full mt-4 -mb-8 relative z-0">
                <HexNeuralCircuit />
            </div>

            <DNAPhilosophy />

            <PentagonNeuralCircuit />

            <div className="w-full max-w-6xl">
                <NeuralBlueprint />
            </div>

            <DiamondNeuralCircuit />

            <div className="w-full">
                <CrystallineMemory />
            </div>

            <PyramidNeuralCircuit />

            <div id="support-vision" className="w-full">
                <PromptArchitectureSpace />
            </div>
            {/* Final Footer Label */}
            <div className="mt-12 text-center relative z-10">
                <p className="text-white/20 font-mono text-xs tracking-[0.5em] md:tracking-[1em] uppercase">Virgo-DNA // Distributed Network Architecture</p>
            </div>
        </main>
    );
}
