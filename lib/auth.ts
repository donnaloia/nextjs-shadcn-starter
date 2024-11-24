export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access-token')
  }
  return null
}

export const setAccessToken = (token: string) => {
  localStorage.setItem('access-token', token)
}

export const removeAccessToken = () => {
  localStorage.removeItem('access-token')
} 