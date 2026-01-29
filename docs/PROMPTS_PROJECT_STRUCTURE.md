# 🏗️ Estrutura do Projeto - Repositório de Prompts

**Data:** 2026-01-29

---

## 📛 Nome do Projeto

### Opções Consideradas

| Nome | Prós | Contras |
|------|------|---------|
| **bispo-prompts** | Direto, claro | Genérico |
| **bispo-prompt-hub** | Moderno, "hub" | Buzzword |
| **bispo-prompt-library** | Descritivo | Longo |
| **bispo-app** | Simples, escalável | Muito genérico |
| **@bispo/prompts** | Monorepo-friendly | Requer scoped package |

### ✅ Recomendação: **bispo-app**

**Justificativa:**
- ✅ Nome escalável (outros módulos no futuro)
- ✅ Curto e memorável
- ✅ Permite `/prompts`, `/courses`, `/dashboard`, etc
- ✅ Branding consistente com @bispo.ia

**Estrutura futura:**
```
bispo-app/
├── /prompts          ← Este projeto
├── /courses          ← Futuro: área de cursos
├── /dashboard        ← Futuro: dashboard do aluno
└── /api              ← API unificada
```

---

## 📂 Estrutura de Diretórios

### Atual (ebook-landing-final)
```
ebook-landing-final/
├── app/              # Next.js app router
├── components/       # Componentes gerais
├── lib/              # Utilitários
├── prisma/           # Database
├── public/           # Assets estáticos
└── docs/             # Documentação
```

### Proposta (bispo-app)
```
bispo-app/
├── app/
│   ├── (marketing)/          # Landing pages
│   │   ├── page.tsx          # Home
│   │   ├── sobre/
│   │   └── contato/
│   │
│   ├── prompts/              # Repositório de Prompts
│   │   ├── page.tsx          # Listagem
│   │   ├── [slug]/           # Visualização
│   │   └── manage/           # Admin
│   │
│   ├── api/
│   │   ├── prompts/          # API Prompts
│   │   ├── auth/             # NextAuth
│   │   └── checkout/         # Mercado Pago
│   │
│   └── layout.tsx
│
├── components/
│   ├── ui/                   # shadcn/ui
│   ├── landing/              # Landing específico
│   └── prompts/              # Prompts específico
│
├── lib/
│   ├── prompts/              # Lógica de prompts
│   ├── auth/                 # Auth helpers
│   └── db/                   # Database helpers
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seeds/
│
└── docs/
    ├── PROMPTS_*.md          # Docs de prompts
    └── *.md                  # Outras docs
```

---

## 🌿 Estratégia de Branches

### Branch Structure

```
main (production)
├── develop (staging)
│
├── feature/prompts-backend          ← Sprint 1 (Agent 1)
│   ├── Schema + Migrations
│   ├── Seed
│   ├── Lib helpers
│   └── API routes
│
├── feature/prompts-frontend         ← Sprint 1 (Agent 2)
│   ├── Listagem
│   ├── Visualização
│   └── Componentes públicos
│
├── feature/prompts-placeholders     ← Sprint 2 (Agent 2)
│   ├── Parser
│   ├── Form dinâmico
│   └── Preview
│
└── feature/prompts-admin            ← Sprint 3 (Agent 3)
    ├── Auth
    ├── API Admin
    └── Dashboard
```

### Workflow

```
1. Criar feature branch a partir de develop
2. Desenvolver (agent trabalhando)
3. Commit + push
4. Pull Request → develop
5. Code review
6. Merge
7. Testar em staging (Vercel preview)
8. Merge develop → main (production)
```

---

## 🤖 Paralelização com Agents

### Sprint 1: Backend + Frontend em Paralelo

**Agent 1 (Backend):**
```bash
git checkout -b feature/prompts-backend develop

Tasks:
- [ ] T25: Schema + Migrations + Seed
- [ ] T26: API Routes + Lib helpers

Arquivos modificados:
- prisma/schema.prisma
- prisma/migrations/
- prisma/seeds/
- lib/prompts/*
- app/api/prompts/

Não conflita com: Frontend (Agent 2)
```

**Agent 2 (Frontend):**
```bash
git checkout -b feature/prompts-frontend develop

Tasks:
- [ ] T27: Listagem de prompts
- [ ] T28: Página de visualização

Arquivos modificados:
- app/prompts/page.tsx
- app/prompts/[slug]/page.tsx
- app/prompts/components/
- components/prompts/

Pode usar: Mock API se necessário
Não conflita com: Backend (Agent 1)
```

**Como evitar conflitos:**
- Backend toca apenas: `prisma/`, `lib/prompts/`, `app/api/`
- Frontend toca apenas: `app/prompts/` (pages), `components/prompts/`
- Comunicação: API contract definido previamente

---

### Sprint 2: Placeholders (Sequencial)

