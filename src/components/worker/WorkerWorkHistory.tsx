import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { History, CheckCircle2, RotateCcw, MapPin, Maximize2 } from 'lucide-react';
import { getComplaintAfterPhoto, formatCategoryLabel } from '../../utils/complaintPhotoHelpers';

export const WorkerWorkHistory: React.FC = () => {
  const { complaints, setSelectedComplaintId, setActiveTab, setLightboxImage } = useApp();

  const completedOrReworkTasks = complaints.filter(
    (c) =>
      (c.assignedWorker?.name === 'Asha Nair' || c.id === 'UF-007' || c.id === 'UF-004' || c.id === 'UF-012' || c.id === 'UF-204') &&
      (c.status === 'verified' || c.status === 'awaiting_verification' || c.reworkNotes || c.status === 'reopened')
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Work History & Audit Records
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Asha Nair · Historical repair completions, citizen confirmations, and rework audit trail
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-xs font-bold text-gray-800">Completed & Review Records</span>
          <span className="text-xs font-semibold text-emerald-700">48 Lifetime Resolutions</span>
        </div>

        <div className="divide-y divide-gray-100">
          {completedOrReworkTasks.map((t) => (
            <div key={t.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                {t.photos.after && (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                    <img
                      src={t.photos.after}
                      alt="Completed work"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setLightboxImage(t.photos.after!)}
                    />
                    <button
                      onClick={() => setLightboxImage(t.photos.after!)}
                      className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center text-white"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">{t.id} · {t.title}</span>
                    <StatusBadge status={t.status} progress={t.progress} />
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{t.location.address}</span>
                  </div>
                  <p className="text-xs text-gray-600 italic">
                    &ldquo;{t.crewStatusNote || 'Repair completed according to municipal specification.'}&rdquo;
                  </p>
                  {t.reworkNotes && (
                    <div className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                      Rework directive: {t.reworkNotes}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-semibold text-gray-800">
                  {new Date(t.reportedAt).toLocaleDateString()}
                </div>
                <button
                  onClick={() => {
                    setSelectedComplaintId(t.id);
                    setActiveTab('task-details');
                  }}
                  className="mt-1 text-xs text-[#176B4D] font-bold hover:underline"
                >
                  View full work order →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

