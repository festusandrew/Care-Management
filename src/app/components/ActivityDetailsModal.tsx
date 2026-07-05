import { X, Calendar, Clock, MapPin, User, Star, Edit, Trash2, Image, TrendingUp, AlertCircle } from 'lucide-react';
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
    'Sarah Johnson': 'Very engaged, showed great enthusiasm.',
    'Michael Chen': 'Participated well, needed some encouragement.',
    'Emma Wilson': '',
    'James Rodriguez': 'Active participant, helped others.',
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
    switch (status) {
      case 'completed': return <Badge variant="green">Completed</Badge>;
      case 'in-progress': return <Badge variant="blue">In Progress</Badge>;
      case 'scheduled': return <Badge variant="gray">Scheduled</Badge>;
      case 'cancelled': return <Badge variant="red">Cancelled</Badge>;
      default: return <Badge variant="gray">{status}</Badge>;
    }
  };

  const averageEngagement = Object.values(engagementScores).reduce((a, b) => a + b, 0) /
    (Object.values(engagementScores).filter(s => s > 0).length || 1);
  const attendanceRate = (Object.values(attendance).filter(a => a === 'present').length /
    (activity.participants.length || 1)) * 100;

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-auto">
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
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-1 px-6 pt-4 border-b border-gray-100">
          {(['details', 'attendance', 'engagement', 'notes'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
                activeTab === tab ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab === 'notes' ? 'Notes' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Participants', value: `${activity.participants.length}/${activity.maxCapacity}`, color: 'blue' },
                  { label: 'Attendance', value: `${attendanceRate.toFixed(0)}%`, color: 'green' },
                  { label: 'Duration', value: activity.duration, color: 'amber' },
                  { label: 'Avg Engagement', value: `${averageEngagement.toFixed(1)}/5`, color: 'purple' },
                ].map(({ label, value, color }) => (
                  <Card key={label} className={`bg-${color}-50 border-${color}-100`}>
                    <div className="text-center">
                      <div className={`text-2xl text-${color}-600`}>{value}</div>
                      <div className="text-sm text-gray-600 mt-1">{label}</div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card>
                <h3 className="text-gray-900 mb-4">Activity Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Calendar, label: 'Date', value: activity.date },
                    { icon: Clock, label: 'Time', value: activity.time },
                    { icon: MapPin, label: 'Location', value: activity.location },
                    { icon: User, label: 'Facilitator', value: activity.facilitator },
                  ].map(({ icon: Icon2, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <Icon2 size={20} className="text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600">{label}</div>
                        <div className="text-sm text-gray-900">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">Participants</h3>
                  <span className="text-sm text-gray-600">{activity.participants.length}/{activity.maxCapacity} spots</span>
                </div>
                <div className="space-y-2">
                  {activity.participants.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-700">
                          {p.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm text-gray-900">{p}</span>
                      </div>
                      {attendance[p] === 'present' && <Badge variant="green">Present</Badge>}
                      {attendance[p] === 'absent' && <Badge variant="red">Absent</Badge>}
                      {attendance[p] === 'partial' && <Badge variant="amber">Partial</Badge>}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-4">
              {activity.participants.map((p) => (
                <Card key={p}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm">
                        {p.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-gray-900">{p}</span>
                    </div>
                    <div className="flex gap-2">
                      {(['present', 'partial', 'absent'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setAttendance({ ...attendance, [p]: s })}
                          className={`px-3 py-1.5 text-sm rounded-lg capitalize transition-colors ${
                            attendance[p] === s
                              ? s === 'present' ? 'bg-green-600 text-white'
                                : s === 'partial' ? 'bg-amber-600 text-white'
                                : 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'engagement' && (
            <div className="space-y-4">
              {activity.participants.map((p) => (
                <Card key={p}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm">
                        {p.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-gray-900">{p}</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          onClick={() => setEngagementScores({ ...engagementScores, [p]: score })}
                          disabled={attendance[p] === 'absent'}
                          className={attendance[p] === 'absent' ? 'opacity-30 cursor-not-allowed' : ''}
                        >
                          <Star
                            size={22}
                            className={score <= (engagementScores[p] || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-3">General Notes</h3>
                <textarea
                  value={activityNotes}
                  onChange={(e) => setActivityNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Add overall observations..."
                />
              </div>
              <div>
                <h3 className="text-gray-900 mb-3">Participant Notes</h3>
                <div className="space-y-3">
                  {activity.participants.map((p) => (
                    <Card key={p}>
                      <div className="text-sm text-gray-900 mb-2">{p}</div>
                      <textarea
                        value={participantNotes[p] || ''}
                        onChange={(e) => setParticipantNotes({ ...participantNotes, [p]: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        placeholder={`Notes for ${p.split(' ')[0]}...`}
                      />
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-white transition-colors">
              <Edit size={16} /> Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
              <Trash2 size={16} /> Delete
            </button>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-white transition-colors">
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
