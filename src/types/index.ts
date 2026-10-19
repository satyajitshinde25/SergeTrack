export type UserRole = 'resident' | 'worker' | 'admin' | 'public';

export type WasteStream = 'Wet Waste' | 'Dry Waste' | 'Special Waste';

export type CollectionStatus = 'Pending' | 'In Progress' | 'Completed' | 'Delayed' | 'Issue Reported';

export type IncidentStatus = 'Pending Review' | 'Under Review' | 'Action Planned' | 'Resolved';

export type ResidentIssueType = 
  | 'Wet and dry waste mixed during collection'
  | 'Collection missed'
  | 'Collection delayed'
  | 'Waste category handled incorrectly'
  | 'Other collection issue';

export type WorkerIssueType =
  | 'Waste streams already mixed'
  | 'Collection point inaccessible'
  | 'Waste not segregated at source'
  | 'Collection delayed'
  | 'Other operational issue';

export type IssueType = ResidentIssueType | WorkerIssueType;

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  author: string;
  role: 'resident' | 'worker' | 'admin' | 'system';
}

export interface IncidentReport {
  id: string;
  reporterRole: 'resident' | 'worker';
  reporterName: string;
  reporterId: string;
  reporterUnit?: string;
  issueType: IssueType;
  location: string;
  building: string;
  wasteStream: WasteStream;
  description: string;
  reportedAt: string;
  status: IncidentStatus;
  photoUrl?: string;
  photoName?: string;
  administrativeNotes?: string;
  correctiveAction?: string;
  timeline: TimelineEvent[];
}

export interface CollectionRecord {
  id: string;
  collectionPoint: string;
  building: string;
  wasteStream: WasteStream;
  scheduledDate: string;
  scheduledTime: string;
  assignedWorkerId: string;
  assignedWorkerName: string;
  status: CollectionStatus;
  completedAt?: string;
  instructions: string;
  notes?: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  phone: string;
  assignedSector: string;
  avatar: string;
  activeCollectionId?: string;
}

export interface ResidentProfile {
  id: string;
  name: string;
  building: string;
  flat: string;
  phone: string;
}

export interface AdminProfile {
  id: string;
  name: string;
  roleTitle: string;
  societyName: string;
}

export interface WasteGuideItem {
  id: string;
  name: string;
  category: WasteStream;
  subCategory: string;
  instructions: string;
  iconName: string;
  doAndDont: {
    dos: string[];
    donts: string[];
  };
}

export interface RecurringIssueHotspot {
  location: string;
  incidentCount: number;
  primaryIssueType: string;
  openIncidents: number;
  recommendation: string;
  severity: 'high' | 'medium' | 'low';
  incidents: IncidentReport[];
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
