#!/usr/bin/env node

/**
 * Script de teste para API do Mercado Pago
 *
 * Testa o fluxo completo:
 * 1. POST /api/checkout - Cria uma preferência de pagamento
 * 2. Simula webhook do Mercado Pago
 */

const BASE_URL = 'http://localhost:3000'

async function testCheckout() {
  console.log('🧪 Testando POST /api/checkout...\n')

  const checkoutData = {
    name: 'Pablo Fernando Teste',
    email: 'pablofernando+teste@live.com',
    phone: '11987654321',
    productId: 'ebook-masterclass',
    installments: 12
  }

  try {
    const response = await fetch(`${BASE_URL}/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData)
    })

    const data = await response.json()

    if (response.ok) {
      console.log('✅ Checkout criado com sucesso!')
      console.log('📦 Purchase ID:', data.purchaseId)
      console.log('🔑 Preference ID:', data.preferenceId)
      console.log('🔗 Link de pagamento (sandbox):', data.sandboxInitPoint)
      console.log('\n💡 Abra o link acima para testar o pagamento no ambiente sandbox do Mercado Pago')
      console.log('\n📋 Response completo:')
      console.log(JSON.stringify(data, null, 2))

      return data
    } else {
      console.error('❌ Erro no checkout:', data)
      return null
    }
  } catch (error) {
    console.error('❌ Erro na requisição:', error.message)
    return null
  }
}

async function testWebhook(paymentId = '1234567890', status = 'approved') {
  console.log('\n\n🧪 Testando POST /api/webhooks/mercadopago...\n')

  const webhookData = {
    action: 'payment.updated',
    api_version: 'v1',
    data: {
      id: paymentId
    },
    date_created: new Date().toISOString(),
    id: Math.floor(Math.random() * 1000000),
    live_mode: false,
    type: 'payment',
    user_id: '531159411'
  }

  try {
    const response = await fetch(`${BASE_URL}/api/webhooks/mercadopago`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData)
    })

    const data = await response.json()

    if (response.ok) {
      console.log('✅ Webhook processado com sucesso!')
      console.log('📋 Response:', JSON.stringify(data, null, 2))
    } else {
      console.error('❌ Erro no webhook:', data)
    }
  } catch (error) {
    console.error('❌ Erro na requisição:', error.message)
  }
}

async function main() {
  console.log('🚀 Iniciando testes da API Mercado Pago\n')
  console.log('📍 Base URL:', BASE_URL)
  console.log('⚠️  Certifique-se de que o servidor está rodando: npm run dev\n')
  console.log('=' .repeat(60) + '\n')

  // Teste 1: Criar checkout
  const checkoutResult = await testCheckout()

  if (checkoutResult) {
    console.log('\n' + '=' .repeat(60))
    console.log('\n💡 Para testar o webhook, use o Preference ID acima')
    console.log('   ou simule um payment ID manualmente\n')
  }

  console.log('\n✨ Testes concluídos!')
}

main()
