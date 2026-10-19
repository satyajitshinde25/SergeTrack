import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { CollectionSchedule } from './CollectionSchedule';
import { WasteGuide } from './WasteGuide';
import { ReportIncidentForm } from './ReportIncidentForm';
import { MyReports } from './MyReports';
import { 
  CalendarDays, 
  AlertTriangle, 
  ClipboardList, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const ResidentDashboard: React.FC = () => {
  const { resident, collections, incidents } = useSegreTrack();
  const [activeTab, setActiveTab] = useState('overview');
  const [highlightIncidentId, setHighlightIncidentId] = useState<string | null>(null);

  // Derive stats dynamically from shared state
  const myBuildingCollections = collections.filter(c => c.building === resident.building);
  const completedToday = myBuildingCollections.filter(c => c.status === 'Completed').length;
  const inProgressToday = myBuildingCollections.filter(c => c.status === 'In Progress').length;
  
  const myReports = incidents.filter(i => i.reporterId === resident.id);
  const myPendingReports = myReports.filter(i => i.status !== 'Resolved');

  // Next scheduled or active collection
  const nextCollection = myBuildingCollections.find(c => c.status === 'In Progress') ||
    myBuildingCollections.find(c => c.status === 'Pending') ||
    myBuildingCollections[0];

  const handleReportSuccess = (newId: string) => {
    setHighlightIncidentId(newId);
    setActiveTab('my-reports');
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'schedule': return 'Collection Schedule & Status';
      case 'guide': return 'Household Waste Segregation Guide';
      case 'report': return 'Report Collection Issue';
      case 'my-reports': return 'My Incident Reports & Tracking';
      default: return 'Resident Portal';
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case 'schedule': return 'Scheduled collection timings and waste stream categories for your block';
      case 'guide': return 'Learn what goes into Wet, Dry, and Special hazardous waste streams';
      case 'report': return 'Report mixed waste, skipped chutes, or delays directly to management';
      case 'my-reports': return 'View updates, administrative actions, and resolution timelines';
      default: return `Welcome, ${resident.name} (${resident.building}, ${resident.flat})`;
    }
  };

  return (
    <DashboardLayout
      activeRole="resident"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title={getPageTitle()}
      subtitle={getPageSubtitle()}
    >
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Welcome greeting card */}
          <div className="bg-gradient-to-r from-[#174C3C] via-[#10382D] to-[#0C2A22] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#43A879]/20 text-[#E7F4EC] border border-[#43A879]/40 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#43A879]" />
                Resident Portal
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display leading-tight text-white mb-2">
                Good day, {resident.name}!
              </h1>
              <p className="text-sm text-[#E7F4EC]/90 leading-relaxed mb-6">
                Your household waste segregation directly preserves recycling integrity. Keep wet organics, dry clean recyclables, and special items separated before collection.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('report')}
                  className="px-4 py-2.5 rounded-xl bg-[#43A879] hover:bg-[#3ba06e] text-white text-xs font-bold transition-all shadow-sm active:scale-98 flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Report Mixed Waste</span>
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20 flex items-center gap-2"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>View Today's Schedule</span>
                </button>
              </div>
            </div>

            {/* Subtle decorative leaf background */}
            <div className="absolute right-4 bottom-2 opacity-10 pointer-events-none hidden lg:block">
              <svg width="220" height="220" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C7.03 2 3 6.03 3 11C3 15.97 7.03 20 12 20C16.97 20 21 15.97 21 11C21 6.03 16.97 2 12 2Z" />
              </svg>
            </div>
          </div>

          {/* KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Today's Collections"
              value={`${completedToday}/${myBuildingCollections.length}`}
              subtitle={`${completedToday} completed, ${inProgressToday} in progress in ${resident.building}`}
              icon={<CheckCircle2 className="w-5 h-5" />}
              colorVariant="green"
              onClick={() => setActiveTab('schedule')}
            />
            <StatCard
              title="Next Round"
              value={nextCollection ? nextCollection.scheduledTime : '--'}
              subtitle={nextCollection ? `${nextCollection.collectionPoint.split('-')[0]}` : 'No further rounds'}
              icon={<Clock className="w-5 h-5" />}
              colorVariant="blue"
              onClick={() => setActiveTab('schedule')}
            />
            <StatCard
              title="My Reports"
              value={myReports.length}
              subtitle="Total collection issues logged by you"
              icon={<ClipboardList className="w-5 h-5" />}
              colorVariant="default"
              onClick={() => setActiveTab('my-reports')}
            />
            <StatCard
              title="Awaiting Action"
              value={myPendingReports.length}
              subtitle={myPendingReports.length > 0 ? "Under administration review" : "All issues resolved!"}
              icon={<ShieldAlert className="w-5 h-5" />}
              colorVariant={myPendingReports.length > 0 ? "amber" : "green"}
              onClick={() => setActiveTab('my-reports')}
            />
          </div>

          {/* Quick Action Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              onClick={() => setActiveTab('schedule')}
              className="bg-white rounded-2xl p-5 border border-[#E2EAE4] hover:border-[#43A879]/50 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#17251F] font-display mb-1">
                  Collection Schedule
                </h3>
                <p className="text-xs text-[#66756D] leading-relaxed">
                  Check scheduled morning and afternoon rounds for wet, dry, and special waste streams.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#174C3C] mt-4 pt-3 border-t border-[#E2EAE4]">
                <span>View Timetable</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('guide')}
              className="bg-white rounded-2xl p-5 border border-[#E2EAE4] hover:border-[#43A879]/50 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E7F4EC] text-[#174C3C] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#17251F] font-display mb-1">
                  Waste Segregation Guide
                </h3>
                <p className="text-xs text-[#66756D] leading-relaxed">
                  Searchable encyclopedia of peels, plastics, glass, cardboard, and special hazard items.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#174C3C] mt-4 pt-3 border-t border-[#E2EAE4]">
                <span>Explore Directory</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('report')}
              className="bg-white rounded-2xl p-5 border border-amber-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#17251F] font-display mb-1">
                  Report Waste Mixing
                </h3>
                <p className="text-xs text-[#66756D] leading-relaxed">
                  Notice your segregated garbage being poured into a single cart? Report it with proof to initiate audit.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-800 mt-4 pt-3 border-t border-amber-100">
                <span>File Incident Report</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Today's Building A Collections Preview */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#17251F] font-display">
                  Today's Activity at {resident.building}
                </h3>
                <p className="text-xs text-[#66756D]">Live status for chute and floor collection points</p>
              </div>
              <button
                onClick={() => setActiveTab('schedule')}
                className="text-xs font-semibold text-[#174C3C] hover:underline"
              >
                View Full Schedule
              </button>
            </div>

            <div className="space-y-3">
              {myBuildingCollections.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4]"
                >
                  <div className="flex items-center gap-3">
                    <StatusBadge status={item.wasteStream} size="sm" />
                    <div>
                      <h4 className="text-xs font-bold text-[#17251F]">{item.collectionPoint}</h4>
                      <p className="text-[11px] text-[#66756D] mt-0.5">
                        Scheduled: {item.scheduledTime} • Assigned: {item.assignedWorkerName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && <CollectionSchedule />}
      {activeTab === 'guide' && <WasteGuide />}
      {activeTab === 'report' && <ReportIncidentForm onSuccessRedirect={handleReportSuccess} />}
      {activeTab === 'my-reports' && (
        <MyReports 
          onNewReportClick={() => setActiveTab('report')}
          highlightId={highlightIncidentId}
        />
      )}
    </DashboardLayout>
  );
};
