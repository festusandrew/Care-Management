import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { 
  Search, Plus, CalendarRange, Clock, CheckCircle, 
  XCircle, Eye, MessageSquare, AlertCircle, X
} from 'lucide-react';
import { LeaveRequest, StaffMember, LeaveStatus } from '../mockData/mockStore';
import { api } from '../services/api';

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

export default function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'declined'>('all');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Modals States
  const [showLogLeave, setShowLogLeave] = useState(false);
  const [logLeaveForm, setLogLeaveForm] = useState({
    staffId: '',
    type: 'Annual Leave',
    from: '',
    to: '',
    startTime: '',
    endTime: '',
    hours: '',
    reason: '',
    status: 'approved' as LeaveStatus
  });
  const [declineTarget, setDeclineTarget] = useState<LeaveRequest | null>(null);
  const [declineNote, setDeclineNote] = useState('');
  const [detailRequest, setDetailRequest] = useState<LeaveRequest | null>(null);

  // Success Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    let active = true;
    Promise.all([api.getLeaveRequests(), api.getStaffMembers()]).then(([leaveData, staffData]) => {
      if (active) {
        setLeaveRequests(leaveData);
        setStaffMembers(staffData);
      }
    });
    return () => { active = false; };
  }, []);

  const approveLeave = async (id: number) => {
    try {
      const updated = await api.updateLeaveRequestStatus(id, 'approved');
      setLeaveRequests(rs => rs.map(r => r.id === id ? updated : r));
      setDetailRequest(r => r?.id === id ? updated : r);
      triggerToast(`Leave request approved for ${updated.name}`);
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
      triggerToast(`Leave request declined for ${updated.name}`);
    } catch (err) {
      console.error(err);
    }
  };

  const submitLogLeave = async () => {
    if (!logLeaveForm.staffId || !logLeaveForm.from || !logLeaveForm.to) return;
    const member = staffMembers.find(s => s.id === Number(logLeaveForm.staffId));
    if (!member) return;
    const from = new Date(logLeaveForm.from);
    const to = new Date(logLeaveForm.to);
    const dayCount = Math.max(1, Math.round((to.getTime() - from.getTime()) / 86400000) + 1);
    const hours = logLeaveForm.hours ? Number(logLeaveForm.hours) : dayCount * 8;
    const fmt = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

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
      triggerToast(`Leave logged on behalf of ${member.name}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Overlap check logic
  const checkConflicts = (req: LeaveRequest) => {
    const parseDate = (dStr: string) => new Date(dStr);
    const startA = parseDate(req.from);
    const endA = parseDate(req.to);

    return leaveRequests.filter(other => {
      if (other.id === req.id) return false;
      if (other.status !== 'approved') return false;
      if (other.role !== req.role) return false;

      const startB = parseDate(other.from);
      const endB = parseDate(other.to);

      return startA <= endB && startB <= endA;
    });
  };

  // Filtered Requests
  const filteredRequests = leaveRequests.filter(req => {
    const matchSearch = req.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        req.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        req.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchType = typeFilter === '' || req.type === typeFilter;

    let matchDates = true;
    if (dateFrom) {
      matchDates = matchDates && new Date(req.from) >= new Date(dateFrom);
    }
    if (dateTo) {
      matchDates = matchDates && new Date(req.to) <= new Date(dateTo);
    }

    return matchSearch && matchStatus && matchType && matchDates;
  });

  const pendingCount = leaveRequests.filter(r => r.status === 'pending').length;
  const approvedCount = leaveRequests.filter(r => r.status === 'approved').length;
  const declinedCount = leaveRequests.filter(r => r.status === 'declined').length;
  const totalHours = leaveRequests.reduce((sum, r) => r.status === 'approved' ? sum + r.hours : sum, 0);

  const stats = [
    { label: 'Pending Approval', value: pendingCount, color: 'text-amber-600', bg: 'bg-amber-50', icon: <Clock size={20} className="text-amber-600" /> },
    { label: 'Approved Requests', value: approvedCount, color: 'text-green-600', bg: 'bg-green-50', icon: <CheckCircle size={20} className="text-green-600" /> },
    { label: 'Declined Requests', value: declinedCount, color: 'text-red-600', bg: 'bg-red-50', icon: <XCircle size={20} className="text-red-500" /> },
    { label: 'Approved Leave Hours', value: `${totalHours}h`, color: 'text-blue-600', bg: 'bg-blue-50', icon: <CalendarRange size={20} className="text-blue-600" /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <Sidebar activeItem="Leave Requests" />
      <TopBar />

      <main className="ml-0 md:ml-64 pt-20 px-4 md:px-8 pb-8 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto w-full">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl text-gray-900 font-semibold">Staff Leave Requests</h1>
              <p className="text-sm text-gray-600 mt-1">Review, approve, and track employee leave requests and shifts conflicts</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowLogLeave(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm"
              >
                <Plus size={20} />
                Log Leave on Behalf
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-5 right-5 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl z-50 flex items-center gap-2 animate-bounce">
              <CheckCircle size={16} className="text-green-400" />
              <span className="text-sm font-medium">{toastMessage}</span>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} className="flex items-center gap-4 p-5 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                  <div className={`text-2xl font-bold mt-0.5 ${stat.color}`}>{stat.value}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Filters Panel */}
          <Card className="mb-6 p-5">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
              
              {/* Left search */}
              <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-100 max-w-md">
                <Search size={18} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by staff name, role, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700"
                />
              </div>

              {/* Right options */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500 font-medium">From</label>
                  <input 
                    type="date" 
                    value={dateFrom} 
                    onChange={e => setDateFrom(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400 bg-white" 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500 font-medium">To</label>
                  <input 
                    type="date" 
                    min={dateFrom} 
                    value={dateTo} 
                    onChange={e => setDateTo(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400 bg-white" 
                  />
                </div>
                
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400 bg-white cursor-pointer text-gray-700"
                >
                  <option value="">All Leave Types</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="TOIL (Time Off In Lieu)">TOIL</option>
                  <option value="Medical Leave">Medical Leave</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                  <option value="Study Leave">Study Leave</option>
                  <option value="Maternity / Paternity Leave">Parental Leave</option>
                  <option value="Compassionate Leave">Compassionate Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                </select>
              </div>
            </div>

            {/* Status tabs */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              {(['all', 'pending', 'approved', 'declined'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors capitalize ${
                    statusFilter === f 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {f === 'all' ? 'All Requests' : `${f} requests`}
                  {f === 'pending' && pendingCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingCount}</span>
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Leave Requests Table */}
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70">
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Staff Member</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Leave Type</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Requested Dates</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Hours</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Conflicts / Warning</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRequests.map(r => {
                    const conflicts = checkConflicts(r);
                    const hasConflict = conflicts.length > 0;
                    return (
                      <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${getAvatarColor(r.staffId)} flex items-center justify-center text-white text-sm font-semibold shrink-0`}>
                              {getInitials(r.name)}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-gray-900">{r.name}</div>
                              <div className="text-xs text-gray-400 font-mono">{r.employeeId} · {r.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                            r.type === 'Annual Leave'    ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            r.type === 'TOIL (Time Off In Lieu)' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                            r.type === 'Medical Leave'  ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            r.type === 'Emergency Leave'? 'bg-orange-50 text-orange-700 border-orange-200' :
                            r.type === 'Study Leave'    ? 'bg-teal-50 text-teal-700 border-teal-200' :
                            'bg-gray-50 text-gray-600 border-gray-200'
                          }`}>{r.type}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm font-medium text-gray-900">{r.from}</div>
                          {r.from !== r.to && <div className="text-xs text-gray-500">to {r.to}</div>}
                          {(r.startTime || r.endTime) && (
                            <div className="text-xs text-gray-400 mt-0.5">{r.startTime || '—'} – {r.endTime || '—'}</div>
                          )}
                        </td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-800">
                          {r.hours}h
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-500">
                          {r.submittedOn}
                        </td>
                        <td className="py-4 px-6">
                          {hasConflict ? (
                            <div className="flex flex-col gap-1">
                              <span className="inline-flex items-center gap-1 text-[11px] text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-medium w-fit">
                                <AlertCircle size={11} className="text-amber-600 shrink-0" /> Overlap Warning
                              </span>
                              <div className="text-[10px] text-amber-700 font-medium font-sans">
                                {conflicts.map(c => c.name).join(', ')} ({r.role})
                              </div>
                            </div>
                          ) : (
                            <span className="text-[11px] text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md font-medium">
                              No Overlaps
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {r.status === 'pending'  && <span className="inline-flex items-center gap-1.5 text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-semibold"><Clock size={12} />Pending</span>}
                          {r.status === 'approved' && <span className="inline-flex items-center gap-1.5 text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-semibold"><CheckCircle size={12} />Approved</span>}
                          {r.status === 'declined' && <span className="inline-flex items-center gap-1.5 text-xs bg-red-100 text-red-800 px-2.5 py-1 rounded-full font-semibold"><XCircle size={12} />Declined</span>}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setDetailRequest(r)}
                              className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            {r.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => approveLeave(r.id)}
                                  className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Approve"
                                >
                                  <CheckCircle size={16} />
                                </button>
                                <button
                                  onClick={() => { setDeclineTarget(r); setDeclineNote(''); }}
                                  className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Decline"
                                >
                                  <XCircle size={16} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredRequests.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-16 text-center text-gray-400">
                        <CalendarRange size={36} className="mx-auto mb-2 opacity-30" />
                        <p className="text-sm font-medium">No leave requests found matching the current filters.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

        </div>
      </main>

      {/* ── Log Leave Modal ── */}
      {showLogLeave && (
        <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <CalendarRange size={17} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900 font-bold">Log Leave on Behalf of Staff</h2>
                <p className="text-xs text-gray-500">Record a leave request manually from the admin console</p>
              </div>
              <button onClick={() => setShowLogLeave(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-semibold">Staff Member *</label>
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
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">Leave Type *</label>
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

                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">Status</label>
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

                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">From *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={logLeaveForm.from}
                    onChange={e => setLogLeaveForm(f => ({ ...f, from: e.target.value, to: f.to < e.target.value ? e.target.value : f.to }))}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">To *</label>
                  <input
                    type="date"
                    min={logLeaveForm.from}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={logLeaveForm.to}
                    onChange={e => setLogLeaveForm(f => ({ ...f, to: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">Start Time <span className="text-gray-400">(optional)</span></label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={logLeaveForm.startTime}
                    onChange={e => setLogLeaveForm(f => ({ ...f, startTime: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">End Time <span className="text-gray-400">(optional)</span></label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={logLeaveForm.endTime}
                    onChange={e => setLogLeaveForm(f => ({ ...f, endTime: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1 font-semibold">Hours *</label>
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

              <div>
                <label className="block text-xs text-gray-500 mb-1 font-semibold">Notes / Reason <span className="text-gray-400">(optional)</span></label>
                <textarea
                  rows={3}
                  value={logLeaveForm.reason}
                  onChange={e => setLogLeaveForm(f => ({ ...f, reason: e.target.value }))}
                  placeholder="Provide notes or reasons for this leave request..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button onClick={() => setShowLogLeave(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
              <button
                onClick={submitLogLeave}
                disabled={!logLeaveForm.staffId || !logLeaveForm.from || !logLeaveForm.to}
                className="flex items-center gap-2 px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Log Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Leave Detail Modal ── */}
      {detailRequest && (
        <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <CalendarRange size={17} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base text-gray-900 font-bold">Leave Request Details</h2>
                <p className="text-xs text-gray-500">{detailRequest.name} · {detailRequest.employeeId}</p>
              </div>
              <button onClick={() => setDetailRequest(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className={`w-10 h-10 rounded-full ${getAvatarColor(detailRequest.staffId)} flex items-center justify-center text-white text-sm font-semibold shrink-0`}>
                  {getInitials(detailRequest.name)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{detailRequest.name}</p>
                  <p className="text-xs text-gray-500">{detailRequest.role}</p>
                </div>
                <div className="ml-auto">
                  {detailRequest.status === 'pending'  && <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-semibold">Pending</span>}
                  {detailRequest.status === 'approved' && <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">Approved</span>}
                  {detailRequest.status === 'declined' && <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-semibold">Declined</span>}
                </div>
              </div>

              {detailRequest.status === 'pending' && (() => {
                const conflicts = checkConflicts(detailRequest);
                if (conflicts.length > 0) {
                  return (
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
                      <AlertCircle size={15} className="shrink-0 mt-0.5 text-amber-600" />
                      <div>
                        <span className="font-bold">Leave Conflict Warning:</span> Overlaps with approved leave for:
                        <ul className="list-disc list-inside mt-1 font-medium">
                          {conflicts.map(c => (
                            <li key={c.id}>{c.name} ({c.type}, {c.from} to {c.to})</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5 font-medium">Leave Type</p>
                  <p className="text-gray-900 font-semibold">{detailRequest.type}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5 font-medium">Duration</p>
                  <p className="text-gray-900 font-semibold">{detailRequest.hours} hour{detailRequest.hours !== 1 ? 's' : ''}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5 font-medium">From</p>
                  <p className="text-gray-900 font-semibold">{detailRequest.from}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5 font-medium">To</p>
                  <p className="text-gray-900 font-semibold">{detailRequest.to}</p>
                </div>
                {(detailRequest.startTime || detailRequest.endTime) && (
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 col-span-2">
                    <p className="text-xs text-gray-500 mb-0.5 font-medium">Time</p>
                    <p className="text-gray-900 font-semibold">
                      {detailRequest.startTime || '—'} – {detailRequest.endTime || '—'}
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1 font-medium"><MessageSquare size={11} /> Reason from staff</p>
                <p className="text-sm text-gray-700 font-medium">{detailRequest.reason}</p>
              </div>

              {detailRequest.adminNote && (
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <p className="text-xs text-blue-600 mb-1 font-medium">Admin override notes</p>
                  <p className="text-sm text-blue-800 font-medium">{detailRequest.adminNote}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              {detailRequest.status === 'pending' ? (
                <>
                  <button onClick={() => setDetailRequest(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Close</button>
                  <button
                    onClick={() => { setDeclineTarget(detailRequest); setDetailRequest(null); setDeclineNote(''); }}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors font-semibold shadow-sm"
                  >
                    Decline Leave
                  </button>
                  <button
                    onClick={() => approveLeave(detailRequest.id)}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold shadow-sm"
                  >
                    Approve Leave
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
        <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                <XCircle size={17} className="text-red-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900 font-bold">Decline Leave Request</h2>
                <p className="text-xs text-gray-500">{declineTarget.name} · {declineTarget.from} – {declineTarget.to}</p>
              </div>
              <button onClick={() => setDeclineTarget(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700 font-medium">
                <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-500" />
                Please state the reason for declining. The staff member will see this note in the mobile application.
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-semibold">Reason for declining <span className="text-gray-400">(recommended)</span></label>
                <textarea
                  rows={3}
                  value={declineNote}
                  onChange={e => setDeclineNote(e.target.value)}
                  placeholder="e.g., Lack of operational shift cover, pre-existing staff shortages..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none font-medium text-gray-700"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button onClick={() => setDeclineTarget(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
              <button
                onClick={() => declineLeave(declineTarget.id, declineNote)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
