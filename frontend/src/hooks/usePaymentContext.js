import { PaymentsContext } from '../context/PaymentContext'
import { useContext } from 'react'

export const usePaymentsContext = () => {
  const context = useContext(PaymentsContext)

  if (!context) {
    throw Error('usePaymentsContext must be inside a paymentsContextProvider')
  }

  return context
}
