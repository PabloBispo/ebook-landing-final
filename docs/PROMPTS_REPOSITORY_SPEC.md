# 📚 Especificação Técnica - Repositório de Prompts

**Projeto:** @bispo.ia - Prompt Repository System
**Versão:** 1.0
**Data:** 2026-01-28
**Autor:** Claude Sonnet 4.5 + @pablofernando

---

## 🎯 Visão Geral

Sistema completo para gerenciar, versionar e disponibilizar prompts de IA para usuários do curso, com controle de acesso por perfil (comum/staff), versionamento, tags de modelos e placeholders dinâmicos.

---

## 📊 Modelo de Dados

### Entidades Principais

```prisma
// Schema Prisma

enum UserRole {
  USER   // Usuário comum - pode usar prompts
  STAFF  // Staff - pode criar/editar prompts
  ADMIN  // Admin - acesso total
}

enum PromptStatus {
  DRAFT      // Rascunho (visível apenas para staff)
  PUBLISHED  // Publicado (visível para todos)
  ARCHIVED   // Arquivado (não aparece em listagens)
}

enum AIModel {
  CHATGPT_4       // ChatGPT-4
  CHATGPT_4O      // ChatGPT-4o
  CHATGPT_35      // ChatGPT-3.5
  CLAUDE_OPUS     // Claude Opus 4.5
  CLAUDE_SONNET   // Claude Sonnet 4.5
  CLAUDE_HAIKU    // Claude Haiku 3.5
  GEMINI_2_FLASH  // Gemini 2.0 Flash
  GEMINI_15_PRO   // Gemini 1.5 Pro
  GEMINI_15_FLASH // Gemini 1.5 Flash
  UNIVERSAL       // Funciona em qualquer modelo
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  role          UserRole @default(USER)

  // Relacionamentos
  createdPrompts Prompt[]      @relation("PromptCreator")
  promptUsage    PromptUsage[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Prompt {
  id          String       @id @default(cuid())
  alias       String       @unique // slug amigável (ex: "estrutura-ebook-ficcao")
  title       String                // Título exibido
  description String       @db.Text // Descrição detalhada

  // Versionamento
  currentVersion String     @default("v1")
  versions       PromptVersion[]

  // Categorização
  tags        PromptTag[]
  models      AIModel[]           // Modelos recomendados
  category    PromptCategory? @relation(fields: [categoryId], references: [id])
  categoryId  String?

  // Controle
  status      PromptStatus @default(DRAFT)
  creatorId   String
  creator     User         @relation("PromptCreator", fields: [creatorId], references: [id])

  // Estatísticas
  usage       PromptUsage[]
  viewCount   Int          @default(0)
  copyCount   Int          @default(0)

  // Metadados
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  publishedAt DateTime?

  @@index([alias])
  @@index([status])
  @@index([categoryId])
}

model PromptVersion {
  id        String   @id @default(cuid())
  promptId  String
  prompt    Prompt   @relation(fields: [promptId], references: [id], onDelete: Cascade)

  version   String   // "v1", "v2", "v3"
  content   String   @db.Text // Template do prompt com {{placeholders}}

  // Placeholders
  placeholders Json   // [{ key: "topico", label: "Tópico do ebook", type: "text", required: true }]

  // Metadata
  changelog String?  @db.Text // O que mudou nesta versão
  createdAt DateTime @default(now())

  @@unique([promptId, version])
  @@index([promptId])
}

model PromptCategory {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?
  icon        String?  // Emoji ou nome do ícone
  order       Int      @default(0)

  prompts     Prompt[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model PromptTag {
  id       String   @id @default(cuid())
  name     String   @unique
  slug     String   @unique
  color    String?  // Hex color para exibição

  prompts  Prompt[]

  createdAt DateTime @default(now())
}

model PromptUsage {
  id        String   @id @default(cuid())

  promptId  String
  prompt    Prompt   @relation(fields: [promptId], references: [id], onDelete: Cascade)

  userId    String?
  user      User?    @relation(fields: [userId], references: [id], onDelete: SetNull)

  version   String   // Versão usada
  model     AIModel? // Modelo escolhido pelo usuário

  // Dados preenchidos (anonimizado)
  filledData Json?   // Placeholders preenchidos (opcional, para analytics)

  createdAt DateTime @default(now())

  @@index([promptId])
  @@index([userId])
  @@index([createdAt])
}
```

