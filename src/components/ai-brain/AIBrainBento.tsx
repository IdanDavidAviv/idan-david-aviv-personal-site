import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, Network, ShieldCheck, Zap, RefreshCw, Layers, FolderKanban, FileSpreadsheet, Mail, ChevronDown } from 'lucide-react'

const brainPillars = [
  {
    icon: '🧩',
    title: 'הקשר עסקי מלא',
    desc: 'הגדרת תחומי הפעילות, השירותים וקהלי היעד של העסק.',
  },
  {
    icon: '📋',
    title: 'סטנדרטים ונהלי עבודה',
    desc: 'תהליכים מוגדרים שמבטיחים פעולה מסונכרנת ומדויקת.',
  },
  {
    icon: '🔄',
    title: 'עדכון שוטף וגמיש',
    desc: 'מערכת חיה שמתפתחת יחד איתכם ומתעדכנת לפי הצורך.',
  },
  {
    icon: '🕒',
    title: 'זיכרון של כל שלב בדרך',
    desc: 'תיעוד היסטוריית השינויים המאפשר לפעול בביטחון ולשחזר גרסאות.',
  },
]

const analysisPoints = [
  {
    icon: '💡',
    title: 'הצלבה וניתוח נתונים',
    desc: 'בודק את נתוני האמת מול נהלי העבודה ומבין את התמונה המלאה.',
  },
  {
    icon: '🎯',
    title: 'סיכום והצעות לביצוע',
    desc: 'מציג תמצית חדה של המצב יחד עם כיוון פעולה מומלץ להמשך.',
  },
  {
    icon: '📝',
    title: 'הכנת תוצרים מוכנים',
    desc: 'מנסח מראש את הסיכום, המשימה או העדכון למערכת.',
  },
]

const governancePoints = [
  {
    icon: '🛡️',
    title: 'שליטה מלאה בידיים שלכם',
    desc: 'כל עדכון במערכות וכל פנייה החוצה מתבצעים אך ורק באישורכם.',
  },
  {
    icon: '👁️',
    title: 'שקיפות מקורות מלאה',
    desc: 'הסוכן מציג את הנתונים והנהלים שעליהם התבסס לבקשתכם.',
  },
  {
    icon: '💬',
    title: 'אישור במילה אחת בצ\'אט',
    desc: 'כותבים לו "מאושר" בשיחה — והפעולה מתבצעת מיד.',
  },
]

