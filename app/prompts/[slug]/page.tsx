'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ModelSelector } from '../components/ModelSelector'
import { PromptContent } from '../components/PromptContent'
import { CopyButton } from '../components/CopyButton'
import { PlaceholderForm } from './components/PlaceholderForm'
import { PromptPreview } from './components/PromptPreview'
import type { Placeholder } from '@/lib/prompts/types'
import { fillTemplate } from '@/lib/prompts/parser'

interface Prompt {
  id: string
  slug: string
  alias: string
  title: string
  description: string
  category: { name: string; icon: string } | null
  tags: { name: string }[]
  placeholders: Placeholder[]
  versions: {
    modelTag: string
    content: string
    isRecommended: boolean
  }[]
  viewCount: number
  copyCount: number
}

export default function PromptDetailPage() {
  const params = useParams()
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({})

  useEffect(() => {
    if (params.slug) {
      fetchPrompt(params.slug as string)
    }
  }, [params.slug])

  async function fetchPrompt(slug: string) {
    try {
      const res = await fetch(`/api/prompts/${slug}`)
      const response = await res.json()
      const data = response.data
      setPrompt(data)

      // Selecionar versão recomendada
      const recommended = data?.versions?.find((v: any) => v.isRecommended)
      if (recommended) {
        setSelectedModel(recommended.modelTag)
      } else if (data.versions[0]) {
        setSelectedModel(data.versions[0].modelTag)
      }
    } catch (error) {
      console.error('Failed to fetch prompt:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando prompt...</p>
        </div>
      </div>
    )
  }

  if (!prompt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">Prompt não encontrado</p>
          <a href="/prompts" className="text-primary hover:underline">
            ← Voltar para biblioteca
          </a>
        </div>
      </div>
    )
  }

  const currentVersion = prompt.versions.find(v => v.modelTag === selectedModel)
  const hasPlaceholders = prompt.placeholders && prompt.placeholders.length > 0

  // Get filled content
  const filledContent = currentVersion && hasPlaceholders
    ? fillTemplate(currentVersion.content, placeholderValues)
    : currentVersion?.content || ''

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <a
          href="/prompts"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          ← Voltar para biblioteca
        </a>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {prompt.category && (
              <span className="text-4xl">{prompt.category.icon}</span>
            )}
            <div>
              <span className="text-xs font-mono text-muted-foreground">
                {prompt.alias}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold">
                {prompt.title}
              </h1>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-4">
            {prompt.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map(tag => (
              <span
                key={tag.name}
                className="px-3 py-1 rounded-full bg-secondary text-sm"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* Model Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Escolha o modelo de IA:
          </label>
          <ModelSelector
            versions={prompt.versions}
            selected={selectedModel}
            onChange={setSelectedModel}
          />
        </div>

        {/* Placeholder Form (if has placeholders) */}
        {currentVersion && hasPlaceholders && (
          <div className="mb-8 p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-4">Personalize seu prompt</h2>
            <PlaceholderForm
              placeholders={prompt.placeholders}
              onValuesChange={setPlaceholderValues}
            />
          </div>
        )}

        {/* Preview (if has placeholders) */}
        {currentVersion && hasPlaceholders && (
          <div className="mb-6">
            <PromptPreview
              template={currentVersion.content}
              values={placeholderValues}
            />
          </div>
        )}

        {/* Prompt Content (if no placeholders, show original) */}
        {currentVersion && !hasPlaceholders && (
          <PromptContent content={currentVersion.content} />
        )}

        {/* Copy Button */}
        {currentVersion && (
          <div className="mt-6">
            <CopyButton
              content={filledContent}
              promptId={prompt.id}
              slug={prompt.slug}
              modelTag={selectedModel}
              placeholders={hasPlaceholders ? prompt.placeholders : undefined}
              values={hasPlaceholders ? placeholderValues : undefined}
            />
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex gap-8 text-sm text-muted-foreground">
            <span>👁️ {prompt.viewCount} visualizações</span>
            <span>📋 {prompt.copyCount} cópias</span>
          </div>
        </div>
      </div>
    </div>
  )
}
