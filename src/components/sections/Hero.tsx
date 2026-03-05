import { motion } from 'framer-motion'
import { personalInfo } from '@/data/content'
import Section from '@/components/ui/Section'

/**
 * Hero Section - The entry point of the personal site.
 * Using Premium visual tokens and high-integrity data.
 */
export default function Hero() {

  return (
    <Section id="hero" fullWidth className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden py-0 px-0">
      {/* Neural Pulse - Environmental Depth Integration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-idan-david-aviv-blue/20 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-idan-david-aviv-gold/10 blur-[150px] rounded-full animate-pulse-slower" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-idan-david-aviv-cyan/15 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-idan-david-aviv-purple/15 blur-[130px] rounded-full animate-pulse-slower" style={{ animationDelay: '1s' }} />
      </div>

      {/* Original Asset Restoration: Hero Background */}
      <img
        src="/assets/know_who.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-10 opacity-40 mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-black/80 z-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-30 space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white animate-glow-pulse">
          {personalInfo.name}
        </h1>
        <p className="text-xl md:text-2xl text-base-content max-w-2xl mx-auto font-light">
          {personalInfo.title}
        </p>
        <div className="pt-4">
          <p className="text-lg text-idan-david-aviv-gold font-medium tracking-wide uppercase">
            {personalInfo.summary}
          </p>
        </div>
      </motion.div>

      {/* Spirit Research Lab visual accent - Neural Path */}
      <div className="absolute bottom-12 w-full flex justify-center z-30">
        <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-idan-david-aviv-blue via-idan-david-aviv-gold via-idan-david-aviv-cyan to-transparent opacity-80 shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
      </div>
    </Section>
  )
}
