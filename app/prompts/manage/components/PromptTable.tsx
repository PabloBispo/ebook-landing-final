'use client'

import Link from 'next/link'
import { Edit, Trash2, Copy, Eye, GitBranch } from 'lucide-react'
import { useState } from 'react'
import { StatusBadge } from './StatusBadge'

interface PromptTableProps {
  prompts: any[]
  onRefresh: () => void
}

export function PromptTable({ prompts, onRefresh }: PromptTableProps) {
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este prompt?')) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/prompts/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        onRefresh()
      }
    } catch (error) {
      console.error('Failed to delete prompt:', error)
    } finally {
      setDeleting(null)
    }
  }

  const handleDuplicate = async (slug: string) => {
    try {
      const res = await fetch(`/api/prompts/${slug}/copy?duplicate=true`, {
        method: 'POST',
      })
      if (res.ok) {
        onRefresh()
      } else {
        alert('Erro ao duplicar prompt')
      }
    } catch (error) {
      console.error('Failed to duplicate prompt:', error)
      alert('Erro ao duplicar prompt')
    }
  }

  if (prompts.length === 0) {
    return (
      <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg">
        <div className="text-center py-20 px-4">
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Nenhum prompt encontrado</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Crie seu primeiro prompt para começar</p>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Prompt
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Categoria
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <GitBranch className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Versões
                </div>
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Views
                </div>
              </th>
              <th className="text-right px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {prompts.map((prompt) => (
              <tr
                key={prompt.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {prompt.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {prompt.alias}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {prompt.category && (
                    <span className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-base">{prompt.category?.icon}</span>
                      <span>{prompt.category?.name}</span>
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={prompt.status} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400 tabular-nums">
                    {prompt._count?.versions || 0}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400 tabular-nums">
                    {prompt.viewCount || 0}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 justify-end">
                    <Link
                      href={`/prompts/manage/${prompt.slug}/edit`}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" strokeWidth={1.5} />
                    </Link>
                    <button
                      onClick={() => handleDuplicate(prompt.slug)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                      title="Duplicar"
                    >
                      <Copy className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleDelete(prompt.id)}
                      disabled={deleting === prompt.id}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Deletar"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
