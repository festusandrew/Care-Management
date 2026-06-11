import { X, User, Mail, Phone, Building, Shield, Key, Save, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function AddUserModal({ isOpen, onClose, onSave }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: '',
    employeeId: '',
    role: 'Support Worker',
    status: 'active',
    startDate: '',
    sendWelcomeEmail: true,
    requirePasswordChange: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
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
                <User className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Add New User</h2>
                <p className="text-sm text-gray-600 mt-1">Create a new staff account with role-based permissions</p>
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
          {/* Personal Information */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.firstName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.lastName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Smith"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="john.smith@mpoweredcare.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="+44 7700 900123"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Employment Details */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Employment Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Employee ID *
                </label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.employeeId ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="EMP-001"
                />
                {errors.employeeId && (
                  <p className="text-xs text-red-600 mt-1">{errors.employeeId}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Support Worker, Care Manager"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Department
                </label>
                <div className="relative">
                  <Building size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select department...</option>
                    <option value="Clinical Services">Clinical Services</option>
                    <option value="Support Services">Support Services</option>
                    <option value="Administration">Administration</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.startDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.startDate && (
                  <p className="text-xs text-red-600 mt-1">{errors.startDate}</p>
                )}
              </div>
            </div>
          </section>

          {/* Role & Permissions */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Role & Permissions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  System Role *
                </label>
                <div className="relative">
                  <Shield size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Admin">Admin - Full system access</option>
                    <option value="Care Manager">Care Manager - Comprehensive access</option>
                    <option value="Senior Support Worker">Senior Support Worker - Extended permissions</option>
                    <option value="Support Worker">Support Worker - Standard access</option>
                    <option value="Nurse">Nurse - Medical access</option>
                    <option value="Compliance Officer">Compliance Officer - Audit & compliance</option>
                  </select>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Role determines access levels to different modules and features
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Account Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="active">Active - Can access system</option>
                  <option value="inactive">Inactive - Cannot access system</option>
                  <option value="pending">Pending - Awaiting activation</option>
                </select>
              </div>
            </div>

            {/* Role Permissions Preview */}
            <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-medium text-gray-900 mb-3">Permissions for {formData.role}:</p>
              <div className="grid grid-cols-2 gap-2">
                {formData.role === 'Admin' && (
                  <>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Full system access
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      User management
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      All modules
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      System settings
                    </div>
                  </>
                )}
                {formData.role === 'Care Manager' && (
                  <>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Service users (full)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Care plans (edit)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Medications (full)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Compliance (view)
                    </div>
                  </>
                )}
                {formData.role === 'Senior Support Worker' && (
                  <>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Daily logs (create/edit)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Medications (administer)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Activities (manage)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Incidents (report)
                    </div>
                  </>
                )}
                {formData.role === 'Support Worker' && (
                  <>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Daily logs (create)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Medications (view)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Activities (participate)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      Limited access
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Account Setup */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Account Setup</h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sendWelcomeEmail}
                  onChange={(e) => setFormData({ ...formData, sendWelcomeEmail: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Send welcome email</p>
                  <p className="text-xs text-gray-600 mt-1">
                    User will receive an email with login instructions and temporary password
                  </p>
                </div>
              </label>
              <label className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requirePasswordChange}
                  onChange={(e) => setFormData({ ...formData, requirePasswordChange: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Require password change on first login</p>
                  <p className="text-xs text-gray-600 mt-1">
                    User must create a new password when they first access the system
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* Warning */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-blue-600 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-900">Account Creation</p>
                <p className="text-xs text-gray-700 mt-1">
                  A new user account will be created with the specified role and permissions. The user will be able to access the system once activated.
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
            Create User Account
          </button>
        </div>
      </div>
    </div>
  );
}
