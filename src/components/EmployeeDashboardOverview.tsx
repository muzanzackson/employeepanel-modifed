import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Activity,
  Award,
  TrendingUp,
  Clock,
  AlertTriangle,
  Smile,
  Frown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  employeeData,
  calculateAverageSentiment,
  calculateAveragePerformance,
  countEmployeesByStatus,
  getSentimentTrend,
  getRecentAwards,
} from "@/data/employeeData";

const EmployeeDashboardOverview: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate metrics
  const avgSentiment = calculateAverageSentiment();
  const avgPerformance = calculateAveragePerformance();
  const employeeStatus = countEmployeesByStatus();
  const sentimentTrend = getSentimentTrend();
  const recentAwards = getRecentAwards();

  // Calculate average activity metrics
  const avgActivity = {
    messages: 0,
    emails: 0,
    meetings: 0,
    hours: 0,
  };

  let activityCount = 0;
  Object.values(employeeData).forEach((employee) => {
    employee.Activity.forEach((activity) => {
      avgActivity.messages += activity.Teams_Messages_Sent;
      avgActivity.emails += activity.Emails_Sent;
      avgActivity.meetings += activity.Meetings_Attended;
      avgActivity.hours += activity.Work_Hours;
      activityCount++;
    });
  });

  if (activityCount > 0) {
    avgActivity.messages = Math.round(avgActivity.messages / activityCount);
    avgActivity.emails = Math.round(avgActivity.emails / activityCount);
    avgActivity.meetings = Math.round(avgActivity.meetings / activityCount);
    avgActivity.hours = +(avgActivity.hours / activityCount).toFixed(1);
  }

  // Prepare data for sentiment chart
  const sentimentData = sentimentTrend.map((item) => ({
    month: item.date,
    sentiment: item.average,
  }));

  // Employee status data for pie chart
  const statusData = [
    { name: "Active", value: employeeStatus.active },
    { name: "On Leave", value: employeeStatus.onLeave },
    { name: "Recently Joined", value: employeeStatus.recentlyJoined },
  ];

  const COLORS = ["#006ccb", "#00C49F", "#FFBB28"];

  // Get employees with low sentiment
  const concernEmployees = Object.entries(employeeData)
    .filter(([_, employee]) => {
      const latestSentiment = employee.Sentiment.sort(
        (a, b) =>
          new Date(b.Response_Date).getTime() -
          new Date(a.Response_Date).getTime()
      )[0];

      return (
        latestSentiment &&
        (latestSentiment.Emotion_Zone.includes("Frustrated") ||
          latestSentiment.Emotion_Zone.includes("Sad"))
      );
    })
    .map(([id, _]) => id);

  // Limit to 4 employees initially unless expanded
  const displayedConcernEmployees = isExpanded
    ? concernEmployees
    : concernEmployees.slice(0, 4);

  return (
    <div className="p-4 sm:p-6 h-full overflow-y-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
        HR Dashboard Overview
      </h2>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <StatCard
          title="Total Employees"
          value={Object.keys(employeeData).length.toString()}
          icon={<Users className="text-blue-400" />}
          change={`+${employeeStatus.recentlyJoined} new this quarter`}
          color="blue"
        />
        <StatCard
          title="Avg. Sentiment"
          value={`${avgSentiment.toFixed(1)}/5`}
          icon={<Activity className="text-green-400" />}
          change={avgSentiment >= 3.5 ? "Positive trend" : "Needs attention"}
          color="green"
        />
        <StatCard
          title="Avg. Performance"
          value={`${avgPerformance.toFixed(1)}/5`}
          icon={<TrendingUp className="text-pink-400" />}
          change={avgPerformance >= 3 ? "Meeting expectations" : "Below target"}
          color="pink"
        />
        <StatCard
          title="Avg. Work Hours"
          value={avgActivity.hours.toString()}
          icon={<Clock className="text-yellow-400" />}
          change={avgActivity.hours >= 8 ? "On target" : "Below target"}
          color="yellow"
        />
      </div>

      {/* Employees Needing Attention */}
      <div className="bg-gray-800/30 rounded-lg p-4 sm:p-5 border border-gray-700 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center">
          <AlertTriangle className="mr-2 text-orange-400" size={18} />
          Employees Needing Attention
        </h3>
        {concernEmployees.length > 0 ? (
          <>
            <motion.ul
              initial={{ height: "auto" }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.3 }}
              className="space-y-  sm:space-y-3"
            >
              {displayedConcernEmployees.map((id, index) => {
                const employee = employeeData[id];
                const latestSentiment = [...employee.Sentiment].sort(
                  (a, b) =>
                    new Date(b.Response_Date).getTime() -
                    new Date(a.Response_Date).getTime()
                )[0];

                return (
                  <li
                    key={index}
                    className="bg-red-900/20 border border-red-800/30 rounded-lg p-2 sm:p-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <p className="font-medium text-sm sm:text-base">{id}</p>
                      <div className="flex items-center mt-1 sm:mt-0">
                        {latestSentiment.Vibe_Score <= 2 ? (
                          <Frown className="text-red-400 mr-1" size={14} />
                        ) : (
                          <Smile className="text-yellow-400 mr-1" size={14} />
                        )}
                        <span className="text-xs sm:text-sm text-gray-400">
                          {latestSentiment.Emotion_Zone}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-xs text-gray-400">
                        Last response:{" "}
                        {new Date(latestSentiment.Response_Date).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                );
              })}
            </motion.ul>
            {concernEmployees.length > 4 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 flex items-center justify-center w-full py-2 text-orange-400 hover:text-orange-300 transition-colors text-sm sm:text-base"
              >
                {isExpanded ? (
                  <>
                    Show Less <ChevronUp size={18} className="ml-2" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown size={18} className="ml-2" />
                  </>
                )}
              </button>
            )}
          </>
        ) : (
          <p className="text-sm sm:text-base text-gray-400">
            No employees requiring immediate attention.
          </p>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Sentiment Trend Chart */}
        <div className="xl:col-span-2 bg-gray-800/30 rounded-lg p-4 sm:p-5 border border-gray-700">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Employee Sentiment Trend
          </h3>
          <div className="h-[250px] sm:h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sentimentData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" domain={[0, 5]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    border: "1px solid #444",
                  }}
                  labelStyle={{ color: "#eee" }}
                />
                <Line
                  type="monotone"
                  dataKey="sentiment"
                  stroke="#8884d8"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Employee Status Pie Chart */}
        <div className="bg-gray-800/30 rounded-lg p-4 sm:p-5 border border-gray-700">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Employee Status
          </h3>
          <div className="h-[250px] sm:h-[300px] md:h-[350px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    border: "1px solid #444",
                  }}
                  formatter={(value) => [`${value} employees`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Awards */}
      <div className="bg-gray-800/30 rounded-lg p-4 sm:p-5 border border-gray-700">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center">
          <Award className="mr-2 text-yellow-400" size={18} />
          Recent Awards
        </h3>
        {recentAwards.length > 0 ? (
          <ul className="space-y-2 sm:space-y-3">
            {recentAwards.slice(0, 3).map((item, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-700 pb-2 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-sm sm:text-base">{item.employeeId}</p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {item.award.Award_Type}
                  </p>
                </div>
                <div className="flex items-center mt-1 sm:mt-0">
                  <span className="text-yellow-400 font-medium text-sm sm:text-base mr-2">
                    {item.award.Reward_Points} pts
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(item.award.Award_Date).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm sm:text-base text-gray-400">
            No recent awards found.
          </p>
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  color: string;
}

const StatCard = ({ title, value, icon, change, color }: StatCardProps) => {
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
      )} p-3 sm:p-4 rounded-lg border`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs sm:text-sm text-gray-400">{title}</p>
          <h3 className="text-xl sm:text-2xl font-bold mt-1">{value}</h3>
          <p className="text-xs text-gray-400 mt-1 sm:mt-2">{change}</p>
        </div>
        <div className="p-1 sm:p-2 rounded-full bg-gray-800/40">
          {React.cloneElement(icon as React.ReactElement, {
            className: `${icon.props.className} w-4 h-4 sm:w-5 sm:h-5`,
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboardOverview;