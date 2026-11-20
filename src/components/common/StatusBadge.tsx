import React from 'react';
import { ComplaintStatus, ComplaintPriority } from '../../types';

interface StatusBadgeProps {
  status: ComplaintStatus;
  progress?: number;
  className?: string;
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  progress,
  className = '',
  showDot = true,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'reported':
        return {
          label: 'Reported',
          bg: 'bg-[#F3F4F6]',
          text: 'text-[#1F2937]',
          dot: 'bg-[#4B5563]',
        };
      case 'reviewed':
        return {
          label: 'Reviewed',
          bg: 'bg-[#F3F4F6]',
          text: 'text-[#1F2937]',
          dot: 'bg-[#1F2937]',
        };
      case 'assigned':
        return {
          label: 'Assigned',
          bg: 'bg-[#EFF6FF]',
          text: 'text-[#1D4ED8]',
          dot: 'bg-[#2563EB]',
        };
      case 'in_progress':
        return {
          label: progress !== undefined && progress > 0 ? `In progress · ${progress}%` : 'In progress',
          bg: 'bg-[#FEF9C3]',
          text: 'text-[#854D0E]',
          dot: 'bg-[#EAB308]',
        };
      case 'paused':
        return {
          label: 'Paused',
          bg: 'bg-[#FFEDD5]',
          text: 'text-[#C2410C]',
          dot: 'bg-[#F97316]',
        };
      case 'awaiting_verification':
        return {
          label: 'Awaiting verification',
          bg: 'bg-[#CCFBF1]',
          text: 'text-[#0F766E]',
          dot: 'bg-[#14B8A6]',
        };
      case 'verified':
        return {
          label: 'Verified',
          bg: 'bg-[#DCFCE7]',
          text: 'text-[#166534]',
          dot: 'bg-[#16A34A]',
        };
      case 'reopened':
        return {
          label: 'Reopened',
          bg: 'bg-[#FFE4E6]',
          text: 'text-[#9F1239]',
          dot: 'bg-[#E11D48]',
        };
      default:
        return {
          label: status,
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          dot: 'bg-gray-500',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-tight ${config.bg} ${config.text} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />}
      {config.label}
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: ComplaintPriority; className?: string }> = ({
  priority,
  className = '',
}) => {
  switch (priority) {
    case 'critical':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800 ${className}`}>
          Critical
        </span>
      );
    case 'high':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-700 ${className}`}>
          High priority
        </span>
      );
    case 'normal':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 ${className}`}>
          Normal
        </span>
      );
    case 'low':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-600 ${className}`}>
          Low
        </span>
      );
  }
};

