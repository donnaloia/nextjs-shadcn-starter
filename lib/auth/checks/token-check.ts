import { NextRequest, NextResponse } from 'next/server'
import { getServerCookie, removeServerCookie } from '../cookies/server'

export async function checkTokens(request: NextRequest) {
  const accessToken = await getServerCookie('access-token')
  const userUuid = await getServerCookie('user-uuid')
  const isLoginPage = request.nextUrl.pathname === '/login'

  if ((!accessToken || !userUuid) && !isLoginPage) {
    console.log('No tokens found, redirecting to login')
    const response = NextResponse.redirect(new URL('/login', request.url))
    await removeServerCookie('access-token')
    await removeServerCookie('user-uuid')
    return response
  }

  return null
} 