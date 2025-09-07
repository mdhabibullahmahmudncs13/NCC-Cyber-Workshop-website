'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { authService, databaseService } from '@/lib/appwrite'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      console.log('AuthProvider: Checking authentication...')
      const currentUser = await authService.getCurrentUser()
      console.log('AuthProvider: Current user from Appwrite:', currentUser)
      
      if (currentUser) {
        console.log('AuthProvider: Fetching user data from database...')
        const userData = await databaseService.getUser(currentUser.$id)
        console.log('AuthProvider: User data from database:', userData)
        setUser(userData as unknown as User)
      } else {
        console.log('AuthProvider: No current user found')
        setUser(null)
      }
    } catch (error) {
      console.error('AuthProvider: Auth check failed:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthProvider: Starting login for:', email)
      await authService.login(email, password)
      console.log('AuthProvider: Login successful, checking auth...')
      await checkAuth()
      console.log('AuthProvider: Auth check complete, user:', user)
    } catch (error) {
      console.error('AuthProvider: Login failed:', error)
      throw error
    }
  }

  const register = async (userData: any) => {
    try {
      console.log('AuthProvider: Starting registration for:', userData.email)
      const newAccount = await authService.createAccount(
        userData.email,
        userData.password,
        userData.name
      )
      console.log('AuthProvider: Account created:', newAccount.$id)
      
      // Automatically login the user after account creation
      console.log('AuthProvider: Auto-logging in user after registration...')
      await authService.login(userData.email, userData.password)
      console.log('AuthProvider: Auto-login successful')
      
      // Create user document in database
      const userDoc = {
        $id: newAccount.$id,
        name: userData.name,
        email: userData.email,
        student_id: userData.student_id,
        phone: userData.phone,
        institution: userData.institution,
        role: 'user',
        registration_status: 'pending',
      }
      
      console.log('AuthProvider: Creating user document...')
      await databaseService.createUser(userDoc)
      console.log('AuthProvider: User document created')
      
      // Send email verification (optional, don't block on this)
      try {
        console.log('AuthProvider: Sending email verification...')
        await authService.sendEmailVerification()
        console.log('AuthProvider: Email verification sent')
      } catch (emailError) {
        console.warn('AuthProvider: Email verification failed, but continuing:', emailError)
      }
      
      console.log('AuthProvider: Checking auth after registration...')
      await checkAuth()
      console.log('AuthProvider: Registration complete, user:', user)
    } catch (error) {
      console.error('AuthProvider: Registration failed:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!user) throw new Error('No user logged in')
      
      const updatedUser = await databaseService.updateUser(user.$id, userData)
      setUser(updatedUser as unknown as User)
    } catch (error) {
      console.error('Update user failed:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
