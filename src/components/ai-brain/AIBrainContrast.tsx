import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function AIBrainContrast() {
  const [activePopoverId, setActivePopoverId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const contrastPairs = [
    {
      id: 'accuracy',
      category: 'אמינות המידע',
      before: {
        id: 'accuracy-before',
        title: 'ה-AI הכללי ממציא נתונים',
        subtitle: 'ככל שמתארכת השיחה',
        description: 'מודלים ציבוריים עונים תשובות כלליות ולעיתים מנחשים עובדות כי הם לא מחוברים למציאות של העסק שלכם. קשה להסתמך עליהם בתהליכי עבודה בלי לבדוק כל פרט בעצמכם.'
      },
      after: {
        id: 'accuracy-after',
        title: 'מסתמך על זיכרון ונתוני האמת',
        subtitle: 'ומציע ניתוח של התוצאות שנשלפו',
        description: 'אפיון מעמיק של ה-DNA העסקי ועיגון ישיר במערכות ובנהלי העבודה המאושרים שלכם. הסוכן פועל אך ורק מתוך מקורות המידע שהוגדרו, ומציג שקיפות מלאה לכל נתון.'
      }
    },
    {
      id: 'operations',
      category: 'התפעול השוטף',
      before: {
        id: 'operations-before',
        title: 'חיפוש קבצים וניווט בין מערכות',
        subtitle: 'יכול לשרוף שעות של עבודה',
        description: 'שעות יקרות שנשרפות בכל שבוע על חיפוש מסמכים בדרייב, מעבר בין קובצי אקסל שונים, העתקה ידנית של מידע והסברים שחוזרים על עצמם שוב ושוב.'
      },
      after: {
        id: 'operations-after',
        title: 'הסוכן יודע מה נמצא איפה',
        subtitle: 'ובמקום לחפש עיוור הוא מוצא מהר',
        description: 'שואלים את מוח העסק בשפה חופשית ומקבלים מיד את המידע המדויק — יחד עם הצעות מעשיות להמשך פעולה שהסוכן מכין עבורכם (ניסוח טיוטות, עדכון שדות והכנת משימות).'
      }
    },
    {
      id: 'control',
      category: 'שליטה וניהול',
      before: {
        id: 'control-before',
        title: 'שמירה על שליטה בעסק',
        subtitle: 'גוזלת זמן, משאבים ותשומת לב',
        description: 'כדי להחזיק שליטה אמיתית במה שקורה בעסק נדרש מאמץ מתמשך: לפנות לעובדים שונים, לבדוק בכמה מערכות במקביל ולהשקיע זמן יקר בהצלבת נתונים רק כדי לדעת איפה דברים עומדים.'
      },
      after: {
        id: 'control-after',
        title: 'קבלת תמונה כללית בשניות',
        subtitle: 'בלי להמתין לאף אחד ושום דבר',
        description: 'יוצרים את החיבורים והנהלים פעם אחת, ומקבלים תמונת מצב מדויקת ומרוכזת ישירות מחלון הצ\'אט שלכם. השליטה בעסק הופכת לפעולה של 3 שניות שמשאירה את מלוא תשומת הלב לצמיחה.'
      }
    }
  ]

  // Dismiss on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActivePopoverId(null)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePopoverId(null)
    }

    document.addEventListener('pointerdown', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <section className="pt-6 sm:pt-8 pb-8 sm:pb-12 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4"
        >
          יש לנו כבר AI
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-cyan to-idan-david-aviv-blue mt-1 sm:mt-1.5">
            למה צריך להוסיף לו מוח?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm sm:text-base text-white/70 leading-relaxed font-light"
        >
          כי מודל שפה כללי עונה יפה, אבל בלי חיבור למערכות העסק שלכם <br />
          הוא מנחש תשובות שלא תואמות את המציאות.
          <span className="block mt-1.5 sm:mt-2 text-white/80 font-normal">
            הנה מה שמשתנה כשהסוכן מעוגן ישירות בנתוני האמת שלכם:
          </span>
        </motion.p>
      </div>

      {/* Shared Gradient Defs for Red-to-Blue Transformation Arrows */}
      <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <defs>
          {/* Desktop Gradient: Top Red (#ef4444) -> Bottom Cyan (#2cb3f1) with userSpaceOnUse */}
          <linearGradient id="contrastArrowGradDesktop" x1="0" y1="2" x2="0" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="45%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#2cb3f1" />
          </linearGradient>

          {/* Mobile Gradient: Right Red (#ef4444) -> Left Cyan (#2cb3f1) in RTL with userSpaceOnUse */}
          <linearGradient id="contrastArrowGradMobile" x1="42" y1="0" x2="2" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="45%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#2cb3f1" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3 Categories: 3 Columns on Desktop (Right, Center, Left) / 3 Stacked Rows on Mobile */}
      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6">
        {contrastPairs.map((pair, idx) => {
          const isBeforeActive = activePopoverId === pair.before.id
          const isAfterActive = activePopoverId === pair.after.id
          const isArrowActive = activePopoverId === `${pair.id}-arrow`
          const isAnyActive = isBeforeActive || isAfterActive

          return (
            <motion.div
              key={pair.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative flex flex-col justify-between"
            >
              {/* 
                THE DUAL ARCHITECTURE:
                - On Mobile (< lg): grid-cols-2 side-by-side (Before on right, After on left)
                - On Desktop (lg): lg:grid-cols-1 vertical stack of 2 cubes in this column
              */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3.5 items-stretch h-full relative">
                {/* 1. Before Cube (Negative) */}
                <div
                  className={`relative rounded-2xl p-3.5 sm:p-4 lg:p-5 transition-all duration-200 cursor-pointer select-none border min-h-[95px] sm:min-h-[110px] lg:min-h-[120px] h-full flex flex-col justify-center items-center text-center ${
                    isBeforeActive
                      ? 'bg-gradient-to-br from-rose-950/60 via-red-950/50 to-[#180507] border-rose-500/60 shadow-lg shadow-rose-950/50 z-20'
                      : 'bg-gradient-to-br from-rose-500/[0.12] via-red-950/30 to-transparent border-rose-500/30 hover:border-rose-500/50 hover:bg-rose-950/30 shadow-[inset_0_1px_1px_rgba(244,63,94,0.15)]'
                  }`}
                  onClick={() => setActivePopoverId(isBeforeActive ? null : pair.before.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isBeforeActive}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActivePopoverId(isBeforeActive ? null : pair.before.id)
                    }
                  }}
                >
                  <div className="flex flex-col items-center justify-center text-center w-full">
                    <h3 className="text-xs sm:text-sm lg:text-base font-bold text-white leading-snug">
                      {pair.before.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-rose-100/85 font-light mt-1.5 leading-snug">
                      {pair.before.subtitle}
                    </p>
                  </div>
                </div>

                {/* 2. After Cube (Positive) */}
                <div
                  className={`relative rounded-2xl p-3.5 sm:p-4 lg:p-5 transition-all duration-200 cursor-pointer select-none border min-h-[95px] sm:min-h-[110px] lg:min-h-[120px] h-full flex flex-col justify-center items-center text-center ${
                    isAfterActive
                      ? 'bg-cyan-950/40 border-idan-david-aviv-cyan/60 shadow-lg shadow-cyan-950/50 z-20'
                      : 'bg-gradient-to-br from-idan-david-aviv-cyan/[0.08] via-idan-david-aviv-blue/[0.05] to-transparent border-idan-david-aviv-cyan/25 hover:border-idan-david-aviv-cyan/40 hover:bg-cyan-950/20'
                  }`}
                  onClick={() => setActivePopoverId(isAfterActive ? null : pair.after.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isAfterActive}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActivePopoverId(isAfterActive ? null : pair.after.id)
                    }
                  }}
                >
                  <div className="flex flex-col items-center justify-center text-center w-full">
                    <h3 className="text-xs sm:text-sm lg:text-base font-bold text-white leading-snug">
                      {pair.after.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-cyan-200/80 font-light mt-1.5 leading-snug">
                      {pair.after.subtitle}
                    </p>
                  </div>
                </div>

                {/* Center Transformation Node: Interactive Arrow with Click Bubble */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center cursor-pointer select-none w-11 h-11"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActivePopoverId(isArrowActive ? null : `${pair.id}-arrow`)
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="עם מוח AI"
                  aria-expanded={isArrowActive}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      setActivePopoverId(isArrowActive ? null : `${pair.id}-arrow`)
                    }
                  }}
                >
                  {/* Floating Bubble: 'עם מוח AI' with Red-to-Cyan Gradient Frame */}
                  <AnimatePresence>
                    {isArrowActive && (
                      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.92 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.92 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          onClick={(e) => e.stopPropagation()}
                          className="relative flex items-center justify-center"
                        >
                          {/* Gradient Border Frame (Top Red -> Middle Purple -> Bottom Cyan) */}
                          <div className="p-[1px] rounded-xl bg-gradient-to-b from-red-500 via-purple-500 to-idan-david-aviv-cyan shadow-[0_0_25px_rgba(44,179,241,0.35)]">
                            {/* Dark Obsidian Glass Core */}
                            <div className="relative flex items-center px-3.5 py-1.5 rounded-[11px] bg-[#090712]/95 backdrop-blur-2xl whitespace-nowrap">
                              <span className="text-xs font-bold text-white tracking-wide">
                                עם מוח AI
                              </span>
                            </div>
                          </div>

                          {/* Downward Pointer Notch Centered Directly Above Arrow (Matches Bottom Cyan Border) */}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#090712] border-r border-b border-idan-david-aviv-cyan/80" />
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Desktop: Downward Arrow (Top Red -> Bottom Cyan) */}
                  <div
                    className={`hidden lg:flex items-center justify-center relative w-9 h-11 transition-all duration-200 hover:scale-110 active:scale-95 ${
                      isArrowActive
                        ? 'scale-110 drop-shadow-[0_0_20px_rgba(44,179,241,0.5)]'
                        : 'drop-shadow-[0_0_14px_rgba(44,179,241,0.25)]'
                    }`}
                  >
                    <svg
                      viewBox="0 0 36 44"
                      className="w-full h-full"
                      fill="none"
                      stroke="url(#contrastArrowGradDesktop)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {/* Unified Arrow Body */}
                      <path
                        d="M 9 4 C 9 2.5, 27 2.5, 27 4 L 27 22 L 34 22 C 35 22, 35.5 23, 34.8 23.8 L 18.7 41.5 C 18.3 42, 17.7 42, 17.3 41.5 L 1.2 23.8 C 0.5 23, 1 22, 2 22 L 9 22 Z"
                        fill="#0a0714"
                        fillOpacity="0.92"
                      />
                      {/* Unified Brain Paths (Seamless Gradient Union, Positioned Lower Toward Tip) */}
                      <g transform="translate(10.5, 13.5) scale(0.62)" strokeWidth="2">
                        <path d="M12 18V5" />
                        <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
                        <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
                        <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
                        <path d="M18 18a4 4 0 0 0 2-7.464" />
                        <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
                        <path d="M6 18a4 4 0 0 1-2-7.464" />
                        <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
                      </g>
                    </svg>
                  </div>

                  {/* Mobile: Leftward Arrow (Right Red -> Left Cyan in RTL, Brain Shifted Left into Arrow) */}
                  <div
                    className={`flex lg:hidden items-center justify-center relative w-11 h-9 transition-all duration-200 hover:scale-110 active:scale-95 ${
                      isArrowActive
                        ? 'scale-110 drop-shadow-[0_0_20px_rgba(44,179,241,0.5)]'
                        : 'drop-shadow-[0_0_14px_rgba(44,179,241,0.25)]'
                    }`}
                  >
                    <svg
                      viewBox="0 0 44 36"
                      className="w-full h-full"
                      fill="none"
                      stroke="url(#contrastArrowGradMobile)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {/* Unified Arrow Body */}
                      <path
                        d="M 40 9 C 41.5 9, 41.5 27, 40 27 L 22 27 L 22 34 C 22 35, 21 35.5, 20.2 34.8 L 2.5 18.7 C 2 18.3, 2 17.7, 2.5 17.3 L 20.2 1.2 C 21 0.5, 22 1, 22 2 L 22 9 Z"
                        fill="#0a0714"
                        fillOpacity="0.92"
                      />
                      {/* Unified Brain Paths (Shifted Further Left into Arrowhead) */}
                      <g transform="translate(13.5, 10.5) scale(0.62)" strokeWidth="2">
                        <path d="M12 18V5" />
                        <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
                        <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
                        <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
                        <path d="M18 18a4 4 0 0 0 2-7.464" />
                        <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
                        <path d="M6 18a4 4 0 0 1-2-7.464" />
                        <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Contextual Floating Popover - Absolute (Spans Full Width of Category Pair) */}
              <AnimatePresence>
                {isAnyActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className={`absolute top-full mt-2 inset-x-0 z-30 p-4 sm:p-5 rounded-2xl backdrop-blur-2xl border shadow-[0_16px_40px_rgba(0,0,0,0.9)] pointer-events-auto text-start ${
                      isBeforeActive
                        ? 'bg-[#1a0507]/95 border-red-500/40 shadow-red-950/80'
                        : 'bg-[#031d24]/95 border-idan-david-aviv-cyan/40 shadow-cyan-950/80'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Dynamic Pointer Arrow - Aligned to active card side */}
                    <div
                      className={`absolute -top-1.5 w-3 h-3 rotate-45 ${
                        isBeforeActive
                          ? 'bg-[#1a0507] border-t border-l border-red-500/40 right-[calc(25%-6px)] lg:right-8'
                          : 'bg-[#031d24] border-t border-l border-idan-david-aviv-cyan/40 left-[calc(25%-6px)] lg:right-8'
                      }`}
                    />

                    <div className="relative">
                      <p
                        className={`text-xs sm:text-sm leading-relaxed font-light ps-1 pe-6 ${
                          isBeforeActive ? 'text-red-100/90' : 'text-cyan-100/90'
                        }`}
                      >
                        {isBeforeActive ? pair.before.description : pair.after.description}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActivePopoverId(null)
                        }}
                        className={`absolute -top-1 end-0 p-1 rounded-lg transition-colors ${
                          isBeforeActive
                            ? 'text-red-400/60 hover:text-red-300 hover:bg-red-500/10'
                            : 'text-cyan-400/60 hover:text-cyan-300 hover:bg-cyan-500/10'
                        }`}
                        aria-label="סגירה"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

