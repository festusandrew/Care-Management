import { X, CheckCircle2, Calendar, Clock, User, AlertTriangle, AlertCircle, Flag, FileText } from 'lucide-react';
import { useState } from 'react';

interface EditIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: any; // could be typed later
  onSave: (updated: any) => void;
}

export function EditIncidentModal({ isOpen, onClose, incident, onSave }: EditIncidentModalProps) {
  const [title, setTitle] = useState(incident?.title || '');
  const [type, setType] = useState(incident?.type || '');
  const [severity, setSeverity] = useState(incident?.severity || 'low');
  const [description, setDescription] = useState(incident?.description || '');
  const [status, setStatus] = useState(incident?.status || 'open');

  const handleSave = () => {
    const updated = {
      ...incident,
      title,
      type,
      severity,
      description,
      status,
    };
    onSave(updated);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">Edit Incident</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Severity</label>
            <select
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="under-investigation">Under Investigation</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
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
