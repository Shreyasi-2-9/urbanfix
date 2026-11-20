import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Toast } from './components/common/Toast';
import { LightboxModal } from './components/common/LightboxModal';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';

// Citizen components
import { CitizenLiveMap } from './components/citizen/CitizenLiveMap';
import { CitizenMyComplaints } from './components/citizen/CitizenMyComplaints';
import { CitizenMyVotes } from './components/citizen/CitizenMyVotes';
import { CitizenNotifications } from './components/citizen/CitizenNotifications';
import { CitizenReportProblem } from './components/citizen/CitizenReportProblem';
import { CitizenWardReportCard } from './components/citizen/CitizenWardReportCard';
import { CitizenProfile } from './components/citizen/CitizenProfile';

// Ward Officer components
import { OfficerOverview } from './components/officer/OfficerOverview';
import { OfficerLiveMap } from './components/officer/OfficerLiveMap';
import { OfficerComplaintManagement } from './components/officer/OfficerComplaintManagement';
import { OfficerDetailsAssignment } from './components/officer/OfficerDetailsAssignment';
import { OfficerFieldWorkers } from './components/officer/OfficerFieldWorkers';
import { OfficerDeadlinesEscalations } from './components/officer/OfficerDeadlinesEscalations';
import { OfficerRepairVerification } from './components/officer/OfficerRepairVerification';
import { OfficerWardPerformance } from './components/officer/OfficerWardPerformance';

// Field Worker components
import { WorkerOverview } from './components/worker/WorkerOverview';
import { WorkerMyTasks } from './components/worker/WorkerMyTasks';
import { WorkerTaskDetails } from './components/worker/WorkerTaskDetails';
import { WorkerRepairProgress } from './components/worker/WorkerRepairProgress';
import { WorkerWorkHistory } from './components/worker/WorkerWorkHistory';
import { WorkerProfile } from './components/worker/WorkerProfile';
import { WorkerLiveMap } from './components/worker/WorkerLiveMap';

// Super Admin components
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminLiveMap } from './components/admin/AdminLiveMap';
import { AdminWards } from './components/admin/AdminWards';
import { AdminUsers } from './components/admin/AdminUsers';
import { AdminEscalations } from './components/admin/AdminEscalations';
import { AdminAnalytics } from './components/admin/AdminAnalytics';
import { AdminAuditTrail } from './components/admin/AdminAuditTrail';
import { AdminSettings } from './components/admin/AdminSettings';

const MainContent: React.FC = () => {
  const { role, activeTab } = useApp();

  // Citizen Tabs
  if (role === 'citizen') {
    switch (activeTab) {
      case 'map':
        return <CitizenLiveMap />;
      case 'my-complaints':
        return <CitizenMyComplaints />;
      case 'my-votes':
        return <CitizenMyVotes />;
      case 'notifications':
        return <CitizenNotifications />;
      case 'report':
        return <CitizenReportProblem />;
      case 'report-card':
        return <CitizenWardReportCard />;
      case 'profile':
        return <CitizenProfile />;
      default:
        return <CitizenLiveMap />;
    }
  }

  // Ward Officer Tabs
  if (role === 'ward_officer') {
    switch (activeTab) {
      case 'overview':
        return <OfficerOverview />;
      case 'map':
        return <OfficerLiveMap />;
      case 'complaints-management':
        return <OfficerComplaintManagement />;
      case 'assignment':
        return <OfficerDetailsAssignment />;
      case 'field-workers':
        return <OfficerFieldWorkers />;
      case 'escalations':
        return <OfficerDeadlinesEscalations />;
      case 'verification':
        return <OfficerRepairVerification />;
      case 'performance':
        return <OfficerWardPerformance />;
      case 'notifications':
        return <CitizenNotifications />;
      case 'profile':
        return <CitizenProfile />;
      default:
        return <OfficerOverview />;
    }
  }

  // Field Worker Tabs
  if (role === 'field_worker') {
    switch (activeTab) {
      case 'overview':
        return <WorkerOverview />;
      case 'tasks':
        return <WorkerMyTasks />;
      case 'task-details':
        return <WorkerTaskDetails />;
      case 'repair-progress':
        return <WorkerRepairProgress />;
      case 'work-history':
        return <WorkerWorkHistory />;
      case 'profile':
        return <WorkerProfile />;
      case 'map':
        return <WorkerLiveMap />;
      default:
        return <WorkerOverview />;
    }
  }

  // Super Admin Tabs
  if (role === 'super_admin') {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview />;
      case 'map':
        return <AdminLiveMap />;
      case 'wards':
        return <AdminWards />;
      case 'users':
        return <AdminUsers />;
      case 'escalations':
        return <AdminEscalations />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'audit-trail':
        return <AdminAuditTrail />;
      case 'notifications':
        return <CitizenNotifications />;
      case 'settings':
        return <AdminSettings />;
      case 'profile':
        return <CitizenProfile />;
      default:
        return <AdminOverview />;
    }
  }

  return <CitizenLiveMap />;
};

const AppShell: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F4]">
      {/* Top Header */}
      <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Main page wrapper stretching to full content height */}
      <div className="flex-1 flex items-stretch min-h-[calc(100vh-4rem)] w-full">
        {/* Left Sidebar Column */}
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Application Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <MainContent />
          </div>
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <Toast />
      <LightboxModal />
    </div>
  );
};

const RootRouter: React.FC = () => {
  const { currentPage, isAuthenticated } = useApp();

  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage />
        <Toast />
      </>
    );
  }

  if (currentPage === 'login') {
    return (
      <>
        <LoginPage />
        <Toast />
      </>
    );
  }

  // Dashboard route: requires authentication
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
        <Toast />
      </>
    );
  }

  return <AppShell />;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <RootRouter />
    </AppProvider>
  );
};

export default App;

