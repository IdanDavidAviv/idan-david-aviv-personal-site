import { motion } from 'framer-motion'
import { FileText, Headphones, MessageSquareCode, RefreshCcw, Terminal } from 'lucide-react'

export function ReadingFatigue() {
    return (
        <section className="relative py-32 px-6 md:px-12 z-10 max-w-6xl mx-auto">
            <div className="text-center mb-24">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Human - AI <br />Brainrot</h2>
                <p className="text-lg text-white/50 max-w-3xl mx-auto font-light">
                    If you code with an AI agent, like a true pro, <br />you know the <span className="text-purple-400">Architect Loop</span>.
                </p>
            </div>

            <div className="relative">
                {/* Connecting Spine */}
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-[23px] md:left-1/2 md:-ml-[1px] top-6 w-[2px] bg-gradient-to-b from-zinc-600/80 via-red-500/50 to-[#00f0ff]"
                />

                {/* Step 0: The Trigger */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10px" }}
                    className="relative flex flex-col md:items-center justify-start md:justify-center mb-24 group"
                >
                    <div className="absolute left-0 md:left-1/2 md:-ml-6 w-12 h-12 rounded-full bg-black border-2 border-zinc-600/50 group-hover:border-zinc-500 shadow-[0_0_15px_rgba(82,82,91,0.2)] group-hover:shadow-[0_0_30px_rgba(82,82,91,0.4)] flex items-center justify-center z-10 transition-all duration-300 bg-zinc-800/30 backdrop-blur-md">
                        <Terminal className="w-5 h-5 text-zinc-400" />
                    </div>

                    <div className="pl-16 md:pl-0 md:mt-16 w-full text-left md:text-center z-10">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">0. The Trigger</h3>
                        <p className="text-white/50 font-light text-sm md:text-base max-w-md md:mx-auto glass-card p-4 rounded-xl border border-zinc-700/50 bg-zinc-800/20 backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
                            You ask for a feature - it generates an implementation plan for approval.
                        </p>
                    </div>
                </motion.div>

                {/* Phase 1: The Wall of Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-24 group"
                >
                    <div className="hidden md:block w-5/12 text-right pr-16">
                        <h3 className="text-2xl font-bold text-white mb-2">1. The Attention Bottleneck</h3>
                        <p className="text-white/50 font-light leading-relaxed">AI generates code at such high speeds, and if your <br />development process is accompanied by detailed plans <br /> it demands your attention across multiple levels.</p>
                    </div>

                    <div className="absolute left-0 md:left-1/2 md:-ml-6 w-12 h-12 rounded-full bg-black border-2 border-zinc-600/50 group-hover:border-zinc-500 shadow-[0_0_15px_rgba(82,82,91,0.2)] group-hover:shadow-[0_0_30px_rgba(82,82,91,0.4)] flex items-center justify-center z-10 transition-all duration-300 bg-zinc-800/30 backdrop-blur-md">
                        <MessageSquareCode className="w-5 h-5 text-zinc-400" />
                    </div>

                    <div className="pl-16 md:pl-0 md:w-5/12 md:pl-16 w-full">
                        <div className="md:hidden mb-4">
                            <h3 className="text-xl font-bold text-white">1. The Attention Bottleneck</h3>
                            <p className="text-white/50 font-light text-sm">AI generates code at such high speeds, and if your development process <br /> is accompanied by detailed plans <br /> it demands your attention across multiple levels.</p>
                        </div>
                        <div className="relative mr-2 md:mr-4 mt-2">
                            {/* Background Cards for Stacked Effect */}
                            <div className="absolute inset-0 translate-x-2 translate-y-3 md:translate-x-4 md:translate-y-4 rotate-3 rounded-2xl border border-zinc-700/30 bg-zinc-800/10 -z-20"></div>
                            <div className="absolute inset-0 translate-x-1 translate-y-1.5 md:translate-x-2 md:translate-y-2 rotate-1 rounded-2xl border border-zinc-700/40 bg-zinc-800/20 -z-10"></div>

                            {/* Front Card */}
                            <div className="relative glass-card p-5 rounded-2xl border border-zinc-700/50 bg-zinc-800/40 hover:bg-zinc-800/50 transition-colors shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-md">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between pb-2 border-b border-zinc-700/50">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <FileText className="w-4 h-4 text-zinc-500 shrink-0" />
                                            <span className="text-zinc-400 text-[11px] font-mono truncate">architecture_plan.md</span>
                                        </div>
                                        <span className="text-[10px] text-zinc-500 bg-zinc-900/50 px-2 py-0.5 rounded-full border border-zinc-700/50 shrink-0 ml-2">320 lines</span>
                                    </div>
                                    <div className="flex items-center justify-between pb-2 border-b border-zinc-700/50">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <FileText className="w-4 h-4 text-zinc-500 shrink-0" />
                                            <span className="text-zinc-400 text-[11px] font-mono truncate">implementation_plan.md</span>
                                        </div>
                                        <span className="text-[10px] text-zinc-500 bg-zinc-900/50 px-2 py-0.5 rounded-full border border-zinc-700/50 shrink-0 ml-2">150 lines</span>
                                    </div>
                                    <div className="flex items-center justify-between pb-2 border-b border-zinc-700/50">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <FileText className="w-4 h-4 text-zinc-500 shrink-0" />
                                            <span className="text-zinc-400 text-[11px] font-mono truncate">task.md</span>
                                        </div>
                                        <span className="text-[10px] text-zinc-500 bg-zinc-900/50 px-2 py-0.5 rounded-full border border-zinc-700/50 shrink-0 ml-2">85 lines</span>
                                    </div>
                                </div>
                                <p className="text-zinc-500 text-[10px] text-center uppercase tracking-widest mt-3 pt-2">+ 12 MORE MARKDOWN FILES TO REVIEW</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Phase 2: Reading Fatigue */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ delay: 0.2 }}
                    className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-24 group"
                >
                    <div className="pl-16 md:pl-0 md:w-5/12 text-left md:text-right md:pr-16 order-2 md:order-1 w-full mt-6 md:mt-0">
                        <div className="glass-card p-8 rounded-3xl border border-red-500/20 bg-red-500/5 relative overflow-hidden group-hover:shadow-[0_4px_30px_rgba(239,68,68,0.1)] transition-all">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <FileText className="w-8 h-8 text-red-500 mb-4 opacity-70 group-hover:opacity-100 transition-opacity inline-block md:float-right md:ml-4" />
                            <p className="text-white/70 text-sm leading-relaxed relative z-10 clear-both">
                                After an hour, you stop reading the plans. You skim the wall of text, blindly type <code className="bg-red-500/10 text-red-300 px-1.5 py-0.5 rounded border border-red-500/20">&quot;GO&quot;</code>, and hope for the best. The hallucination rollback loop begins.
                            </p>
                        </div>
                    </div>

                    <div className="absolute left-0 md:left-1/2 md:-ml-6 w-12 h-12 rounded-full bg-black border-2 border-red-500/40 group-hover:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center z-10 transition-all duration-300 bg-red-500/10 backdrop-blur-md order-1 md:order-2">
                        <RefreshCcw className="w-5 h-5 text-red-500" />
                    </div>

                    <div className="pl-16 md:pl-0 md:w-5/12 md:pl-16 order-3 w-full">
                        <h3 className="text-2xl font-bold text-white mb-2">2. Decision Overload</h3>
                        <p className="text-white/50 font-light leading-relaxed">Context is lost.<br />You become a rubber-stamper instead of an engineer.</p>
                    </div>
                </motion.div>

                {/* Phase 3: The Solution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ delay: 0.4 }}
                    className="relative flex flex-col md:flex-row items-start md:items-center justify-between group"
                >
                    <div className="hidden md:block w-5/12 text-right pr-16">
                        <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">3. The Vocal Collaborator</h3>
                        <p className="text-[#00f0ff]/70 font-light leading-relaxed text-lg">Virgo shatters the loop.</p>
                    </div>

                    <div className="absolute -left-2 md:left-1/2 md:-ml-8 w-16 h-16 rounded-full bg-black border-2 border-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.5)] flex items-center justify-center z-10 bg-[#00f0ff]/10 backdrop-blur-md">
                        <Headphones className="w-7 h-7 text-[#00f0ff]" />
                    </div>

                    <div className="pl-16 md:pl-0 md:w-5/12 md:pl-16 w-full">
                        <div className="md:hidden mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">3. The Vocal Collaborator</h3>
                            <p className="text-[#00f0ff]/70 font-light">Virgo shatters the loop.</p>
                        </div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass-card rounded-3xl p-8 md:p-10 border border-[#00f0ff]/30 bg-[#00f0ff]/10 relative overflow-hidden shadow-[0_4px_40px_rgba(0,240,255,0.15)] hover:shadow-[0_4px_60px_rgba(0,240,255,0.25)] transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 to-[#cc00ff]/10" />
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f0ff] to-[#cc00ff]" />
                            <p className="text-white/90 leading-relaxed font-light relative z-10">
                                You keep your eyes on the codebase, review the actual diffs, and listen to the agent&apos;s strategy at the exact same time. The IDE transforms from a silent text editor into an active, high-bandwidth pairing session.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
