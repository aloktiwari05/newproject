// import React from 'react'
// import Register from './components/Register.jsx'
import { Outlet } from "react-router-dom"
import Navbar from './components/Navbar.jsx'
import Sidebar from "./components/Sidebar.jsx"

function App() {
  return (
    <div className='w-full h-full flex flex-col justify-center'>
      <Navbar />
      <div className="w-screen h-screen flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default App