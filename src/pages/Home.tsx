import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import WorkGrid from '@/components/sections/WorkGrid'
import Contact from '@/components/sections/Contact'

/**
 * Home Page - The primary landing page.
 */
export default function Home() {
    return (
        <main className="w-full relative z-10 flex flex-col items-center bg-transparent">
            <Hero />
            <About />
            <WorkGrid />
            <Contact />
        </main>
    )
}
