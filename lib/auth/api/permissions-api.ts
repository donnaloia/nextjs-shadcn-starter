import { API_ENDPOINTS } from '@/lib/config/api/endpoints'
import { cookies } from 'next/headers'
import { cache } from 'react'

interface Organization {
  name: string
  [key: string]: unknown
}

interface PermissionsResponse {
  is_authenticated: boolean
  organizations: Organization[]
}

export const getPermissions = cache(async () => {

  const cookieStore = await cookies()
  const userUuid = cookieStore.get('user-uuid')
  const token = cookieStore.get('access-token')

  if (!userUuid || !token) {
    return {
      isAuthenticated: false,
      organizations: []
    }
  }
  
  const response = await fetch(
    API_ENDPOINTS.permissions.get(userUuid.value),
    {
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
      next: {
        revalidate: 480,
        tags: ['permissions']
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch permissions')
  }

  const data: PermissionsResponse = await response.json()
  return {
    isAuthenticated: true,
    organizations: data.organizations || []
  }
}) 