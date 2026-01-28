'use client'

import { AlertCircle, Video, FileText, Image, Code } from 'lucide-react'

const capabilities = [
  { icon: Video, text: 'Vídeos que viralizam' },
  { icon: FileText, text: 'Textos que parecem escritos por humanos' },
  { icon: Image, text: 'Imagens que impressionam' },
  { icon: Code, text: 'Código que funciona de primeira' },
]

export function ProblemSection() {
  return (
    <section id="problema" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main heading */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            A frustração não é{' '}
            <span className="text-muted-foreground">não conhecer as ferramentas.</span>
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-primary">
            A frustração é não conseguir fazer nada útil com elas.
          </p>
        </div>

        {/* Content */}
        <div className="glass-card animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <p className="text-lg mb-6">
            Você já viu o que a IA consegue fazer:
          </p>

          {/* Capabilities grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {capabilities.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item.text}</span>
                </div>
              )
            })}
          </div>

          {/* Journey */}
          <div className="space-y-4 text-lg text-muted-foreground mb-8">
            <p>Instalou os apps. Testou as ferramentas. Assistiu os tutoriais.</p>
            <p className="font-semibold text-foreground">
              E mesmo assim... nada disso teve impacto real na sua vida.
            </p>
          </div>

          {/* Pain points */}
          <div className="border-l-4 border-destructive/50 pl-6 space-y-3 mb-8">
            <p className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <span>O ebook continua parado.</span>
            </p>
            <p className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <span>O curso nunca saiu do papel.</span>
            </p>
            <p className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <span>A renda extra ficou na promessa.</span>
            </p>
          </div>

          {/* Conclusion */}
          <div className="text-center pt-6 border-t border-border">
            <p className="text-lg text-muted-foreground mb-2">
              Você não precisa de mais uma ferramenta.
            </p>
            <p className="text-xl font-bold text-primary">
              Você precisa de um método que funciona.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
