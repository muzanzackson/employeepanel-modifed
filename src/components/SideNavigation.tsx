
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

import {
  HelpCircle,
  MessageSquare,
  FileText,
  User,
  LogOut,
} from "lucide-react";

interface SideNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onItemClick?: () => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
  activeTab,
  setActiveTab,
  onItemClick,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const navItems = [
    { id: "askhr", label: "AskHR", icon: <HelpCircle size={18} /> },
    { id: "sessions", label: "Sessions", icon: <FileText size={18} /> },
    { id: "chat", label: "Chat", icon: <MessageSquare size={18} /> },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const handleNavItemClick = (tab: string) => {
    setActiveTab(tab);
    if (onItemClick) onItemClick();
  };

  return (
    <div className="w-full h-full p-4 space-y-1 bg-[rgb(7,11,18)] backdrop-blur-sm border-r border-gray-800 flex flex-col">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-blue shadow-glow-blue-sm hover:shadow-glow-blue flex items-center justify-center">
          <User size={24} className="text-white" />
        </div>
      </div>

      <div className="space-y-1 flex-1">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start relative overflow-hidden group ${
              activeTab === item.id
                ? "bg-gradient-blue shadow-glow-blue-sm hover:shadow-glow-blue-md text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
            onClick={() => handleNavItemClick(item.id)}
          >
            {activeTab === item.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/20"
                layoutId="navBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}

            <motion.span
              className="mr-2"
              animate={{ scale: activeTab === item.id ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {item.icon}
            </motion.span>

            <span>{item.label}</span>

            {activeTab === item.id && (
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </Button>
        ))}
      </div>

      <div className="pt-6 border-t border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800/50"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          <span>Log out</span>
        </Button>
      </div>
    </div>
  );
};

export default SideNavigation;
