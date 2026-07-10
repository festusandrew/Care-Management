import { X, Calendar, User, Award, Upload, Bell } from 'lucide-react';
import { useState } from 'react';

interface AddCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCertificateModal({ isOpen, onClose }: AddCertificateModalProps) {
  const [formData, setFormData] = useState({
    certificateType: '',
    staffMember: '',
    certificateNumber: '',
    issueDate: '',
    expiryDate: '',
    issuingBody: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Certificate added:', formData);
    onClose();
  };

  const staffList = [
    'Mary Thompson', 'John Davies', 'Sarah Williams', 'James Mitchell',
    'Emily Roberts', 'David Brown', 'Lisa Anderson', 'Dr. Sarah Mitchell',
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <Award size={18} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">Add Certificate</h2>
              <p className="text-xs text-gray-500">Record a new staff certificate or licence</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Certificate Type *</label>
                <select
                  required
                  value={(!formData.certificateType || ['DBS Check', 'Professional Registration', 'Food Hygiene Certificate', 'Driving License', 'First Aid Certificate', 'NVQ/Diploma'].includes(formData.certificateType)) ? formData.certificateType : 'Other'}
                  onChange={(e) => setFormData({ ...formData, certificateType: e.target.value === 'Other' ? '' : e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="DBS Check">DBS Check</option>
                  <option value="Professional Registration">Professional Registration (NMC/GMC)</option>
                  <option value="Food Hygiene Certificate">Food Hygiene Certificate</option>
                  <option value="Driving License">Driving License</option>
                  <option value="First Aid Certificate">First Aid Certificate</option>
                  <option value="NVQ/Diploma">NVQ/Diploma</option>
                  <option value="Other">Other</option>
                </select>
                {formData.certificateType !== undefined && formData.certificateType !== '' && !['DBS Check', 'Professional Registration', 'Food Hygiene Certificate', 'Driving License', 'First Aid Certificate', 'NVQ/Diploma'].includes(formData.certificateType) && (
                  <input
                    type="text"
                    required
                    placeholder="Specify other certificate type..."
                    className="w-full mt-2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={formData.certificateType}
                    onChange={(e) => setFormData({ ...formData, certificateType: e.target.value })}
                  />
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Staff Member *</label>
                <select
                  required
                  value={formData.staffMember}
                  onChange={(e) => setFormData({ ...formData, staffMember: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select staff</option>
                  {staffList.map((staff) => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Certificate / Reference Number *</label>
              <input
                type="text"
                required
                value={formData.certificateNumber}
                onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., DBS-001234567"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Issuing Body *</label>
              <input
                type="text"
                required
                value={formData.issuingBody}
                onChange={(e) => setFormData({ ...formData, issuingBody: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., Disclosure and Barring Service"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Issue Date *</label>
                <input
                  type="date"
                  required
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Expiry Date</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">Leave blank if no expiry</p>
              </div>
            </div>

            {/* Upload */}
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Upload Document</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors cursor-pointer">
                <Upload size={28} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PDF, JPG, PNG or DOC (max 10MB)</p>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="hidden" id="cert-upload" />
                <label htmlFor="cert-upload" className="inline-block mt-3 px-3 py-1.5 text-xs bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors cursor-pointer">
                  Select File
                </label>
              </div>
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

            {/* Reminders */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bell size={14} className="text-gray-500" />
                <span className="text-sm text-gray-700">Renewal Reminders</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: 'Remind 90 days before expiry', defaultChecked: true },
                  { label: 'Remind 30 days before expiry', defaultChecked: true },
                  { label: 'Notify compliance team', defaultChecked: false },
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
              Add Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
