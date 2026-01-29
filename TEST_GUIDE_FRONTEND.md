# 🧪 Guia de Teste - Frontend Sprint 1

## ⚡ Setup Rápido

```bash
# 1. Checkout da branch
git checkout feature/prompts-frontend

# 2. Instalar dependências (se necessário)
npm install

# 3. Iniciar dev server
npm run dev

# 4. Abrir no navegador
open http://localhost:3000/prompts
```

---

## 📋 Checklist de Testes

### ✅ Página de Listagem `/prompts`

#### Visual
- [ ] Header aparece com título "📚 Biblioteca de Prompts"
- [ ] Descrição está visível
- [ ] FilterBar renderiza (mesmo sem categorias)
- [ ] Loading skeleton aparece (3 cards pulsando)
- [ ] Quando sem dados: mensagem "Nenhum prompt encontrado"

#### Interação (aguarda API)
- [ ] Cards aparecem quando API retorna dados
- [ ] Clicar em categoria filtra resultados
- [ ] Clicar em "Todas" remove filtro
- [ ] Clicar em card navega para /prompts/:slug

#### Responsividade
```bash
# Testar nos seguintes breakpoints:

# Mobile
- [ ] 320px: 1 coluna, padding adequado
- [ ] 390px: 1 coluna, sem scroll horizontal

# Tablet
- [ ] 768px: 2 colunas
- [ ] 1024px: 3 colunas

# Desktop
- [ ] 1920px: 3 colunas, centrado
```

---

### ✅ Página de Visualização `/prompts/[slug]`

#### Visual
- [ ] Loading spinner aparece
- [ ] Back link "← Voltar para biblioteca"
- [ ] Ícone de categoria aparece
- [ ] Alias em fonte mono
- [ ] Título grande e bold
- [ ] Descrição visível
- [ ] Tags renderizam em pills
- [ ] ModelSelector aparece
- [ ] Prompt content em box cinza
- [ ] CopyButton full width

#### Interação (aguarda API)
- [ ] Back link navega para /prompts
- [ ] ModelSelector muda versão exibida
- [ ] Versão recomendada tem ⭐
- [ ] CopyButton copia para clipboard
- [ ] Ícone muda para Check após copiar
- [ ] Texto muda para "Copiado!"
- [ ] Ícone volta para Copy após 2s
- [ ] Stats footer mostra views/copies

#### Estados de Erro
- [ ] Slug inválido: "Prompt não encontrado"
- [ ] Erro de API: trata gracefully

#### Responsividade
```bash
# Mobile
- [ ] 320px: texto não quebra, botão full width
- [ ] Header stack vertical se necessário

# Tablet
- [ ] 768px: layout confortável

# Desktop
- [ ] 1920px: max-width 4xl, centrado
```

---

## 🎨 Testes Visuais

### Temas
```bash
# Testar em ambos os modos
- [ ] Light mode: contraste adequado
- [ ] Dark mode: contraste adequado
```

### Animações
- [ ] Hover em card: lift + color change
- [ ] Hover em botão: bg opacity
- [ ] Loading skeleton: pulse animation
- [ ] Copy feedback: smooth transition

### Tipografia
- [ ] Títulos: bold e hierarquia clara
- [ ] Descrições: muted-foreground
- [ ] Alias: font-mono
- [ ] Tags: tamanho pequeno, legível

---

## 🔧 Testes com Mock Data

Como a API ainda não está pronta, você pode testar com dados mock.

### Opção 1: Mock no próprio componente

Edite temporariamente `app/prompts/page.tsx`:

```tsx
async function fetchPrompts() {
  setLoading(true)
  try {
    // Mock data temporário
    const mockData = [
      {
        id: '1',
        slug: 'estrutura-ebook-ficcao',
        alias: 'ebook-fic-001',
        title: 'Estrutura de Ebook de Ficção',
        description: 'Crie a estrutura completa de um ebook de ficção com capítulos, sinopse e arco narrativo.',
        category: { name: 'Estrutura', icon: '📚' },
        tags: [
          { name: 'ebook' },
          { name: 'ficção' },
          { name: 'estrutura' }
        ],
        copyCount: 42,
        _count: { versions: 3 }
      }
    ]
    setPrompts(mockData)
  } catch (error) {
    console.error('Failed to fetch prompts:', error)
  } finally {
    setLoading(false)
  }
}
```

### Opção 2: Mock Server (MSW)

Se preferir uma abordagem mais robusta, pode configurar MSW (Mock Service Worker).

---

## 🐛 Bugs Conhecidos

Nenhum até o momento! 🎉

---

## ✅ Build Test

```bash
# Verificar build de produção
npm run build

# Deve compilar sem erros:
✓ Compiled successfully
✓ Generating static pages
```

---

## 📸 Screenshots Sugeridos

Tire screenshots para documentação:

1. **Listagem - Desktop**
   - Grid com 3 colunas
   - FilterBar no topo

2. **Listagem - Mobile**
   - 1 coluna
   - Cards stacked

3. **Visualização - Desktop**
   - Header completo
   - ModelSelector
   - Prompt content
   - CopyButton

4. **Visualização - Mobile**
   - Layout responsivo
   - Botão full width

5. **Estados**
   - Loading skeleton
   - Empty state
   - Copied feedback

---

## 🚦 Critérios de Aceitação

### ✅ Frontend está pronto quando:

- [ ] Build passa sem erros TypeScript
- [ ] Build passa sem erros ESLint
- [ ] Todas as páginas renderizam
- [ ] Componentes são reutilizáveis
- [ ] Responsividade funciona em todos breakpoints
- [ ] Animações são suaves
- [ ] Loading states estão presentes
- [ ] Error states estão presentes
- [ ] Código está commitado e pushed
- [ ] Documentação está atualizada

---

## 🔄 Integração com Backend

Quando o backend estiver pronto:

1. **Verificar contratos de API**
   - Tipos TypeScript batem?
   - Response shape correto?

2. **Testar endpoints**
   ```bash
   curl http://localhost:3000/api/prompts
   curl http://localhost:3000/api/prompts/estrutura-ebook-ficcao
   curl http://localhost:3000/api/prompts/categories
   ```

3. **Testar fluxo completo**
   - Listar → Filtrar → Abrir → Selecionar modelo → Copiar
   - Verificar analytics no banco

---

## 📞 Problemas?

Se encontrar problemas:

1. **Limpar cache Next.js**
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Reinstalar dependências**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Verificar Node version**
   ```bash
   node -v  # Deve ser 18+
   ```

---

**Happy Testing! 🧪**
