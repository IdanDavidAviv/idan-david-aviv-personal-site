import { motion } from 'framer-motion'
import useCVData from '@/hooks/useCVData'
import Section from '@/components/ui/Section'
import GlassCard from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

/**
 * WorkGrid Section - Displays ranked experience and projects.
 * Powered by high-integrity Zod-validated data.
 */
export default function WorkGrid() {
  const { rankedWork } = useCVData()

  return (
    <Section id="work" className="space-y-12">
      <h2 className="text-3xl font-bold text-gradient inline-block">Experience & Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rankedWork.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="h-full group hover:border-accent/40 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-accent/80 uppercase tracking-widest bg-accent/10 px-2 py-1 rounded">
                  {item.year}
                </span>
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full shadow-lg shadow-current",
                  item.rank === 'strong' ? "text-emerald-400" :
                    item.rank === 'medium' ? "text-amber-400" : "text-blue-400"
                )} />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors text-base-content">
                {item.section}
              </h3>
              <p className="text-muted-content text-sm leading-relaxed">
                {item.text}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
