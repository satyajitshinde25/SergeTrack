import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { CollectionStatus, WasteStream } from '../../types';
import { 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Filter, 
  Sparkles, 
  Info 
} from 'lucide-react';

interface AssignedCollectionsProps {
  onReportIssueForPoint?: (pointName: string, building: string, stream: WasteStream) => void;
}

export const AssignedCollections: React.FC<AssignedCollectionsProps> = ({
  onReportIssueForPoint
}) => {
  const { collections, workers, startCollection, completeCollection } = useSegreTrack();
  const currentWorker = workers[0]; // Ramesh Patil

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [streamFilter, setStreamFilter] = useState<string>('all');

  const myCollections = collections.filter(c => c.assignedWorkerId === currentWorker.id);

  const filteredCollections = myCollections.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (streamFilter !== 'all' && c.wasteStream !== streamFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Worker Fast-Action Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E2EAE4] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#43A879] animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#66756D]">
                Field Route Operations
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#17251F]">
              Assigned Collection Checkpoints
            </h2>
            <p className="text-xs text-[#66756D] mt-1 max-w-xl">
              Tap "Start Collection" upon arriving at a chute or bin bay. Inspect segregation before clearing, and tap "Mark Completed" when drums are secured.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#E7F4EC] text-[#174C3C] border border-[#43A879]/30">
              Sector: {currentWorker.assignedSector.split('(')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E2EAE4] shadow-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#66756D]" />
          <span className="text-xs font-bold text-[#17251F]">Filter Checkpoints:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="all">All Statuses ({myCollections.length})</option>
            <option value="Pending">Pending ({myCollections.filter(c => c.status === 'Pending').length})</option>
            <option value="In Progress">In Progress ({myCollections.filter(c => c.status === 'In Progress').length})</option>
            <option value="Completed">Completed ({myCollections.filter(c => c.status === 'Completed').length})</option>
          </select>

          <select
            value={streamFilter}
            onChange={(e) => setStreamFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="all">All Waste Streams</option>
            <option value="Wet Waste">Wet Waste</option>
            <option value="Dry Waste">Dry Waste</option>
            <option value="Special Waste">Special Waste</option>
          </select>
        </div>
      </div>

      {/* Checkpoints List */}
      {filteredCollections.length === 0 ? (
        <EmptyState
          title="No assigned collections match your filter"
          description="Try changing the status or waste stream filter to view other assigned collection points."
          action={{
            label: "Reset Filters",
            onClick: () => {
              setStatusFilter('all');
              setStreamFilter('all');
            }
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredCollections.map(item => {
            const isCompleted = item.status === 'Completed';
            const isInProgress = item.status === 'In Progress';
            const isPending = item.status === 'Pending';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 border transition-all ${
                  isInProgress
                    ? 'border-blue-400 ring-2 ring-blue-50 shadow-md'
                    : isCompleted
                    ? 'border-[#E2EAE4] bg-[#F8FAF7]/60'
                    : 'border-[#E2EAE4] hover:border-[#43A879]/40 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="font-mono text-xs font-bold text-[#174C3C] bg-[#E7F4EC] px-2 py-0.5 rounded border border-[#43A879]/30">
                        {item.id}
                      </span>
                      <StatusBadge status={item.wasteStream} size="sm" />
                      <StatusBadge status={item.status} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#17251F] font-display">
                      {item.collectionPoint}
                    </h3>
                  </div>

                  {/* Scheduled & Completion info */}
                  <div className="text-right shrink-0 text-xs text-[#66756D]">
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#174C3C]" />
                      <span>Scheduled: <strong className="text-[#17251F]">{item.scheduledTime}</strong></span>
                    </div>
                    {item.completedAt && (
                      <span className="text-[#43A879] font-semibold block mt-0.5">
                        Cleared at {item.completedAt}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#66756D] mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#174C3C]" />
                  <span>Sector Area: <strong className="text-[#17251F]">{item.building}</strong></span>
                </div>

                {/* Instructions */}
                <div className="p-3 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4] text-xs text-[#17251F] leading-relaxed mb-4">
                  <span className="font-semibold text-[#10382D] block mb-0.5">Field Handling Protocol:</span>
                  {item.instructions}
                </div>

                {/* Worker Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E2EAE4]">
                  {/* Problem reporting shortcut */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onReportIssueForPoint) {
                        onReportIssueForPoint(item.collectionPoint, item.building, item.wasteStream);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Report Problem at This Point</span>
                  </button>

                  {/* State Change Actions */}
                  <div className="flex items-center gap-2">
                    {isPending && (
                      <button
                        onClick={() => startCollection(item.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Start Collection</span>
                      </button>
                    )}

                    {isInProgress && (
                      <button
                        onClick={() => completeCollection(item.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#174C3C] hover:bg-[#10382D] active:scale-98 transition-all shadow-md"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                        <span>Mark as Completed</span>
                      </button>
                    )}

                    {isCompleted && (
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-[#174C3C] bg-[#E7F4EC] border border-[#43A879]/30">
                        <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                        <span>Collection Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
