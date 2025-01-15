'use server'

import { API_ENDPOINTS } from '@/lib/config/api/endpoints'

interface RegistrationData {
  username: string
  password: string
  email: string
}

interface UserResponse {
  id: string
}

export async function registerUser(organizationId: string, data: RegistrationData) {
  try {
    // Register user
    const userResponse = await fetch(API_ENDPOINTS.auth.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!userResponse.ok) {
      throw new Error('User registration failed')
    }

    const user: UserResponse = await userResponse.json()

    // Set up permissions
    const permissionsResponse = await fetch(API_ENDPOINTS.permissions.create, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_uuid: user.id,
        organizations: [{
          name: organizationId,
          applications: [{
            name: "test",
            services: [{
              name: "test",
              roles: ["test", "testf"]
            }]
          }]
        }]
      }),
    })

    if (!permissionsResponse.ok) {
      switch (permissionsResponse.status) {
        case 401:
          throw new Error('Session expired. Please login again')
        case 409:
          throw new Error('User Permissions already exist')
        case 404:
          throw new Error('No permissions found for user')
        case 500:
          throw new Error('Permissions server error. Please try again later')
        default:
          throw new Error('Failed to reach permissions server. Please try again later')
      }
    }

    return { success: true, user }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed'
    }
  }
} 