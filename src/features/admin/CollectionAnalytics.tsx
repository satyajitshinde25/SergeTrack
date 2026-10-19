import React from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import { BarChart3, TrendingUp, CheckCircle2, AlertOctagon, Layers } from 'lucide-react';

const COLORS = ['#174C3C', '#43A879', '#3977C3', '#D99125', '#D9534F', '#8B5CF6'];

export const CollectionAnalytics: React.FC = () => {
  const { collections, incidents } = useSegreTrack();

  // 1. Collections by Building (Completed vs Pending)
  const buildingMap = new Map<string, { building: string; completed: number; pending: number; inProgress: number }>();
  collections.forEach(c => {
    const entry = buildingMap.get(c.building) || { building: c.building, completed: 0, pending: 0, inProgress: 0 };
    if (c.status === 'Completed') entry.completed += 1;
    else if (c.status === 'In Progress') entry.inProgress += 1;
    else entry.pending += 1;
    buildingMap.set(c.building, entry);
  });
  const buildingData = Array.from(buildingMap.values());

  // 2. Incidents by Issue Type
  const issueTypeMap = new Map<string, number>();
  incidents.forEach(inc => {
    // Shorten label for neat chart presentation
    let label: string = inc.issueType;
    if (label.includes('mixed during collection')) label = 'Mixed at Collection';
    else if (label.includes('not segregated at source')) label = 'Source Contamination';
    else if (label.includes('inaccessible')) label = 'Blocked Ramp/Access';
    else if (label.includes('Collection missed')) label = 'Missed Chute';
    else if (label.includes('delayed')) label = 'Delayed Pickup';
    else if (label.includes('handled incorrectly')) label = 'Special Waste Mishandled';
    
    issueTypeMap.set(label, (issueTypeMap.get(label) || 0) + 1);
  });
  const issueTypeData = Array.from(issueTypeMap.entries()).map(([name, value]) => ({ name, value }));

  // 3. Incidents by Location (Building)
  const locationMap = new Map<string, number>();
  incidents.forEach(inc => {
    locationMap.set(inc.building, (locationMap.get(inc.building) || 0) + 1);
  });
  const locationData = Array.from(locationMap.entries()).map(([location, count]) => ({ location, count }));

  // 4. Waste Stream Distribution
  const streamMap = new Map<string, { stream: string; total: number; completed: number }>();
  collections.forEach(c => {
    const entry = streamMap.get(c.wasteStream) || { stream: c.wasteStream, total: 0, completed: 0 };
    entry.total += 1;
    if (c.status === 'Completed') entry.completed += 1;
    streamMap.set(c.wasteStream, entry);
  });
  const streamData = Array.from(streamMap.values());

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-[#174C3C]" />
            <span className="text-xs uppercase font-bold tracking-wider text-[#66756D]">
              Operational Intelligence
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#17251F]">
            Society Waste Analytics & Trends
          </h2>
          <p className="text-xs text-[#66756D] mt-1 max-w-xl">
            Charts update reactively as collections are completed and incident statuses are modified in real time.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs shrink-0">
          <div className="p-3 bg-[#E7F4EC] rounded-xl border border-[#43A879]/30 text-center">
            <span className="font-bold text-[#174C3C] text-lg font-display block">{collections.length}</span>
            <span className="text-[11px] text-[#66756D]">Total Checkpoints</span>
          </div>
          <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-center">
            <span className="font-bold text-red-700 text-lg font-display block">{incidents.length}</span>
            <span className="text-[11px] text-red-600">Total Incidents</span>
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Collection Status by Building */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2EAE4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#17251F] font-display flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                Collection Progress by Building
              </h3>
              <span className="text-[11px] text-[#66756D]">Completed vs Pending</span>
            </div>
            <p className="text-xs text-[#66756D] mb-4">
              Real-time clearance comparison across all residential wings and amenities.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buildingData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F1" vertical={false} />
                <XAxis dataKey="building" tick={{ fontSize: 11, fill: '#66756D' }} interval={0} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 11, fill: '#66756D' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2EAE4', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="completed" name="Completed" fill="#43A879" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inProgress" name="In Progress" fill="#3977C3" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending" fill="#C4D3C9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Incident Distribution by Issue Type */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2EAE4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#17251F] font-display flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-amber-600" />
                Incidents by Issue Category
              </h3>
              <span className="text-[11px] text-[#66756D]">Type Breakdown</span>
            </div>
            <p className="text-xs text-[#66756D] mb-4">
              Breakdown of root complaints: mixing at collection, source contamination, and access delays.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={issueTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {issueTypeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2EAE4', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Incidents by Location */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2EAE4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#17251F] font-display flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-600" />
                Total Incidents by Location
              </h3>
              <span className="text-[11px] text-[#66756D]">Hotspot Distribution</span>
            </div>
            <p className="text-xs text-[#66756D] mb-4">
              Identifies which building locations have highest aggregate non-compliance counts.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F1" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#66756D' }} allowDecimals={false} />
                <YAxis dataKey="location" type="category" tick={{ fontSize: 11, fill: '#66756D' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2EAE4', fontSize: '12px' }}
                />
                <Bar dataKey="count" name="Incidents Reported" fill="#D9534F" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Stream Clearance Ratio */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2EAE4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#17251F] font-display flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#174C3C]" />
                Waste Stream Clearance Volume
              </h3>
              <span className="text-[11px] text-[#66756D]">Stream Verification</span>
            </div>
            <p className="text-xs text-[#66756D] mb-4">
              Verification of Wet Organic, Dry Recyclable, and Special Hazardous streams handled.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={streamData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F1" vertical={false} />
                <XAxis dataKey="stream" tick={{ fontSize: 11, fill: '#66756D' }} />
                <YAxis tick={{ fontSize: 11, fill: '#66756D' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2EAE4', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="total" name="Total Scheduled" fill="#174C3C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Cleared" fill="#43A879" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
