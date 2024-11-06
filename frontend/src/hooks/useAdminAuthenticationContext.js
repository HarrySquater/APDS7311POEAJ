import { AdminAuthenticationContext } from '../contexts/AdminAuthenticationContext'
import { useContext } from 'react'

export const useAdminAuthenticationContext = () => {
  const context = useContext(AdminAuthenticationContext)

  if (!context) {
    throw Error(
      'useAdminAuthenticationContext must be inside a AdminAuthenticationContextProvider'
    )
  }

  return context
}
