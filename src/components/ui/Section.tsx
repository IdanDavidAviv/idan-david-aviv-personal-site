import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

/**
 * Standard section wrapper for consistent spacing and premium layout.
 */
export default function Section({ children, className, id }: SectionProps) {
    return (
        <section id={id} className={cn("py-20 px-6 max-w-6xl mx-auto", className)}>
            {children}
        </section>
    )
}
