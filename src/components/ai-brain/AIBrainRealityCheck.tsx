import { motion } from 'framer-motion'
import { CheckCircle2, HeartHandshake } from 'lucide-react'

export default function AIBrainRealityCheck() {
  const points = [
    {
      title: 'עובדים עם המידע שכבר קיים בעסק',
      description: 'לא צריך להכין קבצים מיוחדים מראש. מתחילים מהמסמכים, הנהלים והטבלאות שכבר קיימים אצלכם היום (בדרייב, באקסל, ב-CRM או במיילים).'
    },
    {
      title: 'אתם מציגים את הצרכים — אנחנו פותרים את החלק הטכני',
      description: 'במקום להסתבך עם קוד, פרומפטים או הגדרות מורכבות, אתם רק מסבירים איך העסק עובד בשיחה פתוחה. אנחנו דואגים לכל הבנייה והחיבורים מאחורי הקלעים.'
    },
    {
      title: 'בלי להחליף מערכות ובלי לשנות הרגלים',
      description: 'המוח העסקי מתחבר ישירות לסביבת הצ\'אט שאתם כבר רגילים לעבוד איתה. אתם והצוות לא צריכים ללמוד שום תוכנה חדשה.'
    },
    {
      title: 'ליווי טכנולוגי צמוד בלי להחזיק מתכנת בעסק',
      description: 'יש לכם כתובת מקצועית שמחזיקה את המערכת, מוודאת שהיא פועלת בצורה יציבה ואמינה, ומעדכנת אותה בכל פעם שהעסק גדל.'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl"
      >
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-idan-david-aviv-cyan/10 blur-3xl rounded-full pointer-events-none" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs sm:text-sm font-medium text-white/80 mb-4">
            <HeartHandshake className="w-3.5 h-3.5 text-idan-david-aviv-cyan" />
            <span>התאמה ותיאום ציפיות</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
            מה נדרש מכם כדי לצאת לדרך? <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-cyan to-idan-david-aviv-blue">
              הרבה פחות ממה שאתם חושבים:
            </span>
          </h2>
        </div>

        {/* 4 Friction-Free Points */}
        <div className="space-y-5">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  {pt.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
