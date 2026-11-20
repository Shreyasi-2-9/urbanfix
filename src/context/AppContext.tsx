import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserRole,
  AuthUser,
  Complaint,
  NotificationItem,
  AuditEvent,
  FieldWorker,
  ComplaintPriority,
} from '../types';
import { ALL_INITIAL_COMPLAINTS, COMPLAINTS_STORAGE_KEY, NOTIFICATIONS_STORAGE_KEY, AUDIT_STORAGE_KEY, CURRENT_ROLE_KEY, WORKERS_STORAGE_KEY } from '../data/complaintsStore';
import { INITIAL_NOTIFICATIONS } from '../data/initialNotifications';
import { INITIAL_AUDIT_LOG } from '../data/initialAudit';
import { FIELD_WORKERS } from '../data/workersData';
import { getCategoryDefaultBefore, getCategoryDefaultAfter } from '../utils/complaintPhotoHelpers';

export const AUTH_SESSION_KEY = 'urbanfix_auth_session';

export const DEMO_ACCOUNTS: Record<string, AuthUser> = {
  citizen: {
    id: 'usr-cit-1',
    name: 'Aarav Kumar',
    email: 'aarav.citizen@urbanfix.org',
    role: 'citizen',
    title: 'Resident · Ward 12 (Bandra West)',
    avatarInitials: 'AK',
    ward: 'ward-12',
  },
  ward: {
    id: 'usr-ward-1',
    name: 'Ward 12 Secretariat',
    email: 'ward12.admin@urbanfix.org',
    role: 'ward',
    title: 'Ward Operations Admin · H/West',
    avatarInitials: 'W12',
    ward: 'ward-12',
  },
  officer: {
    id: 'usr-off-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@urbanfix.org',
    role: 'ward_officer',
    title: 'Assistant Municipal Commissioner · Ward 12',
    avatarInitials: 'PS',
    ward: 'ward-12',
  },
  field_worker: {
    id: 'usr-wrk-1',
    name: 'Asha Nair',
    email: 'asha.nair@urbanfix.org',
    role: 'field_worker',
    title: 'Drainage & Roadworks Specialist',
    avatarInitials: 'AN',
    ward: 'ward-12',
  },
  super_admin: {
    id: 'usr-adm-1',
    name: 'Vikramaditya Roy',
    email: 'commissioner@urbanfix.org',
    role: 'super_admin',
    title: 'Municipal Commissioner · BMC',
    avatarInitials: 'VR',
  },
};

interface AppContextType {
  // Authentication & Route state
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  currentPage: 'landing' | 'login' | 'dashboard';
  navigateTo: (page: 'landing' | 'login' | 'dashboard') => void;
  login: (role: UserRole, customUser?: Partial<AuthUser>) => void;
  logout: () => void;

  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  complaints: Complaint[];
  selectedComplaintId: string | null;
  setSelectedComplaintId: (id: string | null) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => void;
  fieldWorkers: FieldWorker[];
  auditEvents: AuditEvent[];
  selectedWard: string;
  setSelectedWard: (ward: string) => void;
  lightboxImage: string | null;
  setLightboxImage: (url: string | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Core Workflow Actions
  submitComplaint: (data: {
    title: string;
    description: string;
    category: Complaint['category'];
    location: Complaint['location'];
    photoUrl: string;
    isAnonymous?: boolean;
  }) => string;
  assignWorker: (
    complaintId: string,
    workerId: string,
    priority: ComplaintPriority,
    deadline: string,
    directive: string
  ) => void;
  startWork: (complaintId: string) => void;
  updateProgress: (complaintId: string, progress: number, notes?: string) => void;
  pauseTask: (complaintId: string, reason: string) => void;
  resumeTask: (complaintId: string) => void;
  saveAfterPhotos: (complaintId: string, afterPhoto: string, additionalPhotos?: string[]) => void;
  submitRepair: (
    complaintId: string,
    afterPhoto: string,
    notes: string,
    additionalPhotos?: string[]
  ) => void;
  reviewEvidence: (complaintId: string, action: 'approve' | 'rework', notes?: string) => void;
  citizenVerify: (complaintId: string, decision: 'confirm' | 'dispute', disputeReason?: string) => void;
  voteComplaint: (complaintId: string) => boolean;
  escalateComplaint: (complaintId: string, reason: string, recipient: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getPageFromHash = (): 'landing' | 'login' | 'dashboard' => {
    if (typeof window === 'undefined') return 'landing';
    const hash = window.location.hash.toLowerCase();
    if (hash === '#/login' || hash === '#login') return 'login';
    if (hash === '#/dashboard' || hash === '#dashboard' || hash === '#/app') return 'dashboard';
    return 'landing';
  };

  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'dashboard'>(getPageFromHash);

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_SESSION_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return typeof window !== 'undefined' && !!localStorage.getItem(AUTH_SESSION_KEY);
  });

