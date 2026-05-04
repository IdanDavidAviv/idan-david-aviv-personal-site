import React from 'react'
import { OctagonPause, MonitorPlay, Database, ScrollText, ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'

export function NeuralBlueprint() {
    return (
        <Section id="neural-blueprint" className="pb-16 md:pb-24">
            <div className="text-center space-y-4 mb-12 pt-12 md:pt-16">
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-idan-david-aviv-gold to-idan-david-aviv-gold/60">
                    Execution Protocol
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-gold to-idan-david-aviv-gold/60">Cognitive Loop</span>
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                    How Virgo-DNA executes complex operations with absolute structural integrity.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <CognitiveStep
                    icon={<MonitorPlay className="text-idan-david-aviv-gold" />}
                    title="Step 1: The Boot Sequence"
                    standard="Standard AI agents start blind, relying entirely on whatever you paste into the context window."
                    virgo="With Virgo-DNA, they boot by actively scanning local Master Plans and pulling Just-In-Time Knowledge Items. This allows them to anchor themselves in your exact architectural state before generating a single word."
                />
                <CognitiveStep
                    icon={<OctagonPause className="text-idan-david-aviv-gold" />}
                    title="Step 2: The Permission Gate"
                    standard="Standard AI agents run in chaotic, infinite loops, often hallucinating changes until they break the codebase."
                    virgo="With Virgo-DNA, execution stops at the Permission Gate. It forces the AI to present a tactical plan and wait, refusing to mutate your project without an explicit human 'GO'."
                />
                <CognitiveStep
                    icon={<Database className="text-idan-david-aviv-gold" />}
                    title="Step 3: The Temporal Ledger"
                    standard="Standard AI agents suffer from context rot, forgetting crucial decisions as soon as the session ends."
                    virgo="With Virgo-DNA, memory is offloaded to the file system. It forces the AI to synchronize every action into local artifact ledgers, guaranteeing that a new session tomorrow boots up with the exact same context as today."
                />
                <CognitiveStep
                    icon={<ScrollText className="text-idan-david-aviv-gold" />}
                    title="Step 4: The SITREP Ceremony"
                    standard="Standard AI agents simply stop generating text, leaving you to manually verify the code."
                    virgo="With Virgo-DNA, operations conclude with a systemic audit. It forces the AI to verify asset integrity, lock completed checkboxes, and explicitly report the structural status back to the human commander."
                />
            </div>
        </Section>
    )
}

function CognitiveStep({ icon, title, standard, virgo }: { icon: React.ReactNode, title: string, standard: string, virgo: string }) {
    return (
        <div className="p-6 md:p-8 rounded-[2rem] bg-white/5 border border-white/10 transition-all flex flex-col h-full group">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            </div>

            <div className="flex-grow flex flex-col gap-4">
                <div className="p-4 rounded-xl bg-[#0f0f15] border border-white/10">
                    <span className="text-white/50 text-xs font-mono uppercase tracking-widest mb-2 block">Agents currently</span>
                    <p className="text-white/60 text-sm leading-relaxed">{standard}</p>
                </div>

                <div className="flex justify-center -my-2 z-10">
                    <ArrowRight className="w-5 h-5 text-idan-david-aviv-gold/50 rotate-90 md:rotate-0 hidden" />
                </div>

                <div className="p-4 rounded-xl bg-idan-david-aviv-gold/5 border border-idan-david-aviv-gold/20 flex-grow relative overflow-hidden group-hover:border-idan-david-aviv-gold/40 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-idan-david-aviv-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-idan-david-aviv-gold text-xs font-mono uppercase tracking-widest mb-2 block relative z-10">With Virgo-DNA</span>
                    <p className="text-idan-david-aviv-gold/80 text-sm leading-relaxed relative z-10">{virgo}</p>
                </div>
            </div>
        </div>
    )
}
