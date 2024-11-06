import { createContext, useReducer, useEffect } from 'react'

export const AdminAuthenticationContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'ADMINLOGIN':
      return {
        admin: action.payload,
      }
    case 'ADMINLOGOUT':
      return {
        admin: null,
      }
    default:
      return state
  }
}

export const AdminAuthenticationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { admin: null })

  //see if the admin is logged in
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'))

    if (admin) {
      dispatch({ type: 'ADMINLOGIN', payload: admin })
    }
  }, [])

  console.log('Admin AuthContext state: ', state)

  return (
    <AdminAuthenticationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdminAuthenticationContext.Provider>
  )
}
