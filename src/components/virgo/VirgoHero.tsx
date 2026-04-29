import { motion } from 'framer-motion'
import { Github, Mic } from 'lucide-react'

export function VirgoHero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 px-6 md:px-12 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[800px] h-[800px] bg-gradient-to-br from-[#00f0ff]/20 via-[#cc00ff]/20 to-transparent rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12"
            >
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 mb-6">
                        <Mic className="w-4 h-4 text-[#00f0ff]" />
                        <span className="text-xs font-semibold text-[#00f0ff] uppercase tracking-wider">The Agent Narrator</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="text-white">AI that </span>
                        <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-[#00f0ff] to-[#cc00ff] bg-clip-text text-transparent drop-shadow-sm">talks to YOU.</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-white/60 mb-8 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                        Virgo turns your AI into a vocal collaborator. Instead of stopping to read a wall of text, Virgo reads the plan to you out loud using highly natural Neural Voices.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <a
                            href="https://github.com/IdanDavidAviv/virgo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00f0ff]/50 text-white font-medium flex items-center justify-center gap-3 transition-all group backdrop-blur-md shadow-[0_0_15px_-3px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_-3px_rgba(0,240,255,0.3)]"
                        >
                            <Github className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                            View on GitHub
                        </a>
                    </div>
                </div>

                {/* Hero Asset */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex-1 w-full max-w-md relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#00f0ff]/20 to-[#cc00ff]/20 blur-3xl rounded-full" />
                    <img 
                        src="/assets/virgo/virgo_symbol_text_orb.png" 
                        alt="Virgo Neon Symbol" 
                        className="w-full h-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(204,0,255,0.4)]"
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}
