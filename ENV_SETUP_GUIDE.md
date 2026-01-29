# 🔐 Guia de Configuração do .env

**Projeto:** ebook-landing-final
**Última atualização:** 2026-01-28

---

## 📋 Variáveis Obrigatórias

### 1. DATABASE_URL (Obrigatória)

**O que é:** String de conexão com banco de dados PostgreSQL
**Usado em:** Prisma ORM, todas as operações de banco
**Formato:**
```bash
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

**Como obter (Neon - Recomendado):**

1. Acesse [neon.tech](https://neon.tech)
2. Crie uma conta grátis
3. Crie um novo projeto
4. Copie a connection string que aparece
5. Cole no `.env`

**Exemplo real:**
```bash
DATABASE_URL="postgresql://neondb_owner:AbC123XyZ@ep-cool-bush-123456.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

**Status atual:** ✅ Configurado (verificar se está ativo)

---

### 2. MERCADO_PAGO_ACCESS_TOKEN (Obrigatória)

**O que é:** Token de acesso para processar pagamentos
**Usado em:** `/api/checkout`, `/api/webhooks/mercadopago`
**Formato:**
```bash
MERCADO_PAGO_ACCESS_TOKEN="TEST-1234567890-123456-abcdefghijklmnopqrstuvwxyz-123456789"
```

**Como obter:**

