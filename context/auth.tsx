// context/auth.tsx
'use client'

import { createContext, useContext, useState } from 'react'

export interface User {
  username: string
  first_name: string
  user_type: 'admin' | 'user' | 'teacher'
  isVerified: boolean
  last_name: string
  // other fields from your token
}

interface AuthContextType {
  user: User | null
  updateUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ 
  children, 
  initialUser 
}: { 
  children: React.ReactNode
  initialUser: User | null 
}) {
  const [user, setUser] = useState<User | null>(initialUser)

  return (
    <AuthContext.Provider value={{
      user,
      updateUser: setUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}