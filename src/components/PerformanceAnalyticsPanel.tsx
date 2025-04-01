import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Award,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
} from "lucide-react";
import {
  employeeData,
  Employee,
  EmployeePerformance,
} from "@/data/employeeData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface PerformanceAnalyticsPanelProps {
  selectedEmployee: string | null;
}

const PerformanceAnalyticsPanel: React.FC<PerformanceAnalyticsPanelProps> = ({
  selectedEmployee,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Get all performance data
  const allPerformanceData: {
    employeeId: string;
    performance: EmployeePerformance;
  }[] = [];

  Object.entries(employeeData).forEach(([employeeId, employee]) => {
    employee.Performance.forEach((performance) => {
      allPerformanceData.push({ employeeId, performance });
    });
  });

  // Count performance ratings
  const ratingCounts = {
    "Exceeds Expectations": 0,
    "Meets Expectations": 0,
    "Needs Improvement": 0,
  };

  allPerformanceData.forEach(({ performance }) => {
    if (performance.Manager_Feedback.includes("Exceeds")) {
      ratingCounts["Exceeds Expectations"]++;
    } else if (performance.Manager_Feedback.includes("Meets")) {
      ratingCounts["Meets Expectations"]++;
    } else if (performance.Manager_Feedback.includes("Needs")) {
      ratingCounts["Needs Improvement"]++;
    }
  });

  // Prepare data for pie chart
  const ratingData = [
    {
      name: "Exceeds Expectations",
      value: ratingCounts["Exceeds Expectations"],
    },
    { name: "Meets Expectations", value: ratingCounts["Meets Expectations"] },
    { name: "Needs Improvement", value: ratingCounts["Needs Improvement"] },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

  // Calculate promotion consideration
  const promotionData = [
    { name: "Considered", value: 0 },
    { name: "Not Considered", value: 0 },
  ];

  allPerformanceData.forEach(({ performance }) => {
    if (performance.Promotion_Consideration === "True") {
      promotionData[0].value++;
    } else {
      promotionData[1].value++;
    }
  });

  // Filter performance data for table
  const filteredPerformanceData = allPerformanceData.filter(
    (item) =>
      item.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.performance.Review_Period.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      item.performance.Manager_Feedback.toLowerCase().includes(
        searchTerm.toLowerCase()
      )
  );

  // If a specific employee is selected
  if (selectedEmployee) {
    const employee = employeeData[selectedEmployee];
    if (
      !employee ||
      !employee.Performance ||
      employee.Performance.length === 0
    ) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            Performance Analysis for {selectedEmployee}
          </h2>
          <div className="text-center p-8 bg-gray-800/30 border border-gray-700 rounded-lg">
            <p className="text-gray-400">
              No performance data available for this employee.
            </p>
          </div>
        </div>
      );
    }

    // Sort performance data chronologically
    const sortedPerformance = [...employee.Performance].sort((a, b) =>
      a.Review_Period.localeCompare(b.Review_Period)
    );

    // Prepare data for bar chart
    const performanceChartData = sortedPerformance.map((perf) => ({
      period: perf.Review_Period,
      rating: perf.Performance_Rating,
      feedback: perf.Manager_Feedback,
    }));

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          Performance Analysis for {selectedEmployee}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gray-800/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Performance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="period" stroke="#888" />
                    <YAxis stroke="#888" domain={[0, 5]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#222",
                        border: "1px solid #444",
                      }}
                      labelStyle={{ color: "#eee" }}
                      formatter={(value, name, props) => {
                        return [
                          `Rating: ${value}`,
                          `Feedback: ${props.payload.feedback}`,
                        ];
                      }}
                    />
                    <Bar
                      dataKey="rating"
                      fill="#8884d8"
                      name="Performance Rating"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedPerformance.map((perf, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      perf.Manager_Feedback.includes("Exceeds")
                        ? "bg-green-900/20 border-green-700/40"
                        : perf.Manager_Feedback.includes("Meets")
                        ? "bg-blue-900/20 border-blue-700/40"
                        : "bg-yellow-900/20 border-yellow-700/40"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{perf.Review_Period}</span>
                      <div className="flex items-center">
                        {perf.Manager_Feedback.includes("Exceeds") ? (
                          <ThumbsUp className="text-green-400 mr-2" size={16} />
                        ) : perf.Manager_Feedback.includes("Meets") ? (
                          <ThumbsUp className="text-blue-400 mr-2" size={16} />
                        ) : (
                          <ThumbsDown
                            className="text-yellow-400 mr-2"
                            size={16}
                          />
                        )}
                        <span className="text-sm">
                          Rating: {perf.Performance_Rating}/5
                        </span>
                      </div>
                    </div>
                    <p className="text-sm mt-2">{perf.Manager_Feedback}</p>
                    <div className="flex items-center mt-2 text-xs">
                      <span
                        className={`px-2 py-0.5 rounded-full ${
                          perf.Promotion_Consideration === "True"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {perf.Promotion_Consideration === "True"
                          ? "Promotion Considered"
                          : "Not Considered for Promotion"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Team-wide performance view
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Team Performance Overview</h2>
        <div className="w-64">
          <Input
            type="text"
            placeholder="Search employees or feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800/30 border-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Performance Rating Distribution */}
        <Card className="bg-gray-800/30 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Feedback Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ratingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {ratingData.map((entry, index) => (
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
                    formatter={(value) => [`${value} reviews`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Promotion Consideration */}
        <Card className="bg-gray-800/30 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Promotion Consideration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={promotionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#9ca3af" />
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
          </CardContent>
        </Card>
      </div>

      {/* Performance Review Table */}
      <Card className="bg-gray-800/30 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Recent Performance Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Review Period</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead>Promotion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPerformanceData.slice(0, 10).map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.employeeId}</TableCell>
                    <TableCell>{item.performance.Review_Period}</TableCell>
                    <TableCell>
                      {item.performance.Performance_Rating}/5
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {item.performance.Manager_Feedback.includes(
                          "Exceeds"
                        ) ? (
                          <ThumbsUp className="text-green-400 mr-2" size={16} />
                        ) : item.performance.Manager_Feedback.includes(
                            "Meets"
                          ) ? (
                          <ThumbsUp className="text-blue-400 mr-2" size={16} />
                        ) : (
                          <ThumbsDown
                            className="text-yellow-400 mr-2"
                            size={16}
                          />
                        )}
                        {item.performance.Manager_Feedback}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.performance.Promotion_Consideration === "True"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {item.performance.Promotion_Consideration === "True"
                          ? "Yes"
                          : "No"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceAnalyticsPanel;
