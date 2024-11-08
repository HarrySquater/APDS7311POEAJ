import { useState, useEffect } from 'react'
import { useAdminAuthenticationContext } from './useAdminAuthenticationContext'

export const useAdminLogout = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAdminAuthenticationContext()
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

  const adminLogout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/logoutadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken,
        },
      })

      const json = await response.json()

      if (response.ok) {
        // Successfully logged out
        localStorage.removeItem('admin')
        dispatch({ type: 'ADMINLOGOUT' })
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

  return { adminLogout, isLoading, error }
}
