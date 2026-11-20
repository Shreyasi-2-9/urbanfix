import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Clock, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../common/StatusBadge';

export const AdminEscalations: React.FC = () => {
  const { complaints, setSelectedComplaintId, setActiveTab } = useApp();

  const escalatedComplaints = complaints.filter(
    (c) =>
      c.priority === 'critical' ||
      c.status === 'reopened' ||
      new Date(c.deadline).getTime() < new Date().getTime()
  );

  const handleAct = (id: string) => {
    setSelectedComplaintId(id);
    setActiveTab('map');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
            Municipal Escalation Center
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Intervention center for SLA breaches, critical infrastructure hazards, and citizen disputes
          </p>
        </div>
      </div>

      <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-2xl p-4 text-xs text-[#991B1B] flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <Flame className="w-5 h-5 text-red-600" />
          <span>{escalatedComplaints.length} high-severity incidents require executive escalation review</span>
        </div>
        <span className="text-[11px] text-red-700">Priority SLA compliance rate: 84.2%</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {escalatedComplaints.map((c) => (
          <div
            key={c.id}
            onClick={() => handleAct(c.id)}
            className="bg-white rounded-2xl border border-red-200 p-5 shadow-subtle hover:shadow-card cursor-pointer transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900 group-hover:text-[#176B4D]">
                {c.id} · {c.title}
              </span>
              <PriorityBadge priority={c.priority} />
            </div>

            <p className="text-xs text-gray-600 line-clamp-2">
              {c.description}
            </p>

            <div className="bg-red-50 p-2.5 rounded-xl border border-red-100 text-xs text-red-800 space-y-1">
              <div className="font-semibold flex justify-between">
                <span>Location: {c.location.address}</span>
                <span>{c.location.ward}</span>
              </div>
              <div className="text-[11px] text-red-700">
                Deadline: {new Date(c.deadline).toLocaleDateString()} · Assigned: {c.assignedWorker?.name || 'Unassigned'}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
              <StatusBadge status={c.status} progress={c.progress} />
              <button className="text-xs font-bold text-[#176B4D] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Executive Intervention</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

