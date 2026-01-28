import { Header } from '@/components/landing/header'
import { Hero } from '@/components/landing/hero'
import { ValueProposition } from '@/components/landing/value-proposition'
import { Benefits } from '@/components/landing/benefits'
import { FAQ } from '@/components/landing/faq'
import { CTASection } from '@/components/landing/cta-section'
import { LeadCapture } from '@/components/landing/lead-capture'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <Hero />
        <ValueProposition />
        <Benefits />
        <FAQ />
        <CTASection />

        {/* Lead Capture Section */}
        <section className="py-20 bg-background">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <LeadCapture />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
