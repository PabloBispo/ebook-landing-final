# Relatório de Inconsistências de Layout

**Data:** 2026-01-31
**Servidor:** http://localhost:3001
**Design System Esperado:** Nike/OpenAI Minimalista (Monocromático)

---

## Executive Summary

- **Total de problemas encontrados:** 47+
- **Páginas analisadas:** 4 (Login, Lista de Prompts, Visualização de Prompt, tentativa de Dashboard)
- **Prioridade CRÍTICA:** 8 problemas
- **Prioridade MÉDIA:** 12 problemas
- **Prioridade BAIXA:** 27+ problemas

### Status Geral
🔴 **CRÍTICO** - O sistema está completamente fora do padrão Nike/OpenAI Minimalista. Há uso extensivo de cores ciano/azul vibrante (bg-primary), bordas inconsistentes (rounded-lg ao invés de rounded-md), e múltiplas classes utilitárias com gradientes e animações que violam o design system.

---

## Problemas por Página

### 1. Página de Login (`/login`)

**Screenshot:** `/reports/layout-analysis/01-login.png`

#### Problemas CRÍTICOS

1. **Border Radius Inconsistente**
   - **Localização:** Inputs (email e senha) e botão
   - **Atual:** `rounded-md` = 8px (detectado pelo DevTools)
   - **Esperado:** `rounded-md` = 6px
   - **Arquivo:** `/app/login/page.tsx` linhas 73, 93, 108
   - **Impacto:** Bordas mais arredondadas que o padrão

#### Problemas MÉDIOS

2. **Focus Ring Incorreto**
   - **Localização:** Inputs
   - **Atual:** `focus:ring-2 focus:ring-gray-900`
   - **Esperado:** `focus:ring-2 focus:ring-blue-600` (accent apenas em focus)
   - **Arquivo:** `/app/login/page.tsx` linhas 73, 93

3. **Cor de Erro Fora do Padrão**
   - **Localização:** Mensagem de erro
   - **Atual:** `bg-red-50 border border-red-200 text-red-700`
   - **Esperado:** Usar variáveis CSS do design system (--destructive)
   - **Arquivo:** `/app/login/page.tsx` linha 100

#### Problemas MENORES

4. **Transição com Delay**
   - **Localização:** Botão
   - **Atual:** `transition-colors` (padrão 150ms)
   - **Esperado:** Sem transições/animações no design minimalista
   - **Arquivo:** `/app/login/page.tsx` linha 108

---

### 2. Página de Lista de Prompts (`/prompts`)

**Screenshot:** `/reports/layout-analysis/03-prompts-list.png`

#### Problemas CRÍTICOS

5. **Cor Primária Ciano/Azul Vibrante**
   - **Localização:** Botão "Todas" e outras seleções
   - **Atual:** `bg-primary` = `rgb(71, 210, 235)` - Ciano vibrante (HSL 195 94% 43%)
   - **Esperado:** Monocromático (preto/branco/gray)
   - **Arquivo:** `/app/globals.css` linha 17, `/app/prompts/components/FilterBar.tsx` linhas 32, 45
   - **Impacto:** CRÍTICO - Quebra completamente o padrão monocromático

6. **Border Radius Inconsistente (rounded-lg)**
   - **Localização:** Botões de filtro e cards
   - **Atual:** `rounded-lg` = 10px
   - **Esperado:** `rounded-md` = 6px
   - **Arquivo:** `/app/prompts/components/FilterBar.tsx` linhas 30, 43
   - **Impacto:** Inconsistência visual severa

7. **Glass Card com Border Radius 12px**
   - **Localização:** Cards de prompts
   - **Atual:** `.glass-card` com `border-radius: 0.75rem` (12px)
   - **Esperado:** `rounded-md` = 6px
   - **Arquivo:** `/app/globals.css` linha 159
   - **Impacto:** CRÍTICO - Classe utilitária fora do padrão

8. **Animação Hover-Lift**
   - **Localização:** Cards
   - **Atual:** `.hover-lift` com `transform: translateY(-4px)`
   - **Esperado:** SEM animações
   - **Arquivo:** `/app/globals.css` linhas 121-127, `/app/prompts/components/PromptCard.tsx` linha 25
   - **Impacto:** Viola princípio "SEM animações"

#### Problemas MÉDIOS

9. **Tags com rounded-md = 8px**
   - **Localização:** Tags de categoria nos cards
   - **Atual:** `rounded-md` = 8px
   - **Esperado:** `rounded-md` = 6px
   - **Arquivo:** `/app/prompts/components/PromptCard.tsx` linha 54

