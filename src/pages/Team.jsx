import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Modal from '../components/Modal'
import TaskList from '../components/TaskList'
import { deleteTeam, getById } from '../features/projectSlice'
import { changeRole, clearTeamMessage, expelFromTeam, getTeamById, inviteToTeam, createTask, changeState } from '../features/teamSlice'
import { DragDropContext } from 'react-beautiful-dnd'

const Team = () => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const dispatch = useDispatch()
  const team = useSelector(state => state.team)
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const project = useSelector(state => state.project)
  const [openCreate, setOpenCreate] = useState(false)
  const [openMembers, setOpenMembers] = useState(false)
  const [openInvite, setOpenInvite] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  useEffect(() => {
    if (!user.loading && !user.logged) return navigate('/', { replace: true })
    else if (!user.loading && user.logged) {
      dispatch(getTeamById(id))
        .then(res => {
          if (res.meta.rejectedWithValue) return navigate('/dashboard', { replace: true })
          if (!project.exists) dispatch(getById({ id: res.payload.idProject, userid: user.id }))
          setUserRole(res.payload.members.filter(member => member._id._id === user.id)[0].role)
        })
    }
  }, [user.loading])

  useEffect(() => {
    dispatch(clearTeamMessage())
  }, [openMembers, openCreate])

  const onNewTask = ({ name, description, state }) => {
    dispatch(createTask({
      idProject: team.idProject,
      idTeam: team.id,
      authorId: user.id,
      author: user.username,
      name,
      description,
      state
    }))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') return setOpenCreate(false)
      })
  }

  const onInvite = ({ userid, role }) => {
    dispatch(inviteToTeam({ teamId: team.id, userid, role }))
  }

  const onRoleChange = ({ userId, userRole }) => {
    dispatch(changeRole({ teamId: team.id, userId, userRole }))
  }

  const onExpel = (userId) => {
    dispatch(expelFromTeam({ teamId: team.id, userId }))
  }

  const onStateChange = (task) => {
    if (!task.destination || (task.source.droppableId === task.destination.droppableId)) return
    dispatch(changeState({ teamId: team.id, taskId: task.draggableId, state: task.destination.droppableId }))
  }

  const onDelete = () => {
    dispatch(deleteTeam({ projectId: team.id }))
      .then(() => { return navigate(`/project/${project.id}`, { replace: true }) })
  }

  return (
    <>
      {
        openMembers &&
          <Modal key='membersModal' openModal={openMembers} setOpenModal={setOpenMembers} title='Miembros del proyecto'>
            <p className='p-1 font-bold text-center border border-black rounded-lg bg-red-500/50'>Los Miembros solo pueden actualizar tareas hasta el estado "Probando", los Testers hasta "Listo".</p>
            {
              team.members.map(member => {
                console.log(member)
                return (
                  <div key={member._id._id + '_membersModal'} className='relative flex items-center justify-between w-full gap-4 px-2 border-b group border-ebony-clay-500'>
                    <p className='text-lg font-semibold'>{member._id.email}</p>
                    {
                      team.idLeader === user.id && member._id._id !== user.id
                        ? (
                          <form onChange={handleSubmit(onRoleChange)}>
                            <input type='hidden' value={member._id._id} {...register('userId', { required: true })} />
                            <select defaultValue={member.role} {...register('userRole', { required: true })}>
                              <option value='Miembro'>Miembro</option>
                              <option value='Tester'>Tester</option>
                            </select>
                          </form>
                          )
                        : <p>{member.role}</p>
                    }
                    <div className='absolute hidden gap-4 px-2 text-xl font-bold text-white rounded-md w-max max-h-min bg-black/80 group-hover:flex inset-y-full'>
                      <small className='select-none'>Usuario:</small>
                      <p>{member._id.username}</p>
                    </div>
                    {
                      (team.idLeader === user.id) && (member._id._id !== user.id)
                        ? <button onClick={() => onExpel(member._id._id)} className='px-2 font-bold text-white border border-white rounded-lg w-max bg-crimson-500'>Expulsar</button>
                        : (member._id._id === user.id)
                            ? <p className='text-xl font-semibold'>Yo</p>
                            : null
                    }
                  </div>
                )
              })
            }
            <p className='w-full text-xl font-bold text-center text-crimson-500'>{team.message}</p>
          </Modal>
      }
      {
        openCreate &&
          <Modal setOpenModal={setOpenCreate} title='Crear nueva tarea'>
            <form
              className='flex flex-col w-full gap-4 mx-auto mt-2'
              onSubmit={handleSubmit(onNewTask)}
            >
              <input
                className='px-4 py-1 text-black border rounded-lg outline-none border-ebony-clay-500 placeholder:text-black/50'
                type='text'
                required
                maxLength='24'
                placeholder='Nombre de la tarea'
                {...register('name', { required: true, maxLength: 24 })}
              />
              <textarea
                className='h-32 px-4 py-1 text-black border rounded-lg outline-none border-ebony-clay-500 placeholder:text-black/50'
                required
                placeholder='Descripción'
                {...register('description', { required: true })}
              />
              <label htmlFor='state'>Estado inicial de la tarea</label>
              <select
                className='px-4 py-1 text-black bg-white border rounded-lg outline-none border-ebony-clay-500'
                required
                id='state'
                defaultValue='2'
                {...register('state', { required: true })}
              >
                <option value='0'>CONGELADO</option>
                <option value='1'>EMERGENCIA</option>
                <option value='2'>POR HACER</option>
                <option value='3'>HACIENDO</option>
                <option value='4'>PROBANDO</option>
              </select>

              <button className='w-full py-1 text-xl text-white border border-black rounded-full bg-crimson-500 place-self-center'>Crear</button>
            </form>
            <p className='w-full text-xl font-bold text-center text-crimson-500'>{team.message}</p>
          </Modal>
      }
      {
        openInvite &&
          <Modal openModal={openInvite} setOpenModal={setOpenInvite} title='Invitar usuario al equipo'>
            <form onSubmit={handleSubmit(onInvite)} className='flex flex-col w-full gap-2'>
              <label htmlFor='userid'>Usuario del proyecto:</label>
              <select
                className='px-4 py-1 text-black bg-white border rounded-full outline-none border-ebony-clay-500'
                required
                id='userid'
                {...register('userid', { required: true })}
              >
                {
                  project.members.map(member => {
                    return (
                      !team.members.some(el => el._id._id === member._id._id) &&
                        <option key={member._id._id} value={member._id._id}>{`${member._id.email} (${member._id.username})`}</option>
                    )
                  })
                }
              </select>
              <label htmlFor='role'>Rol en el equipo:</label>
              <select
                className='px-4 py-1 text-black bg-white border rounded-full outline-none border-ebony-clay-500'
                required
                id='role'
                {...register('role', { required: true })}
              >
                <option value='Miembro'>Miembro</option>
                <option value='Tester'>Tester</option>
              </select>
              <button className='px-2 font-bold text-white border border-white rounded-lg w-max bg-crimson-500'>Invitar</button>
            </form>
            <p className='w-full text-xl font-bold text-center text-crimson-500'>{team.message}</p>
          </Modal>
      }
      <div className='flex flex-col'>

        <div className='flex gap-4 px-4 py-2 text-white rounded-t-lg bg-bali-500'>
          <div className='flex items-center gap-1 text-3xl font-bold text-ebony-clay-500'>
            <Link to={`/project/${project.id}`} className='px-2 py-1 font-bold text-white underline border border-white rounded-lg bg-crimson-500 hover:bg-crimson-400'>{project.name || ''}</Link>
            <p>{'  > ' + team.name}</p>
          </div>
          <button
            onClick={() => setOpenMembers(true)}
            className='px-2 py-1 font-bold border border-white rounded-lg bg-crimson-500 hover:bg-crimson-400'
          >
            Ver miembros
          </button>
          {
            team.idLeader === user.id &&
              <>
                {
                  !deleteConfirm
                    ? (
                      <button
                        onClick={() => setDeleteConfirm(true)}
                        className='px-2 py-1 font-bold border border-white rounded-lg bg-crimson-500 hover:bg-crimson-400'
                      >
                        Eliminar equipo
                      </button>
                      )
                    : (
                      <button
                        onClick={() => onDelete()}
                        className='px-2 py-1 font-bold border border-white rounded-lg bg-crimson-500 hover:bg-crimson-400'
                      >
                        Confirmar
                      </button>
                      )
                }
                <button
                  onClick={() => setOpenCreate(true)}
                  className='px-2 py-1 font-bold border border-white rounded-lg bg-crimson-500 hover:bg-crimson-400'
                >
                  Crear tarea
                </button>
                <button
                  onClick={() => setOpenInvite(true)}
                  className='px-2 py-1 font-bold border border-white rounded-lg bg-crimson-500 hover:bg-crimson-400'
                >
                  Invitar miembro
                </button>
              </>
          }
        </div>

        <div className='p-4 rounded-b-lg bg-bali-500'>
          <div className='flex space-x-4 overflow-x-auto'>
            <DragDropContext onDragEnd={(res) => onStateChange(res)}>
              <TaskList tasks={team.tasks[0]} userRole={userRole} index='0' color='sky-300' state='CONGELADO' />
              <TaskList tasks={team.tasks[1]} userRole={userRole} index='1' color='red-500' state='EMERGENCIA' />
              <TaskList tasks={team.tasks[2]} userRole={userRole} index='2' color='orange-500' state='POR HACER' />
              <TaskList tasks={team.tasks[3]} userRole={userRole} index='3' color='yellow-500' state='HACIENDO' />
              <TaskList tasks={team.tasks[4]} userRole={userRole} index='4' color='blue-500' state='PROBANDO' />
              <TaskList tasks={team.tasks[5]} disabledBool={userRole !== 'Tester' && userRole !== 'Líder'} userRole={userRole} index='5' color='neutral-200' state='LISTO PARA APROBACIÓN' />
              <TaskList tasks={team.tasks[6]} disabledBool={userRole !== 'Líder'} userRole={userRole} index='6' color='lime-500' state='COMPLETADO' />
            </DragDropContext>
          </div>
        </div>

      </div>
    </>
  )
}

export default Team
