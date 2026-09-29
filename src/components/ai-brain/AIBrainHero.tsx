import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MessageCircle, Check, Sparkles, ArrowLeft, ShieldCheck, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AIBrainHero() {
  const [activeScenario, setActiveScenario] = useState<'status' | 'meeting'>('status')
  const [isApproved, setIsApproved] = useState(false)

  const handleApprove = () => {
    setIsApproved(true)
    setTimeout(() => {
      setIsApproved(false)
    }, 3000)
  }

  const supportedAgents = [
    { name: 'ChatGPT / OpenAI', dotColor: 'bg-emerald-400' },
    { name: 'Claude & Claude Code', dotColor: 'bg-amber-400' },
    { name: 'Google Gemini', dotColor: 'bg-blue-400' },
    { name: 'Antigravity', dotColor: 'bg-purple-400' },
    { name: 'xAI Grok', dotColor: 'bg-white' },
  ]

  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-idan-david-aviv-cyan/15 via-idan-david-aviv-blue/20 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_20px_-5px_rgba(44,179,241,0.3)]"
      >
        <span className="w-2 h-2 rounded-full bg-idan-david-aviv-cyan animate-pulse" />
        <span className="text-xs sm:text-sm font-medium text-white/90">
          העוזר החכם שמכיר את העסק שלכם מבפנים
        </span>
        <span className="text-xs text-white/40 hidden sm:inline">| Business AI Brain</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-tight mb-6"
      >
        AI שמכיר את העסק שלכם לעומק — <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-cyan via-white to-idan-david-aviv-blue">
          ופועל על 100% נתוני אמת.
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-10 font-light"
      >
        מחברים את כל הידע, המסמכים ונהלי העבודה שלכם למערכת אחת — ומאפשרים לכם ולצוות לדבר עם סוכן AI לבחירתכם שמכיר את העסק מבפנים, מבוסס על 100% נתוני אמת, וחוסך שעות של עבודה ידנית בכל יום.
      </motion.p>

      {/* Quick CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
      >
        <a
          href="https://calendly.com/idandavidaviv"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-idan-david-aviv-cyan to-idan-david-aviv-blue text-white font-medium text-base shadow-[0_0_30px_rgba(44,179,241,0.4)] hover:shadow-[0_0_40px_rgba(44,179,241,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>קביעת שיחת מיפוי והיתכנות (30 דק&apos;)</span>
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
              onClick={() => {
                setActiveScenario('status')
                setIsApproved(false)
              }}
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
              onClick={() => {
                setActiveScenario('meeting')
                setIsApproved(false)
              }}
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
        <div className="p-5 sm:p-7 space-y-5">
          <AnimatePresence mode="wait">
            {activeScenario === 'status' ? (
              <motion.div
                key="scenario-status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* User Message */}
                <div className="flex items-start gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-idan-david-aviv-blue/30 border border-idan-david-aviv-blue/40 flex items-center justify-center shrink-0 text-white/90">
                    <User className="w-4 h-4 text-idan-david-aviv-cyan" />
                  </div>
                  <div className="max-w-xl rounded-2xl rounded-tr-sm bg-idan-david-aviv-blue/15 border border-idan-david-aviv-blue/30 p-4 text-white text-sm leading-relaxed shadow-sm">
                    &quot;תן לי תמונת מצב על הפניות מהשבוע האחרון, ואיפה יש משימות שדורשות תשומת לב שלי.&quot;
                  </div>
                </div>

                {/* AI Brain Message */}
                <div className="flex items-start gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-idan-david-aviv-cyan/30 to-idan-david-aviv-blue/30 border border-white/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-idan-david-aviv-cyan" />
                  </div>
                  <div className="max-w-2xl rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/10 p-5 text-white/90 text-sm leading-relaxed space-y-3">
                    <p className="text-white/80">
                      1. <strong className="text-white font-medium">בדקתי בנהלי העבודה ובתסריט השירות:</strong> כל פנייה דורשת מענה ראשוני ותיאום שיחת אפיון.
                    </p>
                    <p className="text-white/80">
                      2. <strong className="text-white font-medium">סרקתי את הנתונים ב-CRM ובמערכות הפניות:</strong> נכנסו 12 פניות. 9 תואמו בהצלחה, ויש 3 לקוחות שממתינים לסיכום פרטים.
                    </p>
                    <p className="text-white/80">
                      3. <strong className="text-white font-medium">לפי הנתונים,</strong> ניסחתי עבור שלושתם טיוטות מענה מותאמות אישית שנשענות בדיוק על המחירון והתנאים שמוגדרים אצלנו.
                    </p>
                    <p className="text-white/95 font-medium pt-1 border-t border-white/10">
                      4. הטיוטות מוכנות לעיונך. האם יש לי אישור שלך להוציא אותן ולעדכן את הסטטוס במערכת?
                    </p>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
                        <Check className="w-3.5 h-3.5" />
                        נוהל שירות ומכירה 2026
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-idan-david-aviv-cyan/10 border border-idan-david-aviv-cyan/20 text-idan-david-aviv-cyan text-xs font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        סנכרון נתוני אמת חי
                      </span>
                    </div>

                    {/* Tactile Action Button */}
                    <div className="pt-3">
                      <button
                        onClick={handleApprove}
                        className={cn(
                          "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 shadow-md active:scale-95",
                          isApproved
                            ? "bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.4)] animate-pulse"
                            : "bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white/90 hover:border-idan-david-aviv-cyan/50"
                        )}
                      >
                        {isApproved ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-300" />
                            <span>✓ הפעולה אושרה והמערכות עודכנו</span>
                          </>
                        ) : (
                          <>
                            <span>✋</span>
                            <span>אישור שליחה ועדכון מערכות</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="scenario-meeting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* User Message */}
                <div className="flex items-start gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-idan-david-aviv-blue/30 border border-idan-david-aviv-blue/40 flex items-center justify-center shrink-0 text-white/90">
                    <User className="w-4 h-4 text-idan-david-aviv-cyan" />
                  </div>
                  <div className="max-w-xl rounded-2xl rounded-tr-sm bg-idan-david-aviv-blue/15 border border-idan-david-aviv-blue/30 p-4 text-white text-sm leading-relaxed shadow-sm">
                    &quot;יש לי עוד שעה שיחה עם לקוח חשוב. תזכיר לי מה הסיכום הקודם איתו, מה הנוהל שלנו לגבי החרגות, ומה אנחנו מציעים לו היום?&quot;
                  </div>
                </div>

                {/* AI Brain Message */}
                <div className="flex items-start gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-idan-david-aviv-cyan/30 to-idan-david-aviv-blue/30 border border-white/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-idan-david-aviv-cyan" />
                  </div>
                  <div className="max-w-2xl rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/10 p-5 text-white/90 text-sm leading-relaxed space-y-3">
                    <p className="text-white/80">
                      1. <strong className="text-white font-medium">בדקתי במדיניות ההתקשרות שלנו:</strong> פרויקטים מסוג זה כוללים אפיון מוקדם והגדרת אבני דרך מראש.
                    </p>
                    <p className="text-white/80">
                      2. <strong className="text-white font-medium">שלפתי את סיכום הפגישה הקודמת מהמסמכים ואת הנתונים ביומן:</strong> הלקוח ביקש לוודא תמיכה במערכת הקיימת שלו ולוחות זמנים קצרים.
                    </p>
                    <p className="text-white/80">
                      3. <strong className="text-white font-medium">הכנתי עבורך נקודות מפתח ממוקדות לשיחה,</strong> כולל מענה מדויק לדרישות שלו בהתאם לסטנדרט שלנו.
                    </p>
                    <p className="text-white/95 font-medium pt-1 border-t border-white/10">
                      4. האם תרצה שאפיק מזה תקציר מהיר לנייד לפני שאתה עולה לשיחה?
                    </p>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
                        <Check className="w-3.5 h-3.5" />
                        תיק לקוח מסונכרן
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-idan-david-aviv-cyan/10 border border-idan-david-aviv-cyan/20 text-idan-david-aviv-cyan text-xs font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        נוהל התקשרות פנימי
                      </span>
                    </div>

                    {/* Tactile Action Button */}
                    <div className="pt-3">
                      <button
                        onClick={handleApprove}
                        className={cn(
                          "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 shadow-md active:scale-95",
                          isApproved
                            ? "bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.4)] animate-pulse"
                            : "bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white/90 hover:border-idan-david-aviv-cyan/50"
                        )}
                      >
                        {isApproved ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-300" />
                            <span>✓ התקציר נשלח לנייד בהצלחה</span>
                          </>
                        ) : (
                          <>
                            <span>📄</span>
                            <span>שליחת תקציר לנייד</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Supported Agents Compatibility Strip */}
        <div className="border-t border-white/10 bg-white/[0.02] p-4 sm:p-5">
          <p className="text-xs text-white/50 mb-3 text-center sm:text-start">
            עובד בצורה חלקה עם סוכן ה-AI המועדף עליכם (אפס נעילת ספק):
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {supportedAgents.map((agent) => (
              <div
                key={agent.name}
                className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/25 text-white/80 hover:text-white text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <span className={cn("w-1.5 h-1.5 rounded-full", agent.dotColor)} />
                <span>{agent.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
