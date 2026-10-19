import { IncidentReport, RecurringIssueHotspot } from '../types';

export function formatTime(timeStr?: string): string {
  if (!timeStr) return '--';
  return timeStr;
}

export function getCurrentTimeString(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function getCurrentDateString(): string {
  const now = new Date();
  return now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Identify repeated incidents based on sample data, grouped by location and incident type.
 * Rule-based hotspot analysis for society administrators.
 */
export function calculateRecurringHotspots(incidents: IncidentReport[]): RecurringIssueHotspot[] {
  const locationMap = new Map<string, IncidentReport[]>();

  incidents.forEach(inc => {
    const list = locationMap.get(inc.building) || [];
    list.push(inc);
    locationMap.set(inc.building, list);
  });

  const hotspots: RecurringIssueHotspot[] = [];

  locationMap.forEach((buildingIncidents, building) => {
    // Only flag as recurring if 2 or more incidents exist at this building
    if (buildingIncidents.length >= 2) {
      // Find most common issue type
      const issueCountMap = new Map<string, number>();
      buildingIncidents.forEach(inc => {
        issueCountMap.set(inc.issueType, (issueCountMap.get(inc.issueType) || 0) + 1);
      });

      let topIssue = '';
      let maxCount = 0;
      issueCountMap.forEach((count, issue) => {
        if (count > maxCount) {
          maxCount = count;
          topIssue = issue;
        }
      });

      const openCount = buildingIncidents.filter(i => i.status !== 'Resolved').length;

      // Rule-based recommendations
      let recommendation = '';
      let severity: 'high' | 'medium' | 'low' = 'medium';

      if (topIssue.includes('mixed')) {
        recommendation = `Install dual-stream divider signs at ${building} chute stations & conduct a 10-minute briefing for morning collection staff.`;
        severity = openCount > 1 ? 'high' : 'medium';
      } else if (topIssue.includes('not segregated at source')) {
        recommendation = `Distribute bilingual color-coded segregation handouts to ${building} residents & inspect ground-floor bin liners.`;
        severity = 'high';
      } else if (topIssue.includes('inaccessible')) {
        recommendation = `Designate clear 1.5m clearance zones for waste pushcarts & issue notice to facility security.`;
        severity = 'medium';
      } else if (topIssue.includes('missed') || topIssue.includes('delayed')) {
        recommendation = `Adjust collection timetable for ${building} to optimize route timing during peak lift usage hours.`;
        severity = 'low';
      } else {
        recommendation = `Perform an on-site audit at ${building} with the sector supervisor to identify workflow bottlenecks.`;
        severity = 'medium';
      }

      hotspots.push({
        location: building,
        incidentCount: buildingIncidents.length,
        primaryIssueType: topIssue,
        openIncidents: openCount,
        recommendation,
        severity,
        incidents: buildingIncidents
      });
    }
  });

  // Sort by open incidents first, then total count
  return hotspots.sort((a, b) => b.openIncidents - a.openIncidents || b.incidentCount - a.incidentCount);
}
