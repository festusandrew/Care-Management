import { X, User, Calendar, Clock, Pill, CheckCircle, XCircle, AlertCircle, FileText, Activity } from 'lucide-react';

interface MedicationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication: any;
}

export function MedicationDetailModal({ isOpen, onClose, medication }: MedicationDetailModalProps) {
  if (!isOpen || !medication) return null;

  // Mock administration history
  const administrationHistory = [
    {
      date: '15 Dec 2024',
      time: '08:05',
      status: 'administered',
      administeredBy: 'Mary Thompson',
      notes: 'Medication taken without issue',
      vitalSigns: { bp: '120/80', hr: '72 bpm', temp: '36.5°C' }
    },
    {
      date: '14 Dec 2024',
      time: '08:10',
      status: 'administered',
      administeredBy: 'John Davies',
      notes: 'Slight delay due to breakfast',
      vitalSigns: { bp: '118/78', hr: '70 bpm', temp: '36.4°C' }
    },
    {
      date: '13 Dec 2024',
      time: '08:00',
      status: 'administered',
      administeredBy: 'Sarah Williams',
      notes: 'On time, no concerns',
      vitalSigns: { bp: '122/82', hr: '74 bpm', temp: '36.6°C' }
    },
    {
      date: '12 Dec 2024',
      time: '09:15',
      status: 'missed',
      administeredBy: '',
      notes: 'Service user refused medication. Care manager notified.',
      vitalSigns: null
    },
    {
      date: '11 Dec 2024',
      time: '08:08',
      status: 'administered',
      administeredBy: 'Mary Thompson',
      notes: 'Taken with food as prescribed',
      vitalSigns: { bp: '119/79', hr: '71 bpm', temp: '36.5°C' }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'administered':
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: CheckCircle };
      case 'missed':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: AlertCircle };
      case 'refused':
        return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', icon: XCircle };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', icon: Clock };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-md">
                {medication.userPhoto}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{medication.serviceUser}</h2>
                <p className="text-sm text-gray-600 mt-1">Medication Administration Record</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <Pill className="text-blue-600" size={14} />
                    <span className="text-sm font-medium text-gray-900">
                      {medication.medication} {medication.dosage}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Clock size={14} />
                    Scheduled: {medication.time}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          {/* Current Prescription Details */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Prescription Details</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Medication Name</p>
                  <p className="text-sm font-medium text-gray-900">{medication.medication}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Dosage</p>
                  <p className="text-sm font-medium text-gray-900">{medication.dosage}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Route</p>
                  <p className="text-sm font-medium text-gray-900">{medication.route}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Scheduled Time</p>
                  <p className="text-sm font-medium text-gray-900">{medication.time}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Frequency</p>
                  <p className="text-sm font-medium text-gray-900">Once Daily</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Prescriber</p>
                  <p className="text-sm font-medium text-gray-900">Dr. Sarah Mitchell</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Special Instructions</p>
                <p className="text-sm text-gray-900">Take with food. Monitor for drowsiness. Do not discontinue abruptly.</p>
              </div>
            </div>
          </section>

          {/* Administration Statistics */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Administration Statistics (Last 30 Days)</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <p className="text-xs text-gray-600">Administered</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">27</p>
                <p className="text-xs text-green-600 mt-1">90% compliance</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="text-red-600" size={20} />
                  <p className="text-xs text-gray-600">Missed</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-xs text-red-600 mt-1">7% of doses</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="text-amber-600" size={20} />
                  <p className="text-xs text-gray-600">Refused</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">1</p>
                <p className="text-xs text-amber-600 mt-1">3% of doses</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="text-blue-600" size={20} />
                  <p className="text-xs text-gray-600">On Time</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-xs text-blue-600 mt-1">89% punctual</p>
              </div>
            </div>
          </section>

          {/* Administration History */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-4">Administration History</h3>
            <div className="space-y-3">
              {administrationHistory.map((record, idx) => {
                const statusColor = getStatusColor(record.status);
                const StatusIcon = statusColor.icon;
                
                return (
                  <div key={idx} className={`${statusColor.bg} border ${statusColor.border} rounded-lg p-4`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <StatusIcon className={statusColor.text} size={20} />
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <p className="text-sm font-bold text-gray-900 capitalize">{record.status}</p>
                            <span className="text-xs text-gray-600">•</span>
                            <p className="text-xs text-gray-600">{record.date} at {record.time}</p>
                          </div>
                          {record.administeredBy && (
                            <p className="text-xs text-gray-600 flex items-center gap-1">
                              <User size={12} />
                              Administered by {record.administeredBy}
                            </p>
                          )}
                        </div>
                      </div>
                      {record.status === 'administered' && (
                        <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    
                    {record.vitalSigns && (
                      <div className="bg-white/50 rounded-lg p-3 mb-2">
                        <p className="text-xs font-medium text-gray-900 mb-2">Vital Signs</p>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <p className="text-xs text-gray-600">Blood Pressure</p>
                            <p className="text-sm font-medium text-gray-900">{record.vitalSigns.bp}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Heart Rate</p>
                            <p className="text-sm font-medium text-gray-900">{record.vitalSigns.hr}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Temperature</p>
                            <p className="text-sm font-medium text-gray-900">{record.vitalSigns.temp}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-2">
                      <FileText className="text-gray-500 mt-0.5" size={14} />
                      <p className="text-xs text-gray-700">{record.notes}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50">
          <div className="text-xs text-gray-600">
            Prescription ID: RX-{medication.id.toString().padStart(6, '0')}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Download MAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
