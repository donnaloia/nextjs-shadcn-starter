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

export const getPermissions = cache(async (userUuid: string, accessToken: string) => {
  if (!userUuid || !accessToken) {
    return {
      isAuthenticated: false,
      organizations: []
    }
  }
  
  const response = await fetch(
    API_ENDPOINTS.permissions.get(userUuid),
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
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