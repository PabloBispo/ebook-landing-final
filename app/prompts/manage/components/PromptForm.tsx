'use client'

import { useState, useEffect } from 'react'
import { PromptEditor } from './PromptEditor'
import { CategoryCreator } from './CategoryCreator'
import { TagInput } from './TagInput'
import { slugify, generateAlias } from '@/lib/prompts/slugify'
import { Lock, Unlock } from 'lucide-react'

interface PromptFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  loading?: boolean
}

export function PromptForm({ initialData, onSubmit, loading }: PromptFormProps) {
  const [categories, setCategories] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [selectedTags, setSelectedTags] = useState<any[]>([])
  const [autoSlug, setAutoSlug] = useState(true)
  const [autoAlias, setAutoAlias] = useState(true)
  const [formData, setFormData] = useState({
    slug: '',
    alias: '',
    title: '',
    description: '',
    content: '',
    categoryId: '',
    status: 'DRAFT',
    sourceChapter: '',
    tagIds: [] as string[],
    modelTags: [] as string[], // Changed to array for multi-select
  })

  useEffect(() => {
    // Fetch categories
    fetch('/api/prompts/categories')
      .then(res => res.json())
      .then(data => setCategories(data.data || []))

    // Fetch tags
    fetch('/api/prompts/tags')
      .then(res => res.json())
      .then(data => setTags(data.data || []))

    // Set initial data
    if (initialData) {
      const initialTags = initialData.tags || []
      setSelectedTags(initialTags)

      setFormData({
        slug: initialData.slug || '',
        alias: initialData.alias || '',
        title: initialData.title || '',
        description: initialData.description || '',
        content: initialData.versions?.[0]?.content || '',
        categoryId: initialData.categoryId || '',
        status: initialData.status || 'DRAFT',
        sourceChapter: initialData.sourceChapter || '',
        tagIds: initialTags.map((t: any) => t.id),
        modelTags: initialData.versions?.[0]?.modelTag ? [initialData.versions[0].modelTag] : ['UNIVERSAL'],
      })

      // Disable auto-generation when editing
      setAutoSlug(false)
      setAutoAlias(false)
    }
  }, [initialData])

  const handleTitleChange = (value: string) => {
    const updates: any = { title: value }

    if (autoSlug) {
      updates.slug = slugify(value)
    }

    if (autoAlias) {
      updates.alias = generateAlias(value)
    }

    setFormData(prev => ({ ...prev, ...updates }))
  }

  const handleCategoryCreated = (category: any) => {
    setCategories(prev => [...prev, category])
    setFormData(prev => ({ ...prev, categoryId: category.id }))
  }

  const handleTagCreated = (tag: any) => {
    setTags(prev => [...prev, tag])
  }

  const handleTagsChange = (newTags: any[]) => {
    setSelectedTags(newTags)
    setFormData(prev => ({ ...prev, tagIds: newTags.map(t => t.id) }))
  }

  const handleModelToggle = (model: string) => {
    setFormData(prev => {
      const newModels = prev.modelTags.includes(model)
        ? prev.modelTags.filter(m => m !== model)
        : [...prev.modelTags, model]

      return { ...prev, modelTags: newModels }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const modelOptions = [
    { value: 'UNIVERSAL', label: 'Universal ⭐', description: 'Funciona em todos os modelos' },
    { value: 'CHATGPT_4', label: 'ChatGPT-4', description: 'Otimizado para GPT-4' },
    { value: 'CLAUDE_OPUS', label: 'Claude Opus', description: 'Otimizado para Claude' },
    { value: 'GEMINI_2_FLASH', label: 'Gemini 2.0 Flash', description: 'Otimizado para Gemini' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title - Most Important Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Título do Prompt *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={e => handleTitleChange(e.target.value)}
          placeholder="Ex: Criar Avatar Profundo"
          className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-sm text-muted-foreground">
          Digite um título descritivo. Slug e alias serão gerados automaticamente.
        </p>
      </div>

      {/* Auto-Generated Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">
              Slug (URL) *
            </label>
            <button
              type="button"
              onClick={() => setAutoSlug(!autoSlug)}
              className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
            >
              {autoSlug ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
              {autoSlug ? 'Auto' : 'Manual'}
            </button>
          </div>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={e => {
              setAutoSlug(false)
              setFormData({ ...formData, slug: e.target.value })
            }}
            placeholder="criar-avatar-profundo"
            className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">
              Alias (Código) *
            </label>
            <button
              type="button"
              onClick={() => setAutoAlias(!autoAlias)}
              className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
            >
              {autoAlias ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
              {autoAlias ? 'Auto' : 'Manual'}
            </button>
          </div>
          <input
            type="text"
            required
            value={formData.alias}
            onChange={e => {
              setAutoAlias(false)
              setFormData({ ...formData, alias: e.target.value })
            }}
            placeholder="CRIAR-01"
            className="w-full px-4 py-2 border rounded-lg font-mono text-sm uppercase"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Descrição *
        </label>
        <textarea
          required
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descreva o que este prompt faz e quando usar..."
          rows={3}
          className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Category with Creator */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">
          Categoria *
        </label>
        <select
          required
          value={formData.categoryId}
          onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Selecione uma categoria...</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
        <CategoryCreator onCreated={handleCategoryCreated} />
      </div>

      {/* AI Models - Multi-Select */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">
          Modelos de IA *
        </label>
        <p className="text-sm text-muted-foreground">
          Selecione os modelos compatíveis com este prompt
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {modelOptions.map(model => (
            <label
              key={model.value}
              className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.modelTags.includes(model.value)
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.modelTags.includes(model.value)}
                onChange={() => handleModelToggle(model.value)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-medium">{model.label}</div>
                <div className="text-xs text-muted-foreground">{model.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Content Editor */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Conteúdo do Prompt *
        </label>
        <PromptEditor
          value={formData.content}
          onChange={content => setFormData({ ...formData, content })}
        />
      </div>

      {/* Tags with Dynamic Creation */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Tags
        </label>
        <p className="text-sm text-muted-foreground">
          Adicione tags para facilitar a busca. Digite para criar novas tags.
        </p>
        <TagInput
          allTags={tags}
          selectedTags={selectedTags}
          onTagsChange={handleTagsChange}
          onTagCreated={handleTagCreated}
        />
      </div>

      {/* Status & Source */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Status
          </label>
          <select
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="DRAFT">Rascunho</option>
            <option value="PUBLISHED">Publicado</option>
            <option value="ARCHIVED">Arquivado</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Capítulo Fonte (Opcional)
          </label>
          <input
            type="text"
            value={formData.sourceChapter}
            onChange={e => setFormData({ ...formData, sourceChapter: e.target.value })}
            placeholder="cap-01-introducao"
            className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="submit"
          disabled={loading || formData.modelTags.length === 0}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? 'Salvando...' : (initialData ? 'Atualizar Prompt' : 'Criar Prompt')}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-muted transition-colors"
        >
          Cancelar
        </button>
      </div>

      {formData.modelTags.length === 0 && (
        <p className="text-sm text-red-600">
          Selecione pelo menos um modelo de IA para continuar.
        </p>
      )}
    </form>
  )
}