**Agent 2 (continuação):**
```bash
git checkout -b feature/prompts-placeholders develop

Tasks:
- [ ] T29: Parser & Engine
- [ ] T30: Form & Preview UI

Arquivos modificados:
- lib/prompts/parser.ts (atualizar)
- lib/prompts/placeholder-engine.ts (novo)
- app/prompts/[slug]/components/
- app/prompts/components/CopyButton.tsx (atualizar)

Depende de: Sprint 1 merged em develop
```

---

### Sprint 3: Admin (Sequencial)

**Agent 3 (novo):**
```bash
git checkout -b feature/prompts-admin develop

Tasks:
- [ ] T31: Auth & Permissions
- [ ] T32: API Admin
- [ ] T33: Dashboard & Editor

Arquivos modificados:
- app/api/auth/
- app/api/admin/prompts/
- app/prompts/manage/
- middleware.ts
- lib/auth/

Depende de: Sprint 2 merged em develop
```

---

## 🔀 Merge Strategy

### Pull Request Template

```markdown
## Sprint X - [Nome da Feature]

### Descrição
[Descrição do que foi implementado]

### Tasks Completadas
- [ ] T25: Schema + Migrations + Seed
- [ ] T26: API Routes

### Arquivos Modificados
- `prisma/schema.prisma` - Adicionado models de Prompts
- `app/api/prompts/route.ts` - API de listagem

### Como Testar
1. `npm install`
2. `npx prisma migrate dev`
3. `npx prisma db seed`
4. `npm run dev`
5. Acessar `http://localhost:3000/api/prompts`

### Checklist
- [ ] Build passa sem erros
- [ ] Testes passam
- [ ] Sem console.logs
- [ ] TypeScript sem erros
- [ ] Responsivo testado
- [ ] Dark mode funciona

### Screenshots
[Se aplicável]
```

---

## 🎯 Decisão: Mover Projeto?

### Opção 1: Manter Atual
```
~/work/bispo-labs/projects/ai-ebook/repos/site-examples/ebook-landing-final/
```

**Prós:**
- ✅ Não precisa mover nada
- ✅ Histórico de commits preservado
- ✅ Deploy já configurado

**Contras:**
- ⚠️ Nome genérico "ebook-landing-final"
- ⚠️ Path longo e confuso

### Opção 2: Mover para Novo Repo
```
~/work/bispo-labs/projects/bispo-app/
```

**Prós:**
- ✅ Nome melhor
- ✅ Path mais limpo
- ✅ Escalável para futuro

**Contras:**
- ⚠️ Precisa mover arquivos
- ⚠️ Reconfigurar Vercel
- ⚠️ Perder histórico (ou migrar)

### ✅ Recomendação: **Opção 1 (Manter)**

**Por quê:**
- Sprint 1-3 não justifica migração completa
- Podemos renomear projeto no Vercel
- Depois do MVP, migrar se necessário
- Nome do repo no GitHub pode ser mudado facilmente

**Ação:**
1. Renomear no GitHub: `ebook-landing-final` → `bispo-app`
2. Atualizar package.json name
3. Continuar no mesmo path local (por enquanto)

---

## 📦 Configuração Git

### .gitignore (verificar)
```
# Env
.env
.env.local
.env.production

# Next.js
.next/
out/
build/

# Prisma
prisma/*.db
prisma/*.db-journal

# Node
node_modules/
npm-debug.log*

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

### .env.example (atualizar)
```bash
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN="TEST-..."
MERCADO_PAGO_PUBLIC_KEY="TEST-..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## 🚀 Comandos de Setup

### Inicial (uma vez)
```bash
# Install dependencies
npm install

# Setup Prisma
npx prisma generate
npx prisma migrate dev --name initial
npx prisma db seed

# Criar branches
git checkout develop
git checkout -b feature/prompts-backend develop
git checkout -b feature/prompts-frontend develop
```

### Durante desenvolvimento
```bash
# Backend Agent
git checkout feature/prompts-backend
npm run dev

# Frontend Agent (outro terminal)
git checkout feature/prompts-frontend
npm run dev

# Merge quando pronto
git checkout develop
git merge feature/prompts-backend
git merge feature/prompts-frontend
git push origin develop
```

---

## 📊 Monitoring de Conflitos

### Arquivo watch list
Arquivos que **múltiplos agents** podem tocar:

| Arquivo | Agent 1 | Agent 2 | Agent 3 | Solução |
|---------|---------|---------|---------|---------|
| `prisma/schema.prisma` | ✅ | ❌ | ✅ | Agent 3 espera Agent 1 |
| `lib/prompts/*` | ✅ | ✅ | ❌ | Comunicar antes de mudar |
| `components/prompts/*` | ❌ | ✅ | ✅ | Namespacing: public/ vs admin/ |

### Prevenção
1. **API Contract:** Definir antes de começar
2. **Component Namespacing:** `components/prompts/public/` vs `components/prompts/admin/`
3. **Daily Sync:** Revisar PRs diariamente
4. **Small PRs:** Merge frequente (não acumular)

---

**Estrutura definida:** 2026-01-29
**Status:** Ready para iniciar Sprints 🚀
