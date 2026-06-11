import { X, Calendar, Clock, MapPin, Users, User, Save, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface EditShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: any;
  onSave: (data: any) => void;
}

export function EditShiftModal({ isOpen, onClose, shift, onSave }: EditShiftModalProps) {
  const [formData, setFormData] = useState({
    staffName: shift?.staffName || '',
    role: shift?.role || 'Support Worker',
    date: shift?.date ? new Date(shift.date).toISOString().split('T')[0] : '',
    startTime: shift?.startTime || '08:00',
    endTime: shift?.endTime || '16:00',
    location: shift?.location || 'Main House',
    serviceUsers: shift?.serviceUsers || [],
    notes: shift?.notes || '',
    breakDuration: '30',
    overtimeApproved: false
  });

  if (!isOpen || !shift) return null;

  const calculateDuration = () => {
    const start = parseInt(formData.startTime.split(':')[0]) * 60 + parseInt(formData.startTime.split(':')[1]);
    const end = parseInt(formData.endTime.split(':')[0]) * 60 + parseInt(formData.endTime.split(':')[1]);
    let duration = end - start;
    if (duration < 0) duration += 24 * 60; // Handle overnight shifts
    duration -= parseInt(formData.breakDuration);
    return `${Math.floor(duration / 60)}h ${duration % 60}m`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, shiftId: shift.id, duration: calculateDuration() });
    onClose();
  };

  const allServiceUsers = [
    'Sarah Johnson',
    'Michael Chen',
    'Emma Wilson',
    'James Rodriguez',
    'Oliver Brown'
  ];

  const toggleServiceUser = (user: string) => {
    if (formData.serviceUsers.includes(user)) {
      setFormData({
        ...formData,
        serviceUsers: formData.serviceUsers.filter(u => u !== user)
      });
    } else {
      setFormData({
        ...formData,
        serviceUsers: [...formData.serviceUsers, user]
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-lg p-3 shadow-md">
                <Calendar className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Edit Shift</h2>
                <p className="text-sm text-gray-600 mt-1">Update shift details and assignments</p>
                <p className="text-xs text-gray-500 mt-1">Shift ID: SH-{shift.id.toString().padStart(6, '0')}</p>
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
          {/* Staff Assignment */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Staff Assignment</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Staff Member *
                </label>
                <input
                  type="text"
                  value={formData.staffName}
                  onChange={(e) => setFormData({ ...formData, staffName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Staff member name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="Support Worker">Support Worker</option>
                  <option value="Senior Support Worker">Senior Support Worker</option>
                  <option value="Care Manager">Care Manager</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Relief Staff">Relief Staff</option>
                </select>
              </div>
            </div>
          </section>

          {/* Date & Time */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Date & Time</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Break Duration (minutes)
                </label>
                <select
                  value={formData.breakDuration}
                  onChange={(e) => setFormData({ ...formData, breakDuration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="0">No Break</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Total Duration
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{calculateDuration()}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Location</h3>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Shift Location *
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="Main House">Main House</option>
                <option value="Annex Building">Annex Building</option>
                <option value="Office">Office</option>
                <option value="Community Outreach">Community Outreach</option>
                <option value="Multiple Locations">Multiple Locations</option>
              </select>
            </div>
          </section>

          {/* Service Users */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Service Users Assigned</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="space-y-2">
                {allServiceUsers.map((user) => (
                  <label
                    key={user}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.serviceUsers.includes(user)}
                      onChange={() => toggleServiceUser(user)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-900">{user}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3">
                {formData.serviceUsers.length} service user(s) selected
              </p>
            </div>
          </section>

          {/* Overtime */}
          <section className="mb-6">
            <label className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.overtimeApproved}
                onChange={(e) => setFormData({ ...formData, overtimeApproved: e.target.checked })}
                className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Overtime Approved</p>
                <p className="text-xs text-gray-600 mt-1">
                  Check this box if the shift exceeds standard hours and has been authorized
                </p>
              </div>
            </label>
          </section>

          {/* Notes */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Shift Notes</h3>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
              rows={4}
              placeholder="Any special instructions or notes for this shift..."
            />
          </section>

          {/* Warning */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-blue-600 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-900">Changes will be saved immediately</p>
                <p className="text-xs text-gray-700 mt-1">
                  The assigned staff member will be notified of any changes to their shift
                </p>
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
