import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/prompts/[slug]/copy
 * Registra analytics quando um prompt é copiado
 *
 * Body (opcional):
 * {
 *   userId?: string
 *   modelTag?: string
 *   version?: string
 * }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json().catch(() => ({}))

    // Buscar o prompt
    const prompt = await prisma.prompt.findUnique({
      where: { slug: slug },
      select: { id: true }
    })

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          error: 'Prompt not found',
          message: `No prompt found with slug: ${slug}`
        },
        { status: 404 }
      )
    }

    // Incrementar copy count
    await prisma.prompt.update({
      where: { slug: slug },
      data: {
        copyCount: {
          increment: 1
        }
      },
    })

    // Registrar uso (opcional, se informações forem fornecidas)
    if (body.modelTag) {
      await prisma.promptUsage.create({
        data: {
          promptId: prompt.id,
          userId: body.userId || null,
          modelTag: body.modelTag,
          version: body.version || null,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Copy registered successfully',
    })
  } catch (error) {
    console.error('Failed to register copy:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to register copy',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
