import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearMessage, expelFromProject, getById, inviteToProject } from '../features/project/projectSlice'
import Modal from '../layouts/Modal'

const Project = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const project = useSelector(state => state.project)
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [openMembers, setOpenMembers] = useState(false)
  const [openInvite, setOpenInvite] = useState(false)
  const [openTeam, setOpenTeam] = useState(false)

  useEffect(() => {
    dispatch(getById({ id, userid: user.id }))
      .then((res) => {
        if (!res.payload?.members?.some(el => el._id._id === user.id) || res.error) navigate('/dashboard')
      })
  }, [])

  useEffect(() => {
    dispatch(clearMessage())
  }, [openMembers, openInvite])

  const onExpel = (userId) => {
    dispatch(expelFromProject({ projectId: project.id, userId }))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') return navigate(0)
      })
  }

  const onInvite = ({ email }) => {
    dispatch(inviteToProject({ projectId: project.id, userEmail: email }))
      .then(res => console.log(res))
  }

  const onTeamCreate = ({ name }) => {

  }

  return (
    <>
      {
        openMembers &&
          <Modal openModal={openMembers} setOpenModal={setOpenMembers} title='Miembros del proyecto'>
            {
              project.members.map(member => {
                return (
                  <div key={member._id._id} className='flex justify-between w-full px-2 border-b border-ebony-clay-500'>
                    <p className='text-lg font-semibold'>{member._id.username}</p>
                    {
                      (project.idBoss === user.id) && (member._id._id !== user.id)
                        ? <button onClick={() => onExpel(member._id._id)} className='px-2 font-bold text-white border border-white rounded-lg w-max bg-crimson-500'>Expulsar</button>
                        : <></>
                    }
                  </div>
                )
              })
            }
            <p className='w-full text-xl font-bold text-center text-crimson-500'>{project.message}</p>
          </Modal>
      }
      {
        openInvite &&
          <Modal openModal={openInvite} setOpenModal={setOpenInvite} title='Invitar usuario al proyecto'>
            <form onSubmit={handleSubmit(onInvite)} className='flex gap-2 mx-auto'>
              <input
                type='email'
                className='px-4 py-1 text-black border rounded-full outline-none border-ebony-clay-500 placeholder:text-black/50'
                placeholder='Email'
                required {...register('email', { required: true })}
              />
              <button className='px-2 font-bold text-white border border-white rounded-lg w-max bg-crimson-500'>Invitar</button>
            </form>
            <p className='w-full text-xl font-bold text-center text-crimson-500'>{project.message}</p>
          </Modal>
      }
      {
        openTeam &&
          <Modal openModal={openTeam} setOpenModal={setOpenTeam} title='Crear nuevo equipo'>
            <form onSubmit={handleSubmit(onTeamCreate)} className='flex gap-2 mx-auto'>
              <input
                type='text'
                className='px-4 py-1 text-black border rounded-full outline-none border-ebony-clay-500 placeholder:text-black/50'
                placeholder='Nombre del equipo'
                required {...register('name', { required: true })}
              />
              <button className='px-2 font-bold text-white border border-white rounded-lg w-max bg-crimson-500'>Crear</button>
            </form>
            <p className='w-full text-xl font-bold text-center text-crimson-500'>{project.message}</p>
          </Modal>
      }
      <div className='flex flex-col gap-4 p-4 text-center rounded-lg bg-bali-500 w-max'>
        <img src={project.logo} alt={project.name} className='bg-white/50' width='250' height='250' />
        <h2 className='text-3xl font-bold text-bali-900'>{project.name}</h2>
        <button onClick={() => setOpenMembers(true)} className='px-2 py-1 font-bold text-white border-2 border-white rounded-lg bg-crimson-500'>Ver miembros</button>
        {
          user.id === project.idBoss
            ? (
              <>
                <button onClick={() => setOpenInvite(true)} className='px-2 py-1 font-bold text-white border-2 border-white rounded-lg bg-crimson-500'>Invitar usuario</button>
                <button onClick={() => setOpenTeam(true)} className='px-2 py-1 font-bold text-white border-2 border-white rounded-lg bg-crimson-500'>Crear equipo</button>
              </>
              )
            : <></>
        }
      </div>
    </>
  )
}

export default Project
