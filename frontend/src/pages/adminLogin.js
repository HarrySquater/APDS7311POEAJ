import { useState } from 'react'
import { useAdminLogin } from '../hooks/useAdminLogin'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import '../CSS/AdminLogin.css'
import ReCAPTCHA from 'react-google-recaptcha'

const AdminLogin = () => {
  const [idNumber, setIdNumber] = useState('')
  const [password, setPassword] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const { adminLogin, isLoading, error } = useAdminLogin()
  const navigate = useNavigate()

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    const response = await adminLogin(idNumber, password, recaptchaToken)
    if (response.ok) {
      navigate('/AdminDashboard')
    }
  }

  const onRecaptchaChange = (value) => {
    setRecaptchaToken(value) //store captcha token
  }

  return (
    <div className='admin-login-container'>
      <div className='admin-login-card'>
        <h1 className='admin-login-title'>Login</h1>
        <form onSubmit={handleAdminLogin} className='admin-login-form'>
          <label className='admin-login-label'>
            ID Number:
            <input
              className='admin-login-input'
              type='text'
              onChange={(e) => setIdNumber(e.target.value)}
              value={idNumber}
            />
          </label>
          <label className='admin-login-label'>
            Password:
            <input
              className='admin-login-input'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={onRecaptchaChange}
          />
          <div className='admin-login-button-container'>
            <Button
              variant='contained'
              className='admin-login-button'
              type='submit'
              disabled={isLoading}
            >
              Login
            </Button>
          </div>
          {error && <div className='error'>{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
