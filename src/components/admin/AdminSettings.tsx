import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, RotateCcw, Shield, Clock, Bell, Database } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { resetDemoData, showToast } = useApp();

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Municipal policy settings updated!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          System & SLA Configuration
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Municipal policy directives, SLA thresholds, and prototype demo controls
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h2 className="text-base font-bold text-gray-900">SLA Policy Thresholds</h2>
          <p className="text-xs text-gray-500">Service level agreements enforced across all 24 municipal wards.</p>
        </div>

        <form onSubmit={handleSavePolicy} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Critical Severity Target (Hours)
              </label>
              <input type="number" defaultValue={12} className="w-full p-2.5 rounded-xl border border-gray-300" />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                High Priority Target (Hours)
              </label>
              <input type="number" defaultValue={24} className="w-full p-2.5 rounded-xl border border-gray-300" />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Normal Priority Target (Hours)
              </label>
              <input type="number" defaultValue={72} className="w-full p-2.5 rounded-xl border border-gray-300" />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Citizen Verification Window (Hours)
              </label>
              <input type="number" defaultValue={48} className="w-full p-2.5 rounded-xl border border-gray-300" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#13593F] text-white text-xs font-bold"
            >
              Save SLA Thresholds
            </button>
          </div>
        </form>
      </div>

      {/* Demo Prototype Reset Card */}
      <div className="bg-white rounded-2xl border border-red-200 shadow-card p-6 space-y-4">
        <div className="border-b border-red-100 pb-3">
          <h2 className="text-base font-bold text-red-900 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-red-600" />
            Prototype Demo Data Reset
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Re-initializes all 50+ complaints, notifications, workers, and audit log to the pristine baseline demonstration state.
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow flex items-center gap-2 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data to Factory Defaults</span>
        </button>
      </div>
    </div>
  );
};

