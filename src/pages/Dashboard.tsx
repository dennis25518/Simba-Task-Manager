import React, { useState } from "react";
import { FiPlus, FiUsers } from "react-icons/fi";
import { BsCheckCircle, BsCircle, BsClock } from "react-icons/bs";
import { useAuth } from "../hooks/useAuth";
import { useTask } from "../hooks/useTask";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import ProductivityChart from "../components/ProductivityChart";
import StatCard from "../components/StatCard";

const Dashboard: React.FC = () => {
  const {} = useAuth();
  const { tasks, getTaskStats, addTask } = useTask();
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as "high" | "medium" | "low",
  });

  const stats = getTaskStats();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      addTask({
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        status: "pending",
        priority: newTask.priority,
        dueDate: new Date().toISOString().split("T")[0],
        project: "Simba Express",
      });
      setNewTask({ title: "", description: "", priority: "medium" });
      setShowNewTaskForm(false);
    }
  };

  const upcomingTasks = tasks
    .filter((t) => t.status !== "completed")
    .sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 6);

  const allTasks = tasks.slice(0, 6);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar onNavigate={() => {}} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {/* Top Bar with Title & Action */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back! Here's what happening with your projects.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard
              icon={FiUsers}
              label="All Tasks"
              value={stats.total}
              color="bg-blue-500"
              subtext="+2 this week"
            />
            <StatCard
              icon={BsClock}
              label="Pending Tasks"
              value={stats.pending}
              color="bg-orange-500"
              subtext="5 due today"
            />
            <StatCard
              icon={BsCheckCircle}
              label="Tasks Completed"
              value={`${Math.round((stats.completed / stats.total) * 100)}%`}
              color="bg-green-500"
              subtext="67% completion rate"
            />
            <StatCard
              icon={BsCircle}
              label="Team Members"
              value="4"
              color="bg-purple-500"
              subtext="3 online now"
            />
          </div>

          {/* Section Headers Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">All Tasks</h2>
                <a
                  href="#"
                  className="text-xs text-gray-600 hover:text-gray-900"
                >
                  View All
                </a>
              </div>
            </div>
            <div className="lg:col-span-1">
              <h2 className="text-lg font-bold text-gray-900">
                Productivity Insights
              </h2>
            </div>
          </div>

          {/* Main Content Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            {/* Left Column - Tasks (3 cols) */}
            <div className="lg:col-span-3">
              {/* Task Grid - 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {allTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>

              {/* Upcoming Tasks Section */}
              <h2 className="text-lg font-bold text-gray-900 mb-5 mt-8">
                Upcoming Tasks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* Right Column - Productivity & Insights */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <ProductivityChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
