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
        <label htmlFor="prompt-title" className="block text-sm font-medium text-gray-700">
          Título do Prompt *
        </label>
        <input
          type="text"
          id="prompt-title"
          required
          value={formData.title}
          onChange={e => handleTitleChange(e.target.value)}
          placeholder="Digite um título descritivo"
          className="w-full px-4 py-2.5 text-lg border border-gray-300 rounded-md bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder:text-gray-400"
        />
        <p className="text-sm text-gray-500">
          Slug e alias serão gerados automaticamente.
        </p>
      </div>

      {/* Auto-Generated Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
              Slug (URL) *
            </label>
            <button
              type="button"
              onClick={() => setAutoSlug(!autoSlug)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                autoSlug
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {autoSlug ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
              {autoSlug ? 'Auto' : 'Manual'}
            </button>
          </div>
          <input
            type="text"
            id="slug"
            required
            value={formData.slug}
            onChange={e => {
              setAutoSlug(false)
              setFormData({ ...formData, slug: e.target.value })
            }}
            placeholder="slug-do-prompt"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md font-mono text-sm bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="alias" className="block text-sm font-medium text-gray-700">
              Alias (Código) *
            </label>
            <button
              type="button"
              onClick={() => setAutoAlias(!autoAlias)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                autoAlias
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {autoAlias ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
              {autoAlias ? 'Auto' : 'Manual'}
            </button>
          </div>
          <input
            type="text"
            id="alias"
            required
            value={formData.alias}
            onChange={e => {
              setAutoAlias(false)
              setFormData({ ...formData, alias: e.target.value })
            }}
            placeholder="ALIAS_PROMPT"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md font-mono text-sm uppercase bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descrição *
        </label>
        <textarea
          id="description"
          required
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descreva o propósito deste prompt"
          rows={4}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md resize-none bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder:text-gray-400"
        />
      </div>

      {/* Category with Creator */}
      <div className="space-y-3">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Categoria *
        </label>
        <div className="relative">
          <select
            id="category"
            required
            value={formData.categoryId}
            onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md appearance-none bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
          >
            <option value="">Selecione uma categoria...</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <CategoryCreator onCreated={handleCategoryCreated} />
      </div>

      {/* AI Models - Multi-Select */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Modelos de IA *
          </label>
          <p className="text-sm text-gray-500">
            Selecione os modelos compatíveis com este prompt
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modelOptions.map(model => (
            <label
              key={model.value}
              className={`relative flex items-start gap-4 p-5 border rounded-md cursor-pointer transition-colors ${
                formData.modelTags.includes(model.value)
                  ? 'border-black bg-gray-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center h-5 pt-0.5">
                <input
                  type="checkbox"
                  checked={formData.modelTags.includes(model.value)}
                  onChange={() => handleModelToggle(model.value)}
                  className="w-5 h-5 rounded border-gray-300 accent-black cursor-pointer focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-base text-gray-900">
                  {model.label}
                </div>
                <div className="text-sm text-gray-600 mt-0.5">{model.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Content Editor */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Conteúdo do Prompt *
        </label>
        <div className="border border-gray-300 rounded-md overflow-hidden transition-colors focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <PromptEditor
            value={formData.content}
            onChange={content => setFormData({ ...formData, content })}
          />
        </div>
      </div>

      {/* Tags with Dynamic Creation */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <p className="text-sm text-gray-500 mb-3">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <div className="relative">
            <select
              id="status"
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md appearance-none bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
            >
              <option value="DRAFT">Rascunho</option>
              <option value="PUBLISHED">Publicado</option>
              <option value="ARCHIVED">Arquivado</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="sourceChapter" className="block text-sm font-medium text-gray-700">
            Capítulo Fonte (Opcional)
          </label>
          <input
            type="text"
            id="sourceChapter"
            value={formData.sourceChapter}
            onChange={e => setFormData({ ...formData, sourceChapter: e.target.value })}
            placeholder="ex: Cap 1.3"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md font-mono text-sm bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading || formData.modelTags.length === 0}
          className="flex-1 sm:flex-none px-6 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Salvando...
            </span>
          ) : (
            initialData ? 'Atualizar Prompt' : 'Criar Prompt'
          )}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
        >
          Cancelar
        </button>
      </div>

      {formData.modelTags.length === 0 && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-md">
          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-sm font-medium text-red-800">
            Selecione pelo menos um modelo de IA para continuar.
          </p>
        </div>
      )}
    </form>
  )
}
