import { auth } from './auth-options'
import { NextResponse } from 'next/server'

export async function requireStaffAuth() {
  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  if (!['STAFF', 'ADMIN'].includes(session.user.role as string)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden - Staff access required' },
      { status: 403 }
    )
  }

  return null
}

export async function requireAdminAuth() {
  const session = await auth()

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
