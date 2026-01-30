'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Plus } from 'lucide-react'

interface TagInputProps {
  allTags: any[]
  selectedTags: any[]
  onTagsChange: (tags: any[]) => void
  onTagCreated: (tag: any) => void
}

export function TagInput({ allTags, selectedTags, onTagsChange, onTagCreated }: TagInputProps) {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const filteredTags = allTags.filter(tag =>
    !selectedTags.find(t => t.id === tag.id) &&
    tag.name.toLowerCase().includes(input.toLowerCase())
  )

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAddTag = (tag: any) => {
    onTagsChange([...selectedTags, tag])
    setInput('')
    setShowSuggestions(false)
  }

  const handleCreateTag = async () => {
    if (!input.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: input.trim() })
      })

      if (response.ok) {
        const { data } = await response.json()
        onTagCreated(data)
        handleAddTag(data)
      }
    } catch (error) {
      console.error('Error creating tag:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveTag = (tagId: string) => {
    onTagsChange(selectedTags.filter(t => t.id !== tagId))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredTags.length > 0) {
        handleAddTag(filteredTags[0])
      } else if (input.trim()) {
        handleCreateTag()
      }
    }
  }

  return (
    <div className="space-y-2">
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tag => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tag.name}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag.id)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative" ref={wrapperRef}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => {
            setInput(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Digite para buscar ou criar tag..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={loading}
        />

        {/* Suggestions */}
        {showSuggestions && input.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredTags.length > 0 ? (
              filteredTags.slice(0, 5).map(tag => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleAddTag(tag)}
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
                >
                  {tag.name}
                </button>
              ))
            ) : (
              <button
                type="button"
                onClick={handleCreateTag}
                disabled={loading}
                className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2 text-primary disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                {loading ? 'Criando...' : `Criar tag "${input}"`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
