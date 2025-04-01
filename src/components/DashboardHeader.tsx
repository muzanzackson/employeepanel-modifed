import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DeloitteLogo from "@/components/Logo";
import { UserCircle, Bell, LogOut, Search, X, Menu } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  employeeId: string;
  toggleSidebar?: () => void;
  showSidebar?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  employeeId, 
  toggleSidebar, 
  showSidebar 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [notifications, setNotifications] = useState([
    "You have a new message.",
    "Your report is ready to view.",
    "System maintenance scheduled for tonight.",
    "System maintenance scheduled for tonight.",
    "System maintenance scheduled for tonight.",
    "System maintenance scheduled for tonight.",
    "New comment on your post.",
    "New comment on your post.",
    "New comment on your post.",
    "New comment on your post.",
    "New comment on your post.",
    "Meeting reminder: 3 PM today.",
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleBellClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNotificationDismiss = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between w-full px-4 py-3 border-b border-gray-800 bg-[rgb(7,11,18)] md:px-6">
      <div className="flex items-center gap-2 w-full sm:gap-4">
        <DeloitteLogo />
        
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative">
          <Button
            ref={buttonRef}
            variant="ghost"
            size="icon"
            onClick={handleBellClick}
            className={`relative ${isDropdownOpen ? "bg-gray-700" : ""}`}
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 p-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {notifications.length > 9 ? "9+" : notifications.length}
              </span>
            )}
          </Button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute -right-12 mt-2 w-72 sm:w-80 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50 max-w-[90vw]"
            >
              <div className="p-2 sm:p-3 border-b border-gray-700 font-medium text-white bg-gray-800 text-sm sm:text-base">
                Notifications
              </div>
              {notifications.length > 0 ? (
                <div className="max-h-80 sm:max-h-96 overflow-y-auto">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="p-2 sm:p-3 border-b border-gray-700 flex justify-between items-start hover:bg-gray-800 transition-colors duration-200"
                    >
                      <span className="text-xs sm:text-sm text-white flex-grow">
                        {notification}
                      </span>
                      <button
                        onClick={() => handleNotificationDismiss(index)}
                        className="ml-2 text-gray-400 hover:text-white"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 sm:p-4 text-center text-gray-500 text-xs sm:text-sm">
                  No notifications
                </div>
              )}
            </div>
          )}
        </div>
            {/* Toggle Sidebar Button */}
            {toggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2"
            aria-label={showSidebar ? "Close sidebar" : "Open sidebar"}
            aria-expanded={showSidebar}
          >
            {showSidebar ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </Button>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;