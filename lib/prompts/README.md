# Sistema de Placeholders - Repositório de Prompts

Sistema completo para processamento de templates com placeholders dinâmicos `{{variavel}}`.

## Funcionalidades

### 1. Parser (`parser.ts`)

Funções utilitárias para processar templates:

```typescript
import { extractPlaceholders, fillTemplate } from '@/lib/prompts/parser'

// Extrair placeholders
const placeholders = extractPlaceholders('Olá {{nome}}!')
// ['nome']

// Preencher template
const result = fillTemplate('Olá {{nome:Visitante}}!', { nome: 'João' })
// 'Olá João!'

// Com default
const result2 = fillTemplate('Olá {{nome:Visitante}}!', {})
// 'Olá Visitante!'
```

### 2. Placeholder Engine (`placeholder-engine.ts`)

Motor principal para gerenciar placeholders:

```typescript
import { PlaceholderEngine } from '@/lib/prompts/placeholder-engine'

const template = 'Você é {{especialidade}}. Ajude com {{topico}}.'

const config = [
  {
    key: 'especialidade',
    label: 'Especialidade',
    type: 'text',
    required: true,
  },
  {
    key: 'topico',
    label: 'Tópico',
    type: 'text',
    required: true,
  },
]

const engine = new PlaceholderEngine(template, config)

// Auto-detectar placeholders
const autoDetected = PlaceholderEngine.autoDetect(template)

// Validar valores
const validation = engine.validate({
  especialidade: 'Marketing',
  topico: 'Instagram',
})

// Preencher template
const result = engine.fill({
  especialidade: 'Marketing',
  topico: 'Instagram',
})
// { success: true, content: '...' }

// Estatísticas
const stats = engine.getStats(values)
// { total: 2, filled: 2, percentage: 100, ... }
```

### 3. Validator (`validator.ts`)

Validação dedicada de campos:

```typescript
import { PlaceholderValidator } from '@/lib/prompts/validator'

const errors = PlaceholderValidator.validateAll(placeholders, values)
// [ { field: 'email', message: 'Email inválido', type: 'type' } ]

const errorObject = PlaceholderValidator.validateAsObject(placeholders, values)
// { email: 'Email inválido' }
```

## Tipos de Placeholders

### text
Campo de texto simples:
```typescript
{
  key: 'nome',
  label: 'Nome',
  type: 'text',
  required: true,
  maxLength: 100,
}
```

### textarea
Área de texto para conteúdos maiores:
```typescript
{
  key: 'descricao',
  label: 'Descrição',
  type: 'textarea',
  required: true,
}
```

### select
Seleção de opções:
```typescript
{
  key: 'tom',
  label: 'Tom de Voz',
  type: 'select',
  required: true,
  options: ['Formal', 'Casual', 'Técnico'],
}
```

### number
Valores numéricos:
```typescript
{
  key: 'idade',
  label: 'Idade',
  type: 'number',
  required: true,
}
```

### email
Validação de email:
```typescript
{
  key: 'contato',
  label: 'Email',
  type: 'email',
  required: true,
}
```

### url
Validação de URLs:
```typescript
{
  key: 'site',
  label: 'Website',
  type: 'url',
  required: false,
}
```

## Sintaxe de Templates

### Placeholder simples
```
{{variavel}}
```

### Placeholder com default
```
{{variavel:valor_padrao}}
```

### Exemplo completo
```
Olá {{nome:Visitante}},

Você está procurando informações sobre {{topico}}.

{{descricao:Descrição não fornecida}}
```

## Validações

O sistema suporta:

- **Required**: Campo obrigatório
- **Max Length**: Limite de caracteres
- **Type**: Validação por tipo (email, url, number)
- **Options**: Validação de opções em select

## Testes

Execute os testes:

```bash
npx tsx test-placeholders.ts
```

Ou com Jest:

```bash
npm test lib/prompts/__tests__/parser.test.ts
```

## Uso em Componentes

### Exemplo React

```typescript
'use client'

import { useState } from 'react'
import { PlaceholderEngine } from '@/lib/prompts/placeholder-engine'
import type { Placeholder } from '@/lib/prompts/types'

export function PromptForm() {
  const template = 'Você é {{especialidade}}. Ajude com {{topico}}.'

  const config: Placeholder[] = [
    { key: 'especialidade', label: 'Especialidade', type: 'text', required: true },
    { key: 'topico', label: 'Tópico', type: 'text', required: true },
  ]

  const engine = new PlaceholderEngine(template, config)
  const [values, setValues] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = () => {
    const result = engine.fill(values)

    if (result.success) {
      console.log('Template preenchido:', result.content)
    } else {
      setErrors(result.errors || {})
    }
  }

  return (
    <form>
      {config.map(field => (
        <div key={field.key}>
          <label>{field.label}</label>
          <input
            value={values[field.key] || ''}
            onChange={e => setValues({ ...values, [field.key]: e.target.value })}
          />
          {errors[field.key] && <span>{errors[field.key]}</span>}
        </div>
      ))}
      <button type="button" onClick={handleSubmit}>
        Gerar Prompt
      </button>
    </form>
  )
}
```

## Roadmap

Sprint 2 - Task #29 (Concluído):
- Parser de placeholders
- Engine de substituição
- Validator
- Testes

Sprint 2 - Task #30 (Próximo):
- Componentes React
- UI para formulários
- Preview em tempo real
- Integração com banco de dados

## Arquitetura

```
lib/prompts/
├── types.ts              # Tipos TypeScript
├── parser.ts             # Funções de parsing
├── placeholder-engine.ts # Motor principal
├── validator.ts          # Validação de campos
├── index.ts              # Exports centralizados
├── __tests__/
│   └── parser.test.ts    # Testes unitários
└── README.md             # Esta documentação
```

## Contribuindo

Para adicionar novos tipos de validação:

1. Adicione o tipo em `types.ts`:
```typescript
export type PlaceholderType = ... | 'novo_tipo'
```

2. Implemente validação em `validator.ts`:
```typescript
case 'novo_tipo':
  // Lógica de validação
  break
```

3. Adicione testes em `__tests__/`

## Licença

Parte do projeto @bispo.ia - Repositório de Prompts
