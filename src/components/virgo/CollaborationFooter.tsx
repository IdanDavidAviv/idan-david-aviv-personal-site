import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

export function CollaborationFooter() {
    return (
        <section className="relative py-24 px-6 md:px-12 bg-[#050505] border-t border-white/5 z-10 overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-idan-david-aviv-blue/40 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-idan-david-aviv-blue/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(30,65,193,0.3)]">
                        <Github className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                        Give Your Agent a Voice.
                    </h2>
                    <p className="text-white/50 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                        Virgo is an open-source project for natural human-AI communication. <br />If you find it inspiring, interesting, or usefull, and would like to collaborate <br />or support the project, I&apos;d love to hear from you.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <a
                            href="/#contact"
                            className="w-full sm:w-auto px-8 py-4 bg-idan-david-aviv-blue/10 border border-idan-david-aviv-blue/40 hover:border-idan-david-aviv-blue/60 hover:bg-idan-david-aviv-blue/20 text-white transition-all rounded-full font-medium flex items-center justify-center gap-3 group shadow-[0_0_20px_-2px_rgba(30,65,193,0.5)]"
                        >
                            <span>Contact Idan David-Aviv</span>
                        </a>

                        <a
                            href="https://github.com/IdanDavidAviv/virgo"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-700 hover:from-cyan-500 hover:to-purple-600 text-white transition-all duration-300 rounded-full font-bold flex items-center justify-center gap-3 group shadow-[0_0_20px_-5px_rgba(126,34,206,0.5)] hover:shadow-[0_0_30px_0px_rgba(6,182,212,0.4)] hover:scale-105"
                        >
                            <Github className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                            <span className="drop-shadow-md">Go Get Virgo</span>
                        </a>

                    </div>
                </motion.div>
            </div>
        </section>
    )
}
