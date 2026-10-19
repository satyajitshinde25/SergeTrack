import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { calculateRecurringHotspots } from '../../utils/formatters';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { IncidentDetailModal } from '../resident/IncidentDetailModal';
import { IncidentReport } from '../../types';
import { 
  Flame, 
  AlertTriangle, 
  MapPin, 
  Lightbulb, 
  Eye, 
  Info, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export const RecurringIssues: React.FC = () => {
  const { incidents } = useSegreTrack();
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null);

  const hotspots = calculateRecurringHotspots(incidents);

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-amber-500" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#66756D]">
                Root-Cause Hotspot Detection
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#17251F]">
              Recurring Collection Issues by Location
            </h2>
            <p className="text-xs text-[#66756D] mt-1 max-w-2xl leading-relaxed">
              Automated rule-based aggregation identifies areas with repeated non-compliance or equipment failure. Society administrators can address systemic bottlenecks rather than treating isolated symptoms.
            </p>
          </div>

          <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900 shrink-0">
            <span className="font-bold block text-sm">{hotspots.length} Priority Hotspot(s)</span>
            <span>Identified across current society records</span>
          </div>
        </div>

        {/* Prototype Honesty Notice */}
        <div className="mt-4 p-3 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4] flex items-center gap-2 text-xs text-[#66756D]">
          <Info className="w-4 h-4 text-[#174C3C] shrink-0" />
          <span>
            <strong>Deterministic Logic: </strong>
            Hotspots and recommendations are computed using statistical grouping by location and frequency. No generative or black-box predictive models are used.
          </span>
        </div>
      </div>

      {/* Hotspots Grid */}
      {hotspots.length === 0 ? (
        <EmptyState
          title="No recurring collection hotspots detected"
          description="None of the society wings currently have repeated incident reports logged. Single isolated incidents are managed in the Incident Management tab."
        />
      ) : (
        <div className="space-y-6">
          {hotspots.map((hotspot, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden"
            >
              {/* Hotspot Header */}
              <div className="p-5 bg-gradient-to-r from-amber-50/70 to-white border-b border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[#17251F] font-display">
                        {hotspot.location}
                      </h3>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        hotspot.severity === 'high' 
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {hotspot.severity} Priority Hotspot
                      </span>
                    </div>
                    <p className="text-xs text-[#66756D] mt-0.5">
                      Frequent Pattern: <strong className="text-[#17251F]">{hotspot.primaryIssueType}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs shrink-0">
                  <div className="text-right">
                    <span className="font-bold text-base text-[#17251F] font-display block">
                      {hotspot.incidentCount}
                    </span>
                    <span className="text-[#66756D] text-[11px]">Total Incidents</span>
                  </div>
                  <div className="h-6 w-px bg-amber-200" />
                  <div className="text-right">
                    <span className="font-bold text-base text-red-600 font-display block">
                      {hotspot.openIncidents}
                    </span>
                    <span className="text-[#66756D] text-[11px]">Active Open</span>
                  </div>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="p-5 border-b border-[#E2EAE4] bg-[#F8FAF7]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E7F4EC] text-[#174C3C] flex items-center justify-center shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4 text-[#43A879]" />
                  </div>
                  <div className="text-xs">
                    <h4 className="font-bold uppercase tracking-wider text-[#10382D] mb-1">
                      Recommended Operational Follow-Up
                    </h4>
                    <p className="text-[#17251F] leading-relaxed">
                      {hotspot.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Incidents under this hotspot */}
              <div className="p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#66756D] mb-3">
                  Underlying Incident Reports at {hotspot.location}
                </h4>
                <div className="space-y-2.5">
                  {hotspot.incidents.map(inc => (
                    <div
                      key={inc.id}
                      className="p-3.5 rounded-xl bg-white border border-[#E2EAE4] hover:border-[#43A879]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors"
                    >
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono font-bold text-[#174C3C] bg-[#E7F4EC] px-2 py-0.5 rounded">
                          {inc.id}
                        </span>
                        <span className="font-semibold text-[#17251F]">{inc.issueType}</span>
                        <StatusBadge status={inc.status} size="sm" />
                        <span className="text-[#66756D] text-[11px]">
                          Reported by {inc.reporterName} ({inc.reportedAt})
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedIncident(inc)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#174C3C] hover:underline shrink-0"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Record</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <IncidentDetailModal
        incident={selectedIncident}
        isOpen={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
};
