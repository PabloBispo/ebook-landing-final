# 📊 Análise Comparativa - Requisitos vs Especificação

**Data:** 2026-01-29
**Comparando:**
- 📄 Documento Original: `~/work/bispo-labs/projects/ai-ebook/docs/plataforma/REQUISITOS_REPOSITORIO_PROMPTS.md`
- 📄 Especificação Criada: `docs/PROMPTS_REPOSITORY_SPEC.md`

---

## ✅ Pontos de Convergência (Alinhados)

### 1. Visão Geral
- ✅ **Objetivo:** Gerenciar, versionar e disponibilizar prompts
- ✅ **Usuários:** USER comum + STAFF/ADMIN
- ✅ **Placeholders:** Sistema de substituição de variáveis
- ✅ **Tags de Modelo:** ChatGPT, Claude, Gemini, Universal
- ✅ **Stack:** Next.js + Prisma + PostgreSQL + Vercel

### 2. Funcionalidades Core
- ✅ **Área Pública:** Listagem, visualização, copiar
- ✅ **Área Admin:** CRUD, dashboard, analytics
- ✅ **Filtros:** Categoria, tags, modelos
- ✅ **Busca:** Por título/descrição
- ✅ **Analytics:** Contador de cópias

### 3. Placeholders
- ✅ **Tipos:** text, textarea, select
- ✅ **Campos:** key, label, description, required, default, options
- ✅ **Preview:** Substituição em tempo real

### 4. API Routes
- ✅ **Públicas:** GET /prompts, GET /prompts/:id, POST /copy
- ✅ **Admin:** CRUD completo

---

## ⚠️ Diferenças Chave (Requerem Decisão)

### 1. **Versionamento: Linear vs Tags de Modelo**

**Documento Original (Tags):**
```python
class PromptVersion:
    model_tag: str  # "chatgpt", "claude", "gemini", "universal"
    content: str
    is_recommended: bool
```

**Minha Spec (Histórico Linear):**
```prisma
model PromptVersion {
  version: string  # "v1", "v2", "v3"
  content: string
}

model Prompt {
  models: AIModel[]  # Recomendações separadas
}
```

**Análise:**
- ✅ **Original é melhor:** Mais intuitivo para usuário
- ✅ **Não implica superioridade:** "claude" vs "chatgpt" (não "v2 melhor que v1")
- ⚠️ **Minha spec adiciona:** Histórico de evolução mesmo dentro de um modelo

**Recomendação:** **Híbrido**
```prisma
model PromptVersion {
  version: string      # "v1", "v2" (opcional, para histórico)
  modelTag: string     # "chatgpt", "claude", "gemini", "universal"
  content: string
  isRecommended: bool  # Marca a versão recomendada para este modelo
}
```

**Exemplo:**
```
Prompt: "Criar Avatar Profundo"
├── Version: v1, model: chatgpt, recommended: false
├── Version: v2, model: chatgpt, recommended: true  ← atual
├── Version: v1, model: claude, recommended: true
└── Version: v1, model: universal, recommended: true
```

---

### 2. **Nomenclatura: slug + alias vs apenas alias**

**Documento Original:**
```python
slug: str   # URL-friendly (ex: "criar-avatar-profundo")
alias: str  # Código curto (ex: "AVATAR-01")
```

**Minha Spec:**
```prisma
alias: string  # URL-friendly (ex: "estrutura-ebook-ficcao")
```

**Análise:**
- ✅ **Original é melhor:** `alias` tipo "AVATAR-01" é útil para referência rápida
- ✅ **Casos de uso:**
  - Documentação: "Use o prompt AVATAR-01"
  - Suporte: "Qual alias você usou?"
  - Importação: Código único curto

**Recomendação:** **Adotar original**
```prisma
model Prompt {
  slug: string   @unique  // URL: /prompts/criar-avatar-profundo
  alias: string  @unique  // Código: AVATAR-01
  title: string           // Display: "Criar Avatar Profundo"
}
```

---

### 3. **Status: Flags booleanas vs Enum**

**Documento Original:**
```python
is_active: bool
is_public: bool
```

