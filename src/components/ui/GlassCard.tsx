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
            "p-6 bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl transition-all duration-500 hover:bg-white/10",
            className
        )}>
            {children}
        </div>
    )
}
