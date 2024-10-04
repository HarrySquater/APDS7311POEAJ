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
        }}
      >
        Login
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <form>
          <label>
            Full Name:
            <input
              type='fullName'
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </label>
          <br />
          <label>
            Account Number:
            <input
              type='accountNumber'
              onChange={(e) => setAccountNumber(e.target.value)}
              value={accountNumber}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <br />
          <button type='button' onClick={handleLogin} disabled={isLoading}>
            Login
          </button>
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
