import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { leadSchema } from '@/lib/validations'
import { getClientIp, getUserAgent, sanitizeEmail } from '@/lib/utils'
import { leadRateLimit } from '@/lib/rate-limit'
import { resend, EMAIL_FROM, emailTemplates } from '@/lib/resend'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    // Get client info
    const ip = getClientIp(request) || 'unknown'
    const userAgent = getUserAgent(request)

    // Rate limiting by IP
    try {
      await leadRateLimit.check(5, ip) // 5 requests per minute per IP
    } catch {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente em alguns minutos.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = leadSchema.parse(body)

    // Sanitize email
    const sanitizedEmail = sanitizeEmail(validatedData.email)

    // Check if email already exists
    const existingLead = await prisma.lead.findUnique({
      where: { email: sanitizedEmail },
    })

    if (existingLead) {
      return NextResponse.json(
        {
          success: true,
          message: 'Obrigado! Você já está cadastrado em nossa lista.',
          alreadyExists: true
        },
        { status: 200 }
      )
    }

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        email: sanitizedEmail,
        source: validatedData.source || 'landing-page',
        ipAddress: ip,
        userAgent: userAgent || undefined,
      },
    })

    // Send welcome email (async, don't await to not block response)
    resend.emails.send({
      from: EMAIL_FROM,
      to: sanitizedEmail,
      subject: emailTemplates.leadWelcome.subject,
      html: emailTemplates.leadWelcome.getHtml(validatedData.name),
    }).catch((error) => {
      // Log email error but don't fail the request
      console.error('Error sending welcome email:', error)
    })

    // Log success
    console.log('Lead created:', { id: lead.id, email: lead.email })

    return NextResponse.json(
      {
        success: true,
        message: 'Cadastro realizado com sucesso! Verifique seu email.',
        leadId: lead.id
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

    // Log error (in production, send to error tracking service)
    console.error('Error creating lead:', error)

    return NextResponse.json(
      { error: 'Erro ao processar cadastro. Tente novamente.' },
      { status: 500 }
    )
  }
}

// GET endpoint for checking if email exists (optional)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    const sanitizedEmail = sanitizeEmail(email)

    const lead = await prisma.lead.findUnique({
      where: { email: sanitizedEmail },
      select: { id: true, email: true, createdAt: true }
    })

    return NextResponse.json(
      { exists: !!lead },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error checking lead:', error)
    return NextResponse.json(
      { error: 'Erro ao verificar cadastro' },
      { status: 500 }
    )
  }
}
