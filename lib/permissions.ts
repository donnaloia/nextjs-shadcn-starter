import { cache } from 'react'
import { cookies } from 'next/headers'

interface Organization {
  name: string              // Must have a name property
  [key: string]: unknown    // Can have any other properties
}

interface PermissionsResponse {
  user_uuid: string
  organizations: Organization[]
}

// Cache the permissions fetch
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
    `http://localhost:8000/api/permissions/${userUuid.value}`,
    {
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
      // Add cache options
      next: {
        revalidate: 480, // Revalidate every 8 minutes
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

export function checkPermission(requiredPermission: string, userPermissions: string[]) {
  return userPermissions.includes(requiredPermission)
}
