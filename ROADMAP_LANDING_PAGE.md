# Roadmap - Landing Page ebook-ia

> Mapeamento completo das tasks para alinhar a landing page com o documento de contexto `CONTEXTO_LANDING_PAGE.md`

---

## 📊 Estado Atual vs. Estado Desejado

### Análise Geral

| Aspecto | Estado Atual | Estado Desejado | Gap |
|---------|-------------|-----------------|-----|
| **Identidade** | "Ebooks com IA - Masterclass" | "@bispo.ia - O Engenheiro que Traduz" | ⚠️ Alto |
| **Tom de Comunicação** | Genérico/marketeiro | Direto, honesto, sem guru | ⚠️ Alto |
| **Promessa Principal** | "Crie ebooks em 3-5 dias" | "Tirar isso aí do papel" | ⚠️ Médio |
| **Estrutura da Página** | 8 seções básicas | 8 seções específicas do manifesto | ⚠️ Médio |
| **Perfis de Aluno** | Não existe | 3 perfis (A, B, C) | 🔴 Crítico |
| **Casos/Números Reais** | Genérico "500+ alunos" | Marina, Ricardo, Juliana (com valores) | 🔴 Crítico |
| **Diferenciais** | Genéricos | Anti-Robô, 3 Perfis, 70% No-Code | ⚠️ Alto |
| **Escassez/Urgência** | "Oferta por tempo limitado" | Sem escassez artificial | ⚠️ Alto |

---

## 🎯 Seção 1: HERO

### Estado Atual
```
- Badge: "Masterclass Exclusiva"
- Título: "Crie Ebooks Profissionais com IA em 3-5 Dias"
- Subtítulo: "Aprenda a transformar seu conhecimento em ebooks de alta qualidade..."
- Trust indicators: Sem experiência prévia, Método validado, Resultados em dias
- Social proof: "500+ pessoas já criaram seus ebooks"
```

### Copy Corrigido (Estado Desejado)

**Badge:**
```
@bispo.ia
```

**Título Principal:**
```
Você sabe o que a IA consegue fazer.
Mas ainda não conseguiu fazer nada útil com ela.
```

**Subtítulo:**
```
Vamos te ajudar a tirar isso aí do papel.
O ebook que você quer criar. O curso que nunca saiu do rascunho.
Sem promessa de ficar rico. Com um método que funciona.
```

**Trust Indicators:**
```
✓ 70% não precisa programar
✓ 3 caminhos diferentes para 3 situações diferentes
✓ Casos reais com números reais
```

**Social Proof:**
```
R$ 14.006 (Marina, 3 meses) • R$ 43.000 (Juliana, 6 meses) • R$ 8.400 sem audiência prévia (Ricardo)
```

### Task 1.1: Atualizar Hero
- [ ] Trocar badge de "Masterclass Exclusiva" para "@bispo.ia"
- [ ] Atualizar título para linguagem do manifesto
- [ ] Reescrever subtítulo com tom direto e honesto
- [ ] Trocar trust indicators genéricos por diferenciais reais
- [ ] Substituir "500+ alunos" por casos documentados com valores

---

## 🎯 Seção 2: PROBLEMA (Nova Seção)

### Estado Atual
**Não existe.** Pulamos direto para benefícios.

### Copy Necessário (Estado Desejado)

**Título:**
```
A frustração não é não conhecer as ferramentas.
```

**Subtítulo:**
```
A frustração é não conseguir fazer nada útil com elas.
```

**Conteúdo:**
```
Você já viu o que a IA consegue fazer:
- Vídeos que viralizam
- Textos que parecem escritos por humanos
- Imagens que impressionam
- Código que funciona de primeira

Instalou os apps. Testou as ferramentas. Assistiu os tutoriais.

E mesmo assim... nada disso teve impacto real na sua vida.

O ebook continua parado.
O curso nunca saiu do papel.
A renda extra ficou na promessa.

Você não precisa de mais uma ferramenta.
Você precisa de um método que funciona.
```

### Task 2.1: Criar Seção de Problema
- [ ] Criar componente `problem-section.tsx`
- [ ] Implementar layout de impacto visual
- [ ] Usar copy do manifesto sobre frustração
- [ ] Posicionar entre Hero e Solução

