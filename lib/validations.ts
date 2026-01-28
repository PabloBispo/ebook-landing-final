import { z } from 'zod'

// Lead capture validation
export const leadSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
  email: z.string().email('Email inválido').toLowerCase(),
  source: z.string().optional(),
})

export type LeadInput = z.infer<typeof leadSchema>

// Purchase validation
export const purchaseSchema = z.object({
  email: z.string().email('Email inválido').toLowerCase(),
  name: z.string().min(2).max(100),
  phone: z.string().optional(),
  productId: z.string(),
  installments: z.number().int().min(1).max(12).default(1),
})

export type PurchaseInput = z.infer<typeof purchaseSchema>

// Mercado Pago webhook validation
export const mercadoPagoWebhookSchema = z.object({
  action: z.string(),
  api_version: z.string(),
  data: z.object({
    id: z.string(),
  }),
  date_created: z.string(),
  id: z.number(),
  live_mode: z.boolean(),
  type: z.string(),
  user_id: z.string().optional(),
})

export type MercadoPagoWebhook = z.infer<typeof mercadoPagoWebhookSchema>

// Page view tracking validation
export const pageViewSchema = z.object({
  path: z.string(),
  referrer: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
})

export type PageViewInput = z.infer<typeof pageViewSchema>
