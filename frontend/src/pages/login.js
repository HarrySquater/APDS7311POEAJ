import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import '../CSS/Login.css'

const Login = () => {
  const [fullName, setFullName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useLogin()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const response = await login(fullName, accountNumber, password)
    if (response.ok) {
      navigate('/Payment')
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="login-form-wrapper">
        <form onSubmit={handleLogin} className="login-form">
          <label className="login-label">
            Full Name:
            <input
              className="login-input"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </label>
          <label className="login-label">
            Account Number:
            <input
              className="login-input"
              type="text"
              onChange={(e) => setAccountNumber(e.target.value)}
              value={accountNumber}
            />
          </label>
          <label className="login-label">
            Password:
            <input
              className="login-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <div className="login-button-wrapper">
            <Button
              variant="contained"
              className="login-button"
              type="submit"
              disabled={isLoading}
            >
              Login
            </Button>
          </div>
          {error && <div className="error">{error}</div>}
          <div className="register-link">
            <span>
              Not registered? <Link to="/Register">Register here</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
