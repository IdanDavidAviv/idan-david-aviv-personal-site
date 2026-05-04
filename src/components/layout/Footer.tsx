/**
 * Footer Component - Elegant exit point for the site.
 */
export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-white/20 text-xs uppercase tracking-[0.2em] font-medium">
          <span className="cursor-default hover:text-white/40 active:scale-95 transition-all">Simplifying the Complex</span>
          <span className="cursor-default hover:text-white/40 active:scale-95 transition-all">Focusing on What Matters</span>
          <span className="cursor-default hover:text-white/40 active:scale-95 transition-all">Building Human Centered AI</span>
        </div>
        <p className="text-white/40 text-sm font-light tracking-wide">
          © {new Date().getFullYear()} Idan David-Aviv. <br/>Built with the systems showcased in this site.
        </p>
      </div>
    </footer>
  )
}
