'use client'

import { useState } from 'react'
import {
  Brain,
  GitBranch,
  Layers,
  Shield,
  Wrench,
  Target,
  Users,
  Sparkles,
  ClipboardCheck,
  Map,
  Settings,
  Layout,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Chapter {
  number: string
  icon: typeof Brain
  title: string
  solves: string
  deliverable: string
  phase: 'mindset' | 'decisions' | 'validation' | 'readiness' | 'setup'
}

const chapters: Chapter[] = [
  {
    number: '01',
    icon: Brain,
    title: '"Todo mundo ganha dinheiro com IA", menos você',
    solves: 'Por que a maioria falha com ebooks de IA',
    deliverable: 'Clareza sobre os 3 pilares',
    phase: 'mindset',
  },
  {
    number: '02',
    icon: GitBranch,
    title: 'Você Não Precisa Criar do Zero',
    solves: 'Escolher seu caminho: decupar, criar ou servir',
    deliverable: 'Perfil definido (A, B ou C)',
    phase: 'mindset',
  },
  {
    number: '03',
    icon: Layers,
    title: 'Tipos de Ebook e Funil',
    solves: 'Decidir qual tipo de ebook criar primeiro',
    deliverable: 'Tipo escolhido + posição no funil',
    phase: 'decisions',
  },
  {
    number: '04',
    icon: Shield,
    title: 'Princípios Anti-Robô',
    solves: 'Criar conteúdo que não parece IA genérica',
    deliverable: 'Framework de voz autoral',
    phase: 'decisions',
  },
  {
    number: '05',
    icon: Wrench,
    title: 'Trilha No-Code vs Code',
    solves: 'Montar sua stack de ferramentas',
    deliverable: 'Lista de ferramentas + custos',
    phase: 'decisions',
  },
  {
    number: '06',
    icon: Target,
    title: 'Validação de Nicho',
    solves: 'Confirmar que seu nicho tem demanda',
    deliverable: 'Nicho validado com dados',
    phase: 'validation',
  },
  {
    number: '07',
    icon: Users,
    title: 'Avatar Profundo',
    solves: 'Saber exatamente pra quem você escreve',
    deliverable: 'Avatar 4 Camadas preenchido',
    phase: 'validation',
  },
  {
    number: '08',
    icon: Sparkles,
    title: 'Promessa e Mecanismo Único',
    solves: 'Criar promessa específica e diferenciada',
    deliverable: 'Promessa + mecanismo documentados',
    phase: 'validation',
  },
  {
    number: '09',
    icon: ClipboardCheck,
    title: 'Checklist de Validação',
    solves: 'Verificar se está pronto pra produzir',
    deliverable: 'Score de prontidão (0-40)',
    phase: 'readiness',
  },
  {
    number: '10',
    icon: Map,
    title: 'Roadmap Pessoal',
    solves: 'Planejar seus próximos passos',
    deliverable: 'Cronograma personalizado',
    phase: 'readiness',
  },
  {
    number: 'E1',
    icon: Settings,
    title: 'Setup Hotmart/Kiwify',
    solves: 'Configurar plataforma de vendas',
    deliverable: 'Produto criado e pronto',
    phase: 'setup',
  },
  {
    number: 'E2',
    icon: Layout,
    title: 'Landing Pages v0/Lovable',
    solves: 'Criar página de vendas com IA',
    deliverable: 'Landing page funcional',
    phase: 'setup',
  },
]

const phases = [
  { id: 'mindset', label: 'Mentalidade', question: '"Por que?"', chapters: '01-02' },
  { id: 'decisions', label: 'Decisões', question: '"O quê?"', chapters: '03-05' },
  { id: 'validation', label: 'Validação', question: '"Pra quem?"', chapters: '06-08' },
  { id: 'readiness', label: 'Prontidão', question: '"Posso ir?"', chapters: '09-10' },
  { id: 'setup', label: 'Setup', question: '"Onde vendo?"', chapters: 'E1-E2' },
]

export function ModulesSection() {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null)
  const [activePhase, setActivePhase] = useState<string | null>(null)

  const filteredChapters = activePhase
    ? chapters.filter(c => c.phase === activePhase)
    : chapters

  return (
    <section id="modulos" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <p className="text-sm font-medium text-primary mb-2">Módulo 1: Fundamentos Estratégicos</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            12 capítulos.{' '}
            <span className="text-gradient">Tudo que você precisa para começar.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Cada capítulo tem conteúdo, templates, prompts e entregáveis práticos.
          </p>
        </div>

        {/* Journey visualization */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex items-center justify-center gap-2 min-w-max px-4">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex items-center">
                <button
                  onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                  className={cn(
                    'flex flex-col items-center p-4 rounded-xl transition-all duration-300',
                    activePhase === phase.id
                      ? 'bg-primary text-primary-foreground scale-105'
                      : 'bg-secondary/50 hover:bg-secondary'
                  )}
                >
                  <span className="text-xs font-medium opacity-80">[{phase.chapters}]</span>
                  <span className="font-bold">{phase.label}</span>
                  <span className="text-sm opacity-80">{phase.question}</span>
                </button>
                {index < phases.length - 1 && (
                  <div className="w-8 h-0.5 bg-border mx-1" />
                )}
              </div>
            ))}
          </div>
          {activePhase && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Mostrando capítulos da fase "{phases.find(p => p.id === activePhase)?.label}".{' '}
              <button
                onClick={() => setActivePhase(null)}
                className="text-primary hover:underline"
              >
                Ver todos
              </button>
            </p>
          )}
        </div>

        {/* Chapters list */}
        <div className="space-y-3">
          {filteredChapters.map((chapter, index) => {
            const Icon = chapter.icon
            const isExpanded = expandedChapter === chapter.number

            return (
              <div
                key={chapter.number}
                className="glass-card !p-0 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => setExpandedChapter(isExpanded ? null : chapter.number)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
                >
                  {/* Number */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">{chapter.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>

                  {/* Title */}
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">{chapter.title}</h3>
                    <p className="text-sm text-muted-foreground hidden sm:block">
                      {chapter.solves}
                    </p>
                  </div>

                  {/* Expand icon */}
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 text-muted-foreground transition-transform duration-300',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </button>

                {/* Expanded content */}
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    isExpanded ? 'max-h-40' : 'max-h-0'
                  )}
                >
                  <div className="px-4 pb-4 pt-2 border-t border-border">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          O que resolve
                        </p>
                        <p className="text-sm">{chapter.solves}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          Entregável
                        </p>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <p className="text-sm font-medium">{chapter.deliverable}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            + Templates preenchíveis + Prompts prontos + Workflows passo a passo
          </p>
          <a
            href="#checkout"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover-lift glow-primary transition-all duration-300"
          >
            Quero Acesso ao Módulo Completo
          </a>
        </div>
      </div>
    </section>
  )
}
