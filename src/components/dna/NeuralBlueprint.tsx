import React from 'react'
import { Shield, Cpu, Zap } from 'lucide-react'
import Section from '@/components/ui/Section'

export function NeuralBlueprint() {
    return (
        <Section id="neural-blueprint">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Neural Blueprint</h2>
                <p className="text-idan-david-aviv-gold/40 text-lg uppercase tracking-widest font-mono">Algorithmic Governance & Logic</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <FeatureCard
                    icon={<Shield className="text-idan-david-aviv-gold" />}
                    title="Permission Protocol"
                    description="Strict 'Calm Execution' logic ensuring no state changes occur without explicit human authorization."
                />
                <FeatureCard
                    icon={<Cpu className="text-idan-david-aviv-gold" />}
                    title="Operation Commander"
                    description="A meta-skill orchestrating implementation integrity through mandatory reconnaissance and planning."
                />
                <FeatureCard
                    icon={<Zap className="text-idan-david-aviv-gold" />}
                    title="Windows Protocol"
                    description="Tailored high-integrity terminal execution standards for PowerShell environments."
                />
            </div>
        </Section>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-idan-david-aviv-gold/30 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-idan-david-aviv-gold/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
            <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {icon}
            </div>
            <h4 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-idan-david-aviv-gold transition-colors">{title}</h4>
            <p className="text-idan-david-aviv-gold/50 text-sm leading-relaxed">{description}</p>
        </div>
    )
}
