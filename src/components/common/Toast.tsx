import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-[#10221C] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#1E3D32] max-w-md">
        <CheckCircle2 className="w-5 h-5 text-[#4ADE80] flex-shrink-0" />
        <span className="text-sm font-medium">{toastMessage}</span>
      </div>
    </div>
  );
};

