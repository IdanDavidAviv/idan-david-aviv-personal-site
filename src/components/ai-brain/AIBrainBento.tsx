import { motion } from 'framer-motion'
import { Database, Network, ShieldCheck, CheckCircle2, Zap, RefreshCw, Layers, FolderKanban, FileSpreadsheet, Mail } from 'lucide-react'

export default function AIBrainBento() {
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
          <span className="w-1.5 h-1.5 rounded-full bg-idan-david-aviv-cyan" />
          <span>ארכיטקטורת המערכת</span>
        </motion.div>

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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Card 1: The Knowledge Brain (Col Span 7) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-idan-david-aviv-cyan/10 blur-3xl rounded-full pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-idan-david-aviv-cyan/10 border border-idan-david-aviv-cyan/20">
                <Database className="w-6 h-6 text-idan-david-aviv-cyan" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  המוח והזיכרון <span className="text-xs sm:text-sm font-normal text-white/50">(The Knowledge Brain)</span>
                </h3>
                <p className="text-xs sm:text-sm text-idan-david-aviv-cyan font-medium">
                  מערכת זיכרון מובנית שמרכזת את ה-DNA של העסק — ומתעדכנת יחד איתו
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
              בתהליך אפיון ממוקד, אנחנו ממפים את תהליכי העבודה, השירותים, הנהלים והמערכות שאיתם אתם עובדים, ובונים מערכת זיכרון מרכזית שמכירה את העסק לעומק. הסוכן פועל מתוך הבנה מלאה של ההקשר העסקי שלכם במקום להתחיל מחדש בכל פעם — והמערכת זוכרת כל שלב בדרך, כך שאפשר לפעול בביטחון מלא, ללמוד מהתהליך, ולעדכן אותה בקלות בכל פעם שהעסק גדל.
            </p>

            {/* 4 Visual Sub-blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>🧩</span>
                  <span>הקשר עסקי מלא</span>
                </div>
                <p className="text-xs text-white/60">הגדרת תחומי הפעילות, השירותים וקהלי היעד של העסק.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>📋</span>
                  <span>סטנדרטים ונהלי עבודה</span>
                </div>
                <p className="text-xs text-white/60">תהליכים מוגדרים שמבטיחים פעולה מסונכרנת ומדויקת.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>🔄</span>
                  <span>עדכון שוטף וגמיש</span>
                </div>
                <p className="text-xs text-white/60">מערכת חיה שמתפתחת יחד איתכם ומתעדכנת לפי הצורך.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>🕒</span>
                  <span>זיכרון של כל שלב בדרך</span>
                </div>
                <p className="text-xs text-white/60">תיעוד היסטוריית השינויים המאפשר לפעול בביטחון ולשחזר גרסאות.</p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="pt-4 border-t border-white/5">
            <span className="inline-flex items-center gap-1.5 text-xs text-idan-david-aviv-cyan font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              זיכרון עסקי מתועד שמאפשר לפעול בביטחון וללמוד לאורך זמן
            </span>
          </div>
        </motion.div>

        {/* Card 2: Tool Integrations & Pipelines (Col Span 5) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-idan-david-aviv-blue/10 blur-3xl rounded-full pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-idan-david-aviv-blue/10 border border-idan-david-aviv-blue/20">
                <Network className="w-6 h-6 text-idan-david-aviv-blue" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  הצנרת וחיבור הכלים <span className="text-xs font-normal text-white/50">(Pipelines)</span>
                </h3>
                <p className="text-xs sm:text-sm text-idan-david-aviv-blue font-medium">
                  חיבור ישיר למקורות המידע — באפס שינוי הרגלים
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
              במקום להוריד קבצים, להעתיק שורות מטבלאות ולהדביק ידנית בצ&apos;אט, אנחנו בונים תשתית שמחברת את מוח ה-AI ישירות לכלים שבהם המידע שלכם חי כיום — Drive, אקסלים, CRM ומסמכים במחשב. החיבור הזה יוצר נגישות ישירה לנתוני האמת ומאפשר לסוכן לשלוף, להצליב ולהכין עדכונים ישירות למערכות.
            </p>

            {/* 4 Tool Targets */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/80 flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-idan-david-aviv-cyan shrink-0" />
                <span className="truncate">מסמכים ונהלים (Drive)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/80 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">ניהול לקוחות (CRM)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/80 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">גיליונות ואקסל</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/80 flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">תקשורת ומיילים</span>
              </div>
            </div>

            {/* 3 Capabilities */}
            <div className="space-y-1.5 text-xs text-white/60 mb-6">
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
          </div>

          {/* Status Badge */}
          <div className="pt-4 border-t border-white/5">
            <span className="inline-flex items-center gap-1.5 text-xs text-idan-david-aviv-blue font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              גישה ישירה לנתוני אמת • עדכונים רק באישור אנושי
            </span>
          </div>
        </motion.div>

        {/* Card 3: Operational Intelligence & Governance (Col Span 12 - Wide Split) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                הנחיות עבודה ומשילות <span className="text-xs sm:text-sm font-normal text-white/50">(Operational Intelligence & Governance)</span>
              </h3>
              <p className="text-xs sm:text-sm text-purple-400 font-medium">
                סוכן שמנתח את הנתונים, מציג סיכום והצעות לביצוע — וממתין לאישור
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-8 max-w-4xl">
            ההבדל בין צ&apos;אטבוט רגיל למוח עסקי אמיתי הוא היכולת לחשוב צעד אחד קדימה. אנחנו מגדירים לסוכן נהלי עבודה ברורים שמותאמים בדיוק לעסק שלכם: איך לנתח מידע לעומק, איך לנסח תוצרים וסיכומים, ואילו צעדים מעשיים להציע לכם להמשך. במקום שאתם תחשבו על הצעד הבא — הסוכן מצליב את הנתונים, בונה תוכנית לפתרון ומציג לכם אותה לאישור לפני ביצוע.
          </p>

          {/* 2-Column Split: Analysis vs Human Approval */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Side 1: Proactivity & Engine */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
              <div className="text-xs uppercase tracking-wider font-bold text-white/50 mb-2">
                מנוע הניתוח והפרואקטיביות (מה הסוכן מכין ויוזם)
              </div>
              <div className="space-y-2 text-xs text-white/80">
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 shrink-0">💡</span>
                  <div><strong>הצלבה וניתוח נתונים:</strong> בודק את נתוני האמת מול נהלי העבודה ומבין את התמונה המלאה.</div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-idan-david-aviv-cyan shrink-0">🎯</span>
                  <div><strong>סיכום והצעות לביצוע:</strong> מציג תמצית חדה של המצב יחד עם כיוון פעולה מומלץ להמשך.</div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400 shrink-0">📝</span>
                  <div><strong>הכנת תוצרים מוכנים (Ready-to-Use):</strong> מנסח מראש את הסיכום, המשימה או העדכון למערכת.</div>
                </div>
              </div>
            </div>

            {/* Side 2: Approval Gate */}
            <div className="p-5 rounded-2xl bg-purple-950/15 border border-purple-500/20 space-y-3">
              <div className="text-xs uppercase tracking-wider font-bold text-purple-300 mb-2">
                שער השליטה של המנהל (Approval Gate בתוך הצ&apos;אט)
              </div>
              <div className="space-y-2 text-xs text-white/80">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">🛡️</span>
                  <div><strong>שליטה מלאה בידיים שלכם:</strong> כל עדכון במערכות וכל פנייה החוצה מתבצעים אך ורק באישורכם.</div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 shrink-0">👁️</span>
                  <div><strong>שקיפות מקורות מלאה:</strong> הסוכן מציג את הנתונים והנהלים שעליהם התבסס לבקשתכם.</div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 shrink-0">💬</span>
                  <div><strong>אישור במילה אחת בצ&apos;אט:</strong> כותבים לו &quot;מאושר&quot; בשיחה — והפעולה מתבצעת מיד.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="pt-4 border-t border-white/5">
            <span className="inline-flex items-center gap-1.5 text-xs text-purple-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              פרואקטיביות מלאה בסטנדרט שלכם • ביצוע בפועל רק באישורכם בשיחה
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
