import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTasks, Task } from '../TasksContext'

export const Route = createFileRoute('/')({
  component: () => {
    const { tasks, editTask, deleteTask } = useTasks()
    const [editingId, setEditingId] = useState<Date | null>(null) // ID of the task being edited
    const [editedTask, setEditedTask] = useState('') // New task content

    // Function to handle task edit initiation
    const handleEdit = (task: Task) => {
      setEditingId(task.id)
      setEditedTask(task.task)
    }

    // Function to save the edited task
    const handleSave = (id: Date) => {
      editTask(id, editedTask)
      setEditingId(null) // Reset editing state
      setEditedTask('') // Clear edited task state
    }

    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-4xl'>
          {tasks.map(task => (
            <li
              key={task.id.toString()}
              className='flex justify-between items-center mb-3 bg-white p-4 rounded shadow-md'
            >
              {editingId === task.id ? (
                <input
                  type='text'
                  value={editedTask}
                  onChange={e => setEditedTask(e.target.value)}
                  className='flex-1 mr-2 p-2'
                />
              ) : (
                <span className='text-3xl'>{task.task}</span>
              )}
              <div className='space-x-4'>
                {editingId === task.id ? (
                  <button
                    onClick={() => handleSave(task.id)}
                    className='bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-400 hover:to-blue-400 text-white rounded py-2 px-4 shadow-md font-bold'
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(task)}
                      className='bg-gradient-to-r from-slate-400 to-slate-600 hover:from-slate-400 hover:to-slate-400 text-white rounded py-2 px-4 shadow-md font-bold'
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className='bg-gradient-to-r from-green-400 to-green-600 hover:from-green-400 hover:to-green-400 text-white rounded py-2 px-4 shadow-md font-bold'
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className='bg-gradient-to-r from-red-400 to-red-600 hover:from-red-400 hover:to-red-400 text-white rounded py-2 px-4 shadow-md font-bold'
                    >
                      ⊖
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </div>
      </div>
    )
  }
})
