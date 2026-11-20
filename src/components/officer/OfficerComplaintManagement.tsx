import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge, PriorityBadge } from '../common/StatusBadge';
import {
  Search,
  Filter,
  ArrowUpDown,
  MapPin,
  Clock,
  UserCheck,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

export const OfficerComplaintManagement: React.FC = () => {
  const { complaints, setSelectedComplaintId, setActiveTab } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'open' | 'unassigned' | 'overdue' | 'verified'>('unassigned');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'priority' | 'deadline' | 'id'>('priority');

  const wardComplaints = complaints.filter(
    (c) =>
      c.location.ward.includes('Ward 12') ||
      c.location.ward.includes('Lakeview') ||
      c.location.ward.includes('Bandra')
  );

  const totalAll = wardComplaints.length;
  const totalOpen = wardComplaints.filter((c) => c.status !== 'verified').length;
  const totalUnassigned = wardComplaints.filter((c) => c.status === 'reported' || c.status === 'reviewed').length;
  const totalOverdue = wardComplaints.filter(
    (c) =>
      c.status !== 'verified' &&
      new Date(c.deadline).getTime() < new Date().getTime()
  ).length;
  const totalVerified = wardComplaints.filter((c) => c.status === 'verified').length;

  const filteredList = wardComplaints.filter((c) => {
    if (activeTabFilter === 'open' && c.status === 'verified') return false;
    if (activeTabFilter === 'unassigned' && c.status !== 'reported' && c.status !== 'reviewed') return false;
    if (activeTabFilter === 'overdue') {
      const isOverdue = c.status !== 'verified' && new Date(c.deadline).getTime() < new Date().getTime();
      if (!isOverdue) return false;
    }
    if (activeTabFilter === 'verified' && c.status !== 'verified') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.location.address.toLowerCase().includes(q) ||
        c.assignedWorker?.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleReviewClick = (id: string) => {
    setSelectedComplaintId(id);
    setActiveTab('assignment');
  };

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Complaint management
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Review, prioritize and route complaints to eligible field workers.
        </p>
      </div>

      {/* Filter Tabs Row (Matches Complaint management/Desktop.png) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveTabFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTabFilter === 'all'
              ? 'bg-[#176B4D] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          All {totalAll}
        </button>

        <button
          onClick={() => setActiveTabFilter('open')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTabFilter === 'open'
              ? 'bg-[#176B4D] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Open {totalOpen}
        </button>

        <button
          onClick={() => setActiveTabFilter('unassigned')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTabFilter === 'unassigned'
              ? 'bg-[#176B4D] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Unassigned {totalUnassigned} selected
        </button>

        <button
          onClick={() => setActiveTabFilter('overdue')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTabFilter === 'overdue'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-white text-red-700 hover:bg-red-50 border border-red-200'
          }`}
        >
          Overdue {totalOverdue}
        </button>

        <button
          onClick={() => setActiveTabFilter('verified')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTabFilter === 'verified'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
          }`}
        >
          Verified {totalVerified}
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
          <div className="text-xs font-bold text-gray-800">
            {activeTabFilter.charAt(0).toUpperCase() + activeTabFilter.slice(1)} complaints · {filteredList.length} results
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search complaint ID or location..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#176B4D]/20 focus:border-[#176B4D]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs py-1.5 px-3 rounded-xl border border-gray-200 text-gray-700 bg-white"
            >
              <option value="priority">Priority (High first)</option>
              <option value="deadline">Deadline</option>
              <option value="id">ID</option>
            </select>
          </div>
        </div>

        {/* Table Rows (Matches exact design table in Complaint management/Desktop.png) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">Complaint</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-3">Assignee</th>
                <th className="py-3 px-3">Deadline</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No complaints found matching current criteria.
                  </td>
                </tr>
              ) : (
                filteredList.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-[#F4F6F4]/50 transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900 group-hover:text-[#176B4D]">
                        {c.id} · {c.title}
                      </div>
                      <div className="text-[11px] text-gray-400 capitalize">
                        {c.category.replace('_', ' ')} · {c.votes} votes
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <StatusBadge status={c.status} progress={c.progress} />
                    </td>

                    <td className="py-3.5 px-3">
                      <PriorityBadge priority={c.priority} />
                    </td>

                    <td className="py-3.5 px-4 text-gray-600 max-w-[200px] truncate">
                      {c.location.address}
                    </td>

                    <td className="py-3.5 px-3 text-gray-800 font-medium">
                      {c.assignedWorker?.name || (
                        <span className="text-gray-400 font-normal">Unassigned</span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap text-gray-600">
                      {new Date(c.deadline).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleReviewClick(c.id)}
                        className="px-3 py-1.5 rounded-lg border border-gray-300 hover:border-[#176B4D] hover:text-[#176B4D] bg-white font-semibold text-xs shadow-xs transition-colors"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

