import { createFileRoute } from '@tanstack/react-router'
import { useTasks } from '../TasksContext'

export const Route = createFileRoute('/done')({
  component: () => {
    // Initialize tasks and TaskContecxt functionality
    const { tasks, deleteTask, toggleIsDone } = useTasks()

    // Filter out the tasks that ARE done
    const doneTasks = tasks.filter(task => task.isDone)

    return (
      <div className='flex justify-center p-4'>
        <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-4xl'>
          {/* List of tasks. */}
          {doneTasks.map(task => (
            <li
              key={task.id.toString()}
              className='flex justify-between items-center mb-3 bg-white p-4 rounded shadow-md'
            >
              {/* Task content. */}
              <span className='text-3xl'>{task.task}</span>
              <div className='space-x-4'>
                <>
                  {/* Undo button to bring a task back to Active Tasks. */}
                  <button
                    onClick={() => toggleIsDone(task.id)}
                    className='bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-400 hover:to-purple-400 text-white rounded py-2 px-4 shadow-md font-bold'
                    title='Mark As Incomplete'
                  >
                    Undo
                  </button>
                  {/* Delete button to permanently delete a task. */}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className='bg-gradient-to-r from-red-400 to-red-600 hover:from-red-400 hover:to-red-400 text-white rounded py-2 px-4 shadow-md font-bold'
                    title='Permanently Delete Task'
                  >
                    ⊖
                  </button>
                </>
              </div>
            </li>
          ))}
        </div>
      </div>
    )
  }
})
