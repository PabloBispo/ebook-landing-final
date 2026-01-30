import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth/get-session'
import { promptCreateSchema } from '@/lib/prompts/admin-validator'

/**
 * POST /api/admin/prompts
 * Create a new prompt (STAFF/ADMIN only)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Verify authentication and role
    const session = await getSession()
    if (!session?.user || session.user.role === 'USER') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Validate body
    const body = await request.json()
    const validated = promptCreateSchema.parse(body)

    // 3. Create prompt + first version
    const prompt = await prisma.prompt.create({
      data: {
        slug: validated.slug,
        alias: validated.alias,
        title: validated.title,
        description: validated.description,
        categoryId: validated.categoryId,
        status: validated.status || 'DRAFT',
        sourceChapter: validated.sourceChapter,
        placeholders: validated.placeholders || [],
        creatorId: session.user.id,
        versions: {
          create: {
            version: 'v1',
            modelTag: validated.modelTag || 'universal',
            content: validated.content,
            isRecommended: true,
          }
        },
        tags: {
          connect: validated.tagIds?.map(id => ({ id })) || []
        }
      },
      include: {
        versions: true,
        category: true,
        tags: true,
      }
    })

    return NextResponse.json({ success: true, data: prompt }, { status: 201 })
  } catch (error) {
    console.error('Failed to create prompt:', error)

    // Handle Zod validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }

    // Handle unique constraint violations
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { success: false, error: 'Prompt with this slug or alias already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create prompt' },
      { status: 500 }
    )
  }
}
