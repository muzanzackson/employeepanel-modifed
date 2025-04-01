import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

const SessionsPanel = () => {
  const upcomingSessions = [
    {
      id: 1,
      title: "Ongoing Session",
      time: "Now",
      color: "bg-blue-500/30 text-blue-100 border-blue-400/30",
    },
  ];

  const pastSessions = [
    {
      id: 1,
      title: "Team Building Workshop",
      date: "12 June 2023",
      status: "Completed",
      color: "bg-green-500/20 text-green-100 border-green-400/30",
    },
    {
      id: 2,
      title: "Performance Review",
      date: "5 June 2023",
      status: "Completed",
      color: "bg-green-500/20 text-green-100 border-green-400/30",
    },
    {
      id: 3,
      title: "Project Kickoff",
      date: "1 June 2023",
      status: "Completed",
      color: "bg-green-500/20 text-green-100 border-green-400/30",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 h-full w-full max-w-6xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Sessions
      </h2>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <Clock size={18} className="mr-2 text-blue-400" />
          Upcoming Sessions
        </h3>
        {upcomingSessions.map((session) => (
          <motion.div
            key={session.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`p-4 mb-3 rounded-lg flex items-center ${session.color} border w-full`}
          >
            <div className="h-3 w-3 rounded-full bg-blue-400 mr-3"></div>
            <div className="flex-1">
              <div className="font-medium">{session.title}</div>
              <div className="text-sm opacity-80">{session.time}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <Calendar size={18} className="mr-2 text-yellow-400" />
          Past Sessions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {pastSessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * session.id }}
              className={`p-3 rounded-lg ${session.color} border w-full`}
            >
              <div className="h-3 w-3 rounded-full bg-green-400 mb-2"></div>
              <div className="font-medium">{session.title}</div>
              <div className="text-sm opacity-80">{session.date}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SessionsPanel;
