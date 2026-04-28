import { motion } from 'framer-motion'
import { Dna, Brain } from 'lucide-react'

/**
 * DNAHero Component
 * The foundational visual entry point for the Virgo DNA Showcase.
 */
export function DNAHero() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-7xl min-h-[70vh] md:min-h-[60vh] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center p-4 sm:p-8 md:p-24"
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
            <div className="relative z-10 w-full flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="p-6 sm:p-8 md:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)] w-full max-w-4xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-2 md:gap-4 mb-2 md:mb-4">
                        <Dna className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-idan-david-aviv-gold animate-pulse" />
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-idan-david-aviv-gold to-idan-david-aviv-gold/80 uppercase relative text-center">
                            Virgo DNA
                        </h1>
                        <Brain className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-idan-david-aviv-gold animate-pulse" />
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-medium text-idan-david-aviv-gold mb-6 tracking-wide drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                        The Cognitive Operating System for AI.
                    </h2>
                    
                    <p className="max-w-3xl mx-auto text-idan-david-aviv-gold/70 text-base md:text-lg font-light leading-relaxed">
                        Designed for large-scale codebases, <br />
                        Virgo acts as a universal <br />
                        context management codex<br />
                        elevating any AI <br />
                        from a chaotic assistant  <br />
                        into a highly-disciplined, <br />
                        embedded Project Manager. <br /><br />
                        Offload the meta-management, <br />
                        protect your flow state, <br />
                        and build complex systems <br />
                        at the speed of thought. <br /><br />

                        Stop fighting your tools. <br />
                        They are your partners<br />
                        help them help you<br />
                        and build together.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#neural-blueprint" className="px-8 py-3 rounded-full bg-idan-david-aviv-gold text-[#050510] font-bold tracking-wide hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                            Explore the DNA
                        </a>
                        <a href="#dna-philosophy" className="px-8 py-3 rounded-full bg-white/5 border border-idan-david-aviv-gold/30 text-white font-medium hover:bg-white/10 transition-colors">
                            Read the Manifesto
                        </a>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
