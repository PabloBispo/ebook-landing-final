'use client'

import { ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { name: 'Marina', result: 'R$ 14.006', time: '3 meses' },
  { name: 'Juliana', result: 'R$ 43.000', time: '6 meses' },
  { name: 'Ricardo', result: 'R$ 8.400', time: 'sem audiência' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow delay-75" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <span className="text-sm font-bold text-primary">@bispo.ia</span>
              <span className="text-sm text-muted-foreground">O Engenheiro que Traduz</span>
            </div>

            {/* Main heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Você sabe o que a IA consegue fazer.
              </h1>
              <p className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground">
                Mas ainda não conseguiu fazer{' '}
                <span className="text-gradient font-bold">nada útil</span> com ela.
              </p>
            </div>

            {/* Subheading */}
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-semibold text-primary">
                Vamos te ajudar a tirar isso aí do papel.
              </p>
              <p className="text-lg text-muted-foreground max-w-xl">
                O ebook que você quer criar. O curso que nunca saiu do rascunho.
                Sem promessa de ficar rico. Com um método que funciona.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">70% não precisa programar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">3 caminhos diferentes</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">Casos reais com números</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#checkout"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover-lift glow-primary transition-all duration-300"
              >
                Quero Tirar do Papel
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#perfis"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm font-semibold hover-lift transition-all duration-300"
              >
                Qual é meu perfil?
              </Link>
            </div>

            {/* Social proof - Real numbers */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Resultados documentados:</p>
              <div className="flex flex-wrap gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50"
                  >
                    <span className="font-bold text-primary">{stat.result}</span>
                    <span className="text-sm text-muted-foreground">
                      {stat.name} • {stat.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Visual element */}
          <div className="relative animate-scale-in hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-accent blur-3xl opacity-20 scale-110 animate-pulse-glow" />

              {/* Central card */}
              <div className="relative h-full glass-card flex flex-col items-center justify-center text-center p-8">
                {/* Visual Placeholder */}
                <div className="w-full max-w-sm mb-8 relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 flex items-center justify-center relative overflow-hidden">
                    {/* Animated circles */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-primary/20 blur-2xl animate-pulse" />
                      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-accent/20 blur-2xl animate-pulse delay-75" />
                    </div>

                    {/* Icon placeholder */}
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">b.ia</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Instrumento, não fim</p>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="mb-8">
                  <p className="text-4xl font-bold mb-4">"</p>
                  <p className="text-xl font-medium mb-2">
                    Instrumento, não fim.
                  </p>
                  <p className="text-muted-foreground">
                    IA é martelo, não quadro na parede.
                    <br />
                    É o que você faz com ela que importa.
                  </p>
                </div>

                {/* Manifesto reference */}
                <div className="pt-6 border-t border-border w-full">
                  <p className="text-sm text-muted-foreground">
                    Onde a inteligência artificial
                    <br />
                    encontra a inteligência prática.
                  </p>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -left-4 lg:-left-8 top-8 glass-card p-4 rounded-xl animate-fade-in delay-75 hover-lift z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Anti-Robô</p>
                    <p className="text-sm font-bold">Voz autoral</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 lg:-right-8 bottom-8 glass-card p-4 rounded-xl animate-fade-in delay-100 hover-lift z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Resultados</p>
                    <p className="text-sm font-bold">Documentados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
