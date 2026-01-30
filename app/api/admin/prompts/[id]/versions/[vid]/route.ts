import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireStaffAuth } from '@/lib/auth/get-session'
import { z } from 'zod'

const versionUpdateSchema = z.object({
  content: z.string().min(10).optional(),
  notes: z.string().optional(),
  isRecommended: z.boolean().optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; vid: string }> }
) {
  try {
    await requireStaffAuth()

    const { id, vid } = await params
    const body = await request.json()
    const validated = versionUpdateSchema.parse(body)

    const existingVersion = await prisma.promptVersion.findUnique({
      where: { id: vid }
    })

    if (!existingVersion || existingVersion.promptId !== id) {
      return NextResponse.json(
        { success: false, error: 'Version not found' },
        { status: 404 }
      )
    }

    if (validated.isRecommended) {
      await prisma.promptVersion.updateMany({
        where: {
          promptId: id,
          modelTag: existingVersion.modelTag,
          id: { not: vid }
        },
        data: { isRecommended: false }
      })
    }

    const version = await prisma.promptVersion.update({
      where: { id: vid },
      data: {
        ...(validated.content && { content: validated.content }),
        ...(validated.notes !== undefined && { notes: validated.notes }),
        ...(validated.isRecommended !== undefined && { isRecommended: validated.isRecommended }),
      }
    })

    return NextResponse.json({ success: true, data: version })
  } catch (error) {
    console.error('Failed to update version:', error)
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    if (error instanceof Error && error.message.includes('Forbidden')) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Staff access required' },
        { status: 403 }
      )
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', issues: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to update version' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; vid: string }> }
) {
  try {
    await requireStaffAuth()

    const { id, vid } = await params

    const version = await prisma.promptVersion.findUnique({
      where: { id: vid }
    })

    if (!version || version.promptId !== id) {
      return NextResponse.json(
        { success: false, error: 'Version not found' },
        { status: 404 }
      )
    }

    const versionCount = await prisma.promptVersion.count({
      where: { promptId: id }
    })

    if (versionCount <= 1) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete last version' },
        { status: 400 }
      )
    }

    await prisma.promptVersion.delete({
      where: { id: vid }
    })

    return NextResponse.json({
      success: true,
      message: 'Version deleted successfully'
    })
  } catch (error) {
    console.error('Failed to delete version:', error)
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    if (error instanceof Error && error.message.includes('Forbidden')) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Staff access required' },
        { status: 403 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to delete version' },
      { status: 500 }
    )
  }
}
