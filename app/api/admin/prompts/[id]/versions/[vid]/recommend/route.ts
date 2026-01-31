import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireStaffAuth } from '@/lib/auth/get-session'
import { z } from 'zod'

const recommendSchema = z.object({
  modelTag: z.string(),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; vid: string }> }
) {
  try {
    await requireStaffAuth()

    const { id, vid } = await params
    const body = await request.json()
    const validated = recommendSchema.parse(body)

    const existingVersion = await prisma.promptVersion.findUnique({
      where: { id: vid }
    })

    if (!existingVersion || existingVersion.promptId !== id) {
      return NextResponse.json(
        { success: false, error: 'Version not found' },
        { status: 404 }
      )
    }

    // Unmark all other versions for this model as recommended
    await prisma.promptVersion.updateMany({
      where: {
        promptId: id,
        modelTag: validated.modelTag,
        id: { not: vid }
      },
      data: { isRecommended: false }
    })

    // Mark this version as recommended
    const version = await prisma.promptVersion.update({
      where: { id: vid },
      data: { isRecommended: true }
    })

    return NextResponse.json({ success: true, data: version })
  } catch (error) {
    console.error('Failed to mark version as recommended:', error)
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
      { success: false, error: 'Failed to mark version as recommended' },
      { status: 500 }
    )
  }
}
