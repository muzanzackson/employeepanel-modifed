/*
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { toast } from "sonner";

interface LoginFormProps {
  onSubmit: (employeeId: string, password: string, loginType: 'employee' | 'hr') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<'employee' | 'hr'>('employee');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmployeeId = (id: string) => {
    const employeeIdRegex = /^EMP\d{4}$/;
    return employeeIdRegex.test(id);
  };

  const isValidPassword = (pwd: string) => {
    return pwd.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeId || !password) {
      toast.error("Please enter both Employee ID and Password");
      return;
    }

    if (!isValidEmployeeId(employeeId)) {
      toast.error("Please enter Employee ID in EMPXXXX format");
      return;
    }

    if (!isValidPassword(password)) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(employeeId, password, loginType);
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-up">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
        <p className="text-muted-foreground text-sm">Access your Deloitte portal</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <User className="h-5 w-5 opacity-70" />
            </div>
            <Input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="pl-10 h-12 bg-deloitte-gray border-deloitte-lightGray focus-ring"
              disabled={isLoading}
            />
            {employeeId && !isValidEmployeeId(employeeId) && (
              <p className="text-red-500 text-xs mt-1 animate-pulse">
                Please enter this format <strong>EMPXXXX</strong>
              </p>
            )}
          </div>
          
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Lock className="h-5 w-5 opacity-70" />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-12 bg-deloitte-gray border-deloitte-lightGray focus-ring"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 opacity-70" />
              ) : (
                <Eye className="h-5 w-5 opacity-70" />
              )}
            </button>
            {password && !isValidPassword(password) && (
              <p className="text-red-500 text-xs mt-1 animate-pulse">
                Password must be at least <strong>8 characters</strong> long
              </p>
            )}
          </div>
        </div>
        
        <div className="flex justify-between gap-4">
          <Button
            type="submit"
            onClick={() => setLoginType('employee')}
            className={`flex-1 h-12 transition-all ${
              loginType === 'employee'
                ? 'bg-gradient-blue shadow-glow-blue-sm hover:shadow-glow-blue'
                : 'bg-deloitte-gray hover:bg-deloitte-gray/80'
            }`}
            disabled={isLoading}
          >
            Sign in as Employee
          </Button>
          
          <Button
            type="submit"
            onClick={() => setLoginType('hr')}
            className={`flex-1 h-12 transition-all ${
              loginType === 'hr'
                ? 'bg-gradient-blue shadow-glow-blue-sm hover:shadow-glow-blue'
                : 'bg-deloitte-gray hover:bg-deloitte-gray/80'
            }`}
            disabled={isLoading}
          >
            Sign in as HR
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
*/
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { toast } from "sonner";

interface LoginFormProps {
  onSubmit: (
    employeeId: string,
    password: string,
    loginType: "employee" | "hr"
  ) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<"employee" | "hr">("employee");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmployeeId = (id: string) => {
    const employeeIdRegex = /^EMP\d{4}$/;
    return employeeIdRegex.test(id);
  };

  const isValidPassword = (pwd: string) => {
    return pwd.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId || !password) {
      toast.error("Please enter both Employee ID and Password");
      return;
    }

    if (!isValidEmployeeId(employeeId)) {
      toast.error("Please enter Employee ID in EMPXXXX format");
      return;
    }

    if (!isValidPassword(password)) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(employeeId, password, loginType);
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 md:p-10 lg:p-12 animate-fade-up">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
        <p className="text-muted-foreground text-sm">
          Access your Deloitte portal
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <User className="h-5 w-5 opacity-70" />
            </div>
            <Input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="pl-10 pr-10 h-12 bg-deloitte-gray border-deloitte-lightGray focus-ring w-full"
              disabled={isLoading}
            />
            {employeeId && !isValidEmployeeId(employeeId) && (
              <p className="text-red-500 text-sm mt-1">
                Please enter this format <strong>EMPXXXX</strong>
              </p>
            )}
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Lock className="h-5 w-5 opacity-70" />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-12 bg-deloitte-gray border-deloitte-lightGray focus-ring w-full"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 opacity-70" />
              ) : (
                <Eye className="h-5 w-5 opacity-70" />
              )}
            </button>
            {password && !isValidPassword(password) && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least <strong>8 characters</strong> long
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
          <Button
            type="submit"
            onClick={() => setLoginType("employee")}
            className={`flex-1 h-12 transition-all text-center ${
              loginType === "employee"
                ? "bg-gradient-blue shadow-glow-blue-sm hover:shadow-glow-blue"
                : "bg-deloitte-gray hover:bg-deloitte-gray/80"
            }`}
            disabled={isLoading}
          >
            Sign in as Employee
          </Button>

          <Button
            type="submit"
            onClick={() => setLoginType("hr")}
            className={`flex-1 h-12 transition-all text-center ${
              loginType === "hr"
                ? "bg-gradient-blue shadow-glow-blue-sm hover:shadow-glow-blue"
                : "bg-deloitte-gray hover:bg-deloitte-gray/80"
            }`}
            disabled={isLoading}
          >
            Sign in as HR
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;