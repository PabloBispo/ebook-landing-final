'use client'

import { useState } from 'react'
import { Copy, Check, AlertCircle } from 'lucide-react'
import type { Placeholder } from '@/lib/prompts/types'
import { PlaceholderValidator } from '@/lib/prompts/validator'
import { hasUnfilledPlaceholders } from '@/lib/prompts/parser'

interface CopyButtonProps {
  content: string
  promptId: string
  slug: string
  modelTag: string
  placeholders?: Placeholder[]
  values?: Record<string, string>
}

export function CopyButton({
  content,
  promptId,
  slug,
  modelTag,
  placeholders,
  values,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCopy() {
    setError(null)

    // Validate if there are placeholders
    if (placeholders && placeholders.length > 0 && values) {
      // Check for validation errors
      const validationErrors = PlaceholderValidator.validateAsObject(placeholders, values)

      if (Object.keys(validationErrors).length > 0) {
        const firstError = Object.values(validationErrors)[0]
        setError(firstError)
        setTimeout(() => setError(null), 3000)
        return
      }

      // Check for unfilled placeholders
      if (hasUnfilledPlaceholders(content)) {
        setError('Preencha todos os campos obrigatórios')
        setTimeout(() => setError(null), 3000)
        return
      }
    }

    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)

      // Register analytics
      fetch(`/api/prompts/${slug}/copy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptId, modelTag }),
      }).catch(console.error)
    } catch (err) {
      console.error('Failed to copy:', err)
      setError('Erro ao copiar')
      setTimeout(() => setError(null), 3000)
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {copied ? (
          <>
            <Check className="h-5 w-5" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-5 w-5" />
            Copiar Prompt
          </>
        )}
      </button>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
