import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import GlassCard from '@/components/ui/GlassCard'

const CONCEPTS = [
    {
        id: 'a',
        title: "The Alchemist's Workstation",
        image: '/assets/concepts/concept_a.png',
        description: "Holographic networks meet mystical research tools. Focuses on 'Scientific Mysticism'."
    },
    {
        id: 'b',
        title: "Celestial Circuitry",
        image: '/assets/concepts/concept_b.png',
        description: "A digital fusion of the Zodiac and neural networks. Elegant and precise."
    },
    {
        id: 'c',
        title: "The Antigravity Core",
        image: '/assets/concepts/concept_c.png',
        description: "An energetic visualization of agentic infrastructure and knowledge threads."
    }
]

const COLOR_SCHEMES = [
    {
        name: 'Deep Royal v2',
        bg: '#0F172A',
        accent: '#08088B',
        secondary: '#4747FF',
        text: '#FFFFFF',
        muted: '#A5B4FC',
        inverted: true
    },
    {
        name: 'Phantom Gold',
        bg: '#0D1117',
        accent: '#2D2310',
        secondary: '#FDE047',
        text: '#F3F4F6',
        muted: '#9CA3AF',
        inverted: true
    },
    {
        name: 'Electric Void',
        bg: '#080C12',
        accent: '#00F2FF',
        secondary: '#0066FF',
        text: '#F0F9FF',
        muted: '#7DD3FC',
        inverted: false
    },
    {
        name: 'Emerald Core',
        bg: '#0D1117',
        accent: '#064E3B',
        secondary: '#10B981',
        text: '#ECFDF5',
        muted: '#6EE7B7',
        inverted: true
    }
]

type ColorScheme = typeof COLOR_SCHEMES[0];

/**
 * Design Lab Page - interactive preview for the new Visual Identity.
 */
