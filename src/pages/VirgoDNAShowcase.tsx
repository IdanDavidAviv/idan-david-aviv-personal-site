import { useEffect } from 'react'
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

            <PromptArchitectureSpace />

            {/* Final Footer Label */}
            <div className="mt-16 mb-20 text-center relative z-10">
                <div className="w-1 h-20 bg-gradient-to-b from-idan-david-aviv-gold/20 to-transparent mx-auto mb-8" />
                <p className="text-white/20 font-mono text-sm tracking-[1em] uppercase">Virgo-DNA // Distributed Network Architecture</p>
            </div>
        </main>
    );
}
