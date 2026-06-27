import { useEffect, useState } from 'react';

function Register() {

  const apiUrl = import.meta.env.VITE_API_URL
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...form })
      })
      const result = await response.json()
      console.log(result)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(form)
  }, [form])

  return (
    <div>
      <form className='' onSubmit={handleSubmit}>

        <div>
          <label htmlFor="username">Name</label>
          <input className="border rounded-xl" type="text" id='username' autoComplete='username' value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} required />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input className="border rounded-xl" type="email" autoComplete='email' value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input className="border rounded-xl" type="password" minLength={8} autoComplete='new-password' onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required />
        </div>

        <button className="bg-blue-500 text-white rounded-xl px-4 py-2" type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register;