export default function DesignLab() {
    const [activeScheme, setActiveScheme] = useState(COLOR_SCHEMES[0].name)

    const applyScheme = (scheme: ColorScheme) => {
        setActiveScheme(scheme.name)
        const root = document.documentElement

        // Simple hex to RGB conversion for CSS variables
        const hexToRgb = (hex: string) => {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            return `${r} ${g} ${b}`
        }

        root.style.setProperty('--accent', hexToRgb(scheme.accent))
        root.style.setProperty('--secondary-accent', hexToRgb(scheme.secondary))
        root.style.setProperty('--base-bg', hexToRgb(scheme.bg))
        root.style.setProperty('--text-base', hexToRgb(scheme.text))
        root.style.setProperty('--text-muted', hexToRgb(scheme.muted))

        // Handle inverted contrast mode (useful for dark accents)
        if (scheme.inverted) {
            root.classList.add('theme-inverted')
        } else {
            root.classList.remove('theme-inverted')
        }
    }

    // Restore default scheme on unmount
    useEffect(() => {
        return () => {
            applyScheme(COLOR_SCHEMES[0])
        }
    }, [])

    return (
        <div className="pt-24 pb-20 w-full max-w-6xl mx-auto px-6">
            <header className="mb-16 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">Design Lab</h1>
                <p className="text-white/60 text-lg">Exploring the next evolution of your visual identity.</p>
            </header>

            {/* Hero Concepts Section */}
            <Section id="concepts" fullWidth className="py-0 mb-20">
                <h2 className="text-2xl font-bold mb-8 text-white/90">Hero Image Concepts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CONCEPTS.map((concept) => (
                        <motion.div
                            key={concept.id}
                            whileHover={{ y: -5 }}
                            className="flex flex-col"
                        >
                            <GlassCard className="overflow-hidden p-0 mb-4 aspect-video">
                                <img
                                    src={concept.image}
                                    alt={concept.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </GlassCard>
                            <h3 className="text-lg font-semibold text-white/90 mb-1">{concept.title}</h3>
                            <p className="text-sm text-white/50">{concept.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Color Palette Section */}
            <Section id="colors" fullWidth className="py-0">
                <h2 className="text-2xl font-bold mb-4 text-white/90">Hierarchical Color Explorer</h2>
                <p className="text-white/40 mb-12 max-w-2xl italic">
                    Managing <span className="text-white/60 font-medium">1st Order</span> (Accents) and
                    <span className="text-white/60 font-medium">2nd Order</span> (Depth) alongside dedicated typographic tokens.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {COLOR_SCHEMES.map((scheme) => (
                        <button
                            key={scheme.name}
                            onClick={() => applyScheme(scheme)}
                            className={`p-6 rounded-2xl border transition-all duration-300 text-left ${activeScheme === scheme.name
                                ? 'border-accent bg-accent/10 shadow-[0_0_20px_rgba(var(--accent),0.1)]'
                                : 'border-white/10 bg-white/2 hover:bg-white/5'
                                }`}
                        >
                            <div className="flex gap-2 mb-6">
                                <div
                                    className="w-10 h-10 rounded-xl border border-white/20 shadow-lg"
                                    style={{ backgroundColor: scheme.accent }}
                                    title="1st Order: Accent"
                                />
                                <div
                                    className="w-10 h-10 rounded-xl border border-white/20 opacity-80"
                                    style={{ backgroundColor: scheme.secondary }}
                                    title="2nd Order: Depth"
                                />
                                <div
                                    className="flex-1 flex flex-col gap-1 justify-center ml-2"
                                >
                                    <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: scheme.text }} title="Text Tone" />
                                    <div className="h-1.5 w-2/3 rounded-full opacity-50" style={{ backgroundColor: scheme.muted }} title="Muted Tone" />
                                </div>
                            </div>
                            <span className="block font-bold text-base-content mb-1">{scheme.name}</span>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] text-muted-content uppercase tracking-tighter">
                                <span>1st: {scheme.accent}</span>
                                <span>Txt: {scheme.text}</span>
                                <span>2nd: {scheme.secondary}</span>
                                <span>Mut: {scheme.muted}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </Section>

            <Section id="preview" fullWidth className="py-20 mt-28 border-t border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-base-content">Depth & Inverse Radiance</h2>
                        <p className="text-muted-content mb-8 leading-relaxed">
                            We are exploring two premium paradigms. <strong className="text-base-content">Depth</strong> adds structural shadows to bright colors, while <strong className="text-base-content">Inverse Radiance</strong> uses a darker accent against a translucent light glow to create a sophisticated &quot;Silhouette&quot; effect.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-base-content font-bold border border-white/10 shadow-[0_0_15px_rgba(var(--accent),0.3)]">1</div>
                                <div>
                                    <h4 className="text-base-content font-medium">1st Order (Accent)</h4>
                                    <p className="text-sm text-muted-content">The primary choice of tone. High energy, primary actions.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary-soft border border-secondary flex items-center justify-center text-secondary font-bold shadow-[0_0_15px_rgba(var(--secondary-accent),0.2)]">2</div>
                                <div>
                                    <h4 className="text-base-content font-medium">2nd Order (Depth)</h4>
                                    <p className="text-sm text-muted-content">The supportive tone for volume, shadows, and categorization.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <GlassCard className="p-8 relative overflow-hidden group">
                        {/* Interactive Fusion Component */}
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-12">
                                <div className="px-4 py-1.5 rounded-full bg-secondary-soft border border-secondary text-secondary text-xs font-bold tracking-widest uppercase">
                                    Depth Context: 2nd Order
                                </div>
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-content">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-base-content mb-4 tracking-tight">The Antigravity Core v2</h3>
                            <p className="text-muted-content mb-8 text-sm max-w-sm">
                                A high-integrity autonomous agent for large-scale knowledge distillation and geometric reasoning.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-3 bg-accent text-base-content font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-accent/20">
                                    Deploy Core
                                </button>
                                <button className="px-8 py-3 border border-secondary text-secondary font-medium rounded-full hover:bg-secondary/5 transition-all">
                                    View Protocol
                                </button>
                            </div>
                        </div>

                        {/* Background Decorative Fusion Glows */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-accent/20 transition-colors" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary-soft filter blur-[80px] rounded-full pointer-events-none group-hover:opacity-60 transition-opacity" />
                    </GlassCard>
                </div>

                <div className="mt-20 p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-center backdrop-blur-3xl">
                    <p className="text-muted-content mb-8 italic text-lg">
                        &quot;Clicking a scheme above will live-apply the colors to the entire site infrastructure.&quot;
                    </p>
                    <div className="flex justify-center flex-wrap gap-6">
                        <button className="px-10 py-3.5 bg-accent text-base-content font-bold rounded-2xl hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-accent/10">
                            Primary Action
                        </button>
                        <button className="px-10 py-3.5 border border-secondary text-secondary font-bold rounded-2xl hover:bg-secondary/5 transition-all">
                            Secondary Action
                        </button>
                    </div>
                </div>
            </Section>
        </div>
    )
}
