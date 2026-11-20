import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ComplaintCategory } from '../../types';
import {
  Camera,
  MapPin,
  Send,
  CheckCircle2,
  UploadCloud,
  X,
  ArrowRight,
  ShieldAlert,
  Edit2,
} from 'lucide-react';

export const CitizenReportProblem: React.FC = () => {
  const { submitComplaint, setActiveTab, setSelectedComplaintId } = useApp();

  const [category, setCategory] = useState<ComplaintCategory>('pothole');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('Lakeview Road, opposite Community Hall');
  const [landmark, setLandmark] = useState('Opposite Community Hall');
  const [ward, setWard] = useState('Ward 12 · Lakeview / Bandra');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('/photos/pothole_lakeview.jpg');
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [editingLocation, setEditingLocation] = useState(false);

  const categories: { id: ComplaintCategory; label: string; samplePhoto: string }[] = [
    { id: 'pothole', label: 'Pothole', samplePhoto: '/photos/pothole_lakeview.jpg' },
    { id: 'garbage', label: 'Garbage', samplePhoto: '/photos/garbage_bins.jpg' },
    { id: 'drain', label: 'Drain', samplePhoto: '/photos/drain_before.jpg' },
    { id: 'water_leakage', label: 'Water leakage', samplePhoto: '/photos/water_leak_before.jpg' },
    { id: 'streetlight', label: 'Streetlight', samplePhoto: '/photos/streetlight.jpg' },
    { id: 'footpath', label: 'Footpath', samplePhoto: '/photos/broken_paving.jpg' },
    { id: 'toilet', label: 'Toilet', samplePhoto: '/photos/drain_before.jpg' },
    { id: 'bus_stop', label: 'Bus stop', samplePhoto: '/photos/bus_stop_shelter.jpg' },
  ];

  const handleCategorySelect = (catId: ComplaintCategory) => {
    setCategory(catId);
    const found = categories.find((c) => c.id === catId);
    if (found) {
      setPhotoUrl(found.samplePhoto);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotoUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please provide a short description of the problem.');
      return;
    }

    const defaultTitle =
      title.trim() ||
      `${category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')} hazard on ${address}`;

    const newId = submitComplaint({
      title: defaultTitle,
      description,
      category,
      photoUrl,
      isAnonymous,
      location: {
        address,
        landmark,
        ward,
        lat: 19.0570,
        lng: 72.8260,
      },
    });

    setSubmittedId(newId);
  };

  const handleViewComplaints = () => {
    if (submittedId) {
      setSelectedComplaintId(submittedId);
    }
    setActiveTab('my-complaints');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Heading */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Report a new problem
        </h1>
        <p className="text-xs md:text-sm text-gray-500 mt-0.5">
          Give the city enough detail to route this correctly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form: Problem details */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-gray-900">Problem details</h2>
            <p className="text-xs text-gray-500">
              Required fields are marked automatically during submission.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Category selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 block">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleCategorySelect(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      category === c.id
                        ? 'bg-[#176B4D] text-white shadow-sm font-semibold'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo evidence upload */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 block">
                Photo evidence
              </label>

              <div className="relative border-2 border-dashed border-gray-200 hover:border-[#176B4D]/50 rounded-2xl p-4 bg-gray-50/50 flex flex-col items-center justify-center text-center transition-colors">
                {photoUrl ? (
                  <div className="relative w-full max-w-sm rounded-xl overflow-hidden group">
                    <img
                      src={photoUrl}
                      alt="Uploaded preview"
                      className="w-full h-44 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                      <label className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold cursor-pointer hover:bg-gray-100">
                        Replace
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2 py-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#176B4D] flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-gray-800">
                      Add or take a photo
                    </span>
                    <span className="text-[11px] text-gray-400">
                      JPG or PNG · up to 10 MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Auto-detected Location */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-700">
                  Location
                </label>
                <button
                  type="button"
                  onClick={() => setEditingLocation(!editingLocation)}
                  className="text-xs text-[#176B4D] font-semibold hover:underline flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  {editingLocation ? 'Done' : 'Edit'}
                </button>
              </div>

              {editingLocation ? (
                <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street address..."
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                  />
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Landmark..."
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                  />
                </div>
              ) : (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#176B4D]" />
                    <span className="font-semibold text-gray-800">{address}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">Auto-detected</span>
                </div>
              )}
            </div>

            {/* Issue Title (Optional) */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 block">
                Issue title (optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`e.g. Deep ${category} in left lane`}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#176B4D]/20 focus:border-[#176B4D]"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-700">
                  Short description
                </label>
                <span className="text-[11px] text-gray-400">
                  {description.length} / 250 characters
                </span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what is broken, hazardous, or obstructing the street..."
                rows={3}
                maxLength={250}
                required
                className="w-full p-3 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#176B4D]/20 focus:border-[#176B4D]"
              />
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs">
              <div>
                <span className="font-semibold text-gray-800">Report anonymously</span>
                <p className="text-[11px] text-gray-500">
                  Hide your name from public issue cards.
                </p>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-[#176B4D] rounded accent-[#176B4D]"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#176B4D] hover:bg-[#13593F] active:bg-[#0E4631] text-white text-xs md:text-sm font-bold shadow flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit problem</span>
            </button>
          </form>
        </div>

        {/* Right Card: Confirmation Display (Matches Report new problem.png) */}
        <div className="lg:col-span-5 bg-[#10221C] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          {submittedId ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-7 h-7 text-[#10221C]" />
              </div>

              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#4ADE80]">
                  SUBMITTED CONFIRMATION
                </span>
                <h2 className="text-2xl font-bold mt-1 text-white leading-tight">
                  Your problem has been registered.
                </h2>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  We will notify you when it is assigned and whenever the status changes.
                </p>
              </div>

              {/* Unique ID Box */}
              <div className="bg-[#18362B] border border-[#1E3D32] rounded-2xl p-4">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  COMPLAINT ID
                </span>
                <div className="text-3xl font-black text-white mt-1">
                  {submittedId}
                </div>
              </div>

              {/* Submitted Details Summary */}
              <div className="space-y-2 text-xs border-t border-[#1E3D32] pt-4 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="font-semibold text-white capitalize">{category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="font-semibold text-white truncate max-w-[200px]">{address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="font-semibold text-white">Reported</span>
                </div>
              </div>

              <button
                onClick={handleViewComplaints}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-[#10221C] text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <span>View my complaints</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#4ADE80]">
                <ShieldAlert className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Civic Accountability Guarantee
                </h3>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  Every complaint logged on UrbanFix is public and assigned an auditable municipal SLA target.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-gray-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#18362B] text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    1
                  </span>
                  <span>Complaint receives immediate unique ID tracked in BMC database.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#18362B] text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    2
                  </span>
                  <span>Assigned to certified ward field worker with fixed resolution deadline.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#18362B] text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    3
                  </span>
                  <span>Dual photographic verification: Worker uploads after-photo; citizen verifies fix.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

