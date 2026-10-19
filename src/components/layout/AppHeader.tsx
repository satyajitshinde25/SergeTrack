import React from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { Bell, ArrowLeft, Menu } from 'lucide-react';
import { UserRole } from '../../types';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
  activeRole: UserRole;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  onMenuToggle,
  activeRole
}) => {
  const { setCurrentRole, resident, workers, admin, incidents } = useSegreTrack();

  // Calculate active unread / pending count based on role
  let badgeCount = 0;
  if (activeRole === 'resident') {
    badgeCount = incidents.filter(i => i.reporterId === resident.id && i.status !== 'Resolved').length;
  } else if (activeRole === 'worker') {
    badgeCount = incidents.filter(i => i.reporterId === workers[0].id).length;
  } else if (activeRole === 'admin') {
    badgeCount = incidents.filter(i => i.status === 'Pending Review').length;
  }

  const roleLabels = {
    resident: { label: 'Resident Portal', user: resident.name, sub: `${resident.building}, ${resident.flat}` },
    worker: { label: 'Worker Portal', user: workers[0].name, sub: workers[0].assignedSector },
    admin: { label: 'Society Admin', user: admin.name, sub: admin.societyName },
    public: { label: 'Public', user: '', sub: '' }
  }[activeRole];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2EAE4] px-4 sm:px-6 py-3.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile menu button & page title */}
        <div className="flex items-center gap-3 min-w-0">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 -ml-2 rounded-xl text-[#17251F] hover:bg-stone-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-[#17251F] font-display truncate leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-[#66756D] truncate mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right: Quick actions & profile pill */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Notifications indicator */}
          <div className="relative">
            <button
              className="p-2 rounded-xl text-[#66756D] hover:text-[#17251F] hover:bg-stone-100 transition-colors relative"
              title={`${badgeCount} active item(s)`}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {badgeCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D9534F] ring-2 ring-white" />
              )}
            </button>
          </div>

          <div className="h-6 w-px bg-[#E2EAE4] hidden sm:block" />

          {/* User badge */}
          <div className="hidden sm:flex items-center gap-2.5 pl-1">
            <div className="w-8 h-8 rounded-full bg-[#174C3C] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
              {roleLabels.user.slice(0, 2)}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-xs font-semibold text-[#17251F] leading-tight">{roleLabels.user}</p>
              <p className="text-[11px] text-[#66756D] leading-tight mt-0.5">{roleLabels.sub}</p>
            </div>
          </div>

          {/* Return to home button */}
          <button
            onClick={() => setCurrentRole('public')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E2EAE4] text-xs font-medium text-[#17251F] hover:bg-stone-50 transition-colors"
            title="Return to Public Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Landing Page</span>
          </button>
        </div>
      </div>
    </header>
  );
};
