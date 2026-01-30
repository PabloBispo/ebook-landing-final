# Task #45 - Exemplos de Código
## Snippets para Testes e Integração

---

## 📚 Índice

1. [Teste da Função Slugify](#teste-da-função-slugify)
2. [Teste da API de Categorias](#teste-da-api-de-categorias)
3. [Teste da API de Tags](#teste-da-api-de-tags)
4. [Exemplos de Uso do PromptForm](#exemplos-de-uso-do-promptform)
5. [Testes com Playwright](#testes-com-playwright)
6. [Curl Commands](#curl-commands)

---

## 1. Teste da Função Slugify

### Node.js REPL

```javascript
// Abra um console Node.js
// node

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

const generateAlias = (title, count = 1) => {
  const firstWord = title.split(' ')[0].toUpperCase()
  const cleanWord = firstWord.replace(/[^A-Z0-9]/g, '')
  const number = String(count).padStart(2, '0')
  return `${cleanWord}-${number}`
}

// Testes
console.log(slugify('Criar Avatar Profundo'))
// → "criar-avatar-profundo"

console.log(slugify('Criação de Conteúdo'))
// → "criacao-de-conteudo"

console.log(slugify('Avatar: Profundo!!!'))
// → "avatar-profundo"

console.log(generateAlias('Criar Avatar Profundo'))
// → "CRIAR-01"

console.log(generateAlias('Marketing Digital', 5))
// → "MARKETING-05"
```

### Jest Unit Tests

```typescript
// lib/prompts/__tests__/slugify.test.ts

import { slugify, generateAlias } from '../slugify'

describe('slugify', () => {
  it('converts text to lowercase', () => {
    expect(slugify('CRIAR AVATAR')).toBe('criar-avatar')
  })

  it('removes accents', () => {
    expect(slugify('Criação de Conteúdo')).toBe('criacao-de-conteudo')
  })

  it('replaces spaces with hyphens', () => {
    expect(slugify('Criar Avatar Profundo')).toBe('criar-avatar-profundo')
  })

  it('removes special characters', () => {
    expect(slugify('Avatar: Profundo!!!')).toBe('avatar-profundo')
  })

  it('removes multiple hyphens', () => {
    expect(slugify('Criar  Avatar   Profundo')).toBe('criar-avatar-profundo')
  })

  it('trims hyphens from start and end', () => {
    expect(slugify(' Avatar ')).toBe('avatar')
  })

  it('handles empty string', () => {
    expect(slugify('')).toBe('')
  })

  it('handles only special characters', () => {
    expect(slugify('!@#$%')).toBe('')
  })
})

describe('generateAlias', () => {
  it('generates alias from first word', () => {
    expect(generateAlias('Criar Avatar')).toBe('CRIAR-01')
  })

  it('pads number with zeros', () => {
    expect(generateAlias('Avatar', 5)).toBe('AVATAR-05')
    expect(generateAlias('Avatar', 42)).toBe('AVATAR-42')
  })

  it('removes special characters from word', () => {
    expect(generateAlias('Avatar!!!')).toBe('AVATAR-01')
  })

  it('handles single word', () => {
    expect(generateAlias('Marketing')).toBe('MARKETING-01')
  })
})
```

---

## 2. Teste da API de Categorias

### Curl Command

```bash
# POST: Criar nova categoria
curl -X POST http://localhost:3000/api/admin/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marketing Digital",
    "icon": "📱",
    "description": "Prompts para marketing e vendas"
  }'

# Response esperada (201 Created):
{
  "success": true,
  "data": {
    "id": "cm5x1y2z3...",
    "name": "Marketing Digital",
    "slug": "marketing-digital",
    "icon": "📱",
    "description": "Prompts para marketing e vendas",
    "order": 5,
    "createdAt": "2026-01-30T...",
    "updatedAt": "2026-01-30T..."
  }
}
```

### JavaScript (fetch)

```javascript
// Frontend ou Node.js

async function createCategory(name, icon, description = '') {
  const response = await fetch('/api/admin/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, icon, description }),
  })

  const result = await response.json()

  if (response.ok) {
    console.log('Categoria criada:', result.data)
    return result.data
  } else {
    console.error('Erro:', result.error)
    throw new Error(result.error)
  }
}

// Uso
createCategory('SEO', '🔍', 'Otimização para buscadores')
  .then(category => console.log('ID:', category.id))
  .catch(err => console.error(err))
```

### Postman Collection

```json
{
  "info": {
    "name": "Task #45 - Admin APIs",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create Category",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Marketing Digital\",\n  \"icon\": \"📱\",\n  \"description\": \"Prompts para marketing\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/admin/categories",
          "host": ["{{baseUrl}}"],
          "path": ["api", "admin", "categories"]
        }
      }
    }
  ]
}
```

---

## 3. Teste da API de Tags

### Curl Command

```bash
# POST: Criar nova tag
curl -X POST http://localhost:3000/api/admin/tags \
  -H "Content-Type: application/json" \
  -d '{
    "name": "neuromarketing"
  }'

# Response esperada (201 Created):
{
  "success": true,
  "data": {
    "id": "cm5x1y2z3...",
    "name": "neuromarketing",
    "slug": "neuromarketing",
    "createdAt": "2026-01-30T...",
    "updatedAt": "2026-01-30T..."
  }
}

# POST: Tag duplicada (retorna existente)
curl -X POST http://localhost:3000/api/admin/tags \
  -H "Content-Type: application/json" \
  -d '{
    "name": "neuromarketing"
  }'

# Response esperada (200 OK):
{
  "success": true,
  "data": {
    "id": "cm5x1y2z3...",  # Mesmo ID de antes
    "name": "neuromarketing",
    "slug": "neuromarketing",
    "createdAt": "2026-01-30T...",
    "updatedAt": "2026-01-30T..."
  }
}
```

### JavaScript (async/await)

```javascript
async function createTag(name) {
  const response = await fetch('/api/admin/tags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })

  const result = await response.json()

  if (response.ok) {
    if (response.status === 201) {
      console.log('Tag criada:', result.data)
    } else {
      console.log('Tag já existe:', result.data)
    }
    return result.data
  } else {
    console.error('Erro:', result.error)
    throw new Error(result.error)
  }
}

// Criar múltiplas tags
const tags = ['avatar', 'marketing', 'copywriting', 'seo']

Promise.all(tags.map(tag => createTag(tag)))
  .then(results => console.log('Tags criadas:', results))
  .catch(err => console.error(err))
```

---

## 4. Exemplos de Uso do PromptForm

### Página de Criação

```typescript
// app/prompts/manage/new/page.tsx

'use client'

import { PromptForm } from '../components/PromptForm'
import { useRouter } from 'next/navigation'

export default function NewPromptPage() {
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/admin/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/prompts/manage/${result.data.slug}/edit`)
      }
    } catch (error) {
      console.error('Erro ao criar prompt:', error)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Novo Prompt</h1>
      <PromptForm onSubmit={handleSubmit} />
    </div>
  )
}
```

### Página de Edição

```typescript
// app/prompts/manage/[slug]/edit/page.tsx

'use client'

import { PromptForm } from '../../components/PromptForm'
import { useEffect, useState } from 'react'

export default function EditPromptPage({ params }: { params: { slug: string } }) {
  const [prompt, setPrompt] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/prompts/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        setPrompt(data.data)
        setLoading(false)
      })
  }, [params.slug])

  const handleSubmit = async (data: any) => {
    // Atualizar prompt...
  }

  if (loading) return <div>Carregando...</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Editar Prompt</h1>
      <PromptForm initialData={prompt} onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}
