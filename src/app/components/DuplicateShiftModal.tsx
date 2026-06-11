import { X, Copy, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface DuplicateShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: any;
  onDuplicate: (data: any) => void;
}

export function DuplicateShiftModal({ isOpen, onClose, shift, onDuplicate }: DuplicateShiftModalProps) {
  const [duplicateMode, setDuplicateMode] = useState<'single' | 'week' | 'custom'>('single');
  const [targetDate, setTargetDate] = useState('');
  const [numberOfWeeks, setNumberOfWeeks] = useState('1');
  const [customDates, setCustomDates] = useState<string[]>(['']);
  const [includeSameStaff, setIncludeSameStaff] = useState(true);
  const [notifyStaff, setNotifyStaff] = useState(true);

  if (!isOpen || !shift) return null;

  const addCustomDate = () => {
    setCustomDates([...customDates, '']);
  };

  const removeCustomDate = (index: number) => {
    setCustomDates(customDates.filter((_, i) => i !== index));
  };

  const updateCustomDate = (index: number, value: string) => {
    const newDates = [...customDates];
    newDates[index] = value;
    setCustomDates(newDates);
  };

  const handleDuplicate = () => {
    const data = {
      originalShiftId: shift.id,
      mode: duplicateMode,
      targetDate: duplicateMode === 'single' ? targetDate : null,
      numberOfWeeks: duplicateMode === 'week' ? numberOfWeeks : null,
      customDates: duplicateMode === 'custom' ? customDates.filter(d => d) : null,
      includeSameStaff,
      notifyStaff
    };
    onDuplicate(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-lg p-3 shadow-md">
                <Copy className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Duplicate Shift</h2>
                <p className="text-sm text-gray-600 mt-1">Create copies of this shift</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Calendar size={12} />
                    Original: {shift.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Clock size={12} />
                    {shift.startTime} - {shift.endTime}
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
          {/* Original Shift Info */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Original Shift Details</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-600">Staff Member</p>
                  <p className="text-sm font-medium text-gray-900">{shift.staffName || 'Unassigned'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Role</p>
                  <p className="text-sm font-medium text-gray-900">{shift.role}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="text-sm font-medium text-gray-900">{shift.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="text-sm font-medium text-gray-900">{shift.duration}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Duplication Mode */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Duplication Mode</h3>
            <div className="space-y-3">
              <label
                className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                  duplicateMode === 'single'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="duplicateMode"
                  value="single"
                  checked={duplicateMode === 'single'}
                  onChange={(e) => setDuplicateMode(e.target.value as any)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Single Date</p>
                  <p className="text-xs text-gray-600 mt-1">Duplicate to one specific date</p>
                  {duplicateMode === 'single' && (
                    <div className="mt-3">
                      <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                  )}
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                  duplicateMode === 'week'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="duplicateMode"
                  value="week"
                  checked={duplicateMode === 'week'}
                  onChange={(e) => setDuplicateMode(e.target.value as any)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Recurring Weekly</p>
                  <p className="text-xs text-gray-600 mt-1">Duplicate for the next few weeks</p>
                  {duplicateMode === 'week' && (
                    <div className="mt-3">
                      <label className="block text-xs text-gray-700 mb-2">Number of weeks</label>
                      <select
                        value={numberOfWeeks}
                        onChange={(e) => setNumberOfWeeks(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="1">1 week</option>
                        <option value="2">2 weeks</option>
                        <option value="3">3 weeks</option>
                        <option value="4">4 weeks</option>
                        <option value="8">8 weeks</option>
                        <option value="12">12 weeks</option>
                      </select>
                    </div>
                  )}
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                  duplicateMode === 'custom'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="duplicateMode"
                  value="custom"
                  checked={duplicateMode === 'custom'}
                  onChange={(e) => setDuplicateMode(e.target.value as any)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Custom Dates</p>
                  <p className="text-xs text-gray-600 mt-1">Specify multiple dates manually</p>
                  {duplicateMode === 'custom' && (
                    <div className="mt-3 space-y-2">
                      {customDates.map((date, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => updateCustomDate(index, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          {customDates.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCustomDate(index)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addCustomDate}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        + Add Another Date
                      </button>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </section>

          {/* Options */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Duplication Options</h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSameStaff}
                  onChange={(e) => setIncludeSameStaff(e.target.checked)}
                  className="mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Assign same staff member</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {shift.staffName ? `Assign ${shift.staffName} to duplicated shifts` : 'Keep shifts unassigned'}
                  </p>
                </div>
              </label>

              {includeSameStaff && shift.staffName && (
                <label className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyStaff}
                    onChange={(e) => setNotifyStaff(e.target.checked)}
                    className="mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Notify staff member</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Send notification about the new shifts
                    </p>
                  </div>
                </label>
              )}
            </div>
          </section>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-600 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-900">Important</p>
                <p className="text-xs text-gray-700 mt-1">
                  Duplicating shifts will create new shift records. Please verify that staff members are available for the selected dates before confirming.
                </p>
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
            onClick={handleDuplicate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Copy size={18} />
            Duplicate Shift
          </button>
        </div>
      </div>
    </div>
  );
}
