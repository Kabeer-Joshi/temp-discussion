// lib/auth.ts
import { User } from '@/context/auth'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

export  function getDecodedUser() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access_token')

  if (!accessToken) {
    return null
  }

  try {
    // Decode the JWT token to get user data
    const decoded = jwtDecode(accessToken.value)
    return decoded as User
  } catch {
    return null
  }
}