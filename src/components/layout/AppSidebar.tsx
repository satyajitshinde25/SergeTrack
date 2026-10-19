import React from 'react';
import { Logo } from '../common/Logo';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { 
  Home, 
  CalendarDays, 
  BookOpen, 
  AlertTriangle, 
  ClipboardList, 
  CheckSquare, 
  History, 
  LayoutDashboard, 
  Activity, 
  AlertOctagon, 
  Flame, 
  BarChart3, 
  Users, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { UserRole } from '../../types';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
}

interface AppSidebarProps {
  activeRole: UserRole;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onCloseMobile?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeRole,
  activeTab,
  onTabChange,
  onCloseMobile
}) => {
  const { resident, workers, admin, incidents, setCurrentRole } = useSegreTrack();

  // Navigation configurations
  const getNavItems = (): NavItem[] => {
    if (activeRole === 'resident') {
      const pendingCount = incidents.filter(i => i.reporterId === resident.id && i.status !== 'Resolved').length;
      return [
        { id: 'overview', label: 'Overview', icon: <Home className="w-4 h-4" /> },
        { id: 'schedule', label: 'Collection Schedule', icon: <CalendarDays className="w-4 h-4" /> },
        { id: 'guide', label: 'Segregation Guide', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'report', label: 'Report Issue', icon: <AlertTriangle className="w-4 h-4" /> },
        { 
          id: 'my-reports', 
          label: 'My Reports', 
          icon: <ClipboardList className="w-4 h-4" />,
          badge: pendingCount > 0 ? pendingCount : undefined 
        },
      ];
    }

    if (activeRole === 'worker') {
      return [
        { id: 'overview', label: 'Overview', icon: <Home className="w-4 h-4" /> },
        { id: 'collections', label: "Today's Collections", icon: <CheckSquare className="w-4 h-4" /> },
        { id: 'report', label: 'Report Problem', icon: <AlertTriangle className="w-4 h-4" /> },
        { id: 'history', label: 'Collection History', icon: <History className="w-4 h-4" /> },
      ];
    }

    // Admin
    const pendingIncidents = incidents.filter(i => i.status === 'Pending Review').length;
    return [
      { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'monitoring', label: 'Collection Monitoring', icon: <Activity className="w-4 h-4" /> },
      { 
        id: 'incidents', 
        label: 'Incident Management', 
        icon: <AlertOctagon className="w-4 h-4" />,
        badge: pendingIncidents > 0 ? pendingIncidents : undefined
      },
      { id: 'recurring', label: 'Recurring Issues', icon: <Flame className="w-4 h-4 text-amber-500" /> },
      { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'coordination', label: 'Worker Coordination', icon: <Users className="w-4 h-4" /> },
    ];
  };

  const navItems = getNavItems();

  const roleDetails = {
    resident: { name: resident.name, role: 'Resident User', meta: `${resident.building}, ${resident.flat}` },
    worker: { name: workers[0].name, role: 'Collection Worker', meta: workers[0].assignedSector },
    admin: { name: admin.name, role: 'Society Administrator', meta: 'Facility Manager' },
    public: { name: 'Visitor', role: 'Public Guest', meta: 'Green Oaks' }
  }[activeRole];

  return (
    <aside className="w-64 bg-white border-r border-[#E2EAE4] flex flex-col h-full shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E2EAE4]">
        <button
          onClick={() => setCurrentRole('public')}
          className="text-left w-full focus:outline-hidden"
          title="SegreTrack Home"
        >
          <Logo size="md" showTagline={false} />
        </button>
      </div>

      {/* User profile card in sidebar */}
      <div className="p-4 mx-3 my-3 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#174C3C] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs shrink-0">
            {roleDetails.name.slice(0, 2)}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-[#17251F] truncate">{roleDetails.name}</h4>
            <p className="text-[11px] font-medium text-[#43A879] leading-tight">{roleDetails.role}</p>
            <p className="text-[10px] text-[#66756D] truncate mt-0.5">{roleDetails.meta}</p>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#66756D]">
          Menu Navigation
        </p>
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#174C3C] text-white shadow-xs'
                  : 'text-[#17251F] hover:bg-stone-100 hover:text-[#10382D]'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <span className={isActive ? 'text-white' : 'text-[#66756D]'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {item.badge !== undefined && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-[#43A879] text-white' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#E7F4EC]" />}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer link to public home */}
      <div className="p-3 border-t border-[#E2EAE4]">
        <button
          onClick={() => setCurrentRole('public')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#66756D] hover:text-[#17251F] hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Public Portal</span>
        </button>
      </div>
    </aside>
  );
};
