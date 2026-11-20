import React from 'react';
import { useApp } from '../../context/AppContext';
import { MumbaiMap } from '../map/MumbaiMap';
import { StatusBadge, PriorityBadge } from '../common/StatusBadge';
import {
  ArrowLeft,
  MapPin,
  FileText,
  Wrench,
  X,
  Maximize2,
  Shield,
  Layers,
} from 'lucide-react';
import { getComplaintBeforePhoto, getComplaintAfterPhoto, formatCategoryLabel } from '../../utils/complaintPhotoHelpers';

export const WorkerLiveMap: React.FC = () => {
  const {
    complaints,
    selectedComplaintId,
    setSelectedComplaintId,
    setActiveTab,
    setLightboxImage,
  } = useApp();

  const selectedComplaint = complaints.find((c) => c.id === selectedComplaintId);

  const handleOpenTask = (id: string) => {
    setSelectedComplaintId(id);
    setActiveTab('task-details');
  };

  const handleOpenProgress = (id: string) => {
    setSelectedComplaintId(id);
    setActiveTab('repair-progress');
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A05A] animate-pulse" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
              Field Operations City Map
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Full citywide view with categorized complaint markers, active field work orders, and real-time locations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedComplaintId && (
            <button
              onClick={() => setActiveTab('task-details')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-800 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#176B4D]" />
              <span>Back to Task Details</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('tasks')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#176B4D] hover:bg-[#13593F] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>My Tasks List</span>
          </button>
        </div>
      </div>

      {/* Main Map + Selected Task Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Full Interactive Leaflet Map */}
        <div className={`transition-all duration-200 ${selectedComplaint ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          <MumbaiMap
            complaints={complaints}
            selectedComplaintId={selectedComplaintId}
            onSelectComplaint={(id) => setSelectedComplaintId(id)}
            heightClass="h-[calc(100vh-220px)] min-h-[580px]"
          />
        </div>

        {/* Selected Complaint / Work Order Sidebar Drawer */}
        {selectedComplaint && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4 animate-in fade-in slide-in-from-right-4 duration-200 max-h-[calc(100vh-220px)] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {selectedComplaint.id}
                </span>
                <PriorityBadge priority={selectedComplaint.priority} />
              </div>
              <button
                onClick={() => setSelectedComplaintId(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                title="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Status */}
            <div>
              <div className="text-[11px] font-semibold text-[#176B4D] uppercase tracking-wider">
                {formatCategoryLabel(selectedComplaint.category, selectedComplaint.title)}
              </div>
              <h2 className="text-base font-bold text-gray-900 leading-snug mt-0.5">
                {selectedComplaint.title}
              </h2>
              <div className="mt-2 flex items-center justify-between">
                <StatusBadge status={selectedComplaint.status} progress={selectedComplaint.progress} />
                <span className="text-[11px] text-gray-500 font-medium">
                  Due: {new Date(selectedComplaint.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-gray-700 space-y-1">
              <div className="flex items-start gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{selectedComplaint.location.address}</span>
              </div>
              <div className="text-[11px] text-gray-500 pl-5.5">
                Landmark: {selectedComplaint.location.landmark} · {selectedComplaint.location.ward}
              </div>
            </div>

            {/* Evidence Photograph Preview */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-gray-700 block">
                Visual Evidence
              </span>

              <div className="grid grid-cols-2 gap-2">
                {/* Before Photo */}
                <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 h-28">
                  <img
                    src={getComplaintBeforePhoto(selectedComplaint)}
                    alt="Citizen before report"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setLightboxImage(getComplaintBeforePhoto(selectedComplaint))}
                  />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-bold text-white uppercase">
                    BEFORE
                  </div>
                  <button
                    onClick={() => setLightboxImage(getComplaintBeforePhoto(selectedComplaint))}
                    className="absolute bottom-1.5 right-1.5 p-1 rounded bg-black/60 text-white"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>

                {/* After Photo if available */}
                {getComplaintAfterPhoto(selectedComplaint) ? (
                  <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-emerald-200 h-28">
                    <img
                      src={getComplaintAfterPhoto(selectedComplaint)!}
                      alt="Completed repair evidence"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setLightboxImage(getComplaintAfterPhoto(selectedComplaint)!)}
                    />
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#16A34A] text-[9px] font-bold text-white uppercase">
                      AFTER
                    </div>
                    <button
                      onClick={() => setLightboxImage(getComplaintAfterPhoto(selectedComplaint)!)}
                      className="absolute bottom-1.5 right-1.5 p-1 rounded bg-black/60 text-white"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-200 h-28 flex flex-col items-center justify-center text-center p-2 bg-gray-50/50">
                    <Wrench className="w-4 h-4 text-gray-400 mb-1" />
                    <span className="text-[11px] font-medium text-gray-500">In Progress</span>
                    <span className="text-[9px] text-gray-400">No after photo yet</span>
                  </div>
                )}
              </div>
            </div>

            {/* Official Directive / Safety */}
            {selectedComplaint.officialDirective && (
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-3 text-xs text-gray-800 space-y-1">
                <div className="font-bold text-[#065F46] flex items-center gap-1.5 text-[11px]">
                  <Shield className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Ward Directive</span>
                </div>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  {selectedComplaint.officialDirective}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => handleOpenTask(selectedComplaint.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#176B4D] hover:bg-[#13593F] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Task Details</span>
              </button>

              <button
                onClick={() => handleOpenProgress(selectedComplaint.id)}
                className="w-full py-2 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Wrench className="w-3.5 h-3.5 text-[#176B4D]" />
                <span>Update Repair Progress & Evidence</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerLiveMap;

