import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Users, 
  Truck, 
  ArrowRightLeft, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Phone, 
  Sparkles,
  MapPin
} from 'lucide-react';

export const WorkerCoordination: React.FC = () => {
  const { workers, collections, incidents, reassignCollection } = useSegreTrack();

  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('');
  const [targetWorkerId, setTargetWorkerId] = useState<string>('');

  // Find pending or in-progress collections eligible for reassignment
  const assignableCollections = collections.filter(c => c.status !== 'Completed');

  const handleReassignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCollectionId || !targetWorkerId) return;

    reassignCollection(selectedCollectionId, targetWorkerId);
    setSelectedCollectionId('');
    setTargetWorkerId('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-[#174C3C]" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#66756D]">
                Field Staff Roster & Allocation
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#17251F]">
              Worker Route Coordination & Reassignment
            </h2>
            <p className="text-xs text-[#66756D] mt-1 max-w-xl">
              Monitor worker workloads, open field obstacles, and rebalance pending checkpoints between team members.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-[#E7F4EC] text-[#174C3C] border border-[#43A879]/30 font-semibold">
              {workers.length} Active Field Staff
            </span>
          </div>
        </div>
      </div>

      {/* Reassignment Control Box (Workflow 5) */}
      <div className="bg-gradient-to-br from-white to-[#F8FAF7] rounded-2xl p-6 border border-[#43A879]/30 shadow-xs">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#E7F4EC] text-[#174C3C] flex items-center justify-center shrink-0">
            <ArrowRightLeft className="w-4 h-4 text-[#43A879]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#17251F] font-display">
              Reassign Checkpoint Between Staff
            </h3>
            <p className="text-xs text-[#66756D]">
              Workflow 5: Shift uncompleted collection points to balance peak load or cover delays.
            </p>
          </div>
        </div>

        <form onSubmit={handleReassignSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Collection point selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#66756D] mb-1">
              Select Pending Checkpoint
            </label>
            <select
              value={selectedCollectionId}
              onChange={(e) => setSelectedCollectionId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2EAE4] bg-white text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
              required
            >
              <option value="">-- Choose Checkpoint --</option>
              {assignableCollections.map(col => (
                <option key={col.id} value={col.id}>
                  {col.id} - {col.collectionPoint} (Assigned to {col.assignedWorkerName})
                </option>
              ))}
            </select>
          </div>

          {/* New worker selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#66756D] mb-1">
              Assign To Worker
            </label>
            <select
              value={targetWorkerId}
              onChange={(e) => setTargetWorkerId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2EAE4] bg-white text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
              required
            >
              <option value="">-- Choose New Worker --</option>
              {workers.map(w => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.assignedSector.split('(')[0]})
                </option>
              ))}
            </select>
          </div>

          {/* Action button */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={!selectedCollectionId || !targetWorkerId}
              className="w-full py-2.5 px-4 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-bold transition-all disabled:opacity-50 shadow-xs flex items-center justify-center gap-1.5"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Confirm Reassignment</span>
            </button>
          </div>
        </form>
      </div>

      {/* Workers Cards Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workers.map(worker => {
          const workerCollections = collections.filter(c => c.assignedWorkerId === worker.id);
          const workerCompleted = workerCollections.filter(c => c.status === 'Completed').length;
          const workerPending = workerCollections.filter(c => c.status !== 'Completed').length;
          const completionPct = workerCollections.length > 0 
            ? Math.round((workerCompleted / workerCollections.length) * 100) 
            : 0;

          const workerIssues = incidents.filter(i => i.reporterId === worker.id);

          return (
            <div
              key={worker.id}
              className="bg-white rounded-2xl border border-[#E2EAE4] p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#174C3C] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                      {worker.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#17251F] font-display">
                        {worker.name}
                      </h3>
                      <p className="text-xs text-[#43A879] font-medium">{worker.assignedSector}</p>
                      <span className="text-[11px] text-[#66756D] flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" /> {worker.phone}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-stone-100 text-stone-700 rounded border border-stone-200">
                    {worker.id}
                  </span>
                </div>

                {/* Progress */}
                <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4] space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#66756D]">Shift Route Completion:</span>
                    <strong className="text-[#174C3C]">{completionPct}% ({workerCompleted}/{workerCollections.length})</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className="h-full bg-[#43A879] rounded-full transition-all"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#66756D] pt-1">
                    <span>{workerCompleted} Completed</span>
                    <span>{workerPending} Remaining</span>
                    <span>{workerIssues.length} Reported Issue(s)</span>
                  </div>
                </div>

                {/* Assigned Collections list */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#66756D] mb-2">
                    Current Assigned Checkpoints ({workerCollections.length})
                  </h4>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {workerCollections.map(c => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200/70 text-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <span className="font-bold text-[#17251F] block truncate">{c.collectionPoint}</span>
                          <span className="text-[10px] text-[#66756D]">{c.scheduledTime} • {c.building}</span>
                        </div>
                        <StatusBadge status={c.status} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
