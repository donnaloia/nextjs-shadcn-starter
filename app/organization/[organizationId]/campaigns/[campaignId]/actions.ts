"use server"

import { cookies } from "next/headers"

interface Template {
  id: string
  name: string
  html: string
  organization_id: string
  created_at: string
}

interface EmailGroup {
  id: string
  name: string
  organization_id: string
  created_at: string
}

interface ApiResponse<T> {
  results: T[]
  current_page: number
  total_pages: number
  total: number
}

export async function getTemplates(organizationId: string): Promise<ApiResponse<Template>> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access-token')?.value

  const response = await fetch(`http://localhost:8080/api/v1/organizations/${organizationId}/templates`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    console.error('Templates fetch failed:', {
      status: response.status,
      statusText: response.statusText
    })
    throw new Error('Failed to fetch templates')
  }

  const data = await response.json()
  return data as ApiResponse<Template>
}

export async function getEmailGroups(organizationId: string): Promise<ApiResponse<EmailGroup>> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access-token')?.value

  const response = await fetch(`http://localhost:8080/api/v1/organizations/${organizationId}/email-groups`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    console.error('Email groups fetch failed:', {
      status: response.status,
      statusText: response.statusText
    })
    throw new Error('Failed to fetch email groups')
  }

  const data = await response.json()
  return data as ApiResponse<EmailGroup>
}

interface Campaign {
  id: string
  name: string
  templates: Template[]
  email_groups: EmailGroup[]
  scheduled_at: string | null
  created_at: string
}

type UpdateCampaignData = {
  name?: string
  templates?: string[]
  email_groups?: string[]
  scheduled_at?: string | null
}

export async function updateCampaign(
  organizationId: string, 
  campaignId: string, 
  data: UpdateCampaignData
): Promise<Campaign> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access-token')?.value

  const response = await fetch(
    `http://localhost:8080/api/v1/organizations/${organizationId}/campaigns/${campaignId}`, 
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
  )

  if (!response.ok) {
    console.error('Campaign update failed:', {
      status: response.status,
      statusText: response.statusText
    })
    throw new Error('Failed to update campaign')
  }

  const updatedCampaign = await response.json()
  return updatedCampaign as Campaign
}

export async function getCampaign(
  organizationId: string, 
  campaignId: string
): Promise<Campaign> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access-token')?.value

  const url = `http://localhost:8080/api/v1/organizations/${organizationId}/campaigns/${campaignId}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Campaign fetch failed:', {
        url,
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        organizationId,
        campaignId
      })
      throw new Error(`Failed to fetch campaign: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    return data as Campaign
  } catch (error: unknown) {
    console.error('Campaign fetch error:', {
      url,
      error,
      organizationId,
      campaignId
    })
    throw error
  }
} 