import React from 'react'
import { motion } from 'framer-motion'
import { Activity, Network, Cpu, Database, Sparkles, Zap } from 'lucide-react'
import Section from '@/components/ui/Section'

export function DNAPhilosophy() {
    return (
        <Section id="dna-philosophy">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter"
                >
                    The DNA <span className="text-idan-david-aviv-gold">Philosophy</span>
                </motion.h2>
                <p className="max-w-3xl mx-auto text-idan-david-aviv-gold/40 text-lg md:text-xl font-light">
                    Engineering 100X efficiency by cleaning the noise from the agent runtime.
                    Stabilizing behavior through orchestrated paths and persistent memory.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PhilosophyCard
                    title="Behavioral Stabilization"
                    description="Shifting from probabilistic guessing to deterministic execution. Codifying identity to eliminate erratic agent behavior."
                    icon={<Activity className="text-idan-david-aviv-gold" />}
                />
                <PhilosophyCard
                    title="Path Orchestration"
                    description="Designing success through proactive workflows and skills. The agent follows high-integrity roadmaps, not trial-and-error."
                    icon={<Network className="text-idan-david-aviv-gold" />}
                />
                <PhilosophyCard
                    title="Noise Reduction"
                    description="Automating 'repetitive nonsense' via code. Freeing the cognitive runtime to focus purely on high-level thinking."
                    icon={<Cpu className="text-idan-david-aviv-gold" />}
                />
                <PhilosophyCard
                    title="SSOT Consensus"
                    description="Thinking based on a Source of Truth. The agent audits historical data instead of hallucinating from transient logs."
                    icon={<Database className="text-idan-david-aviv-gold" />}
                />
                <PhilosophyCard
                    title="Self-Maintainability"
                    description="A system that audits and improves itself. Zero contextual leakage through crystalline architectural memory."
                    icon={<Sparkles className="text-idan-david-aviv-gold" />}
                />
                <PhilosophyCard
                    title="100X Performance"
                    description="Saving time, money, and developer frustration by solving problems once and locking them at the SSOT baseline."
                    icon={<Zap className="text-idan-david-aviv-gold" />}
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
