/**
 * Footer Component - Elegant exit point for the site.
 */
export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        <p className="text-white/40 text-sm font-light tracking-wide">
          © {new Date().getFullYear()} Idan David-Aviv. Built with Performance & Spirit.
        </p>
        <div className="flex justify-center gap-6 text-white/20 text-xs uppercase tracking-[0.2em] font-medium">
          <span className="cursor-default">Design First</span>
          <span className="cursor-default">Type Safe</span>
          <span className="cursor-default">Premium Experience</span>
        </div>
      </div>
    </footer>
  )
}
