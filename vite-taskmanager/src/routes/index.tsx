import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTasks, Task } from '../TasksContext'

export const Route = createFileRoute('/')({
  component: () => {
    // Initialize tasks and TaskContext functionality
    const { tasks, editTask, toggleIsDone, setDueDate } = useTasks()

    // Initialize state for editing tasks
    const [editingId, resetEditingId] = useState<Date | null>(null)
    const [editedTask, resetEditedTask] = useState('')

    // Initialize state for due date selection
    const [selectingDueDateFor, resetSelectingDueDateFor] =
      useState<Date | null>(null)
    const [tempDueDate, resetTempDueDate] = useState<string>('')

    // Filter out the tasks that are NOT done
    const notDoneTasks = tasks.filter(task => !task.isDone)

    // Function to begin task editing
    const beginEdit = (task: Task) => {
      resetEditingId(task.id)
      resetEditedTask(task.task)
    }

    // Function to save the edited task
    const saveEdit = (id: Date) => {
      editTask(id, editedTask)
      resetEditingId(null)
      resetEditedTask('')
    }

    return (
      <div className='flex justify-center p-4'>
        <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-4xl'>
          {/* List of tasks. */}
          {notDoneTasks.map(task => (
            <li
              key={task.id.toString()}
              className='flex justify-between items-center mb-3 bg-white p-4 rounded shadow-md'
            >
              {/* Functionality to provide a text input when editing a task. */}
              {editingId === task.id || selectingDueDateFor === task.id ? (
                <>
                  {editingId === task.id ? (
                    <input
                      type='text'
                      value={editedTask}
                      onChange={e => resetEditedTask(e.target.value)}
                      className='flex-1 mr-2 p-2 hover:outline-none hover:ring-2 hover:ring-gray-300 hover:border-transparent'
                    />
                  ) : (
                    <input
                      type='date'
                      value={tempDueDate}
                      onChange={e => resetTempDueDate(e.target.value)}
                      onBlur={() => {
                        setDueDate(task.id, tempDueDate)
                        resetSelectingDueDateFor(null)
                      }}
                      className='mx-2'
                    />
                  )}
                </>
              ) : (
                // Task and Due Date content.
                <div className='flex-1'>
                  <span className='text-3xl'>{task.task}</span>
                  <div className='mx-2 text-gray-500 text-sm'>
                    {task.dueDate && 'Due: ' + task.dueDate}
                  </div>
                </div>
              )}
              <div className='space-x-4'>
                {/* Functionality to show Save button when editing a task. */}
                {editingId === task.id || selectingDueDateFor === task.id ? (
                  <>
                    {editingId === task.id ? (
                      <button
                        onClick={() => saveEdit(task.id)}
                        className='bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-400 hover:to-blue-400 text-white rounded py-2 px-4 shadow-md font-bold'
                        title='Save Changes'
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => saveEdit(task.id)}
                        className='bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-400 hover:to-blue-400 text-white rounded py-2 px-4 shadow-md font-bold'
                        title='Save Changes'
                      >
                        Save
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {/* Edit button to edit a task. */}
                    <button
                      onClick={() => beginEdit(task)}
                      className='bg-gradient-to-r from-slate-400 to-slate-600 hover:from-slate-400 hover:to-slate-400 text-white rounded py-2 px-4 shadow-md font-bold'
                      title='Edit Task'
                    >
                      ✎
                    </button>
                    {/* Calendar button to add the due date for a task. */}
                    <button
                      onClick={() => resetSelectingDueDateFor(task.id)}
                      className='bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-400 hover:to-yellow-400 text-white rounded py-2 px-4 shadow-md font-bold'
                      title='Set Due Date'
                    >
                      📅
                    </button>
                    {/* Done button to add a task to the Done section. */}
                    <button
                      onClick={() => toggleIsDone(task.id)}
                      className='bg-gradient-to-r from-green-400 to-green-600 hover:from-green-400 hover:to-green-400 text-white rounded py-2 px-4 shadow-md font-bold'
                      title='Mark Completed'
                    >
                      ✓
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
