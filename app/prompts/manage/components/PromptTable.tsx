'use client'

import Link from 'next/link'
import { Edit, Trash2, Copy } from 'lucide-react'
import { useState } from 'react'

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
      <div className="text-center py-12 border rounded-lg">
        <p className="text-muted-foreground">Nenhum prompt encontrado</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-4">Prompt</th>
            <th className="text-left p-4">Categoria</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Versões</th>
            <th className="text-left p-4">Views</th>
            <th className="text-right p-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {prompts.map(prompt => (
            <tr key={prompt.id} className="border-t hover:bg-muted/50">
              <td className="p-4">
                <div>
                  <p className="font-medium">{prompt.title}</p>
                  <p className="text-sm text-muted-foreground">{prompt.alias}</p>
                </div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 bg-secondary rounded text-sm">
                  {prompt.category?.icon} {prompt.category?.name}
                </span>
              </td>
              <td className="p-4">
                <StatusBadge status={prompt.status} />
              </td>
              <td className="p-4">{prompt._count?.versions || 0}</td>
              <td className="p-4">{prompt.viewCount || 0}</td>
              <td className="p-4">
                <div className="flex gap-2 justify-end">
                  <Link
                    href={`/prompts/manage/${prompt.slug}/edit`}
                    className="p-2 hover:bg-muted rounded transition-colors"
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDuplicate(prompt.slug)}
                    className="p-2 hover:bg-muted rounded transition-colors"
                    title="Duplicar"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(prompt.id)}
                    disabled={deleting === prompt.id}
                    className="p-2 hover:bg-muted rounded text-destructive transition-colors disabled:opacity-50"
                    title="Deletar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PUBLISHED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    DRAFT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    ARCHIVED: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  }
  return (
    <span className={`px-2 py-1 rounded text-sm font-medium ${colors[status] || colors.DRAFT}`}>
      {status}
    </span>
  )
}
