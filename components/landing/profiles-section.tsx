'use client'

import { useState } from 'react'
import { Users, Search, Briefcase, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useApp } from '@/contexts'

interface Profile {
  id: 'A' | 'B' | 'C'
  icon: typeof Users
  title: string
  subtitle: string
  whoIs: string
  situation: string
  focus: string
  example: {
    name: string
    result: string
    time: string
  }
  quote: string
  color: string
}

const profiles: Profile[] = [
  {
    id: 'A',
    icon: Users,
    title: 'Criador Orgânico',
    subtitle: 'Perfil A',
    whoIs: 'Já tem conteúdo (vídeos, posts, lives, podcasts)',
    situation: 'Quer transformar esse conteúdo em ebook',
    focus: 'Decupagem + diferenciação',
    example: {
      name: 'Marina',
      result: 'R$ 14.006',
      time: '3 meses',
    },
    quote: 'Você já tem o ouro. Só precisa lapidá-lo.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'B',
    icon: Search,
    title: 'Explorador de Nicho',
    subtitle: 'Perfil B',
    whoIs: 'Não tem conteúdo prévio',
    situation: 'Quer pesquisar e criar do zero',
    focus: 'Validação + pesquisa + criação',
    example: {
      name: 'Ricardo',
      result: 'R$ 8.400',
      time: '3 meses (sem audiência prévia)',
    },
    quote: 'Começar do zero não é desvantagem. É liberdade.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'C',
    icon: Briefcase,
    title: 'Prestador de Serviço',
    subtitle: 'Perfil C',
    whoIs: 'Quer oferecer criação de ebooks como serviço',
    situation: 'Trabalha para clientes',
    focus: 'Processo + ferramentas + precificação',
    example: {
      name: 'Juliana',
      result: 'R$ 43.000',
      time: '18 clientes em 6 meses',
    },
    quote: 'Transforme uma habilidade em um negócio.',
    color: 'from-purple-500 to-pink-500',
  },
]

const notForYou = [
  'Quem procura enriquecimento rápido',
  'Quem não quer colocar a mão na massa',
  'Quem espera que a IA faça tudo sozinha',
  'Quem quer apenas impressionar, não resolver',
]

export function ProfilesSection() {
  const { selectedProfile, setSelectedProfile } = useApp()
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null)

  return (
    <section id="perfis" className="py-20 gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Qual é o seu{' '}
            <span className="text-gradient">caminho?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Não existe fórmula única. Existe o que funciona pra você.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {profiles.map((profile, index) => {
            const Icon = profile.icon
            const isSelected = selectedProfile === profile.id
            const isHovered = hoveredProfile === profile.id

            return (
              <div
                key={profile.id}
                className={cn(
                  'glass-card cursor-pointer transition-all duration-300 animate-fade-in-up',
                  isSelected && 'ring-2 ring-primary',
                  isHovered && 'hover-lift'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProfile(profile.id)}
                onMouseEnter={() => setHoveredProfile(profile.id)}
                onMouseLeave={() => setHoveredProfile(null)}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      'p-3 rounded-xl bg-gradient-to-br',
                      profile.color
                    )}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{profile.subtitle}</p>
                    <h3 className="text-xl font-bold">{profile.title}</h3>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Quem é</p>
                    <p className="text-sm">{profile.whoIs}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Situação</p>
                    <p className="text-sm">{profile.situation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Foco no curso</p>
                    <p className="text-sm font-medium">{profile.focus}</p>
                  </div>
                </div>

                {/* Example */}
                <div className="p-4 rounded-lg bg-secondary/50 mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Exemplo real:</p>
                  <p className="font-bold text-lg">{profile.example.name}</p>
                  <p className="text-primary font-bold">{profile.example.result}</p>
                  <p className="text-xs text-muted-foreground">{profile.example.time}</p>
                </div>

                {/* Quote */}
                <p className="text-sm italic text-muted-foreground border-l-2 border-primary pl-3">
                  "{profile.quote}"
                </p>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-medium">Perfil selecionado</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Not for you section */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card border-destructive/20">
            <h3 className="text-xl font-bold mb-4 text-center">
              Para quem <span className="text-destructive">NÃO</span> é
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {notForYou.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        {selectedProfile && (
          <div className="mt-12 text-center animate-fade-in">
            <a
              href="#checkout"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover-lift glow-primary transition-all duration-300"
            >
              Começar como {profiles.find(p => p.id === selectedProfile)?.title}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
