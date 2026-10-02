import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Cpu, Rocket, X, ArrowLeft } from 'lucide-react'

export default function AIBrainStepper() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      number: '01',
      tag: 'שיחה ראשונית',
      title: 'מבינים מה העסק צריך',
      icon: <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-idan-david-aviv-cyan" />,
      description: 'בשיחה ממוקדת נבין יחד את תהליכי העבודה ומקורות המידע, ונבדוק האם ואיך נכון לבנות עבורכם מוח AI בעל אימפקט תפעולי ממשי.',
      accent: 'border-idan-david-aviv-cyan/30 bg-idan-david-aviv-cyan/5 text-idan-david-aviv-cyan',
      theme: {
        bg: 'bg-[#031d24]/95',
        border: 'border-idan-david-aviv-cyan/40',
        shadow: 'shadow-cyan-950/60',
        text: 'text-cyan-100/90',
        closeHover: 'text-cyan-400/60 hover:text-cyan-300 hover:bg-cyan-500/10',
        activeCard: 'border-idan-david-aviv-cyan/50 bg-cyan-500/[0.08] shadow-cyan-950/30',
        hoverCard: 'hover:border-idan-david-aviv-cyan/30 hover:bg-cyan-500/[0.03]',
        badge: 'text-idan-david-aviv-cyan bg-cyan-500/10 border-cyan-500/20'
      }
    },
    {
      number: '02',
      tag: 'ללא הפרעה',
      title: 'מחברים את המערכות',
      icon: <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-idan-david-aviv-blue" />,
      description: 'בזמן שהעסק פועל כרגיל אנחנו מקימים את מערכת המוח ומחברים אותה למערכות העסקיות שלכם.',
      accent: 'border-idan-david-aviv-blue/30 bg-idan-david-aviv-blue/5 text-idan-david-aviv-blue',
      theme: {
        bg: 'bg-[#05142b]/95',
        border: 'border-idan-david-aviv-blue/40',
        shadow: 'shadow-blue-950/60',
        text: 'text-blue-100/90',
        closeHover: 'text-blue-400/60 hover:text-blue-300 hover:bg-blue-500/10',
        activeCard: 'border-idan-david-aviv-blue/50 bg-blue-500/[0.08] shadow-blue-950/30',
        hoverCard: 'hover:border-idan-david-aviv-blue/30 hover:bg-blue-500/[0.03]',
        badge: 'text-idan-david-aviv-blue bg-blue-500/10 border-blue-500/20'
      }
    },
    {
      number: '03',
      tag: 'יוצאים לדרך',
      title: 'מפעילים ומרחיבים בהדרגה',
      icon: <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />,
      description: 'מתחילים מתהליך עסקי מוגדר אחד בעל אימפקט גבוה, מודדים את החיסכון בזמן ובעבודה הידנית, ומשם מרחיבים לתהליכים נוספים בקצב שלכם.',
      accent: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
      theme: {
        bg: 'bg-[#041d14]/95',
        border: 'border-emerald-500/40',
        shadow: 'shadow-emerald-950/60',
        text: 'text-emerald-100/90',
        closeHover: 'text-emerald-400/60 hover:text-emerald-300 hover:bg-emerald-500/10',
        activeCard: 'border-emerald-500/50 bg-emerald-500/[0.08] shadow-emerald-950/30',
        hoverCard: 'hover:border-emerald-500/30 hover:bg-emerald-500/[0.03]',
        badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      }
    }
  ]

  // Dismiss on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveStep(null)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveStep(null)
    }

    document.addEventListener('pointerdown', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <section className={`pt-6 sm:pt-8 pb-2 sm:pb-4 px-4 sm:px-6 max-w-5xl mx-auto relative ${activeStep !== null ? 'z-30' : 'z-10'}`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight"
        >
          אז מה עושים? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-cyan to-idan-david-aviv-blue">
            שלושה שלבים פשוטים
          </span>
        </motion.h2>
      </div>

      {/* 3 Stations Process Flow Container (Unboxed, Floating) */}
      <div ref={containerRef} className={`relative mb-6 sm:mb-8 ${activeStep !== null ? 'z-40' : 'z-10'}`}>
        {/* 3 Stations Side-by-Side in 1 Row (Mobile & Desktop) */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-6">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx

              return (
                <div key={step.number} className="relative flex flex-col items-center text-center">
                  {/* Step Card / Station Node */}
                  <div
                    className={`relative w-full rounded-2xl sm:rounded-3xl border p-2 sm:p-5 transition-all duration-200 cursor-pointer select-none flex flex-col items-center justify-between min-h-[125px] sm:min-h-[155px] ${
                      isActive
                        ? `${step.theme.activeCard} z-20`
                        : `bg-white/[0.02] border-white/10 ${step.theme.hoverCard}`
                    }`}
                    onClick={() => setActiveStep(isActive ? null : idx)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActiveStep(isActive ? null : idx)
                      }
                    }}
                  >
                    {/* Top: Header Row (Number + Tag) */}
                    <div className="w-full flex items-center justify-between mb-1.5">
                      <span className="text-xs sm:text-base font-bold font-mono text-white/40">
                        {step.number}
                      </span>
                      <span className={`text-[9px] sm:text-xs font-medium px-1.5 py-0.5 sm:px-2 rounded-md border ${step.theme.badge}`}>
                        {step.tag}
                      </span>
                    </div>

                    {/* Center: Icon */}
                    <div className={`p-1.5 sm:p-2 rounded-xl border my-auto ${step.accent}`}>
                      {step.icon}
                    </div>

                    {/* Bottom: Title */}
                    <h3 className="text-xs sm:text-base font-bold text-white mt-1.5 leading-snug tracking-tight">
                      {step.title}
                    </h3>

                    {/* Directional Arrow between steps (desktop only) */}
                    {idx < steps.length - 1 && (
                      <div className="hidden sm:block absolute -left-4 top-1/2 -translate-y-1/2 text-white/20 z-10 pointer-events-none">
                        <ArrowLeft className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dynamic Contextual Floating Popover - Absolute Overlay (Zero Layout Shift) */}
          <AnimatePresence>
            {activeStep !== null && (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className={`absolute top-full mt-3 inset-x-0 z-50 p-4 sm:p-5 rounded-2xl ${steps[activeStep].theme.bg} backdrop-blur-2xl border ${steps[activeStep].theme.border} shadow-[0_16px_40px_rgba(0,0,0,0.9)] ${steps[activeStep].theme.shadow} text-center pointer-events-auto`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Dynamic Arrow Pointer - Mathematically Aligned to Active Column Center */}
                <div
                  className={`absolute -top-1.5 w-3.5 h-3.5 ${steps[activeStep].theme.bg} border-t border-l ${steps[activeStep].theme.border} rotate-45 transition-all duration-300 ${
                    activeStep === 0
                      ? 'right-[calc(16.67%-7px)]'
                      : activeStep === 1
                      ? 'left-[calc(50%-7px)]'
                      : 'left-[calc(16.67%-7px)]'
                  }`}
                />

                <div className="relative max-w-2xl mx-auto">
                  <p className={`text-xs sm:text-base ${steps[activeStep].theme.text} leading-relaxed font-light text-center px-4 sm:px-8`}>
                    {steps[activeStep].description}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveStep(null)
                    }}
                    className={`absolute -top-1 end-0 p-1 rounded-lg transition-colors ${steps[activeStep].theme.closeHover}`}
                    aria-label="סגירה"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      {/* Bottom Closing Heading / Bridge to Reality Check */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mt-6 sm:mt-8 relative z-0"
      >
        <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
          ויש לכם מוח עסקי <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-idan-david-aviv-cyan">
            שעובד בשבילכם וצומח עם העסק
          </span>
        </h3>
      </motion.div>
    </section>
  )
}
