import { X, ListChecks, Bell } from 'lucide-react';
import { useState } from 'react';

interface AddRequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddRequirementModal({ isOpen, onClose }: AddRequirementModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    legislation: '',
    client: '',
    category: '',
    risk: '',
    nextReview: '',
    description: '',
    responsiblePerson: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Requirement added:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <ListChecks size={18} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">Add Compliance Requirement</h2>
              <p className="text-xs text-gray-500">Create a new regulatory compliance requirement</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5">
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Requirement Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., GDPR Data Protection Impact Assessment"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Applicable Legislation *</label>
              <input
                type="text"
                required
                value={formData.legislation}
                onChange={(e) => setFormData({ ...formData, legislation: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., GDPR Article 35 / Data Protection Act 2018"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Client / Entity *</label>
                <select
                  required
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select client</option>
                  <option value="Crestfield Technologies DAC">Crestfield Technologies DAC</option>
                  <option value="Harbour Fresh Foods Ltd">Harbour Fresh Foods Ltd</option>
                  <option value="Stronghold Construction Group Ltd">Stronghold Construction Group Ltd</option>
                  <option value="All Clients">All Clients</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="GDPR & Data Protection">GDPR & Data Protection</option>
                  <option value="Health & Safety">Health & Safety</option>
                  <option value="WRC & Employment Law">WRC & Employment Law</option>
                  <option value="Payroll & Revenue">Payroll & Revenue</option>
                  <option value="Employee Equality">Employee Equality</option>
                  <option value="Industrial Relations">Industrial Relations</option>
                  <option value="Working Time">Working Time</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Risk Level *</label>
                <select
                  required
                  value={formData.risk}
                  onChange={(e) => setFormData({ ...formData, risk: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select risk level</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Next Review Date *</label>
                <input
                  type="date"
                  required
                  value={formData.nextReview}
                  onChange={(e) => setFormData({ ...formData, nextReview: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Responsible Person *</label>
              <select
                required
                value={formData.responsiblePerson}
                onChange={(e) => setFormData({ ...formData, responsiblePerson: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select person</option>
                <option value="Sarah Williams">Sarah Williams</option>
                <option value="James Mitchell">James Mitchell</option>
                <option value="Mary Thompson">Mary Thompson</option>
                <option value="John Davies">John Davies</option>
                <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Describe the compliance requirement and key obligations..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Any additional notes..."
              />
            </div>

            {/* Notifications */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bell size={14} className="text-gray-500" />
                <span className="text-sm text-gray-700">Reminders</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: 'Send reminder 30 days before review date', defaultChecked: true },
                  { label: 'Send reminder 7 days before review date', defaultChecked: true },
                  { label: 'Notify compliance team on creation', defaultChecked: false },
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
              Add Requirement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
