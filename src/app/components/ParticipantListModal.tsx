import { X, Users, Calendar, TrendingUp, Star, Activity, Filter, Search, Download, ChevronDown, Eye, CheckCircle, XCircle, Smile, Meh, Frown } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './Badge';

interface ParticipantListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ParticipantListModal({ isOpen, onClose }: ParticipantListModalProps) {
  const [timeFilter, setTimeFilter] = useState('this-week');
  const [searchQuery, setSearchQuery] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState('');
  const [expandedUser, setExpandedUser] = useState<number | null>(null);

  if (!isOpen) return null;

  // Mock participation data
  const participantData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      photo: 'SJ',
      totalActivities: 12,
      attendanceRate: 92,
      averageEngagement: 4.5,
      mostCommonMood: 'positive',
      activitiesAttended: [
        { name: 'Group Therapy Session', date: '7 Dec 2025', time: '10:00', engagement: 'high', mood: 'positive', type: 'Therapeutic' },
        { name: 'Art Class', date: '7 Dec 2025', time: '14:00', engagement: 'high', mood: 'positive', type: 'Creative' },
        { name: 'Music Therapy', date: '6 Dec 2025', time: '11:00', engagement: 'medium', mood: 'neutral', type: 'Therapeutic' },
        { name: 'Reading Club', date: '6 Dec 2025', time: '15:00', engagement: 'high', mood: 'positive', type: 'Educational' },
        { name: 'Cooking Class', date: '5 Dec 2025', time: '10:00', engagement: 'high', mood: 'positive', type: 'Life Skills' },
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      photo: 'MC',
      totalActivities: 10,
      attendanceRate: 83,
      averageEngagement: 3.8,
      mostCommonMood: 'positive',
      activitiesAttended: [
        { name: 'Physical Exercise', date: '7 Dec 2025', time: '09:00', engagement: 'medium', mood: 'positive', type: 'Physical' },
        { name: 'Art Class', date: '7 Dec 2025', time: '14:00', engagement: 'medium', mood: 'neutral', type: 'Creative' },
        { name: 'Cooking Class', date: '5 Dec 2025', time: '10:00', engagement: 'high', mood: 'positive', type: 'Life Skills' },
        { name: 'Games Evening', date: '4 Dec 2025', time: '18:00', engagement: 'high', mood: 'positive', type: 'Social' },
      ]
    },
    {
      id: 3,
      name: 'Emma Wilson',
      photo: 'EW',
      totalActivities: 15,
      attendanceRate: 100,
      averageEngagement: 4.8,
      mostCommonMood: 'positive',
      activitiesAttended: [
        { name: 'Group Therapy Session', date: '7 Dec 2025', time: '10:00', engagement: 'high', mood: 'positive', type: 'Therapeutic' },
        { name: 'Art Class', date: '7 Dec 2025', time: '14:00', engagement: 'high', mood: 'positive', type: 'Creative' },
        { name: 'Music Therapy', date: '6 Dec 2025', time: '11:00', engagement: 'high', mood: 'positive', type: 'Therapeutic' },
        { name: 'Reading Club', date: '6 Dec 2025', time: '15:00', engagement: 'high', mood: 'positive', type: 'Educational' },
        { name: 'Yoga Session', date: '6 Dec 2025', time: '09:00', engagement: 'high', mood: 'positive', type: 'Physical' },
      ]
    },
    {
      id: 4,
      name: 'James Rodriguez',
      photo: 'JR',
      totalActivities: 8,
      attendanceRate: 67,
      averageEngagement: 3.2,
      mostCommonMood: 'neutral',
      activitiesAttended: [
        { name: 'Group Therapy Session', date: '7 Dec 2025', time: '10:00', engagement: 'medium', mood: 'neutral', type: 'Therapeutic' },
        { name: 'Physical Exercise', date: '7 Dec 2025', time: '09:00', engagement: 'low', mood: 'negative', type: 'Physical' },
        { name: 'Games Evening', date: '4 Dec 2025', time: '18:00', engagement: 'high', mood: 'positive', type: 'Social' },
        { name: 'Cooking Class', date: '5 Dec 2025', time: '10:00', engagement: 'medium', mood: 'neutral', type: 'Life Skills' },
      ]
    },
    {
      id: 5,
      name: 'Oliver Brown',
      photo: 'OB',
      totalActivities: 11,
      attendanceRate: 85,
      averageEngagement: 4.1,
      mostCommonMood: 'positive',
      activitiesAttended: [
        { name: 'Music Therapy', date: '6 Dec 2025', time: '11:00', engagement: 'high', mood: 'positive', type: 'Therapeutic' },
        { name: 'Gardening', date: '5 Dec 2025', time: '14:00', engagement: 'high', mood: 'positive', type: 'Recreational' },
        { name: 'Movie Night', date: '4 Dec 2025', time: '19:00', engagement: 'medium', mood: 'positive', type: 'Social' },
      ]
    },
    {
      id: 6,
      name: 'Sophia Lee',
      photo: 'SL',
      totalActivities: 13,
      attendanceRate: 95,
      averageEngagement: 4.6,
      mostCommonMood: 'positive',
      activitiesAttended: [
        { name: 'Yoga Session', date: '6 Dec 2025', time: '09:00', engagement: 'high', mood: 'positive', type: 'Physical' },
        { name: 'Art Class', date: '7 Dec 2025', time: '14:00', engagement: 'high', mood: 'positive', type: 'Creative' },
        { name: 'Reading Club', date: '6 Dec 2025', time: '15:00', engagement: 'high', mood: 'positive', type: 'Educational' },
        { name: 'Music Therapy', date: '6 Dec 2025', time: '11:00', engagement: 'high', mood: 'positive', type: 'Therapeutic' },
      ]
    }
  ];

  const filteredParticipants = participantData.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !activityTypeFilter || participant.activitiesAttended.some(a => a.type === activityTypeFilter);
    return matchesSearch && matchesType;
  });

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'positive': return <Smile className="text-green-600" size={16} />;
      case 'neutral': return <Meh className="text-amber-600" size={16} />;
      case 'negative': return <Frown className="text-red-600" size={16} />;
      default: return <Meh className="text-gray-400" size={16} />;
    }
  };

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const totalParticipants = filteredParticipants.length;
  const averageAttendance = Math.round(filteredParticipants.reduce((sum, p) => sum + p.attendanceRate, 0) / totalParticipants);
  const averageEngagement = (filteredParticipants.reduce((sum, p) => sum + p.averageEngagement, 0) / totalParticipants).toFixed(1);
  const totalActivityParticipations = filteredParticipants.reduce((sum, p) => sum + p.totalActivities, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-purple-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 rounded-lg p-3 shadow-md">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Activity Participation Report</h2>
                <p className="text-sm text-gray-600 mt-1">Service user attendance and engagement tracking</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-xs text-gray-600">
                    {totalParticipants} participants • {totalActivityParticipations} total attendances
                  </div>
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

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Filters & Actions */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              {/* Time Period Filter */}
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="last-week">Last Week</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="custom">Custom Range</option>
              </select>

              {/* Activity Type Filter */}
              <select
                value={activityTypeFilter}
                onChange={(e) => setActivityTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">All Activity Types</option>
                <option value="Therapeutic">Therapeutic</option>
                <option value="Creative">Creative</option>
                <option value="Physical">Physical</option>
                <option value="Educational">Educational</option>
                <option value="Social">Social</option>
                <option value="Recreational">Recreational</option>
                <option value="Life Skills">Life Skills</option>
              </select>

              {/* Search */}
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              {/* Export Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                <Download size={16} />
                Export Report
              </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Total Participants</p>
                    <p className="text-2xl font-bold text-gray-900">{totalParticipants}</p>
                  </div>
                  <Users className="text-purple-600" size={32} />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Avg Attendance</p>
                    <p className="text-2xl font-bold text-gray-900">{averageAttendance}%</p>
                  </div>
                  <CheckCircle className="text-green-600" size={32} />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Avg Engagement</p>
                    <p className="text-2xl font-bold text-gray-900">{averageEngagement}/5</p>
                  </div>
                  <Star className="text-amber-600" size={32} />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Total Attendances</p>
                    <p className="text-2xl font-bold text-gray-900">{totalActivityParticipations}</p>
                  </div>
                  <Activity className="text-blue-600" size={32} />
                </div>
              </div>
            </div>
          </div>

          {/* Participant List */}
          <div className="p-6">
            <div className="space-y-3">
              {filteredParticipants.map((participant) => (
                <div key={participant.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {/* Participant Header */}
                  <div
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedUser(expandedUser === participant.id ? null : participant.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                          {participant.photo}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-gray-900">{participant.name}</h3>
                          <p className="text-xs text-gray-600">Service User ID: SU-{String(participant.id).padStart(4, '0')}</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 mr-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-1">Activities</p>
                          <p className="text-lg font-bold text-gray-900">{participant.totalActivities}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-1">Attendance</p>
                          <p className={`text-lg font-bold ${getAttendanceColor(participant.attendanceRate)}`}>
                            {participant.attendanceRate}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-1">Engagement</p>
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500 fill-yellow-500" size={16} />
                            <p className="text-lg font-bold text-gray-900">{participant.averageEngagement}</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-1">Mood</p>
                          <div className="flex justify-center">
                            {getMoodIcon(participant.mostCommonMood)}
                          </div>
                        </div>
                      </div>

                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform ${
                          expandedUser === participant.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedUser === participant.id && (
                    <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                      <div className="mt-4">
                        <h4 className="text-sm font-bold text-gray-900 mb-3">Activities Attended ({participant.activitiesAttended.length})</h4>
                        <div className="space-y-2">
                          {participant.activitiesAttended.map((activity, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h5 className="text-sm font-medium text-gray-900">{activity.name}</h5>
                                    <Badge variant="blue" className="text-xs">{activity.type}</Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-xs text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <Calendar size={12} />
                                      {activity.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Activity size={12} />
                                      {activity.time}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="text-center">
                                    <p className="text-xs text-gray-600 mb-1">Engagement</p>
                                    <span className={`text-xs px-2 py-1 rounded ${getEngagementColor(activity.engagement)}`}>
                                      {activity.engagement}
                                    </span>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-xs text-gray-600 mb-1">Mood</p>
                                    <div className="flex justify-center">
                                      {getMoodIcon(activity.mood)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredParticipants.length === 0 && (
              <div className="text-center py-12">
                <Users size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No participants found matching your filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredParticipants.length} of {participantData.length} service users
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
