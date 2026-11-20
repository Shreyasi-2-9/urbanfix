import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MumbaiMap } from '../map/MumbaiMap';
import { StatusBadge } from '../common/StatusBadge';
import {
  X,
  MapPin,
  ThumbsUp,
  Clock,
  Plus,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Maximize2,
  Calendar,
  User,
} from 'lucide-react';

export const CitizenLiveMap: React.FC = () => {
  const {
    complaints,
    selectedComplaintId,
    setSelectedComplaintId,
    voteComplaint,
    citizenVerify,
    setActiveTab,
    setLightboxImage,
  } = useApp();

  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [disputeText, setDisputeText] = useState('');

  const selectedComplaint = complaints.find((c) => c.id === selectedComplaintId);

  const handleVote = () => {
    if (selectedComplaintId) {
      voteComplaint(selectedComplaintId);
    }
  };

  const handleConfirmFixed = () => {
    if (selectedComplaintId) {
      citizenVerify(selectedComplaintId, 'confirm');
    }
  };

  const handleDisputeSubmit = () => {
    if (!disputeText.trim() || !selectedComplaintId) return;
    citizenVerify(selectedComplaintId, 'dispute', disputeText);
    setDisputeModalOpen(false);
    setDisputeText('');
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
            Live ward map
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            {selectedComplaint
              ? `Selected complaint · ${selectedComplaint.id}`
              : 'Nearby registered problems · updated live from Mumbai BMC feed'}
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

      {/* Main Map + Right Drawer Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Map Column */}
        <div className={`transition-all duration-200 ${selectedComplaint ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          <MumbaiMap
            complaints={complaints}
            selectedComplaintId={selectedComplaintId}
            onSelectComplaint={(id) => setSelectedComplaintId(id)}
            heightClass="h-[620px]"
          />
        </div>

        {/* Complaint Detail Drawer (Right side) */}
        {selectedComplaint && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4 animate-in fade-in slide-in-from-right-4 duration-200 max-h-[620px] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                COMPLAINT {selectedComplaint.id}
              </span>
              <button
                onClick={() => setSelectedComplaintId(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                title="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Photo Evidence with Lightbox */}
            <div className="relative group rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={selectedComplaint.photos.before}
                alt={selectedComplaint.title}
                className="w-full h-48 object-cover cursor-pointer transition-transform duration-200 group-hover:scale-102"
                onClick={() => setLightboxImage(selectedComplaint.photos.before)}
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-semibold text-white uppercase tracking-wider">
                {selectedComplaint.photos.after ? 'BEFORE' : 'PHOTO EVIDENCE'}
              </div>
              <button
                onClick={() => setLightboxImage(selectedComplaint.photos.before)}
                className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                title="Enlarge photo"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* After Photo if available */}
            {selectedComplaint.photos.after && (
              <div className="relative group rounded-xl overflow-hidden bg-gray-100 border border-emerald-200">
                <img
                  src={selectedComplaint.photos.after}
                  alt="Repair completed evidence"
                  className="w-full h-44 object-cover cursor-pointer"
                  onClick={() => setLightboxImage(selectedComplaint.photos.after!)}
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#16A34A] text-[10px] font-semibold text-white uppercase tracking-wider shadow">
                  AFTER REPAIR
                </div>
                <button
                  onClick={() => setLightboxImage(selectedComplaint.photos.after!)}
                  className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                  title="Enlarge after photo"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Status & Category */}
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={selectedComplaint.status} progress={selectedComplaint.progress} />
              <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-0.5 rounded-full">
                {selectedComplaint.category.replace('_', ' ')}
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-snug">
                {selectedComplaint.title}
              </h2>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                {selectedComplaint.description}
              </p>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <MapPin className="w-4 h-4 text-[#176B4D] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">{selectedComplaint.location.address}</div>
                <div className="text-[11px] text-gray-500">{selectedComplaint.location.landmark}, {selectedComplaint.location.ward}</div>
              </div>
            </div>

            {/* Road Crew Progress Bar (when in progress) */}
            {selectedComplaint.status === 'in_progress' && (
              <div className="bg-[#FEF9C3]/50 border border-[#FDE047] rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-900">
                  <span>Road crew progress</span>
                  <span>{selectedComplaint.progress}%</span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#D97706] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${selectedComplaint.progress}%` }}
                  />
                </div>
                <p className="text-[11px] text-amber-800">
                  {selectedComplaint.crewStatusNote || 'Active repair underway by municipal specialist crew.'}
                </p>
              </div>
            )}

            {/* Paused alert if paused */}
            {selectedComplaint.status === 'paused' && (
              <div className="bg-[#FFEDD5] border border-[#FDBA74] rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-orange-900">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span>Work Temporarily Paused</span>
                </div>
                <p className="text-xs text-orange-800">
                  {selectedComplaint.pauseReason || 'Pending utility clearance or materials delivery.'}
                </p>
                <div className="text-[10px] text-orange-700">
                  Original SLA remains preserved. Ward Officer monitoring pause constraint.
                </div>
              </div>
            )}

            {/* Citizen Verification Section (when awaiting verification) */}
            {selectedComplaint.status === 'awaiting_verification' && (
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-3.5 space-y-3">
                <div className="text-xs font-bold text-[#065F46] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Repair ready for your review</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Please inspect the before & after photographs above. Confirm only if the hazard is completely safe and repaired.
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={handleConfirmFixed}
                    className="w-full py-2 px-3 rounded-xl bg-[#176B4D] hover:bg-[#13593F] active:bg-[#0E4631] text-white text-xs font-bold shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm fixed
                  </button>
                  <button
                    onClick={() => setDisputeModalOpen(true)}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Not fixed — reopen complaint
                  </button>
                </div>
              </div>
            )}

            {/* Verified Confirmation */}
            {selectedComplaint.status === 'verified' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-bold">Citizen Verified Resolution</div>
                  <div className="text-[11px] text-emerald-700">
                    Verified by {selectedComplaint.verifiedBy || 'Citizen'} on{' '}
                    {new Date(selectedComplaint.verifiedAt || selectedComplaint.reportedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}

            {/* Votes Row & "Me too" Action */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-gray-900 leading-none">
                  {selectedComplaint.votes}
                </div>
                <div className="text-[11px] text-gray-400 font-medium">resident votes</div>
              </div>

              <button
                onClick={handleVote}
                disabled={selectedComplaint.hasVoted}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedComplaint.hasVoted
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                    : 'bg-[#176B4D] hover:bg-[#13593F] active:bg-[#0E4631] text-white shadow-sm'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{selectedComplaint.hasVoted ? 'Supported' : 'Me too'}</span>
              </button>
            </div>

            {/* Public Timeline Preview */}
            <div className="pt-3 border-t border-gray-100">
              <div className="text-xs font-bold text-gray-700 mb-2">Public Timeline</div>
              <div className="space-y-2 relative pl-4 border-l-2 border-gray-100">
                {selectedComplaint.timeline.slice(-3).map((t) => (
                  <div key={t.id} className="relative text-xs">
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
        )}
      </div>

      {/* Dispute Modal */}
      {disputeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Reopen this complaint?
            </h3>
            <p className="text-xs text-gray-600">
              Only dispute if the reported problem remains unaddressed at the location. Please describe what is still wrong:
            </p>
            <textarea
              value={disputeText}
              onChange={(e) => setDisputeText(e.target.value)}
              placeholder="e.g. Water is still leaking at the side pipe connection beside the gate..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#176B4D]/20 focus:border-[#176B4D]"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDisputeModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100"
              >
                Keep awaiting verification
              </button>
              <button
                onClick={handleDisputeSubmit}
                disabled={!disputeText.trim()}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
              >
                Not fixed — reopen complaint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

