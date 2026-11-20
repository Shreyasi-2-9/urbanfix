import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { PriorityBadge } from '../common/StatusBadge';

export const OfficerDeadlinesEscalations: React.FC = () => {
  const { complaints, escalateComplaint, setSelectedComplaintId, setActiveTab } = useApp();

  const [selectedEscalateId, setSelectedEscalateId] = useState<string>('UF-003');
  const [recipient, setRecipient] = useState('Ward 12 Engineering Lead');
  const [reason, setReason] = useState('material supply delay at batching plant');
  const [requestedAction, setRequestedAction] = useState(
    'Arrange asphalt cold mix supply and confirm revised ETA by 20 Oct, 14:00'
  );

  const wardComplaints = complaints.filter(
    (c) =>
      c.location.ward.includes('Ward 12') ||
      c.location.ward.includes('Lakeview') ||
      c.location.ward.includes('Bandra')
  );

  const overdueList = wardComplaints.filter(
    (c) =>
      c.status !== 'verified' &&
      new Date(c.deadline).getTime() < new Date().getTime()
  );

  const handleEscalationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEscalateId) return;
    escalateComplaint(selectedEscalateId, `${reason} - ${requestedAction}`, recipient);
  };

  return (
    <div className="space-y-5">
      {/* Top Heading */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Deadlines & escalations
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Resolve delays with accountable, auditable municipal follow-up.
        </p>
      </div>

      {/* Banner (Matches Deadlines & escalations/Desktop.png) */}
      <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-xl p-3.5 text-xs text-[#991B1B] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="font-bold flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span>{overdueList.length} overdue · 1 due within 24h · 1 paused</span>
        </div>
        <div className="text-[11px] text-red-700">
          Original policy deadlines remain visible. Pausing, reopening and escalating do not reset the clock or erase missed SLAs.
        </div>
      </div>

      {/* Grid: Overdue Action Required (6 cols) + Record Escalation Form (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Overdue Items */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
          <div className="pb-2 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              Overdue · action required
            </h2>
            <span className="text-xs font-semibold text-red-600">
              {overdueList.length} issues
            </span>
          </div>

          <div className="space-y-3">
            {overdueList.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedEscalateId(c.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedEscalateId === c.id
                    ? 'border-red-500 bg-red-50/30 ring-1 ring-red-400'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">
                    {c.id} · {c.title}
                  </span>
                  <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                    SLA Missed
                  </span>
                </div>

                <p className="text-xs text-gray-600 mt-1">
                  Assigned: {c.assignedWorker?.name || 'Unassigned'} · Due: {new Date(c.deadline).toLocaleDateString()}
                </p>

                <div className="text-xs text-[#176B4D] font-semibold mt-2 flex items-center gap-1">
                  <span>Record escalation</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Record Escalation Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
          <div className="pb-2 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900">
              Record escalation · {selectedEscalateId}
            </h2>
            <p className="text-xs text-gray-500">
              Formal notification to engineering supervisor and recorded in audit log.
            </p>
          </div>

          <form onSubmit={handleEscalationSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Recipient & Authority
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Root Cause & Delay Reason
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Requested Action & Check-back Target
              </label>
              <textarea
                value={requestedAction}
                onChange={(e) => setRequestedAction(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#176B4D] hover:bg-[#13593F] active:bg-[#0E4631] text-white text-xs font-bold shadow flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Record & notify lead</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

