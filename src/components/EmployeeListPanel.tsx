import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, ChevronRight, Award, AlertTriangle } from "lucide-react";
import { employeeData } from "@/data/employeeData";

interface EmployeeListPanelProps {
  onSelectEmployee: (employeeId: string) => void;
}

const EmployeeListPanel: React.FC<EmployeeListPanelProps> = ({
  onSelectEmployee,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Transform employee data for the list
  const employees = Object.entries(employeeData).map(([id, data]) => {
    // Get the latest sentiment
    const latestSentiment =
      data.Sentiment.length > 0
        ? [...data.Sentiment].sort(
            (a, b) =>
              new Date(b.Response_Date).getTime() -
              new Date(a.Response_Date).getTime()
          )[0]
        : null;

    // Determine status
    let status: "active" | "inactive" | "leave" = "active";

    // Check if employee is on leave
    const now = new Date();
    const onLeave = data.Leaves.some((leave) => {
      const startDate = new Date(leave.Leave_Start_Date);
      const endDate = new Date(leave.Leave_End_Date);
      return now >= startDate && now <= endDate;
    });

    if (onLeave) {
      status = "leave";
    }

    // Determine department based on available data
    let department = "Unknown";
    if (id === "EMP0125") department = "Engineering";
    else if (id === "EMP0491") department = "Design";
    else if (id === "EMP0310") department = "Analytics";
    else if (id === "EMP0172") department = "Product";
    else if (id === "EMP0262") department = "Marketing";

    // Get latest performance feedback
    const latestPerformance =
      data.Performance.length > 0
        ? [...data.Performance].sort((a, b) =>
            b.Review_Period.localeCompare(a.Review_Period)
          )[0]
        : null;

    // Get employee name (simulation since we don't have names in the data)
    let name = "Employee " + id.substring(3); // Remove "EMP" prefix
    if (id === "EMP0125") name = "John Doe";
    else if (id === "EMP0491") name = "Sarah Smith";
    else if (id === "EMP0310") name = "Michael Chen";
    else if (id === "EMP0172") name = "Jessica Williams";
    else if (id === "EMP0262") name = "David Johnson";

    return {
      id,
      name,
      role: latestPerformance
        ? latestPerformance.Manager_Feedback
        : "New Employee",
      department,
      status,
      sentiment: latestSentiment ? latestSentiment.Vibe_Score : null,
      sentimentZone: latestSentiment ? latestSentiment.Emotion_Zone : null,
      hasAwards: data.Awards.length > 0,
      needsAttention:
        latestSentiment &&
        (latestSentiment.Emotion_Zone.includes("Frustrated") ||
          latestSentiment.Emotion_Zone.includes("Sad")),
    };
  });

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus
      ? employee.status === filterStatus
      : true;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: "active" | "inactive" | "leave") => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-500";
      case "leave":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Employee Directory</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <Input
            placeholder="Search by name, ID or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800/30 border-gray-700"
          />
        </div>
        <div className="relative md:w-64">
          <select
            className="w-full h-10 pl-4 pr-8 border border-gray-700 rounded-md bg-gray-800/30 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Filter by status</option>
            <option value="active">Active</option>
            <option value="leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronRight className="rotate-90 text-gray-500" size={16} />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors cursor-pointer"
            onClick={() => onSelectEmployee(employee.id)}
          >
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  employee.id === "EMP0125"
                    ? "bg-pink-600"
                    : employee.id === "EMP0491"
                    ? "bg-yellow-600"
                    : employee.id === "EMP0310"
                    ? "bg-green-600"
                    : employee.id === "EMP0172"
                    ? "bg-blue-600"
                    : "bg-purple-600"
                }`}
              >
                <User size={16} />
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <p className="font-medium">{employee.name}</p>
                  {employee.hasAwards && (
                    <Award size={14} className="ml-2 text-yellow-400" />
                  )}
                  {employee.needsAttention && (
                    <AlertTriangle size={14} className="ml-2 text-red-400" />
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {employee.id} • {employee.department}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(
                    employee.status
                  )} mr-2`}
                ></div>
                <span className="text-sm text-gray-400 capitalize">
                  {employee.status}
                </span>
              </div>
              {employee.sentiment !== null && (
                <div className="flex items-center mr-4">
                  <div
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      employee.sentiment >= 4
                        ? "bg-green-500/20 text-green-300"
                        : employee.sentiment >= 3
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {employee.sentimentZone}
                  </div>
                </div>
              )}
              <div className="bg-gray-700/50 rounded-full p-1">
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
        {filteredEmployees.length === 0 && (
          <div className="text-center p-8 bg-gray-800/30 border border-gray-700 rounded-lg">
            <p className="text-gray-400">No employees found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeListPanel;
