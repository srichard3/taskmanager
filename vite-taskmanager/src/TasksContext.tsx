import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Task {
  id: Date
  task: string
}

interface TasksContextType {
  tasks: Task[]
  addTask: (task: string) => void
  deleteTask: (id: Date) => void
  editTask: (id: Date, newTask: string) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export const useTasks = () => {
  const context = useContext(TasksContext)
  if (!context) throw new Error('useTasks must be used within a TasksProvider')
  return context
}

interface TasksProviderProps {
  children: ReactNode // Define the type for children here
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  // Use the interface here
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (task: string) => {
    if (task.trim() !== '') {
      setTasks(tasks => [...tasks, { id: new Date(), task }])
    }
  }

  const deleteTask = (id: Date) => {
    setTasks(tasks => tasks.filter(task => task.id !== id))
  }

  const editTask = (id: Date, newTask: string) => {
    setTasks(tasks =>
      tasks.map(task => (task.id === id ? { ...task, task: newTask } : task))
    )
  }

  console.log('tasks:', tasks)

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, editTask }}>
      {children}
    </TasksContext.Provider>
  )
}
