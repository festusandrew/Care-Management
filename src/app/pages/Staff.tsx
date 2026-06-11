import { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { useNavigation } from '../context/NavigationContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { AddStaffMemberModal } from '../components/AddStaffMemberModal';
import {
  Search, Filter, Plus, Phone, Mail, FileText, CalendarDays,
  MoreVertical, Eye, Download, Grid3x3, List, MapPin, Edit,
  Shield, Clock, Hash, LogIn, LogOut, Activity, X, AlertCircle,
  CheckCircle, XCircle, CalendarRange, MessageSquare, ChevronDown,
  History, Calendar
} from 'lucide-react';

type ClockEvent = {
  staffId: number; name: string; employeeId: string; avatarUrl: string;
  clockIn: string | null; clockOut: string | null;
  scheduledIn: string; scheduledOut: string; location: string; role: string;
};

type LeaveStatus = 'pending' | 'approved' | 'declined';
type LeaveRequest = {
  id: number; staffId: number; name: string; employeeId: string; avatarUrl: string; role: string;
  type: string; from: string; to: string; days: number;
  reason: string; submittedOn: string; status: LeaveStatus; adminNote: string;
};

const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  { id: 1, staffId: 1, name: 'Mary Thompson',  employeeId: 'EMP-0001', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60', role: 'Support Worker',        type: 'Annual Leave',    from: '23 Jun 2026', to: '27 Jun 2026', days: 5, reason: 'Family holiday booked in advance.',          submittedOn: '8 Jun 2026',  status: 'pending',  adminNote: '' },
  { id: 2, staffId: 4, name: 'James Mitchell',  employeeId: 'EMP-0004', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60', role: 'Care Manager',          type: 'Medical Leave',   from: '15 Jun 2026', to: '16 Jun 2026', days: 2, reason: 'GP appointment and recovery.',               submittedOn: '9 Jun 2026',  status: 'pending',  adminNote: '' },
  { id: 3, staffId: 2, name: 'John Davies',     employeeId: 'EMP-0002', avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&auto=format&fit=crop&q=60', role: 'Senior Support Worker', type: 'Annual Leave',    from: '30 Jun 2026', to: '4 Jul 2026',  days: 5, reason: 'Pre-booked holiday abroad.',                submittedOn: '5 Jun 2026',  status: 'approved', adminNote: 'Cover arranged with agency.' },
  { id: 4, staffId: 7, name: 'Lisa Anderson',   employeeId: 'EMP-0007', avatarUrl: 'https://images.unsplash.com/photo-1594824419266-9b16414777a8?w=800&auto=format&fit=crop&q=60', role: 'Nurse',                 type: 'Emergency Leave', from: '11 Jun 2026', to: '11 Jun 2026', days: 1, reason: 'Family emergency — urgent travel required.', submittedOn: '10 Jun 2026', status: 'approved', adminNote: '' },
  { id: 5, staffId: 3, name: 'Sarah Williams',  employeeId: 'EMP-0003', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60', role: 'Support Worker',        type: 'Annual Leave',    from: '14 Jun 2026', to: '14 Jun 2026', days: 1, reason: 'Personal appointment.',                     submittedOn: '7 Jun 2026',  status: 'declined', adminNote: 'Insufficient cover on that date.' },
];

const INITIAL_CLOCK_EVENTS: ClockEvent[] = [
  { staffId: 1, name: 'Mary Thompson',  employeeId: 'EMP-0001', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60', clockIn: '07:02', clockOut: null,    scheduledIn: '07:00', scheduledOut: '15:00', location: 'Main House',     role: 'Support Worker' },
  { staffId: 2, name: 'John Davies',    employeeId: 'EMP-0002', avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&auto=format&fit=crop&q=60', clockIn: '06:58', clockOut: '15:01', scheduledIn: '07:00', scheduledOut: '15:00', location: 'Annex Building', role: 'Senior Support Worker' },
  { staffId: 7, name: 'Lisa Anderson',  employeeId: 'EMP-0007', avatarUrl: 'https://images.unsplash.com/photo-1594824419266-9b16414777a8?w=800&auto=format&fit=crop&q=60', clockIn: '07:59', clockOut: '16:03', scheduledIn: '08:00', scheduledOut: '16:00', location: 'Main House',     role: 'Nurse' },
  { staffId: 4, name: 'James Mitchell', employeeId: 'EMP-0004', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60', clockIn: '09:14', clockOut: null,    scheduledIn: '09:00', scheduledOut: '17:00', location: 'Office',         role: 'Care Manager' },
  { staffId: 3, name: 'Sarah Williams', employeeId: 'EMP-0003', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60', clockIn: null,    clockOut: null,    scheduledIn: '15:00', scheduledOut: '23:00', location: 'Main House',     role: 'Support Worker' },
];

type HistoryRecord = ClockEvent & { date: string; hoursWorked: number | null; };

const ATTENDANCE_HISTORY: HistoryRecord[] = [
  { date: '2026-06-09', staffId: 1, name: 'Mary Thompson',  employeeId: 'EMP-0001', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60', clockIn: '07:01', clockOut: '15:03', scheduledIn: '07:00', scheduledOut: '15:00', location: 'Main House',     role: 'Support Worker',        hoursWorked: 8.0 },
  { date: '2026-06-09', staffId: 2, name: 'John Davies',    employeeId: 'EMP-0002', avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&auto=format&fit=crop&q=60', clockIn: '07:12', clockOut: '15:00', scheduledIn: '07:00', scheduledOut: '15:00', location: 'Annex Building', role: 'Senior Support Worker',  hoursWorked: 7.8 },
  { date: '2026-06-09', staffId: 7, name: 'Lisa Anderson',  employeeId: 'EMP-0007', avatarUrl: 'https://images.unsplash.com/photo-1594824419266-9b16414777a8?w=800&auto=format&fit=crop&q=60', clockIn: '08:00', clockOut: '16:05', scheduledIn: '08:00', scheduledOut: '16:00', location: 'Main House',     role: 'Nurse',                 hoursWorked: 8.1 },
  { date: '2026-06-09', staffId: 4, name: 'James Mitchell', employeeId: 'EMP-0004', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60', clockIn: '09:20', clockOut: '17:01', scheduledIn: '09:00', scheduledOut: '17:00', location: 'Office',         role: 'Care Manager',          hoursWorked: 7.7 },
  { date: '2026-06-09', staffId: 3, name: 'Sarah Williams', employeeId: 'EMP-0003', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60', clockIn: '14:58', clockOut: '23:02', scheduledIn: '15:00', scheduledOut: '23:00', location: 'Main House',     role: 'Support Worker',        hoursWorked: 8.1 },
  { date: '2026-06-08', staffId: 1, name: 'Mary Thompson',  employeeId: 'EMP-0001', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60', clockIn: '07:05', clockOut: '15:00', scheduledIn: '07:00', scheduledOut: '15:00', location: 'Main House',     role: 'Support Worker',        hoursWorked: 7.9 },
  { date: '2026-06-08', staffId: 2, name: 'John Davies',    employeeId: 'EMP-0002', avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&auto=format&fit=crop&q=60', clockIn: '06:55', clockOut: '15:10', scheduledIn: '07:00', scheduledOut: '15:00', location: 'Annex Building', role: 'Senior Support Worker',  hoursWorked: 8.3 },
  { date: '2026-06-08', staffId: 7, name: 'Lisa Anderson',  employeeId: 'EMP-0007', avatarUrl: 'https://images.unsplash.com/photo-1594824419266-9b16414777a8?w=800&auto=format&fit=crop&q=60', clockIn: '08:02', clockOut: '16:00', scheduledIn: '08:00', scheduledOut: '16:00', location: 'Main House',     role: 'Nurse',                 hoursWorked: 8.0 },
  { date: '2026-06-07', staffId: 1, name: 'Mary Thompson',  employeeId: 'EMP-0001', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60', clockIn: '07:00', clockOut: '15:00', scheduledIn: '07:00', scheduledOut: '15:00', location: 'Main House',     role: 'Support Worker',        hoursWorked: 8.0 },
  { date: '2026-06-07', staffId: 4, name: 'James Mitchell', employeeId: 'EMP-0004', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60', clockIn: '09:45', clockOut: '17:00', scheduledIn: '09:00', scheduledOut: '17:00', location: 'Office',         role: 'Care Manager',          hoursWorked: 7.3 },
  { date: '2026-06-06', staffId: 3, name: 'Sarah Williams', employeeId: 'EMP-0003', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60', clockIn: '15:02', clockOut: '23:00', scheduledIn: '15:00', scheduledOut: '23:00', location: 'Main House',     role: 'Support Worker',        hoursWorked: 8.0 },
  { date: '2026-06-06', staffId: 2, name: 'John Davies',    employeeId: 'EMP-0002', avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&auto=format&fit=crop&q=60', clockIn: '07:00', clockOut: '15:01', scheduledIn: '07:00', scheduledOut: '15:00', location: 'Annex Building', role: 'Senior Support Worker',  hoursWorked: 8.0 },
];

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

export default function Staff() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'directory' | 'attendance' | 'leave'>('directory');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [clockEvents, setClockEvents] = useState<ClockEvent[]>(INITIAL_CLOCK_EVENTS);
  const [attendanceView, setAttendanceView] = useState<'live' | 'history'>('live');
  const [historyDateFrom, setHistoryDateFrom] = useState('2026-06-06');
  const [historyDateTo, setHistoryDateTo]     = useState('2026-06-09');
  const [historyStaffFilter, setHistoryStaffFilter] = useState('');
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);
  const [leaveFilter, setLeaveFilter] = useState<LeaveStatus | 'all'>('all');
  const [declineTarget, setDeclineTarget] = useState<LeaveRequest | null>(null);
  const [declineNote, setDeclineNote] = useState('');
  const [detailRequest, setDetailRequest] = useState<LeaveRequest | null>(null);
  const [showLogLeave, setShowLogLeave] = useState(false);
  const [logLeaveForm, setLogLeaveForm] = useState({ staffId: '', type: 'Annual Leave', from: '', to: '', reason: '', status: 'approved' as LeaveStatus });
  const [confirmClockOut, setConfirmClockOut] = useState<ClockEvent | null>(null);
  const [clockOutNote, setClockOutNote] = useState('');
  const [toastName, setToastName] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setCurrentPage } = useNavigation();

  const adminClockOut = (staffId: number) => {
    const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    setClockEvents(evs => evs.map(e => e.staffId === staffId ? { ...e, clockOut: now } : e));
    const name = clockEvents.find(e => e.staffId === staffId)?.name ?? '';
    setToastName(name);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastName(null), 3000);
    setConfirmClockOut(null);
    setClockOutNote('');
  };

  const approveLeave = (id: number) => {
    setLeaveRequests(rs => rs.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    setDetailRequest(r => r?.id === id ? { ...r, status: 'approved' } : r);
  };

  const declineLeave = (id: number, note: string) => {
    setLeaveRequests(rs => rs.map(r => r.id === id ? { ...r, status: 'declined', adminNote: note } : r));
    setDetailRequest(r => r?.id === id ? { ...r, status: 'declined', adminNote: note } : r);
    setDeclineTarget(null);
    setDeclineNote('');
  };

  const submitLogLeave = () => {
    if (!logLeaveForm.staffId || !logLeaveForm.from || !logLeaveForm.to) return;
    const member = staffMembers.find(s => s.id === Number(logLeaveForm.staffId));
    if (!member) return;
    const from = new Date(logLeaveForm.from);
    const to   = new Date(logLeaveForm.to);
    const days = Math.max(1, Math.round((to.getTime() - from.getTime()) / 86400000) + 1);
    const fmt  = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    setLeaveRequests(rs => [{
      id: Date.now(),
      staffId: member.id,
      name: member.name,
      employeeId: member.employeeId,
      avatarUrl: member.avatarUrl,
      role: member.role,
      type: logLeaveForm.type,
      from: fmt(from),
      to: fmt(to),
      days,
      reason: logLeaveForm.reason || 'Logged by admin.',
      submittedOn: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: logLeaveForm.status,
      adminNote: 'Logged manually by admin.',
    }, ...rs]);
    setShowLogLeave(false);
    setLogLeaveForm({ staffId: '', type: 'Annual Leave', from: '', to: '', reason: '', status: 'approved' });
  };

  const pendingCount = leaveRequests.filter(r => r.status === 'pending').length;

  // Attendance history derived values (computed here, not inside JSX)
  const filteredHistory = ATTENDANCE_HISTORY.filter(r => {
    const inRange = (!historyDateFrom || r.date >= historyDateFrom) && (!historyDateTo || r.date <= historyDateTo);
    const matchStaff = !historyStaffFilter || r.staffId === Number(historyStaffFilter);
    return inRange && matchStaff;
  });
  const uniqueDates = [...new Set(filteredHistory.map(r => r.date))].sort((a, b) => b.localeCompare(a));
  const totalHistoryHours = filteredHistory.reduce((s, r) => s + (r.hoursWorked ?? 0), 0);

  // Mock staff data
  const staffMembers = [
    {
      id: 1,
      employeeId: 'EMP-0001',
      name: 'Mary Thompson',
      role: 'Support Worker',
      status: 'Active',
      email: 'm.thompson@mpoweredcare.com',
      phone: '+44 7700 900123',
      location: 'Main House',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60',
      nextShift: '7 Dec, 07:00 - 15:00',
      qualifications: ['Care Certificate', 'First Aid'],
    },
    {
      id: 2,
      employeeId: 'EMP-0002',
      name: 'John Davies',
      role: 'Senior Support Worker',
      status: 'Active',
      email: 'j.davies@mpoweredcare.com',
      phone: '+44 7700 900234',
      location: 'Annex Building',
      avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&auto=format&fit=crop&q=60',
      nextShift: '7 Dec, 07:00 - 15:00',
      qualifications: ['NVQ Level 3', 'Medication Admin'],
    },
    {
      id: 3,
      employeeId: 'EMP-0003',
      name: 'Sarah Williams',
      role: 'Support Worker',
      status: 'On Leave',
      email: 's.williams@mpoweredcare.com',
      phone: '+44 7700 900345',
      location: 'Main House',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60',
      nextShift: '15 Dec, 15:00 - 23:00',
      qualifications: ['Care Certificate'],
    },
    {
      id: 4,
      employeeId: 'EMP-0004',
      name: 'James Mitchell',
      role: 'Care Manager',
      status: 'Active',
      email: 'j.mitchell@mpoweredcare.com',
      phone: '+44 7700 900456',
      location: 'Office',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60',
      nextShift: '7 Dec, 09:00 - 17:00',
      qualifications: ['Level 5 Diploma', 'Safeguarding Lead'],
    },
    {
      id: 7,
      employeeId: 'EMP-0007',
      name: 'Lisa Anderson',
      role: 'Nurse',
      status: 'Active',
      email: 'l.anderson@mpoweredcare.com',
      phone: '+44 7700 900789',
      location: 'Main House',
      avatarUrl: 'https://images.unsplash.com/photo-1594824419266-9b16414777a8?w=800&auto=format&fit=crop&q=60',
      nextShift: '7 Dec, 08:00 - 16:00',
      qualifications: ['NMC Registered', 'Advanced First Aid'],
    }
  ];

  const stats = [
    { label: 'Total Staff', value: '48', trend: '+1 this month' },
    { label: 'On Leave', value: '3', color: 'text-gray-600' },
    { label: 'Pending Timesheets', value: '5', color: 'text-amber-600' },
    { label: 'Compliance Due', value: '2', color: 'text-red-600' },
  ];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          staff.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === '' || staff.role === filterRole;
    const matchesStatus = filterStatus === '' || staff.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
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
      
      <main className="ml-64 pt-24 px-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl text-gray-900">Staff Management</h1>
            <p className="text-sm text-gray-600 mt-1">Manage employee records, roles, schedules, and compliance</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-700">
              <Download size={18} />
              Export Directory
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Staff Member
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
                    {INITIAL_CLOCK_EVENTS.map(s => <option key={s.staffId} value={s.staffId}>{s.name}</option>)}
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
                                      <ImageWithFallback src={r.avatarUrl} alt={r.name} className="w-8 h-8 rounded-full object-cover border border-gray-100 shrink-0" />
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
                                <ImageWithFallback src={e.avatarUrl} alt={e.name} className="w-9 h-9 rounded-full object-cover border border-gray-100" />
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
                              {notIn    && <span className="inline-flex items-center text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">Awaiting</span>}
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
                              <ImageWithFallback src={r.avatarUrl} alt={r.name} className="w-9 h-9 rounded-full object-cover border border-gray-100 shrink-0" />
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
                            <span className="text-sm text-gray-800">{r.days}d</span>
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
          <div className="flex items-center gap-4">
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
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors">
              <Filter size={18} className="text-gray-600" />
              <span className="text-sm text-gray-700">Filters</span>
            </button>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
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
              className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Suspended">Suspended</option>
            </select>
            <div className="flex items-center gap-1 border border-gray-100 rounded-lg overflow-hidden">
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
                    <ImageWithFallback 
                      src={staff.avatarUrl}
                      alt={staff.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100"
                    />
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
                          <ImageWithFallback 
                            src={staff.avatarUrl}
                            alt={staff.name}
                            className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-100"
                          />
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
      </main>

      <AddStaffMemberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
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
                    value={logLeaveForm.type}
                    onChange={e => setLogLeaveForm(f => ({ ...f, type: e.target.value }))}
                  >
                    <option>Annual Leave</option>
                    <option>Medical Leave</option>
                    <option>Emergency Leave</option>
                    <option>Maternity / Paternity Leave</option>
                    <option>Compassionate Leave</option>
                    <option>Unpaid Leave</option>
                    <option>Other</option>
                  </select>
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
              </div>

              {/* Duration preview */}
              {logLeaveForm.from && logLeaveForm.to && (
                <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                  <CalendarRange size={13} />
                  {Math.max(1, Math.round((new Date(logLeaveForm.to).getTime() - new Date(logLeaveForm.from).getTime()) / 86400000) + 1)} day(s) selected
                </div>
              )}

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
                <ImageWithFallback src={detailRequest.avatarUrl} alt={detailRequest.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
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
                  <p className="text-gray-900">{detailRequest.days} day{detailRequest.days > 1 ? 's' : ''}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5">From</p>
                  <p className="text-gray-900">{detailRequest.from}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5">To</p>
                  <p className="text-gray-900">{detailRequest.to}</p>
                </div>
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
                <ImageWithFallback src={confirmClockOut.avatarUrl} alt={confirmClockOut.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
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
      {toastName && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm">
          <LogOut size={15} className="text-green-400" />
          {toastName} has been clocked out
        </div>
      )}
    </div>
  );
}