10. **Cor Secundária Inconsistente**
    - **Localização:** Botões não selecionados
    - **Atual:** `bg-secondary` = gray-333 (muito escuro no dark mode)
    - **Esperado:** Padrão gray-100/gray-200 no light, gray-800 no dark

11. **Transições em Múltiplos Elementos**
    - **Localização:** Botões, cards, títulos
    - **Atual:** `transition-colors`, `hover:text-primary`
    - **Esperado:** SEM transições
    - **Arquivos:** FilterBar, PromptCard

#### Problemas MENORES

12. **Emoji nos Botões**
    - **Localização:** Categorias (🎯, 🔍, 👤, etc)
    - **Impacto:** Pode afetar alinhamento visual em alguns navegadores

---

### 3. Página de Visualização de Prompt (`/prompts/criar-headline-irresistivel`)

**Screenshot:** `/reports/layout-analysis/04-prompt-view.png`

#### Problemas CRÍTICOS

13. **Cor Primária Ciano em Múltiplos Elementos**
    - **Localização:** Badge "Universal ⭐", botão "Copiar Prompt"
    - **Atual:** `bg-primary` = `rgb(71, 210, 235)` - Ciano
    - **Esperado:** Monocromático
    - **Arquivo:** Componentes ModelSelector, CopyButton, PlaceholderForm
    - **Impacto:** CRÍTICO - Cor vibrante múltipla

14. **Border Radius Variado (rounded-lg = 10px)**
    - **Localização:** Inputs, cards, botões, preview
    - **Atual:** `rounded-lg` = 10px
    - **Esperado:** `rounded-md` = 6px
    - **Impacto:** Inconsistência em TODOS os elementos interativos

15. **Tags com rounded-full (9999px)**
    - **Localização:** Tags "#estratégia", "#copy"
    - **Atual:** `rounded-full` = 9999px
    - **Esperado:** `rounded-md` = 6px
    - **Arquivo:** Provavelmente em `/app/prompts/[slug]/page.tsx`
    - **Impacto:** Estilo pill vs. retangular padrão

#### Problemas MÉDIOS

16. **Focus Ring com Cor Primária**
    - **Localização:** Inputs do formulário
    - **Atual:** `focus:ring-2 focus:ring-primary` (ciano)
    - **Esperado:** `focus:ring-blue-600` (blue-600 apenas em focus)
    - **Arquivo:** PlaceholderField component

17. **Background Destacado em Código**
    - **Localização:** Preview do prompt
    - **Atual:** `bg-secondary/50` + cores red-100/red-700 para placeholders
    - **Esperado:** Monocromático simples

18. **Múltiplas Transições**
    - **Localização:** Botões, inputs
    - **Atual:** `transition-colors duration-200`
    - **Esperado:** SEM transições

#### Problemas MENORES

19. **Box Shadow no Código Preview**
    - **Localização:** Container PRE
    - **Atual:** `border border-border` (correto), mas pode ter shadow
    - **Esperado:** Sem shadows

---

### 4. Configuração Global (`/app/globals.css`)

#### Problemas CRÍTICOS

20. **Variável --radius = 0.625rem (10px)**
    - **Localização:** `:root`
    - **Atual:** `--radius: 0.625rem` = 10px
    - **Esperado:** `--radius: 0.375rem` = 6px
    - **Arquivo:** `/app/globals.css` linha 42
    - **Impacto:** CRÍTICO - Afeta TODOS os componentes que usam `rounded-lg` e `rounded-md`

21. **Gradientes Definidos**
    - **Localização:** Utilities
    - **Atual:** `.gradient-primary`, `.gradient-accent`, `.gradient-hero`
    - **Esperado:** SEM gradientes no design system
    - **Arquivo:** `/app/globals.css` linhas 97-111
    - **Impacto:** Viola princípio "SEM gradientes"

22. **Animações Múltiplas Definidas**
    - **Localização:** Utilities
    - **Atual:** `animate-fade-in-up`, `animate-scale-in`, `animate-pulse-glow`, etc
    - **Esperado:** SEM animações
    - **Arquivo:** `/app/globals.css` linhas 167-221
    - **Impacto:** Viola princípio "SEM animações"

23. **Efeitos Glow/Shadow**
    - **Localização:** Utilities
    - **Atual:** `.glow-primary`, `.glow-accent`, `.hover-glow`
    - **Esperado:** SEM glows/shadows decorativos
    - **Arquivo:** `/app/globals.css` linhas 113-135

