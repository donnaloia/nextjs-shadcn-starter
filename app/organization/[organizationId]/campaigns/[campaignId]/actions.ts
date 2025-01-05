"use server"

import { cookies } from "next/headers"

export async function getTemplates(organizationId: string) {
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

  return data
}

export async function getEmailGroups(organizationId: string) {
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
  return data
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
) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access-token')?.value
  console.log(JSON.stringify(data))
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
  return updatedCampaign
}

export async function getCampaign(organizationId: string, campaignId: string) {
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

    return response.json()
  } catch (error) {
    console.error('Campaign fetch error:', {
      url,
      error,
      organizationId,
      campaignId
    })
    throw error
  }
} 