import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/prompts/[slug]
 * Retorna detalhes completos de um prompt incluindo todas as versões
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const prompt = await prisma.prompt.findUnique({
      where: {
        slug: slug
      },
      include: {
        versions: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
            description: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
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

    // Incrementar view count (fire-and-forget)
    prisma.prompt.update({
      where: { slug: slug },
      data: {
        viewCount: {
          increment: 1
        }
      },
    }).catch(err => {
      console.error('Failed to increment view count:', err)
    })

    return NextResponse.json({
      success: true,
      data: prompt,
    })
  } catch (error) {
    console.error('Failed to fetch prompt:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch prompt',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/prompts/[id]
 * Deleta um prompt (usa ID ao invés de slug para evitar conflitos)
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Try to find by slug first, then by id (if slug is actually an id)
    let prompt = await prisma.prompt.findUnique({
      where: {
        slug: slug,
      },
    })

    if (!prompt) {
      // Try as ID
      prompt = await prisma.prompt.findUnique({
        where: {
          id: slug,
        },
      })
    }

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          error: 'Prompt not found',
          message: `No prompt found with slug or id: ${slug}`,
        },
        { status: 404 }
      )
    }

    // Delete related data
    await prisma.promptVersion.deleteMany({
      where: {
        promptId: prompt.id,
      },
    })

    // Delete the prompt
    await prisma.prompt.delete({
      where: {
        id: prompt.id,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Prompt deleted successfully',
    })
  } catch (error) {
    console.error('Failed to delete prompt:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete prompt',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
