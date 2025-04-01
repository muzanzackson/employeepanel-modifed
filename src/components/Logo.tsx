
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="inline-flex items-center space-x-2">
      <svg 
        width="42" 
        height="42" 
        viewBox="0 0 100 100" 
        className="fill-white"
      >
        <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 87.5c-20.7 0-37.5-16.8-37.5-37.5S29.3 12.5 50 12.5 87.5 29.3 87.5 50 70.7 87.5 50 87.5z" />
        <path d="M68.8 50c0 10.4-8.4 18.8-18.8 18.8-10.4 0-18.8-8.4-18.8-18.8 0-10.4 8.4-18.8 18.8-18.8 10.4 0 18.8 8.4 18.8 18.8z" />
      </svg>
      <span className="text-xl font-bold tracking-tight">Deloitte</span>
    </div>
  );
};

export default Logo;