---

## 🗺️ Estrutura de Rotas

### API Routes

```
/api/prompts
├── GET     /                    # Listar prompts (públicos)
├── POST    /                    # Criar prompt (staff only)
├── GET     /:alias              # Detalhes do prompt
├── PATCH   /:alias              # Atualizar prompt (staff only)
├── DELETE  /:alias              # Deletar prompt (staff only)
│
├── GET     /:alias/versions     # Listar versões
├── POST    /:alias/versions     # Criar nova versão (staff only)
├── GET     /:alias/versions/:v  # Obter versão específica
│
├── POST    /:alias/copy         # Registrar cópia (analytics)
├── POST    /:alias/view         # Registrar visualização
│
└── GET     /categories          # Listar categorias
```

### Pages (Frontend)

```
/prompts
├── /                           # Listagem de prompts (grid/cards)
├── /:alias                     # Página do prompt (uso público)
│   └── ?v=v2                   # Query param para versão
│
└── /manage                     # Área de gerenciamento (staff only)
    ├── /                       # Dashboard de prompts
    ├── /new                    # Criar novo prompt
    ├── /:alias/edit            # Editar prompt existente
    └── /:alias/versions        # Gerenciar versões
```

---

## 🎨 Wireframes & Fluxos

### 1. Página Pública do Prompt (`/prompts/:alias`)

```
┌─────────────────────────────────────────────────────────┐
│ Header                                         [Login]   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ← Voltar para Prompts                                  │
│                                                          │
│  📝 Estrutura de Ebook de Ficção                        │
│  Crie a estrutura completa de um ebook de ficção        │
│                                                          │
│  [ChatGPT-4] [Claude Opus] [Gemini 2.0]                 │
│  #ebook #estrutura #ficcao                               │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  Descrição                                               │
│  Este prompt ajuda a criar a estrutura completa de      │
│  um ebook de ficção, incluindo capítulos, arcos...      │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  ⚙️ Configurações                                        │
│                                                          │
│  Versão: [v1 ▼] [v2] [v3 (atual)]                       │
│  Modelo: [ChatGPT-4 ▼]                                   │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  📋 Preencha os campos                                   │
│                                                          │
│  Tópico do ebook *                                       │
│  [_____________________________________________]         │
│                                                          │
│  Público-alvo                                            │
│  [_____________________________________________]         │
│                                                          │
│  Tom desejado (opcional)                                 │
│  [_____________________________________________]         │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  📄 Preview do Prompt                                    │
│  ┌──────────────────────────────────────────┐           │
│  │ Você é um especialista em criar...       │           │
│  │                                           │           │
│  │ Tópico: [Romance de época]               │           │
│  │ Público: [Adultos 25-45 anos]            │           │
│  │ Tom: [Dramático e envolvente]            │           │
│  │                                           │           │
│  │ Crie uma estrutura com:                  │           │
│  │ 1. Título e subtítulo                    │           │
│  │ 2. Sinopse (200 palavras)                │           │
│  │ ...                                       │           │
│  └──────────────────────────────────────────┘           │
│                                                          │
│  [📋 Copiar Prompt]  [🔄 Limpar]                        │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  💡 Dica de Uso                                          │
│  Cole este prompt no ChatGPT/Claude e aguarde...        │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  📊 Estatísticas                                         │
│  👁️ 1.234 visualizações  📋 567 cópias                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 2. Listagem de Prompts (`/prompts`)

```
┌─────────────────────────────────────────────────────────┐
│ Header                                  [+ Novo] [Login] │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  📚 Biblioteca de Prompts                                │
│  Prompts testados e aprovados para criação com IA       │
│                                                          │
│  🔍 [Buscar prompts...]                                  │
│                                                          │
│  Filtros:                                                │
│  [Todas Categorias ▼]  [Todos Modelos ▼]  [Tags ▼]     │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  📁 Estrutura de Ebooks (8 prompts)                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │📝 Estrutura │ │📖 Capítulos │ │✍️ Outline   │       │
│  │   Ficção    │ │   Detalhados│ │   Completo  │       │
│  │             │ │             │ │             │       │
│  │ v3 • 567↓   │ │ v2 • 234↓   │ │ v1 • 123↓   │       │
│  │ ChatGPT     │ │ Claude      │ │ Universal   │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
│                                                          │
│  🎨 Edição e Revisão (5 prompts)                         │
│  ┌─────────────┐ ┌─────────────┐                        │
│  │🔍 Revisão   │ │✨ Melhoria  │ ...                     │
│  │   Completa  │ │   de Texto  │                        │
│  └─────────────┘ └─────────────┘                        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 3. Painel de Gerenciamento (`/prompts/manage`)

