import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { AlertDetailModal } from '../components/AlertDetailModal';
import { ReportsModal } from '../components/ReportsModal';
import CareManagementPlatform from '../imports/CareManagementPlatform';
import { api } from '../services/api';
import { Alert } from '../mockData/mockStore';
import { useNavigation } from '../context/NavigationContext';

export default function Dashboard() {
  const { setCurrentPage } = useNavigation();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.getDashboardAlerts().then(data => {
      if (active) {
        setAlerts(data);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

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

      <main className="ml-0 md:ml-64 pt-20 px-4 md:px-8 pb-8 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto w-full">
          <div onClick={(e) => {
            const target = e.target as HTMLElement;

            // Check if clicked inside Shift Coverage card
            const shiftCoverageCard = target.closest('div[data-name="Card"]');
            if (shiftCoverageCard && shiftCoverageCard.textContent?.includes('Shift Coverage')) {
              setCurrentPage('leave-requests');
              return;
            }

            // Check if clicked element is a "View Details" button or "View Reports" button
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