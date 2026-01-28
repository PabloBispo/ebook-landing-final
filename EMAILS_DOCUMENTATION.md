# 📧 Sistema de Emails - Documentação

## Overview

Sistema completo de envio de emails usando **Resend** para comunicação com leads e clientes.

## 🔑 Configuração

### Variáveis de Ambiente

```env
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="onboarding@resend.dev"
```

### Setup Resend

1. Crie conta em [resend.com](https://resend.com)
2. Gere API Key no dashboard
3. Configure domínio verificado (opcional mas recomendado)
4. Adicione as credenciais no `.env`

## 📬 Templates de Email

### 1. Lead Welcome Email
**Enviado quando**: Usuário se cadastra na lista de leads

**Template**: `emailTemplates.leadWelcome`

**Conteúdo**:
- Mensagem de boas-vindas
- O que vai aprender na masterclass
- 3 benefícios principais com ícones
- CTA para checkout
- Lista de bônus (4 itens com valores)
- Social proof

**Variáveis**:
- `name` - Nome do lead

**Exemplo**:
```typescript
await resend.emails.send({
  from: EMAIL_FROM,
  to: 'user@example.com',
  subject: emailTemplates.leadWelcome.subject,
  html: emailTemplates.leadWelcome.getHtml('João Silva'),
})
```

---

### 2. Purchase Confirmed Email
**Enviado quando**: Pagamento é aprovado pelo Mercado Pago

**Template**: `emailTemplates.purchaseConfirmed`

**Conteúdo**:
- Ícone de sucesso grande ✅
- Confirmação de pagamento
- Nome do produto adquirido
- Próximos passos (4 etapas)
- CTA para área de membros
- Lista de bônus inclusos
- Bônus surpresa (Workshop Landing Pages)

**Variáveis**:
- `name` - Nome do cliente
- `productName` - Nome do produto comprado

**Exemplo**:
```typescript
await resend.emails.send({
  from: EMAIL_FROM,
  to: 'user@example.com',
  subject: emailTemplates.purchaseConfirmed.subject,
  html: emailTemplates.purchaseConfirmed.getHtml(
    'João Silva',
    'Masterclass: Ebooks com IA'
  ),
})
```

---

### 3. Purchase Pending Email
**Enviado quando**: Pagamento está em análise

**Template**: `emailTemplates.purchasePending`

**Conteúdo**:
- Mensagem de aguarde
- Explicação dos tempos por método de pagamento:
  - PIX: Alguns minutos
  - Cartão: Até 24h
  - Boleto: Até 2 dias úteis
- O que acontece após confirmação

**Variáveis**:
- `name` - Nome do cliente

**Exemplo**:
```typescript
await resend.emails.send({
  from: EMAIL_FROM,
  to: 'user@example.com',
  subject: emailTemplates.purchasePending.subject,
  html: emailTemplates.purchasePending.getHtml('João Silva'),
})
```

---

### 4. Admin Notification Email
**Enviado quando**: Nova compra é realizada (para o admin)

**Template**: `emailTemplates.adminNotification`

**Conteúdo**:
- Notificação de nova compra
- Dados do cliente:
  - Nome
  - Email
  - Produto
  - Valor
  - Purchase ID
  - Data/Hora

**Variáveis**:
- `userName` - Nome do cliente
- `userEmail` - Email do cliente
- `productName` - Produto comprado
- `amount` - Valor pago
- `purchaseId` - ID da compra

**Exemplo**:
```typescript
await resend.emails.send({
  from: EMAIL_FROM,
  to: SUPPORT_EMAIL,
  subject: emailTemplates.adminNotification.subject,
  html: emailTemplates.adminNotification.getHtml(
    'João Silva',
    'joao@example.com',
    'Masterclass: Ebooks com IA',
    247.00,
    'purchase_123'
  ),
})
```

---

## 🔄 Fluxos de Email

### Fluxo 1: Lead Capture
```
User cadastra email na landing page
    ↓
POST /api/leads
    ↓
Lead salvo no banco
    ↓
📧 Welcome Email enviado (async)
    ↓
Response 201 OK
```

### Fluxo 2: Compra Aprovada
```
User completa pagamento no Mercado Pago
    ↓
Mercado Pago envia webhook
    ↓
POST /api/webhooks/mercadopago
    ↓
Purchase atualizado (status: approved)
    ↓
📧 Purchase Confirmed Email → Cliente
📧 Admin Notification Email → Admin
    ↓
Response 200 OK
```

### Fluxo 3: Pagamento Pendente
```
User inicia pagamento (PIX, Boleto)
    ↓
Mercado Pago envia webhook (status: pending)
    ↓
POST /api/webhooks/mercadopago
    ↓
Purchase atualizado (status: pending)
    ↓
📧 Purchase Pending Email → Cliente
    ↓
Response 200 OK
```

---

## 🎨 Design dos Emails

### Estrutura HTML
Todos os emails seguem a mesma estrutura:

```html
<html>
  <head>
    <style>
      /* Inline CSS */
      - Font: System fonts
      - Max-width: 600px
      - Responsive
      - Gradientes modernos
    </style>
  </head>
  <body>
    <div class="header">
      <!-- Gradiente colorido -->
      <!-- Título e subtítulo -->
    </div>
    <div class="content">
      <!-- Conteúdo principal -->
      <!-- CTAs -->
      <!-- Listas -->
    </div>
    <div class="footer">
      <!-- Suporte -->
      <!-- Links -->
    </div>
  </body>
</html>
```

### Cores
- **Welcome**: Gradiente Cyan (`#0ea5e9` → `#06b6d4`)
- **Confirmed**: Gradiente Green (`#10b981` → `#059669`)
- **Pending**: Gradiente Orange (`#f59e0b` → `#d97706`)
- **Admin**: Blue (`#0ea5e9`)

### Ícones
- ✅ CheckCircle - Confirmação
- 💎 Diamond - Bônus premium
- 📋 Clipboard - Checklist
- 🎨 Palette - Templates
- 📘 Book - Playbook
- ⏳ Hourglass - Pendente
- 🎉 Party - Celebração
- 🚀 Rocket - Começar

---

## 🧪 Testes

### Endpoint de Teste
```bash
# Testar envio de email
curl http://localhost:3000/api/test-email
```

### Resposta Sucesso
```json
{
  "success": true,
  "message": "Email enviado com sucesso!",
  "emailId": "c3382287-b67b-4067-9657-49d8bf1c545f"
}
```

### Teste Manual via API

#### Testar Lead Welcome
```typescript
import { resend, EMAIL_FROM, emailTemplates } from '@/lib/resend'

await resend.emails.send({
  from: EMAIL_FROM,
  to: 'seu-email@example.com',
  subject: emailTemplates.leadWelcome.subject,
  html: emailTemplates.leadWelcome.getHtml('Seu Nome'),
})
```

---

## 🔐 Segurança

### Rate Limiting
- Resend tem rate limit: **2 emails/segundo** (free tier)
- Implementado retry logic automático
- Emails enviados de forma assíncrona (não bloqueante)

### Validação
- Email validado com Zod antes de envio
- Sanitização de email (lowercase, trim)
- Validação de domínio

### Error Handling
```typescript
// Email não deve bloquear fluxo principal
resend.emails.send({...}).catch((error) => {
  console.error('Error sending email:', error)
  // Log mas não falha a requisição
})
```

---

## 📊 Tracking

### Resend Dashboard
- Ver emails enviados
- Taxa de entrega
- Bounces
- Opens (se configurado)
- Clicks (se configurado)

### Logs Internos
```typescript
console.log('Email sent:', {
  to: user.email,
  template: 'purchaseConfirmed',
  purchaseId: purchase.id
})
```

---

## 🚀 Melhorias Futuras

### Curto Prazo
- [ ] Templates em React (React Email)
- [ ] Preview de emails no browser
- [ ] Testes automatizados de templates
- [ ] Variáveis de personalização dinâmicas

### Médio Prazo
- [ ] Sequências de emails (drip campaigns)
- [ ] Segmentação de leads
- [ ] A/B testing de subject lines
- [ ] Tracking de conversões

### Longo Prazo
- [ ] Email marketing automation
- [ ] Personalização com IA
- [ ] Dynamic content blocks
- [ ] Multi-idioma

---

## 📝 Boas Práticas

### Do's ✅
- Use emails transacionais para ações críticas
- Sempre tenha fallback (log error, não falhe request)
- Personalize com nome do usuário
- Inclua CTA claro
- Mobile-first design
- Teste em múltiplos clients (Gmail, Outlook, etc)

### Don'ts ❌
- Nunca envie emails em loop
- Não bloqueie requisições esperando email
- Não exponha dados sensíveis nos emails
- Evite imagens externas (use inline ou data URLs)
- Não abuse do rate limit

---

## 🆘 Troubleshooting

### Email não chegou
1. Verifique RESEND_API_KEY no .env
2. Confira logs do servidor
3. Verifique spam folder
4. Confirme domínio verificado no Resend
5. Verifique rate limit

### Email com formatação quebrada
1. Teste inline CSS
2. Valide HTML
3. Teste em email client simulator
4. Verifique encoding (UTF-8)

### Rate limit exceeded
1. Aguarde 1 segundo entre envios
2. Implemente fila de emails
3. Considere upgrade do Resend plan
4. Use batch sending quando possível

---

## 📞 Suporte

**Email de suporte**: pablofernando@live.com

**Resend Docs**: https://resend.com/docs
**Resend Status**: https://status.resend.com

---

**Última atualização**: 28 de Janeiro de 2026
**Versão**: 1.0.0
