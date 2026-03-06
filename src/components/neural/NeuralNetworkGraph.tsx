import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Network, DataSet } from 'vis-network/standalone';
import { GitCommit, X } from 'lucide-react';
import { getGraphData, getHistoryState, getTimelineBatches, HistoryState, KiDiff, TimelineBatch, KiNode } from '../../visualizations/dna-history-engine';
import { createGraph3D, handle3DNodeClick, updateSpritePositions } from '../../visualizations/ki-network-3d';
import { createGraph2D, update2DGraph } from '../../visualizations/ki-network-2d';
import * as THREE from 'three';
import historyData from '../../visualizations/dna-history-backfill-v26_s1.json';

interface NeuralNetworkGraphProps {
  activeEpochTimestamp: string | null;
  currentView: '3d' | '2d';
  onTimelineData?: (timeline: TimelineBatch[], currentEpoch: string) => void;
  onStatsUpdate?: (stats: { nodes: number; links: number }) => void;
  isFullscreen?: boolean;
}

export const NeuralNetworkGraph: React.FC<NeuralNetworkGraphProps> = ({
  activeEpochTimestamp,
  currentView,
  onTimelineData,
  onStatsUpdate,
  isFullscreen
}) => {
  const container3DRef = useRef<HTMLDivElement>(null);
  const container2DRef = useRef<HTMLDivElement>(null);
  
  const graph3DRef = useRef<any>(null);
  const nodeSpritesRef = useRef<WeakMap<object, { sprite: THREE.Object3D, size: number }>>(new WeakMap());
  const network2DRef = useRef<Network | null>(null);
  const visNodesRef = useRef<DataSet<KiNode, 'id'> | null>(null);
  const visEdgesRef = useRef<DataSet<any, 'id'> | null>(null);

  const onTimelineDataRef = useRef(onTimelineData);
  const onStatsUpdateRef = useRef(onStatsUpdate);
  const lastStatsRef = useRef({ nodes: 0, links: 0 });

  useEffect(() => { onTimelineDataRef.current = onTimelineData; }, [onTimelineData]);
  useEffect(() => { onStatsUpdateRef.current = onStatsUpdate; }, [onStatsUpdate]);
  
  const [isLegendExpanded, setIsLegendExpanded] = useState(false);
  const epochs = useMemo(() => (historyData as { epochs: KiDiff[] }).epochs, []);

  const refreshGraphs = React.useCallback((state: HistoryState) => {
    const { nodes, links } = state;
    if (graph3DRef.current) graph3DRef.current.graphData({ nodes, links });
    if (visNodesRef.current && visEdgesRef.current) {
      update2DGraph(visNodesRef.current, visEdgesRef.current, nodes, links);
    }
    if (onStatsUpdateRef.current) {
      if (lastStatsRef.current.nodes !== nodes.length || lastStatsRef.current.links !== links.length) {
        lastStatsRef.current = { nodes: nodes.length, links: links.length };
        onStatsUpdateRef.current({ nodes: nodes.length, links: links.length });
      }
    }
  }, []);

  const isDataLoadedRef = useRef(false);

  // 3D Engine Initialization
  useEffect(() => {
    if (!container3DRef.current || graph3DRef.current) return;
    
    try {
      const { graph: g3, nodeSprites } = createGraph3D(container3DRef.current);
      graph3DRef.current = g3;
      nodeSpritesRef.current = nodeSprites;
      g3.onNodeClick((node: object) => handle3DNodeClick(node, g3));
      
      const { clientWidth: w, clientHeight: h } = container3DRef.current;
      g3.width(w).height(h);

      (window as any).__DNA_FORCE_REFRESH = () => {
        if (graph3DRef.current) {
          graph3DRef.current.width(container3DRef.current?.clientWidth || 800);
          graph3DRef.current.height(container3DRef.current?.clientHeight || 600);
          graph3DRef.current.zoomToFit(1000, 100);
        }
      };
    } catch (err) {
      console.error('[DNA-Native] ❌ 3D Init Error:', err);
    }
  }, [container3DRef]);

  // 2D Engine Initialization
  useEffect(() => {
    if (!container2DRef.current || network2DRef.current) return;
    try {
      const { network, visNodes, visEdges } = createGraph2D(container2DRef.current, [], []);
      network2DRef.current = network;
      visNodesRef.current = visNodes;
      visEdgesRef.current = visEdges;
    } catch (err2d) {
      console.error('[DNA-Native] ❌ Failed to initialize 2D engine:', err2d);
    }
  }, [container2DRef]);

  // Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      if (graph3DRef.current && nodeSpritesRef.current) {
        updateSpritePositions(graph3DRef.current, nodeSpritesRef.current);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Resize Handling
  useEffect(() => {
    const handleResize = () => {
      if (graph3DRef.current && container3DRef.current) {
        graph3DRef.current.width(container3DRef.current.clientWidth);
        graph3DRef.current.height(container3DRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    const ro = new ResizeObserver(handleResize);
    if (container3DRef.current) ro.observe(container3DRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      ro.disconnect();
    };
  }, [isFullscreen, currentView]);

  // Data Loading
  useEffect(() => {
    if (isDataLoadedRef.current) return;
    const loadInitial = async () => {
      try {
        const initialData = await getGraphData(historyData);
        refreshGraphs(initialData);
        isDataLoadedRef.current = true;
        if (onTimelineDataRef.current && epochs.length > 0) {
          onTimelineDataRef.current(getTimelineBatches(epochs), epochs[epochs.length - 1].timestamp);
        }
        setTimeout(() => {
          if (graph3DRef.current) graph3DRef.current.zoomToFit(800, 100);
        }, 800);
      } catch (err) {
        console.error('[DNA-Native] ❌ loadInitial Error:', err);
      }
    };
    loadInitial();
  }, [epochs, refreshGraphs]);

  useEffect(() => {
    if (!activeEpochTimestamp) return;
    refreshGraphs(getHistoryState(epochs, activeEpochTimestamp));
  }, [activeEpochTimestamp, epochs, refreshGraphs]);

  return (
    <div className="relative flex-1 w-full h-full overflow-hidden bg-[#050510]">
      {/* 3D Graph Layer */}
      <div 
        ref={container3DRef} 
        className={`absolute inset-0 transition-opacity duration-1000 ${currentView === '3d' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
      />

      {/* 2D Graph Layer */}
      <div 
        ref={container2DRef}
        className={`absolute inset-0 bg-[#050510] transition-opacity duration-500 ${currentView === '2d' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
      />

      {/* Legend UI */}
      <div 
        className={`absolute top-5 right-5 z-[200] bg-[#050510]/85 backdrop-blur-xl border border-idan-david-aviv-gold/20 rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden ${
          isLegendExpanded ? 'w-[240px] max-h-[600px] p-5' : 'w-11 h-11 p-0'
        }`}
      >
        {!isLegendExpanded ? (
          <button 
            onClick={() => setIsLegendExpanded(true)}
            className="w-full h-full flex items-center justify-center text-idan-david-aviv-gold hover:bg-idan-david-aviv-gold/10 transition-colors"
            title="Show Legend"
          >
            <GitCommit className="w-5 h-5" />
          </button>
        ) : (
          <div className="relative flex flex-col gap-5">
            <button 
              onClick={() => setIsLegendExpanded(false)}
              className="absolute -top-1 -right-1 p-1 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="space-y-6">
              <section>
                <h4 className="text-[10px] font-bold text-idan-david-aviv-gold uppercase tracking-[0.2em] border-b border-idan-david-aviv-gold/10 pb-2 mb-3">Nodes</h4>
                <div className="space-y-2">
                  <LegendItem color="#00008b" label="Genesis (Root)" />
                  <LegendItem color="#fbbf24" label="Core KIs (Group 1)" />
                  <LegendItem color="#22d3ee" label="Other KIs (Group 2)" />
                  <LegendItem color="#a855f7" label="SRL / External" />
                  <LegendItem color="#ef4444" label="Broken Ref (404)" />
                  <LegendItem color="#94a3b8" label="Meta/Secondary (Group 0)" />
                </div>
              </section>

              <section>
                <h4 className="text-[10px] font-bold text-idan-david-aviv-gold uppercase tracking-[0.2em] border-b border-idan-david-aviv-gold/10 pb-2 mb-3">Link Color</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[10px] text-white/60 font-medium">
                    <span className="w-5 h-[3px] rounded-full bg-[#00008b]" /> 
                    <span>Genesis source</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/60 font-medium">
                    <span className="w-5 h-[3px] rounded-full bg-[#fbbf24]" /> 
                    <span>Core KI target</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/60 font-medium">
                    <span className="w-5 h-[3px] rounded-full bg-[#22d3ee]" /> 
                    <span>Other KI target</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/60 font-medium">
                    <span className="w-5 h-[3px] rounded-full bg-[#a855f7]" /> 
                    <span>SRL External Codebase</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/60 font-medium">
                    <span className="w-5 h-[3px] rounded-full bg-[#ef4444]" /> 
                    <span>Audit Error (Ref. Failure)</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/60 font-medium">
                    <span className="w-5 h-[3px] rounded-full bg-[#94a3b8]" /> 
                    <span>Fallback / Meta (Group 0)</span>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-[10px] font-bold text-idan-david-aviv-gold uppercase tracking-[0.2em] border-b border-idan-david-aviv-gold/10 pb-2 mb-3">Reference Type</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[10px] text-white/60 font-medium">
                    <span className="w-5 h-1 rounded-full bg-white/80" /> 
                    <span>Explicit file path</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/60 font-medium">
                    <span className="w-5 h-[2px] rounded-full bg-white/80" /> 
                    <span className="font-bold">Bold mention</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/60 font-medium">
                    <span className="w-5 h-[1px] rounded-full bg-white/80" /> 
                    <span>Simple mention</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-3 group transition-all">
    <span 
      className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" 
      style={{ backgroundColor: color, color: color }}
    />
    <span className="text-[10px] text-white/60 font-medium group-hover:text-white/90 transition-colors">{label}</span>
  </div>
);