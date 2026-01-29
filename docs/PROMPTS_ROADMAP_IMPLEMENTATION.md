# 🗺️ Roadmap de Implementação - Repositório de Prompts

**Projeto:** @bispo.ia Prompt Repository
**Data:** 2026-01-29
**Sprints:** 3 (Sprint 4 postponed)
**Duração total:** 3 semanas

---

## 📋 Decisões Confirmadas

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| **Domínio** | `ebook-landing-final.vercel.app/prompts` | Mais simples, sem CORS, auth compartilhada |
| **Banco** | Neon PostgreSQL | Já em uso no projeto |
| **Auth** | NextAuth.js | Padrão Next.js |
| **Schema** | Híbrido (best of both) | Combina original + spec |
| **Fases** | Sprints 1-3 (4 postponed) | MVP primeiro |

---

## 🎯 Sprint 1: Foundation & MVP (Semana 1)

### Objetivo
Sistema básico funcionando: banco + API + listagem + visualização

### Entregas
1. ✅ Schema Prisma híbrido implementado
2. ✅ Migrations criadas
3. ✅ Seed com categorias + 3 prompts exemplo
4. ✅ API routes públicas funcionando
5. ✅ Página de listagem (/prompts)
6. ✅ Página de visualização (/prompts/:slug)
7. ✅ Botão copiar funcionando
8. ✅ Analytics básico (viewCount, copyCount)

### Tasks Detalhadas

#### Backend (Prisma + API)
- [ ] **T1.1** - Criar schema híbrido completo
  - Models: User, Prompt, PromptVersion, PromptCategory, PromptTag, PromptUsage
  - Enums: UserRole, PromptStatus, AIModel
  - Relationships completas
  - Indexes otimizados

- [ ] **T1.2** - Executar migrations
  ```bash
  npx prisma migrate dev --name add_prompts_system
  npx prisma generate
  ```

- [ ] **T1.3** - Criar seed inicial
  - 8 categorias (diagnóstico, validação, avatar, etc)
  - 10 tags básicas
  - 3 prompts exemplo (1 de cada categoria prioritária)
  - 1 usuário staff (você)

- [ ] **T1.4** - Criar lib helpers
  - `lib/prompts/parser.ts` - Extrair e preencher placeholders
  - `lib/prompts/validator.ts` - Validar campos
  - `lib/prompts/types.ts` - TypeScript types

- [ ] **T1.5** - API Routes públicas
  - `GET /api/prompts` - Listar com filtros
  - `GET /api/prompts/[slug]` - Detalhes
  - `POST /api/prompts/[slug]/copy` - Registrar cópia
  - `GET /api/prompts/categories` - Listar categorias
  - `GET /api/prompts/tags` - Listar tags

#### Frontend (Pages)
- [ ] **T1.6** - Página de listagem `/prompts`
  - Grid de cards responsivo
  - Filtros: categoria, tags, modelo
  - Busca por título/descrição
  - Loading states
  - Empty states

- [ ] **T1.7** - Página de visualização `/prompts/[slug]`
  - Header (título, descrição, tags)
  - Seletor de modelo
  - Versões disponíveis (se múltiplas)
  - Conteúdo do prompt (syntax highlight)
  - Botão copiar
  - Toast de feedback
  - Analytics tracking

- [ ] **T1.8** - Componentes reutilizáveis
  - `PromptCard` - Card na listagem
  - `ModelSelector` - Dropdown de modelos
  - `PromptContent` - Display do prompt com highlight
  - `CopyButton` - Botão com feedback

#### Testing & Polish
- [ ] **T1.9** - Testar fluxo completo
  - Listar prompts
  - Filtrar por categoria
  - Abrir prompt
  - Selecionar modelo
  - Copiar
  - Verificar analytics

- [ ] **T1.10** - Responsividade
  - Mobile (320px, 390px)
  - Tablet (768px)
  - Desktop (1920px)

### Arquivos Criados
```
prisma/
├── schema.prisma (atualizado)
└── seeds/
    └── prompts-seed.ts

lib/prompts/
├── parser.ts
├── validator.ts
└── types.ts

app/api/prompts/
├── route.ts
├── [slug]/
│   ├── route.ts
│   └── copy/
│       └── route.ts
├── categories/
│   └── route.ts
└── tags/
    └── route.ts

app/prompts/
├── page.tsx
├── [slug]/
│   └── page.tsx
└── components/
    ├── PromptCard.tsx
    ├── PromptList.tsx
    ├── PromptDetail.tsx
    ├── ModelSelector.tsx
    ├── PromptContent.tsx
    └── CopyButton.tsx
```

---

## 🎯 Sprint 2: Placeholders & Preview (Semana 2)

### Objetivo
Sistema de placeholders dinâmicos com preview em tempo real

