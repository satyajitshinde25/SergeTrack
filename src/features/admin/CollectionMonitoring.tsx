import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { 
  Activity, 
  Filter, 
  Search, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  RefreshCw,
  Sparkles 
} from 'lucide-react';

export const CollectionMonitoring: React.FC = () => {
  const { collections, workers } = useSegreTrack();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [streamFilter, setStreamFilter] = useState('all');
  const [buildingFilter, setBuildingFilter] = useState('all');
  const [workerFilter, setWorkerFilter] = useState('all');

  const completedCount = collections.filter(c => c.status === 'Completed').length;
  const inProgressCount = collections.filter(c => c.status === 'In Progress').length;
  const pendingCount = collections.filter(c => c.status === 'Pending').length;
  const progressPercent = Math.round((completedCount / collections.length) * 100);

  const buildings = Array.from(new Set(collections.map(c => c.building)));

  const filtered = collections.filter(item => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (streamFilter !== 'all' && item.wasteStream !== streamFilter) return false;
    if (buildingFilter !== 'all' && item.building !== buildingFilter) return false;
    if (workerFilter !== 'all' && item.assignedWorkerId !== workerFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.collectionPoint.toLowerCase().includes(q) ||
        item.building.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.assignedWorkerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Overview Progress Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-[#174C3C]" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#66756D]">
                Society Real-Time Monitor
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#17251F]">
              Live Waste Collection Tracking
            </h2>
            <p className="text-xs text-[#66756D] mt-1 max-w-xl">
              Centralized oversight of all 10 society collection points across residential wings and amenities.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#F8FAF7] p-3 rounded-xl border border-[#E2EAE4] shrink-0">
            <div>
              <span className="text-[11px] text-[#66756D] block">Overall Completion</span>
              <span className="text-xl font-bold text-[#174C3C] font-display">{progressPercent}%</span>
            </div>
            <div className="h-8 w-px bg-[#E2EAE4]" />
            <div className="text-xs text-[#17251F]">
              <div><strong className="text-[#43A879]">{completedCount}</strong> Completed</div>
              <div><strong className="text-blue-600">{inProgressCount}</strong> Active</div>
              <div><strong className="text-stone-500">{pendingCount}</strong> Pending</div>
            </div>
          </div>
        </div>

        {/* Global Progress bar */}
        <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#174C3C] to-[#43A879] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2EAE4] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#66756D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by collection point, building, staff, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-[#66756D]">
            <span>Showing <strong>{filtered.length}</strong> of {collections.length} collection points</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E2EAE4]">
          <span className="text-xs font-semibold text-[#66756D] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </span>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="all">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            value={streamFilter}
            onChange={(e) => setStreamFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="all">All Waste Streams</option>
            <option value="Wet Waste">Wet Waste</option>
            <option value="Dry Waste">Dry Waste</option>
            <option value="Special Waste">Special Waste</option>
          </select>

          <select
            value={buildingFilter}
            onChange={(e) => setBuildingFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="all">All Buildings</option>
            {buildings.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select
            value={workerFilter}
            onChange={(e) => setWorkerFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="all">All Workers</option>
            {workers.map(w => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>

          {(statusFilter !== 'all' || streamFilter !== 'all' || buildingFilter !== 'all' || workerFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setStatusFilter('all');
                setStreamFilter('all');
                setBuildingFilter('all');
                setWorkerFilter('all');
                setSearchQuery('');
              }}
              className="text-xs text-red-600 hover:underline px-2 py-1 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Monitoring Table/Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No collection records found"
          description="No points match your search or filter criteria. Try resetting filters."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-[#E2EAE4] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAF7] border-b border-[#E2EAE4] text-[#66756D] font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Point ID & Name</th>
                  <th className="py-3 px-4">Area / Building</th>
                  <th className="py-3 px-4">Waste Stream</th>
                  <th className="py-3 px-4">Assigned Worker</th>
                  <th className="py-3 px-4">Scheduled</th>
                  <th className="py-3 px-4">Status & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2EAE4]">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#17251F]">{item.collectionPoint}</div>
                      <span className="font-mono text-[10px] text-[#66756D]">{item.id}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#17251F] font-medium">
                      {item.building}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.wasteStream} size="sm" />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-[#17251F]">
                        <User className="w-3.5 h-3.5 text-[#66756D]" />
                        <span className="font-medium">{item.assignedWorkerName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#66756D]">
                      {item.scheduledTime}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StatusBadge status={item.status} size="sm" />
                        {item.completedAt && (
                          <span className="text-[11px] text-[#43A879] font-medium">
                            at {item.completedAt}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
