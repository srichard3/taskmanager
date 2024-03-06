import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import logoPath from '../assets/TaskManager-Logo.png'
import { useState } from 'react'
import { TasksProvider, useTasks } from '../TasksContext'

const activeProps = {
  style: { fontWeight: 'bold' }
}

export const Route = createRootRoute({
  component: () => {
    const [newTask, setNewTask] = useState('')
    const { addTask } = useTasks() // Use the addTask method from context

    const handleAddTask = () => {
      console.log('newTask!!!:', newTask)
      if (newTask.trim() !== '') {
        addTask(newTask) // Use the addTask from your TasksProvider
        setNewTask('') // Reset input field
      }
    }

    return (
      <>
        <img src={logoPath} alt='TaskManager logo' className='w-1/2' />
        <div className='space-x-4 mb-4'>
          <input
            type='text'
            placeholder='Enter a task here.'
            className='py-2 px-4 border rounded w-1/2 mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent hover:outline-none hover:ring-2 hover:ring-gray-300 hover:border-transparent'
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className='bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-green-400 hover:to-green-400 text-white rounded py-2 px-4 shadow-md font-bold'
          >
            +
          </button>
        </div>
        <nav className='space-x-20'>
          <Link to='/' activeProps={activeProps}>
            Short Term Tasks
          </Link>
          <Link to='/long-term' activeProps={activeProps}>
            {({ isActive }) => <>Long Term Tasks{isActive && '*'}</>}
          </Link>
          <Link to='/done' activeProps={activeProps}>
            {({ isActive }) => <>Done{isActive && '*'}</>}
          </Link>
        </nav>

        <Outlet />
      </>
    )
  }
})
