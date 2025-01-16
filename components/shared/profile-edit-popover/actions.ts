'use server'

import { cookies } from 'next/headers'
import { API_ENDPOINTS } from '@/lib/config/api/endpoints'
import { setProfileCookies } from '@/lib/auth/cookies/server'

interface ProfileResponse {
    first_name: string
    last_name: string
    username: string
    email: string
    bio: string
    timezone: string
    notifications_enabled: boolean
  }

export async function updateProfile(formData: FormData): Promise<ProfileResponse> {
  const cookieStore = await cookies()
  
  const organizationId = cookieStore.get('organization-id')?.value
  const profileId = cookieStore.get('user-uuid')?.value
  const accessToken = cookieStore.get('access-token')?.value
  const username = cookieStore.get('profile-username')?.value
  
  const requestBody = {
    username: formData.get('username') || username,
    first_name: formData.get('firstName') || null,
    last_name: formData.get('lastName') || null,
    email: formData.get('email') || null,
    bio: formData.get('bio') || null,
    timezone: formData.get('timezone') || null,
    notifications_enabled: formData.get('notifications') === 'true'
  }
  
  try {
    const response = await fetch(API_ENDPOINTS.profiles.update(organizationId as string, profileId as string), {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Server Response:', errorText)
      throw new Error('Failed to update profile')
    }

    const data: ProfileResponse = await response.json()
    
    // Set profile cookies
    await setProfileCookies({
      username: data.username,
      email: data.email,
      picture_url: '',
      first_name: data.first_name,
      last_name: data.last_name,
      bio: data.bio,
      timezone: data.timezone
    })

    return data


  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
} 