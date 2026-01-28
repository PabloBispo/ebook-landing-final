import { MercadoPagoConfig, Preference, Payment } from 'mercadopago'

if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error('MERCADO_PAGO_ACCESS_TOKEN is not defined in environment variables')
}

// Initialize Mercado Pago client
export const mercadoPagoClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  options: {
    timeout: 5000,
  }
})

export const preferenceClient = new Preference(mercadoPagoClient)
export const paymentClient = new Payment(mercadoPagoClient)

// Product definitions
export const PRODUCTS = {
  'ebook-masterclass': {
    id: 'ebook-masterclass',
    title: 'Masterclass: Ebooks com IA em 3-5 Dias',
    description: 'Aprenda a criar ebooks profissionais usando Inteligência Artificial, mantendo sua voz autoral e qualidade editorial.',
    price: 247.00,
    currency: 'BRL',
  },
  'ebook-masterclass-upsell': {
    id: 'ebook-masterclass-upsell',
    title: 'Masterclass + Módulo Landing Pages',
    description: 'Masterclass completa + Módulo bônus de criação de Landing Pages de alta conversão',
    price: 347.00,
    currency: 'BRL',
  }
} as const

export type ProductId = keyof typeof PRODUCTS

export function getProduct(productId: string) {
  if (productId in PRODUCTS) {
    return PRODUCTS[productId as ProductId]
  }
  return null
}
