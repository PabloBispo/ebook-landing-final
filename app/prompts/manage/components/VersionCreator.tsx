'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface VersionCreatorProps {
  promptId: string
  defaultModel?: string
  onClose: () => void
  onCreated: () => void
}

const MODEL_OPTIONS = [
  { value: 'UNIVERSAL', label: 'Universal', description: 'Funciona em todos os modelos' },
  { value: 'CHATGPT_4', label: 'ChatGPT-4', description: 'Otimizado para GPT-4' },
  { value: 'CHATGPT_35', label: 'ChatGPT-3.5', description: 'Otimizado para GPT-3.5' },
  { value: 'CLAUDE_OPUS', label: 'Claude Opus', description: 'Otimizado para Claude Opus' },
  { value: 'CLAUDE_SONNET', label: 'Claude Sonnet', description: 'Otimizado para Claude Sonnet' },
  { value: 'GEMINI_2_FLASH', label: 'Gemini 2.0 Flash', description: 'Otimizado para Gemini 2.0 Flash' },
  { value: 'GEMINI_15_PRO', label: 'Gemini 1.5 Pro', description: 'Otimizado para Gemini 1.5 Pro' },
]

export function VersionCreator({ promptId, defaultModel = 'UNIVERSAL', onClose, onCreated }: VersionCreatorProps) {
  const [formData, setFormData] = useState({
    modelTag: defaultModel,
    content: '',
    notes: '',
    isRecommended: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/prompts/${promptId}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        onCreated()
      } else {
        setError(data.error || 'Erro ao criar versão')
      }
    } catch (err) {
      console.error('Error creating version:', err)
      setError('Erro ao criar versão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Nova Versão do Prompt</h2>
            <p className="text-sm text-gray-600 mt-1">
              Crie uma versão otimizada para um modelo específico de IA
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Model Selection */}
          <div className="space-y-2">
            <label htmlFor="modelTag" className="block text-sm font-medium text-gray-700">
              Modelo de IA *
            </label>
            <div className="relative">
              <select
                id="modelTag"
                required
                value={formData.modelTag}
                onChange={(e) => setFormData({ ...formData, modelTag: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md appearance-none bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
              >
                {MODEL_OPTIONS.map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.label} - {model.description}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              A versão será numerada automaticamente (v1, v2, v3, etc.)
            </p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Conteúdo do Prompt *
            </label>
            <textarea
              id="content"
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Digite o conteúdo otimizado para este modelo..."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none font-mono text-sm bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder:text-gray-400 placeholder:font-sans"
            />
            <p className="text-xs text-gray-500">
              Mínimo de 10 caracteres
            </p>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notas (Opcional)
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Adicione notas sobre as otimizações ou mudanças nesta versão..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none bg-white transition-colors focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder:text-gray-400"
            />
          </div>

          {/* Is Recommended */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <input
              type="checkbox"
              id="isRecommended"
              checked={formData.isRecommended}
              onChange={(e) => setFormData({ ...formData, isRecommended: e.target.checked })}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-black cursor-pointer focus:ring-1 focus:ring-black"
            />
            <div className="flex-1">
              <label htmlFor="isRecommended" className="text-sm font-medium text-gray-900 cursor-pointer">
                Marcar como versão recomendada
              </label>
              <p className="text-xs text-gray-600 mt-1">
                Esta versão será sugerida aos usuários para este modelo de IA. Outras versões recomendadas do mesmo modelo serão desmarcadas.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-md">
              <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading || formData.content.length < 10}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Criando...
              </span>
            ) : (
              'Criar Versão'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
