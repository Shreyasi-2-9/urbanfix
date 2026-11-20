import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Search, Filter, Download, ArrowDownUp } from 'lucide-react';

export const AdminAuditTrail: React.FC = () => {
  const { auditEvents } = useApp();
  const [filterAction, setFilterAction] = useState<string>('all');
  const [searchAudit, setSearchAudit] = useState('');

  const filteredLogs = auditEvents.filter((e) => {
    if (filterAction !== 'all' && e.action !== filterAction) return false;
    if (searchAudit) {
      const q = searchAudit.toLowerCase();
      return (
        e.actor.toLowerCase().includes(q) ||
        e.action.toLowerCase().includes(q) ||
        (e.complaintId && e.complaintId.toLowerCase().includes(q)) ||
        e.details.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportAudit = () => {
    alert('Municipal Immutable Audit Trail exported as CSV.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
            Municipal Audit Trail
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Immutable, chronological record of every status transition, assignment, and verification
          </p>
        </div>

        <button
          onClick={handleExportAudit}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 shadow-sm transition-all"
        >
          <Download className="w-3.5 h-3.5 text-[#176B4D]" />
          <span>Export Audit Log</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#176B4D]" />
            <span className="text-xs font-bold text-gray-800">
              {filteredLogs.length} verified audit records
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchAudit}
                onChange={(e) => setSearchAudit(e.target.value)}
                placeholder="Search actor, ID or action..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-800 bg-white"
              />
            </div>

            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-gray-200 text-gray-700 bg-white"
            >
              <option value="all">All Actions</option>
              <option value="COMPLAINT_REGISTERED">Complaint Registered</option>
              <option value="WORKER_ASSIGNED">Worker Assigned</option>
              <option value="PROGRESS_UPDATED">Progress Updated</option>
              <option value="TASK_PAUSED">Task Paused</option>
              <option value="REPAIR_SUBMITTED_FOR_VERIFICATION">Evidence Submitted</option>
              <option value="OFFICER_EVIDENCE_APPROVED">Officer Approved</option>
              <option value="CITIZEN_CONFIRMED_RESOLUTION">Citizen Verified</option>
              <option value="CITIZEN_DISPUTED_REPAIR">Citizen Disputed</option>
            </select>
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-4">Timestamp (IST)</th>
                <th className="py-3 px-3">Actor & Role</th>
                <th className="py-3 px-3">Complaint</th>
                <th className="py-3 px-3">Action Type</th>
                <th className="py-3 px-5">Operational Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-sans">
              {filteredLogs.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono text-gray-500 whitespace-nowrap text-[11px]">
                    {new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    <span className="block text-[10px] text-gray-400">
                      {new Date(e.timestamp).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-bold text-gray-900 block">{e.actor}</span>
                    <span className="text-[10px] text-gray-500">{e.role}</span>
                  </td>

                  <td className="py-3 px-3 font-mono font-semibold text-gray-800">
                    {e.complaintId || '—'}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-gray-100 text-gray-700">
                      {e.action}
                    </span>
                  </td>

                  <td className="py-3 px-5 text-gray-600">
                    {e.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

