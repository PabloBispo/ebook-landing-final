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
        <label className="block text-sm font-medium text-gray-700">
          Conteúdo do Prompt *
        </label>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
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
        className="w-full px-4 py-3 border border-gray-300 rounded-md font-mono text-sm bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder:text-gray-400"
      />

      {placeholders.length > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-700 mb-2">
                {placeholders.length} placeholder(s) detectado(s):
              </p>
              <div className="flex flex-wrap gap-2">
                {placeholders.map(key => (
                  <span key={key} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-mono border border-gray-200">
                    {`{{${key}}}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showPreview && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
          <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
          <pre className="whitespace-pre-wrap text-sm text-gray-900">{value}</pre>
        </div>
      )}
    </div>
  )
}
