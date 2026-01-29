'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  content: string
  promptId: string
  slug: string
  modelTag: string
}

export function CopyButton({ content, promptId, slug, modelTag }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
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
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
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
  )
}
