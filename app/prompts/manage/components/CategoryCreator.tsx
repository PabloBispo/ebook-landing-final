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
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Nova Categoria
      </button>
    )
  }

  return (
    <div className="p-5 border border-gray-300 rounded-md space-y-4 bg-white">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-900">
          Nova Categoria
        </h4>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Emoji Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Ícone e Nome
          </label>
          <div className="flex gap-3 items-start">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="px-4 py-3 border border-gray-300 rounded-md text-3xl hover:bg-gray-50 transition-colors min-w-[68px] h-[56px] flex items-center justify-center bg-white"
            >
              {icon || '📚'}
            </button>
            <div className="flex-1">
              <input
                type="text"
                id="categoryName"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Digite o nome da categoria"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder:text-gray-400"
              />
            </div>
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
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading || !icon}
            className="flex-1 px-6 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Criando...
              </span>
            ) : (
              'Criar'
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              setShowEmojiPicker(false)
            }}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
