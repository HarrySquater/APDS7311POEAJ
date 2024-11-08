import { useAuthenticationContext } from './useAuthenticationContext'

export const useLogout = () => {
  const { dispatch } = useAuthenticationContext()

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
    } else {
      console.error('Failed to log out')
    }
  }

  return { logout }
}
