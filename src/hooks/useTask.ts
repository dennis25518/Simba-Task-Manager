import { createContext, useContext } from "react";

interface TaskContextType {
  tasks: any[];
  addTask: (task: any) => void;
  updateTask: (id: string, task: any) => void;
  deleteTask: (id: string) => void;
  getTaskStats: () => {
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
  };
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
