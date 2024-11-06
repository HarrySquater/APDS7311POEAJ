import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [isLoading] = React.useState(false)

  const handleAdminNavigation = async (e) => {
    e.preventDefault()
    navigate('/adminlogin')
  }

  const handleUserNavigation = async (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1
        style={{
          fontSize: '50px',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Please Select Your Role
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Button
          variant='contained'
          style={{ width: '250px', backgroundColor: '#007bff', color: '#fff' }}
          disabled={isLoading}
          onClick={handleUserNavigation}
        >
          User
        </Button>
        <Button
          variant='contained'
          style={{ width: '250px', backgroundColor: '#007bff', color: '#fff' }}
          disabled={isLoading}
          onClick={handleAdminNavigation}
        >
          Banker
        </Button>
      </div>
    </div>
  )
}

export default Home
