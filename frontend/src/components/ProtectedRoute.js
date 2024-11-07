import { useAuthenticationContext } from '../hooks/useAuthenticationContext'
import { Navigate } from 'react-router-dom'
import { useAdminAuthenticationContext } from '../hooks/useAdminAuthenticationContext'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user } = useAuthenticationContext()
  const { admin } = useAdminAuthenticationContext()

  if (!user || (requireAdmin && !admin)) {
    // Redirect to login if the user is not authenticated or admin if required
    return <Navigate to='/' />
  }

  return children
}

export default ProtectedRoute
