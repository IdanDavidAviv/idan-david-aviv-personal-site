import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import WorkGrid from './components/WorkGrid'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen text-gray-200">
      <Hero />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <About />
        <WorkGrid />
      </main>
      <Footer />
    </div>
  )
}

