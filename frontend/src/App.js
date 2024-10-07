import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Payment from './pages/payment'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route
              path='/Payment'
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