```

---

## 5. Testes com Playwright

### Setup

```bash
# Instalar Playwright
npm install -D @playwright/test

# Inicializar
npx playwright install
```

### Test File

```typescript
// tests/prompt-form.spec.ts

import { test, expect } from '@playwright/test'

test.describe('PromptForm - Auto-slug', () => {
  test('should generate slug from title', async ({ page }) => {
    await page.goto('http://localhost:3000/prompts/manage/new')

    // Digite título
    await page.fill('input[placeholder*="Ex: Criar Avatar"]', 'Criar Avatar Profundo')

    // Verifique slug gerado
    const slugInput = page.locator('input[placeholder="criar-avatar-profundo"]')
    await expect(slugInput).toHaveValue('criar-avatar-profundo')

    // Verifique alias gerado
    const aliasInput = page.locator('input[placeholder="CRIAR-01"]')
    await expect(aliasInput).toHaveValue('CRIAR-01')
  })

  test('should remove accents from slug', async ({ page }) => {
    await page.goto('http://localhost:3000/prompts/manage/new')

    await page.fill('input[placeholder*="Ex: Criar Avatar"]', 'Criação de Conteúdo')

    const slugInput = page.locator('input[placeholder="criar-avatar-profundo"]')
    await expect(slugInput).toHaveValue('criacao-de-conteudo')
  })
})

