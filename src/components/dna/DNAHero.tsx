import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Dna, Brain } from 'lucide-react'

/**
 * DNAHero Component
 * The foundational visual entry point for the Virgo DNA Showcase.
 */
export function DNAHero() {
    return (
        <div className="w-full flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative w-full max-w-7xl rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center py-16 px-4 sm:px-8 md:py-28 md:px-24"
            >
                {/* Hero Asset Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/dna/hero-helix.png"
                        alt="Agent DNA Neural Slipstream"
                        className="w-full h-full object-cover opacity-80"
                    />

                    {/* Premium Grain Overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <filter id="noiseFilter">
                                <feTurbulence
                                    type="fractalNoise"
                                    baseFrequency="0.65"
                                    numOctaves="3"
                                    stitchTiles="stitch" />
                            </filter>
                            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                        </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050510]/80 via-transparent to-[#050510]/80" />
                </div>

                {/* Glassmorphism Title Card */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center w-[90%] sm:w-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="p-8 md:px-16 md:py-12 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)] w-full sm:w-auto flex flex-col items-center"
                    >
                        <div className="flex items-center justify-center gap-2 md:gap-4 mb-2 md:mb-4">
                            <Dna className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-idan-david-aviv-gold animate-pulse" />
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] uppercase relative text-center">
                                Virgo DNA
                            </h1>
                            <Brain className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-idan-david-aviv-gold animate-pulse" />
                        </div>

                        <h2 className="text-xl md:text-2xl font-medium tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-idan-david-aviv-gold to-white drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                            The Cognitive Operating System for AI.
                        </h2>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                            <Link to="#interactive-circuits" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-idan-david-aviv-gold/10 border border-idan-david-aviv-gold/50 text-idan-david-aviv-gold font-bold tracking-wide hover:bg-idan-david-aviv-gold hover:text-[#050510] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] text-center">
                                Explore the Architecture
                            </Link>
                            <Link to="#support-vision" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent border border-white/20 text-white/70 font-medium hover:bg-white/10 hover:text-white transition-all duration-300 text-center">
                                Support the Vision
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Extracted Manifesto Text */}
            <div className="mt-12 md:mt-20 w-full max-w-4xl px-4 text-center z-10 relative">
                <p className="text-idan-david-aviv-gold/90 text-lg md:text-xl font-light leading-relaxed">
                    {/* Mobile Version (Fragmented) */}
                    <span className="block md:hidden">
                        Designed for large-scale codebases<br />
                        Virgo-DNA acts as a universal<br />
                        context management codex<br /><br />
                        Elevating any AI<br />
                        from a chaotic assistant<br />
                        into a highly-disciplined<br />
                        embedded Project Manager<br /><br />
                        Offload meta-management<br />
                        protect your flow state<br />
                        and build complex systems<br />
                        at the speed of thought<br /><br />
                        Stop fighting your tools<br />
                        Start focus on building<br />
                        great things together
                    </span>
                    {/* PC Version (3 Lines) */}
                    <span className="hidden md:block">
                        Designed for large-scale codebases - Virgo-DNA acts as a universal context management codex.<br />
                        Elevating any AI from a chaotic assistant into a highly-disciplined, embedded Project Manager.<br />
                        Offload meta-management, protect your flow state, and build complex systems at the speed of thought.<br />
                        Stop fighting your tools - Start focus on building great things together.
                    </span>
                </p>
            </div>
        </div>
    )
}
