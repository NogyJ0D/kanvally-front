import { DateTime } from 'luxon'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { URL } from '../config'
import { changeState, createComment, deleteComment, deleteTask } from '../features/task/taskSlice'
import Modal from './Modal'

const TaskItem = ({ task, color, userRole, provided, innerRef }) => {
  const { register: register1, handleSubmit: handleSubmit1 } = useForm()
  const { register: register2, handleSubmit: handleSubmit2 } = useForm()
  const [openTask, setOpenTask] = useState(false)
  const team = useSelector(state => state.team)
  const user = useSelector(state => state.user)
  const taskState = useSelector(state => state.task)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onTaskDelete = () => {
    dispatch(deleteTask({ teamId: team.id, taskId: task._id }))
      .then(res => {
        console.log(res)
        if (res.meta.requestStatus === 'fulfilled') return navigate(0)
      })
  }

  const onNewComment = ({ text, file }) => {
    dispatch(createComment({ teamId: team.id, idTask: task._id, username: user.username, text, file }))
      .then(res => { if (res.meta.requestStatus === 'fulfilled') return navigate(0) })
  }

  const onDelete = (id) => {
    dispatch(deleteComment({ idTeam: team.id, idTask: task._id, idComment: id }))
      .then(res => { if (res.meta.requestStatus === 'fulfilled') return navigate(0) })
  }

  const onStateChange = ({ state }) => {
    dispatch(changeState({ teamId: team.id, taskId: task._id, state }))
      .then(res => { if (res.meta.requestStatus === 'fulfilled') return navigate(0) })
  }

  return (
    <>
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
        onClick={() => { setOpenTask(true) }} className={`p-4 text-center mx-auto bg-${color} w-full text-ebony-clay-500 text-xl font-semibold`}
      >
        {task.name}
      </div>
      {
      openTask &&
        <Modal setOpenModal={setOpenTask} title={task.name} color={color}>
          <p className='w-full text-lg font-semibold'>Hecha por: {task.author}</p>
          <p className='w-full text-lg font-semibold'>Creada: {new Date(task.created_at).toLocaleString()}</p>
          <p className='w-full text-lg font-semibold'>Actualizada: {new Date(task.updated_at).toLocaleString()}</p>
          <p className='w-full px-4 py-2 text-black bg-white border border-black rounded-lg'>{task.description}</p>
          {
            team.idLeader === user.id &&
              <>
                <button onClick={() => onTaskDelete()} className='w-full px-2 font-bold text-white border border-white rounded-lg bg-crimson-500'>Eliminar tarea</button>
                <p className='w-full text-xl font-bold text-center text-crimson-500'>{taskState.message}</p>
              </>
          }
          <form onChange={handleSubmit1(onStateChange)} className='flex items-center justify-center gap-4 px-2 py-1 rounded-lg bg-white/50'>
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

          <hr className='w-full bg-black border-2 border-black' />

          <p className='text-2xl font-semibold'>Comentarios:</p>
          <form className='flex flex-col w-full gap-2 px-2 py-1 border-2 border-black rounded-lg bg-white/50' onSubmit={handleSubmit2(onNewComment)}>
            <div className='flex justify-between'>
              <label className='text-xl font-semibold' htmlFor='text'>Nuevo comentario:</label>
              <input type='submit' value='Enviar' className='px-2 py-1 font-semibold text-white border border-white rounded-lg w-max bg-crimson-500' />
            </div>
            <textarea
              id='text'
              required
              className='w-full px-4 py-2 text-black bg-white border border-black rounded-lg outline-none'
              {...register2('text', { required: true })}
            />
            <label htmlFor='file' className='text-xl font-semibold'>Adjuntar archivo (opcional):</label>
            <input
              id='file'
              className='pl-8 file:px-4 file:py-1 file:bg-crimson-500 file:text-white file:border-ebony-clay-500 file:border file:rounded-full file:outline-none'
              type='file'
              {...register2('file')}
            />
          </form>
          {
            task.comments?.map(comment => {
              return (
                <div key={comment._id} className='flex flex-col w-full gap-2 px-2 py-1 border-2 border-black rounded-lg bg-white/50'>
                  <div className='flex justify-between'>
                    <p className='px-2 py-1 text-xl font-semibold border border-white rounded-lg'>{comment.username}</p>
                    <p className='px-2 py-1 text-lg font-semibold border border-white rounded-lg'>{DateTime.fromISO(comment.created_date).toLocaleString({ day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <p className='w-full px-4 py-2 text-black bg-white border border-black rounded-lg outline-none'>{comment.text}</p>
                  <div className='flex justify-between'>
                    {
                      comment.fileUrl && <a href={URL + comment.fileUrl} target='_blank' rel='noreferrer' download={comment.fileKey} className='px-2 text-lg font-semibold text-blue-800 underline'>Descargar archivo</a>
                    }
                    {
                      (comment.username === user.username || userRole === 'Líder') &&
                        <button onClick={() => onDelete(comment._id)} className='px-2 py-1 font-semibold text-white border border-white rounded-lg w-max bg-crimson-500'>Eliminar</button>
                    }
                  </div>
                </div>
              )
            })
          }
        </Modal>
      }
    </>
  )
}

export default TaskItem
