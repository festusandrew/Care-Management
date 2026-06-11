import { X, Trash2, AlertTriangle, Calendar, Clock, User } from 'lucide-react';
import { useState } from 'react';

interface DeleteShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: any;
  onDelete: (data: any) => void;
}

export function DeleteShiftModal({ isOpen, onClose, shift, onDelete }: DeleteShiftModalProps) {
  const [reason, setReason] = useState('');
  const [notifyStaff, setNotifyStaff] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen || !shift) return null;

  const handleDelete = () => {
    if (confirmed && reason) {
      onDelete({
        shiftId: shift.id,
        reason,
        notifyStaff
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-red-50 border-b border-red-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-red-600 rounded-lg p-3 shadow-md">
                <Trash2 className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Delete Shift</h2>
                <p className="text-sm text-gray-600 mt-1">This action cannot be undone</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-bold text-gray-900">Warning: Permanent Deletion</p>
                <p className="text-xs text-gray-700 mt-1">
                  Deleting this shift will permanently remove it from the schedule. If a staff member is assigned, they will need to be notified.
                </p>
              </div>
            </div>
          </div>

          {/* Shift Details */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Shift to be Deleted</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Staff Member</p>
                  <div className="flex items-center gap-2">
                    <User className="text-gray-400" size={14} />
                    <p className="text-sm font-medium text-gray-900">
                      {shift.staffName || <span className="text-red-600">Unassigned</span>}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Role</p>
                  <p className="text-sm font-medium text-gray-900">{shift.role}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-gray-400" size={14} />
                    <p className="text-sm font-medium text-gray-900">{shift.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Time</p>
                  <div className="flex items-center gap-2">
                    <Clock className="text-gray-400" size={14} />
                    <p className="text-sm font-medium text-gray-900">
                      {shift.startTime} - {shift.endTime}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Location</p>
                  <p className="text-sm font-medium text-gray-900">{shift.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Duration</p>
                  <p className="text-sm font-medium text-gray-900">{shift.duration}</p>
                </div>
              </div>
              {shift.serviceUsers && shift.serviceUsers.length > 0 && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">Service Users Affected</p>
                  <div className="flex flex-wrap gap-2">
                    {shift.serviceUsers.map((user: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-900">
                        {user}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Reason */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Reason for Deletion *</h3>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
              rows={4}
              placeholder="Please provide a reason for deleting this shift (e.g., staff unavailable, shift no longer needed, scheduling error, etc.)"
              required
            />
            <p className="text-xs text-gray-600 mt-2">
              This information will be recorded in the audit log
            </p>
          </section>

          {/* Notification Option */}
          {shift.staffName && (
            <section className="mb-6">
              <label className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyStaff}
                  onChange={(e) => setNotifyStaff(e.target.checked)}
                  className="mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Notify {shift.staffName}</p>
                  <p className="text-xs text-gray-700 mt-1">
                    Send notification to the assigned staff member about the shift cancellation
                  </p>
                </div>
              </label>
            </section>
          )}

          {/* Confirmation */}
          <section className="mb-6">
            <label className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">I understand this action cannot be undone</p>
                <p className="text-xs text-gray-600 mt-1">
                  Confirm that you want to permanently delete this shift
                </p>
              </div>
            </label>
          </section>

          {/* Impact Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-600 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-bold text-gray-900">Coverage Impact</p>
                <ul className="text-xs text-gray-700 mt-2 space-y-1">
                  <li>• This deletion may create a coverage gap in the schedule</li>
                  <li>• Service users assigned to this shift may need alternative support</li>
                  <li>• Consider creating a replacement shift if coverage is still needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

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
            onClick={handleDelete}
            disabled={!confirmed || !reason}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${
              confirmed && reason
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <Trash2 size={18} />
            Delete Shift
          </button>
        </div>
      </div>
    </div>
  );
}
