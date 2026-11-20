import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  CheckSquare,
  AlertTriangle,
  Clock,
  ArrowRight,
  Shield,
  Star,
  Phone,
} from 'lucide-react';

export const OfficerFieldWorkers: React.FC = () => {
  const { fieldWorkers, complaints, setSelectedComplaintId, setActiveTab } = useApp();
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>(fieldWorkers[0]?.id || '');

  const selectedWorker = fieldWorkers.find((w) => w.id === selectedWorkerId) || fieldWorkers[0];

  // Tasks assigned to this selected worker
  const workerTasks = complaints.filter(
    (c) => c.assignedWorker?.id === selectedWorker?.id || c.assignedWorker?.name === selectedWorker?.name
  );

  return (
    <div className="space-y-5">
      {/* Top Heading */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Field workers
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Balance workloads and track updates from your ward team.
        </p>
      </div>

      {/* Capacity Banner (Matches Field workers/Desktop.png) */}
      <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-3.5 text-xs text-[#065F46] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="font-semibold">
          4 eligible workers · 6 open assignments · 2 overdue
        </div>
        <div className="text-[11px] text-gray-600">
          Ward 12 only · 14 of 20 planning slots available. Paused, Reopened and Awaiting Citizen Verification remain in workload.
        </div>
      </div>

      {/* Grid: Worker List (7 cols) + Selected Worker Details (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Workers Roster */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
          <div className="pb-2 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              Ward team · workload & recent updates
            </h2>
            <span className="text-xs text-gray-400">All skills · overdue first</span>
          </div>

          <div className="space-y-3">
            {fieldWorkers.map((w) => {
              const isSelected = w.id === selectedWorker?.id;
              const activeCount = w.activeTasksCount;
              const slotPercent = Math.min(100, (activeCount / w.maxTasks) * 100);

              return (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorkerId(w.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#176B4D] bg-[#ECFDF5]/30 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        {w.name} · <span className="text-gray-600 font-normal">{w.specialty} certified</span>
                      </h3>
                      <div className="text-xs text-gray-500 mt-1">
                        {activeCount} active tasks · {w.completedCount} completed · {slotPercent}% of {w.maxTasks} slots
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{w.rating}</span>
                    </div>
                  </div>

                  {/* Workload Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          slotPercent > 80 ? 'bg-red-500' : slotPercent > 50 ? 'bg-amber-500' : 'bg-[#176B4D]'
                        }`}
                        style={{ width: `${slotPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Worker Details Panel */}
        {selectedWorker && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
            <div className="pb-2 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">
                {selectedWorker.name} · selected worker details
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {selectedWorker.specialty} · Ward 12 · On duty {selectedWorker.shift}
              </p>
            </div>

            <div className="text-xs text-gray-600 space-y-2">
              <div className="font-semibold text-gray-800">
                {selectedWorker.activeTasksCount} open tasks / {selectedWorker.maxTasks} planning slots
              </div>
              <p className="text-[11px] text-gray-500">
                Specialized in municipal {selectedWorker.specialty.toLowerCase()} civil operations. Contact: {selectedWorker.phone}
              </p>
            </div>

            {/* List of active tasks assigned to this worker */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-gray-700">Assigned Tasks</div>
              {workerTasks.length === 0 ? (
                <div className="p-4 bg-gray-50 rounded-xl text-xs text-gray-500 text-center">
                  No active tasks currently assigned.
                </div>
              ) : (
                workerTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setSelectedComplaintId(t.id);
                      setActiveTab('assignment');
                    }}
                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-xs cursor-pointer space-y-1 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">{t.id} · {t.title}</span>
                      <span className="font-semibold text-amber-700">{t.progress}%</span>
                    </div>
                    <div className="text-[11px] text-gray-500">{t.location.address}</div>
                    <div className="text-[10px] text-gray-400">
                      Deadline: {new Date(t.deadline).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setActiveTab('escalations')}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-800 transition-colors"
            >
              Review worker escalations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

