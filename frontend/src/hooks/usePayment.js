import { useState } from 'react'
import { usePaymentsContext } from './usePaymentContext'

export const usePayment = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const { dispatch } = usePaymentsContext()

  const createPayment = async (paymentData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/createPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  return { createPayment, error, isLoading, message, messageType }
}
