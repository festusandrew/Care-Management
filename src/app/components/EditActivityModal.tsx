import { X, Calendar, Clock, MapPin, Users, User, Save, AlertTriangle, Brain, Palette, Dumbbell, Music, BookOpen, Heart } from 'lucide-react';
import { useState } from 'react';

interface EditActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: any;
  onSave: (data: any) => void;
}

export function EditActivityModal({ isOpen, onClose, activity, onSave }: EditActivityModalProps) {
  const [formData, setFormData] = useState({
    name: activity?.name || '',
    type: activity?.type || 'Therapeutic',
    date: activity?.date ? new Date(activity.date).toISOString().split('T')[0] : '',
    startTime: activity?.time ? activity.time.split(' - ')[0] : '10:00',
    endTime: activity?.time ? activity.time.split(' - ')[1] : '11:00',
    location: activity?.location || 'Main House',
    facilitator: activity?.facilitator || '',
    maxCapacity: activity?.maxCapacity || 6,
    participants: activity?.participants || [],
    description: activity?.notes || '',
    materials: 'Art supplies, canvas, watercolors',
    objectives: 'Promote creativity and self-expression through artistic activities',
    requiredSupport: '1:3 staff-to-participant ratio',
    riskAssessment: 'Low risk activity. Standard supervision required.'
  });

  if (!isOpen || !activity) return null;

  const calculateDuration = () => {
    const start = parseInt(formData.startTime.split(':')[0]) * 60 + parseInt(formData.startTime.split(':')[1]);
    const end = parseInt(formData.endTime.split(':')[0]) * 60 + parseInt(formData.endTime.split(':')[1]);
    let duration = end - start;
    if (duration < 0) duration += 24 * 60;
    return `${Math.floor(duration / 60)}h ${duration % 60}m`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, activityId: activity.id, duration: calculateDuration() });
    onClose();
  };

  const allServiceUsers = [
    'Sarah Johnson',
    'Michael Chen',
    'Emma Wilson',
    'James Rodriguez',
    'Oliver Brown',
    'Sophia Lee',
    'Liam Martinez',
    'Ava Taylor'
  ];

  const toggleParticipant = (user: string) => {
    if (formData.participants.includes(user)) {
      setFormData({
        ...formData,
        participants: formData.participants.filter((u: string) => u !== user)
      });
    } else {
      if (formData.participants.length < formData.maxCapacity) {
        setFormData({
          ...formData,
          participants: [...formData.participants, user]
        });
      }
    }
  };

  const getTypeIcon = () => {
    switch (formData.type) {
      case 'Therapeutic': return Brain;
      case 'Creative': return Palette;
      case 'Physical': return Dumbbell;
      case 'Educational': return BookOpen;
      case 'Social': return Heart;
      default: return Music;
    }
  };

  const TypeIcon = getTypeIcon();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-purple-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 rounded-lg p-3 shadow-md">
                <TypeIcon className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Edit Activity</h2>
                <p className="text-sm text-gray-600 mt-1">Update activity details and assignments</p>
                <p className="text-xs text-gray-500 mt-1">Activity ID: ACT-{activity.id.toString().padStart(6, '0')}</p>
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
          {/* Basic Information */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Activity Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Art Class, Music Therapy, Exercise Session"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Activity Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="Therapeutic">Therapeutic</option>
                  <option value="Creative">Creative</option>
                  <option value="Physical">Physical</option>
                  <option value="Educational">Educational</option>
                  <option value="Social">Social</option>
                  <option value="Recreational">Recreational</option>
                  <option value="Life Skills">Life Skills</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Location *
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="Main House">Main House</option>
                  <option value="Therapy Room">Therapy Room</option>
                  <option value="Art Studio">Art Studio</option>
                  <option value="Garden">Garden</option>
                  <option value="Community Room">Community Room</option>
                  <option value="Gym">Gym</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Music Room">Music Room</option>
                  <option value="Outdoor Area">Outdoor Area</option>
                  <option value="Off-Site">Off-Site</option>
                </select>
              </div>
            </div>
          </section>

          {/* Date & Time */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Schedule</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="mt-3 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Duration:</span> {calculateDuration()}
              </p>
            </div>
          </section>

          {/* Facilitator & Capacity */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Staffing & Capacity</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Facilitator / Lead Staff *
                </label>
                <select
                  value={formData.facilitator}
                  onChange={(e) => setFormData({ ...formData, facilitator: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select facilitator...</option>
                  <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell</option>
                  <option value="Mary Thompson">Mary Thompson</option>
                  <option value="John Davies">John Davies</option>
                  <option value="Sarah Williams">Sarah Williams</option>
                  <option value="James Mitchell">James Mitchell</option>
                  <option value="Emily Roberts">Emily Roberts</option>
                  <option value="David Brown">David Brown</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Maximum Capacity *
                </label>
                <input
                  type="number"
                  value={formData.maxCapacity}
                  onChange={(e) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  min="1"
                  max="20"
                  required
                />
                <p className="text-xs text-gray-600 mt-1">
                  Current: {formData.participants.length} / {formData.maxCapacity}
                </p>
              </div>
            </div>
          </section>

          {/* Participants */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Participants</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {allServiceUsers.map((user) => {
                  const isSelected = formData.participants.includes(user);
                  const isCapacityFull = formData.participants.length >= formData.maxCapacity && !isSelected;
                  
                  return (
                    <label
                      key={user}
                      className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                        isCapacityFull ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleParticipant(user)}
                        disabled={isCapacityFull}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-900">{user}</span>
                    </label>
                  );
                })}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  {formData.participants.length} participant(s) selected
                </p>
                {formData.participants.length >= formData.maxCapacity && (
                  <span className="text-xs text-amber-600 font-medium">
                    Maximum capacity reached
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Activity Details */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Activity Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description / Purpose
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                  rows={3}
                  placeholder="Brief description of the activity and its purpose"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Learning Objectives / Goals
                </label>
                <textarea
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                  rows={2}
                  placeholder="What outcomes are expected from this activity?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Materials / Resources Required
                </label>
                <textarea
                  value={formData.materials}
                  onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                  rows={2}
                  placeholder="List any materials, equipment, or resources needed"
                />
              </div>
            </div>
          </section>

          {/* Support Requirements */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Support & Risk Assessment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Required Support / Staff Ratio
                </label>
                <input
                  type="text"
                  value={formData.requiredSupport}
                  onChange={(e) => setFormData({ ...formData, requiredSupport: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., 1:3 staff-to-participant ratio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Risk Assessment Notes
                </label>
                <textarea
                  value={formData.riskAssessment}
                  onChange={(e) => setFormData({ ...formData, riskAssessment: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                  rows={3}
                  placeholder="Identify any risks and mitigation strategies"
                />
              </div>
            </div>
          </section>

          {/* Warning */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-blue-600 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-900">Changes will be saved immediately</p>
                <p className="text-xs text-gray-700 mt-1">
                  All participants and staff members will be notified of any changes to this activity
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
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