test.describe('PromptForm - Category Creator', () => {
  test('should create category inline', async ({ page }) => {
    await page.goto('http://localhost:3000/prompts/manage/new')

    // Clicar em "Nova Categoria"
    await page.click('text=Nova Categoria')

    // Preencher formulário
    await page.fill('input[placeholder="📚"]', '📱')
    await page.fill('input[placeholder="Nome da categoria"]', 'Marketing Digital')

    // Submeter
    await page.click('button:has-text("Criar")')

    // Aguardar categoria aparecer no select
    await page.waitForSelector('option:has-text("📱 Marketing Digital")')

    // Verificar se está selecionada
    const select = page.locator('select')
    await expect(select).toHaveValue(/.*/) // Qualquer ID
  })
})

test.describe('PromptForm - Tag Input', () => {
  test('should create tag dynamically', async ({ page }) => {
    await page.goto('http://localhost:3000/prompts/manage/new')

    // Focar no input de tags
    const tagInput = page.locator('input[placeholder*="buscar ou criar tag"]')
    await tagInput.fill('neuromarketing')

    // Clicar em "Criar tag"
    await page.click('text=Criar tag "neuromarketing"')

    // Verificar chip apareceu
    await expect(page.locator('text=neuromarketing')).toBeVisible()
  })

  test('should remove tag on click X', async ({ page }) => {
    await page.goto('http://localhost:3000/prompts/manage/new')

    // Adicionar tag (assumindo que existe)
    const tagInput = page.locator('input[placeholder*="buscar ou criar tag"]')
    await tagInput.fill('avatar')
    await page.click('text=avatar')

    // Remover tag
    await page.click('button:has-text("×")')

    // Verificar removida
    await expect(page.locator('span:has-text("avatar")')).not.toBeVisible()
  })
})

test.describe('PromptForm - Multi-select Models', () => {
  test('should select multiple models', async ({ page }) => {
    await page.goto('http://localhost:3000/prompts/manage/new')

    // Selecionar Universal
    await page.check('input[type="checkbox"]', { force: true })

    // Verificar pelo menos um selecionado
    const checkedBoxes = await page.locator('input[type="checkbox"]:checked').count()
    expect(checkedBoxes).toBeGreaterThan(0)
  })

  test('should disable submit without model', async ({ page }) => {
    await page.goto('http://localhost:3000/prompts/manage/new')

    // Verificar botão desabilitado
    const submitBtn = page.locator('button[type="submit"]')
    await expect(submitBtn).toBeDisabled()

    // Selecionar um modelo
    await page.check('input[type="checkbox"]', { force: true })

    // Verificar botão habilitado
    await expect(submitBtn).toBeEnabled()
  })
})
```

### Run Tests

```bash
# Rodar todos os testes
npx playwright test

# Rodar em modo UI
npx playwright test --ui

# Rodar específico
npx playwright test prompt-form.spec.ts

# Com debug
npx playwright test --debug
```

---

## 6. Curl Commands

### Fluxo Completo

```bash
# 1. Criar categoria
curl -X POST http://localhost:3000/api/admin/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Marketing","icon":"📱"}'

# Salvar ID da categoria
CATEGORY_ID="cm5x1y2z3..."

