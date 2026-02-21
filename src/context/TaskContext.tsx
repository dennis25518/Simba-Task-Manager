import React, { useState, type ReactNode } from "react";
import type { Task } from "../types";
import { TaskContext } from "../hooks/useTask";

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Setup React project with Tailwind",
      description: "Initialize React project with TypeScript and Tailwind CSS",
      status: "completed",
      priority: "high",
      dueDate: "2026-02-10",
      project: "Simba Express",
    },
    {
      id: "2",
      title: "Create authentication pages",
      description: "Design and implement login/register pages",
      status: "completed",
      priority: "high",
      dueDate: "2026-02-15",
      project: "Simba Express",
    },
    {
      id: "3",
      title: "Build dashboard page",
      description: "Create stunning dashboard with cards and charts",
      status: "in-progress",
      priority: "high",
      dueDate: "2026-02-21",
      project: "Simba Express",
    },
    {
      id: "4",
      title: "Implement task management features",
      description: "Add, edit, delete, and filter tasks",
      status: "pending",
      priority: "high",
      dueDate: "2026-02-25",
      project: "Simba Express",
    },
    {
      id: "5",
      title: "Add calendar component",
      description: "Integrate calendar for task scheduling",
      status: "pending",
      priority: "medium",
      dueDate: "2026-03-01",
      project: "Simba Express",
    },
    {
      id: "6",
      title: "Create team collaboration features",
      description: "Add team management and task assignment",
      status: "pending",
      priority: "medium",
      dueDate: "2026-03-05",
      project: "Simba Express",
    },
  ]);

  const addTask = (task: Task) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getTaskStats = () => {
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.status === "completed").length,
      pending: tasks.filter((t) => t.status === "pending").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
    };
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, getTaskStats }}
    >
      {children}
    </TaskContext.Provider>
  );
};
