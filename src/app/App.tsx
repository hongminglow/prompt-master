import { FAQ } from '../sections/FAQ'
import { Features } from '../sections/Features'
import { FinalCTA } from '../sections/FinalCTA'
import { Footer } from '../sections/Footer'
import { Hero } from '../sections/Hero'
import { HowItWorks } from '../sections/HowItWorks'
import { Navbar } from '../sections/Navbar'
import { Pricing } from '../sections/Pricing'
import { ScrollChapters } from '../sections/ScrollChapters'
import { SocialProof } from '../sections/SocialProof'
import { Testimonials } from '../sections/Testimonials'

export default function App() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium focus:text-[#05060a]"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="content" className="min-h-svh">
        <Hero />
        <SocialProof />
        <Features />
        <ScrollChapters />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}

