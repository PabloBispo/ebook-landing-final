import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth/get-session'
import { promptUpdateSchema } from '@/lib/prompts/admin-validator'

/**
 * PUT /api/admin/prompts/[id]
 * Update an existing prompt (STAFF/ADMIN only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verify authentication and role
    const session = await getSession()
    if (!session?.user || session.user.role === 'USER') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Get and validate params
    const { id } = await params
    const body = await request.json()
    const validated = promptUpdateSchema.parse(body)

    // 3. Check if prompt exists
    const existingPrompt = await prisma.prompt.findUnique({
      where: { id }
    })

    if (!existingPrompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt not found' },
        { status: 404 }
      )
    }

    // 4. Update prompt
    const prompt = await prisma.prompt.update({
      where: { id },
      data: {
        title: validated.title,
        description: validated.description,
        categoryId: validated.categoryId,
        status: validated.status,
        placeholders: validated.placeholders,
        tags: {
          set: [],
          connect: validated.tagIds?.map(id => ({ id })) || []
        }
      },
      include: {
        versions: true,
        category: true,
        tags: true,
      }
    })

    return NextResponse.json({ success: true, data: prompt })
  } catch (error) {
    console.error('Failed to update prompt:', error)

    // Handle Zod validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update prompt' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/prompts/[id]
 * Delete a prompt (STAFF/ADMIN only)
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verify authentication and role
    const session = await getSession()
    if (!session?.user || session.user.role === 'USER') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Get params
    const { id } = await params

    // 3. Check if prompt exists
    const existingPrompt = await prisma.prompt.findUnique({
      where: { id }
    })

    if (!existingPrompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt not found' },
        { status: 404 }
      )
    }

    // 4. Delete prompt (cascade will delete versions and usage)
    await prisma.prompt.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Prompt deleted successfully'
    })
  } catch (error) {
    console.error('Failed to delete prompt:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete prompt' },
      { status: 500 }
    )
  }
}
