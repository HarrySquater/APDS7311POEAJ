import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

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
    <div>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '50px',
        }}
      >
        Login
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          marginTop: '50px',
        }}
      >
        <form onSubmit={handleLogin}>
          <label style={{ marginBottom: '5px' }}>
            Full Name:
            <input
              style={{ width: '450px', marginBottom: '15px' }}
              type='text'
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </label>
          <br />
          <label style={{ marginBottom: '5px' }}>
            Account Number:
            <input
              style={{ width: '450px', marginBottom: '15px' }}
              type='text'
              onChange={(e) => setAccountNumber(e.target.value)}
              value={accountNumber}
            />
          </label>
          <br />
          <label style={{ marginBottom: '5px' }}>
            Password:
            <input
              style={{ width: '450px', marginBottom: '15px' }}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant='contained'
              style={{ width: '250px' }}
              type='submit'
              disabled={isLoading}
            >
              Login
            </Button>
          </div>
          {error && <div className='error'>{error}</div>}
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <span>
              Not registered? <Link to='/Register'>Register here</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
