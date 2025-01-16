import { NextResponse } from 'next/server'
import { getServerCookie } from '../cookies/server'
import { getPermissions } from '../api/permissions-api'

export async function checkOrganizationAccess(organizationId: string | Promise<boolean>) {
  // Early return if organizationId is undefined or invalid
  if (!organizationId || organizationId === 'undefined') {
    console.log('Invalid organization ID:', organizationId)
    return false
  }

  const accessToken = await getServerCookie('access-token')
  const userUuid = await getServerCookie('user-uuid')

  if (!accessToken || !userUuid) {
    return false
  }

  try {
    const permissions = await getPermissions(userUuid, accessToken)
    return permissions.organizations.some(org => org.name === organizationId)
  } catch (error) {
    console.error('Error checking organization access:', error)
    return false
  }
} 