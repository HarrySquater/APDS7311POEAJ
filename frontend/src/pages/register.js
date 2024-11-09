import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { useNavigate } from 'react-router-dom'
import '../CSS/Register.css'

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
    <div className='register-container'>
      <div className='register-card'>
        <h1 className='register-title'>Register</h1>
        <form onSubmit={handleSignup} className='register-form'>
          <label className='register-label'>
            Full Name:
            <input
              className='register-input'
              type='text'
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </label>
          <label className='register-label'>
            ID Number:
            <input
              className='register-input'
              type='text'
              onChange={(e) => setIdNumber(e.target.value)}
              value={idNumber}
            />
          </label>
          <label className='register-label'>
            Account Number:
            <input
              className='register-input'
              type='text'
              onChange={(e) => setAccountNumber(e.target.value)}
              value={accountNumber}
            />
          </label>
          <label className='register-label'>
            Password:
            <input
              className='register-input'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <div className='register-button-container'>
            <button
              className='register-button'
              type='submit'
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
