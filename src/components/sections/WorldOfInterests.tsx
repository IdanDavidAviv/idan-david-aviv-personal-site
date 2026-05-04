import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Brain, Dna, Telescope, Sparkles } from 'lucide-react'
import Section from '@/components/ui/Section'
import { cn } from '@/lib/utils'

const INTERESTS = [
    {
        id: "neuroscience",
        title: "Biology & Neuroscience",
        icon: Brain,
        color: "text-idan-david-aviv-blue",
        bg: "bg-idan-david-aviv-blue/10",
        border: "border-idan-david-aviv-blue/20",
        content: "Understanding the foundational wetware. Exploring neuroplasticity, dopamine regulation, and how biological states govern cognitive output and flow."
    },
    {
        id: "kabbalah",
        title: "The Shap-Tie Method (Kabbalah)",
        icon: Sparkles,
        color: "text-idan-david-aviv-purple",
        bg: "bg-idan-david-aviv-purple/10",
        border: "border-idan-david-aviv-purple/20",
        content: "A systematic approach to breaking down reality into fundamental energetic components. Using ancient structural frameworks as high-level data models for human intuition."
    },
    {
        id: "astrology",
        title: "Astrology & Cosmic Rhythms",
        icon: Telescope,
        color: "text-idan-david-aviv-gold",
        bg: "bg-idan-david-aviv-gold/10",
        border: "border-idan-david-aviv-gold/20",
        content: "Mapping macro-environmental variables. Recognizing the overarching patterns in time that influence micro-interactions, turning intuitive sense into actionable data."
    },
    {
        id: "systems",
        title: "Deterministic Agentic Systems",
        icon: Dna,
        color: "text-idan-david-aviv-cyan",
        bg: "bg-idan-david-aviv-cyan/10",
        border: "border-idan-david-aviv-cyan/20",
        content: "Translating abstract philosophies and chaotic workflows into strict, reliable, and deeply structured autonomous AI architectures."
    }
]

export default function WorldOfInterests() {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleInterest = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <Section id="world-of-interests" className="pb-32 px-6">
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90">
                        World of Interests
                    </h2>
                    <p className="text-white/50 text-lg font-light max-w-2xl mx-auto">
                        The multidimensional fields driving the underlying architecture.
                    </p>
                </div>

                <div className="w-full space-y-4">
                    {INTERESTS.map((interest) => (
                        <div
                            key={interest.id}
                            className="w-full rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleInterest(interest.id)}
                                className={cn(
                                    "w-full flex items-center justify-between p-6 cursor-pointer hover:bg-white/[0.04] transition-colors",
                                    openId === interest.id && "bg-white/[0.04]"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn("p-3 rounded-xl", interest.bg, interest.border, "border")}>
                                        <interest.icon className={cn("w-6 h-6", interest.color)} />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-medium text-white/90">
                                        {interest.title}
                                    </h3>
                                </div>
                                <motion.div
                                    animate={{ rotate: openId === interest.id ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-2"
                                >
                                    <ChevronDown className="w-5 h-5 text-white/40" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openId === interest.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="p-6 pt-0 text-white/60 leading-relaxed font-light">
                                            {interest.content}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
