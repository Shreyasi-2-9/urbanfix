import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const OfficerWardPerformance: React.FC = () => {
  const { complaints } = useApp();

  const wardComplaints = complaints.filter(
    (c) =>
      c.location.ward.includes('Ward 12') ||
      c.location.ward.includes('Lakeview') ||
      c.location.ward.includes('Bandra')
  );

  const totalReports = wardComplaints.length;
  const verifiedCount = wardComplaints.filter((c) => c.status === 'verified').length;
  const resolutionRate = ((verifiedCount / totalReports) * 100).toFixed(1);
  const overdueCount = wardComplaints.filter(
    (c) =>
      c.status !== 'verified' &&
      new Date(c.deadline).getTime() < new Date().getTime()
  ).length;

  return (
    <div className="space-y-5">
      {/* Top Heading */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Ward performance
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Measure outcomes using verified resolutions, not just submitted repairs.
        </p>
      </div>

      {/* Cohort Header Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 text-xs text-gray-700 shadow-subtle space-y-1">
        <span className="font-bold text-gray-900">
          Report cohort · IST · authorized scope
        </span>
        <div className="text-[11px] text-gray-500">
          16 Oct, 00:00 – 20 Oct 2026, 10:00 · Ward 12 · All denominators refer to this active municipal cohort.
        </div>
      </div>

      {/* 6 Metric Cards Row (Matches Ward performance/Desktop.png) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Verified resolution rate</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#176B4D] mt-1">{resolutionRate}%</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">{verifiedCount} citizen-verified / {totalReports} reported</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Median verified resolution</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">36h</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Report → citizen confirmation</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-red-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-red-600 block">Overdue complaints</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600 mt-1">{overdueCount}</div>
          <span className="text-[10px] text-red-500 mt-0.5 block">{overdueCount} / 8 open · 25% of open</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Reopened rate</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">8.3%</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">1 complaint reopened / 12</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Median assignment time</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">2h</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Review → first assignment</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-subtle">
          <span className="text-[11px] font-semibold text-gray-500 block">Awaiting citizen response</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">1</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Evidence is not verification</span>
        </div>
      </div>

      {/* Trends & Definitions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Category Trends Card (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
          <h2 className="text-base font-bold text-gray-900">
            Issue-category trends
          </h2>
          <div className="space-y-3 text-xs text-gray-700">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between">
              <div>
                <span className="font-bold text-gray-900 block">Drainage</span>
                <span className="text-gray-500">4 reports · 1 Verified · 3 open</span>
              </div>
              <span className="font-mono font-bold text-[#176B4D]">0 / 1 / 2 / 0 / 1</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between">
              <div>
                <span className="font-bold text-gray-900 block">Roads & Asphalt</span>
                <span className="text-gray-500">3 reports · 1 Verified · 2 open</span>
              </div>
              <span className="font-mono font-bold text-[#176B4D]">0 / 1 / 2 / 0 / 0</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between">
              <div>
                <span className="font-bold text-gray-900 block">Sanitation</span>
                <span className="text-gray-500">3 reports · 1 Verified · 2 open</span>
              </div>
              <span className="font-mono font-bold text-[#176B4D]">1 / 0 / 0 / 1 / 1</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between">
              <div>
                <span className="font-bold text-gray-900 block">Lighting</span>
                <span className="text-gray-500">2 reports · 1 Verified · 1 open</span>
              </div>
              <span className="font-mono font-bold text-[#176B4D]">0 / 1 / 0 / 1 / 0</span>
            </div>
          </div>
        </div>

        {/* Daily Reported / Citizen-Verified (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
          <h2 className="text-base font-bold text-gray-900">
            Daily reported / citizen-verified
          </h2>
          <div className="space-y-2.5 text-xs text-gray-700">
            {[
              { date: '16 Oct', reported: 1, verified: 0 },
              { date: '17 Oct', reported: 3, verified: 1 },
              { date: '18 Oct', reported: 4, verified: 2 },
              { date: '19 Oct', reported: 2, verified: 1 },
              { date: '20 Oct', reported: 2, verified: 0 },
            ].map((d, i) => (
              <div key={i} className="flex justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                <span className="font-semibold text-gray-800">{d.date}</span>
                <span className="text-gray-600">
                  {d.reported} reported / <span className="text-emerald-700 font-bold">{d.verified} Verified</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

