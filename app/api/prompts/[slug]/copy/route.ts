import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/prompts/[slug]/copy
 * Registra analytics quando um prompt é copiado OU duplica um prompt para admin
 *
 * Query params:
 * - duplicate=true: Duplica o prompt ao invés de apenas registrar cópia
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
    const { searchParams } = request.nextUrl
    const isDuplicate = searchParams.get('duplicate') === 'true'
    const body = await request.json().catch(() => ({}))

    // Buscar o prompt
    const prompt = await prisma.prompt.findUnique({
      where: { slug: slug },
      include: {
        versions: {
          orderBy: { createdAt: 'desc' },
        },
        tags: true,
      },
    })

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          error: 'Prompt not found',
          message: `No prompt found with slug: ${slug}`,
        },
        { status: 404 }
      )
    }

    // Se é uma duplicação para o admin
    if (isDuplicate) {
      // Gerar novo alias único
      let newAlias = `${prompt.alias}-COPY`
      let counter = 1
      while (
        await prisma.prompt.findUnique({
          where: { alias: newAlias },
        })
      ) {
        newAlias = `${prompt.alias}-COPY-${counter}`
        counter++
      }

      // Gerar novo slug único
      const baseSlug = `${prompt.slug}-copy-${counter}`
      let newSlug = baseSlug
      counter = 1
      while (
        await prisma.prompt.findUnique({
          where: { slug: newSlug },
        })
      ) {
        newSlug = `${baseSlug}-${counter}`
        counter++
      }

      // Duplicar o prompt
      const duplicatedPrompt = await prisma.prompt.create({
        data: {
          title: `${prompt.title} (Cópia)`,
          slug: newSlug,
          alias: newAlias,
          description: prompt.description,
          status: 'DRAFT',
          categoryId: prompt.categoryId,
          creatorId: prompt.creatorId,
          placeholders: prompt.placeholders ?? {},
          tags: {
            connect: prompt.tags.map(t => ({ id: t.id })),
          },
        },
      })

      // Duplicar as versões
      if (prompt.versions.length > 0) {
        for (const version of prompt.versions) {
          await prisma.promptVersion.create({
            data: {
              promptId: duplicatedPrompt.id,
              content: version.content,
              modelTag: version.modelTag,
              version: version.version,
              notes: version.notes ? `${version.notes} (Cópia)` : 'Duplicado',
            },
          })
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Prompt duplicated successfully',
        data: {
          id: duplicatedPrompt.id,
          slug: duplicatedPrompt.slug,
        },
      })
    }

    // Comportamento original: apenas registra cópia
    // Incrementar copy count
    await prisma.prompt.update({
      where: { slug: slug },
      data: {
        copyCount: {
          increment: 1,
        },
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
    console.error('Failed to process copy request:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process copy request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
