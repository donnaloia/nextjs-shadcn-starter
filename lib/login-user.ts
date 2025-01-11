'use server'

import { cookies } from "next/headers"
import { getPermissions } from "./auth/permissions"
import { getOrCreateProfile } from "./auth/authentication"
import { extractUuidFromToken } from "./auth/cookies"


interface LoginResponse {
    access_token: string
  }

const AUTHENTICATION_SERVICE_URL = process.env.AUTHENTICATION_SERVICE_URL || 'http://localhost:8081'

export async function loginUser(username: string, password: string) {
    try {
      const response = await fetch(`${AUTHENTICATION_SERVICE_URL}/login/`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      if (!response.ok) {
        const errorText = await response.text()
        switch (response.status) {
          case 401:
            throw new Error('Invalid username or password')
          case 403:
            throw new Error('Account is locked. Please contact support')
          case 505:
            throw new Error('Authentication server error. Please try again later')
          default:
            throw new Error(`Failed to reach authentication server. Please try again later`)
        }
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