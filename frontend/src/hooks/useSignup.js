import { useState, useEffect } from 'react'
import { useAuthenticationContext } from './useAuthenticationContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthenticationContext()
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

  const signup = async (fullName, idNumber, accountNumber, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ fullName, idNumber, accountNumber, password }),
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
    }
    return response
  }

  return { signup, isLoading, error }
}
