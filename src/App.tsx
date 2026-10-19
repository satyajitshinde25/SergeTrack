import React, { useEffect } from 'react';
import { SegreTrackProvider, useSegreTrack } from './context/SegreTrackContext';
import { LandingPage } from './features/landing/LandingPage';
import { ResidentDashboard } from './features/resident/ResidentDashboard';
import { WorkerDashboard } from './features/worker/WorkerDashboard';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { UserRole } from './types';

const AppContent: React.FC = () => {
  const { currentRole, setCurrentRole } = useSegreTrack();

  // Synchronize role with URL hash for browser history & direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
      if (hash === 'resident' || hash === 'worker' || hash === 'admin') {
        setCurrentRole(hash as UserRole);
      } else {
        setCurrentRole('public');
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setCurrentRole]);

  // Update hash when role changes
  useEffect(() => {
    if (currentRole === 'public') {
      if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#/') {
        window.history.pushState(null, '', '#/');
      }
    } else {
      const expectedHash = `#/${currentRole}`;
      if (window.location.hash !== expectedHash) {
        window.history.pushState(null, '', expectedHash);
      }
    }
  }, [currentRole]);

  return (
    <>
      {currentRole === 'public' && <LandingPage />}
      {currentRole === 'resident' && <ResidentDashboard />}
      {currentRole === 'worker' && <WorkerDashboard />}
      {currentRole === 'admin' && <AdminDashboard />}
    </>
  );
};

export function App() {
  return (
    <SegreTrackProvider>
      <AppContent />
    </SegreTrackProvider>
  );
}

export default App;
