import { useAuthenticationContext } from '../hooks/useAuthenticationContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthenticationContext()

  if (!user) {
    return <Navigate to='/' />
  }

  return children
}

export default ProtectedRoute
