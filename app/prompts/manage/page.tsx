'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { StatsCards } from './components/StatsCards'
import { PromptTable } from './components/PromptTable'

interface Prompt {
  id: string
  slug: string
  alias: string
  title: string
  description: string
  status: string
  category: { name: string; icon: string } | null
  tags: { name: string }[]
  viewCount: number
  _count: { versions: number }
}

export default function AdminDashboard() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    status: 'all',
    category: 'all',
  })

  useEffect(() => {
    fetchAllPrompts()
  }, [])

  async function fetchAllPrompts() {
    setLoading(true)
    try {
      const res = await fetch('/api/prompts/manage')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setPrompts(data.data || [])
    } catch (error) {
      console.error('Failed to fetch prompts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPrompts = prompts.filter(prompt => {
    if (filter.status !== 'all' && prompt.status !== filter.status) return false
    if (filter.category !== 'all' && prompt.category?.name !== filter.category) return false
    return true
  })

  const stats = {
    total: prompts.length,
    published: prompts.filter(p => p.status === 'PUBLISHED').length,
    drafts: prompts.filter(p => p.status === 'DRAFT').length,
    archived: prompts.filter(p => p.status === 'ARCHIVED').length,
  }

  const categories = Array.from(
    new Set(prompts.map(p => p.category?.name).filter(Boolean))
  ) as string[]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Prompts</h1>
          <p className="text-muted-foreground mt-1">
            Crie, edite e organize seus prompts
          </p>
        </div>
        <Link
          href="/prompts/manage/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          Novo Prompt
        </Link>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={filter.status}
          onChange={e => setFilter({ ...filter, status: e.target.value })}
          className="px-4 py-2 border rounded-lg bg-background"
        >
          <option value="all">Todos os status</option>
          <option value="PUBLISHED">Publicados</option>
          <option value="DRAFT">Rascunhos</option>
          <option value="ARCHIVED">Arquivados</option>
        </select>

        <select
          value={filter.category}
          onChange={e => setFilter({ ...filter, category: e.target.value })}
          className="px-4 py-2 border rounded-lg bg-background"
        >
          <option value="all">Todas as categorias</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12">Carregando...</div>
      ) : (
        <PromptTable prompts={filteredPrompts} onRefresh={fetchAllPrompts} />
      )}
    </div>
  )
}
