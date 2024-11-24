import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get access token from localStorage (cookies in middleware)
  const accessToken = request.cookies.get('access-token')
  
  // Check if we're already on the login page
  const isLoginPage = request.nextUrl.pathname === '/login'

  // If no token and not already on login page, redirect to login
  if (!accessToken && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Allow the request to continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
} 