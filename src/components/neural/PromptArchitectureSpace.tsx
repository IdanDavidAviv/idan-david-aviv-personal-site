import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Network, RotateCcw, Maximize, Minimize, X, GitCompare, GitGraph,
    ChevronRight, ExternalLink, Boxes, Layers
} from 'lucide-react'
import Section from '@/components/ui/Section'
import { NeuralNetworkGraph } from '@/components/neural/NeuralNetworkGraph'
import { TimelineBatch, KiDiff } from '@/visualizations/ki-network-types'
import { clearCache } from '@/visualizations/dna-history-engine'

/**
 * PromptArchitectureSpace Component
 * Encapsulates the Neural Traceability Graph and Cognitive Mechanics documentation.
 */
export function PromptArchitectureSpace() {
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
        setActiveEpochTimestamp(currentEpoch);
        setOpenFlyoutBatchId(null);
        setRefreshKey(prev => prev + 1);

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
        <Section id="neural-explorer">
            <motion.div
                layout
                initial={false}
                animate={{
                    height: isGraphFullscreen ? '100vh' : (window.innerWidth < 768 ? 500 : 700),
                    width: '100%',
                    borderRadius: isGraphFullscreen ? 0 : (window.innerWidth < 768 ? '1.5rem' : '3rem'),
                }}
                transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 120,
                }}
                className={isGraphFullscreen
                    ? "fixed inset-0 z-[150] bg-[#050510] flex flex-col"
                    : "relative group overflow-hidden border border-idan-david-aviv-gold/20 bg-[#050510] shadow-[0_0_80px_-20px_rgba(34,211,238,0.4)] flex flex-col"
                }
            >
                {/* Integrated Top Head */}
                <div className="px-4 md:px-8 py-4 md:py-5 border-b border-white/5 bg-gradient-to-r from-idan-david-aviv-gold/5 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-idan-david-aviv-gold/20 blur-xl rounded-full" />
                            <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-idan-david-aviv-gold/20 to-idan-david-aviv-gold/40 flex items-center justify-center border border-idan-david-aviv-gold/30">
                                <Network className="w-5 h-5 md:w-7 md:h-7 text-idan-david-aviv-gold" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                                Prompt Architecture Space
                            </h2>
                            <p className="text-idan-david-aviv-gold/40 text-[9px] md:text-xs uppercase tracking-[0.2em] font-mono mt-0.5 md:mt-1">Interactive Neural Traceability Network</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto justify-end">
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
                            <button
                                onClick={() => handleRefresh(activeEpochTimestamp || '')}
                                className="p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all group"
                                title="Refresh Graph"
                            >
                                <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4 group-active:rotate-180 transition-transform duration-500" />
                            </button>
                            <div className="w-[1px] h-4 bg-white/10 mx-1" />
                            <button
                                onClick={() => switchView('3d')}
                                className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${currentView === '3d'
                                    ? 'bg-idan-david-aviv-gold/20 text-idan-david-aviv-gold shadow-[0_0_15px_rgba(34,211,238,0.2)] border border-idan-david-aviv-gold/30'
                                    : 'text-white/40 hover:text-white/60'
                                    }`}
                            >
                                3D
                            </button>
                            <button
                                onClick={() => switchView('2d')}
                                className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${currentView === '2d'
                                    ? 'bg-idan-david-aviv-gold/20 text-idan-david-aviv-gold shadow-[0_0_15px_rgba(34,211,238,0.3)] border border-idan-david-aviv-gold/30'
                                    : 'text-white/40 hover:text-white/60'
                                    }`}
                            >
                                2D
                            </button>
                        </div>

                        <button
                            onClick={() => setIsGraphFullscreen(!isGraphFullscreen)}
                            className="p-2 md:p-3 rounded-xl bg-idan-david-aviv-gold/10 border border-idan-david-aviv-gold/20 text-idan-david-aviv-gold hover:bg-idan-david-aviv-gold/20 transition-all shadow-lg shadow-idan-david-aviv-gold/5 group"
                            title={isGraphFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                            aria-label={isGraphFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        >
                            {isGraphFullscreen ? (
                                <Minimize className="w-4 h-4 md:w-5 md:h-5" />
                            ) : (
                                <Maximize className="w-4 h-4 md:w-5 md:h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Sidebar Overlay + Graph Area */}
                <div className="flex-1 relative overflow-hidden flex">
                    <motion.div
                        initial={false}
                        animate={{
                            x: isSidebarCollapsed ? (window.innerWidth < 768 ? -window.innerWidth : -320) : 0,
                            opacity: isSidebarCollapsed ? 0 : 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 20,
                            mass: 1
                        }}
                        className="absolute top-0 left-0 h-full w-full md:w-[320px] z-[250] border-r border-white/5 bg-[#050510]/95 md:bg-slate-900/40 backdrop-blur-3xl flex flex-col overflow-hidden"
                    >
                        <div className="px-4 py-3 border-b border-white/5 bg-gradient-to-b from-idan-david-aviv-gold/5 to-transparent flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                                <GitGraph className="w-4 h-4 text-idan-david-aviv-gold flex-shrink-0" />
                                <div className="flex flex-col justify-center">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-wider leading-tight">DNA REFERENCE GRAPH EVOLUTION</span>
                                    <span className="hidden md:inline text-[8px] text-idan-david-aviv-gold/40 uppercase tracking-[0.1em] italic mt-0.5">choose commit to see state</span>
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

                        <div className="flex-1 overflow-y-auto premium-scrollbar p-3 md:p-4 space-y-2 md:space-y-3 md:min-w-[320px] w-full flex flex-col items-stretch">
                            {timeline.length > 0 ? (
                                [...timeline].reverse().map((batch, idx) => {
                                    const isActive = activeEpochTimestamp === batch.id;
                                    const isFlyoutOpen = openFlyoutBatchId === batch.id;

                                    return (
                                        <div key={batch.id} className="w-full space-y-1">
                                            {batch.type === 'SIGNIFICANT' ? (
                                                <motion.button
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        setActiveEpochTimestamp(batch.id);
                                                        setOpenFlyoutBatchId(null);
                                                    }}
                                                    className={`w-full flex items-center justify-between gap-3 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all border ${isActive
                                                        ? 'bg-idan-david-aviv-gold/10 border-idan-david-aviv-gold/50 shadow-[0_0_20px_-5px_rgba(251,191,36,0.2)]'
                                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className="flextext-left flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-[8px] text-idan-david-aviv-gold font-mono tracking-widest uppercase opacity-70">{batch.id}</span>
                                                        </div>
                                                        <div className="text-[10px] md:text-[11px] font-bold text-white leading-tight mb-2 truncate pr-2">
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
                                                    <ChevronRight className={`flex-shrink-0 w-3 h-3 md:w-3.5 md:h-3.5 transition-transform ${isActive ? 'text-idan-david-aviv-gold rotate-90' : 'text-white/20'}`} />
                                                </motion.button>
                                            ) : (
                                                <>
                                                    <motion.button
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                        whileHover={{ x: 5 }}
                                                        onClick={() => {
                                                            if (isFlyoutOpen) {
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
                                                        className={`w-full flex items-center justify-between gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-all border ${isFlyoutOpen
                                                            ? 'bg-idan-david-aviv-gold/5 border-idan-david-aviv-gold/30'
                                                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                                            <span className="text-[8px] text-idan-david-aviv-gold/50 font-mono tracking-widest uppercase">{batch.id}</span>
                                                            <span className="px-1.5 py-0.5 rounded bg-white/5 text-[7px] text-white/40 uppercase font-mono border border-white/5 overflow-hidden">
                                                                {batch.items.length} ARCHIVED
                                                            </span>
                                                        </div>
                                                        <ChevronRight className={`flex w-3 h-3 md:w-3.5 md:h-3.5 transition-transform ${isFlyoutOpen ? 'text-idan-david-aviv-gold rotate-90' : 'text-white/20'}`} />
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
                                                                                <div className="text-[10px] md:text-[11px] leading-tight italic font-light text-white/40 group-hover/item:text-white/80 flex items-center gap-1.5 min-w-0">
                                                                                    <span className="truncate">{commit.label}</span>
                                                                                    <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/item:opacity-100 transition-opacity text-idan-david-aviv-gold" />
                                                                                </div>
                                                                            </a>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            )}
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
                        <div className="absolute inset-0 z-20 pointer-events-none">
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

                        <div className="absolute bottom-6 right-6 flex items-center gap-4 z-20">
                            <div className="px-3 md:px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/5 text-[9px] md:text-[10px] font-mono text-idan-david-aviv-gold/60 uppercase tracking-widest flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-0">
                                <div>Nodes: <span className="text-white">{graphStats.nodes}</span></div>
                                <div className="hidden md:inline mx-2 opacity-30">{' // '}</div>
                                <div className="md:hidden w-full h-px bg-white/5 my-0.5" />
                                <div>Links: <span className="text-white">{graphStats.links}</span></div>
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
    )
}
