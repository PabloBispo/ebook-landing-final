'use client'

import { Zap, Target, TrendingUp, Shield, Clock, Award } from 'lucide-react'

const values = [
  {
    icon: Zap,
    title: 'Resultados Rápidos',
    description: 'Crie seu primeiro ebook profissional em apenas 3-5 dias, não meses.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Target,
    title: 'Foco e Clareza',
    description: 'Método passo a passo validado. Sem enrolação, direto ao ponto.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: TrendingUp,
    title: 'Escalável',
    description: 'Crie quantos ebooks quiser. O processo fica mais rápido a cada um.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Garantia Total',
    description: '7 dias para testar. Não gostou? Devolvemos 100% do investimento.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Clock,
    title: 'Acesso Vitalício',
    description: 'Pague uma vez, tenha acesso para sempre. Sem mensalidades.',
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Award,
    title: 'Suporte Premium',
    description: 'Grupo exclusivo de alunos e suporte direto para suas dúvidas.',
    color: 'from-indigo-500 to-violet-500',
  },
]

export function ValueProposition() {
  return (
    <section id="beneficios" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Por que escolher nossa{' '}
            <span className="text-gradient">Masterclass?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Transforme seu conhecimento em ebooks profissionais com um método validado e comprovado
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={value.title}
                className="group glass-card hover-lift hover-glow cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div className="mb-4">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${value.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl group-hover:from-primary/10 transition-all" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
