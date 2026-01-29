# 🚀 Quick Start - Implementação do Repositório de Prompts

**Guia rápido para começar a implementar o sistema**

---

## 📦 Passo 1: Atualizar Schema Prisma

```bash
# 1. Adicionar os modelos ao schema.prisma
cat docs/PROMPTS_SCHEMA.prisma >> prisma/schema.prisma

# 2. Criar migration
npx prisma migrate dev --name add_prompts_system

# 3. Gerar client
npx prisma generate
```

---

## 🌱 Passo 2: Seed Inicial

Criar arquivo `prisma/seed-prompts.ts`:

```typescript
import { PrismaClient, UserRole, PromptStatus, AIModel } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Staff user
  const staff = await prisma.user.upsert({
    where: { email: 'pablofernando@live.com' },
    update: { role: UserRole.STAFF },
    create: {
      email: 'pablofernando@live.com',
      name: 'Pablo Fernando',
      role: UserRole.STAFF,
    },
  })

  // Categorias
  await prisma.promptCategory.createMany({
    data: [
      { name: 'Estrutura de Ebooks', slug: 'estrutura-ebooks', icon: '📚', order: 1 },
      { name: 'Edição e Revisão', slug: 'edicao-revisao', icon: '✏️', order: 2 },
      { name: 'Marketing', slug: 'marketing', icon: '📢', order: 3 },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Seed completo!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Executar:
```bash
npx tsx prisma/seed-prompts.ts
```

---

## 🔧 Passo 3: Criar Lib Helpers

### `lib/prompt-parser.ts`

```typescript
export interface Placeholder {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'number'
  required: boolean
  defaultValue?: string
  options?: string[]
  description?: string
  maxLength?: number
}

export function extractPlaceholders(template: string): string[] {
  const regex = /\{\{([a-zA-Z0-9_]+)(?::([^}]+))?\}\}/g
  const placeholders: string[] = []
  let match

  while ((match = regex.exec(template)) !== null) {
    placeholders.push(match[1])
  }

  return [...new Set(placeholders)]
}

export function fillTemplate(
  template: string,
  values: Record<string, string>
): string {
  return template.replace(
    /\{\{([a-zA-Z0-9_]+)(?::([^}]+))?\}\}/g,
    (match, key, defaultValue) => {
      return values[key] || defaultValue || match
    }
  )
}

export function validatePlaceholders(
  placeholders: Placeholder[],
  values: Record<string, string>
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  placeholders.forEach(placeholder => {
    const value = values[placeholder.key]

    if (placeholder.required && !value) {
      errors[placeholder.key] = `${placeholder.label} é obrigatório`
    }

    if (value && placeholder.maxLength && value.length > placeholder.maxLength) {
      errors[placeholder.key] = `Máximo de ${placeholder.maxLength} caracteres`
    }
  })

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
```

---

## 🛣️ Passo 4: Criar API Routes

### `app/api/prompts/route.ts` (Listagem)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PromptStatus } from '@prisma/client'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const tag = searchParams.get('tag')
  const model = searchParams.get('model')
  const status = searchParams.get('status') as PromptStatus | null

  try {
    const prompts = await prisma.prompt.findMany({
      where: {
        status: status || PromptStatus.PUBLISHED,
        ...(category && { category: { slug: category } }),
        ...(tag && { tags: { some: { slug: tag } } }),
        ...(model && { models: { has: model } }),
      },
      include: {
        category: true,
        tags: true,
        creator: {
          select: { name: true, image: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(prompts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // TODO: Verificar autenticação e role STAFF
  const body = await request.json()

  try {
    const prompt = await prisma.prompt.create({
      data: {
        alias: body.alias,
        title: body.title,
        description: body.description,
        models: body.models,
        status: body.status || PromptStatus.DRAFT,
        categoryId: body.categoryId,
        creatorId: body.creatorId, // TODO: Get from session
        currentVersion: 'v1',
        versions: {
          create: {
            version: 'v1',
            content: body.content,
            placeholders: body.placeholders,
            changelog: 'Initial version',
          },
        },
      },
      include: {
        versions: true,
        category: true,
        tags: true,
      },
    })

    return NextResponse.json(prompt, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create prompt' },
      { status: 500 }
    )
  }
}
```

### `app/api/prompts/[alias]/route.ts` (Detalhes)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { alias: string } }
) {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: { alias: params.alias },
      include: {
        versions: {
          orderBy: { createdAt: 'desc' },
        },
        category: true,
        tags: true,
        creator: {
          select: { name: true, image: true },
        },
      },
    })

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt not found' },
        { status: 404 }
      )
    }

    // Incrementar view count
    await prisma.prompt.update({
      where: { alias: params.alias },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json(prompt)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch prompt' },
      { status: 500 }
    )
  }
}
```

### `app/api/prompts/[alias]/copy/route.ts` (Analytics)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { alias: string } }
) {
  const body = await request.json()

  try {
    // Incrementar copy count
    await prisma.prompt.update({
      where: { alias: params.alias },
      data: { copyCount: { increment: 1 } },
    })

    // Registrar uso
    await prisma.promptUsage.create({
      data: {
        promptId: body.promptId,
        userId: body.userId, // Opcional
        version: body.version,
        model: body.model,
        filledData: body.filledData, // Opcional, para analytics
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to register copy' },
      { status: 500 }
    )
  }
}
```

