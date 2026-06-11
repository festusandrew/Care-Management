import { X, AlertTriangle, Clock, User, CheckCircle2, FileText } from 'lucide-react';

interface AlertDetailModalProps {
  show: boolean;
  onClose: () => void;
  alert: {
    type: string;
    title: string;
    description: string;
    severity: 'critical' | 'warning' | 'info';
    icon: 'medication' | 'review' | 'incident' | 'compliance';
  } | null;
}

export function AlertDetailModal({ show, onClose, alert }: AlertDetailModalProps) {
  if (!show || !alert) return null;

  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          textColor: 'text-red-900'
        };
      case 'warning':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          iconBg: 'bg-amber-100',
          iconColor: 'text-amber-600',
          textColor: 'text-amber-900'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          textColor: 'text-blue-900'
        };
    }
  };

  const colors = getSeverityColor();

  // Mock detailed data based on alert type
  const getAlertDetails = () => {
    if (alert.title === 'Missed Medication') {
      return {
        affectedUsers: [
          { name: 'Sarah Johnson', id: 'SU001', medication: 'Sertraline 50mg', scheduledTime: '08:00 AM', missedDate: '15 Dec 2024' },
          { name: 'Michael Chen', id: 'SU002', medication: 'Risperidone 2mg', scheduledTime: '12:00 PM', missedDate: '15 Dec 2024' },
          { name: 'Emily Williams', id: 'SU003', medication: 'Lorazepam 1mg', scheduledTime: '10:00 AM', missedDate: '14 Dec 2024' }
        ],
        actions: [
          'Administer missed medications immediately if within safe window',
          'Document reason for missed administration',
          'Notify care manager and prescribing physician',
          'Review MAR procedures with staff'
        ]
      };
    } else if (alert.title === 'Care Plan Reviews') {
      return {
        affectedUsers: [
          { name: 'Robert Taylor', id: 'SU004', planType: 'Behavior Support Plan', dueDate: '20 Dec 2024', daysPastDue: 5 },
          { name: 'Jessica Martinez', id: 'SU005', planType: 'Person-Centred Care Plan', dueDate: '18 Dec 2024', daysPastDue: 7 }
        ],
        actions: [
          'Schedule review meetings with care teams',
          'Gather input from all team members',
          'Update care plans with current goals and strategies',
          'Obtain signatures from all required parties'
        ]
      };
    } else if (alert.title === 'Unresolved Incidents') {
      return {
        affectedIncidents: [
          { id: 'INC-2024-089', type: 'Behavioral', user: 'Michael Chen', reportedDate: '10 Dec 2024', daysOpen: 15 },
          { id: 'INC-2024-092', type: 'Medication Error', user: 'Sarah Johnson', reportedDate: '12 Dec 2024', daysOpen: 13 }
        ],
        actions: [
          'Complete incident investigations',
          'Document findings and corrective actions',
          'Implement preventive measures',
          'Close incidents in the system'
        ]
      };
    } else {
      return {
        affectedUsers: [
          { name: 'Various Staff', id: 'N/A', issue: 'Training certificates expiring', dueDate: '31 Dec 2024' }
        ],
        actions: [
          'Review compliance requirements',
          'Schedule required training sessions',
          'Update documentation',
          'Submit compliance reports'
        ]
      };
    }
  };

  const details = getAlertDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className={`${colors.bg} border-b ${colors.border} px-6 py-5`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className={`${colors.iconBg} rounded-lg p-3`}>
                <AlertTriangle className={colors.iconColor} size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{alert.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className={`px-3 py-1 ${colors.bg} ${colors.textColor} rounded-full text-xs font-medium capitalize`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    Detected 2 hours ago
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
          {/* Affected Items */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">
              {alert.title === 'Unresolved Incidents' ? 'Affected Incidents' : 'Affected Service Users'}
            </h3>
            <div className="space-y-3">
              {alert.title === 'Unresolved Incidents' 
                ? (details as any).affectedIncidents?.map((incident: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{incident.id}</p>
                          <p className="text-xs text-gray-600 mt-1">Type: {incident.type}</p>
                          <p className="text-xs text-gray-600">Service User: {incident.user}</p>
                        </div>
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">
                          {incident.daysOpen} days open
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">Reported: {incident.reportedDate}</p>
                    </div>
                  ))
                : (details as any).affectedUsers?.map((user: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 rounded-full p-2">
                            <User className="text-blue-600" size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-600">{user.id}</p>
                          </div>
                        </div>
                      </div>
                      {user.medication && (
                        <>
                          <div className="ml-11 mt-2 space-y-1">
                            <p className="text-xs text-gray-700">
                              <span className="font-medium">Medication:</span> {user.medication}
                            </p>
                            <p className="text-xs text-gray-700">
                              <span className="font-medium">Scheduled Time:</span> {user.scheduledTime}
                            </p>
                            <p className="text-xs text-gray-700">
                              <span className="font-medium">Missed Date:</span> {user.missedDate}
                            </p>
                          </div>
                        </>
                      )}
                      {user.planType && (
                        <>
                          <div className="ml-11 mt-2 space-y-1">
                            <p className="text-xs text-gray-700">
                              <span className="font-medium">Plan Type:</span> {user.planType}
                            </p>
                            <p className="text-xs text-gray-700">
                              <span className="font-medium">Due Date:</span> {user.dueDate}
                            </p>
                            <p className="text-xs text-red-600 font-medium">
                              {user.daysPastDue} days overdue
                            </p>
                          </div>
                        </>
                      )}
                      {user.issue && (
                        <div className="ml-11 mt-2 space-y-1">
                          <p className="text-xs text-gray-700">
                            <span className="font-medium">Issue:</span> {user.issue}
                          </p>
                          {user.dueDate && (
                            <p className="text-xs text-gray-700">
                              <span className="font-medium">Due Date:</span> {user.dueDate}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))
              }
            </div>
          </section>

          {/* Required Actions */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Required Actions</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <ul className="space-y-2">
                {details.actions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-blue-600 mt-0.5 flex-shrink-0" size={16} />
                    <p className="text-sm text-gray-900">{action}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Notes */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-4">Additional Notes</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <FileText className="text-gray-500 mt-0.5" size={16} />
                <p className="text-sm text-gray-700">
                  This alert requires immediate attention to ensure compliance and quality of care. 
                  All actions should be completed and documented within 24 hours. Contact the care 
                  manager if you need additional support or guidance.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Mark as Resolved
          </button>
        </div>
      </div>
    </div>
  );
}
