import React, { useState, ReactNode } from 'react';
import { DemoBanner } from './DemoBanner';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { ToastContainer } from './ToastContainer';
import { UserRole } from '../../types';
import { X } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  activeRole: UserRole;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  title: string;
  subtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeRole,
  activeTab,
  onTabChange,
  title,
  subtitle
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col font-sans">
      {/* Top Demo Banner with role switcher */}
      <DemoBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex flex-col">
          <AppSidebar
            activeRole={activeRole}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </div>

        {/* Mobile slide-over drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Drawer */}
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-10 shadow-xl">
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-[#66756D] hover:bg-stone-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <AppSidebar
                activeRole={activeRole}
                activeTab={activeTab}
                onTabChange={onTabChange}
                onCloseMobile={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main content body */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <AppHeader
            title={title}
            subtitle={subtitle}
            onMenuToggle={() => setMobileMenuOpen(true)}
            activeRole={activeRole}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};
