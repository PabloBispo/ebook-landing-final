'use client'

import { useState } from 'react'
import { VersionCreator } from './VersionCreator'
import { Trash2, Check, Clock } from 'lucide-react'

interface PromptVersion {
  id: string
  version: string | null
  modelTag: string
  content: string
  isRecommended: boolean
  notes?: string | null
  createdAt: string
}

interface VersionManagerProps {
  promptId: string
  versions: PromptVersion[]
  onVersionCreated: () => void
}

const MODEL_LABELS: Record<string, { name: string; color: string }> = {
  UNIVERSAL: { name: 'Universal', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  CHATGPT_4: { name: 'GPT-4', color: 'bg-green-50 text-green-700 border-green-200' },
  CHATGPT_35: { name: 'GPT-3.5', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  CLAUDE_OPUS: { name: 'Claude Opus', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  CLAUDE_SONNET: { name: 'Claude Sonnet', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  GEMINI_2_FLASH: { name: 'Gemini 2.0 Flash', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  GEMINI_15_PRO: { name: 'Gemini 1.5 Pro', color: 'bg-teal-50 text-teal-700 border-teal-200' },
}

export function VersionManager({ promptId, versions, onVersionCreated }: VersionManagerProps) {
  const [selectedModel, setSelectedModel] = useState<string>('UNIVERSAL')
  const [showCreator, setShowCreator] = useState(false)
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null)
  const [deletingVersion, setDeletingVersion] = useState<string | null>(null)

  // Group versions by model
  const versionsByModel = versions.reduce((acc, version) => {
    const model = version.modelTag || 'UNIVERSAL'
    if (!acc[model]) {
      acc[model] = []
    }
    acc[model].push(version)
    return acc
  }, {} as Record<string, PromptVersion[]>)

  // Get unique models that have versions
  const availableModels = Object.keys(versionsByModel).sort((a, b) => {
    // Universal first, then alphabetically
    if (a === 'UNIVERSAL') return -1
    if (b === 'UNIVERSAL') return 1
    return a.localeCompare(b)
  })

  const currentVersions = versionsByModel[selectedModel] || []

  const handleDeleteVersion = async (versionId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta versão?')) {
      return
    }

    setDeletingVersion(versionId)
    try {
      const response = await fetch(`/api/admin/prompts/${promptId}/versions/${versionId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        onVersionCreated() // Refresh the list
      } else {
        const data = await response.json()
        alert(data.error || 'Erro ao deletar versão')
      }
    } catch (error) {
      console.error('Error deleting version:', error)
      alert('Erro ao deletar versão')
    } finally {
      setDeletingVersion(null)
    }
  }

  const handleMarkRecommended = async (versionId: string, modelTag: string) => {
    try {
      const response = await fetch(`/api/admin/prompts/${promptId}/versions/${versionId}/recommend`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelTag }),
      })

      if (response.ok) {
        onVersionCreated() // Refresh the list
      } else {
        const data = await response.json()
        alert(data.error || 'Erro ao marcar como recomendada')
      }
    } catch (error) {
      console.error('Error marking as recommended:', error)
      alert('Erro ao marcar como recomendada')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Versões do Prompt</h2>
          <p className="text-sm text-gray-600 mt-1">
            Gerencie versões otimizadas para diferentes modelos de IA
          </p>
        </div>
        <button
          onClick={() => setShowCreator(true)}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          + Nova Versão
        </button>
      </div>

      {/* Model Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4 overflow-x-auto pb-px">
          {availableModels.map((model) => {
            const modelInfo = MODEL_LABELS[model]
            const count = versionsByModel[model]?.length || 0
            const isActive = selectedModel === model

            return (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {modelInfo?.name || model}
                <span className="ml-2 text-xs opacity-70">({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Versions List */}
      <div className="space-y-3">
        {currentVersions.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-gray-600 mb-4">Nenhuma versão para este modelo</p>
            <button
              onClick={() => setShowCreator(true)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Criar primeira versão
            </button>
          </div>
        ) : (
          currentVersions.map((version) => {
            const isExpanded = expandedVersion === version.id
            const isDeleting = deletingVersion === version.id
            const canDelete = currentVersions.length > 1

            return (
              <div
                key={version.id}
                className="border border-gray-200 rounded-md overflow-hidden bg-white hover:border-gray-300 transition-colors"
              >
                {/* Version Header */}
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-mono text-sm font-medium text-gray-900">
                        {version.version || 'v1'}
                      </h3>
                      {version.isRecommended && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          <Check className="h-3 w-3" />
                          Recomendada
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {formatDate(version.createdAt)}
                      </span>
                    </div>
                    {version.notes && (
                      <p className="text-sm text-gray-600 mb-2">{version.notes}</p>
                    )}
                    <button
                      onClick={() => setExpandedVersion(isExpanded ? null : version.id)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {isExpanded ? 'Ocultar conteúdo' : 'Ver conteúdo'}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!version.isRecommended && (
                      <button
                        onClick={() => handleMarkRecommended(version.id, version.modelTag)}
                        className="px-3 py-1.5 text-xs font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Marcar recomendada
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => handleDeleteVersion(version.id)}
                        disabled={isDeleting}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                        title="Deletar versão"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 p-4">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
                      {version.content}
                    </pre>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Version Creator Modal */}
      {showCreator && (
        <VersionCreator
          promptId={promptId}
          defaultModel={selectedModel}
          onClose={() => setShowCreator(false)}
          onCreated={() => {
            setShowCreator(false)
            onVersionCreated()
          }}
        />
      )}
    </div>
  )
}
