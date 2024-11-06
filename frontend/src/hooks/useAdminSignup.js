import { useState, useEffect } from 'react'
import { useAdminAuthenticationContext } from './useAdminAuthenticationContext'

export const useAdminSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAdminAuthenticationContext()
  const [csrfToken, setCsrfToken] = useState(null)

  useEffect(() => {
    //fetching the CSRF token
    const fetchCsrfToken = async () => {
      const response = await fetch('/api/csrf-token')
      const data = await response.json()
      setCsrfToken(data.csrfToken)
    }
    fetchCsrfToken()
  }, [])

  const adminSignup = async (idNumber, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('api/admin/adminsignup', {
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
    }
    return response
  }

  return { adminSignup, isLoading, error }
}
