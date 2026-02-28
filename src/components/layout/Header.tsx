import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
                <Link to="/" className="text-xl font-bold tracking-tighter text-white hover:text-accent transition-colors">
                    IDAN<span className="text-secondary underline decoration-2 underline-offset-4">.LAB</span>
                </Link>
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
            </nav>
        </motion.header>
    )
}
