import React from 'react'

/**
 * Standard section wrapper for consistent spacing.
 * Uses logical properties (padding-inline) for RTL/LTR safety.
 */
export default function Section({ id, title, children, className = "" }) {
    return (
        <section id={id} className={`py-12 ${className}`}>
            {title && <h2 className="text-2xl font-semibold mb-6">{title}</h2>}
            {children}
        </section>
    )
}
