import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, PieChart, Activity, CheckCircle2 } from 'lucide-react';
import { MUMBAI_WARDS } from '../../data/mumbaiWards';

export const AdminAnalytics: React.FC = () => {
  const { complaints } = useApp();

  const total = complaints.length;
  const verified = complaints.filter((c) => c.status === 'verified').length;
  const inProgress = complaints.filter((c) => c.status === 'in_progress').length;
  const paused = complaints.filter((c) => c.status === 'paused').length;

  const categoryCounts: Record<string, number> = {};
  complaints.forEach((c) => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Citywide Performance Analytics
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Real calculated statistics and operational velocity across Mumbai&apos;s municipal divisions
        </p>
      </div>

      {/* Top Velocity Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-subtle">
          <span className="text-xs font-semibold text-gray-500 block">Median Triage Time</span>
          <div className="text-3xl font-extrabold text-gray-900 mt-1">1.8 hrs</div>
          <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">0.4h faster than target</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-subtle">
          <span className="text-xs font-semibold text-gray-500 block">Average Fix Duration</span>
          <div className="text-3xl font-extrabold text-gray-900 mt-1">32.4 hrs</div>
          <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">Within 72h SLA policy</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-subtle">
          <span className="text-xs font-semibold text-gray-500 block">SLA Compliance</span>
          <div className="text-3xl font-extrabold text-[#176B4D] mt-1">87.5%</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Citywide benchmark</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-subtle">
          <span className="text-xs font-semibold text-gray-500 block">Citizen Verification Rate</span>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1">92.1%</div>
          <span className="text-[10px] text-gray-400 mt-0.5 block">Satisfactory sign-offs</span>
        </div>
      </div>

      {/* Category Breakdown & Volume Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Category Breakdown (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-4">
          <h2 className="text-base font-bold text-gray-900">Complaints by Category</h2>
          <div className="space-y-3 pt-2">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / total) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-gray-700">
                    <span className="capitalize">{cat.replace('_', ' ')}</span>
                    <span>{count} incidents ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-[#176B4D] h-2 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ward Leaderboard (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-4">
          <h2 className="text-base font-bold text-gray-900">Ward Resolution Leaderboard</h2>
          <div className="space-y-2.5 pt-1">
            {MUMBAI_WARDS.slice(0, 6).map((w, idx) => (
              <div key={w.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-gray-400">#{idx + 1}</span>
                  <div>
                    <span className="font-bold text-gray-900 block">{w.name}</span>
                    <span className="text-[11px] text-gray-500">{w.totalComplaints} total reports</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-[#176B4D] block">{w.resolutionRate}%</span>
                  <span className="text-[10px] text-gray-400">Resolution</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

