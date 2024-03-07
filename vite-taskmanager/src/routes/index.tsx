import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTasks, Task } from '../TasksContext'

export const Route = createFileRoute('/')({
  component: () => {
    // Initialize tasks and TaskContecxt functionality
    const { tasks, editTask, deleteTask, toggleIsDone } = useTasks()

    // Initialize state for editing tasks
    const [editingId, setEditingId] = useState<Date | null>(null)
    const [editedTask, setEditedTask] = useState('')

    // Filter out the tasks that are NOT done
    const notDoneTasks = tasks.filter(task => !task.isDone)

    // Function to begin task editing
    const beginEdit = (task: Task) => {
      setEditingId(task.id)
      setEditedTask(task.task)
    }

    // Function to save the edited task
    const saveEdit = (id: Date) => {
      editTask(id, editedTask)
      setEditingId(null)
      setEditedTask('')
    }

    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-4xl'>
          {/* List of tasks. */}
          {notDoneTasks.map(task => (
            <li
              key={task.id.toString()}
              className='flex justify-between items-center mb-3 bg-white p-4 rounded shadow-md'
            >
              {/* Functionality to provide a text input when editing a task. */}
              {editingId === task.id ? (
                <input
                  type='text'
                  value={editedTask}
                  onChange={e => setEditedTask(e.target.value)}
                  className='flex-1 mr-2 p-2'
                />
              ) : (
                // Task content.
                <span className='text-3xl'>{task.task}</span>
              )}
              <div className='space-x-4'>
                {/* Functionality to show Save button when editing a task. */}
                {editingId === task.id ? (
                  <button
                    onClick={() => saveEdit(task.id)}
                    className='bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-400 hover:to-blue-400 text-white rounded py-2 px-4 shadow-md font-bold'
                  >
                    Save
                  </button>
                ) : (
                  <>
                    {/* Edit button to edit a task. */}
                    <button
                      onClick={() => beginEdit(task)}
                      className='bg-gradient-to-r from-slate-400 to-slate-600 hover:from-slate-400 hover:to-slate-400 text-white rounded py-2 px-4 shadow-md font-bold'
                    >
                      ✎
                    </button>
                    {/* Done button to add a task to the Done section. */}
                    <button
                      onClick={() => toggleIsDone(task.id)}
                      className='bg-gradient-to-r from-green-400 to-green-600 hover:from-green-400 hover:to-green-400 text-white rounded py-2 px-4 shadow-md font-bold'
                    >
                      ✓
                    </button>
                    {/* Delete button to permanently delete a task. */}
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
