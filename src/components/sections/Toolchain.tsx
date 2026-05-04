import { motion } from 'framer-motion'
import { Database, Network, Terminal } from 'lucide-react'
import Section from '@/components/ui/Section'
import { cn } from '@/lib/utils'

export default function Toolchain() {
  const pillars = [
    {
      title: "Governance (Skills & KIs)",
      icon: <Database className="w-6 h-6 text-idan-david-aviv-gold/60" />,
      description: "Coupling instructions and information across structural levels to form an intricate network of context. This provides the agent with deep context availability and long-term memory while maintaining strict specificity (minimum noise) - allowing it to solve complex problems over long durations without hallucinating.",
      glowGradient: "from-idan-david-aviv-gold/10 to-idan-david-aviv-gold/20",
      borderGradient: "bg-gradient-to-br from-idan-david-aviv-gold/30 to-idan-david-aviv-gold/40"
    },
    {
      title: "Connectivity (MCP)",
      icon: <Network className="w-6 h-6 text-idan-david-aviv-gold/80" />,
      description: "The AI hallucination problem is worse when it's asked to perform exact calculations. The Model Context Protocol (MCP) bridges the gap between the AI agent and the real world - by letting it run scripts. This means it can choose to do anything a computer can do. Exact calculations are exactly what code is for, but this protocol opens a much bigger door.",
      glowGradient: "from-idan-david-aviv-gold/20 to-idan-david-aviv-gold/30",
      borderGradient: "bg-gradient-to-br from-idan-david-aviv-gold/50 to-idan-david-aviv-gold/60"
    },
    {
      title: "Execution (CDP)",
      icon: <Terminal className="w-6 h-6 text-idan-david-aviv-gold" />,
      description: "Wrapping local tools with scripts via the Chrome DevTools Protocol to enable AI-driven live testing. The agent runs the debug host environment and interacts with the UI exactly as I would, fully automating this part of the workflow as well. letting me stay in the supervisor-architect position and let the AI do the detailed work correctly.",
      glowGradient: "from-idan-david-aviv-gold/30 to-idan-david-aviv-gold/40",
      borderGradient: "bg-gradient-to-br from-idan-david-aviv-gold/60 to-idan-david-aviv-gold/80"
    }
  ]

  return (
    <Section id="toolchain" className="py-6 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-idan-david-aviv-gold to-idan-david-aviv-gold/60">
            The Workbench
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Attaching AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-gold to-idan-david-aviv-gold/60">to Reality</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            An autonomous agent is only as powerful as the tools it wields. This is the 3-pillar architecture that bridges the gap between abstract reasoning and real-world execution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="group relative"
            >
              {/* Outer ambient glow */}
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-xl -z-10", pillar.glowGradient)} />

              {/* 1px Border Wrapper */}
              <div className="h-full p-[1px] rounded-3xl bg-white/10 relative overflow-hidden">
                {/* Smooth fading continuous border gradient */}
                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500", pillar.borderGradient)} />

                {/* Inner Card Content */}
                <div className="h-full w-full p-8 rounded-[23px] bg-[#050510]/95 backdrop-blur-md relative z-10">
                  <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/5 inline-block relative z-20">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-medium text-white/90 tracking-wide mb-4 relative z-20">
                    {pillar.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed relative z-20">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
