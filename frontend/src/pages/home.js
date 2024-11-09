import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import '../CSS/Home.css'

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
    <div className='home-container'>
      <div className='home-card'>
        <h1 className='home-title'>Please Select Your Role</h1>
        <div className='button-container'>
          <Button
            variant='contained'
            className='home-button'
            disabled={isLoading}
            onClick={handleUserNavigation}
          >
            User
          </Button>
          <Button
            variant='contained'
            className='home-button'
            disabled={isLoading}
            onClick={handleAdminNavigation}
          >
            Banker
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
