import React, { useState } from "react";
import { FiPlus, FiTrash2, FiCalendar } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  createdAt: string;
  status: "pending" | "in-progress" | "completed";
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Setup authentication flow",
      description: "Implement OAuth2 and JWT authentication",
      project: "User App",
      priority: "high",
      dueDate: "2026-02-28",
      createdAt: "2026-02-19",
      status: "in-progress",
    },
    {
      id: "2",
      title: "Design API endpoints",
      description: "Create RESTful API documentation",
      project: "Driver App",
      priority: "high",
      dueDate: "2026-03-05",
      createdAt: "2026-02-18",
      status: "in-progress",
    },
    {
      id: "3",
      title: "Database schema design",
      description: "Design PostgreSQL database structure",
      project: "Admin Dashboard",
      priority: "medium",
      dueDate: "2026-03-10",
      createdAt: "2026-02-17",
      status: "pending",
    },
    {
      id: "4",
      title: "Payment integration",
      description: "Integrate Stripe payment gateway",
      project: "Payment Gateway",
      priority: "high",
      dueDate: "2026-04-15",
      createdAt: "2026-02-15",
      status: "pending",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "User App",
    priority: "medium" as "high" | "medium" | "low",
    dueDate: "",
  });

  const projects = [
    "User App",
    "Driver App",
    "Admin Dashboard",
    "Payment Gateway",
  ];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        project: formData.project,
        priority: formData.priority,
        dueDate: formData.dueDate,
        createdAt: new Date().toISOString().split("T")[0],
        status: "pending",
      };
      setTasks([newTask, ...tasks]);
      setFormData({
        title: "",
        description: "",
        project: "User App",
        priority: "medium",
        dueDate: "",
      });
      setShowForm(false);
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getProjectColor = (project: string) => {
    const colors: { [key: string]: string } = {
      "User App": "bg-blue-100 text-blue-700",
      "Driver App": "bg-purple-100 text-purple-700",
      "Admin Dashboard": "bg-green-100 text-green-700",
      "Payment Gateway": "bg-orange-100 text-orange-700",
    };
    return colors[project] || "bg-gray-100 text-gray-700";
  };

  // Sort tasks by creation date (most recent first)
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar onNavigate={() => {}} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
              <p className="text-sm text-gray-600 mt-1">
                Create and manage tasks across all Simba Express projects
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <FiPlus className="w-4 h-4" />
              New Task
            </button>
          </div>

          {/* Add Task Form */}
          {showForm && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Create New Task
              </h2>
              <form onSubmit={handleAddTask} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Task Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Task Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter task title"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>

                  {/* Project Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project *
                    </label>
                    <select
                      value={formData.project}
                      onChange={(e) =>
                        setFormData({ ...formData, project: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    >
                      {projects.map((proj) => (
                        <option key={proj} value={proj}>
                          {proj}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority: e.target.value as "high" | "medium" | "low",
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter task description"
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm resize-none"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Create Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tasks List */}
          <div className="space-y-4">
            {sortedTasks.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-600">
                  No tasks yet. Create your first task!
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  {sortedTasks.length} task{sortedTasks.length !== 1 ? "s" : ""}{" "}
                  (sorted by most recent)
                </p>
                {sortedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow group"
                  >
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-900 mb-1">
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-sm text-gray-600">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0 ml-4"
                      >
                        <FiTrash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>

                    {/* Task Meta */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
                      {/* Project Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getProjectColor(task.project)}`}
                      >
                        {task.project}
                      </span>

                      {/* Priority Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority.charAt(0).toUpperCase() +
                          task.priority.slice(1)}{" "}
                        Priority
                      </span>

                      {/* Created Date */}
                      <div className="flex items-center gap-1 text-xs text-gray-600 ml-auto">
                        <FiCalendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>Created {formatDate(task.createdAt)}</span>
                      </div>

                      {/* Due Date */}
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <FiCalendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>Due {formatDate(task.dueDate)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tasks;
