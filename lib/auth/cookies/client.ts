'use client'

import Cookies from 'js-cookie'

export function getClientCookie(name: string) {
  if (typeof window === 'undefined') return null
  return Cookies.get(name)
}

export function removeClientCookie(name: string) {
  if (typeof window === 'undefined') return
  Cookies.remove(name)
}

// Access token specific functions
export function getAccessToken() {
  return getClientCookie('access-token')
}

export function removeAccessToken() {
  console.log('Removing access token')
  if (typeof window !== 'undefined') {
    Cookies.remove('access-token', { path: '/' })
    console.log('Access token after removal:', Cookies.get('access-token'))
  }
} 