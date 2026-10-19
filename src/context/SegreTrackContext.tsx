import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  CollectionRecord, 
  IncidentReport, 
  UserRole, 
  WasteGuideItem, 
  WorkerProfile, 
  ResidentProfile, 
  AdminProfile, 
  ToastMessage, 
  IncidentStatus, 
  CollectionStatus,
  TimelineEvent,
  IssueType,
  WasteStream
} from '../types';
import { 
  INITIAL_COLLECTIONS, 
  INITIAL_INCIDENTS, 
  WASTE_GUIDE_ITEMS, 
  DEMO_WORKERS, 
  DEMO_RESIDENT, 
  DEMO_ADMIN 
} from '../data/initialData';
import { getCurrentTimeString } from '../utils/formatters';

interface SegreTrackContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  collections: CollectionRecord[];
  incidents: IncidentReport[];
  wasteGuide: WasteGuideItem[];
  workers: WorkerProfile[];
  resident: ResidentProfile;
  admin: AdminProfile;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Workflows
  reportIncident: (data: {
    reporterRole: 'resident' | 'worker';
    reporterName: string;
    reporterId: string;
    reporterUnit?: string;
    issueType: IssueType;
    location: string;
    building: string;
    wasteStream: WasteStream;
    description: string;
    photoUrl?: string;
    photoName?: string;
  }) => string;

  updateIncidentStatus: (
    incidentId: string, 
    newStatus: IncidentStatus, 
    adminNote?: string, 
    correctiveAction?: string
  ) => void;

  startCollection: (collectionId: string) => void;
  completeCollection: (collectionId: string) => void;
  reassignCollection: (collectionId: string, newWorkerId: string) => void;
  resetDemoData: () => void;
}

const STORAGE_KEY_COLLECTIONS = 'segretrack_collections_demo_v2';
const STORAGE_KEY_INCIDENTS = 'segretrack_incidents_demo_v2';

const SegreTrackContext = createContext<SegreTrackContextType | undefined>(undefined);

