import React from 'react'
import useCVData from '@hooks/useCVData'

export default function Hero() {
  const { personalInfo } = useCVData()

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <img
        src="/assets/know_who.png"
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          {personalInfo.name}
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-accent font-medium uppercase tracking-widest">
          {personalInfo.title}
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed">
          {personalInfo.summary}
        </p>
      </div>

      <div className="absolute bottom-12 w-full flex justify-center z-10">
        <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full opacity-50"></div>
      </div>
    </section>
  )
}

