import {
  ebookPromptTemplate,
  landingPagePromptTemplate,
  preencherPromptEbook,
  preencherPromptLandingPage,
} from './lib/prompts/examples'

console.log('=== TESTE DOS TEMPLATES DE EXEMPLO ===\n')

// Teste 1: Ebook Template
console.log('1. Template de Ebook:')
console.log('Placeholders:', ebookPromptTemplate.placeholders.length)
console.log('Template length:', ebookPromptTemplate.template.length, 'chars\n')

const ebookValues = {
  area: 'Marketing Digital',
  nicho: 'Instagram para pequenos negócios',
  titulo: 'Guia Completo de Instagram 2026',
  publico: 'Iniciantes',
  tom: 'Casual',
  num_paginas: '80',
  num_capitulos: '10',
}

const resultEbook = preencherPromptEbook(ebookValues)
if (resultEbook.success) {
  console.log('✓ Ebook prompt gerado com sucesso!')
  console.log('Preview (primeiros 200 chars):')
  console.log(resultEbook.content?.substring(0, 200) + '...\n')
} else {
  console.log('✗ Erro:', resultEbook.errors)
}

// Teste 2: Landing Page Template
console.log('2. Template de Landing Page:')
console.log('Placeholders:', landingPagePromptTemplate.placeholders.length)
console.log('Template length:', landingPagePromptTemplate.template.length, 'chars\n')

const landingValues = {
  produto: 'Curso Instagram Pro',
  publico_alvo: 'Empreendedores e freelancers',
  objetivo: 'Venda direta',
  valor_principal:
    'Aprenda a transformar seu Instagram em uma máquina de vendas',
  cta_texto: 'Quero dominar o Instagram',
}

const resultLanding = preencherPromptLandingPage(landingValues)
if (resultLanding.success) {
  console.log('✓ Landing page prompt gerado com sucesso!')
  console.log('Preview (primeiros 200 chars):')
  console.log(resultLanding.content?.substring(0, 200) + '...\n')
} else {
  console.log('✗ Erro:', resultLanding.errors)
}

// Teste 3: Validação de campos faltando
console.log('3. Teste de validação (campos faltando):')
const incompleteValues = {
  area: 'Marketing Digital',
  // faltam outros campos required
}

const resultIncomplete = preencherPromptEbook(incompleteValues)
if (!resultIncomplete.success) {
  console.log('✓ Validação funcionou! Erros detectados:')
  console.log(Object.keys(resultIncomplete.errors || {}).join(', '))
} else {
  console.log('✗ Validação não detectou campos faltando')
}

console.log('\n=== TESTE COMPLETO ===')
