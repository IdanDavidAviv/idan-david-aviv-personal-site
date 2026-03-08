import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { DNAHero } from '@/components/dna/DNAHero'
import { PromptArchitectureSpace } from '@/components/neural/PromptArchitectureSpace'
import { CrystallineMemory } from '@/components/dna/CrystallineMemory'
import { DNAPhilosophy } from '@/components/dna/DNAPhilosophy'
import { NeuralBlueprint } from '@/components/dna/NeuralBlueprint'

/**
 * Antigravity DNA Showcase Page
 * A technical deep-dive into the AI agent's evolutionary architecture and persistence protocols.
 */

// Types defined in ki-network-types.ts

// TimelineBatch imported from ki-network-types.ts

export default function AntigravityDNAShowcase() {
    useEffect(() => {
        // SEO & Metadata Tuning
        document.title = "Antigravity DNA — Unified Neural Network | Idan David-Aviv";
    }, [])
    return (
        <main className="min-h-screen w-full bg-[#050510] py-20 px-4 md:px-8 lg:px-12 flex flex-col items-center">
            <DNAHero />
            
            <PathTransition />
            <PromptArchitectureSpace />
            
            <PathTransition />
            <CrystallineMemory />
            
            <PathTransition />
            <DNAPhilosophy />

            <div className="w-full max-w-6xl mt-24 space-y-32">
                <NeuralBlueprint />
            </div>

            {/* Final Footer Label */}
            <div className="mt-40 mb-20 text-center relative z-10">
                <div className="w-1 h-20 bg-gradient-to-b from-idan-david-aviv-gold/20 to-transparent mx-auto mb-8" />
                <p className="text-white/20 font-mono text-sm tracking-[1em] uppercase">Persistent Agent Module // Antigravity</p>
            </div>
        </main>
    );
}


function PathTransition() {
    return (
        <div className="w-full flex justify-center py-20 pointer-events-none overflow-hidden h-32 relative">
            <svg width="200" height="120" viewBox="0 0 200 120" fill="none" className="opacity-20">
                <path d="M100 0V40M100 80V120M60 60H140" stroke="currentColor" strokeWidth="0.5" className="text-idan-david-aviv-gold" />
                <motion.circle
                    initial={{ cy: 0, cx: 100, opacity: 0 }}
                    animate={{ cy: [0, 40, 60, 60, 140], cx: [100, 100, 60, 140, 100], opacity: [0, 1, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    r="2" fill="#FBBF24"
                />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-idan-david-aviv-gold/5 to-transparent blur-3xl opacity-30" />
        </div>
    )
}

