'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Preciso saber programar?',
    answer:
      'Não. 70% do curso é no-code. ChatGPT + Canva resolvem a maioria dos casos. Se você sabe usar Google Docs, você consegue criar ebooks com IA. Mostramos quando vale a pena usar código - e quando não vale.',
  },
  {
    question: 'Funciona para qualquer nicho?',
    answer:
      'Depende. O método funciona, mas nem todo nicho tem demanda. Por isso o Capítulo 6 é dedicado a validação de nicho. Você vai descobrir se seu nicho tem potencial antes de criar.',
  },
  {
    question: 'E se eu já tenho conteúdo?',
    answer:
      'Melhor ainda. Você é Perfil A (Criador Orgânico). Vídeos, posts, lives, podcasts - tudo pode virar ebook. A Marina transformou vídeos do YouTube em R$ 14.006 em 3 meses.',
  },
  {
    question: 'E se eu não tenho nada criado?',
    answer:
      'Sem problema. Você é Perfil B (Explorador de Nicho). O Ricardo começou do zero e fez R$ 8.400 em 3 meses, sem audiência prévia. O curso ensina a pesquisar e criar do zero.',
  },
  {
    question: 'Posso oferecer como serviço?',
    answer:
      'Sim. Esse é o Perfil C (Prestador de Serviço). A Juliana fez R$ 43.000 com 18 clientes em 6 meses. O curso inclui precificação e processos para trabalhar com clientes.',
  },
  {
    question: 'Quanto tempo leva para criar um ebook?',
    answer:
      'Depende do seu perfil: Perfil A (com conteúdo): 3-5 dias. Perfil B (do zero): 5-10 dias. Perfil C (para cliente): varia com o projeto.',
  },
  {
    question: 'O conteúdo vai parecer feito por IA?',
    answer:
      'Não, se você seguir o método. O Capítulo 4 (Princípios Anti-Robô) ensina exatamente isso. Voz autoral, experiência real, opinião. Conteúdo que ressoa, não genérico.',
  },
  {
    question: 'A garantia é real?',
    answer:
      'Sim. 7 dias para testar todo o conteúdo. Não gostou? Devolvemos 100%. Sem perguntas, sem burocracia. Não fazemos escassez artificial. Não fingimos que nunca vamos vender.',
  },
  {
    question: 'O conteúdo fica disponível para sempre?',
    answer:
      'Sim. Pagamento único e acesso vitalício. Você pode revisar o conteúdo quantas vezes quiser, no seu ritmo. E ainda recebe todas as atualizações futuras gratuitamente.',
  },
  {
    question: 'Qual a forma de pagamento?',
    answer:
      'Aceitamos cartão de crédito (em até 12x), PIX e boleto bancário. O pagamento é processado pelo Mercado Pago, plataforma segura e confiável.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Perguntas{' '}
            <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Respondemos direto. Sem enrolação.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card overflow-hidden animate-fade-in-up"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-start justify-between gap-4 p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="font-semibold text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 text-muted-foreground">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-8 glass-card">
          <h3 className="font-bold text-xl mb-2">Ainda tem dúvidas?</h3>
          <p className="text-muted-foreground mb-4">
            pablofernando@live.com • Respondemos em até 24h úteis.
          </p>
          <a
            href="mailto:pablofernando@live.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover-lift transition-all duration-300"
          >
            Enviar Email
          </a>
        </div>
      </div>
    </section>
  )
}
