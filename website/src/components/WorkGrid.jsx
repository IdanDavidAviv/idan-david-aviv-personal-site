import React from 'react'
import cv from '../data/cv_parsed.json'

export default function WorkGrid(){
  const items = cv?.ranked || []
  return (
    <section id="work" className="py-12">
      <h2 className="text-2xl font-semibold">Selected Work</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((it, idx)=>(
          <div key={idx} className="p-6 bg-black/30 rounded-lg">
            <h3 className="font-medium">{it.section}</h3>
            <p className="mt-2 text-gray-400">{it.text.slice(0,200)}...</p>
          </div>
        ))}
      </div>
    </section>
  )
}

