import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Bell,
  Search,
  ChevronDown,
  Building2,
  Shield,
  Briefcase,
  UserCheck,
  RotateCcw,
  Menu,
  LogOut,
} from 'lucide-react';
import { MUMBAI_WARDS } from '../../data/mumbaiWards';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const {
    role,
    currentUser,
    logout,
    activeTab,
    setActiveTab,
    notifications,
    selectedWard,
    setSelectedWard,
    resetDemoData,
  } = useApp();

  const [wardDropdownOpen, setWardDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(
    (n) => !n.isRead && (n.targetRole === 'all' || n.targetRole === role)
  ).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Switch to search / map tab
    if (role === 'citizen') setActiveTab('map');
    else if (role === 'ward_officer') setActiveTab('complaints-management');
    else if (role === 'field_worker') setActiveTab('tasks');
    else if (role === 'super_admin') setActiveTab('map');
  };

  const getRoleUserLabel = () => {
    if (currentUser) {
      return {
        name: currentUser.name,
        title: currentUser.title,
        initials: currentUser.avatarInitials,
      };
    }
    switch (role) {
      case 'citizen':
        return { name: 'Aarav Kumar', title: 'Resident · Ward 12', initials: 'AK' };
      case 'ward':
      case 'ward_officer':
        return { name: 'Priya Sharma', title: 'Ward Officer · Ward 12', initials: 'PS' };
      case 'officer':
        return { name: 'Priya Sharma', title: 'Assistant Municipal Commissioner', initials: 'PS' };
      case 'field_worker':
        return { name: 'Asha Nair', title: 'Drainage Specialist', initials: 'AN' };
      case 'super_admin':
        return { name: 'Vikramaditya Roy', title: 'Municipal Commissioner', initials: 'VR' };
      default:
        return { name: 'UrbanFix Member', title: 'Civic Authority', initials: 'UF' };
    }
  };

  const userInfo = getRoleUserLabel();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E5E7EB] px-4 lg:px-6 flex items-center justify-between shadow-subtle select-none">
      {/* Left: Mobile hamburger & Context Branding */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Brand & Location / Role Indicator */}
        <div className="flex items-center gap-2">
          {role === 'citizen' && (
            <div className="relative">
              <button
                onClick={() => setWardDropdownOpen(!wardDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                <Building2 className="w-4 h-4 text-[#176B4D]" />
                <span className="hidden sm:inline">Ward 12 · Marlowe / Bandra</span>
                <span className="sm:hidden">Ward 12</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {wardDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-elevated py-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Select Municipal Ward
                  </div>
                  {MUMBAI_WARDS.slice(0, 6).map((ward) => (
                    <button
                      key={ward.id}
                      onClick={() => {
                        setSelectedWard(ward.id);
                        setWardDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 flex items-center justify-between ${
                        selectedWard === ward.id ? 'bg-[#ECFDF5] text-[#176B4D] font-semibold' : 'text-gray-700'
                      }`}
                    >
                      <span className="truncate">{ward.name}</span>
                      <span className="text-[10px] text-gray-400 ml-2">{ward.totalComplaints} issues</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {role === 'ward_officer' && (
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-semibold text-[#111827]">
                Ward 12 · Lakeview / Bandra West
              </span>
              <span className="text-[11px] text-[#059669] font-medium">
                Authorized Officer Scope · Mumbai BMC
              </span>
            </div>
          )}

          {role === 'field_worker' && (
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm font-semibold text-[#111827]">
                Ward 12 Field Ops
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                Drainage Specialist
              </span>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Ops
              </div>
            </div>
          )}

          {role === 'super_admin' && (
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-semibold text-[#111827] flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#176B4D]" />
                Greater Metropolitan Directorate
              </span>
              <span className="text-[11px] text-gray-500">
                Citywide Municipal Oversight · All 24 Wards
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Live search bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              role === 'citizen'
                ? 'Search an area, street or landmark...'
                : role === 'ward_officer'
                ? 'Search complaint ID, location or worker...'
                : role === 'field_worker'
                ? 'Search my tasks or street...'
                : 'Search citywide complaints, wards, or staff...'
            }
            className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl pl-9 pr-8 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#176B4D]/20 focus:border-[#176B4D] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </form>
      </div>

      {/* Right: User info, Notifications, Demo Reset & Log Out */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Reset Demo Data Button */}
        <button
          onClick={resetDemoData}
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          title="Reset demo data to initial state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>

        {/* Notifications Icon Button */}
        <button
          onClick={() => setActiveTab('notifications')}
          className="relative p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4 md:w-5 md:h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Pill */}
        <button
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
          title="View profile & permissions"
        >
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#DDF1E9] text-[#176B50] font-bold text-xs flex items-center justify-center border border-[#176B50]/20">
            {userInfo.initials}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-gray-900 leading-tight">
              {userInfo.name}
            </span>
            <span className="text-[10px] text-gray-500 leading-tight">
              {userInfo.title}
            </span>
          </div>
        </button>

        {/* Log Out Button */}
        <button
          onClick={logout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
          title="Sign out of UrbanFix and return to public website"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    </header>
  );
};

