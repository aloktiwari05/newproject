// import React from 'react'

function login() {
  return (
    <div className="border w-full p-10 max-w-xl">
      
      <h1 className="text-center">Login</h1>

      <form method='POST' action='' className="flex flex-col">
        <label for='name'>Name :</label>
        <input type='text' id='name' placeholder='Username' className="border px-4 py-2 rounded-xl "/>

        <label for='email'>Email :</label>
        <input type='email' id='email' placeholder='Email' className="border px-4 py-2 rounded-xl "/>

        <label for='password'>Password :</label>
        <input type='password' id='password' placeholder='Password' className="border px-4 py-2 rounded-xl "/>
      </form>
    </div>
  )
}

export default login