**Minha Spec:**
```prisma
enum PromptStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
status: PromptStatus
```

**Análise:**
- ✅ **Minha spec é melhor:** Enum evita estados inválidos
- ⚠️ **Original adiciona:** Campo `source_chapter` útil

**Estados possíveis:**
```
Original:
- active=true, public=true   → Publicado
- active=true, public=false  → Draft privado
- active=false, public=false → Arquivado
- active=false, public=true  → ❓ Estado inválido

Minha Spec (Enum):
- DRAFT      → Visível apenas staff
- PUBLISHED  → Público
- ARCHIVED   → Não aparece em listagens
```

**Recomendação:** **Híbrido**
```prisma
enum PromptStatus {
  DRAFT      // Rascunho (visível apenas staff)
  PUBLISHED  // Publicado (visível para todos)
  ARCHIVED   // Arquivado (não aparece)
}

model Prompt {
  status: PromptStatus @default(DRAFT)
  sourceChapter: string?  // Ex: "cap-07" (campo adicional)
}
```

---

### 4. **Analytics: Simples vs Completo**

**Documento Original:**
```python
# Apenas contador básico
POST /api/prompts/{slug}/copy
```

**Minha Spec:**
```prisma
model PromptUsage {
  id: string
  promptId: string
  userId: string?
  version: string
  model: AIModel?
  filledData: Json?
  ipAddress: string?
  userAgent: string?
  createdAt: DateTime
}

model Prompt {
  viewCount: int
  copyCount: int
  shareCount: int
}
```

**Análise:**
- ✅ **Minha spec é melhor:** Analytics detalhado
- ⚠️ **Original é mais simples:** Pode ser suficiente para MVP

**Recomendação:** **Minha spec (analytics completo)**
- MVP: Apenas `copyCount` + `viewCount`
- Fase 2: Adicionar `PromptUsage` para insights

---

### 5. **Categorias: Lista Predefinida vs Banco**

**Documento Original:**
```markdown
Categorias hardcoded:
- diagnostico, validacao, avatar, promessa, anti-robo, copy, vendas, meta
```

**Minha Spec:**
```prisma
model PromptCategory {
  id: string
  name: string
  slug: string
  description: string?
  icon: string?
  order: int
}
```

**Análise:**
- ✅ **Minha spec é melhor:** Flexível, gerenciável pelo admin
- ✅ **Original define:** Categorias iniciais úteis

**Recomendação:** **Modelo banco (minha spec) + Seed inicial (original)**
```typescript
// Seed com categorias do documento original
await prisma.promptCategory.createMany({
  data: [
    { name: 'Diagnóstico', slug: 'diagnostico', icon: '🎯', order: 1 },
    { name: 'Validação', slug: 'validacao', icon: '🔍', order: 2 },
    { name: 'Avatar', slug: 'avatar', icon: '👤', order: 3 },
    { name: 'Promessa', slug: 'promessa', icon: '💎', order: 4 },
    { name: 'Anti-Robô', slug: 'anti-robo', icon: '✍️', order: 5 },
    { name: 'Copy', slug: 'copy', icon: '📝', order: 6 },
    { name: 'Vendas', slug: 'vendas', icon: '💰', order: 7 },
    { name: 'Meta', slug: 'meta', icon: '🔄', order: 8 },
  ]
})
```

---

## 🎯 Recomendação Final: Schema Híbrido

### Schema Otimizado (Melhor dos Dois)

