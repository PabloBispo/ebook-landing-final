'use client'

import { useState } from 'react'
import { Mail, User, CheckCircle2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function LeadCapture() {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'landing-page-footer',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar')
      }

      setIsSuccess(true)
      toast.success('Cadastro realizado com sucesso! Verifique seu email.')
      setFormData({ name: '', email: '' })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao cadastrar. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="glass-card p-8 text-center animate-scale-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Cadastro Confirmado! 🎉</h3>
        <p className="text-muted-foreground mb-6">
          Enviamos um email com mais informações sobre a masterclass.
          Verifique sua caixa de entrada (e spam também).
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-sm text-primary hover:underline"
        >
          Cadastrar outro email
        </button>
      </div>
    )
  }

  return (
    <div className="glass-card p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">
          Receba Conteúdo Gratuito
        </h3>
        <p className="text-muted-foreground">
          Cadastre-se e receba dicas exclusivas sobre criação de ebooks com IA
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="sr-only">
            Nome
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              id="name"
              type="text"
              required
              minLength={2}
              maxLength={100}
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              required
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover-lift transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Cadastrando...
            </>
          ) : (
            'Quero Receber Conteúdo Gratuito'
          )}
        </button>

        <p className="text-xs text-center text-muted-foreground">
          Ao cadastrar, você concorda em receber emails com dicas e ofertas.
          Seus dados estão seguros conosco.
        </p>
      </form>
    </div>
  )
}
