import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import DesignLab from '@/pages/DesignLab'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

/**
 * Main App Component - Orchestrating the Premium UI story.
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-basebg text-white selection:bg-accent/30 flex flex-col items-center">
        {/* Texture Layer */}
        <div className="noise" />

        {/* Hero Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/20 blur-[120px] pointer-events-none opacity-50 z-0" />

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design-lab" element={<DesignLab />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
