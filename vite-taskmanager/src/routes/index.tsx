import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <>
      <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-4xl'>
          <li className='flex justify-between items-center mb-3 bg-white p-4 rounded shadow-md'>
            <span className='text-3xl'>Task</span>
            <div className='space-x-4'>
              <button className='bg-gradient-to-r from-slate-400 to-slate-600 hover:from-slate-400 hover:to-slate-400 text-white rounded py-2 px-4 shadow-md font-bold'>
                Edit
              </button>
              <button className='bg-gradient-to-r from-red-400 to-red-600 hover:from-red-400 hover:to-red-400 text-white rounded py-2 px-4 shadow-md font-bold'>
                Delete
              </button>
            </div>
          </li>
        </div>
      </div>
    </>
  )
})
