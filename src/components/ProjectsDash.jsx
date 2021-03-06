import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProjects, createProject } from '../features/userSlice'
import Modal from '../components/Modal'

const ProjectsDash = ({ user }) => {
  const [openCreate, setOpenCreate] = useState(false)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit
  } = useForm()

  const onSubmit = ({ name, logoUrl }) => {
    dispatch(createProject({ name, logoUrl, idBoss: user.id }))
    return setOpenCreate(false)
  }

  useEffect(() => {
    if (user.logged) dispatch(getProjects(user.id))
  }, [user.logged])

  return (
    <div className='flex flex-col gap-4 p-4 rounded-lg bg-bali-500'>
      {
        openCreate &&
          <Modal setOpenModal={setOpenCreate} title='Crear nuevo proyecto'>
            <form
              className='flex flex-col w-full gap-4 mx-auto mt-2'
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className='px-4 py-1 text-black border rounded-full outline-none border-ebony-clay-500 placeholder:text-black/50'
                type='text'
                required
                placeholder='Nombre del proyecto'
                {...register('name', { required: true })}
              />

              <input
                id='logo'
                className='px-4 py-1 text-black border rounded-full outline-none border-ebony-clay-500 placeholder:text-black/50'
                type='text'
                placeholder='Logo del proyecto'
                {...register('logoUrl')}
              />
              <button className='w-full py-1 text-xl text-white border border-black rounded-full bg-crimson-500 place-self-center'>Crear</button>
            </form>
          </Modal>
      }
      <div className='flex items-center gap-4'>
        <h2 className='text-3xl font-bold'>Proyectos</h2>
        {
          user.role > 0
            ? <button onClick={() => setOpenCreate(true)} className='px-2 py-1 font-bold text-white border-2 border-white rounded-lg bg-crimson-500'>Crear proyecto</button>
            : <p className='text-xl font-bold text-white'>Debes verificar tu email para poder utilizar las funciones de la web.</p>
          }
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {
        user.projects?.map(project => {
          return (
            <Link
              key={project._id}
              to={`/project/${project._id}`}
              className='flex flex-col items-center mx-auto text-xl font-semibold text-white border-2 border-white rounded-b-lg bg-crimson-500 w-max'
            >
              <img src={project.logoUrl} alt={project.name} className='object-fill w-64 h-64 bg-white/50' />
              <h2 className='mt-auto'>{project.name}</h2>
            </Link>
          )
        })
        }
      </div>
    </div>
  )
}

export default ProjectsDash
