import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import logoPath from '../assets/TaskManager-Logo.png'
import { useState } from 'react'
const activeProps = {
  style: { fontWeight: 'bold' }
}

export const Route = createRootRoute({
  component: () => (
    <>
      <img src={logoPath} alt='TaskManager logo' className='w-1/2' />
      <div className='space-x-4 mb-4'>
        <input
          type='text'
          placeholder='Enter a task here.'
          className='py-2 px-4 border rounded w-1/2 mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent hover:outline-none hover:ring-2 hover:ring-gray-300 hover:border-transparent'
        />
        <button className='bg-gradient-to-r from-green-400 to-green-600 hover:from-green-400 hover:to-green-400 text-white rounded py-2 px-4 shadow-md font-bold'>
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
})
