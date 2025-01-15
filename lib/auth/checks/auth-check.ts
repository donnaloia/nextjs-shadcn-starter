import { getServerCookie } from '../cookies/server'

export async function checkAuthentication() {
  const accessToken = await getServerCookie('access-token')
  const userUuid = await getServerCookie('user-uuid')
  return !!(accessToken && userUuid)
} 