import { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Badge } from '../components/Badge';
import { useNavigation } from '../context/NavigationContext';
import { StaffTimesheetModal } from '../components/StaffTimesheetModal';
import { EditStaffModal } from '../components/EditStaffModal';
import { api } from '../services/api';
import { MessageSquare, Archive, StickyNote, Trash2, RotateCcw, ChevronDown,
  ArrowLeft, Mail, Phone, MapPin, Briefcase,
  CalendarDays, Clock, FileText, Activity, AlertCircle,
  CheckCircle2, Plus, Download, Edit, CheckCircle, Shield,
  Calendar as CalendarIcon, List, Hash, X, CalendarRange
} from 'lucide-react';

type ProfileTab = 'overview' | 'schedule' | 'compliance' | 'notes';

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
  const initialStaff = ({
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
      annualLeaveHours: 224,
      lineManager: 'Sarah Williams',
      contractType: 'Full-time Permanent',
      contractEndDate: 'N/A (Permanent)',
      payrollNumber: 'PR-0001',
      nextAppraisal: '12 May 2026',
      nextOfKin: 'Jane Thompson',
      nextOfKinPhone: '+44 7700 900901',
      emergencyContact: 'Robert Thompson',
      emergencyPhone: '+44 7700 900902',
      bankReference: '•••• 4521',
      qualifications: ['Care Certificate', 'First Aid (Expires: Aug 2026)', 'Medication Level 2'],
      rateType: 'hourly',
      rateAmount: 13.50,
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
      annualLeaveHours: 240,
      lineManager: 'James Mitchell',
      contractType: 'Full-time Permanent',
      contractEndDate: 'N/A (Permanent)',
      payrollNumber: 'PR-0002',
      nextAppraisal: '20 Jun 2026',
      nextOfKin: 'Louise Davies',
      nextOfKinPhone: '+44 7700 900801',
      emergencyContact: 'Peter Davies',
      emergencyPhone: '+44 7700 900802',
      bankReference: '•••• 7812',
      qualifications: ['NVQ Level 3', 'Medication Admin', 'Safeguarding Lead'],
      rateType: 'hourly',
      rateAmount: 17.50,
    },
  } as any)[staffId] || {
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
    annualLeaveHours: 224,
    lineManager: 'Sarah Williams',
    contractType: 'Full-time Permanent',
    contractEndDate: 'N/A (Permanent)',
    payrollNumber: 'PR-0001',
    nextAppraisal: '12 May 2026',
    nextOfKin: 'Jane Thompson',
    nextOfKinPhone: '+44 7700 900901',
    emergencyContact: 'Robert Thompson',
    emergencyPhone: '+44 7700 900902',
    bankReference: '•••• 4521',
    qualifications: ['Care Certificate', 'First Aid', 'Medication Level 2'],
    rateType: 'hourly',
    rateAmount: 13.50,
  };
  const [staff, setStaff] = useState(initialStaff);
  const [leaveUsedHours, setLeaveUsedHours] = useState(0);
  const [leavePendingHours, setLeavePendingHours] = useState(0);

  useEffect(() => {
    let active = true;
    api.getLeaveRequests().then(rs => {
      if (!active) return;
      const used = rs.filter((r: any) => r.staffId === staffId && r.status === 'approved').reduce((sum: number, r: any) => sum + (r.hours || 0), 0);
      const pending = rs.filter((r: any) => r.staffId === staffId && r.status === 'pending').reduce((sum: number, r: any) => sum + (r.hours || 0), 0);
      setLeaveUsedHours(used);
      setLeavePendingHours(pending);
    }).catch(() => {});
    return () => { active = false; };
  }, [staffId]);

  // Qualifications & Compliance documents state
  const [documents, setDocuments] = useState<any[]>(() => {
    if (staffId === 2) {
      return [
        { id: '1', name: 'NVQ Level 3 Health & Social Care', category: 'Qualification', status: 'valid', expiryDate: 'N/A', uploadedDate: '2021-03-04', reference: 'NVQ-L3-2021-001', mandatory: true, awardedBy: 'City & Guilds', updatedBy: 'Sarah Williams', updatedDate: '2021-03-04', fileName: 'nvq_level3_davies.pdf', fileSize: '4.5 MB', comments: [{ author: 'Sarah Williams', date: '2021-03-04', text: 'NVQ Level 3 awarded on completion of care placement portfolio.' }], history: [{ action: 'Uploaded', by: 'Sarah Williams', date: '2021-03-04', detail: 'Initial certificate uploaded at onboarding.' }] },
        { id: '2', name: 'Medication Administration', category: 'Training', status: 'valid', expiryDate: '2027-11-12', uploadedDate: '2024-11-12', reference: 'MED-ADM-2024-022', mandatory: true, awardedBy: 'Skills for Care', updatedBy: 'James Mitchell', updatedDate: '2024-11-12', fileName: 'med_admin_cert.pdf', fileSize: '980 KB', comments: [], history: [{ action: 'Renewed', by: 'James Mitchell', date: '2024-11-12', detail: 'Medication administration refresher completed.' }] },
        { id: '3', name: 'Safeguarding Lead Certification', category: 'Qualification', status: 'valid', expiryDate: '2028-01-22', uploadedDate: '2025-01-22', reference: 'SG-LEAD-2025-007', mandatory: true, awardedBy: 'NSPCC / Local Authority', updatedBy: 'James Mitchell', updatedDate: '2025-01-22', fileName: 'safeguarding_lead_cert.pdf', fileSize: '1.4 MB', comments: [{ author: 'James Mitchell', date: '2025-01-22', text: 'Designated Safeguarding Lead certificate renewed. Valid 3 years.' }], history: [{ action: 'Renewed', by: 'James Mitchell', date: '2025-01-22', detail: 'Lead safeguarding refresher training completed.' }] },
        { id: '4', name: 'Manual Handling', category: 'Training', status: 'expiring', expiryDate: '2026-07-18', uploadedDate: '2025-07-18', reference: 'MH-2025-088', mandatory: true, awardedBy: 'HSE / QQI Provider', updatedBy: 'James Mitchell', updatedDate: '2025-07-18', fileName: 'manual_handling_cert.pdf', fileSize: '1.1 MB', comments: [{ author: 'James Mitchell', date: '2025-07-18', text: 'Certificate expires July 2026 — renewal reminder set for May 2026.' }], history: [{ action: 'Renewed', by: 'James Mitchell', date: '2025-07-18', detail: 'Manual handling refresher completed.' }] },
        { id: '5', name: 'DBS Check (Enhanced)', category: 'Vetting', status: 'valid', expiryDate: '2028-03-10', uploadedDate: '2025-03-10', reference: 'DBS-ENH-2025-3312', mandatory: true, awardedBy: 'Disclosure & Barring Service', updatedBy: 'Sarah Williams', updatedDate: '2025-03-10', fileName: 'dbs_check_davies.pdf', fileSize: '312 KB', comments: [{ author: 'Sarah Williams', date: '2025-03-10', text: 'Enhanced DBS returned clear. No disclosures.' }], history: [{ action: 'Re-checked', by: 'Sarah Williams', date: '2025-03-10', detail: 'Enhanced DBS clearance renewed.' }] },
      ];
    }
    return [
      { id: '1', name: 'Care Certificate', category: 'Qualification', status: 'valid', expiryDate: 'N/A', uploadedDate: '2023-01-12', reference: 'CC-2023-055', mandatory: true, awardedBy: 'Skills for Care', updatedBy: 'Sarah Williams', updatedDate: '2023-01-12', fileName: 'care_certificate_thompson.pdf', fileSize: '1.2 MB', comments: [{ author: 'Sarah Williams', date: '2023-01-12', text: 'Care Certificate completed and verified against all 15 standards.' }], history: [{ action: 'Uploaded', by: 'Sarah Williams', date: '2023-01-12', detail: 'Care Certificate uploaded at onboarding.' }] },
      { id: '2', name: 'First Aid Training', category: 'Training', status: 'valid', expiryDate: '2026-08-15', uploadedDate: '2023-08-15', reference: 'FA-2023-112', mandatory: true, awardedBy: 'British Red Cross', updatedBy: 'James Mitchell', updatedDate: '2023-08-15', fileName: 'first_aid_cert_2023.pdf', fileSize: '850 KB', comments: [], history: [{ action: 'Uploaded', by: 'James Mitchell', date: '2023-08-15', detail: 'First Aid certificate uploaded after course completion.' }] },
      { id: '3', name: 'Medication Level 2', category: 'Training', status: 'valid', expiryDate: '2027-10-10', uploadedDate: '2024-10-10', reference: 'MED-L2-2024-019', mandatory: true, awardedBy: 'Skills for Care', updatedBy: 'James Mitchell', updatedDate: '2024-10-10', fileName: 'med_level2_cert.pdf', fileSize: '2.1 MB', comments: [{ author: 'James Mitchell', date: '2024-10-10', text: 'Level 2 medication admin course passed with distinction.' }], history: [{ action: 'Uploaded', by: 'James Mitchell', date: '2024-10-10', detail: 'Medication Level 2 certificate uploaded.' }] },
      { id: '4', name: 'Manual Handling', category: 'Training', status: 'expiring', expiryDate: '2026-07-18', uploadedDate: '2025-07-18', reference: 'MH-2025-042', mandatory: true, awardedBy: 'HSE / QQI Provider', updatedBy: 'James Mitchell', updatedDate: '2025-07-18', fileName: 'manual_handling_cert.pdf', fileSize: '1.1 MB', comments: [{ author: 'James Mitchell', date: '2025-07-18', text: 'Expires July 2026 — renewal due before shift allocation.' }], history: [{ action: 'Renewed', by: 'James Mitchell', date: '2025-07-18', detail: 'Manual handling refresher completed.' }] },
      { id: '5', name: 'DBS Check (Enhanced)', category: 'Vetting', status: 'valid', expiryDate: '2028-01-05', uploadedDate: '2025-01-05', reference: 'DBS-ENH-2025-1178', mandatory: true, awardedBy: 'Disclosure & Barring Service', updatedBy: 'Sarah Williams', updatedDate: '2025-01-05', fileName: 'dbs_check_thompson.pdf', fileSize: '298 KB', comments: [{ author: 'Sarah Williams', date: '2025-01-05', text: 'Enhanced DBS returned clear. No disclosures.' }], history: [{ action: 'Uploaded', by: 'Sarah Williams', date: '2025-01-05', detail: 'DBS clearance document uploaded.' }] },
      { id: '6', name: 'Right to Work Verification', category: 'Identity', status: 'valid', expiryDate: 'N/A', uploadedDate: '2023-01-10', reference: 'RTW-2023-UK-CITIZEN', mandatory: true, awardedBy: 'Internal HR Verification', updatedBy: 'Sarah Williams', updatedDate: '2023-01-10', fileName: 'rtw_thompson.pdf', fileSize: '67 KB', comments: [{ author: 'Sarah Williams', date: '2023-01-10', text: 'UK citizen — automatic right to work confirmed.' }], history: [{ action: 'Verified', by: 'Sarah Williams', date: '2023-01-10', detail: 'Right to work confirmed via passport check.' }] },
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
  const [compSearch,       setCompSearch]       = useState('');
  const [compCategory,     setCompCategory]     = useState('All Categories');
  const [compStatus,       setCompStatus]       = useState('All Status');
  const [compShowArchived, setCompShowArchived] = useState(false);
  const [expandedHistory, setExpandedHistory] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState([
    { id: 1, date: '1 Jun 2026', time: '09:00', author: 'James Mitchell', role: 'Care Manager', note: 'Completed induction training. Very proactive during onboarding — demonstrated strong understanding of safeguarding protocols.', type: 'General', archived: false },
    { id: 2, date: '10 Jun 2026', time: '14:30', author: 'Admin Manager', role: 'Administrator', note: 'Requested additional safeguarding training — approved for the next available cohort in July.', type: 'Review', archived: false },
  ]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [noteForm, setNoteForm] = useState({ note: '', type: 'General', author: 'Admin Manager', role: 'Administrator' });
  const [showArchived, setShowArchived] = useState(false);
  const getFormattedDateTime = () => {
    const now = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return { date: `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`, time: `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}` };
  };
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
    { key: 'notes', label: 'Notes' },
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
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-5 transition-colors font-medium"
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
                  <h1 className="text-2xl font-semibold text-gray-900">{staff.name}</h1>
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
                <div className="text-2xl font-bold text-gray-900">{staff.contractedHours}h</div>
                <div className="text-xs text-gray-500">Contracted</div>
              </div>
              <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[80px]">
                <div className="text-2xl font-bold text-emerald-600">{staff.actualHours}h</div>
                <div className="text-xs text-gray-500">Actual (Wk)</div>
              </div>
              <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[80px]">
                <div className="text-2xl font-bold text-blue-600">{staff.complianceRate}%</div>
                <div className="text-xs text-gray-500">Compliance</div>
              </div>
              <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[80px]">
                <div className="text-2xl font-bold text-purple-600">{staff.daysEmployed}</div>
                <div className="text-xs text-gray-500">Days Employed</div>
              </div>
              <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[80px]">
                <div className="text-2xl font-bold text-teal-600">{staff.annualLeaveHours}h</div>
                <div className="text-xs text-gray-500">Annual Entitlement</div>
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
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase size={16} className="text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-900">Employment Information</h3>
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
                    <div className="text-sm text-gray-900">{staff.lineManager}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Contract Type</div>
                    <div className="text-sm text-gray-900">{staff.contractType}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Payroll Number</div>
                    <div className="text-sm text-gray-900">{staff.payrollNumber}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Next Appraisal</div>
                    <div className="text-sm font-medium text-blue-600">{staff.nextAppraisal}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Contract End Date</div>
                    <div className="text-sm text-gray-900">{staff.contractEndDate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Weekly Hours</div>
                    <div className="text-sm text-gray-900">{staff.contractedHours}h</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Next of Kin</div>
                    <div className="text-sm text-gray-900">{staff.nextOfKin}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Next of Kin Phone</div>
                    <div className="text-sm text-gray-900">{staff.nextOfKinPhone}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Emergency Contact</div>
                    <div className="text-sm text-gray-900">{staff.emergencyContact}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Emergency Phone</div>
                    <div className="text-sm text-gray-900">{staff.emergencyPhone}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Bank Reference</div>
                    <div className="text-sm text-gray-900 font-mono">{staff.bankReference}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Rate / Pay</div>
                    <div className="text-sm text-gray-900 font-medium">
                      {staff.rateAmount
                        ? `£${Number(staff.rateAmount).toFixed(2)}${staff.rateType === 'monthly' ? '/month' : '/hour'}`
                        : 'Not specified'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={16} className="text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-900">Key Qualifications</h3>
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

            {/* ===== Leave Entitlement ===== */}
            {(() => {
              const max = staff.annualLeaveHours || 0;
              const used = leaveUsedHours;
              const pending = leavePendingHours;
              const remaining = Math.max(0, max - used);
              const usedPct = max > 0 ? Math.min(100, (used / max) * 100) : 0;
              const pendingPct = max > 0 ? Math.min(100 - usedPct, (pending / max) * 100) : 0;
              const status = remaining <= 0 ? 'exceeded' : remaining < max * 0.15 ? 'low' : 'healthy';
              const statusCfg = {
                healthy:  { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Healthy balance' },
                low:      { color: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-200',   label: 'Low balance' },
                exceeded: { color: 'text-red-600',     bg: 'bg-red-50',     border: 'border-red-200',     label: 'Entitlement exceeded' },
              }[status];

              return (
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarRange size={16} className="text-gray-500" />
                      <h3 className="text-sm font-semibold text-gray-900">Leave Entitlement</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.color} ${statusCfg.border}`}>
                        {statusCfg.label}
                      </span>
                    </div>
                    <button
                      onClick={() => setCurrentPage('leave-requests')}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Manage leave →
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="text-center px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-xl font-bold text-teal-600">{max}h</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">Maximum</div>
                    </div>
                    <div className="text-center px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-xl font-bold text-blue-600">{used}h</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">Used</div>
                    </div>
                    <div className="text-center px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-xl font-bold text-amber-600">{pending}h</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">Pending</div>
                    </div>
                    <div className="text-center px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-100">
                      <div className={`text-xl font-bold ${remaining <= 0 ? 'text-red-600' : 'text-emerald-600'}`}>{remaining}h</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">Remaining</div>
                    </div>
                  </div>

                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-gray-500">{max > 0 ? `${Math.round(usedPct)}% used${pendingPct > 0 ? ` · ${Math.round(pendingPct)}% pending` : ''}` : 'No entitlement set'}</span>
                    <span className="text-gray-400">{used + pending} / {max}h</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
                    <div className="bg-blue-500 h-full transition-all" style={{ width: `${usedPct}%` }} />
                    <div className="bg-amber-400 h-full transition-all" style={{ width: `${pendingPct}%` }} />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2">Approved leave is deducted automatically. Update the maximum via Edit Profile → Contract & Hours.</p>
                </div>
              );
            })()}

            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-900">Next Shifts</h3>
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
                  <div key={shift.id} className="border border-blue-100 bg-blue-50/40 rounded-xl p-4">
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
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-gray-500" />
                  <h2 className="text-sm font-semibold text-gray-900">Upcoming Schedule</h2>
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
                  <button className="flex items-center gap-2 text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
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
        {activeTab === 'compliance' && (() => {
          const validCount    = documents.filter((d:any) => d.status === 'valid').length;
          const expiringCount = documents.filter((d:any) => d.status === 'expiring').length;
          const expiredCount  = documents.filter((d:any) => d.status === 'expired').length;
          const requiredCount = documents.filter((d:any) => d.mandatory).length;
          const totalCount    = documents.length;
          const scorePercent  = totalCount ? Math.round((validCount / totalCount) * 100) : 0;
          const circumference = 2 * Math.PI * 28;

          const allCategories = Array.from(new Set(documents.map((d:any) => d.category || 'Other'))) as string[];

          const filtered = documents.filter((d:any) => {
            const q = compSearch.toLowerCase();
            const matchSearch = !q || d.name?.toLowerCase().includes(q) || d.reference?.toLowerCase().includes(q) || d.awardedBy?.toLowerCase().includes(q);
            const matchCat    = compCategory === 'All Categories' || (d.category || 'Other') === compCategory;
            const matchStatus = compStatus === 'All Status' || d.status === compStatus.toLowerCase();
            const matchArch   = compShowArchived ? true : !d.archived;
            return matchSearch && matchCat && matchStatus && matchArch;
          });

          const visibleCategories = allCategories.filter(cat => filtered.some((d:any) => (d.category || 'Other') === cat));

          const statusBadge = (s: string) => {
            if (s === 'valid')    return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Valid</span>;
            if (s === 'expiring') return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Expiring Soon</span>;
            if (s === 'expired')  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">Expired</span>;
            return                       <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">Pending</span>;
          };

          return (
            <div className="space-y-4">
              {/* ── Score + stats bar ── */}
              <div className="bg-white rounded-xl border border-gray-100 px-6 py-5 flex items-center gap-8">
                {/* Circular score */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#10b981" strokeWidth="6"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (scorePercent / 100) * circumference}
                        strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">{scorePercent}%</span>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-900">Overall Compliance Score</div>
                    <div className="text-xs text-gray-500 mt-0.5">{validCount} of {totalCount} documents valid</div>
                  </div>
                </div>

                <div className="h-10 w-px bg-gray-100" />

                {/* Stats */}
                <div className="flex items-center gap-8 flex-1">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{validCount}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Valid</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-500">{expiringCount}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Expiring Soon</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500">{expiredCount}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Expired</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-700">{requiredCount}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Required</div>
                  </div>
                </div>

                <button
                  onClick={() => setShowAddDocModal(true)}
                  className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shrink-0"
                >
                  <Plus size={13} /> Add Document
                </button>
              </div>

              {/* ── Search / filter bar ── */}
              <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[180px]">
                  <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={compSearch}
                    onChange={e => setCompSearch(e.target.value)}
                    placeholder="Search documents, references, awarding bodies..."
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 bg-gray-50"
                  />
                </div>
                <select value={compCategory} onChange={e => setCompCategory(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 bg-white text-gray-700">
                  <option>All Categories</option>
                  {allCategories.map(c => <option key={c}>{c}</option>)}
                </select>
                <select value={compStatus} onChange={e => setCompStatus(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 bg-white text-gray-700">
                  <option>All Status</option>
                  <option value="valid">Valid</option>
                  <option value="expiring">Expiring Soon</option>
                  <option value="expired">Expired</option>
                  <option value="pending">Pending</option>
                </select>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                  <input type="checkbox" checked={compShowArchived} onChange={e => setCompShowArchived(e.target.checked)} className="rounded" />
                  Show Archived
                </label>
                <span className="text-xs text-gray-400 ml-auto">{filtered.length} document{filtered.length !== 1 ? 's' : ''}</span>
              </div>

              {/* ── Category groups ── */}
              {visibleCategories.map(cat => {
                const catDocs = filtered.filter((d:any) => (d.category || 'Other') === cat);
                return (
                  <div key={cat}>
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <span className="text-xs font-semibold text-gray-700">{cat}</span>
                      <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-[11px] font-bold flex items-center justify-center">{catDocs.length}</span>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
                      {catDocs.map((doc:any) => {
                        const histOpen = !!expandedHistory[doc.id];
                        return (
                        <div key={doc.id} className="transition-colors">
                          <div className="px-5 py-3.5 hover:bg-gray-50/40 flex items-start gap-3">
                            {/* Status icon */}
                            <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                              doc.status === 'expired'  ? 'bg-red-100'    :
                              doc.status === 'expiring' ? 'bg-amber-100'  : 'bg-emerald-100'
                            }`}>
                              {doc.status === 'expired' || doc.status === 'expiring'
                                ? <AlertCircle size={13} className={doc.status === 'expired' ? 'text-red-500' : 'text-amber-500'} />
                                : <CheckCircle2 size={13} className="text-emerald-500" />}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-semibold text-gray-900">{doc.name}</span>
                                {doc.mandatory
                                  ? <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">Required</span>
                                  : <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-500">Optional</span>}
                                {statusBadge(doc.status)}
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 flex-wrap">
                                {doc.awardedBy && <span>Awarded: <span className="text-gray-600">{doc.awardedBy}</span></span>}
                                {doc.expiryDate && doc.expiryDate !== 'N/A' && <><span className="text-gray-200">·</span><span className={doc.status === 'expired' ? 'text-red-500 font-medium' : doc.status === 'expiring' ? 'text-amber-500 font-medium' : ''}>Expires: {doc.expiryDate}</span></>}
                                {doc.fileName   && <><span className="text-gray-200">·</span><button className="flex items-center gap-1 text-blue-500 hover:text-blue-700 hover:underline underline-offset-2 transition-colors font-normal"><FileText size={11} />{doc.fileName}{doc.fileSize && ` (${doc.fileSize})`}</button></>}
                              </div>
                              <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400 flex-wrap">
                                {doc.uploadedDate && <span>Uploaded: {doc.uploadedDate}</span>}
                                {doc.updatedBy && doc.updatedDate && <><span className="text-gray-200">·</span><span>Updated by <span className="text-gray-600">{doc.updatedBy}</span> on {doc.updatedDate}</span></>}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 shrink-0 mt-0.5">
                              <button className="p-1 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download"><Download size={12} /></button>
                              <button onClick={() => setSelectedDocForView(doc)} className="p-1 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"><Edit size={12} /></button>
                              <button
                                onClick={() => {
                                  setSelectedDocForRenew(doc);
                                  setRenewDocForm({ issuedDate: new Date().toISOString().split('T')[0], expiryDate: new Date(new Date().setFullYear(new Date().getFullYear()+1)).toISOString().split('T')[0], fileName: '', fileSize: '' });
                                }}
                                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                              >
                                <RotateCcw size={12} /> Renew
                              </button>
                              <button
                                onClick={() => setExpandedHistory(prev => ({ ...prev, [doc.id]: !prev[doc.id] }))}
                                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border rounded-lg transition-colors ${
                                  histOpen ? 'text-blue-700 border-blue-300 bg-blue-50' : 'text-blue-600 border-blue-200 hover:bg-blue-50'
                                }`}
                              >
                                <Clock size={12} /> History
                                <ChevronDown size={11} className={`transition-transform ${histOpen ? 'rotate-180' : ''}`} />
                              </button>
                              <button
                                onClick={() => setDocuments(prev => prev.filter((d:any) => d.id !== doc.id))}
                                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>

                          {/* Expandable history panel */}
                          {histOpen && (
                            <div className="mx-5 mb-3.5 border border-gray-100 rounded-xl bg-gray-50 overflow-hidden">
                              <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
                                <Clock size={13} className="text-gray-400" />
                                <span className="text-xs font-semibold text-gray-600">Document History</span>
                              </div>
                              {doc.history && doc.history.length > 0 ? (
                                <ul className="divide-y divide-gray-100">
                                  {doc.history.map((h: any, i: number) => (
                                    <li key={i} className="px-4 py-3 flex items-start gap-3">
                                      <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-[9px] font-bold text-gray-400">{String(i + 1).padStart(2,'0')}</span>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs font-semibold text-gray-700">{h.action}</span>
                                          <span className="text-gray-300 text-xs">·</span>
                                          <span className="text-xs text-gray-500">{h.by}</span>
                                          <span className="text-gray-300 text-xs">·</span>
                                          <span className="text-xs text-gray-400">{h.date}</span>
                                        </div>
                                        {h.detail && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{h.detail}</p>}
                                        {h.fileName && <p className="text-xs text-blue-500 mt-0.5 flex items-center gap-1"><FileText size={10} />{h.fileName}</p>}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="px-4 py-4 text-xs text-gray-400">No history recorded.</p>
                              )}
                            </div>
                          )}
                        </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
                  <FileText size={32} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">No documents match your filters.</p>
                </div>
              )}
            </div>
          );
        })()}

        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-900">Notes & Activity</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowArchived(!showArchived)}
                    className={`px-3 py-1.5 text-xs border rounded-lg transition-colors flex items-center gap-1.5 ${showArchived ? 'bg-amber-50 border-amber-200 text-amber-700 font-medium' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    {showArchived ? 'Show Active' : 'Show Archived'}
                  </button>
                  <button
                    onClick={() => {
                      setNoteForm({ note: '', type: 'General', author: 'Admin Manager', role: 'Administrator' });
                      setShowAddNote(true);
                    }}
                    className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <Plus size={14} /> Add Note
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {notes
                  .filter(note => showArchived ? note.archived : !note.archived)
                  .map((note) => (
                    <div key={note.id} className={`border rounded-xl p-4 transition-all ${note.archived ? 'border-amber-100 bg-amber-50/20' : 'border-gray-100 bg-white'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-700 font-bold">
                            {note.author.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-900">{note.author}</span>
                            <span className="text-xs text-gray-400 ml-2">{note.role}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500 font-medium">{note.type}</span>
                          <span className="text-xs text-gray-400">{note.date} at {note.time}</span>
                          <div className="flex items-center gap-1.5 ml-2 border-l pl-3 border-gray-100">
                            <button
                              onClick={() => {
                                setSelectedNote(note);
                                setNoteForm({ note: note.note, type: note.type, author: note.author, role: note.role });
                                setShowEditNote(true);
                              }}
                              className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit Note"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => setNotes(notes.map(n => n.id === note.id ? { ...n, archived: !n.archived } : n))}
                              className={`p-1 rounded transition-colors ${note.archived ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-400 hover:text-amber-600 hover:bg-amber-50'}`}
                              title={note.archived ? 'Restore Note' : 'Archive Note'}
                            >
                              {note.archived ? <Plus size={14} /> : <Archive size={14} />}
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{note.note}</p>
                    </div>
                  ))}
                {notes.filter(note => showArchived ? note.archived : !note.archived).length === 0 && (
                  <div className="text-center py-8 text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                    No {showArchived ? 'archived' : 'active'} notes found.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] flex flex-col">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <MessageSquare size={17} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900">Add Note</h2>
                <p className="text-xs text-gray-500">{staff.name}</p>
              </div>
              <button onClick={() => setShowAddNote(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Author Name *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white" value={noteForm.author} onChange={e => setNoteForm(f => ({ ...f, author: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Author Role *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white" value={noteForm.role} onChange={e => setNoteForm(f => ({ ...f, role: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Note Type *</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white" value={noteForm.type} onChange={e => setNoteForm(f => ({ ...f, type: e.target.value }))}>
                  <option>General</option>
                  <option>Review</option>
                  <option>Performance</option>
                  <option>Disciplinary</option>
                  <option>Training</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Note Content *</label>
                <textarea rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white resize-none" placeholder="Enter details of the note..." value={noteForm.note} onChange={e => setNoteForm(f => ({ ...f, note: e.target.value }))} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 shrink-0 bg-gray-50/50">
              <button onClick={() => setShowAddNote(false)} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white text-gray-700">Cancel</button>
              <button
                disabled={!noteForm.note || !noteForm.author || !noteForm.role}
                onClick={() => {
                  const { date, time } = getFormattedDateTime();
                  setNotes(prev => [{ id: Date.now(), date, time, author: noteForm.author, role: noteForm.role, note: noteForm.note, type: noteForm.type, archived: false }, ...prev]);
                  setShowAddNote(false);
                }}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >Add Note</button>
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
                <h2 className="text-base text-gray-900 font-semibold">Add Compliance Document</h2>
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
                  value={['Qualification', 'Training', 'ID & Right to Work'].includes(addDocForm.type) ? addDocForm.type : 'Other'}
                  onChange={e => setAddDocForm(f => ({ ...f, type: e.target.value === 'Other' ? '' : e.target.value }))}
                >
                  <option value="Qualification">Qualification</option>
                  <option value="Training">Training</option>
                  <option value="ID & Right to Work">ID & Right to Work</option>
                  <option value="Other">Other</option>
                </select>
                {!['Qualification', 'Training', 'ID & Right to Work'].includes(addDocForm.type) && (
                  <input
                    type="text"
                    required
                    placeholder="Specify other document type..."
                    className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={addDocForm.type}
                    onChange={e => setAddDocForm(f => ({ ...f, type: e.target.value }))}
                  />
                )}
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
      {/* Edit Note Modal */}
      {showEditNote && selectedNote && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] flex flex-col">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <MessageSquare size={17} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900">Edit Note</h2>
                <p className="text-xs text-gray-500">{staff.name}</p>
              </div>
              <button onClick={() => setShowEditNote(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Author Name *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white" value={noteForm.author} onChange={e => setNoteForm(f => ({ ...f, author: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Author Role *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white" value={noteForm.role} onChange={e => setNoteForm(f => ({ ...f, role: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Note Type *</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white" value={noteForm.type} onChange={e => setNoteForm(f => ({ ...f, type: e.target.value }))}>
                  <option>General</option>
                  <option>Review</option>
                  <option>Performance</option>
                  <option>Disciplinary</option>
                  <option>Training</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Note Content *</label>
                <textarea rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white resize-none" value={noteForm.note} onChange={e => setNoteForm(f => ({ ...f, note: e.target.value }))} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 shrink-0 bg-gray-50/50">
              <button onClick={() => setShowEditNote(false)} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white text-gray-700">Cancel</button>
              <button
                disabled={!noteForm.note || !noteForm.author || !noteForm.role}
                onClick={() => {
                  setNotes(prev => prev.map(n => n.id === selectedNote.id ? { ...n, author: noteForm.author, role: noteForm.role, note: noteForm.note, type: noteForm.type } : n));
                  setShowEditNote(false);
                }}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >Save Changes</button>
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
