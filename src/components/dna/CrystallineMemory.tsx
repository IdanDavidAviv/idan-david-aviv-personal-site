import React from 'react'
import { Activity, Database, Zap } from 'lucide-react'
import Section from '@/components/ui/Section'

export function CrystallineMemory() {
    return (
        <Section id="crystalline-memory" className="pb-16 md:pb-24">
            <div className="text-center space-y-4 mb-12 pt-12 md:pt-16">
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-idan-david-aviv-gold to-idan-david-aviv-gold/60">
                    Persistence Architecture
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-gold to-idan-david-aviv-gold/60">Temporal Ledger</span>
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                    Absolute architectural memory mapped to the local environment.
                </p>
            </div>
            <div className="relative mt-12 p-6 md:p-12 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 overflow-hidden">
                <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                    <div className="flex-1 space-y-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Zero Context Rot</h3>
                        <p className="text-idan-david-aviv-gold/60 leading-relaxed text-base md:text-lg">
                            Standard AI memory decays as the session grows. Virgo-DNA prevents this by anchoring the agent to a unified management system. By forcing the AI to synchronize both its tactical working state and strategic directives directly to the local file system, context rot is eliminated.
                            <strong> A session booted tomorrow has the exact same context as today.</strong>
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                            <MemoryPoint icon={<Activity />} text="Artifact Ledgers: Immutable records of execution" />
                            <MemoryPoint icon={<Database />} text="SSOT Consensus: Auditable truth across modules" />
                            <MemoryPoint icon={<Zap />} text="State Restoration: Instant contextual reboot" />
                        </ul>
                    </div>

                    <div className="w-full lg:w-1/3 grid grid-cols-2 gap-3 md:gap-4">
                        <StatItem label="Tactical State" value="Loom" />
                        <StatItem label="Strategic Map" value="Plans" />
                        <StatItem label="Core Protocols" value="KIs" />
                        <StatItem label="Context Rot" value="Zero" />
                    </div>
                </div>
            </div>
        </Section>
    )
}

function MemoryPoint({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <li className="flex items-center gap-3 text-idan-david-aviv-gold/70">
            <span className="text-idan-david-aviv-gold w-5 h-5 flex-shrink-0">{icon}</span>
            <span className="text-sm">{text}</span>
        </li>
    )
}

function StatItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
            <div className="text-2xl font-bold text-white mb-1 tracking-tighter">{value}</div>
            <div className="text-[10px] text-idan-david-aviv-gold uppercase tracking-widest font-mono">{label}</div>
        </div>
    )
}
