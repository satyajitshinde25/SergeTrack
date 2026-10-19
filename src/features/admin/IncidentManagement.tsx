import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { IncidentReport, IncidentStatus } from '../../types';
import { 
  AlertOctagon, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  Eye,
  X,
  FileEdit,
  ArrowRight
} from 'lucide-react';

export const IncidentManagement: React.FC = () => {
  const { incidents, updateIncidentStatus } = useSegreTrack();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null);

  // Form states for status update modal
  const [newStatus, setNewStatus] = useState<IncidentStatus>('Under Review');
  const [adminNote, setAdminNote] = useState('');
  const [correctiveAction, setCorrectiveAction] = useState('');

  const handleOpenManageModal = (inc: IncidentReport) => {
    setSelectedIncident(inc);
    setNewStatus(inc.status);
    setAdminNote(inc.administrativeNotes || '');
    setCorrectiveAction(inc.correctiveAction || '');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIncident) return;

    updateIncidentStatus(
      selectedIncident.id,
      newStatus,
      adminNote.trim() || undefined,
      correctiveAction.trim() || undefined
    );

    // Refresh selected incident in modal
    const updated = incidents.find(i => i.id === selectedIncident.id);
    if (updated) {
      setSelectedIncident({
        ...updated,
        status: newStatus,
        administrativeNotes: adminNote.trim() || updated.administrativeNotes,
        correctiveAction: correctiveAction.trim() || updated.correctiveAction
      });
    }

    setSelectedIncident(null);
  };

  const filteredIncidents = incidents.filter(inc => {
    if (statusFilter !== 'all' && inc.status !== statusFilter) return false;
    if (roleFilter !== 'all' && inc.reporterRole !== roleFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        inc.id.toLowerCase().includes(q) ||
        inc.location.toLowerCase().includes(q) ||
        inc.building.toLowerCase().includes(q) ||
        inc.reporterName.toLowerCase().includes(q) ||
        inc.issueType.toLowerCase().includes(q) ||
        inc.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertOctagon className="w-4 h-4 text-red-600" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#66756D]">
                Quality & Accountability Center
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#17251F]">
              Incident Management & Resolution Hub
            </h2>
            <p className="text-xs text-[#66756D] mt-1 max-w-xl">
              Triage reports logged by residents and collection staff. Assign corrective measures, update statuses, and hold field teams accountable.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
              {incidents.filter(i => i.status === 'Pending Review').length} Pending Review
            </span>
            <span className="text-xs px-3 py-1.5 rounded-xl bg-[#E7F4EC] text-[#174C3C] border border-[#43A879]/30 font-semibold">
              {incidents.filter(i => i.status === 'Resolved').length} Resolved
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2EAE4] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#66756D] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, location, building, reporter, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#66756D]" />

          {/* Role filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="all">All Reporter Roles</option>
            <option value="resident">Reported by Residents</option>
            <option value="worker">Reported by Field Staff</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="all">All Statuses ({incidents.length})</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Under Review">Under Review</option>
            <option value="Action Planned">Action Planned</option>
            <option value="Resolved">Resolved</option>
          </select>

          {(searchQuery || statusFilter !== 'all' || roleFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setRoleFilter('all');
              }}
              className="text-xs text-red-600 hover:underline px-2 py-1 font-medium"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Incident List */}
      {filteredIncidents.length === 0 ? (
        <EmptyState
          title="No incident reports found"
          description="No incidents match your current search query or filter. Try clearing filters to see all reported records."
        />
      ) : (
        <div className="space-y-3">
          {filteredIncidents.map(inc => (
            <div
              key={inc.id}
              className="bg-white rounded-2xl p-5 border border-[#E2EAE4] hover:border-[#43A879]/40 shadow-xs transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#174C3C] bg-[#E7F4EC] px-2 py-0.5 rounded border border-[#43A879]/30">
                    {inc.id}
                  </span>
                  <StatusBadge status={inc.status} />
                  <StatusBadge status={inc.wasteStream} size="sm" />
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                    inc.reporterRole === 'resident' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-blue-50 text-blue-800 border border-blue-200'
                  }`}>
                    {inc.reporterRole} report
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#66756D]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{inc.reportedAt}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#17251F] font-display">
                  {inc.issueType}
                </h3>
                <div className="flex items-center gap-3 text-xs text-[#66756D] mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#174C3C]" />
                    {inc.location} ({inc.building})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#174C3C]" />
                    {inc.reporterName} {inc.reporterUnit ? `(${inc.reporterUnit})` : ''}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#17251F] leading-relaxed bg-[#F8FAF7] p-3 rounded-xl border border-[#E2EAE4]">
                {inc.description}
              </p>

              {/* Administrative note preview */}
              {inc.administrativeNotes && (
                <div className="text-xs text-[#10382D] bg-[#E7F4EC]/60 p-2.5 rounded-lg border border-[#43A879]/30">
                  <strong>Current Admin Note: </strong> {inc.administrativeNotes}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-[#E2EAE4]">
                <span className="text-[11px] text-[#66756D]">
                  {inc.timeline.length} timeline stage(s) recorded
                </span>

                <button
                  onClick={() => handleOpenManageModal(inc)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <FileEdit className="w-3.5 h-3.5" />
                  <span>Review & Update Status</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Status & Corrective Action Modal */}
      {selectedIncident && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#E2EAE4] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E2EAE4] flex items-start justify-between gap-4 bg-[#F8FAF7]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-[#174C3C] bg-[#E7F4EC] px-2 py-0.5 rounded border border-[#43A879]/30">
                    {selectedIncident.id}
                  </span>
                  <StatusBadge status={selectedIncident.status} size="sm" />
                </div>
                <h3 className="text-base font-bold text-[#17251F] font-display">
                  {selectedIncident.issueType}
                </h3>
                <p className="text-xs text-[#66756D] mt-0.5">
                  Reported by {selectedIncident.reporterName} ({selectedIncident.reporterRole}) at {selectedIncident.location}
                </p>
              </div>

              <button
                onClick={() => setSelectedIncident(null)}
                className="p-1 rounded-lg text-[#66756D] hover:text-[#17251F] hover:bg-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveStatus} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {/* Incident report details reminder */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-[#17251F] space-y-1">
                <div><strong className="text-[#66756D]">Description: </strong>{selectedIncident.description}</div>
                {selectedIncident.photoUrl && (
                  <div className="mt-2">
                    <img 
                      src={selectedIncident.photoUrl} 
                      alt="Evidence" 
                      className="h-28 w-auto rounded-lg object-cover border border-[#E2EAE4]" 
                    />
                  </div>
                )}
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-1.5">
                  Update Incident Status *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Pending Review', label: 'Pending Review' },
                    { id: 'Under Review', label: 'Under Review' },
                    { id: 'Action Planned', label: 'Action Planned' },
                    { id: 'Resolved', label: 'Mark as Resolved' }
                  ].map(s => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setNewStatus(s.id as IncidentStatus)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                        newStatus === s.id
                          ? 'bg-[#174C3C] text-white border-[#174C3C] shadow-xs'
                          : 'bg-[#F8FAF7] text-[#17251F] border-[#E2EAE4] hover:bg-stone-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Administrative Note */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-1.5">
                  Administrative Note (Visible to Reporter)
                </label>
                <textarea
                  rows={2}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="e.g. Supervisor dispatched to inspect cart divider; housekeeping staff re-briefed..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
                />
              </div>

              {/* Corrective Action */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-1.5">
                  Corrective Action Implemented
                </label>
                <textarea
                  rows={2}
                  value={correctiveAction}
                  onChange={(e) => setCorrectiveAction(e.target.value)}
                  placeholder="e.g. Replaced damaged dual partition on Trolley #3; installed bilingual pictorial signage on chute."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2EAE4] text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-3 border-t border-[#E2EAE4] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedIncident(null)}
                  className="px-4 py-2 rounded-xl border border-[#E2EAE4] text-xs font-medium text-[#17251F] hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-bold transition-all shadow-xs"
                >
                  Save Status & Sync All Portals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
