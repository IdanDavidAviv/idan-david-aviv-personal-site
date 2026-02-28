import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlassCardProps {
    children: ReactNode;
    className?: string;
}

/**
 * A reusable glassmorphic container for premium visual cards.
 */
export default function GlassCard({ children, className }: GlassCardProps) {
    return (
        <div className={cn(
            "p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl transition-all duration-300 hover:bg-white/10",
            className
        )}>
            {children}
        </div>
    )
}
