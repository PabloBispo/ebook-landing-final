import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mercadoPagoWebhookSchema } from '@/lib/validations'
import { paymentClient } from '@/lib/mercadopago'
import { webhookRateLimit } from '@/lib/rate-limit'
import { resend, EMAIL_FROM, SUPPORT_EMAIL, emailTemplates } from '@/lib/resend'
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

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    try {
      await webhookRateLimit.check(100, ip) // 100 requests per minute
    } catch {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Parse webhook data
    const body = await request.json()

    // Validate webhook schema
    const webhook = mercadoPagoWebhookSchema.parse(body)

    // Save webhook event for auditing
    const webhookEvent = await prisma.webhookEvent.create({
      data: {
        event: webhook.type,
        paymentId: webhook.data.id,
        rawData: body,
        processed: false,
      },
    })

    // Only process payment events
    if (webhook.type === 'payment') {
      // Get payment details from Mercado Pago
      const payment = await paymentClient.get({
        id: webhook.data.id
      })

      if (!payment) {
        console.error('Payment not found:', webhook.data.id)
        return NextResponse.json({ received: true }, { status: 200 })
      }

      // Get external reference (purchase ID)
      const purchaseId = payment.external_reference

      if (!purchaseId) {
        console.error('No external reference in payment:', webhook.data.id)
        return NextResponse.json({ received: true }, { status: 200 })
      }

      // Find purchase
      const purchase = await prisma.purchase.findUnique({
        where: { id: purchaseId },
      })

      if (!purchase) {
        console.error('Purchase not found:', purchaseId)
        return NextResponse.json({ received: true }, { status: 200 })
      }

      // Map Mercado Pago status to our status
      let status = 'pending'
      if (payment.status === 'approved') {
        status = 'approved'
      } else if (payment.status === 'rejected') {
        status = 'rejected'
      } else if (payment.status === 'refunded') {
        status = 'refunded'
      }

      // Update purchase
      await prisma.purchase.update({
        where: { id: purchase.id },
        data: {
          status,
          mercadoPagoId: payment.id?.toString(),
          paymentMethod: payment.payment_type_id || undefined,
          mercadoPagoData: payment as any,
        },
      })

      // Mark webhook as processed
      await prisma.webhookEvent.update({
        where: { id: webhookEvent.id },
        data: {
          processed: true,
          processedAt: new Date(),
        },
      })

      // Get user data for emails
      const user = await prisma.user.findUnique({
        where: { id: purchase.userId },
      })

      if (!user) {
        console.error('User not found for purchase:', purchase.id)
        return NextResponse.json({ received: true }, { status: 200 })
      }

      // Log success
      console.log('Payment processed:', {
        paymentId: payment.id,
        purchaseId: purchase.id,
        status,
      })

      // Send emails based on payment status
      if (status === 'approved') {
        // Send welcome email with course access to customer (async)
        resend.emails.send({
          from: EMAIL_FROM,
          to: user.email,
          subject: emailTemplates.purchaseConfirmed.subject,
          html: emailTemplates.purchaseConfirmed.getHtml(user.name, purchase.productName),
        }).catch((error) => {
          console.error('Error sending purchase confirmation email:', error)
        })

        // Send notification to admin (async)
        resend.emails.send({
          from: EMAIL_FROM,
          to: SUPPORT_EMAIL,
          subject: emailTemplates.adminNotification.subject,
          html: emailTemplates.adminNotification.getHtml(
            user.name,
            user.email,
            purchase.productName,
            purchase.amount,
            purchase.id
          ),
        }).catch((error) => {
          console.error('Error sending admin notification:', error)
        })

        console.log('Welcome email sent to:', user.email)
      } else if (status === 'pending') {
        // Send pending payment email (async)
        resend.emails.send({
          from: EMAIL_FROM,
          to: user.email,
          subject: emailTemplates.purchasePending.subject,
          html: emailTemplates.purchasePending.getHtml(user.name),
        }).catch((error) => {
          console.error('Error sending pending payment email:', error)
        })
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })

  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      console.error('Invalid webhook data:', error.issues)
      return NextResponse.json(
        { error: 'Invalid webhook data' },
        { status: 400 }
      )
    }

    // Log error
    console.error('Error processing webhook:', error)

    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    )
  }
}

// Mercado Pago also sends GET requests to verify the endpoint
export async function GET() {
  return NextResponse.json({ status: 'ok' }, { status: 200 })
}
