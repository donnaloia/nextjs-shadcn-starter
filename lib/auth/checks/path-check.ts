import { NextRequest } from 'next/server'

export function isProtectedPath(request: NextRequest): boolean {
  return !request.nextUrl.pathname.includes('/register')
}

export function extractOrganizationId(pathname: string): string | null {
  const orgMatch = pathname.match(/\/organization\/([^\/]+)/)
  return orgMatch ? orgMatch[1] : null
} 