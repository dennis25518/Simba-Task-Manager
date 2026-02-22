export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  priority?: "high" | "medium" | "low";
  dueDate?: string;
  project?: string;
  assignee?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: "admin" | "user" | "viewer";
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  tasks: Task[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}