```prisma
enum UserRole {
  USER
  STAFF
  ADMIN
}

enum PromptStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum AIModel {
  CHATGPT_4
  CHATGPT_35
  CLAUDE_OPUS
  CLAUDE_SONNET
  GEMINI_2_FLASH
  GEMINI_15_PRO
  UNIVERSAL
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  role          UserRole @default(USER)

  createdPrompts Prompt[]      @relation("PromptCreator")
  promptUsage    PromptUsage[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  lastLogin DateTime?
}

model Prompt {
  id          String       @id @default(cuid())

  // Nomenclatura (híbrido)
  slug        String       @unique // URL-friendly: "criar-avatar-profundo"
  alias       String       @unique // Código curto: "AVATAR-01"
  title       String                // Display: "Criar Avatar Profundo"
  description String       @db.Text

  // Categorização
  category    PromptCategory? @relation(fields: [categoryId], references: [id])
  categoryId  String?
  tags        PromptTag[]

  // Metadados
  sourceChapter String?      // Ex: "cap-07" (do documento original)
  status        PromptStatus @default(DRAFT)
  creatorId     String
  creator       User         @relation("PromptCreator", fields: [creatorId], references: [id])

  // Versões (híbrido: histórico + model tags)
  versions      PromptVersion[]

  // Placeholders
  placeholders Json  // Array de Placeholder

  // Analytics
  usage       PromptUsage[]
  viewCount   Int    @default(0)
  copyCount   Int    @default(0)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  publishedAt DateTime?

  @@index([slug])
  @@index([alias])
  @@index([status])
}

model PromptVersion {
  id        String   @id @default(cuid())
  promptId  String
  prompt    Prompt   @relation(fields: [promptId], references: [id], onDelete: Cascade)

  // Versionamento híbrido
  version   String?  // "v1", "v2" (opcional, para histórico)
  modelTag  String   // "chatgpt", "claude", "gemini", "universal"
  content   String   @db.Text

  // Controle
  isRecommended bool @default(false)  // Versão recomendada para este modelo
  notes     String?  @db.Text         // Notas sobre esta versão

  createdAt DateTime @default(now())
  createdBy String?

  @@unique([promptId, modelTag, version])
  @@index([promptId])
  @@index([modelTag])
}

model PromptCategory {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?  @db.Text
  icon        String?
  order       Int      @default(0)

  prompts     Prompt[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model PromptTag {
  id       String   @id @default(cuid())
  name     String   @unique
  slug     String   @unique

  prompts  Prompt[]

  createdAt DateTime @default(now())
}

model PromptUsage {
  id        String   @id @default(cuid())

  promptId  String
  prompt    Prompt   @relation(fields: [promptId], references: [id], onDelete: Cascade)

  userId    String?
  user      User?    @relation(fields: [userId], references: [id], onDelete: SetNull)

  modelTag  String   // Modelo escolhido
  version   String?  // Versão usada

  createdAt DateTime @default(now())

  @@index([promptId])
  @@index([userId])
  @@index([createdAt])
}
```

---

## 📋 Decisões Necessárias

### 1. **Domínio**
- ❓ `prompts.ebook-ia.com`
- ❓ `app.ebook-ia.com/prompts`
- ✅ **Recomendação:** Começar em `app.ebook-ia.com/prompts` (mais simples)

### 2. **PostgreSQL**
- ❓ Neon
- ❓ Supabase
- ✅ **Recomendação:** Neon (já usando no projeto atual)

### 3. **Autenticação**
- ❓ NextAuth.js
- ❓ Sistema atual (se houver)
- ✅ **Recomendação:** NextAuth.js (padrão Next.js)

### 4. **Priorização MVP**
- ✅ Fase 1: Foundation + Listagem + Visualização + Copiar
- ⏸️ Fase 2: Placeholders + Preview
- ⏸️ Fase 3: Admin completo
- ⏸️ Fase 4: Analytics avançado

---

## ✨ Melhorias Adicionais da Minha Spec

Features que **não estavam** no documento original mas **agregam valor**:

### 1. **Favoritos**
```prisma
model FavoritePrompt {
  userId: string
  promptId: string
}
```
**Benefício:** Usuário salva prompts para acesso rápido

### 2. **Histórico de Uso**
```prisma
model PromptUsage {
  // Permite ver "Últimos prompts usados"
}
```
**Benefício:** Facilita reusar prompts frequentes

### 3. **Versionamento Histórico (opcional)**
```prisma
version: "v1", "v2"  // Dentro de cada modelTag
```
**Benefício:** Rastrear evolução mesmo dentro de um modelo específico

### 4. **Campos Adicionais**
```prisma
shareCount: int       // Compartilhamentos
publishedAt: DateTime // Data de publicação
```
**Benefício:** Métricas mais ricas

---

## 🚀 Plano de Ação Recomendado

