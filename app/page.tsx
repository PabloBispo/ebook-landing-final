import {
  Header,
  Hero,
  ProblemSection,
  ValueProposition,
  ProfilesSection,
  ModulesSection,
  TestimonialsSection,
  FAQ,
  CTASection,
  LeadCapture,
  Footer,
} from '@/components/landing'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* 1. Hero - Promessa principal */}
        <Hero />

        {/* 2. Problema - A frustração de não fazer nada útil */}
        <ProblemSection />

        {/* 3. Diferenciais - Por que é diferente */}
        <ValueProposition />

        {/* 4. Perfis - Os 3 caminhos (A, B, C) */}
        <ProfilesSection />

        {/* 5. Módulos - Estrutura do curso */}
        <ModulesSection />

        {/* 6. Casos - Números reais */}
        <TestimonialsSection />

        {/* 7. FAQ - Dúvidas frequentes */}
        <FAQ />

        {/* 8. CTA - Checkout */}
        <CTASection />

        {/* 9. Lead Capture - Email list */}
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
