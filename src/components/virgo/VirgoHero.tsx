import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

export function VirgoHero() {
    return (
        <section className="relative min-h-[60vh] md:min-h-[85vh] flex flex-col items-center justify-center pt-16 md:pt-24 pb-12 md:pb-16 px-6 md:px-12 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[800px] h-[800px] bg-gradient-to-br from-[#00f0ff]/20 via-[#cc00ff]/20 to-transparent rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-12"
            >
                {/* Text Content */}
                <div className="flex-1 text-center flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight flex flex-col items-center gap-4 md:gap-6">
                        <img src="/assets/virgo/virgo_symbol_text_orb.png" alt="Virgo" className="h-40 md:h-56 w-auto object-contain drop-shadow-[0_0_20px_rgba(204,0,255,0.3)] mb-2" />
                        <span className="bg-gradient-to-r from-[#00f0ff] to-[#cc00ff] bg-clip-text text-transparent drop-shadow-sm">AI that talks to YOU.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/60 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                        Virgo turns your AI into a vocal collaborator. <br />Instead of you reading - It speaks to you.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
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

            </motion.div>
        </section>
    )
}
