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
    <Section id="hero" fullWidth className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden py-0 px-0">
      {/* Original Asset Restoration: Hero Background */}
      <img
        src="/assets/know_who.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gradient">
          {personalInfo.name}
        </h1>
        <p className="text-xl md:text-2xl text-base-content max-w-2xl mx-auto font-light">
          {personalInfo.title}
        </p>
        <div className="pt-4">
          <p className="text-lg text-accent font-medium tracking-wide uppercase">
            {personalInfo.summary}
          </p>
        </div>
      </motion.div>

      {/* Spirit Lab visual accent */}
      <div className="absolute bottom-12 w-full flex justify-center z-20">
        <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full opacity-50"></div>
      </div>
    </Section>
  )
}
