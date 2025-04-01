import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';
import { toast } from "sonner";
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleLogin = (employeeId: string, password: string, loginType: 'employee' | 'hr') => {
    const empIdPattern = /^EMP\d{4}$/;
    
    if (!empIdPattern.test(employeeId)) {
      toast.error("Invalid Employee ID. It should be in the format EMPXXXX (X = 0-9).", { duration: 3000 });
      return;
    }
    
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.", { duration: 3000 });
      return;
    }
    
    // Show success toast
    toast.success(`Successfully logged in as ${loginType === 'employee' ? 'Employee' : 'HR'}`);
    
    // Redirect to home page after successful login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-radial from-deloitte-black to-deloitte-darkest">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] -left-[10%] w-[40%] h-[40%] bg-deloitte-blue/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-5%] -right-[5%] w-[30%] h-[30%] bg-deloitte-blue/5 rounded-full blur-[80px]" />
      </div>
      
      {/* Content */}
      <div className="z-10 w-full max-w-screen-xl mx-auto px-4 flex flex-col">
        {/* Top Navigation Area */}
        <div className="w-full pt-6 flex justify-between items-center">
          {/* Logo on the left */}
          <div className="animate-fade-in">
            <Logo />
          </div>
          {/* Empty div for alignment */}
          <div className="w-[120px]"></div>
        </div>
        
        {/* Dashboard Title */}
        <div className={`w-full flex justify-center mt-8 ${isMobile ? 'mb-8' : 'mb-12'} animate-fade-in`}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-deloitte-blue bg-clip-text text-transparent transition-all duration-700 hover:scale-105">
            MyWorkSphere
          </h1>
        </div>
        
        {/* Login Card */}
        <div className="glass-card rounded-2xl p-8 sm:p-10 w-full max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <LoginForm onSubmit={handleLogin} />
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <p>© {new Date().getFullYear()} Deloitte. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
