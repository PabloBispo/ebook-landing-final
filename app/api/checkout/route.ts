import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { purchaseSchema } from '@/lib/validations'
import { preferenceClient, getProduct } from '@/lib/mercadopago'
import { getClientIp, sanitizeEmail } from '@/lib/utils'
import { checkoutRateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // Check if Mercado Pago is configured
    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
      console.error('MERCADO_PAGO_ACCESS_TOKEN not configured')
      return NextResponse.json(
        { error: 'Sistema de pagamento não configurado' },
        { status: 500 }
      )
    }

    // Get client info
    const ip = getClientIp(request) || 'unknown'

    // Rate limiting by IP
    try {
      await checkoutRateLimit.check(3, ip) // 3 requests per minute per IP
    } catch {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente em alguns minutos.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = purchaseSchema.parse(body)

    // Get product
    const product = getProduct(validatedData.productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Sanitize email
    const sanitizedEmail = sanitizeEmail(validatedData.email)

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: sanitizedEmail,
          name: validatedData.name,
          phone: validatedData.phone,
        },
      })
    }

    // Create pending purchase
    const purchase = await prisma.purchase.create({
      data: {
        userId: user.id,
        productId: product.id,
        productName: product.title,
        amount: product.price,
        currency: product.currency,
        status: 'pending',
        installments: validatedData.installments,
      },
    })

    // Create Mercado Pago preference
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const preference = await preferenceClient.create({
      body: {
        items: [
          {
            id: product.id,
            title: product.title,
            description: product.description,
            quantity: 1,
            unit_price: product.price,
            currency_id: product.currency,
          },
        ],
        payer: {
          name: validatedData.name,
          email: sanitizedEmail,
          phone: validatedData.phone ? {
            area_code: validatedData.phone.substring(0, 2),
            number: validatedData.phone.substring(2),
          } : undefined,
        },
        payment_methods: {
          installments: validatedData.installments,
          excluded_payment_types: [],
        },
        back_urls: {
          success: `${baseUrl}/obrigado?status=success&purchase_id=${purchase.id}`,
          failure: `${baseUrl}/obrigado?status=failure&purchase_id=${purchase.id}`,
          pending: `${baseUrl}/obrigado?status=pending&purchase_id=${purchase.id}`,
        },
        auto_return: 'approved',
        notification_url: `${baseUrl}/api/webhooks/mercadopago`,
        external_reference: purchase.id,
        statement_descriptor: 'MASTERCLASS EBOOK IA',
      },
    })

    // Update purchase with Mercado Pago preference ID
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        mercadoPagoData: preference as any,
      },
    })

    // Log success
    console.log('Checkout created:', {
      purchaseId: purchase.id,
      preferenceId: preference.id,
      email: sanitizedEmail
    })

    return NextResponse.json(
      {
        success: true,
        preferenceId: preference.id,
        initPoint: preference.init_point,
        sandboxInitPoint: preference.sandbox_init_point,
        purchaseId: purchase.id,
      },
      { status: 201 }
    )

  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          details: error.issues
        },
        { status: 400 }
      )
    }

    // Log error
    console.error('Error creating checkout:', error)

    return NextResponse.json(
      { error: 'Erro ao processar checkout. Tente novamente.' },
      { status: 500 }
    )
  }
}