### Entregas
1. ✅ Parser de placeholders {{variavel}}
2. ✅ Form dinâmico baseado em placeholders
3. ✅ Preview em tempo real
4. ✅ Validação de campos obrigatórios
5. ✅ Substituição antes de copiar
6. ✅ UX polida

### Tasks Detalhadas

#### Parser & Logic
- [ ] **T2.1** - Parser de placeholders
  - Regex para detectar {{variavel}}
  - Suporte a {{variavel:default}}
  - Extração de metadados

- [ ] **T2.2** - Sistema de substituição
  - Substituir placeholders com valores
  - Preservar formatação
  - Handle valores vazios

- [ ] **T2.3** - Validador
  - Campos obrigatórios
  - Tipos (text, textarea, select)
  - Max length
  - Mensagens de erro

#### Frontend
- [ ] **T2.4** - Componente PlaceholderForm
  - Renderização dinâmica baseada em config
  - Inputs: text, textarea, select, number
  - Labels e descriptions
  - Estados de erro

- [ ] **T2.5** - Preview em tempo real
  - Atualiza conforme usuário digita
  - Highlight de placeholders preenchidos
  - Syntax highlighting

- [ ] **T2.6** - UX improvements
  - Auto-focus primeiro campo
  - Tab navigation
  - Keyboard shortcuts (Cmd/Ctrl+C para copiar)
  - Feedback visual

#### Testing
- [ ] **T2.7** - Testar edge cases
  - Placeholder sem valor (obrigatório)
  - Placeholder com default
  - Múltiplos placeholders
  - Placeholder duplicado
  - Caracteres especiais

### Arquivos Atualizados/Criados
```
lib/prompts/
├── parser.ts (atualizado)
└── placeholder-engine.ts (novo)

app/prompts/[slug]/
├── page.tsx (atualizado)
└── components/
    ├── PlaceholderForm.tsx (novo)
    ├── PlaceholderInput.tsx (novo)
    ├── PromptPreview.tsx (novo)
    └── CopyButton.tsx (atualizado)
```

---

## 🎯 Sprint 3: Admin Dashboard (Semana 3)

### Objetivo
Área administrativa completa para gerenciar prompts

### Entregas
1. ✅ Dashboard staff
2. ✅ CRUD de prompts
3. ✅ Gerenciamento de versões
4. ✅ Auto-detecção de placeholders
5. ✅ Preview no editor
6. ✅ Importação em lote (opcional)

### Tasks Detalhadas

#### Auth & Permissions
- [ ] **T3.1** - Configurar NextAuth
  - Provider (credentials ou email)
  - Session management
  - Callbacks

- [ ] **T3.2** - Middleware de proteção
  - `requireAuth()` - Usuário logado
  - `requireStaff()` - Role STAFF ou ADMIN
  - Route protection

- [ ] **T3.3** - Atualizar User no banco
  - Adicionar role ao seu usuário
  - Testar auth flow

#### API Admin
- [ ] **T3.4** - API routes admin
  - `POST /api/admin/prompts` - Criar
  - `PUT /api/admin/prompts/[id]` - Atualizar
  - `DELETE /api/admin/prompts/[id]` - Deletar
  - `POST /api/admin/prompts/[id]/versions` - Nova versão
  - `PUT /api/admin/prompts/[id]/versions/[vid]` - Atualizar versão

- [ ] **T3.5** - Validações
  - Slug único
  - Alias único
  - Campos obrigatórios
  - Permissões

#### Frontend Admin
- [ ] **T3.6** - Dashboard `/prompts/manage`
  - Overview (stats)
  - Lista de prompts
  - Filtros
  - Busca
  - Ações rápidas

- [ ] **T3.7** - Criar prompt `/prompts/manage/new`
  - Form completo
  - Categoria selector
  - Tags input
  - Modelos checkbox
  - Editor de conteúdo
  - Auto-detecção de placeholders
  - Preview

- [ ] **T3.8** - Editar prompt `/prompts/manage/[slug]/edit`
  - Mesmos campos do criar
  - Carregar dados existentes
  - Atualização otimista

- [ ] **T3.9** - Gerenciar versões
  - Lista de versões por modelo
  - Criar nova versão
  - Marcar como recomendada
  - Comparar versões
  - Duplicar versão

- [ ] **T3.10** - Componentes admin
  - `PromptEditor` - Editor rico
  - `PlaceholderDetector` - Auto-detect
  - `VersionManager` - Gerenciar versões
  - `PromptPreview` - Preview no editor

#### Import (Opcional)
- [ ] **T3.11** - Script de importação
  - Ler arquivos markdown do curso
  - Parsear estrutura
  - Detectar placeholders
  - Criar prompts no banco
  - Categorizar por source_chapter

