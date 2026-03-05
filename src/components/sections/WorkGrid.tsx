import { motion } from 'framer-motion'
import { contentData } from '@/data/content'
import Section from '@/components/ui/Section'
import GlassCard from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

/**
 * WorkGrid Section - Displays ranked experience and projects.
 * Powered by high-integrity Zod-validated data.
 */
const getCardColor = (index: number) => {
  const colors = [
    'idan-david-aviv-blue',
    'idan-david-aviv-gold',
    'idan-david-aviv-cyan',
    'idan-david-aviv-purple',
    'idan-david-aviv-grey',
    'idan-david-aviv-red'
  ];
  return colors[index % colors.length];
};

export default function WorkGrid() {
  const rankedWork = contentData.ranked || []

  return (
    <Section id="work" className="space-y-12">
      <h2 className="text-3xl font-bold text-gradient inline-block">Experience & Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rankedWork.map((item, index) => {
          const cardColor = getCardColor(index);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className={cn(
                "h-full group transition-all duration-500",
                "hover:-translate-y-1",
                `hover:border-${cardColor}/30 hover:shadow-[0_8px_30px_rgba(var(--${cardColor}),0.15),0_0_15px_rgba(var(--${cardColor}),0.4)]`
              )}>
                <div className="flex justify-between items-start mb-4">
                  <span className={cn(
                    "text-xs font-mono uppercase tracking-widest px-2 py-1 rounded-md border",
                    `text-${cardColor} bg-${cardColor}/10 border-${cardColor}/20`
                  )}>
                    {item.year}
                  </span>
                  <div className="relative flex items-center justify-center">
                    <div className={cn(
                      "absolute w-3 h-3 rounded-full opacity-40 animate-pulse-slow",
                      `bg-${cardColor}`
                    )} />
                    <div className={cn(
                      "relative w-1.5 h-1.5 rounded-full z-10",
                      `bg-${cardColor} shadow-[0_0_10px_rgba(var(--${cardColor}),0.8)]`
                    )} />
                  </div>
                </div>
                <h3 className={cn(
                  "text-xl font-bold mb-3 transition-colors text-base-content",
                  `group-hover:text-${cardColor}`
                )}>
                  {item.section}
                </h3>
                <p className="text-muted-content text-sm leading-relaxed">
                  {item.text}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  )
}
