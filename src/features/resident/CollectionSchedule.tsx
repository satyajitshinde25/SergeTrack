import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { WasteStream, CollectionStatus } from '../../types';
import { Calendar, Filter, Clock, MapPin, Sparkles, AlertCircle } from 'lucide-react';

export const CollectionSchedule: React.FC = () => {
  const { collections, resident } = useSegreTrack();

  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [onlyMyBuilding, setOnlyMyBuilding] = useState<boolean>(true);

  // Filter collections
  const filteredCollections = collections.filter(item => {
    if (onlyMyBuilding && item.building !== resident.building) return false;
    if (selectedStream !== 'all' && item.wasteStream !== selectedStream) return false;
    if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-[#174C3C] to-[#10382D] rounded-2xl p-5 sm:p-6 text-white shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#43A879]" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#C4D3C9]">
                Today's Household Schedule
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              Doorstep & Chute Waste Timetable
            </h2>
            <p className="text-xs text-[#E7F4EC]/90 mt-1 max-w-xl">
              Strictly follow segregated handover. Place wet organics in green bins, flattened dry recyclables in blue bins, and hand special waste at designated drop-off points.
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 border border-white/10 shrink-0 text-left sm:text-right">
            <span className="text-[11px] text-[#C4D3C9] block font-medium">Your Residence</span>
            <span className="text-sm font-bold text-white block">{resident.building}, {resident.flat}</span>
            <span className="text-[10px] text-[#43A879] bg-[#E7F4EC]/20 px-2 py-0.5 rounded-full inline-block mt-1">
              Sector 1 Morning Run
            </span>
          </div>
        </div>
      </div>

      {/* Special Waste Warning Callout */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="font-semibold block text-amber-950">Important Society Rule: Special & Hazardous Waste</strong>
          Batteries, broken glass, CFL/tube lights, and electronic accessories must never be mixed into wet or dry garbage chutes. Please deposit them in the Red Special Locker located at the Central Bay or ground security kiosk.
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 border border-[#E2EAE4] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#66756D]" />
          <span className="text-xs font-bold text-[#17251F]">Filter Schedule:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Building toggle */}
          <button
            onClick={() => setOnlyMyBuilding(!onlyMyBuilding)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              onlyMyBuilding
                ? 'bg-[#174C3C] text-white border-[#174C3C]'
                : 'bg-white text-[#17251F] border-[#E2EAE4] hover:bg-stone-50'
            }`}
          >
            {onlyMyBuilding ? `My Building (${resident.building})` : 'All Society Points'}
          </button>

          {/* Waste stream filter */}
          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="all">All Waste Streams</option>
            <option value="Wet Waste">Wet Waste (Green)</option>
            <option value="Dry Waste">Dry Waste (Blue)</option>
            <option value="Special Waste">Special Waste (Red)</option>
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="all">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Scheduled / Pending</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>
      </div>

      {/* Schedule List */}
      {filteredCollections.length === 0 ? (
        <EmptyState
          title="No collections match your filter"
          description="Try selecting a different waste stream or clearing your building filter to view all scheduled society collection rounds."
          action={{
            label: "Reset Filters",
            onClick: () => {
              setSelectedStream('all');
              setSelectedStatus('all');
              setOnlyMyBuilding(false);
            }
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCollections.map(item => (
            <div
              key={item.id}
              className={`rounded-2xl p-5 border transition-all duration-200 bg-white ${
                item.status === 'Completed'
                  ? 'border-[#E2EAE4] opacity-95'
                  : item.status === 'In Progress'
                  ? 'border-blue-300 ring-2 ring-blue-50'
                  : 'border-[#E2EAE4] hover:border-[#43A879]/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <StatusBadge status={item.wasteStream} size="sm" />
                  <span className="font-mono text-xs font-semibold text-[#66756D]">{item.id}</span>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <h3 className="text-base font-bold text-[#17251F] font-display mb-1.5">
                {item.collectionPoint}
              </h3>

              <div className="space-y-1.5 text-xs text-[#66756D] mb-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#174C3C]" />
                  <span>Scheduled Time: <strong className="text-[#17251F]">{item.scheduledTime}</strong></span>
                  {item.completedAt && (
                    <span className="text-[#43A879] font-medium ml-1">
                      (Completed at {item.completedAt})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#174C3C]" />
                  <span>Area: <strong className="text-[#17251F]">{item.building}</strong></span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4] text-xs text-[#17251F] leading-relaxed">
                <span className="font-semibold text-[#10382D] block mb-0.5">Disposal Guidelines:</span>
                {item.instructions}
              </div>

              <div className="mt-3 pt-3 border-t border-[#E2EAE4] flex items-center justify-between text-[11px] text-[#66756D]">
                <span>Assigned Staff: <strong className="text-[#17251F]">{item.assignedWorkerName}</strong></span>
                <span className="flex items-center gap-1 text-[#43A879] font-medium">
                  <Sparkles className="w-3 h-3" />
                  Live Sync
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
