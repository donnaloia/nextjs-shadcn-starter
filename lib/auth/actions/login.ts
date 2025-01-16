'use server'

import { cookies } from 'next/headers'
import { loginRequest } from '../api/authentication-api'
import { getOrCreateProfile } from '../api/profile-api'
import { getOrganizationName } from '../api/organization-api'
import { getPermissions } from '../api/permissions-api'
import { extractUuidFromToken } from '../utils/access-token'
import { clearProfileCookies, setAuthCookies, setProfileCookies } from '../cookies/server'

interface LoginResponse {
    access_token: string
  }

export async function loginUser(formData: FormData, organizationId: string) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  try {
    // Login and get tokens
    const loginResponse: LoginResponse = await loginRequest(username, password)
    const userUuid = extractUuidFromToken(loginResponse.access_token)

    // Clear profile cookies
    await clearProfileCookies()

    // Get user's permission and redirect to their first organization
    const permissions = await getPermissions(userUuid, loginResponse.access_token)

    if (!permissions.organizations || permissions.organizations.length === 0) {
        throw new Error('No organizations found for user')
    }

    const firstOrg = permissions.organizations[0].name
    const profile = await getOrCreateProfile(firstOrg, userUuid, username, loginResponse.access_token)

    // Get the organization name from email-campaign-service
    const organizationName = await getOrganizationName(firstOrg, loginResponse.access_token)
    
    // Set all auth cookies at once
    await setAuthCookies({
      accessToken: loginResponse.access_token,
      userUuid: userUuid,
      organizationId: firstOrg,   
      organizationName: organizationName
    })

    // Set profile cookies
    await setProfileCookies({
      username: profile.username,
      email: profile.email,
      picture_url: profile.picture_url,
      first_name: profile.first_name,
      last_name: profile.last_name,
      bio: profile.bio,
      timezone: profile.timezone
    })

    const redirectUrl = `/organization/${firstOrg}/campaigns`
    return { success: true, redirectUrl }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Login failed' }
  }
}
 