import { useState } from 'react'
import { apiUrl } from '../api/api.js'
import { useAuth } from '../context/authContext.jsx'

function Login() {

  const {setAccessToken} = useAuth()
  const [form, setForm] = useState({ identifier: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...form })
      })
      const {message, accessToken} = await response.json();
      setAccessToken(accessToken)

      console.log(message)
    }
    catch (err) {
      console.log(err)
    }
  }
  console.log(form)

  return (
    <div className="border w-full p-10 max-w-xl">

      <h1 className="text-center">Login</h1>

      <form method='POST' onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
        <label htmlFor='identifier'>Email or Username :</label>
        <input type='text' id='identifier' placeholder='Email or Username' className="border px-4 py-2 rounded-xl " onChange={(e) => { setForm((f) => ({ ...f, identifier: e.target.value })) }} />

        <label htmlFor='password'>Password :</label>
        <input type='password' id='password' placeholder='Password' autoComplete='current_password' className="border px-4 py-2 rounded-xl " onChange={(e) => { setForm((f) => ({ ...f, password: e.target.value })) }} />

        <button className="w-fit border px-4 py-2 rounded-xl " type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login