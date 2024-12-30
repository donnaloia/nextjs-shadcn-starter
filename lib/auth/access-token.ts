"use server"

import { cookies } from "next/headers"

export async function removeAccessToken() {
    const cookieStore = await cookies()
    cookieStore.delete('access-token')
}
  