import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function AIBrainContrast() {
  const contrastCards = [
    {
      id: 'accuracy',
      category: 'אמינות המידע ואיכות הנתונים',
      before: {
        badge: 'המצב הקיים: הזיות וחוסר ודאות',
        title: 'ה-AI הכללי עלול להמציא נתונים',
        description: 'מודלים ציבוריים עונים תשובות כלליות ולעיתים מנחשים עובדות כי הם לא מחוברים למציאות של העסק שלכם. קשה להסתמך עליהם בתהליכי עבודה ובקבלת החלטות בלי לבדוק כל פרט.',
      },
      after: {
        badge: 'עם מוח AI: 100% נתוני אמת',
        title: 'עובדות סגורות ומעוגנות בלבד',
        description: 'אפיון מעמיק של ה-DNA העסקי ועיגון ישיר במערכות נתוני האמת ונהלי העבודה המאושרים שלכם. הסוכן נשען אך ורק על המידע האמיתי — אפס ניחושים.',
      }
    },
    {
      id: 'micro',
      category: 'תפעול ומשימות יומיומיות (Micro Execution)',
      before: {
        badge: 'המצב הקיים: זמן שנשרף על פעולות ידניות',
        title: 'ניווט בין קבצים ומערכות בשביל כל פעולה קטנה',
        description: 'שעות יקרות שנשרפות בכל שבוע על חיפוש מסמכים בדרייב, מעבר בין קובצי אקסל שונים, העתקה ידנית של מידע והסברים שחוזרים על עצמם שוב ושוב.',
      },
      after: {
        badge: 'עם מוח AI: שליפה והצעות המשך לפעולה',
        title: 'תשובה מיידית והצעות להמשך עבודה',
        description: 'שואלים את מוח העסק בשפה חופשית ומקבלים מיד את המידע המדויק — יחד עם הצעות מעשיות להמשך פעולה שהסוכן מכין עבורכם (ניסוח טיוטות, עדכון שדות והכנת משימות לאישורכם).',
      }
    },
    {
      id: 'macro',
      category: 'שליטה במאקרו (Macro Control)',
      before: {
        badge: 'המצב הקיים: שמירה על שליטה גובה מחיר יקר',
        title: 'השקעת משאבים ותשומת לב רבה רק כדי להיות עם האצבע על הדופק',
        description: 'כדי להחזיק שליטה אמיתית במה שקורה בעסק נדרש מכם מאמץ מתמשך: לפנות לעובדים שונים, לבדוק בכמה מערכות במקביל ולהשקיע זמן ותשומת לב יקרה בהצלבת נתונים רק כדי לדעת איפה דברים עומדים.',
      },
      after: {
        badge: 'עם מוח AI: שליטה מלאה בקלות מתוך הצ\'אט',
        title: 'מגדירים את המערכת פעם אחת — ומקבלים דופק עסקי חי ברגע',
        description: 'יוצרים את החיבורים והנהלים פעם אחת, ומקבלים תמונת מצב מדויקת ומרוכזת ישירות מחלון הצ\'אט שלכם. השליטה בעסק הופכת לפעולה של 3 שניות, שמשאירה את מלוא תשומת הלב שלכם לניהול ולצמיחה.',
      }
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
          <span className="w-1.5 h-1.5 rounded-full bg-idan-david-aviv-gold" />
          <span>מהבלאגן לסדר מוחלט</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4"
        >
          שלושת המחסומים שמבזבזים לכם זמן מול AI — <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-cyan to-idan-david-aviv-blue">
            והדרך לפתור אותם.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-white/60 leading-relaxed font-light"
        >
          במקום עוד כלי גנרי שמנחש תשובות ודורש הסברים מחדש, הנה מה שמשתנה כשלעסק שלכם יש מוח AI מובנה:
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="space-y-8">
        {contrastCards.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden p-6 sm:p-8"
          >
            {/* Category Subheader */}
            <div className="text-xs uppercase tracking-wider font-semibold text-white/40 mb-6 pb-3 border-b border-white/5">
              {card.category}
            </div>

            {/* Split Content: Before vs After */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {/* Before Column (Red/Muted Tone) */}
              <div className="rounded-2xl p-5 sm:p-6 bg-red-950/10 border border-red-500/15 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-300 text-xs font-medium mb-3">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                    <span>{card.before.badge}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    &quot;{card.before.title}&quot;
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    {card.before.description}
                  </p>
                </div>
              </div>

              {/* After Column (Cyan/Green Core Tone) */}
              <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-idan-david-aviv-cyan/10 via-idan-david-aviv-blue/10 to-transparent border border-idan-david-aviv-cyan/30 shadow-[0_0_30px_rgba(44,179,241,0.1)] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-idan-david-aviv-cyan/10 blur-2xl rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-idan-david-aviv-cyan/15 text-idan-david-aviv-cyan text-xs font-medium mb-3 border border-idan-david-aviv-cyan/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-idan-david-aviv-cyan" />
                    <span>{card.after.badge}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    &quot;{card.after.title}&quot;
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    {card.after.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
