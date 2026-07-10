import { Modal } from './Modal';
import { useState } from 'react';

interface ScheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onConfirm?: (data: any) => void;
}

export function ScheduleAppointmentModal({ isOpen, onClose, userName, onConfirm }: ScheduleAppointmentModalProps) {
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    time: '',
    duration: '30',
    withPerson: '',
    location: '',
    notes: '',
    recurring: false,
    recurringFrequency: 'weekly',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appointment scheduled:', formData);
    if (onConfirm) {
      onConfirm(formData);
    }
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Schedule Appointment - ${userName}`} size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Appointment Type */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">Appointment Type *</label>
          <select
            name="type"
            value={(!formData.type || ['psychiatric', 'therapy', 'educational', 'medical', 'family', 'social'].includes(formData.type)) ? formData.type : 'other'}
            onChange={e => setFormData(f => ({ ...f, type: e.target.value === 'other' ? '' : e.target.value }))}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">Select type</option>
            <option value="psychiatric">Psychiatric Review</option>
            <option value="therapy">Therapy Session</option>
            <option value="educational">Educational Assessment</option>
            <option value="medical">Medical Checkup</option>
            <option value="family">Family Visit</option>
            <option value="social">Social Worker Visit</option>
            <option value="other">Other</option>
          </select>
          {formData.type !== undefined && formData.type !== '' && !['psychiatric', 'therapy', 'educational', 'medical', 'family', 'social'].includes(formData.type) && (
            <input
              type="text"
              required
              placeholder="Specify other appointment type..."
              className="w-full mt-2 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              value={formData.type}
              onChange={e => setFormData(f => ({ ...f, type: e.target.value }))}
            />
          )}
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Time *</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">Duration (minutes) *</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        {/* With */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">With *</label>
          <select
            name="withPerson"
            value={formData.withPerson}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">Select person</option>
            <option value="emily">Dr. Emily Carter</option>
            <option value="sarah">Sarah Williams</option>
            <option value="james">James Mitchell</option>
            <option value="mary">Mary Thompson</option>
            <option value="john">John Davies</option>
            <option value="external">External Professional</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">Location *</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">Select location</option>
            <option value="medical">Medical Room</option>
            <option value="therapy1">Therapy Room 1</option>
            <option value="therapy2">Therapy Room 2</option>
            <option value="learning">Learning Center</option>
            <option value="consultation">Consultation Room</option>
            <option value="external">External Location</option>
          </select>
        </div>

        {/* Recurring */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="recurring"
              checked={formData.recurring}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Recurring appointment</span>
          </label>
        </div>

        {formData.recurring && (
          <div>
            <label className="block text-sm text-gray-700 mb-2">Frequency</label>
            <select
              name="recurringFrequency"
              value={formData.recurringFrequency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Any additional information or preparation needed"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Schedule Appointment
          </button>
        </div>
      </form>
    </Modal>
  );
}
