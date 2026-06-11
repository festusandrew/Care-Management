import { X, Calendar, Clock, MapPin, User, Users, CheckCircle, XCircle, Star, Edit, Trash2, FileText, Image, TrendingUp, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './Badge';
import { Card } from './Card';

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: {
    id: number;
    name: string;
    type: string;
    date: string;
    time: string;
    duration: string;
    location: string;
    facilitator: string;
    participants: string[];
    maxCapacity: number;
    status: string;
    engagement: string;
    notes: string;
    icon: any;
    color: string;
  };
}

export function ActivityDetailsModal({ isOpen, onClose, activity }: ActivityDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'attendance' | 'engagement' | 'notes'>('details');
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'partial'>>({
    'Sarah Johnson': 'present',
    'Michael Chen': 'present',
    'Emma Wilson': 'absent',
    'James Rodriguez': 'present',
  });
  const [engagementScores, setEngagementScores] = useState<Record<string, number>>({
    'Sarah Johnson': 5,
    'Michael Chen': 4,
    'Emma Wilson': 0,
    'James Rodriguez': 4,
  });
  const [activityNotes, setActivityNotes] = useState('');
  const [participantNotes, setParticipantNotes] = useState<Record<string, string>>({
    'Sarah Johnson': 'Very engaged, showed great enthusiasm for the activity.',
    'Michael Chen': 'Participated well, needed some encouragement initially.',
    'Emma Wilson': '',
    'James Rodriguez': 'Active participant, helped others during the session.',
  });

  if (!isOpen) return null;

  const Icon = activity.icon;

  const getTypeColor = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'bg-purple-100 text-purple-700 border-purple-300',
      pink: 'bg-pink-100 text-pink-700 border-pink-300',
      green: 'bg-green-100 text-green-700 border-green-300',
      blue: 'bg-blue-100 text-blue-700 border-blue-300',
      amber: 'bg-amber-100 text-amber-700 border-amber-300',
      teal: 'bg-teal-100 text-teal-700 border-teal-300',
      orange: 'bg-orange-100 text-orange-700 border-orange-300',
      indigo: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    };
    return colors[color] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge variant="green">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="blue">In Progress</Badge>;
      case 'scheduled':
        return <Badge variant="gray">Scheduled</Badge>;
      case 'cancelled':
        return <Badge variant="red">Cancelled</Badge>;
      default:
        return <Badge variant="gray">{status}</Badge>;
    }
  };

  const handleAttendanceChange = (participant: string, status: 'present' | 'absent' | 'partial') => {
    setAttendance({ ...attendance, [participant]: status });
  };

  const handleEngagementChange = (participant: string, score: number) => {
    setEngagementScores({ ...engagementScores, [participant]: score });
  };

  const averageEngagement = Object.values(engagementScores).reduce((a, b) => a + b, 0) / Object.values(engagementScores).filter(s => s > 0).length;
  const attendanceRate = (Object.values(attendance).filter(a => a === 'present').length / activity.participants.length) * 100;

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 ${getTypeColor(activity.color)}`}>
              <Icon size={32} />
            </div>
            <div>
              <h2 className="text-2xl text-gray-900">{activity.name}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-gray-600">{activity.type}</span>
                <span className="text-gray-300">•</span>
                {getStatusBadge(activity.status)}
              </div>
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
            Details
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              activeTab === 'attendance' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Attendance
          </button>
          <button
            onClick={() => setActiveTab('engagement')}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              activeTab === 'engagement' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Engagement
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              activeTab === 'notes' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Notes & Documentation
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                  <div className="text-center">
                    <div className="text-2xl text-blue-600">{activity.participants.length}/{activity.maxCapacity}</div>
                    <div className="text-sm text-gray-600 mt-1">Participants</div>
                  </div>
                </Card>
                <Card className="bg-green-50 border-green-100">
                  <div className="text-center">
                    <div className="text-2xl text-green-600">{attendanceRate.toFixed(0)}%</div>
                    <div className="text-sm text-gray-600 mt-1">Attendance</div>
                  </div>
                </Card>
                <Card className="bg-amber-50 border-amber-100">
                  <div className="text-center">
                    <div className="text-2xl text-amber-600">{activity.duration}</div>
                    <div className="text-sm text-gray-600 mt-1">Duration</div>
                  </div>
                </Card>
                <Card className="bg-purple-50 border-purple-100">
                  <div className="text-center">
                    <div className="text-2xl text-purple-600">{averageEngagement.toFixed(1)}/5</div>
                    <div className="text-sm text-gray-600 mt-1">Avg Engagement</div>
                  </div>
                </Card>
              </div>

              {/* Activity Information */}
              <Card>
                <h3 className="text-gray-900 mb-4">Activity Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Date</div>
                      <div className="text-sm text-gray-900">{activity.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Time</div>
                      <div className="text-sm text-gray-900">{activity.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Location</div>
                      <div className="text-sm text-gray-900">{activity.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Facilitator</div>
                      <div className="text-sm text-gray-900">{activity.facilitator}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Activity Description */}
              {activity.notes && (
                <Card>
                  <h3 className="text-gray-900 mb-3">Description</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{activity.notes}</p>
                </Card>
              )}

              {/* Registered Participants */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">Registered Participants</h3>
                  <span className="text-sm text-gray-600">{activity.participants.length} of {activity.maxCapacity} spots filled</span>
                </div>
                <div className="space-y-2">
                  {activity.participants.map((participant, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-700">
                          {participant.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm text-gray-900">{participant}</div>
                          <div className="text-xs text-gray-600">Service User</div>
                        </div>
                      </div>
                      {attendance[participant] === 'present' && (
                        <Badge variant="green">Present</Badge>
                      )}
                      {attendance[participant] === 'absent' && (
                        <Badge variant="red">Absent</Badge>
                      )}
                      {attendance[participant] === 'partial' && (
                        <Badge variant="amber">Partial</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900">Attendance Tracking</h3>
                  <p className="text-sm text-gray-600 mt-1">Mark attendance for all participants</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-gray-900">{attendanceRate.toFixed(0)}%</div>
                  <div className="text-sm text-gray-600">Attendance Rate</div>
                </div>
              </div>

              <div className="space-y-3">
                {activity.participants.map((participant) => (
                  <Card key={participant} className="bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                          {participant.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm text-gray-900">{participant}</div>
                          {participantNotes[participant] && (
                            <div className="text-xs text-gray-600 mt-1 max-w-md truncate">
                              {participantNotes[participant]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAttendanceChange(participant, 'present')}
                          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                            attendance[participant] === 'present'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(participant, 'partial')}
                          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                            attendance[participant] === 'partial'
                              ? 'bg-amber-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Partial
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(participant, 'absent')}
                          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                            attendance[participant] === 'absent'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {Object.values(attendance).filter(a => a === 'absent').length > 0 && (
                <Card className="border-l-4 border-amber-600 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-amber-600 mt-0.5" />
                    <div>
                      <div className="text-sm text-amber-900">
                        <span className="font-medium">
                          {Object.values(attendance).filter(a => a === 'absent').length} participant(s) absent.
                        </span>
                        {' '}Remember to document reasons for absence in daily logs.
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Engagement Tab */}
          {activeTab === 'engagement' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900">Engagement Assessment</h3>
                  <p className="text-sm text-gray-600 mt-1">Rate each participant's engagement level (1-5 stars)</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-gray-900">{averageEngagement.toFixed(1)}/5</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              </div>

              <div className="space-y-3">
                {activity.participants.map((participant) => (
                  <Card key={participant} className="bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                          {participant.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm text-gray-900">{participant}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {attendance[participant] === 'present' ? 'Present' : 
                             attendance[participant] === 'partial' ? 'Partial Attendance' : 
                             'Absent'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((score) => (
                          <button
                            key={score}
                            onClick={() => handleEngagementChange(participant, score)}
                            disabled={attendance[participant] === 'absent'}
                            className={`p-1 transition-colors ${
                              attendance[participant] === 'absent' ? 'opacity-30 cursor-not-allowed' : ''
                            }`}
                          >
                            <Star
                              size={24}
                              className={`${
                                score <= (engagementScores[participant] || 0)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Engagement Summary */}
              <Card className="bg-blue-50 border-blue-100">
                <div className="flex items-center gap-3">
                  <TrendingUp size={24} className="text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-900">Engagement Summary</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {Object.values(engagementScores).filter(s => s === 5).length} highly engaged, {' '}
                      {Object.values(engagementScores).filter(s => s === 3 || s === 4).length} moderately engaged, {' '}
                      {Object.values(engagementScores).filter(s => s === 1 || s === 2).length} low engagement
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Notes & Documentation Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-3">General Activity Notes</h3>
                <textarea
                  value={activityNotes}
                  onChange={(e) => setActivityNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Add overall observations about the activity, any issues, highlights, or recommendations for future sessions..."
                />
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Individual Participant Notes</h3>
                <div className="space-y-3">
                  {activity.participants.map((participant) => (
                    <Card key={participant} className="bg-white">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-700">
                          {participant.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-gray-900">{participant}</div>
                            <div className="flex items-center gap-2">
                              {attendance[participant] === 'present' && <Badge variant="green">Present</Badge>}
                              {attendance[participant] === 'absent' && <Badge variant="red">Absent</Badge>}
                              {engagementScores[participant] > 0 && (
                                <div className="flex items-center gap-1">
                                  <Star size={14} className="fill-amber-400 text-amber-400" />
                                  <span className="text-xs text-gray-600">{engagementScores[participant]}/5</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <textarea
                            value={participantNotes[participant] || ''}
                            onChange={(e) => setParticipantNotes({ ...participantNotes, [participant]: e.target.value })}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                            placeholder={`Add observations specific to ${participant.split(' ')[0]}...`}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Photo Documentation</h3>
                <Card className="bg-gray-50 border-2 border-dashed border-gray-200">
                  <div className="text-center py-8">
                    <Image size={48} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-2">Upload photos from the activity</p>
                    <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Select Photos
                    </button>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF (max 10MB each)</p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-white transition-colors">
              <Edit size={16} />
              Edit Activity
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
              <Trash2 size={16} />
              Delete
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
