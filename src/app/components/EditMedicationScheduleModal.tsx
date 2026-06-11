import { X, Pill, Clock, Calendar, AlertTriangle, Save } from 'lucide-react';
import { useState } from 'react';

interface EditMedicationScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication: any;
  onSave: (data: any) => void;
}

export function EditMedicationScheduleModal({ isOpen, onClose, medication, onSave }: EditMedicationScheduleModalProps) {
  const [formData, setFormData] = useState({
    medicationName: medication?.medication || '',
    dosage: medication?.dosage || '',
    route: medication?.route || 'Oral',
    frequency: 'Once Daily',
    times: medication?.time ? [medication.time] : ['08:00'],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    instructions: 'Take with food. Monitor for drowsiness. Do not discontinue abruptly.',
    prescriber: 'Dr. Sarah Mitchell',
    prn: false,
    prnReason: '',
    maxDailyDoses: '',
    minimumHoursBetween: ''
  });

  if (!isOpen || !medication) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, medicationId: medication.id });
    onClose();
  };

  const addTimeSlot = () => {
    setFormData({ ...formData, times: [...formData.times, '12:00'] });
  };

  const removeTimeSlot = (index: number) => {
    const newTimes = formData.times.filter((_, i) => i !== index);
    setFormData({ ...formData, times: newTimes });
  };

  const updateTimeSlot = (index: number, value: string) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    setFormData({ ...formData, times: newTimes });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-lg p-3 shadow-md">
                <Pill className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Edit Medication Schedule</h2>
                <p className="text-sm text-gray-600 mt-1">{medication.serviceUser}</p>
                <p className="text-xs text-gray-500 mt-1">Make changes to the medication administration schedule</p>
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
          {/* Warning Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-600 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-bold text-gray-900">Important Notice</p>
                <p className="text-xs text-gray-700 mt-1">
                  Any changes to medication schedules must be authorized by the prescribing physician. Ensure all changes are documented in the care plan.
                </p>
              </div>
            </div>
          </div>

          {/* Medication Details */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Medication Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Medication Name *
                </label>
                <input
                  type="text"
                  value={formData.medicationName}
                  onChange={(e) => setFormData({ ...formData, medicationName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  placeholder="e.g., Sertraline"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Dosage *
                </label>
                <input
                  type="text"
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  placeholder="e.g., 50mg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Route of Administration *
                </label>
                <select
                  value={formData.route}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="Oral">Oral</option>
                  <option value="Sublingual">Sublingual</option>
                  <option value="Topical">Topical</option>
                  <option value="Injection">Injection</option>
                  <option value="Inhaled">Inhaled</option>
                  <option value="Rectal">Rectal</option>
                  <option value="Transdermal">Transdermal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Prescriber *
                </label>
                <input
                  type="text"
                  value={formData.prescriber}
                  onChange={(e) => setFormData({ ...formData, prescriber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  placeholder="e.g., Dr. Sarah Mitchell"
                />
              </div>
            </div>
          </section>

          {/* PRN (As Needed) */}
          <section className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="prn"
                checked={formData.prn}
                onChange={(e) => setFormData({ ...formData, prn: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="prn" className="text-base font-bold text-gray-900">
                PRN (As Needed) Medication
              </label>
            </div>

            {formData.prn && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Maximum Daily Doses *
                    </label>
                    <input
                      type="number"
                      value={formData.maxDailyDoses}
                      onChange={(e) => setFormData({ ...formData, maxDailyDoses: e.target.value })}
                      className="w-full px-4 py-2 border border-blue-300 rounded-lg"
                      required={formData.prn}
                      placeholder="e.g., 4"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Minimum Hours Between Doses *
                    </label>
                    <input
                      type="number"
                      value={formData.minimumHoursBetween}
                      onChange={(e) => setFormData({ ...formData, minimumHoursBetween: e.target.value })}
                      className="w-full px-4 py-2 border border-blue-300 rounded-lg"
                      required={formData.prn}
                      placeholder="e.g., 4"
                      min="1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    PRN Reason / Indication *
                  </label>
                  <input
                    type="text"
                    value={formData.prnReason}
                    onChange={(e) => setFormData({ ...formData, prnReason: e.target.value })}
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg"
                    required={formData.prn}
                    placeholder="e.g., For anxiety or agitation"
                  />
                </div>
              </div>
            )}
          </section>

          {/* Schedule */}
          {!formData.prn && (
            <section className="mb-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Administration Schedule</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Frequency *
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => {
                      const freq = e.target.value;
                      setFormData({ ...formData, frequency: freq });
                      
                      // Auto-adjust time slots based on frequency
                      if (freq === 'Once Daily') {
                        setFormData({ ...formData, frequency: freq, times: ['08:00'] });
                      } else if (freq === 'Twice Daily') {
                        setFormData({ ...formData, frequency: freq, times: ['08:00', '20:00'] });
                      } else if (freq === 'Three Times Daily') {
                        setFormData({ ...formData, frequency: freq, times: ['08:00', '14:00', '20:00'] });
                      } else if (freq === 'Four Times Daily') {
                        setFormData({ ...formData, frequency: freq, times: ['08:00', '12:00', '16:00', '20:00'] });
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="Once Daily">Once Daily</option>
                    <option value="Twice Daily">Twice Daily</option>
                    <option value="Three Times Daily">Three Times Daily</option>
                    <option value="Four Times Daily">Four Times Daily</option>
                    <option value="Custom">Custom Schedule</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-900">
                      Administration Times *
                    </label>
                    {formData.frequency === 'Custom' && (
                      <button
                        type="button"
                        onClick={addTimeSlot}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        + Add Time Slot
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {formData.times.map((time, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Clock className="text-gray-400" size={18} />
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => updateTimeSlot(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                        {formData.frequency === 'Custom' && formData.times.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTimeSlot(index)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Duration */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Schedule Duration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  min={formData.startDate}
                />
                <p className="text-xs text-gray-600 mt-1">Leave blank for ongoing medication</p>
              </div>
            </div>
          </section>

          {/* Special Instructions */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Special Instructions</h3>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
              rows={4}
              placeholder="e.g., Take with food, Monitor for side effects, etc."
            />
          </section>

          {/* Confirmation */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-bold text-gray-900 mb-2">Before saving, confirm:</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">All medication details are accurate and verified</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">Prescriber has authorized these changes</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">Care plan will be updated to reflect changes</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">All relevant staff will be notified of changes</p>
              </div>
            </div>
          </div>
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
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
