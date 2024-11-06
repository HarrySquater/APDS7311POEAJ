import { useState } from 'react'
import { useAdminLogin } from '../hooks/useAdminLogin'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

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
        <form onSubmit={handleAdminLogin}>
          <label style={{ marginBottom: '5px' }}>
            ID Number:
            <input
              style={{ width: '450px', marginBottom: '15px' }}
              type='text'
              onChange={(e) => setIdNumber(e.target.value)}
              value={idNumber}
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
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
