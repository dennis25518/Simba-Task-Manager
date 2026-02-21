import React from "react";
import { FiPhone, FiMessageCircle } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
}

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Project Manager",
      email: "sarah.johnson@simbaexpress.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      department: "Management",
    },
    {
      id: "2",
      name: "Alex Chen",
      role: "Full Stack Developer",
      email: "alex.chen@simbaexpress.com",
      phone: "+1 (555) 234-5678",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      department: "Engineering",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "UI/UX Designer",
      email: "emily.r@simbaexpress.com",
      phone: "+1 (555) 345-6789",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      department: "Design",
    },
    {
      id: "4",
      name: "Marcus Williams",
      role: "Backend Engineer",
      email: "marcus.w@simbaexpress.com",
      phone: "+1 (555) 456-7890",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      department: "Engineering",
    },
    {
      id: "5",
      name: "Jessica Lee",
      role: "QA Engineer",
      email: "jessica.lee@simbaexpress.com",
      phone: "+1 (555) 567-8901",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
      department: "Quality Assurance",
    },
    {
      id: "6",
      name: "David Patel",
      role: "DevOps Engineer",
      email: "david.patel@simbaexpress.com",
      phone: "+1 (555) 678-9012",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      department: "Infrastructure",
    },
    {
      id: "7",
      name: "Lisa Thompson",
      role: "Product Manager",
      email: "lisa.thompson@simbaexpress.com",
      phone: "+1 (555) 789-0123",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      department: "Product",
    },
    {
      id: "8",
      name: "James Wilson",
      role: "Mobile Developer",
      email: "james.wilson@simbaexpress.com",
      phone: "+1 (555) 890-1234",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      department: "Engineering",
    },
  ];

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      Management: "bg-blue-100 text-blue-700",
      Engineering: "bg-purple-100 text-purple-700",
      Design: "bg-pink-100 text-pink-700",
      "Quality Assurance": "bg-green-100 text-green-700",
      Infrastructure: "bg-orange-100 text-orange-700",
      Product: "bg-indigo-100 text-indigo-700",
    };
    return colors[department] || "bg-gray-100 text-gray-700";
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleText = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar onNavigate={() => {}} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {/* Top Bar */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
            <p className="text-sm text-gray-600 mt-1">
              Connect with your Simba Express development team
            </p>
          </div>

          {/* Team Grid - 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Header Background */}
                <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600"></div>

                {/* Profile Content */}
                <div className="px-5 pb-5">
                  {/* Avatar */}
                  <div className="flex justify-center -mt-12 mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                    />
                  </div>

                  {/* Name and Role */}
                  <h3 className="text-center text-base font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-center text-sm font-semibold text-blue-600 mb-3">
                    {member.role}
                  </p>

                  {/* Department Badge */}
                  <div className="flex justify-center mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getDepartmentColor(
                        member.department,
                      )}`}
                    >
                      {member.department}
                    </span>
                  </div>

                  {/* Email */}
                  <p className="text-center text-xs text-gray-600 mb-4 truncate">
                    {member.email}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleCall(member.phone)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors text-sm font-medium"
                      title={`Call ${member.name}`}
                    >
                      <FiPhone className="w-4 h-4" />
                      <span>Call</span>
                    </button>
                    <button
                      onClick={() => handleText(member.email)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors text-sm font-medium"
                      title={`Message ${member.name}`}
                    >
                      <FiMessageCircle className="w-4 h-4" />
                      <span>Text</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {teamMembers.length}
              </p>
              <p className="text-sm text-gray-600">Total Team Members</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-3xl font-bold text-purple-600 mb-2">
                {new Set(teamMembers.map((m) => m.department)).size}
              </p>
              <p className="text-sm text-gray-600">Departments</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-3xl font-bold text-green-600 mb-2">
                {
                  new Set(
                    teamMembers.filter((m) => m.department === "Engineering"),
                  ).size
                }
              </p>
              <p className="text-sm text-gray-600">Engineers</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Team;
