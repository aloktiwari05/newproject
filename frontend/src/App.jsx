// import React from 'react'
// import Register from './components/Register.jsx'
import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar.jsx"
import { ToastContainer } from 'react-toastify'
// import Task from './components/Task.jsx'

function App() {
  return (
    <div className='w-screen h-screen flex'>
      <ToastContainer/>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default App