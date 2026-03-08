import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dna, Brain, Cpu, Database, Shield, Zap, Sparkles, Binary, Network, Activity, Boxes, Layers, ChevronRight, Maximize, Minimize, X, GitCompare, GitGraph, FileCode, GitBranch, Terminal, Search, Code, CheckCircle, Settings, ExternalLink, RotateCcw } from 'lucide-react'
import Section from '@/components/ui/Section'
import { NeuralNetworkGraph } from '@/components/neural/NeuralNetworkGraph'
import { TimelineBatch, KiDiff } from '@/visualizations/ki-network-types'
import { clearCache } from '@/visualizations/dna-history-engine'

/**
 * Antigravity DNA Showcase Page
 * A technical deep-dive into the AI agent's evolutionary architecture and persistence protocols.
 */

// Types defined in ki-network-types.ts

// TimelineBatch imported from ki-network-types.ts

export default function AntigravityDNAShowcase() {
    const [isGraphFullscreen, setIsGraphFullscreen] = useState(false)

    const [timeline, setTimeline] = useState<TimelineBatch[]>([])
    const [activeEpochTimestamp, setActiveEpochTimestamp] = useState<string | null>(null)
    const [currentView, setCurrentView] = useState<'3d' | '2d'>('3d')
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [graphStats, setGraphStats] = useState({ nodes: 0, links: 0 })
    const [openFlyoutBatchId, setOpenFlyoutBatchId] = useState<string | null>(null)
    const [refreshKey, setRefreshKey] = useState(0)
    const [isRefreshing, setIsRefreshing] = useState(false)

    // Helper to extract GitHub URL from commit label
    const getGitHubLink = (label: string) => {
        const hashMatch = label.match(/\[([a-f0-9]{7})\]/)
        if (!hashMatch) return '#'
        const hash = hashMatch[1]
        return `https://github.com/IdanDavidAviv/antigravity-dna/commit/${hash}`
    }

    // Automatically close expanded batches when sidebar collapses
    useEffect(() => {
        if (isSidebarCollapsed) {
            setOpenFlyoutBatchId(null);
        }
    }, [isSidebarCollapsed]);


    // Compute cumulative totals per batch for the UI summary
    const cumulativeBatches = useMemo(() => {
        const result = new Map<string, { nodes: number; links: number }>();
        let runningNodes = 0;
        let runningLinks = 0;

        timeline.forEach(batch => {
            batch.items.forEach(commit => {
                runningNodes += commit.delta.nodes.added.length;
                runningNodes -= commit.delta.nodes.removed.length;
                runningLinks += commit.delta.links.added.length;
                runningLinks -= commit.delta.links.removed.length;
            });
            result.set(batch.id, { nodes: runningNodes, links: runningLinks });
        });
        return result;
    }, [timeline])

    const switchView = (view: '3d' | '2d') => {
        setCurrentView(view)
    }

    const handleRefresh = (currentEpoch: string) => {
        setIsRefreshing(true);
        clearCache();
        // Maintain context as per user request
        setActiveEpochTimestamp(currentEpoch);
        setOpenFlyoutBatchId(null);
        setRefreshKey(prev => prev + 1);

        // Artificial "tactile" delay for professional feel
        setTimeout(() => {
            setIsRefreshing(false);
        }, 800);
    }
    const handleStatsUpdate = useCallback((stats: { nodes: number; links: number }) => {
        setGraphStats(stats);
    }, []);

    const handleTimelineData = useCallback((timelineData: TimelineBatch[], currentEpoch: string) => {
        setTimeline(timelineData);
        setActiveEpochTimestamp(prev => prev || currentEpoch);
    }, []);

    useEffect(() => {
        // SEO & Metadata Tuning
        document.title = "Antigravity DNA — Unified Neural Network | Idan David-Aviv";
    }, [])


    // Manage body overflow for fullscreen
    useEffect(() => {
        if (isGraphFullscreen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isGraphFullscreen])
    return (
        <main className="min-h-screen w-full bg-[#050510] py-20 px-4 md:px-8 lg:px-12 flex flex-col items-center">
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
                        className="p-6 md:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)]"
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Dna className="w-8 h-8 md:w-12 md:h-12 text-idan-david-aviv-gold animate-pulse" />
                            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-idan-david-aviv-gold to-idan-david-aviv-gold/80 uppercase relative">
                                Antigravity DNA
                            </h1>
                            <Brain className="w-8 h-8 md:w-12 md:h-12 text-idan-david-aviv-gold animate-pulse" />
                        </div>
                        <p className="max-w-2xl mx-auto text-idan-david-aviv-gold/70 text-lg md:text-xl font-light leading-relaxed">
                            The Foundation of Agent Reliability. <br className="hidden md:block" />
                            A path-orchestrated ecosystem for 100X deterministic performance.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <span className="px-4 py-1.5 rounded-full bg-idan-david-aviv-gold/20 border border-idan-david-aviv-gold/30 text-idan-david-aviv-gold text-xs font-mono uppercase tracking-widest">
                                stabilization protocol
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-idan-david-aviv-gold/20 border border-idan-david-aviv-gold/30 text-idan-david-aviv-gold text-xs font-mono uppercase tracking-widest">
                                path-orchestration
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-idan-david-aviv-gold/20 border border-idan-david-aviv-gold/30 text-idan-david-aviv-gold text-xs font-mono uppercase tracking-widest">
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
                        The DNA <span className="text-idan-david-aviv-gold">Philosophy</span>
                    </motion.h2>
                    <p className="max-w-3xl mx-auto text-idan-david-aviv-gold/40 text-lg md:text-xl font-light">
                        Engineering 100X efficiency by cleaning the noise from the agent runtime.
                        Stabilizing behavior through orchestrated paths and persistent memory.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <PhilosophyCard
                        title="Behavioral Stabilization"
                        description="Shifting from probabilistic guessing to deterministic execution. Codifying identity to eliminate erratic agent behavior."
                        icon={<Activity className="text-idan-david-aviv-gold" />}
                    />
                    <PhilosophyCard
                        title="Path Orchestration"
                        description="Designing success through proactive workflows and skills. The agent follows high-integrity roadmaps, not trial-and-error."
                        icon={<Network className="text-idan-david-aviv-gold" />}
                    />
                    <PhilosophyCard
                        title="Noise Reduction"
                        description="Automating 'repetitive nonsense' via code. Freeing the cognitive runtime to focus purely on high-level thinking."
                        icon={<Cpu className="text-idan-david-aviv-gold" />}
                    />
                    <PhilosophyCard
                        title="SSOT Consensus"
                        description="Thinking based on a Source of Truth. The agent audits historical data instead of hallucinating from transient logs."
                        icon={<Database className="text-idan-david-aviv-gold" />}
                    />
                    <PhilosophyCard
                        title="Self-Maintainability"
                        description="A system that audits and improves itself. Zero contextual leakage through crystalline architectural memory."
                        icon={<Sparkles className="text-idan-david-aviv-gold" />}
                    />
                    <PhilosophyCard
                        title="100X Performance"
                        description="Saving time, money, and developer frustration by solving problems once and locking them at the SSOT baseline."
                        icon={<Zap className="text-idan-david-aviv-gold" />}
                    />
                </div>
            </Section>
            <PathTransition />

            {/* Content Sections */}
            <div className="w-full max-w-6xl mt-24 space-y-32">

                {/* section: The Neural Blueprint */}
                <Section id="neural-blueprint">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Neural Blueprint</h2>
                        <p className="text-idan-david-aviv-gold/40 text-lg uppercase tracking-widest font-mono">Algorithmic Governance & Logic</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        <FeatureCard
                            icon={<Shield className="text-idan-david-aviv-gold" />}
                            title="Permission Protocol"
                            description="Strict 'Calm Execution' logic ensuring no state changes occur without explicit human authorization."
                        />
                        <FeatureCard
                            icon={<Cpu className="text-idan-david-aviv-gold" />}
                            title="Operation Commander"
                            description="A meta-skill orchestrating implementation integrity through mandatory reconnaissance and planning."
                        />
                        <FeatureCard
                            icon={<Zap className="text-idan-david-aviv-gold" />}
                            title="Windows Protocol"
                            description="Tailored high-integrity terminal execution standards for PowerShell environments."
                        />
                    </div>
                </Section>
                <PathTransition />

                {/* section: Crystalline Memory */}
                <Section id="crystalline-memory">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Crystalline Memory</h2>
                        <p className="text-idan-david-aviv-gold/40 text-lg uppercase tracking-widest font-mono">The Persistent Knowledge Base</p>
                    </div>
                    <div className="relative mt-12 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/5 overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                            <Binary className="w-64 h-64 text-idan-david-aviv-gold" />
                        </div>

                        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                            <div className="flex-1 space-y-6">
                                <h3 className="text-3xl font-bold text-white">The KI Ecosystem</h3>
                                <p className="text-idan-david-aviv-gold/60 leading-relaxed text-lg">
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
                <PathTransition />

                {/* section: Technical Core */}
                <Section id="technical-core">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Technical Core</h2>
                        <p className="text-idan-david-aviv-gold/40 text-lg uppercase tracking-widest font-mono">Architecture for AI Entrepreneurs</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                        <div className="space-y-8">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-4 mb-6">
                                    <Layers className="text-idan-david-aviv-gold w-8 h-8" />
                                    <h4 className="text-2xl font-bold text-white">Dual-Layer Governance</h4>
                                </div>
                                <p className="text-idan-david-aviv-gold/60 leading-relaxed">
                                    The system operates on two distinct layers:
                                </p>
                                <div className="mt-6 space-y-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <p className="text-sm font-bold text-white mb-1">Layer 1: Global Protocols (GEMINI.md)</p>
                                        <p className="text-xs text-idan-david-aviv-gold/40 font-mono italic">Lower-level instincts governing planning and safety.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <p className="text-sm font-bold text-white mb-1">Layer 2: Domain Knowledge (KIs)</p>
                                        <p className="text-xs text-idan-david-aviv-gold/40 font-mono italic">High-level memories providing technical depth.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-idan-david-aviv-gold/60 text-lg md:text-xl font-mono uppercase tracking-[0.3em]">
                            The Distributed Network Architecture of a Performance Orchestrator
                        </p>
                    </div>
                </Section>
                <PathTransition />

                {/* Core Philosophy */}
                <Section className="py-20 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <PhilosophyCard
                                icon={<Zap className="w-6 h-6 text-idan-david-aviv-gold" />}
                                title="Zero-Latency Logic"
                                description="Executing architecture by following pre-designed high-performance paths, eliminating decision fatigue."
                            />
                            <PhilosophyCard
                                icon={<Shield className="w-6 h-6 text-idan-david-aviv-gold" />}
                                title="SSOT Consensus"
                                description="Behavioral stabilization via Knowledge Items (KIs) that serve as the single source of truth for all modules."
                            />
                            <PhilosophyCard
                                icon={<Cpu className="w-6 h-6 text-idan-david-aviv-gold" />}
                                title="Self-Maintainability"
                                description="Recursive protocol auditing ensures the system improves its own orchestration without human drift."
                            />
                        </div>
                    </div>
                </Section>
            </div>
            <PathTransition />

            {/* Technical Core: Crystalline Memory */}
            <Section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10 order-2 lg:order-1">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase italic">
                                    Crystalline <span className="text-idan-david-aviv-gold">Memory</span>
                                </h2>
                                <div className="h-1 w-24 bg-gradient-to-r from-idan-david-aviv-gold to-transparent" />
                                <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                                    Antigravity doesn&apos;t just process tasks; it embeds them into a synthetic cognitive lattice. Every interaction refines the behavioral DNA, ensuring absolute coherence across sessions.
                                </p>
                            </div>

                            <ul className="space-y-6">
                                <MemoryPoint icon={<FileCode className="w-4 h-4" />} text="Dynamic GEMINI.md Behavioral Sync" />
                                <MemoryPoint icon={<GitBranch className="w-4 h-4" />} text="Versioned Knowledge Injections" />
                                <MemoryPoint icon={<Terminal className="w-4 h-4" />} text="High-Integrity Terminal Protocols" />
                            </ul>

                            <div className="pt-6">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="p-8 rounded-[2rem] bg-gradient-to-br from-idan-david-aviv-gold/20 to-transparent border border-idan-david-aviv-gold/30 backdrop-blur-xl relative group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-idan-david-aviv-gold/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                    <div className="flex items-center gap-4 mb-6">
                                        <Activity className="w-8 h-8 text-idan-david-aviv-gold animate-[pulse-slow_3s_infinite]" />
                                        <span className="text-xs font-mono text-idan-david-aviv-gold uppercase tracking-[0.2em]">Logic Optimization Active</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <div className="text-3xl font-black text-white mb-1 shadow-[0_0_10px_rgba(255,255,255,0.1)]">100X</div>
                                            <div className="text-[10px] text-idan-david-aviv-gold uppercase tracking-widest font-mono">Detective Performance</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-black text-white mb-1 shadow-[0_0_10px_rgba(255,255,255,0.1)]">0.0ms</div>
                                            <div className="text-[10px] text-idan-david-aviv-gold uppercase tracking-widest font-mono">Cognitive Leakage</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="relative order-1 lg:order-2">
                            <div className="absolute -inset-10 bg-idan-david-aviv-gold/10 blur-[100px] rounded-full" />
                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                {[
                                    { icon: <Search className="w-6 h-6" />, title: "Reconnaissance", color: "text-blue-400" },
                                    { icon: <Code className="w-6 h-6" />, title: "Implementation", color: "idan-david-aviv-gold" },
                                    { icon: <CheckCircle className="w-6 h-6" />, title: "Verification", color: "text-emerald-400" },
                                    { icon: <Settings className="w-6 h-6" />, title: "Governance", color: "idan-david-aviv-gold" }
                                ].map((step, i) => (
                                    <FeatureCard
                                        key={i}
                                        icon={step.icon}
                                        title={step.title}
                                        description="Standardized protocol ensures high fidelity results."
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* section: The Neural Explorer (3D Graph) */}
            <Section id="neural-explorer">

                <motion.div
                    layout
                    initial={false}
                    animate={{
                        height: isGraphFullscreen ? '100vh' : 700,
                        width: '100%',
                        borderRadius: isGraphFullscreen ? 0 : '3rem',
                    }}
                    transition={{
                        type: 'spring',
                        damping: 25,
                        stiffness: 120,
                    }}
                    onAnimationComplete={() => {
                        // No longer need to postMessage to iframe for resize
                    }}
                    className={isGraphFullscreen
                        ? "fixed inset-0 z-[150] bg-[#050510] flex flex-col"
                        : "relative group overflow-hidden border border-idan-david-aviv-gold/20 bg-[#050510] shadow-[0_0_80px_-20px_rgba(34,211,238,0.4)] flex flex-col"
                    }
                >
                    {/* Integrated Top Head */}
                    <div className="px-8 py-5 border-b border-white/5 bg-gradient-to-r from-idan-david-aviv-gold/5 to-transparent flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-idan-david-aviv-gold/20 blur-xl rounded-full" />
                                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-idan-david-aviv-gold/20 to-idan-david-aviv-gold/40 flex items-center justify-center border border-idan-david-aviv-gold/30">
                                    <Network className="w-7 h-7 text-idan-david-aviv-gold" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                                    Prompt Architecture Space
                                </h2>
                                <p className="text-idan-david-aviv-gold/40 text-xs uppercase tracking-[0.2em] font-mono mt-1">Interactive Neural Traceability Network</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
                                <button
                                    onClick={() => handleRefresh(activeEpochTimestamp || '')}
                                    className="p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all group"
                                    title="Refresh Graph"
                                >
                                    <RotateCcw className="w-4 h-4 group-active:rotate-180 transition-transform duration-500" />
                                </button>
                                <div className="w-[1px] h-4 bg-white/10 mx-1" />
                                <button
                                    onClick={() => switchView('3d')}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${currentView === '3d'
                                        ? 'bg-idan-david-aviv-gold/20 text-idan-david-aviv-gold shadow-[0_0_15px_rgba(34,211,238,0.2)] border border-idan-david-aviv-gold/30'
                                        : 'text-white/40 hover:text-white/60'
                                        }`}
                                >
                                    3D Network
                                </button>
                                <button
                                    onClick={() => switchView('2d')}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${currentView === '2d'
                                        ? 'bg-idan-david-aviv-gold/20 text-idan-david-aviv-gold shadow-[0_0_15px_rgba(34,211,238,0.3)] border border-idan-david-aviv-gold/30'
                                        : 'text-white/40 hover:text-white/60'
                                        }`}
                                >
                                    2D Graph
                                </button>
                            </div>

                            <button
                                onClick={() => setIsGraphFullscreen(!isGraphFullscreen)}
                                className="p-3 rounded-xl bg-idan-david-aviv-gold/10 border border-idan-david-aviv-gold/20 text-idan-david-aviv-gold hover:bg-idan-david-aviv-gold/20 transition-all shadow-lg shadow-idan-david-aviv-gold/5 group"
                                title={isGraphFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                                aria-label={isGraphFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                            >
                                {isGraphFullscreen ? (
                                    <Minimize className="w-5 h-5" />
                                ) : (
                                    <Maximize className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>


                    {/* Sidebar Overlay + Graph Area */}
                    <div className="flex-1 relative overflow-hidden flex">
                        <motion.div
                            initial={false}
                            animate={{
                                x: isSidebarCollapsed ? -320 : 0,
                                opacity: isSidebarCollapsed ? 0 : 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 20,
                                mass: 1
                            }}
                            className="absolute top-0 left-0 h-full w-[320px] z-30 border-r border-white/5 bg-slate-900/40 backdrop-blur-3xl flex flex-col overflow-hidden"
                        >
                            <div className="px-4 py-3 border-b border-white/5 bg-gradient-to-b from-idan-david-aviv-gold/5 to-transparent flex items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <GitGraph className="w-4 h-4 text-idan-david-aviv-gold flex-shrink-0" />
                                    <div className="flex flex-col justify-center">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-wider leading-tight">DNA REFERENCE GRAPH EVOLUTION</span>
                                        <span className="text-[8px] text-idan-david-aviv-gold/40 uppercase tracking-[0.1em] italic mt-0.5">choose commit to see state</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsSidebarCollapsed(true)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors"
                                    title="Collapse Sidebar"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto premium-scrollbar p-4 space-y-3 min-w-[320px]">
                                {timeline.length > 0 ? (
                                    [...timeline].reverse().map((batch, idx) => {
                                        const isActive = activeEpochTimestamp === batch.id;
                                        const isFlyoutOpen = openFlyoutBatchId === batch.id;

                                        if (batch.type === 'SIGNIFICANT') {
                                            return (
                                                <motion.button
                                                    key={batch.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        setActiveEpochTimestamp(batch.id);
                                                        setOpenFlyoutBatchId(null);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all border ${isActive
                                                        ? 'bg-idan-david-aviv-gold/10 border-idan-david-aviv-gold/50 shadow-[0_0_20px_-5px_rgba(251,191,36,0.2)]'
                                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className="text-left w-full">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-[8px] text-idan-david-aviv-gold font-mono tracking-widest uppercase opacity-70">{batch.id}</span>
                                                        </div>
                                                        <div className="text-[11px] font-bold text-white leading-tight mb-2 truncate pr-2">
                                                            {batch.label}
                                                        </div>
                                                        <div className="flex flex-wrap gap-1.5 opacity-80 scale-90 origin-left">
                                                            {(() => {
                                                                let addedNodes = 0, removedNodes = 0, addedLinks = 0, removedLinks = 0;
                                                                batch.items.forEach(c => {
                                                                    addedNodes += c.delta.nodes.added.length;
                                                                    removedNodes += c.delta.nodes.removed.length;
                                                                    addedLinks += c.delta.links.added.length;
                                                                    removedLinks += c.delta.links.removed.length;
                                                                });

                                                                return (
                                                                    <>
                                                                        {addedNodes > 0 && <span className="text-[8px] text-emerald-400 font-mono">+{addedNodes}N</span>}
                                                                        {removedNodes > 0 && <span className="text-[8px] text-red-400 font-mono">-{removedNodes}N</span>}
                                                                        {addedLinks > 0 && <span className="text-[8px] text-blue-400 font-mono">+{addedLinks}L</span>}
                                                                        {removedLinks > 0 && <span className="text-[8px] text-orange-400 font-mono">-{removedLinks}L</span>}
                                                                    </>
                                                                )
                                                            })()}
                                                        </div>
                                                        {(() => {
                                                            const total = cumulativeBatches.get(batch.id);
                                                            return total ? (
                                                                <div className="flex gap-2 mt-2 pt-2 border-t border-white/5 opacity-40">
                                                                    <span className="text-[7px] font-mono text-idan-david-aviv-gold uppercase italic">Total: {total.nodes}N / {total.links}L</span>
                                                                </div>
                                                            ) : null;
                                                        })()}
                                                    </div>
                                                    <ChevronRight className={`flex-shrink-0 w-4 h-4 transition-transform ${isActive ? 'text-idan-david-aviv-gold rotate-90' : 'text-white/10'}`} />
                                                </motion.button>
                                            )
                                        }

                                        return (
                                            <div key={batch.id} className="space-y-1">
                                                <motion.button
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    whileHover={{ x: 5 }}
                                                    onClick={() => {
                                                        if (isFlyoutOpen) {
                                                            // When collapsing, fallback to the next available SIGNIFICANT commit 
                                                            // (which represents the baseline state of this batch)
                                                            const currentIdx = timeline.findIndex(b => b.id === batch.id);
                                                            const prevSignificant = timeline.slice(0, currentIdx).reverse().find(b => b.type === 'SIGNIFICANT');
                                                            if (prevSignificant) {
                                                                setActiveEpochTimestamp(prevSignificant.id);
                                                            }
                                                            setOpenFlyoutBatchId(null);
                                                        } else {
                                                            setActiveEpochTimestamp(batch.id);
                                                            setOpenFlyoutBatchId(batch.id);
                                                        }
                                                    }}
                                                    className={`w-full flex items-center justify-between px-5 py-2.5 rounded-xl transition-all border ${isFlyoutOpen
                                                        ? 'bg-idan-david-aviv-gold/5 border-idan-david-aviv-gold/30'
                                                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[8px] text-idan-david-aviv-gold/50 font-mono tracking-widest uppercase">{batch.id}</span>
                                                        <span className="px-1.5 py-0.5 rounded bg-white/5 text-[7px] text-white/40 uppercase font-mono border border-white/5">
                                                            {batch.items.length} ARCHIVED
                                                        </span>
                                                    </div>
                                                    <ChevronRight className={`flex-shrink-0 w-3 h-3 transition-transform ${isFlyoutOpen ? 'text-idan-david-aviv-gold rotate-90' : 'text-white/10'}`} />
                                                </motion.button>

                                                <AnimatePresence>
                                                    {isFlyoutOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="overflow-hidden pl-4 border-l-2 border-idan-david-aviv-gold/20 ml-2"
                                                        >
                                                            <div className="py-2 space-y-3">
                                                                {batch.items.map((commit: KiDiff) => {
                                                                    return (
                                                                        <a
                                                                            key={commit.timestamp}
                                                                            href={getGitHubLink(commit.label)}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="block w-full text-left group/item transition-all no-underline py-1"
                                                                        >
                                                                            <div className="text-[9px] font-mono tracking-tighter text-white/20 mb-0.5 group-hover/item:text-idan-david-aviv-gold/50">{commit.timestamp}</div>
                                                                            <div className="text-[11px] leading-tight italic font-light text-white/40 group-hover/item:text-white/80 flex items-center gap-1.5">
                                                                                {commit.label}
                                                                                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/item:opacity-100 transition-opacity text-idan-david-aviv-gold" />
                                                                            </div>
                                                                        </a>
                                                                    );
                                                                })}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 animate-pulse">
                                        <div className="w-4 h-4 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                                        <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">Syncing Ledger...</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>


                        {/* Graph Workspace (Full Container) */}
                        <div className="flex-1 relative flex flex-col bg-[#050510]">
                            {/* HUD Overlay */}
                            <div className="absolute inset-0 z-20 pointer-events-none">

                                {/* Scanning Line */}
                                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-idan-david-aviv-gold to-transparent animate-[scan_4s_linear_infinite] opacity-50 shadow-[0_0_15px_rgba(251,191,36,0.3)]" />

                            </div>

                            {isSidebarCollapsed && (
                                <button
                                    onClick={() => setIsSidebarCollapsed(false)}
                                    className="absolute top-6 left-6 z-20 p-3 rounded-xl bg-idan-david-aviv-gold/10 border border-idan-david-aviv-gold/20 text-idan-david-aviv-gold hover:bg-idan-david-aviv-gold/20 transition-all shadow-lg shadow-idan-david-aviv-gold/5 backdrop-blur-md group"
                                    title="Open Prompt Architecture Space"
                                >
                                    <GitCompare className="w-5 h-5" />
                                </button>
                            )}

                            {/* Interactive Graph Area Layer */}
                            <div className="flex-1 relative flex flex-col bg-[#050510]">
                                <motion.div
                                    className="absolute inset-0 z-40"
                                    animate={{
                                        opacity: isRefreshing ? 1 : 0,
                                        pointerEvents: isRefreshing ? 'auto' : 'none'
                                    }}
                                >
                                    <div className="absolute inset-0 bg-[#050510]/60 backdrop-blur-md flex flex-col items-center justify-center gap-6">
                                        <div className="relative">
                                            <div className="absolute -inset-8 bg-idan-david-aviv-gold/20 blur-2xl rounded-full animate-pulse" />
                                            <RotateCcw className="w-12 h-12 text-idan-david-aviv-gold animate-spin" />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-mono text-idan-david-aviv-gold uppercase tracking-[0.3em] font-bold mb-2">Syncing Neural DNA</div>
                                            <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Hard Reset of Truth in Progress...</div>
                                        </div>
                                    </div>
                                </motion.div>

                                <NeuralNetworkGraph
                                    key={refreshKey}
                                    activeEpochTimestamp={activeEpochTimestamp}
                                    currentView={currentView}
                                    isFullscreen={isGraphFullscreen}
                                    isSidebarCollapsed={isSidebarCollapsed}
                                    onTimelineData={handleTimelineData}
                                    onStatsUpdate={handleStatsUpdate}
                                />
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute bottom-6 right-6 flex items-center gap-4 z-20">
                                <div className="px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/5 text-[10px] font-mono text-idan-david-aviv-gold/60 uppercase tracking-widest">
                                    Nodes: <span className="text-white">{graphStats.nodes}</span> {' // '} Links: <span className="text-white">{graphStats.links}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="max-w-7xl mx-auto px-6 mt-20 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-idan-david-aviv-gold/20 to-transparent"></div>
                        <h3 className="text-idan-david-aviv-gold/60 text-sm font-mono uppercase tracking-[0.3em] px-4">Cognitive Mechanics</h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-idan-david-aviv-gold/20 to-transparent"></div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4 hover:border-idan-david-aviv-gold/20 transition-all group">
                        <div className="flex items-center gap-3 text-idan-david-aviv-gold mb-2">
                            <div className="p-2 rounded-lg bg-idan-david-aviv-gold/10 group-hover:scale-110 transition-transform">
                                <Network className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold uppercase tracking-tight">Neural Traceability</h4>
                        </div>
                        <p className="text-sm text-idan-david-aviv-gold/40 leading-relaxed font-mono">
                            Tailored execution protocols replace model guesswork with precise logic, forging a persistent and customizable cognitive source of truth.
                        </p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4 hover:border-idan-david-aviv-gold/20 transition-all group">
                        <div className="flex items-center gap-3 text-idan-david-aviv-gold mb-2">
                            <div className="p-2 rounded-lg bg-idan-david-aviv-gold/10 group-hover:scale-110 transition-transform">
                                <Boxes className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold uppercase tracking-tight">Knowledge Topology</h4>
                        </div>
                        <p className="text-sm text-idan-david-aviv-gold/40 leading-relaxed font-mono">
                            Cross-referencing between Knowledge Items establishes a resilient network topology, providing a stabilized and predictable context for the model&apos;s reasoning to flow on.
                        </p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4 hover:border-idan-david-aviv-gold/20 transition-all group">
                        <div className="flex items-center gap-3 text-idan-david-aviv-gold mb-2">
                            <div className="p-2 rounded-lg bg-idan-david-aviv-gold/10 group-hover:scale-110 transition-transform">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold uppercase tracking-tight">Precision Steering</h4>
                        </div>
                        <p className="text-sm text-idan-david-aviv-gold/40 leading-relaxed font-mono">
                            Agent stabilization offloads the friction of tactical decision making, allowing the user to focus on strategic intent rather than fighting against agentic drift and context rot.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Final Footer Label */}
            <div className="mt-40 mb-20 text-center relative z-10">
                <div className="w-1 h-20 bg-gradient-to-b from-idan-david-aviv-gold/20 to-transparent mx-auto mb-8" />
                <p className="text-white/20 font-mono text-sm tracking-[1em] uppercase">Persistent Agent Module // Antigravity</p>
            </div>
        </main>
    );
}


function PathTransition() {
    return (
        <div className="w-full flex justify-center py-20 pointer-events-none overflow-hidden h-32 relative">
            <svg width="200" height="120" viewBox="0 0 200 120" fill="none" className="opacity-20">
                <path d="M100 0V40M100 80V120M60 60H140" stroke="currentColor" strokeWidth="0.5" className="text-idan-david-aviv-gold" />
                <motion.circle
                    initial={{ cy: 0, cx: 100, opacity: 0 }}
                    animate={{ cy: [0, 40, 60, 60, 140], cx: [100, 100, 60, 140, 100], opacity: [0, 1, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    r="2" fill="#FBBF24"
                />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-idan-david-aviv-gold/5 to-transparent blur-3xl opacity-30" />
        </div>
    )
}

function PhilosophyCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 hover:border-idan-david-aviv-gold/40 transition-all group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-idan-david-aviv-gold/10 transition-all duration-300">
                {icon}
            </div>
            <h4 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-idan-david-aviv-gold transition-colors">{title}</h4>
            <p className="text-idan-david-aviv-gold/50 text-sm leading-relaxed group-hover:text-idan-david-aviv-gold/70 transition-colors">{description}</p>
        </motion.div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-idan-david-aviv-gold/30 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-idan-david-aviv-gold/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
            <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {icon}
            </div>
            <h4 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-idan-david-aviv-gold transition-colors">{title}</h4>
            <p className="text-idan-david-aviv-gold/50 text-sm leading-relaxed">{description}</p>
        </div>
    )
}

function MemoryPoint({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <li className="flex items-center gap-3 text-idan-david-aviv-gold/70">
            <span className="text-idan-david-aviv-gold w-5 h-5 flex-shrink-0">{icon}</span>
            <span className="text-sm">{text}</span>
        </li>
    )
}

function StatItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
            <div className="text-2xl font-bold text-white mb-1 tracking-tighter">{value}</div>
            <div className="text-[10px] text-idan-david-aviv-gold uppercase tracking-widest font-mono">{label}</div>
        </div>
    )
}
