import { useState, useEffect } from 'react'
import { useAuthenticationContext } from './useAuthenticationContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthenticationContext()
  const [csrfToken, setCsrfToken] = useState(null)

  //function to refresh csrf token
  const refreshCsrfToken = async () => {
    const response = await fetch('/api/csrf-token')
    const data = await response.json()
    setCsrfToken(data.csrfToken)
  }

  useEffect(() => {
    refreshCsrfToken()
  }, [])

  const login = async (fullName, accountNumber, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ fullName, accountNumber, password }),
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
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({ type: 'LOGIN', payload: json })
      setIsLoading(false)
      await refreshCsrfToken() //refresh csrf token
    }
    return response
  }
  return { login, isLoading, error }
}
