import TaskItem from './TaskItem'

const TaskList = ({ tasks, state, color }) => {
  return (
    <div className={`border-2 border-${color} h-full w-max`}>
      <h3 className={`text-2xl font-bold text-center w-max px-4 text-ebony-clay-500 bg-${color}`}>{state}</h3>
      <div className='flex flex-col h-[430px] gap-4 p-4 overflow-y-auto auto-rows-fr bg-ebony-clay-400'>
        {
        tasks.map(task => {
          return (
            <TaskItem key={task._id} task={task} color={color} />
          )
        })
      }
      </div>
    </div>
  )
}

export default TaskList
