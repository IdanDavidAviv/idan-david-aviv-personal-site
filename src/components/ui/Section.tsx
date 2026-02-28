import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    fullWidth?: boolean;
}

/**
 * Standard section wrapper for consistent spacing and premium layout.
 */
export default function Section({ children, className, id, fullWidth = false }: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                "py-20 px-6",
                !fullWidth && "max-w-6xl mx-auto",
                className
            )}
        >
            {children}
        </section>
    )
}
