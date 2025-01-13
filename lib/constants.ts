// Variables for API endpoints
export const API_BASE_URLS = {
    auth: 'http://localhost:8081',
    profiles: 'http://localhost:8080',
    permissions: 'http://localhost:8000',
  } as const
  
export const API_ENDPOINTS = {
    login: `${API_BASE_URLS.auth}/login`,
    profiles: (orgId: string) => `${API_BASE_URLS.profiles}/api/v1/organizations/${orgId}/profiles`,
    permissions: (userId: string) => `${API_BASE_URLS.permissions}/api/permissions/${userId}`,
  } as const