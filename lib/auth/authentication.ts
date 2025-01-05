'use server'

import { cookies } from 'next/headers'
import { getPermissions } from './permissions'



export async function getOrCreateProfile(organizationId: string, userUuid: string, username: string, token: string) {
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
      console.log('Setting profile cookies:', profileData)
      
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
        const errorData = await createProfileResponse.text()
        console.error('Profile creation failed:', {
          status: createProfileResponse.status,
          error: errorData
        })
      } else {
        const newProfileData = await createProfileResponse.json()
        cookieStore.set('profile-username', newProfileData.username)
        cookieStore.set('profile-email', newProfileData.email)
        cookieStore.set('profile-picture', newProfileData.picture_url)
      }
    }
  } catch (error) {
    console.error('Profile operation failed:', error)
  }
}
