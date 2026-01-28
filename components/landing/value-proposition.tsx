'use client'

import { Sparkles, Users, Code2, TrendingUp, FileText, Target } from 'lucide-react'

const values = [
  {
    icon: Sparkles,
    title: 'Anti-Robô',
    description: 'Ensina a usar IA sem parecer genérico. Voz autoral, não template. Conteúdo que ressoa, não que entedia.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: '3 Perfis Diferentes',
    description: 'Não é one-size-fits-all. Criador Orgânico (A), Explorador de Nicho (B), ou Prestador de Serviço (C). Seu caminho, seu ritmo.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Code2,
    title: '70% No-Code',
    description: 'A maioria não precisa programar. ChatGPT + Canva resolvem. Mostramos quando cada ferramenta faz sentido.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: TrendingUp,
    title: 'Casos Reais',
    description: 'Números reais, não promessas vagas. Marina fez R$ 14.006. Juliana fez R$ 43.000. Ricardo fez R$ 8.400 sem audiência.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: FileText,
    title: 'Templates Preenchíveis',
    description: 'Não é teoria. É ferramenta pra usar hoje. Avatar 4 Camadas, Checklist de 40 pontos, Prompts testados.',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Target,
    title: 'Utilidade > Espetáculo',
    description: 'Edição bonita é legal por 15 segundos. Resolver problema real muda sua vida. Foco no que importa.',
    color: 'from-red-500 to-rose-500',
  },
]

export function ValueProposition() {
  return (
    <section id="beneficios" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">Instrumento, não fim.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            IA é martelo, não quadro na parede. É o que você faz com ela que importa.
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
