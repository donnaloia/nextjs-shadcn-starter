'use client'

import { createContext, useContext, PropsWithChildren } from 'react'

// this file is used to create a context for the profile data
// the profile data is used to store the username, email, avatar, and organization name
// it is then made available to the entire application

interface ProfileData {
  username: string
  email: string
  avatar: string
  organizationName: string
}

const defaultProfileData: ProfileData = {
  username: '',
  email: '',
  avatar: '',
  organizationName: ''
}

export const ProfileContext = createContext<ProfileData>(defaultProfileData)

export function ProfileProvider({ children, value }: PropsWithChildren<{ value: ProfileData }>) {
  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext) 