'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createEmailAddress(organizationId: string, formData: FormData) {
  const cookieStore = await cookies()
  const token = cookieStore.get('access-token')

  const response = await fetch(
    `http://localhost:8080/api/v1/organizations/${organizationId}/email-addresses`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: formData.get('name'),
      }),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to create email address')
  }

  redirect(`/organization/${organizationId}/email-addresses`)
} 