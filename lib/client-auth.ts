'use client'



export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access-token')
  }
  return null
}
