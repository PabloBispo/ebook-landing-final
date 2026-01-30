'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PromptForm } from '../components/PromptForm'
import { extractPlaceholders } from '@/lib/prompts/parser'

export default function NewPromptPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setLoading(true)

    // Auto-detect placeholders
    const placeholders = extractPlaceholders(data.content)

    try {
      const response = await fetch('/api/admin/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          placeholders: placeholders.map(key => ({
            key,
            label: key.replace(/_/g, ' '),
            type: 'text',
            required: true,
          }))
        })
      })

      if (response.ok) {
        const { data: prompt } = await response.json()
        router.push(`/prompts/manage/${prompt.slug}/edit`)
      } else {
        alert('Erro ao criar prompt')
      }
    } catch (error) {
      console.error('Error creating prompt:', error)
      alert('Erro ao criar prompt')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Criar Novo Prompt</h1>
      <PromptForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}
