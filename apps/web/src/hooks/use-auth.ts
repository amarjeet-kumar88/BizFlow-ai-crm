import { useState, useCallback, useEffect } from 'react'
import { apiClient } from '@/services/api-client'

interface AuthUser {
  id: string
  email: string
  name: string
}

interface UseAuthReturn {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const profile: any = await apiClient.getProfile()
        setUser(profile?.user)
      } catch (err) {
        // User not authenticated
      }
    }
    checkAuth()
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await apiClient.login(email, password)
        setUser(response.data.user)
      } catch (err: any) {
        const message = err.message || 'Login failed'
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await apiClient.register(email, password, name)
        setUser(response.data.user)
      } catch (err: any) {
        const message = err.message || 'Registration failed'
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const logout = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await apiClient.logout()
      setUser(null)
    } catch (err: any) {
      const message = err.message || 'Logout failed'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  }
}
