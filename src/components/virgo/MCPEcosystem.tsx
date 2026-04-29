import { motion } from 'framer-motion'
import { Server, Zap, Shield } from 'lucide-react'
import { VirgoVideoPlayer } from './VirgoVideoPlayer'

const ecosystemFeatures = [
    {
        title: "State-Aware Architecture",
        description: "Virgo lets your agent connect to it via the Model Context Protocol. It writes snippets of summaries whenever you ask the agent, or on automatic triggers you set for your AI Agent.",
        icon: Zap
    },
    {
        title: "Extend Virgo's involvement",
        description: "The MCP architecture allows you to extend the agent's functionality. We highly recommend to wrap Virgo with a SKILL.md file to strictly define how it should be used.",
        icon: Server
    },
    {
        title: "AI Guided Behavioral Calibration",
        description: "To easily set this up, ask your AI Agent to run our AI guided preferences setup guide - to decide on when should Virgo say things loud. ",
        icon: Shield,
        link: {
            text: "View Setup Guide",
            url: "https://github.com/IdanDavidAviv/virgo/blob/main/AGENT_GUIDED_PREFERENCES_SKILL_DEFINITION_PROTOCOL.md"
        }
    }
]

export function MCPEcosystem() {
    return (
        <section className="relative py-24 px-6 md:px-12 bg-black/40 border-y border-white/5 z-10">
            <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-16 items-center">

                {/* Left Side: Narrative Header + Video Asset */}
                <div className="w-full xl:w-1/2 flex flex-col gap-8">
                    {/* Narrative Header */}
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">The MCP Ecosystem</h3>
                        <p className="text-white/50 font-light mt-4 text-lg">
                            We unbound the AI from the browser. Using the Model Context Protocol, Virgo physically inhabits your development environment.
                        </p>
                    </div>

                    {/* The Video Asset */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full"
                    >
                        <VirgoVideoPlayer 
                            src="/assets/virgo/virgo_mcp_showcase.mp4" 
                            className="w-full aspect-[4/3] md:aspect-video"
                        />
                    </motion.div>
                </div>

                {/* Right Side: The 3 Cards */}
                <div className="w-full xl:w-1/2">
                    <div className="grid grid-cols-1 gap-6">
                        {ecosystemFeatures.map((feature, idx) => {
                            const Icon = feature.icon
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
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                                        <div className="text-white/50 font-light leading-relaxed">
                                            {feature.description.split('. ').map((sentence, sIdx, arr) => (
                                                <span key={sIdx} className="block mb-1.5 last:mb-0">
                                                    {sentence}{sIdx < arr.length - 1 ? '.' : ''}
                                                </span>
                                            ))}
                                        </div>
                                        {feature.link && (
                                            <a 
                                                href={feature.link.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#00f0ff] hover:text-white transition-colors group/link"
                                            >
                                                {feature.link.text} 
                                                <span className="transform transition-transform group-hover/link:translate-x-1">&rarr;</span>
                                            </a>
                                        )}
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
