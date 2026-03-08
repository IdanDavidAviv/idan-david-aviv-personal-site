import { motion } from 'framer-motion'

/**
 * GlobalBackground - Pervasive atmospheric layer for the entire site.
 * Preserves the high-fidelity "Gold-on-Midnight" constellation.
 */
export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none select-none overflow-hidden bg-black">
      {/* Texture layer from App stays above this if needed, or we can add it here */}
      {/* Atmospheric Neural Pulses (Vibrancy Layer) */}
      <motion.div 
        animate={{ 
          x: [0, 100, -100, 0],
          y: [0, -50, 50, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] bg-idan-david-aviv-blue/20 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, -120, 120, 0],
          y: [0, 60, -60, 0],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 250, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vh] bg-idan-david-aviv-gold/10 blur-[150px] rounded-full pointer-events-none"
      />

      {/* Wide Neural Stream (Expanded Constellation) */}
      <motion.div 
        initial={{ opacity: 0.15, scaleX: 1.4, scaleY: 1.05 }}
        animate={{ 
          opacity: [0.2, 0.35, 0.2],
          scaleX: [1.5, 1.6, 1.5],
          scaleY: [1.1, 1.2, 1.1]
        }}
        transition={{ 
          duration: 150, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/assets/abstract/constellation.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to right, black 0%, transparent 40%, transparent 60%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 40%, transparent 60%, black 100%)',
        }}
      />

      {/* Subtle depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  )
}
