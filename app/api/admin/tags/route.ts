import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const tagCreateSchema = z.object({
  name: z.string().min(2).max(30),
})

export async function POST(request: NextRequest) {
  try {
    // For now, skip auth check to test functionality
    // In production, uncomment:
    // const authError = await requireStaffAuth()
    // if (authError) return authError

    const body = await request.json()
    const validated = tagCreateSchema.parse(body)

    // Generate slug
    const slug = validated.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')

    // Check if already exists
    const existing = await prisma.promptTag.findUnique({
      where: { slug }
    })

    if (existing) {
      return NextResponse.json({ success: true, data: existing })
    }

    const tag = await prisma.promptTag.create({
      data: {
        name: validated.name,
        slug,
      }
    })

    return NextResponse.json({ success: true, data: tag }, { status: 201 })
  } catch (error) {
    console.error('Failed to create tag:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid data', details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create tag' },
      { status: 500 }
    )
  }
}
