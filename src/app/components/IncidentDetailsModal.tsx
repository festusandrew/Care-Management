import { X, Calendar, Clock, MapPin, User, AlertTriangle, FileText, Download, Edit, CheckCircle, Flag, Shield, Bell, Eye, Users, Plus, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './Badge';
import { Card } from './Card';

interface IncidentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: {
    id: number;
    incidentNumber: string;
    title: string;
    type: string;
    severity: string;
    serviceUser: string;
    userId: number;
    date: string;
    time: string;
    location: string;
    reportedBy: string;
    status: string;
    description: string;
    immediateAction: string;
    witnesses: string[];
    injuriesReported: boolean;
    policeNotified: boolean;
    familyNotified: boolean;
    followUpRequired: boolean;
  };
}

export function IncidentDetailsModal({ isOpen, onClose, incident }: IncidentDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'timeline' | 'investigation' | 'actions'>('details');
  const [investigationNotes, setInvestigationNotes] = useState('Preliminary investigation underway. Interviews scheduled with all parties involved.');
  const [followUpActions, setFollowUpActions] = useState([
    { id: 1, action: 'Review and update risk assessment', completed: false, assignedTo: 'James Mitchell', dueDate: '2025-12-10' },
    { id: 2, action: 'Schedule debrief with staff involved', completed: false, assignedTo: 'Sarah Williams', dueDate: '2025-12-08' },
    { id: 3, action: 'Update care plan if necessary', completed: false, assignedTo: 'Dr. Sarah Mitchell', dueDate: '2025-12-12' },
  ]);

  // Add action form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAction, setNewAction] = useState({ action: '', assignedTo: '', dueDate: '' });
  const [newActionError, setNewActionError] = useState('');

  // Edit action state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState({ action: '', assignedTo: '', dueDate: '' });

  const handleAddAction = () => {
    if (!newAction.action.trim()) { setNewActionError('Action description is required.'); return; }
    if (!newAction.assignedTo.trim()) { setNewActionError('Assigned to is required.'); return; }
    if (!newAction.dueDate) { setNewActionError('Due date is required.'); return; }
    setFollowUpActions(prev => [
      ...prev,
      { id: Date.now(), action: newAction.action.trim(), assignedTo: newAction.assignedTo.trim(), dueDate: newAction.dueDate, completed: false }
    ]);
    setNewAction({ action: '', assignedTo: '', dueDate: '' });
    setNewActionError('');
    setShowAddForm(false);
  };

  const handleStartEdit = (action: typeof followUpActions[0]) => {
    setEditingId(action.id);
    setEditDraft({ action: action.action, assignedTo: action.assignedTo, dueDate: action.dueDate });
  };

  const handleSaveEdit = (id: number) => {
    setFollowUpActions(prev => prev.map(a => a.id === id ? { ...a, ...editDraft } : a));
    setEditingId(null);
  };

  const handleDeleteAction = (id: number) => {
    setFollowUpActions(prev => prev.filter(a => a.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const timeline = [
    { id: 1, time: '14:30', action: 'Incident occurred', user: 'System', description: incident.description },
    { id: 2, time: '14:35', action: 'Incident reported', user: incident.reportedBy, description: 'Initial incident report submitted' },
    { id: 3, time: '14:40', action: 'Immediate action taken', user: incident.reportedBy, description: incident.immediateAction },
    { id: 4, time: '14:50', action: 'Senior management notified', user: 'System', description: 'Automatic notification sent to management team' },
    { id: 5, time: '15:00', action: 'Status updated to Under Investigation', user: 'James Mitchell', description: 'Investigation commenced' },
  ];

  if (!isOpen) return null;

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'high':
        return <Badge variant="red">High</Badge>;
      case 'medium':
        return <Badge variant="amber">Medium</Badge>;
      case 'low':
        return <Badge variant="green">Low</Badge>;
      default:
        return <Badge variant="gray">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open':
        return <Badge variant="red">Open</Badge>;
      case 'under-investigation':
        return <Badge variant="amber">Under Investigation</Badge>;
      case 'resolved':
        return <Badge variant="blue">Resolved</Badge>;
      case 'closed':
        return <Badge variant="gray">Closed</Badge>;
      default:
        return <Badge variant="gray">{status}</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={24} className="text-red-600" />
              <h2 className="text-2xl text-gray-900">{incident.title}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-blue-600">{incident.incidentNumber}</span>
              <span className="text-gray-300">•</span>
              {getSeverityBadge(incident.severity)}
              {getStatusBadge(incident.status)}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 pt-4 border-b border-gray-100">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              activeTab === 'details' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Incident Details
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              activeTab === 'timeline' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setActiveTab('investigation')}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              activeTab === 'investigation' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Investigation
          </button>
          <button
            onClick={() => setActiveTab('actions')}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              activeTab === 'actions' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Follow-up Actions
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Key Information */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-blue-600" />
                    <div>
                      <div className="text-xs text-gray-600">Service User</div>
                      <div className="text-sm text-gray-900">{incident.serviceUser}</div>
                    </div>
                  </div>
                </Card>
                <Card className="bg-green-50 border-green-100">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-green-600" />
                    <div>
                      <div className="text-xs text-gray-600">Date & Time</div>
                      <div className="text-sm text-gray-900">{incident.date} at {incident.time}</div>
                    </div>
                  </div>
                </Card>
                <Card className="bg-purple-50 border-purple-100">
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-purple-600" />
                    <div>
                      <div className="text-xs text-gray-600">Location</div>
                      <div className="text-sm text-gray-900">{incident.location}</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Incident Information */}
              <Card>
                <h3 className="text-gray-900 mb-4">Incident Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Incident Type</div>
                    <div className="text-sm text-gray-900">{incident.type}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Reported By</div>
                    <div className="text-sm text-gray-900">{incident.reportedBy}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Severity Level</div>
                    <div>{getSeverityBadge(incident.severity)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Current Status</div>
                    <div>{getStatusBadge(incident.status)}</div>
                  </div>
                </div>
              </Card>

              {/* Description */}
              <Card>
                <h3 className="text-gray-900 mb-3">Full Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{incident.description}</p>
              </Card>

              {/* Immediate Action */}
              <Card>
                <h3 className="text-gray-900 mb-3">Immediate Action Taken</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{incident.immediateAction}</p>
              </Card>

              {/* Witnesses */}
              {incident.witnesses.length > 0 && (
                <Card>
                  <h3 className="text-gray-900 mb-3">Witnesses</h3>
                  <div className="space-y-2">
                    {incident.witnesses.map((witness, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <Users size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-900">{witness}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Notifications & Flags */}
              <Card>
                <h3 className="text-gray-900 mb-3">Notifications & Key Indicators</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg border ${incident.injuriesReported ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={18} className={incident.injuriesReported ? 'text-red-600' : 'text-gray-400'} />
                      <span className="text-sm text-gray-900">Injuries Reported</span>
                      {incident.injuriesReported && <CheckCircle size={16} className="text-red-600 ml-auto" />}
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${incident.policeNotified ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-2">
                      <Shield size={18} className={incident.policeNotified ? 'text-blue-600' : 'text-gray-400'} />
                      <span className="text-sm text-gray-900">Police Notified</span>
                      {incident.policeNotified && <CheckCircle size={16} className="text-blue-600 ml-auto" />}
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${incident.familyNotified ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-2">
                      <Bell size={18} className={incident.familyNotified ? 'text-green-600' : 'text-gray-400'} />
                      <span className="text-sm text-gray-900">Family Notified</span>
                      {incident.familyNotified && <CheckCircle size={16} className="text-green-600 ml-auto" />}
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${incident.followUpRequired ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-2">
                      <Flag size={18} className={incident.followUpRequired ? 'text-amber-600' : 'text-gray-400'} />
                      <span className="text-sm text-gray-900">Follow-up Required</span>
                      {incident.followUpRequired && <CheckCircle size={16} className="text-amber-600 ml-auto" />}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Incident Timeline</h3>
                <span className="text-sm text-gray-600">{timeline.length} events recorded</span>
              </div>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                {/* Timeline Events */}
                <div className="space-y-4">
                  {timeline.map((event) => (
                    <div key={event.id} className="relative pl-12">
                      {/* Timeline Dot */}
                      <div className="absolute left-2 top-2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                      
                      <Card className="bg-white">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-sm text-gray-900">{event.action}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {event.time} • {event.user}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{event.description}</p>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Investigation Tab */}
          {activeTab === 'investigation' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-3">Investigation Status</h3>
                <Card className="bg-amber-50 border-amber-200">
                  <div className="flex items-center gap-3">
                    <Eye size={24} className="text-amber-600" />
                    <div>
                      <div className="text-sm text-gray-900">Investigation in Progress</div>
                      <div className="text-xs text-gray-600 mt-1">Assigned to: James Mitchell • Started: 7 Dec 2025</div>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Investigation Notes</h3>
                <textarea
                  value={investigationNotes}
                  onChange={(e) => setInvestigationNotes(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Document investigation findings, interviews conducted, evidence gathered..."
                />
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Interview Log</h3>
                <div className="space-y-2">
                  <Card className="bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User size={18} className="text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-900">John Davies (Staff Witness)</div>
                          <div className="text-xs text-gray-600">Interview scheduled: 8 Dec 2025, 10:00</div>
                        </div>
                      </div>
                      <Badge variant="gray">Pending</Badge>
                    </div>
                  </Card>
                  <Card className="bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User size={18} className="text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-900">{incident.serviceUser} (Involved Service User)</div>
                          <div className="text-xs text-gray-600">Interview scheduled: 8 Dec 2025, 14:00</div>
                        </div>
                      </div>
                      <Badge variant="gray">Pending</Badge>
                    </div>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Evidence & Documentation</h3>
                <Card className="bg-gray-50 border-2 border-dashed border-gray-200">
                  <div className="text-center py-6">
                    <FileText size={32} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload supporting documentation</p>
                    <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Upload Files
                    </button>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Follow-up Actions Tab */}
          {activeTab === 'actions' && (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900">Follow-up Actions</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{followUpActions.filter(a => !a.completed).length} pending · {followUpActions.filter(a => a.completed).length} completed</p>
                </div>
                {!showAddForm && (
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => { setShowAddForm(true); setNewActionError(''); }}
                  >
                    <Plus size={15} />
                    Add Action
                  </button>
                )}
              </div>

              {/* Add Action inline form */}
              {showAddForm && (
                <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-blue-800">New Follow-up Action</h4>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Action Description <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={newAction.action}
                      onChange={e => setNewAction(p => ({ ...p, action: e.target.value }))}
                      placeholder="e.g. Review and update risk assessment"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Assigned To <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={newAction.assignedTo}
                        onChange={e => setNewAction(p => ({ ...p, assignedTo: e.target.value }))}
                        placeholder="e.g. James Mitchell"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Due Date <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        value={newAction.dueDate}
                        onChange={e => setNewAction(p => ({ ...p, dueDate: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                      />
                    </div>
                  </div>
                  {newActionError && <p className="text-xs text-red-600">{newActionError}</p>}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handleAddAction}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save size={14} />
                      Save Action
                    </button>
                    <button
                      onClick={() => { setShowAddForm(false); setNewAction({ action: '', assignedTo: '', dueDate: '' }); setNewActionError(''); }}
                      className="px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Actions list */}
              <div className="space-y-3">
                {followUpActions.map((action) => (
                  <Card key={action.id} className={action.completed ? 'bg-gray-50 opacity-75' : 'bg-white'}>
                    {editingId === action.id ? (
                      /* Edit mode */
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Action Description</label>
                          <input
                            type="text"
                            value={editDraft.action}
                            onChange={e => setEditDraft(p => ({ ...p, action: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Assigned To</label>
                            <input
                              type="text"
                              value={editDraft.assignedTo}
                              onChange={e => setEditDraft(p => ({ ...p, assignedTo: e.target.value }))}
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Due Date</label>
                            <input
                              type="date"
                              value={editDraft.dueDate}
                              onChange={e => setEditDraft(p => ({ ...p, dueDate: e.target.value }))}
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleSaveEdit(action.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Save size={13} />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDeleteAction(action.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors ml-auto"
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* View mode */
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={action.completed}
                          onChange={() => setFollowUpActions(prev => prev.map(a => a.id === action.id ? { ...a, completed: !a.completed } : a))}
                          className="mt-0.5 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm ${action.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {action.action}
                          </div>
                          <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <User size={11} />
                              <span>{action.assignedTo}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={11} />
                              <span>Due {formatDisplayDate(action.dueDate)}</span>
                            </div>
                          </div>
                        </div>
                        {!action.completed && (
                          <button
                            onClick={() => handleStartEdit(action)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors shrink-0"
                          >
                            <Edit size={12} />
                            Edit
                          </button>
                        )}
                      </div>
                    )}
                  </Card>
                ))}

                {followUpActions.length === 0 && (
                  <div className="text-center py-10 text-gray-400">
                    <CheckCircle size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No follow-up actions yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-white transition-colors">
              <Download size={16} />
              Export as PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-white transition-colors">
              <Edit size={16} />
              Edit Incident
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-white transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
