import { useEffect } from 'react'
import AIBrainHero from '@/components/ai-brain/AIBrainHero'
import AIBrainContrast from '@/components/ai-brain/AIBrainContrast'
import AIBrainBento from '@/components/ai-brain/AIBrainBento'
import AIBrainStepper from '@/components/ai-brain/AIBrainStepper'
import AIBrainRealityCheck from '@/components/ai-brain/AIBrainRealityCheck'
import AIBrainConversion from '@/components/ai-brain/AIBrainConversion'
import AIBrainFloatingCTA from '@/components/ai-brain/AIBrainFloatingCTA'

/**
 * AIBrainPage - Commercial Flagship Offering Page (/ai-brain)
 * Modular orchestration of all 7 core sections with full RTL compliance.
 */
export default function AIBrainPage() {
  useEffect(() => {
    document.title = "מוח AI לעסק | עידן דוד אביב"
    window.scrollTo(0, 0)
  }, [])

  return (
    <div dir="rtl" className="w-full min-h-screen pt-24 pb-20 selection:bg-idan-david-aviv-cyan/30 text-white">
      <AIBrainHero />
      <AIBrainContrast />
      <AIBrainBento />
      <AIBrainStepper />
      <AIBrainRealityCheck />
      <AIBrainConversion />
      <AIBrainFloatingCTA />
    </div>
  )
}