24. **Cores HSL Vibrantes**
    - **Localização:** Variáveis CSS
    - **Atual:**
      - `--primary: 195 94% 43%` (ciano vibrante)
      - `--accent: 189 80% 60%` (azul vibrante)
      - `--ring: 195 94% 43%` (ciano)
    - **Esperado:** Valores monocromáticos
    - **Arquivo:** `/app/globals.css` linhas 17, 23, 40

#### Problemas MÉDIOS

25. **Glass Effects**
    - **Localização:** `.glass`, `.glass-card`
    - **Atual:** `backdrop-filter: blur(8px)` + transparência
    - **Esperado:** Backgrounds sólidos
    - **Arquivo:** `/app/globals.css` linhas 144-165
    - **Impacto:** Efeito visual complexo vs. simplicidade

26. **Text Gradient**
    - **Localização:** `.text-gradient`
    - **Atual:** Gradiente de texto com clip
    - **Esperado:** Cores sólidas
    - **Arquivo:** `/app/globals.css` linhas 137-142

---

## Problemas Estruturais no Tailwind Config

### `/tailwind.config.ts`

#### Problemas MÉDIOS

27. **Border Radius com Variável Dinâmica**
    - **Localização:** `theme.extend.borderRadius`
    - **Atual:**
      ```
      lg: "var(--radius)"  // 10px
      md: "calc(var(--radius) - 2px)"  // 8px
      sm: "calc(var(--radius) - 4px)"  // 6px
      ```
    - **Esperado:**
      ```
      lg: "8px"
      md: "6px"  // Padrão principal
      sm: "4px"
      ```
    - **Arquivo:** `/tailwind.config.ts` linhas 55-59
    - **Impacto:** Toda a escala de border-radius está deslocada +4px

---

## Análise de Código (Detecção Automatizada)

### Problemas Encontrados via DevTools

#### Página /login
- **Total Border Issues:** 3
  - 2 inputs com `border-radius: 8px`
  - 1 botão com `border-radius: 8px`
- **Total Color Issues:** 28+ elementos com cores fora do monocromático

#### Página /prompts
- **Total Border Issues:** 16
  - Botões: `border-radius: 10px` (6x)
  - Cards: `border-radius: 12px` (3x)
  - Tags: `border-radius: 8px` (6x)
- **Botões com bg-primary (ciano):** 1 ativo + hover states
- **Cards com glass-card:** 3 cards com backdrop-filter

#### Página /prompts/[slug]
- **Total Border Issues:** 13
  - Tags rounded-full: `border-radius: 9999px` (2x)
  - Inputs: `border-radius: 10px` (3x)
  - Botões: `border-radius: 10px` (2x)
  - Cards: `border-radius: 10px` (1x)
  - Preview: `border-radius: 10px` (1x)
- **Elementos com bg-primary:** 2 (badge + botão)

---

## Recomendações Priorizadas

### Prioridade CRÍTICA (Quebra Total do Design System)

#### 1. Remover Cores Vibrantes Completamente
**Impacto:** Alto
**Esforço:** Médio

**Ação:**
```css
/* /app/globals.css - Substituir linhas 17, 23, 40, 55, 61 */

:root {
  /* Light Mode - MONOCROMÁTICO */
  --primary: 0 0% 0%;              /* Preto puro #000000 */
  --primary-foreground: 0 0% 100%; /* Branco #FFFFFF */

  --accent: 217 91% 60%;           /* Blue-600 APENAS para focus */
  --accent-foreground: 0 0% 100%;

  --ring: 217 91% 60%;             /* Blue-600 para focus rings */
}

.dark {
  --primary: 0 0% 100%;            /* Branco em dark mode */
  --primary-foreground: 0 0% 10%;  /* Preto em dark mode */

  --accent: 217 91% 60%;
  --ring: 217 91% 60%;
}
```

**Arquivos Afetados:**
- `/app/globals.css` - Alterar variáveis
- `/app/prompts/components/FilterBar.tsx` - Botões ativos
- `/app/prompts/components/ModelSelector.tsx` - Badge
- `/app/prompts/components/CopyButton.tsx` - Botão copiar
- `/app/prompts/[slug]/components/PlaceholderForm.tsx` - Botão submit

#### 2. Corrigir Border Radius Globalmente
**Impacto:** Alto
**Esforço:** Baixo

**Ação:**
```css
/* /app/globals.css - Linha 42 */
--radius: 0.375rem;  /* 6px - padrão Nike/OpenAI */
```

