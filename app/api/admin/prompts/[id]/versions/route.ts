import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireStaffAuth } from '@/lib/auth/get-session'
import { z } from 'zod'

const versionCreateSchema = z.object({
  modelTag: z.enum(['UNIVERSAL', 'CHATGPT_4', 'CHATGPT_35', 'CLAUDE_OPUS', 'CLAUDE_SONNET', 'GEMINI_2_FLASH', 'GEMINI_15_PRO']),
  version: z.string().optional(),
  content: z.string().min(10),
  notes: z.string().optional(),
  isRecommended: z.boolean().optional(),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireStaffAuth()

    const { id } = await params
    const body = await request.json()
    const validated = versionCreateSchema.parse(body)

    const prompt = await prisma.prompt.findUnique({
      where: { id },
      include: { versions: true }
    })

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt not found' },
        { status: 404 }
      )
    }

    const existingVersions = prompt.versions.filter(v => v.modelTag === validated.modelTag)
    const versionNumber = validated.version || `v` + String(existingVersions.length + 1)

    const exists = existingVersions.find(v => v.version === versionNumber)
    if (exists) {
      return NextResponse.json(
        { success: false, error: 'Version already exists for this model' },
        { status: 409 }
      )
    }

    if (validated.isRecommended) {
      await prisma.promptVersion.updateMany({
        where: {
          promptId: id,
          modelTag: validated.modelTag,
        },
        data: { isRecommended: false }
      })
    }

    const version = await prisma.promptVersion.create({
      data: {
        promptId: id,
        version: versionNumber,
        modelTag: validated.modelTag,
        content: validated.content,
        notes: validated.notes,
        isRecommended: validated.isRecommended ?? false,
      }
    })

    return NextResponse.json({ success: true, data: version }, { status: 201 })
  } catch (error) {
    console.error('Failed to create version:', error)
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
      { success: false, error: 'Failed to create version' },
      { status: 500 }
    )
  }
}
