import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard } from '../../components/common/StatCard';
import { CollectionMonitoring } from './CollectionMonitoring';
import { IncidentManagement } from './IncidentManagement';
import { RecurringIssues } from './RecurringIssues';
import { CollectionAnalytics } from './CollectionAnalytics';
import { WorkerCoordination } from './WorkerCoordination';
import { 
  LayoutDashboard, 
  Activity, 
  AlertOctagon, 
  Flame, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { admin, collections, incidents, workers } = useSegreTrack();
  const [activeTab, setActiveTab] = useState('overview');

  // Strictly calculate KPI numbers from shared frontend state
  const totalCollections = collections.length;
  const completedCollections = collections.filter(c => c.status === 'Completed').length;
  const pendingCollections = collections.filter(c => c.status !== 'Completed').length;
  const activeIncidents = incidents.filter(i => i.status !== 'Resolved').length;
  const resolvedIncidents = incidents.filter(i => i.status === 'Resolved').length;

  const completionRate = totalCollections > 0 
    ? Math.round((completedCollections / totalCollections) * 100) 
    : 0;

  const getPageTitle = () => {
    switch (activeTab) {
      case 'monitoring': return 'Society Collection Monitoring';
      case 'incidents': return 'Incident Management & Triage';
      case 'recurring': return 'Recurring Problem Identification';
      case 'analytics': return 'Collection Analytics & Reports';
      case 'coordination': return 'Worker Coordination & Routing';
      default: return 'Society Administrator Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case 'monitoring': return 'Real-time visibility into collection checkpoint progress across all buildings';
      case 'incidents': return 'Review resident & worker reports, assign corrective actions, and update statuses';
      case 'recurring': return 'Deterministic pattern detection highlighting repeated non-compliance hotspots';
      case 'analytics': return 'Visual metrics and breakdown of completion rates, waste streams, and issues';
      case 'coordination': return 'Field team workload distribution and dynamic checkpoint reassignment';
      default: return `Welcome, ${admin.name} • ${admin.societyName}`;
    }
  };

  return (
    <DashboardLayout
      activeRole="admin"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title={getPageTitle()}
      subtitle={getPageSubtitle()}
    >
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Welcome Administrator Hero */}
          <div className="bg-gradient-to-r from-[#174C3C] via-[#10382D] to-[#0C2A22] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#43A879]/20 text-[#E7F4EC] border border-[#43A879]/40 text-xs font-semibold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#43A879]" />
                Society Governance Console
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display leading-tight text-white mb-2">
                Operational Oversight: {admin.societyName}
              </h1>
              <p className="text-sm text-[#E7F4EC]/90 leading-relaxed mb-6">
                Active tracking across {totalCollections} designated collection points. Review incidents, monitor staff route completion, and identify repeated contamination hotspots.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('incidents')}
                  className="px-4 py-2.5 rounded-xl bg-[#43A879] hover:bg-[#3ba06e] text-white text-xs font-bold transition-all shadow-sm active:scale-98 flex items-center gap-2"
                >
                  <AlertOctagon className="w-4 h-4" />
                  <span>Review {activeIncidents} Active Incidents</span>
                </button>
                <button
                  onClick={() => setActiveTab('monitoring')}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20 flex items-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  <span>View Collection Monitor</span>
                </button>
              </div>
            </div>
          </div>

          {/* KPI Stat Cards (5 Core Required Stats) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              title="Collection Points"
              value={totalCollections}
              subtitle="Society-wide checkpoints"
              icon={<Activity className="w-5 h-5" />}
              colorVariant="default"
              onClick={() => setActiveTab('monitoring')}
            />
            <StatCard
              title="Completed Collections"
              value={completedCollections}
              subtitle={`${completionRate}% total cleared`}
              icon={<CheckCircle2 className="w-5 h-5" />}
              colorVariant="green"
              trend={`${completionRate}%`}
              onClick={() => setActiveTab('monitoring')}
            />
            <StatCard
              title="Pending Collections"
              value={pendingCollections}
              subtitle="Awaiting clearance or in route"
              icon={<Clock className="w-5 h-5" />}
              colorVariant="blue"
              onClick={() => setActiveTab('monitoring')}
            />
            <StatCard
              title="Active Incidents"
              value={activeIncidents}
              subtitle="Require administrator triage"
              icon={<AlertOctagon className="w-5 h-5" />}
              colorVariant={activeIncidents > 0 ? "amber" : "default"}
              onClick={() => setActiveTab('incidents')}
            />
            <StatCard
              title="Resolved Incidents"
              value={resolvedIncidents}
              subtitle="Corrective actions applied"
              icon={<ShieldCheck className="w-5 h-5" />}
              colorVariant="green"
              onClick={() => setActiveTab('incidents')}
            />
          </div>

          {/* Quick Management Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setActiveTab('recurring')}
              className="bg-white rounded-2xl p-5 border border-amber-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#17251F] font-display mb-1">
                  Recurring Issues & Hotspots
                </h3>
                <p className="text-xs text-[#66756D] leading-relaxed">
                  Detect multiple reports at the same building to initiate audits and staff briefings before waste mixing escalates.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-800 mt-4 pt-3 border-t border-amber-100">
                <span>Inspect Hotspots</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => setActiveTab('analytics')}
              className="bg-white rounded-2xl p-5 border border-[#E2EAE4] hover:border-[#43A879]/50 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#17251F] font-display mb-1">
                  Collection Analytics
                </h3>
                <p className="text-xs text-[#66756D] leading-relaxed">
                  Examine visual charts for route progress, stream distribution, and incident categorizations.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#174C3C] mt-4 pt-3 border-t border-[#E2EAE4]">
                <span>View Charts</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => setActiveTab('coordination')}
              className="bg-white rounded-2xl p-5 border border-[#E2EAE4] hover:border-[#43A879]/50 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E7F4EC] text-[#174C3C] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#17251F] font-display mb-1">
                  Worker Coordination
                </h3>
                <p className="text-xs text-[#66756D] leading-relaxed">
                  View {workers.length} field staff assignments and rebalance pending checkpoints between workers in real time.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#174C3C] mt-4 pt-3 border-t border-[#E2EAE4]">
                <span>Reassign Points</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Recent Urgent Incidents Awaiting Review */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#17251F] font-display">
                  Urgent Incidents Awaiting Administrative Review
                </h3>
                <p className="text-xs text-[#66756D]">Priority reports flagged by residents or collection staff</p>
              </div>
              <button
                onClick={() => setActiveTab('incidents')}
                className="text-xs font-semibold text-[#174C3C] hover:underline"
              >
                Open Full Triage Hub &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {incidents.slice(0, 3).map(inc => (
                <div
                  key={inc.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#174C3C] bg-[#E7F4EC] px-2 py-0.5 rounded">
                        {inc.id}
                      </span>
                      <span className="font-bold text-xs text-[#17251F]">{inc.issueType}</span>
                      <span className="text-[10px] text-[#66756D] uppercase font-semibold">
                        ({inc.reporterRole})
                      </span>
                    </div>
                    <p className="text-xs text-[#66756D] flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#174C3C]" />
                      <span>{inc.location} ({inc.building}) • {inc.reportedAt}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setActiveTab('incidents')}
                      className="px-3 py-1.5 rounded-lg bg-[#174C3C] text-white text-xs font-semibold hover:bg-[#10382D] transition-colors"
                    >
                      Review Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'monitoring' && <CollectionMonitoring />}
      {activeTab === 'incidents' && <IncidentManagement />}
      {activeTab === 'recurring' && <RecurringIssues />}
      {activeTab === 'analytics' && <CollectionAnalytics />}
      {activeTab === 'coordination' && <WorkerCoordination />}
    </DashboardLayout>
  );
};
