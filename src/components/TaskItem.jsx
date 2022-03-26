import { useState } from 'react'
import Modal from './Modal'

const TaskItem = ({ task, color }) => {
  const [openTask, setOpenTask] = useState(false)

  return (
    <>
      {
      openTask &&
        <Modal setOpenModal={setOpenTask} title={task.name}>
          <p>{task.description}</p>
        </Modal>
      }
      <button onClick={() => { setOpenTask(true) }} className={`p-4 mx-auto bg${color} w-full text-ebony-clay-500 text-xl font-semibold`}>{task.name}</button>
    </>
  )
}

export default TaskItem
