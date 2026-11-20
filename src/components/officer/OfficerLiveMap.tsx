import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MumbaiMap } from '../map/MumbaiMap';
import { StatusBadge, PriorityBadge } from '../common/StatusBadge';
import {
  MapPin,
  Clock,
  User,
  Shield,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const OfficerLiveMap: React.FC = () => {
  const {
    complaints,
    selectedComplaintId,
    setSelectedComplaintId,
    setActiveTab,
    selectedWard,
  } = useApp();

  const [filterMode, setFilterMode] = useState<'all' | 'open' | 'overdue'>('open');

  const wardComplaints = complaints.filter(
    (c) =>
      c.location.ward.includes('Ward 12') ||
      c.location.ward.includes('Lakeview') ||
      c.location.ward.includes('Bandra')
  );

  const selectedComplaint = complaints.find((c) => c.id === selectedComplaintId) || wardComplaints[0];

  const handleAssignClick = (id: string) => {
    setSelectedComplaintId(id);
    setActiveTab('assignment');
  };

  return (
    <div className="space-y-4">
      {/* Top Title */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Live complaints map
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Locate issues, review clusters and act within your authorized ward.
        </p>
      </div>

      {/* Applied Filters Banner (Matches Live complaints map/Desktop.png) */}
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 text-xs text-gray-700 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="font-bold text-gray-900">Search & applied filters: </span>
          <span>School Road · Open only · All categories · Ward 12 locked</span>
        </div>
        <div className="text-[11px] text-gray-500">
          {wardComplaints.filter((c) => c.status !== 'verified').length} open records in Ward 12
        </div>
      </div>

      {/* Map + Detail Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Map Container (8 cols) */}
        <div className="lg:col-span-8">
          <MumbaiMap
            complaints={wardComplaints}
            selectedComplaintId={selectedComplaintId}
            onSelectComplaint={(id) => setSelectedComplaintId(id)}
            heightClass="h-[580px]"
          />
        </div>

        {/* Selected Complaint Card on Right (4 cols) - Matches exact reference screenshot */}
        <div className="lg:col-span-4 space-y-4">
          {selectedComplaint ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900">{selectedComplaint.id}</span>
                <PriorityBadge priority={selectedComplaint.priority} />
              </div>

              <div>
                <h2 className="text-base font-bold text-gray-900 leading-snug">
                  {selectedComplaint.title}
                </h2>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{selectedComplaint.location.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={selectedComplaint.status} progress={selectedComplaint.progress} />
                <span className="text-[11px] text-gray-500">
                  {selectedComplaint.votes} resident votes
                </span>
              </div>

              {/* Assignee & Deadline Status */}
              <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1.5 border border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-500">Assignee:</span>
                  <span className="font-semibold text-gray-800">
                    {selectedComplaint.assignedWorker?.name || 'Unassigned'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">SLA Deadline:</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(selectedComplaint.deadline).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleAssignClick(selectedComplaint.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#176B4D] hover:bg-[#13593F] active:bg-[#0E4631] text-white text-xs font-bold shadow flex items-center justify-center gap-2 transition-all"
              >
                <span>View details & assign</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : null}

          {/* Ward Enforcement Policy Box (Matches Desktop.png) */}
          <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-4 text-xs text-[#065F46] space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#10B981]" />
              <span>Ward boundary enforced</span>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-700">
              Out-of-ward context may be viewed, but assignment, priority and deadline changes are restricted to authorized Ward 12 jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

