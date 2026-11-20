import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MumbaiMap } from '../map/MumbaiMap';
import { StatusBadge, PriorityBadge } from '../common/StatusBadge';
import { MUMBAI_WARDS } from '../../data/mumbaiWards';
import {
  Search,
  Filter,
  X,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Maximize2,
  ShieldAlert,
  Send,
  User,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const AdminLiveMap: React.FC = () => {
  const {
    complaints,
    selectedComplaintId,
    setSelectedComplaintId,
    fieldWorkers,
    assignWorker,
    escalateComplaint,
    setLightboxImage,
    showToast,
  } = useApp();

  const [wardFilter, setWardFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Reassignment & Escalation Modal states
  const [escalateModalOpen, setEscalateModalOpen] = useState(false);
  const [escalateReason, setEscalateReason] = useState('');
  const [escalateRecipient, setEscalateRecipient] = useState('Chief Engineer (Civil Ops)');

  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [newWorkerId, setNewWorkerId] = useState(fieldWorkers[0]?.id || '');

  // Filter complaints
  const filteredComplaints = complaints.filter((c) => {
    if (wardFilter !== 'all' && !c.location.ward.toLowerCase().includes(wardFilter.toLowerCase())) return false;
    if (categoryFilter !== 'all' && c.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && c.priority !== priorityFilter) return false;
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

  const selectedComplaint = complaints.find((c) => c.id === selectedComplaintId) || filteredComplaints[0];

  const handleEscalateSubmit = () => {
    if (!escalateReason.trim() || !selectedComplaint) return;
    escalateComplaint(selectedComplaint.id, escalateReason, escalateRecipient);
    setEscalateModalOpen(false);
    setEscalateReason('');
  };

  const handleReassignSubmit = () => {
    if (!selectedComplaint || !newWorkerId) return;
    assignWorker(selectedComplaint.id, newWorkerId, selectedComplaint.priority, selectedComplaint.deadline, 'Administrative reallocation by Municipal Commissioner');
    setReassignModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Heading */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Citywide Live Complaints Map
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Greater Mumbai Directorate · Unified geographic operational command center (50+ active incidents)
        </p>
      </div>

      {/* Filter Row (Matches Phase 7 specification) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-subtle p-3.5 flex flex-wrap items-center gap-2.5">
        {/* Ward Filter */}
        <select
          value={wardFilter}
          onChange={(e) => setWardFilter(e.target.value)}
          className="text-xs p-2 rounded-xl border border-gray-200 text-gray-700 bg-gray-50 focus:outline-none"
        >
          <option value="all">All Wards (24 Wards)</option>
          {MUMBAI_WARDS.map((w) => (
            <option key={w.id} value={w.name}>
              {w.name}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-xs p-2 rounded-xl border border-gray-200 text-gray-700 bg-gray-50 focus:outline-none"
        >
          <option value="all">All Categories</option>
          <option value="pothole">Potholes</option>
          <option value="garbage">Garbage</option>
          <option value="drain">Drains</option>
          <option value="water_leakage">Water Leakage</option>
          <option value="streetlight">Streetlights</option>
          <option value="footpath">Footpaths</option>
          <option value="toilet">Toilets</option>
          <option value="bus_stop">Bus Stops</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs p-2 rounded-xl border border-gray-200 text-gray-700 bg-gray-50 focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="reported">Reported</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="paused">Paused</option>
          <option value="awaiting_verification">Awaiting Verification</option>
          <option value="verified">Verified</option>
          <option value="reopened">Reopened</option>
        </select>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="text-xs p-2 rounded-xl border border-gray-200 text-gray-700 bg-gray-50 focus:outline-none"
        >
          <option value="all">All Priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </select>

        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search incident, location or worker..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 bg-gray-50"
          />
        </div>

        <span className="text-xs font-semibold text-gray-500">
          {filteredComplaints.length} matches
        </span>
      </div>

      {/* Main Map + Right Side Complaint Detail Drawer (Matches Phase 7 layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Main Map (Dominant Visual Area - 8 cols) */}
        <div className="lg:col-span-8">
          <MumbaiMap
            complaints={filteredComplaints}
            selectedComplaintId={selectedComplaintId}
            onSelectComplaint={(id) => setSelectedComplaintId(id)}
            heightClass="h-[650px]"
          />
        </div>

        {/* Admin Complaint Detail Drawer (Right Side - 4 cols) */}
        {selectedComplaint && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4 max-h-[650px] overflow-y-auto">
            {/* Complaint Header */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  {selectedComplaint.id}
                </span>
                <h2 className="text-sm font-bold text-gray-900 mt-0.5">
                  {selectedComplaint.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedComplaintId(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status & Priority Row */}
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={selectedComplaint.status} progress={selectedComplaint.progress} />
              <PriorityBadge priority={selectedComplaint.priority} />
            </div>

            {/* Location & Ward Jurisdiction */}
            <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1 border border-gray-100">
              <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#176B4D]" />
                <span>{selectedComplaint.location.address}</span>
              </div>
              <div className="text-[11px] text-gray-500 pl-5">
                {selectedComplaint.location.landmark} · {selectedComplaint.location.ward}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-700 leading-relaxed bg-gray-50/50 p-3 rounded-xl border border-gray-100 italic">
              &ldquo;{selectedComplaint.description}&rdquo;
            </p>

            {/* Photographic Evidence (Before & After) with Lightbox */}
            <div className="grid grid-cols-2 gap-2">
              <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={selectedComplaint.photos.before}
                  alt="Before"
                  className="w-full h-28 object-cover cursor-pointer"
                  onClick={() => setLightboxImage(selectedComplaint.photos.before)}
                />
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-semibold text-white uppercase">
                  BEFORE
                </div>
              </div>

              {selectedComplaint.photos.after ? (
                <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-emerald-200">
                  <img
                    src={selectedComplaint.photos.after}
                    alt="After"
                    className="w-full h-28 object-cover cursor-pointer"
                    onClick={() => setLightboxImage(selectedComplaint.photos.after!)}
                  />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#16A34A] text-[9px] font-semibold text-white uppercase">
                    AFTER
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-2 text-center h-28 bg-gray-50">
                  <span className="text-[10px] text-gray-400">Awaiting After photo</span>
                </div>
              )}
            </div>

            {/* Operational Assignment */}
            <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1.5 border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Assigned Worker:</span>
                <span className="font-semibold text-gray-900">
                  {selectedComplaint.assignedWorker?.name || 'Unassigned'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ward Officer:</span>
                <span className="font-semibold text-gray-900">
                  {selectedComplaint.assignedOfficer?.name || 'Priya Sharma'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Expected Deadline:</span>
                <span className="font-semibold text-gray-900">
                  {new Date(selectedComplaint.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Escalation Actions (Working Administrative Interventions) */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                Administrative Actions
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setEscalateModalOpen(true)}
                  className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 flex items-center justify-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Escalate</span>
                </button>

                <button
                  onClick={() => setReassignModalOpen(true)}
                  className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Reassign</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Escalate Modal */}
      {escalateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-gray-900">Commissioner Direct Escalation</h3>
            <p className="text-xs text-gray-600">
              Issue an executive order regarding {selectedComplaint?.id}.
            </p>
            <input
              type="text"
              value={escalateRecipient}
              onChange={(e) => setEscalateRecipient(e.target.value)}
              placeholder="Designated Authority..."
              className="w-full text-xs p-2.5 rounded-xl border border-gray-300"
            />
            <textarea
              value={escalateReason}
              onChange={(e) => setEscalateReason(e.target.value)}
              placeholder="Official directive and reason for priority escalation..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-gray-300"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEscalateModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleEscalateSubmit}
                disabled={!escalateReason.trim()}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
              >
                Issue Escalation Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reassign Modal */}
      {reassignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-gray-900">Reassign Field Worker</h3>
            <p className="text-xs text-gray-600">
              Select replacement specialist for {selectedComplaint?.id}:
            </p>
            <select
              value={newWorkerId}
              onChange={(e) => setNewWorkerId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-300 text-xs bg-white font-semibold"
            >
              {fieldWorkers.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} · {w.specialty} ({w.activeTasksCount} tasks / 5)
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setReassignModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleReassignSubmit}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#176B4D] hover:bg-[#13593F] text-white"
              >
                Confirm Reassignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

