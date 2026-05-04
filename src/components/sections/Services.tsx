import { motion } from 'framer-motion'
import { Layout, TerminalSquare, Network, HeartHandshake } from 'lucide-react'
import Section from '@/components/ui/Section'
import { cn } from '@/lib/utils'

const SERVICES = [
    {
        title: "Sovereign Web Architecture",
        description: "Bespoke, high-fidelity personal sites engineered for professionals. Designed to reflect your unique identity with absolute clarity.",
        icon: <Layout className="w-6 h-6 text-idan-david-aviv-gold" />
    },
    {
        title: "AI-Driven Software Engineering",
        description: "End-to-end development of custom software. From complex web applications to deeply integrated AI systems, built for stability and scale.",
        icon: <TerminalSquare className="w-6 h-6 text-idan-david-aviv-gold" />
    },
    {
        title: "Agentic Systems & Workflows",
        description: "Architecting intelligent entities. Whether it's a focused multi-agent ecosystem or a centralized mega-agent, I build systems that operate with true autonomy.",
        icon: <Network className="w-6 h-6 text-idan-david-aviv-gold" />
    },
    {
        title: "Personal Mentorship & Diagnosis",
        description: "Direct, 1-on-1 guidance utilizing my entire technical and analytical toolkit. We map your blockages, clear the noise, and lock in your optimal flow state.",
        icon: <HeartHandshake className="w-6 h-6 text-idan-david-aviv-gold" />
    }
]

export default function Services() {
    return (
        <Section id="services" className="pb-16 md:pb-24">
            <div className="text-center mb-16 pt-12 md:pt-16 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-6"
                >
                    <div className="px-4 py-1 rounded-full border border-idan-david-aviv-gold/30 bg-idan-david-aviv-gold/5 backdrop-blur-sm">
                        <span className="text-xs font-mono text-idan-david-aviv-gold uppercase tracking-widest">
                            What I Actually Sell
                        </span>
                    </div>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter"
                >
                    Concrete <span className="text-idan-david-aviv-gold">Offerings</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto text-idan-david-aviv-gold/60 text-lg md:text-xl font-light"
                >
                    Premium capabilities built to optimize your execution runway and protect your flow state.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4 md:px-8">
                {SERVICES.map((service, index) => (
                    <ServiceCard key={index} {...service} index={index} />
                ))}
            </div>
        </Section>
    )
}

function ServiceCard({ title, description, icon, index }: { title: string, description: string, icon: React.ReactNode, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="flex flex-col p-8 rounded-[2rem] bg-white/[0.02] backdrop-blur-3xl border border-white/10 hover:border-idan-david-aviv-gold/40 transition-all duration-500 group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-idan-david-aviv-gold/10 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                {icon}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-idan-david-aviv-gold transition-colors duration-500">
                {title}
            </h3>
            
            <p className="text-white/50 text-sm md:text-base leading-relaxed group-hover:text-white/70 transition-colors duration-500 font-light">
                {description}
            </p>
        </motion.div>
    )
}
