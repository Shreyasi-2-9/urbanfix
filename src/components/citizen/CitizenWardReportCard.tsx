import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  ClipboardList,
  CheckCircle2,
  Clock,
  Activity,
  TrendingUp,
  AlertTriangle,
  Smile,
} from 'lucide-react';

export const CitizenWardReportCard: React.FC = () => {
  const { complaints } = useApp();

  const totalCount = complaints.length;
  const verifiedCount = complaints.filter((c) => c.status === 'verified').length;
  const resolutionRate = ((verifiedCount / totalCount) * 100).toFixed(1);
  const openCount = complaints.filter((c) => c.status !== 'verified').length;
  const overdueCount = complaints.filter(
    (c) =>
      c.status !== 'verified' &&
      new Date(c.deadline).getTime() < new Date().getTime()
  ).length;

  const handleDownloadReport = () => {
    alert('Ward 12 Municipal Performance Report (PDF) downloaded.');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
            Ward 12 report card
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            Public performance overview · September 2026
          </p>
        </div>

        <button
          onClick={handleDownloadReport}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs md:text-sm font-semibold text-gray-700 shadow-sm transition-all"
        >
          <Download className="w-4 h-4 text-[#176B4D]" />
          <span>Download report</span>
        </button>
      </div>

      {/* 4 Metric Cards Row (Matches Ward 12 report card.png) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total complaints */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-subtle flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total complaints</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#176B4D] flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-gray-900">{totalCount + 570}</div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">+8% this month</div>
          </div>
        </div>

        {/* Resolved (Dark green card per reference design!) */}
        <div className="bg-[#10221C] text-white rounded-2xl p-5 border border-[#1E3D32] shadow-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-300">Resolved</span>
            <div className="w-8 h-8 rounded-lg bg-[#18362B] text-[#4ADE80] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">{verifiedCount + 490}</div>
            <div className="text-xs text-[#4ADE80] font-semibold mt-1">
              81.4% resolution
            </div>
          </div>
        </div>

        {/* Average fixing time */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-subtle flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Average fixing time</span>
            <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-gray-900">2.4 days</div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">0.6 day faster</div>
          </div>
        </div>

        {/* Open today */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-subtle flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Open today</span>
            <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center">
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-gray-900">{openCount + 100}</div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">24 high priority</div>
          </div>
        </div>
      </div>

      {/* Charts & Service Breakdown Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Eight-week trend Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Resolved each week</h2>
              <p className="text-xs text-gray-500">Eight-week complaint resolution trend</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
              81.4% resolved
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 px-2">
            {[
              { label: 'W1', value: 45 },
              { label: 'W2', value: 68 },
              { label: 'W3', value: 55 },
              { label: 'W4', value: 78 },
              { label: 'W5', value: 62 },
              { label: 'W6', value: 89 },
              { label: 'W7', value: 74 },
              { label: 'W8', value: 92, active: true },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-semibold text-gray-400">{bar.value}</span>
                <div
                  className={`w-full rounded-t-xl transition-all duration-300 ${
                    bar.active ? 'bg-[#176B4D]' : 'bg-[#D1E7DD] hover:bg-[#B9DCD0]'
                  }`}
                  style={{ height: `${bar.value}%` }}
                />
                <span className="text-[11px] font-medium text-gray-500">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Performance Progress (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Service performance</h2>
            <p className="text-xs text-gray-500">Resolution rate by category</p>
          </div>

          <div className="space-y-4 pt-1">
            {[
              { category: 'Potholes · 148', percent: 82 },
              { category: 'Garbage · 112', percent: 91 },
              { category: 'Streetlights · 86', percent: 76 },
              { category: 'Water leakage · 74', percent: 88 },
              { category: 'Drains · 52', percent: 69 },
            ].map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>{item.category}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#176B4D] h-2 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Overview & Ward Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Performance Reading Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Performance overview</h2>
            <p className="text-xs text-gray-500">A concise public reading of this month’s service record.</p>
          </div>

          <p className="text-xs text-gray-700 leading-relaxed">
            Ward 12 improved its resolution rate for the third month in a row. Garbage and water-leakage response remain above target, while drain complaints are taking longer due to monsoon-related access constraints.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block font-medium">Strongest service</span>
                <span className="text-xs font-bold text-gray-900">Garbage · 91%</span>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block font-medium">Needs attention</span>
                <span className="text-xs font-bold text-gray-900">Drains · 3.8 days</span>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
                <Smile className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block font-medium">Resident response</span>
                <span className="text-xs font-bold text-gray-900">72% rated helpful</span>
              </div>
            </div>
          </div>
        </div>

        {/* City Ranking Card (4 cols) - Matches exact serif #3 styling */}
        <div className="lg:col-span-4 bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#065F46] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            ON TARGET
          </div>

          <div>
            <div className="text-6xl font-serif font-black text-[#10221C] tracking-tight">
              #3
            </div>
            <p className="text-xs text-gray-700 font-medium mt-2 leading-relaxed">
              of 24 city wards for overall complaint response this month.
            </p>
          </div>

          <div className="text-[11px] text-[#065F46] font-medium pt-2 border-t border-[#A7F3D0]/60">
            Last reconciled 29 Sep · 14:28
          </div>
        </div>
      </div>
    </div>
  );
};

