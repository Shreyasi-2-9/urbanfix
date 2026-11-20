import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ComplaintPriority } from '../../types';
import {
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  User,
  Shield,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import { PriorityBadge } from '../common/StatusBadge';

export const OfficerDetailsAssignment: React.FC = () => {
  const {
    complaints,
    fieldWorkers,
    selectedComplaintId,
    assignWorker,
    setActiveTab,
    setLightboxImage,
  } = useApp();

  const selectedComplaint =
    complaints.find((c) => c.id === selectedComplaintId) || complaints[0];

  const [selectedWorkerId, setSelectedWorkerId] = useState<string>(
    fieldWorkers[0]?.id || ''
  );
  const [priority, setPriority] = useState<ComplaintPriority>(
    selectedComplaint?.priority || 'high'
  );
  const [deadline, setDeadline] = useState(
    selectedComplaint?.deadline ? selectedComplaint.deadline.slice(0, 16) : ''
  );
  const [directive, setDirective] = useState(
    selectedComplaint?.officialDirective ||
      'Barricade immediately, fit the approved heavy-duty ductile iron cover and upload before/after evidence.'
  );

  const selectedWorker = fieldWorkers.find((w) => w.id === selectedWorkerId);

  const handleConfirmAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    assignWorker(selectedComplaint.id, selectedWorkerId, priority, deadline, directive);
    setActiveTab('complaints-management');
  };

  return (
    <div className="space-y-5">
      {/* Top Heading */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Details & assignment
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Review the report and assign an eligible worker with a clear deadline.
        </p>
      </div>

      {/* 4-Box Split Grid (Matches Details & assignment/Desktop.png) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Top-Left: Complaint Details Card (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                COMPLAINT {selectedComplaint.id}
              </span>
              <h2 className="text-lg font-bold text-gray-900 mt-0.5">
                {selectedComplaint.title}
              </h2>
            </div>
            <PriorityBadge priority={selectedComplaint.priority} />
          </div>

          <div className="text-xs text-gray-600 space-y-1">
            <div className="font-semibold text-gray-800">
              {selectedComplaint.location.address} · Inside {selectedComplaint.location.ward}
            </div>
            <p className="italic text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
              &ldquo;{selectedComplaint.description}&rdquo;
            </p>
          </div>

          {/* Photo Evidence */}
          <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            <img
              src={selectedComplaint.photos.before}
              alt="Citizen uploaded photo"
              className="w-full h-56 object-cover cursor-pointer"
              onClick={() => setLightboxImage(selectedComplaint.photos.before)}
            />
            <button
              onClick={() => setLightboxImage(selectedComplaint.photos.before)}
              className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] font-semibold text-white tracking-wider uppercase">
              ORIGINAL CITIZEN PHOTO
            </div>
          </div>
          <div className="text-[11px] text-gray-400">
            Original citizen photo · Retained in municipal audit record
          </div>
        </div>

        {/* Top-Right: Assignment & Review Form (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-5">
          <div className="border-b border-gray-100 pb-2">
            <h2 className="text-base font-bold text-gray-900">
              Assignment · review before confirming
            </h2>
            <p className="text-xs text-gray-500">
              Ward 12 Drainage eligibility verified.
            </p>
          </div>

          <form onSubmit={handleConfirmAssignment} className="space-y-4">
            {/* Worker Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Selected eligible worker
              </label>
              <select
                value={selectedWorkerId}
                onChange={(e) => setSelectedWorkerId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#176B4D]/20"
              >
                {fieldWorkers.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} · {w.specialty} ({w.activeTasksCount} active tasks / 5 max)
                  </option>
                ))}
              </select>

              {selectedWorker && (
                <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-3 text-xs text-[#065F46] mt-2">
                  <div className="font-bold">{selectedWorker.name} · {selectedWorker.specialty}</div>
                  <div className="text-[11px] text-gray-600 mt-0.5">
                    {selectedWorker.activeTasksCount} active tasks · {5 - selectedWorker.activeTasksCount} available planning slots. On-duty (08:00 - 17:00 IST).
                  </div>
                </div>
              )}
            </div>

            {/* Priority & Deadline */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full p-2 rounded-xl border border-gray-300 text-xs"
                >
                  <option value="critical">Critical (12h SLA)</option>
                  <option value="high">High (24h SLA)</option>
                  <option value="normal">Normal (72h SLA)</option>
                  <option value="low">Low (120h SLA)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Expected deadline
                </label>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full p-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>
            </div>

            {/* Directive Instructions */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 block">
                Official work order directive
              </label>
              <textarea
                value={directive}
                onChange={(e) => setDirective(e.target.value)}
                rows={3}
                placeholder="Required repair actions, safety instructions, barricading..."
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs text-gray-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#176B4D] hover:bg-[#13593F] active:bg-[#0E4631] text-white text-xs font-bold shadow transition-all"
            >
              Confirm assignment
            </button>
          </form>
        </div>

        {/* Bottom-Left: History & Duplicate Review (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-3">
          <h2 className="text-sm font-bold text-gray-900">History & duplicate review</h2>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="font-semibold text-gray-800">Triage history: </span>
              {selectedComplaint.reportedAt ? new Date(selectedComplaint.reportedAt).toLocaleDateString() : ''} · Citizen reported photo with {selectedComplaint.votes} initial votes recorded.
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="font-semibold text-gray-800">Duplicate detection: </span>
              No identical complaints found within 50-meter radius in Ward 12. Safe to assign.
            </div>
          </div>
        </div>

        {/* Bottom-Right: Accountable Assignment Controls (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-3">
          <h2 className="text-sm font-bold text-gray-900">Accountable assignment controls</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Confirmation notifies the worker and citizen, records Assigned and appends an audit event.
            Pausing or reassignment requires a specific justification reason and does not automatically extend municipal SLA targets.
          </p>
        </div>
      </div>
    </div>
  );
};

