import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import DesignLab from '@/pages/DesignLab'
import SpiritResearchLabShowcase from '@/pages/SpiritResearchLabShowcase'
import AntigravityDNAShowcase from '@/pages/AntigravityDNAShowcase'
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

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design-lab" element={<DesignLab />} />
          <Route path="/spirit-research-lab" element={<SpiritResearchLabShowcase />} />
          <Route path="/antigravity-dna" element={<AntigravityDNAShowcase />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
