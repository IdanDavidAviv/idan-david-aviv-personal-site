import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Home from '@/pages/Home'
import DesignLab from '@/pages/DesignLab'
import SpiritResearchLabShowcase from '@/pages/SpiritResearchLabShowcase'
import VirgoDNAShowcase from '@/pages/VirgoDNAShowcase'
import VirgoShowcase from '@/pages/VirgoShowcase'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GlobalBackground from '@/components/layout/GlobalBackground'

/**
 * Handles smooth scrolling to anchor links (like #contact) across page navigations.
 */
function ScrollManager() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If we just digested a hash, don't trigger a scroll event (prevents bounce to top)
    if (location.state && (location.state as { noScroll?: boolean }).noScroll) return;

    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Slight delay to ensure React has rendered the new page DOM
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });

          // Digest the hash so the URL is clean and ready for the next click
          setTimeout(() => {
            navigate(location.pathname + location.search, { replace: true, state: { noScroll: true } });
          }, 800);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, navigate]);

  return null;
}

/**
 * Main App Component - Orchestrating the Premium UI story.
 */
function App() {
  return (
    <Router>
      <ScrollManager />
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
          <Route path="/virgo" element={<VirgoShowcase />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
