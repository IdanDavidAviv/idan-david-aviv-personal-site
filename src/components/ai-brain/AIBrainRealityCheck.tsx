import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'

export default function AIBrainRealityCheck() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const points = [
    {
      title: 'עובדים עם המידע והמערכות הקיימים',
      description: 'אין צורך להכין קבצים מיוחדים מראש. נשענים ישירות על הדרייב, ה-CRM והמסמכים שכבר עובדים איתם היום.'
    },
    {
      title: 'מדברים בגובה העיניים על העסק',
      description: 'לא צריך להבין ב-AI או טכנולוגיה, מספיק שאתם מכירים את העסק שלכם. אתם תגידו מה אתם צריכים, או מה מפריע לכם, ואנחנו נציע פתרונות אפשריים.'
    },
    {
      title: 'עם ליווי הנדסי שוטף לאורך כל הדרך',
      description: 'כתובת מקצועית קבועה שמחזיקה את המערכת, קולטת נהלים חדשים ומתפתחת יחד עם צמיחת העסק.'
    }
  ]

  // Dismiss on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveId(null)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null)
    }

    document.addEventListener('pointerdown', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <section className="pt-2 sm:pt-4 pb-6 sm:pb-8 px-4 sm:px-6 max-w-4xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-10 relative shadow-2xl"
      >
        {/* Glow - isolated in overflow-hidden inner layer so popovers never get clipped */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 blur-3xl rounded-full" />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
            אתם מביאים את הניסיון שלכם <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              ואנחנו דואגים לכל השאר
            </span>
          </h2>
        </div>

        {/* 3 Friction-Free Points Grid with Progressive Disclosure */}
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {points.map((pt, idx) => {
            const isActive = activeId === idx

            return (
              <div
                key={idx}
                className={`relative flex items-center gap-3 p-3.5 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer select-none group min-h-[72px] sm:min-h-[82px] ${
                  isActive
                    ? 'bg-emerald-500/[0.08] border-emerald-500/50 shadow-lg shadow-emerald-950/30 z-30'
                    : 'bg-white/[0.02] border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/[0.03]'
                }`}
                onClick={() => setActiveId(isActive ? null : idx)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveId(isActive ? null : idx)
                  }
                }}
              >
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                  {pt.title}
                </h3>

                {/* Contextual Floating Bubble (Popover / HoverCard) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: '-50%', y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, x: '-50%', y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: '-50%', y: 4, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      style={{ left: '50%' }}
                      className="absolute z-30 w-[95%] sm:w-full min-w-[210px] max-w-xs top-full mt-3 p-3.5 sm:p-4 rounded-2xl bg-[#041d14]/95 backdrop-blur-2xl border border-emerald-500/40 shadow-[0_12px_36px_rgba(0,0,0,0.85)] shadow-emerald-950/60 text-center pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Directional Arrow Pointer - Centered */}
                      <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-3 h-3 bg-[#041d14] border-t border-l border-emerald-500/40 rotate-45" />

                      <div className="relative">
                        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light text-center px-3 sm:px-4">
                          {pt.description}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveId(null)
                          }}
                          className="absolute -top-1 end-0 text-emerald-400/60 hover:text-emerald-300 p-1 rounded-lg hover:bg-emerald-500/10 transition-colors"
                          aria-label="סגירה"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
