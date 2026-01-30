'use client'

import { useState, useEffect } from 'react'
import { PromptEditor } from './PromptEditor'

interface PromptFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  loading?: boolean
}

export function PromptForm({ initialData, onSubmit, loading }: PromptFormProps) {
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
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
    modelTag: 'UNIVERSAL',
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
      setFormData({
        slug: initialData.slug || '',
        alias: initialData.alias || '',
        title: initialData.title || '',
        description: initialData.description || '',
        content: initialData.versions?.[0]?.content || '',
        categoryId: initialData.categoryId || '',
        status: initialData.status || 'DRAFT',
        sourceChapter: initialData.sourceChapter || '',
        tagIds: initialData.tags?.map((t: any) => t.id) || [],
        modelTag: initialData.versions?.[0]?.modelTag || 'UNIVERSAL',
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Slug (URL) *
          </label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={e => setFormData({ ...formData, slug: e.target.value })}
            placeholder="criar-avatar-profundo"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Alias (Código) *
          </label>
          <input
            type="text"
            required
            value={formData.alias}
            onChange={e => setFormData({ ...formData, alias: e.target.value })}
            placeholder="AVATAR-01"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Título *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder="Criar Avatar Profundo"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Descrição *
        </label>
        <textarea
          required
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descreva o que este prompt faz..."
          rows={3}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Category & Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Categoria *
          </label>
          <select
            required
            value={formData.categoryId}
            onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Selecione...</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
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

        <div>
          <label className="block text-sm font-medium mb-2">
            Modelo
          </label>
          <select
            value={formData.modelTag}
            onChange={e => setFormData({ ...formData, modelTag: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="UNIVERSAL">Universal ⭐</option>
            <option value="CHATGPT_4">ChatGPT-4</option>
            <option value="CLAUDE_OPUS">Claude Opus</option>
            <option value="GEMINI_2_FLASH">Gemini 2.0</option>
          </select>
        </div>
      </div>

      {/* Content Editor */}
      <PromptEditor
        value={formData.content}
        onChange={content => setFormData({ ...formData, content })}
      />

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: any) => (
            <label key={tag.id} className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-muted">
              <input
                type="checkbox"
                checked={formData.tagIds.includes(tag.id)}
                onChange={e => {
                  if (e.target.checked) {
                    setFormData({ ...formData, tagIds: [...formData.tagIds, tag.id] })
                  } else {
                    setFormData({ ...formData, tagIds: formData.tagIds.filter(id => id !== tag.id) })
                  }
                }}
              />
              <span>{tag.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : (initialData ? 'Atualizar Prompt' : 'Criar Prompt')}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 border rounded-lg hover:bg-muted"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
