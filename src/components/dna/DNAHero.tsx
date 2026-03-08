import { motion } from 'framer-motion'
import { Dna, Brain } from 'lucide-react'

/**
 * DNAHero Component
 * The foundational visual entry point for the Antigravity DNA Showcase.
 */
export function DNAHero() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-7xl aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
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
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="p-6 md:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)]"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <Dna className="w-8 h-8 md:w-12 md:h-12 text-idan-david-aviv-gold animate-pulse" />
                        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-idan-david-aviv-gold to-idan-david-aviv-gold/80 uppercase relative">
                            Antigravity DNA
                        </h1>
                        <Brain className="w-8 h-8 md:w-12 md:h-12 text-idan-david-aviv-gold animate-pulse" />
                    </div>
                    <p className="max-w-2xl mx-auto text-idan-david-aviv-gold/70 text-lg md:text-xl font-light leading-relaxed">
                        The Foundation of Agent Reliability. <br className="hidden md:block" />
                        A path-orchestrated ecosystem for 100X deterministic performance.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <span className="px-4 py-1.5 rounded-full bg-idan-david-aviv-gold/20 border border-idan-david-aviv-gold/30 text-idan-david-aviv-gold text-xs font-mono uppercase tracking-widest">
                            stabilization protocol
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-idan-david-aviv-gold/20 border border-idan-david-aviv-gold/30 text-idan-david-aviv-gold text-xs font-mono uppercase tracking-widest">
                            path-orchestration
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-idan-david-aviv-gold/20 border border-idan-david-aviv-gold/30 text-idan-david-aviv-gold text-xs font-mono uppercase tracking-widest">
                            self-maintainability
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
