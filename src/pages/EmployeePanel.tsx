import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardHeader from "@/components/DashboardHeader";
import SideNavigation from "@/components/SideNavigation";
import AskHRPanel from "@/components/AskHRPanel";
import SessionsPanel from "@/components/SessionsPanel";
import ChatPanel from "@/components/ChatPanel";
import { Menu, X } from "lucide-react";

// Utility to debounce a function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("askhr");
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Check if mobile on mount and resize with debouncing
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowSidebar(mobile ? false : true);
    };

    const debouncedCheck = debounce(checkIfMobile, 200);

    checkIfMobile(); // Initial check
    window.addEventListener("resize", debouncedCheck);
    return () => window.removeEventListener("resize", debouncedCheck);
  }, []);

  // Memoize the active panel to prevent unnecessary re-renders
  const renderActivePanel = useMemo(() => {
    switch (activeTab) {
      case "askhr":
        return <AskHRPanel />;
      case "sessions":
        return <SessionsPanel />;
      case "chat":
        return <ChatPanel />;
      default:
        return <AskHRPanel />;
    }
  }, [activeTab]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background text-foreground flex flex-col"
    >
      <DashboardHeader employeeId="EMP003" toggleSidebar={toggleSidebar} showSidebar={showSidebar} />

      {/* Mobile Navigation Toggle Button - Now handled in header */}
      {isMobile && (
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed top-4 right-4 z-50 p-2.5 bg-primary rounded-full shadow-lg"
          aria-label={showSidebar ? "Close sidebar" : "Open sidebar"}
          aria-expanded={showSidebar}
        >
          {showSidebar ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar with AnimatePresence for proper exit animations */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: isMobile ? -300 : 0 }}
              animate={{ x: 0 }}
              exit={{ x: isMobile ? -300 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`${
                isMobile
                  ? "fixed inset-y-0 left-0 z-40 w-64 bg-background shadow-xl"
                  : "relative w-64"
              }`}
            >
              <SideNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onItemClick={() => isMobile && setShowSidebar(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay for mobile when sidebar is open */}
        <AnimatePresence>
          {isMobile && showSidebar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-30"
              onClick={() => setShowSidebar(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 overflow-y-auto rounded-lg ${
            isMobile && !showSidebar ? "ml-0" : ""
          }`}
        >
          <div
            className={`h-full glass-card rounded-tl-2xl shadow-2xl border-l border-t border-white/5 ${
              isMobile ? "rounded-none border-l-0 border-t-0" : ""
            }`}
          >
            {renderActivePanel}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmployeeDashboard;