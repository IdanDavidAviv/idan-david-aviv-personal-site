import { motion } from 'framer-motion'
import {

    ChevronRight,
    ExternalLink
} from 'lucide-react'
import Section from '@/components/ui/Section'

const ECOSYSTEM = {
    infrastructure: [
        {
            name: 'Supabase',
            role: 'Backend & Security',
            logo: 'https://svgl.app/library/supabase.svg',
            link: 'https://supabase.com',
            description: 'High-integrity database with Row Level Security (RLS) and real-time synchronization.'
        },

        {
            name: 'Firebase',
            role: 'Analytics & Hosting',
            logo: 'https://svgl.app/library/firebase.svg',
            link: 'https://firebase.google.com',
            description: 'Unified hosting infrastructure and deep behavioral analytics for performance tracking.'
        },
        {
            name: 'Google Core',
            role: 'Identity & Search',
            logo: 'https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg',
            link: 'https://google.com',
            description: 'Advanced OAuth identity gates and Search Console health monitoring.'
        },
        {
            name: 'Meta Tech',
            role: 'Social Identity',
            logo: 'https://svgl.app/library/meta.svg',
            link: 'https://facebook.com',
            description: 'High-trust social integration layer for cross-platform verification.'
        },
        {
            name: 'BigDataCloud',
            role: 'Geospatial Intel',
            logo: 'https://www.bigdatacloud.com/favicon.ico',
            link: 'https://bigdatacloud.com',
            description: 'High-speed reverse geocoding for automated location-aware calculations.'
        },
        {
            name: 'Swiss Ephemeris',
            role: 'Astronomy Engine',
            logo: 'https://www.astro.com/favicon.ico',
            link: 'https://www.astro.com/swisseph/',
            description: 'The world standard for high-precision celestial calculations and planetary data.'
        }
    ],
    arsenal: [
        {
            name: 'React 18+',
            logo: 'https://svgl.app/library/react_light.svg',
            link: 'https://react.dev',
            details: ['Concurrent UI', 'Atomic State', 'Custom Hooks']
        },
        {
            name: 'TypeScript',
            logo: 'https://svgl.app/library/typescript.svg',
            link: 'https://www.typescriptlang.org',
            details: ['Strict Core', 'Deep Interfaces', 'Zero Runtime']
        },
        {
            name: 'Tailwind CSS',
            logo: 'https://svgl.app/library/tailwindcss.svg',
            link: 'https://tailwindcss.com',
            details: ['Atomic CSS', 'Utility First', 'Logical Props']
        },
        {
            name: 'Node.js',
            logo: 'https://svgl.app/library/nodejs.svg',
            link: 'https://nodejs.org',
            details: ['V8 Engine', 'SSR Ready', 'Scalable I/O']
        },
        {
            name: 'npm',
            logo: 'https://svgl.app/library/npm.svg',
            link: 'https://www.npmjs.com',
            details: ['Vast Registry', 'Dependency MGMT', 'Safe Scripts']
        },
        {
            name: 'Vite',
            logo: 'https://svgl.app/library/vite.svg',
            link: 'https://vitejs.dev',
            details: ['Fast ESM', 'HMR Core', 'Rollup Polish']
        }
    ],
    agentic: [
        {
            name: 'Antigravity',
            role: 'AI Agentic Core',
            logo: 'https://svgl.app/library/antigravity.svg',
            link: 'https://antigravity.google',
            description: 'Autonomous AI-Agentic development core by Google Deepmind, driving rapid feature delivery.'
        },
        {
            name: 'GitHub',
            role: 'Source of Truth',
            logo: 'https://svgl.app/library/github_dark.svg',
            link: 'https://github.com',
            description: 'Source of Truth management with high-integrity Git protocols and collaboration.'
        },
        {
            name: 'GitHub Actions',
            role: 'CI/CD Flow',
            logo: 'https://logo.svgcdn.com/logos/github-actions.svg',
            link: 'https://github.com/features/actions',
            description: 'Automated deployment pipelines and quality gate enforcement.'
        }
    ]
}

/**
 * Spirit Lab Showcase Page - Technical Teaser Upgrade
 * A high-impact engineering showcase designed to attract high-tier opportunities.
 */
