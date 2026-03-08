import React from 'react'
import { Binary, Activity, Database, Zap } from 'lucide-react'
import Section from '@/components/ui/Section'

export function CrystallineMemory() {
    return (
        <Section id="crystalline-memory">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Crystalline Memory</h2>
                <p className="text-idan-david-aviv-gold/40 text-lg uppercase tracking-widest font-mono">The Persistent Knowledge Base</p>
            </div>
            <div className="relative mt-12 p-6 md:p-12 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none z-0">
                    <Binary className="w-48 h-48 md:w-64 md:h-64 text-idan-david-aviv-gold" />
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                    <div className="flex-1 space-y-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">The KI Ecosystem</h3>
                        <p className="text-idan-david-aviv-gold/60 leading-relaxed text-base md:text-lg">
                            Knowledge Items (KIs) are more than documentation—they are distilled patterns of success.
                            By decoupling context from transient chat tokens, the project achieves true <strong>Persistent Context</strong>.
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                            <MemoryPoint icon={<Activity />} text="Interconnected Bridges: Logical dependencies between domains" />
                            <MemoryPoint icon={<Database />} text="SSOT Consensus: Real-time synchronization across modules" />
                            <MemoryPoint icon={<Zap />} text="Knowledge Lock: Enterprise-grade validation" />
                        </ul>
                    </div>

                    <div className="w-full lg:w-1/3 grid grid-cols-2 gap-3 md:gap-4">
                        <StatItem label="Active KIs" value="24" />
                        <StatItem label="Protocols" value="18" />
                        <StatItem label="Context" value="Persistent" />
                        <StatItem label="Bridges" value="Structural" />
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
