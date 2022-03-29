import { Draggable, Droppable } from 'react-beautiful-dnd'
import TaskItem from './TaskItem'

const TaskList = ({ tasks, state, color, userRole, index, disabledBool }) => {
  return (
    <Droppable droppableId={index} isDropDisabled={disabledBool}>
      {(droppableProvided) => (
        <div className={`border-2 border-${color} h-full min-w-max`}>
          <h3 className={`text-2xl font-bold text-center w-full px-4 text-ebony-clay-500 bg-${color}`}>{state}</h3>
          <div
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            className='flex flex-col h-[430px] gap-4 p-4 auto-rows-fr bg-ebony-clay-400'
          >
            {tasks?.map((task, index2) => (
              <Draggable key={task._id._id} draggableId={task._id._id} index={index2}>
                {(draggableProvided) => (
                  <TaskItem
                    provided={draggableProvided}
                    innerRef={draggableProvided.innerRef}
                    userRole={userRole}
                    task={task._id}
                    color={color}
                  />
                )}
              </Draggable>
            ))}
            <div className={`bg-${color} w-max`}>{droppableProvided.placeholder}</div>
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default TaskList
