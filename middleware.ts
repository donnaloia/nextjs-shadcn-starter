import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getPermissions } from './lib/auth/permissions'
import { removeAccessToken } from './lib/auth/access-token'

export async function middleware(request: NextRequest) {
  // Skip middleware for register paths
  if (request.nextUrl.pathname.includes('/register')) {
    return NextResponse.next()
  }

  // Get tokens from cookies
  const accessToken = request.cookies.get('access-token')
  const userUuid = request.cookies.get('user-uuid')
  
  // Check if we're already on the login page
  const isLoginPage = request.nextUrl.pathname === '/login'

  // If no tokens and not already on login page, redirect to login
  if ((!accessToken || !userUuid) && !isLoginPage) {
    console.log('No tokens found, redirecting to login')
    const response = NextResponse.redirect(new URL('/login', request.url))
    // Set cookies with past expiration to delete them
    response.cookies.set('access-token', '', { expires: new Date(0) })
    response.cookies.set('user-uuid', '', { expires: new Date(0) })
    return response
  }

  // Check organization access if path includes /organization/
  if (request.nextUrl.pathname.includes('/organization/')) {
    const orgMatch = request.nextUrl.pathname.match(/\/organization\/([^\/]+)/)
    if (!orgMatch) return NextResponse.next()
    
    // Get the organization ID from the path
    const protectedOrganizationId = orgMatch[1]
    
    try {
      // Get user's permissions
      const userPermissions = await getPermissions()

      // Check if user has access to the protected organization
      const hasOrgAccess = userPermissions.organizations.some(
        org => org.name === protectedOrganizationId
      )

      if (!userPermissions.isAuthenticated || !hasOrgAccess) {
        // Redirect to login if user does not have access
        console.log('Access denied, redirecting to login')
        removeAccessToken()
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } catch (error) {
      // Redirect to login if permissions check fails for any other reason
      console.error('Permissions check failed:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If we get here, either:
  // 1. User has been successfully granted access to the protected organization
  // 2. Not an organization route (no check needed)
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    '/organization/:path*/((?!register).*)'
  ],
} 