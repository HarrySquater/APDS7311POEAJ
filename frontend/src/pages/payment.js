import React, { useState } from 'react'
import { useLogout } from '../hooks/useLogout'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { usePayment } from '../hooks/usePayment'

const Payment = () => {
  const { logout } = useLogout()
  const { createPayment, error, isLoading, message, messageType } = usePayment()
  const [paymentAmount, setPaymentAmount] = useState('')
  const [currencyType, setCurrencyType] = useState('')
  const [bankProvider, setBankProvider] = useState('')
  const [swiftAccount, setSwiftAccount] = useState('')
  const [swiftCode, setSwiftCode] = useState('')
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    window.location.reload()
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()

    const paymentData = {
      paymentAmount,
      currencyType,
      bankProvider,
      swiftAccount,
      swiftCode,
    }

    const response = await createPayment(paymentData)

    if (response.ok) {
      setPaymentAmount('')
      setCurrencyType('')
      setBankProvider('')
      setSwiftAccount('')
      setSwiftCode('')
      navigate('/Payment')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          style={{ width: '250px' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '50px',
        }}
      >
        Home
      </h1>
      {message && (
        <div
          style={{
            color: messageType === 'error' ? 'red' : 'green',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '30px',
          }}
        >
          {message}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          marginTop: '50px',
        }}
      >
        <form onSubmit={handlePaymentSubmit}>
          <label style={{ marginBottom: '5px' }}>
            Payment Amount:
            <input
              style={{ width: '450px', marginBottom: '15px' }}
              type='number'
              onChange={(e) => setPaymentAmount(e.target.value)}
              value={paymentAmount}
              required
            />
          </label>
          <br />
          <label style={{ marginBottom: '5px' }}>
            Currency Type:
            <input
              style={{ width: '450px', marginBottom: '15px' }}
              type='text'
              onChange={(e) => setCurrencyType(e.target.value)}
              value={currencyType}
              required
            />
          </label>
          <br />
          <label style={{ marginBottom: '5px' }}>
            Bank Provider:
            <input
              style={{ width: '450px', marginBottom: '15px' }}
              type='text'
              onChange={(e) => setBankProvider(e.target.value)}
              value={bankProvider}
              required
            />
          </label>
          <br />
          <label style={{ marginBottom: '5px' }}>
            Swift Account:
            <input
              style={{ width: '450px', marginBottom: '15px' }}
              type='text'
              onChange={(e) => setSwiftAccount(e.target.value)}
              value={swiftAccount}
              required
            />
          </label>
          <br />
          <label style={{ marginBottom: '5px' }}>
            Swift Code:
            <input
              style={{ width: '450px', marginBottom: '15px' }}
              type='text'
              onChange={(e) => setSwiftCode(e.target.value)}
              value={swiftCode}
              required
            />
          </label>
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <Button
              variant='contained'
              style={{ width: '250px', marginRight: '10px' }}
              type='submit'
              disabled={isLoading}
            >
              Pay Now
            </Button>
          </div>
          {error && <div className='error'>{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Payment
