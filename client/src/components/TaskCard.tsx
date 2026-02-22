import React from "react";
import type { Task } from "../types";
import { FiCalendar, FiCircle, FiTrash2 } from "react-icons/fi";
import { useTask } from "../hooks/useTask";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { deleteTask } = useTask();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const priorityToProgress = {
    high: 75,
    medium: 50,
    low: 30,
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-shadow">
      {/* Header with Title and Delete Button */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900 flex-1">{task.title}</h3>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-1.5 hover:bg-red-50 rounded transition-colors flex-shrink-0"
        >
          <FiTrash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>

      {/* Date and Task Count Row */}
      <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <FiCalendar className="w-3.5 h-3.5 text-gray-400" />
          <span>{formatDate(task.dueDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <FiCircle className="w-3.5 h-3.5 text-gray-400" />
          <span>1 task</span>
        </div>
      </div>

      {/* Progress Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600 font-medium">Progress</span>
          <span className="text-xs font-semibold text-orange-500">
            {priorityToProgress[task.priority || "medium"]}%
          </span>
        </div>
        <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all"
            style={{
              width: `${priorityToProgress[task.priority || "medium"]}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
