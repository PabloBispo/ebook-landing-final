import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/prompts/manage
 * Lista todos os prompts (incluindo drafts e arquivados) para o dashboard admin
 */
export async function GET(_request: NextRequest) {
  try {
    const prompts = await prisma.prompt.findMany({
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
            versions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      data: prompts,
      count: prompts.length,
    })
  } catch (error) {
    console.error('Failed to fetch prompts for management:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch prompts',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
