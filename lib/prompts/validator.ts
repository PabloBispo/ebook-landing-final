import type { Placeholder } from './types'

export interface ValidationError {
  field: string
  message: string
  type: 'required' | 'type' | 'length' | 'options'
}

export class PlaceholderValidator {
  /**
   * Valida um único campo
   */
  static validateField(
    placeholder: Placeholder,
    value: string | undefined
  ): ValidationError | null {
    // Required check
    if (placeholder.required && (!value || value.trim() === '')) {
      return {
        field: placeholder.key,
        message: `${placeholder.label} é obrigatório`,
        type: 'required',
      }
    }

    // Se não é required e está vazio, ok
    if (!value) return null

    // Max length check
    if (placeholder.maxLength && value.length > placeholder.maxLength) {
      return {
        field: placeholder.key,
        message: `Máximo de ${placeholder.maxLength} caracteres`,
        type: 'length',
      }
    }

    // Type-specific validations
    switch (placeholder.type) {
      case 'select':
        if (placeholder.options && !placeholder.options.includes(value)) {
          return {
            field: placeholder.key,
            message: 'Opção inválida',
            type: 'options',
          }
        }
        break

      case 'number':
        if (isNaN(Number(value))) {
          return {
            field: placeholder.key,
            message: 'Deve ser um número',
            type: 'type',
          }
        }
        break

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          return {
            field: placeholder.key,
            message: 'Email inválido',
            type: 'type',
          }
        }
        break

      case 'url':
        try {
          new URL(value)
        } catch {
          return {
            field: placeholder.key,
            message: 'URL inválida',
            type: 'type',
          }
        }
        break
    }

    return null
  }

  /**
   * Valida todos os campos
   */
  static validateAll(
    placeholders: Placeholder[],
    values: Record<string, string>
  ): ValidationError[] {
    const errors: ValidationError[] = []

    placeholders.forEach(placeholder => {
      const error = this.validateField(placeholder, values[placeholder.key])
      if (error) {
        errors.push(error)
      }
    })

    return errors
  }

  /**
   * Valida e retorna em formato de objeto de erros
   */
  static validateAsObject(
    placeholders: Placeholder[],
    values: Record<string, string>
  ): Record<string, string> {
    const errors = this.validateAll(placeholders, values)
    const errorObject: Record<string, string> = {}

    errors.forEach(error => {
      errorObject[error.field] = error.message
    })

    return errorObject
  }
}
