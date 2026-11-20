import { INITIAL_COMPLAINTS } from './complaintsData';
import { ADDITIONAL_COMPLAINTS } from './additionalComplaints';
import { Complaint } from '../types';

export const ALL_INITIAL_COMPLAINTS: Complaint[] = [
  ...INITIAL_COMPLAINTS,
  ...ADDITIONAL_COMPLAINTS,
];

// Helper to seed localStorage cleanly
export const COMPLAINTS_STORAGE_KEY = 'urbanfix_complaints_v1';
export const NOTIFICATIONS_STORAGE_KEY = 'urbanfix_notifications_v1';
export const AUDIT_STORAGE_KEY = 'urbanfix_audit_v1';
export const CURRENT_ROLE_KEY = 'urbanfix_active_role_v1';
export const VOTED_COMPLAINTS_KEY = 'urbanfix_voted_complaints_v1';
export const WORKERS_STORAGE_KEY = 'urbanfix_workers_v1';

