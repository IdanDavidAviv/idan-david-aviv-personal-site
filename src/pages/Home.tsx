import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import WorkGrid from '@/components/sections/WorkGrid'

/**
 * Home Page - The primary landing page.
 */
export default function Home() {
    return (
        <main className="w-full relative z-10 flex flex-col items-center">
            <Hero />
            <About />
            <WorkGrid />
        </main>
    )
}
