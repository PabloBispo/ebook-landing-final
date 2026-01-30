# Correções de Bugs Aplicadas

**Data:** 2026-01-29
**Contexto:** Testes visuais do Repositório de Prompts

---

## 🐛 Bug #1: FilterBar - API response não tratada

### Arquivo
`/app/prompts/components/FilterBar.tsx`

### Problema
```typescript
// ❌ ANTES
useEffect(() => {
  fetch('/api/prompts/categories')
    .then(res => res.json())
    .then(setCategories)  // Recebia { success, data, count }
    .catch(console.error)
}, [])
```

**Erro:** `categories.map is not a function`
**Causa:** API retorna `{ success: true, data: [...] }`, mas código tentava usar objeto como array

### Solução
```typescript
// ✅ DEPOIS
useEffect(() => {
  fetch('/api/prompts/categories')
    .then(res => res.json())
    .then(data => setCategories(data.data || []))  // Acessa data.data
    .catch(console.error)
}, [])
```

---

## 🐛 Bug #2: PromptsPage - Prompts não renderizados

### Arquivo
`/app/prompts/page.tsx`

### Problema
```typescript
// ❌ ANTES
async function fetchPrompts() {
  setLoading(true)
  try {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)

    const res = await fetch(`/api/prompts?${params}`)
    const data = await res.json()
    setPrompts(data)  // data é { success, data: [...] }
  } catch (error) {
    console.error('Failed to fetch prompts:', error)
  } finally {
    setLoading(false)
  }
}
```

**Sintoma:** Página vazia, nenhum prompt exibido
**Causa:** Mesma que Bug #1 - objeto ao invés de array

### Solução
```typescript
// ✅ DEPOIS
async function fetchPrompts() {
  setLoading(true)
  try {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)

    const res = await fetch(`/api/prompts?${params}`)
    const data = await res.json()
    setPrompts(data.data || [])  // Acessa data.data
  } catch (error) {
    console.error('Failed to fetch prompts:', error)
  } finally {
    setLoading(false)
  }
}
```

---

## 🐛 Bug #3: PromptDetailPage - Crash ao acessar versions

### Arquivo
`/app/prompts/[slug]/page.tsx`

### Problema
```typescript
// ❌ ANTES
async function fetchPrompt(slug: string) {
  try {
    const res = await fetch(`/api/prompts/${slug}`)
    const data = await res.json()
    setPrompt(data)  // data é { success, data: {...} }

    // Selecionar versão recomendada
    const recommended = data.versions.find((v: any) => v.isRecommended)
    // ❌ data.versions é undefined!
    if (recommended) {
      setSelectedModel(recommended.modelTag)
    } else if (data.versions[0]) {
      setSelectedModel(data.versions[0].modelTag)
    }
  } catch (error) {
    console.error('Failed to fetch prompt:', error)
  } finally {
    setLoading(false)
  }
}
```

**Erro:** `Cannot read properties of undefined (reading 'find')`
**Causa:** `data` é o objeto wrapper, não o prompt. `data.versions` não existe.

### Solução
```typescript
// ✅ DEPOIS
async function fetchPrompt(slug: string) {
  try {
    const res = await fetch(`/api/prompts/${slug}`)
    const response = await res.json()
    const data = response.data  // Extrai o prompt do wrapper
    setPrompt(data)

    // Selecionar versão recomendada
    const recommended = data?.versions?.find((v: any) => v.isRecommended)
    // ✅ Safe navigation operator
    if (recommended) {
      setSelectedModel(recommended.modelTag)
    } else if (data.versions[0]) {
      setSelectedModel(data.versions[0].modelTag)
    }
  } catch (error) {
    console.error('Failed to fetch prompt:', error)
  } finally {
    setLoading(false)
  }
}
```

**Melhorias adicionais:**
- Renomeação de variável para clareza (`data` → `response`, `response.data` → `data`)
- Uso de optional chaining (`data?.versions?.find`)

---

## 📋 Resumo

| Bug | Arquivo | Linha | Severidade | Status |
|-----|---------|-------|------------|--------|
| #1  | FilterBar.tsx | 22 | 🔴 CRÍTICO | ✅ Corrigido |
| #2  | page.tsx (prompts) | 36 | 🔴 CRÍTICO | ✅ Corrigido |
| #3  | page.tsx ([slug]) | 42 | 🔴 CRÍTICO | ✅ Corrigido |

---

## 🎯 Padrão Identificado

**Problema Raiz:** Inconsistência entre formato de resposta da API e código frontend.

**API retorna:**
```typescript
{
  success: boolean
  data: T  // Array ou Object
  count?: number
}
```

**Frontend esperava:**
```typescript
T  // Diretamente o dado
```

---

## ✅ Validação

Após as correções:
- ✅ Página `/prompts` carrega com 3 prompts
- ✅ Filtros por categoria funcionam
- ✅ Página `/prompts/[slug]` carrega sem erros
- ✅ Seletor de modelo funciona
- ✅ Analytics (viewCount) incrementa corretamente

---

## 🚀 Próximos Passos

1. **Padronização Global:**
   - Criar helper function para unwrap API responses
   - Exemplo: `const unwrap = (res) => res.data`

2. **Type Safety:**
   - Adicionar tipos TypeScript para API responses
   - Criar interface genérica `ApiResponse<T>`

3. **Error Handling:**
   - Verificar `success` field antes de acessar `data`
   - Mostrar mensagens de erro ao usuário

**Exemplo de melhoria futura:**
```typescript
interface ApiResponse<T> {
  success: boolean
  data: T
  count?: number
  error?: string
}

async function fetchApi<T>(url: string): Promise<T> {
  const res = await fetch(url)
  const json: ApiResponse<T> = await res.json()

  if (!json.success) {
    throw new Error(json.error || 'API request failed')
  }

  return json.data
}

// Uso:
const categories = await fetchApi<Category[]>('/api/prompts/categories')
const prompts = await fetchApi<Prompt[]>('/api/prompts')
```

---

**Notas:**
- Todos os bugs eram do mesmo tipo (API response unwrapping)
- Fácil de evitar com helper functions centralizadas
- Testes automatizados teriam pegado esses erros
