import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const [datosForm, setDatosForm] = useState({ email: '', mensaje: '' })
  const [mensajeError, setMensajeError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatosForm((prevDatos) => ({ ...prevDatos, [name]: value }))
  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!emailRegex.test(datosForm.email)) {
      setMensajeError('Invalid email')
      return
    }
    setMensajeError('')
    navigate('/')
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="user_login" name="email" placeholder="example@example.com" value={datosForm.email} onChange={handleChange} required/>
      <label htmlFor="mensaje">Tell us about it!</label>
      <textarea id="user_login" name="mensaje" placeholder="Write here..." value={datosForm.mensaje} onChange={handleChange} required></textarea>
      <p className='error-signup'>{mensajeError}</p>
      <button className='button_form button_form_signup' type="submit">Send</button>
    </form>
  )
}

export default Contact
