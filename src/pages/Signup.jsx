import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../features/user/userSlice'

const Signup = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    data.profile_pic = data.profile_pic || 'https://pixabay.com/get/g3e714de2b5dcb9b1bd334b388b26cadd405c372ac964155cb84647a6719fdcd5610e34e57e0912332db970e20d84ff77_640.png'
    dispatch(signup(data))
  }

  useEffect(() => {
    if (user.logged) navigate('/dashboard')
  }, [user])

  return (
    <div className='flex flex-col items-center w-1/2 gap-4 p-4 mx-auto mt-8'>
      <Link to='/' className='absolute text-bali-900 left-4 top-4'>volver al inicio</Link>
      <h2 className='text-3xl font-semibold'>Kanvally</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-2 gap-4'
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='username'>Nombre de usuario</label>
          <input
            id='username'
            type='text'
            maxLength='16'
            {...register('username',
              {
                required: { value: true, message: 'Campo requerido.' },
                maxLength: { value: 16, message: 'Máximo 16 caracteres.' }
              })}
            className={'px-4 py-1 text-black border rounded-full outline-none placeholder:text-black/50' + (errors.password ? ' border-crimson-500' : ' border-ebony-clay-500')}
          />
          {errors.username && <small className='pl-8 font-bold text-red-500'>{errors.username.message}</small>}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='firstname'>Nombre</label>
          <input
            id='firstname'
            type='text'
            maxLength='32'
            {...register('firstname',
              {
                required: { value: true, message: 'Campo requerido.' },
                maxLength: { value: 32, message: 'Máximo 32 caracteres.' }
              })}
            className={'px-4 py-1 text-black border rounded-full outline-none placeholder:text-black/50' + (errors.password ? ' border-crimson-500' : ' border-ebony-clay-500')}
          />
          {errors.firstname && <small className='pl-8 font-bold text-red-500'>{errors.firstname.message}</small>}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='lastname'>Apellido</label>
          <input
            id='lastname'
            type='text'
            maxLength='32'
            {...register('lastname',
              {
                required: { value: true, message: 'Campo requerido.' },
                maxLength: { value: 32, message: 'Máximo 32 caracteres.' }
              })}
            className={'px-4 py-1 text-black border rounded-full outline-none placeholder:text-black/50' + (errors.password ? ' border-crimson-500' : ' border-ebony-clay-500')}
          />
          {errors.lastname && <small className='pl-8 font-bold text-red-500'>{errors.lastname.message}</small>}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            maxLength='100'
            {...register('email',
              {
                required: { value: true, message: 'Campo requerido.' },
                maxLength: { value: 100, message: 'Máximo 100 caracteres.' },
                pattern: { value: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm, message: 'No es un email válido.' }
              })}
            className={'px-4 py-1 text-black border rounded-full outline-none placeholder:text-black/50' + (errors.password ? ' border-crimson-500' : ' border-ebony-clay-500')}
          />
          {errors.email && <small className='pl-8 font-bold text-red-500'>{errors.email.message}</small>}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='password'>Contraseña</label>
          <input
            id='password'
            type='password'
            {...register('password',
              { required: { value: true, message: 'Campo requerido.' } })}
            className={'px-4 py-1 text-black border rounded-full outline-none placeholder:text-black/50' + (errors.password ? ' border-crimson-500' : ' border-ebony-clay-500')}
          />
          {errors.password && <small className='pl-8 font-bold text-red-500'>{errors.password.message}</small>}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='profile_pic'>Foto de perfil (url)</label>
          <input
            id='profile_pic'
            type='text'
            {...register('profile_pic')}
            className='px-4 py-1 text-black border rounded-full outline-none border-ebony-clay-500 placeholder:text-black/50'
          />
        </div>

        {user.error && <p className='w-full col-span-2 text-xl font-bold text-center text-crimson-500'>{user.message}</p>}
        <button className='w-full col-span-2 py-1 text-xl text-white border border-black rounded-full bg-crimson-500 place-self-center'>Registrar</button>
      </form>
    </div>
  )
}

export default Signup
