import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTask } from "../hooks/useTask";

const ProductivityChart: React.FC = () => {
  const { getTaskStats } = useTask();
  const stats = getTaskStats();

  const data = [
    { name: "Completed", value: stats.completed, fill: "#10b981" },
    { name: "In Progress", value: stats.inProgress, fill: "#f59e0b" },
    { name: "Pending", value: stats.pending, fill: "#ef4444" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        Productivity Insights
      </h3>
      <p className="text-xs text-gray-500 mb-4">This week's summary</p>

      <div className="flex items-center justify-center mb-4">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Tasks completed</span>
          </div>
          <span className="font-semibold text-gray-900">+24%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <span className="text-gray-600">On-time delivery</span>
          </div>
          <span className="font-semibold text-gray-900">92%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <span className="text-gray-600">Team efficiency</span>
          </div>
          <span className="font-semibold text-gray-900">Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default ProductivityChart;
