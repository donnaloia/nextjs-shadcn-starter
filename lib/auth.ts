'use server'

import { cookies } from 'next/headers'
import { getPermissions } from './permissions'

interface LoginResponse {
  access_token: string
}

function extractUuidFromToken(token: string): string {
  try {
    const [header, payload, signature] = token.split('.')
    const decodedPayload = JSON.parse(atob(payload))
    
    console.log('JWT Payload:', decodedPayload)  // Log the full payload
    
    if (!decodedPayload.sub) {
      // Log what we actually received
      console.log('Available payload fields:', Object.keys(decodedPayload))
      throw new Error('No user UUID in token payload')
    }
    return decodedPayload.sub
  } catch (error) {
    console.error('Token parsing error:', error)
    throw new Error('Invalid token format')
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const response = await fetch('http://localhost:8081/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Login failed: ${response.status} ${errorText}`)
    }

    const data: LoginResponse = await response.json()
    const userUuid = extractUuidFromToken(data.access_token)
    
    // Set cookies
    const cookieStore = await cookies()
    cookieStore.set('access-token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
    cookieStore.set('user-uuid', userUuid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    // Get user's permission and redirect to their first organization
    const permissions = await getPermissions()
    
    if (!permissions.organizations || permissions.organizations.length === 0) {
      throw new Error('No organizations found for user')
    }

    const firstOrg = permissions.organizations[0]
    const redirectUrl = `/organization/${firstOrg.name}/campaigns`

    return {
      success: true,
      redirectUrl: redirectUrl
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    }
  }
}
