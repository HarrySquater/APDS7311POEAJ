import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { useAdminLogout } from '../hooks/useAdminLogout'
import { usePayment } from '../hooks/usePayment'
import '../CSS/AdminDashboard.css'

const AdminDashboard = () => {
  const { adminLogout } = useAdminLogout()
  const { getPayments, verifyPayment, error, isLoading } = usePayment()
  const [payments, setPayments] = useState([])
  const [dashboardMessage, setDashboardMessage] = useState(null)

  useEffect(() => {
    const loadPayments = async () => {
      const response = await getPayments()
      if (response.ok) {
        setPayments(response.payments)
      } else {
        setDashboardMessage('Failed to load payments.')
      }
    }
    loadPayments()
  }, [])

  const handleVerify = async (payment) => {
    const response = await verifyPayment(
      payment._id,
      payment.swiftAccount,
      payment.swiftCode
    )

    if (response.ok) {
      setPayments((prevPayments) =>
        prevPayments.map((p) =>
          p._id === payment._id ? { ...p, verified: true } : p
        )
      )
      setDashboardMessage('Payment verified successfully.')
    } else {
      setDashboardMessage('Failed to verify payment.')
    }
  }

  return (
    <div className='admin-dashboard-container'>
      <div className='logout-button-container'>
        <Button
          variant='contained'
          className='logout-button'
          onClick={adminLogout}
        >
          Logout
        </Button>
      </div>
      <h1 className='dashboard-title'>Admin Dashboard</h1>
      {dashboardMessage && (
        <div className='dashboard-message'>{dashboardMessage}</div>
      )}
      <div className='payments-container'>
        {isLoading ? (
          <p>Loading payments...</p>
        ) : error ? (
          <p className='error-message'>{error}</p>
        ) : (
          <div className='payments-table-container'>
            <table className='payments-table'>
              <thead>
                <tr className='table-header'>
                  <th>Payment Amount</th>
                  <th>Currency Type</th>
                  <th>Bank Provider</th>
                  <th>Swift Account</th>
                  <th>Swift Code</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className='table-row'>
                    <td>{payment.paymentAmount}</td>
                    <td>{payment.currencyType}</td>
                    <td>{payment.bankProvider}</td>
                    <td>{payment.swiftAccount}</td>
                    <td>{payment.swiftCode}</td>
                    <td className='actions-cell'>
                      <Button
                        variant='contained'
                        onClick={() => handleVerify(payment)}
                        disabled={payment.verified}
                      >
                        {payment.verified ? 'Verified' : 'Verify'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
