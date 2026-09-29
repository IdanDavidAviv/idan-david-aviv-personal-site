import { motion } from 'framer-motion'
import { Sparkles, Compass, Cpu, Rocket } from 'lucide-react'

export default function AIBrainStepper() {
  const steps = [
    {
      number: '01',
      title: 'מיפוי ראשוני ובדיקת היתכנות',
      time: '30–60 דק\'',
      icon: <Compass className="w-5 h-5 text-idan-david-aviv-cyan" />,
      description: 'בשיחה ממוקדת אנחנו בודקים יחד האם המערכות וסוג המידע שלכם מתאימים לבניית מוח AI, מבינים איפה הכאב התפעולי הכי דחוף, ומוודאים שיש פה היתכנות לאימפקט עסקי אמיתי.',
      accent: 'border-idan-david-aviv-cyan/30 bg-idan-david-aviv-cyan/5 text-idan-david-aviv-cyan',
    },
    {
      number: '02',
      title: 'התאמה ובנייה מאחורי הקלעים',
      time: 'אפס התעסקות טכנית מהצד שלכם',
      icon: <Cpu className="w-5 h-5 text-idan-david-aviv-blue" />,
      description: 'בזמן שאתם ממשיכים לנהל את העסק כרגיל, אנחנו מקימים את מערכת הזיכרון המרכזית ומחברים את הצנרת ישירות למקורות המידע שלכם (Drive, CRM, אקסלים ומסמכים). אתם לא צריכים להתעסק בקוד, בהגדרות טכניות או בחיבורים.',
      accent: 'border-idan-david-aviv-blue/30 bg-idan-david-aviv-blue/5 text-idan-david-aviv-blue',
    },
    {
      number: '03',
      title: 'הטמעה במערכת ועלייה לאוויר',
      time: 'חיבור ישיר לצ\'אט שלכם',
      icon: <Rocket className="w-5 h-5 text-emerald-400" />,
      description: 'מחברים את מוח ה-AI ישירות לסביבת הצ\'אט שאתם כבר רגילים לעבוד איתה (ChatGPT, Claude, Google Gemini או כל כלי אחר), מוודאים שהוא פועל ב-100% לפי הסטנדרט שלכם, ויוצאים לדרך.',
      accent: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs sm:text-sm font-medium text-white/80 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>איך זה עובד בפועל</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4"
        >
          שלושה שלבים פשוטים — <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-cyan via-white to-idan-david-aviv-blue">
            ויש לכם מוח עסקי שעובד בשבילכם
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-white/60 leading-relaxed font-light"
        >
          תהליך ממוקד והדרגתי שמייצר ערך מהרגע הראשון, וממשיך להתפתח יחד עם העסק שלכם.
        </motion.p>
      </div>

      {/* Stepper Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {steps.map((step, idx) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <span className="text-3xl sm:text-4xl font-black text-white/20 group-hover:text-white/30 transition-colors font-mono">
                  {step.number}
                </span>
                <div className={`p-2.5 rounded-xl border ${step.accent}`}>
                  {step.icon}
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                {step.title}
              </h3>
              <div className="text-xs font-medium text-white/50 mb-4 pb-2 border-b border-white/5">
                {step.time}
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Closing Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-idan-david-aviv-cyan/10 via-idan-david-aviv-blue/10 to-purple-500/10 border border-white/10 text-center max-w-4xl mx-auto"
      >
        <p className="text-xs sm:text-sm text-white/80 font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-idan-david-aviv-cyan shrink-0" />
          <span>
            מערכת חיה שצומחת עם העסק — קליטת נהלים חדשים, חיבור מקורות מידע נוספים והרחבת יכולות — בליווי שלנו לאורך כל הדרך.
          </span>
        </p>
      </motion.div>
    </section>
  )
}
