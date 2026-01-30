# Task #30 - Checklist de Testes Manuais

**URL de Teste:** http://localhost:3000/prompts/criar-avatar-profundo

---

## ✅ Checklist de Testes

### 1. Renderização Inicial
- [ ] Página carrega sem erros
- [ ] Form de placeholders aparece
- [ ] Preview aparece abaixo do form
- [ ] Dois campos renderizados: "nicho" e "dados_existentes"
- [ ] Campo "nicho" tem asterisco vermelho (obrigatório)
- [ ] Campo "dados_existentes" é textarea
- [ ] Auto-focus no primeiro campo (nicho)

### 2. Validação de Campos
- [ ] Digitar em "nicho" e sair (blur) sem preencher → erro aparece
- [ ] Preencher "nicho" → erro desaparece
- [ ] Campo "dados_existentes" opcional → sem erro se vazio
- [ ] Contador de caracteres aparece (se maxLength definido)

### 3. Preview em Tempo Real
- [ ] Preview mostra template inicial com placeholders vazios em vermelho
- [ ] Digitar "nicho" → preview atualiza em tempo real
- [ ] Placeholder {{nicho}} substitui para texto digitado
- [ ] Placeholder vazio continua vermelho
- [ ] Indicador "Campos pendentes" aparece se houver vazios

### 4. Copy Button
- [ ] Clicar "Copiar" sem preencher "nicho" → erro aparece
- [ ] Mensagem de erro específica: "Seu nicho ou mercado é obrigatório"
- [ ] Preencher "nicho" e clicar "Copiar" → sucesso
- [ ] Texto copiado contém valores preenchidos (não template)
- [ ] Feedback visual "Copiado!" aparece
- [ ] Analytics tracking funciona (verificar em /api/prompts/criar-avatar-profundo/copy)

### 5. Responsividade
- [ ] Mobile (< 768px): Form em 1 coluna
- [ ] Desktop (>= 768px): Form em 2 colunas
- [ ] Textarea sempre full-width
- [ ] Preview responsivo (sem overflow horizontal)

### 6. Tab Navigation
- [ ] Tab do campo "nicho" vai para "dados_existentes"
- [ ] Tab funciona em ordem lógica
- [ ] Enter no último campo não submita form (sem botão submit)

### 7. Edge Cases
- [ ] Prompt sem placeholders (testar outro prompt) → mostra PromptContent original
- [ ] Valores muito longos → scroll horizontal no preview
- [ ] Copiar múltiplas vezes → analytics incrementa

### 8. Dark Mode
- [ ] Preview legível em dark mode
- [ ] Erros visíveis em dark mode
- [ ] Campos com contraste adequado

---

## 🐛 Bugs Encontrados

*(Preencher se encontrar algum problema)*

---

## 📸 Screenshots Recomendados

1. Form com campos vazios
2. Form com validação de erro
3. Preview com placeholders vazios (vermelho)
4. Preview com placeholders preenchidos
5. Copy button com erro
6. Copy button com sucesso
7. Mobile layout
8. Desktop layout

---

## 🔍 Verificações Técnicas

### Console do Browser
- [ ] Sem erros no console
- [ ] Sem warnings relevantes
- [ ] React DevTools mostra componentes corretos

### Network
- [ ] POST para /api/prompts/criar-avatar-profundo/copy funciona
- [ ] Response 200 OK
- [ ] copyCount incrementa

### Performance
- [ ] Preview atualiza sem lag
- [ ] Form responde instantaneamente
- [ ] Sem re-renders desnecessários

---

## 📝 Observações

*(Notas durante o teste)*
