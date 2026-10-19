import React from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useSegreTrack();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-[#43A879] shrink-0" />,
          info: <Info className="w-5 h-5 text-[#3977C3] shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
        }[toast.type];

        const borderClasses = {
          success: 'border-[#43A879]/30 bg-white',
          info: 'border-blue-200 bg-white',
          warning: 'border-amber-200 bg-white',
          error: 'border-red-200 bg-white'
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border ${borderClasses} shadow-lg flex items-start gap-3 transition-all transform animate-in slide-in-from-bottom-5`}
            role="status"
            aria-live="polite"
          >
            {icons}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#17251F]">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-[#66756D] mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#66756D] hover:text-[#17251F] p-0.5 rounded transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
