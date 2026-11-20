import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wrench,
  Camera,
  Play,
  Pause,
  CheckCircle2,
  AlertTriangle,
  Upload,
  ArrowRight,
  ArrowLeft,
  X,
  Trash2,
  RefreshCw,
  Plus,
  Maximize2,
  Shield,
  FileCheck,
} from 'lucide-react';
import { getComplaintBeforePhoto, getComplaintAfterPhoto, getCategoryDefaultAfter, formatCategoryLabel } from '../../utils/complaintPhotoHelpers';
import { validateImageFile, compressImageFile } from '../../utils/imageUploadHelper';

export const WorkerRepairProgress: React.FC = () => {
  const {
    complaints,
    selectedComplaintId,
    startWork,
    updateProgress,
    pauseTask,
    resumeTask,
    submitRepair,
    saveAfterPhotos,
    setActiveTab,
    setLightboxImage,
    showToast,
  } = useApp();

  const task =
    complaints.find((c) => c.id === selectedComplaintId) ||
    complaints.find((c) => c.id === 'UF-004') ||
    complaints[0];

  const [currentProgress, setCurrentProgress] = useState<number>(task.progress);
  const [workerNotes, setWorkerNotes] = useState<string>(task.crewStatusNote || '');
  const [pauseReasonInput, setPauseReasonInput] = useState<string>('');
  const [pauseModalOpen, setPauseModalOpen] = useState<boolean>(false);

  // After photo evidence state
  const [afterPhotoUrl, setAfterPhotoUrl] = useState<string>(task.photos.after || '');
  const [additionalPhotos, setAdditionalPhotos] = useState<string[]>(task.photos.additionalAfter || []);
  const [completionNotes, setCompletionNotes] = useState<string>(task.crewStatusNote || '');
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);

  // Sync state whenever task changes
  useEffect(() => {
    setCurrentProgress(task.progress);
    setWorkerNotes(task.crewStatusNote || '');
    setAfterPhotoUrl(task.photos.after || '');
    setAdditionalPhotos(task.photos.additionalAfter || []);
    setCompletionNotes(task.crewStatusNote || '');
  }, [task.id]);

  const progressSteps = [0, 20, 40, 60, 80, 100];

  const handleStartWork = () => {
    startWork(task.id);
    setCurrentProgress(20);
  };

  const handleSliderChange = (val: number) => {
    setCurrentProgress(val);
    updateProgress(task.id, val, workerNotes);
  };

  const handlePauseSubmit = () => {
    if (!pauseReasonInput.trim()) return;
    pauseTask(task.id, pauseReasonInput);
    setPauseModalOpen(false);
  };

  const handleResumeWork = () => {
    resumeTask(task.id);
  };

  // Primary After-Photo File Handler
  const handlePrimaryFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file.');
      showToast(validation.error || 'Invalid file.');
      return;
    }

    setIsProcessingFile(true);
    try {
      const compressedDataUrl = await compressImageFile(file);
      setAfterPhotoUrl(compressedDataUrl);
      // Auto-save into complaint state
      saveAfterPhotos(task.id, compressedDataUrl, additionalPhotos);
      showToast('After-repair photo loaded and saved.');
    } catch (err) {
      console.error('Image compression failed:', err);
      setUploadError('Failed to process image. Please try another file.');
      showToast('Failed to process image.');
    } finally {
      setIsProcessingFile(false);
      if (e.target) e.target.value = '';
    }
  };

  // Additional After-Photos Handler
  const handleAdditionalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessingFile(true);
    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validation = validateImageFile(file);
        if (validation.valid) {
          const compressed = await compressImageFile(file);
          newUrls.push(compressed);
        }
      }

      if (newUrls.length > 0) {
        const updated = [...additionalPhotos, ...newUrls];
        setAdditionalPhotos(updated);
        saveAfterPhotos(task.id, afterPhotoUrl, updated);
        showToast(`Added ${newUrls.length} supporting evidence photo(s).`);
      }
    } catch (err) {
      console.error('Additional photos upload error:', err);
      showToast('Failed to process some photos.');
    } finally {
      setIsProcessingFile(false);
      if (e.target) e.target.value = '';
    }
  };

  // Remove primary after photo
  const handleRemovePrimaryPhoto = () => {
    setAfterPhotoUrl('');
    saveAfterPhotos(task.id, '', additionalPhotos);
    showToast('After photo removed.');
  };

  // Remove an additional photo
  const handleRemoveAdditionalPhoto = (index: number) => {
    const updated = additionalPhotos.filter((_, i) => i !== index);
    setAdditionalPhotos(updated);
    saveAfterPhotos(task.id, afterPhotoUrl, updated);
    showToast('Supporting photo removed.');
  };

  // Final Repair Submission
  const handleSubmitFinalRepair = (e: React.FormEvent) => {
    e.preventDefault();

    // Verification requirement: after photo is MANDATORY
    if (!afterPhotoUrl.trim()) {
      setUploadError('Photographic proof required: Please upload at least one After Photo demonstrating the completed repair before submitting for verification.');
      showToast('After photo is mandatory before submitting for review.');
      return;
    }

    submitRepair(
      task.id,
      afterPhotoUrl,
      completionNotes || `Completed repair work for ${task.title} as per standard BMC municipal specifications.`,
      additionalPhotos
    );
    showToast(`Work order ${task.id} submitted for Ward Officer verification!`);
    setActiveTab('tasks');
  };

  const beforePhoto = getComplaintBeforePhoto(task);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Heading & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#176B4D] uppercase tracking-wider">
              {formatCategoryLabel(task.category, task.title)}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-xs font-bold text-gray-400 uppercase">{task.id}</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827] mt-0.5">
            Repair Progress & Evidence
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {task.title} · {task.location.address}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('task-details')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-xl border border-gray-300 hover:bg-gray-50 self-start sm:self-center transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Task Details</span>
        </button>
      </div>

      {/* Progress Adjustment Box (0%, 20%, 40%, 60%, 80%, 100%) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Adjust Execution Progress</h2>
            <p className="text-xs text-gray-500">Live operational status visible to Ward Officers and Citizens.</p>
          </div>
          <span className="text-lg font-black text-[#176B4D]">{currentProgress}%</span>
        </div>

        {/* Step Buttons (0%, 20%, 40%, 60%, 80%, 100%) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {progressSteps.map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => handleSliderChange(step)}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentProgress === step
                  ? 'bg-[#176B4D] text-white shadow-sm'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {step}%
            </button>
          ))}
        </div>

        {/* Notes input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700 block">
            Field Progress Notes
          </label>
          <input
            type="text"
            value={workerNotes}
            onChange={(e) => setWorkerNotes(e.target.value)}
            onBlur={() => updateProgress(task.id, currentProgress, workerNotes)}
            placeholder="e.g. Cleared debris, preparing asphalt cold mix patch..."
            className="w-full p-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#176B4D]/20 focus:border-[#176B4D]"
          />
        </div>

        {/* Start / Pause / Resume Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {task.status === 'assigned' && (
            <button
              onClick={handleStartWork}
              className="px-4 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#13593F] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start On-site Work</span>
            </button>
          )}

          {task.status === 'in_progress' && (
            <button
              onClick={() => setPauseModalOpen(true)}
              className="px-4 py-2.5 rounded-xl border border-orange-300 hover:bg-orange-50 text-orange-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Work (Requires Reason)</span>
            </button>
          )}

          {task.status === 'paused' && (
            <button
              onClick={handleResumeWork}
              className="px-4 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#13593F] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Resume Active Work</span>
            </button>
          )}
        </div>
      </div>

      {/* Completion & Before/After Evidence Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#176B4D]" />
            <h2 className="text-base font-bold text-gray-900">
              Submit Completed Repair for Verification
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            UrbanFix requires verified photographic evidence. Upload your After Photo before marking the repair complete.
          </p>
        </div>

        {/* Before / After Evidence Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* A. Citizen Before Photograph (Immutable) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-700">
                Original Citizen Report
              </label>
              <span className="text-[10px] font-bold text-gray-500 uppercase px-2 py-0.5 rounded bg-gray-100">
                Before Photo
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 h-52 group">
              <img
                src={beforePhoto}
                alt="Citizen before report"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 text-[10px] font-bold text-white uppercase tracking-wider">
                BEFORE (Citizen Report)
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(beforePhoto)}
                className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 text-white hover:bg-black transition-colors"
                title="Enlarge photograph"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-gray-500">
              Preserved original complaint photograph logged by {task.citizen.name}.
            </p>
          </div>

          {/* B. Field Worker After Photograph Upload & Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-700">
                Completed Repair Evidence <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] font-bold text-emerald-800 uppercase px-2 py-0.5 rounded bg-[#ECFDF5] border border-[#A7F3D0]">
                After Photo
              </span>
            </div>

            {afterPhotoUrl ? (
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 border-2 border-emerald-500/40 h-52 group shadow-xs">
                <img
                  src={afterPhotoUrl}
                  alt="After repair proof"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#16A34A] text-[10px] font-bold text-white uppercase tracking-wider shadow-xs">
                  ✓ AFTER REPAIR PROOF
                </div>

                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs transition-colors"
                    title="Replace photograph"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRemovePrimaryPhoto}
                    className="p-1.5 rounded-lg bg-red-600/90 hover:bg-red-700 text-white text-xs transition-colors"
                    title="Remove photograph"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxImage(afterPhotoUrl)}
                  className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 text-white hover:bg-black transition-colors"
                  title="Enlarge photograph"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#176B4D] h-52 flex flex-col items-center justify-center text-center p-4 bg-gray-50/60 hover:bg-emerald-50/20 cursor-pointer transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-gray-200 flex items-center justify-center text-[#176B4D] mb-2">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gray-900">
                  {isProcessingFile ? 'Processing Image...' : 'Click to Upload After Photo'}
                </span>
                <span className="text-[11px] text-gray-500 mt-1 max-w-[220px]">
                  Select JPG, PNG, or WebP photograph showing the resolved site.
                </span>
              </div>
            )}

            {/* Hidden Input for Primary After Photo */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handlePrimaryFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Supporting Additional Photos Gallery (Optional) */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700">
              Supporting Work Photos (Optional)
            </span>
            <button
              type="button"
              onClick={() => additionalFileInputRef.current?.click()}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#176B4D] hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add more photos</span>
            </button>
          </div>

          <input
            ref={additionalFileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            multiple
            onChange={handleAdditionalFileUpload}
            className="hidden"
          />

          {additionalPhotos.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {additionalPhotos.map((photo, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 h-20 group">
                  <img src={photo} alt={`Evidence #${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveAdditionalPhoto(index)}
                    className="absolute top-1 right-1 p-1 rounded-md bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxImage(photo)}
                    className="absolute bottom-1 right-1 p-1 rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-gray-400">
              No additional supporting photos attached. You may attach supplementary angles if needed.
            </p>
          )}
        </div>

        {/* Error notice if upload or validation failed */}
        {uploadError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Completion Notes & Final Submit Form */}
        <form onSubmit={handleSubmitFinalRepair} className="space-y-4 pt-3 border-t border-gray-100">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 block">
              Repair Description & Completion Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              value={completionNotes}
              onChange={(e) => setCompletionNotes(e.target.value)}
              placeholder="e.g. Cleared clogged silt from chamber. Heavy-duty ductile iron cover fitted flush. Area sanitized and barricades cleared."
              rows={3}
              required
              className="w-full p-3 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#176B4D]/20 focus:border-[#176B4D]"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Direct Save Draft Button */}
            <button
              type="button"
              onClick={() => {
                saveAfterPhotos(task.id, afterPhotoUrl, additionalPhotos);
                updateProgress(task.id, currentProgress, completionNotes);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-800 transition-colors"
            >
              Save Evidence Draft
            </button>

            {/* Submit for Verification Button */}
            <button
              type="submit"
              disabled={isProcessingFile}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#176B4D] hover:bg-[#13593F] active:bg-[#0E4631] text-white text-xs md:text-sm font-bold shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Repair for Ward Officer Review</span>
            </button>
          </div>
        </form>
      </div>

      {/* Pause Modal */}
      {pauseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Pause Work Order</span>
            </div>
            <p className="text-xs text-gray-600">
              Pausing requires an official justification reason that will be logged in the municipal audit trail and notified to the Ward Officer.
            </p>
            <textarea
              value={pauseReasonInput}
              onChange={(e) => setPauseReasonInput(e.target.value)}
              placeholder="e.g. Awaiting utility clearance UT-441 from MGL gas distributor before mechanized desilting..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#176B4D]/20 focus:border-[#176B4D]"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPauseModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handlePauseSubmit}
                disabled={!pauseReasonInput.trim()}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50"
              >
                Confirm Pause
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerRepairProgress;
