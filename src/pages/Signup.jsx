import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()

  const [datosUser, setDatosUser] = useState({ username: '', password: '', favorites: [] })
  const [errorMensaje, setErrorMensaje] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatosUser((prevDatos) => ({ ...prevDatos, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (localStorage.getItem(datosUser.username)) {
      setErrorMensaje('Username already exists')
    } else {
      const nuevoUser = { ...datosUser, favorites: [] }
      localStorage.setItem(nuevoUser.username, JSON.stringify(nuevoUser))

      setDatosUser({ username: '', password: '', favorites: [] })
      setErrorMensaje('')
      navigate('/login')
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label htmlFor="user_signup">Username:</label>
      <input type="text" id="user_signup" name="username" placeholder="example123" value={datosUser.username} onChange={handleChange} required />

      <label htmlFor="password_signup">Password:</label>
      <input type="password" id="password_signup" name="password" placeholder="Enter your password" value={datosUser.password} onChange={handleChange} required />

      <button className='button_form button_form_signup' type="submit">Sign up</button>

      <p className='error-signup'>{errorMensaje}</p>
    </form>
  )
}

export default Signup
