import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import logoPath from '../assets/TaskManager-Logo.png'
import { useState } from 'react'
import { useTasks } from '../TasksContext'

// Bolds the active route
const activeProps = {
  style: {
    //fontWeight: 'bold',
    //boxShadow: '0 0 8px 2px rgba(252, 211, 77, 0.6)',
    backgroundColor: 'rgba(252, 211, 77, 0.6)'
  }
}

export const Route = createRootRoute({
  component: () => {
    // Initialize tasks and TaskContecxt functionality
    const [newTask, setNewTask] = useState('')
    const { addTask } = useTasks()

    // Function to add a new task
    const initiateAddTask = () => {
      if (newTask.trim() !== '') {
        addTask(newTask)
        setNewTask('')
      }
    }

    return (
      <>
        {/* TaskManager Title/Logo. */}
        <img src={logoPath} alt='TaskManager logo' className='w-1/2 mx-auto' />
        <div className='space-x-4 flex justify-center items-center'>
          {/* Input field for new tasks. */}
          <input
            type='text'
            placeholder='Enter a task here.'
            className='py-2 px-4 border rounded w-1/2 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent hover:outline-none hover:ring-2 hover:ring-gray-300 hover:border-transparent'
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
          {/* Button to add new tasks. */}
          <button
            onClick={initiateAddTask}
            className={`${
              newTask.trim().length === 0
                ? 'bg-gray-300'
                : 'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-400'
            } text-white rounded py-2 px-4 shadow-md font-bold`}
            title='Add Task'
          >
            +
          </button>
        </div>
        {/* Task/Done Routes. */}
        <nav className='flex justify-center items-center mt-12 mb-10'>
          <div dir='ltr'>
            <Link
              to='/'
              activeProps={activeProps}
              className='bg-white rounded-s-full px-6 py-2 shadow-md'
            >
              Tasks
            </Link>
          </div>
          <div dir='rtl'>
            <Link
              to='/done'
              activeProps={activeProps}
              className='bg-white rounded-s-full px-6 py-2 shadow-md'
            >
              Done
            </Link>
          </div>
        </nav>

        <Outlet />
      </>
    )
  }
})
