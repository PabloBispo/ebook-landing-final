'use client'

import { CheckCircle2, Shield, Clock, Users } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const features = [
  '8 módulos completos em vídeo',
  'Templates profissionais de formatação',
  'Biblioteca com 100+ prompts testados',
  'Checklist de qualidade editorial',
  'Workshop bônus de Landing Pages',
  'Grupo exclusivo no WhatsApp',
  'Atualizações gratuitas vitalícias',
  'Certificado digital de conclusão',
  'Garantia incondicional de 7 dias',
]

const trustBadges = [
  {
    icon: Shield,
    text: 'Garantia de 7 dias',
  },
  {
    icon: Clock,
    text: 'Acesso vitalício',
  },
  {
    icon: Users,
    text: '500+ alunos',
  },
]

export function CTASection() {
  const regularPrice = 497
  const salePrice = 247
  const discount = Math.round(((regularPrice - salePrice) / regularPrice) * 100)
  const installments = 12
  const installmentValue = salePrice / installments

  return (
    <section id="checkout" className="py-20 gradient-hero relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse-glow delay-75" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </span>
            <span className="text-sm font-medium text-destructive">
              Oferta por tempo limitado
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Comece Hoje Sua Jornada de{' '}
            <span className="text-gradient">Criação de Ebooks</span>
          </h2>
        </div>

        {/* Pricing Card */}
        <div className="glass-card p-8 sm:p-12 hover-lift animate-scale-in relative">
          {/* Glow effect */}
          <div className="absolute inset-0 glow-primary rounded-xl opacity-50" />

          <div className="relative">
            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-2xl text-muted-foreground line-through">
                  {formatCurrency(regularPrice)}
                </span>
                <span className="px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-sm font-bold">
                  {discount}% OFF
                </span>
              </div>

              <div className="text-5xl sm:text-6xl font-bold mb-2">
                {formatCurrency(salePrice)}
              </div>

              <p className="text-muted-foreground">
                ou{' '}
                <span className="font-semibold text-foreground">
                  {installments}x de {formatCurrency(installmentValue)}
                </span>
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 30}ms`,
                  }}
                >
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#comprar"
              className="block w-full text-center px-8 py-5 rounded-xl bg-gradient-primary text-white font-bold text-lg hover-lift glow-primary transition-all duration-300 mb-6"
            >
              Garantir Minha Vaga Agora
            </a>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-border">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{badge.text}</span>
                  </div>
                )
              })}
            </div>

            {/* Security note */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              🔒 Pagamento seguro processado pelo Mercado Pago
            </p>
          </div>
        </div>

        {/* Guarantee box */}
        <div className="mt-8 p-6 glass-card text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/20 mb-4">
            <Shield className="h-6 w-6 text-success" />
          </div>
          <h3 className="font-bold text-xl mb-2">Garantia Incondicional de 7 Dias</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Teste todo o conteúdo sem riscos. Se não gostar, devolvemos 100% do seu investimento.
            Sem perguntas, sem burocracias.
          </p>
        </div>
      </div>
    </section>
  )
}
