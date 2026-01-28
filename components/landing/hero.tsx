'use client'

import { ArrowRight, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow delay-75" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Masterclass Exclusiva
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Crie Ebooks Profissionais com{' '}
              <span className="text-gradient inline-block">
                IA em 3-5 Dias
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
              Aprenda a transformar seu conhecimento em ebooks de alta qualidade usando
              Inteligência Artificial, mantendo sua voz autoral e qualidade editorial.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">Sem experiência prévia</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">Método validado</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">Resultados em dias</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#checkout"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover-lift glow-primary transition-all duration-300"
              >
                Quero Começar Agora
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#modules"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm font-semibold hover-lift transition-all duration-300"
              >
                Ver Conteúdo
              </Link>
            </div>

            {/* Social proof */}
            <div className="pt-8 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">500+</span> pessoas já criaram seus ebooks
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Ebook mockup */}
          <div className="relative animate-scale-in">
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Glow effect behind mockup */}
              <div className="absolute inset-0 bg-gradient-accent blur-3xl opacity-30 scale-110 animate-pulse-glow" />

              {/* Mockup placeholder */}
              <div className="relative h-full glass-card p-8 hover-lift hover-glow group cursor-pointer">
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Seu Ebook</h3>
                  <p className="text-muted-foreground">
                    Visualize aqui como seu ebook ficará profissional e pronto para vender
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-colors" />
                </div>
              </div>

              {/* Floating stats */}
              <div className="absolute -left-4 top-1/4 glass-card p-4 rounded-xl animate-fade-in delay-75 hover-lift">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tempo médio</p>
                    <p className="text-sm font-bold">3-5 dias</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 glass-card p-4 rounded-xl animate-fade-in delay-100 hover-lift">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Qualidade</p>
                    <p className="text-sm font-bold">Profissional</p>
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
