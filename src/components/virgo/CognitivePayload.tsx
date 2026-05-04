import { motion } from 'framer-motion'
import { FileJson, Sparkles } from 'lucide-react'

export function CognitivePayload() {
    return (
        <section className="relative py-12 px-6 md:px-12 bg-black z-10 overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#cc00ff]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl flex flex-col items-center">
                    <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                        AI Guided Installation <br/> Cognitive Payloads
                    </h3>
                    <p className="text-white/50 font-light text-lg md:text-xl leading-relaxed">
                        Instead of manually installing and configuring Virgo <br /> We help your AI guide you through the process. <br />just tell it to guide you through the protocols.
                    </p>
                </div>

                {/* The Terminal Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-4xl bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.05)]"
                >
                    {/* Mac OS Window Header */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <div className="flex-1 flex justify-center text-xs text-white/30 font-mono tracking-wider select-none">
                            agent-chat-interface
                        </div>
                    </div>

                    {/* Chat UI Split View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        
                        {/* Column 1: Installation Protocol */}
                        <div className="p-6 md:p-8 flex flex-col gap-6">
                            <div className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-2">Phase 1: Installation</div>
                            
                            {/* User Message */}
                            <div className="flex flex-col items-end gap-1">
                                <div className="text-[10px] text-white/30 px-1">You</div>
                                <div className="bg-[#00f0ff]/10 text-white/90 p-4 rounded-2xl rounded-tr-sm text-sm border border-[#00f0ff]/20 max-w-[90%] leading-relaxed">
                                    Hi Agent, please install virgo. Here is the repo: <br />
                                    <a href="https://github.com/IdanDavidAviv/virgo/blob/main/AGENT_INSTALL_GUIDE.md" target="_blank" rel="noreferrer" className="text-[#00f0ff]/70 break-all text-[11px] md:text-xs underline mt-2 block hover:text-[#00f0ff] transition-colors">
                                        github.com/IdanDavidAviv/virgo/blob/main/AGENT_INSTALL_GUIDE.md
                                    </a>
                                </div>
                            </div>

                            {/* Agent Message */}
                            <div className="flex flex-col items-start gap-1">
                                <div className="text-[10px] text-white/30 px-1">Agent</div>
                                <div className="bg-white/5 text-white/80 p-4 rounded-2xl rounded-tl-sm text-sm border border-white/10 max-w-[90%] leading-relaxed">
                                    <div className="flex items-center gap-2 text-white/50 text-xs mb-3 pb-2 border-b border-white/10">
                                        <Sparkles className="w-3 h-3" />
                                        <span>Reading AGENT_INSTALL_GUIDE.md...</span>
                                    </div>
                                    I&apos;ve read the installation protocol. Here are your steps:<br/><br/>
                                    1. Download and install the latest <code>.vsix</code> release.<br/>
                                    2. Click the <strong>MCP Status Badge</strong> in the Virgo panel to auto-configure my connection.<br/>
                                    3. Click inside the Virgo panel to unlock the audio engine.<br/><br/>
                                    <span className="text-[#00f0ff] font-medium">Tell me when you&apos;re ready!</span>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Cognitive Payload (Preferences) Protocol */}
                        <div className="p-6 md:p-8 flex flex-col gap-6 bg-white/[0.02]">
                            <div className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-2">Phase 2: Calibration</div>
                            
                            {/* User Message */}
                            <div className="flex flex-col items-end gap-1">
                                <div className="text-[10px] text-white/30 px-1">You</div>
                                <div className="bg-[#00f0ff]/10 text-white/90 p-4 rounded-2xl rounded-tr-sm text-sm border border-[#00f0ff]/20 max-w-[90%] leading-relaxed">
                                    I&apos;m ready. Let&apos;s configure my preferences. Read this protocol: <br />
                                    <a href="https://github.com/IdanDavidAviv/virgo/blob/main/AGENT_GUIDED_PREFERENCES_SKILL_DEFINITION_PROTOCOL.md" target="_blank" rel="noreferrer" className="text-[#00f0ff]/70 break-all text-[11px] md:text-xs underline mt-2 block hover:text-[#00f0ff] transition-colors">
                                        github.com/IdanDavidAviv/virgo/blob/main/AGENT_GUIDED_PREFERENCES_SKILL_DEFINITION_PROTOCOL.md
                                    </a>
                                </div>
                            </div>

                            {/* Agent Message */}
                            <div className="flex flex-col items-start gap-1">
                                <div className="text-[10px] text-white/30 px-1">Agent</div>
                                <div className="bg-white/5 text-white/80 p-4 rounded-2xl rounded-tl-sm text-sm border border-white/10 max-w-[90%] leading-relaxed">
                                    <div className="flex items-center gap-2 text-[#cc00ff]/70 text-xs mb-3 pb-2 border-b border-white/10">
                                        <Sparkles className="w-3 h-3" />
                                        <span>Reading PREFERENCES_PROTOCOL.md...</span>
                                    </div>
                                    To make Virgo truly useful, I need to know <i>when</i> you want me to speak. Based on your work style, I suggest 3 strategies:<br/><br/>
                                    1. <strong>The Narrator</strong> (Reads every plan)<br/>
                                    2. <strong>The Executive</strong> (Brief SITREPs)<br/>
                                    3. <strong>The Pair Programmer</strong> (Frequent updates)<br/><br/>
                                    <span className="text-white font-medium">Which strategy should I configure for your workspace skill?</span>
                                </div>
                            </div>

                            {/* Final System Message */}
                            <div className="flex justify-center mt-2">
                                <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] px-4 py-2 rounded-full flex items-center gap-2 text-center">
                                    <FileJson className="w-3 h-3 shrink-0" />
                                    <span>Cognitive Payload anchored: <code>.agent/skills/how_to_virgo/SKILL.md</code></span>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    )
}
