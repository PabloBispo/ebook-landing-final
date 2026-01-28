'use client'

import { useState } from 'react'
import { Users, Search, Briefcase, Code, Zap, Quote, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Testimonial {
  id: string
  name: string
  profile: 'A' | 'B' | 'C' | 'nocode' | 'automation'
  profileLabel: string
  icon: typeof Users
  context: string
  action: string
  result: string
  timeline: string
  highlight?: string
  color: string
}

const testimonials: Testimonial[] = [
  {
    id: 'marina',
    name: 'Marina',
    profile: 'A',
    profileLabel: 'Criador Orgânico',
    icon: Users,
    context: 'Tinha canal no YouTube com 15k inscritos',
    action: 'Transformou vídeos em ebook de desenvolvimento pessoal',
    result: 'R$ 14.006',
    timeline: '3 meses',
    highlight: 'Tempo até primeiro ebook: 5 dias',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'ricardo',
    name: 'Ricardo',
    profile: 'B',
    profileLabel: 'Explorador de Nicho',
    icon: Search,
    context: 'Sem audiência prévia, começou do zero',
    action: 'Pesquisou nicho de produtividade para devs',
    result: 'R$ 8.400',
    timeline: '3 meses',
    highlight: 'Sem audiência prévia',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'juliana',
    name: 'Juliana',
    profile: 'C',
    profileLabel: 'Prestadora de Serviço',
    icon: Briefcase,
    context: 'Queria renda extra como freelancer',
    action: 'Oferece criação de ebooks como serviço',
    result: 'R$ 43.000',
    timeline: '18 clientes em 6 meses',
    highlight: 'Ticket médio: R$ 2.388 por cliente',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'laura',
    name: 'Laura',
    profile: 'nocode',
    profileLabel: 'No-Code',
    icon: Zap,
    context: 'Não sabia programar',
    action: 'Usou só ChatGPT + Canva',
    result: 'R$ 6.240',
    timeline: '60 dias',
    highlight: 'Ferramentas: 100% no-code',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'thiago',
    name: 'Thiago',
    profile: 'automation',
    profileLabel: 'Automação',
    icon: Code,
    context: 'Dev que automatizou o processo',
    action: 'Criou sistema de produção em escala',
    result: 'R$ 18-21k/mês',
    timeline: 'Recorrente',
    highlight: 'Modelo: SaaS + serviço',
    color: 'from-red-500 to-rose-500',
  },
]

export function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState<string>('marina')
  const active = testimonials.find(t => t.id === activeTestimonial) || testimonials[0]

  return (
    <section id="casos" className="py-20 gradient-hero">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Números reais. Pessoas reais.{' '}
            <span className="text-gradient">Resultados documentados.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Sem promessas vagas. Sem "potencial de ganhos". Só o que aconteceu de verdade.
          </p>
        </div>

        {/* Testimonial selector - Mobile */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 md:hidden">
          {testimonials.map((testimonial) => {
            const Icon = testimonial.icon
            const isActive = activeTestimonial === testimonial.id

            return (
              <button
                key={testimonial.id}
                onClick={() => setActiveTestimonial(testimonial.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 hover:bg-secondary'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{testimonial.name}</span>
              </button>
            )
          })}
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-5 gap-8">
          {/* Selector - Desktop */}
          <div className="hidden md:flex flex-col gap-2">
            {testimonials.map((testimonial) => {
              const Icon = testimonial.icon
              const isActive = activeTestimonial === testimonial.id

              return (
                <button
                  key={testimonial.id}
                  onClick={() => setActiveTestimonial(testimonial.id)}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 hover:bg-secondary'
                  )}
                >
                  <div
                    className={cn(
                      'p-2 rounded-lg',
                      isActive ? 'bg-white/20' : 'bg-background'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-xs opacity-80">{testimonial.profileLabel}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active testimonial card */}
          <div className="md:col-span-4">
            <div className="glass-card h-full animate-fade-in" key={active.id}>
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={cn(
                    'p-4 rounded-xl bg-gradient-to-br',
                    active.color
                  )}
                >
                  <active.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{active.profileLabel}</p>
                  <h3 className="text-2xl font-bold">{active.name}</h3>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-3xl font-bold text-primary">{active.result}</p>
                  <p className="text-sm text-muted-foreground">{active.timeline}</p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Contexto
                  </p>
                  <p>{active.context}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    O que fez
                  </p>
                  <p>{active.action}</p>
                </div>
                {active.highlight && (
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="font-medium text-primary">{active.highlight}</p>
                  </div>
                )}
              </div>

              {/* Quote */}
              <div className="flex items-start gap-3 pt-6 border-t border-border">
                <Quote className="h-8 w-8 text-muted-foreground/30 flex-shrink-0" />
                <p className="text-muted-foreground italic">
                  Caso documentado no curso. Números reais, não estimativas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Esses são apenas alguns dos casos documentados no curso.
          </p>
          <a
            href="#checkout"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover-lift glow-primary transition-all duration-300"
          >
            Quero Ver Meu Nome Aqui
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
