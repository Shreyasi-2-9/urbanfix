import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  ClipboardList,
  ThumbsUp,
  Bell,
  User,
  BarChart3,
  Plus,
  LayoutDashboard,
  ListFilter,
  UserPlus,
  Users,
  Clock,
  ShieldCheck,
  TrendingUp,
  CheckSquare,
  Wrench,
  History,
  Building2,
  AlertTriangle,
  FileText,
  Settings,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  X,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { role, activeTab, setActiveTab, notifications } = useApp();

  const unreadCount = notifications.filter(
    (n) => !n.isRead && (n.targetRole === 'all' || n.targetRole === role)
  ).length;

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  const renderNavLinks = () => {
    if (role === 'citizen') {
      const citizenItems = [
        { id: 'map', label: 'Live map', icon: MapPin },
        { id: 'my-complaints', label: 'My complaints', icon: ClipboardList },
        { id: 'my-votes', label: 'My votes', icon: ThumbsUp },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'report-card', label: 'Ward report card', icon: BarChart3 },
      ];

      return (
        <div className="space-y-1">
          {citizenItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#176B4D] text-white shadow-sm font-semibold'
                    : 'text-gray-300 hover:bg-[#18362B] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#176B4D] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      );
    }

    if (role === 'ward_officer') {
      const officerItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'map', label: 'Live complaints map', icon: MapPin },
        { id: 'complaints-management', label: 'Complaint management', icon: ListFilter },
        { id: 'assignment', label: 'Details & assignment', icon: UserPlus },
        { id: 'field-workers', label: 'Field workers', icon: Users },
        { id: 'escalations', label: 'Deadlines & escalations', icon: Clock },
        { id: 'verification', label: 'Repair verification', icon: ShieldCheck },
        { id: 'performance', label: 'Ward performance', icon: TrendingUp },
        { id: 'notifications', label: 'Notifications & profile', icon: Bell, badge: unreadCount },
      ];

      return (
        <div className="space-y-1">
          {officerItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#176B4D] text-white shadow-sm font-semibold'
                    : 'text-gray-300 hover:bg-[#18362B] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-white' : 'bg-transparent border border-gray-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#176B4D] text-white">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      );
    }

    if (role === 'field_worker') {
      const workerItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
        { id: 'task-details', label: 'Task Details', icon: FileText },
        { id: 'repair-progress', label: 'Repair Progress', icon: Wrench },
        { id: 'map', label: 'Field Operations Map', icon: MapPin },
        { id: 'work-history', label: 'Work History', icon: History },
        { id: 'profile', label: 'Worker Profile', icon: User },
      ];

      return (
        <div className="space-y-1">
          {workerItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#176B4D] text-white shadow-sm font-semibold'
                    : 'text-gray-300 hover:bg-[#18362B] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      );
    }

    // Super Admin
    const adminItems = [
      { id: 'overview', label: 'City Overview', icon: LayoutDashboard },
      { id: 'map', label: 'Live Complaints Map', icon: MapPin },
      { id: 'wards', label: 'Ward Management', icon: Building2 },
      { id: 'users', label: 'User Management', icon: Users },
      { id: 'escalations', label: 'Escalation Center', icon: AlertTriangle },
      { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
      { id: 'audit-trail', label: 'Audit Trail', icon: ShieldAlert },
      { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
      { id: 'settings', label: 'System Settings', icon: Settings },
      { id: 'profile', label: 'Admin Profile', icon: User },
    ];

    return (
      <div className="space-y-1">
        {adminItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#176B4D] text-white shadow-sm font-semibold'
                  : 'text-gray-300 hover:bg-[#18362B] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && item.badge > 0 ? (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#176B4D] text-white">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#10221C] text-white select-none">
      {/* Brand header */}
      <div className="p-5 flex items-center justify-between border-b border-[#1E3D32]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#176B4D] flex items-center justify-center shadow-inner">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white leading-none">
              UrbanFix
            </h1>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-none font-medium">
              Civic Operations Platform
            </p>
          </div>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-gray-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav body */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
        {renderNavLinks()}
      </div>

      {/* Footer / Contextual Bottom Block */}
      <div className="p-4 border-t border-[#1E3D32] bg-[#0C1B16]">
        {role === 'citizen' && (
          <div className="space-y-3">
            <button
              onClick={() => handleNavClick('report')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#13593F] active:bg-[#0E4631] text-white text-sm font-semibold shadow transition-all"
            >
              <Plus className="w-4 h-4" />
              Report a problem
            </button>
            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
              City services online · Typical response time 2.4 days
            </p>
          </div>
        )}

        {role === 'ward_officer' && (
          <div className="space-y-2">
            <div className="text-[11px] text-gray-400 leading-snug">
              Ward 12 · Lakeview / Authorized ward only. All actions are recorded.
            </div>
            <a
              href="#policy"
              onClick={(e) => {
                e.preventDefault();
                alert('Municipal Standard Operating Procedures: High priority SLA = 24h, Normal = 72h. Verification requires dual evidence.');
              }}
              className="text-xs text-[#34D399] hover:underline flex items-center gap-1 font-medium"
            >
              Help & policy guide <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {role === 'field_worker' && (
          <div className="bg-[#142C24] p-3 rounded-xl border border-[#1E3D32] text-xs">
            <div className="flex items-center justify-between text-gray-300 font-medium">
              <span>Asha Nair</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                On-duty
              </span>
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              Drainage Specialist · Ward 12
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">
              Shift: 08:00 - 17:00 IST
            </div>
          </div>
        )}

        {role === 'super_admin' && (
          <div className="text-xs text-gray-400">
            <div className="font-semibold text-gray-300">
              Greater Metropolitan Directorate
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5">
              Citywide Administrative Control (BMC)
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar Column */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 self-stretch min-h-full bg-[#10221C] border-r border-[#1E3D32] relative z-20">
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

