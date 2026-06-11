import { X, Calendar, User, Shield, ClipboardCheck, Bell } from 'lucide-react';
import { useState } from 'react';

interface AddAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAuditModal({ isOpen, onClose }: AddAuditModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    auditor: '',
    scheduledDate: '',
    scheduledTime: '',
    department: '',
    scope: '',
    checklist: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Audit scheduled:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <ClipboardCheck size={18} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">Schedule New Audit</h2>
              <p className="text-xs text-gray-500">Create and schedule a compliance audit</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5">
          <div className="space-y-5">
            {/* Audit Title */}
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Audit Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., GDPR Compliance Audit Q1 2026"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Audit Type */}
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Audit Type *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="Internal">Internal Audit</option>
                  <option value="External">External Inspection</option>
                  <option value="Regulatory">Regulatory Review</option>
                  <option value="Peer Review">Peer Review</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Department/Area *</label>
                <select
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select department</option>
                  <option value="Data Protection">Data Protection</option>
                  <option value="Health & Safety">Health & Safety</option>
                  <option value="HR & Employment">HR & Employment</option>
                  <option value="Finance">Finance</option>
                  <option value="Facilities">Facilities</option>
                  <option value="All Departments">All Departments</option>
                </select>
              </div>

              {/* Auditor */}
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Lead Auditor *</label>
                <select
                  required
                  value={formData.auditor}
                  onChange={(e) => setFormData({ ...formData, auditor: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select auditor</option>
                  <option value="Sarah Williams">Sarah Williams</option>
                  <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell</option>
                  <option value="James Mitchell">James Mitchell</option>
                  <option value="External Auditor">External Auditor</option>
                  <option value="DPC Inspector">DPC Inspector</option>
                  <option value="HSA Inspector">HSA Inspector</option>
                </select>
              </div>

              {/* Scheduled Date */}
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Scheduled Date *</label>
                <input
                  type="date"
                  required
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Scope */}
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Audit Scope *</label>
              <textarea
                required
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Describe what will be audited and the objectives..."
              />
            </div>

            {/* Checklist */}
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Standards / Checklist Items</label>
              <textarea
                value={formData.checklist}
                onChange={(e) => setFormData({ ...formData, checklist: e.target.value })}
                rows={2}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="List key regulations or checklist items..."
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Any special requirements..."
              />
            </div>

            {/* Notification Settings */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Bell size={14} className="text-gray-500" />
                <span className="text-sm text-gray-700">Notifications</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Notify relevant staff members', defaultChecked: true },
                  { label: 'Set reminder 7 days before audit', defaultChecked: true },
                  { label: 'Request pre-audit documentation', defaultChecked: false },
                ].map((opt, i) => (
                  <label key={i} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
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
              Schedule Audit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
