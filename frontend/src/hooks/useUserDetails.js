// src/hooks/useUserDetails.js
import { useState, useEffect } from 'react'

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [csrfToken, setCsrfToken] = useState(null)

  useEffect(() => {
    //fetch token
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

  //fetch user by id
  const fetchUserDetails = async (userId) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'CSRF-Token': csrfToken,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to load user details')
      }

      const userData = await response.json()
      setUserDetails(userData)
      setMessage('User details loaded successfully')
      setIsLoading(false)
      return { ok: true, user: userData }
    } catch (error) {
      setMessage(error.message)
      setError(error.message)
      setIsLoading(false)
      return { ok: false }
    }
  }

  return {
    fetchUserDetails,
    userDetails,
    error,
    isLoading,
    message,
  }
}
