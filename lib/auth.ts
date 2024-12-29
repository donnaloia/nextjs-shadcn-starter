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
    await getOrCreateProfile(firstOrg.name, userUuid, username, data.access_token)

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


async function getOrCreateProfile(organizationId: string, userUuid: string, username: string, token: string) {
  const cookieStore = await cookies()
  
  try {
    const profileResponse = await fetch(
      `http://localhost:8080/api/v1/organizations/${organizationId}/profiles/${userUuid}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    )

    if (profileResponse.ok) {
      const profileData = await profileResponse.json()
      cookieStore.set('profile-username', profileData.username)
      cookieStore.set('profile-email', profileData.email)
      cookieStore.set('profile-picture', profileData.picture_url)
    } else {
      const createProfileResponse = await fetch(
        `http://localhost:8080/api/v1/organizations/${organizationId}/profiles`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: userUuid,
            username: username,
            email: `${username}@example.com`,
            organization_id: organizationId,
            picture_url: 'https://placeholder.com/user.png'
          }),
        }
      )

      if (!createProfileResponse.ok) {
        console.error('Failed to create profile')
      }
    }
  } catch (error) {
    console.error('Profile operation failed:', error)
  }
}


export async function removeAccessToken() {
  const cookieStore = await cookies()
  cookieStore.delete('access-token')
}