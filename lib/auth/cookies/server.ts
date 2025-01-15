'use server'

import { cookies } from 'next/headers'

export async function getServerCookie(name: string) {
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value
}

export async function removeServerCookie(name: string) {
  const cookieStore = await cookies()
  cookieStore.delete(name)
}

// Access token specific functions
export async function getAccessToken() {
  return getServerCookie('access-token')
}

export async function removeAccessToken() {
  return removeServerCookie('access-token')
}

interface AuthCookies {
  accessToken: string
  userUuid: string
  organizationId?: string
  organizationName?: string
}

interface Profile {
  username: string
  email: string
  picture_url: string
  first_name: string
  last_name: string
  bio: string
  timezone: string
}

// Sets all cookies related to authentication and users profile
export async function setAuthCookies({
  accessToken,
  userUuid,
  organizationId,
  organizationName
}: AuthCookies) {
  const cookieStore = await cookies()
  
  cookieStore.set('access-token', accessToken, {
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

  if (organizationId) {
    cookieStore.set('organization-id', organizationId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
  }

  if (organizationName) {
    cookieStore.set('organization-name', organizationName, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
  }
}

export async function setProfileCookies({username, email, picture_url, first_name, last_name, bio, timezone}: Profile) {
  const cookieStore = await cookies()
  cookieStore.set('profile-username', username, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.set('profile-email', email, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.set('profile-picture-url', picture_url, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.set('profile-first-name', first_name, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.set('profile-last-name', last_name, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.set('profile-bio', bio, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.set('profile-timezone', timezone, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export async function clearProfileCookies() {
  await removeServerCookie('profile-username')
  await removeServerCookie('profile-email')
  await removeServerCookie('profile-picture')
  await removeServerCookie('profile-first-name')
  await removeServerCookie('profile-last-name')
  await removeServerCookie('profile-bio')
  await removeServerCookie('profile-timezone')
}