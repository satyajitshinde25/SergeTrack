import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: string;
  colorVariant?: 'default' | 'green' | 'amber' | 'blue' | 'red';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  colorVariant = 'default',
  onClick
}) => {
  const borderColors = {
    default: 'border-[#E2EAE4] hover:border-[#43A879]/40',
    green: 'border-[#43A879]/40 bg-gradient-to-br from-white to-[#E7F4EC]/30',
    amber: 'border-amber-200 bg-gradient-to-br from-white to-amber-50/40',
    blue: 'border-blue-200 bg-gradient-to-br from-white to-blue-50/40',
    red: 'border-red-200 bg-gradient-to-br from-white to-red-50/40'
  }[colorVariant];

  const iconBgColors = {
    default: 'bg-stone-100 text-stone-700',
    green: 'bg-[#E7F4EC] text-[#174C3C]',
    amber: 'bg-amber-100 text-amber-800',
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800'
  }[colorVariant];

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border ${borderColors} shadow-xs transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#66756D]">{title}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBgColors}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-[#17251F] font-display">{value}</span>
        {trend && (
          <span className="text-xs font-medium text-[#43A879] bg-[#E7F4EC] px-1.5 py-0.5 rounded">
            {trend}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-xs text-[#66756D] mt-1.5 font-normal">{subtitle}</p>
      )}
    </div>
  );
};
