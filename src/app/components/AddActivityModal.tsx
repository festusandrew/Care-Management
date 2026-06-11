import { X, Calendar, Clock, Users, MapPin, FileText, Tag } from 'lucide-react';
import { useState } from 'react';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddActivityModal({ isOpen, onClose }: AddActivityModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    facilitator: '',
    maxCapacity: '',
    participants: [] as string[],
    description: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Activity added:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl text-gray-900">Add New Activity</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Activity Name */}
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-2">
                Activity Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                placeholder="e.g., Group Therapy Session, Art Class"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Activity Type *
              </label>
              <div className="relative">
                <Tag size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="Therapeutic">Therapeutic</option>
                  <option value="Creative">Creative</option>
                  <option value="Physical">Physical</option>
                  <option value="Educational">Educational</option>
                  <option value="Social">Social</option>
                  <option value="Recreational">Recreational</option>
                  <option value="Life Skills">Life Skills</option>
                </select>
              </div>
            </div>

            {/* Facilitator */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Facilitator *
              </label>
              <select
                required
                value={formData.facilitator}
                onChange={(e) => setFormData({ ...formData, facilitator: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="">Select facilitator</option>
                <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell</option>
                <option value="Mary Thompson">Mary Thompson</option>
                <option value="John Davies">John Davies</option>
                <option value="Sarah Williams">Sarah Williams</option>
                <option value="James Mitchell">James Mitchell</option>
                <option value="Emily Roberts">Emily Roberts</option>
                <option value="David Brown">David Brown</option>
                <option value="Lisa Anderson">Lisa Anderson</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Date *
              </label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Start Time *
              </label>
              <div className="relative">
                <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                End Time *
              </label>
              <div className="relative">
                <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="time"
                  required
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Location *
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select location</option>
                  <option value="Therapy Room">Therapy Room</option>
                  <option value="Art Studio">Art Studio</option>
                  <option value="Garden">Garden</option>
                  <option value="Music Room">Music Room</option>
                  <option value="Library">Library</option>
                  <option value="Common Room">Common Room</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Quiet Room">Quiet Room</option>
                </select>
              </div>
            </div>

            {/* Max Capacity */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Max Capacity *
              </label>
              <input
                type="number"
                required
                min="1"
                max="50"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                placeholder="e.g., 8"
              />
            </div>

            {/* Participants */}
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-2">
                Participants (Pre-register)
              </label>
              <div className="relative">
                <Users size={18} className="absolute left-3 top-3 text-gray-400" />
                <select
                  multiple
                  value={formData.participants}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData({ ...formData, participants: selected });
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  size={4}
                >
                  <option value="Sarah Johnson">Sarah Johnson</option>
                  <option value="Michael Chen">Michael Chen</option>
                  <option value="Emma Wilson">Emma Wilson</option>
                  <option value="James Rodriguez">James Rodriguez</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple participants</p>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-2">
                Description
              </label>
              <div className="relative">
                <FileText size={18} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Brief description of the activity..."
                />
              </div>
            </div>

            {/* Notes */}
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                placeholder="Any additional notes or special requirements..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
