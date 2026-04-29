import { Server, Lock } from 'lucide-react'

export function MCPEcosystem() {
    return (
        <section className="relative py-32 px-6 md:px-12 overflow-hidden z-10">
            {/* Section Framing Lines */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#cc00ff]/30 to-transparent" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-8 shadow-[0_0_20px_rgba(204,0,255,0.2)]">
                    <Server className="w-8 h-8 text-[#cc00ff]" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Native MCP Integration</h2>
                <p className="text-lg md:text-xl text-white/60 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
                    The Virgo MCP server connects to ANY AI agent ecosystem (Cursor, Claude Desktop, Antigravity) and grants them the <code className="bg-white/10 text-[#00f0ff] px-2 py-1 rounded mx-1 text-sm border border-white/10 tracking-wider">say_this_loud</code> tool to bypass text chat entirely.
                </p>

                <div className="glass-card max-w-2xl mx-auto rounded-3xl p-8 border border-[#cc00ff]/20 bg-[#cc00ff]/5 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left shadow-[0_0_30px_rgba(204,0,255,0.05)]">
                    <div className="shrink-0 p-4 bg-black/40 rounded-2xl border border-white/5">
                        <Lock className="w-6 h-6 text-[#00f0ff]" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-3">Zero Telemetry</h4>
                        <p className="text-white/50 font-light leading-relaxed">
                            Virgo runs purely on your system using your configured TTS endpoints. It doesn&apos;t track, log, or broadcast your session data. Your codebase and conversations remain fully private.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
