'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { StatsCards } from './components/StatsCards'
import { PromptTable } from './components/PromptTable'
import { ThemeToggle } from '@/components/ThemeToggle'

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Gerenciar Prompts
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Crie, edite e organize seus prompts de forma profissional
            </p>
          </div>
          <Link
            href="/prompts/manage/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-medium rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            <span>Novo Prompt</span>
          </Link>
        </div>

        {/* Stats */}
        <StatsCards stats={stats} />

        {/* Filters Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-5">
              Filtros
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Status</label>
                <select
                  value={filter.status}
                  onChange={e => setFilter({ ...filter, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-gray-900 dark:focus:border-gray-100 text-gray-900 dark:text-gray-100 text-sm"
                >
                  <option value="all">Todos os status</option>
                  <option value="PUBLISHED">Publicados</option>
                  <option value="DRAFT">Rascunhos</option>
                  <option value="ARCHIVED">Arquivados</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Categoria</label>
                <select
                  value={filter.category}
                  onChange={e => setFilter({ ...filter, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-gray-900 dark:focus:border-gray-100 text-gray-900 dark:text-gray-100 text-sm"
                >
                  <option value="all">Todas as categorias</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filters display */}
            {(filter.status !== 'all' || filter.category !== 'all') && (
              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">Ativos:</span>
                {filter.status !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    {filter.status}
                    <button
                      onClick={() => setFilter({ ...filter, status: 'all' })}
                      className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                      aria-label="Remover filtro de status"
                    >
                      <span className="text-base">×</span>
                    </button>
                  </span>
                )}
                {filter.category !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    {filter.category}
                    <button
                      onClick={() => setFilter({ ...filter, category: 'all' })}
                      className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                      aria-label="Remover filtro de categoria"
                    >
                      <span className="text-base">×</span>
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-gray-200 dark:border-gray-700 border-t-gray-900 dark:border-t-gray-100 rounded-full animate-spin" />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Carregando prompts...</p>
          </div>
        ) : (
          <PromptTable prompts={filteredPrompts} onRefresh={fetchAllPrompts} />
        )}
      </div>
    </div>
  )
}
