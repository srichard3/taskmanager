import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Task {
  id: Date
  task: string
  isDone: boolean
}

interface TasksContextType {
  tasks: Task[]
  addTask: (task: string) => void
  deleteTask: (id: Date) => void
  editTask: (id: Date, newTask: string) => void
  toggleIsDone: (id: Date) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export const useTasks = () => {
  const context = useContext(TasksContext)
  if (!context) throw new Error('useTasks must be used within a TasksProvider')
  return context
}

interface TasksProviderProps {
  children: ReactNode
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: new Date('2023-01-01'),
      task: 'Create your first task!',
      isDone: false
    },
    { id: new Date('2023-02-01'), task: 'Try to edit a task!', isDone: false },
    {
      id: new Date('2023-03-01'),
      task: 'Start using TaskManager!',
      isDone: true
    }
  ])

  const addTask = (task: string) => {
    if (task.trim() !== '') {
      setTasks(tasks => [...tasks, { id: new Date(), task, isDone: false }])
    }
  }

  const deleteTask = (id: Date) => {
    setTasks(tasks => tasks.filter(task => task.id !== id))
  }

  const toggleIsDone = (id: Date) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    )
    console.log('TOGGLE!', tasks)
  }

  const editTask = (id: Date, newTask: string) => {
    setTasks(tasks =>
      tasks.map(task => (task.id === id ? { ...task, task: newTask } : task))
    )
  }

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, deleteTask, editTask, toggleIsDone }}
    >
      {children}
    </TasksContext.Provider>
  )
}
