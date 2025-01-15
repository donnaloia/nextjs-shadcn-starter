'use server'

import { cookies } from 'next/headers'

export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete('access-token')
  cookieStore.delete('user-uuid')
} 