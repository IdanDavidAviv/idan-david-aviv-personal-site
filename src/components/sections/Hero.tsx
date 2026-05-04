import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
      className="relative flex flex-col items-center justify-center min-h-0 md:min-h-[90vh] pt-28 md:pt-20 pb-0 md:pb-8 px-4 bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 w-full max-w-6xl overflow-hidden rounded-[3.5rem] p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent"
      >
        {/* Core Glow behind card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-idan-david-aviv-blue/20 blur-[120px] rounded-full pointer-events-none z-0" />

        <div className="relative w-full h-full bg-[#050510]/60 backdrop-blur-[60px] rounded-[3.4rem] py-8 md:py-20 px-4 md:px-16 flex flex-col items-center justify-center border border-white/5 space-y-6 md:space-y-12 z-10 transition-colors duration-1000">
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
              {"Idan David-Aviv".split(' ').map((word, i) => (
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
              AI Architect · Neuro-Inspired Engineer · Mentor
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="max-w-3xl mx-auto space-y-8 md:space-y-16 text-center"
          >
            <div className="text-lg md:text-xl text-white/70 font-light leading-relaxed tracking-tight space-y-1 md:space-y-2 max-w-sm md:max-w-none mx-auto text-balance">
              {[
                "Architecting AI for Human Centered Interactions",
                "Building sovereign and autonomous AI systems",
                "Designing tools that support flow and self-expression"
              ].map((part, i) => (
                <span key={i} className="block">
                  {part}
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

      {/* Engagement CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 z-30 relative"
      >
        <Link
          to="/#contact"
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-idan-david-aviv-cyan/10 to-idan-david-aviv-blue/10 border border-idan-david-aviv-blue/30 hover:bg-white/5 hover:border-idan-david-aviv-blue/50 text-white font-medium tracking-wide flex items-center justify-center gap-3 transition-all duration-500 group backdrop-blur-md shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]"
        >
          Start a Conversation
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </Link>

        <span className="text-white/30 text-xs font-light tracking-widest uppercase block my-2 sm:my-0">Looking for a standard CV?</span>

        <a
          href="https://www.linkedin.com/in/idandavidaviv/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#0A66C2]/50 text-white/80 text-sm font-medium flex items-center justify-center gap-3 transition-all group backdrop-blur-md shadow-[0_0_15px_-3px_rgba(10,102,194,0.05)] hover:shadow-[0_0_20px_-3px_rgba(10,102,194,0.2)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-[#0A66C2]">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          LinkedIn
        </a>
      </motion.div>
    </Section>
  )
}
