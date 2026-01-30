# Task #45 - Demonstração Visual
## Como Testar as Novas Features

---

## 🎬 Roteiro de Demonstração

### Setup Inicial

```bash
# 1. Mudar para a branch
git checkout feature/improve-prompt-form-ux

# 2. Instalar dependências (se necessário)
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev

# 4. Abrir navegador
open http://localhost:3000/prompts/manage/new
```

---

## 📝 Cenário 1: Auto-Slug e Auto-Alias

**Objetivo:** Demonstrar geração automática de slug e alias

### Passos:

1. **Abra o form** em `/prompts/manage/new`
2. **Observe os campos vazios:**
   ```
   [Título do Prompt]  ← Vazio
   [Slug (URL)]        ← Vazio (🔒 Auto)
   [Alias (Código)]    ← Vazio (🔒 Auto)
   ```

3. **Digite lentamente:** "Criar Avatar Profundo"

   **Observe em tempo real:**
   ```
   Título: "C"
   Slug:   "c"
   Alias:  "C-01"

   Título: "Criar"
   Slug:   "criar"
   Alias:  "CRIAR-01"

   Título: "Criar Avatar"
   Slug:   "criar-avatar"
   Alias:  "CRIAR-01"

   Título: "Criar Avatar Profundo"
   Slug:   "criar-avatar-profundo"
   Alias:  "CRIAR-01"
   ```

4. **Teste com acentos:** "Criação de Conteúdo"
   ```
   Slug:  "criacao-de-conteudo"  ← Acentos removidos!
   Alias: "CRIACAO-01"
   ```

5. **Teste caracteres especiais:** "Avatar: Profundo!!!"
   ```
   Slug:  "avatar-profundo"      ← Limpo!
   Alias: "AVATAR-01"
   ```

6. **Toggle manual:**
   - Clique no ícone 🔒 ao lado de "Slug"
   - Ícone muda para 🔓
   - Edite manualmente: "meu-slug-customizado"
   - Clique novamente em 🔓 para voltar ao modo auto
   - Continue digitando no título e veja sincronizar

**✅ Sucesso:** Slug e alias gerados automaticamente e corretamente!

---

## 📁 Cenário 2: Criar Categoria Inline

**Objetivo:** Criar nova categoria sem sair do formulário

### Passos:

1. **No form, localize o campo "Categoria"**
   ```
   [Categoria *]
   ┌─────────────────────────────┐
   │ Selecione uma categoria...  │ ← Select com categorias existentes
   └─────────────────────────────┘

   [+ Nova Categoria]  ← Link azul
   ```

2. **Clique em "+ Nova Categoria"**

   **Observe a expansão:**
   ```
   ┌────────────────────────────────────┐
   │ Nova Categoria              [X]    │
   ├────────────────────────────────────┤
   │ [📚] [Nome da categoria_______]    │
   │                                    │
   │ [Criar]  [Cancelar]                │
   └────────────────────────────────────┘
   ```

3. **Preencha:**
   - Emoji: 📱
   - Nome: Marketing Digital

4. **Clique em "Criar"**

   **Observe:**
   - Loading state: "Criando..."
   - Request para `/api/admin/categories`
   - Sucesso: Form fecha
   - Categoria aparece no select
   - **Categoria é auto-selecionada!**

5. **Verifique no select:**
   ```
   [Categoria *]
   ┌─────────────────────────────┐
   │ 📱 Marketing Digital  ✓     │ ← Selecionado!
   └─────────────────────────────┘
   ```

**✅ Sucesso:** Categoria criada e selecionada sem sair do form!

---

## 🏷️ Cenário 3: Tags Dinâmicas

**Objetivo:** Buscar tags existentes e criar novas on-the-fly

### Parte A: Buscar e Adicionar Tag Existente

1. **Localize o campo "Tags"**
   ```
   [Tags]
   ┌─────────────────────────────────────┐
   │ Digite para buscar ou criar tag...  │
   └─────────────────────────────────────┘
   ```

2. **Digite:** "ava"

   **Observe dropdown:**
   ```
   ┌─────────────────────────────────────┐
   │ avatar                              │
   │ avatar-profundo                     │
   └─────────────────────────────────────┘
   ```