---

## 🎯 Seção 3: SOLUÇÃO (Atualizar Value Proposition)

### Estado Atual
```
6 cards genéricos:
- Resultados Rápidos
- Foco e Clareza
- Escalável
- Garantia Total
- Acesso Vitalício
- Suporte Premium
```

### Copy Corrigido (Estado Desejado)

**Título:**
```
Instrumento, não fim.
```

**Subtítulo:**
```
IA é martelo, não quadro na parede. É o que você faz com ela que importa.
```

**Cards dos Diferenciais:**

| Card | Título | Descrição |
|------|--------|-----------|
| 1 | **Anti-Robô** | Ensina a usar IA sem parecer genérico. Voz autoral, não template. Conteúdo que ressoa, não que entedia. |
| 2 | **3 Perfis Diferentes** | Não é one-size-fits-all. Criador Orgânico (A), Explorador de Nicho (B), ou Prestador de Serviço (C). Seu caminho, seu ritmo. |
| 3 | **70% No-Code** | A maioria não precisa programar. ChatGPT + Canva resolvem. Mostramos quando cada ferramenta faz sentido. |
| 4 | **Casos Reais** | Números reais, não promessas vagas. Marina fez R$ 14.006. Juliana fez R$ 43.000. Ricardo fez R$ 8.400 sem audiência. |
| 5 | **Templates Preenchíveis** | Não é teoria. É ferramenta pra usar hoje. Avatar 4 Camadas, Checklist de 40 pontos, Prompts testados. |
| 6 | **Utilidade > Espetáculo** | Edição bonita é legal por 15 segundos. Resolver problema real muda sua vida. Foco no que importa. |

### Task 3.1: Atualizar Diferenciais
- [ ] Renomear seção para "Diferenciais" ou "Por que é diferente"
- [ ] Reescrever os 6 cards com linguagem do manifesto
- [ ] Adicionar ícones que representem cada diferencial
- [ ] Incluir números reais quando aplicável

---

## 🎯 Seção 4: PERFIS DE ALUNO (Nova Seção)

### Estado Atual
**Não existe.**

### Copy Necessário (Estado Desejado)

**Título:**
```
Qual é o seu caminho?
```

**Subtítulo:**
```
Não existe fórmula única. Existe o que funciona pra você.
```

**Os 3 Perfis:**

### Perfil A - Criador Orgânico
```
Quem é: Já tem conteúdo (vídeos, posts, lives, podcasts)
Situação: Quer transformar esse conteúdo em ebook
Foco no curso: Decupagem + diferenciação
Exemplo real: Marina - R$ 14.006 em 3 meses

"Você já tem o ouro. Só precisa lapidá-lo."
```

### Perfil B - Explorador de Nicho
```
Quem é: Não tem conteúdo prévio
Situação: Quer pesquisar e criar do zero
Foco no curso: Validação + pesquisa + criação
Exemplo real: Ricardo - R$ 8.400 em 3 meses (sem audiência prévia)

"Começar do zero não é desvantagem. É liberdade."
```

### Perfil C - Prestador de Serviço
```
Quem é: Quer oferecer criação de ebooks como serviço
Situação: Trabalha para clientes
Foco no curso: Processo + ferramentas + precificação
Exemplo real: Juliana - R$ 43.000 (18 clientes em 6 meses)

"Transforme uma habilidade em um negócio."
```

### "Para quem NÃO é"
```
- Quem procura enriquecimento rápido
- Quem não quer colocar a mão na massa
- Quem espera que a IA faça tudo sozinha
- Quem quer apenas impressionar, não resolver
```

### Task 4.1: Criar Seção de Perfis
- [ ] Criar componente `profiles-section.tsx`
- [ ] Implementar 3 cards com os perfis A, B, C
- [ ] Adicionar seção "Para quem NÃO é"
- [ ] Incluir casos reais em cada perfil
- [ ] Adicionar CTA contextual por perfil

---

## 🎯 Seção 5: CONTEÚDO DO CURSO (Nova Seção)

### Estado Atual
**Não existe.** Só temos lista de benefícios genéricos.

### Copy Necessário (Estado Desejado)

**Título:**
```
12 capítulos. 1 módulo. Tudo que você precisa para começar.
```

