import React from 'react'
import cv from '../data/cv_parsed.json' // static copy

export default function About(){
  const summary = cv?.summary || "AI Innovator.";
  return (
    <section id="about" className="py-12">
      <h2 className="text-2xl font-semibold">About</h2>
      <p className="mt-4 text-gray-300 max-w-prose">{summary}</p>
    </section>
  )
}

