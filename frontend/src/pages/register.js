import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading, error } = useSignup()
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    const response = await signup(fullName, idNumber, accountNumber, password)
    if (response.ok) {
      navigate('/')
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
        Register
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
              type='text'
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </label>
          <br />
          <label>
            ID Number:
            <input
              style={{ width: '450px' }}
              type='text'
              onChange={(e) => setIdNumber(e.target.value)}
              value={idNumber}
            />
          </label>
          <br />
          <label>
            Account Number:
            <input
              style={{ width: '450px' }}
              type='text'
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
              onClick={handleSignup}
              disabled={isLoading}
            >
              Register
            </button>
          </div>
          {error && <div className='error'>{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Register
