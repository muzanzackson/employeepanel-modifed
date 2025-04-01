import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Settings,
  Calendar,
  BarChart,
  LogOut,
} from "lucide-react";

interface HRSideNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onItemClick?: () => void;
}

const HRSideNavigation: React.FC<HRSideNavigationProps> = ({
  activeTab,
  setActiveTab,
  onItemClick,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { id: "employees", label: "Employees", icon: <Users size={18} /> },
    { id: "feedback", label: "Feedback", icon: <MessageSquare size={18} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart size={18} /> },
    { id: "sessions", label: "Sessions", icon: <FileText size={18} /> },
    { id: "calendar", label: "Calendar", icon: <Calendar size={18} /> },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  return (
    <div className="w-full h-full p-4 space-y-1 bg-[rgb(7,11,18)] backdrop-blur-sm border-r border-gray-800 flex flex-col">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-blue shadow-glow-blue-sm hover:shadow-glow-blue flex items-center justify-center">
          <Users size={24} className="text-white" />
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
            onClick={() => {
              setActiveTab(item.id);
              if (onItemClick) onItemClick();
            }}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </Button>
        ))}
      </div>

      <div className="pt-6 border-t border-gray-800">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut size={18} className="mr-2" />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default HRSideNavigation;

