'use client'

import { useState } from 'react'
import { extractPlaceholders } from '@/lib/prompts/parser'

interface PromptEditorProps {
  value: string
  onChange: (value: string) => void
}

export function PromptEditor({ value, onChange }: PromptEditorProps) {
  const [showPreview, setShowPreview] = useState(false)
  const placeholders = extractPlaceholders(value)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium">
          Conteúdo do Prompt *
        </label>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="text-sm text-primary hover:underline"
        >
          {showPreview ? 'Esconder' : 'Mostrar'} Preview
        </button>
      </div>

      <textarea
        required
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Digite o prompt aqui... Use {{variavel}} para placeholders"
        rows={12}
        className="w-full px-4 py-3 border rounded-lg font-mono text-sm"
      />

      {placeholders.length > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-2">
            ✨ {placeholders.length} placeholder(s) detectado(s):
          </p>
          <div className="flex flex-wrap gap-2">
            {placeholders.map(key => (
              <span key={key} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono">
                {`{{${key}}}`}
              </span>
            ))}
          </div>
        </div>
      )}

      {showPreview && (
        <div className="p-4 bg-muted border rounded-lg">
          <p className="text-sm font-medium mb-2">Preview:</p>
          <pre className="whitespace-pre-wrap text-sm">{value}</pre>
        </div>
      )}
    </div>
  )
}
