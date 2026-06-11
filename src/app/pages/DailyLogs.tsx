import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { QuickLogModal } from '../components/QuickLogModal';
import { DailyLogDetailModal } from '../components/DailyLogDetailModal';
import { 
  Search,
  Filter,
  Plus,
  Download,
  Calendar,
  Clock,
  User,
  Smile,
  Meh,
  Frown,
  TrendingUp,
  FileText,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  MoreVertical
} from 'lucide-react';
import { useState } from 'react';

export default function DailyLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [showLogDetail, setShowLogDetail] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedStaff, setSelectedStaff] = useState<string>('');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const logs = [
    {
      id: 1,
      serviceUser: 'Sarah Johnson',
      userId: 1,
      userPhoto: '👧',
      date: '7 Dec 2025',
      time: '14:30',
      type: 'Daily Log',
      mood: 'happy',
      moodEmoji: '😊',
      behavior: 'Cooperative',
      activities: 'Group therapy, Art class',
      meals: 'Ate all meals',
      sleep: 'Good (7 hours)',
      notes: 'Participated well in group therapy. Showed improvement in social interactions with peers.',
      staff: 'Mary Thompson',
      riskLevel: 'amber',
    },
    {
      id: 2,
      serviceUser: 'Michael Chen',
      userId: 2,
      userPhoto: '👦',
      date: '7 Dec 2025',
      time: '13:15',
      type: 'Daily Log',
      mood: 'neutral',
      moodEmoji: '😐',
      behavior: 'Calm',
      activities: 'Reading, Individual study',
      meals: 'Ate most meals',
      sleep: 'Fair (6 hours)',
      notes: 'Quiet day. Preferred solitary activities. No incidents reported.',
      staff: 'John Davies',
      riskLevel: 'green',
    },
    {
      id: 3,
      serviceUser: 'Emma Wilson',
      userId: 3,
      userPhoto: '👧',
      date: '7 Dec 2025',
      time: '11:45',
      type: 'Medication',
      mood: 'happy',
      moodEmoji: '😊',
      behavior: 'Engaged',
      activities: 'Morning activities',
      meals: 'Ate all meals',
      sleep: 'Excellent (8+ hours)',
      notes: 'Morning medication administered as prescribed. No adverse reactions observed.',
      staff: 'Sarah Williams',
      riskLevel: 'green',
    },
    {
      id: 4,
      serviceUser: 'James Rodriguez',
      userId: 4,
      userPhoto: '👦',
      date: '7 Dec 2025',
      time: '10:20',
      type: 'Daily Log',
      mood: 'sad',
      moodEmoji: '😢',
      behavior: 'Withdrawn',
      activities: 'Limited participation',
      meals: 'Poor appetite',
      sleep: 'Poor (4 hours)',
      notes: 'Appeared withdrawn during morning activities. Declined to participate in group session. One-on-one support provided.',
      staff: 'Mary Thompson',
      riskLevel: 'red',
    },
    {
      id: 5,
      serviceUser: 'Sarah Johnson',
      userId: 1,
      userPhoto: '👧',
      date: '6 Dec 2025',
      time: '16:45',
      type: 'Activity',
      mood: 'happy',
      moodEmoji: '😊',
      behavior: 'Cooperative',
      activities: 'Art therapy, Music session',
      meals: 'Ate all meals',
      sleep: 'Good (7 hours)',
      notes: 'Excellent participation in art therapy. Created a painting expressing positive emotions.',
      staff: 'James Mitchell',
      riskLevel: 'amber',
    },
    {
      id: 6,
      serviceUser: 'Michael Chen',
      userId: 2,
      userPhoto: '👦',
      date: '6 Dec 2025',
      time: '15:30',
      type: 'Daily Log',
      mood: 'neutral',
      moodEmoji: '😐',
      behavior: 'Calm',
      activities: 'Educational activities, Computer time',
      meals: 'Ate most meals',
      sleep: 'Good (7 hours)',
      notes: 'Completed educational tasks independently. Showed good concentration.',
      staff: 'John Davies',
      riskLevel: 'green',
    },
    {
      id: 7,
      serviceUser: 'Emma Wilson',
      userId: 3,
      userPhoto: '👧',
      date: '6 Dec 2025',
      time: '14:00',
      type: 'Daily Log',
      mood: 'happy',
      moodEmoji: '😊',
      behavior: 'Engaged',
      activities: 'Group activities, Outdoor play',
      meals: 'Ate all meals',
      sleep: 'Excellent (9 hours)',
      notes: 'Very positive day. Engaged well with peers during outdoor activities.',
      staff: 'Mary Thompson',
      riskLevel: 'green',
    },
    {
      id: 8,
      serviceUser: 'James Rodriguez',
      userId: 4,
      userPhoto: '👦',
      date: '6 Dec 2025',
      time: '09:15',
      type: 'Daily Log',
      mood: 'neutral',
      moodEmoji: '😐',
      behavior: 'Withdrawn',
      activities: 'Breakfast, Room time',
      meals: 'Ate some meals',
      sleep: 'Fair (5 hours)',
      notes: 'Slow start to the day. Required encouragement to join breakfast.',
      staff: 'Sarah Williams',
      riskLevel: 'red',
    },
  ];

  const stats = {
    totalLogs: 127,
    todayLogs: 8,
    happyMood: 45,
    neutralMood: 38,
    sadMood: 17,
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.serviceUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMood = selectedMood === '' || log.mood === selectedMood;
    const matchesStaff = selectedStaff === '' || log.staff === selectedStaff;
    return matchesSearch && matchesMood && matchesStaff;
  });

  const getMoodColor = (mood: string) => {
    switch(mood) {
      case 'happy': return 'text-green-600';
      case 'neutral': return 'text-amber-600';
      case 'sad': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Daily Logs" />
      <TopBar />
      
      <main className="ml-64 pt-24 px-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl text-gray-900">Daily Logs</h1>
            <p className="text-sm text-gray-600 mt-1">Track daily activities, mood, behavior, and observations</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => {
                const data = JSON.stringify(logs, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `daily-logs-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download size={18} className="text-gray-600" />
              <span className="text-sm text-gray-700">Export</span>
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                setSelectedUser({ id: 0, name: 'Select Service User' });
                setShowQuickLog(true);
              }}
            >
              <Plus size={20} />
              Add Log Entry
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Logs</div>
                <div className="text-2xl text-gray-900">{stats.totalLogs}</div>
              </div>
              <FileText size={32} className="text-blue-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Today's Logs</div>
                <div className="text-2xl text-gray-900">{stats.todayLogs}</div>
              </div>
              <Calendar size={32} className="text-green-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Happy Mood</div>
                <div className="text-2xl text-gray-900">{stats.happyMood}%</div>
              </div>
              <Smile size={32} className="text-green-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Neutral Mood</div>
                <div className="text-2xl text-gray-900">{stats.neutralMood}%</div>
              </div>
              <Meh size={32} className="text-amber-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Sad Mood</div>
                <div className="text-2xl text-gray-900">{stats.sadMood}%</div>
              </div>
              <Frown size={32} className="text-red-600" />
            </div>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="mb-6">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by service user or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Time Filter */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
              <button 
                className={`px-3 py-1 text-sm rounded ${viewMode === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
                onClick={() => setViewMode('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded ${viewMode === 'today' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
                onClick={() => setViewMode('today')}
              >
                Today
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded ${viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
                onClick={() => setViewMode('week')}
              >
                This Week
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded ${viewMode === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
                onClick={() => setViewMode('month')}
              >
                This Month
              </button>
            </div>

            {/* Mood Filter */}
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">All Moods</option>
              <option value="happy">Happy</option>
              <option value="neutral">Neutral</option>
              <option value="sad">Sad</option>
            </select>

            {/* Staff Filter */}
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">All Staff</option>
              <option value="Mary Thompson">Mary Thompson</option>
              <option value="John Davies">John Davies</option>
              <option value="Sarah Williams">Sarah Williams</option>
              <option value="James Mitchell">James Mitchell</option>
            </select>

            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={18} className="text-gray-600" />
            </button>
          </div>
        </Card>

        {/* Logs Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Service User</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Date & Time</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Mood</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Behavior</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Activities</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Staff</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                          {log.userPhoto}
                        </div>
                        <div>
                          <div className="text-sm text-gray-900">{log.serviceUser}</div>
                          <Badge variant={log.riskLevel as any} className="text-xs">
                            {log.riskLevel === 'red' ? 'High' : log.riskLevel === 'amber' ? 'Medium' : 'Low'}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{log.date}</div>
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <Clock size={12} />
                        {log.time}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="gray">{log.type}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{log.moodEmoji}</span>
                        <span className={`text-sm ${getMoodColor(log.mood)}`}>
                          {log.mood.charAt(0).toUpperCase() + log.mood.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{log.behavior}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-700 max-w-xs truncate">{log.activities}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-700">{log.staff}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          onClick={() => {
                            setSelectedLog(log);
                            setShowLogDetail(true);
                          }}
                        >
                          <Eye size={16} className="text-gray-600" />
                        </button>
                        <button 
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          onClick={() => {
                            setSelectedUser({ id: log.userId, name: log.serviceUser });
                            setShowQuickLog(true);
                          }}
                        >
                          <Edit size={16} className="text-gray-600" />
                        </button>
                        <div className="relative">
                          <button 
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            onClick={() => setOpenDropdown(openDropdown === log.id ? null : log.id)}
                          >
                            <MoreVertical size={16} className="text-gray-400" />
                          </button>
                          {openDropdown === log.id && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg border border-gray-100 shadow-lg z-10">
                              <button 
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => {
                                  console.log('View details:', log.id);
                                  setOpenDropdown(null);
                                }}
                              >
                                <Eye size={16} />
                                View Details
                              </button>
                              <button 
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => {
                                  console.log('Edit log:', log.id);
                                  setOpenDropdown(null);
                                }}
                              >
                                <Edit size={16} />
                                Edit Log
                              </button>
                              <button 
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                                onClick={() => {
                                  console.log('Delete log:', log.id);
                                  setOpenDropdown(null);
                                }}
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Showing {filteredLogs.length} of {logs.length} logs
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                3
              </button>
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center py-6 text-xs text-gray-500 border-t border-gray-100 mt-8">
          MpoweredCare © 2025 — Internal Use Only
        </div>
      </main>

      {/* Modals */}
      {selectedUser && (
        <QuickLogModal
          isOpen={showQuickLog}
          onClose={() => {
            setShowQuickLog(false);
            setSelectedUser(null);
          }}
          userName={selectedUser.name}
          userId={selectedUser.id}
        />
      )}
      {selectedLog && (
        <DailyLogDetailModal
          isOpen={showLogDetail}
          onClose={() => {
            setShowLogDetail(false);
            setSelectedLog(null);
          }}
          log={selectedLog}
        />
      )}
    </div>
  );
}