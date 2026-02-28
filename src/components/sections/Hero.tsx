import { motion } from 'framer-motion'
import useCVData from '@/hooks/useCVData'
import Section from '@/components/ui/Section'

/**
 * Hero Section - The entry point of the personal site.
 * Using Premium visual tokens and high-integrity data.
 */
export default function Hero() {
  const { personalInfo } = useCVData()

  return (
    <Section id="hero" className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gradient">
          {personalInfo.name}
        </h1>
        <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-light">
          {personalInfo.title}
        </p>
        <div className="pt-4">
          <p className="text-lg text-accent font-medium tracking-wide uppercase text-sm">
            {personalInfo.summary}
          </p>
        </div>
      </motion.div>
    </Section>
  )
}
