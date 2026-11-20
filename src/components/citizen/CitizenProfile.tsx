import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Phone,
  Mail,
  Building2,
  Award,
  CheckCircle2,
  Sparkles,
  Shield,
  Edit2,
  Lock,
} from 'lucide-react';

export const CitizenProfile: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('Aarav Kumar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('aarav.kumar@example.com');
  const [homeWard, setHomeWard] = useState('Ward 12 · Marlowe / Bandra');
  const [anonymousByDefault, setAnonymousByDefault] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    showToast('Profile preferences saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
            Resident profile
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            Your account, contribution summary and notification preferences
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs md:text-sm font-semibold text-gray-700 shadow-sm transition-all"
        >
          <Edit2 className="w-4 h-4 text-[#176B4D]" />
          <span>{isEditing ? 'Cancel editing' : 'Edit profile'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Card: Resident Points & Identity (Matches Resident profile.png) */}
        <div className="lg:col-span-4 bg-[#10221C] text-white rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#065F46] font-black text-2xl flex items-center justify-center shadow-lg border-2 border-[#A7F3D0]">
              AK
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{name}</h2>
              <p className="text-xs text-gray-300">{homeWard}</p>
            </div>
          </div>

          {/* Points Box */}
          <div className="bg-[#18362B] border border-[#1E3D32] rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                PARTICIPATION POINTS
              </span>
              <Sparkles className="w-4 h-4 text-[#4ADE80]" />
            </div>
            <div className="text-3xl font-black text-white mt-1">1,240</div>
            <p className="text-[11px] text-gray-400 mt-1 font-medium">
              Top 8% of civic participants in Ward 12 this month.
            </p>
          </div>

          {/* Complaints & Votes Counters */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-[#142C24] p-3 rounded-xl border border-[#1E3D32]">
              <div className="text-xl font-bold text-white">5</div>
              <div className="text-[11px] text-gray-400">Complaints</div>
            </div>
            <div className="bg-[#142C24] p-3 rounded-xl border border-[#1E3D32]">
              <div className="text-xl font-bold text-white">128</div>
              <div className="text-[11px] text-gray-400">Votes</div>
            </div>
          </div>

          {/* Verified Account Badge */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#142C24] border border-[#1E3D32] text-xs text-emerald-400 font-semibold">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Verified resident account</span>
          </div>
        </div>

        {/* Right Cards: Contact & Badges */}
        <div className="lg:col-span-8 space-y-6">
          {/* Contact Information Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-4">
            <h2 className="text-base font-bold text-gray-900">Contact information</h2>
            <p className="text-xs text-gray-500">Used only for complaint and status notifications.</p>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Full name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Home ward</label>
                    <input
                      type="text"
                      value={homeWard}
                      onChange={(e) => setHomeWard(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#176B4D] text-white text-xs font-bold hover:bg-[#13593F]"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Full name</span>
                    <span className="text-xs font-bold text-gray-900">{name}</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Phone</span>
                    <span className="text-xs font-bold text-gray-900">{phone}</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Email</span>
                    <span className="text-xs font-bold text-gray-900">{email}</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Home ward</span>
                    <span className="text-xs font-bold text-gray-900">{homeWard}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Participation Badges Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-4">
            <h2 className="text-base font-bold text-gray-900">Participation badges</h2>
            <p className="text-xs text-gray-500">Recognition for constructive, verified civic participation.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-1">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-gray-900">Street Scout</div>
                <div className="text-[11px] text-gray-500">5 verified reports</div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-1">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-gray-900">Community Voice</div>
                <div className="text-[11px] text-gray-500">100+ helpful votes</div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-1">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-gray-900">Fast Follow-up</div>
                <div className="text-[11px] text-gray-500">3 resolution checks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

