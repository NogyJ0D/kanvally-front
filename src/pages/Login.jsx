import React from 'react-dom'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../features/user/userSlice'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.logged) navigate('/dashboard')
  }, [user])

  const onSubmit = ({ email, password }) => {
    dispatch(login({ email, password }))
  }

  return (
    <div className='flex flex-col items-center w-1/2 gap-4 p-4 mx-auto mt-8'>
      <Link to='/' className='absolute text-bali-900 left-4 top-4'>volver al inicio</Link>
      <h2 className='text-3xl font-semibold'>Kanvally</h2>
      <form
        className='flex flex-col w-full gap-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className='text-xl font-bold text-center text-bali-900'>Inicia con tu email:</h3>
        <input
          id='email'
          className='px-4 py-1 text-black border rounded-full outline-none border-ebony-clay-500 placeholder:text-black/50'
          type='email'
          required
          placeholder='Email'
          {...register('email', { required: true })}
        />

        <input
          id='password'
          className='px-4 py-1 text-black border rounded-full outline-none border-ebony-clay-500 placeholder:text-black/50'
          type='password'
          required
          placeholder='Contraseña'
          {...register('password', { required: true })}
        />

        {user.error && <p className='w-full text-xl font-bold text-center text-crimson-500'>{user.message}</p>}
        <button className='w-full py-1 text-xl text-white border border-black rounded-full bg-crimson-500 place-self-center'>Iniciar</button>
      </form>

      <Link to='/signup' className='px-2 py-1'>¿No tienes cuenta? <b className='text-crimson-500'>Creala</b></Link>
    </div>
  )
}

export default Login
