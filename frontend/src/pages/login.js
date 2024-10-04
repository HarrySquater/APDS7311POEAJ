import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
  const [fullName, setFullName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useLogin()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(fullName, accountNumber, password)
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
        <form>
          <label>
            Full Name:
            <input
              style={{ width: '450px' }}
              type='fullName'
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </label>
          <br />
          <label>
            Account Number:
            <input
              style={{ width: '450px' }}
              type='accountNumber'
              onChange={(e) => setAccountNumber(e.target.value)}
              value={accountNumber}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              style={{ width: '450px' }}
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
            <button
              style={{
                width: '250px',
              }}
              type='button'
              onClick={handleLogin}
              disabled={isLoading}
            >
              Login
            </button>
          </div>
          {error && <div className='error'>{error}</div>}
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <span>
              Not registered? <Link to='/register'>Register here</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
