import Section from '@/components/ui/Section'
import GlassCard from '@/components/ui/GlassCard'
import { motion } from 'framer-motion'

/**
 * About Section - Narrative and summary.
 */
export default function About() {
  return (
    <Section id="about">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-12 text-gradient inline-block">About</h2>
        <GlassCard className="max-w-3xl leading-relaxed text-lg text-white/80 space-y-4">
          <p>Building AI systems that feel alive. Operating on a tri-part engine of Neuroscience, Systems Architecture, and Visionary Human-AI Symbiosis.</p>
          <p className="text-base text-white/60 italic">
            Continuously exploring the boundaries of AI, system design, and human-computer synergy.
          </p>
        </GlassCard>
      </motion.div>
    </Section>
  )
}
