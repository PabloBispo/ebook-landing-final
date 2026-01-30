/**
 * Converte texto para slug URL-friendly
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-') // Espaços para hífens
    .replace(/[^\w-]+/g, '') // Remove caracteres especiais
    .replace(/--+/g, '-') // Remove hífens duplicados
    .replace(/^-+/, '') // Remove hífens do início
    .replace(/-+$/, '') // Remove hífens do final
}

/**
 * Gera alias do tipo "PALAVRA-01" a partir do título
 */
export function generateAlias(title: string, count: number = 1): string {
  const firstWord = title.split(' ')[0].toUpperCase()
  const cleanWord = firstWord.replace(/[^A-Z0-9]/g, '')
  const number = String(count).padStart(2, '0')
  return `${cleanWord}-${number}`
}
