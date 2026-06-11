import { X, Calendar, BookOpen, Clock, Bell } from 'lucide-react';
import { useState } from 'react';

interface AssignTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AssignTrainingModal({ isOpen, onClose }: AssignTrainingModalProps) {
  const [formData, setFormData] = useState({
    trainingCourse: '',
    staffMembers: [] as string[],
    provider: '',
    scheduledDate: '',
    scheduledTime: '',
    location: '',
    duration: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Training assigned:', formData);
    onClose();
  };

  const staffList = [
    'Mary Thompson',
    'John Davies',
    'Sarah Williams',
    'James Mitchell',
    'Emily Roberts',
    'David Brown',
    'Lisa Anderson',
    'Dr. Sarah Mitchell',
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <BookOpen size={18} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">Assign Training</h2>
              <p className="text-xs text-gray-500">Schedule training for staff members</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5">
          <div className="space-y-5">
            {/* Training Course */}
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Training Course *</label>
              <select
                required
                value={formData.trainingCourse}
                onChange={(e) => setFormData({ ...formData, trainingCourse: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select training course</option>
                <option value="Safeguarding Adults Level 3">Safeguarding Adults Level 3</option>
                <option value="Medication Administration">Medication Administration</option>
                <option value="First Aid at Work">First Aid at Work</option>
                <option value="Fire Safety">Fire Safety</option>
                <option value="Moving and Handling">Moving and Handling</option>
                <option value="Food Hygiene Level 2">Food Hygiene Level 2</option>
                <option value="GDPR and Data Protection">GDPR and Data Protection</option>
                <option value="Health and Safety">Health and Safety</option>
                <option value="Equality and Diversity">Equality and Diversity</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select duration</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="Half day">Half day (4 hours)</option>
                  <option value="Full day">Full day (8 hours)</option>
                  <option value="2 days">2 days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Provider</label>
                <select
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select provider</option>
                  <option value="Skills for Care">Skills for Care</option>
                  <option value="Local Training Hub">Local Training Hub</option>
                  <option value="NHS Trust">NHS Trust</option>
                  <option value="Online Platform">Online Platform</option>
                  <option value="Internal Training">Internal Training</option>
                </select>
              </div>
            </div>

            {/* Staff Selection */}
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Assign to Staff *</label>
              <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                {staffList.map((staff) => (
                  <label key={staff} className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                    <input
                      type="checkbox"
                      checked={formData.staffMembers.includes(staff)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, staffMembers: [...formData.staffMembers, staff] });
                        } else {
                          setFormData({ ...formData, staffMembers: formData.staffMembers.filter(s => s !== staff) });
                        }
                      }}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-700">
                        {staff.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-gray-700">{staff}</span>
                    </div>
                  </label>
                ))}
              </div>
              {formData.staffMembers.length > 0 && (
                <p className="text-xs text-gray-500 mt-1.5">{formData.staffMembers.length} selected</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Training Date</label>
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Start Time</label>
                <input
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Location/Format</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select location</option>
                <option value="On-Site">On-Site Training Room</option>
                <option value="Training Centre">External Training Centre</option>
                <option value="Online">Online/Virtual</option>
                <option value="Blended">Blended Learning</option>
                <option value="E-Learning">Self-Paced E-Learning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Additional information..."
              />
            </div>

            {/* Notifications */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bell size={14} className="text-gray-500" />
                <span className="text-sm text-gray-700">Notifications</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: 'Email notification to selected staff', defaultChecked: true },
                  { label: 'Add to staff calendars', defaultChecked: true },
                  { label: 'Send reminder 1 week before', defaultChecked: false },
                ].map((opt, i) => (
                  <label key={i} className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <input type="checkbox" defaultChecked={opt.defaultChecked} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 mt-6 pt-5 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
              Assign Training
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
