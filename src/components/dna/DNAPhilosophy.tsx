import React from 'react'
import { motion } from 'framer-motion'
import { Zap, BrainCog, MirrorRectangular, BrainCircuit, Waves, Layers } from 'lucide-react'
import Section from '@/components/ui/Section'

export function DNAPhilosophy() {
    return (
        <Section id="dna-philosophy" className="pb-16 md:pb-24">
            <div className="text-center space-y-4 mb-16 pt-12 md:pt-16">
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-idan-david-aviv-gold to-idan-david-aviv-gold/60">
                    Core Doctrine
                </span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-white tracking-tight"
                >
                    The DNA <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-gold to-idan-david-aviv-gold/60">Philosophy</span>
                </motion.h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                    Engineering 100X efficiency by cleaning the noise from the agent runtime.
                    Stabilizing behavior through orchestrated paths and persistent memory.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PhilosophyCard
                    title="The Cognitive OS"
                    description="Move beyond unstructured chat. Virgo-DNA establishes a programmable environment where the AI natively manages its own skills and workflows."
                    icon={<BrainCog className="text-idan-david-aviv-gold" />}
                />
                <PhilosophyCard
                    title="Preserving Flow State"
                    description="Protect your cognitive runway. By actively taming AI unpredictability and hallucinations, the system acts as a shield against noise rather than a source of it."
                    icon={<Waves className="text-idan-david-aviv-gold" />}
                />
                <PhilosophyCard
                    title="Just-In-Time Context"
                    description="Eliminate context overloading. Virgo dynamically identifies the situation and pulls only the exact Knowledge Items (KIs) required for the task at hand."
                    icon={<Zap className="text-idan-david-aviv-gold" />}
                />
                <PhilosophyCard
                    title="The Glass Box Model"
                    description="Trust requires transparency. While the AI handles meta-management autonomously, its logic remains entirely observable, allowing you to intervene at any altitude."
                    icon={<MirrorRectangular className="text-idan-david-aviv-gold" />}
                />
                <PhilosophyCard
                    title="Compound Stability"
                    description="Solve problems once. By codifying solutions into strict skills, routine tasks execute perfectly every time. The architecture stabilizes as it scales."
                    icon={<Layers className="text-idan-david-aviv-gold" />}
                />
                <PhilosophyCard
                    title="True Symbiosis"
                    description="Gain the leverage of an engineering team. You provide the strategic vision and authorization; the AI provides the strict execution and structural memory."
                    icon={<BrainCircuit className="text-idan-david-aviv-gold" />}
                />
            </div>
        </Section>
    )
}

function PhilosophyCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="flex flex-col h-full p-8 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:border-idan-david-aviv-gold/40 transition-all group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-idan-david-aviv-gold/10 transition-all duration-300">
                {icon}
            </div>
            <h4 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-idan-david-aviv-gold transition-colors">{title}</h4>
            <p className="flex-grow text-idan-david-aviv-gold/50 text-sm leading-relaxed group-hover:text-idan-david-aviv-gold/70 transition-colors">{description}</p>
        </motion.div>
    )
}
