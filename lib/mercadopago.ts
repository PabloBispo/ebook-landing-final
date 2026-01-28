import { MercadoPagoConfig, Preference, Payment } from 'mercadopago'

// Initialize only if token is available (runtime check)
const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || ''

// Create client with placeholder during build, will be properly initialized at runtime
export const mercadoPagoClient = accessToken
  ? new MercadoPagoConfig({
      accessToken,
      options: {
        timeout: 5000,
      }
    })
  : null as any as MercadoPagoConfig

export const preferenceClient = accessToken ? new Preference(mercadoPagoClient) : null as any as Preference
export const paymentClient = accessToken ? new Payment(mercadoPagoClient) : null as any as Payment

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
