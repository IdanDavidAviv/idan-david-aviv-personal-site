import React from 'react'
import Section from '@ui/Section'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300 leading-relaxed">
          I bridge the gap between complex AI architectures and human experience.
          As a CTO and LLM Architect, my focus is on building intelligent systems
          that are not just powerful, but also intuitive and value-driven.
        </p>
      </div>
    </Section>
  )
}
