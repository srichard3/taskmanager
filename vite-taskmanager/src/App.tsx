// import { useState } from 'react'
import './App.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App () {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='bg-gray-100 p-6 rounded shadow-md w-full m-10'>
          <h1 className='text-3xl'>
            <RouterProvider router={router} />
          </h1>
        </div>
      </div>
    </>
  )
}

export default App
