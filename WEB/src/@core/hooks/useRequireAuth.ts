import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/authContext'

export const useRequireAuth = () => {
  const { isLoggedIn, accessPermission, getToken } = useAuth()
  const router = useRouter()

  const hasPermission = useCallback(
    async (linkControl?: string, action?: string) => {
      if (!isLoggedIn) {
        console.log('User is not logged in')
        router.push('/login')

        return false
      }

      if (!linkControl || !action) {
        console.log('linkControl or action is undefined, assuming permission granted')

        return true
      }

      console.log('Checking permission for:', linkControl, action)
      try {
        return await accessPermission(linkControl, action)
      } catch (error) {
        console.error('Error checking permission:', error)

        return false
      }
    },
    [isLoggedIn, accessPermission, router]
  )

  const getAuthToken = useCallback(() => {
    return getToken()
  }, [getToken])

  return { isLoggedIn, hasPermission, getAuthToken }
}
