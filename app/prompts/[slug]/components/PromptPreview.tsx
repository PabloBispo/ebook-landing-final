'use client'

import { useMemo } from 'react'
import { fillTemplate, hasUnfilledPlaceholders } from '@/lib/prompts/parser'

interface PromptPreviewProps {
  template: string
  values: Record<string, string>
}

export function PromptPreview({ template, values }: PromptPreviewProps) {
  // Fill template with current values
  const filledContent = useMemo(() => {
    return fillTemplate(template, values)
  }, [template, values])

  // Check if there are unfilled placeholders
  const hasUnfilled = useMemo(() => {
    return hasUnfilledPlaceholders(filledContent)
  }, [filledContent])

  // Highlight placeholders in preview
  const renderContent = () => {
    // Split by placeholder pattern and render with highlights
    const parts = filledContent.split(/(\{\{[a-zA-Z0-9_]+(?::[^}]+)?\}\})/g)

    return parts.map((part, index) => {
      // Check if this is a placeholder
      const isPlaceholder = /^\{\{[a-zA-Z0-9_]+(?::[^}]+)?\}\}$/.test(part)

      if (isPlaceholder) {
        return (
          <span
            key={index}
            className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-1 rounded font-mono text-sm"
          >
            {part}
          </span>
        )
      }

      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Preview do Prompt</h3>
        {hasUnfilled && (
          <span className="text-xs text-red-500 flex items-center gap-1">
            <span>⚠️</span>
            Campos pendentes
          </span>
        )}
      </div>

      <div className="relative">
        <pre className="p-4 rounded-lg bg-secondary/50 border border-border overflow-x-auto whitespace-pre-wrap break-words text-sm font-mono leading-relaxed">
          {renderContent()}
        </pre>

        {hasUnfilled && (
          <div className="mt-2 text-xs text-muted-foreground">
            Placeholders em{' '}
            <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-1 rounded">
              vermelho
            </span>{' '}
            ainda precisam ser preenchidos
          </div>
        )}
      </div>
    </div>
  )
}
