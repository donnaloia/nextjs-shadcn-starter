'use server'

import { cookies } from 'next/headers'
import { validatePermissions } from '../../../../lib/permissions'

export type EmailAddress = {
  id: string
  name: string
  created_at: string
}

export type EmailAddressesResponse = {
  results: EmailAddress[]
  current_page: number
  total_pages: number
  total: number
}

export async function getEmailAddresses(organizationId: string, page: number = 1) {
  const { isAuthenticated } = await validatePermissions()
  
  if (!isAuthenticated) {
    throw new Error('Unauthorized')
  }

  try {
    const url = `http://localhost:8080/api/v1/organizations/${organizationId}/email-addresses?page=${page}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: EmailAddressesResponse = await response.json()
    return { success: true, data }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to load email addresses'
    }
  }
} 