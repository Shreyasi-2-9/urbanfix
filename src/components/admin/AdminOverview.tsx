import React from 'react';
import { useApp } from '../../context/AppContext';
import { MUMBAI_WARDS } from '../../data/mumbaiWards';
import {
  Building2,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Shield,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const { complaints, fieldWorkers, auditEvents, setActiveTab, setSelectedComplaintId } = useApp();

  const totalComplaints = complaints.length;
  const activeComplaints = complaints.filter((c) => c.status !== 'verified').length;
  const overdueComplaints = complaints.filter(
    (c) =>
      c.status !== 'verified' &&
      new Date(c.deadline).getTime() < new Date().getTime()
  ).length;
  const awaitingVerification = complaints.filter((c) => c.status === 'awaiting_verification').length;
  const resolvedComplaints = complaints.filter((c) => c.status === 'verified').length;
  const resolutionRate = ((resolvedComplaints / totalComplaints) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            Greater Metropolitan Directorate — City Overview
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Vikramaditya Roy · Municipal Commissioner · All 24 Wards Active Monitoring
          </p>
        </div>

        <button
          onClick={() => setActiveTab('map')}
          className="px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#13593F] text-white text-xs font-bold shadow transition-all self-start sm:self-auto"
        >
          View Citywide Live Map
        </button>
      </div>

      {/* City-Wide Statistics Cards (Matches Phase 7 spec) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Total Complaints</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{totalComplaints}</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Citywide 24 wards</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Active Backlog</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-1">{activeComplaints}</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">In triage / progress</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-red-200 bg-red-50/20 shadow-subtle">
          <span className="text-[11px] font-semibold text-red-600 block">Overdue SLAs</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600 mt-1">{overdueComplaints}</div>
          <span className="text-[10px] text-red-500 mt-0.5 block">Requires intervention</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Awaiting Verification</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 mt-1">{awaitingVerification}</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Citizen check window</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-emerald-800 block">City Resolution Rate</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">{resolutionRate}%</div>
          <span className="text-[10px] text-emerald-600 mt-0.5 block">{resolvedComplaints} verified</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Active Force</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{fieldWorkers.length}</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Specialists on duty</span>
        </div>
      </div>

      {/* Middle Row: Urgent Escalation Queue + Ward Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Urgent Escalations */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Urgent Escalation Queue
              </h2>
              <p className="text-xs text-gray-500">Critical incidents needing Commissioner Directorate attention</p>
            </div>
            <button
              onClick={() => setActiveTab('escalations')}
              className="text-xs font-semibold text-[#176B4D] hover:underline"
            >
              Open Center
            </button>
          </div>

          <div className="space-y-3">
            {complaints
              .filter((c) => c.priority === 'critical' || c.status === 'reopened')
              .slice(0, 4)
              .map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedComplaintId(c.id);
                    setActiveTab('map');
                  }}
                  className="p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-xs cursor-pointer space-y-1 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{c.id} · {c.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                      {c.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-gray-500">{c.location.address} · {c.location.ward}</div>
                  <div className="text-[11px] text-red-700 font-medium">
                    SLA Deadline: {new Date(c.deadline).toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Top Performing Wards */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900">Top Performing Wards</h2>
            <button
              onClick={() => setActiveTab('wards')}
              className="text-xs font-semibold text-[#176B4D] hover:underline"
            >
              All 24 Wards
            </button>
          </div>

          <div className="space-y-3">
            {MUMBAI_WARDS.slice(0, 5).map((w, idx) => (
              <div key={w.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-gray-900 block">#{idx + 1} {w.name}</span>
                  <span className="text-gray-500 text-[11px]">Officer: {w.wardOfficer} · {w.totalComplaints} issues</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-700 font-bold block">{w.resolutionRate}%</span>
                  <span className="text-[10px] text-gray-400">Resolution</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chronological Audit Feed */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#176B4D]" />
            Citywide Municipal Audit Trail
          </h2>
          <button
            onClick={() => setActiveTab('audit-trail')}
            className="text-xs font-semibold text-[#176B4D] hover:underline"
          >
            View Full Immutable Log
          </button>
        </div>

        <div className="space-y-2 text-xs text-gray-700">
          {auditEvents.slice(0, 5).map((e) => (
            <div key={e.id} className="flex items-center justify-between py-1.5 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <span className="font-mono text-gray-400 text-[11px]">
                  {new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="font-bold text-gray-900">{e.actor}</span>
                <span className="text-gray-400">({e.role}):</span>
                <span className="text-gray-700">{e.details}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-600">
                {e.action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

