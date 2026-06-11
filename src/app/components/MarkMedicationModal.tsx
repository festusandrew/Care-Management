import { X, XCircle, AlertCircle, User, Clock, Pill } from 'lucide-react';
import { useState } from 'react';

interface MarkMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication: any;
  type: 'refused' | 'missed';
  onConfirm: (data: any) => void;
}

export function MarkMedicationModal({ isOpen, onClose, medication, type, onConfirm }: MarkMedicationModalProps) {
  const [formData, setFormData] = useState({
    reason: '',
    actionTaken: '',
    notifiedCareManager: false,
    notifiedPhysician: false,
    followUpRequired: false,
    followUpNotes: ''
  });

  if (!isOpen || !medication) return null;

  const isRefused = type === 'refused';
  const headerColor = isRefused ? 'bg-amber-50' : 'bg-red-50';
  const iconColor = isRefused ? 'bg-amber-600' : 'bg-red-600';
  const Icon = isRefused ? XCircle : AlertCircle;
  const title = isRefused ? 'Mark as Refused' : 'Mark as Missed';

  const refusedReasons = [
    'Service user refused to take medication',
    'Service user was unable to swallow',
    'Service user was sleeping',
    'Service user felt unwell',
    'Other (please specify in notes)'
  ];

  const missedReasons = [
    'Staff oversight',
    'Service user was not present',
    'Medication not available',
    'Emergency situation',
    'Other (please specify in notes)'
  ];

  const reasons = isRefused ? refusedReasons : missedReasons;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ 
      ...formData, 
      medicationId: medication.id,
      type,
      timestamp: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className={`${headerColor} border-b border-gray-200 px-6 py-5`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className={`${iconColor} rounded-lg p-3 shadow-md`}>
                <Icon className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-600 mt-1">{medication.serviceUser}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm font-medium text-gray-900">
                    {medication.medication} {medication.dosage}
                  </span>
                  <span className="text-xs text-gray-600">•</span>
                  <span className="text-xs text-gray-600">Scheduled: {medication.time}</span>
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

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          {/* Warning */}
          <div className={`${isRefused ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'} border rounded-lg p-4 mb-6`}>
            <div className="flex items-start gap-3">
              <AlertCircle className={isRefused ? 'text-amber-600' : 'text-red-600'} size={20} />
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {isRefused ? 'Medication Refusal Documentation' : 'Missed Medication Documentation'}
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  {isRefused 
                    ? 'Document all medication refusals as required by care protocols. Notify care manager if this is a pattern.'
                    : 'All missed medications must be documented and reported. Immediate action may be required depending on the medication.'}
                </p>
              </div>
            </div>
          </div>

          {/* Medication Details */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Medication Details</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Medication</p>
                  <p className="text-sm font-bold text-gray-900">{medication.medication} {medication.dosage}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Scheduled Time</p>
                  <p className="text-sm font-bold text-gray-900">{medication.time}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Route</p>
                  <p className="text-sm font-bold text-gray-900">{medication.route}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Current Time</p>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Reason Selection */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">
              Reason for {isRefused ? 'Refusal' : 'Missed Dose'}
            </h3>
            <div className="space-y-2">
              {reasons.map((reason, idx) => (
                <label
                  key={idx}
                  className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.reason === reason
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={formData.reason === reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="mt-0.5"
                    required
                  />
                  <span className="text-sm text-gray-900">{reason}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Action Taken */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Action Taken</h3>
            <textarea
              value={formData.actionTaken}
              onChange={(e) => setFormData({ ...formData, actionTaken: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
              rows={4}
              placeholder="Describe what actions were taken (e.g., attempted to encourage, offered with food, rescheduled, etc.)"
              required
            />
          </section>

          {/* Notifications */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifiedCareManager}
                  onChange={(e) => setFormData({ ...formData, notifiedCareManager: e.target.checked })}
                  className="mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Care Manager Notified</p>
                  <p className="text-xs text-gray-600">Alert care manager about this incident</p>
                </div>
              </label>
              
              <label className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifiedPhysician}
                  onChange={(e) => setFormData({ ...formData, notifiedPhysician: e.target.checked })}
                  className="mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Prescribing Physician Notified</p>
                  <p className="text-xs text-gray-600">Contact the prescriber about this incident</p>
                </div>
              </label>
            </div>
          </section>

          {/* Follow-up Required */}
          <section className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <input
                type="checkbox"
                id="followUpRequired"
                checked={formData.followUpRequired}
                onChange={(e) => setFormData({ ...formData, followUpRequired: e.target.checked })}
                className="mt-0.5"
              />
              <div>
                <label htmlFor="followUpRequired" className="text-base font-bold text-gray-900 cursor-pointer">
                  Follow-up Required
                </label>
                <p className="text-xs text-gray-600">Check if additional monitoring or action is needed</p>
              </div>
            </div>

            {formData.followUpRequired && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Follow-up Plan
                </label>
                <textarea
                  value={formData.followUpNotes}
                  onChange={(e) => setFormData({ ...formData, followUpNotes: e.target.value })}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg resize-none"
                  rows={3}
                  placeholder="Describe the follow-up plan (e.g., monitor behavior, retry in 30 minutes, contact family, etc.)"
                  required={formData.followUpRequired}
                />
              </div>
            )}
          </section>
        </form>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${
              isRefused ? 'bg-amber-600 hover:bg-amber-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <Icon size={18} />
            Confirm {isRefused ? 'Refused' : 'Missed'}
          </button>
        </div>
      </div>
    </div>
  );
}
