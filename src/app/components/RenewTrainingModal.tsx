import { X, Calendar, BookOpen, AlertTriangle, Bell } from 'lucide-react';
import { useState } from 'react';

interface RenewTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  renewal: {
    item: string;
    dueDate: string;
    daysLeft: number;
    priority: string;
  } | null;
}

export function RenewTrainingModal({ isOpen, onClose, renewal }: RenewTrainingModalProps) {
  const [formData, setFormData] = useState({
    scheduledDate: '',
    scheduledTime: '',
    provider: '',
    location: '',
    notes: '',
  });

  if (!isOpen || !renewal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Training renewal scheduled:', formData);
    onClose();
  };

  const [courseName, staffName] = renewal.item.split(' - ');
  const isOverdue = renewal.priority === 'overdue';
  const isHigh = renewal.priority === 'high';

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isOverdue ? 'bg-red-50' : isHigh ? 'bg-amber-50' : 'bg-blue-50'}`}>
              <BookOpen size={18} className={isOverdue ? 'text-red-600' : isHigh ? 'text-amber-600' : 'text-blue-600'} />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">Schedule Renewal</h2>
              <p className="text-xs text-gray-500">Renew training or certification</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5">
          {/* Renewal Info Card */}
          <div className={`rounded-lg p-4 mb-5 ${isOverdue ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-100'}`}>
            <div className="text-sm text-gray-900 mb-1">{courseName}</div>
            <div className="text-xs text-gray-500 mb-2">{staffName}</div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Expires: {renewal.dueDate}</span>
              {isOverdue ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-red-100 text-red-700 border border-red-200">{Math.abs(renewal.daysLeft)} days overdue</span>
              ) : (
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${isHigh ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                  {renewal.daysLeft} days left
                </span>
              )}
            </div>
          </div>

          {isOverdue && (
            <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded-lg mb-5">
              <AlertTriangle size={16} className="text-red-600 mt-0.5 shrink-0" />
              <p className="text-xs text-red-700">This item is overdue and requires immediate attention. Please schedule as soon as possible.</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Training Date *</label>
                <input
                  type="date"
                  required
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Time</label>
                <input
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Provider *</label>
                <select
                  required
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select provider</option>
                  <option value="Skills for Care">Skills for Care</option>
                  <option value="Local Training Hub">Local Training Hub</option>
                  <option value="NHS Trust">NHS Trust</option>
                  <option value="British Red Cross">British Red Cross</option>
                  <option value="Online Platform">Online Platform</option>
                  <option value="Internal Training">Internal Training</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Location *</label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select location</option>
                  <option value="On-Site">On-Site</option>
                  <option value="Training Centre">Training Centre</option>
                  <option value="Online">Online/Virtual</option>
                  <option value="Blended">Blended Learning</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Any special requirements..."
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
                  { label: 'Send calendar invitation', defaultChecked: true },
                  { label: 'Set reminder 3 days before', defaultChecked: true },
                  { label: 'Notify line manager', defaultChecked: false },
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
            <button
              type="submit"
              className={`px-4 py-2 text-sm text-white rounded-lg transition-colors ${isOverdue ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-700 hover:bg-blue-800'}`}
            >
              Schedule Training
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
