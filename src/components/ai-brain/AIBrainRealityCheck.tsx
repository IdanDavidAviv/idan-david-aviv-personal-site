import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function AIBrainRealityCheck() {
  const points = [
    {
      title: 'אפס הכנה מוקדמת',
      description: 'מתחברים ישירות ל-Drive, ל-CRM ולמסמכים שכבר עובדים איתם היום. אין צורך לסדר, להכין או לייצא שום קובץ מראש.'
    },
    {
      title: 'בגובה העיניים ובעברית פשוטה',
      description: 'אתם מביאים את ההיכרות עם העסק והצרכים שלו, ואנחנו דואגים לכל השאר. מדברים עם הסוכן בצ\'אט רגיל ובשליטה מלאה שלכם.'
    },
    {
      title: 'גב הנדסי לאורך כל הדרך',
      description: 'כתובת מקצועית קבועה שמחזיקה את המערכת, קולטת תהליכים חדשים ומלווה אתכם לאורך הדרך. אתם מנהלים את העסק, ואנחנו דואגים שהמוח עובד ומדויק.'
    }
  ]

  return (
    <section className="pt-2 sm:pt-4 pb-6 sm:pb-8 px-4 sm:px-6 max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-10 relative shadow-2xl overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
            מיועד לעסקים עם מורכבות תפעולית <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              ללא צורך ברקע טכנולוגי כדי להתחיל
            </span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light mt-4">
            המערכת נבנית על גבי התשתיות שלכם והופכת את העומס היומיומי ליתרון תחרותי שקט.
          </p>
        </div>

        {/* 3 Friction-Free Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-emerald-500/30 hover:bg-emerald-500/[0.03] transition-all duration-300 flex flex-col gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                  {pt.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light pe-1">
                {pt.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
