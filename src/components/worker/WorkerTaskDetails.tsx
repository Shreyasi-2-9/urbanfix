import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  AlertTriangle,
  Play,
  Wrench,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Maximize2,
  Shield,
  FileText,
  X,
  ExternalLink,
  Camera,
} from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../common/StatusBadge';
import { MumbaiMap } from '../map/MumbaiMap';
import {
  getComplaintBeforePhoto,
  getComplaintAfterPhoto,
  formatCategoryLabel,
} from '../../utils/complaintPhotoHelpers';

export const WorkerTaskDetails: React.FC = () => {
  const {
    complaints,
    selectedComplaintId,
    setSelectedComplaintId,
    resumeTask,
    setActiveTab,
    setLightboxImage,
  } = useApp();

  const [fullMapModalOpen, setFullMapModalOpen] = useState<boolean>(false);

  // Active work order task
  const task =
    complaints.find((c) => c.id === selectedComplaintId) ||
    complaints.find((c) => c.id === 'UF-004') ||
    complaints[0];

  const handleResume = () => {
    resumeTask(task.id);
  };

  const handleGoToProgress = () => {
    setActiveTab('repair-progress');
  };

  const beforePhoto = getComplaintBeforePhoto(task);
  const afterPhoto = getComplaintAfterPhoto(task);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Navigation & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('tasks')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Tasks</span>
        </button>

        <div className="flex items-center gap-2">
          {task.status === 'paused' && (
            <button
              onClick={handleResume}
              className="px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#13593F] active:bg-[#0E4631] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Resume Work</span>
            </button>
          )}

          <button
            onClick={handleGoToProgress}
            className="px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#13593F] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{afterPhoto ? 'Manage Evidence & Completion' : 'Upload Evidence & Complete'}</span>
          </button>
        </div>
      </div>

      {/* Task Header Information */}
      <div className="space-y-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-bold text-[#176B4D] uppercase tracking-wider">
            {formatCategoryLabel(task.category, task.title)}
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {task.id}
          </span>
          <StatusBadge status={task.status} progress={task.progress} />
          <PriorityBadge priority={task.priority} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {task.title}
        </h1>
        <div className="text-xs text-gray-500 flex items-center gap-2 flex-wrap">
          <span>{task.location.address} · {task.location.ward}</span>
          <span>·</span>
          <span>
            Assigned Specialist: <strong className="text-gray-800">{task.assignedWorker?.name || 'Asha Nair'} ({task.assignedWorker?.specialty || 'Rapid Response'})</strong>
          </span>
        </div>
      </div>

      {/* Paused Alert Banner if paused */}
      {task.status === 'paused' && (
        <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-2xl p-4 sm:p-5 text-orange-950 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-sm text-orange-900">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <span>Work Temporarily Paused</span>
          </div>
          <p className="text-xs text-orange-800 pl-7 leading-relaxed">
            <strong>Reason for pause:</strong> {task.pauseReason || 'Awaiting utility clearance UT-441 from MGL gas pipe authority before mechanized desilting.'}
          </p>
          <div className="text-[11px] text-orange-700 pl-7">
            Paused at: {task.pausedAt ? new Date(task.pausedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '19 Oct, 16:00 IST'} · SLA timer monitored per municipal code.
          </div>
        </div>
      )}

      {/* 2-Column Split: Citizen Report Details Card (Left 7) + Location on Map & Timeline (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Citizen Report Details + Photographs */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Citizen Report Details
              </h2>
              <p className="text-xs text-gray-500">
                Logged by {task.citizen.name} · {new Date(task.reportedAt).toLocaleDateString()}
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#DDF1E9] text-[#176B50]">
              {formatCategoryLabel(task.category, task.title)}
            </span>
          </div>

          {/* Before & After Photo Frame */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Before Photograph */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 h-48 group">
              <img
                src={beforePhoto}
                alt="Citizen before report"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setLightboxImage(beforePhoto)}
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 text-[10px] font-bold text-white tracking-wider uppercase">
                BEFORE (Citizen)
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(beforePhoto)}
                className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black transition-colors"
                title="Enlarge photograph"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* After Photograph if available */}
            {afterPhoto ? (
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 border border-emerald-300 h-48 group">
                <img
                  src={afterPhoto}
                  alt="Worker after repair"
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setLightboxImage(afterPhoto)}
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#16A34A] text-[10px] font-bold text-white tracking-wider uppercase shadow-xs">
                  ✓ AFTER REPAIR
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxImage(afterPhoto)}
                  className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black transition-colors"
                  title="Enlarge photograph"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div
                onClick={handleGoToProgress}
                className="rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#176B4D] h-48 flex flex-col items-center justify-center text-center p-4 bg-gray-50/50 hover:bg-emerald-50/20 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-gray-200 flex items-center justify-center text-[#176B4D] mb-1.5">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-800">No After Photo Uploaded</span>
                <span className="text-[11px] text-[#176B4D] font-semibold mt-1 hover:underline">
                  Click to upload repair proof →
                </span>
              </div>
            )}
          </div>

          {/* Citizen Description */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-700 block">Citizen Description</span>
            <p className="text-xs text-gray-700 bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed">
              &ldquo;{task.description}&rdquo;
            </p>
          </div>

          {/* Ward Officer Assignment Instructions */}
          <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-4 space-y-2 text-xs">
            <div className="font-bold text-[#065F46] flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#10B981]" />
              <span>Ward Officer Assignment Instructions</span>
            </div>
            <div className="text-gray-800">
              <strong>Directive: </strong>
              {task.officialDirective || 'Barricade immediately, execute repairs matching BMC specifications, and upload verified after photographic proof.'}
            </div>
            <div className="text-gray-700">
              <strong>Safety Protocols: </strong>
              {task.safetyInstructions || 'Deploy safety cones and high-visibility markers. Follow municipal PPE requirements.'}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Map & Work Order Timeline */}
        <div className="lg:col-span-5 space-y-5">
          {/* Location on Map Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Location on City Map</h2>
                <span className="text-[10px] text-gray-500 font-medium">{task.location.ward} · {task.location.landmark}</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#16A05A] animate-pulse" />
            </div>

            {/* Interactive Live Mini Map */}
            <div className="h-44 rounded-xl overflow-hidden border border-gray-200 relative">
              <MumbaiMap
                complaints={[task]}
                selectedComplaintId={task.id}
                onSelectComplaint={() => setFullMapModalOpen(true)}
                showFilters={false}
                heightClass="h-44"
              />
            </div>

            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFullMapModalOpen(true)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#176B4D] hover:bg-[#13593F] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open Full City Map</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('map')}
                className="p-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
                title="Go to full city map view"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Work Order Timeline */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-3">
            <div className="pb-2 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Work Order Timeline</h2>
              <p className="text-[11px] text-gray-500">Preserved chronological operational milestones</p>
            </div>

            <div className="space-y-3 relative pl-4 border-l-2 border-gray-100 text-xs">
              {task.timeline.map((t) => (
                <div key={t.id} className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#176B4D] ring-2 ring-white" />
                  <div className="font-semibold text-gray-800">{t.title}</div>
                  <div className="text-[11px] text-gray-500">{t.description}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {t.actor} ({t.role})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FULL CITY MAP MODAL OVERLAY (Requirement 2) */}
      {fullMapModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-6xl h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-gray-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#DDF1E9] text-[#176B50] flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Citywide Complaint & Task Map
                  </h3>
                  <p className="text-xs text-gray-500">
                    Target Task: <strong className="text-gray-800">{task.id} · {task.title}</strong> ({task.location.address})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFullMapModalOpen(false);
                    setActiveTab('map');
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Switch to Map Tab</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFullMapModalOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Close Map"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Map Body */}
            <div className="flex-1 relative bg-gray-100 overflow-hidden">
              <MumbaiMap
                complaints={complaints}
                selectedComplaintId={task.id}
                onSelectComplaint={(id) => setSelectedComplaintId(id)}
                heightClass="h-full min-h-[500px]"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-600 flex-shrink-0">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#176B4D]" />
                Selected work order pin is centered and highlighted. Click any pin to inspect nearby civic issues.
              </span>
              <button
                type="button"
                onClick={() => setFullMapModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-[#176B4D] text-white font-semibold text-xs hover:bg-[#13593F] transition-colors"
              >
                Back to Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerTaskDetails;