**Subtítulo:**
```
Módulo 1: Fundamentos Estratégicos
```

**Tabela de Capítulos:**

| # | Capítulo | O que resolve | Entregável |
|---|----------|---------------|------------|
| 01 | "Todo mundo ganha dinheiro com IA", menos você | Por que a maioria falha | Clareza sobre os 3 pilares |
| 02 | Você Não Precisa Criar do Zero | Escolher seu caminho | Perfil definido (A, B ou C) |
| 03 | Tipos de Ebook e Funil | Decidir qual tipo criar | Tipo escolhido + posição no funil |
| 04 | Princípios Anti-Robô | Criar sem parecer genérico | Framework de voz autoral |
| 05 | Trilha No-Code vs Code | Montar sua stack | Lista de ferramentas + custos |
| 06 | Validação de Nicho | Confirmar demanda | Nicho validado com dados |
| 07 | Avatar Profundo | Saber pra quem escreve | Avatar 4 Camadas preenchido |
| 08 | Promessa e Mecanismo Único | Criar diferenciação | Promessa + mecanismo documentados |
| 09 | Checklist de Validação | Verificar prontidão | Score de prontidão (0-40) |
| 10 | Roadmap Pessoal | Planejar próximos passos | Cronograma personalizado |
| E1 | Setup Hotmart/Kiwify | Configurar plataforma | Produto criado e pronto |
| E2 | Landing Pages v0/Lovable | Criar página de vendas | Landing page funcional |

**Jornada Visual:**
```
[01-02] Mentalidade → [03-05] Decisões → [06-08] Validação → [09-10] Prontidão → [E1-E2] Setup
         ↓                    ↓                  ↓                  ↓                ↓
    "Por que?"           "O quê?"           "Pra quem?"         "Posso ir?"      "Onde vendo?"
```

### Task 5.1: Criar Seção de Módulos
- [ ] Criar componente `modules-section.tsx`
- [ ] Implementar tabela dos 12 capítulos
- [ ] Adicionar visualização da jornada do aluno
- [ ] Destacar entregáveis de cada capítulo
- [ ] Incluir toggle para expandir detalhes

---

## 🎯 Seção 6: PROVA SOCIAL / CASOS (Atualizar)

### Estado Atual
```
Genérico: "500+ pessoas já criaram seus ebooks"
Sem nomes, sem números específicos, sem contexto
```

### Copy Corrigido (Estado Desejado)

**Título:**
```
Números reais. Pessoas reais. Resultados documentados.
```

**Subtítulo:**
```
Sem promessas vagas. Sem "potencial de ganhos". Só o que aconteceu de verdade.
```

**Casos Documentados:**

### Marina (Perfil A - Criador Orgânico)
```
Contexto: Tinha canal no YouTube com 15k inscritos
O que fez: Transformou vídeos em ebook de desenvolvimento pessoal
Resultado: R$ 14.006 em 3 meses
Tempo até primeiro ebook: 5 dias
```

### Ricardo (Perfil B - Explorador de Nicho)
```
Contexto: Sem audiência prévia, começou do zero
O que fez: Pesquisou nicho de produtividade para devs
Resultado: R$ 8.400 em 3 meses
Tempo até primeiro ebook: 8 dias
```

### Juliana (Perfil C - Prestadora de Serviço)
```
Contexto: Queria renda extra como freelancer
O que fez: Oferece criação de ebooks como serviço
Resultado: R$ 43.000 (18 clientes em 6 meses)
Ticket médio: R$ 2.388 por cliente
```

### Laura (No-Code)
```
Contexto: Não sabia programar
O que fez: Usou só ChatGPT + Canva
Resultado: R$ 6.240 em 60 dias
Ferramentas: 100% no-code
```

### Thiago (Automação)
```
Contexto: Dev que automatizou o processo
O que fez: Criou sistema de produção em escala
Resultado: R$ 18-21k/mês recorrente
Modelo: SaaS + serviço
```

### Task 6.1: Criar/Atualizar Seção de Casos
- [ ] Criar componente `testimonials-section.tsx`
- [ ] Implementar cards com casos reais
- [ ] Adicionar contexto de cada pessoa
- [ ] Mostrar timeline (tempo até resultado)
- [ ] Conectar cada caso com um perfil (A, B, C)

