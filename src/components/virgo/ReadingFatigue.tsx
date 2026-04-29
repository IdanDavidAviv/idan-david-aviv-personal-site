import { motion } from 'framer-motion'
import { FileText, Headphones, MessageSquareCode, RefreshCcw, Terminal, BrainCircuit, AlertTriangle } from 'lucide-react'

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
                    className="absolute left-[23px] md:left-1/2 md:-ml-[1px] top-6 w-[2px] bg-gradient-to-b from-zinc-600/80 via-purple-500/50 to-[#00f0ff]"
                />

                {/* Step 0: The Trigger */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10px" }}
                    className="relative flex justify-center mb-24 group z-20"
                >
                    <div className="w-full text-left md:text-center">
                        <div className="flex md:inline-flex items-center text-white/80 font-light text-sm md:text-base max-w-md mx-auto py-2 pr-4 pl-0 md:px-6 md:py-4 rounded-2xl border-2 border-zinc-600/50 bg-black/80 shadow-[0_0_15px_rgba(82,82,91,0.2)] group-hover:border-zinc-500 group-hover:shadow-[0_0_30px_rgba(82,82,91,0.4)] transition-all duration-300 backdrop-blur-md relative z-20">
                            <div className="w-12 h-12 shrink-0 flex items-center justify-center md:w-auto md:h-auto md:mr-3">
                                <Terminal className="w-5 h-5 text-zinc-400" />
                            </div>
                            <span className="flex-1">You ask for a feature - it generates <br />an implementation plan for approval.</span>
                        </div>
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
                        <p className="text-white/50 font-light leading-relaxed">AI Agents generate plan-based code at high speed,<br />requiring your attention across multiple<br />levels of detail and logic.</p>
                    </div>

                    <div className="absolute left-0 md:left-1/2 md:-ml-6 w-12 h-12 rounded-full bg-black border-2 border-zinc-600/50 group-hover:border-zinc-500 shadow-[0_0_15px_rgba(82,82,91,0.2)] group-hover:shadow-[0_0_30px_rgba(82,82,91,0.4)] flex items-center justify-center z-10 transition-all duration-300 bg-zinc-800/30 backdrop-blur-md">
                        <MessageSquareCode className="w-5 h-5 text-zinc-400" />
                    </div>

                    <div className="pl-16 md:pl-0 md:w-5/12 md:pl-16 w-full">
                        <div className="md:hidden mb-4">
                            <h3 className="text-xl font-bold text-white">1. The Attention Bottleneck</h3>
                            <p className="text-white/50 font-light text-sm">AI Agents generate plan-based code at high speed,<br />requiring your attention across multiple<br />levels of detail and logic.</p>
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
                    <div className="pl-16 md:pl-0 md:w-5/12 text-left md:text-right md:pr-16 order-2 md:order-1 w-full mt-2 md:mt-0">
                        {/* Mobile Title (hidden on PC) */}
                        <div className="md:hidden mb-4 text-left">
                            <h3 className="text-xl font-bold text-white mb-2">2. The Cognitive Overload</h3>
                            <p className="text-white/50 font-light text-sm">Digesting immense amounts of data,<br />and making high-stakes decisions with AI<br /> drives even the best of us to the <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-purple-400 via-[30%] to-purple-400 font-medium">edge of cognitive performance</span>.</p>
                        </div>

                        {/* Warning Card */}
                        <div className="glass-card p-6 md:p-8 rounded-3xl border-t border-t-purple-500/30 border border-purple-500/10 bg-gradient-to-b from-purple-500/10 from-[80%] to-rose-500/5 relative overflow-hidden group-hover:shadow-[0_4px_30px_rgba(168,85,247,0.15)] transition-all text-left">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Header */}
                            <div className="flex items-center gap-3 mb-3 relative z-10 md:justify-end">
                                <span className="text-white/80 font-medium text-sm tracking-wide">The Breaking Point</span>
                                <BrainCircuit className="w-5 h-5 text-purple-400 opacity-80" />
                            </div>

                            <p className="text-white/60 text-sm leading-relaxed relative z-10 md:text-right mb-5">
                                After a while, with the agent doing well <br /> You get tired of reading, you rubber-stamp plans <br /> And trust it blindly
                            </p>

                            {/* UI Mock: Chat/Terminal interaction */}
                            <div className="space-y-4 relative z-10 bg-[#09090b]/80 rounded-xl p-4 md:p-5 border border-purple-500/20 shadow-inner">
                                {/* File Header */}
                                <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/50 mb-3">
                                    <FileText className="w-3.5 h-3.5 text-zinc-500" />
                                    <span className="text-zinc-400 text-xs font-mono">implementation_plan.md</span>
                                    <span className="text-[10px] text-zinc-500 bg-zinc-900/80 px-1.5 py-0.5 rounded border border-zinc-800 ml-auto md:ml-0">v7</span>
                                </div>

                                {/* Faded Agent Output */}
                                <div className="space-y-2 opacity-20 select-none">
                                    <div className="h-2 w-full bg-zinc-400 rounded"></div>
                                    <div className="h-2 w-11/12 bg-zinc-400 rounded"></div>
                                    <div className="h-2 w-4/5 bg-zinc-400 rounded"></div>
                                    <div className="h-2 w-5/6 bg-zinc-400 rounded"></div>
                                </div>

                                {/* User blind input */}
                                <div className="flex items-center gap-2 pt-2">
                                    <span className="text-zinc-500 text-xs font-mono">&gt;</span>
                                    <code className="bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30 font-mono text-sm shadow-[0_0_10px_rgba(168,85,247,0.2)]">GO</code>
                                    <span className="text-zinc-600 text-xs italic ml-2">&larr; Blind press at the 7th plan iteration</span>
                                </div>

                                {/* Consequence Error */}
                                <div className="mt-4 pt-4 border-t border-rose-500/10 flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0 animate-pulse" />
                                    <span className="text-rose-400/90 text-xs font-mono leading-relaxed">Agent: <br />&gt; Executing hellucinations you missed in the plan.<br />&gt; Brain Meltdown initiated <br />&gt; Resistance is useless... <br /><br />I have successfully established <span className="font-bold text-rose-500">Chaos!</span> <br />Is there anything else you would want me to do?</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute left-0 md:left-1/2 md:-ml-6 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/40 from-[80%] to-rose-500/40 group-hover:from-purple-500/80 group-hover:to-rose-500/80 p-[2px] shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] z-10 transition-all duration-300 order-1 md:order-2 flex items-center justify-center">
                        <div className="w-full h-full bg-[#160a22] rounded-full flex items-center justify-center">
                            <svg width="0" height="0" className="absolute">
                                <linearGradient id="purpleRose" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop stopColor="#a855f7" offset="70%" /> {/* purple-500 */}
                                    <stop stopColor="#f43f5e" offset="100%" /> {/* rose-500 */}
                                </linearGradient>
                            </svg>
                            <RefreshCcw className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" strokeWidth={2.5} color="url(#purpleRose)" />
                        </div>
                    </div>

                    {/* PC Title (hidden on Mobile) */}
                    <div className="hidden md:block w-5/12 pl-16 text-left order-3">
                        <h3 className="text-2xl font-bold text-white mb-2">2. The Cognitive Overload</h3>
                        <p className="text-white/50 font-light leading-relaxed">Digesting immense amounts of data,<br />and making high-stakes decisions with AI<br /> drives even the best of us to the <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-purple-400 via-[30%] to-purple-400 font-medium">edge of cognitive performance</span>.</p>
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
                        <h3 className="text-3xl font-bold text-white mb-3">3. The Vocal Collaborator</h3>
                        <p className="bg-gradient-to-r from-[#00f0ff] via-blue-400 to-[#cc00ff] bg-clip-text text-transparent font-medium text-xl drop-shadow-sm">Virgo shatters the loop.</p>
                    </div>

                    <motion.div 
                        animate={{ 
                            boxShadow: [
                                '0 0 20px rgba(0,240,255,0.3), inset 0 0 10px rgba(0,240,255,0.2)', 
                                '0 0 40px rgba(204,0,255,0.4), inset 0 0 20px rgba(204,0,255,0.3)', 
                                '0 0 20px rgba(0,240,255,0.3), inset 0 0 10px rgba(0,240,255,0.2)'
                            ],
                            borderColor: ['rgba(0,240,255,0.4)', 'rgba(204,0,255,0.5)', 'rgba(0,240,255,0.4)']
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -left-2 md:left-1/2 md:-ml-8 w-16 h-16 rounded-full bg-black/80 border-2 flex items-center justify-center z-10 backdrop-blur-md"
                    >
                        <Headphones className="w-7 h-7 text-white" />
                    </motion.div>

                    <div className="pl-16 md:pl-0 md:w-5/12 md:pl-16 w-full">
                        <div className="md:hidden mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">3. The Vocal Collaborator</h3>
                            <p className="bg-gradient-to-r from-[#00f0ff] via-blue-400 to-[#cc00ff] bg-clip-text text-transparent font-medium text-lg drop-shadow-sm">Virgo shatters the loop.</p>
                        </div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass-card rounded-3xl p-8 md:p-10 border border-white/5 bg-black/40 relative overflow-hidden transition-all duration-300"
                        >
                            {/* Breathing Background Glow */}
                            <motion.div 
                                animate={{ opacity: [0.1, 0.25, 0.1] }} 
                                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-gradient-to-br from-[#00f0ff] via-blue-500 to-[#cc00ff] blur-2xl" 
                            />
                            
                            {/* Animated Top Border */}
                            <motion.div 
                                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f0ff] via-blue-400 to-[#cc00ff] bg-[length:200%_auto]" 
                            />
                            
                            <p className="text-white/90 leading-relaxed font-light relative z-10 text-lg">
                                You keep your eyes on the codebase, review the actual diffs, and <span className="text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">listen to the agent&apos;s strategy</span> at the exact same time. The IDE transforms from a silent text editor into an active, high-bandwidth pairing session.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
