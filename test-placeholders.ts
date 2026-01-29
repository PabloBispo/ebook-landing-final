import { PlaceholderEngine } from './lib/prompts/placeholder-engine'
import type { Placeholder } from './lib/prompts/types'

const template = `
Você é especialista em {{area}}.

Ajude-me a criar um ebook sobre {{topico}}.

Público-alvo: {{publico:Iniciantes}}
Tom: {{tom}}
`

const config: Placeholder[] = [
  { key: 'area', label: 'Área', type: 'text', required: true },
  { key: 'topico', label: 'Tópico', type: 'text', required: true },
  { key: 'publico', label: 'Público', type: 'text', required: false, defaultValue: 'Iniciantes' },
  { key: 'tom', label: 'Tom', type: 'select', required: true, options: ['Formal', 'Casual', 'Técnico'] },
]

const engine = new PlaceholderEngine(template, config)

console.log('=== TESTE DO SISTEMA DE PLACEHOLDERS ===\n')

// Testar auto-detect
console.log('1. Auto-detect de placeholders:')
const autoDetected = PlaceholderEngine.autoDetect(template)
console.log(JSON.stringify(autoDetected, null, 2))
console.log('\n')

// Testar validação com valores corretos
console.log('2. Validação com valores corretos:')
const values = {
  area: 'Marketing Digital',
  topico: 'Instagram',
  tom: 'Casual',
}

const validation = engine.validate(values)
console.log('Valid:', validation.valid)
console.log('Errors:', validation.errors)
console.log('\n')

// Testar validação com valores incorretos
console.log('3. Validação com valores incorretos:')
const invalidValues = {
  area: 'Marketing Digital',
  // topico: missing (required)
  tom: 'Informal', // not in options
}

const invalidValidation = engine.validate(invalidValues)
console.log('Valid:', invalidValidation.valid)
console.log('Errors:', invalidValidation.errors)
console.log('\n')

// Testar preenchimento
console.log('4. Preenchimento do template:')
const result = engine.fill(values)
if (result.success) {
  console.log('Success:', result.success)
  console.log('Content:')
  console.log(result.content)
} else {
  console.log('Success:', result.success)
  console.log('Errors:', result.errors)
}
console.log('\n')

// Testar stats
console.log('5. Estatísticas de preenchimento:')
const stats = engine.getStats(values)
console.log('Total placeholders:', stats.total)
console.log('Filled:', stats.filled)
console.log('Required:', stats.required)
console.log('Required filled:', stats.requiredFilled)
console.log('Percentage:', stats.percentage + '%')
console.log('\n')

// Testar missing required
console.log('6. Campos obrigatórios faltando:')
const partialValues = {
  area: 'Marketing Digital',
  // topico e tom faltando
}
const missing = engine.getMissingRequired(partialValues)
console.log('Missing required fields:', missing)
console.log('\n')

console.log('=== TESTE COMPLETO ===')
