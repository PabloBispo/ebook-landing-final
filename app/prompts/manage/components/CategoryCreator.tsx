'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { EmojiPicker } from './EmojiPicker'

interface CategoryCreatorProps {
  onCreated: (category: any) => void
}

export function CategoryCreator({ onCreated }: CategoryCreatorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, icon })
      })

      const result = await response.json()

      if (response.ok) {
        onCreated(result.data)
        setName('')
        setIcon('')
        setIsOpen(false)
      } else {
        setError(result.error || 'Erro ao criar categoria')
      }
    } catch (error) {
      console.error('Error creating category:', error)
      setError('Erro ao criar categoria')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <Plus className="h-4 w-4" />
        Nova Categoria
      </button>
    )
  }

  return (
    <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Nova Categoria</h4>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-muted rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Emoji Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Escolha um emoji:
          </label>
          <div className="flex gap-2 items-start">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="px-4 py-2 border rounded text-2xl hover:bg-muted transition-colors min-w-[60px] h-[44px]"
            >
              {icon || '📚'}
            </button>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nome da categoria"
              required
              className="flex-1 px-3 py-2 border rounded"
            />
          </div>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="relative">
            <EmojiPicker
              selectedEmoji={icon}
              onEmojiSelect={(emoji) => {
                setIcon(emoji)
                setShowEmojiPicker(false)
              }}
            />
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading || !icon}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              setShowEmojiPicker(false)
            }}
            className="px-4 py-2 border rounded hover:bg-muted"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