### 1. **Usar Schema Híbrido** ✅
- Combina o melhor dos dois documentos
- Nomenclatura do original (slug + alias + source_chapter)
- Versionamento híbrido (version + modelTag)
- Analytics da minha spec

### 2. **Implementação Faseada** ✅

**Sprint 1: MVP (1 semana)**
```
- [ ] Schema híbrido implementado
- [ ] Seed com 8 categorias originais
- [ ] API básica (GET /prompts, GET /prompts/:slug)
- [ ] Página de listagem
- [ ] Página de visualização + copiar
- [ ] Auth staff simples (env var)
```

**Sprint 2: Placeholders (1 semana)**
```
- [ ] Sistema de placeholders
- [ ] Preview em tempo real
- [ ] Formulário dinâmico
- [ ] Substituição antes de copiar
```

**Sprint 3: Admin (1 semana)**
```
- [ ] Dashboard staff
- [ ] CRUD de prompts
- [ ] Gerenciar versões por modelo
- [ ] Importação em lote (do curso)
```

**Sprint 4: Polish (1 semana)**
```
- [ ] Analytics detalhado
- [ ] Favoritos
- [ ] Histórico de uso
- [ ] Busca otimizada
```

### 3. **Migrar Prompts do Curso** ✅
- Script de importação dos arquivos markdown atuais
- Parsing automático de placeholders
- Categorização por capítulo (source_chapter)

---

## 📊 Comparação Visual

### Modelo de Dados

| Feature | Original | Minha Spec | Híbrido Recomendado |
|---------|----------|------------|---------------------|
| Nomenclatura | slug + alias | alias | ✅ slug + alias |
| Versionamento | modelTag | version (v1, v2) | ✅ version + modelTag |
| Status | is_active + is_public | enum Status | ✅ enum Status |
| Source tracking | source_chapter | - | ✅ source_chapter |
| Analytics | básico | completo | ✅ completo (faseado) |
| Categorias | hardcoded | banco | ✅ banco + seed |
| Placeholders | sim | sim | ✅ sim |
| Favoritos | não | sim | ✅ sim (Fase 4) |

---

## ✅ Conclusão

### Documento Original (Requisitos)
**Pontos Fortes:**
- ✅ Versionamento por modelo tag (mais intuitivo)
- ✅ Nomenclatura clara (slug + alias)
- ✅ Campo source_chapter útil
- ✅ Categorias bem definidas
- ✅ Simples e direto

**Pontos a Melhorar:**
- ⚠️ Analytics básico
- ⚠️ Sem favoritos/histórico
- ⚠️ Flags booleanas (is_active, is_public) menos robustas que enum

### Minha Especificação
**Pontos Fortes:**
- ✅ Analytics completo
- ✅ Enum Status mais robusto
- ✅ Favoritos e histórico
- ✅ Wireframes detalhados
- ✅ Roadmap completo

**Pontos a Melhorar:**
- ⚠️ Versionamento linear menos intuitivo que model tags
- ⚠️ Faltou alias curto (tipo "AVATAR-01")
- ⚠️ Faltou source_chapter

---

## 🎯 Recomendação Final

**Usar SCHEMA HÍBRIDO** que combina:
1. ✅ Nomenclatura do original (slug + alias + source_chapter)
2. ✅ Versionamento híbrido (version + modelTag + isRecommended)
3. ✅ Status enum (mais robusto)
4. ✅ Analytics completo (faseado)
5. ✅ Categorias em banco com seed inicial
6. ✅ Features extras (favoritos, histórico) para Fase 4

**Implementar em 4 sprints:**
- Sprint 1: MVP básico
- Sprint 2: Placeholders
- Sprint 3: Admin
- Sprint 4: Analytics + Features extras

**Stack confirmada:**
- Next.js 16 + API Routes
- Prisma + PostgreSQL (Neon)
- NextAuth.js
- TailwindCSS + shadcn/ui
- Deploy: Vercel

---

**Ambos os documentos estão excelentes e se complementam perfeitamente!** 🎉

O híbrido recomendado pega o melhor de cada um e resulta em um sistema robusto, intuitivo e escalável.
