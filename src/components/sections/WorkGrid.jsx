import React from 'react'
import useCVData from '@hooks/useCVData'
import Section from '@ui/Section'
import GlassCard from '@ui/GlassCard'

export default function WorkGrid() {
  const { rankedWork } = useCVData()

  return (
    <Section id="work" title="Selected Work">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rankedWork.map((it, idx) => (
          <GlassCard key={idx}>
            <h3 className="text-xl font-medium text-white">{it.section}</h3>
            <p className="mt-3 text-gray-400 leading-relaxed">
              {it.text.slice(0, 200)}...
            </p>
          </GlassCard>
        ))}
      </div>
    </Section>
  )
}

