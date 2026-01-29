import type { Placeholder } from './types'
import { extractPlaceholders, fillTemplate } from './parser'

export class PlaceholderEngine {
  private placeholders: Placeholder[]
  private template: string

  constructor(template: string, placeholderConfigs: Placeholder[]) {
    this.template = template
    this.placeholders = placeholderConfigs
  }

  /**
   * Auto-detecta placeholders no template e cria configuração básica
   */
  static autoDetect(template: string): Placeholder[] {
    const keys = extractPlaceholders(template)

    return keys.map(key => ({
      key,
      label: this.keyToLabel(key),
      type: 'text' as const,
      required: true,
      description: `Digite o valor para ${this.keyToLabel(key)}`,
    }))
  }

  /**
   * Converte key de placeholder em label amigável
   * Ex: "nome_completo" -> "Nome Completo"
   */
  private static keyToLabel(key: string): string {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  /**
   * Valida valores fornecidos contra configuração de placeholders
   */
  validate(values: Record<string, string>): {
    valid: boolean
    errors: Record<string, string>
  } {
    const errors: Record<string, string> = {}

    this.placeholders.forEach(placeholder => {
      const value = values[placeholder.key]

      // Required validation
      if (placeholder.required && (!value || value.trim() === '')) {
        errors[placeholder.key] = `${placeholder.label} é obrigatório`
        return
      }

      // Skip other validations if empty and not required
      if (!value) return

      // Max length validation
      if (placeholder.maxLength && value.length > placeholder.maxLength) {
        errors[placeholder.key] =
          `${placeholder.label} deve ter no máximo ${placeholder.maxLength} caracteres`
      }

      // Select validation
      if (placeholder.type === 'select' && placeholder.options) {
        if (!placeholder.options.includes(value)) {
          errors[placeholder.key] =
            `${placeholder.label} deve ser uma das opções: ${placeholder.options.join(', ')}`
        }
      }

      // Number validation
      if (placeholder.type === 'number') {
        const num = Number(value)
        if (isNaN(num)) {
          errors[placeholder.key] = `${placeholder.label} deve ser um número`
        }
      }
    })

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    }
  }

  /**
   * Preenche template com valores validados
   */
  fill(values: Record<string, string>): {
    success: boolean
    content?: string
    errors?: Record<string, string>
  } {
    const validation = this.validate(values)

    if (!validation.valid) {
      return {
        success: false,
        errors: validation.errors,
      }
    }

    // Adicionar defaults para valores não fornecidos
    const valuesWithDefaults = { ...values }
    this.placeholders.forEach(p => {
      if (!valuesWithDefaults[p.key] && p.defaultValue) {
        valuesWithDefaults[p.key] = p.defaultValue
      }
    })

    const content = fillTemplate(this.template, valuesWithDefaults)

    return {
      success: true,
      content,
    }
  }

  /**
   * Retorna lista de placeholders não preenchidos
   */
  getMissingRequired(values: Record<string, string>): string[] {
    return this.placeholders
      .filter(p => p.required && !values[p.key])
      .map(p => p.key)
  }

  /**
   * Retorna estatísticas de preenchimento
   */
  getStats(values: Record<string, string>): {
    total: number
    filled: number
    required: number
    requiredFilled: number
    percentage: number
  } {
    const total = this.placeholders.length
    const filled = this.placeholders.filter(p => values[p.key]).length
    const required = this.placeholders.filter(p => p.required).length
    const requiredFilled = this.placeholders
      .filter(p => p.required && values[p.key]).length

    const percentage = total > 0 ? Math.round((filled / total) * 100) : 0

    return {
      total,
      filled,
      required,
      requiredFilled,
      percentage,
    }
  }
}
