import { createContext, useContext, useState } from 'react';

// Create context
const TaskContext = createContext();

// Provider component
export function TaskProvider({ children }) {
  const [taskData, setTaskData] = useState([]);

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