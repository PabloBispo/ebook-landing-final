import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

export interface Session {
  user: {
    id: string
    email: string
    name: string
    role: UserRole
  }
}

/**
 * Get current user session from cookies
 * This is a placeholder implementation until full auth is set up
 *
 * For now, we check for a simple user_id cookie
 * In production, this should use proper JWT/session tokens
 */
export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return null
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    })

    if (!user) {
      return null
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    }
  } catch (error) {
    console.error('Failed to get session:', error)
    return null
  }
}

/**
 * Check if user has STAFF or ADMIN role
 */
export async function requireStaffAuth(): Promise<Session> {
  const session = await getSession()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  if (session.user.role === 'USER') {
    throw new Error('Forbidden: Staff access required')
  }

  return session
}
