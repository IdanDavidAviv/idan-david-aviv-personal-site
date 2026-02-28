import React from 'react'

export default function Hero(){
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <img src="/assets/know_who.png" alt="hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">Idan David-Aviv</h1>
        <p className="mt-4 text-xl text-gray-300">AI Innovator · CTO · LLM Architect</p>
        <p className="mt-6 max-w-xl mx-auto text-gray-400">Building AI systems that feel alive — system architecture, LLM agents, & human-centered AI.</p>
      </div>
      <div className="absolute bottom-8 w-full flex justify-center z-10">
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#C28F2C] to-transparent rounded"></div>
      </div>
    </section>
  )
}

