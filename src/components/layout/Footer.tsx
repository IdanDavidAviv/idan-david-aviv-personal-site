/**
 * Footer Component - Elegant exit point for the site.
 */
export default function Footer() {
  return (
    <footer className="pt-6 pb-8 px-6 border-t border-white/5 text-center">
      <div className="max-w-4xl mx-auto space-y-3">
        <p className="text-white/40 text-xs font-light tracking-wide leading-relaxed">
          I build tools that sustain <strong>Harmonious Flow</strong> supporting the creative process. <br className="hidden sm:block" />
          I share them in the hopes they help sustain yours too.
        </p>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-white/20 text-[10px] uppercase tracking-[0.2em] font-medium py-1">
          <span className="cursor-default hover:text-white/40 active:scale-95 transition-all">Building Human Centered AI</span>
          <span className="cursor-default hover:text-white/40 active:scale-95 transition-all">Simplifying the Complex</span>
          <span className="cursor-default hover:text-white/40 active:scale-95 transition-all">Focusing on What Matters</span>
        </div>
        <p className="text-white/40 text-xs font-light tracking-wide">
          © {new Date().getFullYear()} Idan David-Aviv.
        </p>
      </div>
    </footer>
  )
}
