import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = false
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }[size];

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  }[size];

  const textColor = variant === 'light' ? 'text-white' : 'text-[#10382D]';
  const tagColor = variant === 'light' ? 'text-[#C4D3C9]' : 'text-[#66756D]';

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`${iconSizes} rounded-xl bg-gradient-to-br from-[#174C3C] to-[#10382D] p-1.5 flex items-center justify-center shadow-xs border border-[#43A879]/30 shrink-0`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path 
            d="M12 2C7.03 2 3 6.03 3 11C3 15.97 7.03 20 12 20C16.97 20 21 15.97 21 11C21 6.03 16.97 2 12 2ZM12 18C8.13 18 5 14.87 5 11C5 8.55 6.26 6.39 8.19 5.13C8.08 5.94 8.06 6.77 8.19 7.55C8.52 9.72 9.71 11.61 11.43 12.8C13.15 14 15.27 14.38 17.3 13.88C16.42 16.36 14.39 18 12 18Z" 
            fill="#43A879" 
          />
          <path 
            d="M17.5 5.5C15.8 3.8 12.8 4.2 11 6C9.2 7.8 9.6 10.8 11.4 12.5C13.2 14.2 16.2 13.8 18 12C19.8 10.2 19.3 7.2 17.5 5.5Z" 
            fill="#E7F4EC" 
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-none">
          <span className={`font-bold font-display tracking-tight ${textSizes} ${textColor}`}>
            Segre<span className="text-[#43A879]">Track</span>
          </span>
        </div>
        {showTagline && (
          <span className={`text-[11px] font-medium leading-none mt-1 ${tagColor}`}>
            Household Segregation to Responsible Collection
          </span>
        )}
      </div>
    </div>
  );
};
