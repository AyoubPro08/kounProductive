import { createContext, useContext, useState } from 'react';

// Create context
const TaskContext = createContext();

// Provider component
export function TaskProvider({ children }) {
  const [taskData, setTaskData] = useState([
     {
      name: "Get this project up and going",
      date: "2025-08-06",
      id: crypto.randomUUID()
    },
    {
      name: "Take a good amount of rest",
      date: "2025-08-06",
      id: crypto.randomUUID()
    }
  ]);

  return (
    <TaskContext.Provider value={{ taskData, setTaskData }}>
      {children}
    </TaskContext.Provider>
  );
}

// Hook for easy access
export function useTasks() {
  return useContext(TaskContext);
}