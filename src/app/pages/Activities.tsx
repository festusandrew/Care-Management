import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { AddActivityModal } from '../components/AddActivityModal';
import { ActivityDetailsModal } from '../components/ActivityDetailsModal';
import { EditActivityModal } from '../components/EditActivityModal';
import { RecordAttendanceModal } from '../components/RecordAttendanceModal';
import { ParticipantListModal } from '../components/ParticipantListModal';
import { 
  Search,
  Filter,
  Plus,
  Download,
  Calendar,
  Clock,
  User,
  Users,
  Heart,
  Brain,
  Dumbbell,
  Music,
  Palette,
  BookOpen,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  MoreVertical,
  TrendingUp,
  Activity as ActivityIcon,
  MapPin,
  Star
} from 'lucide-react';
import { useState } from 'react';

export default function Activities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showActivityDetails, setShowActivityDetails] = useState(false);
  const [showEditActivity, setShowEditActivity] = useState(false);
  const [showRecordAttendance, setShowRecordAttendance] = useState(false);
  const [showParticipantList, setShowParticipantList] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'upcoming' | 'today' | 'completed'>('today');
  const [filterType, setFilterType] = useState<string>('');
  const [filterLocation, setFilterLocation] = useState<string>('');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const activities = [
    {
      id: 1,
      name: 'Group Therapy Session',
      type: 'Therapeutic',
      date: '7 Dec 2025',
      time: '10:00 - 11:00',
      duration: '1h',
      location: 'Therapy Room',
      facilitator: 'Dr. Sarah Mitchell',
      participants: ['Sarah Johnson', 'Emma Wilson', 'James Rodriguez'],
      maxCapacity: 6,
      status: 'in-progress',
      engagement: 'high',
      notes: 'Focus on anxiety management techniques',
      icon: Brain,
      color: 'purple',
    },
    {
      id: 2,
      name: 'Art Class',
      type: 'Creative',
      date: '7 Dec 2025',
      time: '14:00 - 15:30',
      duration: '1.5h',
      location: 'Art Studio',
      facilitator: 'Mary Thompson',
      participants: ['Sarah Johnson', 'Michael Chen', 'Emma Wilson'],
      maxCapacity: 8,
      status: 'scheduled',
      engagement: '',
      notes: 'Painting with watercolors',
      icon: Palette,
      color: 'pink',
    },
    {
      id: 3,
      name: 'Physical Exercise',
      type: 'Physical',
      date: '7 Dec 2025',
      time: '09:00 - 09:45',
      duration: '45m',
      location: 'Garden',
      facilitator: 'John Davies',
      participants: ['Michael Chen', 'James Rodriguez'],
      maxCapacity: 10,
      status: 'completed',
      engagement: 'medium',
      notes: 'Morning stretches and light cardio',
      icon: Dumbbell,
      color: 'green',
    },
    {
      id: 4,
      name: 'Music Therapy',
      type: 'Therapeutic',
      date: '7 Dec 2025',
      time: '15:00 - 16:00',
      duration: '1h',
      location: 'Music Room',
      facilitator: 'Lisa Anderson',
      participants: ['Sarah Johnson', 'Emma Wilson'],
      maxCapacity: 6,
      status: 'scheduled',
      engagement: '',
      notes: 'Instrument exploration and rhythm exercises',
      icon: Music,
      color: 'blue',
    },
    {
      id: 5,
      name: 'Reading Club',
      type: 'Educational',
      date: '7 Dec 2025',
      time: '11:00 - 12:00',
      duration: '1h',
      location: 'Library',
      facilitator: 'James Mitchell',
      participants: ['Michael Chen', 'Emma Wilson', 'James Rodriguez'],
      maxCapacity: 8,
      status: 'completed',
      engagement: 'high',
      notes: 'Discussing "The Great Gatsby"',
      icon: BookOpen,
      color: 'amber',
    },
    {
      id: 6,
      name: 'Social Skills Workshop',
      type: 'Social',
      date: '7 Dec 2025',
      time: '16:00 - 17:00',
      duration: '1h',
      location: 'Common Room',
      facilitator: 'Sarah Williams',
      participants: ['Sarah Johnson', 'Michael Chen', 'Emma Wilson', 'James Rodriguez'],
      maxCapacity: 8,
      status: 'scheduled',
      engagement: '',
      notes: 'Practicing conversation skills',
      icon: Users,
      color: 'teal',
    },
    {
      id: 7,
      name: 'Gardening Club',
      type: 'Recreational',
      date: '8 Dec 2025',
      time: '10:00 - 11:30',
      duration: '1.5h',
      location: 'Garden',
      facilitator: 'David Brown',
      participants: ['Sarah Johnson', 'Michael Chen'],
      maxCapacity: 6,
      status: 'scheduled',
      engagement: '',
      notes: 'Planting winter vegetables',
      icon: Heart,
      color: 'green',
    },
    {
      id: 8,
      name: 'Cooking Class',
      type: 'Life Skills',
      date: '7 Dec 2025',
      time: '13:00 - 14:30',
      duration: '1.5h',
      location: 'Kitchen',
      facilitator: 'Emily Roberts',
      participants: ['Michael Chen', 'James Rodriguez'],
      maxCapacity: 4,
      status: 'completed',
      engagement: 'high',
      notes: 'Making healthy pasta dishes',
      icon: Heart,
      color: 'orange',
    },
    {
      id: 9,
      name: 'Mindfulness Meditation',
      type: 'Therapeutic',
      date: '7 Dec 2025',
      time: '08:00 - 08:30',
      duration: '30m',
      location: 'Quiet Room',
      facilitator: 'Dr. Sarah Mitchell',
      participants: ['Sarah Johnson', 'Emma Wilson', 'Michael Chen'],
      maxCapacity: 10,
      status: 'completed',
      engagement: 'medium',
      notes: 'Breathing exercises and guided meditation',
      icon: Brain,
      color: 'purple',
    },
    {
      id: 10,
      name: 'Movie Night',
      type: 'Recreational',
      date: '7 Dec 2025',
      time: '19:00 - 21:00',
      duration: '2h',
      location: 'Common Room',
      facilitator: 'Sarah Williams',
      participants: ['Sarah Johnson', 'Michael Chen', 'Emma Wilson', 'James Rodriguez'],
      maxCapacity: 12,
      status: 'scheduled',
      engagement: '',
      notes: 'Family-friendly film',
      icon: Heart,
      color: 'indigo',
    },
  ];

  const stats = {
    totalActivities: 24,
    todayActivities: 8,
    activeParticipants: 18,
    completionRate: 92,
    averageEngagement: 4.2,
    upcomingThisWeek: 15,
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.facilitator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === '' || activity.type === filterType;
    const matchesLocation = filterLocation === '' || activity.location === filterLocation;
    const matchesView = 
      viewMode === 'today' ? activity.date === '7 Dec 2025' :
      viewMode === 'upcoming' ? activity.status === 'scheduled' :
      viewMode === 'completed' ? activity.status === 'completed' :
      true;
    return matchesSearch && matchesType && matchesLocation && matchesView;
  });

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

  const getEngagementBadge = (engagement: string) => {
    switch(engagement) {
      case 'high':
        return <Badge variant="green">High</Badge>;
      case 'medium':
        return <Badge variant="amber">Medium</Badge>;
      case 'low':
        return <Badge variant="red">Low</Badge>;
      default:
        return <span className="text-sm text-gray-400">-</span>;
    }
  };

  const getTypeColor = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'bg-purple-100 text-purple-700',
      pink: 'bg-pink-100 text-pink-700',
      green: 'bg-green-100 text-green-700',
      blue: 'bg-blue-100 text-blue-700',
      amber: 'bg-amber-100 text-amber-700',
      teal: 'bg-teal-100 text-teal-700',
      orange: 'bg-orange-100 text-orange-700',
      indigo: 'bg-indigo-100 text-indigo-700',
    };
    return colors[color] || 'bg-gray-100 text-gray-700';
  };

  const handleEditActivity = (data: any) => {
    console.log('Activity updated:', data);
    // In a real app, this would update the activity record
  };

  const handleSaveAttendance = (data: any) => {
    console.log('Attendance recorded:', data);
    // In a real app, this would save the attendance records to the database
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Activities" />
      <TopBar />
      
      <main className="ml-64 pt-24 px-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl text-gray-900">Activities & Programs</h1>
            <p className="text-sm text-gray-600 mt-1">Manage therapeutic, recreational, and educational activities for service users</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              onClick={() => setShowParticipantList(true)}
            >
              <Users size={18} />
              <span className="text-sm">View Participants</span>
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => {
                const data = JSON.stringify(activities, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `activities-report-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download size={18} className="text-gray-600" />
              <span className="text-sm text-gray-700">Export Report</span>
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowAddActivity(true)}
            >
              <Plus size={20} />
              Add Activity
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Activities</div>
                <div className="text-2xl text-gray-900">{stats.totalActivities}</div>
              </div>
              <Calendar size={32} className="text-blue-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Today</div>
                <div className="text-2xl text-gray-900">{stats.todayActivities}</div>
              </div>
              <ActivityIcon size={32} className="text-green-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Active Participants</div>
                <div className="text-2xl text-gray-900">{stats.activeParticipants}</div>
              </div>
              <Users size={32} className="text-purple-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Completion Rate</div>
                <div className="text-2xl text-gray-900">{stats.completionRate}%</div>
              </div>
              <CheckCircle size={32} className="text-green-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Avg Engagement</div>
                <div className="text-2xl text-gray-900">{stats.averageEngagement}/5</div>
              </div>
              <Star size={32} className="text-amber-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">This Week</div>
                <div className="text-2xl text-gray-900">{stats.upcomingThisWeek}</div>
              </div>
              <TrendingUp size={32} className="text-blue-600" />
            </div>
          </Card>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
            <button 
              className={`px-4 py-2 text-sm rounded ${viewMode === 'today' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setViewMode('today')}
            >
              Today
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded ${viewMode === 'upcoming' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setViewMode('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded ${viewMode === 'completed' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setViewMode('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <Card className="mb-6">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by activity name or facilitator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="Therapeutic">Therapeutic</option>
              <option value="Creative">Creative</option>
              <option value="Physical">Physical</option>
              <option value="Educational">Educational</option>
              <option value="Social">Social</option>
              <option value="Recreational">Recreational</option>
              <option value="Life Skills">Life Skills</option>
            </select>

            {/* Location Filter */}
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">All Locations</option>
              <option value="Therapy Room">Therapy Room</option>
              <option value="Art Studio">Art Studio</option>
              <option value="Garden">Garden</option>
              <option value="Music Room">Music Room</option>
              <option value="Library">Library</option>
              <option value="Common Room">Common Room</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Quiet Room">Quiet Room</option>
            </select>

            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={18} className="text-gray-600" />
            </button>
          </div>
        </Card>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {filteredActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(activity.color)}`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-gray-900">{activity.name}</h3>
                      <div className="text-sm text-gray-600 mt-1">{activity.type}</div>
                    </div>
                  </div>
                  <div className="relative">
                    <button 
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      onClick={() => setOpenDropdown(openDropdown === activity.id ? null : activity.id)}
                    >
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                    {openDropdown === activity.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-100 shadow-lg z-10">
                        <button 
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            console.log('View details:', activity.id);
                            setOpenDropdown(null);
                            setSelectedActivity(activity);
                            setShowActivityDetails(true);
                          }}
                        >
                          <Eye size={16} />
                          View Details
                        </button>
                        <button 
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            console.log('Edit activity:', activity.id);
                            setOpenDropdown(null);
                            setSelectedActivity(activity);
                            setShowEditActivity(true);
                          }}
                        >
                          <Edit size={16} />
                          Edit Activity
                        </button>
                        <button 
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            console.log('Record attendance:', activity.id);
                            setOpenDropdown(null);
                            setSelectedActivity(activity);
                            setShowRecordAttendance(true);
                          }}
                        >
                          <CheckCircle size={16} />
                          Record Attendance
                        </button>
                        <button 
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 border-t border-gray-100"
                          onClick={() => {
                            console.log('Cancel activity:', activity.id);
                            setOpenDropdown(null);
                          }}
                        >
                          <XCircle size={16} />
                          Cancel Activity
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Date & Time */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar size={14} className="text-gray-400" />
                      {activity.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock size={14} className="text-gray-400" />
                      {activity.time}
                    </div>
                  </div>

                  {/* Location & Facilitator */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin size={14} className="text-gray-400" />
                      {activity.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <User size={14} className="text-gray-400" />
                      {activity.facilitator}
                    </div>
                  </div>

                  {/* Participants */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {activity.participants.length}/{activity.maxCapacity} participants
                      </span>
                    </div>
                    <div className="flex -space-x-2">
                      {activity.participants.slice(0, 5).map((participant, idx) => (
                        <div 
                          key={idx}
                          className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs text-blue-700"
                          title={participant}
                        >
                          {participant.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                      {activity.participants.length > 5 && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-700">
                          +{activity.participants.length - 5}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status & Engagement */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(activity.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Engagement:</span>
                      {getEngagementBadge(activity.engagement)}
                    </div>
                  </div>

                  {/* Notes */}
                  {activity.notes && (
                    <div className="text-sm text-gray-600 bg-gray-50 rounded p-2">
                      {activity.notes}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <Card className="text-center py-12">
            <ActivityIcon size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No activities found</h3>
            <p className="text-sm text-gray-600">
              Try adjusting your filters or add a new activity
            </p>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center py-6 text-xs text-gray-500 border-t border-gray-100 mt-8">
          MpoweredCare © 2025 — Internal Use Only
        </div>
      </main>

      {/* Modals */}
      <AddActivityModal
        isOpen={showAddActivity}
        onClose={() => setShowAddActivity(false)}
      />
      <ActivityDetailsModal
        isOpen={showActivityDetails}
        onClose={() => setShowActivityDetails(false)}
        activity={selectedActivity}
      />
      <EditActivityModal
        isOpen={showEditActivity}
        onClose={() => setShowEditActivity(false)}
        activity={selectedActivity}
        onSave={handleEditActivity}
      />
      <RecordAttendanceModal
        isOpen={showRecordAttendance}
        onClose={() => setShowRecordAttendance(false)}
        activity={selectedActivity}
        onSave={handleSaveAttendance}
      />
      <ParticipantListModal
        isOpen={showParticipantList}
        onClose={() => setShowParticipantList(false)}
        activity={selectedActivity}
      />
    </div>
  );
}