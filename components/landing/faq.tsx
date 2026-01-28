'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Preciso ter experiência com IA ou tecnologia?',
    answer:
      'Não! A masterclass foi criada para iniciantes. Explicamos tudo passo a passo, desde o básico até técnicas avançadas. Se você sabe usar o Google Docs, você consegue criar ebooks com IA.',
  },
  {
    question: 'Quanto tempo leva para criar um ebook?',
    answer:
      'Com nosso método, você consegue criar um ebook profissional em 3-5 dias. Isso inclui pesquisa, escrita, revisão e formatação. Quanto mais você pratica, mais rápido fica o processo.',
  },
  {
    question: 'As IAs são gratuitas ou preciso pagar?',
    answer:
      'Mostramos como usar tanto ferramentas gratuitas (ChatGPT, Claude) quanto pagas. Para começar, as versões gratuitas são suficientes. Conforme você escala, pode investir nas versões premium.',
  },
  {
    question: 'Posso usar este método para qualquer nicho?',
    answer:
      'Sim! O método funciona para qualquer área de conhecimento: desenvolvimento pessoal, negócios, culinária, saúde, tecnologia, etc. Mostramos exemplos práticos de vários nichos diferentes.',
  },
  {
    question: 'Como funciona a garantia de 7 dias?',
    answer:
      'Você tem 7 dias após a compra para testar todo o conteúdo. Se por qualquer motivo não gostar, basta enviar um email e devolvemos 100% do seu investimento, sem perguntas ou burocracias.',
  },
  {
    question: 'Vou aprender a vender o ebook também?',
    answer:
      'Sim! Além de criar, você aprende estratégias completas de precificação, posicionamento, criação de landing pages e lançamento. O objetivo é você ter um produto pronto para vender.',
  },
  {
    question: 'Recebo certificado ao concluir?',
    answer:
      'Sim! Ao completar os módulos e criar seu primeiro ebook, você recebe um certificado digital de conclusão que pode usar em seu portfólio ou redes sociais.',
  },
  {
    question: 'O conteúdo fica disponível para sempre?',
    answer:
      'Sim! É pagamento único e acesso vitalício. Você pode assistir as aulas quantas vezes quiser, no seu ritmo, sem pressa. E ainda recebe todas as atualizações futuras gratuitamente.',
  },
  {
    question: 'Tem suporte caso eu tenha dúvidas?',
    answer:
      'Sim! Você entra em um grupo exclusivo no WhatsApp com outros alunos e tem suporte direto para tirar dúvidas. Além disso, fazemos lives mensais para Q&A e compartilhar cases de sucesso.',
  },
  {
    question: 'Qual a forma de pagamento?',
    answer:
      'Aceitamos cartão de crédito (em até 12x), PIX e boleto bancário. O pagamento é processado pela Mercado Pago, uma das plataformas mais seguras do Brasil.',
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
            Tire todas as suas dúvidas antes de começar
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
            Entre em contato conosco. Respondemos em até 24 horas.
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
