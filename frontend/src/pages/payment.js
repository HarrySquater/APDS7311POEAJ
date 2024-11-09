import React, { useState } from 'react'
import { useLogout } from '../hooks/useLogout'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { usePayment } from '../hooks/usePayment'
import '../CSS/Payment.css'

const Payment = () => {
  const { logout } = useLogout()
  const { createPayment, isLoading, message, messageType } = usePayment()
  const [paymentAmount, setPaymentAmount] = useState('')
  const [currencyType, setCurrencyType] = useState('')
  const [bankProvider, setBankProvider] = useState('')
  const [swiftAccount, setSwiftAccount] = useState('')
  const [swiftCode, setSwiftCode] = useState('')
  const navigate = useNavigate()

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
    <div className='payment-container'>
      <div className='logout-button-container'>
        <Button variant='contained' className='logout-button' onClick={logout}>
          Logout
        </Button>
      </div>
      {message && (
        <div
          className={`message ${
            messageType === 'error' ? 'error-message' : 'success-message'
          }`}
        >
          {message}
        </div>
      )}
      <div className='payment-form-container'>
        <h1 className='payment-title'>Payment Portal</h1>
        <br></br>
        <form onSubmit={handlePaymentSubmit}>
          <label className='payment-label'>
            Payment Amount:
            <input
              className='payment-input'
              type='number'
              onChange={(e) => setPaymentAmount(e.target.value)}
              value={paymentAmount}
              required
            />
          </label>
          <br />
          <label className='payment-label'>
            Currency Type:
            <input
              className='payment-input'
              type='text'
              onChange={(e) => setCurrencyType(e.target.value)}
              value={currencyType}
              required
            />
          </label>
          <br />
          <label className='payment-label'>
            Bank Provider:
            <input
              className='payment-input'
              type='text'
              onChange={(e) => setBankProvider(e.target.value)}
              value={bankProvider}
              required
            />
          </label>
          <br />
          <label className='payment-label'>
            Swift Account:
            <input
              className='payment-input'
              type='text'
              onChange={(e) => setSwiftAccount(e.target.value)}
              value={swiftAccount}
              required
            />
          </label>
          <br />
          <label className='payment-label'>
            Swift Code:
            <input
              className='payment-input'
              type='text'
              onChange={(e) => setSwiftCode(e.target.value)}
              value={swiftCode}
              required
            />
          </label>
          <br />
          <div className='payment-button-container'>
            <Button
              variant='contained'
              className='payment-button'
              type='submit'
              disabled={isLoading}
            >
              Pay Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Payment
