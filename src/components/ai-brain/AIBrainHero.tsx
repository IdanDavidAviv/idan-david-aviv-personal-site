import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MessageCircle, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AIBrainHero() {
  const [activeScenario, setActiveScenario] = useState<'status' | 'meeting'>('status')

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const supportedAgents = [
    {
      id: 'openai',
      name: 'ChatGPT / OpenAI',
      avatarUrl: 'https://unpkg.com/@lobehub/icons-static-avatar@latest/avatars/openai.webp',
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      avatarUrl: 'https://unpkg.com/@lobehub/icons-static-avatar@latest/avatars/gemini.webp',
    },
    {
      id: 'claude',
      name: 'Claude & Claude Code',
      avatarUrl: 'https://unpkg.com/@lobehub/icons-static-avatar@latest/avatars/claude.webp',
    },
    {
      id: 'grok',
      name: 'xAI Grok',
      avatarUrl: 'https://unpkg.com/@lobehub/icons-static-avatar@latest/avatars/grok.webp',
    },
  ]

  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-idan-david-aviv-cyan/15 via-idan-david-aviv-blue/20 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-tight mb-6"
      >
        מוח AI מותאם אישית לעסק <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-cyan via-white to-idan-david-aviv-blue">
          Business AI Brain
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-10 font-light"
      >
        שכבת אינטליגנציה שמחברת את כל המידע והמערכות בעסק <br className="hidden sm:block" />
        ומאפשרת לכם לפעול מהר יותר, על בסיס נתוני האמת שלכם ובשליטה מלאה.
      </motion.p>

      {/* Quick CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
      >
        <a
          href="https://calendly.com/idandavidaviv"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-idan-david-aviv-cyan to-idan-david-aviv-blue text-white font-medium text-base shadow-[0_0_30px_rgba(44,179,241,0.4)] hover:shadow-[0_0_40px_rgba(44,179,241,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>בואו נמפה את מוח ה-AI בעסק שלכם</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </a>

        <a
          href="https://wa.me/972542475705"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white/90 font-medium text-base backdrop-blur-md active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 text-white hover:text-green-400 group"
        >
          <MessageCircle className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
          <span>פשוט דברו איתי בוואטסאפ</span>
        </a>
      </motion.div>

      {/* Interactive Chat Mockup Window */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative max-w-4xl mx-auto rounded-3xl border border-white/15 bg-[#050510]/85 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(44,179,241,0.15)] overflow-hidden text-start"
      >
        {/* Window Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/70 inline-block" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-white/90">
                מוח העסק • סוכן AI מחובר לנתוני אמת
              </span>
            </div>
          </div>

          {/* Scenario Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => setActiveScenario('status')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                activeScenario === 'status'
                  ? "bg-idan-david-aviv-blue text-white shadow-md shadow-idan-david-aviv-blue/40"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              תרחיש 1: תמונת מצב תפעולית
            </button>
            <button
              onClick={() => setActiveScenario('meeting')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                activeScenario === 'meeting'
                  ? "bg-idan-david-aviv-blue text-white shadow-md shadow-idan-david-aviv-blue/40"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              תרחיש 2: הכנה לפגישה
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="p-5 sm:p-8 space-y-6">
          <AnimatePresence mode="wait">
            {activeScenario === 'status' ? (
              <motion.div
                key="scenario-status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* User Message */}
                <div className="flex justify-start">
                  <div className="max-w-xl rounded-2xl rounded-tr-sm bg-white/[0.05] border border-white/10 p-4 text-white text-sm leading-relaxed shadow-sm">
                    &quot;תן לי תמונת מצב על הפניות מהשבוע האחרון, ואיפה יש משימות שדורשות תשומת לב שלי.&quot;
                  </div>
                </div>

                {/* AI Model Output */}
                <div className="space-y-4 pt-1 text-sm text-white/90 leading-relaxed max-w-2xl text-start">
                  {/* Model Thinking & System Actions Trace */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/40 pb-0.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                      סריקת 12 לידים ב-CRM
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80" />
                      הצלבת תסריט שירות ומחירון 2026
                    </span>
                  </div>

                  {/* Direct Structured Answer */}
                  <div className="space-y-3 text-white/80 font-light">
                    <p className="font-medium text-white/95 text-sm">
                      תמונת מצב שבועית (12 פניות בסך הכול):
                    </p>
                    <ul className="space-y-2.5 list-none ps-0">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-semibold">•</span>
                        <span><strong className="text-white font-medium">9 פניות:</strong> טופלו ותואמו בהצלחה לשיחת אפיון ראשונית.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 font-semibold shrink-0">•</span>
                        <div className="space-y-1">
                          <strong className="text-white font-medium">3 פניות ממתינות לאישורך:</strong>
                          <div className="text-xs sm:text-sm text-white/70 space-y-1 pt-0.5">
                            <div>1. <strong>חברת אלפא:</strong> ממתינים להצעת מחיר (14,500 ₪) לפי המחירון המעודכן.</div>
                            <div>2. <strong>ד&quot;ר לוי:</strong> שאלה לגבי זמני אספקה לפי נוהל השירות.</div>
                            <div>3. <strong>טק-סולושנס:</strong> בקשה להחרגה בתנאי התשלום (שוטף+60).</div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <p className="text-white/90 text-xs sm:text-sm pt-2.5 border-t border-white/10 font-medium">
                    האם להכין טיוטות מענה מותאמות ללקוחות ולעדכן ב-CRM?
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="scenario-meeting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* User Message */}
                <div className="flex justify-start">
                  <div className="max-w-xl rounded-2xl rounded-tr-sm bg-white/[0.05] border border-white/10 p-4 text-white text-sm leading-relaxed shadow-sm">
                    &quot;יש לי עוד שעה שיחה עם לקוח חשוב. תזכיר לי מה הסיכום הקודם איתו, מה הנוהל שלנו לגבי החרגות, ומה אנחנו מציעים לו היום?&quot;
                  </div>
                </div>

                {/* AI Model Output */}
                <div className="space-y-4 pt-1 text-sm text-white/90 leading-relaxed max-w-2xl text-start">
                  {/* Model Thinking & System Actions Trace */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/40 pb-0.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                      שליפת סיכום פגישה מ-Drive
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80" />
                      קריאת נוהל התקשרות והחרגות
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80" />
                      סנכרון יומן Google Calendar
                    </span>
                  </div>

                  {/* Direct Structured Answer */}
                  <div className="space-y-3 text-white/80 font-light">
                    <p className="font-medium text-white/95 text-sm">
                      תקציר לקראת הפגישה ב-14:00 (חברת נקסוס / רועי):
                    </p>
                    <ul className="space-y-2.5 list-none ps-0">
                      <li className="flex items-start gap-2">
                        <span className="text-idan-david-aviv-cyan font-semibold">•</span>
                        <span><strong className="text-white font-medium">סיכום קודם (12.9):</strong> סוכם על פיילוט לצוות המכירות. רועי הדגיש צורך קריטי באינטגרציה למערכת ה-ERP הקיימת.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-idan-david-aviv-cyan font-semibold">•</span>
                        <span><strong className="text-white font-medium">מדיניות החרגות:</strong> אין אישור לחרוג מתנאי תשלום שוטף+30 ללא אישור הנהלה. הנחת פיילוט מוגבלת ל-10% מקסימום.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-idan-david-aviv-cyan font-semibold">•</span>
                        <span><strong className="text-white font-medium">הצעת ערך לשיחה היום:</strong> להציג התממשקות ישירה ל-ERP דרך API קיים, ללא עלות פיתוח מותאם.</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-white/90 text-xs sm:text-sm pt-2.5 border-t border-white/10 font-medium">
                    האם להפיק עבורך תקציר מנהלים ממוקד לנייד ולסנכרן את הדגשים לכרטיס הלקוח ב-CRM לפני הפגישה?
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Decoupled Floating Supported Agents Integration Dock */}
      <div className="mt-6 sm:mt-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="inline-flex items-center gap-3.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl border border-white/10 bg-[#050510]/70 backdrop-blur-xl shadow-lg shadow-black/40"
        >
          <span className="text-xs sm:text-sm text-white/50 font-medium whitespace-nowrap">
            עובד עם:
          </span>

          <div className="flex items-center gap-2" dir="ltr">
            {supportedAgents.map((agent) => (
              <div key={agent.id} className="relative">
                <button
                  type="button"
                  onClick={() => setActiveTooltip(activeTooltip === agent.id ? null : agent.id)}
                  onMouseEnter={() => setActiveTooltip(agent.id)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onFocus={() => setActiveTooltip(agent.id)}
                  onBlur={() => setActiveTooltip(null)}
                  aria-label={agent.name}
                  className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 rounded-xl p-1.5 flex items-center justify-center transition-all duration-200 cursor-pointer",
                    "bg-white/[0.04] border border-white/10 hover:border-white/30 hover:scale-105 active:scale-95 shadow-md",
                    activeTooltip === agent.id && "border-idan-david-aviv-cyan/60 ring-2 ring-idan-david-aviv-cyan/20 scale-105"
                  )}
                >
                  <img
                    src={agent.avatarUrl}
                    alt={agent.name}
                    className="w-full h-full object-contain rounded-lg pointer-events-none select-none"
                    loading="lazy"
                  />
                </button>

                <AnimatePresence>
                  {activeTooltip === agent.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-lg bg-[#0e0e1a]/95 border border-white/20 text-white text-xs font-medium whitespace-nowrap shadow-2xl pointer-events-none z-30"
                    >
                      {agent.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0e0e1a]/95" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
