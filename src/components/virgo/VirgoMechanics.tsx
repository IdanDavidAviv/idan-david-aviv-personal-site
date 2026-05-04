import { motion } from 'framer-motion'
import { Sliders, Inbox, Activity } from 'lucide-react'

const mechanics = [
    {
        title: "Granular Playback Control",
        description: "Markdown is dynamically parsed into interactive Chapters and Rows. This allows for a granular control over the audio stream - navigate chapters and rows, control the playback speed, volume, and more",
        icon: Sliders
    },
    {
        title: "Asynchronous Handoff",
        description: "Listen on your terms. The agent generates the audio, but snippets are stored in a session history inbox. You are never forced to listen immediately or risk missing context, and the saved content is controllable like any other markdown",
        icon: Inbox
    },
    {
        title: "Continuous Flow",
        description: "Smart playback retrieval management accommodates for rate limiting, effectively masking latency and minimizing silence gaps during continuous playback.",
        icon: Activity
    }
]

export function VirgoMechanics() {
    return (
        <section className="relative py-12 md:py-16 px-6 md:px-12 bg-black/20 border-y border-white/5 z-10">
            <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-16 items-center">

                {/* Side A: The Dashboard UI Asset */}
                <div className="w-full xl:w-1/2 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative h-[400px] md:h-[500px] xl:h-[744px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(204,0,255,0.15)] bg-[#0d0d0d]"
                    >
                        {/* Glassmorphism Glow Behind */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#cc00ff]/10 to-[#00f0ff]/10 blur-xl z-0" />

                        <img
                            src="/assets/virgo/virgo_dashboard_master_plan_loaded.png"
                            alt="Virgo Dashboard UI"
                            className="h-full w-auto object-cover relative z-10"
                        />

                        {/* Overlay Gradient for integration */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent z-20 pointer-events-none" />
                    </motion.div>
                </div>

                {/* Side B: The Deep Mechanics */}
                <div className="w-full xl:w-1/2 flex flex-col gap-6">
                    <div className="mb-4">
                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">The Fluent Reading Engine</h3>
                        <p className="text-white/50 font-light mt-4 text-lg">
                            I built Virgo for total control over the AI agent audio stream <br />For a smooth, natural, and controlled experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {mechanics.map((mechanic, idx) => {
                            const Icon = mechanic.icon
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                                    className="glass-card p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
                                >
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-[#00f0ff]/20 to-[#cc00ff]/20 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                                        <Icon className="w-6 h-6 text-[#00f0ff]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">{mechanic.title}</h4>
                                        <p className="text-white/50 font-light leading-relaxed">{mechanic.description}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </section>
    )
}
