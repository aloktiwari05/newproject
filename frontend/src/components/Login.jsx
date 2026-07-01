import { useState } from 'react'
import { apiUrl } from '../config.js'

function Login() {

  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...form })
      })
      const result = await response.json();
      console.log(result)
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
        <label htmlFor='name'>Name :</label>
        <input type='text' id='name' placeholder='Username' className="border px-4 py-2 rounded-xl " onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })) }} />

        <label htmlFor='email'>Email :</label>
        <input type='email' id='email' placeholder='Email' className="border px-4 py-2 rounded-xl " onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })) }} />

        <label htmlFor='password'>Password :</label>
        <input type='password' id='password' placeholder='Password' autoComplete='current_password' className="border px-4 py-2 rounded-xl " onChange={(e) => { setForm((f) => ({ ...f, password: e.target.value })) }} />

        <button className="w-fit border px-4 py-2 rounded-xl " type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login