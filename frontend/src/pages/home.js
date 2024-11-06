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
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Button
        variant='contained'
        style={{ width: '250px', marginBottom: '20px' }}
        disabled={isLoading}
        onClick={handleUserNavigation}
      >
        User
      </Button>
      <Button
        variant='contained'
        style={{ width: '250px' }}
        disabled={isLoading}
        onClick={handleAdminNavigation}
      >
        Banker
      </Button>
    </div>
  )
}

export default Home