---

## 📄 Passo 5: Criar Página Pública

### `app/prompts/[alias]/page.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Copy, Check } from 'lucide-react'
import { fillTemplate } from '@/lib/prompt-parser'

export default function PromptPage() {
  const params = useParams()
  const [prompt, setPrompt] = useState<any>(null)
  const [version, setVersion] = useState('current')
  const [model, setModel] = useState('')
  const [values, setValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch(`/api/prompts/${params.alias}`)
      .then(res => res.json())
      .then(data => {
        setPrompt(data)
        if (data.models[0]) setModel(data.models[0])
      })
  }, [params.alias])

  if (!prompt) return <div>Loading...</div>

  const currentVersion = prompt.versions.find(
    (v: any) => v.version === (version === 'current' ? prompt.currentVersion : version)
  )

  const filledContent = fillTemplate(currentVersion.content, values)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(filledContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    // Register analytics
    fetch(`/api/prompts/${params.alias}/copy`, {
      method: 'POST',
      body: JSON.stringify({
        promptId: prompt.id,
        version: currentVersion.version,
        model,
        filledData: values,
      }),
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{prompt.title}</h1>
        <p className="text-lg text-muted-foreground">{prompt.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {prompt.tags.map((tag: any) => (
            <span
              key={tag.id}
              className="px-3 py-1 rounded-full bg-secondary text-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Selectors */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Versão</label>
          <select
            value={version}
            onChange={e => setVersion(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
          >
            {prompt.versions.map((v: any) => (
              <option key={v.version} value={v.version}>
                {v.version} {v.version === prompt.currentVersion && '(atual)'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Modelo</label>
          <select
            value={model}
            onChange={e => setModel(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
          >
            {prompt.models.map((m: string) => (
              <option key={m} value={m}>
                {m.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Form */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Preencha os campos</h2>
        {currentVersion.placeholders.map((p: any) => (
          <div key={p.key} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {p.label} {p.required && <span className="text-red-500">*</span>}
            </label>
            {p.type === 'textarea' ? (
              <textarea
                value={values[p.key] || ''}
                onChange={e => setValues({ ...values, [p.key]: e.target.value })}
                placeholder={p.description}
                className="w-full px-4 py-2 rounded-lg border min-h-[100px]"
              />
            ) : (
              <input
                type={p.type}
                value={values[p.key] || ''}
                onChange={e => setValues({ ...values, [p.key]: e.target.value })}
                placeholder={p.description}
                className="w-full px-4 py-2 rounded-lg border"
              />
            )}
          </div>
        ))}
      </div>

      {/* Preview */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Preview do Prompt</h2>
        <div className="bg-secondary/20 p-6 rounded-lg">
          <pre className="whitespace-pre-wrap text-sm">{filledContent}</pre>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          {copied ? 'Copiado!' : 'Copiar Prompt'}
        </button>

        <button
          onClick={() => setValues({})}
          className="px-6 py-3 border rounded-lg hover:bg-secondary"
        >
          Limpar
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 pt-8 border-t">
        <div className="flex gap-8 text-sm text-muted-foreground">
          <span>👁️ {prompt.viewCount} visualizações</span>
          <span>📋 {prompt.copyCount} cópias</span>
        </div>
      </div>
    </div>
  )
}
```

---

## 🎯 Checklist de Implementação

### Sprint 1: Foundation
- [ ] Adicionar models ao schema Prisma
- [ ] Criar migrations
- [ ] Seed de categorias e tags
- [ ] Criar lib/prompt-parser.ts
- [ ] Criar API /api/prompts (GET, POST)
- [ ] Criar API /api/prompts/[alias] (GET)
- [ ] Criar API /api/prompts/[alias]/copy (POST)

### Sprint 2: Staff Management
- [ ] Criar /prompts/manage (dashboard)
- [ ] Criar /prompts/manage/new (form)
- [ ] Criar /prompts/manage/[alias]/edit
- [ ] Auto-detecção de placeholders
- [ ] Sistema de versionamento

### Sprint 3: Public Pages
- [ ] Criar /prompts (listagem)
- [ ] Criar /prompts/[alias] (uso)
- [ ] Filtros e busca
- [ ] Analytics tracking

### Sprint 4: Enhancement
- [ ] Favoritos
- [ ] Histórico de uso
- [ ] Export/Import
- [ ] Dashboard analytics

---

## 🧪 Testar Localmente

```bash
# 1. Executar seed
npx tsx prisma/seed-prompts.ts

# 2. Iniciar dev server
npm run dev

# 3. Testar rotas
curl http://localhost:3000/api/prompts
curl http://localhost:3000/api/prompts/estrutura-ebook-ficcao

# 4. Acessar páginas
open http://localhost:3000/prompts
open http://localhost:3000/prompts/estrutura-ebook-ficcao
```

---

## 📚 Próximos Passos

1. **Ler especificação completa:** `docs/PROMPTS_REPOSITORY_SPEC.md`
2. **Implementar Sprint 1** (foundation)
3. **Testar com prompts reais**
4. **Iterar baseado em feedback**

---

**Boa implementação! 🚀**
