export type UserRole = 'citizen' | 'ward' | 'officer' | 'ward_officer' | 'field_worker' | 'super_admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  ward?: string;
  avatarInitials: string;
}

export type ComplaintCategory =
  | 'pothole'
  | 'garbage'
  | 'streetlight'
  | 'water_leakage'
  | 'footpath'
  | 'drain'
  | 'toilet'
  | 'bus_stop';

export type ComplaintStatus =
  | 'reported'
  | 'reviewed'
  | 'assigned'
  | 'in_progress'
  | 'paused'
  | 'awaiting_verification'
  | 'verified'
  | 'reopened';

export type ComplaintPriority = 'low' | 'normal' | 'high' | 'critical';

export interface LocationInfo {
  address: string;
  landmark: string;
  ward: string;
  lat: number;
  lng: number;
}

export interface ComplaintPhotos {
  before: string;
  progress?: string;
  after?: string;
  additionalAfter?: string[];
}

export interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  actor: string;
  role: string;
  type: 'reported' | 'reviewed' | 'assigned' | 'in_progress' | 'paused' | 'resumed' | 'awaiting_verification' | 'verified' | 'reopened' | 'escalated';
}

export interface Complaint {
  id: string; // e.g. "UF-001"
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  location: LocationInfo;
  citizen: {
    name: string;
    email: string;
    phone: string;
    isAnonymous: boolean;
  };
  reportedAt: string;
  deadline: string;
  progress: number; // 0 - 100
  votes: number;
  hasVoted?: boolean;
  assignedWorker?: {
    id: string;
    name: string;
    specialty: string;
    ward: string;
    phone: string;
  };
  assignedOfficer?: {
    id?: string;
    name: string;
    ward: string;
  };
  officialDirective?: string;
  safetyInstructions?: string;
  pauseReason?: string;
  pausedAt?: string;
  photos: ComplaintPhotos;
  timeline: TimelineEntry[];
  reworkNotes?: string;
  disputeReason?: string;
  crewStatusNote?: string;
  escalatedTo?: string;
  escalationReason?: string;
  escalatedAt?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface NotificationItem {
  id: string;
  complaintId?: string;
  title: string;
  message: string;
  type: 'info' | 'progress' | 'assignment' | 'alert' | 'success' | 'paused' | 'verification';
  timestamp: string;
  isRead: boolean;
  targetRole: UserRole | 'all';
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  complaintId?: string;
  action: string;
  previousState?: string;
  newState?: string;
  details: string;
}

export interface FieldWorker {
  id: string;
  name: string;
  specialty: string;
  ward: string;
  phone: string;
  avatar: string;
  activeTasksCount: number;
  maxTasks: number;
  completedCount: number;
  shift: string;
  isAvailable: boolean;
  rating: number;
  onDuty: boolean;
}

export interface WardInfo {
  id: string;
  name: string;
  number: number;
  zone: string;
  jurisdiction: string;
  wardOfficer: string;
  fieldWorkersCount: number;
  totalComplaints: number;
  activeComplaints: number;
  overdueComplaints: number;
  resolutionRate: number;
  center: [number, number];
}

export interface CitizenUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  ward: string;
  points: number;
  badges: { id: string; name: string; description: string; icon: string }[];
  preferences: {
    anonymousByDefault: boolean;
    notificationsEnabled: boolean;
    preferredLanguage: string;
  };
}

