import React, { createContext, useContext, useState, ReactNode } from 'react'

//  Initialize Task structure
export interface Task {
  id: Date
  task: string
  isDone: boolean
  dueDate?: string
}

//  Initialize Task Context and Functions
interface TasksContextType {
  tasks: Task[]
  addTask: (task: string) => void
  deleteTask: (id: Date) => void
  editTask: (id: Date, newTask: string) => void
  toggleIsDone: (id: Date) => void
  setDueDate: (id: Date, dueDate: string) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

//  Initialize useTask hook
export const useTasks = () => {
  const context = useContext(TasksContext)
  if (!context) throw new Error('useTasks must be used within a TasksProvider')
  return context
}

interface TasksProviderProps {
  children: ReactNode
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  // initialize starter tasks
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: new Date('2023-01-01'),
      task: 'Create your first task!',
      isDone: false
    },
    {
      id: new Date('2023-02-01'),
      task: 'Try to edit this task!',
      isDone: false
    },
    {
      id: new Date('2023-03-01'),
      task: 'Start using TaskManager!',
      isDone: true
    }
  ])

  // Function to add a new task
  const addTask = (task: string) => {
    if (task.trim() !== '') {
      setTasks(tasks => [...tasks, { id: new Date(), task, isDone: false }])
    }
  }

  // Function to delete a task
  const deleteTask = (id: Date) => {
    setTasks(tasks => tasks.filter(task => task.id !== id))
  }

  // Function to toggle a task's isDone status
  const toggleIsDone = (id: Date) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    )
    console.log('TOGGLE!', tasks)
  }

  // Function to edit a task
  const editTask = (id: Date, newTask: string) => {
    setTasks(tasks =>
      tasks.map(task => (task.id === id ? { ...task, task: newTask } : task))
    )
  }

  // Function to set a task's due date
  const setDueDate = (id: Date, dueDate: string) => {
    setTasks(tasks =>
      tasks.map(task => (task.id === id ? { ...task, dueDate } : task))
    )
  }

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, deleteTask, editTask, toggleIsDone, setDueDate }}
    >
      {children}
    </TasksContext.Provider>
  )
}
