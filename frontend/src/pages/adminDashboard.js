import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { useAdminLogout } from '../hooks/useAdminLogout'
import { usePayment } from '../hooks/usePayment'

const AdminDashboard = () => {
  const { adminLogout } = useAdminLogout()
  const { getPayments, error, isLoading } = usePayment()
  const [payments, setPayments] = useState([])
  const [dashboardMessage, setDashboardMessage] = useState(null)
  const [csrfToken, setCsrfToken] = useState(null)

  const refreshCsrfToken = async () => {
    const response = await fetch('/api/csrf-token')
    const data = await response.json()
    setCsrfToken(data.csrfToken)
  }

  useEffect(() => {
    const loadPayments = async () => {
      await refreshCsrfToken()
      const response = await getPayments()
      if (response.ok) {
        setPayments(response.payments)
      } else {
        setDashboardMessage('Failed to load payments.')
      }
    }
    loadPayments()
  }, [])

  const handleLogout = async () => {
    await adminLogout()
    localStorage.removeItem('admin')
    window.location.href = '/'
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          style={{ width: '250px' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <h1
        style={{ display: 'flex', justifyContent: 'center', fontSize: '50px' }}
      >
        Admin Dashboard
      </h1>
      {dashboardMessage && (
        <div
          style={{
            color: 'green',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '30px',
          }}
        >
          {dashboardMessage}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '50px',
          overflowX: 'auto',
          maxWidth: '100%',
        }}
      >
        {isLoading ? (
          <p>Loading payments...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div style={{ width: '100%', maxWidth: '1200px' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ padding: '15px', textAlign: 'left' }}>
                    Payment Amount
                  </th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>
                    Currency Type
                  </th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>
                    Bank Provider
                  </th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>
                    Swift Account
                  </th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>
                    Swift Code
                  </th>
                  <th style={{ padding: '15px', textAlign: 'center' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    style={{ borderBottom: '1px solid #ddd' }}
                  >
                    <td style={{ padding: '15px' }}>{payment.paymentAmount}</td>
                    <td style={{ padding: '15px' }}>{payment.currencyType}</td>
                    <td style={{ padding: '15px' }}>{payment.bankProvider}</td>
                    <td style={{ padding: '15px' }}>{payment.swiftAccount}</td>
                    <td style={{ padding: '15px' }}>{payment.swiftCode}</td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <Button variant="contained">Approve to Swift</Button>
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
