import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ServiceUsers from './pages/ServiceUsers';
import DailyLogs from './pages/DailyLogs';
import { CarePlans } from './pages/CarePlans';
import Medications from './pages/Medications';
import Scheduling from './pages/Scheduling';
import Activities from './pages/Activities';
import Incidents from './pages/Incidents';
import Compliance from './pages/Compliance';
import Settings from './pages/Settings';
import Staff from './pages/Staff';
import StaffProfile from './pages/StaffProfile';
import Recruitment from './pages/Recruitment';
import CommunicationHub from './pages/CommunicationHub';
import Financial from './pages/Financial';
import Analytics from './pages/Analytics';
import { NavigationProvider, useNavigation } from './context/NavigationContext';

function AppContent() {
  const { currentPage, pageParams } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'service-users':
        return <ServiceUsers />;
      case 'staff':
        return <Staff />;
      case 'staff-profile':
        return <StaffProfile id={pageParams?.id} showTimesheet={pageParams?.showTimesheet} />;
      case 'daily-logs':
        return <DailyLogs />;
      case 'care-plans':
        return <CarePlans />;
      case 'medications':
        return <Medications />;
      case 'scheduling':
        return <Scheduling />;
      case 'activities':
        return <Activities />;
      case 'incidents':
        return <Incidents />;
      case 'compliance':
        return <Compliance />;
      case 'recruitment':
        return <Recruitment />;
      case 'communication':
        return <CommunicationHub />;
      case 'financial':
        return <Financial />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return renderPage();
}

export default function App() {
  return (
    <NavigationProvider>
      {/* MARKER-MAKE-KIT-INVOKED */}
      <AppContent />
    </NavigationProvider>
  );
}
