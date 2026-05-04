import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { DNAHero } from '@/components/dna/DNAHero'
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
        <main className="min-h-screen w-full bg-core-themed pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 flex flex-col items-center">
            <div className="w-full mb-12 md:mb-20">
                <DNAHero />
            </div>

            <HexNeuralCircuit />
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

            {/* Global CTA - Deep Alignment Funnel */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-3xl mx-auto flex flex-col items-center text-center pt-24 pb-16 px-6 relative z-20"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-wide">
                    Let&apos;s Build <span className="text-idan-david-aviv-gold">Your Agent</span>
                </h2>

                <p className="text-white/70 text-lg leading-relaxed mb-10 font-light">
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

                <div className="w-12 h-1 bg-idan-david-aviv-gold/40 mt-16 rounded-full" />
            </motion.div>

            <PromptArchitectureSpace />

            {/* Final Footer Label */}
            <div className="mt-24 mb-20 text-center relative z-10">
                <p className="text-white/20 font-mono text-sm tracking-[1em] uppercase">Virgo-DNA // Distributed Network Architecture</p>
            </div>
        </main>
    );
}
