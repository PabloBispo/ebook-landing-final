import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PromptStatus } from '@prisma/client'

/**
 * GET /api/prompts
 * Lista todos os prompts publicados
 * Query params: ?category=slug&tag=slug
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const category = searchParams.get('category')
  const tag = searchParams.get('tag')

  try {
    const prompts = await prisma.prompt.findMany({
      where: {
        status: PromptStatus.PUBLISHED,
        ...(category && {
          category: {
            slug: category
          }
        }),
        ...(tag && {
          tags: {
            some: {
              slug: tag
            }
          }
        }),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            versions: true
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      },
    })

    return NextResponse.json({
      success: true,
      data: prompts,
      count: prompts.length,
    })
  } catch (error) {
    console.error('Failed to fetch prompts:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch prompts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
