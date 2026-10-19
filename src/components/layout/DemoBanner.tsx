import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { RotateCcw, Sparkles, User, Truck, ShieldCheck, Home } from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';

export const DemoBanner: React.FC = () => {
  const { currentRole, setCurrentRole, resetDemoData } = useSegreTrack();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <>
      <div className="bg-[#10382D] text-white border-b border-[#174C3C] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          {/* Demo disclaimer */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#43A879]/20 text-[#E7F4EC] border border-[#43A879]/40 font-semibold tracking-wide uppercase text-[10px]">
              <Sparkles className="w-3 h-3 text-[#43A879]" />
              Demo Environment
            </span>
            <span className="text-[#C4D3C9] hidden sm:inline">
              Academic Design-Thinking Prototype — Client-side state with live cross-role synchronization
            </span>
          </div>

          {/* Quick role switcher */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span className="text-[#A3BAAB] mr-1 hidden lg:inline font-medium text-[11px]">Switch Role:</span>
            
            <button
              onClick={() => setCurrentRole('public')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                currentRole === 'public'
                  ? 'bg-[#43A879] text-white shadow-xs font-semibold'
                  : 'text-[#C4D3C9] hover:bg-white/10 hover:text-white'
              }`}
              title="Return to Public Landing Page"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Public</span>
            </button>

            <button
              onClick={() => setCurrentRole('resident')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                currentRole === 'resident'
                  ? 'bg-[#43A879] text-white shadow-xs font-semibold'
                  : 'text-[#C4D3C9] hover:bg-white/10 hover:text-white'
              }`}
              title="Aarav Sharma - Building A Flat 204"
            >
              <User className="w-3.5 h-3.5" />
              <span>Resident</span>
            </button>

            <button
              onClick={() => setCurrentRole('worker')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                currentRole === 'worker'
                  ? 'bg-[#43A879] text-white shadow-xs font-semibold'
                  : 'text-[#C4D3C9] hover:bg-white/10 hover:text-white'
              }`}
              title="Ramesh Patil - Assigned Worker"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Worker</span>
            </button>

            <button
              onClick={() => setCurrentRole('admin')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                currentRole === 'admin'
                  ? 'bg-[#43A879] text-white shadow-xs font-semibold'
                  : 'text-[#C4D3C9] hover:bg-white/10 hover:text-white'
              }`}
              title="Priya Deshmukh - Society Administrator"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <div className="h-4 w-px bg-white/20 mx-1 hidden sm:block" />

            <button
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Reset all sample data to default"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showResetConfirm}
        title="Reset Demonstration Data?"
        message="This will restore all default sample collections, incident reports, and activity logs. Any demo reports or status updates you submitted will be cleared."
        confirmLabel="Reset to Default"
        cancelLabel="Keep Current State"
        isDestructive={false}
        onConfirm={() => {
          resetDemoData();
          setShowResetConfirm(false);
        }}
        onCancel={() => setShowResetConfirm(false)}
      />
    </>
  );
};
