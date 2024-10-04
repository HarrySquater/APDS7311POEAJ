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
    await signup(fullName, idNumber, accountNumber, password)

    if (response.ok) {
        //reidrect to login once registered
        navigate('/login')
      }
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
        Register
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
              type='text'
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </label>
          <br />
          <label>
            ID Number:
            <input
              type='text'
              onChange={(e) => setIdNumber(e.target.value)}
              value={idNumber}
            />
          </label>
          <br />
          <label>
            Account Number:
            <input
              type='text'
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
          <button type='button' onClick={handleSignup} disabled={isLoading}>
            Register
          </button>
          {error && <div className='error'>{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Register
