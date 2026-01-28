#!/usr/bin/env node

/**
 * Test Mercado Pago connection
 */

require('dotenv').config()

const { MercadoPagoConfig, Preference } = require('mercadopago')

async function testConnection() {
  console.log('🧪 Testando conexão com Mercado Pago\n')

  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN

  if (!token) {
    console.error('❌ MERCADO_PAGO_ACCESS_TOKEN não encontrado no .env')
    return
  }

  console.log('✅ Token encontrado:', token.substring(0, 20) + '...')
  console.log('🔍 Tipo:', token.startsWith('TEST-') ? 'TEST (Sandbox)' : 'PRODUCTION')

  try {
    console.log('\n📡 Inicializando cliente...')
    const client = new MercadoPagoConfig({
      accessToken: token,
      options: {
        timeout: 5000,
      }
    })

    console.log('✅ Cliente criado')

    console.log('\n📡 Criando preferência de teste...')
    const preferenceClient = new Preference(client)

    const preference = await preferenceClient.create({
      body: {
        items: [
          {
            id: 'test-item',
            title: 'Produto de Teste',
            description: 'Teste de integração Mercado Pago',
            quantity: 1,
            unit_price: 10.00,
            currency_id: 'BRL',
          },
        ],
        payer: {
          name: 'Test User',
          email: 'test@test.com',
        },
      },
    })

    console.log('✅ Preferência criada com sucesso!')
    console.log('🆔 ID:', preference.id)
    console.log('🔗 Link:', preference.sandbox_init_point)
    console.log('\n✨ Conexão com Mercado Pago funcionando perfeitamente!')

  } catch (error) {
    console.error('\n❌ Erro ao conectar com Mercado Pago:')
    console.error('Tipo:', error.constructor.name)
    console.error('Mensagem:', error.message)

    if (error.cause) {
      console.error('Causa:', error.cause)
    }

    if (error.stack) {
      console.error('\nStack trace:')
      console.error(error.stack)
    }
  }
}

testConnection()
