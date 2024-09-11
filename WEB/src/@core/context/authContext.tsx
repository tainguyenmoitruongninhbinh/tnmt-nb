import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import apiUrl from 'src/api/config'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'

interface AuthContextType {
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
  accessPermission: (linkControl: string, action: string) => Promise<boolean>
  getToken: () => string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('authToken')
    setIsLoggedIn(!!token)
  }, [])

  const login = (token: string) => {
    Cookies.set('authToken', token, { expires: 7 }) // Set cookie to expire in 7 days
    setIsLoggedIn(true)
  }

  const logout = () => {
    Cookies.remove('authToken')
    setIsLoggedIn(false)
    router.push('/login')
  }

  const accessPermission = async (linkControl: string, action: string): Promise<boolean> => {
    const token = Cookies.get('authToken')
    if (!token) return false

    const decodedToken = jwt_decode(token) as { [key: string]: any }
    const user = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']

    if (!user) return false

    try {
      const response = await axios.post(
        `${apiUrl}/Auth/check-access-permission`,
        {},
        {
          params: {
            userName: user,
            linkControl,
            action
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      return response.data // Adjust this based on your API response structure
    } catch (error) {
      console.error('Error checking access permission:', error)

      return false
    }
  }

  const getToken = () => {
    return Cookies.get('authToken') || null
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, accessPermission, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
