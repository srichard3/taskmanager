import { createFileRoute } from '@tanstack/react-router'
import { useTasks } from '../TasksContext'

export const Route = createFileRoute('/done')({
  component: () => {
    const { tasks, deleteTask, toggleIsDone } = useTasks()
    const doneTasks = tasks.filter(task => task.isDone)

    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-4xl'>
          {doneTasks.map(task => (
            <li
              key={task.id.toString()}
              className='flex justify-between items-center mb-3 bg-white p-4 rounded shadow-md'
            >
              <span className='text-3xl'>{task.task}</span>
              <div className='space-x-4'>
                <>
                  <button
                    onClick={() => toggleIsDone(task.id)}
                    className='bg-gradient-to-r from-green-400 to-green-600 hover:from-green-400 hover:to-green-400 text-white rounded py-2 px-4 shadow-md font-bold'
                  >
                    Undo
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className='bg-gradient-to-r from-red-400 to-red-600 hover:from-red-400 hover:to-red-400 text-white rounded py-2 px-4 shadow-md font-bold'
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
