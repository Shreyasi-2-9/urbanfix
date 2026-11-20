import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  ThumbsUp,
  MapPin,
  Map,
  CheckCircle2,
  Info,
} from 'lucide-react';

export const CitizenMyVotes: React.FC = () => {
  const { complaints, setSelectedComplaintId, setActiveTab } = useApp();

  // Complaints that this citizen has voted on / supported
  const votedComplaints = complaints.filter((c) => c.hasVoted);

  const handleCardClick = (id: string) => {
    setSelectedComplaintId(id);
    setActiveTab('map');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
            My votes
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            Problems you supported with &ldquo;Me too&rdquo;
          </p>
        </div>

        <button
          onClick={() => setActiveTab('map')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs md:text-sm font-semibold text-gray-700 shadow-sm transition-all"
        >
          <Map className="w-4 h-4 text-[#176B4D]" />
          <span>Explore nearby issues</span>
        </button>
      </div>

      {/* Info Banner (Matches design references) */}
      <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#065F46]">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#10B981] flex-shrink-0" />
          <span>
            Your votes help the city understand how many residents are affected—without creating duplicate complaints.
          </span>
        </div>
        <div className="font-bold whitespace-nowrap">
          {votedComplaints.reduce((acc, c) => acc + c.votes, 0)} total resident votes recorded
        </div>
      </div>

      {/* Grid of Cards (Matches exact design in My votes.png) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {votedComplaints.map((c) => (
          <div
            key={c.id}
            onClick={() => handleCardClick(c.id)}
            className="bg-white rounded-2xl border border-gray-200 shadow-subtle hover:shadow-card p-5 cursor-pointer transition-all hover:border-[#176B4D]/30 flex flex-col justify-between space-y-4 group"
          >
            {/* Top row: ID and Status */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 group-hover:text-[#176B4D]">
                {c.id}
              </span>
              <StatusBadge status={c.status} progress={c.progress} />
            </div>

            {/* Title & Location */}
            <div>
              <h2 className="text-base font-bold text-gray-900 group-hover:text-[#176B4D] transition-colors leading-snug">
                {c.title}
              </h2>
              <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{c.location.address}</span>
              </div>
            </div>

            {/* Bottom Row: Votes + Status Note */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{c.votes} votes</span>
              </div>

              <div className="text-[11px] text-gray-500 font-medium truncate max-w-[150px]">
                {c.crewStatusNote || (c.status === 'verified' ? 'Resolved & verified' : 'In queue')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

