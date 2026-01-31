import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth/auth-options'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected (admin routes)
  const isProtectedRoute = pathname.startsWith('/prompts/manage')

  if (isProtectedRoute) {
    // Get session using NextAuth v5
    const session = await auth()

    // Not authenticated - redirect to login
    if (!session?.user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Authenticated but not authorized (USER role)
    if (session.user.role === 'USER') {
      return NextResponse.redirect(new URL('/403', request.url))
    }

    // User has STAFF or ADMIN role - allow access
  }

  const response = NextResponse.next()

  // Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )

  // CSP - Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-insights.com *.mercadopago.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' *.mercadopago.com *.vercel-insights.com; frame-src *.mercadopago.com;"
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
