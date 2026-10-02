import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BrainCircuit, Bot, Layers, Compass, ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'

interface ServiceItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
    link?: string;
    linkText?: string;
    isFlagship?: boolean;
}

const SERVICES: ServiceItem[] = [
    {
        title: "Business AI Brain",
        badge: "Flagship Architecture",
        description: "Sovereign enterprise AI infrastructure connecting your files, CRM, and team knowledge into a dedicated reasoning engine with deterministic truth data.",
        icon: <BrainCircuit className="w-6 h-6 text-idan-david-aviv-cyan -scale-x-100" />,
        link: "/ai-brain",
        linkText: "Explore AI Brain",
        isFlagship: true,
    },
    {
        title: "Autonomous AI Agents",
        description: "Custom multi-agent workflows and background agentic systems designed to execute complex, multi-step operations without manual intervention.",
        icon: <Bot className="w-6 h-6 text-idan-david-aviv-gold" />,
    },
    {
        title: "AI Architecture & Systems Integration",
        description: "Practical, secure integration of LLMs with your existing operational stack — Monday, Priority, CRM, APIs, and proprietary databases.",
        icon: <Layers className="w-6 h-6 text-idan-david-aviv-gold" />,
    },
    {
        title: "Strategic AI Consulting",
        description: "Direct, 1-on-1 technical guidance for founders and leadership teams. We map bottlenecks, eliminate noise, and design your AI roadmap.",
        icon: <Compass className="w-6 h-6 text-idan-david-aviv-gold" />,
    }
]

export default function Services() {
    return (
        <Section id="services" className="pb-16 md:pb-24">
            <div className="text-center mb-16 pt-12 md:pt-16 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter"
                >
                    Services <span className="text-idan-david-aviv-gold">I Offer</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto text-idan-david-aviv-gold/60 text-lg md:text-xl font-light"
                >
                    Sovereign AI systems, agentic architectures, and strategic technical consulting.
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

function ServiceCard({ title, description, icon, badge, link, linkText, isFlagship, index }: ServiceItem & { index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`flex flex-col p-8 rounded-[2rem] bg-white/[0.02] backdrop-blur-3xl border transition-all duration-500 group relative overflow-hidden ${
                isFlagship
                    ? 'border-idan-david-aviv-cyan/30 hover:border-idan-david-aviv-cyan/60 hover:shadow-[0_0_40px_-10px_rgba(0,240,255,0.2)]'
                    : 'border-white/10 hover:border-idan-david-aviv-gold/40'
            }`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
                <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ${
                        isFlagship
                            ? 'bg-idan-david-aviv-cyan/10 group-hover:bg-idan-david-aviv-cyan/20'
                            : 'bg-white/5 group-hover:bg-idan-david-aviv-gold/10'
                    }`}
                >
                    {icon}
                </div>

                {badge && (
                    <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-idan-david-aviv-cyan/10 text-idan-david-aviv-cyan border border-idan-david-aviv-cyan/25 font-mono font-medium">
                        {badge}
                    </span>
                )}
            </div>

            <h3
                className={`text-2xl font-bold text-white mb-3 tracking-tight transition-colors duration-500 ${
                    isFlagship ? 'group-hover:text-idan-david-aviv-cyan' : 'group-hover:text-idan-david-aviv-gold'
                }`}
            >
                {title}
            </h3>

            <p className="text-white/50 text-sm md:text-base leading-relaxed group-hover:text-white/70 transition-colors duration-500 font-light flex-grow">
                {description}
            </p>

            {link && (
                <div className="pt-4 mt-auto">
                    <Link
                        to={link}
                        className="inline-flex items-center gap-2 text-sm font-medium text-idan-david-aviv-cyan hover:text-white transition-colors duration-300 group/link"
                    >
                        <span>{linkText}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                </div>
            )}
        </motion.div>
    )
}
