import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import logoPath from '../assets/TaskManager-Logo.png'
import { useState } from 'react'
import { useTasks } from '../TasksContext'

// Bolds the active route
const activeProps = {
  style: { fontWeight: 'bold' }
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
        <img src={logoPath} alt='TaskManager logo' className='w-1/2' />
        <div className='space-x-4 mb-4'>
          {/* Input field for new tasks. */}
          <input
            type='text'
            placeholder='Enter a task here.'
            className='py-2 px-4 border rounded w-1/2 mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent hover:outline-none hover:ring-2 hover:ring-gray-300 hover:border-transparent'
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
          {/* Button to add new tasks. */}
          <button
            onClick={initiateAddTask}
            className='bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-green-400 hover:to-green-400 text-white rounded py-2 px-4 shadow-md font-bold'
          >
            +
          </button>
        </div>
        {/* Task/Done Routes. */}
        <nav className='space-x-9 mx-3 my-2'>
          <Link to='/' activeProps={activeProps}>
            Tasks
          </Link>
          <Link to='/done' activeProps={activeProps}>
            Done
          </Link>
        </nav>

        <Outlet />
      </>
    )
  }
})
