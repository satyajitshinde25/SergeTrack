import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { ResidentIssueType, WasteStream } from '../../types';
import { AlertTriangle, Camera, Upload, CheckCircle2, Info, X } from 'lucide-react';

interface ReportIncidentFormProps {
  onSuccessRedirect?: (newIncidentId: string) => void;
}

const PRESET_SAMPLE_PHOTOS = [
  {
    name: 'Mixed Waste in Cart',
    url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80',
    label: 'Sample: Mixed Pushcart'
  },
  {
    name: 'Overflowing Bin',
    url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=400&q=80',
    label: 'Sample: Overflowing Chute'
  },
  {
    name: 'Hazardous Batteries Mixed',
    url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=400&q=80',
    label: 'Sample: Improper Battery Deposit'
  }
];

export const ReportIncidentForm: React.FC<ReportIncidentFormProps> = ({ onSuccessRedirect }) => {
  const { resident, reportIncident } = useSegreTrack();

  const [issueType, setIssueType] = useState<ResidentIssueType>('Wet and dry waste mixed during collection');
  const [location, setLocation] = useState<string>('Building A, 2nd Floor Chute');
  const [building, setBuilding] = useState<string>('Building A');
  const [wasteStream, setWasteStream] = useState<WasteStream>('Wet Waste');
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

  const handleSelectPreset = (preset: typeof PRESET_SAMPLE_PHOTOS[0]) => {
    setPhotoUrl(preset.url);
    setPhotoName(preset.name);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!description.trim() || description.trim().length < 10) {
      newErrors.description = 'Please provide a clear description of at least 10 characters.';
    }
    if (!location.trim()) {
      newErrors.location = 'Please specify the exact location or floor.';
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
        reporterRole: 'resident',
        reporterName: resident.name,
        reporterId: resident.id,
        reporterUnit: `${resident.building}, ${resident.flat}`,
        issueType,
        location,
        building,
        wasteStream,
        description,
        photoUrl: photoUrl || undefined,
        photoName: photoName || undefined,
      });

      setIsSubmitting(false);

      if (onSuccessRedirect) {
        onSuccessRedirect(generatedId);
      }
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Intro Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-[#17251F]">
              Report Collection Issue or Mixed Waste
            </h2>
            <p className="text-xs text-[#66756D]">
              Hold collection teams accountable. If properly segregated household waste is mixed into a single cart or delayed, log it here for society administration review.
            </p>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4] flex items-center gap-2 text-xs text-[#66756D]">
          <Info className="w-4 h-4 text-[#174C3C] shrink-0" />
          <span>
            Logged under your demo resident profile: <strong className="text-[#17251F]">{resident.name} ({resident.building}, {resident.flat})</strong>
          </span>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2EAE4] shadow-xs space-y-6">
        {/* Issue Type */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-2">
            1. What issue did you observe? *
          </label>
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value as ResidentIssueType)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE4] text-xs font-medium bg-white text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
          >
            <option value="Wet and dry waste mixed during collection">
              ⚠️ Wet and dry waste mixed during collection (Highest Priority)
            </option>
            <option value="Collection missed">
              🚫 Collection missed / bin skipped
            </option>
            <option value="Collection delayed">
              ⏳ Collection delayed significantly
            </option>
            <option value="Waste category handled incorrectly">
              📦 Waste category handled incorrectly (e.g. hazardous mixed)
            </option>
            <option value="Other collection issue">
              ℹ️ Other operational or hygiene issue
            </option>
          </select>
        </div>

        {/* Location & Building */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-2">
              2. Building *
            </label>
            <select
              value={building}
              onChange={(e) => {
                setBuilding(e.target.value);
                setLocation(`${e.target.value}, Chute Area`);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE4] text-xs font-medium bg-white text-[#17251F] focus:outline-hidden focus:border-[#43A879]"
            >
              <option value="Building A">Building A</option>
              <option value="Building B">Building B</option>
              <option value="Building C">Building C</option>
              <option value="Community Hall">Community Hall</option>
              <option value="Central Collection Bay">Central Collection Bay</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-2">
              3. Specific Location / Floor *
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. 2nd Floor Chute, Service Lift, Ground Foyer"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium text-[#17251F] focus:outline-hidden focus:border-[#43A879] ${
                errors.location ? 'border-red-400 bg-red-50/20' : 'border-[#E2EAE4]'
              }`}
            />
            {errors.location && <p className="text-[11px] text-red-600 mt-1">{errors.location}</p>}
          </div>
        </div>

        {/* Waste Stream Involved */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-2">
            4. Waste Stream Involved *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'Wet Waste', label: 'Wet Waste (Organics)', color: 'border-emerald-300' },
              { id: 'Dry Waste', label: 'Dry Waste (Recyclables)', color: 'border-sky-300' },
              { id: 'Special Waste', label: 'Special / E-Waste', color: 'border-amber-300' }
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
            5. Incident Description & Observation *
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what occurred, approximate time, and any staff or equipment involved (e.g. observed green and blue bins being poured into a single compactor bag without divider)..."
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-normal text-[#17251F] focus:outline-hidden focus:border-[#43A879] leading-relaxed ${
              errors.description ? 'border-red-400 bg-red-50/20' : 'border-[#E2EAE4]'
            }`}
          />
          {errors.description && <p className="text-[11px] text-red-600 mt-1">{errors.description}</p>}
          <p className="text-[11px] text-[#66756D] mt-1">
            Minimum 10 characters. Be concise and factual.
          </p>
        </div>

        {/* Photo Attachment (Local Preview / Demonstration Presets) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#17251F] mb-2">
            6. Photo Evidence (Optional Local Demonstration Preview)
          </label>

          <div className="space-y-3">
            {/* File input or preset picker */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[#174C3C]/40 bg-[#E7F4EC]/40 text-xs font-semibold text-[#174C3C] hover:bg-[#E7F4EC] transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload From Device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <span className="text-xs text-[#66756D] text-center sm:text-left">or choose a quick demo preset:</span>

              <div className="flex flex-wrap gap-1.5">
                {PRESET_SAMPLE_PHOTOS.map((p, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handleSelectPreset(p)}
                    className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#17251F] transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo preview container */}
            {photoUrl && (
              <div className="relative mt-3 p-2 rounded-xl bg-stone-100 border border-[#E2EAE4] inline-block">
                <img
                  src={photoUrl}
                  alt="Incident preview"
                  className="h-36 w-auto rounded-lg object-cover"
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
                  {photoName || 'Attached preview'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4 border-t border-[#E2EAE4] flex items-center justify-between">
          <p className="text-[11px] text-[#66756D]">
            * Report will be assigned an immediate tracking ID and synced to Admin Dashboard.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-bold transition-all shadow-md active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Logging Incident...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                <span>Submit Incident Report</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
