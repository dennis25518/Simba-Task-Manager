import React, { useState } from "react";
import {
  FiSettings,
  FiUsers,
  FiLock,
  FiBell,
  FiToggleRight,
  FiToggleLeft,
  FiChevronRight,
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";

interface RolePermission {
  id: string;
  role: string;
  description: string;
  permissions: string[];
}

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("roles");
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "1",
      label: "Task Assignments",
      description: "Receive notifications when assigned to a task",
      enabled: true,
    },
    {
      id: "2",
      label: "Project Updates",
      description: "Get notified about project status changes",
      enabled: true,
    },
    {
      id: "3",
      label: "Team Mentions",
      description: "Receive alerts when mentioned by team members",
      enabled: true,
    },
    {
      id: "4",
      label: "Deadline Reminders",
      description: "Get reminded about upcoming deadlines",
      enabled: true,
    },
    {
      id: "5",
      label: "Weekly Reports",
      description: "Receive weekly progress reports",
      enabled: false,
    },
  ]);

  const rolePermissions: RolePermission[] = [
    {
      id: "1",
      role: "Admin",
      description: "Full access to all features and settings",
      permissions: [
        "View all projects",
        "Manage users",
        "Create tasks",
        "Edit tasks",
        "Delete tasks",
        "View reports",
        "Manage settings",
      ],
    },
    {
      id: "2",
      role: "Project Manager",
      description: "Manage projects and team tasks",
      permissions: [
        "View assigned projects",
        "Create tasks",
        "Edit own tasks",
        "Manage team members",
        "View project reports",
      ],
    },
    {
      id: "3",
      role: "Developer",
      description: "Work on assigned tasks and projects",
      permissions: ["View assigned tasks", "Edit own tasks", "Submit updates"],
    },
    {
      id: "4",
      role: "Designer",
      description: "Design and creative tasks",
      permissions: [
        "View assigned tasks",
        "Edit own tasks",
        "Upload designs",
        "Comment on tasks",
      ],
    },
    {
      id: "5",
      role: "QA Engineer",
      description: "Test and verify project quality",
      permissions: [
        "View assigned tasks",
        "Report issues",
        "Mark tasks complete",
      ],
    },
  ];

  const workflowStages = [
    {
      id: "1",
      name: "Planning",
      description: "Initial project planning phase",
    },
    {
      id: "2",
      name: "In Development",
      description: "Active development and coding",
    },
    {
      id: "3",
      name: "Testing",
      description: "Quality assurance and testing phase",
    },
    {
      id: "4",
      name: "Completed",
      description: "Project completed and deployed",
    },
  ];

  const toggleNotification = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif,
      ),
    );
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar onNavigate={() => {}} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {/* Top Bar */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-600 mt-1">
              Configure roles, permissions, and workflow for your team
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("roles")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "roles"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              <FiUsers className="inline mr-2 w-4 h-4" />
              Team Roles
            </button>
            <button
              onClick={() => setActiveTab("workflow")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "workflow"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              <FiSettings className="inline mr-2 w-4 h-4" />
              Workflow
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "notifications"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              <FiBell className="inline mr-2 w-4 h-4" />
              Notifications
            </button>
          </div>

          {/* Team Roles Tab */}
          {activeTab === "roles" && (
            <div className="space-y-5">
              <p className="text-sm text-gray-600 mb-6">
                Define team member roles and their permissions
              </p>
              {rolePermissions.map((roleData) => (
                <div
                  key={roleData.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  {/* Role Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {roleData.role}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {roleData.description}
                      </p>
                    </div>
                    <FiLock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>

                  {/* Permissions List */}
                  <div className="space-y-2">
                    {roleData.permissions.map((permission, idx) => (
                      <div key={idx} className="flex items-center gap-3 mt-3">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-gray-700">
                          {permission}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Edit Button */}
                  <button className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors">
                    Edit Permissions
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Workflow Tab */}
          {activeTab === "workflow" && (
            <div className="space-y-5">
              <p className="text-sm text-gray-600 mb-6">
                Configure project workflow stages and transitions
              </p>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Project Stages
                </h3>
                <div className="space-y-4">
                  {workflowStages.map((stage, idx) => (
                    <div
                      key={stage.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {stage.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {stage.description}
                          </p>
                        </div>
                      </div>
                      {idx < workflowStages.length - 1 && (
                        <div className="text-gray-400 text-sm ml-4"> → </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Workflow Rules
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Auto-assign tasks
                      </p>
                      <p className="text-sm text-gray-600">
                        Automatically assign tasks based on capacity
                      </p>
                    </div>
                    <FiToggleRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Require approval
                      </p>
                      <p className="text-sm text-gray-600">
                        Require manager approval before deployment
                      </p>
                    </div>
                    <FiToggleRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Time tracking
                      </p>
                      <p className="text-sm text-gray-600">
                        Enable time tracking for all tasks
                      </p>
                    </div>
                    <FiToggleLeft className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-5">
              <p className="text-sm text-gray-600 mb-6">
                Manage your notification preferences
              </p>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {notifications.map((notif, idx) => (
                  <div
                    key={notif.id}
                    className={`flex items-center justify-between p-5 ${
                      idx !== notifications.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    } hover:bg-gray-50 transition-colors`}
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {notif.label}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {notif.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleNotification(notif.id)}
                      className="ml-4 flex-shrink-0 transition-colors"
                    >
                      {notif.enabled ? (
                        <FiToggleRight className="w-6 h-6 text-green-600" />
                      ) : (
                        <FiToggleLeft className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg border border-blue-200 p-5">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">💡 Tip:</span> You can
                  customize these settings at any time. Notifications will be
                  sent according to your preferences.
                </p>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Save Changes
            </button>
            <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
