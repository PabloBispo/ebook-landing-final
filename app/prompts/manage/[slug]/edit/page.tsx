'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PromptForm } from '../../components/PromptForm'
import { VersionManager } from '../../components/VersionManager'

export default function EditPromptPage() {
  const params = useParams()
  const router = useRouter()
  const [prompt, setPrompt] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'versions'>('details')

  const fetchPrompt = () => {
    fetch(`/api/prompts/${params.slug}`)
      .then(res => res.json())
      .then(data => setPrompt(data.data))
  }

  useEffect(() => {
    fetchPrompt()
  }, [params.slug])

  const handleSubmit = async (data: any) => {
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/prompts/${(prompt as any).id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        alert('Prompt atualizado!')
        router.push('/prompts/manage')
      } else {
        alert('Erro ao atualizar prompt')
      }
    } catch (error) {
      console.error('Error updating prompt:', error)
      alert('Erro ao atualizar prompt')
    } finally {
      setLoading(false)
    }
  }

  if (!prompt) return <div className="p-8">Carregando...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Editar Prompt</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            Detalhes do Prompt
          </button>
          <button
            onClick={() => setActiveTab('versions')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'versions'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            Versões
            <span className="ml-2 text-xs opacity-70">
              ({(prompt as any).versions?.length || 0})
            </span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'details' && (
        <PromptForm
          initialData={prompt}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}

      {activeTab === 'versions' && (
        <VersionManager
          promptId={(prompt as any).id}
          versions={(prompt as any).versions || []}
          onVersionCreated={fetchPrompt}
        />
      )}
    </div>
  )
}
