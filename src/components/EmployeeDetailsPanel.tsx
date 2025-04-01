import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Clock,
  Clipboard,
} from "lucide-react";

interface EmployeeDetailsPanelProps {
  employeeId: string;
  onBack: () => void;
}

const calendarData = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31, null, null, null, null],
];

const EmployeeDetailsPanel: React.FC<EmployeeDetailsPanelProps> = ({
  employeeId,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock employee data - in a real app this would come from an API
  const employee = {
    id: employeeId,
    name:
      employeeId === "EMP001"
        ? "John Doe"
        : employeeId === "EMP017"
        ? "Sarah Smith"
        : employeeId === "EMP036"
        ? "Michael Chen"
        : "Employee " + employeeId,
    email: "employee@deloitte.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    department: "Engineering",
    role: "Senior Developer",
    status: "Active",
    joinedDate: "March 15, 2021",
    manager: "Alex Johnson",
    team: "Frontend Development",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    performance: 92,
    attendance: 96,
    achievements: [
      { title: "Employee of the Month", date: "January 2023" },
      { title: "Perfect Attendance", date: "Q2 2022" },
      { title: "Innovation Award", date: "December 2022" },
    ],
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricCard
                title="Performance"
                value={`${employee.performance}%`}
                icon={<Award className="text-yellow-400" />}
                color="yellow"
              />
              <MetricCard
                title="Attendance"
                value={`${employee.attendance}%`}
                icon={<Clock className="text-green-400" />}
                color="green"
              />
            </div>

            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="mr-2 text-blue-400" size={18} />
                Recent Achievements
              </h3>
              <ul className="space-y-3">
                {employee.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-700 pb-2 last:border-0 last:pb-0"
                  >
                    <span>{achievement.title}</span>
                    <span className="text-sm text-gray-400">
                      {achievement.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clipboard className="mr-2 text-blue-400" size={18} />
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      case "calendar":
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-blue-600/10 border-b border-gray-700">
                <h3 className="text-lg font-semibold">January 2023</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="p-3 text-sm text-gray-400 font-medium">
                      Sun
                    </th>
                    <th className="p-3 text-sm text-gray-400 font-medium">
                      Mon
                    </th>
                    <th className="p-3 text-sm text-gray-400 font-medium">
                      Tue
                    </th>
                    <th className="p-3 text-sm text-gray-400 font-medium">
                      Wed
                    </th>
                    <th className="p-3 text-sm text-gray-400 font-medium">
                      Thu
                    </th>
                    <th className="p-3 text-sm text-gray-400 font-medium">
                      Fri
                    </th>
                    <th className="p-3 text-sm text-gray-400 font-medium">
                      Sat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calendarData.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                      {week.map((day, dayIndex) => (
                        <td key={dayIndex} className="p-2 text-center">
                          {day !== null && (
                            <div
                              className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full
                              ${
                                day === 15
                                  ? "bg-blue-600 text-white"
                                  : day === 22
                                  ? "bg-green-600/30 text-green-200 border border-green-500/30"
                                  : day === 5 || day === 6
                                  ? "text-gray-500"
                                  : "hover:bg-gray-700/50 cursor-pointer"
                              }`}
                            >
                              {day}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center p-3 bg-blue-600/10 border border-blue-500/30 rounded-lg">
                  <div>
                    <p className="font-medium">Team Meeting</p>
                    <p className="text-sm text-gray-400">10:00 AM - 11:30 AM</p>
                  </div>
                  <span className="text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                    Jan 15
                  </span>
                </li>
                <li className="flex justify-between items-center p-3 bg-green-600/10 border border-green-500/30 rounded-lg">
                  <div>
                    <p className="font-medium">Performance Review</p>
                    <p className="text-sm text-gray-400">2:00 PM - 3:00 PM</p>
                  </div>
                  <span className="text-sm bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                    Jan 22
                  </span>
                </li>
              </ul>
            </div>
          </div>
        );
      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mr-3 hover:bg-gray-800/50"
        >
          <ChevronLeft size={18} />
        </Button>
        <h2 className="text-2xl font-bold">{employee.name}</h2>
        <span className="ml-3 bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-sm">
          {employee.id}
        </span>
      </div>

      <div className="flex items-center mb-6 space-x-4">
        <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center">
          <User size={32} />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{employee.name}</h3>
          <p className="text-gray-400">
            {employee.role} • {employee.department}
          </p>
        </div>
        <div className="ml-auto">
          <Button className="bg-pink-600 hover:bg-pink-700 text-white">
            Schedule a Meeting
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <Mail className="mr-3 text-gray-400" size={18} />
          <div>
            <p className="text-xs text-gray-400">Email</p>
            <p className="text-sm">{employee.email}</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <Phone className="mr-3 text-gray-400" size={18} />
          <div>
            <p className="text-xs text-gray-400">Phone</p>
            <p className="text-sm">{employee.phone}</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <MapPin className="mr-3 text-gray-400" size={18} />
          <div>
            <p className="text-xs text-gray-400">Location</p>
            <p className="text-sm">{employee.location}</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <Calendar className="mr-3 text-gray-400" size={18} />
          <div>
            <p className="text-xs text-gray-400">Joined</p>
            <p className="text-sm">{employee.joinedDate}</p>
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-4 py-2 mr-4 font-medium text-sm relative ${
            activeTab === "overview"
              ? "text-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
          {activeTab === "overview" && (
            <motion.div
              layoutId="tabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
              initial={false}
            />
          )}
        </button>
        <button
          className={`px-4 py-2 mr-4 font-medium text-sm relative ${
            activeTab === "calendar"
              ? "text-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar
          {activeTab === "calendar" && (
            <motion.div
              layoutId="tabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
              initial={false}
            />
          )}
        </button>
        <button
          className={`px-4 py-2 mr-4 font-medium text-sm relative ${
            activeTab === "activity"
              ? "text-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("activity")}
        >
          Activity
          {activeTab === "activity" && (
            <motion.div
              layoutId="tabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
              initial={false}
            />
          )}
        </button>
        <button
          className={`px-4 py-2 mr-4 font-medium text-sm relative ${
            activeTab === "sessions"
              ? "text-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("sessions")}
        >
          Sessions
          {activeTab === "sessions" && (
            <motion.div
              layoutId="tabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
              initial={false}
            />
          )}
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const MetricCard = ({ title, value, icon, color }: MetricCardProps) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-500/20 to-blue-600/10 border-blue-500/30";
      case "green":
        return "from-green-500/20 to-green-600/10 border-green-500/30";
      case "yellow":
        return "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30";
      case "pink":
        return "from-pink-500/20 to-pink-600/10 border-pink-500/30";
      default:
        return "from-gray-500/20 to-gray-600/10 border-gray-500/30";
    }
  };

  return (
    <div
      className={`bg-gradient-to-br ${getColorClass(
        color
      )} p-5 rounded-lg border`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="p-2 rounded-full bg-gray-800/40">{icon}</div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="mt-4 w-full bg-gray-700/30 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            color === "yellow"
              ? "bg-yellow-500"
              : color === "green"
              ? "bg-green-500"
              : color === "blue"
              ? "bg-blue-500"
              : color === "pink"
              ? "bg-pink-500"
              : "bg-gray-500"
          }`}
          style={{ width: value }}
        ></div>
      </div>
    </div>
  );
};

export default EmployeeDetailsPanel;
