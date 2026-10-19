import React, { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <Inbox className="w-8 h-8 text-[#66756D]" />,
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-dashed border-[#E2EAE4] my-4">
      <div className="w-14 h-14 rounded-2xl bg-[#F8FAF7] border border-[#E2EAE4] flex items-center justify-center mb-4 text-[#174C3C]">
        {icon}
      </div>
      <h4 className="text-base font-semibold text-[#17251F] mb-1">{title}</h4>
      <p className="text-sm text-[#66756D] max-w-sm mb-4 leading-relaxed">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 rounded-xl bg-[#174C3C] text-white text-xs font-medium hover:bg-[#10382D] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
