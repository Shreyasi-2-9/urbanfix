import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, Shield, Award, Clock, Star, ToggleLeft, ToggleRight } from 'lucide-react';

export const WorkerProfile: React.FC = () => {
  const { showToast } = useApp();
  const [onDuty, setOnDuty] = useState(true);

  const toggleOnDuty = () => {
    setOnDuty(!onDuty);
    showToast(`Duty status updated to: ${!onDuty ? 'ON DUTY' : 'OFF DUTY'}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Worker Profile & Operational Credentials
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Certified Municipal Operations Personnel · Brihanmumbai Municipal Corporation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Profile Card (5 cols) */}
        <div className="md:col-span-5 bg-[#10221C] text-white rounded-3xl p-6 space-y-5 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#18362B] text-emerald-400 font-black text-2xl flex items-center justify-center border-2 border-[#1E3D32]">
              AN
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Asha Nair</h2>
              <span className="text-xs text-emerald-400 font-semibold block">
                Drainage Specialist (Level II)
              </span>
              <span className="text-[11px] text-gray-400">Ward 12 · Lakeview / Bandra</span>
            </div>
          </div>

          {/* On-Duty Status Switch */}
          <div className="bg-[#142C24] p-4 rounded-2xl border border-[#1E3D32] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Operational Duty</span>
              <span className="text-[11px] text-gray-400">Shift: 08:00 – 17:00 IST</span>
            </div>
            <button
              onClick={toggleOnDuty}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                onDuty
                  ? 'bg-emerald-500 text-[#10221C]'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {onDuty ? 'ON DUTY' : 'OFF DUTY'}
            </button>
          </div>

          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex justify-between py-1 border-b border-[#1E3D32]">
              <span className="text-gray-400">Employee ID:</span>
              <span className="font-semibold text-white">BMC-FW-8841</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1E3D32]">
              <span className="text-gray-400">Phone:</span>
              <span className="font-semibold text-white">+91 98201 44521</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1E3D32]">
              <span className="text-gray-400">Rating:</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-emerald-400" />
                4.9 / 5.0
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">Active Tasks:</span>
              <span className="font-semibold text-white">2 / 5 slots</span>
            </div>
          </div>
        </div>

        {/* Right Certifications & Safety Badges (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-5">
          <h2 className="text-base font-bold text-gray-900">
            Certifications & Equipment Clearances
          </h2>

          <div className="space-y-3">
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#176B4D] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-gray-900">Deep Chamber Entry & Gas Safety</div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  Certified for hazardous confined space inspection with multi-gas detector.
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
              <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-gray-900">High-Pressure Jetting Certification</div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  Authorized operator for 250-bar sewer suction and desilting tankers.
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-gray-900">Monsoon Emergency Response Unit</div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  Rapid-deployment liaison for Mithi river catchment and subways.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

