import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Users,
  MapPin,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const OfficerOverview: React.FC = () => {
  const {
    complaints,
    fieldWorkers,
    auditEvents,
    setSelectedComplaintId,
    setActiveTab,
  } = useApp();

  const ward12Complaints = complaints.filter(
    (c) => c.location.ward.includes('Ward 12') || c.location.ward.includes('Lakeview') || c.location.ward.includes('Bandra')
  );

  const totalOpen = ward12Complaints.filter((c) => c.status !== 'verified').length;
  const unassignedCount = ward12Complaints.filter((c) => c.status === 'reported' || c.status === 'reviewed').length;
  const inProgressCount = ward12Complaints.filter((c) => c.status === 'in_progress').length;
  const overdueCount = ward12Complaints.filter(
    (c) =>
      c.status !== 'verified' &&
      new Date(c.deadline).getTime() < new Date().getTime()
  ).length;
  const awaitingVerificationCount = ward12Complaints.filter((c) => c.status === 'awaiting_verification').length;
  const verifiedCount = ward12Complaints.filter((c) => c.status === 'verified').length;

  const handleComplaintAction = (id: string, tab: string) => {
    setSelectedComplaintId(id);
    setActiveTab(tab);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Heading */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Good morning, Priya
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Your ward at a glance. Focus on what needs attention today.
        </p>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-1">
          WARD OFFICER DASHBOARD · DESKTOP · BMC Ward 12 (Bandra / Lakeview) · 20 Oct 2026, 10:00 IST
        </div>
      </div>

      {/* 6 KPI Cards Grid (Matches exact Ward Officer Overview screenshot) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Open</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{totalOpen}</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">All not yet citizen-verified</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Unassigned</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{unassignedCount}</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Reported + reviewed</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">In Progress</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{inProgressCount}</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Active field work</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-red-200 bg-red-50/20 shadow-subtle">
          <span className="text-[11px] font-semibold text-red-600 block">Overdue</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600 mt-1">{overdueCount}</div>
          <span className="text-[10px] text-red-500 mt-0.5 block">Action required today</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Awaiting Verification</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{awaitingVerificationCount}</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Citizen response pending</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Verified Resolutions</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{verifiedCount}</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Citizen-verified only</span>
        </div>
      </div>

      {/* Middle Row: Priority Actions (7 cols) + Ward Map Preview (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Priority Actions */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Needs your attention · 3 priority actions
              </h2>
              <p className="text-xs text-gray-500">
                {totalOpen} open complaints · Ward 12 · urgency first
              </p>
            </div>
            <button
              onClick={() => setActiveTab('escalations')}
              className="text-xs font-semibold text-[#176B4D] hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {/* UF-008 Reopened */}
            <div
              onClick={() => handleComplaintAction('UF-008', 'verification')}
              className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/30 hover:bg-rose-50/60 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-900">
                  UF-008 · Reopened · 2h overdue
                </span>
                <span className="text-[10px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                  Disputed by citizen
                </span>
              </div>
              <p className="text-xs text-gray-700 mt-1">
                Citizen disputed the flickering streetlight, 19 Oct, 18:00. Meera Shah · Lake Road.
              </p>
              <div className="text-xs text-[#176B4D] font-semibold mt-2 flex items-center gap-1">
                <span>Review dispute</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* UF-003 In Progress 16h overdue */}
            <div
              onClick={() => handleComplaintAction('UF-003', 'escalations')}
              className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/30 hover:bg-amber-50/60 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900">
                  UF-003 · In Progress · 16h overdue
                </span>
                <span className="text-[10px] font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                  Overdue SLA
                </span>
              </div>
              <p className="text-xs text-gray-700 mt-1">
                Ravi Kumar · Pothole at bus stop · due 19 Oct, 18:00. Materials delayed.
              </p>
              <div className="text-xs text-[#176B4D] font-semibold mt-2 flex items-center gap-1">
                <span>Record escalation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* UF-001 Reviewed Unassigned High */}
            <div
              onClick={() => handleComplaintAction('UF-001', 'assignment')}
              className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/30 hover:bg-blue-50/60 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900">
                  UF-001 · Reviewed · Unassigned · High
                </span>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  Safety Hazard
                </span>
              </div>
              <p className="text-xs text-gray-700 mt-1">
                School Road · 18 votes · due 21 Oct, 09:00. Open manhole near school.
              </p>
              <div className="text-xs text-[#176B4D] font-semibold mt-2 flex items-center gap-1">
                <span>Assign eligible worker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('escalations')}
            className="w-full py-2.5 rounded-xl bg-[#176B4D] text-white text-xs font-bold hover:bg-[#13593F] transition-colors"
          >
            Review urgent complaints
          </button>
        </div>

        {/* Ward Map Preview */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Ward map preview</h2>
              <span className="text-xs text-gray-500 font-medium">
                {totalOpen} open · {verifiedCount} verified
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Authorized municipal boundary: Ward 12 (Bandra West & Lakeview)
            </p>
          </div>

          {/* Mini map container illustration / snippet */}
          <div className="h-56 rounded-xl overflow-hidden border border-gray-200 bg-[#E5ECE7] relative flex items-center justify-center p-4">
            <div className="absolute inset-4 rounded-lg border-2 border-dashed border-[#176B4D] bg-[#ECFDF5]/50 flex flex-col justify-between p-3">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-[#176B4D]">Ward 12 Boundary</span>
                <span className="text-[10px] text-gray-500">200m scale</span>
              </div>

              {/* Pins scatter */}
              <div className="flex items-center justify-around">
                <div className="flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-red-600 ring-2 ring-white" />
                  <span className="text-[9px] font-bold text-red-700 mt-1">UF-001</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-amber-500 ring-2 ring-white" />
                  <span className="text-[9px] font-bold text-amber-800 mt-1">UF-003</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-orange-500 ring-2 ring-white" />
                  <span className="text-[9px] font-bold text-orange-800 mt-1">UF-004</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 ring-2 ring-white" />
                  <span className="text-[9px] font-bold text-emerald-800 mt-1">UF-007</span>
                </div>
              </div>

              <div className="text-[10px] text-gray-500 text-center font-medium">
                School Road · Park Lane · Lake Road · Market Street
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('map')}
            className="w-full py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-800 transition-colors"
          >
            Open live complaints map
          </button>
        </div>
      </div>

      {/* Bottom: Recent Activity Audit Trail Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#176B4D]" />
            Recent activity · preserved audit trail
          </h2>
          <span className="text-xs text-gray-400">All times IST</span>
        </div>

        <div className="space-y-2">
          {auditEvents.slice(0, 4).map((event) => (
            <div key={event.id} className="text-xs text-gray-700 flex items-start gap-2 py-1">
              <span className="font-mono text-gray-400 text-[11px] whitespace-nowrap">
                {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span>·</span>
              <span className="font-semibold text-gray-900">{event.actor}</span>
              <span>({event.role}):</span>
              <span className="text-gray-600">{event.details}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 space-y-2">
        <span className="text-xs font-bold text-gray-700">Quick actions</span>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setActiveTab('complaints-management')}
            className="px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-xs font-semibold text-gray-800 shadow-sm"
          >
            Review 2 unassigned
          </button>
          <button
            onClick={() => setActiveTab('field-workers')}
            className="px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-xs font-semibold text-gray-800 shadow-sm"
          >
            Assign field workers
          </button>
          <button
            onClick={() => setActiveTab('escalations')}
            className="px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-xs font-semibold text-gray-800 shadow-sm"
          >
            Review 2 overdue
          </button>
        </div>
      </div>
    </div>
  );
};