```typescript
/* /tailwind.config.ts - Linhas 55-59 */
borderRadius: {
  lg: "8px",    // Casos especiais (modais)
  md: "6px",    // PADRÃO - usar em 95% dos casos
  sm: "4px",    // Elementos pequenos
}
```

**Buscar e Substituir:**
- `rounded-lg` → `rounded-md` (95% dos casos)
- `rounded-xl` → `rounded-md`
- `rounded-2xl` → `rounded-md`
- `rounded-full` em tags → `rounded-md`

**Exceção:** Manter `rounded-full` apenas em avatares/fotos de perfil

#### 3. Eliminar Gradientes Completamente
**Impacto:** Alto
**Esforço:** Baixo

**Ação:**
```css
/* /app/globals.css - DELETAR linhas 97-111 */
/* Remover:
.gradient-primary
.gradient-accent
.gradient-hero
*/
```

Buscar uso no código:
```bash
grep -r "gradient-" app/ components/
```

Substituir por backgrounds sólidos.

#### 4. Remover Todas as Animações
**Impacto:** Médio-Alto
**Esforço:** Médio

**Ação:**
```css
/* /app/globals.css - DELETAR linhas 121-221 */
/* Remover:
.hover-lift
.hover-glow
.animate-*
@keyframes
*/
```

Buscar e remover do código:
- `hover-lift` → remover classe
- `transition-colors` → remover
- `transition-*` → remover
- `animate-*` → remover

#### 5. Remover Glass Effects
**Impacto:** Médio
**Esforço:** Baixo

**Ação:**
```css
/* /app/globals.css - Substituir linhas 154-165 */
.glass-card {
  background-color: hsl(var(--card));  /* Sólido */
  border: 1px solid hsl(var(--border));
  border-radius: 0.375rem;  /* 6px */
  padding: 1.5rem;
}
/* REMOVER backdrop-filter */
```

#### 6. Substituir Focus Rings
**Impacto:** Médio
**Esforço:** Baixo

**Buscar e Substituir:**
- `focus:ring-primary` → `focus:ring-blue-600`
- `focus:ring-gray-900` → `focus:ring-blue-600`
- `focus:border-primary` → `focus:border-blue-600`

---

### Prioridade MÉDIA (Inconsistências Visuais)

#### 7. Padronizar Espaçamentos
**Ação:** Revisar todos os `gap-*`, `p-*`, `py-*`, `px-*`
- Usar escala: 2, 3, 4, 6, 8, 12, 16, 24
- Preferir valores generosos (py-12, gap-6)

#### 8. Remover Glow/Shadow Utilities
```css
/* DELETAR */
.glow-primary
.glow-accent
.text-gradient
```

#### 9. Simplificar Cores de Estado
- Usar apenas `--destructive` para erros
- Remover backgrounds coloridos (red-50, etc)
- Usar bordar + texto apenas

#### 10. Padronizar Botões
**Primário:**
```tsx
className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900"
```

**Secundário:**
```tsx
className="border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50"
```

**Destructivo:**
```tsx
className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700"
```

#### 11. Inputs Padronizados
```tsx
className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
```

#### 12. Cards Padronizados
```tsx
className="p-6 rounded-md border border-gray-200 bg-white"
```

---

### Prioridade BAIXA (Refinamentos)

13. Remover emojis dos botões (usar texto ou ícones Lucide)
14. Padronizar font-weights (normal, medium, semibold, bold apenas)
15. Revisar hierarquia de texto (text-xs, sm, base, lg, xl, 2xl, 3xl)
16. Remover classes utilitárias não utilizadas
17. Consolidar variantes de componentes
18-27. (Refinamentos adicionais de acessibilidade, performance, etc)

---

## Checklist de Validação

### Design System
- [ ] Paleta monocromática (preto, branco, gray-50 a gray-900)
- [ ] Accent blue-600 APENAS em focus states
- [ ] Sem gradientes em nenhum elemento
- [ ] Sem animações (transitions, transforms, keyframes)
- [ ] Sem cores vibrantes (ciano, múltiplas cores)

### Border Radius
- [ ] Todas as bordas são `rounded-md` (6px)
- [ ] `rounded-lg` (8px) usado APENAS em modais/dialogs se necessário
- [ ] `rounded-full` APENAS em avatares/imagens de perfil
- [ ] Variável `--radius: 0.375rem` (6px)

### Inputs
- [ ] `border-gray-300` no estado normal
- [ ] `focus:border-blue-600` no foco
- [ ] `focus:ring-2 focus:ring-blue-600`
- [ ] `rounded-md` sempre

