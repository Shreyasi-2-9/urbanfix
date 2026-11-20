import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MUMBAI_WARDS } from '../../data/mumbaiWards';
import { Building2, Search, ArrowRight, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

export const AdminWards: React.FC = () => {
  const { complaints, setSelectedWard, setActiveTab } = useApp();
  const [searchWard, setSearchWard] = useState('');

  const filteredWards = MUMBAI_WARDS.filter(
    (w) =>
      w.name.toLowerCase().includes(searchWard.toLowerCase()) ||
      w.jurisdiction.toLowerCase().includes(searchWard.toLowerCase()) ||
      w.wardOfficer.toLowerCase().includes(searchWard.toLowerCase())
  );

  const handleSelectWard = (wardId: string) => {
    setSelectedWard(wardId);
    setActiveTab('map');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
            Municipal Ward Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Operational status across all 24 Brihanmumbai Municipal Corporation administrative wards
          </p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchWard}
            onChange={(e) => setSearchWard(e.target.value)}
            placeholder="Search ward, locality or officer..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWards.map((w) => (
          <div
            key={w.id}
            onClick={() => handleSelectWard(w.id)}
            className="bg-white rounded-2xl border border-gray-200 shadow-subtle hover:shadow-card p-5 cursor-pointer transition-all hover:border-[#176B4D]/30 flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {w.zone}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {w.resolutionRate}% Resolution
                </span>
              </div>
              <h2 className="text-base font-bold text-gray-900 group-hover:text-[#176B4D] transition-colors mt-1">
                {w.name}
              </h2>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {w.jurisdiction}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Ward Officer:</span>
                <span className="font-semibold text-gray-800">{w.wardOfficer}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Field Workers:</span>
                <span className="font-semibold text-gray-800">{w.fieldWorkersCount} specialists</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Active Backlog:</span>
                <span className="font-semibold text-amber-700">{w.activeComplaints} issues</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#176B4D]">
              <span>View Ward Incidents</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

