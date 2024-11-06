import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Register from './pages/register'
import Payment from './pages/payment'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLogin from './pages/adminLogin'

function NotFound() {
  return <h1>Error 404, Page not found you skallywag!</h1>
}

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/AdminLogin' element={<AdminLogin />} />
            <Route
              path='/Payment'
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
