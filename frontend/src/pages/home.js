import React from 'react'
import { useLogout } from '../hooks/useLogout'

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
      <button onClick={handleLogout}>Logout</button>
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
