import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { clearProjectMessage, expelFromProject, getById, inviteToProject } from '../features/project/projectSlice'
import { clearTeamMessage, createTeam } from '../features/team/teamSlice'
import Modal from '../layouts/Modal'

const Project = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const project = useSelector(state => state.project)
  const team = useSelector(state => state.team)
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
    dispatch(clearProjectMessage())
    dispatch(clearTeamMessage())
  }, [openMembers, openInvite, openTeam])

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

  const onTeamCreate = ({ name, idLeader }) => {
    dispatch(createTeam({ projectId: project.id, data: { name, idLeader } }))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') return navigate(0)
      })
  }

  return (
    <>
      {
        openMembers &&
          <Modal openModal={openMembers} setOpenModal={setOpenMembers} title='Miembros del proyecto'>
            {
              project.members.map(member => {
                return (
                  <div key={member._id._id} className='relative flex items-center justify-between w-full gap-4 px-2 border-b group border-ebony-clay-500'>
                    <p className='text-lg font-semibold'>{member._id.email}</p>
                    <div className='absolute hidden gap-4 px-2 py-1 text-xl font-bold text-white w-max max-h-min bg-black/80 group-hover:flex inset-x-full'>
                      <small>Usuario:</small>
                      <p>{member._id.username}</p>
                    </div>
                    {
                      (project.idBoss === user.id) && (member._id._id !== user.id)
                        ? <button onClick={() => onExpel(member._id._id)} className='px-2 font-bold text-white border border-white rounded-lg w-max bg-crimson-500'>Expulsar</button>
                        : <></>
                    }
                    {
                      project.idBoss === member._id._id
                        ? <b className='text-xl'>Líder</b>
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
            <form onSubmit={handleSubmit(onTeamCreate)} className='flex flex-col gap-2 mx-auto'>
              <input
                type='text'
                className='px-4 py-1 text-black border rounded-full outline-none border-ebony-clay-500 placeholder:text-black/50'
                placeholder='Nombre del equipo'
                required {...register('name', { required: true })}
              />
              <label htmlFor='idLeader'>Líder del equipo:</label>
              <select
                className='px-4 py-1 text-black bg-white border rounded-full outline-none border-ebony-clay-500'
                id='idLeader'
                required
                {...register('idLeader', { required: true })}
              >
                {
                  project.members.map(member => {
                    return (
                      <option key={member._id._id} value={member._id._id}>{member._id.email}</option>
                    )
                  })
                }
              </select>
              <button className='px-2 mx-auto font-bold text-white border border-white rounded-lg w-max bg-crimson-500'>Crear</button>
            </form>
            <p className='w-full text-xl font-bold text-center text-crimson-500'>{project.message}</p>
          </Modal>
      }
      <div className='flex gap-4'>
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
        <div className='grid w-full grid-cols-4 gap-4 p-4 text-center rounded-lg bg-bali-500'>
          <h3 className='col-span-4 text-2xl font-bold text-center'>Equipos</h3>
          {
            project.teams.map(team => {
              if (team.members.some(member => member._id === user.id)) {
                return (
                  <Link
                    key={team._id}
                    to={`/team/${team._id}`}
                    className='flex flex-col items-center mx-auto text-xl font-semibold text-white border-2 border-white rounded-b-lg bg-crimson-500 w-max'
                  >
                    <img src={team.logo} alt={team.name} className='object-cover w-52 h-52 bg-white/50' />
                    <h2 className='mt-auto'>{team.name}</h2>
                  </Link>
                )
              } else return <></>
            })
          }
        </div>
      </div>
    </>
  )
}

export default Project
