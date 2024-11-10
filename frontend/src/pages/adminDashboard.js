import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { useAdminLogout } from '../hooks/useAdminLogout'
import { usePayment } from '../hooks/usePayment'
import { useUserDetails } from '../hooks/useUserDetails'
import '../CSS/AdminDashboard.css'

const AdminDashboard = () => {
  const { adminLogout } = useAdminLogout()
  const { getPayments, verifyPayment, error, isLoading } = usePayment()
  const [payments, setPayments] = useState([])
  const [dashboardMessage, setDashboardMessage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    fetchUserDetails,
    userDetails,
    error: userError,
    isLoading: userLoading,
  } = useUserDetails()

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

  const handleUserClick = async (userId) => {
    await fetchUserDetails(userId)
    setIsModalOpen(true)
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
      <h1 className='dashboard-title'>Payments</h1>
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
                  <th>Payee</th>
                  <th>Payment Amount</th>
                  <th>Currency Type</th>
                  <th>Bank Provider</th>
                  <th>Swift Account</th>
                  <th>Swift Code</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className='table-row'>
                    <td>
                      <button
                        className='user-id-button'
                        onClick={() => handleUserClick(payment.userId)}
                      >
                        View Payee
                      </button>
                    </td>
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
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby='user-details-modal'
        aria-describedby='user-details-description'
      >
        <Box className='modal-box'>
          <h2>Payee Details</h2>
          {userLoading ? (
            <p>Loading user details...</p>
          ) : userError ? (
            <p className='error-message'>{userError}</p>
          ) : userDetails ? (
            <p>Name: {userDetails.name}</p>
          ) : (
            <p>No user details available.</p>
          )}
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default AdminDashboard
