import { API_ENDPOINTS } from '@/lib/config/api/endpoints'

interface CreateProfileData {
    user_uuid: string
    username: string
    email: string
    picture_url: string
    organization_id: string
  }

interface ProfileResponse {
  username: string
  email: string
  picture_url: string
  first_name: string
  last_name: string
  bio: string
  timezone: string
  notifications_enabled: boolean
}

export async function getProfile(organizationId: string, userUuid: string, token: string): Promise<ProfileResponse | null> {
  const response = await fetch(
    API_ENDPOINTS.profiles.get(organizationId, userUuid),
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Failed to fetch profile')
  }

  return response.json()
}

export async function createProfile(profileData: CreateProfileData, token: string): Promise<ProfileResponse> {
  const payload = {
    id: profileData.user_uuid,
    username: profileData.username,
    email: `${profileData.username}@example.com`,
    organization_id: profileData.organization_id,
    picture_url: profileData.picture_url
  }   
  const response = await fetch(
    API_ENDPOINTS.profiles.list(profileData.organization_id),
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to create profile')
  }

  // delete profile cookies
//   await removeServerCookie('profile-username')
//   await removeServerCookie('profile-email')
//   await removeServerCookie('profile-picture')
//   await removeServerCookie('profile-first-name')
//   await removeServerCookie('profile-last-name')
//   await removeServerCookie('profile-bio')
//   await removeServerCookie('profile-timezone')

  return response.json()
}

export async function getOrCreateProfile(organizationId: string, userUuid: string, username: string, token: string): Promise<ProfileResponse> {
  const profile = await getProfile(organizationId, userUuid, token)
  if (!profile) {
    return await createProfile({ user_uuid: userUuid, username, email: `${username}@example.com`, picture_url: 'https://placeholder.com/user.png', organization_id: organizationId }, token)
  }
  return profile
}