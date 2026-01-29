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
