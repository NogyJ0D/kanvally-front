import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Modal from '../components/Modal'
import TaskList from '../components/TaskList'
import { clearTeamMessage, createTask, getTeamById } from '../features/team/teamSlice'

const Team = () => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const dispatch = useDispatch()
  const team = useSelector(state => state.team)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const [openCreate, setOpenCreate] = useState(false)
  const [tasksList, setTasksList] = useState([[], [], [], [], [], [], []])

  useEffect(() => {
    if (!user.loading && user.logged) {
      dispatch(getTeamById(id))
        .then((res) => {
          if (res.error) return navigate('/dashboard')
        })
    }
  }, [user])

  useEffect(() => {
    if (!team.loading && team.exists) {
      team.tasks.forEach(task => {
        setTasksList([...tasksList, tasksList[task.state].push(task)])
      })
    }
  }, [team])

  useEffect(() => {
    dispatch(clearTeamMessage())
  }, [openCreate])

  const onSubmit = ({ name, description }) => {
    dispatch(createTask({
      idProject: team.idProject,
      idTeam: team.id,
      author: user.id,
      name,
      description
    }))
      .then((res) => {
        console.log(res)
        if (res.meta.requestStatus === 'fulfilled') return navigate(0)
      })
  }

  return (
    <>
      {
        openCreate &&
          <Modal setOpenModal={setOpenCreate} title='Crear nueva tarea'>
            <form
              className='flex flex-col w-full gap-4 mx-auto mt-2'
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className='px-4 py-1 text-black border rounded-full outline-none border-ebony-clay-500 placeholder:text-black/50'
                type='text'
                required
                placeholder='Nombre de la tarea'
                {...register('name', { required: true })}
              />
              <textarea
                className='h-32 px-4 py-1 text-black border rounded-lg outline-none border-ebony-clay-500 placeholder:text-black/50'
                required
                placeholder='Descripción'
                {...register('description', { required: true })}
              />

              <button className='w-full py-1 text-xl text-white border border-black rounded-full bg-crimson-500 place-self-center'>Crear</button>
            </form>
            <p className='w-full text-xl font-bold text-center text-crimson-500'>{team.message}</p>
          </Modal>
      }
      <div className='flex flex-col gap-4'>

        <div className='flex gap-4 px-4 py-2 text-white rounded-lg bg-bali-500'>
          <h3 className='text-3xl font-bold text-ebony-clay-500'>{team.name}</h3>
          {
            team.idLeader === user.id &&
              <button
                onClick={() => setOpenCreate(true)}
                className='px-2 py-1 font-bold border border-white rounded-lg bg-crimson-500 hover:bg-crimson-400'
              >
                Crear tarea
              </button>
          }
        </div>

        <div className='p-4 rounded-lg bg-bali-500'>
          <div className='flex space-x-8 overflow-x-auto'>
            <TaskList tasks={tasksList[0]} color='-sky-300' state='CONGELADO' />
            <TaskList tasks={tasksList[1]} color='-crimson-500' state='EMERGENCIA' />
            <TaskList tasks={tasksList[2]} color='-orange-500' state='POR HACER' />
            <TaskList tasks={tasksList[3]} color='-yellow-500' state='HACIENDO' />
            <TaskList tasks={tasksList[4]} color='-blue-500' state='PROBANDO' />
            <TaskList tasks={tasksList[5]} color='-neutral-200' state='LISTO PARA APROBACIÓN' />
            <TaskList tasks={tasksList[6]} color='-green-500' state='COMPLETADO' />
          </div>
        </div>

      </div>
    </>
  )
}

export default Team
/*
tasksList: {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
}
*/
