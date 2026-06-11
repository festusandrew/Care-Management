import { X, User, Calendar, Clock, Pill, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface AdministerMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication: any;
  onConfirm: (data: any) => void;
}

export function AdministerMedicationModal({ isOpen, onClose, medication, onConfirm }: AdministerMedicationModalProps) {
  const [formData, setFormData] = useState({
    administeredAt: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    notes: '',
    adverseReaction: false,
    reactionDetails: ''
  });

  if (!isOpen || !medication) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ ...formData, medicationId: medication.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-green-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-lg p-3 shadow-md">
                <Pill className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Administer Medication</h2>
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
          {/* Medication Verification */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Medication Verification</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-600">Medication</p>
                  <p className="text-sm font-bold text-gray-900">{medication.medication}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Dosage</p>
                  <p className="text-sm font-bold text-gray-900">{medication.dosage}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Route</p>
                  <p className="text-sm font-bold text-gray-900">{medication.route}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Scheduled Time</p>
                  <p className="text-sm font-bold text-gray-900">{medication.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/50 rounded p-2">
                <AlertTriangle className="text-blue-600" size={16} />
                <p className="text-xs text-gray-900">
                  Please verify the 5 Rights: Right Patient, Right Medication, Right Dose, Right Route, Right Time
                </p>
              </div>
            </div>
          </section>

          {/* Administration Details */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Administration Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Administration Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="time"
                    value={formData.administeredAt}
                    onChange={(e) => setFormData({ ...formData, administeredAt: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Vital Signs */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Vital Signs (Optional)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Blood Pressure</label>
                <input
                  type="text"
                  placeholder="120/80"
                  value={formData.bloodPressure}
                  onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Heart Rate</label>
                <input
                  type="text"
                  placeholder="72 bpm"
                  value={formData.heartRate}
                  onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Temperature</label>
                <input
                  type="text"
                  placeholder="36.5°C"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </section>

          {/* Adverse Reactions */}
          <section className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="adverseReaction"
                checked={formData.adverseReaction}
                onChange={(e) => setFormData({ ...formData, adverseReaction: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="adverseReaction" className="text-base font-bold text-gray-900">
                Adverse Reaction Observed
              </label>
            </div>
            
            {formData.adverseReaction && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Describe Adverse Reaction
                </label>
                <textarea
                  value={formData.reactionDetails}
                  onChange={(e) => setFormData({ ...formData, reactionDetails: e.target.value })}
                  className="w-full px-4 py-2 border border-red-300 rounded-lg resize-none"
                  rows={3}
                  placeholder="Describe the adverse reaction and any actions taken..."
                  required={formData.adverseReaction}
                />
                <div className="flex items-start gap-2 mt-3 bg-white/50 rounded p-2">
                  <AlertTriangle className="text-red-600 mt-0.5" size={16} />
                  <p className="text-xs text-red-900">
                    Notify the care manager and prescribing physician immediately. Complete an incident report.
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Notes */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Additional Notes</h3>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
              rows={4}
              placeholder="Any observations or notes about the administration..."
            />
          </section>

          {/* Confirmation Checklist */}
          <section className="mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-bold text-gray-900 mb-3">Before submitting, confirm:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={16} />
                  <p className="text-sm text-gray-900">Verified service user identity</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={16} />
                  <p className="text-sm text-gray-900">Checked medication label and expiry date</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={16} />
                  <p className="text-sm text-gray-900">Confirmed correct dosage and route</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={16} />
                  <p className="text-sm text-gray-900">Observed service user taking medication</p>
                </div>
              </div>
            </div>
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
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <CheckCircle size={18} />
            Confirm Administration
          </button>
        </div>
      </div>
    </div>
  );
}