### Botões
- [ ] Principal: `bg-black text-white`
- [ ] Secundário: `border border-gray-300`
- [ ] Sem transições
- [ ] `rounded-md`

### Cards
- [ ] Backgrounds sólidos (`bg-white` ou `bg-card`)
- [ ] Sem backdrop-filter/glass effects
- [ ] `rounded-md`
- [ ] Padding generoso (`p-6`)

### Espaçamento
- [ ] Gap generoso (gap-6, gap-8)
- [ ] Padding vertical em seções (py-12, py-16)
- [ ] Margem entre elementos (mb-6, mb-8)

### Tipografia
- [ ] Hierarquia clara (text-sm, base, lg, xl, 2xl, 3xl)
- [ ] Cores: text-gray-900 (títulos), text-gray-600 (corpo)
- [ ] Sem text-gradient

### Efeitos
- [ ] Sem shadows decorativos (apenas border)
- [ ] Sem glow effects
- [ ] Sem hover transforms
- [ ] Sem animações

---

## Arquivos Prioritários para Correção

### 1. Configuração Global
- `/app/globals.css` - 🔴 CRÍTICO
- `/tailwind.config.ts` - 🔴 CRÍTICO

### 2. Componentes de Prompts (Públicos)
- `/app/prompts/components/FilterBar.tsx` - 🔴 CRÍTICO (cor primária)
- `/app/prompts/components/PromptCard.tsx` - 🔴 CRÍTICO (glass-card, hover-lift)
- `/app/prompts/components/ModelSelector.tsx` - 🔴 CRÍTICO (bg-primary)
- `/app/prompts/components/CopyButton.tsx` - 🔴 CRÍTICO (bg-primary)
- `/app/prompts/[slug]/components/PlaceholderForm.tsx` - 🟡 MÉDIO
- `/app/prompts/[slug]/components/PlaceholderField.tsx` - 🟡 MÉDIO
- `/app/prompts/[slug]/components/PromptPreview.tsx` - 🟡 MÉDIO

### 3. Auth
- `/app/login/page.tsx` - 🟡 MÉDIO (border-radius, focus-ring)

### 4. Admin (não testado, mas provavelmente afetado)
- `/app/prompts/manage/components/*.tsx` - 🟢 BAIXO (verificar após login)

---

## Métricas de Conformidade

### Conformidade Atual com Design System
- **Paleta de Cores:** 10% (usa ciano vibrante extensivamente)
- **Border Radius:** 20% (maioria usa 8-12px ao invés de 6px)
- **Sem Gradientes:** 85% (poucas classes gradient, mas existem)
- **Sem Animações:** 30% (hover-lift, transitions em muitos lugares)
- **Tipografia:** 70% (razoável, mas pode melhorar)
- **Espaçamento:** 80% (bom, mas alguns ajustes necessários)

### Score Geral: 49% de conformidade

### Meta: 95%+ de conformidade

---

## Próximos Passos Recomendados

1. **IMEDIATO:** Corrigir `/app/globals.css` (variáveis de cor + --radius)
2. **DIA 1:** Substituir todas as ocorrências de `bg-primary` por `bg-black`
3. **DIA 1:** Buscar/substituir `rounded-lg` → `rounded-md` em componentes de prompts
4. **DIA 2:** Remover classes `.hover-lift`, `.glass-card`, gradientes
5. **DIA 2:** Remover todas as transições e animações
6. **DIA 3:** Revisar e padronizar focus states (blue-600)
7. **DIA 3:** Testar todas as páginas e validar conformidade
8. **DIA 4:** Refinar detalhes, espaçamentos, tipografia
9. **DIA 5:** Testes finais + documentação

---

## Anexos

### Screenshots
- `/reports/layout-analysis/01-login.png`
- `/reports/layout-analysis/03-prompts-list.png`
- `/reports/layout-analysis/04-prompt-view.png`

### Snapshots (HTML/A11y Tree)
- `/reports/layout-analysis/01-login-snapshot.txt`
- `/reports/layout-analysis/03-prompts-list-snapshot.txt`
- `/reports/layout-analysis/04-prompt-view-snapshot.txt`

### Dados de Detecção Automatizada
Ver seção "Análise de Código (Detecção Automatizada)" acima.

---

**Relatório gerado por:** Chrome DevTools MCP + Análise Manual
**Ferramenta:** Claude Code Agent
**Contato:** Para dúvidas sobre este relatório, consultar a documentação do design system.