  // Sync hash and protect routes
  useEffect(() => {
    const checkAndSync = () => {
      const targetPage = getPageFromHash();
      const hasAuth = !!localStorage.getItem(AUTH_SESSION_KEY);
      if (targetPage === 'dashboard' && !hasAuth) {
        window.location.hash = '#/login';
        setCurrentPage('login');
      } else if (targetPage === 'login' && hasAuth) {
        window.location.hash = '#/dashboard';
        setCurrentPage('dashboard');
      } else {
        setCurrentPage(targetPage);
      }
    };

    window.addEventListener('hashchange', checkAndSync);
    checkAndSync();
    return () => window.removeEventListener('hashchange', checkAndSync);
  }, []);

  const navigateTo = (page: 'landing' | 'login' | 'dashboard') => {
    const hasAuth = !!localStorage.getItem(AUTH_SESSION_KEY);
    if (page === 'dashboard' && !hasAuth) {
      window.location.hash = '#/login';
      setCurrentPage('login');
      return;
    }
    if (page === 'landing') window.location.hash = '#/';
    else if (page === 'login') window.location.hash = '#/login';
    else if (page === 'dashboard') window.location.hash = '#/dashboard';
    setCurrentPage(page);
  };

  // Role & navigation state
  const [role, setRoleState] = useState<UserRole>(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_SESSION_KEY);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed.role) return parsed.role;
      }
      const saved = localStorage.getItem(CURRENT_ROLE_KEY);
      return (saved as UserRole) || 'citizen';
    } catch (e) {
      return 'citizen';
    }
  });

  const login = (chosenRole: UserRole, customUser?: Partial<AuthUser>) => {
    const effectiveRole: UserRole =
      chosenRole === 'ward' || chosenRole === 'officer' ? 'ward_officer' : chosenRole;
    const baseAccount =
      DEMO_ACCOUNTS[chosenRole] || DEMO_ACCOUNTS[effectiveRole] || DEMO_ACCOUNTS.citizen;
    const user: AuthUser = {
      ...baseAccount,
      ...customUser,
      role: effectiveRole,
    };
    setIsAuthenticated(true);
    setCurrentUser(user);
    setRole(effectiveRole);
    try {
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
    } catch (e) {}
    showToast(`Signed in as ${user.name} (${user.title})`);
    window.location.hash = '#/dashboard';
    setCurrentPage('dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    try {
      localStorage.removeItem(AUTH_SESSION_KEY);
    } catch (e) {}
    showToast('Signed out. Returned to UrbanFix public portal.');
    window.location.hash = '#/';
    setCurrentPage('landing');
  };

  const [activeTab, setActiveTab] = useState<string>('map');
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>('UF-001');
  const [selectedWard, setSelectedWard] = useState<string>('ward-12');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Complaints State with automatic image sanitization for consistent evidence
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    try {
      const saved = localStorage.getItem(COMPLAINTS_STORAGE_KEY);
      if (saved) {
        const parsed: Complaint[] = JSON.parse(saved);
        return parsed.map((c) => {
          let before = c.photos?.before || getCategoryDefaultBefore(c.category, c.title);
          if (c.category === 'toilet' && before.includes('drain')) {
            before = '/photos/toilet_before.jpg';
          }
          if (c.title?.toLowerCase().includes('manhole') && !before.includes('manhole')) {
            before = '/photos/manhole_before.jpg';
          }

          let after = c.photos?.after;
          if (after) {
            if (c.category === 'garbage' && (after.includes('road_patch') || after.includes('garbage_bins'))) {
              after = '/photos/garbage_after.jpg';
            } else if (c.category === 'water_leakage' && after.includes('road_patch')) {
              after = '/photos/water_leak_after.jpg';
            } else if (c.category === 'footpath' && after.includes('road_patch')) {
              after = '/photos/footpath_after.jpg';
            } else if (c.category === 'toilet' && after.includes('drain')) {
              after = '/photos/toilet_after.jpg';
            }
          }

          return {
            ...c,
            photos: {
              ...c.photos,
              before,
              after,
            },
          };
        });
      }
    } catch (e) {
      console.error('Failed to load complaints from storage:', e);
    }
    return ALL_INITIAL_COMPLAINTS;
  });

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load notifications from storage:', e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Audit Events State
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(() => {
    try {
      const saved = localStorage.getItem(AUDIT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load audit events from storage:', e);
    }
    return INITIAL_AUDIT_LOG;
  });

  // Workers State
  const [fieldWorkers, setFieldWorkers] = useState<FieldWorker[]>(() => {
    try {
      const saved = localStorage.getItem(WORKERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load workers from storage:', e);
    }
    return FIELD_WORKERS;
  });

  // Persist State to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(complaints));
    } catch (e) {
      console.warn('Unable to persist complaints to localStorage:', e);
    }
  }, [complaints]);

  useEffect(() => {
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Unable to persist notifications to localStorage:', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(auditEvents));
    } catch (e) {
      console.warn('Unable to persist audit events to localStorage:', e);
    }
  }, [auditEvents]);

  useEffect(() => {
    try {
      localStorage.setItem(WORKERS_STORAGE_KEY, JSON.stringify(fieldWorkers));
    } catch (e) {
      console.warn('Unable to persist workers to localStorage:', e);
    }
  }, [fieldWorkers]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem(CURRENT_ROLE_KEY, newRole);
    // Switch default tab appropriately
    if (newRole === 'citizen') setActiveTab('map');
    else if (newRole === 'ward_officer') setActiveTab('overview');
    else if (newRole === 'field_worker') setActiveTab('tasks');
    else if (newRole === 'super_admin') setActiveTab('overview');
    showToast(`Switched view to ${newRole.replace('_', ' ').toUpperCase()}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 4000);
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      isRead: false,
      ...item,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications marked as read');
  };

  const addAuditEvent = (
    actor: string,
    actorRole: string,
    complaintId: string | undefined,
    action: string,
    prevState: string | undefined,
    newState: string | undefined,
    details: string
  ) => {
    const newEvent: AuditEvent = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      actor,
      role: actorRole,
      complaintId,
      action,
      previousState: prevState,
      newState,
      details,
    };
    setAuditEvents((prev) => [newEvent, ...prev]);
  };

  // 1. Citizen Submits Complaint
  const submitComplaint = (data: {
    title: string;
    description: string;
    category: Complaint['category'];
    location: Complaint['location'];
    photoUrl: string;
    isAnonymous?: boolean;
  }): string => {
    const newId = `UF-${String(complaints.length + 101).padStart(3, '0')}`;
    const now = new Date().toISOString();
    // Default deadline 72h
    const deadlineDate = new Date(Date.now() + 72 * 3600 * 1000).toISOString();

    const newComplaint: Complaint = {
      id: newId,
      title: data.title,
      description: data.description,
      category: data.category,
      status: 'reported',
      priority: 'normal',
      location: data.location,
      citizen: {
        name: data.isAnonymous ? 'Anonymous Resident' : 'Aarav Kumar',
        email: data.isAnonymous ? 'anonymous@urbanfix.org' : 'aarav.kumar@example.com',
        phone: data.isAnonymous ? 'Confidential' : '+91 98765 43210',
        isAnonymous: !!data.isAnonymous,
      },
      reportedAt: now,
      deadline: deadlineDate,
      progress: 0,
      votes: 1,
      hasVoted: true,
      photos: {
        before: data.photoUrl || '/photos/pothole_lakeview.jpg',
      },
      timeline: [
        {
          id: `tl-${Date.now()}`,
          title: 'Report registered',
          description: `Complaint ${newId} registered with photo evidence by ${data.isAnonymous ? 'Anonymous Citizen' : 'Aarav Kumar'}.`,
          timestamp: now,
          actor: data.isAnonymous ? 'Anonymous Citizen' : 'Aarav Kumar',
          role: 'Citizen',
          type: 'reported',
        },
      ],
    };

    setComplaints((prev) => [newComplaint, ...prev]);
    setSelectedComplaintId(newId);

    // Notify Ward Officer
    addNotification({
      complaintId: newId,
      title: `New Report: ${newId} · ${data.title}`,
      message: `Citizen reported ${data.category} in ${data.location.ward}. Awaiting triage and assignment.`,
      type: 'info',
      targetRole: 'ward_officer',
    });

    // Notify Citizen
    addNotification({
      complaintId: newId,
      title: `Complaint Registered (${newId})`,
      message: `Your report has been logged. Standard response window: 72 hours. Follow updates here.`,
      type: 'progress',
      targetRole: 'citizen',
    });

    // Audit Trail
    addAuditEvent(
      data.isAnonymous ? 'Anonymous Citizen' : 'Aarav Kumar',
      'Citizen',
      newId,
      'COMPLAINT_REGISTERED',
      'None',
      'Reported',
      `Registered ${data.category} issue at ${data.location.address}, ${data.location.ward}.`
    );

    showToast(`Complaint ${newId} registered successfully!`);
    return newId;
  };

  // 2. Ward Officer Assigns Worker
  const assignWorker = (
    complaintId: string,
    workerId: string,
    priority: ComplaintPriority,
    deadline: string,
    directive: string
  ) => {
    const worker = fieldWorkers.find((w) => w.id === workerId);
    if (!worker) return;

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;
        const now = new Date().toISOString();
        return {
          ...c,
          status: 'assigned',
          priority,
          deadline: deadline || c.deadline,
          officialDirective: directive,
          assignedWorker: {
            id: worker.id,
            name: worker.name,
            specialty: worker.specialty,
            ward: worker.ward,
            phone: worker.phone,
          },
          assignedOfficer: {
            name: 'Priya Sharma',
            ward: c.location.ward,
          },
          timeline: [
            ...c.timeline,
            {
              id: `tl-${Date.now()}`,
              title: `Assigned to ${worker.name}`,
              description: `Ward officer Priya Sharma assigned task with ${priority.toUpperCase()} priority. Directive: ${directive || 'Immediate inspection and repair required.'}`,
              timestamp: now,
              actor: 'Priya Sharma',
              role: 'Ward Officer',
              type: 'assigned',
            },
          ],
        };
      })
    );

    // Update worker workload
    setFieldWorkers((prev) =>
      prev.map((w) => (w.id === workerId ? { ...w, activeTasksCount: w.activeTasksCount + 1 } : w))
    );

    // Notifications
    addNotification({
      complaintId,
      title: `Task Assigned: ${complaintId}`,
      message: `Assigned to ${worker.name} (${worker.specialty}). Directive: ${directive || 'Execute repair per SLA.'}`,
      type: 'assignment',
      targetRole: 'field_worker',
    });

    addNotification({
      complaintId,
      title: `Your complaint ${complaintId} was assigned`,
      message: `Assigned to Field Specialist ${worker.name}. Scheduled target: ${new Date(deadline).toLocaleDateString()}.`,
      type: 'assignment',
      targetRole: 'citizen',
    });

    addAuditEvent(
      'Priya Sharma',
      'Ward Officer',
      complaintId,
      'WORKER_ASSIGNED',
      'Reported / Reviewed',
      'Assigned',
      `Assigned to ${worker.name} with ${priority.toUpperCase()} priority. Directive: ${directive || 'Standard repair'}`
    );

    showToast(`Task ${complaintId} assigned to ${worker.name}`);
  };

  // 3. Worker Starts Work
  const startWork = (complaintId: string) => {
    const now = new Date().toISOString();
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;
        return {
          ...c,
          status: 'in_progress',
          progress: Math.max(c.progress, 20),
          timeline: [
            ...c.timeline,
            {
              id: `tl-${Date.now()}`,
              title: 'Work initiated on site',
              description: 'Field specialist arrived on site and initiated preparatory clearance.',
              timestamp: now,
              actor: c.assignedWorker?.name || 'Field Specialist',
              role: 'Field Worker',
              type: 'in_progress',
            },
          ],
        };
      })
    );

    addNotification({
      complaintId,
      title: `Work initiated on ${complaintId}`,
      message: `Field crew has arrived on site at Lakeview Road. Work is underway.`,
      type: 'progress',
      targetRole: 'citizen',
    });

    addAuditEvent(
      'Field Specialist',
      'Field Worker',
      complaintId,
      'WORK_INITIATED',
      'Assigned',
      'In Progress (20%)',
      'Crew arrived on site, site secured and initial repair work initiated.'
    );

    showToast(`Work started on ${complaintId}`);
  };

  // 4. Worker Updates Progress
  const updateProgress = (complaintId: string, progress: number, notes?: string) => {
    const now = new Date().toISOString();
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;
        return {
          ...c,
          progress,
          crewStatusNote: notes || c.crewStatusNote,
          status: progress === 100 ? 'awaiting_verification' : 'in_progress',
          timeline: [
            ...c.timeline,
            {
              id: `tl-${Date.now()}`,
              title: `Progress updated to ${progress}%`,
              description: notes || `Field specialist updated site progress to ${progress}%.`,
              timestamp: now,
              actor: c.assignedWorker?.name || 'Field Specialist',
              role: 'Field Worker',
              type: 'in_progress',
            },
          ],
        };
      })
    );

    addNotification({
      complaintId,
      title: `Work is now ${progress}% complete`,
      message: `${complaintId} · Progress updated. ${notes || 'Repair progressing smoothly.'}`,
      type: 'progress',
      targetRole: 'citizen',
    });

    addAuditEvent(
      'Field Specialist',
      'Field Worker',
      complaintId,
      'PROGRESS_UPDATED',
      'In Progress',
      `In Progress (${progress}%)`,
      notes || `Progress adjusted to ${progress}%.`
    );

    showToast(`Progress updated to ${progress}%`);
  };

  // 5. Worker Pauses Task
  const pauseTask = (complaintId: string, reason: string) => {
    const now = new Date().toISOString();
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;
        return {
          ...c,
          status: 'paused',
          pauseReason: reason,
          pausedAt: now,
          timeline: [
            ...c.timeline,
            {
              id: `tl-${Date.now()}`,
              title: 'Work temporarily paused',
              description: `Reason: ${reason}`,
              timestamp: now,
              actor: c.assignedWorker?.name || 'Field Specialist',
              role: 'Field Worker',
              type: 'paused',
            },
          ],
        };
      })
    );

    addNotification({
      complaintId,
      title: `Task Paused: ${complaintId}`,
      message: `Worker paused task. Reason: ${reason}. Review required by Ward Officer.`,
      type: 'paused',
      targetRole: 'ward_officer',
    });

    addAuditEvent(
      'Field Specialist',
      'Field Worker',
      complaintId,
      'TASK_PAUSED',
      'In Progress',
      'Paused',
      `Task paused. Justification: ${reason}`
    );

    showToast(`Task ${complaintId} marked as paused.`);
  };

  // 6. Worker Resumes Task
  const resumeTask = (complaintId: string) => {
    const now = new Date().toISOString();
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;
        return {
          ...c,
          status: 'in_progress',
          pauseReason: undefined,
          pausedAt: undefined,
          timeline: [
            ...c.timeline,
            {
              id: `tl-${Date.now()}`,
              title: 'Work resumed on site',
              description: 'Clearance obtained / supplies received. Field specialist resumed active repair work.',
              timestamp: now,
              actor: c.assignedWorker?.name || 'Field Specialist',
              role: 'Field Worker',
              type: 'resumed',
            },
          ],
        };
      })
    );

    addNotification({
      complaintId,
      title: `Work Resumed: ${complaintId}`,
      message: `Field specialist resumed work on site. Target SLA remains active.`,
      type: 'progress',
      targetRole: 'ward_officer',
    });

    addAuditEvent(
      'Field Specialist',
      'Field Worker',
      complaintId,
      'WORK_RESUMED',
      'Paused',
      'In Progress',
      'Work resumed on site following resolution of pause constraint.'
    );

    showToast(`Work resumed on ${complaintId}`);
  };

  // 6.5 Save Draft After Photos
  const saveAfterPhotos = (complaintId: string, afterPhoto: string, additionalPhotos: string[] = []) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;
        return {
          ...c,
          photos: {
            ...c.photos,
            after: afterPhoto,
            additionalAfter: additionalPhotos,
          },
        };
      })
    );
    showToast('After-repair photographic evidence saved.');
  };

  // 7. Worker Submits Repair for Verification
  const submitRepair = (
    complaintId: string,
    afterPhoto: string,
    notes: string,
    additionalPhotos: string[] = []
  ) => {
    const target = complaints.find((c) => c.id === complaintId);
    const resolvedAfter =
      afterPhoto || target?.photos.after || getCategoryDefaultAfter(target?.category, target?.title);
    const now = new Date().toISOString();

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;
        return {
          ...c,
          status: 'awaiting_verification',
          progress: 100,
          photos: {
            ...c.photos,
            after: resolvedAfter,
            additionalAfter: additionalPhotos.length > 0 ? additionalPhotos : c.photos.additionalAfter,
          },
          crewStatusNote: notes || 'Repair completed according to municipal specification.',
          timeline: [
            ...c.timeline,
            {
              id: `tl-${Date.now()}`,
              title: 'Repair completed & submitted for review',
              description: `After photograph uploaded. Notes: ${notes || 'Standard repairs finished, site cleaned.'}`,
              timestamp: now,
              actor: c.assignedWorker?.name || 'Asha Nair',
              role: 'Field Worker',
              type: 'awaiting_verification',
            },
          ],
        };
      })
    );

    // Notify Ward Officer
    addNotification({
      complaintId,
      title: `Repair ready for verification: ${complaintId}`,
      message: `Field specialist submitted completed repair with before/after evidence. Review required.`,
      type: 'verification',
      targetRole: 'ward_officer',
    });

    // Notify Citizen
    addNotification({
      complaintId,
      title: `Repair completed: ${complaintId}`,
      message: `The road crew has completed work. Please inspect and confirm the repair.`,
      type: 'verification',
      targetRole: 'citizen',
    });

    addAuditEvent(
      'Asha Nair',
      'Field Worker',
      complaintId,
      'REPAIR_SUBMITTED_FOR_VERIFICATION',
      'In Progress (100%)',
      'Fixed — Awaiting Verification',
      `After photo and notes uploaded. Waiting for Ward Officer and Citizen review.`
    );

    showToast(`Repair submitted for verification!`);
  };

  // 8. Ward Officer Reviews Evidence
  const reviewEvidence = (complaintId: string, action: 'approve' | 'rework', notes?: string) => {
    const now = new Date().toISOString();
    if (action === 'approve') {
      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id !== complaintId) return c;
          return {
            ...c,
            timeline: [
              ...c.timeline,
              {
                id: `tl-${Date.now()}`,
                title: 'Evidence approved by Ward Officer',
                description: `Priya Sharma reviewed before/after photographs and verified municipal compliance. Pending citizen sign-off.`,
                timestamp: now,
                actor: 'Priya Sharma',
                role: 'Ward Officer',
                type: 'reviewed',
              },
            ],
          };
        })
      );

      addNotification({
        complaintId,
        title: `Officer Approved Repair: ${complaintId}`,
        message: `Ward officer Priya Sharma validated repair evidence. Citizen verification is now active.`,
        type: 'verification',
        targetRole: 'citizen',
      });

      addAuditEvent(
        'Priya Sharma',
        'Ward Officer',
        complaintId,
        'OFFICER_EVIDENCE_APPROVED',
        'Awaiting Verification',
        'Awaiting Verification (Officer Approved)',
        'Officer verified photographic evidence. Citizen confirmation window 48h active.'
      );

      showToast(`Evidence approved! Citizen confirmation requested.`);
    } else {
      // Request Rework
      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id !== complaintId) return c;
          return {
            ...c,
            status: 'in_progress',
            progress: 80,
            reworkNotes: notes || 'Photographic evidence inadequate or repair surface unfinished.',
            timeline: [
              ...c.timeline,
              {
                id: `tl-${Date.now()}`,
                title: 'Rework requested by Ward Officer',
                description: `Directive from Priya Sharma: ${notes || 'Repair evidence requires re-inspection and finishing.'}`,
                timestamp: now,
                actor: 'Priya Sharma',
                role: 'Ward Officer',
                type: 'in_progress',
              },
            ],
          };
        })
      );

      addNotification({
        complaintId,
        title: `Rework Requested: ${complaintId}`,
        message: `Ward officer requested rework. Reason: ${notes || 'Surface requires resurfacing / clearer photo.'}`,
        type: 'alert',
        targetRole: 'field_worker',
      });

      addAuditEvent(
        'Priya Sharma',
        'Ward Officer',
        complaintId,
        'REWORK_REQUESTED',
        'Awaiting Verification',
        'In Progress (Rework)',
        `Rework instructed: ${notes || 'Repair unfinished.'}`
      );

      showToast(`Rework requested from field worker.`);
    }
  };

  // 9. Citizen Verifies Fix or Disputes
  const citizenVerify = (complaintId: string, decision: 'confirm' | 'dispute', disputeReason?: string) => {
    const now = new Date().toISOString();
    if (decision === 'confirm') {
      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id !== complaintId) return c;
          return {
            ...c,
            status: 'verified',
            progress: 100,
            verifiedAt: now,
            verifiedBy: 'Aarav Kumar (Citizen)',
            timeline: [
              ...c.timeline,
              {
                id: `tl-${Date.now()}`,
                title: 'Citizen verified — Resolution confirmed',
                description: 'Aarav Kumar inspected the location and confirmed repair is fully resolved. Case officially closed.',
                timestamp: now,
                actor: 'Aarav Kumar',
                role: 'Citizen',
                type: 'verified',
              },
            ],
          };
        })
      );

      // Free worker slot
      const comp = complaints.find((c) => c.id === complaintId);
      if (comp?.assignedWorker) {
        setFieldWorkers((prev) =>
          prev.map((w) =>
            w.id === comp.assignedWorker?.id
              ? {
                  ...w,
                  activeTasksCount: Math.max(0, w.activeTasksCount - 1),
                  completedCount: w.completedCount + 1,
                }
              : w
          )
        );
      }

      addNotification({
        complaintId,
        title: `Complaint Verified: ${complaintId}`,
        message: `Citizen confirmed satisfactory repair. 5 points awarded to resident account.`,
        type: 'success',
        targetRole: 'ward_officer',
      });

      addAuditEvent(
        'Aarav Kumar',
        'Citizen',
        complaintId,
        'CITIZEN_CONFIRMED_RESOLUTION',
        'Awaiting Verification',
        'Verified',
        'Citizen verified repair outcome in person. Complaint officially closed.'
      );

      showToast(`Thank you! Repair marked as Citizen Verified.`);
    } else {
      // Citizen Disputes Repair
      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id !== complaintId) return c;
          return {
            ...c,
            status: 'reopened',
            disputeReason: disputeReason || 'Citizen reported the issue persists on site.',
            timeline: [
              ...c.timeline,
              {
                id: `tl-${Date.now()}`,
                title: 'Complaint disputed by citizen → Reopened',
                description: `Dispute note: "${disputeReason || 'Problem not fixed as described'}"`,
                timestamp: now,
                actor: 'Aarav Kumar',
                role: 'Citizen',
                type: 'reopened',
              },
            ],
          };
        })
      );

      addNotification({
        complaintId,
        title: `Citizen Dispute: ${complaintId} Reopened`,
        message: `Resident disputed fix: "${disputeReason || 'Issue persists'}". Ward Officer follow-up required.`,
        type: 'alert',
        targetRole: 'ward_officer',
      });

      addAuditEvent(
        'Aarav Kumar',
        'Citizen',
        complaintId,
        'CITIZEN_DISPUTED_REPAIR',
        'Awaiting Verification',
        'Reopened',
        `Citizen disputed repair: "${disputeReason || 'Unresolved'}"`
      );

      showToast(`Complaint reopened. Ward officer notified.`);
    }
  };

  // 10. Vote / Support Complaint
  const voteComplaint = (complaintId: string): boolean => {
    let success = false;
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;
        if (c.hasVoted) {
          showToast(`You have already supported this complaint.`);
          return c;
        }
        success = true;
        return {
          ...c,
          votes: c.votes + 1,
          hasVoted: true,
        };
      })
    );

    if (success) {
      addAuditEvent(
        'Aarav Kumar',
        'Citizen',
        complaintId,
        'VOTE_CAST',
        'N/A',
        'N/A',
        'Citizen supported complaint with "Me too" vote.'
      );
      showToast(`You supported this issue (+2 citizen points).`);
    }
    return success;
  };

  // 11. Escalate Complaint
  const escalateComplaint = (complaintId: string, reason: string, recipient: string) => {
    const now = new Date().toISOString();
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;
        return {
          ...c,
          priority: 'critical',
          escalatedTo: recipient,
          escalationReason: reason,
          escalatedAt: now,
          timeline: [
            ...c.timeline,
            {
              id: `tl-${Date.now()}`,
              title: `Escalation recorded: ${recipient}`,
              description: `Escalated due to: ${reason}`,
              timestamp: now,
              actor: role === 'super_admin' ? 'Vikramaditya Roy (Commissioner)' : 'Priya Sharma (Officer)',
              role: role === 'super_admin' ? 'Super Admin' : 'Ward Officer',
              type: 'escalated',
            },
          ],
        };
      })
    );

    addNotification({
      complaintId,
      title: `Formal Escalation: ${complaintId}`,
      message: `Escalated to ${recipient}. Action item: ${reason}`,
      type: 'alert',
      targetRole: 'ward_officer',
    });

    addAuditEvent(
      role === 'super_admin' ? 'Vikramaditya Roy' : 'Priya Sharma',
      role === 'super_admin' ? 'Super Admin' : 'Ward Officer',
      complaintId,
      'FORMAL_ESCALATION_RECORDED',
      'Normal / High',
      'Critical / Escalated',
      `Escalated to ${recipient}. Reason: ${reason}`
    );

    showToast(`Escalation logged for ${complaintId}`);
  };

  // 12. Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem(COMPLAINTS_STORAGE_KEY);
    localStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);
    localStorage.removeItem(AUDIT_STORAGE_KEY);
    localStorage.removeItem(WORKERS_STORAGE_KEY);
    setComplaints(ALL_INITIAL_COMPLAINTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditEvents(INITIAL_AUDIT_LOG);
    setFieldWorkers(FIELD_WORKERS);
    setSelectedComplaintId('UF-001');
    showToast('Demo data reset to fresh default state!');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        currentPage,
        navigateTo,
        login,
        logout,
        role,
        setRole,
        activeTab,
        setActiveTab,
        complaints,
        selectedComplaintId,
        setSelectedComplaintId,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        fieldWorkers,
        auditEvents,
        selectedWard,
        setSelectedWard,
        lightboxImage,
        setLightboxImage,
        toastMessage,
        showToast,
        submitComplaint,
        assignWorker,
        startWork,
        updateProgress,
        pauseTask,
        resumeTask,
        saveAfterPhotos,
        submitRepair,
        reviewEvidence,
        citizenVerify,
        voteComplaint,
        escalateComplaint,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

