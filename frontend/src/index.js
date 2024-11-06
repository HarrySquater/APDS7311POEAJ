import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthenticationContextProvider } from './context/AuthenticationContext'
import { AdminAuthenticationContextProvider } from './context/AdminAuthenticationContext'
import { PaymentsContextProvider } from './context/PaymentContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <AdminAuthenticationContextProvider>
        <PaymentsContextProvider>
          <App />
        </PaymentsContextProvider>
      </AdminAuthenticationContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>
)
