import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import ProtectedRoutes from './routes/ProtectedRoutes.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route element={<ProtectedRoutes />}>
      <Route path='/' element={<App />} />
      <Route path='/home' element={<Home />} />
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)