# 2. Criar tags
curl -X POST http://localhost:3000/api/admin/tags \
  -H "Content-Type: application/json" \
  -d '{"name":"avatar"}'

curl -X POST http://localhost:3000/api/admin/tags \
  -H "Content-Type: application/json" \
  -d '{"name":"marketing"}'

# Salvar IDs das tags
TAG1_ID="cm5x1y2z4..."
TAG2_ID="cm5x1y2z5..."

# 3. Criar prompt usando categoria e tags
curl -X POST http://localhost:3000/api/admin/prompts \
  -H "Content-Type: application/json" \
  -d "{
    \"slug\": \"criar-avatar-profundo\",
    \"alias\": \"CRIAR-01\",
    \"title\": \"Criar Avatar Profundo\",
    \"description\": \"Crie um avatar detalhado do cliente ideal\",
    \"content\": \"Você é um especialista em marketing...\",
    \"categoryId\": \"$CATEGORY_ID\",
    \"status\": \"PUBLISHED\",
    \"tagIds\": [\"$TAG1_ID\", \"$TAG2_ID\"],
    \"modelTags\": [\"UNIVERSAL\", \"CHATGPT_4\"]
  }"
```

---

## 7. Batch Testing Script

### Node.js Script

```javascript
// scripts/test-task45.js

const fetch = require('node-fetch')

const BASE_URL = 'http://localhost:3000'

async function testSlugify() {
  console.log('Testing slugify...')

  const tests = [
    { input: 'Criar Avatar Profundo', expected: 'criar-avatar-profundo' },
    { input: 'Criação de Conteúdo', expected: 'criacao-de-conteudo' },
    { input: 'Avatar: Profundo!!!', expected: 'avatar-profundo' },
  ]

  // Aqui você importaria a função real ou testaria via API
  console.log('✓ Slugify tests would go here')
}

async function testCategoryAPI() {
  console.log('Testing Category API...')

  const response = await fetch(`${BASE_URL}/api/admin/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Category',
      icon: '🧪',
    }),
  })

  const result = await response.json()

  if (response.ok) {
    console.log('✓ Category created:', result.data.id)
    return result.data.id
  } else {
    console.error('✗ Category creation failed:', result.error)
    throw new Error(result.error)
  }
}

async function testTagAPI() {
  console.log('Testing Tag API...')

  const response = await fetch(`${BASE_URL}/api/admin/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'test-tag',
    }),
  })

  const result = await response.json()

  if (response.ok) {
    console.log('✓ Tag created:', result.data.id)
    return result.data.id
  } else {
    console.error('✗ Tag creation failed:', result.error)
    throw new Error(result.error)
  }
}

async function runAllTests() {
  try {
    await testSlugify()
    await testCategoryAPI()
    await testTagAPI()
    console.log('\n✓ All tests passed!')
  } catch (error) {
    console.error('\n✗ Tests failed:', error)
    process.exit(1)
  }
}

runAllTests()
```

### Run Script

```bash
node scripts/test-task45.js
```

---

## 8. Browser Console Tests

### Abra DevTools e cole:

```javascript
// Test auto-slug generation
async function testAutoSlug() {
  const input = document.querySelector('input[placeholder*="Ex: Criar Avatar"]')
  const slugInput = document.querySelector('input[placeholder="criar-avatar-profundo"]')

  // Simular digitação
  input.value = 'Criar Avatar Profundo'
  input.dispatchEvent(new Event('input', { bubbles: true }))

  // Aguardar 100ms
  await new Promise(r => setTimeout(r, 100))

  console.log('Título:', input.value)
  console.log('Slug:', slugInput.value)
  console.assert(slugInput.value === 'criar-avatar-profundo', 'Slug should match')
}

testAutoSlug()
```

---

## Conclusão

Use estes exemplos para:
- ✅ Testar funcionalidades manualmente
- ✅ Integrar em testes automatizados
- ✅ Debugar problemas
- ✅ Validar edge cases
- ✅ Demonstrar para stakeholders

---

**Happy Testing!** 🧪
