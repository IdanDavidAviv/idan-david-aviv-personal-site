import React from 'react'

/**
 * A reusable glassmorphic container.
 * Implements 'Premium UI DNA' patterns.
 */
export default function GlassCard({ children, className = "" }) {
    return (
        <div
            className={`
        p-6 
        bg-white/5 
        backdrop-blur-md 
        border border-white/10 
        rounded-2xl 
        shadow-xl 
        transition-all 
        duration-300 
        hover:bg-white/10 
        ${className}
      `}
        >
            {children}
        </div>
    )
}