export default function AIBrainBento() {
  const [isMobileBrainExpanded, setIsMobileBrainExpanded] = useState(false)
  const [isMobilePipelinesExpanded, setIsMobilePipelinesExpanded] = useState(false)
  const [isMobileGovernanceExpanded, setIsMobileGovernanceExpanded] = useState(false)

  return (
    <section className="pt-6 sm:pt-10 pb-6 sm:pb-8 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4"
        >
          שלושת עמודי התווך שהופכים AI <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-cyan via-white to-idan-david-aviv-blue">
            לעוזר עסקי אמיתי
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-white/60 leading-relaxed font-light"
        >
          שילוב מובנה בין זיכרון ארגוני, חיבור למערכות ומשילות הדוקה:
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 lg:gap-8">
        {/* Card 1: The Knowledge Brain (Col Span 7) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsMobileBrainExpanded((prev) => !prev)}
          className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-4 sm:p-6 lg:p-8 flex flex-col justify-start lg:justify-between relative overflow-hidden cursor-pointer lg:cursor-default select-none"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-idan-david-aviv-cyan/10 blur-3xl rounded-full pointer-events-none" />

          <div>
            <div className={`flex items-center gap-3 ${isMobileBrainExpanded ? 'mb-4' : 'mb-2.5 sm:mb-4'}`}>
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-idan-david-aviv-cyan/10 border border-idan-david-aviv-cyan/20 shrink-0">
                <Database className="w-5 h-5 sm:w-6 sm:h-6 text-idan-david-aviv-cyan" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    המוח והזיכרון
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-idan-david-aviv-cyan transition-transform duration-300 lg:hidden ${
                      isMobileBrainExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <p className="text-xs sm:text-sm text-idan-david-aviv-cyan font-medium">
                  מערכת זיכרון מובנית שמרכזת את ה-DNA של העסק <br />
                  ומתעדכנת יחד איתו
                </p>
              </div>
            </div>

            {/* Desktop: Full explanation always visible */}
            <p className="hidden lg:block text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
              בתהליך אפיון ממוקד, אנחנו ממפים את תהליכי העבודה, השירותים, הנהלים והמערכות שאיתם אתם עובדים, ובונים מערכת זיכרון מרכזית שמכירה את העסק לעומק. הסוכן פועל מתוך הבנה מלאה של ההקשר העסקי שלכם במקום להתחיל מחדש בכל פעם — והמערכת זוכרת כל שלב בדרך, כך שאפשר לפעול בביטחון מלא, ללמוד מהתהליך, ולעדכן אותה בקלות בכל פעם שהעסק גדל.
            </p>

            {/* Mobile: Accordion disclosure */}
            <AnimatePresence initial={false}>
              {isMobileBrainExpanded && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden overflow-hidden text-xs text-white/70 leading-relaxed font-light mb-4"
                >
                  בתהליך אפיון ממוקד, אנחנו ממפים את תהליכי העבודה, השירותים, הנהלים והמערכות שאיתם אתם עובדים, ובונים מערכת זיכרון מרכזית שמכירה את העסק לעומק. הסוכן פועל מתוך הבנה מלאה של ההקשר העסקי שלכם במקום להתחיל מחדש בכל פעם — והמערכת זוכרת כל שלב בדרך, כך שאפשר לפעול בביטחון מלא, ללמוד מהתהליך, ולעדכן אותה בקלות בכל פעם שהעסק גדל.
                </motion.p>
              )}
            </AnimatePresence>

            {/* 4 Visual Sub-blocks */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${isMobileBrainExpanded ? 'gap-2.5 sm:gap-3' : 'gap-2 sm:gap-3'} mb-0`}>
              {brainPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className={`${isMobileBrainExpanded ? 'p-3 sm:p-3.5 space-y-1' : 'py-2 px-3 sm:p-3.5 space-y-0 sm:space-y-1'} rounded-xl bg-white/[0.03] border border-white/5 transition-all hover:bg-white/[0.05]`}
                >
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="shrink-0">{pillar.icon}</span>
                    <span>{pillar.title}</span>
                  </div>

                  {/* Desktop: Always visible */}
                  <p className="hidden lg:block text-xs text-white/60 leading-relaxed">
                    {pillar.desc}
                  </p>

                  {/* Mobile: Accordion disclosure */}
                  <AnimatePresence initial={false}>
                    {isMobileBrainExpanded && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="lg:hidden overflow-hidden text-xs text-white/60 leading-relaxed pt-1"
                      >
                        {pillar.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 2: Tool Integrations & Pipelines (Col Span 5) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => setIsMobilePipelinesExpanded((prev) => !prev)}
          className="lg:col-span-5 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-4 sm:p-6 lg:p-8 flex flex-col justify-start lg:justify-between relative overflow-hidden cursor-pointer lg:cursor-default select-none"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-idan-david-aviv-blue/10 blur-3xl rounded-full pointer-events-none" />

          <div>
            <div className={`flex items-center gap-3 ${isMobilePipelinesExpanded ? 'mb-4' : 'mb-2.5 sm:mb-4'}`}>
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-idan-david-aviv-blue/10 border border-idan-david-aviv-blue/20 shrink-0">
                <Network className="w-5 h-5 sm:w-6 sm:h-6 text-idan-david-aviv-blue" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    הצנרת וחיבור הכלים
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-idan-david-aviv-blue transition-transform duration-300 lg:hidden ${
                      isMobilePipelinesExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <p className="text-xs sm:text-sm text-idan-david-aviv-blue font-medium">
                  חיבור ישיר למקורות המידע באפס שינוי הרגלים
                </p>
              </div>
            </div>

            {/* Desktop: Full explanation always visible */}
            <p className="hidden lg:block text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
              במקום להוריד קבצים, להעתיק שורות מטבלאות ולהדביק ידנית בצ&apos;אט, אנחנו בונים תשתית שמחברת את מוח ה-AI ישירות לכלים שבהם המידע שלכם חי כיום — Drive, אקסלים, CRM ומסמכים במחשב. החיבור הזה יוצר נגישות ישירה לנתוני האמת ומאפשר לסוכן לשלוף, להצליב ולהכין עדכונים ישירות למערכות.
            </p>

            {/* Mobile: Accordion disclosure for explanation */}
            <AnimatePresence initial={false}>
              {isMobilePipelinesExpanded && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden overflow-hidden text-xs text-white/70 leading-relaxed font-light mb-4"
                >
                  במקום להוריד קבצים, להעתיק שורות מטבלאות ולהדביק ידנית בצ&apos;אט, אנחנו בונים תשתית שמחברת את מוח ה-AI ישירות לכלים שבהם המידע שלכם חי כיום — Drive, אקסלים, CRM ומסמכים במחשב. החיבור הזה יוצר נגישות ישירה לנתוני האמת ומאפשר לסוכן לשלוף, להצליב ולהכין עדכונים ישירות למערכות.
                </motion.p>
              )}
            </AnimatePresence>

            {/* 4 Tool Targets */}
            <div className={`grid grid-cols-2 gap-2 sm:gap-2.5 ${isMobilePipelinesExpanded ? 'mb-4' : 'mb-0 lg:mb-5'}`}>
              <div className="py-2 px-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/80 flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-idan-david-aviv-cyan shrink-0" />
                <span className="truncate">מסמכים ונהלים (Drive)</span>
              </div>
              <div className="py-2 px-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/80 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">ניהול לקוחות (CRM)</span>
              </div>
              <div className="py-2 px-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/80 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">גיליונות ואקסל</span>
              </div>
              <div className="py-2 px-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/80 flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">תקשורת ומיילים</span>
              </div>
            </div>

            {/* Desktop: 3 Capabilities always visible */}
            <div className="hidden lg:block space-y-1.5 text-xs text-white/60 mb-6">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-idan-david-aviv-cyan" />
                <span><strong>שליפה מיידית:</strong> קריאת נתוני אמת עדכניים ישירות מהמקור.</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-idan-david-aviv-blue" />
                <span><strong>עיבוד והצלבה:</strong> שילוב מידע בין כמה מערכות במקביל.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span><strong>עדכון באישור בלבד:</strong> הכנת פעולות הממתינות לאישורכם.</span>
              </div>
            </div>

            {/* Mobile: Accordion disclosure for 3 capabilities */}
            <AnimatePresence initial={false}>
              {isMobilePipelinesExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden overflow-hidden space-y-1.5 text-xs text-white/60 mb-4 pt-1"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-idan-david-aviv-cyan shrink-0" />
                    <span><strong>שליפה מיידית:</strong> קריאת נתוני אמת עדכניים ישירות מהמקור.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-idan-david-aviv-blue shrink-0" />
                    <span><strong>עיבוד והצלבה:</strong> שילוב מידע בין כמה מערכות במקביל.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>עדכון באישור בלבד:</strong> הכנת פעולות הממתינות לאישורכם.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Card 3: Operational Intelligence & Governance (Col Span 12 - Wide Split) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => setIsMobileGovernanceExpanded((prev) => !prev)}
          className="lg:col-span-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-4 sm:p-6 lg:p-8 relative overflow-hidden cursor-pointer lg:cursor-default select-none"
        >
          <div className={`flex items-center gap-3 ${isMobileGovernanceExpanded ? 'mb-4' : 'mb-2.5 sm:mb-4'}`}>
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-purple-500/10 border border-purple-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  הנחיות עבודה ומשילות
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-purple-400 transition-transform duration-300 lg:hidden ${
                    isMobileGovernanceExpanded ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <p className="text-xs sm:text-sm text-purple-400 font-medium">
                סוכן שמנתח את הנתונים, מציג סיכום והצעות לביצוע <br />
                וממתין לאישור
              </p>
            </div>
          </div>

          {/* Desktop: Full explanation always visible */}
          <p className="hidden lg:block text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-8 max-w-4xl">
            ההבדל בין צ&apos;אטבוט רגיל למוח עסקי אמיתי הוא היכולת לחשוב צעד אחד קדימה. אנחנו מגדירים לסוכן נהלי עבודה ברורים שמותאמים בדיוק לעסק שלכם: איך לנתח מידע לעומק, איך לנסח תוצרים וסיכומים, ואילו צעדים מעשיים להציע לכם להמשך. במקום שאתם תחשבו על הצעד הבא — הסוכן מצליב את הנתונים, בונה תוכנית לפתרון ומציג לכם אותה לאישור לפני ביצוע.
          </p>

          {/* Mobile: Accordion disclosure for explanation */}
          <AnimatePresence initial={false}>
            {isMobileGovernanceExpanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden text-xs text-white/70 leading-relaxed font-light mb-4"
              >
                ההבדל בין צ&apos;אטבוט רגיל למוח עסקי אמיתי הוא היכולת לחשוב צעד אחד קדימה. אנחנו מגדירים לסוכן נהלי עבודה ברורים שמותאמים בדיוק לעסק שלכם: איך לנתח מידע לעומק, איך לנסח תוצרים וסיכומים, ואילו צעדים מעשיים להציע לכם להמשך. במקום שאתם תחשבו על הצעד הבא — הסוכן מצליב את הנתונים, בונה תוכנית לפתרון ומציג לכם אותה לאישור לפני ביצוע.
              </motion.p>
            )}
          </AnimatePresence>

          {/* 2-Column Split: Analysis vs Human Approval */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mb-0">
            {/* Side 1: Proactivity & Engine */}
            <div className={`${isMobileGovernanceExpanded ? 'p-5 sm:p-6 space-y-4' : 'p-3.5 sm:p-6 space-y-2 sm:space-y-4'} rounded-2xl bg-white/[0.03] border border-white/5 transition-all`}>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  מנוע הניתוח והיוזמה
                </h4>
                {/* Desktop: always visible */}
                <p className="hidden lg:block text-xs text-white/50 font-light mt-0.5">
                  הסוכן חושב צעד קדימה ומכין הצעות לביצוע
                </p>
                {/* Mobile: Accordion disclosure */}
                <AnimatePresence initial={false}>
                  {isMobileGovernanceExpanded && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="lg:hidden overflow-hidden text-xs text-white/50 font-light mt-0.5"
                    >
                      הסוכן חושב צעד קדימה ומכין הצעות לביצוע
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className={`${isMobileGovernanceExpanded ? 'space-y-2.5' : 'space-y-1.5 sm:space-y-2.5'}`}>
                {analysisPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className={`${isMobileGovernanceExpanded ? 'p-3 space-y-1' : 'py-1.5 px-3 sm:p-3 space-y-0 sm:space-y-1'} rounded-xl bg-white/[0.02] border border-white/5 transition-all hover:bg-white/[0.04]`}
                  >
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="shrink-0">{pt.icon}</span>
                      <span>{pt.title}</span>
                    </div>

                    {/* Desktop: Always visible */}
                    <p className="hidden lg:block text-xs text-white/60 leading-relaxed">
                      {pt.desc}
                    </p>

                    {/* Mobile: Accordion disclosure */}
                    <AnimatePresence initial={false}>
                      {isMobileGovernanceExpanded && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="lg:hidden overflow-hidden text-xs text-white/60 leading-relaxed pt-1"
                        >
                          {pt.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Side 2: Approval Gate */}
            <div className={`${isMobileGovernanceExpanded ? 'p-5 sm:p-6 space-y-4' : 'p-3.5 sm:p-6 space-y-2 sm:space-y-4'} rounded-2xl bg-purple-950/20 border border-purple-500/25 transition-all`}>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-purple-200">
                  שער השליטה והאישור
                </h4>
                {/* Desktop: always visible */}
                <p className="hidden lg:block text-xs text-purple-300/70 font-light mt-0.5">
                  אפס פעולות אוטונומיות — ביצוע רק באישור אנושי בשיחה
                </p>
                {/* Mobile: Accordion disclosure */}
                <AnimatePresence initial={false}>
                  {isMobileGovernanceExpanded && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="lg:hidden overflow-hidden text-xs text-purple-300/70 font-light mt-0.5"
                    >
                      אפס פעולות אוטונומיות — ביצוע רק באישור אנושי בשיחה
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className={`${isMobileGovernanceExpanded ? 'space-y-2.5' : 'space-y-1.5 sm:space-y-2.5'}`}>
                {governancePoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className={`${isMobileGovernanceExpanded ? 'p-3 space-y-1' : 'py-1.5 px-3 sm:p-3 space-y-0 sm:space-y-1'} rounded-xl bg-white/[0.02] border border-purple-500/15 transition-all hover:bg-purple-950/30`}
                  >
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="shrink-0">{pt.icon}</span>
                      <span>{pt.title}</span>
                    </div>

                    {/* Desktop: Always visible */}
                    <p className="hidden lg:block text-xs text-white/60 leading-relaxed">
                      {pt.desc}
                    </p>

                    {/* Mobile: Accordion disclosure */}
                    <AnimatePresence initial={false}>
                      {isMobileGovernanceExpanded && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="lg:hidden overflow-hidden text-xs text-white/60 leading-relaxed pt-1"
                        >
                          {pt.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