export default function SpiritLabShowcase() {
    return (
        <div className="min-h-screen w-full bg-[#0a0514] py-20 px-4 md:px-8 lg:px-12 flex flex-col items-center">
            {/* The "Box" containing the Spirit Lab World */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-7xl mystical-bg rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.6)] relative"
            >
                {/* Internal Glow Accents */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold-600/10 blur-[120px] rounded-full" />
                </div>

                {/* 1. Celestial Hero Section */}
                <Section id="showcase-hero" fullWidth className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 px-6">
                    <div className="relative z-10 text-center space-y-10 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="flex flex-col items-center space-y-8"
                        >
                            <motion.img
                                initial={{ scale: 0.8, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
                                src="/assets/flask-only-no-bg.png"
                                alt="Spirit Lab Flask"
                                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_50px_rgba(255,215,0,0.5)] cursor-pointer hover:scale-110 transition-transform"
                            />
                            <div className="space-y-4">
                                <img
                                    src="/assets/spirit-research-lab-fulltext-no-bg.png"
                                    alt="Spirit Research Lab"
                                    className="h-16 md:h-24 lg:h-28 object-contain opacity-95 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] mx-auto"
                                />
                                <div className="h-1 w-24 bg-gold-500/40 mx-auto rounded-full blur-[1px]" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="space-y-6"
                        >
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white/90 font-rubik">
                                Engineering the <span className="text-gold-400">Ineffable</span>.
                            </h1>
                            <p className="text-xl md:text-2xl text-mystic-200 font-light leading-relaxed max-w-3xl mx-auto italic">
                                &quot;A technical masterclass in architectural astrology, numeric resonance, and schema-first data stabilization.&quot;
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="flex flex-wrap justify-center gap-8 pt-10"
                        >
                            <button className="amber-glass premium-glow px-12 py-5 rounded-full text-gold-50 font-bold text-lg transition-all hover:scale-105 hover:brightness-110 active:scale-95 shadow-[0_0_30px_rgba(217,119,6,0.2)]">
                                Experience the Calculator
                            </button>
                            <button className="glass-card px-12 py-5 rounded-full text-white/90 font-semibold text-lg hover:bg-white/15 transition-all active:scale-95 border-white/20">
                                View Technical Docs
                            </button>
                        </motion.div>
                    </div>
                </Section>

                {/* 2. Autonomous Velocity Section (Lead with Innovation) */}
                <Section id="agentic" className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-mystic-500/[0.05]">
                    <div className="max-w-6xl mx-auto space-y-20">
                        <div className="text-center space-y-6">
                            <h2 className="text-sm uppercase tracking-[0.4em] text-mystic-400 font-bold">Autonomous Velocity</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white/90 font-rubik overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    className="block"
                                >
                                    The Future of Code.
                                </motion.span>
                            </h3>
                            <p className="max-w-2xl mx-auto text-mystic-400 text-lg font-light leading-relaxed">
                                Beyond manual execution—we leverage high-speed autonomous agents
                                to architect, validate, and scale with unprecedented speed and accuracy.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {ECOSYSTEM.agentic.map((agent) => (
                                <motion.div
                                    key={agent.name}
                                    whileHover={{ y: -5 }}
                                    className="glass-card p-10 group border-white/5 hover:border-mystic-400/30 transition-all duration-500"
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] p-3 flex items-center justify-center border border-white/5 group-hover:bg-white/[0.06] transition-all">
                                            <img src={agent.logo} alt={agent.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                        <a href={agent.link} target="_blank" rel="noopener noreferrer" className="text-mystic-500 hover:text-mystic-300 transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <h4 className="text-2xl font-bold text-white/90 group-hover:text-mystic-300 transition-colors uppercase tracking-tight">{agent.name}</h4>
                                            <p className="text-mystic-500/60 text-[10px] font-mono uppercase tracking-[0.2em]">{agent.role}</p>
                                        </div>
                                        <p className="text-mystic-400 leading-relaxed font-light text-sm">{agent.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* 3. The Distributed Engine Section (formerly Infrastructure) */}
                <Section id="infrastructure" className="py-32 px-6 border-t border-white/5 bg-white/[0.01]">
                    <div className="max-w-6xl mx-auto space-y-20">
                        <div className="text-center space-y-6">
                            <h2 className="text-sm uppercase tracking-[0.4em] text-mystic-500 font-bold">The Distributed Engine</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white/90 font-rubik overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    className="block"
                                >
                                    Production-Grade Scale.
                                </motion.span>
                            </h3>
                            <p className="max-w-2xl mx-auto text-mystic-400 text-lg font-light leading-relaxed">
                                Leveraging enterprise-standard providers to deliver a resilient,
                                low-latency ecosystem that puts the user at the center.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ECOSYSTEM.infrastructure.map((service) => (
                                <motion.div
                                    key={service.name}
                                    whileHover={{ y: -5 }}
                                    className="glass-card p-10 group border-white/5 hover:border-gold-500/30 transition-all duration-500"
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] p-3 flex items-center justify-center border border-white/5 group-hover:bg-white/[0.06] transition-all">
                                            <img src={service.logo} alt={service.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                        <a href={service.link} target="_blank" rel="noopener noreferrer" className="text-mystic-500 hover:text-gold-400 transition-colors p-2">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <h4 className="text-2xl font-bold text-white/90 group-hover:text-gold-300 transition-colors uppercase tracking-tight">{service.name}</h4>
                                            <p className="text-gold-500/60 text-[10px] font-mono uppercase tracking-[0.2em]">{service.role}</p>
                                        </div>
                                        <p className="text-mystic-400 leading-relaxed font-light text-sm">{service.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* 4. Craft & Interaction Section (formerly The Arsenal) */}
                <Section id="arsenal" className="py-32 px-6 border-t border-white/5">
                    <div className="max-w-6xl mx-auto space-y-20">
                        <div className="text-center space-y-6">
                            <h2 className="text-sm uppercase tracking-[0.4em] text-gold-500 font-bold">Craft & Interaction</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white/90 font-rubik overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    className="block"
                                >
                                    Immersive Engineering.
                                </motion.span>
                            </h3>
                            <p className="max-w-2xl mx-auto text-mystic-400 text-lg font-light leading-relaxed">
                                We combine high-fidelity glassmorphism with atomic state management
                                to build interfaces that aren&apos;t just seen—they are experienced.
                            </p>
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-3 md:grid-cols-3 gap-6">
                            {ECOSYSTEM.arsenal.map((tech) => (
                                <motion.div
                                    key={tech.name}
                                    whileHover={{ scale: 1.05 }}
                                    className="amber-glass p-8 text-center space-y-6 group border border-white/5"
                                >
                                    <div className="w-14 h-14 mx-auto filter grayscale group-hover:grayscale-0 group-hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-500">
                                        <img src={tech.logo} alt={tech.name} className="w-full h-full object-contain" />
                                    </div>
                                    <h5 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] group-hover:text-gold-300 transition-colors">{tech.name}</h5>
                                    <div className="flex flex-wrap justify-center gap-1">
                                        {tech.details.map(detail => (
                                            <span key={detail} className="text-[8px] font-mono text-gold-500/40 opacity-0 group-hover:opacity-100 transition-opacity">{detail}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* 7. Call to Action - The Pitch */}
                <Section id="cta" className="py-32 px-6 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-600/5 blur-[120px] rounded-full pointer-events-none" />
                    <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                        <h3 className="text-5xl md:text-7xl font-black text-white/95 leading-tight">
                            From 0 to Production <br /> <span className="text-gold-400">At your own pace.</span>
                        </h3>
                        <p className="text-2xl text-mystic-300 font-light max-w-2xl mx-auto leading-relaxed">
                            I specialize in stabilizing complex data and crafting premium immersive interfaces.
                            <span className="block mt-4 text-white/80 font-medium italic">
                                &quot;I can get you from 0 to maintaining your own free hosted website as fast as you can learn — it&apos;s up to you.&quot;
                            </span>
                        </p>

                        {/* Design Synthesis Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-12 mt-10 border-gold-500/20 bg-gradient-to-br from-gold-500/[0.02] to-transparent overflow-hidden relative"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-gold-500/20" />
                            <div className="space-y-8 text-left max-w-2xl">
                                <h4 className="text-sm uppercase tracking-[0.3em] text-gold-500 font-bold">The Design Synthesis</h4>
                                <h5 className="text-3xl font-bold text-white/90 leading-snug">
                                    Bridging the gap between <span className="text-gold-300 italic">Myth</span> and <span className="text-gold-300 italic">Method</span>.
                                </h5>
                                <p className="text-mystic-400 leading-relaxed font-light text-lg">
                                    My approach is rooted in **Structural Immersion**. We don&apos;t just build interfaces; we architect environments. By fusing high-fidelity Glassmorphism with RTL-first Hebrew compliance and strictly governed Type systems, we create digital spaces that feel alive, stable, and deeply purposeful.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-[10px] text-mystic-500 uppercase tracking-widest font-bold">RTL-Safe Design</div>
                                    <div className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-[10px] text-mystic-500 uppercase tracking-widest font-bold">Data-Driven Mysticism</div>
                                    <div className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-[10px] text-mystic-500 uppercase tracking-widest font-bold">Premium Immersion</div>
                                </div>
                            </div>
                            <img src="/assets/flask-only-no-bg.png" alt="" className="absolute -bottom-10 -right-10 w-48 h-48 object-contain opacity-[0.03] rotate-12" />
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="amber-glass premium-glow px-16 py-6 rounded-full text-gold-50 font-black text-2xl shadow-[0_0_50px_rgba(217,119,6,0.3)] transition-all"
                        >
                            Secure a Project Link
                            <ChevronRight className="inline-block ml-3 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                        <p className="text-mystic-500 uppercase tracking-widest text-xs font-bold pt-8">
                            Available for Senior-Level Collaborations & Architect-as-a-Service
                        </p>
                    </div>
                </Section>

                {/* Bottom Frame Polish */}
                <div className="h-1 w-2/3 mx-auto bg-gradient-to-r from-transparent via-gold-500/30 to-transparent blur-sm rounded-full absolute bottom-8 left-1/2 -translate-x-1/2" />
            </motion.div>
        </div>
    )
}







