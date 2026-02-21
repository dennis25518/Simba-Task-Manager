import React, { useState } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiBookmark,
  FiCheckSquare,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiTarget,
} from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onNavigate?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: FiHome, id: "dashboard" },
    { name: "Projects", icon: FiBookmark, id: "projects" },
    { name: "Tasks", icon: FiCheckSquare, id: "tasks" },
    { name: "Chat", icon: FiCalendar, id: "calendar" },
    { name: "Team", icon: FiUsers, id: "team" },
    { name: "Settings", icon: FiSettings, id: "settings" },
  ];

  const handleMenuClick = (id: string) => {
    onNavigate?.(id);
    navigate(`/${id}`);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors lg:hidden"
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300 z-40 ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-6 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <FiTarget className="w-6 h-6" />
            {isOpen && <span className="text-2xl font-bold">Simba</span>}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-left group"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-700 p-3 space-y-3">
          {/* Account Button */}
          <button
            onClick={() => navigate("/profile")}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
                {user?.name.charAt(0).toUpperCase()}
              </div>
            )}
            {isOpen && (
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar Spacing */}
      <div
        className={`transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}
      />
    </>
  );
};

export default Sidebar;