---

## 🎯 Seção 7: CTA / CHECKOUT (Atualizar)

### Estado Atual
```
- Badge: "Oferta por tempo limitado" (escassez artificial ❌)
- Countdown implícito
- Linguagem de urgência forçada
```

### Copy Corrigido (Estado Desejado)

**Remover:**
- "Oferta por tempo limitado"
- Qualquer indicador de escassez artificial
- Countdown

**Título:**
```
Pronto para tirar isso aí do papel?
```

**Subtítulo:**
```
Pagamento único. Acesso vitalício. Garantia de 7 dias.
Se não fizer sentido pra você, devolvemos tudo.
```

**Preço:**
```
R$ 247
ou 12x de R$ 20,58

Sem truque. Esse é o preço.
```

**Botão:**
```
Quero Começar Agora
```

**Garantia:**
```
7 dias para testar todo o conteúdo.
Não gostou? Devolvemos 100%. Sem perguntas.
Não fingimos que nunca vamos vender.
Mas vendemos quando faz sentido.
```

### Task 7.1: Atualizar Seção de Checkout
- [ ] Remover badge de escassez artificial
- [ ] Reescrever título e subtítulo
- [ ] Simplificar apresentação do preço
- [ ] Atualizar texto do botão
- [ ] Reescrever garantia com tom honesto

---

## 🎯 Seção 8: FAQ (Atualizar)

### Estado Atual
10 perguntas genéricas de FAQ de curso online.

### Perguntas a Manter/Atualizar

1. **"Preciso saber programar?"**
```
Não. 70% do curso é no-code. ChatGPT + Canva resolvem a maioria dos casos.
Se você sabe usar Google Docs, você consegue criar ebooks com IA.
Mostramos quando vale a pena usar código - e quando não vale.
```

2. **"Funciona para qualquer nicho?"**
```
Depende. O método funciona, mas nem todo nicho tem demanda.
Por isso o Capítulo 6 é dedicado a validação de nicho.
Você vai descobrir se seu nicho tem potencial antes de criar.
```

3. **"E se eu já tenho conteúdo?"**
```
Melhor ainda. Você é Perfil A (Criador Orgânico).
Vídeos, posts, lives, podcasts - tudo pode virar ebook.
A Marina transformou vídeos do YouTube em R$ 14.006.
```

4. **"E se eu não tenho nada criado?"**
```
Sem problema. Você é Perfil B (Explorador de Nicho).
O Ricardo começou do zero e fez R$ 8.400 em 3 meses.
O curso ensina a pesquisar e criar do zero.
```

5. **"Posso oferecer como serviço?"**
```
Sim. Esse é o Perfil C (Prestador de Serviço).
A Juliana fez R$ 43.000 com 18 clientes em 6 meses.
O curso inclui precificação e processos para clientes.
```

6. **"Quanto tempo leva para criar um ebook?"**
```
Depende do seu perfil:
- Perfil A (com conteúdo): 3-5 dias
- Perfil B (do zero): 5-10 dias
- Perfil C (para cliente): varia com o projeto
```

7. **"A garantia é real?"**
```
Sim. 7 dias para testar todo o conteúdo.
Não gostou? Devolvemos 100%. Sem perguntas, sem burocracia.
Não fazemos escassez artificial. Não fingimos que nunca vamos vender.
```

8. **"O conteúdo vai parecer feito por IA?"**
```
Não, se você seguir o método.
O Capítulo 4 (Princípios Anti-Robô) ensina exatamente isso.
Voz autoral, experiência real, opinião. Conteúdo que ressoa.
```

### Task 8.1: Atualizar FAQ
- [ ] Reescrever perguntas com contexto dos perfis
- [ ] Incluir casos reais nas respostas
- [ ] Remover linguagem de FAQ genérico de curso
- [ ] Adicionar tom direto e honesto

---

## 🎯 Seção 9: HEADER (Atualizar)

### Estado Atual
```
Logo: "Ebooks com IA - Masterclass"
Nav: Benefícios, Módulos, Depoimentos, FAQ
CTA: "Começar Agora"
```

### Estado Desejado

**Logo:**
```
@bispo.ia
"O Engenheiro que Traduz"
```

