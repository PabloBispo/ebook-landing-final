'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PromptForm } from '../../components/PromptForm'

export default function EditPromptPage() {
  const params = useParams()
  const router = useRouter()
  const [prompt, setPrompt] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/prompts/${params.slug}`)
      .then(res => res.json())
      .then(data => setPrompt(data.data))
  }, [params.slug])

  const handleSubmit = async (data: any) => {
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/prompts/${(prompt as any).id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        alert('Prompt atualizado!')
        router.push('/prompts/manage')
      } else {
        alert('Erro ao atualizar prompt')
      }
    } catch (error) {
      console.error('Error updating prompt:', error)
      alert('Erro ao atualizar prompt')
    } finally {
      setLoading(false)
    }
  }

  if (!prompt) return <div className="p-8">Carregando...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Editar Prompt</h1>
      <PromptForm
        initialData={prompt}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  )
}
