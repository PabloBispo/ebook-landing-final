'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'

// Types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  emailVerified?: Date
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (data: RegisterData) => Promise<void>
  refreshUser: () => Promise<void>
}

export interface RegisterData {
  name: string
  email: string
  phone?: string
}

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState)

  // Check for existing session on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // TODO: Implement actual auth check when backend is ready
      // const response = await fetch('/api/auth/me')
      // if (response.ok) {
      //   const user = await response.json()
      //   setState({ user, isLoading: false, isAuthenticated: true })
      // } else {
      //   setState({ user: null, isLoading: false, isAuthenticated: false })
      // }

      // For now, just set loading to false
      setState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      console.error('Auth check failed:', error)
      setState({ user: null, isLoading: false, isAuthenticated: false })
    }
  }

  const login = useCallback(async (email: string, _password: string) => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      // TODO: Implement actual login when backend is ready
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // })

      // For now, simulate login
      console.log('Login attempt:', email)
      throw new Error('Login não implementado ainda')
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }))
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      // TODO: Implement actual logout when backend is ready
      // await fetch('/api/auth/logout', { method: 'POST' })

      setState({ user: null, isLoading: false, isAuthenticated: false })
    } catch (error) {
      console.error('Logout failed:', error)
      setState(prev => ({ ...prev, isLoading: false }))
      throw error
    }
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      // TODO: Implement actual registration when backend is ready
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })

      console.log('Register attempt:', data)
      throw new Error('Registro não implementado ainda')
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }))
      throw error
    }
  }, [])

  const refreshUser = useCallback(async () => {
    await checkAuth()
  }, [])

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    register,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

// Utility hook for protected routes
export function useRequireAuth(redirectTo = '/login') {
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // TODO: Implement redirect when router is available
      console.log('User not authenticated, would redirect to:', redirectTo)
    }
  }, [isAuthenticated, isLoading, redirectTo])

  return { isAuthenticated, isLoading }
}
