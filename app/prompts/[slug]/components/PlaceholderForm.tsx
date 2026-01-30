'use client'

import { useState, useEffect } from 'react'
import type { Placeholder } from '@/lib/prompts/types'
import { PlaceholderValidator } from '@/lib/prompts/validator'
import { PlaceholderField } from './PlaceholderField'

interface PlaceholderFormProps {
  placeholders: Placeholder[]
  onValuesChange?: (values: Record<string, string>) => void
  onSubmit?: (values: Record<string, string>) => void
}

export function PlaceholderForm({
  placeholders,
  onValuesChange,
  onSubmit,
}: PlaceholderFormProps) {
  // Initialize values with defaults
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    placeholders.forEach(p => {
      initial[p.key] = p.defaultValue || ''
    })
    return initial
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  // Auto-focus primeiro campo
  useEffect(() => {
    if (placeholders.length > 0) {
      // Pequeno delay para garantir que o DOM foi renderizado
      setTimeout(() => {
        const firstInput = document.querySelector('input, textarea, select') as HTMLInputElement
        firstInput?.focus()
      }, 100)
    }
  }, [placeholders])

  // Notify parent about value changes
  useEffect(() => {
    onValuesChange?.(values)
  }, [values, onValuesChange])

  const handleFieldChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }))

    // Clear error on change if field was touched
    if (touchedFields.has(key)) {
      const placeholder = placeholders.find(p => p.key === key)
      if (placeholder) {
        const error = PlaceholderValidator.validateField(placeholder, value)
        setErrors(prev => {
          const next = { ...prev }
          if (error) {
            next[key] = error.message
          } else {
            delete next[key]
          }
          return next
        })
      }
    }
  }

  const handleFieldBlur = (key: string) => {
    setTouchedFields(prev => new Set(prev).add(key))

    // Validate on blur
    const placeholder = placeholders.find(p => p.key === key)
    if (placeholder) {
      const error = PlaceholderValidator.validateField(placeholder, values[key])
      setErrors(prev => {
        const next = { ...prev }
        if (error) {
          next[key] = error.message
        } else {
          delete next[key]
        }
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouchedFields(new Set(placeholders.map(p => p.key)))

    // Validate all fields
    const validationErrors = PlaceholderValidator.validateAsObject(placeholders, values)
    setErrors(validationErrors)

    // If no errors, submit
    if (Object.keys(validationErrors).length === 0) {
      onSubmit?.(values)
    }
  }

  if (placeholders.length === 0) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {placeholders.map(placeholder => (
          <div
            key={placeholder.key}
            className={placeholder.type === 'textarea' ? 'md:col-span-2' : ''}
          >
            <PlaceholderField
              placeholder={placeholder}
              value={values[placeholder.key] || ''}
              onChange={value => handleFieldChange(placeholder.key, value)}
              onBlur={() => handleFieldBlur(placeholder.key)}
              error={touchedFields.has(placeholder.key) ? errors[placeholder.key] : undefined}
            />
          </div>
        ))}
      </div>

      {/* Submit button (opcional, pode ser controlado externamente) */}
      {onSubmit && (
        <button
          type="submit"
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
        >
          Gerar Prompt
        </button>
      )}
    </form>
  )
}
