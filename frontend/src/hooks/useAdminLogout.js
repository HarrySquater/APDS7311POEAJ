import { useAdminAuthenticationContext } from './useAdminAuthenticationContext'

export const useAdminLogout = () => {
  const { dispatch } = useAdminAuthenticationContext()

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
    } else {
      console.error('Failed to log out')
    }
  }

  return { adminLogout }
}
