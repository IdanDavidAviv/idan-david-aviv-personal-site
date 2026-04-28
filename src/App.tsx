import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import DesignLab from '@/pages/DesignLab'
import SpiritResearchLabShowcase from '@/pages/SpiritResearchLabShowcase'
import VirgoDNAShowcase from '@/pages/VirgoDNAShowcase'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GlobalBackground from '@/components/layout/GlobalBackground'

/**
 * Main App Component - Orchestrating the Premium UI story.
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen text-white selection:bg-accent/30 flex flex-col items-center">
        <GlobalBackground />
        {/* Texture Layer */}
        <div className="noise" />

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          {import.meta.env.DEV && (
            <Route path="/design-lab" element={<DesignLab />} />
          )}
          <Route path="/spirit-research-lab" element={<SpiritResearchLabShowcase />} />
          <Route path="/virgo-dna" element={<VirgoDNAShowcase />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