export const SegreTrackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  
  // Initialize collections with localStorage fallback
  const [collections, setCollections] = useState<CollectionRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COLLECTIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_COLLECTIONS;
  });

  // Initialize incidents with localStorage fallback
  const [incidents, setIncidents] = useState<IncidentReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INCIDENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_INCIDENTS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COLLECTIONS, JSON.stringify(collections));
    } catch (e) {
      console.warn('Failed to persist collections to localStorage', e);
    }
  }, [collections]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INCIDENTS, JSON.stringify(incidents));
    } catch (e) {
      console.warn('Failed to persist incidents to localStorage', e);
    }
  }, [incidents]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, title, description, type }]);
    
    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Workflow 1 & 3: Report Incident
  const reportIncident = (data: {
    reporterRole: 'resident' | 'worker';
    reporterName: string;
    reporterId: string;
    reporterUnit?: string;
    issueType: IssueType;
    location: string;
    building: string;
    wasteStream: WasteStream;
    description: string;
    photoUrl?: string;
    photoName?: string;
  }): string => {
    // Generate next demo ID
    const nextNum = 1000 + incidents.length + 1;
    const newId = `INC-${nextNum}`;
    const currentTime = getCurrentTimeString();

    const initialTimeline: TimelineEvent = {
      id: `TL-${Date.now()}`,
      timestamp: `Today, ${currentTime}`,
      title: 'Report Submitted',
      description: `${data.reporterName} (${data.reporterRole}) submitted this report.`,
      author: data.reporterName,
      role: data.reporterRole
    };

    const newIncident: IncidentReport = {
      id: newId,
      reporterRole: data.reporterRole,
      reporterName: data.reporterName,
      reporterId: data.reporterId,
      reporterUnit: data.reporterUnit,
      issueType: data.issueType,
      location: data.location,
      building: data.building,
      wasteStream: data.wasteStream,
      description: data.description,
      reportedAt: `Today, ${currentTime}`,
      status: 'Pending Review',
      photoUrl: data.photoUrl,
      photoName: data.photoName,
      timeline: [initialTimeline]
    };

    setIncidents(prev => [newIncident, ...prev]);

    addToast(
      'Incident Report Created',
      `Assigned demo reference ${newId}. Visible in Administrator dashboard and My Reports.`,
      'success'
    );

    return newId;
  };

  // Workflow 4: Administrator updates incident status and notes
  const updateIncidentStatus = (
    incidentId: string, 
    newStatus: IncidentStatus, 
    adminNote?: string, 
    correctiveAction?: string
  ) => {
    const currentTime = getCurrentTimeString();

    setIncidents(prev => prev.map(inc => {
      if (inc.id !== incidentId) return inc;

      let eventTitle = 'Status Updated';
      let eventDesc = `Status updated to "${newStatus}" by Society Administration.`;

      if (newStatus === 'Under Review') {
        eventTitle = 'Review Initiated';
        eventDesc = adminNote || 'Supervisor dispatched to assess collection point.';
      } else if (newStatus === 'Action Planned') {
        eventTitle = 'Corrective Action Scheduled';
        eventDesc = correctiveAction || adminNote || 'Corrective instructions communicated to waste collection team.';
      } else if (newStatus === 'Resolved') {
        eventTitle = 'Incident Marked Resolved';
        eventDesc = correctiveAction || adminNote || 'Root cause addressed and verification completed.';
      }

      const newTimelineEvent: TimelineEvent = {
        id: `TL-${Date.now()}`,
        timestamp: `Today, ${currentTime}`,
        title: eventTitle,
        description: eventDesc,
        author: DEMO_ADMIN.name,
        role: 'admin'
      };

      return {
        ...inc,
        status: newStatus,
        administrativeNotes: adminNote ? adminNote : inc.administrativeNotes,
        correctiveAction: correctiveAction ? correctiveAction : inc.correctiveAction,
        timeline: [...inc.timeline, newTimelineEvent]
      };
    }));

    addToast(
      'Incident Status Updated',
      `${incidentId} set to "${newStatus}". Changes synced across all stakeholder views.`,
      'info'
    );
  };

  // Workflow 2: Worker starts a collection
  const startCollection = (collectionId: string) => {
    setCollections(prev => prev.map(col => {
      if (col.id !== collectionId) return col;
      return {
        ...col,
        status: 'In Progress' as CollectionStatus
      };
    }));

    addToast(
      'Collection Started',
      `Collection ${collectionId} is now marked In Progress.`,
      'info'
    );
  };

  // Workflow 2: Worker completes a collection
  const completeCollection = (collectionId: string) => {
    const timeStr = getCurrentTimeString();
    
    setCollections(prev => prev.map(col => {
      if (col.id !== collectionId) return col;
      return {
        ...col,
        status: 'Completed' as CollectionStatus,
        completedAt: timeStr
      };
    }));

    addToast(
      'Collection Completed!',
      `Collection ${collectionId} marked completed at ${timeStr}. Progress updated in Admin monitor.`,
      'success'
    );
  };

  // Workflow 5: Admin reassigns a collection
  const reassignCollection = (collectionId: string, newWorkerId: string) => {
    const targetWorker = DEMO_WORKERS.find(w => w.id === newWorkerId);
    if (!targetWorker) return;

    setCollections(prev => prev.map(col => {
      if (col.id !== collectionId) return col;
      return {
        ...col,
        assignedWorkerId: targetWorker.id,
        assignedWorkerName: targetWorker.name
      };
    }));

    addToast(
      'Collection Reassigned',
      `${collectionId} successfully transferred to ${targetWorker.name}.`,
      'success'
    );
  };

  // Reset demo state
  const resetDemoData = () => {
    setCollections(INITIAL_COLLECTIONS);
    setIncidents(INITIAL_INCIDENTS);
    localStorage.removeItem(STORAGE_KEY_COLLECTIONS);
    localStorage.removeItem(STORAGE_KEY_INCIDENTS);
    addToast(
      'Demo Data Reset',
      'Original sample collections, incidents, and timelines have been restored.',
      'info'
    );
  };

  return (
    <SegreTrackContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        collections,
        incidents,
        wasteGuide: WASTE_GUIDE_ITEMS,
        workers: DEMO_WORKERS,
        resident: DEMO_RESIDENT,
        admin: DEMO_ADMIN,
        toasts,
        addToast,
        removeToast,
        reportIncident,
        updateIncidentStatus,
        startCollection,
        completeCollection,
        reassignCollection,
        resetDemoData
      }}
    >
      {children}
    </SegreTrackContext.Provider>
  );
};

export const useSegreTrack = () => {
  const context = useContext(SegreTrackContext);
  if (!context) {
    throw new Error('useSegreTrack must be used within a SegreTrackProvider');
  }
  return context;
};
