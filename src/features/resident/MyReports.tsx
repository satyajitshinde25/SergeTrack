import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { IncidentDetailModal } from './IncidentDetailModal';
import { IncidentReport } from '../../types';
import { ClipboardList, Eye, MapPin, Calendar, Clock, Filter } from 'lucide-react';

interface MyReportsProps {
  onNewReportClick?: () => void;
  highlightId?: string | null;
}

export const MyReports: React.FC<MyReportsProps> = ({ onNewReportClick, highlightId }) => {
  const { incidents, resident } = useSegreTrack();

  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null);
  const [filterScope, setFilterScope] = useState<'mine' | 'all'>('mine');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const displayedIncidents = incidents.filter(inc => {
    if (filterScope === 'mine' && inc.reporterId !== resident.id) return false;
    if (statusFilter !== 'all' && inc.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList className="w-4 h-4 text-[#174C3C]" />
            <span className="text-xs uppercase font-bold tracking-wider text-[#66756D]">
              Incident Tracking Log
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#17251F]">
            My Incident Reports & Society Updates
          </h2>
          <p className="text-xs text-[#66756D] mt-1 max-w-xl">
            Track status changes, admin corrective actions, and inspection outcomes in real time.
          </p>
        </div>

        {onNewReportClick && (
          <button
            onClick={onNewReportClick}
            className="px-4 py-2.5 rounded-xl bg-[#174C3C] text-white text-xs font-bold hover:bg-[#10382D] transition-colors shadow-xs shrink-0"
          >
            + Report New Issue
          </button>
        )}
      </div>

      {/* Filter and Tab controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E2EAE4] shadow-xs">
        <div className="flex items-center gap-1.5 p-1 bg-[#F8FAF7] rounded-lg border border-[#E2EAE4]">
          <button
            onClick={() => setFilterScope('mine')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              filterScope === 'mine'
                ? 'bg-white text-[#174C3C] shadow-xs'
                : 'text-[#66756D] hover:text-[#17251F]'
            }`}
          >
            My Reports ({incidents.filter(i => i.reporterId === resident.id).length})
          </button>
          <button
            onClick={() => setFilterScope('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              filterScope === 'all'
                ? 'bg-white text-[#174C3C] shadow-xs'
                : 'text-[#66756D] hover:text-[#17251F]'
            }`}
          >
            All Society Reports ({incidents.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#66756D]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="all">All Statuses</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Under Review">Under Review</option>
            <option value="Action Planned">Action Planned</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Incident List */}
      {displayedIncidents.length === 0 ? (
        <EmptyState
          title="No incident reports to show"
          description={
            filterScope === 'mine'
              ? "You haven't submitted any reports yet or none match your selected status filter."
              : "No reports match the current filter criteria."
          }
          action={
            filterScope === 'mine' && onNewReportClick
              ? {
                  label: "Submit a Report",
                  onClick: onNewReportClick
                }
              : undefined
          }
        />
      ) : (
        <div className="space-y-3">
          {displayedIncidents.map(inc => {
            const isHighlighted = highlightId === inc.id;
            const latestTimelineEvent = inc.timeline[inc.timeline.length - 1];

            return (
              <div
                key={inc.id}
                className={`bg-white rounded-2xl p-5 border transition-all duration-200 ${
                  isHighlighted 
                    ? 'border-[#43A879] ring-2 ring-[#E7F4EC]' 
                    : 'border-[#E2EAE4] hover:border-[#43A879]/40'
                } shadow-xs`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-xs font-bold text-[#174C3C] bg-[#E7F4EC] px-2 py-0.5 rounded border border-[#43A879]/30">
                      {inc.id}
                    </span>
                    <StatusBadge status={inc.status} />
                    <StatusBadge status={inc.wasteStream} size="sm" />
                    {inc.reporterId === resident.id && (
                      <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-medium">
                        Submitted by You
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#66756D]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{inc.reportedAt}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#17251F] font-display mb-1">
                  {inc.issueType}
                </h3>

                <p className="text-xs text-[#66756D] flex items-center gap-1.5 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#174C3C]" />
                  <span>{inc.location} ({inc.building})</span>
                </p>

                <p className="text-xs text-[#17251F] leading-relaxed mb-3 line-clamp-2 bg-[#F8FAF7] p-3 rounded-xl border border-[#E2EAE4]">
                  {inc.description}
                </p>

                {/* Latest status update note */}
                {latestTimelineEvent && (
                  <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#E2EAE4] text-xs">
                    <div className="min-w-0">
                      <span className="font-semibold text-[#174C3C]">Latest Update: </span>
                      <span className="text-[#66756D] truncate">{latestTimelineEvent.title} — {latestTimelineEvent.description}</span>
                    </div>

                    <button
                      onClick={() => setSelectedIncident(inc)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2EAE4] hover:bg-stone-50 text-xs font-semibold text-[#174C3C] transition-colors shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Timeline</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Details modal */}
      <IncidentDetailModal
        incident={selectedIncident}
        isOpen={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
};
