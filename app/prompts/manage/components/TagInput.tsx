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
    <div className="space-y-3">
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-white rounded-md border border-gray-200">
          {selectedTags.map(tag => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
            >
              <span>{tag.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag.id)}
                className="hover:bg-gray-300 rounded-full p-0.5 transition-colors text-gray-500 hover:text-gray-900"
              >
                <X className="h-3.5 w-3.5" />
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
          id="tagInput"
          value={input}
          onChange={e => {
            setInput(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Digite para buscar ou criar tag..."
          disabled={loading}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400"
        />

        {/* Suggestions */}
        {showSuggestions && input.length > 0 && (
          <div className="absolute z-20 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-sm max-h-60 overflow-y-auto">
            {filteredTags.length > 0 ? (
              <div className="p-1">
                {filteredTags.slice(0, 5).map((tag, index) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleAddTag(tag)}
                    className={`w-full px-4 py-2.5 text-left rounded-md transition-colors ${
                      index === 0
                        ? 'bg-gray-50 text-gray-900 hover:bg-gray-100 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleCreateTag}
                disabled={loading}
                className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-900 disabled:opacity-50 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600">
                  <Plus className="h-4 w-4" />
                </div>
                <div className="text-sm">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Criando...
                    </span>
                  ) : (
                    <span className="font-medium">
                      Criar tag <span className="font-semibold">"{input}"</span>
                    </span>
                  )}
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
