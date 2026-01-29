import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/prompts/categories
 * Lista todas as categorias de prompts ordenadas por ordem
 */
export async function GET() {
  try {
    const categories = await prisma.promptCategory.findMany({
      orderBy: {
        order: 'asc'
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
      data: categories,
      count: categories.length,
    })
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
