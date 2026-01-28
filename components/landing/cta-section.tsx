'use client'

import { CheckCircle2, Shield, Clock, Users } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const features = [
  '12 capítulos de fundamentos estratégicos',
  'Templates preenchíveis de Avatar e Validação',
  'Biblioteca de prompts testados',
  'Checklist de 40 pontos para prontidão',
  'Roadmap personalizado por perfil',
  'Setup completo Hotmart/Kiwify',
  'Workshop de Landing Pages',
  'Acesso vitalício + atualizações',
]

const trustBadges = [
  {
    icon: Shield,
    text: '7 dias de garantia',
  },
  {
    icon: Clock,
    text: 'Acesso vitalício',
  },
  {
    icon: Users,
    text: 'Casos documentados',
  },
]

export function CTASection() {
  const price = 247
  const installments = 12
  const installmentValue = price / installments

  return (
    <section id="checkout" className="py-20 gradient-hero relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse-glow delay-75" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - SEM ESCASSEZ ARTIFICIAL */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Pronto para{' '}
            <span className="text-gradient">tirar isso aí do papel?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Pagamento único. Acesso vitalício. Garantia de 7 dias.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="glass-card p-8 sm:p-12 hover-lift animate-scale-in relative">
          {/* Glow effect */}
          <div className="absolute inset-0 glow-primary rounded-xl opacity-50" />

          <div className="relative">
            {/* Price - SIMPLES, SEM TRUQUES */}
            <div className="text-center mb-8">
              <p className="text-muted-foreground mb-2">Investimento único</p>

              <div className="text-5xl sm:text-6xl font-bold mb-2">
                {formatCurrency(price)}
              </div>

              <p className="text-muted-foreground">
                ou{' '}
                <span className="font-semibold text-foreground">
                  {installments}x de {formatCurrency(installmentValue)}
                </span>
              </p>

              <p className="text-sm text-muted-foreground mt-2">
                Sem truque. Esse é o preço.
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
              Quero Tirar do Papel Agora
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
              Pagamento seguro processado pelo Mercado Pago
            </p>
          </div>
        </div>

        {/* Guarantee box - TOM HONESTO */}
        <div className="mt-8 p-6 glass-card text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/20 mb-4">
            <Shield className="h-6 w-6 text-success" />
          </div>
          <h3 className="font-bold text-xl mb-2">Garantia de 7 Dias</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            7 dias para testar todo o conteúdo. Não gostou? Devolvemos 100%. Sem perguntas.
          </p>
          <p className="text-sm text-muted-foreground italic">
            Não fingimos que nunca vamos vender. Mas vendemos quando faz sentido.
          </p>
        </div>
      </div>
    </section>
  )
}
