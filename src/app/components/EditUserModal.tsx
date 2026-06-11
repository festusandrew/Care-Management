import { X, User, Mail, Phone, Building, Shield, Save, AlertTriangle, Trash2, Lock } from 'lucide-react';
import { useState } from 'react';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSave: (data: any) => void;
}

export function EditUserModal({ isOpen, onClose, user, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+44 7700 900123',
    jobTitle: '',
    department: 'Clinical Services',
    employeeId: `EMP-${String(user?.id).padStart(3, '0')}`,
    role: user?.role || 'Support Worker',
    status: user?.status || 'active',
    startDate: '2024-01-15',
    lastLogin: user?.lastLogin || ''
  });

  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, userId: user.id });
    onClose();
  };

  const handleDeactivate = () => {
    console.log('Deactivating user:', user.id);
    setFormData({ ...formData, status: 'inactive' });
    setShowDeactivateConfirm(false);
  };

  const handleResetPassword = () => {
    console.log('Resetting password for user:', user.id);
    setShowResetPassword(false);
    // In real app, this would send a password reset email
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-lg shadow-md">
                {user.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Edit User Account</h2>
                <p className="text-sm text-gray-600 mt-1">{user.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    formData.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {formData.status}
                  </span>
                  <span className="text-xs text-gray-500">User ID: U-{String(user.id).padStart(4, '0')}</span>
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

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          {/* Personal Information */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Employee ID
                </label>
                <input
                  type="text"
                  value={formData.employeeId}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  disabled
                />
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
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
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Last Login
                </label>
                <input
                  type="text"
                  value={formData.lastLogin}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  disabled
                />
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
                  <option value="suspended">Suspended - Temporarily disabled</option>
                </select>
              </div>
            </div>
          </section>

          {/* Security Actions */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Security Actions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Reset Password</p>
                  <p className="text-xs text-gray-600 mt-1">Send password reset email to user</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowResetPassword(true)}
                  className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Send Reset Link
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">End All Sessions</p>
                  <p className="text-xs text-gray-600 mt-1">Log user out of all devices</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  End Sessions
                </button>
              </div>

              {formData.status === 'active' && (
                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Deactivate Account</p>
                    <p className="text-xs text-gray-600 mt-1">User will no longer be able to access the system</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDeactivateConfirm(true)}
                    className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Deactivate
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Warning */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-blue-600 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-900">Account Changes</p>
                <p className="text-xs text-gray-700 mt-1">
                  Changes to role and permissions will take effect immediately. The user may need to log out and back in to see changes.
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

      {/* Deactivate Confirmation Modal */}
      {showDeactivateConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/20">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-red-100 rounded-full p-3">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Deactivate User Account?</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {user.name} will no longer be able to access the system. This action can be reversed by reactivating the account.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDeactivateConfirm(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeactivate}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Confirmation Modal */}
      {showResetPassword && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/20">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Lock className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Send Password Reset?</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    A password reset link will be sent to {formData.email}. The user will need to create a new password.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowResetPassword(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Reset Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
