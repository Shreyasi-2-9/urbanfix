import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  Users,
  Search,
  Filter,
  ChevronRight,
  Plus,
  MapPin,
} from 'lucide-react';

export const CitizenMyComplaints: React.FC = () => {
  const { complaints, setSelectedComplaintId, setActiveTab } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Aarav Kumar's complaints (plus any newly submitted ones)
  const myComplaints = complaints.filter(
    (c) =>
      c.citizen.name.includes('Aarav') ||
      c.citizen.name.includes('Anonymous') ||
      c.hasVoted
  );

  const totalReports = myComplaints.length;
  const openCases = myComplaints.filter(
    (c) => c.status !== 'verified'
  ).length;
  const resolvedCases = myComplaints.filter((c) => c.status === 'verified').length;
  const totalSupported = myComplaints.reduce((acc, c) => acc + c.votes, 0);

  const filteredList = myComplaints.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.location.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleComplaintClick = (id: string) => {
    setSelectedComplaintId(id);
    setActiveTab('map');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
            My complaints
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            {totalReports} reports · {resolvedCases} resolved · {openCases} currently in progress
          </p>
        </div>

        <button
          onClick={() => setActiveTab('report')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#13593F] active:bg-[#0E4631] text-white text-xs md:text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Report new problem</span>
        </button>
      </div>

      {/* KPI Cards Row (Matches design references) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">{totalReports}</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Total reports</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600">
            <ClipboardList className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-amber-700">{openCases}</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Open cases</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-emerald-700">{resolvedCases}</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Resolved</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">{totalSupported}</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Residents supported</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Complaint History Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
        {/* Table Top bar */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F9FAFB]/50">
          <div>
            <h2 className="text-base font-bold text-gray-900">Complaint history</h2>
            <p className="text-xs text-gray-500">Select a complaint to open its public record and map location.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search complaints..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#176B4D]/20 focus:border-[#176B4D]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-gray-200 text-gray-700 bg-white focus:outline-none"
            >
              <option value="all">All statuses</option>
              <option value="reported">Reported</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="paused">Paused</option>
              <option value="awaiting_verification">Awaiting Verification</option>
              <option value="verified">Resolved / Verified</option>
            </select>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-100">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/70">
            <div className="col-span-2">Complaint ID</div>
            <div className="col-span-5">Problem & Location</div>
            <div className="col-span-2">Reported Date</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {filteredList.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-xs">
              No complaints match the current filter.
            </div>
          ) : (
            filteredList.map((c) => (
              <div
                key={c.id}
                onClick={() => handleComplaintClick(c.id)}
                className="p-4 sm:px-6 sm:py-4 flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-2 hover:bg-[#F4F6F4]/50 cursor-pointer transition-colors group"
              >
                {/* ID with left indicator line */}
                <div className="col-span-2 flex items-center gap-2">
                  <span
                    className={`w-1 h-6 rounded-full ${
                      c.status === 'verified'
                        ? 'bg-emerald-500'
                        : c.status === 'in_progress'
                        ? 'bg-amber-500'
                        : c.status === 'assigned'
                        ? 'bg-blue-500'
                        : 'bg-gray-400'
                    }`}
                  />
                  <span className="text-xs font-bold text-gray-900 group-hover:text-[#176B4D]">
                    {c.id}
                  </span>
                </div>

                {/* Problem & Location */}
                <div className="col-span-5">
                  <div className="text-xs font-bold text-gray-800">{c.title}</div>
                  <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span>{c.location.address}</span>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-2 text-xs text-gray-600">
                  {new Date(c.reportedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <StatusBadge status={c.status} progress={c.progress} />
                </div>

                {/* Arrow */}
                <div className="col-span-1 hidden md:flex justify-end text-gray-400 group-hover:text-gray-700">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

