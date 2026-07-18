// import React from 'react'
import { useAuth } from '../context/authContext.jsx'

function Logout() {

  const { logout } = useAuth()

  return (
    <button onClick={()=>{logout()}}>Logout</button>
  )
}

export default Logout