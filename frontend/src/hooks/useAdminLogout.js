import { useAdminAuthenticationContext } from './useAdminAuthenticationContext'
import { useState } from 'react'

export const useAdminLogout = () => {
  const { dispatch } = useAdminAuthenticationContext()
  const [setCsrfToken] = useState(null)

  //function to refresh csrf token
  const refreshCsrfToken = async () => {
    const response = await fetch('/api/csrf-token')
    const data = await response.json()
    setCsrfToken(data.csrfToken)
  }

  const adminLogout = async () => {
    const response = await fetch('/api/admin/adminlogout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      localStorage.removeItem('admin')

      dispatch({ type: 'ADMINLOGOUT' })
      await refreshCsrfToken() //refresh csrf token
    } else {
      console.error('Failed to log out')
    }
  }

  return { adminLogout }
}
