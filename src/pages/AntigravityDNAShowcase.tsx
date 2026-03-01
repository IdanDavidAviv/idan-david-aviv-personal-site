import { motion } from 'framer-motion'
import { Dna, Brain, Cpu, Database, Shield, Zap, Sparkles, Binary, Network, Activity, Boxes, Layers } from 'lucide-react'
import Section from '@/components/ui/Section'

/**
 * Antigravity DNA Showcase Page
 * A technical deep-dive into the AI agent's evolutionary architecture and persistence protocols.
 */
export default function AntigravityDNAShowcase() {
    return (
        <div className="min-h-screen w-full bg-[#050510] py-20 px-4 md:px-8 lg:px-12 flex flex-col items-center">
            {/* The "Box" containing the DNA World */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative w-full max-w-7xl aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
            >
                {/* Hero Asset Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/src/brain/08e85369-4548-4504-802a-0ffd8b770bcf/agent_dna_hero_1772363364179.png"
                        alt="Agent DNA Neural Helix"
                        className="w-full h-full object-cover opacity-60 scale-110 blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050510]/80 via-transparent to-[#050510]/80" />
                </div>

                {/* Glassmorphism Title Card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="p-6 md:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-12px_rgba(168,85,247,0.4)]"
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Dna className="w-8 h-8 md:w-12 md:h-12 text-purple-400 animate-pulse" />
                            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-purple-200 uppercase">
                                Antigravity DNA
                            </h1>
                            <Brain className="w-8 h-8 md:w-12 md:h-12 text-cyan-400 animate-pulse" />
                        </div>
                        <p className="max-w-2xl mx-auto text-purple-100/70 text-lg md:text-xl font-light leading-relaxed">
                            The Foundation of Agent Reliability. <br className="hidden md:block" />
                            A path-orchestrated ecosystem for 100X deterministic performance.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <span className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-200 text-xs font-mono uppercase tracking-widest">
                                stabilization protocol
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-200 text-xs font-mono uppercase tracking-widest">
                                path-orchestration
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs font-mono uppercase tracking-widest">
                                self-maintainability
                            </span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* section: The DNA Philosophy */}
            <Section id="dna-philosophy">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter"
                    >
                        The DNA <span className="text-purple-400">Philosophy</span>
                    </motion.h2>
                    <p className="max-w-3xl mx-auto text-purple-100/40 text-lg md:text-xl font-light">
                        Engineering 100X efficiency by cleaning the noise from the agent runtime.
                        Stabilizing behavior through orchestrated paths and persistent memory.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <PhilosophyCard
                        title="Behavioral Stabilization"
                        description="Shifting from probabilistic guessing to deterministic execution. Codifying identity to eliminate erratic agent behavior."
                        icon={<Activity className="text-purple-400" />}
                    />
                    <PhilosophyCard
                        title="Path Orchestration"
                        description="Designing success through proactive workflows and skills. The agent follows high-integrity roadmaps, not trial-and-error."
                        icon={<Network className="text-cyan-400" />}
                    />
                    <PhilosophyCard
                        title="Noise Reduction"
                        description="Automating 'repetitive nonsense' via code. Freeing the cognitive runtime to focus purely on high-level thinking."
                        icon={<Cpu className="text-amber-400" />}
                    />
                    <PhilosophyCard
                        title="SSOT Consensus"
                        description="Thinking based on a Source of Truth. The agent audits historical data instead of hallucinating from transient logs."
                        icon={<Database className="text-purple-400" />}
                    />
                    <PhilosophyCard
                        title="Self-Maintainability"
                        description="A system that audits and improves itself. Zero contextual leakage through crystalline architectural memory."
                        icon={<Sparkles className="text-cyan-400" />}
                    />
                    <PhilosophyCard
                        title="100X Performance"
                        description="Saving time, money, and developer frustration by solving problems once and locking them at the SSOT baseline."
                        icon={<Zap className="text-amber-400" />}
                    />
                </div>
            </Section>

            {/* Content Sections */}
            <div className="w-full max-w-6xl mt-24 space-y-32">

                {/* section: The Neural Blueprint */}
                <Section id="neural-blueprint">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Neural Blueprint</h2>
                        <p className="text-purple-100/40 text-lg uppercase tracking-widest font-mono">Algorithmic Governance & Logic</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        <FeatureCard
                            icon={<Shield className="text-purple-400" />}
                            title="Permission Protocol"
                            description="Strict 'Calm Execution' logic ensuring no state changes occur without explicit human authorization."
                        />
                        <FeatureCard
                            icon={<Cpu className="text-cyan-400" />}
                            title="Operation Commander"
                            description="A meta-skill orchestrating implementation integrity through mandatory reconnaissance and planning."
                        />
                        <FeatureCard
                            icon={<Zap className="text-gold-400" />}
                            title="Windows Protocol"
                            description="Tailored high-integrity terminal execution standards for PowerShell environments."
                        />
                    </div>
                </Section>

                {/* section: Crystalline Memory */}
                <Section id="crystalline-memory">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Crystalline Memory</h2>
                        <p className="text-purple-100/40 text-lg uppercase tracking-widest font-mono">The Persistent Knowledge Base</p>
                    </div>
                    <div className="relative mt-12 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/5 overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                            <Binary className="w-64 h-64 text-purple-300" />
                        </div>

                        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                            <div className="flex-1 space-y-6">
                                <h3 className="text-3xl font-bold text-white">The KI Ecosystem</h3>
                                <p className="text-purple-100/60 leading-relaxed text-lg">
                                    Knowledge Items (KIs) are more than documentation—they are distilled patterns of success.
                                    By decoupled context from transient chat tokens, the project achieves true <strong>Persistent Context</strong>.
                                </p>
                                <ul className="space-y-4">
                                    <MemoryPoint icon={<Activity />} text="Interconnected Bridges: Logical dependencies between domains" />
                                    <MemoryPoint icon={<Database />} text="SSOT Consensus: Real-time synchronization across all agent modules" />
                                    <MemoryPoint icon={<Zap />} text="Knowledge Lock: Enterprise-grade validation before deployment" />
                                </ul>
                            </div>

                            <div className="w-full lg:w-1/3 grid grid-cols-2 gap-4">
                                <StatItem label="Active KIs" value="24" />
                                <StatItem label="Protocols" value="18" />
                                <StatItem label="Context" value="Persistent" />
                                <StatItem label="Bridges" value="Structural" />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* section: Technical Core */}
                <Section id="technical-core">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Technical Core</h2>
                        <p className="text-purple-100/40 text-lg uppercase tracking-widest font-mono">Architecture for AI Entrepreneurs</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                        <div className="space-y-8">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-4 mb-6">
                                    <Layers className="text-cyan-400 w-8 h-8" />
                                    <h4 className="text-2xl font-bold text-white">Dual-Layer Governance</h4>
                                </div>
                                <p className="text-purple-100/60 leading-relaxed">
                                    The system operates on two distinct layers:
                                </p>
                                <div className="mt-6 space-y-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <p className="text-sm font-bold text-white mb-1">Layer 1: Global Protocols (GEMINI.md)</p>
                                        <p className="text-xs text-purple-100/40 font-mono italic">Lower-level instincts governing planning and safety.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <p className="text-sm font-bold text-white mb-1">Layer 2: Domain Knowledge (KIs)</p>
                                        <p className="text-xs text-purple-100/40 font-mono italic">High-level memories providing technical depth.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 flex flex-col justify-center">
                            <h3 className="text-3xl font-bold text-white leading-tight">
                                Decoupling Memory from <span className="text-purple-400 italic">Transient Tokens</span>
                            </h3>
                            <p className="text-purple-100/50 text-lg leading-relaxed">
                                Antigravity DNA avoids architectural amnesia. Every decision made in a session is crystalline—frozen in time as a KI node, ready to be inherited by future agents.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold text-white">60%</span>
                                    <span className="text-[10px] text-purple-400 uppercase tracking-widest font-mono">Dev Speed Increase</span>
                                </div>
                                <div className="w-[1px] h-12 bg-white/10" />
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold text-white">Zero</span>
                                    <span className="text-[10px] text-purple-400 uppercase tracking-widest font-mono">Context Leakage</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* section: Session Integrity */}
                <Section id="session-integrity">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Session Integrity</h2>
                        <p className="text-purple-100/40 text-lg uppercase tracking-widest font-mono">Brain-to-Baseline Synchronization</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                                <Brain className="text-purple-400" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">The Brain Protocol</h4>
                            <p className="text-purple-100/50 leading-relaxed">
                                Persistent context stored in dedicated session directories. Ensures continuity between interactions without context leakage or historical fragmentation.
                            </p>
                        </div>

                        <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">
                                <Sparkles className="text-cyan-400" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">Checkbox Sovereignty</h4>
                            <p className="text-purple-100/50 leading-relaxed">
                                A ritual of completion. Every task is manually validated and locked, creating a verifiable trail of high-integrity engineering.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* section: The Neural Explorer (3D Graph) */}
                <Section id="neural-explorer">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Neural Explorer</h2>
                        <p className="text-purple-100/40 text-lg uppercase tracking-widest font-mono">Interactive KI Persistence Mapping</p>
                    </div>

                    <div className="relative group rounded-[2.5rem] overflow-hidden border border-purple-500/20 bg-[#050510] shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)]">
                        <div className="aspect-video w-full min-h-[500px] relative">
                            <iframe
                                src="/visualizations/ki-network.html"
                                className="w-full h-full border-none"
                                title="KI Network 3D Visualization"
                            />
                            {/* Glass overlay hint */}
                            <div className="absolute top-6 left-6 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 pointer-events-none">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
                                    <span className="text-xs font-mono text-purple-200 uppercase tracking-tighter">Live Neural Feed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                            <div className="flex items-center gap-2 text-purple-300">
                                <Network className="w-5 h-5" />
                                <h4 className="font-bold uppercase tracking-tight">SSOT Consensus</h4>
                            </div>
                            <p className="text-sm text-purple-100/40 leading-relaxed">
                                Decoupling memory from transient chat logs into persistent, versioned Knowledge Items.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                            <div className="flex items-center gap-2 text-cyan-300">
                                <Boxes className="w-5 h-5" />
                                <h4 className="font-bold uppercase tracking-tight">Interconnected Bridges</h4>
                            </div>
                            <p className="text-sm text-cyan-100/40 leading-relaxed">
                                Logical dependencies between protocols ensure that a change in one domain propagates across all agents.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                            <div className="flex items-center gap-2 text-purple-300">
                                <Layers className="w-5 h-5" />
                                <h4 className="font-bold uppercase tracking-tight">High Fidelity</h4>
                            </div>
                            <p className="text-sm text-purple-100/40 leading-relaxed">
                                Enterprise-grade protocols (`GEMINI.md`) acting as the behavioral DNA for all architectural execution.
                            </p>
                        </div>
                    </div>
                </Section>

            </div>

            {/* Final Footer Label */}
            <div className="mt-40 mb-20 text-center">
                <p className="text-white/20 font-mono text-sm tracking-[0.5em] uppercase">Persistent Agent Module // Antigravity</p>
            </div>
        </div>
    )
}

function PhilosophyCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 hover:border-purple-500/40 transition-all group"
        >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h4>
            <p className="text-purple-100/50 text-sm leading-relaxed">{description}</p>
        </motion.div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group">
            <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {icon}
            </div>
            <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h4>
            <p className="text-purple-100/50 text-sm leading-relaxed">{description}</p>
        </div>
    )
}

function MemoryPoint({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <li className="flex items-center gap-3 text-purple-100/70">
            <span className="text-purple-400 w-5 h-5 flex-shrink-0">{icon}</span>
            <span className="text-sm">{text}</span>
        </li>
    )
}

function StatItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
            <div className="text-2xl font-bold text-white mb-1 tracking-tighter">{value}</div>
            <div className="text-[10px] text-purple-400 uppercase tracking-widest font-mono">{label}</div>
        </div>
    )
}