**Nav:**
```
O Problema | Perfis | Módulos | Casos | FAQ
```

**CTA:**
```
Quero Começar
```

### Task 9.1: Atualizar Header
- [ ] Trocar logo para "@bispo.ia"
- [ ] Adicionar tagline "O Engenheiro que Traduz"
- [ ] Atualizar links de navegação
- [ ] Simplificar CTA

---

## 🎯 Seção 10: FOOTER (Atualizar)

### Estado Atual
```
"Desenvolvido por Pablo Bispo"
"Powered by Claude Code"
Disclaimer da Hotmart
```

### Estado Desejado

**Assinatura:**
```
@bispo.ia
"Onde a inteligência artificial encontra a inteligência prática."
```

**Links:**
```
O Problema | Perfis | Módulos | Casos | FAQ | Termos | Privacidade
```

**Suporte:**
```
Dúvidas? pablofernando@live.com
Respondemos em até 24h úteis.
```

### Task 10.1: Atualizar Footer
- [ wprovar Trocar assinatura para "@bispo.ia"
- [ ] Adicionar assinatura do manifesto
- [ ] Atualizar links de navegação
- [ ] Manter disclaimer legal

---

## 📋 RESUMO DAS TASKS

### 🔴 Prioridade Alta (Crítico)

| ID | Task | Componente | Estimativa |
|----|------|------------|------------|
| 4.1 | Criar Seção de Perfis (A, B, C) | `profiles-section.tsx` | 2h |
| 6.1 | Criar Seção de Casos Reais | `testimonials-section.tsx` | 2h |
| 2.1 | Criar Seção de Problema | `problem-section.tsx` | 1h |
| 5.1 | Criar Seção de Módulos | `modules-section.tsx` | 2h |

### ⚠️ Prioridade Média (Importante)

| ID | Task | Componente | Estimativa |
|----|------|------------|------------|
| 1.1 | Atualizar Hero | `hero.tsx` | 1h |
| 3.1 | Atualizar Diferenciais | `value-proposition.tsx` | 1h |
| 7.1 | Atualizar Checkout | `cta-section.tsx` | 1h |
| 8.1 | Atualizar FAQ | `faq.tsx` | 1h |

### 🟢 Prioridade Baixa (Refinamento)

| ID | Task | Componente | Estimativa |
|----|------|------------|------------|
| 9.1 | Atualizar Header | `header.tsx` | 30min |
| 10.1 | Atualizar Footer | `footer.tsx` | 30min |

---

## 🗓️ ROADMAP SUGERIDO

### Fase 1: Estrutura (1 dia)
1. Criar `problem-section.tsx`
2. Criar `profiles-section.tsx`
3. Criar `modules-section.tsx`
4. Criar `testimonials-section.tsx`

### Fase 2: Copy (1 dia)
1. Atualizar Hero com copy do manifesto
2. Atualizar Value Proposition (Diferenciais)
3. Atualizar CTA Section (remover escassez)
4. Atualizar FAQ

### Fase 3: Refinamento (0.5 dia)
1. Atualizar Header
2. Atualizar Footer
3. Revisar tom geral
4. Testar responsividade

### Fase 4: Validação (0.5 dia)
1. Revisar contra documento de contexto
2. Verificar consistência de tom
3. Testar fluxo de conversão
4. Deploy final

---

## 📌 Notas Importantes

### Tom de Comunicação
- **Usar:** Direto, claro, honesto, estruturado
- **Evitar:** Guru, promessas exageradas, escassez artificial

### Palavras-Chave do Manifesto
- "Tirar isso aí do papel"
- "Utilidade acima de espetáculo"
- "Cavalo manco que anda"
- "Instrumento, não fim"
- "A frustração é não conseguir fazer nada útil"

### Números a Usar
- Marina: R$ 14.006 (3 meses)
- Ricardo: R$ 8.400 (3 meses, sem audiência)
- Juliana: R$ 43.000 (18 clientes, 6 meses)
- Laura: R$ 6.240 (60 dias, no-code)
- Thiago: R$ 18-21k/mês (recorrente)

---

*Documento criado em: 2026-01-28*
*Baseado em: CONTEXTO_LANDING_PAGE.md*
