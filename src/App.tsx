import Hero from '@sections/Hero'
import About from '@sections/About'
import WorkGrid from '@sections/WorkGrid'
import Footer from '@layout/Footer'

/**
 * Main App Component - Orchestrating the Premium UI story.
 */
function App() {
  return (
    <div className="min-h-screen bg-base-bg text-white selection:bg-accent/30 flex flex-col items-center">
      {/* Texture Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('/assets/noise.png')]" />

      {/* Hero Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/20 blur-[120px] pointer-events-none opacity-50 z-0" />

      <main className="w-full relative z-10 flex flex-col items-center">
        <Hero />
        <About />
        <WorkGrid />
      </main>

      <Footer />
    </div>
  )
}

export default App
