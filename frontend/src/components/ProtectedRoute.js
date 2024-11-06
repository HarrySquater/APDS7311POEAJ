import { useAuthenticationContext } from '../hooks/useAuthenticationContext'
import { Navigate } from 'react-router-dom'
import { useAdminAuthenticationContext } from '../hooks/useAdminAuthenticationContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthenticationContext()
  const { admin } = useAdminAuthenticationContext()

  if (!user) {
    //redirect to login if the user is not authenticated
    return <Navigate to='/' />
  }

  if (!admin) {
    //redirect to login if the user is not authenticated
    return <Navigate to='/AdminLogin' />
  }

  return children
}

export default ProtectedRoute
