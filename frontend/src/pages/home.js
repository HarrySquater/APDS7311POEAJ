import React from 'react'
import { useLogout } from '../hooks/useLogout'
import Button from '@mui/material/Button'

function Home() {
  const { logout } = useLogout()

  const handleLogout = async () => {
    await logout()
    window.location.reload()
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      <Button
        variant='contained'
        style={{ width: '250px' }}
        onClick={handleLogout}
      >
        Logout
      </Button>
      <h1
        style={{
          alignSelf: 'center',
          fontSize: '50px',
        }}
      >
        Home
      </h1>
    </div>
  )
}

export default Home
