import { createContext, useReducer, useEffect } from 'react'

export const AuthenticationContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        user: null,
      }
    default:
      return state
  }
}

export const AuthenticationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  //see if the user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])

  console.log('AuthContext state: ', state)

  return (
    <AuthenticationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
