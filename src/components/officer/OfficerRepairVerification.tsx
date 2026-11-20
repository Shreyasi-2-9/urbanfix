import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Maximize2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import {
  getComplaintBeforePhoto,
  getComplaintAfterPhoto,
  getCategoryDefaultAfter,
} from '../../utils/complaintPhotoHelpers';

export const OfficerRepairVerification: React.FC = () => {
  const {
    complaints,
    reviewEvidence,
    setSelectedComplaintId,
    setActiveTab,
    setLightboxImage,
  } = useApp();

  const [reworkModalOpen, setReworkModalOpen] = useState(false);
  const [reworkNotes, setReworkNotes] = useState('');
  const [targetComplaintId, setTargetComplaintId] = useState<string>('UF-007');

  // Complaints in verification workflow
  const awaitingVerificationList = complaints.filter(
    (c) => c.status === 'awaiting_verification'
  );
  const disputedList = complaints.filter((c) => c.status === 'reopened');
  const verifiedList = complaints.filter((c) => c.status === 'verified').slice(0, 4);

  const selectedVerificationComplaint =
    awaitingVerificationList.find((c) => c.id === targetComplaintId) ||
    awaitingVerificationList[0] ||
    complaints.find((c) => c.id === 'UF-007') ||
    complaints[0];

  const handleApprove = (id: string) => {
    reviewEvidence(id, 'approve');
  };

  const handleOpenReworkModal = (id: string) => {
    setTargetComplaintId(id);
    setReworkModalOpen(true);
  };

  const handleConfirmRework = () => {
    if (!reworkNotes.trim()) return;
    reviewEvidence(targetComplaintId, 'rework', reworkNotes);
    setReworkModalOpen(false);
    setReworkNotes('');
  };

  return (
    <div className="space-y-5">
      {/* Top Heading */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Repair verification
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Review repair evidence. Only citizens verify a resolution.
        </p>
      </div>

      {/* Critical Banner (Matches Repair verification/Desktop.png) */}
      <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-3.5 text-xs text-[#065F46] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="font-semibold">
          1 awaiting citizen · 1 disputed / reopened · 4 Verified
        </div>
        <div className="text-[11px] text-gray-600">
          Evidence Submitted is not Verified. Officers review evidence and request follow-up; only citizens verify the resolution.
        </div>
      </div>

      {/* Main Verification Card & Guidelines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Complaint Evidence Review Card (7 cols) - Matches UF-007 in screenshot */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                {selectedVerificationComplaint.id} · {selectedVerificationComplaint.title}
              </h2>
              <div className="text-xs text-gray-500 mt-0.5">
                {selectedVerificationComplaint.location.address} · {selectedVerificationComplaint.assignedWorker?.name || 'Asha Nair'} · {selectedVerificationComplaint.category}
              </div>
            </div>
            <StatusBadge status={selectedVerificationComplaint.status} />
          </div>

          {/* Before and After Photographs Side-by-Side (Matches screenshot exact layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Before Photo */}
            <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={getComplaintBeforePhoto(selectedVerificationComplaint)}
                alt="Before repair"
                className="w-full h-44 object-cover cursor-pointer"
                onClick={() => setLightboxImage(getComplaintBeforePhoto(selectedVerificationComplaint))}
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] font-semibold text-white tracking-wider uppercase">
                BEFORE · Citizen
              </div>
              <button
                onClick={() => setLightboxImage(getComplaintBeforePhoto(selectedVerificationComplaint))}
                className="absolute bottom-2 right-2 p-1 rounded-lg bg-black/60 text-white"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* After Photo */}
            <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-emerald-200">
              <img
                src={
                  getComplaintAfterPhoto(selectedVerificationComplaint) ||
                  getCategoryDefaultAfter(selectedVerificationComplaint.category, selectedVerificationComplaint.title)
                }
                alt="After repair"
                className="w-full h-44 object-cover cursor-pointer"
                onClick={() =>
                  setLightboxImage(
                    getComplaintAfterPhoto(selectedVerificationComplaint) ||
                      getCategoryDefaultAfter(selectedVerificationComplaint.category, selectedVerificationComplaint.title)
                  )
                }
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#16A34A] text-[10px] font-semibold text-white tracking-wider uppercase shadow">
                AFTER · {selectedVerificationComplaint.assignedWorker?.name || 'Asha Nair'}
              </div>
              <button
                onClick={() =>
                  setLightboxImage(
                    getComplaintAfterPhoto(selectedVerificationComplaint) ||
                      getCategoryDefaultAfter(selectedVerificationComplaint.category, selectedVerificationComplaint.title)
                  )
                }
                className="absolute bottom-2 right-2 p-1 rounded-lg bg-black/60 text-white"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Worker Completion Description */}
          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs space-y-1">
            <span className="font-bold text-gray-800">
              Fixed / Evidence Submitted:
            </span>
            <p className="text-gray-600">
              &ldquo;{selectedVerificationComplaint.crewStatusNote || 'Approved cover fitted flush with footpath; area cleared and checked for safe access. 2 geotagged original files retained in Ward 12.'}&rdquo;
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => handleApprove(selectedVerificationComplaint.id)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#176B4D] hover:bg-[#13593F] active:bg-[#0E4631] text-white text-xs font-bold shadow flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Record evidence review</span>
            </button>

            <button
              onClick={() => handleOpenReworkModal(selectedVerificationComplaint.id)}
              className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-800 transition-colors"
            >
              <span>Request more evidence / rework</span>
            </button>
          </div>
        </div>

        {/* Right Column: Citizen Verification Rules & Status Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-3">
            <h2 className="text-base font-bold text-gray-900">
              Citizen verification · still pending
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              {selectedVerificationComplaint.id} · Citizen notified. 48-hour response window active. No confirmation received yet, so the complaint remains open and is not counted as Verified.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Officer evidence review does not change citizen verification status. No action to &ldquo;verify as citizen&rdquo; is available.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                Not a verified resolution
              </span>
            </div>
          </div>

          {/* Disputed / Reopened Follow-up Card (UF-008 in screenshot) */}
          {disputedList.length > 0 && (
            <div className="bg-white rounded-2xl border border-rose-200 shadow-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-rose-900">
                  {disputedList[0].id} · Disputed → Reopened
                </h3>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                  Reopened
                </span>
              </div>

              <p className="text-xs text-gray-700">
                {disputedList[0].disputeReason || 'Resident reported flickering continues. Previous evidence not accepted.'}
              </p>

              <button
                onClick={() => {
                  setSelectedComplaintId(disputedList[0].id);
                  setActiveTab('assignment');
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#176B4D] text-white text-xs font-bold hover:bg-[#13593F]"
              >
                Review follow-up assignment
              </button>
            </div>
          )}

          {/* Citizen-verified Example */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-2">
            <h3 className="text-sm font-bold text-gray-900">
              Citizen-verified example · UF-012
            </h3>
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
              Verified
            </span>
            <p className="text-xs text-gray-600 leading-relaxed">
              Kavya Menon verified on 19 Oct, 14:00 after Kavita&apos;s evidence at 08:00. 48h from report to citizen confirmation. Included in the 4 Verified resolutions; no officer impersonation.
            </p>
          </div>
        </div>
      </div>

      {/* Rework Modal */}
      {reworkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Request Rework from Field Worker
            </h3>
            <p className="text-xs text-gray-600">
              Specify what needs additional work or what photo evidence is lacking:
            </p>
            <textarea
              value={reworkNotes}
              onChange={(e) => setReworkNotes(e.target.value)}
              placeholder="e.g. Grating edge has 1cm gap; please grout with mortar and take photo from eye level..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#176B4D]/20 focus:border-[#176B4D]"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setReworkModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRework}
                disabled={!reworkNotes.trim()}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50"
              >
                Submit rework directive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