```
┌─────────────────────────────────────────────────────────┐
│ Staff Dashboard                          [+ Criar Novo]  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  📊 Estatísticas Gerais                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│  │    24    │ │    8     │ │  1.2k    │                │
│  │ Prompts  │ │ Drafts   │ │ Cópias   │                │
│  └──────────┘ └──────────┘ └──────────┘                │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  Prompts                        [Buscar...] [Filtros]   │
│                                                          │
│  ┌────┬──────────────┬────────┬────────┬────────┬─────┐│
│  │ ID │ Título       │ Status │Versão  │ Cópias │ ... ││
│  ├────┼──────────────┼────────┼────────┼────────┼─────┤│
│  │📝  │Estrutura...  │🟢 Pub  │ v3     │  567   │[✏️] ││
│  │📖  │Capítulos...  │🟡 Draft│ v2     │   -    │[✏️] ││
│  │✍️  │Outline...    │🟢 Pub  │ v1     │  123   │[✏️] ││
│  └────┴──────────────┴────────┴────────┴────────┴─────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 4. Editor de Prompt (`/prompts/manage/:alias/edit`)

```
┌─────────────────────────────────────────────────────────┐
│ ← Voltar     Editar Prompt                  [Salvar]    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Informações Básicas                                     │
│  ┌──────────────────────────────────────────┐           │
│  │ Alias (slug): estrutura-ebook-ficcao     │           │
│  │ Título: Estrutura de Ebook de Ficção     │           │
│  │ Categoria: [Estrutura de Ebooks ▼]       │           │
│  │ Status: [Publicado ▼]                    │           │
│  └──────────────────────────────────────────┘           │
│                                                          │
│  Descrição                                               │
│  ┌──────────────────────────────────────────┐           │
│  │ [Editor de texto rico...]                │           │
│  └──────────────────────────────────────────┘           │
│                                                          │
│  Modelos Recomendados                                    │
│  ☑ ChatGPT-4  ☑ Claude Opus  ☐ Gemini 2.0               │
│                                                          │
│  Tags                                                    │
│  [#ebook] [#estrutura] [#ficcao] [+ Adicionar]           │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  Versões                                [+ Nova Versão]  │
│                                                          │
│  v3 (atual) • Criada em 28/01/2026                       │
│  ┌──────────────────────────────────────────┐           │
│  │ Changelog: Adicionado campo para tom... │           │
│  └──────────────────────────────────────────┘           │
│                                                          │
│  Template do Prompt                                      │
│  ┌──────────────────────────────────────────┐           │
│  │ Você é um especialista em criar          │           │
│  │ estruturas de ebooks de ficção.          │           │
│  │                                           │           │
│  │ Tópico: {{topico}}                       │           │
│  │ Público: {{publico_alvo}}                │           │
│  │ Tom: {{tom}}                             │           │
│  │                                           │           │
│  │ Crie uma estrutura completa com:         │           │
│  │ 1. Título e subtítulo                    │           │
│  │ 2. Sinopse (200 palavras)                │           │
│  │ ...                                       │           │
│  └──────────────────────────────────────────┘           │
│                                                          │
│  Placeholders Detectados                                 │
│  ┌────────────────────────────────────────┐             │
│  │ {{topico}}                             │             │
│  │ Label: [Tópico do ebook]              │             │
│  │ Tipo: [text ▼] Obrigatório: ☑         │             │
│  │                                         │             │
│  │ {{publico_alvo}}                       │             │
│  │ Label: [Público-alvo]                  │             │
│  │ Tipo: [text ▼] Obrigatório: ☑         │             │
│  │                                         │             │
│  │ {{tom}}                                │             │
│  │ Label: [Tom desejado]                  │             │
│  │ Tipo: [text ▼] Obrigatório: ☐         │             │
│  └────────────────────────────────────────┘             │
│                                                          │
│  [💾 Salvar] [👁️ Preview] [🗑️ Deletar]                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxos de Usuário

### Fluxo 1: Usuário Comum Usando um Prompt

```
1. [Listagem] Usuário navega em /prompts
   ↓
2. [Filtro] Seleciona categoria "Estrutura de Ebooks"
   ↓
3. [Card] Clica em "Estrutura de Ficção"
   ↓
4. [Página Prompt] Lê descrição e tags
   ↓
5. [Seletor] Escolhe modelo (ChatGPT-4)
   ↓
6. [Form] Preenche placeholders:
   - Tópico: "Romance de época"
   - Público: "Adultos 25-45"
   - Tom: "Dramático"
   ↓
7. [Preview] Vê o prompt montado
   ↓
8. [Copiar] Clica em "Copiar Prompt"
   ↓
9. [Analytics] Sistema registra uso (+ copyCount)
   ↓
10. [Feedback] Toast: "Prompt copiado! Cole no ChatGPT"
```

### Fluxo 2: Staff Criando um Prompt

```
1. [Dashboard] Staff acessa /prompts/manage
   ↓
2. [Criar] Clica em "+ Criar Novo"
   ↓
3. [Form] Preenche:
   - Alias: "revisao-ortografica"
   - Título: "Revisão Ortográfica Completa"
   - Categoria: "Edição e Revisão"
   - Descrição: "..."
   - Modelos: ChatGPT-4, Claude Opus
   - Tags: #revisao, #ortografia
   ↓
4. [Template] Escreve o prompt:
   "Você é um revisor especializado..."
   "Texto: {{texto}}"
   "Foco: {{foco_revisao}}"
   ↓
5. [Placeholders] Sistema detecta automaticamente:
   - {{texto}}
   - {{foco_revisao}}
   ↓
6. [Configurar] Staff configura placeholders:
   - texto: label="Texto para revisar", type="textarea", required=true
   - foco_revisao: label="Foco da revisão", type="text", required=false
   ↓
7. [Preview] Testa o prompt
   ↓
8. [Status] Escolhe "Draft" (para testar antes)
   ↓
9. [Salvar] Cria prompt v1
   ↓
10. [Testar] Testa com usuários beta
    ↓
11. [Iterar] Cria v2 com melhorias
    ↓
12. [Publicar] Muda status para "Published"
```

### Fluxo 3: Versionamento

```
1. [Dashboard] Staff abre prompt existente
   ↓
2. [Versões] Vê histórico: v1, v2, v3 (atual)
   ↓
3. [Nova Versão] Clica "+ Nova Versão"
   ↓
4. [Editor] Sistema copia v3 como base para v4
   ↓
5. [Editar] Staff faz alterações no template
   ↓
6. [Changelog] Escreve: "Melhorado prompt para incluir..."
   ↓
7. [Placeholders] Adiciona novo placeholder {{formato}}
   ↓
8. [Salvar] Cria v4
   ↓
9. [Marcar Atual] Define v4 como versão atual
   ↓
10. [Usuários] Novos acessos usam v4
    [Legado] Links com ?v=v3 continuam funcionando
```

---

## 🔒 Sistema de Permissões

### Matriz de Permissões

| Ação | USER | STAFF | ADMIN |
|------|------|-------|-------|
| **Visualizar prompts públicos** | ✅ | ✅ | ✅ |
| **Usar prompts (copiar)** | ✅ | ✅ | ✅ |
| **Ver prompts em Draft** | ❌ | ✅ | ✅ |
| **Criar prompts** | ❌ | ✅ | ✅ |
| **Editar prompts** | ❌ | ✅ | ✅ |
| **Deletar prompts** | ❌ | ❌ | ✅ |
| **Gerenciar categorias** | ❌ | ✅ | ✅ |
| **Ver analytics** | ❌ | ✅ | ✅ |
| **Gerenciar usuários** | ❌ | ❌ | ✅ |

### Middleware de Proteção

```typescript
// middleware/auth.ts
export async function requireStaff(req: Request) {
  const user = await getCurrentUser(req)

  if (!user || !['STAFF', 'ADMIN'].includes(user.role)) {
    throw new UnauthorizedError('Staff access required')
  }

  return user
}

export async function requireAdmin(req: Request) {
  const user = await getCurrentUser(req)

  if (!user || user.role !== 'ADMIN') {
    throw new UnauthorizedError('Admin access required')
  }

  return user
}
```

---

## 🧩 Sistema de Placeholders

### Sintaxe

```
{{placeholder_name}}               // Básico
{{placeholder_name:default}}       // Com valor padrão
{{placeholder_name|option1,option2}} // Com opções (select)
```

### Tipos de Placeholders

```typescript
type PlaceholderType =
  | 'text'       // Input de texto simples
  | 'textarea'   // Textarea para textos longos
  | 'select'     // Dropdown com opções
  | 'number'     // Input numérico
  | 'url'        // Input de URL
  | 'email'      // Input de email

interface Placeholder {
  key: string           // Nome da variável (ex: "topico")
  label: string         // Label exibido (ex: "Tópico do ebook")
  type: PlaceholderType // Tipo do input
  required: boolean     // Campo obrigatório?
  defaultValue?: string // Valor padrão
  options?: string[]    // Para tipo "select"
  description?: string  // Texto de ajuda
  maxLength?: number    // Limite de caracteres
}
```

### Parser de Placeholders

```typescript
// lib/prompt-parser.ts

export function extractPlaceholders(template: string): string[] {
  const regex = /\{\{([a-zA-Z0-9_]+)(?::([^}]+))?\}\}/g
  const placeholders: string[] = []
  let match

  while ((match = regex.exec(template)) !== null) {
    placeholders.push(match[1])
  }

  return [...new Set(placeholders)] // Remove duplicatas
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

// Exemplo de uso:
const template = `
Tópico: {{topico}}
Público: {{publico:Geral}}
Tom: {{tom}}
`

const filled = fillTemplate(template, {
  topico: 'Romance de época',
  tom: 'Dramático'
})

// Resultado:
// Tópico: Romance de época
// Público: Geral
// Tom: Dramático
```

---

## 📊 Analytics e Métricas

### Eventos Rastreados

```typescript
enum PromptEvent {
  VIEW = 'view',         // Visualização da página
  COPY = 'copy',         // Cópia do prompt
  SHARE = 'share',       // Compartilhamento
  PREVIEW = 'preview',   // Preview no editor
}

interface PromptAnalytics {
  promptId: string

  // Métricas agregadas
  totalViews: number
  totalCopies: number

  // Por modelo
  copiesByModel: Record<AIModel, number>

  // Por versão
  copiesByVersion: Record<string, number>

  // Taxa de conversão
  conversionRate: number // (copies / views) * 100

  // Trending
  viewsLast7Days: number
  copiesLast7Days: number
}
```

### Dashboard Analytics

```
┌─────────────────────────────────────────────┐
│ 📊 Analytics - Estrutura de Ebook Ficção   │
├─────────────────────────────────────────────┤
│                                              │
│  Últimos 30 dias                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │  1.234   │ │   567    │ │  45.9%   │    │
│  │  Views   │ │  Copies  │ │ Conv.    │    │
│  └──────────┘ └──────────┘ └──────────┘    │
│                                              │
│  Cópias por Modelo                           │
│  ███████████████ ChatGPT-4     320 (56%)    │
│  ████████ Claude Opus          145 (26%)    │
│  █████ Gemini 2.0              102 (18%)    │
│                                              │
│  Cópias por Versão                           │
│  █████████████████ v3          423 (75%)    │
│  █████ v2                      112 (20%)    │
│  ██ v1                          32 (5%)     │
│                                              │
│  Trend                                       │
│  [Gráfico de linha - Views/Copies]          │
│                                              │
└─────────────────────────────────────────────┘
```

---

## 🚀 Roadmap de Implementação

### Fase 1: Foundation (Sprint 1 - 1 semana)

**Backend:**
- [ ] Criar schema Prisma completo
- [ ] Migrations do banco de dados
- [ ] Seed inicial de categorias e tags
- [ ] Sistema de autenticação (User roles)

**API:**
- [ ] CRUD de Prompts (`/api/prompts`)
- [ ] Endpoints de versões
- [ ] Parser de placeholders
- [ ] Middleware de permissões

**Entregáveis:**
- Schema Prisma funcional
- API CRUD completa
- Sistema de roles ativo

---

### Fase 2: Staff Management (Sprint 2 - 1 semana)

**Pages:**
- [ ] `/prompts/manage` - Dashboard
- [ ] `/prompts/manage/new` - Criar prompt
- [ ] `/prompts/manage/:alias/edit` - Editar prompt
- [ ] `/prompts/manage/:alias/versions` - Gerenciar versões

**Features:**
- [ ] Editor de prompts com preview
- [ ] Auto-detecção de placeholders
- [ ] Configuração de placeholders
- [ ] Versionamento completo

**Entregáveis:**
- Painel de gerenciamento funcional
- Sistema de versionamento completo
- 3-5 prompts de exemplo criados

---

### Fase 3: Public Pages (Sprint 3 - 1 semana)

**Pages:**
- [ ] `/prompts` - Listagem pública
- [ ] `/prompts/:alias` - Página de uso

**Features:**
- [ ] Listagem com filtros (categoria, tags, modelos)
- [ ] Card de prompt com preview
- [ ] Página de uso com:
  - [ ] Seletor de versão
  - [ ] Seletor de modelo
  - [ ] Form de placeholders
  - [ ] Preview em tempo real
  - [ ] Botão de copiar
  - [ ] Analytics (view/copy)

**Entregáveis:**
- Interface pública completa
- Sistema de uso funcionando
- Analytics básico implementado

---

### Fase 4: Enhancement (Sprint 4 - 1 semana)

**Features:**
- [ ] Busca full-text
- [ ] Favoritos (salvar prompts)
- [ ] Histórico de uso
- [ ] Compartilhamento (link direto)
- [ ] Export/Import de prompts (JSON)
- [ ] Dashboard de analytics avançado

**UX:**
- [ ] Skeleton loaders
- [ ] Error boundaries
- [ ] Toast notifications
- [ ] Responsive mobile
- [ ] Dark mode completo

**Entregáveis:**
- Recursos avançados implementados
- UX polida e responsiva
- Sistema pronto para produção

---

## 🎯 Casos de Uso Principais

### UC1: Criar Prompt de Estrutura de Ebook

**Ator:** Staff (Pablo)
**Objetivo:** Criar prompt reutilizável para estruturar ebooks

**Passos:**
1. Staff acessa `/prompts/manage/new`
2. Preenche:
   - Alias: `estrutura-ebook-ficcao`
   - Título: Estrutura de Ebook de Ficção
   - Categoria: Estrutura de Ebooks
   - Descrição: Prompt completo para criar estrutura...
3. Escreve template do prompt:
```
Você é um especialista em criar estruturas de ebooks de ficção.

Tópico: {{topico}}
Público-alvo: {{publico_alvo}}
Tom desejado: {{tom}}

Crie uma estrutura completa com:
1. Título e subtítulo impactantes
2. Sinopse de 200 palavras
3. Estrutura de 10-15 capítulos
...
```
4. Sistema detecta 3 placeholders
5. Staff configura cada placeholder:
   - `topico`: Tópico do ebook, text, obrigatório
   - `publico_alvo`: Público-alvo, text, obrigatório
   - `tom`: Tom desejado, text, opcional
6. Marca modelos recomendados: ChatGPT-4, Claude Opus
7. Adiciona tags: #ebook, #estrutura, #ficcao
8. Salva como Draft (v1)
9. Testa com alunos beta
10. Ajusta e cria v2
11. Publica (status: Published)

**Resultado:** Prompt disponível em `/prompts/estrutura-ebook-ficcao`

---

### UC2: Aluno Usando Prompt

**Ator:** Aluno (User comum)
**Objetivo:** Usar prompt para criar estrutura do ebook

**Passos:**
1. Aluno acessa `/prompts`
2. Filtra por categoria "Estrutura de Ebooks"
3. Clica em card "Estrutura de Ficção"
4. Na página:
   - Lê descrição
   - Vê tags e modelos
   - Escolhe versão (v2 - atual)
   - Escolhe modelo (ChatGPT-4)
5. Preenche form:
   - Tópico: "Romance de época vitoriana"
   - Público: "Mulheres 25-45 anos, fãs de romance"
   - Tom: "Dramático e envolvente"
6. Preview mostra prompt montado
7. Clica "Copiar Prompt"
8. Sistema:
   - Copia para clipboard
   - Registra analytics (view + copy)
   - Mostra toast: "Prompt copiado!"
9. Aluno cola no ChatGPT
10. Recebe estrutura completa

**Resultado:** Aluno criou estrutura do ebook em minutos

---

## 🔧 Considerações Técnicas

### Performance

```typescript
// Caching de prompts públicos
// app/api/prompts/route.ts
export const revalidate = 3600 // 1 hora

// Lazy loading de versões
// Carregar apenas versão atual por padrão
// Versões antigas sob demanda

// Otimização de queries
// Usar Prisma includes estratégicos
// Pagination para listagens grandes
```

### SEO

```typescript
// Metadata dinâmica para cada prompt
export async function generateMetadata({ params }) {
  const prompt = await getPrompt(params.alias)

  return {
    title: `${prompt.title} - Prompts @bispo.ia`,
    description: prompt.description,
    keywords: prompt.tags.map(t => t.name),
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      url: `/prompts/${params.alias}`,
    }
  }
}
```

### Segurança

```typescript
// Sanitização de inputs
import DOMPurify from 'isomorphic-dompurify'

function sanitizePromptTemplate(template: string): string {
  // Remove scripts, tags HTML perigosos
  return DOMPurify.sanitize(template, {
    ALLOWED_TAGS: [], // Apenas texto
    ALLOWED_ATTR: []
  })
}

// Rate limiting
// /api/prompts/:alias/copy - max 100/hora por IP
// /api/prompts - max 1000/hora por IP
```

---

## 📝 Exemplos de Prompts

### Exemplo 1: Estrutura de Ebook

```yaml
Alias: estrutura-ebook-ficcao
Título: Estrutura de Ebook de Ficção
Categoria: Estrutura de Ebooks
Tags: #ebook #estrutura #ficcao
Modelos: ChatGPT-4, Claude Opus
Status: Published
Versão Atual: v3

Template:
  Você é um especialista em criar estruturas de ebooks de ficção que engajam e convertem leitores.

  INFORMAÇÕES:
  - Tópico: {{topico}}
  - Público-alvo: {{publico_alvo}}
  - Tom desejado: {{tom}}

  TAREFA:
  Crie uma estrutura completa de ebook de ficção seguindo este formato:

  1. TÍTULO E SUBTÍTULO
     - Título impactante e memorável
     - Subtítulo que clarifica o tema

  2. SINOPSE (200 palavras)
     - Hook inicial
     - Conflito principal
     - Promessa de transformação

  3. ESTRUTURA DE CAPÍTULOS (10-15 capítulos)
     Para cada capítulo:
     - Número e título
     - Resumo (50 palavras)
     - Objetivo do capítulo
     - Gancho para próximo capítulo

  4. ARCO NARRATIVO
     - Ponto de partida
     - Conflito crescente
     - Clímax
     - Resolução

  FORMATO DE SAÍDA:
  - Markdown bem formatado
  - Títulos hierárquicos claros
  - Listas e bullet points

  Comece agora:

Placeholders:
  - topico:
      label: "Tópico do ebook"
      type: text
      required: true
      description: "Ex: Romance de época vitoriana"

  - publico_alvo:
      label: "Público-alvo"
      type: text
      required: true
      description: "Ex: Mulheres 25-45 anos, fãs de romance"

  - tom:
      label: "Tom desejado"
      type: text
      required: false
      defaultValue: "Envolvente e acessível"
      description: "Ex: Dramático, leve, inspirador"
```

---

## 📊 Métricas de Sucesso

### KPIs Sprint 1-4

- ✅ Sistema implementado e funcional
- ✅ 10+ prompts criados e testados
- ✅ 50+ usuários utilizando prompts
- ✅ 500+ cópias de prompts realizadas
- ✅ 4.5+ estrelas de satisfação

### Métricas de Longo Prazo

- 📈 Crescimento de 20% ao mês em uso de prompts
- 📈 30+ prompts na biblioteca
- 📈 1000+ usuários ativos
- 📈 90%+ taxa de satisfação

---

**Documento criado por:** Claude Sonnet 4.5 + @pablofernando
**Última atualização:** 2026-01-28
**Versão:** 1.0
