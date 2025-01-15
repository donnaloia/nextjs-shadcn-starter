import { API_ENDPOINTS } from '@/lib/config/api/endpoints'

export async function getOrganizationName(organizationId: string, token: string): Promise<string> {
  const response = await fetch(API_ENDPOINTS.organizations.get(organizationId), {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch organization')
  }

  const data = await response.json()
  return data.name || organizationId
} 