1. Acesse [mercadopago.com.br/developers](https://www.mercadopago.com.br/developers/panel)
2. Entre na sua conta
3. Vá em "Suas integrações" → "Credenciais"
4. **Modo Teste:** Copie o "Access Token de teste"
5. **Modo Produção:** Copie o "Access Token de produção"

**Importante:**
- Use `TEST-*` para desenvolvimento
- Use token de produção apenas quando estiver pronto para vender

**Status atual:** ✅ Configurado (modo TEST)

---

### 3. MERCADO_PAGO_PUBLIC_KEY (Obrigatória - Frontend)

**O que é:** Chave pública para inicializar SDK no frontend
**Usado em:** Futuro componente de checkout frontend
**Formato:**
```bash
MERCADO_PAGO_PUBLIC_KEY="TEST-12345678-1234-1234-1234-123456789012"
```

**Como obter:**
- Mesmo local do Access Token (item 2)
- Na seção "Credenciais", copie a "Public Key de teste"

**Status atual:** ⚠️ Verificar se está configurado

---

### 4. RESEND_API_KEY (Obrigatória)

**O que é:** API Key para enviar emails transacionais
**Usado em:** Confirmação de compra, notificações
**Formato:**
```bash
RESEND_API_KEY="re_123456789_AbCdEfGhIjKlMnOpQrStUvWxYz"
```

**Como obter:**

1. Acesse [resend.com](https://resend.com)
2. Crie uma conta (grátis até 3.000 emails/mês)
3. Vá em "API Keys" no dashboard
4. Crie uma nova API Key
5. Copie e cole no `.env`

**Importante:**
- Verifique domínio antes de enviar emails de produção
- Em desenvolvimento, use `onboarding@resend.dev`

**Status atual:** ⚠️ Verificar se está configurado

---

### 5. EMAIL_FROM (Obrigatória)

**O que é:** Email remetente dos emails transacionais
**Usado em:** Header "From" dos emails
**Formato:**
```bash
EMAIL_FROM="noreply@seudominio.com"
```

**Opções:**

**Desenvolvimento:**
```bash
EMAIL_FROM="onboarding@resend.dev"
```

**Produção (com domínio verificado):**
```bash
EMAIL_FROM="contato@bispo.ia"
# ou
EMAIL_FROM="noreply@seudominio.com.br"
```

**Status atual:** ⚠️ Verificar configuração

---

### 6. NEXT_PUBLIC_BASE_URL (Obrigatória)

**O que é:** URL base da aplicação (pública)
**Usado em:** Links em emails, metadata, redirects
**Formato:**
```bash
NEXT_PUBLIC_BASE_URL="https://seusite.com"
```

**Configuração por ambiente:**

**Local:**
```bash
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

**Preview (Vercel):**
```bash
NEXT_PUBLIC_BASE_URL="https://ebook-landing-final-git-master-pablobispo.vercel.app"
```

**Produção:**
```bash
NEXT_PUBLIC_BASE_URL="https://bispo.ia"
```

**Status atual:** ✅ Configurado (verificar URL)

---

## 📋 Variáveis Opcionais

### 7. NODE_ENV (Opcional - Auto-configurada)

**O que é:** Ambiente de execução
**Usado em:** Logs do Prisma, condicionais de código
**Formato:**
```bash
NODE_ENV="development"  # ou "production"
```

**Importante:**
- Vercel configura automaticamente
- Localmente, Next.js define como "development"

**Status atual:** ✅ Auto-configurado

---

### 8. NEXT_PUBLIC_VERCEL_ANALYTICS_ID (Opcional)

**O que é:** ID do Vercel Analytics
**Usado em:** Tracking de visitas e performance
**Formato:**
```bash
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="prj_xxxxxxxxxxxxxxxxxxxxxxxx"
```

**Como obter:**
- Ativado automaticamente ao fazer deploy no Vercel
- Não precisa configurar manualmente

**Status atual:** ✅ Auto-configurado no Vercel

---

## 🛠️ Checklist de Setup

### Desenvolvimento Local

```bash
# 1. Copiar o arquivo de exemplo
cp .env.example .env

# 2. Editar o .env com suas credenciais
nano .env  # ou vim, code, etc

# 3. Verificar se todas as variáveis estão preenchidas
grep "your_" .env  # Não deve retornar nada

# 4. Gerar o Prisma Client
npm run postinstall

# 5. Testar o servidor
npm run dev
```

### Produção (Vercel)

1. **Dashboard do Vercel:**
   - Settings → Environment Variables
   - Adicionar todas as variáveis obrigatórias
   - Selecionar ambientes: Production, Preview, Development

2. **Variáveis para adicionar:**
   ```
   DATABASE_URL              → Production + Preview
   MERCADO_PAGO_ACCESS_TOKEN → Production (token real) / Preview (TEST)
   MERCADO_PAGO_PUBLIC_KEY   → Production + Preview
   RESEND_API_KEY            → Production + Preview
   EMAIL_FROM                → Production + Preview
   NEXT_PUBLIC_BASE_URL      → Production (seu domínio)
   ```

3. **Redeploy:**
   - Após adicionar variáveis, fazer redeploy
   - Deployments → ... → Redeploy

---

## ⚠️ Segurança

### Variáveis Secretas (Nunca expor)
- ❌ `DATABASE_URL`
- ❌ `MERCADO_PAGO_ACCESS_TOKEN`
- ❌ `RESEND_API_KEY`

### Variáveis Públicas (Podem ser expostas)
- ✅ `NEXT_PUBLIC_BASE_URL`
- ✅ `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`
- ✅ `MERCADO_PAGO_PUBLIC_KEY` (Public Key é segura)

### Boas Práticas
1. ✅ **Nunca commitar `.env`** no Git
2. ✅ **Usar `.env.example`** como template
3. ✅ **Rodar `prisma generate`** após mudar DATABASE_URL
4. ✅ **Usar tokens TEST** em desenvolvimento
5. ✅ **Rotacionar tokens** periodicamente em produção

---

## 🔍 Validação

### Script de Teste

Crie um arquivo `scripts/check-env.js`:

```javascript
const required = [
  'DATABASE_URL',
  'MERCADO_PAGO_ACCESS_TOKEN',
  'MERCADO_PAGO_PUBLIC_KEY',
  'RESEND_API_KEY',
  'EMAIL_FROM',
  'NEXT_PUBLIC_BASE_URL',
]

const missing = required.filter(key => !process.env[key])

if (missing.length > 0) {
  console.error('❌ Missing environment variables:')
  missing.forEach(key => console.error(`   - ${key}`))
  process.exit(1)
}

console.log('✅ All required environment variables are set!')
```

Execute:
```bash
node scripts/check-env.js
```

---

## 📞 Suporte

**Problemas com:**
- **Neon/PostgreSQL:** [neon.tech/docs](https://neon.tech/docs)
- **Mercado Pago:** [mercadopago.com.br/developers](https://www.mercadopago.com.br/developers/pt/support)
- **Resend:** [resend.com/docs](https://resend.com/docs)
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)

**Email:** pablofernando@live.com

---

## 📝 Exemplo Completo (.env)

```bash
# ============================================
# DATABASE
# ============================================
DATABASE_URL="postgresql://neondb_owner:AbC123@ep-cool-bush-123456.us-east-1.aws.neon.tech/neondb?sslmode=require"

# ============================================
# MERCADO PAGO
# ============================================
# IMPORTANTE: Use TEST tokens em desenvolvimento
MERCADO_PAGO_ACCESS_TOKEN="TEST-1234567890-123456-abcdefghijklmnopqrstuvwxyz-123456789"
MERCADO_PAGO_PUBLIC_KEY="TEST-12345678-1234-1234-1234-123456789012"

# ============================================
# EMAIL (RESEND)
# ============================================
RESEND_API_KEY="re_123456789_AbCdEfGhIjKlMnOpQrStUvWxYz"
EMAIL_FROM="onboarding@resend.dev"  # Desenvolvimento
# EMAIL_FROM="contato@bispo.ia"      # Produção

# ============================================
# APPLICATION
# ============================================
NEXT_PUBLIC_BASE_URL="http://localhost:3000"  # Local
# NEXT_PUBLIC_BASE_URL="https://bispo.ia"     # Produção
NODE_ENV="development"

# ============================================
# ANALYTICS (OPCIONAL)
# ============================================
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=""  # Auto-configurado no Vercel
```

---

**Última atualização:** 2026-01-28
**Versão:** 1.0
