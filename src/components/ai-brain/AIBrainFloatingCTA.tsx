import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MessageCircle, ArrowLeft } from 'lucide-react'

export default function AIBrainFloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-5 inset-x-4 max-w-sm mx-auto z-50 p-2 rounded-full bg-[#050510]/95 border border-white/20 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(44,179,241,0.25)] flex items-center justify-between gap-2 md:hidden"
        >
          {/* WhatsApp Direct Icon Button */}
          <a
            href="https://wa.me/972542475705"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="פנייה בוואטסאפ"
            className="w-11 h-11 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 active:scale-90 transition-transform shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Primary Calendly Pill Button */}
          <a
            href="https://calendly.com/idandavidaviv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2.5 rounded-full bg-gradient-to-r from-idan-david-aviv-cyan to-idan-david-aviv-blue text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all text-center"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="truncate">מיפוי מוח AI (30 דקות)</span>
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
