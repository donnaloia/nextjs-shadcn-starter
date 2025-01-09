'use server'

interface RegistrationData {
  username: string
  password: string
  email: string
}

interface UserResponse {
  id: string
}

const AUTHENTICATION_SERVICE_URL = process.env.AUTHENTICATION_SERVICE_URL || 'http://localhost:8081'
const PERMISSIONS_SERVICE_URL = process.env.PERMISSIONS_SERVICE_URL || 'http://localhost:8000'

export async function registerUser(organizationId: string, data: RegistrationData) {
  try {
    // First, register the user
    const userResponse = await fetch(`${AUTHENTICATION_SERVICE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!userResponse.ok) {
      throw new Error('User registration failed')
    }

    let user: UserResponse
    try {
      user = await userResponse.json()
    } catch (e) {
      throw new Error('Invalid response from registration server')
    }

    if (!user.id) {
      throw new Error('Invalid user data received')
    }

    // Then, set up initial permissions
    const permissionsResponse = await fetch(`${PERMISSIONS_SERVICE_URL}/api/permissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      throw new Error('Permissions setup failed')
    }

    return { success: true, user }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed'
    }
  }
} 