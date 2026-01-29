/**
 * Extrai placeholders de um template
 * Suporta: {{variavel}} e {{variavel:default}}
 */
export function extractPlaceholders(template: string): string[] {
  const regex = /\{\{([a-zA-Z0-9_]+)(?::([^}]+))?\}\}/g
  const placeholders: string[] = []
  let match

  while ((match = regex.exec(template)) !== null) {
    placeholders.push(match[1])
  }

  return [...new Set(placeholders)]
}

/**
 * Preenche template com valores fornecidos
 * Usa defaults se valor não fornecido
 */
export function fillTemplate(
  template: string,
  values: Record<string, string>
): string {
  return template.replace(
    /\{\{([a-zA-Z0-9_]+)(?::([^}]+))?\}\}/g,
    (match, key, defaultValue) => {
      const value = values[key]
      if (value !== undefined && value !== '') {
        return value
      }
      if (defaultValue !== undefined) {
        return defaultValue
      }
      // Retorna placeholder original se não tiver valor nem default
      return match
    }
  )
}

/**
 * Verifica se template tem placeholders não preenchidos
 */
export function hasUnfilledPlaceholders(template: string): boolean {
  const regex = /\{\{([a-zA-Z0-9_]+)(?::([^}]+))?\}\}/
  return regex.test(template)
}

/**
 * Conta quantos placeholders existem no template
 */
export function countPlaceholders(template: string): number {
  return extractPlaceholders(template).length
}

/**
 * Extrai placeholders com seus defaults
 */
export function extractPlaceholdersWithDefaults(
  template: string
): Record<string, string | undefined> {
  const regex = /\{\{([a-zA-Z0-9_]+)(?::([^}]+))?\}\}/g
  const result: Record<string, string | undefined> = {}
  let match

  while ((match = regex.exec(template)) !== null) {
    const key = match[1]
    const defaultValue = match[2]
    result[key] = defaultValue
  }

  return result
}
