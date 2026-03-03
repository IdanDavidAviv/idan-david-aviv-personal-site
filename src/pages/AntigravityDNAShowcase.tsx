import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dna, Brain, Cpu, Database, Shield, Zap, Sparkles, Binary, Network, Activity, Boxes, Layers, ChevronRight, Maximize, Minimize, X, GitCompare, GitGraph } from 'lucide-react'
import Section from '@/components/ui/Section'

/**
 * Antigravity DNA Showcase Page
 * A technical deep-dive into the AI agent's evolutionary architecture and persistence protocols.
 */

interface KiNode {
    id: string;
    name: string;
    group: number;
}

interface KiLink {
    source: string | KiNode;
    target: string | KiNode;
}

interface KiDiff {
    timestamp: string;
    label: string;
    delta: {
        nodes: { added: KiNode[]; removed: string[] };
        links: { added: KiLink[]; removed: KiLink[] };
    };
}

interface TimelineBatch {
    id: string; // Latest timestamp in batch
    type: 'SIGNIFICANT' | 'EMPTY_BATCH';
    label: string;     // Representative label
    items: KiDiff[]; // All commits in this batch
}

export default function AntigravityDNAShowcase() {
    const [isGraphFullscreen, setIsGraphFullscreen] = useState(false)

    const [timeline, setTimeline] = useState<TimelineBatch[]>([])
    const [activeEpochTimestamp, setActiveEpochTimestamp] = useState<string | null>(null)
    const [currentView, setCurrentView] = useState<'3d' | '2d'>('3d')
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [openFlyoutBatchId, setOpenFlyoutBatchId] = useState<string | null>(null)
    const [graphStats, setGraphStats] = useState({ nodes: 0, links: 0 })


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
        const iframe = document.getElementById('dna-visualizer') as HTMLIFrameElement
        iframe?.contentWindow?.postMessage({ type: 'SET_VIEW', view }, '*')
    }

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'toggle-fullscreen') {
                setIsGraphFullscreen(event.data.isFullscreen)
            }
            if (event.data.type === 'TIMELINE_DATA') {
                setTimeline(event.data.timeline as TimelineBatch[])
                if (event.data.currentEpoch) setActiveEpochTimestamp(event.data.currentEpoch);
            }
            if (event.data.type === 'EPOCH_UPDATED') {
                setGraphStats({ nodes: event.data.nodes, links: event.data.links })
            }
        }
        window.addEventListener('message', handleMessage)

        // Request timeline if already loaded
        const iframe = document.getElementById('dna-visualizer') as HTMLIFrameElement
        iframe?.contentWindow?.postMessage({ type: 'GET_TIMELINE' }, '*')

        // SEO & Metadata Tuning
        document.title = "Antigravity DNA — Unified Neural Network | Idan David-Aviv";

        return () => window.removeEventListener('message', handleMessage)
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

                    <motion.div
                        layout
                        initial={false}
                        animate={{
                            height: isGraphFullscreen ? '100vh' : 760,
                            width: '100%',
                            borderRadius: isGraphFullscreen ? 0 : '3rem',
                        }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 120,
                        }}
                        onAnimationComplete={() => {
                            const iframe = document.getElementById('dna-visualizer') as HTMLIFrameElement;
                            iframe?.contentWindow?.postMessage({ type: 'RESYNC_SIZE' }, '*');
                        }}
                        className={isGraphFullscreen
                            ? "fixed inset-0 z-[150] bg-[#050510] flex flex-col"
                            : "relative group overflow-hidden border border-purple-500/20 bg-[#050510] shadow-[0_0_80px_-20px_rgba(168,85,247,0.4)] flex flex-col"
                        }
                    >
                        {/* Integrated Top Head */}
                        <div className="p-8 border-b border-white/5 bg-gradient-to-r from-purple-500/5 to-transparent flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
                                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-900/40 flex items-center justify-center border border-purple-500/30">
                                        <Network className="w-7 h-7 text-purple-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                                        Neural Explorer
                                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 animate-pulse">LIVE NODE</span>
                                    </h2>
                                    <p className="text-purple-100/40 text-xs uppercase tracking-[0.2em] font-mono mt-1">Antigravity DNA KI Network Interactive Incremental Graph</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
                                    <button
                                        onClick={() => switchView('3d')}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${currentView === '3d'
                                            ? 'bg-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-purple-500/30'
                                            : 'text-white/40 hover:text-white/60'
                                            }`}
                                    >
                                        3D Network
                                    </button>
                                    <button
                                        onClick={() => switchView('2d')}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${currentView === '2d'
                                            ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] border border-cyan-500/30'
                                            : 'text-white/40 hover:text-white/60'
                                            }`}
                                    >
                                        2D Physics
                                    </button>
                                </div>

                                <button
                                    onClick={() => {
                                        setIsGraphFullscreen(!isGraphFullscreen);
                                        const iframe = document.getElementById('dna-visualizer') as HTMLIFrameElement;
                                        iframe?.contentWindow?.postMessage({ type: 'toggle-fullscreen', isFullscreen: !isGraphFullscreen }, '*');
                                    }}
                                    className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all shadow-lg shadow-purple-500/5 group"
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

                        {/* Explorer Workspace: Sidebar Overlay + Graph */}
                        <div className="flex-1 relative overflow-hidden">
                            <motion.div
                                initial={false}
                                animate={{
                                    x: isSidebarCollapsed ? -320 : 0,
                                    opacity: isSidebarCollapsed ? 0 : 1,
                                }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                className="absolute top-0 left-0 h-full w-[320px] z-30 border-r border-white/5 bg-slate-900/40 backdrop-blur-3xl flex flex-col overflow-hidden"
                            >
                                <div className="px-4 py-3 border-b border-white/5 bg-gradient-to-b from-purple-500/5 to-transparent flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <GitGraph className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                        <div className="flex flex-col justify-center">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider leading-tight">DNA REFERENCE GRAPH EVOLUTION</span>
                                            <span className="text-[8px] text-purple-100/40 uppercase tracking-[0.1em] italic mt-0.5">choose commit to see state</span>
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
                                                            const iframe = document.getElementById('dna-visualizer') as HTMLIFrameElement;
                                                            iframe?.contentWindow?.postMessage({ type: 'SET_EPOCH', timestamp: batch.id }, '*');
                                                        }}
                                                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all border ${isActive
                                                            ? 'bg-purple-500/20 border-purple-500/50 shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]'
                                                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                                            }`}
                                                    >
                                                        <div className="text-left w-full">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="text-[8px] text-purple-400 font-mono tracking-widest uppercase opacity-70">{batch.id}</span>
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
                                                                        <span className="text-[7px] font-mono text-purple-300 uppercase italic">Total: {total.nodes}N / {total.links}L</span>
                                                                    </div>
                                                                ) : null;
                                                            })()}
                                                        </div>
                                                        <ChevronRight className={`flex-shrink-0 w-4 h-4 transition-transform ${isActive ? 'text-purple-400 rotate-90' : 'text-white/10'}`} />
                                                    </motion.button>
                                                )
                                            }

                                            // EMPTY_BATCH Compact Row
                                            return (
                                                <motion.button
                                                    key={batch.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    whileHover={{ x: 5 }}
                                                    onClick={() => {
                                                        setOpenFlyoutBatchId(isFlyoutOpen ? null : batch.id);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-5 py-2.5 rounded-xl transition-all border ${isFlyoutOpen
                                                        ? 'bg-purple-500/10 border-purple-500/30'
                                                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[8px] text-purple-400/50 font-mono tracking-widest uppercase">{batch.id}</span>
                                                        <span className="px-1.5 py-0.5 rounded bg-white/5 text-[7px] text-white/40 uppercase font-mono border border-white/5">
                                                            {batch.items.length} ARCHIVED
                                                        </span>
                                                    </div>
                                                    <ChevronRight className={`flex-shrink-0 w-3 h-3 transition-transform ${isFlyoutOpen ? 'text-purple-400 rotate-180' : 'text-white/10'}`} />
                                                </motion.button>
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

                            {/* Flyout Layer */}
                            <AnimatePresence>
                                {openFlyoutBatchId && (() => {
                                    const batch = timeline.find(b => b.id === openFlyoutBatchId);
                                    return batch ? (
                                        <EmptyBatchFlyout
                                            batch={batch}
                                            onClose={() => setOpenFlyoutBatchId(null)}
                                        />
                                    ) : null;
                                })()}
                            </AnimatePresence>

                            {/* Graph Workspace (Full Container) */}
                            <div className="absolute inset-0 z-10 bg-[#050510]">
                                {isSidebarCollapsed && (
                                    <motion.button
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        onClick={() => setIsSidebarCollapsed(false)}
                                        className="absolute top-6 left-6 z-20 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all shadow-lg shadow-purple-500/5 backdrop-blur-md group"
                                        title="Open DNA REFERENCE GRAPH EVOLUTION"
                                    >
                                        <GitCompare className="w-5 h-5" />
                                    </motion.button>
                                )}

                                <iframe
                                    id="dna-visualizer"
                                    src="/visualizations/ki-network.html?minimal=true"
                                    className="w-full h-full border-none opacity-90 transition-opacity duration-1000"
                                    title="KI Network 3D Visualization"
                                    onLoad={(e) => {
                                        (e.currentTarget as HTMLIFrameElement).style.opacity = '1';
                                        // Update view mode if it was changed before load
                                        const iframe = e.currentTarget as HTMLIFrameElement;
                                        iframe?.contentWindow?.postMessage({ type: 'SET_VIEW', view: currentView }, '*');
                                    }}
                                />

                                {/* Floating Stats */}
                                <div className="absolute bottom-6 right-6 flex items-center gap-4">
                                    <div className="px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/5 text-[10px] font-mono text-purple-400/60 uppercase tracking-widest">
                                        Nodes: <span className="text-white">{graphStats.nodes}</span> {' // '} Links: <span className="text-white">{graphStats.links}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

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

            </div >


            {/* Final Footer Label */}
            < div className="mt-40 mb-20 text-center" >
                <p className="text-white/20 font-mono text-sm tracking-[0.5em] uppercase">Persistent Agent Module // Antigravity</p>
            </div >
        </main >
    )
}

function EmptyBatchFlyout({ batch, onClose }: { batch: TimelineBatch, onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute top-0 left-[320px] h-full w-[360px] z-40 bg-slate-900/80 backdrop-blur-3xl border-r border-white/10 flex flex-col shadow-[20px_0_50px_-20px_rgba(0,0,0,0.5)]"
        >
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-transparent flex items-center justify-between">
                <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest">{batch.items.length} ARCHIVED COMMITS</h4>
                    <p className="text-[10px] text-purple-400/60 font-mono mt-1 uppercase">Batch {batch.id}</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70 transition-all"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto premium-scrollbar p-6 space-y-6">
                {batch.items.map((commit: KiDiff) => (
                    <div key={commit.timestamp} className="relative pl-6 border-l border-purple-500/20 py-1">
                        <div className="absolute top-2.5 -left-[4.5px] w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                        <span className="block text-[9px] text-purple-400 font-mono tracking-tighter opacity-50 mb-1">{commit.timestamp}</span>
                        <p className="text-sm text-white/80 leading-relaxed font-light italic">
                            {commit.label}
                        </p>
                    </div>
                ))}
            </div>

            <div className="p-6 border-t border-white/5 bg-black/20">
                <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] leading-relaxed">
                    These commits contain no structural shifts in the KI Network but maintain the evolutionary history.
                </p>
            </div>
        </motion.div>
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
