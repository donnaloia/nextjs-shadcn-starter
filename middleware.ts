import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkTokens } from '@/lib/auth/checks/token-check'
import { isProtectedPath, extractOrganizationId } from '@/lib/auth/checks/path-check'
import { checkOrganizationAccess } from '@/lib/auth/checks/org-check'

export async function middleware(request: NextRequest) {
  if (!isProtectedPath(request)) {
    return NextResponse.next()
  }

  const tokenCheck = checkTokens(request)
  if (tokenCheck) return tokenCheck

  const organizationId = extractOrganizationId(request.nextUrl.pathname)
  if (organizationId) {
    try {
      const hasAccess = await checkOrganizationAccess(organizationId)
      if (!hasAccess) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } catch (error) {
      console.error('Access check failed:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    '/organization/:path*/((?!register).*)'
  ],
} 