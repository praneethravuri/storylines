import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  icon = false
}) => {
  return (
    <div className="relative inline-block">
      <button 
        className={`absolute bg-[#eedfcc] text-black border-2 border-black px-6 py-3 w-full rounded-full text-lg font-semibold left-1 top-1 ${className}`}
        aria-hidden="true"
      >
        {children}
      </button>
      <button 
        onClick={onClick}
        className={`relative bg-[#eedfcc] text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#f9c959] transition-colors border-2 border-black ${className}`}
      >
        {children}
        {icon && <ArrowRight className="ml-2 inline" size={20} />}
      </button>
    </div>
  );
};

export default CustomButton;