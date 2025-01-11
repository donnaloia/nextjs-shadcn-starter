export const EXTERNAL_URLS = {
  EMAIL_CAMPAIGN_SERVICE: process.env.EMAIL_CAMPAIGN_SERVICE_URL || 'http://localhost:8080/api/v1',
  AUTHENTICATION_SERVICE: process.env.AUTHENTICATION_SERVICE_URL || 'http://localhost:8081',
  PERMISSIONS_SERVICE: process.env.PERMISSIONS_SERVICE_URL || 'http://localhost:8082',
} as const

// Type safe way to access the external URLs
export type ExternalUrlKeys = keyof typeof EXTERNAL_URLS