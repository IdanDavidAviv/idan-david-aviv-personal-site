import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Brain, Dna, Sparkles, Activity } from 'lucide-react'
import Section from '@/components/ui/Section'
import { cn } from '@/lib/utils'

const KNOWLEDGE_STRUCTURE = [
    {
        title: "The Biological & Behavioral Core",
        supTitle: "The Source",
        icon: Activity,
        color: "text-idan-david-aviv-blue",
        bg: "bg-idan-david-aviv-blue/10",
        border: "border-idan-david-aviv-blue/20",
        items: [
            "Nature and people",
            "Natural Sciences",
            "The Human Mind & Human Experience",
            "Emotional Work"
        ]
    },
    {
        title: "The Structural & Systems Core",
        supTitle: "The Body",
        icon: Dna,
        color: "text-idan-david-aviv-cyan",
        bg: "bg-idan-david-aviv-cyan/10",
        border: "border-idan-david-aviv-cyan/20",
        items: [
            "Exact Sciences",
            "Engineering",
            "Artificial Intelligence (AI)",
            "Software & Hardware Architectures",
            "Systemic Thinking & Design"
        ]
    },
    {
        title: "The Metaphysical & Diagnostic Core",
        supTitle: "The Context",
        icon: Sparkles,
        color: "text-idan-david-aviv-purple",
        bg: "bg-idan-david-aviv-purple/10",
        border: "border-idan-david-aviv-purple/20",
        items: [
            "Classical Kabbalah (Zohar, Sefer Yetzira, HaARI)",
            "Practical Kabbalah (Shabtay Method)",
            "Astrology",
            "Numerology"
        ]
    }
]

export default function WorldOfInterests() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Section id="world-of-interests" className="pb-32 px-6">
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
                
                <div className="w-full rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-500">
                    {/* The Single Collapsible Header */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "w-full flex items-center justify-between p-6 md:p-8 cursor-pointer hover:bg-white/[0.04] transition-colors",
                            isOpen && "bg-white/[0.04]"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                <Brain className="w-6 h-6 text-white/80" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl md:text-2xl font-medium text-white/90">
                                    Sources of inspiration
                                </h3>
                                <p className="text-white/50 text-sm md:text-base font-light mt-1">
                                    Expand to explore the multidimensional knowledge architecture
                                </p>
                            </div>
                        </div>
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-2"
                        >
                            <ChevronDown className="w-6 h-6 text-white/40" />
                        </motion.div>
                    </button>

                    {/* The Expanded Content Area */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like ease
                            >
                                <div className="p-6 md:p-8 pt-0 border-t border-white/5 mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                        {KNOWLEDGE_STRUCTURE.map((group, idx) => (
                                            <div key={idx} className="flex flex-col space-y-4">
                                                {/* Group Header */}
                                                <div className="flex flex-col space-y-3 mb-2">
                                                    <span className={cn("text-[11px] font-bold tracking-[0.2em] uppercase opacity-80", group.color)}>
                                                        {group.supTitle}
                                                    </span>
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn("p-2 rounded-lg", group.bg, group.border, "border")}>
                                                            <group.icon className={cn("w-4 h-4", group.color)} />
                                                        </div>
                                                        <h4 className="text-white/90 font-medium text-[13px] tracking-wide uppercase">
                                                            {group.title}
                                                        </h4>
                                                    </div>
                                                </div>
                                                
                                                {/* Items List */}
                                                <ul className="flex flex-col space-y-2">
                                                    {group.items.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-white/60 text-sm leading-relaxed font-light">
                                                            <span className="text-white/20 mt-1">•</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Section>
    )
}
