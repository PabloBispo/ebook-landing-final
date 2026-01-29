'use client'

import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

interface PromptCardProps {
  prompt: {
    slug: string
    alias: string
    title: string
    description: string
    category: { name: string; icon: string } | null
    tags: { name: string }[]
    copyCount: number
    _count: { versions: number }
  }
}

export function PromptCard({ prompt }: PromptCardProps) {
  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      className="block group"
    >
      <div className="glass-card hover-lift h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {prompt.category && (
              <span className="text-2xl">{prompt.category.icon}</span>
            )}
            <span className="text-xs font-mono text-muted-foreground">
              {prompt.alias}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {prompt._count.versions} {prompt._count.versions === 1 ? 'versão' : 'versões'}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {prompt.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {prompt.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {prompt.tags.slice(0, 3).map(tag => (
            <span
              key={tag.name}
              className="px-2 py-1 rounded-md bg-secondary text-xs"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>{prompt.copyCount} cópias</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
