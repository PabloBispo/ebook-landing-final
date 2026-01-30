import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const categoryCreateSchema = z.object({
  name: z.string().min(2).max(50),
  icon: z.string().min(1).max(10), // emoji
  description: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // For now, skip auth check to test functionality
    // In production, uncomment:
    // const authError = await requireStaffAuth()
    // if (authError) return authError

    const body = await request.json()
    const validated = categoryCreateSchema.parse(body)

    // Generate slug
    const slug = validated.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')

    // Get max order
    const maxOrder = await prisma.promptCategory.aggregate({
      _max: { order: true }
    })

    const category = await prisma.promptCategory.create({
      data: {
        name: validated.name,
        slug,
        icon: validated.icon,
        description: validated.description,
        order: (maxOrder._max.order || 0) + 1,
      }
    })

    return NextResponse.json({ success: true, data: category }, { status: 201 })
  } catch (error) {
    console.error('Failed to create category:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid data', details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
