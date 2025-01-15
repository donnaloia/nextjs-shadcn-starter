import { API_ENDPOINTS } from '@/lib/config/api/endpoints'

interface LoginResponse {
  access_token: string
  user_uuid: string
}

export async function loginRequest(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(API_ENDPOINTS.auth.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new Error('Invalid username or password')
      case 403:
        throw new Error('Account is locked. Please contact support')
      case 500:
        throw new Error('Authentication server error. Please try again later')
      default:
        throw new Error(`Failed to reach authentication server. Please try again later`)
    }
  }

  return response.json()
} 