import React from 'react'
import Hero from '@sections/Hero'
import About from '@sections/About'
import WorkGrid from '@sections/WorkGrid'
import Footer from '@components/layout/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-basebg text-gray-200 selection:bg-accent/30">
      <Hero />
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-24">
        <About />
        <WorkGrid />
      </main>
      <Footer />
    </div>
  )
}

