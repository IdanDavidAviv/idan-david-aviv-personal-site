import { motion } from 'framer-motion'
import { personalInfo } from '@/data/content'
import Section from '@/components/ui/Section'

/**
 * Hero Section - The entry point of the personal site.
 * Using Premium visual tokens and high-integrity data.
 */
export default function Hero() {

  return (
    <Section 
      id="hero" 
      fullWidth 
      className="relative flex flex-col items-center justify-center min-h-screen py-20 px-4 bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 w-full max-w-6xl overflow-hidden rounded-[3.5rem] p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent"
      >
        {/* Core Glow behind card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-idan-david-aviv-blue/20 blur-[120px] rounded-full pointer-events-none z-0" />
        
        <div className="relative w-full h-full bg-[#050510]/60 backdrop-blur-[60px] rounded-[3.4rem] py-20 px-8 md:px-16 flex flex-col items-center justify-center border border-white/5 space-y-12 z-10 transition-colors duration-1000">
          {/* Pulsing Border Accent */}
          <motion.div 
            animate={{ opacity: [0.05, 0.2, 0.05] }}
            transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-[3.4rem] border border-idan-david-aviv-blue pointer-events-none"
          />

          <div className="space-y-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl md:text-[8rem] font-bold tracking-[-0.05em] leading-[0.85] text-white"
            >
               {personalInfo.name.split(' ').map((word, i) => (
                <span key={i} className={i === 0 ? "text-white" : "text-idan-david-aviv-blue/50 block md:inline"}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg md:text-2xl text-idan-david-aviv-blue font-light tracking-[0.4em] uppercase"
            >
              {personalInfo.title}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="max-w-3xl mx-auto space-y-16 text-center"
          >
            <div className="text-lg md:text-xl text-white/70 font-light leading-relaxed tracking-tight space-y-2">
              {personalInfo.summary.split(',').map((part, i) => (
                <span key={i} className="block">
                  {part.trim()}
                </span>
              ))}
            </div>

            {/* Systems Blue Accent Line */}
            <div className="flex justify-center relative">
              <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-idan-david-aviv-blue/50 to-transparent relative z-10" />
              <div className="absolute top-0 h-[2px] w-96 bg-idan-david-aviv-blue/40 blur-xl rounded-full -translate-y-1/2" />
              <div className="absolute top-0 h-[1px] w-56 bg-idan-david-aviv-blue/60 shadow-[0_0_30px_5px_rgba(59,130,246,0.6)]" />
              
              {/* Minimal Gold Spark (The "Spirit" hint) */}
              <div className="absolute top-0 h-[4px] w-1 bg-idan-david-aviv-gold blur-[1px] rounded-full left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}
