import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { useAdminLogout } from '../hooks/useAdminLogout'
import { useNavigate } from 'react-router-dom'
import { fetchPayments, approvePayment } from '../hooks/usePayment'

const AdminDashboard = () => {
  const { logout } = useAdminLogout()
  const navigate = useNavigate()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const loadPayments = async () => {
      setLoading(true)
      const data = await fetchPayments()
      setPayments(data)
      setLoading(false)
    }
    loadPayments()
  }, [])

  const handleLogout = async () => {
    await logout()
    window.location.reload()
  }

  const handleApprove = async (paymentId) => {
    const response = await approvePayment(paymentId)
    if (response.ok) {
      setMessage('Payment approved successfully!')
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment.id !== paymentId)
      )
    } else {
      setMessage('Failed to approve payment.')
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
        style={{ display: 'flex', justifyContent: 'center', fontSize: '50px' }}
      >
        Admin Dashboard
      </h1>
      {message && (
        <div
          style={{
            color: 'green',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '30px',
          }}
        >
          {message}
        </div>
      )}
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
      >
        {loading ? (
          <p>Loading payments...</p>
        ) : (
          <table style={{ width: '80%', borderCollapse: 'collapse' }}>
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
                <tr key={payment.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '15px' }}>{payment.paymentAmount}</td>
                  <td style={{ padding: '15px' }}>{payment.currencyType}</td>
                  <td style={{ padding: '15px' }}>{payment.bankProvider}</td>
                  <td style={{ padding: '15px' }}>{payment.swiftAccount}</td>
                  <td style={{ padding: '15px' }}>{payment.swiftCode}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <Button
                      variant='contained'
                      onClick={() => handleApprove(payment.id)}
                    >
                      Approve to Swift
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
