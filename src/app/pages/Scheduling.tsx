import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { AddShiftModal } from '../components/AddShiftModal';
import { AssignStaffModal } from '../components/AssignStaffModal';
import { EditShiftModal } from '../components/EditShiftModal';
import { ShiftDetailModal } from '../components/ShiftDetailModal';
import { DuplicateShiftModal } from '../components/DuplicateShiftModal';
import { DeleteShiftModal } from '../components/DeleteShiftModal';
import {
  Search, Filter, Plus, Download, Calendar, Clock, User, Users,
  ChevronLeft, ChevronRight, Edit, Trash2, Copy, AlertCircle,
  CheckCircle, Bell, MoreVertical, CalendarDays, X, MapPin,
  Eye, UserPlus, LogIn, LogOut, TrendingUp, TrendingDown, Minus,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';

export default function Scheduling() {
  const { setCurrentPage } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddShift, setShowAddShift] = useState(false);
  const [showAssignStaff, setShowAssignStaff] = useState(false);
  const [showEditShift, setShowEditShift] = useState(false);
  const [showShiftDetail, setShowShiftDetail] = useState(false);
  const [showDuplicateShift, setShowDuplicateShift] = useState(false);
  const [showDeleteShift, setShowDeleteShift] = useState(false);
  const [selectedShift, setSelectedShift] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date('2025-12-07'));
  const [dismissAlert, setDismissAlert] = useState(false);
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const shifts = [
    { id: 1,  staffName: 'Mary Thompson', staffId: 1, role: 'Support Worker',        date: '7 Dec 2025', startTime: '07:00', endTime: '15:00', duration: '8h', location: 'Main House',     serviceUsers: ['Sarah Johnson', 'Emma Wilson'],             status: 'confirmed', notes: '',                              clockIn: '07:02', clockOut: '15:04' },
    { id: 2,  staffName: 'John Davies',   staffId: 2, role: 'Senior Support Worker', date: '7 Dec 2025', startTime: '07:00', endTime: '15:00', duration: '8h', location: 'Annex Building', serviceUsers: ['Michael Chen', 'James Rodriguez'],          status: 'confirmed', notes: '',                              clockIn: '06:58', clockOut: '15:01' },
    { id: 3,  staffName: 'Sarah Williams',staffId: 3, role: 'Support Worker',        date: '7 Dec 2025', startTime: '15:00', endTime: '23:00', duration: '8h', location: 'Main House',     serviceUsers: ['Sarah Johnson', 'Emma Wilson'],             status: 'scheduled', notes: '',                              clockIn: null,    clockOut: null    },
    { id: 4,  staffName: 'James Mitchell',staffId: 4, role: 'Care Manager',          date: '7 Dec 2025', startTime: '09:00', endTime: '17:00', duration: '8h', location: 'Office',         serviceUsers: [],                                           status: 'confirmed', notes: 'Supervision meetings scheduled', clockIn: '09:14', clockOut: null    },
    { id: 5,  staffName: '',              staffId: 0, role: 'Support Worker',        date: '7 Dec 2025', startTime: '23:00', endTime: '07:00', duration: '8h', location: 'Main House',     serviceUsers: ['Sarah Johnson', 'Emma Wilson'],             status: 'unfilled', notes: 'Night shift - needs coverage',   clockIn: null,    clockOut: null    },
    { id: 6,  staffName: 'David Brown',   staffId: 6, role: 'Support Worker',        date: '7 Dec 2025', startTime: '15:00', endTime: '23:00', duration: '8h', location: 'Annex Building', serviceUsers: ['Michael Chen', 'James Rodriguez'],          status: 'scheduled', notes: '',                              clockIn: null,    clockOut: null    },
    { id: 7,  staffName: 'Lisa Anderson', staffId: 7, role: 'Nurse',                 date: '7 Dec 2025', startTime: '08:00', endTime: '16:00', duration: '8h', location: 'Main House',     serviceUsers: ['Sarah Johnson', 'Emma Wilson', 'Michael Chen'], status: 'confirmed', notes: 'Medication round supervision', clockIn: '07:59', clockOut: '16:03' },
    { id: 8,  staffName: 'Mary Thompson', staffId: 1, role: 'Support Worker',        date: '8 Dec 2025', startTime: '07:00', endTime: '15:00', duration: '8h', location: 'Main House',     serviceUsers: ['Sarah Johnson', 'Emma Wilson'],             status: 'scheduled', notes: '',                              clockIn: null,    clockOut: null    },
    { id: 9,  staffName: 'John Davies',   staffId: 2, role: 'Senior Support Worker', date: '8 Dec 2025', startTime: '07:00', endTime: '15:00', duration: '8h', location: 'Annex Building', serviceUsers: ['Michael Chen', 'James Rodriguez'],          status: 'scheduled', notes: '',                              clockIn: null,    clockOut: null    },
    { id: 10, staffName: '',              staffId: 0, role: 'Support Worker',        date: '8 Dec 2025', startTime: '23:00', endTime: '07:00', duration: '8h', location: 'Annex Building', serviceUsers: ['Michael Chen', 'James Rodriguez'],          status: 'unfilled', notes: 'Urgent - needs coverage',        clockIn: null,    clockOut: null    },
  ];

  // Returns variance in minutes between scheduled and actual clock time (negative = early, positive = late)
  const getVariance = (scheduled: string, actual: string | null): number | null => {
    if (!actual) return null;
    const [sh, sm] = scheduled.split(':').map(Number);
    const [ah, am] = actual.split(':').map(Number);
    return (ah * 60 + am) - (sh * 60 + sm);
  };

  const VariancePill = ({ scheduled, actual, type }: { scheduled: string; actual: string | null; type: 'in' | 'out' }) => {
    const v = getVariance(scheduled, actual);
    if (actual === null) return <span className="text-xs text-gray-300">—</span>;
    const abs = Math.abs(v!);
    const late = type === 'in' ? v! > 2 : v! > 5;
    const early = type === 'in' ? v! < -2 : v! < -5;
    return (
      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-800 font-mono">{actual}</span>
        {late  && <span className="flex items-center gap-0.5 text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full"><TrendingUp size={9} />+{abs}m</span>}
        {early && <span className="flex items-center gap-0.5 text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full"><TrendingDown size={9} />-{abs}m</span>}
        {!late && !early && <span className="flex items-center gap-0.5 text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full"><Minus size={9} />On time</span>}
      </div>
    );
  };

  // Staff currently clocked in (clockIn set, clockOut null, shift is today's date)
  const liveAttendance = shifts.filter(s => s.clockIn && !s.clockOut && s.staffName);

  const stats = { totalShifts: 42, staffOnDuty: 7, unfilled: 3, coverage: 93, averageHours: 38.5, overtime: 12 };

  const currentWeekDates = [
    { date: 2, day: 'Mon' }, { date: 3, day: 'Tue' }, { date: 4, day: 'Wed' },
    { date: 5, day: 'Thu' }, { date: 6, day: 'Fri' }, { date: 7, day: 'Sat' }, { date: 8, day: 'Sun' },
  ];

  const filteredShifts = shifts.filter(shift => {
    const matchesSearch = shift.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shift.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === '' || shift.role === filterRole;
    const matchesStatus = filterStatus === '' || shift.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return <Badge variant="green">Confirmed</Badge>;
      case 'scheduled': return <Badge variant="blue">Scheduled</Badge>;
      case 'unfilled': return <Badge variant="red">Unfilled</Badge>;
      case 'cancelled': return <Badge variant="gray">Cancelled</Badge>;
      default: return <Badge variant="gray">{status}</Badge>;
    }
  };

  const getShiftColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-50 border-green-200 text-green-900';
      case 'scheduled': return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'unfilled': return 'bg-red-50 border-red-200 text-red-900';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const navigateWeek = (dir: 'prev' | 'next') => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + (dir === 'next' ? 7 : -7));
    setSelectedDate(d);
  };

  const openShiftDetail = (shift: any) => { setSelectedShift(shift); setShowShiftDetail(true); setOpenDropdown(null); };
  const openEdit = (shift: any) => { setSelectedShift(shift); setShowEditShift(true); setOpenDropdown(null); };
  const openAssign = (shift: any) => { setSelectedShift(shift); setShowAssignStaff(true); setOpenDropdown(null); };
  const openDuplicate = (shift: any) => { setSelectedShift(shift); setShowDuplicateShift(true); setOpenDropdown(null); };
  const openDelete = (shift: any) => { setSelectedShift(shift); setShowDeleteShift(true); setOpenDropdown(null); };

  return (
    <div className="bg-gray-50 min-h-screen" onClick={() => openDropdown !== null && setOpenDropdown(null)}>
      <Sidebar activeItem="Scheduling" />
      <TopBar />

      <main className="ml-0 md:ml-64 pt-20 px-4 md:px-8 pb-12 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto w-full">

          {/* ── Page Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl text-gray-900">Staff Scheduling</h1>
              <p className="text-sm text-gray-500 mt-1">Manage shifts, rosters, and staff coverage across all locations</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentPage('staff')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <Users size={16} className="text-blue-600" />
                Staff Directory
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(shifts, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url; a.download = `roster-${new Date().toISOString().slice(0, 10)}.json`; a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <Download size={16} className="text-gray-500" />
                Export Roster
              </button>
              <button
                onClick={() => setShowAddShift(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
              >
                <Plus size={18} />
                Add Shift
              </button>
            </div>
          </div>

          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {[
              { label: 'Total Shifts', value: stats.totalShifts, icon: <CalendarDays size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Staff On Duty', value: stats.staffOnDuty, icon: <Users size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Unfilled Shifts', value: stats.unfilled, icon: <AlertCircle size={20} />, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Coverage', value: `${stats.coverage}%`, icon: <CheckCircle size={20} />, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Avg Hrs / Week', value: stats.averageHours, icon: <Clock size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Overtime Hrs', value: stats.overtime, icon: <Clock size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((s, i) => (
              <Card key={i} className="flex items-center gap-3 py-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.bg} ${s.color}`}>{s.icon}</div>
                <div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                  <div className={`text-xl font-semibold ${s.color}`}>{s.value}</div>
                </div>
              </Card>
            ))}
          </div>

        {/* ── Live Attendance Strip ── */}
        {liveAttendance.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-xl px-5 py-3 mb-4 shadow-sm">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-500 uppercase tracking-wide">Currently clocked in</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{liveAttendance.length} staff</span>
              </div>
              <div className="w-px h-4 bg-gray-200 shrink-0" />
              <div className="flex items-center gap-2 flex-wrap">
                {liveAttendance.map(s => (
                  <div key={s.id} className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-2.5 py-1">
                    <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs shrink-0">
                      {s.staffName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-xs text-gray-800">{s.staffName}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-green-700 font-mono">in {s.clockIn}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Alert Banner ── */}
        {stats.unfilled > 0 && !dismissAlert && (
          <div className="flex items-center gap-3 px-5 py-3.5 bg-red-50 border border-red-200 rounded-xl mb-6">
            <Bell size={18} className="text-red-600 shrink-0" />
            <p className="flex-1 text-sm text-red-800">
              <span className="font-semibold">{stats.unfilled} unfilled shifts</span> require urgent coverage. Assign staff before the shift starts.
            </p>
            <button onClick={() => setDismissAlert(true)} className="p-1 hover:bg-red-100 rounded-lg transition-colors">
              <X size={15} className="text-red-500" />
            </button>
          </div>
        )}

        {/* ── View Controls ── */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
            {(['day', 'week', 'month'] as const).map(m => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-4 py-1.5 text-sm rounded-lg capitalize transition-colors font-medium ${viewMode === m ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigateWeek('prev')} className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <span className="text-sm text-gray-800 font-medium px-1">Week of December 2–8, 2025</span>
            <button onClick={() => navigateWeek('next')} className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* ── Week Calendar ── */}
        {viewMode === 'week' && (
          <Card className="mb-6 overflow-x-auto p-0">
            <div className="grid grid-cols-8 min-w-[800px]">
              {/* Header */}
              <div className="border-r border-b border-gray-100 px-3 py-3 bg-gray-50">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Time</span>
              </div>
              {currentWeekDates.map((d, i) => (
                <div key={i} className="border-r border-b border-gray-100 px-3 py-3 text-center bg-gray-50">
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{d.day}</div>
                  <div className={`text-lg font-semibold mt-0.5 ${d.date === 7 ? 'text-blue-600' : 'text-gray-700'}`}>{d.date}</div>
                </div>
              ))}
              {/* Rows */}
              {['07:00', '09:00', '15:00', '23:00'].map((time, ti) => (
                <div key={ti} className="contents">
                  <div className="border-r border-b border-gray-100 px-3 py-3 bg-white">
                    <span className="text-xs text-gray-500 font-medium">{time}</span>
                  </div>
                  {currentWeekDates.map((day, di) => {
                    const dayShifts = shifts.filter(s => s.date === `${day.date} Dec 2025` && s.startTime === time);
                    return (
                      <div key={di} className="border-r border-b border-gray-100 p-1.5 bg-white min-h-[72px]">
                        {dayShifts.map(shift => (
                          <div
                            key={shift.id}
                            onClick={() => openShiftDetail(shift)}
                            className={`px-2 py-1.5 rounded-lg border mb-1 cursor-pointer hover:shadow-sm transition-all ${getShiftColor(shift.status)}`}
                          >
                            <div className="text-xs font-semibold truncate">{shift.staffName || '⚠ Unfilled'}</div>
                            <div className="text-[10px] mt-0.5 opacity-70 truncate">{shift.location}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </Card>
        )}

        {viewMode === 'day' && (
          <Card className="mb-6">
            <div className="text-center py-10 text-gray-400">
              <CalendarDays size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">Day view — Sunday 7 Dec 2025</p>
              <p className="text-xs mt-1 text-gray-300">Showing all shifts for selected date</p>
            </div>
          </Card>
        )}

        {viewMode === 'month' && (
          <Card className="mb-6">
            <div className="text-center py-10 text-gray-400">
              <Calendar size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">Month view — December 2025</p>
            </div>
          </Card>
        )}

        {/* ── Filters & Search ── */}
        <Card className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by staff name or location..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
            <select
              value={filterRole}
              onChange={e => setFilterRole(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <option value="">All Roles</option>
              <option value="Support Worker">Support Worker</option>
              <option value="Senior Support Worker">Senior Support Worker</option>
              <option value="Care Manager">Care Manager</option>
              <option value="Nurse">Nurse</option>
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <option value="">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="scheduled">Scheduled</option>
              <option value="unfilled">Unfilled</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors text-sm text-gray-600">
              <Filter size={15} />
              More Filters
            </button>
          </div>
        </Card>

        {/* ── Shifts Table ── */}
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th className="text-left py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Staff Member</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Users</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1"><LogIn size={12} className="text-green-500" /> Clock In</div>
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1"><LogOut size={12} className="text-gray-400" /> Clock Out</div>
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShifts.map(shift => (
                  <tr key={shift.id} className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
                    {/* Staff */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold shrink-0 ${shift.staffName ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-500'}`}>
                          {shift.staffName ? shift.staffName.split(' ').map(n => n[0]).join('') : '?'}
                        </div>
                        <div>
                          {shift.staffName ? (
                            <button
                              onClick={() => setCurrentPage('staff-profile', { id: shift.staffId })}
                              className="text-sm font-medium text-blue-600 hover:underline"
                            >
                              {shift.staffName}
                            </button>
                          ) : (
                            <span className="text-sm font-medium text-red-500">Unassigned</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-700">{shift.role}</span>
                    </td>

                    {/* Date & Time */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-800">
                        <Calendar size={13} className="text-gray-400 shrink-0" />
                        {shift.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                        <Clock size={11} className="text-gray-400 shrink-0" />
                        {shift.startTime}–{shift.endTime} · {shift.duration}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        <MapPin size={13} className="text-gray-400 shrink-0" />
                        {shift.location}
                      </div>
                    </td>

                    {/* Service Users */}
                    <td className="py-4 px-4">
                      {shift.serviceUsers.length > 0 ? (
                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                          <Users size={13} className="text-gray-400 shrink-0" />
                          {shift.serviceUsers.length} user{shift.serviceUsers.length > 1 ? 's' : ''}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>

                    {/* Clock In */}
                    <td className="py-4 px-4">
                      {shift.status === 'unfilled' ? (
                        <span className="text-xs text-gray-300">—</span>
                      ) : (
                        <VariancePill scheduled={shift.startTime} actual={shift.clockIn} type="in" />
                      )}
                    </td>

                    {/* Clock Out */}
                    <td className="py-4 px-4">
                      {shift.status === 'unfilled' ? (
                        <span className="text-xs text-gray-300">—</span>
                      ) : shift.clockIn && !shift.clockOut ? (
                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> On shift
                        </span>
                      ) : (
                        <VariancePill scheduled={shift.endTime} actual={shift.clockOut} type="out" />
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">{getStatusBadge(shift.status)}</td>

                    {/* Actions */}
                    <td className="py-4 px-4 w-[160px]">
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>

                        {/* Primary action — always one button, label changes by status */}
                        {shift.status === 'unfilled' ? (
                          <button
                            onClick={() => openAssign(shift)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-[120px] justify-center"
                          >
                            <UserPlus size={13} />
                            Assign Staff
                          </button>
                        ) : shift.status === 'confirmed' ? (
                          <button
                            onClick={() => openShiftDetail(shift)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors w-[120px] justify-center"
                          >
                            <Eye size={13} />
                            View Details
                          </button>
                        ) : shift.status === 'scheduled' ? (
                          <button
                            onClick={() => openEdit(shift)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors w-[120px] justify-center"
                          >
                            <Edit size={13} />
                            Edit Shift
                          </button>
                        ) : (
                          <button
                            onClick={() => openShiftDetail(shift)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-[120px] justify-center"
                          >
                            <Eye size={13} />
                            View Details
                          </button>
                        )}

                        {/* Overflow menu */}
                        <div className="relative">
                          <button
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setOpenDropdown(openDropdown === shift.id ? null : shift.id)}
                          >
                            <MoreVertical size={15} />
                          </button>
                          {openDropdown === shift.id && (
                            <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl border border-gray-100 shadow-xl z-20 py-1">
                              <button
                                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => openShiftDetail(shift)}
                              >
                                <Eye size={14} className="text-gray-400" />
                                View Details
                              </button>
                              <button
                                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => openEdit(shift)}
                              >
                                <Edit size={14} className="text-gray-400" />
                                Edit Shift
                              </button>
                              {shift.status === 'unfilled' && (
                                <button
                                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                  onClick={() => openAssign(shift)}
                                >
                                  <UserPlus size={14} className="text-gray-400" />
                                  Assign Staff
                                </button>
                              )}
                              <button
                                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => openDuplicate(shift)}
                              >
                                <Copy size={14} className="text-gray-400" />
                                Duplicate Shift
                              </button>
                              <div className="my-1 border-t border-gray-100" />
                              <button
                                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                onClick={() => openDelete(shift)}
                              >
                                <Trash2 size={14} />
                                Delete Shift
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredShifts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-gray-400">
                      <CalendarDays size={32} className="mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No shifts match your filters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50/40">
            <span className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-700">{filteredShifts.length}</span> of <span className="font-medium text-gray-700">{shifts.length}</span> shifts
            </span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">Previous</button>
              <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">2</button>
              <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">Next</button>
            </div>
          </div>
        </Card>
      </div>
    </main>

      {/* Modals */}
      <AddShiftModal isOpen={showAddShift} onClose={() => setShowAddShift(false)} />
      <AssignStaffModal isOpen={showAssignStaff} onClose={() => setShowAssignStaff(false)} shift={selectedShift} onAssign={() => {}} />
      <EditShiftModal isOpen={showEditShift} onClose={() => setShowEditShift(false)} shift={selectedShift} onSave={() => {}} />
      <ShiftDetailModal isOpen={showShiftDetail} onClose={() => setShowShiftDetail(false)} shift={selectedShift} />
      <DuplicateShiftModal isOpen={showDuplicateShift} onClose={() => setShowDuplicateShift(false)} shift={selectedShift} onDuplicate={() => {}} />
      <DeleteShiftModal isOpen={showDeleteShift} onClose={() => setShowDeleteShift(false)} shift={selectedShift} onDelete={() => {}} />
    </div>
  );
}
