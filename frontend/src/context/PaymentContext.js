import { createContext, useReducer } from 'react'

export const PaymentsContext = createContext()

export const paymentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PAYMENT':
      return {
        payments: action.payload,
      }

    case 'CREATE_PAYMENT':
      return {
        payments: [action.payload, ...(state.payments || [])],
      }
    default:
      return state
  }
}

export const PaymentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentsReducer, {
    payments: [],
  })

  return (
    <PaymentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PaymentsContext.Provider>
  )
}
