import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Dna } from 'lucide-react'

/**
 * Global Header - Minimalist, floating navigation.
 */
export default function Header() {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-[100] h-20 flex items-center justify-between px-6 md:px-12 pointer-events-none"
        >
            <div className="flex items-center gap-2 pointer-events-auto">
                {/* IDAN.LAB branding removed per user request */}
            </div>

            <nav className="flex items-center gap-8 pointer-events-auto">
                <Link
                    to="/"
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                    Work
                </Link>
                <Link
                    to="/design-lab"
                    className={cn(
                        "px-4 py-2 rounded-full border border-white/10 bg-white/5",
                        "text-sm font-medium text-white/90 hover:bg-white/10 transition-all",
                        "backdrop-blur-md"
                    )}
                >
                    Design Lab
                </Link>
                <Link
                    to="/spirit-research-lab"
                    className={cn(
                        "px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/10",
                        "text-sm font-medium text-gold-100 hover:bg-gold-500/20 transition-all",
                        "backdrop-blur-md font-bold"
                    )}
                >
                    Spirit Research Lab
                </Link>
                <Link
                    to="/antigravity-dna"
                    className={cn(
                        "px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10",
                        "text-sm font-medium text-purple-100 hover:bg-purple-500/20 transition-all",
                        "backdrop-blur-md flex items-center gap-2 group shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]"
                    )}
                >
                    <Dna className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
                    Antigravity DNA
                </Link>
            </nav>
        </motion.header>
    )
}
