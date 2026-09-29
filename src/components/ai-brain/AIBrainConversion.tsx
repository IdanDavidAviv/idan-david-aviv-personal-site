import { motion } from 'framer-motion'
import { Calendar, MessageCircle, ArrowLeft, Sparkles } from 'lucide-react'

export default function AIBrainConversion() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#050510] to-[#080820] backdrop-blur-2xl p-8 sm:p-12 text-center overflow-hidden shadow-[0_0_60px_rgba(44,179,241,0.15)]"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-idan-david-aviv-cyan/20 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs sm:text-sm font-medium text-white/80 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-idan-david-aviv-cyan" />
          <span>בדיקת היתכנות ללא התחייבות</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          רוצים לבדוק איך זה עובד אצלכם בעסק?
        </h2>

        <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light mb-10">
          בשיחת מיפוי והיתכנות קצרה של חצי שעה נבין את תהליכי העבודה ומקורות המידע שלכם, ונבדוק יחד האם ואיך נכון לבנות עבורכם מוח AI.
        </p>

        {/* 2 Conversion CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://calendly.com/idandavidaviv"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-idan-david-aviv-cyan to-idan-david-aviv-blue text-white font-medium text-base shadow-[0_0_35px_rgba(44,179,241,0.4)] hover:shadow-[0_0_50px_rgba(44,179,241,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
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
            <span>שליחת הודעה בוואטסאפ</span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
