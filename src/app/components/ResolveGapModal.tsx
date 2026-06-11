import { X, AlertTriangle, CheckCircle, Upload, Bell } from 'lucide-react';
import { useState } from 'react';

interface ResolveGapModalProps {
  isOpen: boolean;
  onClose: () => void;
  gap: {
    id: number;
    title: string;
    requirement: string;
    severity: string;
    daysOpen: number;
    assignee: string;
    dueDate: string;
    description: string;
  } | null;
}

export function ResolveGapModal({ isOpen, onClose, gap }: ResolveGapModalProps) {
  const [formData, setFormData] = useState({
    resolution: '',
    actionTaken: '',
    evidenceNotes: '',
    verifiedBy: '',
    resolutionDate: '',
    preventativeMeasures: '',
  });

  if (!isOpen || !gap) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Gap resolved:', { gap: gap.id, ...formData });
    onClose();
  };

  const isCritical = gap.severity === 'critical';

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isCritical ? 'bg-red-50' : 'bg-amber-50'}`}>
              <AlertTriangle size={18} className={isCritical ? 'text-red-600' : 'text-amber-600'} />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">Resolve Compliance Gap</h2>
              <p className="text-xs text-gray-500">Document the resolution and corrective actions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5">
          {/* Gap Summary */}
          <div className={`rounded-lg p-4 mb-5 ${isCritical ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-900">{gap.title}</span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${
                isCritical ? 'bg-red-100 text-red-800 border-red-300' :
                gap.severity === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {gap.severity.charAt(0).toUpperCase() + gap.severity.slice(1)}
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-2">{gap.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Requirement: {gap.requirement}</span>
              <span>·</span>
              <span>Assignee: {gap.assignee}</span>
              <span>·</span>
              <span>Open {gap.daysOpen} days</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Resolution Summary *</label>
              <select
                required
                value={formData.resolution}
                onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select resolution type</option>
                <option value="corrective-action">Corrective Action Completed</option>
                <option value="policy-update">Policy/Procedure Updated</option>
                <option value="training-completed">Training Completed</option>
                <option value="documentation-updated">Documentation Updated</option>
                <option value="risk-accepted">Risk Accepted (with justification)</option>
                <option value="no-longer-applicable">No Longer Applicable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Action Taken *</label>
              <textarea
                required
                value={formData.actionTaken}
                onChange={(e) => setFormData({ ...formData, actionTaken: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Describe the specific actions taken to resolve this gap..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Preventative Measures</label>
              <textarea
                value={formData.preventativeMeasures}
                onChange={(e) => setFormData({ ...formData, preventativeMeasures: e.target.value })}
                rows={2}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="What measures will prevent this gap from recurring..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Verified By *</label>
                <select
                  required
                  value={formData.verifiedBy}
                  onChange={(e) => setFormData({ ...formData, verifiedBy: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select verifier</option>
                  <option value="Sarah Williams">Sarah Williams</option>
                  <option value="James Mitchell">James Mitchell</option>
                  <option value="Mary Thompson">Mary Thompson</option>
                  <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Resolution Date *</label>
                <input
                  type="date"
                  required
                  value={formData.resolutionDate}
                  onChange={(e) => setFormData({ ...formData, resolutionDate: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Upload Evidence */}
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Supporting Evidence</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-5 text-center hover:border-blue-300 transition-colors cursor-pointer">
                <Upload size={24} className="text-gray-300 mx-auto mb-1.5" />
                <p className="text-sm text-gray-500">Upload documents, screenshots, or evidence</p>
                <p className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG, DOC (max 10MB)</p>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="hidden" id="evidence-upload" multiple />
                <label htmlFor="evidence-upload" className="inline-block mt-2 px-3 py-1.5 text-xs bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors cursor-pointer">
                  Select Files
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Evidence Notes</label>
              <textarea
                value={formData.evidenceNotes}
                onChange={(e) => setFormData({ ...formData, evidenceNotes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Describe the evidence provided..."
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
                  { label: 'Notify compliance team of resolution', defaultChecked: true },
                  { label: 'Schedule follow-up review in 30 days', defaultChecked: true },
                  { label: 'Update risk register', defaultChecked: false },
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
            <button type="submit" className="flex items-center gap-1.5 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              <CheckCircle size={14} />
              Mark as Resolved
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
