import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { AlertDetailModal } from '../components/AlertDetailModal';
import { ReportsModal } from '../components/ReportsModal';
import CareManagementPlatform from '../imports/CareManagementPlatform';

export default function Dashboard() {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const alerts = [
    {
      type: 'medication',
      title: 'Missed Medication',
      description: '3 missed MAR entries',
      severity: 'critical' as const,
      icon: 'medication' as const
    },
    {
      type: 'review',
      title: 'Care Plan Reviews',
      description: '2 care plans overdue',
      severity: 'warning' as const,
      icon: 'review' as const
    },
    {
      type: 'incident',
      title: 'Unresolved Incidents',
      description: '2 incidents pending review',
      severity: 'warning' as const,
      icon: 'incident' as const
    },
    {
      type: 'compliance',
      title: 'Compliance Updates',
      description: '5 items require attention',
      severity: 'info' as const,
      icon: 'compliance' as const
    }
  ];

  const handleViewDetails = (alertIndex: number) => {
    setSelectedAlert(alerts[alertIndex]);
    setShowAlertModal(true);
  };

  const handleViewReports = () => {
    setShowReportsModal(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Dashboard" />
      <TopBar />

      <main className="ml-64 pt-24 px-8 pb-8">
        <div onClick={(e) => {
          // Check if clicked element is a "View Details" button or "View Reports" button
          const target = e.target as HTMLElement;
          const button = target.closest('div[data-name="Button"]');

          if (button) {
            const buttonText = button.textContent;

            if (buttonText?.includes('View Details')) {
              // Determine which alert based on position in DOM
              const container = button.closest('div[data-name="Container"]');
              const allContainers = document.querySelectorAll('div[data-name="Container"]');
              let alertIndex = -1;

              // Find the alert index by checking the text content
              const containerText = container?.textContent || '';
              if (containerText.includes('Missed Medication')) alertIndex = 0;
              else if (containerText.includes('Care Plan Reviews')) alertIndex = 1;
              else if (containerText.includes('Unresolved Incidents')) alertIndex = 2;
              else if (containerText.includes('Compliance Updates')) alertIndex = 3;

              if (alertIndex >= 0) {
                handleViewDetails(alertIndex);
              }
            } else if (buttonText?.includes('View Reports')) {
              handleViewReports();
            }
          }
        }}>
          <CareManagementPlatform />
        </div>
      </main>

      <AlertDetailModal
        show={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        alert={selectedAlert}
      />

      <ReportsModal
        show={showReportsModal}
        onClose={() => setShowReportsModal(false)}
      />
    </div>
  );
}