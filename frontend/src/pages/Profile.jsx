// import React from 'react'
import {useAuth} from '../context/authContext.jsx'
import { apiUrl, refresh } from '../api/api.js'

function Profile() {

  const { accessToken, setAccessToken, setIsLoading } = useAuth()

  try {
    const fetchUser = async () => {
      const result = await fetch(`${apiUrl}/api/getUser`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        credentials: 'include'
      })

      const response = await result.json();
      if (response.message === 'TokenExpiredError') {
        refresh(setAccessToken, setIsLoading)
      }
    }
    fetchUser()
  } catch (err) {
    console.log(err)
  }


  return (
    <div>Profile</div>
  )
}

export default Profile