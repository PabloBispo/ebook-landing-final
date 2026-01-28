# Ebook Landing Page - Versão Final 🚀

Landing page moderna e segura para venda de masterclass de criação de ebooks com IA, construída com Next.js 16, Prisma, e Mercado Pago.

## 🎯 Características

- ✅ **Next.js 16** com App Router e React Server Components
- ✅ **TypeScript** em modo strict para máxima segurança de tipos
- ✅ **Prisma ORM** com suporte para Neon/PlanetScale PostgreSQL
- ✅ **Mercado Pago** integração completa para pagamentos
- ✅ **Design System OKLCH** - cores modernas e acessíveis
- ✅ **Light Mode padrão** + Dark Mode opcional
- ✅ **Rate Limiting** em todas as APIs
- ✅ **Security Headers** configurados
- ✅ **Validação Zod** client e server-side
- ✅ **Vercel Analytics** e Speed Insights
- ✅ **Responsivo** e otimizado para mobile

## 📁 Estrutura do Projeto

```
ebook-landing-final/
├── app/
│   ├── api/
│   │   ├── leads/route.ts          # API de captura de leads
│   │   ├── checkout/route.ts       # API de checkout Mercado Pago
│   │   └── webhooks/
│   │       └── mercadopago/route.ts # Webhook de pagamentos
│   ├── layout.tsx                   # Layout raiz com providers
│   ├── page.tsx                     # Landing page principal
│   └── globals.css                  # Estilos globais + design system
│
├── components/
│   ├── ui/                          # Componentes UI reutilizáveis (shadcn)
│   ├── landing/                     # Componentes da landing page
│   ├── theme-provider.tsx           # Provider de temas
│   └── theme-switcher.tsx           # Switcher de tema minimalista
│
├── lib/
│   ├── prisma.ts                    # Cliente Prisma singleton
│   ├── utils.ts                     # Utilitários gerais
│   ├── validations.ts               # Schemas Zod
│   ├── rate-limit.ts                # Sistema de rate limiting
│   └── mercadopago.ts               # Configuração Mercado Pago
│
├── prisma/
│   └── schema.prisma                # Schema do banco de dados
│
├── middleware.ts                     # Middleware de segurança
├── next.config.ts                    # Configuração Next.js otimizada
└── .env.example                      # Exemplo de variáveis de ambiente
```

## 🚀 Como Rodar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

Preencha as variáveis necessárias.

### 3. Configurar Banco de Dados (Neon)

```bash
npx prisma generate
npx prisma db push
```

### 4. Iniciar Servidor

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🔐 Segurança

- Rate Limiting em todas as APIs
- Security Headers configurados
- Validação server-side com Zod
- TypeScript strict mode
- Sanitização de inputs

## 📊 Banco de Dados

Modelos implementados:
- **Lead** - Captura de emails
- **User** - Usuários compradores
- **Purchase** - Compras realizadas
- **WebhookEvent** - Logs de webhooks
- **PageView** - Analytics de visualizações

## 💳 Mercado Pago

Integração completa com:
- Criação de preferências
- Checkout redirect
- Webhook para confirmação
- Tracking de pagamentos

## 🎨 Design System

- OKLCH color space
- Light mode (padrão)
- Dark mode opcional
- Animações customizadas
- Glass morphism
- Gradientes modernos

## 📚 Tecnologias

- Next.js 16
- TypeScript 5
- Prisma ORM
- Tailwind CSS 4
- Mercado Pago SDK
- Vercel Analytics
- next-themes
- Zod validation

---

Desenvolvido com ❤️ por Pablo Bispo usando Next.js e Claude Code
