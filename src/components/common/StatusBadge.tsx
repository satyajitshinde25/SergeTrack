import React from 'react';
import { CollectionStatus, IncidentStatus, WasteStream } from '../../types';
import { Clock, CheckCircle2, AlertTriangle, AlertCircle, RefreshCw, Zap } from 'lucide-react';

interface StatusBadgeProps {
  status: CollectionStatus | IncidentStatus | WasteStream | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  showIcon = true 
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium'
  }[size];

  // Incident Statuses
  if (status === 'Pending Review') {
    return (
      <span className={`inline-flex items-center rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 ${sizeClasses}`}>
        {showIcon && <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
        <span>Pending Review</span>
      </span>
    );
  }

  if (status === 'Under Review') {
    return (
      <span className={`inline-flex items-center rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 ${sizeClasses}`}>
        {showIcon && <RefreshCw className="w-3.5 h-3.5 text-blue-600 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />}
        <span>Under Review</span>
      </span>
    );
  }

  if (status === 'Action Planned') {
    return (
      <span className={`inline-flex items-center rounded-full bg-purple-50 text-purple-800 border border-purple-200/80 ${sizeClasses}`}>
        {showIcon && <Zap className="w-3.5 h-3.5 text-purple-600 shrink-0" />}
        <span>Action Planned</span>
      </span>
    );
  }

  if (status === 'Resolved') {
    return (
      <span className={`inline-flex items-center rounded-full bg-[#E7F4EC] text-[#174C3C] border border-[#43A879]/30 ${sizeClasses}`}>
        {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-[#43A879] shrink-0" />}
        <span>Resolved</span>
      </span>
    );
  }

  // Collection Statuses
  if (status === 'Completed') {
    return (
      <span className={`inline-flex items-center rounded-full bg-[#E7F4EC] text-[#174C3C] border border-[#43A879]/30 ${sizeClasses}`}>
        {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-[#43A879] shrink-0" />}
        <span>Completed</span>
      </span>
    );
  }

  if (status === 'In Progress') {
    return (
      <span className={`inline-flex items-center rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 ${sizeClasses}`}>
        {showIcon && <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" />}
        <span>In Progress</span>
      </span>
    );
  }

  if (status === 'Pending') {
    return (
      <span className={`inline-flex items-center rounded-full bg-stone-100 text-stone-700 border border-stone-200 ${sizeClasses}`}>
        {showIcon && <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />}
        <span>Pending</span>
      </span>
    );
  }

  if (status === 'Delayed') {
    return (
      <span className={`inline-flex items-center rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 ${sizeClasses}`}>
        {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
        <span>Delayed</span>
      </span>
    );
  }

  if (status === 'Issue Reported') {
    return (
      <span className={`inline-flex items-center rounded-full bg-red-50 text-red-800 border border-red-200/80 ${sizeClasses}`}>
        {showIcon && <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />}
        <span>Issue Reported</span>
      </span>
    );
  }

  // Waste Streams
  if (status === 'Wet Waste') {
    return (
      <span className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 ${sizeClasses}`}>
        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
        <span>Wet Waste</span>
      </span>
    );
  }

  if (status === 'Dry Waste') {
    return (
      <span className={`inline-flex items-center rounded-full bg-sky-50 text-sky-900 border border-sky-300 ${sizeClasses}`}>
        <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
        <span>Dry Waste</span>
      </span>
    );
  }

  if (status === 'Special Waste') {
    return (
      <span className={`inline-flex items-center rounded-full bg-amber-50 text-amber-900 border border-amber-300 ${sizeClasses}`}>
        <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
        <span>Special Waste</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center rounded-full bg-stone-100 text-stone-700 border border-stone-200 ${sizeClasses}`}>
      <span>{status}</span>
    </span>
  );
};
