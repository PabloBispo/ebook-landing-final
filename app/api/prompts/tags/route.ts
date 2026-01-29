import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/prompts/tags
 * Lista todas as tags de prompts
 */
export async function GET() {
  try {
    const tags = await prisma.promptTag.findMany({
      orderBy: {
        name: 'asc'
      },
      include: {
        _count: {
          select: {
            prompts: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: tags,
      count: tags.length,
    })
  } catch (error) {
    console.error('Failed to fetch tags:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tags',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
