import { useState, useEffect } from 'react'
import { usePaymentsContext } from './usePaymentContext'

export const usePayment = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [csrfToken, setCsrfToken] = useState(null)
  const { dispatch } = usePaymentsContext()

  useEffect(() => {
    // fetching the CSRF token
    const fetchCsrfToken = async () => {
      const response = await fetch('/api/csrf-token')
      const data = await response.json()
      setCsrfToken(data.csrfToken)
    }
    fetchCsrfToken()
  }, [])

  const createPayment = async (paymentData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/createPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken,
        },
        body: JSON.stringify(paymentData),
      })

      if (!response.ok) {
        throw new Error('Payment failed, please ensure all fields are correct')
      }

      const payment = await response.json()
      dispatch({ type: 'CREATE_PAYMENT', payload: payment })

      setMessage('Payment successful')
      setMessageType('success')
      setIsLoading(false)
      return { ok: true, payment }
    } catch (error) {
      setMessage(error.message)
      setMessageType('error')
      setError(error.message)
      setIsLoading(false)
      return { ok: false }
    }
  }

  const getPayments = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/getPayments')

      if (!response.ok) {
        throw new Error('Failed to fetch payments')
      }

      const payments = await response.json()
      dispatch({ type: 'SET_PAYMENTS', payload: payments })

      setIsLoading(false)
      return { ok: true, payments }
    } catch (error) {
      setMessage(error.message)
      setMessageType('error')
      setError(error.message)
      setIsLoading(false)
      return { ok: false }
    }
  }

  return { createPayment, getPayments, error, isLoading, message, messageType }
}
