import { API_BASE_URLS } from './urls'

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URLS.AUTH}/login`,
    register: `${API_BASE_URLS.AUTH}/users`,
  },
  profiles: {
    list: (orgId: string) => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations/${orgId}/profiles`,
    get: (orgId: string, profileId: string) => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations/${orgId}/profiles/${profileId}`,
    update: (orgId: string, profileId: string) => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations/${orgId}/profiles/${profileId}`,
  },
  permissions: {
    get: (userId: string) => `${API_BASE_URLS.PERMISSIONS}/api/permissions/${userId}`,
    create: `${API_BASE_URLS.PERMISSIONS}/api/permissions`,
  },
  organizations: {
    list: () => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations`,
    get: (orgId: string) => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations/${orgId}`,
  },
  campaigns: {
    list: (orgId: string, page: number = 1) => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations/${orgId}/campaigns?page=${page}`,
    get: (orgId: string, campaignId: string) => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations/${orgId}/campaigns/${campaignId}`,
  },
  emailGroups: {
    list: (orgId: string, page: number = 1) => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations/${orgId}/email-groups?page=${page}`,
    get: (orgId: string, emailGroupId: string) => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations/${orgId}/email-groups/${emailGroupId}`,
  },
  emailAddresses: {
    list: (orgId: string, page: number = 1) => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations/${orgId}/email-addresses?page=${page}`,
    get: (orgId: string, emailAddressId: string) => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations/${orgId}/email-addresses/${emailAddressId}`,
  },
  templates: {
    list: (orgId: string, page: number = 1) => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations/${orgId}/templates?page=${page}`,
    get: (orgId: string, templateId: string) => `${API_BASE_URLS.EMAIL_CAMPAIGN}/api/v1/organizations/${orgId}/templates/${templateId}`,
  },
} as const
