import { X, Calendar, Clock, MapPin, User, AlertTriangle, FileText, Users, Shield, Bell } from 'lucide-react';
import { useState } from 'react';

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportIncidentModal({ isOpen, onClose }: ReportIncidentModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    severity: '',
    serviceUser: '',
    date: '',
    time: '',
    location: '',
    reportedBy: '',
    description: '',
    immediateAction: '',
    witnesses: [] as string[],
    injuriesReported: false,
    policeNotified: false,
    familyNotified: false,
    followUpRequired: false,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Incident reported:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-red-50">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} className="text-red-600" />
            <h2 className="text-xl text-gray-900">Report New Incident</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Incident Title */}
                <div className="col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    Incident Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Brief description of the incident"
                  />
                </div>

                {/* Incident Type */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Incident Type *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="Medication">Medication Error</option>
                    <option value="Accident/Injury">Accident/Injury</option>
                    <option value="Safeguarding">Safeguarding Concern</option>
                    <option value="Property Damage">Property Damage</option>
                    <option value="Medical">Medical Emergency</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Severity */}
                <div className="col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    Severity Level *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: 'low',      label: 'Low',      desc: 'Minor — no immediate risk',           dot: 'bg-green-500',  bg: 'bg-green-50',  border: 'border-green-400',  text: 'text-green-800'  },
                      { value: 'medium',   label: 'Medium',   desc: 'Moderate — requires attention',       dot: 'bg-amber-500',  bg: 'bg-amber-50',  border: 'border-amber-400',  text: 'text-amber-800'  },
                      { value: 'high',     label: 'High',     desc: 'Serious — immediate action needed',   dot: 'bg-orange-500', bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-800' },
                      { value: 'critical', label: 'Critical', desc: 'Life-threatening or major safeguarding', dot: 'bg-red-600', bg: 'bg-red-50',    border: 'border-red-500',    text: 'text-red-900'    },
                    ].map(opt => {
                      const selected = formData.severity === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, severity: opt.value })}
                          className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border-2 transition-all text-center ${
                            selected
                              ? `${opt.bg} ${opt.border} ${opt.text} shadow-sm`
                              : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className={`w-3 h-3 rounded-full ${selected ? opt.dot : 'bg-gray-300'}`} />
                          <span className="text-xs font-semibold">{opt.label}</span>
                          <span className={`text-xs leading-tight ${selected ? 'opacity-80' : 'text-gray-400'}`}>{opt.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                  {formData.severity === 'critical' && (
                    <div className="mt-2 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700">
                      <AlertTriangle size={13} className="shrink-0 mt-0.5" />
                      Critical incidents must be escalated immediately to the care manager and reported to the relevant authority within 24 hours.
                    </div>
                  )}
                  {formData.severity === 'high' && (
                    <div className="mt-2 flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-xs text-orange-700">
                      <AlertTriangle size={13} className="shrink-0 mt-0.5" />
                      High severity incidents should be reviewed by the care manager and documented fully by end of shift.
                    </div>
                  )}
                </div>

                {/* Service User */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Service User Involved *
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      required
                      value={formData.serviceUser}
                      onChange={(e) => setFormData({ ...formData, serviceUser: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select service user</option>
                      <option value="Sarah Johnson">Sarah Johnson</option>
                      <option value="Michael Chen">Michael Chen</option>
                      <option value="Emma Wilson">Emma Wilson</option>
                      <option value="James Rodriguez">James Rodriguez</option>
                    </select>
                  </div>
                </div>

                {/* Reported By */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Reported By *
                  </label>
                  <select
                    required
                    value={formData.reportedBy}
                    onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select staff member</option>
                    <option value="Mary Thompson">Mary Thompson</option>
                    <option value="John Davies">John Davies</option>
                    <option value="Sarah Williams">Sarah Williams</option>
                    <option value="James Mitchell">James Mitchell</option>
                    <option value="Emily Roberts">Emily Roberts</option>
                    <option value="David Brown">David Brown</option>
                    <option value="Lisa Anderson">Lisa Anderson</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Date, Time & Location */}
            <div>
              <h3 className="text-gray-900 mb-4">When & Where</h3>
              <div className="grid grid-cols-3 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Date of Incident *
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

                {/* Time */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Time of Incident *
                  </label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
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
                      <option value="Main House">Main House</option>
                      <option value="Annex Building">Annex Building</option>
                      <option value="Garden">Garden</option>
                      <option value="Common Room">Common Room</option>
                      <option value="Dining Area">Dining Area</option>
                      <option value="Bathroom">Bathroom</option>
                      <option value="Bedroom">Bedroom</option>
                      <option value="Off-Site">Off-Site</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Incident Details */}
            <div>
              <h3 className="text-gray-900 mb-4">Incident Details</h3>
              <div className="space-y-4">
                {/* Description */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Full Description of Incident *
                  </label>
                  <div className="relative">
                    <FileText size={18} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Provide a detailed account of what happened, including events leading up to the incident..."
                    />
                  </div>
                </div>

                {/* Immediate Action */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Immediate Action Taken *
                  </label>
                  <textarea
                    required
                    value={formData.immediateAction}
                    onChange={(e) => setFormData({ ...formData, immediateAction: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Describe the immediate actions taken to address the incident..."
                  />
                </div>

                {/* Witnesses */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Witnesses
                  </label>
                  <div className="relative">
                    <Users size={18} className="absolute left-3 top-3 text-gray-400" />
                    <select
                      multiple
                      value={formData.witnesses}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, option => option.value);
                        setFormData({ ...formData, witnesses: selected });
                      }}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      size={3}
                    >
                      <option value="Mary Thompson">Mary Thompson</option>
                      <option value="John Davies">John Davies</option>
                      <option value="Sarah Williams">Sarah Williams</option>
                      <option value="James Mitchell">James Mitchell</option>
                      <option value="Emily Roberts">Emily Roberts</option>
                      <option value="David Brown">David Brown</option>
                      <option value="Lisa Anderson">Lisa Anderson</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple witnesses</p>
                </div>
              </div>
            </div>

            {/* Notifications & Flags */}
            <div>
              <h3 className="text-gray-900 mb-4">Notifications & Follow-up</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.injuriesReported}
                    onChange={(e) => setFormData({ ...formData, injuriesReported: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={18} className="text-red-600" />
                    <span className="text-sm text-gray-900">Injuries reported</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.policeNotified}
                    onChange={(e) => setFormData({ ...formData, policeNotified: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <Shield size={18} className="text-blue-600" />
                    <span className="text-sm text-gray-900">Police notified</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.familyNotified}
                    onChange={(e) => setFormData({ ...formData, familyNotified: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <Bell size={18} className="text-green-600" />
                    <span className="text-sm text-gray-900">Family/Next of kin notified</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.followUpRequired}
                    onChange={(e) => setFormData({ ...formData, followUpRequired: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-amber-600" />
                    <span className="text-sm text-gray-900">Follow-up action required</span>
                  </div>
                </label>
              </div>
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
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Submit Incident Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
