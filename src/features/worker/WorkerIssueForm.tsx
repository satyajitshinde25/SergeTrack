import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { WorkerIssueType, WasteStream } from '../../types';
import { AlertTriangle, Upload, CheckCircle2, Info, X } from 'lucide-react';

interface WorkerIssueFormProps {
  initialPoint?: string;
  initialBuilding?: string;
  initialStream?: WasteStream;
  onSuccess?: (newId: string) => void;
}

const WORKER_PRESET_PHOTOS = [
  {
    name: 'Blocked Ramp by Construction Scaffolds',
    url: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=400&q=80',
    label: 'Sample: Inaccessible Ramp'
  },
  {
    name: 'Unsegregated Plastic Bags in Drum',
    url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=400&q=80',
    label: 'Sample: Non-segregated Bags'
  }
];

export const WorkerIssueForm: React.FC<WorkerIssueFormProps> = ({
  initialPoint = 'Building B - Ground Collection Room',
  initialBuilding = 'Building B',
  initialStream = 'Wet Waste',
  onSuccess
}) => {
  const { workers, reportIncident, collections } = useSegreTrack();
  const worker = workers[0]; // Ramesh Patil

  const [location, setLocation] = useState<string>(initialPoint);
  const [building, setBuilding] = useState<string>(initialBuilding);
  const [issueType, setIssueType] = useState<WorkerIssueType>('Waste not segregated at source');
  const [wasteStream, setWasteStream] = useState<WasteStream>(initialStream);
  const [description, setDescription] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [photoName, setPhotoName] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!description.trim() || description.trim().length < 10) {
      newErrors.description = 'Please provide an operational description of at least 10 characters.';
    }
    if (!location.trim()) {
      newErrors.location = 'Please select or specify the collection checkpoint.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = reportIncident({
        reporterRole: 'worker',
        reporterName: worker.name,
        reporterId: worker.id,
        issueType,
        location,
        building,
        wasteStream,
        description,
        photoUrl: photoUrl || undefined,
        photoName: photoName || undefined
      });

      setIsSubmitting(false);

      if (onSuccess) {
        onSuccess(generatedId);
      }
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-[#17251F]">
              Report Operational Collection Problem
            </h2>
            <p className="text-xs text-[#66756D]">
              Encountering unsegregated bins, blocked service ramps, or improper hazardous disposal? Log field reports to notify the society administrator and protect waste integrity.
            </p>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4] flex items-center gap-2 text-xs text-[#66756D]">
          <Info className="w-4 h-4 text-[#174C3C] shrink-0" />
          <span>
            Logged by assigned collection worker: <strong className="text-[#17251F]">{worker.name} ({worker.assignedSector})</strong>
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2EAE4] shadow-xs space-y-6">
        {/* Checkpoint selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-2">
            1. Collection Point / Location *
          </label>
          <select
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              const found = collections.find(c => c.collectionPoint === e.target.value);
              if (found) {
                setBuilding(found.building);
                setWasteStream(found.wasteStream);
              }
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE4] text-xs font-medium bg-white text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            {collections.map(col => (
              <option key={col.id} value={col.collectionPoint}>
                {col.collectionPoint} ({col.building} • {col.wasteStream})
              </option>
            ))}
          </select>
        </div>

        {/* Issue Type */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-2">
            2. Operational Issue Category *
          </label>
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value as WorkerIssueType)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE4] text-xs font-medium bg-white text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="Waste not segregated at source">
              🚮 Waste not segregated at source (Plastic bags mixed in wet bin)
            </option>
            <option value="Waste streams already mixed">
              ⚠️ Waste streams already mixed by residents/contractors
            </option>
            <option value="Collection point inaccessible">
              🚧 Collection point inaccessible (Vehicles / construction debris blocking ramp)
            </option>
            <option value="Collection delayed">
              ⏳ Collection delayed due to lift maintenance / power failure
            </option>
            <option value="Other operational issue">
              🔧 Other equipment or safety hazard
            </option>
          </select>
        </div>

        {/* Waste Stream Involved */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-2">
            3. Waste Stream Affected *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'Wet Waste', label: 'Wet Waste (Green)' },
              { id: 'Dry Waste', label: 'Dry Waste (Blue)' },
              { id: 'Special Waste', label: 'Special / E-Waste' }
            ].map(stream => (
              <button
                type="button"
                key={stream.id}
                onClick={() => setWasteStream(stream.id as WasteStream)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  wasteStream === stream.id
                    ? 'bg-[#174C3C] text-white border-[#174C3C] shadow-xs'
                    : 'bg-[#F8FAF7] text-[#17251F] border-[#E2EAE4] hover:bg-stone-100'
                }`}
              >
                {stream.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-2">
            4. Field Observation Details *
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain the obstruction or contamination (e.g. found 3 carrier bags of kitchen food waste mixed in cardboard bin; advised housekeeping supervisor)..."
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-normal text-[#17251F] focus:outline-hidden focus:border-[#43A879] leading-relaxed ${
              errors.description ? 'border-red-400 bg-red-50/20' : 'border-[#E2EAE4]'
            }`}
          />
          {errors.description && <p className="text-[11px] text-red-600 mt-1">{errors.description}</p>}
        </div>

        {/* Photographic Evidence */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-2">
            5. Field Photo Proof (Optional Local Simulation)
          </label>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[#174C3C]/40 bg-[#E7F4EC]/40 text-xs font-semibold text-[#174C3C] hover:bg-[#E7F4EC] transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Camera Capture</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <span className="text-xs text-[#66756D]">or select preset:</span>

              <div className="flex flex-wrap gap-1.5">
                {WORKER_PRESET_PHOTOS.map((p, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => {
                      setPhotoUrl(p.url);
                      setPhotoName(p.name);
                    }}
                    className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#17251F] transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {photoUrl && (
              <div className="relative mt-3 p-2 rounded-xl bg-stone-100 border border-[#E2EAE4] inline-block">
                <img
                  src={photoUrl}
                  alt="Worker issue preview"
                  className="h-32 w-auto rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoUrl('');
                    setPhotoName('');
                  }}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-sm"
                  aria-label="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-[#66756D] block mt-1 truncate max-w-xs">
                  {photoName || 'Captured field photo'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#E2EAE4] flex items-center justify-between">
          <p className="text-[11px] text-[#66756D]">
            * Synced directly to Society Administrator Incident Hub.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-bold transition-all shadow-md active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Submitting Report...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                <span>Log Operational Issue</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
