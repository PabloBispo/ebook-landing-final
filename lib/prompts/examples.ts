/**
 * Exemplos de uso do sistema de placeholders
 * Sprint 2 - Task #29
 */

import { PlaceholderEngine } from './placeholder-engine'
import { PlaceholderValidator } from './validator'
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
PREÇO: {{preco:A definir}}

SEÇÕES NECESSÁRIAS:
1. Hero Section com {{valor_principal}}
2. Benefícios (mínimo 3)
3. Como funciona
4. Depoimentos
5. Garantia
6. CTA: {{cta_texto}}

ELEMENTOS:
- Título impactante
- Subtítulo explicativo
- Bullets de benefícios
- Urgência: {{tipo_urgencia:limitado}}

CONTATO:
{{email_contato}}
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
      label: 'Objetivo da Landing Page',
      type: 'select',
      required: true,
      options: ['Venda direta', 'Captura de leads', 'Pré-lançamento', 'Webinar'],
      description: 'Principal objetivo da página',
    },
    {
      key: 'preco',
      label: 'Preço',
      type: 'text',
      required: false,
      defaultValue: 'A definir',
      description: 'Valor do produto/serviço',
    },
    {
      key: 'valor_principal',
      label: 'Proposta de Valor',
      type: 'textarea',
      required: true,
      maxLength: 200,
      description: 'Principal benefício ou transformação oferecida',
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
    {
      key: 'tipo_urgencia',
      label: 'Tipo de Urgência',
      type: 'select',
      required: false,
      defaultValue: 'limitado',
      options: ['limitado', 'tempo', 'bônus', 'nenhuma'],
      description: 'Estratégia de urgência/escassez',
    },
    {
      key: 'email_contato',
      label: 'Email de Contato',
      type: 'email',
      required: true,
      description: 'Email para suporte ou informações',
    },
  ],
}

// ============================================================================
// EXEMPLO 3: Prompt para Email Marketing
// ============================================================================

export const emailMarketingPromptTemplate: PromptWithPlaceholders = {
  template: `
Crie um email de {{tipo_email}} para {{produto}}.

DE: {{nome_remetente}}
PARA: {{segmento_lista}}
ASSUNTO: {{assunto}}

CORPO DO EMAIL:
Olá {{tratamento:amigo(a)}},

{{abertura}}

{{corpo_principal}}

{{oferta}}

{{cta}}

{{assinatura:Att, Equipe}}
{{link_descadastro:Descadastrar}}
`.trim(),

  placeholders: [
    {
      key: 'tipo_email',
      label: 'Tipo de Email',
      type: 'select',
      required: true,
      options: [
        'boas-vindas',
        'venda',
        'nutrição',
        'recuperação de carrinho',
        'pós-venda',
      ],
      description: 'Objetivo do email',
    },
    {
      key: 'produto',
      label: 'Produto/Serviço',
      type: 'text',
      required: true,
      description: 'O que está sendo promovido',
    },
    {
      key: 'nome_remetente',
      label: 'Nome do Remetente',
      type: 'text',
      required: true,
      description: 'Quem envia o email',
    },
    {
      key: 'segmento_lista',
      label: 'Segmento da Lista',
      type: 'text',
      required: true,
      description: 'Para qual segmento da lista',
    },
    {
      key: 'assunto',
      label: 'Linha de Assunto',
      type: 'text',
      required: true,
      maxLength: 100,
      description: 'Assunto do email',
    },
    {
      key: 'tratamento',
      label: 'Forma de Tratamento',
      type: 'text',
      required: false,
      defaultValue: 'amigo(a)',
      description: 'Como se referir ao destinatário',
    },
    {
      key: 'abertura',
      label: 'Abertura',
      type: 'textarea',
      required: true,
      description: 'Primeiro parágrafo do email',
    },
    {
      key: 'corpo_principal',
      label: 'Corpo Principal',
      type: 'textarea',
      required: true,
      description: 'Conteúdo principal do email',
    },
    {
      key: 'oferta',
      label: 'Oferta',
      type: 'textarea',
      required: true,
      description: 'Descrição da oferta',
    },
    {
      key: 'cta',
      label: 'Call to Action',
      type: 'text',
      required: true,
      maxLength: 100,
      description: 'Texto do botão/link de ação',
    },
    {
      key: 'assinatura',
      label: 'Assinatura',
      type: 'text',
      required: false,
      defaultValue: 'Att, Equipe',
      description: 'Assinatura do email',
    },
    {
      key: 'link_descadastro',
      label: 'Texto Descadastro',
      type: 'text',
      required: false,
      defaultValue: 'Descadastrar',
      description: 'Texto do link de descadastro',
    },
  ],
}

// ============================================================================
// FUNÇÕES HELPER PARA EXEMPLOS
// ============================================================================

/**
 * Preenche e valida o prompt de ebook
 */
export function preencherPromptEbook(valores: Record<string, string>) {
  const engine = new PlaceholderEngine(
    ebookPromptTemplate.template,
    ebookPromptTemplate.placeholders
  )

  return engine.fill(valores)
}

/**
 * Preenche e valida o prompt de landing page
 */
export function preencherPromptLandingPage(valores: Record<string, string>) {
  const engine = new PlaceholderEngine(
    landingPagePromptTemplate.template,
    landingPagePromptTemplate.placeholders
  )

  return engine.fill(valores)
}

/**
 * Preenche e valida o prompt de email
 */
export function preencherPromptEmail(valores: Record<string, string>) {
  const engine = new PlaceholderEngine(
    emailMarketingPromptTemplate.template,
    emailMarketingPromptTemplate.placeholders
  )

  return engine.fill(valores)
}

/**
 * Valida valores antes de preencher
 */
export function validarValores(
  placeholders: Placeholder[],
  valores: Record<string, string>
) {
  return PlaceholderValidator.validateAsObject(placeholders, valores)
}

// ============================================================================
// EXEMPLO DE USO
// ============================================================================

export function exemploDeUso() {
  // Exemplo 1: Ebook
  const valoresEbook = {
    area: 'Marketing Digital',
    nicho: 'Instagram para pequenos negócios',
    titulo: 'Guia Completo de Instagram 2026',
    publico: 'Iniciantes',
    tom: 'Casual',
    num_paginas: '80',
    num_capitulos: '10',
  }

  const resultadoEbook = preencherPromptEbook(valoresEbook)

  if (resultadoEbook.success) {
    console.log('Prompt de Ebook gerado:')
    console.log(resultadoEbook.content)
  } else {
    console.log('Erros:', resultadoEbook.errors)
  }

  // Exemplo 2: Landing Page
  const valoresLandingPage = {
    produto: 'Curso Instagram Pro',
    publico_alvo: 'Empreendedores e freelancers',
    objetivo: 'Venda direta',
    preco: 'R$ 297',
    valor_principal:
      'Aprenda a transformar seu Instagram em uma máquina de vendas',
    cta_texto: 'Quero dominar o Instagram',
    tipo_urgencia: 'tempo',
    email_contato: 'contato@exemplo.com',
  }

  const resultadoLandingPage = preencherPromptLandingPage(valoresLandingPage)

  if (resultadoLandingPage.success) {
    console.log('\nPrompt de Landing Page gerado:')
    console.log(resultadoLandingPage.content)
  }

  return {
    ebook: resultadoEbook,
    landingPage: resultadoLandingPage,
  }
}
