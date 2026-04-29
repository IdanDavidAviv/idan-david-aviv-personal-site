import { useEffect } from 'react'
import { VirgoHero } from '@/components/virgo/VirgoHero'
import { ReadingFatigue } from '@/components/virgo/ReadingFatigue'
import { CoreUseCases } from '@/components/virgo/CoreUseCases'
import { MCPEcosystem } from '@/components/virgo/MCPEcosystem'

export default function VirgoShowcase() {
    useEffect(() => {
        document.title = "Virgo — AI That Talks To You | Idan David-Aviv";
    }, [])
    
    return (
        <main className="min-h-screen w-full bg-black overflow-x-hidden selection:bg-[#cc00ff]/30 selection:text-white">
            {/* Global ambient background for the showcase */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-[#00f0ff]/5 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-[1000px] h-[1000px] bg-[#cc00ff]/5 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            <div className="relative z-10 flex flex-col w-full">
                <VirgoHero />
                <ReadingFatigue />
                <CoreUseCases />
                <MCPEcosystem />
            </div>
        </main>
    )
}
