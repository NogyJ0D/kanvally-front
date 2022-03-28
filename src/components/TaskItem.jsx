import { DateTime } from 'luxon'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeState, createComment, deleteTask } from '../features/task/taskSlice'
import Modal from './Modal'

const TaskItem = ({ task, color }) => {
  const { register: register1, handleSubmit: handleSubmit1 } = useForm()
  const { register: register2, handleSubmit: handleSubmit2 } = useForm()
  const [openTask, setOpenTask] = useState(false)
  const team = useSelector(state => state.team)
  const user = useSelector(state => state.user)
  const taskState = useSelector(state => state.task)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userRole = team.members.filter(member => member._id._id === user.id)[0].role

  const onTaskDelete = () => {
    dispatch(deleteTask({ teamId: team.id, taskId: task._id }))
      .then(res => {
        console.log(res)
        if (res.meta.requestStatus === 'fulfilled') return navigate(0)
      })
  }

  const onNewComment = ({ text }) => {
    dispatch(createComment({ teamId: team.id, idTask: task._id, username: user.username, text }))
      .then(res => { if (res.meta.requestStatus === 'fulfilled') return navigate(0) })
  }

  // TODO: onDeleteComment

  const onStateChange = ({ state }) => {
    dispatch(changeState({ teamId: team.id, taskId: task._id, state }))
      .then(res => { if (res.meta.requestStatus === 'fulfilled') return navigate(0) })
  }

  return (
    <>
      {
      openTask &&
        <Modal setOpenModal={setOpenTask} title={task.name} color={color}>
          <p className='w-full font-semibold text-lg'>Hecha por: {task.author}</p>
          <p className='w-full font-semibold text-lg'>Creada: {new Date(task.created_at).toLocaleString()}</p>
          <p className='px-4 py-2 bg-white border border-black rounded-lg w-full text-black'>{task.description}</p>
          {
            team.idLeader === user.id &&
              <>
                <button onClick={() => onTaskDelete()} className='px-2 font-bold text-white border border-white rounded-lg w-full bg-crimson-500'>Eliminar tarea</button>
                <p className='w-full text-xl font-bold text-center text-crimson-500'>{taskState.message}</p>
              </>
          }
          <form onChange={handleSubmit1(onStateChange)} className='px-2 py-1 rounded-lg flex gap-4 justify-center items-center bg-white/50'>
            <label className='text-xl font-semibold' htmlFor='estado'>Cambiar el estado de la tarea:</label>
            <select
              className='px-4 py-1 text-black bg-white border rounded-lg outline-none border-ebony-clay-500'
              required
              id='estado'
              defaultValue={task.state}
              {...register1('state', { required: true })}
            >
              <option value='0'>Congelada</option>
              <option value='1'>Emergencia</option>
              <option value='2'>Por hacer</option>
              <option value='3'>Haciendo</option>
              <option value='4'>Probando</option>
              {
                (userRole === 'Tester' || userRole === 'Líder') &&
                  <option value='5'>
                    Listo para aprobación
                  </option>
              }
              {
                userRole === 'Líder' &&
                  <option value='6'>
                    Completado
                  </option>
              }
            </select>
            <button className='px-2 font-bold text-white border border-white rounded-lg w-max bg-crimson-500'>Actualizar</button>
          </form>

          <hr className='border-2 bg-black border-black w-full' />

          <p className='text-2xl font-semibold'>Comentarios:</p>
          <form className='border-2 border-black w-full rounded-lg bg-white/50 px-2 py-1 flex flex-col gap-2' onSubmit={handleSubmit2(onNewComment)}>
            <div className='flex justify-between'>
              <label className='text-xl font-semibold' htmlFor='text'>Nuevo comentario:</label>
              <button className='w-max px-2 py-1 rounded-lg border border-white text-white font-semibold bg-crimson-500'>Crear</button>
            </div>
            <textarea
              id='text'
              required
              className='px-4 py-2 bg-white border outline-none border-black rounded-lg w-full text-black'
              {...register2('text', { required: true })}
            />
          </form>
          {
            task.comments?.map(comment => {
              return (
                <div key={comment._id} className='border-2 border-black w-full rounded-lg bg-white/50 px-2 py-1 flex flex-col gap-2'>
                  <div className='flex justify-between'>
                    <p className='border border-white px-2 py-1 rounded-lg text-xl font-semibold'>{comment.username}</p>
                    <p className='border border-white px-2 py-1 rounded-lg text-lg font-semibold'>{DateTime.fromISO(comment.created_date).toLocaleString({ day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <p className='px-4 py-2 bg-white border outline-none border-black rounded-lg w-full text-black'>{comment.text}</p>
                  <button className='w-max px-2 py-1 rounded-lg border border-white text-white font-semibold bg-crimson-500'>Eliminar</button>
                </div>
              )
            })
          }
        </Modal>
      }
      <button onClick={() => { setOpenTask(true) }} className={`p-4 mx-auto bg-${color} w-full text-ebony-clay-500 text-xl font-semibold`}>{task.name}</button>
    </>
  )
}

export default TaskItem