### Arquivos Criados/Atualizados
```
middleware.ts (novo)

lib/auth/
├── require-auth.ts
└── require-staff.ts

app/api/admin/prompts/
├── route.ts
├── [id]/
│   ├── route.ts
│   └── versions/
│       ├── route.ts
│       └── [vid]/
│           └── route.ts

app/prompts/manage/
├── page.tsx (dashboard)
├── new/
│   └── page.tsx
├── [slug]/
│   └── edit/
│       └── page.tsx
└── components/
    ├── PromptEditor.tsx
    ├── PlaceholderDetector.tsx
    ├── VersionManager.tsx
    ├── PromptTable.tsx
    └── StatsCards.tsx

scripts/
└── import-prompts.ts
```

---

## 📊 Paralelização de Trabalho

### Estratégia
Dividir trabalho em 3 agents paralelos que **não conflitam**:

```
Agent 1: Backend & API
├── Schema Prisma
├── Migrations
├── Seed
├── Lib helpers
└── API routes

Agent 2: Frontend Public
├── Página listagem
├── Página visualização
├── Componentes públicos
└── UX/UI público

Agent 3: Frontend Admin (depois)
├── Dashboard
├── Editor
├── Auth setup
└── Componentes admin
```

### Branches Strategy

```
main
├── feature/prompts-backend      (Agent 1)
├── feature/prompts-frontend     (Agent 2)
└── feature/prompts-admin        (Agent 3)
```

**Sequência:**
1. Agent 1 + 2 em paralelo (Sprint 1)
2. Merge backend + frontend (Sprint 1 final)
3. Agent 2 (Placeholders - Sprint 2)
4. Agent 3 (Admin - Sprint 3)

---

## 🎯 Milestones & Checkpoints

### Checkpoint 1 (Fim Sprint 1)
```
✅ Schema no banco (migrate + seed)
✅ 3 prompts exemplo criados
✅ API retornando dados
✅ Página /prompts listando cards
✅ Página /prompts/:slug com copiar funcionando
✅ Analytics básico (viewCount, copyCount)

Teste: Abrir /prompts, clicar em prompt, copiar → sucesso
```

### Checkpoint 2 (Fim Sprint 2)
```
✅ Parser de placeholders funcionando
✅ Form dinâmico renderizando
✅ Preview em tempo real
✅ Validação de campos
✅ Copiar com placeholders substituídos

Teste: Prompt com {{nicho}} → preencher → preview atualiza → copiar
```

### Checkpoint 3 (Fim Sprint 3)
```
✅ Auth funcionando
✅ Dashboard staff acessível
✅ CRUD de prompts completo
✅ Gerenciar versões por modelo
✅ Auto-detecção de placeholders
✅ Preview no editor

Teste: Login staff → criar prompt → versões → publicar → ver público
```

---

## 🚀 Deploy Strategy

### Development
```
Localhost: http://localhost:3000/prompts
```

### Staging (Vercel Preview)
```
Preview URL: https://ebook-landing-final-git-feature-prompts-pablobispo.vercel.app/prompts
```

### Production
```
URL: https://ebook-landing-final.vercel.app/prompts
Domínio custom: https://app.bispo.ia/prompts (futuro)
```

---

## 📦 Dependencies a Adicionar

```json
{
  "dependencies": {
    "next-auth": "^5.0.0-beta",
    "react-syntax-highlighter": "^15.5.0",
    "react-hook-form": "^7.51.0", // já tem
    "zod": "^4.3.6" // já tem
  },
  "devDependencies": {
    "@types/react-syntax-highlighter": "^15.5.11"
  }
}
```

---

## 📝 Checklist Final

### Antes de Começar
- [ ] Confirmar schema híbrido está ok
- [ ] Neon database URL configurada
- [ ] Decidir nome do projeto (mover?)
- [ ] Criar branches
- [ ] Dividir agents

### Durante Sprint 1
- [ ] Daily check: agents não conflitando
- [ ] Code review antes de merge
- [ ] Testar integração backend + frontend

### Durante Sprint 2
- [ ] Testar com prompts reais do curso
- [ ] UX review (preview, validação)
- [ ] Performance check

### Durante Sprint 3
- [ ] Security review (auth, permissions)
- [ ] Import de prompts do curso
- [ ] Documentation

### Pós Sprint 3
- [ ] Deploy em produção
- [ ] Migrar prompts do curso
- [ ] Onboarding de staff
- [ ] Planejar Sprint 4 (futuro)

---

## 🎯 Success Metrics

### Sprint 1
- ✅ 3 prompts funcionando
- ✅ 10 usuários testam e copiam
- ✅ 0 bugs críticos

### Sprint 2
- ✅ 5 prompts com placeholders
- ✅ Validação 100% funcional
- ✅ Preview sem lag

### Sprint 3
- ✅ 10+ prompts importados do curso
- ✅ Staff cria 3 prompts novos
- ✅ CRUD completo sem bugs

---

**Roadmap criado:** 2026-01-29
**Última atualização:** 2026-01-29
**Status:** Ready to start 🚀
