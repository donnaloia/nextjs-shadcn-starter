import { cache } from 'react'
import { API_ENDPOINTS } from '@/lib/config/api/endpoints'

export const getOrganizationName = cache(async (organizationId: string, token: string): Promise<string> => {
  const response = await fetch(API_ENDPOINTS.organizations.get(organizationId), {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    next: {
      revalidate: 3600 // Cache for 1 hour (in seconds)
    }
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch organization')
  }

  const data = await response.json()
  return data.name
}) 