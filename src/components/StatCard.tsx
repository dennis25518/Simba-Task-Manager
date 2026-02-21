import React from "react";

type IconComponent = React.ComponentType<{ className?: string }>;

interface StatCardProps {
  icon: IconComponent;
  label: string;
  value: string | number;
  color: string;
  subtext?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  color,
  subtext,
}) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-gray-500 text-sm font-medium mb-3">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-4xl font-bold text-gray-900">{value}</h3>
        </div>
        {subtext && <p className="text-xs text-gray-400 mt-3">{subtext}</p>}
      </div>
      <div className={`p-3 rounded-lg ${color} flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default StatCard;
