import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createComment, deleteTask } from '../features/task/taskSlice'
import Modal from './Modal'

const TaskItem = ({ task, color }) => {
  const { register, handleSubmit } = useForm()
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

  const onNewComment = ({ text }) => {
    dispatch(createComment({ teamId: team.id, idTask: task._id, username: user.username, text }))
      .then(res => { if (res.meta.requestStatus === 'fulfilled') return navigate(0) })
  }

  // TODO: onDeleteComment

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
          <hr className='border-2 bg-black border-black w-full' />
          <p className='text-2xl font-semibold'>Comentarios:</p>
          <form className='border-2 border-black w-full rounded-lg bg-white/50 px-2 py-1 flex flex-col gap-2' onSubmit={handleSubmit(onNewComment)}>
            <div className='flex justify-between'>
              <label className='text-xl font-semibold' htmlFor='text'>Nuevo comentario:</label>
              <button className='w-max px-2 py-1 rounded-lg border border-white text-white font-semibold bg-crimson-500'>Crear</button>
            </div>
            <textarea
              id='text'
              required
              className='px-4 py-2 bg-white border outline-none border-black rounded-lg w-full text-black'
              {...register('text', { required: true })}
            />
          </form>
          {
            task.comments?.map(comment => {
              return (
                <div key={comment._id} className='border-2 border-black w-full rounded-lg bg-white/50 px-2 py-1 flex flex-col gap-2'>
                  <div className='flex justify-between'>
                    <p className='border border-white px-2 py-1 rounded-lg text-xl font-semibold'>{comment.username}</p>
                    <p className='border border-white px-2 py-1 rounded-lg text-lg font-semibold'>{new Date(comment.created_date).toLocaleString()}</p>
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
