import { auth } from './auth-options'
import { NextResponse } from 'next/server'
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
 * Get current user session using NextAuth
 */
export async function getSession(): Promise<Session | null> {
  try {
    const session = await auth()

    if (!session?.user) {
      return null
    }

    return {
      user: {
        id: (session.user as any).id || '',
        email: session.user.email || '',
        name: session.user.name || '',
        role: ((session.user as any).role as UserRole) || 'USER',
      }
    }
  } catch (error) {
    console.error('Failed to get session:', error)
    return null
  }
}

/**
 * Middleware to require STAFF or ADMIN role
 * Returns JSON error response if unauthorized
 */
export async function requireStaffAuth() {
  const session = await getSession()

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  if (!['STAFF', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden - Staff access required' },
      { status: 403 }
    )
  }

  return null
}

/**
 * Middleware to require ADMIN role
 * Returns JSON error response if unauthorized
 */
export async function requireAdminAuth() {
  const session = await getSession()

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  if (session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { success: false, error: 'Forbidden - Admin access required' },
      { status: 403 }
    )
  }

  return null
}
