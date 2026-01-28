'use client'

import { CheckCircle2 } from 'lucide-react'

const benefits = [
  'Crie ebooks profissionais em 3-5 dias usando IA',
  'Mantenha sua voz autoral única e autêntica',
  'Método validado com mais de 500 alunos',
  'Templates profissionais de formatação inclusos',
  'Biblioteca com 100+ prompts testados',
  'Aprenda a precificar e posicionar seu ebook',
  'Estratégias de lançamento de alta conversão',
  'Suporte em grupo exclusivo no WhatsApp',
  'Atualizações gratuitas do conteúdo',
  'Certificado de conclusão digital',
]

export function Benefits() {
  return (
    <section className="py-20 gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              O que você vai{' '}
              <span className="text-gradient">conquistar</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Tudo que você precisa para criar e vender ebooks de sucesso
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg hover:bg-secondary/50 transition-colors group animate-fade-in-up"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-foreground/90">{benefit}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href="#checkout"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover-lift glow-primary transition-all duration-300"
            >
              Quero Ter Acesso a Tudo Isso
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              Pagamento único • Acesso vitalício • Garantia de 7 dias
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
