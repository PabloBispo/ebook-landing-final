/**
 * Exemplos de uso do sistema de placeholders
 * Sprint 2 - Task #29
 */

import { PlaceholderEngine } from './placeholder-engine'
import type { Placeholder, PromptWithPlaceholders } from './types'

// ============================================================================
// EXEMPLO 1: Prompt para Geração de Ebook
// ============================================================================

export const ebookPromptTemplate: PromptWithPlaceholders = {
  template: `
Você é um especialista em {{area}} com foco em {{nicho}}.

Crie um ebook profissional sobre "{{titulo}}".

PÚBLICO-ALVO: {{publico:Iniciantes}}
TOM DE VOZ: {{tom}}
PÁGINAS: {{num_paginas:50}}

ESTRUTURA:
- Introdução envolvente
- {{num_capitulos}} capítulos principais
- Conclusão com call-to-action

REQUISITOS:
- Linguagem {{tom}}
- Exemplos práticos
- Foco em {{nicho}}
`.trim(),

  placeholders: [
    {
      key: 'area',
      label: 'Área de Expertise',
      type: 'select',
      required: true,
      options: [
        'Marketing Digital',
        'Desenvolvimento Pessoal',
        'Negócios',
        'Tecnologia',
        'Saúde e Bem-estar',
      ],
      description: 'Principal área de conhecimento do ebook',
    },
    {
      key: 'nicho',
      label: 'Nicho Específico',
      type: 'text',
      required: true,
      maxLength: 100,
      placeholder: 'Ex: Instagram para pequenos negócios',
      description: 'Especifique o nicho dentro da área escolhida',
    },
    {
      key: 'titulo',
      label: 'Título do Ebook',
      type: 'text',
      required: true,
      maxLength: 200,
      placeholder: 'Ex: Guia Completo de Instagram para Empreendedores',
      description: 'Título principal do ebook',
    },
    {
      key: 'publico',
      label: 'Público-Alvo',
      type: 'select',
      required: false,
      defaultValue: 'Iniciantes',
      options: ['Iniciantes', 'Intermediário', 'Avançado', 'Todos os níveis'],
      description: 'Nível de conhecimento do público',
    },
    {
      key: 'tom',
      label: 'Tom de Voz',
      type: 'select',
      required: true,
      options: ['Formal', 'Casual', 'Técnico', 'Inspiracional'],
      description: 'Estilo de escrita do conteúdo',
    },
    {
      key: 'num_paginas',
      label: 'Número de Páginas',
      type: 'number',
      required: false,
      defaultValue: '50',
      description: 'Quantidade estimada de páginas',
    },
    {
      key: 'num_capitulos',
      label: 'Número de Capítulos',
      type: 'number',
      required: true,
      description: 'Quantidade de capítulos principais',
    },
  ],
}

// ============================================================================
// EXEMPLO 2: Prompt para Landing Page
// ============================================================================

export const landingPagePromptTemplate: PromptWithPlaceholders = {
  template: `
Crie uma landing page de alta conversão para {{produto}}.

PRODUTO: {{produto}}
PÚBLICO: {{publico_alvo}}
OBJETIVO: {{objetivo}}

SEÇÕES NECESSÁRIAS:
1. Hero Section com {{valor_principal}}
2. Benefícios (mínimo 3)
3. Como funciona
4. Depoimentos
5. CTA: {{cta_texto}}
`.trim(),

  placeholders: [
    {
      key: 'produto',
      label: 'Nome do Produto',
      type: 'text',
      required: true,
      maxLength: 100,
      description: 'Nome do produto ou serviço',
    },
    {
      key: 'publico_alvo',
      label: 'Público-Alvo',
      type: 'text',
      required: true,
      description: 'Descrição do público-alvo',
    },
    {
      key: 'objetivo',
      label: 'Objetivo',
      type: 'select',
      required: true,
      options: ['Venda direta', 'Captura de leads', 'Pré-lançamento'],
      description: 'Principal objetivo da página',
    },
    {
      key: 'valor_principal',
      label: 'Proposta de Valor',
      type: 'textarea',
      required: true,
      maxLength: 200,
      description: 'Principal benefício oferecido',
    },
    {
      key: 'cta_texto',
      label: 'Texto do CTA',
      type: 'text',
      required: true,
      maxLength: 50,
      placeholder: 'Ex: Quero começar agora',
      description: 'Texto do botão de call-to-action',
    },
  ],
}

// ============================================================================
// FUNÇÕES HELPER
// ============================================================================

export function preencherPromptEbook(valores: Record<string, string>) {
  const engine = new PlaceholderEngine(
    ebookPromptTemplate.template,
    ebookPromptTemplate.placeholders
  )
  return engine.fill(valores)
}

export function preencherPromptLandingPage(valores: Record<string, string>) {
  const engine = new PlaceholderEngine(
    landingPagePromptTemplate.template,
    landingPagePromptTemplate.placeholders
  )
  return engine.fill(valores)
}
