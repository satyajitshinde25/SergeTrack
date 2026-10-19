import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AssignedCollections } from './AssignedCollections';
import { WorkerIssueForm } from './WorkerIssueForm';
import { CollectionHistory } from './CollectionHistory';
import { WasteStream } from '../../types';
import { 
  CheckSquare, 
  AlertTriangle, 
  History, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const WorkerDashboard: React.FC = () => {
  const { workers, collections, incidents } = useSegreTrack();
  const worker = workers[0]; // Ramesh Patil

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPointForIssue, setSelectedPointForIssue] = useState<{
    point: string;
    building: string;
    stream: WasteStream;
  }>({
    point: 'Building B - Ground Collection Room',
    building: 'Building B',
    stream: 'Wet Waste'
  });

  // Calculate statistics for Ramesh
  const myCollections = collections.filter(c => c.assignedWorkerId === worker.id);
  const completedCount = myCollections.filter(c => c.status === 'Completed').length;
  const inProgressCount = myCollections.filter(c => c.status === 'In Progress').length;
  const pendingCount = myCollections.filter(c => c.status === 'Pending').length;
  
  const completionPercentage = myCollections.length > 0 
    ? Math.round((completedCount / myCollections.length) * 100) 
    : 0;

  const myReportedIssues = incidents.filter(i => i.reporterId === worker.id);

  const handleReportIssueTrigger = (pointName: string, buildingName: string, stream: WasteStream) => {
    setSelectedPointForIssue({ point: pointName, building: buildingName, stream });
    setActiveTab('report');
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'collections': return "Today's Assigned Collections";
      case 'report': return 'Report Operational Issue';
      case 'history': return 'Completed Collections Log';
      default: return 'Collection Worker Portal';
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case 'collections': return 'Field checkpoints, collection start/completion controls, and instructions';
      case 'report': return 'Log unsegregated bins or blocked access ramps for administrative action';
      case 'history': return 'Chronological audit trail of cleared points and timestamps';
      default: return `Welcome, ${worker.name} • ${worker.assignedSector}`;
    }
  };

  return (
    <DashboardLayout
      activeRole="worker"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title={getPageTitle()}
      subtitle={getPageSubtitle()}
    >
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Worker Hero Banner */}
          <div className="bg-gradient-to-r from-[#174C3C] via-[#10382D] to-[#0C2A22] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#43A879]/20 text-[#E7F4EC] border border-[#43A879]/40 text-xs font-semibold uppercase tracking-wider mb-3">
                <Truck className="w-3.5 h-3.5 text-[#43A879]" />
                Field Operations Console
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display leading-tight text-white mb-2">
                Shift In Progress: {worker.name}
              </h1>
              <p className="text-sm text-[#E7F4EC]/90 leading-relaxed mb-6">
                Assigned to {worker.assignedSector}. Ensure dual-compartment trolleys remain strictly segregated throughout collection.
              </p>

              {/* Today's Completion Progress Bar */}
              <div className="bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-xs max-w-lg mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-white">Route Completion Progress</span>
                  <span className="font-bold text-[#43A879]">{completionPercentage}% Completed</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-[#43A879] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#C4D3C9] mt-2">
                  <span>{completedCount} Cleared</span>
                  <span>{inProgressCount} In Progress</span>
                  <span>{pendingCount} Remaining</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('collections')}
                  className="px-4 py-2.5 rounded-xl bg-[#43A879] hover:bg-[#3ba06e] text-white text-xs font-bold transition-all shadow-sm active:scale-98 flex items-center gap-2"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Open Route Checkpoints</span>
                </button>
                <button
                  onClick={() => setActiveTab('report')}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20 flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Report Field Issue</span>
                </button>
              </div>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Assigned Points"
              value={myCollections.length}
              subtitle="Total checkpoints today"
              icon={<CheckSquare className="w-5 h-5" />}
              colorVariant="default"
              onClick={() => setActiveTab('collections')}
            />
            <StatCard
              title="Cleared / Completed"
              value={completedCount}
              subtitle={`${completionPercentage}% completed on route`}
              icon={<CheckCircle2 className="w-5 h-5" />}
              colorVariant="green"
              trend={`${completionPercentage}%`}
              onClick={() => setActiveTab('history')}
            />
            <StatCard
              title="Pending Clearance"
              value={pendingCount + inProgressCount}
              subtitle={`${inProgressCount} currently active`}
              icon={<Clock className="w-5 h-5" />}
              colorVariant="blue"
              onClick={() => setActiveTab('collections')}
            />
            <StatCard
              title="Reported Issues"
              value={myReportedIssues.length}
              subtitle="Contamination or ramp obstacles"
              icon={<AlertTriangle className="w-5 h-5" />}
              colorVariant={myReportedIssues.length > 0 ? "amber" : "default"}
              onClick={() => setActiveTab('report')}
            />
          </div>

          {/* Next checkpoints preview */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#17251F] font-display">
                  Active & Next Checkpoints
                </h3>
                <p className="text-xs text-[#66756D]">Prioritized route checkpoints for {worker.name}</p>
              </div>
              <button
                onClick={() => setActiveTab('collections')}
                className="text-xs font-semibold text-[#174C3C] hover:underline"
              >
                View All ({myCollections.length})
              </button>
            </div>

            <div className="space-y-3">
              {myCollections.slice(0, 3).map(item => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4]"
                >
                  <div className="flex items-center gap-3">
                    <StatusBadge status={item.wasteStream} size="sm" />
                    <div>
                      <h4 className="text-xs font-bold text-[#17251F]">{item.collectionPoint}</h4>
                      <p className="text-[11px] text-[#66756D] mt-0.5">
                        Area: {item.building} • Scheduled: {item.scheduledTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge status={item.status} />
                    <button
                      onClick={() => setActiveTab('collections')}
                      className="text-xs font-semibold text-[#174C3C] hover:underline"
                    >
                      Manage &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'collections' && (
        <AssignedCollections onReportIssueForPoint={handleReportIssueTrigger} />
      )}
      {activeTab === 'report' && (
        <WorkerIssueForm
          initialPoint={selectedPointForIssue.point}
          initialBuilding={selectedPointForIssue.building}
          initialStream={selectedPointForIssue.stream}
          onSuccess={() => setActiveTab('collections')}
        />
      )}
      {activeTab === 'history' && <CollectionHistory />}
    </DashboardLayout>
  );
};
