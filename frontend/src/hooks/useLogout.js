import { useAuthenticationContext } from './useAuthenticationContext'
import { useState } from 'react'

export const useLogout = () => {
  const { dispatch } = useAuthenticationContext()
  const [setCsrfToken] = useState(null)

  //function to refresh cstftoken
  const refreshCsrfToken = async () => {
    const response = await fetch('/api/csrf-token')
    const data = await response.json()
    setCsrfToken(data.csrfToken)
  }

  const logout = async () => {
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      localStorage.removeItem('user')
      dispatch({ type: 'LOGOUT' })
      await refreshCsrfToken() //refresh csrf token
    } else {
      console.error('Failed to log out')
    }
  }

  return { logout }
}
