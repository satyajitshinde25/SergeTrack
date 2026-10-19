import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { History, CheckCircle2, Clock, MapPin, Filter } from 'lucide-react';

export const CollectionHistory: React.FC = () => {
  const { collections, workers } = useSegreTrack();
  const worker = workers[0];

  const [streamFilter, setStreamFilter] = useState('all');

  const completedList = collections.filter(
    c => c.assignedWorkerId === worker.id && c.status === 'Completed'
  );

  const filteredHistory = completedList.filter(item => {
    if (streamFilter !== 'all' && item.wasteStream !== streamFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="w-4 h-4 text-[#174C3C]" />
            <span className="text-xs uppercase font-bold tracking-wider text-[#66756D]">
              Activity Audit Trail
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#17251F]">
            Completed Collections Log
          </h2>
          <p className="text-xs text-[#66756D] mt-1 max-w-xl">
            Verified records of cleared collection points, completion timestamps, and waste stream categories.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-[#66756D]" />
          <select
            value={streamFilter}
            onChange={(e) => setStreamFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="all">All Streams ({completedList.length})</option>
            <option value="Wet Waste">Wet Waste</option>
            <option value="Dry Waste">Dry Waste</option>
            <option value="Special Waste">Special Waste</option>
          </select>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <EmptyState
          title="No completed collections yet"
          description="Go to Today's Collections tab, start a pending collection, and mark it as completed to view it here in your audit trail."
        />
      ) : (
        <div className="space-y-3">
          {filteredHistory.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-[#E2EAE4] hover:border-[#43A879]/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#174C3C] bg-[#E7F4EC] px-2 py-0.5 rounded border border-[#43A879]/30">
                    {item.id}
                  </span>
                  <StatusBadge status={item.wasteStream} size="sm" />
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#174C3C] bg-[#E7F4EC] px-2.5 py-1 rounded-full border border-[#43A879]/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#43A879]" />
                    <span>Verified Completed</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#17251F] font-display">
                  {item.collectionPoint}
                </h3>

                <div className="flex items-center gap-3 text-xs text-[#66756D]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#174C3C]" />
                    {item.building}
                  </span>
                  <span>•</span>
                  <span>Scheduled: {item.scheduledTime}</span>
                </div>
              </div>

              <div className="sm:text-right p-3 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4] shrink-0">
                <div className="flex items-center sm:justify-end gap-1.5 text-xs text-[#174C3C] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#43A879]" />
                  <span>Cleared at {item.completedAt || 'Recorded'}</span>
                </div>
                <span className="text-[11px] text-[#66756D] block mt-0.5">
                  Handled by {item.assignedWorkerName}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
