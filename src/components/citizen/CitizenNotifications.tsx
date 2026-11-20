import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCircle2,
  Clock,
  Wrench,
  Pause,
  AlertTriangle,
  HardHat,
  UserCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const CitizenNotifications: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    complaints,
    setSelectedComplaintId,
    setActiveTab,
    setLightboxImage,
  } = useApp();

  // Notifications relevant to Citizen
  const citizenNotifs = notifications.filter(
    (n) => n.targetRole === 'citizen' || n.targetRole === 'all'
  );

  const [selectedNotifId, setSelectedNotifId] = useState<string>(
    citizenNotifs[0]?.id || ''
  );

  const selectedNotif = citizenNotifs.find((n) => n.id === selectedNotifId) || citizenNotifs[0];
  const relatedComplaint = complaints.find((c) => c.id === selectedNotif?.complaintId);

  const handleNotificationClick = (notifId: string) => {
    setSelectedNotifId(notifId);
    markNotificationRead(notifId);
  };

  const handleViewRecord = (complaintId?: string) => {
    if (complaintId) {
      setSelectedComplaintId(complaintId);
      setActiveTab('map');
    }
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'progress':
        return <HardHat className="w-4 h-4 text-amber-600" />;
      case 'assignment':
        return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-orange-600" />;
      case 'verification':
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      default:
        return <Wrench className="w-4 h-4 text-gray-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'progress':
        return 'bg-amber-100';
      case 'assignment':
        return 'bg-blue-100';
      case 'paused':
        return 'bg-orange-100';
      case 'verification':
      case 'success':
        return 'bg-emerald-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
            Notifications
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            Status changes for your reports and votes
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs md:text-sm font-semibold text-gray-700 shadow-sm transition-all"
        >
          <CheckCircle2 className="w-4 h-4 text-[#176B4D]" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Grid: Notification List on Left (7 cols), Selected Item Preview on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Notification Cards */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Latest updates
            </span>
            <span className="text-xs font-semibold text-[#176B4D]">
              {citizenNotifs.filter((n) => !n.isRead).length} unread
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {citizenNotifs.map((n) => {
              const isSelected = n.id === selectedNotif?.id;
              return (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n.id)}
                  className={`p-4 flex items-start gap-3.5 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#ECFDF5]/70 border-l-4 border-[#176B4D]'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${getIconBg(
                      n.type
                    )}`}
                  >
                    {getNotifIcon(n.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-xs md:text-sm font-bold text-gray-900 truncate">
                        {n.title}
                      </h2>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">
                        {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      {n.message}
                    </p>

                    {n.complaintId && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700">
                          {n.complaintId}
                        </span>
                        {!n.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        )}
                      </div>
                    )}
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 self-center" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Notification Detail Panel (Matches Notifications.png) */}
        {selectedNotif && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-gray-100">
              <span className="flex items-center gap-1.5 font-bold text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                {selectedNotif.title}
              </span>
              <span className="text-gray-400 text-[11px]">
                {new Date(selectedNotif.timestamp).toLocaleDateString()}
              </span>
            </div>

            {/* If complaint has after photo, show it prominently */}
            {relatedComplaint?.photos.after ? (
              <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-emerald-200">
                <img
                  src={relatedComplaint.photos.after}
                  alt="Verified repair"
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => setLightboxImage(relatedComplaint.photos.after!)}
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#16A34A] text-[10px] font-semibold text-white tracking-wider uppercase">
                  AFTER REPAIR
                </div>
              </div>
            ) : relatedComplaint?.photos.before ? (
              <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={relatedComplaint.photos.before}
                  alt="Report evidence"
                  className="w-full h-44 object-cover cursor-pointer"
                  onClick={() => setLightboxImage(relatedComplaint.photos.before)}
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] font-semibold text-white tracking-wider uppercase">
                  PHOTO EVIDENCE
                </div>
              </div>
            ) : null}

            {/* Detailed Info */}
            <div className="space-y-2">
              <div className="text-sm font-bold text-gray-900">
                {relatedComplaint?.title || selectedNotif.title}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {selectedNotif.message}
              </p>
            </div>

            {relatedComplaint && (
              <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1.5 border border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Location:</span>
                  <span className="font-semibold text-gray-800">{relatedComplaint.location.address}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Department:</span>
                  <span className="font-semibold text-gray-800 capitalize">{relatedComplaint.category.replace('_', ' ')} Works</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Residents Notified:</span>
                  <span className="font-semibold text-gray-800">{relatedComplaint.votes + 12}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => handleViewRecord(selectedNotif.complaintId)}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-xs font-bold text-gray-800 flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>View full record</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

