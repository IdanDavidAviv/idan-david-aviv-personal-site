import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Brain, Dna, FlaskConical, Sparkles } from 'lucide-react'

/**
 * Global Header - Minimalist, floating navigation.
 */
export default function Header() {
    const location = useLocation()
    const isAIBrain = location.pathname.startsWith('/ai-brain')
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-[500] h-20 flex items-center justify-between px-6 md:px-12 pointer-events-none"
        >

            <nav className="flex items-center gap-3 md:gap-8 pointer-events-auto overflow-x-auto hide-scrollbar snap-x w-full max-w-full px-4 sm:px-2 py-6 -my-6">
                <Link
                    to="/"
                    className={cn(
                        "px-4 py-2 rounded-full border border-[#1d4ed8]/60 bg-[#1d4ed8]/15",
                        "text-sm font-medium text-white hover:bg-[#1d4ed8]/25 hover:border-[#1d4ed8]/80 transition-all",
                        "backdrop-blur-md flex items-center gap-2 group shadow-[0_0_22px_-2px_rgba(29,78,216,0.9)]",
                        "whitespace-nowrap snap-center active:scale-95 touch-manipulation"
                    )}>
                    <Brain className="w-5 h-5 text-[#60a5fa] group-hover:rotate-12 transition-transform" />
                    Me
                </Link>
                <Link
                    to="/ai-brain"
                    className={cn(
                        "px-4 py-2 rounded-full border border-white/80 bg-white/15",
                        "text-sm font-semibold text-white hover:bg-white/25 hover:border-white transition-all",
                        "backdrop-blur-md flex items-center gap-2 group shadow-[0_0_25px_rgba(255,255,255,0.55)]",
                        "whitespace-nowrap snap-center active:scale-95 touch-manipulation"
                    )}
                >
                    <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                    AI Brain
                </Link>
                {!isAIBrain && (
                    <>
                        <Link
                            to="/virgo"
                            className={cn(
                                "px-4 py-2 rounded-full border border-idan-david-aviv-cyan/20 bg-idan-david-aviv-cyan/10",
                                "text-sm font-medium text-white hover:bg-idan-david-aviv-cyan/20 transition-all",
                                "backdrop-blur-md flex items-center gap-2 group shadow-[0_0_15px_-3px_rgba(44,179,241,0.5)]",
                                "whitespace-nowrap snap-center active:scale-95 touch-manipulation"
                            )}
                        >
                            <span className="text-idan-david-aviv-cyan/80 group-hover:rotate-12 transition-transform font-serif font-bold text-base leading-none -mt-0.5">♍︎</span>
                            Virgo
                        </Link>
                        <Link
                            to="/virgo-dna"
                            className={cn(
                                "px-4 py-2 rounded-full border border-idan-david-aviv-gold/20 bg-idan-david-aviv-gold/10",
                                "text-sm font-medium text-white hover:bg-idan-david-aviv-gold/20 transition-all",
                                "backdrop-blur-md flex items-center gap-2 group shadow-[0_0_16px_-3px_rgba(195,140,18,0.7)]",
                                "whitespace-nowrap snap-center active:scale-95 touch-manipulation"
                            )}
                        >
                            <Dna className="w-6 h-6 text-idan-david-aviv-gold/60 group-hover:rotate-12 transition-transform" />
                            Virgo DNA
                        </Link>
                        <Link
                            to="/spirit-research-lab"
                            className={cn(
                                "px-4 py-2 rounded-full border border-idan-david-aviv-purple/20 bg-idan-david-aviv-purple/10",
                                "text-sm font-medium text-white hover:bg-idan-david-aviv-purple/20 transition-all",
                                "backdrop-blur-md flex items-center gap-2 group shadow-[0_0_15px_-3px_rgba(122,43,189,0.8)]",
                            "whitespace-nowrap snap-center active:scale-95 touch-manipulation"
                            )}
                        >
                            <FlaskConical className="w-4 h-4 text-idan-david-aviv-purple/60 group-hover:rotate-12 transition-transform" />
                            Spirit Research Lab
                        </Link>
                        {import.meta.env.DEV && (
                            <Link
                                to="/design-lab"
                                className={cn(
                                    "px-4 py-2 rounded-full border border-white/10 bg-white/5",
                                    "text-sm font-medium text-white/90 hover:bg-white/10 transition-all",
                                    "backdrop-blur-md",
                                    "whitespace-nowrap snap-center active:scale-95 touch-manipulation"
                                )}
                            >
                                Design Lab
                            </Link>
                        )}
                    </>
                )}
            </nav>
        </motion.header>
    )
}
