import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthenticationContextProvider } from './context/AuthenticationContext'
import { PaymentsContextProvider } from './context/PaymentContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <PaymentsContextProvider>
        <App />
      </PaymentsContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>
)
