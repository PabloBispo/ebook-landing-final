'use client'

import { useState, useEffect } from 'react'
import { PromptCard } from './components/PromptCard'
import { FilterBar } from './components/FilterBar'

interface Prompt {
  id: string
  slug: string
  alias: string
  title: string
  description: string
  category: { name: string; icon: string } | null
  tags: { name: string }[]
  copyCount: number
  _count: { versions: number }
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchPrompts()
  }, [selectedCategory])

  async function fetchPrompts() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory) params.set('category', selectedCategory)

      const res = await fetch(`/api/prompts?${params}`)
      const data = await res.json()
      setPrompts(data)
    } catch (error) {
      console.error('Failed to fetch prompts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            📚 Biblioteca de Prompts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Prompts testados e aprovados para criação com IA.
            Escolha, preencha e copie.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Loading */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 rounded-xl bg-secondary/20 animate-pulse" />
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && prompts.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {prompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && prompts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-bold mb-2">Nenhum prompt encontrado</p>
            <p className="text-muted-foreground">
              Tente ajustar os filtros
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
