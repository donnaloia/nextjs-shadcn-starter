'use server'

import { cookies } from 'next/headers'
import { API_ENDPOINTS } from '@/lib/config/api/endpoints'

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
  
  const requestBody = {
    first_name: formData.get('firstName'),
    last_name: formData.get('lastName'),
    email: formData.get('email'),
    bio: formData.get('bio'),
    timezone: formData.get('timezone'),
    notifications_enabled: formData.get('notifications') === 'true'
  }
  
  try {
    const response = await fetch(API_ENDPOINTS.profiles.update(organizationId, profileId), {
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
    
    cookieStore.set('profile-first-name', data.first_name, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

    cookieStore.set('profile-last-name', data.last_name, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

    cookieStore.set('profile-email', data.email, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

    cookieStore.set('profile-bio', data.bio, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

    cookieStore.set('profile-timezone', data.timezone, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

    return data


  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
} 