import { useState, useEffect } from 'react'
import { useAuthenticationContext } from './useAuthenticationContext'

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthenticationContext()
  const [csrfToken, setCsrfToken] = useState(null)

  //fetch csrf
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf-token')
        const data = await response.json()
        setCsrfToken(data.csrfToken)
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error)
      }
    }
    fetchCsrfToken()
  }, [])

  const logout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken,
        },
      })

      const json = await response.json()

      if (response.ok) {
        // Successfully logged out
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
        window.location.href = '/'
      } else {
        setError(json.error || 'Failed to log out')
      }
    } catch (error) {
      setError('An error occurred during logout')
      console.error('Error during logout:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { logout, isLoading, error }
}
