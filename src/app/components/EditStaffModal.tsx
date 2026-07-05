import { useState } from 'react';
import { X, CheckCircle, Edit, User, Phone, Mail, MapPin, Save, X as XIcon } from 'lucide-react';
import { api } from '../services/api'; // placeholder if needed

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: {
    employeeId: string;
    name: string;
    role: string;
    status: string;
    email: string;
    phone: string;
    location: string;
    avatarUrl: string;
  };
  onSave?: (updated: any) => void;
}

const INPUT = "w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors";
const LABEL = "block text-xs text-gray-500 mb-1";

export function EditStaffModal({ isOpen, onClose, staff, onSave }: EditStaffModalProps) {
  const [name, setName] = useState(staff.name);
  const [role, setRole] = useState(staff.role);
  const [email, setEmail] = useState(staff.email);
  const [phone, setPhone] = useState(staff.phone);
  const [location, setLocation] = useState(staff.location);
  const [showErrors, setShowErrors] = useState(false);

  const isFormValid = name && role && email && phone && location;

  const handleSave = () => {
    if (!isFormValid) {
      setShowErrors(true);
      return;
    }
    const updated = { ...staff, name, role, email, phone, location };
    if (onSave) onSave(updated);
    console.log('Staff updated', updated);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50" aria-modal="true" role="dialog">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h2 className="text-lg font-medium text-gray-900">Edit Staff Profile</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 transition-colors" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className={LABEL}>Name</label>
            <input
              type="text"
              className={`${INPUT} ${showErrors && !name ? 'border-red-500' : ''}`}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className={LABEL}>Role</label>
            <input
              type="text"
              className={`${INPUT} ${showErrors && !role ? 'border-red-500' : ''}`}
              value={role}
              onChange={e => setRole(e.target.value)}
            />
          </div>
          <div>
            <label className={LABEL}>Email</label>
            <input
              type="email"
              className={`${INPUT} ${showErrors && !email ? 'border-red-500' : ''}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className={LABEL}>Phone</label>
            <input
              type="tel"
              className={`${INPUT} ${showErrors && !phone ? 'border-red-500' : ''}`}
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className={LABEL}>Location</label>
            <input
              type="text"
              className={`${INPUT} ${showErrors && !location ? 'border-red-500' : ''}`}
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-100 p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
