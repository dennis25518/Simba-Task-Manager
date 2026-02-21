import React from "react";
import { FiUsers, FiCode, FiCheckCircle, FiClock } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "planning" | "in-development" | "testing" | "completed";
  progress: number;
  team: number;
  tasks: {
    total: number;
    completed: number;
  };
  startDate: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: "1",
      name: "User App",
      description:
        "Customer-facing mobile application for booking and tracking deliveries",
      status: "in-development",
      progress: 65,
      team: 4,
      tasks: {
        total: 28,
        completed: 18,
      },
      startDate: "Jan 15, 2026",
      dueDate: "Mar 15, 2026",
      priority: "high",
    },
    {
      id: "2",
      name: "Driver App",
      description:
        "Driver mobile application for delivery management and route optimization",
      status: "in-development",
      progress: 45,
      team: 3,
      tasks: {
        total: 32,
        completed: 13,
      },
      startDate: "Jan 20, 2026",
      dueDate: "Apr 10, 2026",
      priority: "high",
    },
    {
      id: "3",
      name: "Admin Dashboard",
      description: "Web-based admin panel for system monitoring and management",
      status: "in-development",
      progress: 55,
      team: 5,
      tasks: {
        total: 24,
        completed: 13,
      },
      startDate: "Jan 10, 2026",
      dueDate: "Mar 30, 2026",
      priority: "high",
    },
    {
      id: "4",
      name: "Payment Gateway",
      description:
        "Secure payment processing and transaction management system",
      status: "planning",
      progress: 20,
      team: 2,
      tasks: {
        total: 16,
        completed: 3,
      },
      startDate: "Feb 01, 2026",
      dueDate: "May 01, 2026",
      priority: "medium",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "testing":
        return "bg-blue-100 text-blue-700";
      case "in-development":
        return "bg-yellow-100 text-yellow-700";
      case "planning":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "from-green-400 to-green-500";
    if (progress >= 50) return "from-blue-400 to-blue-500";
    if (progress >= 25) return "from-yellow-400 to-yellow-500";
    return "from-orange-400 to-orange-500";
  };

  const getStatusLabel = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar onNavigate={() => {}} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {/* Top Bar with Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage all Simba Express development projects and track progress
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {project.description}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${getStatusColor(
                      project.status,
                    )}`}
                  >
                    {getStatusLabel(project.status)}
                  </span>
                </div>

                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">
                      Progress
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getProgressColor(
                        project.progress,
                      )} rounded-full transition-all`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Task Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Tasks</p>
                    <p className="text-lg font-bold text-gray-900">
                      {project.tasks.completed}/{project.tasks.total}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Team</p>
                    <div className="flex items-center gap-2">
                      <FiUsers className="w-4 h-4 text-blue-600" />
                      <p className="text-lg font-bold text-gray-900">
                        {project.team}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Due Date</p>
                    <p className="text-sm font-bold text-gray-900">
                      {project.dueDate}
                    </p>
                  </div>
                </div>

                {/* Footer with Dates */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiCode className="w-3.5 h-3.5 text-gray-400" />
                      <span>Started {project.startDate}</span>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded font-semibold ${
                      project.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : project.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {project.priority.charAt(0).toUpperCase() +
                      project.priority.slice(1)}{" "}
                    Priority
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
