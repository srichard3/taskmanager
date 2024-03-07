import './App.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { TasksProvider } from './TasksContext'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App () {
  return (
    <>
      <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='bg-gray-100 px-6 rounded shadow-md w-full mx-10 my-4'>
          <h1 className='text-4xl'>
            <TasksProvider>
              <RouterProvider router={router} />
            </TasksProvider>
          </h1>
        </div>
      </div>
    </>
  )
}

export default App
