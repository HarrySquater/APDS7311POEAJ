import { useAuthenticationContext } from '../hooks/useAuthenticationContext'
import { useAdminAuthenticationContext } from '../hooks/useAdminAuthenticationContext'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user } = useAuthenticationContext()
  const { admin } = useAdminAuthenticationContext()

  if (requireAdmin && !admin) {
    return null
  }

  if (!requireAdmin && !user) {
    return null
  }

  if (requireAdmin && user) {
    return null
  }

  return children
}

export default ProtectedRoute
