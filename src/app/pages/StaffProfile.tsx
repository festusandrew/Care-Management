import { useState, useRef } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Badge } from '../components/Badge';
import { useNavigation } from '../context/NavigationContext';
import { StaffTimesheetModal } from '../components/StaffTimesheetModal';
import { EditStaffModal } from '../components/EditStaffModal';
import {
  ArrowLeft, Mail, Phone, MapPin, Briefcase,
  CalendarDays, Clock, FileText, Activity, AlertCircle,
  CheckCircle2, Plus, Download, Edit, CheckCircle, Shield,
  Calendar as CalendarIcon, List, Hash, X
} from 'lucide-react';

type ProfileTab = 'overview' | 'schedule' | 'compliance';

interface StaffProfileProps {
  id?: number;
  showTimesheet?: boolean;
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

export default function StaffProfile({ id, showTimesheet = false }: StaffProfileProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const { setCurrentPage } = useNavigation();
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [scheduleViewMode, setScheduleViewMode] = useState<'list' | 'calendar'>('calendar');
  const [selectedMonth, setSelectedMonth] = useState('December 2025');
  const [showTimesheetModal, setShowTimesheetModal] = useState(showTimesheet);

  // Mock individual data
  const staffId = id || 1;
  const initialStaff = {
    1: {
      employeeId: 'EMP-0001',
      name: 'Mary Thompson',
      role: 'Support Worker',
      status: 'Active',
      email: 'm.thompson@mpoweredcare.com',
      phone: '+44 7700 900123',
      location: 'Main House',
      joinDate: '12 Jan 2023',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60',
      contractedHours: 37.5,
      actualHours: 38.5,
      complianceRate: 100,
      daysEmployed: 1085,
      qualifications: ['Care Certificate', 'First Aid (Expires: Aug 2026)', 'Medication Level 2'],
    },
    2: {
      employeeId: 'EMP-0002',
      name: 'John Davies',
      role: 'Senior Support Worker',
      status: 'Active',
      email: 'j.davies@mpoweredcare.com',
      phone: '+44 7700 900234',
      location: 'Annex Building',
      joinDate: '04 Mar 2021',
      avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&auto=format&fit=crop&q=60',
      contractedHours: 40,
      actualHours: 42,
      complianceRate: 98,
      daysEmployed: 1855,
      qualifications: ['NVQ Level 3', 'Medication Admin', 'Safeguarding Lead'],
    },
  }[staffId] || {
    employeeId: 'EMP-0001',
    name: 'Mary Thompson',
    role: 'Support Worker',
    status: 'Active',
    email: 'm.thompson@mpoweredcare.com',
    phone: '+44 7700 900123',
    location: 'Main House',
    joinDate: '12 Jan 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60',
    contractedHours: 37.5,
    actualHours: 38.5,
    complianceRate: 100,
    daysEmployed: 1085,
    qualifications: ['Care Certificate', 'First Aid', 'Medication Level 2'],
  };
  const [staff, setStaff] = useState(initialStaff);

  // Qualifications & Compliance documents state
  const [documents, setDocuments] = useState<any[]>(() => {
    if (staffId === 2) {
      return [
        { id: '1', name: 'NVQ Level 3', type: 'Qualification', issuedDate: '04 Mar 2021', expiryDate: 'Never', status: 'verified', verifiedBy: 'Sarah Williams', fileSize: '4.5 MB', fileName: 'nvq_level3_davies.pdf' },
        { id: '2', name: 'Medication Administration', type: 'Training', issuedDate: '12 Nov 2024', expiryDate: '12 Nov 2027', status: 'verified', verifiedBy: 'James Mitchell', fileSize: '980 KB', fileName: 'med_admin_cert.pdf' },
        { id: '3', name: 'Safeguarding Lead Certification', type: 'Qualification', issuedDate: '22 Jan 2025', expiryDate: '22 Jan 2028', status: 'verified', verifiedBy: 'James Mitchell', fileSize: '1.4 MB', fileName: 'safeguarding_lead_cert.pdf' },
        { id: '4', name: 'Manual Handling', type: 'Training', issuedDate: '18 Jul 2025', expiryDate: '18 Jul 2026', status: 'expiring', verifiedBy: 'James Mitchell', fileSize: '1.1 MB', fileName: 'manual_handling_cert.pdf' },
      ];
    }
    return [
      { id: '1', name: 'Care Certificate', type: 'Qualification', issuedDate: '12 Jan 2023', expiryDate: 'Never', status: 'verified', verifiedBy: 'Sarah Williams', fileSize: '1.2 MB', fileName: 'care_certificate_thompson.pdf' },
      { id: '2', name: 'First Aid Training', type: 'Training', issuedDate: '15 Aug 2023', expiryDate: '15 Aug 2026', status: 'verified', verifiedBy: 'James Mitchell', fileSize: '850 KB', fileName: 'first_aid_cert_2023.pdf' },
      { id: '3', name: 'Medication Level 2', type: 'Qualification', issuedDate: '10 Oct 2024', expiryDate: '10 Oct 2027', status: 'verified', verifiedBy: 'James Mitchell', fileSize: '2.1 MB', fileName: 'med_level2_cert.pdf' },
      { id: '4', name: 'Manual Handling', type: 'Training', issuedDate: '18 Jul 2025', expiryDate: '18 Jul 2026', status: 'expiring', verifiedBy: 'James Mitchell', fileSize: '1.1 MB', fileName: 'manual_handling_cert.pdf' },
    ];
  });

  // Modal states
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [selectedDocForView, setSelectedDocForView] = useState<any | null>(null);
  const [selectedDocForRenew, setSelectedDocForRenew] = useState<any | null>(null);

  // Form states
  const [addDocForm, setAddDocForm] = useState({
    name: '',
    type: 'Qualification',
    issuedDate: '',
    expiryDate: '',
    neverExpires: false,
    fileName: '',
    fileSize: ''
  });

  const [renewDocForm, setRenewDocForm] = useState({
    issuedDate: '',
    expiryDate: '',
    fileName: '',
    fileSize: ''
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddDocument = () => {
    if (!addDocForm.name || !addDocForm.issuedDate || !addDocForm.fileName) return;
    const newDoc = {
      id: String(documents.length + 1),
      name: addDocForm.name,
      type: addDocForm.type,
      issuedDate: new Date(addDocForm.issuedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      expiryDate: addDocForm.neverExpires ? 'Never' : new Date(addDocForm.expiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'verified' as const,
      verifiedBy: 'Sarah Williams',
      fileName: addDocForm.fileName,
      fileSize: addDocForm.fileSize || '1.4 MB'
    };
    setDocuments(prev => [...prev, newDoc]);
    
    // Also sync with main staff qualifications list if relevant
    setStaff(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, newDoc.name]
    }));

    setShowAddDocModal(false);
    setAddDocForm({ name: '', type: 'Qualification', issuedDate: '', expiryDate: '', neverExpires: false, fileName: '', fileSize: '' });
    triggerToast(`Document "${newDoc.name}" added successfully.`);
  };

  const handleRenewDocument = () => {
    if (!selectedDocForRenew || !renewDocForm.issuedDate || !renewDocForm.fileName) return;
    const formattedIssued = new Date(renewDocForm.issuedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const formattedExpiry = new Date(renewDocForm.expiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    
    setDocuments(prev => prev.map(doc => {
      if (doc.id === selectedDocForRenew.id) {
        return {
          ...doc,
          issuedDate: formattedIssued,
          expiryDate: formattedExpiry,
          status: 'verified',
          fileName: renewDocForm.fileName,
          fileSize: renewDocForm.fileSize || doc.fileSize,
          verifiedBy: 'Sarah Williams'
        };
      }
      return doc;
    }));
    triggerToast(`Document "${selectedDocForRenew.name}" renewed successfully.`);
    setSelectedDocForRenew(null);
    setRenewDocForm({ issuedDate: '', expiryDate: '', fileName: '', fileSize: '' });
  };

  const scheduleShifts = [
    { id: 101, date: '7 Dec 2025', day: 'Sunday', time: '07:00 - 15:00', duration: '8h', location: 'Main House', status: 'upcoming', role: 'Support Worker' },
    { id: 102, date: '8 Dec 2025', day: 'Monday', time: '07:00 - 15:00', duration: '8h', location: 'Main House', status: 'upcoming', role: 'Support Worker' },
    { id: 103, date: '9 Dec 2025', day: 'Tuesday', time: '07:00 - 15:00', duration: '8h', location: 'Main House', status: 'upcoming', role: 'Support Worker' },
    { id: 104, date: '11 Dec 2025', day: 'Thursday', time: '15:00 - 23:00', duration: '8h', location: 'Main House', status: 'upcoming', role: 'Support Worker' },
    { id: 105, date: '12 Dec 2025', day: 'Friday', time: '15:00 - 23:00', duration: '8h', location: 'Main House', status: 'upcoming', role: 'Support Worker' },
  ];

  const generateCalendarDays = () => {
    // Generate 35 days (5 weeks) for December 2025. Dec 1 is Monday.
    // Sunday is index 0. We'll start with Sun Nov 30.
    return Array.from({ length: 35 }, (_, i) => {
      const dateNum = i; // 0 = Nov 30, 1 = Dec 1
      const isCurrentMonth = dateNum >= 1 && dateNum <= 31;
      const dateStr = isCurrentMonth ? `${dateNum} Dec 2025` : '';
      const dayShifts = scheduleShifts.filter(s => s.date === dateStr);
      return { 
        id: `cal-day-${i}`,
        dateNumber: isCurrentMonth ? dateNum : '', 
        shifts: dayShifts, 
        isCurrentMonth 
      };
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Active</span>;
      case 'upcoming':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-blue-50 text-blue-700 border border-blue-200">Upcoming</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Completed</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-gray-50 text-gray-700 border border-gray-200">{status}</span>;
    }
  };

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'schedule', label: 'Schedule & Timesheets' },
    { key: 'compliance', label: 'Qualifications & Compliance' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Staff Management" />
      <TopBar />
      
      <main className="ml-0 md:ml-64 pt-20 px-4 md:px-8 pb-8 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Back Button */}
          <button 
            onClick={() => setCurrentPage('staff')} 
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-5 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Staff Directory
          </button>

          {/* ===== PROFILE HEADER CARD ===== */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            {/* Left: Avatar + Info */}
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <div className={`w-20 h-20 rounded-2xl ${getAvatarColor(staffId)} flex items-center justify-center text-white text-3xl font-semibold shadow-sm border border-gray-100 shrink-0`}>
                  {getInitials(staff.name)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl text-gray-900">{staff.name}</h1>
                  {getStatusBadge(staff.status)}
                  <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md font-mono">
                    <Hash size={11} />{staff.employeeId}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {staff.role} · Joined {staff.joinDate}
                </p>
                <div className="flex items-center gap-5 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gray-400" />
                    {staff.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone size={14} className="text-gray-400" />
                    {staff.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} className="text-gray-400" />
                    {staff.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
          >
            <Edit size={14} />
            Edit Profile
          </button>
                  <button 
                    onClick={() => setShowTimesheetModal(true)}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium"
                  >
                    <FileText size={14} />
                    View Timesheet
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Stat Badges */}
            <div className="flex items-center gap-3">
              <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[80px]">
                <div className="text-xl text-gray-900">{staff.contractedHours}h</div>
                <div className="text-xs text-gray-500">Contracted</div>
              </div>
              <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[80px]">
                <div className="text-xl text-emerald-600">{staff.actualHours}h</div>
                <div className="text-xs text-gray-500">Actual (Wk)</div>
              </div>
              <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[80px]">
                <div className="text-xl text-blue-600">{staff.complianceRate}%</div>
                <div className="text-xs text-gray-500">Compliance</div>
              </div>
              <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[80px]">
                <div className="text-xl text-purple-600">{staff.daysEmployed}</div>
                <div className="text-xs text-gray-500">Days Employed</div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TAB NAVIGATION ===== */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-700 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== TAB CONTENT ===== */}
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900 font-medium">Employment Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Role</div>
                    <div className="text-sm text-gray-900">{staff.role}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Primary Location</div>
                    <div className="text-sm text-gray-900">{staff.location}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Line Manager</div>
                    <div className="text-sm text-gray-900">Sarah Williams</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Contract Type</div>
                    <div className="text-sm text-gray-900">Full-time Permanent</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Payroll Number</div>
                    <div className="text-sm text-gray-900">PR-{staffId.toString().padStart(4, '0')}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Next Appriasal</div>
                    <div className="text-sm text-blue-600">12 May 2026</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900 font-medium">Key Qualifications</h3>
                </div>
                <div className="space-y-3">
                  {staff.qualifications.slice(0, 3).map((qual, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CheckCircle size={14} />
                      </div>
                      <div className="text-sm text-gray-800">{qual}</div>
                    </div>
                  ))}
                  {staff.qualifications.length > 3 && (
                    <button 
                      onClick={() => setActiveTab('compliance')}
                      className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                    >
                      View all qualifications →
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900 font-medium">Next Shifts</h3>
                </div>
                <button 
                  onClick={() => setActiveTab('schedule')}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  View full schedule →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scheduleShifts.slice(0, 3).map(shift => (
                  <div key={shift.id} className="border border-blue-100 bg-blue-50/30 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-900 mb-1">{shift.date}</div>
                    <div className="text-xs text-blue-800 mb-2">{shift.time} ({shift.duration})</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <MapPin size={12} />
                      {shift.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCHEDULE TAB */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-blue-600" />
                  <h2 className="text-sm font-medium text-gray-900">Upcoming Schedule</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button 
                      onClick={() => setScheduleViewMode('list')}
                      className={`p-1.5 rounded-md text-sm flex items-center justify-center transition-colors ${
                        scheduleViewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-900'
                      }`}
                      title="List View"
                    >
                      <List size={16} />
                    </button>
                    <button 
                      onClick={() => setScheduleViewMode('calendar')}
                      className={`p-1.5 rounded-md text-sm flex items-center justify-center transition-colors ${
                        scheduleViewMode === 'calendar' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-900'
                      }`}
                      title="Calendar View"
                    >
                      <CalendarIcon size={16} />
                    </button>
                  </div>
                  <select 
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 bg-white"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option>November 2025</option>
                    <option>December 2025</option>
                    <option>January 2026</option>
                  </select>
                  <button className="flex items-center gap-2 text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    <Download size={14} />
                    Export
                  </button>
                </div>
              </div>
              
              {scheduleViewMode === 'list' ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100 bg-white">
                        <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role & Location</th>
                        <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                        <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {scheduleShifts.map((shift) => (
                        <tr key={shift.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 px-6">
                            <div className="font-medium text-gray-900 text-sm">{shift.date}</div>
                            <div className="text-xs text-gray-500">{shift.day}</div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="flex items-center gap-2 text-gray-900 text-sm">
                              <Briefcase size={14} className="text-gray-400" />
                              <span>{shift.role}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <MapPin size={12} className="text-gray-400" />
                              <span>{shift.location}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-sm text-gray-900">{shift.time}</td>
                          <td className="py-3 px-6 text-sm text-gray-600">{shift.duration}</td>
                          <td className="py-3 px-6">
                            {getStatusBadge(shift.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {/* Days of week header */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="bg-gray-50 py-2 text-center text-xs font-semibold text-gray-500 uppercase">
                        {day}
                      </div>
                    ))}
                    
                    {/* Calendar cells */}
                    {generateCalendarDays().map((day) => (
                      <div 
                        key={day.id} 
                        className={`min-h-[120px] p-2 bg-white ${!day.isCurrentMonth ? 'bg-gray-50/50 text-gray-400' : 'text-gray-900'}`}
                      >
                        <div className="flex justify-end mb-1">
                          <span className={`text-sm font-medium ${day.dateNumber === 7 ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
                            {day.dateNumber || (day.id === 'cal-day-0' ? 30 : parseInt(day.id.replace('cal-day-', '')) - 31)}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          {day.shifts.map(shift => (
                            <div 
                              key={shift.id} 
                              className="px-2 py-1.5 bg-blue-50 border border-blue-100 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
                            >
                              <div className="text-xs font-medium text-blue-900">{shift.time}</div>
                              <div className="text-[10px] text-blue-700 truncate">{shift.location}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* COMPLIANCE TAB */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <h2 className="text-sm font-medium text-gray-900">Qualifications & Compliance</h2>
                </div>
                <button
                  onClick={() => setShowAddDocModal(true)}
                  className="flex items-center gap-2 text-sm bg-blue-600 text-white px-3.5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm"
                >
                  <Plus size={14} />
                  Add Document
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map((doc) => {
                    const isExpiring = doc.status === 'expiring';
                    const isExpired = doc.status === 'expired';
                    
                    return (
                      <div 
                        key={doc.id} 
                        className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${
                          isExpiring ? 'border-amber-200 bg-amber-50/50 hover:bg-amber-100/30' :
                          isExpired ? 'border-red-200 bg-red-50/50 hover:bg-red-100/30' :
                          'border-gray-100 bg-gray-50/30 hover:bg-white hover:border-blue-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            isExpiring ? 'bg-amber-100 text-amber-600' :
                            isExpired ? 'bg-red-100 text-red-600' :
                            'bg-emerald-100 text-emerald-600'
                          }`}>
                            {isExpiring || isExpired ? <AlertCircle size={20} /> : <FileText size={20} />}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            <div className="text-xs mt-0.5 flex items-center gap-1">
                              {isExpiring && <span className="text-amber-700 font-medium">Expires: {doc.expiryDate}</span>}
                              {isExpired && <span className="text-red-700 font-medium">Expired: {doc.expiryDate}</span>}
                              {!isExpiring && !isExpired && <span className="text-emerald-700 font-medium flex items-center gap-1"><CheckCircle2 size={11} /> Verified</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setSelectedDocForView(doc)}
                            className="text-sm text-blue-600 font-semibold hover:underline"
                          >
                            View
                          </button>
                          {(isExpiring || isExpired) && (
                            <button 
                              onClick={() => {
                                setSelectedDocForRenew(doc);
                                setRenewDocForm({
                                  issuedDate: new Date().toISOString().split('T')[0],
                                  expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                                  fileName: '',
                                  fileSize: ''
                                });
                              }}
                              className="text-sm text-amber-600 font-semibold hover:underline border-l border-gray-200 pl-3"
                            >
                              Renew
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
      
      {showAddDocModal && (
        <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <Plus size={17} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-950 font-bold">Add Compliance Document</h2>
                <p className="text-xs text-gray-500">Record a new qualification or training certificate</p>
              </div>
              <button onClick={() => setShowAddDocModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-semibold">Document Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Safeguarding Level 3"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 font-medium"
                  value={addDocForm.name}
                  onChange={e => setAddDocForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-semibold">Document Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                  value={addDocForm.type}
                  onChange={e => setAddDocForm(f => ({ ...f, type: e.target.value }))}
                >
                  <option>Qualification</option>
                  <option>Training</option>
                  <option>ID & Right to Work</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">Date Issued *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 font-medium"
                    value={addDocForm.issuedDate}
                    onChange={e => setAddDocForm(f => ({ ...f, issuedDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">Expiry Date</label>
                  <input
                    type="date"
                    disabled={addDocForm.neverExpires}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 disabled:bg-gray-50 font-medium"
                    value={addDocForm.expiryDate}
                    onChange={e => setAddDocForm(f => ({ ...f, expiryDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="neverExpires"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={addDocForm.neverExpires}
                  onChange={e => setAddDocForm(f => ({ ...f, neverExpires: e.target.checked, expiryDate: e.target.checked ? '' : f.expiryDate }))}
                />
                <label htmlFor="neverExpires" className="text-xs text-gray-600 select-none">This document does not expire</label>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-semibold">Upload Certificate *</label>
                <div className="flex items-center gap-3">
                  <label className="flex flex-col items-center justify-center flex-1 h-24 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl cursor-pointer transition-colors p-4 bg-gray-50/50">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Plus size={20} className="text-gray-400 mb-1" />
                      <span className="text-xs text-gray-600 font-semibold text-center truncate max-w-[280px]">{addDocForm.fileName || 'Select certificate file'}</span>
                      {addDocForm.fileSize && <span className="text-[10px] text-gray-400 mt-0.5">{addDocForm.fileSize}</span>}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const sizeStr = file.size > 1024 * 1024 
                            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
                            : `${(file.size / 1024).toFixed(0)} KB`;
                          setAddDocForm(f => ({ ...f, fileName: file.name, fileSize: sizeStr }));
                        }
                      }}
                    />
                  </label>
                  {addDocForm.fileName && (
                    <button 
                      onClick={() => setAddDocForm(f => ({ ...f, fileName: '', fileSize: '' }))}
                      className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg text-gray-400 transition-colors border border-gray-150"
                      title="Clear file"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button onClick={() => setShowAddDocModal(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
              <button
                onClick={handleAddDocument}
                disabled={!addDocForm.name || !addDocForm.issuedDate || (!addDocForm.neverExpires && !addDocForm.expiryDate) || !addDocForm.fileName}
                className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Add Document
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedDocForView && (
        <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <FileText size={17} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base text-gray-955 font-bold truncate">{selectedDocForView.name}</h2>
                <p className="text-xs text-gray-500">{selectedDocForView.type}</p>
              </div>
              <button onClick={() => setSelectedDocForView(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Date Issued</p>
                  <p className="text-gray-900 font-semibold">{selectedDocForView.issuedDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Expiry Date</p>
                  <p className="text-gray-900 font-semibold">{selectedDocForView.expiryDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Status</p>
                  <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-semibold mt-0.5 ${
                    selectedDocForView.status === 'expiring' ? 'bg-amber-100 text-amber-800' :
                    selectedDocForView.status === 'expired' ? 'bg-red-100 text-red-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedDocForView.status === 'expiring' ? 'Expiring Soon' : selectedDocForView.status === 'expired' ? 'Expired' : 'Verified'}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Verified By</p>
                  <p className="text-gray-900 font-semibold">{selectedDocForView.verifiedBy}</p>
                </div>
              </div>
              {selectedDocForView.fileName && (
                <div className="flex items-center gap-3 p-3 border border-gray-150 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                    <FileText size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-900 font-medium truncate">{selectedDocForView.fileName}</p>
                    <p className="text-[10px] text-gray-400">{selectedDocForView.fileSize || 'Unknown size'}</p>
                  </div>
                  <button className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 shrink-0">
                    <Download size={12} /> Download
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-end px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button onClick={() => setSelectedDocForView(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-semibold">Close</button>
            </div>
          </div>
        </div>
      )}

      {selectedDocForRenew && (
        <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle size={17} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-950 font-bold">Renew Document</h2>
                <p className="text-xs text-gray-500">Renew compliance for {selectedDocForRenew.name}</p>
              </div>
              <button onClick={() => setSelectedDocForRenew(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">New Date Issued *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 font-medium"
                    value={renewDocForm.issuedDate}
                    onChange={e => setRenewDocForm(f => ({ ...f, issuedDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">New Expiry Date *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 font-medium"
                    value={renewDocForm.expiryDate}
                    onChange={e => setRenewDocForm(f => ({ ...f, expiryDate: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-semibold">Upload New Certificate *</label>
                <div className="flex items-center gap-3">
                  <label className="flex flex-col items-center justify-center flex-1 h-24 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl cursor-pointer transition-colors p-4 bg-gray-50/50">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Plus size={20} className="text-gray-400 mb-1" />
                      <span className="text-xs text-gray-600 font-semibold text-center truncate max-w-[280px]">{renewDocForm.fileName || 'Select new certificate file'}</span>
                      {renewDocForm.fileSize && <span className="text-[10px] text-gray-400 mt-0.5">{renewDocForm.fileSize}</span>}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const sizeStr = file.size > 1024 * 1024 
                            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
                            : `${(file.size / 1024).toFixed(0)} KB`;
                          setRenewDocForm(f => ({ ...f, fileName: file.name, fileSize: sizeStr }));
                        }
                      }}
                    />
                  </label>
                  {renewDocForm.fileName && (
                    <button 
                      onClick={() => setRenewDocForm(f => ({ ...f, fileName: '', fileSize: '' }))}
                      className="p-1.5 hover:bg-red-50 hover:text-red-650 rounded-lg text-gray-400 transition-colors border border-gray-150"
                      title="Clear file"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button onClick={() => setSelectedDocForRenew(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
              <button
                onClick={handleRenewDocument}
                disabled={!renewDocForm.issuedDate || !renewDocForm.expiryDate || !renewDocForm.fileName}
                className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Renew Document
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">
          <CheckCircle size={15} className="text-green-400" />
          {toastMessage}
        </div>
      )}

      <StaffTimesheetModal 
        isOpen={showTimesheetModal} 
        onClose={() => setShowTimesheetModal(false)} 
        staff={staff} 
      />
      <EditStaffModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        staff={staff}
        onSave={(updated) => setStaff(updated)}
      />
    </div>
  );
}