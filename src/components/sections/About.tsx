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
          <p>Hi, I&apos;m Idan. I&apos;m driven by a genuine curiosity about the fundamental nature of things - whether that&apos;s a complex AI architecture, the neuroscience of the human brain, the human experience, or just any interesting conversation. I love learning and sharing my knowledge and experiences.</p>
          <p>I have a deep love for complexity, and an even bigger love for untangling it. Whether I&apos;m working on a system architecture or helping someone navigate challenges, I love finding the elegant solution to every situation.</p>
          <p className="text-base text-white/60 italic">
            I really believe in meeting people exactly where they are. If something you see here sparks a thought, or if you just want to chat about a weird idea, I&apos;d love to connect. I make an effort to ensure every interaction is a good one, so please don&apos;t hesitate to reach out.
          </p>
        </GlassCard>
      </motion.div>
    </Section>
  )
}
