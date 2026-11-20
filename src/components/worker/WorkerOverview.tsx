import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  Clock,
  PauseCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Wrench,
  Calendar,
} from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../common/StatusBadge';

export const WorkerOverview: React.FC = () => {
  const { complaints, setSelectedComplaintId, setActiveTab } = useApp();

  // Asha Nair's assigned tasks (covering all civic repair categories)
  const myTasks = complaints.filter(
    (c) =>
      c.assignedWorker?.name === 'Asha Nair' ||
      [
        'UF-001',
        'UF-002',
        'UF-003',
        'UF-004',
        'UF-005',
        'UF-006',
        'UF-007',
        'UF-012',
        'UF-104',
        'UF-301',
      ].includes(c.id)
  );

  const assignedCount = myTasks.filter((c) => c.status === 'assigned').length;
  const inProgressCount = myTasks.filter((c) => c.status === 'in_progress').length;
  const pausedCount = myTasks.filter((c) => c.status === 'paused').length;
  const awaitingVerificationCount = myTasks.filter((c) => c.status === 'awaiting_verification').length;
  const completedCount = myTasks.filter((c) => c.status === 'verified').length;

  const handleOpenTask = (id: string) => {
    setSelectedComplaintId(id);
    setActiveTab('task-details');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
          Field Operations Overview
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Asha Nair · Drainage Specialist · Ward 12 (Bandra / Lakeview) · Shift: 08:00 – 17:00 IST
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-xs font-semibold text-gray-500">Assigned Tasks</span>
          <div className="text-3xl font-extrabold text-blue-700 mt-1">{assignedCount}</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Pending initiation</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-xs font-semibold text-gray-500">In Progress</span>
          <div className="text-3xl font-extrabold text-amber-700 mt-1">{inProgressCount}</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Active on-site work</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-orange-200 bg-orange-50/20 shadow-subtle">
          <span className="text-xs font-semibold text-orange-800">Paused</span>
          <div className="text-3xl font-extrabold text-orange-600 mt-1">{pausedCount}</div>
          <span className="text-[10px] text-orange-600 mt-0.5 block">Awaiting clearance</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-teal-200 bg-teal-50/20 shadow-subtle">
          <span className="text-xs font-semibold text-teal-800">Awaiting Verification</span>
          <div className="text-3xl font-extrabold text-teal-700 mt-1">{awaitingVerificationCount}</div>
          <span className="text-[10px] text-teal-600 mt-0.5 block">Submitted for review</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-subtle">
          <span className="text-xs font-semibold text-emerald-800">Completed & Verified</span>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1">{completedCount + 48}</div>
          <span className="text-[10px] text-emerald-600 mt-0.5 block">Citizen confirmed</span>
        </div>
      </div>

      {/* Active Work Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Assigned Work Orders</h2>
            <p className="text-xs text-gray-500">Tasks officially routed by Ward Officer Priya Sharma</p>
          </div>
          <button
            onClick={() => setActiveTab('tasks')}
            className="text-xs font-semibold text-[#176B4D] hover:underline"
          >
            View all my tasks
          </button>
        </div>

        <div className="space-y-3">
          {myTasks.map((t) => (
            <div
              key={t.id}
              onClick={() => handleOpenTask(t.id)}
              className="p-4 rounded-xl border border-gray-200 hover:border-[#176B4D] bg-white hover:bg-[#F4F6F4]/30 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-900 group-hover:text-[#176B4D]">
                    {t.id} · {t.title}
                  </span>
                  <StatusBadge status={t.status} progress={t.progress} />
                  <PriorityBadge priority={t.priority} />
                </div>
                <div className="text-xs text-gray-500">
                  {t.location.address} · {t.location.ward}
                </div>
                {t.pauseReason && (
                  <div className="text-[11px] text-orange-700 font-medium">
                    Pause notice: {t.pauseReason}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-semibold text-gray-800">
                    Due {new Date(t.deadline).toLocaleDateString()}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    SLA tracking active
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#176B4D]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

