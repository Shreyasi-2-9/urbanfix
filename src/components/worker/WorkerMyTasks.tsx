import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge, PriorityBadge } from '../common/StatusBadge';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  ArrowRight,
  Maximize2,
  Layers,
} from 'lucide-react';
import {
  getComplaintBeforePhoto,
  formatCategoryLabel,
} from '../../utils/complaintPhotoHelpers';

export const WorkerMyTasks: React.FC = () => {
  const { complaints, setSelectedComplaintId, setActiveTab, setLightboxImage } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Tasks assigned to Asha Nair and Ward 12 Rapid Response Squad
  // Covers all 8 civic categories: Pothole, Garbage, Drainage, Water Leakage, Streetlight, Footpath, Manhole, Public Toilet
  const myTasks = complaints.filter(
    (c) =>
      c.assignedWorker?.name === 'Asha Nair' ||
      [
        'UF-001', // Manhole Repair
        'UF-002', // Garbage Collection
        'UF-003', // Pothole Repair
        'UF-004', // Drainage Cleaning
        'UF-005', // Footpath Repair
        'UF-006', // Streetlight Repair
        'UF-007', // Drainage Cleaning (Verified)
        'UF-012', // Water Leakage
        'UF-104', // Public Toilet Maintenance
        'UF-301', // Drainage Cleaning
      ].includes(c.id)
  );

  const filteredTasks = myTasks.filter((t) => {
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        t.id.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.location.address.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenTask = (id: string) => {
    setSelectedComplaintId(id);
    setActiveTab('task-details');
  };

  return (
    <div className="space-y-5">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
            My Tasks
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Operational work orders assigned to your field response squad · Ward 12
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks or categories..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#176B4D]/20 focus:border-[#176B4D]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3">
        {[
          { id: 'all', label: `All (${myTasks.length})` },
          { id: 'assigned', label: 'Assigned' },
          { id: 'in_progress', label: 'In Progress' },
          { id: 'paused', label: 'Paused' },
          { id: 'awaiting_verification', label: 'Awaiting Verification' },
          { id: 'verified', label: 'Completed' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === tab.id
                ? 'bg-[#176B4D] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTasks.map((t) => {
          const categoryPhoto = getComplaintBeforePhoto(t);
          const categoryLabel = formatCategoryLabel(t.category, t.title);

          return (
            <div
              key={t.id}
              onClick={() => handleOpenTask(t.id)}
              className="bg-white rounded-2xl border border-gray-200 shadow-subtle hover:shadow-card p-5 cursor-pointer transition-all hover:border-[#176B4D]/30 flex flex-col justify-between space-y-4 group"
            >
              {/* Header: ID + Priority */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 group-hover:text-[#176B4D] transition-colors">
                    {t.id}
                  </span>
                  <span className="text-[10px] font-semibold text-[#176B4D] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                    {categoryLabel}
                  </span>
                </div>
                <PriorityBadge priority={t.priority} />
              </div>

              {/* Photo preview — strictly category-mapped */}
              <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 h-40">
                <img
                  src={categoryPhoto}
                  alt={t.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/65 text-[10px] font-bold text-white uppercase tracking-wider">
                  BEFORE
                </div>
                {t.photos.after && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#16A34A] text-[10px] font-bold text-white uppercase tracking-wider shadow-xs">
                    ✓ HAS AFTER PHOTO
                  </div>
                )}
              </div>

              {/* Title & Location */}
              <div>
                <h2 className="text-sm font-bold text-gray-900 group-hover:text-[#176B4D] transition-colors leading-snug line-clamp-2">
                  {t.title}
                </h2>
                <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{t.location.address}</span>
                </div>
              </div>

              {/* Status & Deadline */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <StatusBadge status={t.status} progress={t.progress} />
                <div className="text-[11px] text-gray-500 font-medium">
                  Due: {new Date(t.deadline).toLocaleDateString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkerMyTasks;
