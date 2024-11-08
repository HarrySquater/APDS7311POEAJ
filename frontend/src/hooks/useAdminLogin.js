import { useState, useEffect } from 'react'
import { useAdminAuthenticationContext } from './useAdminAuthenticationContext'

export const useAdminLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAdminAuthenticationContext()
  const [csrfToken, setCsrfToken] = useState(null)

  //fetch new csrf token
  const refreshCsrfToken = async () => {
    const response = await fetch('/api/csrf-token')
    const data = await response.json()
    setCsrfToken(data.csrfToken)
  }

  useEffect(() => {
    refreshCsrfToken()
  }, [])

  const adminLogin = async (idNumber, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('api/admin/loginAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ idNumber, password }),
    })

    const json = await response.json()

    if (response.status === 429) {
      setIsLoading(false)
      setError('Too many requests. Please try again later.')
      return { ok: false }
    }

    if (!response.ok) {
      setError(json.error)
      setIsLoading(false)
    }
    if (response.ok) {
      localStorage.setItem('admin', JSON.stringify(json))

      dispatch({ type: 'ADMINLOGIN', payload: json })

      setIsLoading(false)
      await refreshCsrfToken() //refresh token
    }
    return response
  }
  return { adminLogin, isLoading, error }
}
