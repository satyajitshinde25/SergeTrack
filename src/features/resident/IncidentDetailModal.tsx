import React from 'react';
import { IncidentReport } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { X, Calendar, MapPin, User, CheckCircle2, AlertTriangle, FileText, Image as ImageIcon } from 'lucide-react';

interface IncidentDetailModalProps {
  incident: IncidentReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export const IncidentDetailModal: React.FC<IncidentDetailModalProps> = ({
  incident,
  isOpen,
  onClose
}) => {
  if (!isOpen || !incident) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="incident-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#E2EAE4] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E2EAE4] flex items-start justify-between gap-4 bg-[#F8FAF7]">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-mono font-bold text-sm text-[#174C3C] bg-[#E7F4EC] px-2 py-0.5 rounded border border-[#43A879]/30">
                {incident.id}
              </span>
              <StatusBadge status={incident.status} />
              <StatusBadge status={incident.wasteStream} size="sm" />
            </div>
            <h3 id="incident-modal-title" className="text-lg font-bold text-[#17251F] font-display mt-2">
              {incident.issueType}
            </h3>
            <p className="text-xs text-[#66756D] flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{incident.location} ({incident.building})</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#66756D] hover:text-[#17251F] hover:bg-stone-200/60 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Reporter info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200/70 text-xs">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#174C3C]" />
              <div>
                <span className="text-[#66756D]">Reported By: </span>
                <span className="font-semibold text-[#17251F]">
                  {incident.reporterName} ({incident.reporterRole})
                </span>
                {incident.reporterUnit && (
                  <span className="text-[#66756D] block">{incident.reporterUnit}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#174C3C]" />
              <div>
                <span className="text-[#66756D]">Logged At: </span>
                <span className="font-semibold text-[#17251F]">{incident.reportedAt}</span>
              </div>
            </div>
          </div>

          {/* Issue Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#66756D] mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Incident Description
            </h4>
            <div className="p-4 rounded-xl bg-white border border-[#E2EAE4] text-sm text-[#17251F] leading-relaxed">
              {incident.description}
            </div>
          </div>

          {/* Photo preview if present */}
          {(incident.photoUrl || incident.photoName) && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#66756D] mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                Attached Demonstration Photo
              </h4>
              <div className="rounded-xl border border-[#E2EAE4] overflow-hidden bg-stone-100 max-h-60 flex items-center justify-center">
                {incident.photoUrl ? (
                  <img
                    src={incident.photoUrl}
                    alt="Incident photographic evidence"
                    className="w-full h-auto max-h-60 object-cover"
                  />
                ) : (
                  <div className="p-6 text-center text-xs text-[#66756D]">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 text-[#43A879]" />
                    <span>{incident.photoName || 'Attachment preview'}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Administrative notes & corrective action */}
          {(incident.administrativeNotes || incident.correctiveAction) && (
            <div className="p-4 rounded-xl bg-[#E7F4EC]/60 border border-[#43A879]/30 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#174C3C] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                Society Administration Action
              </h4>
              {incident.administrativeNotes && (
                <p className="text-xs text-[#17251F]">
                  <strong className="font-semibold text-[#10382D]">Admin Note: </strong>
                  {incident.administrativeNotes}
                </p>
              )}
              {incident.correctiveAction && (
                <p className="text-xs text-[#17251F]">
                  <strong className="font-semibold text-[#10382D]">Corrective Action: </strong>
                  {incident.correctiveAction}
                </p>
              )}
            </div>
          )}

          {/* Verification Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#66756D] mb-3">
              Resolution Progress Timeline
            </h4>
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2EAE4]">
              {incident.timeline.map((event, idx) => (
                <div key={event.id || idx} className="relative group">
                  <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                    idx === incident.timeline.length - 1
                      ? 'bg-[#43A879] ring-2 ring-[#E7F4EC]'
                      : 'bg-[#174C3C]'
                  }`} />
                  <div className="text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#17251F]">{event.title}</span>
                      <span className="text-[11px] text-[#66756D]">{event.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#66756D] mt-0.5">{event.description}</p>
                    <span className="text-[10px] text-[#43A879] font-medium mt-0.5 block">
                      Logged by {event.author} ({event.role})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E2EAE4] bg-[#F8FAF7] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-[#E2EAE4] text-xs font-semibold text-[#17251F] hover:bg-stone-50 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
