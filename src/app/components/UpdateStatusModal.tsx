import { X, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: any; // could be typed later
  onSave: (newStatus: string) => void;
}

export function UpdateStatusModal({ isOpen, onClose, incident, onSave }: UpdateStatusModalProps) {
  const [status, setStatus] = useState(incident?.status || 'open');

  const handleSave = () => {
    onSave(status);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">Update Incident Status</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="open">Open</option>
            <option value="under-investigation">Under Investigation</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-sm text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <CheckCircle2 size={16} className="inline mr-1" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}
