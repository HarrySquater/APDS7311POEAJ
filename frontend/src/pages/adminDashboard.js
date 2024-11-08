import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { useAdminLogout } from '../hooks/useAdminLogout'
import { usePayment } from '../hooks/usePayment'
import '../CSS/AdminDashboard.css'

const AdminDashboard = () => {
  const { adminLogout } = useAdminLogout()
  const { getPayments, error, isLoading } = usePayment()
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
                  <tr key={payment.id} className='table-row'>
                    <td>{payment.paymentAmount}</td>
                    <td>{payment.currencyType}</td>
                    <td>{payment.bankProvider}</td>
                    <td>{payment.swiftAccount}</td>
                    <td>{payment.swiftCode}</td>
                    <td className='actions-cell'>
                      <Button variant='contained'>Approve to Swift</Button>
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
