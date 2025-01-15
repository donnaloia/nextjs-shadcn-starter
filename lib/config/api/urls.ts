export const API_BASE_URLS = {
  AUTH: process.env.AUTHENTICATION_SERVICE_URL || 'http://localhost:8081',
  EMAIL_CAMPAIGN: process.env.EMAIL_CAMPAIGN_SERVICE_URL || 'http://localhost:8080',
  PERMISSIONS: process.env.PERMISSIONS_SERVICE_URL || 'http://localhost:8000',
} as const 