3. **Clique em "avatar"**

   **Observe:**
   - Tag adicionada como chip azul
   - Input limpa automaticamente
   - Dropdown fecha
   ```
   [avatar ×]  ← Chip azul com X

   ┌─────────────────────────────────────┐
   │ Digite para buscar ou criar tag...  │
   └─────────────────────────────────────┘
   ```

### Parte B: Criar Nova Tag

4. **Digite:** "neuromarketing"

   **Observe (tag não existe):**
   ```
   ┌─────────────────────────────────────┐
   │ + Criar tag "neuromarketing"        │ ← Opção de criar
   └─────────────────────────────────────┘
   ```

5. **Clique ou pressione Enter**

   **Observe:**
   - Loading: "Criando..."
   - Request para `/api/admin/tags`
   - Tag criada
   - Chip aparece
   ```
   [avatar ×] [neuromarketing ×]
   ```

### Parte C: Remover Tags

6. **Clique no X** de qualquer chip

   **Observe:**
   - Tag removida
   - Transição suave
   - Disponível novamente no autocomplete

### Parte D: Keyboard Navigation

7. **Digite:** "mar"
8. **Pressione ↓** (seta para baixo)
9. **Pressione Enter** → Adiciona primeira sugestão
10. **Digite tag nova + Enter** → Cria e adiciona

**✅ Sucesso:** Tags gerenciadas de forma fluida e intuitiva!

---

## 🤖 Cenário 4: Multi-Select de Modelos

**Objetivo:** Selecionar múltiplos modelos com feedback visual

### Passos:

1. **Localize "Modelos de IA"**
   ```
   [Modelos de IA *]
   Selecione os modelos compatíveis com este prompt

   ┌─────────────────────────────┐
   │ ☐ Universal ⭐              │
   │   Funciona em todos modelos │
   └─────────────────────────────┘

   ┌─────────────────────────────┐
   │ ☐ ChatGPT-4                 │
   │   Otimizado para GPT-4      │
   └─────────────────────────────┘
   ```

2. **Clique em "Universal"**

   **Observe mudança visual:**
   ```
   ┌─────────────────────────────┐  ← Borda azul
   │ ☑ Universal ⭐              │  ← Checkbox marcado
   │   Funciona em todos modelos │  ← Background azul claro
   └─────────────────────────────┘
   ```

3. **Clique em "ChatGPT-4"**

   **Observe:**
   - Ambos selecionados
   - Ambos com borda azul
   - Visual consistente

4. **Tente desselecionar todos**

   **Observe:**
   - Quando nenhum modelo selecionado:
   ```
   [Criar Prompt]  ← Botão DESABILITADO (opaco)

   ⚠️ Selecione pelo menos um modelo de IA para continuar.
   ```

5. **Selecione pelo menos um**

   **Observe:**
   - Botão fica habilitado
   - Mensagem de erro desaparece

**✅ Sucesso:** Validação e feedback visual claros!

---

## 🎨 Cenário 5: Responsividade

**Objetivo:** Verificar layout em diferentes tamanhos

### Desktop (>1024px)

```
[Título do Prompt________________________]

[Slug_____________] [Alias_____________]  ← Grid 2 colunas

[Categoria *_____________________________]

[☐ Universal ⭐    ] [☐ ChatGPT-4        ]  ← Grid 2 colunas
[☐ Claude Opus    ] [☐ Gemini 2.0 Flash ]
```

### Tablet (768px-1023px)

```
[Título do Prompt__________________]

[Slug___________] [Alias___________]  ← Ainda 2 colunas

[Categoria *_______________________]

[☐ Universal ⭐  ] [☐ ChatGPT-4      ]  ← 2 colunas mais apertadas
[☐ Claude Opus  ] [☐ Gemini 2.0     ]
```

### Mobile (<768px)

```
[Título do Prompt_____]

[Slug_________________]  ← 1 coluna
[Alias________________]

[Categoria *__________]

[☐ Universal ⭐       ]  ← 1 coluna
  Funciona em todos

[☐ ChatGPT-4          ]
  Otimizado para GPT-4
```

**Como testar:**
1. Abra DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Teste:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

**✅ Sucesso:** Layout adapta perfeitamente!

---

## 🔍 Cenário 6: Estados de Foco

**Objetivo:** Verificar acessibilidade e UX

### Passos:

1. **Use Tab para navegar**
   ```
   Tab → Título     (ring azul)
   Tab → Slug       (ring azul)
   Tab → Alias      (ring azul)
   Tab → Descrição  (ring azul)
   Tab → Categoria  (ring azul)
   Tab → Modelo 1   (outline)
   Tab → Modelo 2   (outline)
   ```

2. **Observe hover states**
   - Cards de modelo: background cinza claro
   - Botões: opacidade reduz
   - Links: underline aparece

3. **Observe transições**
   - Suaves (300ms)
   - Sem "saltos"
   - Confortável visualmente

**✅ Sucesso:** Navegação por teclado funcional!

---

## 🐛 Cenário 7: Edge Cases

**Objetivo:** Testar casos extremos

### 1. Título Vazio
```
Título: ""
Slug:   ""     ← Não gera nada (correto)
Alias:  ""
```

### 2. Título com Espaços Múltiplos
```
Título: "Criar    Avatar     Profundo"
Slug:   "criar-avatar-profundo"  ← Um hífen só
```

### 3. Título Só com Símbolos
```
Título: "!@#$%"
Slug:   ""     ← Limpa tudo (correto)
```

### 4. Emoji no Nome da Categoria
```
Emoji: 🎨📱  ← Permite 2 chars
Nome: "Design"
Resultado: OK
```

### 5. Tag Duplicada
```
Cria "avatar" novamente
API retorna: { data: <tag existente> }  ← Não duplica!
```

### 6. Click Fora do Dropdown
```
Dropdown aberto → Click fora → Fecha
```

**✅ Sucesso:** Todos edge cases tratados!

---

## 📊 Checklist de Demonstração

Marque conforme testa:

### Auto-Slug/Alias
- [ ] Gera ao digitar título
- [ ] Remove acentos
- [ ] Remove caracteres especiais
- [ ] Toggle lock/unlock funciona
- [ ] Modo manual preserva edição

### Categoria Inline
- [ ] Botão "Nova Categoria" abre form
- [ ] Validação de nome e emoji
- [ ] Categoria criada aparece no select
- [ ] Auto-seleção após criar
- [ ] Botão "Cancelar" fecha form

### Tags Dinâmicas
- [ ] Autocomplete filtra ao digitar
- [ ] Adiciona tag existente ao clicar
- [ ] Cria nova tag com botão "+"
- [ ] Enter adiciona/cria tag
- [ ] X remove tag
- [ ] Click fora fecha dropdown

### Multi-Select Modelos
- [ ] Seleciona múltiplos modelos
- [ ] Borda azul ao selecionar
- [ ] Background azul claro
- [ ] Validação de mínimo 1
- [ ] Mensagem de erro quando vazio
- [ ] Botão desabilitado sem modelo

### Responsividade
- [ ] Desktop: grid 2 colunas
- [ ] Tablet: grid 2 colunas
- [ ] Mobile: coluna única
- [ ] Tudo legível em 320px

### Acessibilidade
- [ ] Tab navega todos campos
- [ ] Focus ring visível
- [ ] Hover states claros
- [ ] Transições suaves

### Edge Cases
- [ ] Título vazio → slug vazio
- [ ] Acentos → removidos
- [ ] Espaços múltiplos → hífen único
- [ ] Tag duplicada → retorna existente

---

## 🎥 Capturas Recomendadas

Para documentação, capture:

1. **Auto-slug em ação**
   - Antes: título vazio
   - Durante: digitando
   - Depois: slug/alias preenchidos

2. **CategoryCreator**
   - Botão "+ Nova Categoria"
   - Form expandido
   - Categoria no select

3. **TagInput autocomplete**
   - Dropdown com sugestões
   - Botão "Criar nova tag"
   - Chips selecionados

4. **Multi-select modelos**
   - Nenhum selecionado
   - Um selecionado
   - Múltiplos selecionados
   - Mensagem de erro

5. **Mobile view**
   - iPhone SE (375px)
   - Layout coluna única

---

## 🚀 Próximo Passo

Após testar tudo:

```bash
# Merge para develop
git checkout develop
git merge feature/improve-prompt-form-ux

# Push
git push origin develop

# Criar PR (se usar GitHub)
gh pr create --title "feat: Melhorar UX do PromptForm" --body "..."
```

---

**Divirta-se testando! Qualquer issue, documente e crie ticket.** 🎉
