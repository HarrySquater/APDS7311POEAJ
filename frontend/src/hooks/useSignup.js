import { useState } from 'react'
import { useAuthenticationContext } from './useAuthenticationContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthenticationContext()

  const signup = async (fullName, idNumber, accountNumber, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, idNumber, accountNumber, password }),
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setIsLoading(false)
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({ type: 'LOGIN', payload: json })
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
