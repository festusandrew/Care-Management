import { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { useNavigation } from '../context/NavigationContext';
import { AddStaffMemberModal } from '../components/AddStaffMemberModal';
import { EditStaffModal } from '../components/EditStaffModal';
import { FilterPanel } from '../components/FilterPanel';
import {
  Search, Filter, Plus, Phone, Mail, FileText, CalendarDays,
  MoreVertical, Eye, Download, Grid3x3, List, MapPin, Edit,
  Shield, Clock, Hash, LogIn, LogOut, Activity, X, AlertCircle,
  CheckCircle, XCircle, CalendarRange, MessageSquare, ChevronDown,
  History, Calendar
} from 'lucide-react';

import { 
  ClockEvent, 
  LeaveStatus, 
  LeaveRequest, 
  HistoryRecord, 
  StaffMember 
} from '../mockData/mockStore';
import { api } from '../services/api';

function varianceLabel(scheduled: string, actual: string | null, type: 'in' | 'out') {
  if (!actual) return null;
  const [sh, sm] = scheduled.split(':').map(Number);
  const [ah, am] = actual.split(':').map(Number);
  const diff = (ah * 60 + am) - (sh * 60 + sm);
  const abs = Math.abs(diff);
  const late  = type === 'in' ? diff > 2  : diff > 5;
  const early = type === 'in' ? diff < -2 : diff < -5;
  if (late)  return { label: `+${abs}m late`,  cls: 'text-red-600 bg-red-50' };
  if (early) return { label: `-${abs}m early`, cls: 'text-amber-600 bg-amber-50' };
  return { label: 'On time', cls: 'text-green-600 bg-green-50' };
}

function getInitials(name: string) {
  if (!name) return '';
  const names = name.trim().split(/\s+/);
  return names.length > 1
    ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
    : (names[0][0] || '').toUpperCase();
}

function getAvatarColor(id: number) {
  const colors = [
    'bg-purple-500', 'bg-blue-500', 'bg-rose-500',
    'bg-amber-500', 'bg-teal-500', 'bg-indigo-500', 'bg-pink-500', 'bg-emerald-500'
  ];
  const index = Math.abs(id || 0) % colors.length;
  return colors[index];
}

export default function Staff() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'directory' | 'attendance' | 'leave'>('directory');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [attendanceView, setAttendanceView] = useState<'live' | 'history'>('live');
  const [historyDateFrom, setHistoryDateFrom] = useState('2026-06-06');
  const [historyDateTo, setHistoryDateTo]     = useState('2026-06-09');
  const [historyStaffFilter, setHistoryStaffFilter] = useState('');
  const [declineTarget, setDeclineTarget] = useState<LeaveRequest | null>(null);
  const [declineNote, setDeclineNote] = useState('');
  const [detailRequest, setDetailRequest] = useState<LeaveRequest | null>(null);
  const [showLogLeave, setShowLogLeave] = useState(false);
  const [logLeaveForm, setLogLeaveForm] = useState({ staffId: '', type: 'Annual Leave', from: '', to: '', startTime: '', endTime: '', hours: '', reason: '', status: 'approved' as LeaveStatus });
  const [confirmClockOut, setConfirmClockOut] = useState<ClockEvent | null>(null);
  const [clockOutNote, setClockOutNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setCurrentPage } = useNavigation();

  // Async API State
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [editStaffTarget, setEditStaffTarget] = useState<StaffMember | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({});
  const [clockEvents, setClockEvents] = useState<ClockEvent[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [attendanceHistory, setAttendanceHistory] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [leaveFilter, setLeaveFilter] = useState<'all' | 'pending' | 'approved' | 'declined'>('all');

  useEffect(() => {
    let active = true;
    Promise.all([
      api.getStaffMembers(),
      api.getClockEvents(),
      api.getLeaveRequests(),
      api.getAttendanceHistory()
    ]).then(([staffData, clockData, leaveData, historyData]) => {
      if (active) {
        setStaffMembers(staffData);
        setClockEvents(clockData);
        setLeaveRequests(leaveData);
        setAttendanceHistory(historyData);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  const adminClockOut = async (staffId: number) => {
    try {
      const updated = await api.clockOutStaff(staffId, clockOutNote);
      setClockEvents(evs => evs.map(e => e.staffId === staffId ? updated : e));
      setToastMessage(`${updated.name} has been clocked out`);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToastMessage(null), 3000);
      setConfirmClockOut(null);
      setClockOutNote('');
    } catch (err) {
      console.error(err);
    }
  };

  const adminClockIn = async (staffId: number) => {
    try {
      const updated = await api.clockInStaff(staffId);
      setClockEvents(evs => evs.map(e => e.staffId === staffId ? updated : e));
      setToastMessage(`${updated.name} has been clocked in`);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const approveLeave = async (id: number) => {
    try {
      const updated = await api.updateLeaveRequestStatus(id, 'approved');
      setLeaveRequests(rs => rs.map(r => r.id === id ? updated : r));
      setDetailRequest(r => r?.id === id ? updated : r);
    } catch (err) {
      console.error(err);
    }
  };

  const declineLeave = async (id: number, note: string) => {
    try {
      const updated = await api.updateLeaveRequestStatus(id, 'declined', note);
      setLeaveRequests(rs => rs.map(r => r.id === id ? updated : r));
      setDetailRequest(r => r?.id === id ? updated : r);
      setDeclineTarget(null);
      setDeclineNote('');
    } catch (err) {
      console.error(err);
    }
  };

  const submitLogLeave = async () => {
    if (!logLeaveForm.staffId || !logLeaveForm.from || !logLeaveForm.to) return;
    const member = staffMembers.find(s => s.id === Number(logLeaveForm.staffId));
    if (!member) return;
    const from = new Date(logLeaveForm.from);
    const to   = new Date(logLeaveForm.to);
    const dayCount = Math.max(1, Math.round((to.getTime() - from.getTime()) / 86400000) + 1);
    const hours = logLeaveForm.hours ? Number(logLeaveForm.hours) : dayCount * 8;
    const fmt  = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    
    const newRequest = {
      staffId: member.id,
      name: member.name,
      employeeId: member.employeeId,
      avatarUrl: member.avatarUrl,
      role: member.role,
      type: logLeaveForm.type,
      from: fmt(from),
      to: fmt(to),
      startTime: logLeaveForm.startTime,
      endTime: logLeaveForm.endTime,
      hours,
      reason: logLeaveForm.reason || 'Logged by admin.',
      status: logLeaveForm.status,
      adminNote: 'Logged manually by admin.',
    };

    try {
      const created = await api.logLeaveRequest(newRequest);
      setLeaveRequests(rs => [created, ...rs]);
      setShowLogLeave(false);
      setLogLeaveForm({ staffId: '', type: 'Annual Leave', from: '', to: '', startTime: '', endTime: '', hours: '', reason: '', status: 'approved' });
    } catch (err) {
      console.error(err);
    }
  };

  const pendingCount = leaveRequests.filter(r => r.status === 'pending').length;

  const filteredHistory = attendanceHistory.filter(r => {
    const inRange = (!historyDateFrom || r.date >= historyDateFrom) && (!historyDateTo || r.date <= historyDateTo);
    const matchStaff = !historyStaffFilter || r.staffId === Number(historyStaffFilter);
    return inRange && matchStaff;
  });
  const uniqueDates = [...new Set(filteredHistory.map(r => r.date))].sort((a, b) => b.localeCompare(a));
  const totalHistoryHours = filteredHistory.reduce((s, r) => s + (r.hoursWorked ?? 0), 0);

  const euCount    = staffMembers.filter(s => s.nationalityRegion === 'EU').length;
  const nonEuCount = staffMembers.filter(s => s.nationalityRegion === 'Non-EU').length;
  const total      = staffMembers.length;
  const pct = (n: number) => total > 0 ? Math.round((n / total) * 100) : 0;
  const stats = [
    { label: 'Total Staff', value: total.toString(), trend: '+1 this month' },
    { label: 'On Leave', value: staffMembers.filter(s => s.status === 'On Leave').length.toString(), color: 'text-gray-600' },
    { label: 'Pending Timesheets', value: '5', color: 'text-amber-600' },
    { label: 'Compliance Due', value: '2', color: 'text-red-600' },
    { label: 'EU Staff',     value: euCount.toString(),    color: 'text-blue-600',   trend: `${pct(euCount)}% of workforce` },
    { label: 'Non-EU Staff', value: nonEuCount.toString(), color: 'text-purple-600', trend: `${pct(nonEuCount)}% of workforce` },
  ];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          staff.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === '' || staff.role === filterRole;
    const matchesStatus = filterStatus === '' || staff.status === filterStatus;

    const fRole     = filterValues['role']     ?? [];
    const fStatus   = filterValues['status']   ?? [];
    const fLocation = filterValues['location'] ?? [];
    const fRegion   = filterValues['nationalityRegion'] ?? [];
    const matchesFRole     = fRole.length === 0     || fRole.includes(staff.role);
    const matchesFStatus   = fStatus.length === 0   || fStatus.includes(staff.status);
    const matchesFLocation = fLocation.length === 0 || fLocation.includes(staff.location);
    const matchesFRegion   = fRegion.length === 0   || (staff.nationalityRegion && fRegion.includes(staff.nationalityRegion));

    return matchesSearch && matchesRole && matchesStatus && matchesFRole && matchesFStatus && matchesFLocation && matchesFRegion;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active':
        return <Badge variant="green">Active</Badge>;
      case 'On Leave':
        return <Badge variant="gray">On Leave</Badge>;
      case 'Suspended':
        return <Badge variant="red">Suspended</Badge>;
      default:
        return <Badge variant="gray">{status}</Badge>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <Sidebar activeItem="Staff Management" />
      <TopBar />
      
      <main className="ml-0 md:ml-64 pt-20 px-4 md:px-8 pb-8 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl text-gray-900">Staff Management</h1>
              <p className="text-sm text-gray-600 mt-1">Manage employee records, roles, schedules, and compliance</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-700 font-medium">
                <Download size={18} />
                Export Directory
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm"
              >
                <Plus size={20} />
                Add Staff Member
              </button>
            </div>
          </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
              <div className={`text-3xl ${stat.color || 'text-gray-900'}`}>{stat.value}</div>
              {stat.trend && (
                <div className="text-xs text-gray-500 mt-1">{stat.trend}</div>
              )}
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === 'directory' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Staff Directory
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === 'attendance' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Attendance
          </button>
          <button
            onClick={() => setActiveTab('leave')}
            className={`relative flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === 'leave' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <CalendarRange size={15} />
            Leave Requests
            {pendingCount > 0 && (
              <span className="absolute -top-0.5 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center leading-none">
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* Attendance Panel */}
        {activeTab === 'attendance' && (
          <div className="space-y-5">
            {/* View toggle + filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
                <button
                  onClick={() => setAttendanceView('live')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg transition-colors ${attendanceView === 'live' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <span className={`w-2 h-2 rounded-full ${attendanceView === 'live' ? 'bg-white animate-pulse' : 'bg-green-400'}`} />
                  Live Today
                </button>
                <button
                  onClick={() => setAttendanceView('history')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg transition-colors ${attendanceView === 'history' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <History size={14} />
                  History
                </button>
              </div>

              {attendanceView === 'history' && (
                <>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-gray-500">From</label>
                    <input type="date" value={historyDateFrom} onChange={e => setHistoryDateFrom(e.target.value)}
                      className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-gray-500">To</label>
                    <input type="date" min={historyDateFrom} value={historyDateTo} onChange={e => setHistoryDateTo(e.target.value)}
                      className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                  <select value={historyStaffFilter} onChange={e => setHistoryStaffFilter(e.target.value)}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white text-gray-700">
                    <option value="">All Staff</option>
                    {clockEvents.map(s => <option key={s.staffId} value={s.staffId}>{s.name}</option>)}
                  </select>
                  <span className="text-xs text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                    {filteredHistory.length} records · {totalHistoryHours.toFixed(1)}h total
                  </span>
                </>
              )}
            </div>

            {/* Summary cards */}
            {attendanceView === 'live' && (
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Currently On Shift', value: clockEvents.filter(e => e.clockIn && !e.clockOut).length, color: 'text-green-600', bg: 'bg-green-50', icon: <Activity size={18} className="text-green-600" /> },
                { label: 'Clocked Out Today', value: clockEvents.filter(e => e.clockOut).length, color: 'text-gray-700', bg: 'bg-gray-100', icon: <LogOut size={18} className="text-gray-500" /> },
                { label: 'Not Yet Clocked In', value: clockEvents.filter(e => !e.clockIn).length, color: 'text-amber-600', bg: 'bg-amber-50', icon: <Clock size={18} className="text-amber-600" /> },
                { label: 'Late Arrivals Today', value: clockEvents.filter(e => { if (!e.clockIn) return false; const v = varianceLabel(e.scheduledIn, e.clockIn, 'in'); return v?.label.includes('late'); }).length, color: 'text-red-600', bg: 'bg-red-50', icon: <LogIn size={18} className="text-red-500" /> },
              ].map((s, i) => (
                <Card key={i} className="flex items-center gap-3 py-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>{s.icon}</div>
                  <div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                    <div className={`text-2xl ${s.color}`}>{s.value}</div>
                  </div>
                </Card>
              ))}
            </div>
            )}

            {attendanceView === 'history' && (
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Total Records', value: filteredHistory.length, color: 'text-blue-600', bg: 'bg-blue-50', icon: <History size={18} className="text-blue-600" /> },
                { label: 'Total Hours Worked', value: `${totalHistoryHours.toFixed(1)}h`, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <Clock size={18} className="text-emerald-600" /> },
                { label: 'Late Arrivals', value: filteredHistory.filter(r => { const v = varianceLabel(r.scheduledIn, r.clockIn, 'in'); return v?.label.includes('late'); }).length, color: 'text-red-600', bg: 'bg-red-50', icon: <LogIn size={18} className="text-red-500" /> },
                { label: 'Days Covered', value: uniqueDates.length, color: 'text-purple-600', bg: 'bg-purple-50', icon: <Calendar size={18} className="text-purple-600" /> },
              ].map((s, i) => (
                <Card key={i} className="flex items-center gap-3 py-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>{s.icon}</div>
                  <div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                    <div className={`text-2xl ${s.color}`}>{s.value}</div>
                  </div>
                </Card>
              ))}
            </div>
            )}

            {/* History table grouped by date */}
            {attendanceView === 'history' && (
              <div className="space-y-4">
                {uniqueDates.length === 0 ? (
                  <Card className="py-14 text-center text-gray-400">
                    <History size={28} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No records found for the selected range.</p>
                  </Card>
                ) : uniqueDates.map(date => {
                  const dayRecords = filteredHistory.filter(r => r.date === date);
                  const label = new Date(date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
                  return (
                    <Card key={date} className="overflow-hidden p-0">
                      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/60">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-900">{label}</span>
                        </div>
                        <span className="text-xs text-gray-500">{dayRecords.length} staff · {dayRecords.reduce((s, r) => s + (r.hoursWorked ?? 0), 0).toFixed(1)}h total</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-100">
                              <th className="text-left py-2.5 px-5 text-xs text-gray-500 uppercase tracking-wide">Staff Member</th>
                              <th className="text-left py-2.5 px-4 text-xs text-gray-500 uppercase tracking-wide">Role</th>
                              <th className="text-left py-2.5 px-4 text-xs text-gray-500 uppercase tracking-wide">Scheduled</th>
                              <th className="text-left py-2.5 px-4 text-xs text-gray-500 uppercase tracking-wide"><div className="flex items-center gap-1"><LogIn size={11} className="text-green-500" /> Clock In</div></th>
                              <th className="text-left py-2.5 px-4 text-xs text-gray-500 uppercase tracking-wide"><div className="flex items-center gap-1"><LogOut size={11} className="text-gray-400" /> Clock Out</div></th>
                              <th className="text-left py-2.5 px-4 text-xs text-gray-500 uppercase tracking-wide">Hours</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {dayRecords.map(r => {
                              const inVar  = varianceLabel(r.scheduledIn,  r.clockIn,  'in');
                              const outVar = varianceLabel(r.scheduledOut, r.clockOut, 'out');
                              return (
                                <tr key={`${r.date}-${r.staffId}`} className="hover:bg-gray-50 transition-colors">
                                  <td className="py-3 px-5">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-8 h-8 rounded-full ${getAvatarColor(r.staffId)} flex items-center justify-center text-white text-xs font-semibold border border-gray-100 shrink-0`}>
                                        {getInitials(r.name)}
                                      </div>
                                      <div>
                                        <button onClick={() => setCurrentPage('staff-profile', { id: r.staffId })} className="text-sm text-blue-600 hover:underline">{r.name}</button>
                                        <div className="text-xs text-gray-400 font-mono">{r.employeeId}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 text-sm text-gray-700">{r.role}</td>
                                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{r.scheduledIn} – {r.scheduledOut}</td>
                                  <td className="py-3 px-4">
                                    <div className="space-y-0.5">
                                      <div className="text-sm text-gray-800 font-mono">{r.clockIn}</div>
                                      {inVar && <span className={`text-xs px-1.5 py-0.5 rounded-full ${inVar.cls}`}>{inVar.label}</span>}
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="space-y-0.5">
                                      <div className="text-sm text-gray-800 font-mono">{r.clockOut}</div>
                                      {outVar && <span className={`text-xs px-1.5 py-0.5 rounded-full ${outVar.cls}`}>{outVar.label}</span>}
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className="text-sm text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">{r.hoursWorked}h</span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Live clock events table */}
            {attendanceView === 'live' && (
            <Card className="overflow-hidden p-0">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                <h2 className="text-sm text-gray-900">Today's Clock Events — 10 Jun 2026</h2>
                <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/60">
                      <th className="text-left py-3 px-5 text-xs text-gray-500 uppercase tracking-wide">Staff Member</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wide">Role</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wide">Location</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wide">Scheduled</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wide">
                        <div className="flex items-center gap-1"><LogIn size={12} className="text-green-500" /> Clock In</div>
                      </th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wide">
                        <div className="flex items-center gap-1"><LogOut size={12} className="text-gray-400" /> Clock Out</div>
                      </th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {clockEvents.map(e => {
                      const inVar  = varianceLabel(e.scheduledIn,  e.clockIn,  'in');
                      const outVar = varianceLabel(e.scheduledOut, e.clockOut, 'out');
                      const onShift = e.clockIn && !e.clockOut;
                      const notIn   = !e.clockIn;
                      return (
                        <tr key={e.staffId} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <div className="relative shrink-0">
                                <div className={`w-9 h-9 rounded-full ${getAvatarColor(e.staffId)} flex items-center justify-center text-white text-xs font-semibold border border-gray-100 shrink-0`}>
                                  {getInitials(e.name)}
                                </div>
                                {onShift && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
                              </div>
                              <div>
                                <button onClick={() => setCurrentPage('staff-profile', { id: e.staffId })} className="text-sm text-blue-600 hover:underline">{e.name}</button>
                                <div className="text-xs text-gray-400 font-mono">{e.employeeId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-sm text-gray-700">{e.role}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1 text-sm text-gray-600"><MapPin size={12} className="text-gray-400" />{e.location}</div>
                          </td>
                          <td className="py-3.5 px-4 text-sm text-gray-600 font-mono">{e.scheduledIn} – {e.scheduledOut}</td>
                          <td className="py-3.5 px-4">
                            {e.clockIn ? (
                              <div className="space-y-0.5">
                                <div className="text-sm text-gray-800 font-mono">{e.clockIn}</div>
                                {inVar && <span className={`text-xs px-1.5 py-0.5 rounded-full ${inVar.cls}`}>{inVar.label}</span>}
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">Not clocked in</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            {onShift ? (
                              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> On shift
                              </span>
                            ) : e.clockOut ? (
                              <div className="space-y-0.5">
                                <div className="text-sm text-gray-800 font-mono">{e.clockOut}</div>
                                {outVar && <span className={`text-xs px-1.5 py-0.5 rounded-full ${outVar.cls}`}>{outVar.label}</span>}
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">—</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              {onShift  && <span className="inline-flex items-center gap-1.5 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />On Shift</span>}
                              {e.clockOut && <span className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">Completed</span>}
                              {notIn    && (
                                <>
                                  <span className="inline-flex items-center text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">Awaiting</span>
                                  <button
                                    onClick={() => adminClockIn(e.staffId)}
                                    className="flex items-center gap-1 px-2.5 py-1 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-semibold"
                                  >
                                    <LogIn size={11} /> Clock In
                                  </button>
                                </>
                              )}
                              {onShift && (
                                <button
                                  onClick={() => { setConfirmClockOut(e); setClockOutNote(''); }}
                                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                >
                                  <LogOut size={11} /> Clock Out
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
            )}
          </div>
        )}

        {/* ── Leave Requests Panel ── */}
        {activeTab === 'leave' && (
          <div className="space-y-5">
            {/* Panel header with Log Leave button */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Review and manage leave requests submitted by staff via the mobile app.</p>
              <button
                onClick={() => setShowLogLeave(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus size={16} /> Log Leave on Behalf
              </button>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Pending Approval', value: leaveRequests.filter(r => r.status === 'pending').length,  color: 'text-amber-600', bg: 'bg-amber-50',  icon: <Clock size={18} className="text-amber-600" /> },
                { label: 'Approved',          value: leaveRequests.filter(r => r.status === 'approved').length, color: 'text-green-600', bg: 'bg-green-50',  icon: <CheckCircle size={18} className="text-green-600" /> },
                { label: 'Declined',          value: leaveRequests.filter(r => r.status === 'declined').length, color: 'text-red-600',   bg: 'bg-red-50',    icon: <XCircle size={18} className="text-red-500" /> },
                { label: 'Total This Month',  value: leaveRequests.length,                                      color: 'text-blue-600',  bg: 'bg-blue-50',   icon: <CalendarRange size={18} className="text-blue-600" /> },
              ].map((s, i) => (
                <Card key={i} className="flex items-center gap-3 py-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>{s.icon}</div>
                  <div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                    <div className={`text-2xl ${s.color}`}>{s.value}</div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-2">
              {(['all', 'pending', 'approved', 'declined'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setLeaveFilter(f)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors capitalize ${leaveFilter === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  {f === 'all' ? 'All Requests' : f}
                  {f === 'pending' && pendingCount > 0 && (
                    <span className="ml-1.5 bg-white/30 text-white px-1.5 py-0.5 rounded-full text-xs">{pendingCount}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Requests table */}
            <Card className="overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/60">
                      <th className="text-left py-3 px-5 text-xs text-gray-500 uppercase tracking-wide">Staff Member</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wide">Leave Type</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wide">Dates</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wide">Days</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wide">Submitted</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wide">Status</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {leaveRequests
                      .filter(r => leaveFilter === 'all' || r.status === leaveFilter)
                      .sort((a, b) => (a.status === 'pending' ? -1 : 1))
                      .map(r => (
                        <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full ${getAvatarColor(r.staffId)} flex items-center justify-center text-white text-xs font-semibold border border-gray-100 shrink-0`}>
                                {getInitials(r.name)}
                              </div>
                              <div>
                                <button onClick={() => setCurrentPage('staff-profile', { id: r.staffId })} className="text-sm text-blue-600 hover:underline">{r.name}</button>
                                <div className="text-xs text-gray-400">{r.role}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full border ${
                              r.type === 'Annual Leave'    ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              r.type === 'Medical Leave'  ? 'bg-rose-50 text-rose-700 border-rose-200' :
                              r.type === 'Emergency Leave'? 'bg-orange-50 text-orange-700 border-orange-200' :
                              'bg-gray-50 text-gray-600 border-gray-200'
                            }`}>{r.type}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-sm text-gray-800">{r.from}</div>
                            {r.from !== r.to && <div className="text-xs text-gray-500">to {r.to}</div>}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-sm text-gray-800">{r.hours}h</span>
                          </td>
                          <td className="py-3.5 px-4 text-sm text-gray-500">{r.submittedOn}</td>
                          <td className="py-3.5 px-4">
                            {r.status === 'pending'  && <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full"><Clock size={11} />Pending</span>}
                            {r.status === 'approved' && <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full"><CheckCircle size={11} />Approved</span>}
                            {r.status === 'declined' && <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full"><XCircle size={11} />Declined</span>}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setDetailRequest(r)}
                                className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <Eye size={12} /> View
                              </button>
                              {r.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => approveLeave(r.id)}
                                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                                  >
                                    <CheckCircle size={12} /> Approve
                                  </button>
                                  <button
                                    onClick={() => { setDeclineTarget(r); setDeclineNote(''); }}
                                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                  >
                                    <XCircle size={12} /> Decline
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    {leaveRequests.filter(r => leaveFilter === 'all' || r.status === leaveFilter).length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-14 text-center text-gray-400">
                          <CalendarRange size={28} className="mx-auto mb-2 opacity-30" />
                          <p className="text-sm">No {leaveFilter === 'all' ? '' : leaveFilter} leave requests.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

          </div>
        )}

        {activeTab === 'directory' && (
        <>
        {/* Search and Filters */}
        <Card className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 border border-gray-100">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search staff by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => setShowFilters(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors">
                <Filter size={18} className="text-gray-600" />
                <span className="text-sm text-gray-700">Filters</span>
              </button>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors bg-white cursor-pointer"
              >
                <option value="">All Roles</option>
                <option value="Care Manager">Care Manager</option>
                <option value="Senior Support Worker">Senior Support Worker</option>
                <option value="Support Worker">Support Worker</option>
                <option value="Nurse">Nurse</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors bg-white cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Suspended">Suspended</option>
              </select>
              <div className="flex items-center gap-1 border border-gray-100 rounded-lg overflow-hidden shrink-0">
                <button
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'} transition-colors`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'} transition-colors`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Staff Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredStaff.map((staff) => (
              <Card 
                key={staff.id} 
                className="hover:border-blue-200 transition-colors cursor-pointer"
                onClick={() => setCurrentPage('staff-profile', { id: staff.id })}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(staff.id)} flex items-center justify-center text-white text-base font-semibold shadow-sm border border-gray-100 shrink-0`}>
                      {getInitials(staff.name)}
                    </div>
                    <div>
                      <h3 className="text-base text-gray-900 font-medium">{staff.name}</h3>
                      <p className="text-xs text-gray-600">{staff.role}</p>
                      <span className="inline-flex items-center gap-1 mt-0.5 text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        <Hash size={10} />{staff.employeeId}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {getStatusBadge(staff.status)}
                    <div className="relative">
                      <button 
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() => setOpenDropdown(openDropdown === staff.id ? null : staff.id)}
                      >
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
                      {openDropdown === staff.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-100 shadow-lg z-10 py-1">
                          <button 
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => {
                              setCurrentPage('staff-profile', { id: staff.id });
                              setOpenDropdown(null);
                            }}
                          >
                            <Eye size={16} />
                            View Profile
                          </button>
                          <button 
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => {
                              setCurrentPage('staff-profile', { id: staff.id });
                              setOpenDropdown(null);
                            }}
                          >
                            <CalendarDays size={16} />
                            View Schedule
                          </button>
                          <button 
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => {
                              setCurrentPage('staff-profile', { id: staff.id, showTimesheet: true });
                              setOpenDropdown(null);
                            }}
                          >
                            <FileText size={16} />
                            View Timesheet
                          </button>
                          <button
                            onClick={() => { setEditStaffTarget(staff); setOpenDropdown(null); }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100"
                          >
                            <Edit size={16} />
                            Edit Staff
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-gray-700">{staff.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-gray-700">{staff.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-gray-700 truncate">{staff.email}</span>
                  </div>
                </div>

                {/* Next Shift Alert */}
                <div 
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100 mb-4"
                >
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-600" />
                    <div>
                      <div className="text-xs text-blue-900">Next Shift</div>
                      <div className="text-sm text-blue-700 font-medium">{staff.nextShift}</div>
                    </div>
                  </div>
                </div>

                {/* Qualifications */}
                <div>
                  <div className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                    <Shield size={14} /> Certifications
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {staff.qualifications.map((qual, idx) => (
                      <Badge key={idx} variant="gray">{qual}</Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 mt-5">
                  <button 
                    className="px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPage('staff-profile', { id: staff.id });
                    }}
                  >
                    View Profile
                  </button>
                  <button 
                    className="px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPage('staff-profile', { id: staff.id, showTimesheet: true });
                    }}
                  >
                    Timesheet
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Staff List View */}
        {viewMode === 'list' && (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700">Staff Member</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700">Employee ID</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700">Contact Details</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700">Location</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700">Next Shift</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStaff.map((staff) => (
                    <tr 
                      key={staff.id} 
                      className="hover:bg-gray-50 transition-colors group cursor-pointer"
                      onClick={() => setCurrentPage('staff-profile', { id: staff.id })}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full ${getAvatarColor(staff.id)} flex items-center justify-center text-white text-sm font-semibold shadow-sm border border-gray-100 shrink-0`}>
                            {getInitials(staff.name)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{staff.name}</div>
                            <div className="text-xs text-gray-600 mt-0.5">{staff.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md font-mono">
                          <Hash size={11} />{staff.employeeId}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={14} className="text-gray-400" />
                            {staff.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone size={14} className="text-gray-400" />
                            {staff.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin size={14} className="text-gray-400" />
                          {staff.location}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-sm text-gray-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 w-fit">
                          <CalendarDays size={14} className="text-blue-600" />
                          {staff.nextShift}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(staff.status)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button 
                            className="px-3 py-1.5 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                            onClick={() => setCurrentPage('staff-profile', { id: staff.id })}
                          >
                            View
                          </button>
                          <div className="relative">
                            <button 
                              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                              onClick={() => setOpenDropdown(openDropdown === staff.id ? null : staff.id)}
                            >
                              <MoreVertical size={16} />
                            </button>
                            {openDropdown === staff.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-100 shadow-lg z-10 py-1">
                                <button 
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                  onClick={() => {
                                    setCurrentPage('staff-profile', { id: staff.id });
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <Eye size={16} />
                                  View Profile
                                </button>
                                <button 
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                  onClick={() => {
                                    setCurrentPage('staff-profile', { id: staff.id });
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <CalendarDays size={16} />
                                  View Schedule
                                </button>
                                <button
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                  onClick={() => {
                                    setCurrentPage('staff-profile', { id: staff.id, showTimesheet: true });
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <FileText size={16} />
                                  View Timesheet
                                </button>
                                <button
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100"
                                  onClick={() => { setEditStaffTarget(staff); setOpenDropdown(null); }}
                                >
                                  <Edit size={16} />
                                  Edit Staff
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
              
              {filteredStaff.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No staff members found matching your search.
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/30">
              <div className="text-sm text-gray-600">
                Showing {filteredStaff.length} of {staffMembers.length} staff members
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-white transition-colors disabled:opacity-50 text-gray-600">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">
                  1
                </button>
                <button className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-white transition-colors text-gray-600">
                  Next
                </button>
              </div>
            </div>
          </Card>
        )}
        </>
        )}
        </div>
      </main>

      <AddStaffMemberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={(newStaff) => setStaffMembers(prev => [...prev, newStaff])}
      />

      {/* ── Log Leave Modal ── */}
      {showLogLeave && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <CalendarRange size={17} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900">Log Leave on Behalf of Staff</h2>
                <p className="text-xs text-gray-500">This will be recorded as admin-logged and visible to the staff member</p>
              </div>
              <button onClick={() => setShowLogLeave(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Staff selector */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Staff Member *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                  value={logLeaveForm.staffId}
                  onChange={e => setLogLeaveForm(f => ({ ...f, staffId: e.target.value }))}
                >
                  <option value="">Select staff member...</option>
                  {staffMembers.map(s => (
                    <option key={s.id} value={s.id}>{s.name} — {s.role}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Leave type */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Leave Type *</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                    value={['Annual Leave', 'TOIL (Time Off In Lieu)', 'Medical Leave', 'Emergency Leave', 'Study Leave', 'Maternity / Paternity Leave', 'Compassionate Leave', 'Unpaid Leave'].includes(logLeaveForm.type) ? logLeaveForm.type : 'Other'}
                    onChange={e => setLogLeaveForm(f => ({ ...f, type: e.target.value === 'Other' ? '' : e.target.value }))}
                  >
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="TOIL (Time Off In Lieu)">TOIL (Time Off In Lieu)</option>
                    <option value="Medical Leave">Medical Leave</option>
                    <option value="Emergency Leave">Emergency Leave</option>
                    <option value="Study Leave">Study Leave</option>
                    <option value="Maternity / Paternity Leave">Maternity / Paternity Leave</option>
                    <option value="Compassionate Leave">Compassionate Leave</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                    <option value="Other">Other</option>
                  </select>
                  {!['Annual Leave', 'TOIL (Time Off In Lieu)', 'Medical Leave', 'Emergency Leave', 'Study Leave', 'Maternity / Paternity Leave', 'Compassionate Leave', 'Unpaid Leave'].includes(logLeaveForm.type) && (
                    <input
                      type="text"
                      required
                      placeholder="Specify other leave type..."
                      className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                      value={logLeaveForm.type}
                      onChange={e => setLogLeaveForm(f => ({ ...f, type: e.target.value }))}
                    />
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                    value={logLeaveForm.status}
                    onChange={e => setLogLeaveForm(f => ({ ...f, status: e.target.value as LeaveStatus }))}
                  >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>

                {/* From */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">From *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={logLeaveForm.from}
                    onChange={e => setLogLeaveForm(f => ({ ...f, from: e.target.value, to: f.to < e.target.value ? e.target.value : f.to }))}
                  />
                </div>

                {/* To */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">To *</label>
                  <input
                    type="date"
                    min={logLeaveForm.from}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={logLeaveForm.to}
                    onChange={e => setLogLeaveForm(f => ({ ...f, to: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Start Time <span className="text-gray-400">(optional)</span></label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={logLeaveForm.startTime}
                    onChange={e => setLogLeaveForm(f => ({ ...f, startTime: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">End Time <span className="text-gray-400">(optional)</span></label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={logLeaveForm.endTime}
                    onChange={e => setLogLeaveForm(f => ({ ...f, endTime: e.target.value }))}
                  />
                </div>
              </div>

              {/* Hours */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Hours *</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  placeholder="e.g. 8"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                  value={logLeaveForm.hours}
                  onChange={e => setLogLeaveForm(f => ({ ...f, hours: e.target.value }))}
                />
                {logLeaveForm.from && logLeaveForm.to && !logLeaveForm.hours && (
                  <p className="text-xs text-gray-400 mt-1">
                    Suggested: {Math.max(1, Math.round((new Date(logLeaveForm.to).getTime() - new Date(logLeaveForm.from).getTime()) / 86400000) + 1) * 8} hours (based on selected date range at 8h/day)
                  </p>
                )}
              </div>

              {/* Reason */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Notes / Reason <span className="text-gray-400">(optional)</span></label>
                <textarea
                  rows={3}
                  value={logLeaveForm.reason}
                  onChange={e => setLogLeaveForm(f => ({ ...f, reason: e.target.value }))}
                  placeholder="e.g. Staff member called in sick, pre-agreed holiday..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowLogLeave(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
              <button
                onClick={submitLogLeave}
                disabled={!logLeaveForm.staffId || !logLeaveForm.from || !logLeaveForm.to}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={14} /> Log Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Leave Detail Modal ── */}
      {detailRequest && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <CalendarRange size={17} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base text-gray-900">Leave Request</h2>
                <p className="text-xs text-gray-500">{detailRequest.name} · {detailRequest.employeeId}</p>
              </div>
              <button onClick={() => setDetailRequest(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className={`w-10 h-10 rounded-full ${getAvatarColor(detailRequest.staffId)} flex items-center justify-center text-white text-sm font-semibold border border-gray-100 shrink-0`}>
                  {getInitials(detailRequest.name)}
                </div>
                <div>
                  <p className="text-sm text-gray-900">{detailRequest.name}</p>
                  <p className="text-xs text-gray-500">{detailRequest.role}</p>
                </div>
                <div className="ml-auto">
                  {detailRequest.status === 'pending'  && <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">Pending</span>}
                  {detailRequest.status === 'approved' && <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">Approved</span>}
                  {detailRequest.status === 'declined' && <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full">Declined</span>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5">Leave Type</p>
                  <p className="text-gray-900">{detailRequest.type}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5">Duration</p>
                  <p className="text-gray-900">{detailRequest.hours} hour{detailRequest.hours !== 1 ? 's' : ''}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5">From</p>
                  <p className="text-gray-900">{detailRequest.from}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5">To</p>
                  <p className="text-gray-900">{detailRequest.to}</p>
                </div>
                {(detailRequest.startTime || detailRequest.endTime) && (
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 col-span-2">
                    <p className="text-xs text-gray-500 mb-0.5">Time</p>
                    <p className="text-gray-900">{detailRequest.startTime || '—'} – {detailRequest.endTime || '—'}</p>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MessageSquare size={11} /> Reason from staff</p>
                <p className="text-sm text-gray-700">{detailRequest.reason}</p>
              </div>
              {detailRequest.adminNote && (
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <p className="text-xs text-blue-600 mb-1">Admin note</p>
                  <p className="text-sm text-blue-800">{detailRequest.adminNote}</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              {detailRequest.status === 'pending' ? (
                <>
                  <button onClick={() => setDetailRequest(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Close</button>
                  <button
                    onClick={() => { setDeclineTarget(detailRequest); setDetailRequest(null); setDeclineNote(''); }}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    <XCircle size={14} /> Decline
                  </button>
                  <button
                    onClick={() => approveLeave(detailRequest.id)}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    <CheckCircle size={14} /> Approve
                  </button>
                </>
              ) : (
                <button onClick={() => setDetailRequest(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Close</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Decline Reason Modal ── */}
      {declineTarget && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                <XCircle size={17} className="text-red-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900">Decline Leave Request</h2>
                <p className="text-xs text-gray-500">{declineTarget.name} · {declineTarget.from}{declineTarget.from !== declineTarget.to ? ` – ${declineTarget.to}` : ''}</p>
              </div>
              <button onClick={() => setDeclineTarget(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                The staff member will be notified of this decision via the mobile app.
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Reason for declining <span className="text-gray-400">(recommended)</span></label>
                <textarea
                  rows={3}
                  value={declineNote}
                  onChange={e => setDeclineNote(e.target.value)}
                  placeholder="e.g. Insufficient staffing cover on those dates..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setDeclineTarget(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
              <button
                onClick={() => declineLeave(declineTarget.id, declineNote)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle size={14} /> Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Clock-Out Confirm Modal */}
      {confirmClockOut && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                <LogOut size={17} className="text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base text-gray-900">Clock Out Staff Member</h2>
                <p className="text-xs text-gray-500">Admin override — this action will be logged</p>
              </div>
              <button onClick={() => setConfirmClockOut(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Staff summary */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className={`w-10 h-10 rounded-full ${getAvatarColor(confirmClockOut.staffId)} flex items-center justify-center text-white text-sm font-semibold border border-gray-100 shrink-0`}>
                  {getInitials(confirmClockOut.name)}
                </div>
                <div>
                  <p className="text-sm text-gray-900">{confirmClockOut.name}</p>
                  <p className="text-xs text-gray-500">{confirmClockOut.role} · Clocked in at {confirmClockOut.clockIn}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                The current time will be recorded as the clock-out time. This override will be attributed to the admin account.
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Reason for manual clock-out <span className="text-gray-400">(optional)</span></label>
                <textarea
                  rows={3}
                  value={clockOutNote}
                  onChange={e => setClockOutNote(e.target.value)}
                  placeholder="e.g. Staff left without clocking out, system error, end of shift..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setConfirmClockOut(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => adminClockOut(confirmClockOut.staffId)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={14} /> Confirm Clock Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">
          <CheckCircle size={15} className="text-green-400" />
          {toastMessage}
        </div>
      )}

      {editStaffTarget && (
        <EditStaffModal
          isOpen={true}
          onClose={() => setEditStaffTarget(null)}
          staff={editStaffTarget}
          onSave={(updated) => {
            setStaffMembers(prev => prev.map(s => s.id === updated.id ? updated : s));
            setEditStaffTarget(null);
          }}
        />
      )}

      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        values={filterValues}
        onChange={setFilterValues}
        sections={[
          { key: 'role',              label: 'Role',              options: Array.from(new Set(staffMembers.map(s => s.role))) },
          { key: 'status',            label: 'Status',            options: Array.from(new Set(staffMembers.map(s => s.status))) },
          { key: 'location',          label: 'Location',          options: Array.from(new Set(staffMembers.map(s => s.location))) },
          { key: 'nationalityRegion', label: 'Nationality Region', options: ['EU', 'Non-EU'] },
        ]}
      />
    </div>
  );
}
