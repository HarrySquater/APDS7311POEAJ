import { useState } from 'react'
import { useAdminLogin } from '../hooks/useAdminLogin'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import '../CSS/AdminLogin.css'

const AdminLogin = () => {
  const [idNumber, setIdNumber] = useState('')
  const [password, setPassword] = useState('')
  const { adminLogin, isLoading, error } = useAdminLogin()
  const navigate = useNavigate()

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    const response = await adminLogin(idNumber, password)
    if (response.ok) {
      navigate('/AdminDashboard')
    }
  }

  return (
    <div className="admin-login-container">
      <h1 className="admin-login-title">Login</h1>
      <div className="admin-login-form-container">
        <form onSubmit={handleAdminLogin}>
          <label className="admin-login-label">
            ID Number:
            <input
              className="admin-login-input"
              type="text"
              onChange={(e) => setIdNumber(e.target.value)}
              value={idNumber}
            />
          </label>
          <br />
          <label className="admin-login-label">
            Password:
            <input
              className="admin-login-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <br />
          <div className="admin-login-button-container">
            <Button
              variant="contained"
              className="admin-login-button"
              type="submit"
              disabled={isLoading}
            >
              Login
            </Button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
