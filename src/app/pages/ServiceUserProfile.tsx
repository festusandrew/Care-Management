import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Badge } from '../components/Badge';
import { QuickLogModal } from '../components/QuickLogModal';
import { EditServiceUserModal } from '../components/EditServiceUserModal';
import { ScheduleAppointmentModal } from '../components/ScheduleAppointmentModal';
import { AddMedicationModal } from '../components/AddMedicationModal';
import { ReportIncidentModal } from '../components/ReportIncidentModal';
import { useState } from 'react';
import {
  ArrowLeft,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  FileText,
  Pill,
  Activity,
  Clock,
  Edit,
  Plus,
  ChevronRight,
  ChevronLeft,
  Download,
  Share2,
  Heart,
  Shield,
  CheckCircle,
  AlertTriangle,
  Star,
  GraduationCap,
  Briefcase,
  ClipboardList,
  MessageSquare,
  Eye,
  Upload,
  XCircle,
  TrendingUp,
  Smile,
  Meh,
  Frown,
  Stethoscope,
  UserCheck,
  Users,
  PoundSterling,
  Building2,
  Hash,
  LogIn,
  LogOut,
  Timer,
  X,
  Save,
  ChevronDown,
  Archive
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ProfileTab = 'overview' | 'care-support' | 'medical' | 'daily-logs' | 'incidents' | 'documents' | 'finances' | 'notes';
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
type RiskAssessment = { id: number; area: string; level: RiskLevel; lastAssessed: string; nextDue: string; assessedBy: string; notes: string; };

interface ServiceUserProfileProps {
  userId: number;
  onBack: () => void;
}

export function ServiceUserProfile({ userId, onBack }: ServiceUserProfileProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [showReportIncident, setShowReportIncident] = useState(false);
  const [showScheduleAppointment, setShowScheduleAppointment] = useState(false);
  const [showLogVisit, setShowLogVisit] = useState(false);
  const [visitForm, setVisitForm] = useState({ visitorName: '', relation: '', date: '', timeIn: '', timeOut: '', purpose: '', signedInBy: '', notes: '' });

  type VisitLog = { id: number; visitorName: string; relation: string; date: string; timeIn: string; timeOut: string; hours: number; purpose: string; signedInBy: string; notes: string; };
  const [visitLogs, setVisitLogs] = useState<VisitLog[]>([
    { id: 1, visitorName: 'Jane Johnson',   relation: 'Mother', date: '9 Jun 2026',  timeIn: '14:00', timeOut: '16:30', hours: 2.5, purpose: 'Family visit',          signedInBy: 'Mary Thompson',  notes: 'Brought personal items. Positive visit.' },
    { id: 2, visitorName: 'Robert Johnson', relation: 'Father', date: '5 Jun 2026',  timeIn: '10:00', timeOut: '12:00', hours: 2.0, purpose: 'Family visit',          signedInBy: 'John Davies',    notes: '' },
    { id: 3, visitorName: 'Anna Clarke',    relation: 'Aunt',   date: '28 May 2026', timeIn: '15:30', timeOut: '17:00', hours: 1.5, purpose: 'Birthday celebration',  signedInBy: 'Mary Thompson',  notes: 'Brought birthday gifts. Very cheerful visit.' },
    { id: 4, visitorName: 'Jane Johnson',   relation: 'Mother', date: '22 May 2026', timeIn: '13:00', timeOut: '15:30', hours: 2.5, purpose: 'Support visit',         signedInBy: 'Sarah Williams', notes: 'Discussed care plan progress with staff.' },
    { id: 5, visitorName: 'Robert Johnson', relation: 'Father', date: '10 May 2026', timeIn: '11:00', timeOut: '13:30', hours: 2.5, purpose: 'Family visit',          signedInBy: 'John Davies',    notes: 'Brought new clothes and books.' },
    { id: 6, visitorName: 'Jane Johnson',   relation: 'Mother', date: '2 May 2026',  timeIn: '14:30', timeOut: '16:00', hours: 1.5, purpose: 'Support visit',         signedInBy: 'Mary Thompson',  notes: 'Attended key-worker review meeting.' },
    { id: 7, visitorName: 'Anna Clarke',    relation: 'Aunt',   date: '18 Apr 2026', timeIn: '12:00', timeOut: '14:00', hours: 2.0, purpose: 'Family visit',          signedInBy: 'Sarah Williams', notes: '' },
    { id: 8, visitorName: 'Jane Johnson',   relation: 'Mother', date: '5 Apr 2026',  timeIn: '15:00', timeOut: '17:30', hours: 2.5, purpose: 'Family visit',          signedInBy: 'John Davies',    notes: 'Easter weekend visit. Brought flowers and a card.' },
  ]);

  const calcHours = (timeIn: string, timeOut: string) => {
    if (!timeIn || !timeOut) return 0;
    const [ih, im] = timeIn.split(':').map(Number);
    const [oh, om] = timeOut.split(':').map(Number);
    return Math.max(0, parseFloat(((oh * 60 + om - ih * 60 - im) / 60).toFixed(1)));
  };

  const submitVisitLog = () => {
    if (!visitForm.visitorName || !visitForm.date || !visitForm.timeIn || !visitForm.timeOut) return;
    setVisitLogs(logs => [{
      id: Date.now(),
      ...visitForm,
      hours: calcHours(visitForm.timeIn, visitForm.timeOut),
    }, ...logs]);
    setVisitForm({ visitorName: '', relation: '', date: '', timeIn: '', timeOut: '', purpose: '', signedInBy: '', notes: '' });
    setShowLogVisit(false);
  };

  const user = {
    id: 1,
    name: 'Sarah Johnson',
    age: 14,
    dateOfBirth: '12 March 2011',
    photo: 'SJ',
    status: 'active',
    riskLevel: 'amber' as const,
    currentMood: 'happy' as const,
    location: 'Riverside House',
    roomNumber: 'Room 12A',
    careManager: 'Dr. Emily Carter',
    keyWorker: 'Mary Thompson',
    phone: '07700 900123',
    email: 'sarah.johnson@care.example',
    emergencyContact: 'Jane Johnson (Mother)',
    emergencyPhone: '07700 900999',
    emergencyRelation: 'Mother',
    admissionDate: '15 January 2024',
    lastReview: '1 November 2025',
    nextReview: '11 March 2026',
    nhsNumber: '943 476 5919',
    localAuthority: 'Bristol City Council',
    socialWorker: 'Rebecca Holmes',
    conditions: ['Autism Spectrum Disorder', 'Generalised Anxiety Disorder'],
    allergies: ['Peanuts', 'Penicillin'],
    referenceNumber: 'SU-0001',
    joinedDate: '2024-01-15',
    nationality: 'British',
    bloodType: 'A+',
    dnacpr: 'Not Applicable',
    address: '14 Elm Street, Bristol, BS1 4RG',

    // Next of kin
    nextOfKin: { name: 'Jane Johnson', relation: 'Mother', phone: '07700 900999', email: 'jane.johnson@email.com', address: '14 Elm Street, Bristol, BS1 4RG' },

    // GP
    gp: { name: 'Dr. Andrew Walsh', practice: 'Riverside Medical Centre', phone: '0117 555 1234', email: 'reception@riversidemedical.nhs.uk', address: '45 Bridge Road, Bristol, BS2 0QT' },

    // Personal carer
    personalCarer: { name: 'Mary Thompson', agency: 'MpoweredCare', phone: '07700 900123', email: 'm.thompson@mpoweredcare.com' },

    // Visitors
    visitors: [
      { name: 'Jane Johnson',  relation: 'Mother', phone: '07700 900999' },
      { name: 'Robert Johnson', relation: 'Father', phone: '07700 900888' },
      { name: 'Anna Clarke',   relation: 'Aunt',   phone: '07700 900777' },
    ],

    // Funding
    funderType: 'Local Authority',
    funderName: 'Bristol City Council',
    funderRef: 'BCC-2024-0047',
    weeklyRate: 1250,
  };

  const stats = {
    daysInCare: 402,
    careRating: 4.8,
    compliance: 96,
    planCompletion: 88,
  };

  const moodTrend = [
    { date: 'Mon', mood: 7 },
    { date: 'Tue', mood: 6 },
    { date: 'Wed', mood: 8 },
    { date: 'Thu', mood: 7 },
    { date: 'Fri', mood: 9 },
    { date: 'Sat', mood: 8 },
    { date: 'Sun', mood: 8 },
  ];

  const [carePlans, setCarePlans] = useState([
    { id: 1, name: 'Emotional Wellbeing & Mental Health', status: 'active', lastReviewed: '1 Nov 2025', nextReview: '1 Feb 2026', progress: 75, createdBy: 'Dr. Emily Carter', goals: 'Reduce anxiety episodes. Build coping strategies.', frequency: 'Weekly review' },
    { id: 2, name: 'Social Skills & Communication',       status: 'active', lastReviewed: '15 Oct 2025', nextReview: '15 Jan 2026', progress: 60, createdBy: 'Sarah Williams',   goals: 'Improve peer interaction. Develop communication strategies.', frequency: 'Fortnightly review' },
    { id: 3, name: 'Education & Learning',                status: 'active', lastReviewed: '20 Oct 2025', nextReview: '20 Jan 2026', progress: 85, createdBy: 'James Mitchell',   goals: 'Engage in education 5 days per week. Complete EHCP targets.', frequency: 'Monthly review' },
    { id: 4, name: 'Physical Health & Nutrition',         status: 'active', lastReviewed: '5 Nov 2025',  nextReview: '5 Feb 2026',  progress: 90, createdBy: 'Dr. Emily Carter', goals: 'Maintain healthy diet. Regular physical activity.', frequency: 'Monthly review' },
  ]);

  const [showCreateCarePlan, setShowCreateCarePlan] = useState(false);
  const [carePlanForm, setCarePlanForm] = useState({ name: '', customName: '', goals: '', frequency: '', createdBy: '', startDate: '', nextReview: '', notes: '' });

  const CARE_PLAN_TEMPLATES = [
    'Emotional Wellbeing & Mental Health',
    'Social Skills & Communication',
    'Education & Learning',
    'Physical Health & Nutrition',
    'Personal Care & Hygiene',
    'Positive Behaviour Support',
    'Medication Management',
    'Community Participation',
    'Transition Planning',
    'Other (custom)',
  ];

  const submitCarePlan = () => {
    if ((!editingCarePlan && !carePlanForm.startDate) || (!carePlanForm.name && !carePlanForm.customName)) return;
    const name = carePlanForm.name === 'Other (custom)' ? carePlanForm.customName : carePlanForm.name;
    const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    if (editingCarePlan) {
      setCarePlans(ps => ps.map(p => p.id === editingCarePlan.id ? {
        ...p,
        name,
        lastReviewed: carePlanForm.startDate ? fmt(carePlanForm.startDate) : p.lastReviewed,
        nextReview: carePlanForm.nextReview ? fmt(carePlanForm.nextReview) : p.nextReview,
        createdBy: carePlanForm.createdBy || p.createdBy,
        goals: carePlanForm.goals,
        frequency: carePlanForm.frequency,
      } : p));
      setEditingCarePlan(null);
    } else {
      setCarePlans(ps => [{
        id: Date.now(),
        name,
        status: 'active',
        lastReviewed: fmt(carePlanForm.startDate),
        nextReview: carePlanForm.nextReview ? fmt(carePlanForm.nextReview) : '—',
        progress: 0,
        createdBy: carePlanForm.createdBy,
        goals: carePlanForm.goals,
        frequency: carePlanForm.frequency,
      }, ...ps]);
    }
    setCarePlanForm({ name: '', customName: '', goals: '', frequency: '', createdBy: '', startDate: '', nextReview: '', notes: '' });
    setShowCreateCarePlan(false);
  };

  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>([
    { id: 1, area: 'Self-Harm',              level: 'low',    lastAssessed: '1 Nov 2025',  nextDue: '1 Feb 2026',  assessedBy: 'Dr. Emily Carter', notes: 'No current indicators. Monitor regularly.' },
    { id: 2, area: 'Absconding',             level: 'medium', lastAssessed: '15 Oct 2025', nextDue: '15 Jan 2026', assessedBy: 'Mary Thompson',    notes: 'History of leaving without notice. Door alarm in place.' },
    { id: 3, area: 'Emotional Dysregulation',level: 'medium', lastAssessed: '20 Oct 2025', nextDue: '20 Jan 2026', assessedBy: 'Sarah Williams',   notes: 'CBT techniques in use. Responds well to grounding.' },
    { id: 4, area: 'Peer Conflict',          level: 'low',    lastAssessed: '5 Nov 2025',  nextDue: '5 Feb 2026',  assessedBy: 'Mary Thompson',    notes: 'Occasional tension with peers. Staff supervision ongoing.' },
  ]);

  const [showAddRisk, setShowAddRisk] = useState(false);
  const [riskForm, setRiskForm] = useState({ area: '', customArea: '', level: '' as RiskLevel | '', assessedBy: '', lastAssessed: '', nextDue: '', notes: '' });

  const RISK_AREAS = ['Self-Harm', 'Absconding', 'Emotional Dysregulation', 'Peer Conflict', 'Falls', 'Medication Non-compliance', 'Aggression', 'Substance Misuse', 'Financial Exploitation', 'Other'];

  const submitRiskAssessment = () => {
    if (!riskForm.level || (!riskForm.area && !riskForm.customArea) || !riskForm.lastAssessed) return;
    const area = riskForm.area === 'Other' ? riskForm.customArea : riskForm.area;
    const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    setRiskAssessments(rs => [{
      id: Date.now(),
      area,
      level: riskForm.level as RiskLevel,
      lastAssessed: fmt(riskForm.lastAssessed),
      nextDue: riskForm.nextDue ? fmt(riskForm.nextDue) : '—',
      assessedBy: riskForm.assessedBy,
      notes: riskForm.notes,
    }, ...rs]);
    setRiskForm({ area: '', customArea: '', level: '', assessedBy: '', lastAssessed: '', nextDue: '', notes: '' });
    setShowAddRisk(false);
  };

  const [medications, setMedications] = useState([
    { id: 1, name: 'Sertraline', dosage: '50mg', frequency: 'Once daily (morning)', prescribedBy: 'Dr. Emily Carter', startDate: '15 Jan 2024', notes: 'For anxiety management', status: 'active' },
    { id: 2, name: 'Melatonin', dosage: '3mg', frequency: 'Once daily (evening)', prescribedBy: 'Dr. Emily Carter', startDate: '20 Feb 2024', notes: 'Sleep aid', status: 'active' },
  ]);

  const handleSaveMedications = (entries: any[]) => {
    const newMeds = entries.map(entry => ({
      id: Date.now() + Math.random(),
      name: entry.name,
      dosage: entry.dosage,
      frequency: entry.frequency,
      prescribedBy: entry.prescribedBy || 'Dr. Emily Carter',
      startDate: entry.startDate ? new Date(entry.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      notes: entry.notes || entry.specialInstructions || '',
      status: 'active',
    }));
    setMedications(prev => [...prev, ...newMeds]);
  };

  const recentLogs = [
    { id: 1, date: '24 Feb 2026', time: '14:30', type: 'Daily Log', mood: 'happy', behavior: 'Cooperative', notes: 'Participated well in group therapy. Showed improvement in social interactions.', staff: 'Mary Thompson' },
    { id: 2, date: '23 Feb 2026', time: '16:45', type: 'Medication', notes: 'Evening medication administered as prescribed. No adverse reactions.', staff: 'John Davies' },
    { id: 3, date: '23 Feb 2026', time: '10:15', type: 'Daily Log', mood: 'neutral', behavior: 'Withdrawn', notes: 'Quiet during breakfast. Requested alone time in room.', staff: 'Mary Thompson' },
    { id: 4, date: '22 Feb 2026', time: '11:00', type: 'Activity', notes: 'Attended art therapy session. Created a painting and appeared relaxed.', staff: 'Sarah Williams' },
    { id: 5, date: '21 Feb 2026', time: '09:00', type: 'Daily Log', mood: 'happy', behavior: 'Cheerful', notes: 'Good morning routine. Engaged well at breakfast with peers.', staff: 'Mary Thompson' },
  ];

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { id: 1, type: 'Psychiatric Review',        date: '28 Feb 2026', time: '10:00', with: 'Dr. Emily Carter', location: 'Medical Room',      color: 'blue' },
    { id: 2, type: 'Therapy Session',           date: '26 Feb 2026', time: '14:00', with: 'Sarah Williams',   location: 'Therapy Room 2',   color: 'purple' },
    { id: 3, type: 'Educational Assessment',    date: '3 Mar 2026',  time: '09:30', with: 'James Mitchell',   location: 'Learning Centre',  color: 'emerald' },
    { id: 4, type: 'Medication Review',         date: '10 Mar 2026', time: '11:00', with: 'Dr. Emily Carter', location: 'Medical Room',      color: 'blue' },
    { id: 5, type: 'LAC Review',                date: '15 Mar 2026', time: '14:30', with: 'Rebecca Holmes',   location: 'Conference Room',  color: 'amber' },
    { id: 6, type: 'Dentist Appointment',       date: '22 Mar 2026', time: '09:00', with: 'Dr. C. Patel',     location: 'Dental Clinic',    color: 'rose' },
  ]);

  // Visit Log pagination & filter state
  const VISIT_PER_PAGE = 3;
  const [visitPage, setVisitPage] = useState(1);
  const [visitFilter, setVisitFilter] = useState({ visitor: '', relation: '', purpose: '', from: '', to: '' });
  const CARE_PLAN_PER_PAGE = 3;
  const [carePlanPage, setCarePlanPage] = useState(1);
  const RISK_PER_PAGE = 5;
  const [riskPage, setRiskPage] = useState(1);
  const [editingCarePlan, setEditingCarePlan] = useState<any>(null);

  const filteredVisits = visitLogs.filter(v => {
    if (visitFilter.visitor  && !v.visitorName.toLowerCase().includes(visitFilter.visitor.toLowerCase()))  return false;
    if (visitFilter.relation && !v.relation.toLowerCase().includes(visitFilter.relation.toLowerCase()))    return false;
    if (visitFilter.purpose  && visitFilter.purpose !== v.purpose)                                         return false;
    if (visitFilter.from) {
      const vd = new Date(v.date); const fd = new Date(visitFilter.from);
      if (!isNaN(vd.getTime()) && !isNaN(fd.getTime()) && vd < fd) return false;
    }
    if (visitFilter.to) {
      const vd = new Date(v.date); const td = new Date(visitFilter.to);
      if (!isNaN(vd.getTime()) && !isNaN(td.getTime()) && vd > td) return false;
    }
    return true;
  });
  const totalVisitPages = Math.max(1, Math.ceil(filteredVisits.length / VISIT_PER_PAGE));
  const pagedVisits    = filteredVisits.slice((visitPage - 1) * VISIT_PER_PAGE, visitPage * VISIT_PER_PAGE);

  // Upcoming appointments pagination
  const APT_PER_PAGE = 3;
  const [aptPage, setAptPage] = useState(1);
  const totalAptPages = Math.max(1, Math.ceil(upcomingAppointments.length / APT_PER_PAGE));
  const pagedApts     = upcomingAppointments.slice((aptPage - 1) * APT_PER_PAGE, aptPage * APT_PER_PAGE);

  const [recentIncidents, setRecentIncidents] = useState([
    { id: 1, date: '18 Feb 2026', time: '19:45', severity: 'amber' as const, type: 'Anxiety Episode', description: 'Experienced anxiety attack during evening routine. Staff provided support and calming techniques.', actionTaken: 'One-on-one support provided. Care manager notified.', staff: 'John Davies', reference: 'INC-2026-042' },
    { id: 2, date: '10 Feb 2026', time: '15:20', severity: 'green' as const, type: 'Minor Conflict', description: 'Brief disagreement with peer during group activity.', actionTaken: 'Mediation provided. Issue resolved amicably.', staff: 'Mary Thompson', reference: 'INC-2026-038' },
  ]);

  const handleReportIncidentConfirm = (data: any) => {
    const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const newIncident = {
      id: Date.now(),
      date: data.date ? fmt(data.date) : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: data.time || new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      severity: data.severity || 'low',
      type: data.type || 'Other',
      description: data.description || '',
      actionTaken: data.actionTaken || '',
      staff: data.reportedBy || 'Staff Member',
      reference: `INC-2026-${Math.floor(100 + Math.random() * 900)}`
    };
    setRecentIncidents(prev => [newIncident, ...prev]);
  };

  const handleScheduleAppointmentConfirm = (data: any) => {
    const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const colors = ['blue', 'purple', 'emerald', 'amber', 'rose'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newApt = {
      id: Date.now(),
      type: data.type || 'Other',
      date: data.date ? fmt(data.date) : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: data.time || '10:00',
      with: data.withPerson || 'Staff Member',
      location: data.location || 'Medical Room',
      color: randomColor
    };
    setUpcomingAppointments(prev => [newApt, ...prev]);
  };
  const [hospitalHistory, setHospitalHistory] = useState([
    { id: 1, hospital: 'Bristol Royal Infirmary', reason: 'Anxiety crisis — assessment and stabilisation', date: '14 Aug 2024', treatedBy: 'Dr. Priya Sharma, Consultant Psychiatrist' },
    { id: 2, hospital: 'Southmead Hospital', reason: 'Fracture of right wrist (sports injury)', date: '3 Mar 2023', treatedBy: 'Dr. Tom Ellis, Orthopaedic Surgeon' },
  ]);
  const [showAddTreatment, setShowAddTreatment] = useState(false);
  const [treatmentForm, setTreatmentForm] = useState({ hospital: '', reason: '', date: '', treatedBy: '' });
  const submitTreatment = () => {
    if (!treatmentForm.hospital || !treatmentForm.date) return;
    const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    setHospitalHistory(h => [{ id: Date.now(), ...treatmentForm, date: fmt(treatmentForm.date) }, ...h]);
    setTreatmentForm({ hospital: '', reason: '', date: '', treatedBy: '' });
    setShowAddTreatment(false);
  };

  // Payment history
  const [paymentHistory, setPaymentHistory] = useState([
    { id: 1, period: 'Jun 2026', amount: 5416.67, paidBy: 'Bristol City Council', ref: 'BCC-INV-0089', status: 'paid',    date: '1 Jun 2026' },
    { id: 2, period: 'May 2026', amount: 5416.67, paidBy: 'Bristol City Council', ref: 'BCC-INV-0082', status: 'paid',    date: '1 May 2026' },
    { id: 3, period: 'Apr 2026', amount: 5416.67, paidBy: 'Bristol City Council', ref: 'BCC-INV-0075', status: 'paid',    date: '1 Apr 2026' },
    { id: 4, period: 'Mar 2026', amount: 5416.67, paidBy: 'Bristol City Council', ref: 'BCC-INV-0068', status: 'paid',    date: '1 Mar 2026' },
    { id: 5, period: 'Feb 2026', amount: 5416.67, paidBy: 'Bristol City Council', ref: 'BCC-INV-0061', status: 'overdue', date: '1 Feb 2026' },
  ]);
  const [showLogPayment, setShowLogPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ period: '', amount: '', paidBy: '', ref: '', date: '', status: 'paid' });
  const [payPage, setPayPage] = useState(1);
  const PAY_PER_PAGE = 4;
  const totalPayPages = Math.ceil(paymentHistory.length / PAY_PER_PAGE);
  const pagedPayments = paymentHistory.slice((payPage - 1) * PAY_PER_PAGE, payPage * PAY_PER_PAGE);
  const submitPayment = () => {
    if (!paymentForm.period || !paymentForm.amount || !paymentForm.date) return;
    const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    setPaymentHistory(ps => [{ id: Date.now(), ...paymentForm, amount: parseFloat(paymentForm.amount), date: fmt(paymentForm.date) }, ...ps]);
    setPaymentForm({ period: '', amount: '', paidBy: '', ref: '', date: '', status: 'paid' });
    setPayPage(1);
    setShowLogPayment(false);
  };

  // Documents upload
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Initial Care Assessment', type: 'PDF', date: '15 Jan 2024', category: 'Assessment', uploadedBy: 'Dr. Emily Carter' },
    { id: 2, name: 'Consent Form - Medication', type: 'PDF', date: '15 Jan 2024', category: 'Consent', uploadedBy: 'Jane Johnson' },
    { id: 3, name: 'Education Health Care Plan (EHCP)', type: 'PDF', date: '20 Feb 2024', category: 'Education', uploadedBy: 'James Mitchell' },
    { id: 4, name: 'Safeguarding Referral', type: 'PDF', date: '10 Mar 2024', category: 'Safeguarding', uploadedBy: 'Rebecca Holmes' },
    { id: 5, name: 'LAC Review Minutes - Nov 2025', type: 'PDF', date: '1 Nov 2025', category: 'Review', uploadedBy: 'Dr. Emily Carter' },
    { id: 6, name: 'Placement Agreement', type: 'PDF', date: '15 Jan 2024', category: 'Legal', uploadedBy: 'Bristol City Council' },
  ]);
  const [showUploadDoc, setShowUploadDoc] = useState(false);
  const [uploadForm, setUploadForm] = useState({ name: '', category: 'Assessment', uploadedBy: '', notes: '' });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOverDoc, setIsDragOverDoc] = useState(false);
  const docInputRef = React.useRef<HTMLInputElement>(null);

  const handleDocFilePick = (file: File) => {
    setUploadedFile(file);
    if (!uploadForm.name) setUploadForm(f => ({ ...f, name: file.name.replace(/\.[^/.]+$/, '') }));
  };

  const submitDocUpload = () => {
    if (!uploadedFile && !uploadForm.name) return;
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const ext = uploadedFile ? uploadedFile.name.split('.').pop()?.toUpperCase() ?? 'FILE' : 'DOC';
    setDocuments(ds => [{ id: Date.now(), name: uploadForm.name || (uploadedFile?.name ?? 'Document'), type: ext, date: today, category: uploadForm.category, uploadedBy: uploadForm.uploadedBy || 'Admin' }, ...ds]);
    setUploadForm({ name: '', category: 'Assessment', uploadedBy: '', notes: '' });
    setUploadedFile(null);
    if (docInputRef.current) docInputRef.current.value = '';
    setShowUploadDoc(false);
  };

  const [notes, setNotes] = useState([
    { id: 1, date: '24 Feb 2026', time: '16:00', author: 'Mary Thompson', role: 'Key Worker', note: 'Sarah had an excellent day today. She engaged well in all activities and was supportive of her peers during group work. Continued positive progress with social skills.', type: 'General', archived: false },
    { id: 2, date: '22 Feb 2026', time: '10:30', author: 'Dr. Emily Carter', role: 'Care Manager', note: 'Reviewed care plan progress. Sarah is meeting most targets. Recommend continuing current approach with additional focus on anxiety management techniques.', type: 'Review', archived: false },
    { id: 3, date: '20 Feb 2026', time: '14:15', author: 'Sarah Williams', role: 'Therapist', note: 'Therapy session focused on cognitive behavioural techniques for managing anxiety triggers. Sarah showed good engagement and understanding.', type: 'Therapy', archived: false },
    { id: 4, date: '18 Feb 2026', time: '20:00', author: 'John Davies', role: 'Support Worker', note: 'Following anxiety episode, Sarah responded well to grounding techniques. She was able to self-regulate after 15 minutes with support.', type: 'Incident Follow-up', archived: false },
  ]);

  const [showAddNote, setShowAddNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [noteForm, setNoteForm] = useState({ note: '', type: 'General', author: 'Mary Thompson', role: 'Key Worker' });
  const [showArchived, setShowArchived] = useState(false);

  const getFormattedDateTime = () => {
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    return { date: dateStr, time: timeStr };
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile size={18} className="text-emerald-500" />;
      case 'neutral': return <Meh size={18} className="text-amber-500" />;
      case 'sad': return <Frown size={18} className="text-red-500" />;
      default: return <Smile size={18} className="text-gray-400" />;
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low':      return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Low</span>;
      case 'medium':   return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-amber-50 text-amber-700 border border-amber-200">Medium</span>;
      case 'high':     return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-red-50 text-red-700 border border-red-200">High</span>;
      case 'critical': return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-red-100 text-red-900 border border-red-400">Critical</span>;
      default: return null;
    }
  };

  const getProgressColor = (p: number) => {
    if (p >= 80) return 'bg-emerald-500';
    if (p >= 50) return 'bg-blue-500';
    return 'bg-amber-500';
  };

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: 'overview',    label: 'Overview' },
    { key: 'care-support', label: 'Care & Support' },
    { key: 'medical',     label: 'Medical & Medications' },
    { key: 'daily-logs',  label: 'Daily Logs' },
    { key: 'incidents',   label: 'Incidents & Safeguarding' },
    { key: 'documents',   label: 'Documents' },
    { key: 'finances',    label: 'Finances' },
    { key: 'notes',       label: 'Notes & Activity' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Service Users" />
      <TopBar />

      <main className="ml-0 md:ml-64 pt-20 px-4 md:px-8 pb-8 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Back Button */}
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-5 transition-colors">
            <ArrowLeft size={16} />
            Back to Service Users
          </button>

          {/* ===== PROFILE HEADER CARD ===== */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              {/* Left: Avatar + Info */}
              <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-2xl shrink-0">
                {user.photo}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl text-gray-900">{user.name}</h1>
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500">#{user.referenceNumber}</span>
                  {user.riskLevel === 'amber' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-amber-50 text-amber-700 border border-amber-200">Medium Risk</span>
                  )}
                  {user.riskLevel === 'red' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-red-50 text-red-700 border border-red-200">High Risk</span>
                  )}
                  {user.riskLevel === 'green' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Low Risk</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  Age {user.age} · Born {user.dateOfBirth} · {user.conditions.join(' · ')}
                </p>
                <div className="flex items-center gap-5 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gray-400" />
                    {user.location}, {user.roomNumber}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone size={14} className="text-gray-400" />
                    {user.phone}
                  </span>
                </div>
                <div className="flex items-center gap-5 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} className="text-gray-400" />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-gray-400" />
                    Admitted {user.admissionDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Stat Badges */}
            <div className="flex items-center gap-3">
              <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[80px]">
                <div className="text-xl text-gray-900">{stats.daysInCare}</div>
                <div className="text-xs text-gray-500">Days in Care</div>
              </div>
              <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[80px]">
                <div className="text-xl text-emerald-600">{stats.careRating}</div>
                <div className="text-xs text-gray-500">Care Rating</div>
              </div>
              <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[80px]">
                <div className="text-xl text-blue-600">{stats.compliance}%</div>
                <div className="text-xs text-gray-500">Compliance</div>
              </div>
              <div className="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[80px]">
                <div className="text-xl text-purple-600">{stats.planCompletion}%</div>
                <div className="text-xs text-gray-500">Plan Progress</div>
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
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== OVERVIEW TAB ===== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Information + Emergency Contact */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <User size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Key Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">NHS Number</div>
                    <div className="text-sm text-gray-900">{user.nhsNumber}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Status</div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Active</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Care Manager</div>
                    <div className="text-sm text-gray-900">{user.careManager}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Key Worker</div>
                    <div className="text-sm text-gray-900">{user.keyWorker}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Local Authority</div>
                    <div className="text-sm text-gray-900">{user.localAuthority}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Social Worker</div>
                    <div className="text-sm text-gray-900">{user.socialWorker}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Last Review</div>
                    <div className="text-sm text-gray-900">{user.lastReview}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Next Review</div>
                    <div className="text-sm text-blue-600">{user.nextReview}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                {/* Next of Kin */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Heart size={15} className="text-red-500" />
                    <h3 className="text-sm text-gray-900">Next of Kin</h3>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3 space-y-1.5">
                    <div className="text-sm text-gray-900">{user.nextOfKin.name} <span className="text-xs text-gray-500">({user.nextOfKin.relation})</span></div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500"><Phone size={11} /> {user.nextOfKin.phone}</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500"><Mail size={11} /> {user.nextOfKin.email}</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500"><MapPin size={11} /> {user.nextOfKin.address}</div>
                  </div>
                </div>

                {/* GP */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Stethoscope size={15} className="text-blue-500" />
                    <h3 className="text-sm text-gray-900">GP / Medical Professional</h3>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 space-y-1.5">
                    <div className="text-sm text-gray-900">{user.gp.name} <span className="text-xs text-gray-500">— {user.gp.practice}</span></div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500"><Phone size={11} /> {user.gp.phone}</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500"><Mail size={11} /> {user.gp.email}</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500"><MapPin size={11} /> {user.gp.address}</div>
                  </div>
                </div>

                {/* Personal Carer */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <UserCheck size={15} className="text-emerald-500" />
                    <h3 className="text-sm text-gray-900">Personal Carer</h3>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 space-y-1.5">
                    <div className="text-sm text-gray-900">{user.personalCarer.name} <span className="text-xs text-gray-500">— {user.personalCarer.agency}</span></div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500"><Phone size={11} /> {user.personalCarer.phone}</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500"><Mail size={11} /> {user.personalCarer.email}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visitors */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users size={16} className="text-gray-500" />
                <h3 className="text-sm text-gray-900">Approved Visitors</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {user.visitors.map((v, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs shrink-0">
                      {v.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-gray-900 truncate">{v.name}</div>
                      <div className="text-xs text-gray-500">{v.relation}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5"><Phone size={10} /> {v.phone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Visitor Log ── */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <LogIn size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Visitor Log</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{visitLogs.length} total</span>
                </div>
                <button
                  onClick={() => setShowLogVisit(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm"
                >
                  <Plus size={13} /> Log Visit
                </button>
              </div>

              {/* Summary strip */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Total Visits', value: visitLogs.length, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
                  { label: 'Total Hours', value: `${visitLogs.reduce((s, v) => s + v.hours, 0)}h`, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
                  { label: 'Last Visit', value: visitLogs[0]?.date ?? '—', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                ].map((s, i) => (
                  <div key={i} className={`${s.bg} border ${s.border} rounded-xl px-4 py-3`}>
                    <div className="text-xs text-gray-500 mb-0.5">{s.label}</div>
                    <div className={`text-base font-medium ${s.color}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Filter bar */}
              <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
                  <Eye size={13} className="text-gray-400" /> Filter:
                </div>
                <input
                  type="text"
                  placeholder="Visitor name..."
                  value={visitFilter.visitor}
                  onChange={e => { setVisitFilter(f => ({ ...f, visitor: e.target.value })); setVisitPage(1); }}
                  className="flex-1 min-w-[120px] px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
                />
                <input
                  type="text"
                  placeholder="Relation..."
                  value={visitFilter.relation}
                  onChange={e => { setVisitFilter(f => ({ ...f, relation: e.target.value })); setVisitPage(1); }}
                  className="flex-1 min-w-[100px] px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
                />
                <select
                  value={visitFilter.purpose}
                  onChange={e => { setVisitFilter(f => ({ ...f, purpose: e.target.value })); setVisitPage(1); }}
                  className="flex-1 min-w-[130px] px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-400 cursor-pointer transition-all"
                >
                  <option value="">All purposes</option>
                  <option>Family visit</option>
                  <option>Support visit</option>
                  <option>Birthday / celebration</option>
                  <option>Medical escort</option>
                  <option>Legal / advocacy</option>
                  <option>Other</option>
                </select>
                <input
                  type="date"
                  value={visitFilter.from}
                  onChange={e => { setVisitFilter(f => ({ ...f, from: e.target.value })); setVisitPage(1); }}
                  className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
                  title="From date"
                />
                <input
                  type="date"
                  value={visitFilter.to}
                  onChange={e => { setVisitFilter(f => ({ ...f, to: e.target.value })); setVisitPage(1); }}
                  className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
                  title="To date"
                />
                {(visitFilter.visitor || visitFilter.relation || visitFilter.purpose || visitFilter.from || visitFilter.to) && (
                  <button
                    onClick={() => { setVisitFilter({ visitor: '', relation: '', purpose: '', from: '', to: '' }); setVisitPage(1); }}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X size={11} /> Clear
                  </button>
                )}
                {filteredVisits.length !== visitLogs.length && (
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{filteredVisits.length} result{filteredVisits.length !== 1 ? 's' : ''}</span>
                )}
              </div>

              {/* Log table */}
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/80">
                      <th className="text-left px-4 py-2.5 text-xs text-gray-500 uppercase tracking-wide">Visitor</th>
                      <th className="text-left px-4 py-2.5 text-xs text-gray-500 uppercase tracking-wide">Date</th>
                      <th className="text-left px-4 py-2.5 text-xs text-gray-500 uppercase tracking-wide">Time In</th>
                      <th className="text-left px-4 py-2.5 text-xs text-gray-500 uppercase tracking-wide">Time Out</th>
                      <th className="text-left px-4 py-2.5 text-xs text-gray-500 uppercase tracking-wide">
                        <div className="flex items-center gap-1"><Timer size={11} /> Hours</div>
                      </th>
                      <th className="text-left px-4 py-2.5 text-xs text-gray-500 uppercase tracking-wide">Purpose</th>
                      <th className="text-left px-4 py-2.5 text-xs text-gray-500 uppercase tracking-wide">Signed in by</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {pagedVisits.map(v => (
                      <tr key={v.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs shrink-0 font-medium">
                              {v.visitorName.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div>
                              <div className="text-sm text-gray-900">{v.visitorName}</div>
                              <div className="text-xs text-gray-400">{v.relation}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{v.date}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full w-fit">
                            <LogIn size={10} /> {v.timeIn}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full w-fit">
                            <LogOut size={10} /> {v.timeOut}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-sm text-purple-700">
                            <Timer size={12} className="text-purple-400" /> {v.hours}h
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{v.purpose || '—'}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{v.signedInBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredVisits.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <Users size={24} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">{visitLogs.length === 0 ? 'No visits recorded yet.' : 'No visits match the current filters.'}</p>
                </div>
              )}

              {/* Pagination */}
              {totalVisitPages > 1 && (
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    Showing {Math.min((visitPage - 1) * VISIT_PER_PAGE + 1, filteredVisits.length)}–{Math.min(visitPage * VISIT_PER_PAGE, filteredVisits.length)} of {filteredVisits.length} visits
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setVisitPage(p => p - 1)}
                      disabled={visitPage === 1}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={14} className="rotate-180" />
                    </button>
                    <span className="px-2.5 py-0.5 text-xs bg-emerald-50 text-emerald-700 rounded-md font-semibold min-w-[48px] text-center">
                      {visitPage} / {totalVisitPages}
                    </span>
                    <button
                      onClick={() => setVisitPage(p => p + 1)}
                      disabled={visitPage === totalVisitPages}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mood Tracking */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Mood Tracking (Last 7 Days)</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Current:</span>
                  {getMoodIcon(user.currentMood)}
                  <span className="text-emerald-600">Happy</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={moodTrend} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                  <CartesianGrid key="su-mood-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis key="su-mood-x" dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis key="su-mood-y" stroke="#9ca3af" style={{ fontSize: '12px' }} domain={[0, 10]} />
                  <Tooltip key="su-mood-tooltip" />
                  <Line key="su-mood-line" type="monotone" dataKey="mood" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* ── Upcoming Appointments ── */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Upcoming Appointments</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{upcomingAppointments.length}</span>
                </div>
                <button
                  onClick={() => setShowScheduleAppointment(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Plus size={12} /> Schedule
                </button>
              </div>

              <div className="space-y-2">
                {pagedApts.map((apt) => {
                  const colorMap: Record<string, string> = {
                    blue:    'bg-blue-50 text-blue-600',
                    purple:  'bg-purple-50 text-purple-600',
                    emerald: 'bg-emerald-50 text-emerald-600',
                    amber:   'bg-amber-50 text-amber-600',
                    rose:    'bg-rose-50 text-rose-600',
                  };
                  const cls = colorMap[apt.color] ?? colorMap['blue'];
                  return (
                    <div key={apt.id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cls}`}>
                          <Calendar size={15} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-900 group-hover:text-blue-700 transition-colors">{apt.type}</div>
                          <div className="text-xs text-gray-500">{apt.with} · {apt.location}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-gray-700 font-medium">{apt.date}</div>
                        <div className="text-xs text-gray-400">{apt.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalAptPages > 1 && (
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    Showing {Math.min((aptPage - 1) * APT_PER_PAGE + 1, upcomingAppointments.length)}–{Math.min(aptPage * APT_PER_PAGE, upcomingAppointments.length)} of {upcomingAppointments.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setAptPage(p => p - 1)}
                      disabled={aptPage === 1}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={14} className="rotate-180" />
                    </button>
                    <span className="px-2.5 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-md font-semibold min-w-[48px] text-center">
                      {aptPage} / {totalAptPages}
                    </span>
                    <button
                      onClick={() => setAptPage(p => p + 1)}
                      disabled={aptPage === totalAptPages}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== CARE & SUPPORT TAB ===== */}
        {activeTab === 'care-support' && (
          <div className="space-y-6">
            {/* Care Plans */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ClipboardList size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Active Care Plans</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{carePlans.length}</span>
                </div>
                <button
                  onClick={() => setShowCreateCarePlan(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Plus size={13} /> Create Care Plan
                </button>
              </div>
              <div className="space-y-3">
                {carePlans.slice((carePlanPage - 1) * CARE_PLAN_PER_PAGE, carePlanPage * CARE_PLAN_PER_PAGE).map((plan) => (
                  <div key={plan.id} className="border border-gray-100 rounded-xl p-4 hover:border-emerald-200 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0 pr-3">
                        <div className="text-sm text-gray-900 mb-0.5">{plan.name}</div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                          <span>Reviewed: {plan.lastReviewed}</span>
                          <span>·</span>
                          <span className="text-blue-600">Next: {plan.nextReview}</span>
                          {plan.frequency && <><span>·</span><span>{plan.frequency}</span></>}
                        </div>
                        {plan.goals && (
                          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">{plan.goals}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Active</span>
                        <button
                          onClick={() => {
                            setEditingCarePlan(plan);
                            setCarePlanForm({
                              name: plan.name,
                              customName: '',
                              goals: plan.goals || '',
                              frequency: plan.frequency || '',
                              createdBy: plan.createdBy || '',
                              startDate: '',
                              nextReview: '',
                              notes: ''
                            });
                            setShowCreateCarePlan(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Care Plan"
                        >
                          <Edit size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className={`${getProgressColor(plan.progress)} h-2 rounded-full transition-all`} style={{ width: `${plan.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-600 w-10 text-right">{plan.progress}%</span>
                    </div>
                    {plan.createdBy && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                        <UserCheck size={11} /> Created by {plan.createdBy}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {carePlans.length > CARE_PLAN_PER_PAGE && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Showing {Math.min((carePlanPage - 1) * CARE_PLAN_PER_PAGE + 1, carePlans.length)}–{Math.min(carePlanPage * CARE_PLAN_PER_PAGE, carePlans.length)} of {carePlans.length} plans
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCarePlanPage(p => Math.max(1, p - 1))} disabled={carePlanPage === 1} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-xs text-gray-600 min-w-[52px] text-center">{carePlanPage} / {Math.max(1, Math.ceil(carePlans.length / CARE_PLAN_PER_PAGE))}</span>
                    <button onClick={() => setCarePlanPage(p => p + 1)} disabled={carePlanPage >= Math.ceil(carePlans.length / CARE_PLAN_PER_PAGE)} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Risk Assessments */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Risk Assessments</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{riskAssessments.length}</span>
                </div>
                <button
                  onClick={() => setShowAddRisk(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={13} /> Add Assessment
                </button>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Risk Area</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Last Assessed</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Next Due</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Assessed By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskAssessments.slice((riskPage - 1) * RISK_PER_PAGE, riskPage * RISK_PER_PAGE).map((risk) => (
                      <React.Fragment key={risk.id}>
                        <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-900">{risk.area}</td>
                          <td className="px-4 py-3">{getRiskBadge(risk.level)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{risk.lastAssessed}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{risk.nextDue}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{risk.assessedBy || '—'}</td>
                        </tr>
                        {risk.notes && (
                          <tr className="border-b border-gray-50 bg-gray-50/40">
                            <td colSpan={5} className="px-4 py-2 text-xs text-gray-500 italic">{risk.notes}</td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              {riskAssessments.length > RISK_PER_PAGE && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Showing {Math.min((riskPage - 1) * RISK_PER_PAGE + 1, riskAssessments.length)}–{Math.min(riskPage * RISK_PER_PAGE, riskAssessments.length)} of {riskAssessments.length} risks
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setRiskPage(p => Math.max(1, p - 1))} disabled={riskPage === 1} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-xs text-gray-600 min-w-[52px] text-center">{riskPage} / {Math.max(1, Math.ceil(riskAssessments.length / RISK_PER_PAGE))}</span>
                    <button onClick={() => setRiskPage(p => p + 1)} disabled={riskPage >= Math.ceil(riskAssessments.length / RISK_PER_PAGE)} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Goals & Outcomes */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Star size={16} className="text-gray-500" />
                <h3 className="text-sm text-gray-900">Goals & Outcomes</h3>
              </div>
              <div className="space-y-2">
                {[
                  { goal: 'Develop coping strategies for anxiety triggers', status: 'In Progress', progress: 65 },
                  { goal: 'Improve peer interaction during group activities', status: 'In Progress', progress: 70 },
                  { goal: 'Maintain regular sleep routine (9pm-7am)', status: 'Met', progress: 100 },
                  { goal: 'Engage in education programme 5 days/week', status: 'In Progress', progress: 85 },
                ].map((g, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-sm text-gray-800">{g.goal}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-24 bg-gray-200 rounded-full h-1.5">
                        <div className={`${getProgressColor(g.progress)} h-1.5 rounded-full`} style={{ width: `${g.progress}%` }} />
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded ${g.status === 'Met' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>{g.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== MEDICAL & MEDICATIONS TAB ===== */}
        {activeTab === 'medical' && (
          <div className="space-y-6">

            {/* GP Details card */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope size={16} className="text-blue-500" />
                <h3 className="text-sm text-gray-900">GP / Medical Professional</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><div className="text-xs text-gray-500 mb-0.5">Doctor Name</div><div className="text-gray-900">{user.gp.name}</div></div>
                <div><div className="text-xs text-gray-500 mb-0.5">Practice</div><div className="text-gray-900">{user.gp.practice}</div></div>
                <div><div className="text-xs text-gray-500 mb-0.5">Phone</div><div className="text-gray-700 flex items-center gap-1"><Phone size={12} className="text-gray-400" />{user.gp.phone}</div></div>
                <div><div className="text-xs text-gray-500 mb-0.5">Email</div><div className="text-gray-700 flex items-center gap-1"><Mail size={12} className="text-gray-400" />{user.gp.email}</div></div>
                <div className="col-span-2"><div className="text-xs text-gray-500 mb-0.5">Address</div><div className="text-gray-700 flex items-center gap-1"><MapPin size={12} className="text-gray-400" />{user.gp.address}</div></div>
              </div>
            </div>

            {/* Medical Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Heart size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Medical Summary</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-xs text-gray-500">NHS Number</span>
                    <span className="text-sm text-gray-900">{user.nhsNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-xs text-gray-500">Blood Type</span>
                    <span className="text-sm text-gray-900">{user.bloodType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-xs text-gray-500">Nationality</span>
                    <span className="text-sm text-gray-900">{user.nationality}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-xs text-gray-500">DNACPR</span>
                    <span className="text-sm text-gray-900">{user.dnacpr}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Conditions & Allergies</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1.5">Diagnoses</div>
                    <div className="flex flex-wrap gap-1.5">
                      {user.conditions.map((c, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-gray-50 text-gray-700 border border-gray-200">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1.5">Allergies</div>
                    <div className="flex flex-wrap gap-1.5">
                      {user.allergies.map((a, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-red-50 text-red-700 border border-red-200">
                          <AlertCircle size={10} className="mr-1" />{a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Medications */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Pill size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Current Medications</h3>
                </div>
                <button onClick={() => setShowAddMedication(true)} className="text-xs text-blue-600 hover:text-blue-700">+ Add Medication</button>
              </div>
              <div className="space-y-2">
                {medications.map((med) => (
                  <div key={med.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm text-gray-900">{med.name} — {med.dosage}</div>
                        <div className="text-xs text-gray-500">{med.frequency}</div>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Active</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Prescribed by {med.prescribedBy}</span>
                      <span>·</span>
                      <span>Since {med.startDate}</span>
                      <span>·</span>
                      <span>{med.notes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospital & Treatment History */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Hospital & Treatment History</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{hospitalHistory.length}</span>
                </div>
                <button
                  onClick={() => setShowAddTreatment(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={13} /> Add Treatment
                </button>
              </div>
              <div className="space-y-3">
                {hospitalHistory.map(h => (
                  <div key={h.id} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm text-gray-900">{h.hospital}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{h.reason}</div>
                      </div>
                      <span className="text-xs text-gray-500 shrink-0 ml-3">{h.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full w-fit mt-1">
                      <Stethoscope size={11} /> Treated by: {h.treatedBy}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Upcoming Medical Appointments</h3>
                </div>
                <button onClick={() => setShowScheduleAppointment(true)} className="text-xs text-blue-600 hover:text-blue-700">+ Schedule</button>
              </div>
              <div className="space-y-2">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-900">{apt.type}</div>
                      <div className="text-xs text-gray-500">{apt.with} · {apt.location}</div>
                    </div>
                    <div className="text-sm text-gray-600">{apt.date}, {apt.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== DAILY LOGS TAB ===== */}
        {activeTab === 'daily-logs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Activity Logs</h3>
                </div>
                <button onClick={() => setShowQuickLog(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <Plus size={14} />
                  Add Log
                </button>
              </div>
              <div className="space-y-2">
                {recentLogs.map((log) => (
                  <div key={log.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">{log.type}</span>
                        {log.mood && getMoodIcon(log.mood)}
                        {log.behavior && <span className="text-xs text-gray-500">{log.behavior}</span>}
                      </div>
                      <span className="text-xs text-gray-400">{log.date} at {log.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{log.notes}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><UserCheck size={11} /> Conducted by: <span className="text-gray-600">{log.staff}</span></span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {log.date} at {log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== INCIDENTS & SAFEGUARDING TAB ===== */}
        {activeTab === 'incidents' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Incident Reports</h3>
                </div>
                <button onClick={() => setShowReportIncident(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <Plus size={14} />
                  Report Incident
                </button>
              </div>
              <div className="space-y-2">
                {recentIncidents.map((incident) => (
                  <div key={incident.id} className={`border rounded-lg p-4 ${incident.severity === 'amber' ? 'border-amber-200' : 'border-gray-100'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{incident.reference}</span>
                        <span className="text-sm text-gray-900">{incident.type}</span>
                        {getRiskBadge(incident.severity === 'amber' ? 'medium' : incident.severity === 'red' ? 'high' : 'low')}
                      </div>
                      <span className="text-xs text-gray-400">{incident.date} at {incident.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                    <div className="bg-blue-50 rounded-md px-3 py-2 mb-2">
                      <p className="text-xs text-blue-700"><span className="text-blue-800">Action taken:</span> {incident.actionTaken}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><UserCheck size={11} /> Reported by: <span className="text-gray-600">{incident.staff}</span></span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {incident.date} at {incident.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safeguarding Info */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={16} className="text-gray-500" />
                <h3 className="text-sm text-gray-900">Safeguarding Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Designated Safeguarding Lead</div>
                  <div className="text-sm text-gray-900">Dr. Emily Carter</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Social Worker (LA)</div>
                  <div className="text-sm text-gray-900">{user.socialWorker}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Local Authority</div>
                  <div className="text-sm text-gray-900">{user.localAuthority}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Looked After Status</div>
                  <div className="text-sm text-gray-900">Section 20 (Voluntary)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== DOCUMENTS TAB ===== */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Documents & Records</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{documents.length}</span>
                </div>
                <button
                  onClick={() => setShowUploadDoc(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <Upload size={14} /> Upload Document
                </button>
              </div>
              <div className="space-y-1.5">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-800">{doc.name}</div>
                        <div className="text-xs text-gray-400">{doc.uploadedBy} · {doc.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">{doc.category}</span>
                      <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                        <Download size={14} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== FINANCES TAB ===== */}
        {activeTab === 'finances' && (
          <div className="space-y-6">

            {/* Funding summary */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <PoundSterling size={16} className="text-gray-500" />
                <h3 className="text-sm text-gray-900">Funding Details</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="text-xs text-blue-700 mb-1">Funding Type</div>
                  <div className="text-sm text-blue-900">{user.funderType}</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-1">Funder</div>
                  <div className="text-sm text-gray-900">{user.funderName}</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-1">Contract Ref</div>
                  <div className="text-sm text-gray-900 font-mono">{user.funderRef}</div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <div className="text-xs text-green-700 mb-1">Weekly Rate</div>
                  <div className="text-sm text-green-900">£{user.weeklyRate.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-xs text-gray-500">Monthly Equivalent</span><div className="text-gray-900">£{(user.weeklyRate * 4.33).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div></div>
                <div><span className="text-xs text-gray-500">Annual Equivalent</span><div className="text-gray-900">£{(user.weeklyRate * 52).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div></div>
              </div>
            </div>

            {/* Payment history */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Payment History</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{paymentHistory.length} records</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 bg-white px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download size={13} /> Export
                  </button>
                  <button
                    onClick={() => setShowLogPayment(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={13} /> Log Payment
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/60">
                      <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wide">Period</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wide">Amount</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wide">Paid By</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wide">Reference</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wide">Date</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {pagedPayments.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-900">{p.period}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">£{p.amount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{p.paidBy}</td>
                        <td className="px-4 py-3 text-xs text-blue-600 font-mono">{p.ref || '—'}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{p.date}</td>
                        <td className="px-4 py-3">
                          {p.status === 'paid'
                            ? <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full"><CheckCircle size={11} /> Paid</span>
                            : <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full"><AlertCircle size={11} /> Overdue</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 border-gray-200 bg-gray-50">
                    <tr>
                      <td className="px-4 py-3 text-xs text-gray-500">Total received</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        £{paymentHistory.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </td>
                      <td colSpan={4} />
                    </tr>
                  </tfoot>
                </table>
              </div>
              {/* Pagination */}
              {totalPayPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Showing {(payPage - 1) * PAY_PER_PAGE + 1}–{Math.min(payPage * PAY_PER_PAGE, paymentHistory.length)} of {paymentHistory.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPayPage(p => Math.max(1, p - 1))}
                      disabled={payPage === 1}
                      className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors"
                    >← Prev</button>
                    {Array.from({ length: totalPayPages }, (_, i) => i + 1).map(n => (
                      <button
                        key={n}
                        onClick={() => setPayPage(n)}
                        className={`w-7 h-7 text-xs rounded-lg border transition-colors ${payPage === n ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}
                      >{n}</button>
                    ))}
                    <button
                      onClick={() => setPayPage(p => Math.min(totalPayPages, p + 1))}
                      disabled={payPage === totalPayPages}
                      className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors"
                    >Next →</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== NOTES & ACTIVITY TAB ===== */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-gray-500" />
                  <h3 className="text-sm text-gray-900">Care Notes & Activity</h3>
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
                      setNoteForm({ note: '', type: 'General', author: 'Mary Thompson', role: 'Key Worker' });
                      setShowAddNote(true);
                    }}
                    className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1 font-medium"
                  >
                    <Plus size={14} /> Add Note
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {notes
                  .filter(note => showArchived ? note.archived : !note.archived)
                  .map((note) => (
                    <div key={note.id} className={`border rounded-lg p-4 transition-all hover:shadow-sm ${note.archived ? 'border-amber-100 bg-amber-50/20' : 'border-gray-100 bg-white'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-700 font-bold">
                            {note.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-900">{note.author}</span>
                            <span className="text-xs text-gray-400 ml-2">{note.role}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 font-medium">{note.type}</span>
                          <span className="text-xs text-gray-400">{note.date} at {note.time}</span>
                          
                          {/* Actions */}
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
                              onClick={() => {
                                setNotes(notes.map(n => n.id === note.id ? { ...n, archived: !n.archived } : n));
                              }}
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

        {/* Footer */}
        <div className="text-center py-6 text-xs text-gray-400 border-t border-gray-100 mt-8">
          Powered by MployUs
        </div>
      </div>
    </main>

      {/* Modals */}
      <QuickLogModal isOpen={showQuickLog} onClose={() => setShowQuickLog(false)} userName={user.name} userId={user.id} />
      <EditServiceUserModal isOpen={showEditProfile} onClose={() => setShowEditProfile(false)} user={user} />
      <ScheduleAppointmentModal isOpen={showScheduleAppointment} onClose={() => setShowScheduleAppointment(false)} userName={user.name} onConfirm={handleScheduleAppointmentConfirm} />
      <AddMedicationModal isOpen={showAddMedication} onClose={() => setShowAddMedication(false)} userName={user.name} onConfirm={handleSaveMedications} />
      <ReportIncidentModal isOpen={showReportIncident} onClose={() => setShowReportIncident(false)} userName={user.name} onConfirm={handleReportIncidentConfirm} />

      {/* ── Add Note Modal ── */}
      {showAddNote && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] flex flex-col">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <MessageSquare size={17} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900">Add Care Note</h2>
                <p className="text-xs text-gray-500">{user.name}</p>
              </div>
              <button onClick={() => setShowAddNote(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Author Name *</label>
                <input
                  required
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                  value={noteForm.author}
                  onChange={e => setNoteForm(f => ({ ...f, author: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Author Role *</label>
                <input
                  required
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                  value={noteForm.role}
                  onChange={e => setNoteForm(f => ({ ...f, role: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Note Type *</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                  value={noteForm.type}
                  onChange={e => setNoteForm(f => ({ ...f, type: e.target.value }))}
                >
                  <option>General</option>
                  <option>Review</option>
                  <option>Therapy</option>
                  <option>Incident Follow-up</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Note Content *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white resize-none"
                  placeholder="Enter details of the note..."
                  value={noteForm.note}
                  onChange={e => setNoteForm(f => ({ ...f, note: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 shrink-0 bg-gray-50/50">
              <button
                type="button"
                onClick={() => setShowAddNote(false)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!noteForm.note || !noteForm.author || !noteForm.role}
                onClick={() => {
                  const { date, time } = getFormattedDateTime();
                  setNotes(prev => [
                    {
                      id: Date.now(),
                      date,
                      time,
                      author: noteForm.author,
                      role: noteForm.role,
                      note: noteForm.note,
                      type: noteForm.type,
                      archived: false
                    },
                    ...prev
                  ]);
                  setShowAddNote(false);
                }}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Note Modal ── */}
      {showEditNote && selectedNote && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] flex flex-col">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <MessageSquare size={17} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900">Edit Care Note</h2>
                <p className="text-xs text-gray-500">{user.name}</p>
              </div>
              <button onClick={() => setShowEditNote(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Author Name *</label>
                <input
                  required
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                  value={noteForm.author}
                  onChange={e => setNoteForm(f => ({ ...f, author: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Author Role *</label>
                <input
                  required
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                  value={noteForm.role}
                  onChange={e => setNoteForm(f => ({ ...f, role: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Note Type *</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                  value={noteForm.type}
                  onChange={e => setNoteForm(f => ({ ...f, type: e.target.value }))}
                >
                  <option>General</option>
                  <option>Review</option>
                  <option>Therapy</option>
                  <option>Incident Follow-up</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Note Content *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white resize-none"
                  value={noteForm.note}
                  onChange={e => setNoteForm(f => ({ ...f, note: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 shrink-0 bg-gray-50/50">
              <button
                type="button"
                onClick={() => setShowEditNote(false)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!noteForm.note || !noteForm.author || !noteForm.role}
                onClick={() => {
                  setNotes(prev => prev.map(n => n.id === selectedNote.id ? { ...n, author: noteForm.author, role: noteForm.role, note: noteForm.note, type: noteForm.type } : n));
                  setShowEditNote(false);
                }}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Create Care Plan Modal ── */}
      {showCreateCarePlan && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] flex flex-col">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                <ClipboardList size={17} className="text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900">{editingCarePlan ? 'Edit Care Plan' : 'Create Care Plan'}</h2>
                <p className="text-xs text-gray-500">{user.name}</p>
              </div>
              <button onClick={() => { setShowCreateCarePlan(false); setEditingCarePlan(null); }} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {/* Plan type */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Care Plan Type *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-400 bg-white"
                  value={carePlanForm.name}
                  onChange={e => setCarePlanForm(f => ({ ...f, name: e.target.value, customName: '' }))}
                >
                  <option value="">Select a care plan type...</option>
                  {CARE_PLAN_TEMPLATES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {carePlanForm.name === 'Other (custom)' && (
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Custom Plan Name *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-400"
                    placeholder="e.g. Independence & Life Skills"
                    value={carePlanForm.customName}
                    onChange={e => setCarePlanForm(f => ({ ...f, customName: e.target.value }))}
                  />
                </div>
              )}

              {/* Goals */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Goals & Objectives *</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-400 resize-none"
                  placeholder="Describe the goals, targets and outcomes for this care plan..."
                  value={carePlanForm.goals}
                  onChange={e => setCarePlanForm(f => ({ ...f, goals: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Start date */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Start Date *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-400"
                    value={carePlanForm.startDate}
                    onChange={e => setCarePlanForm(f => ({ ...f, startDate: e.target.value }))}
                  />
                </div>

                {/* Next review */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Next Review Date</label>
                  <input
                    type="date"
                    min={carePlanForm.startDate}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-400"
                    value={carePlanForm.nextReview}
                    onChange={e => setCarePlanForm(f => ({ ...f, nextReview: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Review frequency */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Review Frequency</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-400 bg-white"
                    value={carePlanForm.frequency}
                    onChange={e => setCarePlanForm(f => ({ ...f, frequency: e.target.value }))}
                  >
                    <option value="">Select...</option>
                    <option>Daily review</option>
                    <option>Weekly review</option>
                    <option>Fortnightly review</option>
                    <option>Monthly review</option>
                    <option>Quarterly review</option>
                    <option>6-monthly review</option>
                    <option>Annual review</option>
                  </select>
                </div>

                {/* Created by */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Created By</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-400 bg-white"
                    value={carePlanForm.createdBy}
                    onChange={e => setCarePlanForm(f => ({ ...f, createdBy: e.target.value }))}
                  >
                    <option value="">Select staff member...</option>
                    <option>Dr. Emily Carter</option>
                    <option>Mary Thompson</option>
                    <option>Sarah Williams</option>
                    <option>James Mitchell</option>
                    <option>John Davies</option>
                    <option>Lisa Anderson</option>
                  </select>
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Additional Notes <span className="text-gray-400">(optional)</span></label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-400 resize-none"
                  placeholder="Any additional context, background or instructions..."
                  value={carePlanForm.notes}
                  onChange={e => setCarePlanForm(f => ({ ...f, notes: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 shrink-0">
              <button
                onClick={() => { setShowCreateCarePlan(false); setEditingCarePlan(null); }}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitCarePlan}
                disabled={(!editingCarePlan && !carePlanForm.startDate) || (!carePlanForm.name || (carePlanForm.name === 'Other (custom)' && !carePlanForm.customName))}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={14} /> {editingCarePlan ? 'Save Changes' : 'Create Care Plan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Upload Document Modal ── */}
      {showUploadDoc && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <Upload size={17} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900">Upload Document</h2>
                <p className="text-xs text-gray-500">{user.name}</p>
              </div>
              <button onClick={() => { setShowUploadDoc(false); setUploadedFile(null); setUploadForm({ name: '', category: 'Assessment', uploadedBy: '', notes: '' }); }} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Drop zone */}
              <input
                ref={docInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleDocFilePick(f); }}
              />
              <div
                onDragOver={e => { e.preventDefault(); setIsDragOverDoc(true); }}
                onDragLeave={() => setIsDragOverDoc(false)}
                onDrop={e => { e.preventDefault(); setIsDragOverDoc(false); const f = e.dataTransfer.files?.[0]; if (f) handleDocFilePick(f); }}
                onClick={() => docInputRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors ${isDragOverDoc ? 'border-blue-400 bg-blue-50' : uploadedFile ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
              >
                {uploadedFile ? (
                  <>
                    <CheckCircle size={22} className="text-green-500" />
                    <p className="text-sm text-green-700 text-center">{uploadedFile.name}</p>
                    <p className="text-xs text-green-500">{(uploadedFile.size / 1024).toFixed(1)} KB — click to change</p>
                  </>
                ) : (
                  <>
                    <Upload size={22} className={isDragOverDoc ? 'text-blue-500' : 'text-gray-400'} />
                    <p className="text-sm text-gray-600 text-center">
                      <span className="text-blue-600 font-medium">Click to browse</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PDF, DOC, DOCX, JPG, PNG supported</p>
                  </>
                )}
              </div>

              {/* Document name */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Document Name *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                  placeholder="e.g. Care Plan Review — Jun 2026"
                  value={uploadForm.name}
                  onChange={e => setUploadForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                    value={uploadForm.category}
                    onChange={e => setUploadForm(f => ({ ...f, category: e.target.value }))}
                  >
                    {['Assessment','Consent','Education','Safeguarding','Review','Legal','Medical','Financial','Other'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Uploaded by */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Uploaded By</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                    value={uploadForm.uploadedBy}
                    onChange={e => setUploadForm(f => ({ ...f, uploadedBy: e.target.value }))}
                  >
                    <option value="">Select...</option>
                    <option>Dr. Emily Carter</option>
                    <option>Mary Thompson</option>
                    <option>Sarah Williams</option>
                    <option>James Mitchell</option>
                    <option>Rebecca Holmes</option>
                    <option>Jane Johnson</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Notes <span className="text-gray-400">(optional)</span></label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none"
                  placeholder="Any context about this document..."
                  value={uploadForm.notes}
                  onChange={e => setUploadForm(f => ({ ...f, notes: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => { setShowUploadDoc(false); setUploadedFile(null); setUploadForm({ name: '', category: 'Assessment', uploadedBy: '', notes: '' }); }}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitDocUpload}
                disabled={!uploadForm.name && !uploadedFile}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload size={14} /> Upload Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Treatment History Modal ── */}
      {showAddTreatment && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <Building2 size={17} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900">Add Treatment Record</h2>
                <p className="text-xs text-gray-500">{user.name}</p>
              </div>
              <button onClick={() => setShowAddTreatment(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Hospital / Clinic *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                  placeholder="e.g. Bristol Royal Infirmary"
                  value={treatmentForm.hospital} onChange={e => setTreatmentForm(f => ({ ...f, hospital: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Reason / Condition Treated *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                  placeholder="e.g. Anxiety crisis, Fracture assessment"
                  value={treatmentForm.reason} onChange={e => setTreatmentForm(f => ({ ...f, reason: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Date *</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={treatmentForm.date} onChange={e => setTreatmentForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Treated By</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    placeholder="Doctor / Specialist name"
                    value={treatmentForm.treatedBy} onChange={e => setTreatmentForm(f => ({ ...f, treatedBy: e.target.value }))} />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowAddTreatment(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={submitTreatment} disabled={!treatmentForm.hospital || !treatmentForm.date}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <Save size={14} /> Save Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Log Payment Modal ── */}
      {showLogPayment && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <PoundSterling size={17} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900">Log Payment</h2>
                <p className="text-xs text-gray-500">{user.name}</p>
              </div>
              <button onClick={() => setShowLogPayment(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Period *</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    placeholder="e.g. Jul 2026"
                    value={paymentForm.period} onChange={e => setPaymentForm(f => ({ ...f, period: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Amount (£) *</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    placeholder="0.00"
                    value={paymentForm.amount} onChange={e => setPaymentForm(f => ({ ...f, amount: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Paid By</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    placeholder="e.g. Bristol City Council"
                    value={paymentForm.paidBy} onChange={e => setPaymentForm(f => ({ ...f, paidBy: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Reference</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    placeholder="e.g. BCC-INV-0090"
                    value={paymentForm.ref} onChange={e => setPaymentForm(f => ({ ...f, ref: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Date *</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={paymentForm.date} onChange={e => setPaymentForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Status</label>
                  <div className="flex gap-2 mt-1">
                    {(['paid', 'overdue'] as const).map(s => (
                      <button key={s} type="button" onClick={() => setPaymentForm(f => ({ ...f, status: s }))}
                        className={`flex-1 py-2 text-xs rounded-lg border transition-colors capitalize ${paymentForm.status === s ? (s === 'paid' ? 'bg-green-600 text-white border-green-600' : 'bg-red-600 text-white border-red-600') : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowLogPayment(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={submitPayment} disabled={!paymentForm.period || !paymentForm.amount || !paymentForm.date}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <Save size={14} /> Log Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Risk Assessment Modal ── */}
      {showAddRisk && (
        <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                <Shield size={17} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900">Record Risk Assessment</h2>
                <p className="text-xs text-gray-500">{user.name}</p>
              </div>
              <button onClick={() => setShowAddRisk(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Risk area */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Risk Area *</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                    value={riskForm.area}
                    onChange={e => setRiskForm(f => ({ ...f, area: e.target.value, customArea: '' }))}
                  >
                    <option value="">Select area...</option>
                    {RISK_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                {riskForm.area === 'Other' && (
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Specify Area *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                      placeholder="Describe the risk area"
                      value={riskForm.customArea}
                      onChange={e => setRiskForm(f => ({ ...f, customArea: e.target.value }))}
                    />
                  </div>
                )}
                <div className={riskForm.area === 'Other' ? 'col-span-2' : ''}>
                  <label className="block text-xs text-gray-500 mb-1">Risk Level *</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {([
                      { value: 'low',      label: 'Low',      cls: 'border-emerald-300 bg-emerald-50 text-emerald-800' },
                      { value: 'medium',   label: 'Medium',   cls: 'border-amber-300 bg-amber-50 text-amber-800' },
                      { value: 'high',     label: 'High',     cls: 'border-orange-300 bg-orange-50 text-orange-800' },
                      { value: 'critical', label: 'Critical', cls: 'border-red-400 bg-red-50 text-red-900' },
                    ] as const).map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setRiskForm(f => ({ ...f, level: opt.value }))}
                        className={`px-2 py-2 text-xs rounded-lg border-2 transition-all text-center ${
                          riskForm.level === opt.value ? opt.cls : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Date Assessed *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={riskForm.lastAssessed}
                    onChange={e => setRiskForm(f => ({ ...f, lastAssessed: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Next Review Due</label>
                  <input
                    type="date"
                    min={riskForm.lastAssessed}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={riskForm.nextDue}
                    onChange={e => setRiskForm(f => ({ ...f, nextDue: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Assessed By</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                  value={riskForm.assessedBy}
                  onChange={e => setRiskForm(f => ({ ...f, assessedBy: e.target.value }))}
                >
                  <option value="">Select staff member...</option>
                  <option>Dr. Emily Carter</option>
                  <option>Mary Thompson</option>
                  <option>Sarah Williams</option>
                  <option>James Mitchell</option>
                  <option>John Davies</option>
                  <option>Lisa Anderson</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Assessment Notes <span className="text-gray-400">(optional)</span></label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none"
                  placeholder="Observations, risk factors, control measures in place..."
                  value={riskForm.notes}
                  onChange={e => setRiskForm(f => ({ ...f, notes: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setShowAddRisk(false)}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitRiskAssessment}
                disabled={!riskForm.level || (!riskForm.area && !riskForm.customArea) || !riskForm.lastAssessed}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={14} /> Save Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Log Visit Modal (polished) ── */}
      {showLogVisit && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-auto flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <LogIn size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-base text-gray-900">Log a Visit</h2>
                <p className="text-xs text-gray-500">Recording visit for <span className="text-gray-700">{user.name}</span></p>
              </div>
              <button
                onClick={() => { setShowLogVisit(false); setVisitForm({ visitorName: '', relation: '', date: '', timeIn: '', timeOut: '', purpose: '', signedInBy: '', notes: '' }); }}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="px-6 py-5 space-y-5 overflow-y-auto">

              {/* Section: Visitor */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center text-purple-600 text-xs font-bold">1</div>
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Visitor Details</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">Visitor Name <span className="text-red-400">*</span></label>
                    <select
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-50 bg-white transition-all"
                      value={visitForm.visitorName}
                      onChange={e => {
                        const v = user.visitors.find(v => v.name === e.target.value);
                        setVisitForm(f => ({ ...f, visitorName: e.target.value, relation: v?.relation ?? f.relation }));
                      }}
                    >
                      <option value="">Select approved visitor...</option>
                      {user.visitors.map(v => <option key={v.name} value={v.name}>{v.name} — {v.relation}</option>)}
                      <option value="__other__">Other (walk-in / unregistered)</option>
                    </select>
                  </div>
                  {(visitForm.visitorName === '__other__' || !user.visitors.find(v => v.name === visitForm.visitorName)) && (
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">Full Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-50 transition-all"
                        placeholder="Visitor's full name"
                        value={visitForm.visitorName === '__other__' ? '' : visitForm.visitorName}
                        onChange={e => setVisitForm(f => ({ ...f, visitorName: e.target.value }))}
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Relationship</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-50 transition-all"
                      placeholder="e.g. Mother, Friend"
                      value={visitForm.relation}
                      onChange={e => setVisitForm(f => ({ ...f, relation: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Purpose of Visit</label>
                    <select
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-50 bg-white transition-all"
                      value={(!visitForm.purpose || ['Family visit', 'Support visit', 'Birthday / celebration', 'Medical escort', 'Legal / advocacy'].includes(visitForm.purpose)) ? visitForm.purpose : 'Other'}
                      onChange={e => setVisitForm(f => ({ ...f, purpose: e.target.value === 'Other' ? '' : e.target.value }))}
                    >
                      <option value="">Select purpose...</option>
                      <option value="Family visit">Family visit</option>
                      <option value="Support visit">Support visit</option>
                      <option value="Birthday / celebration">Birthday / celebration</option>
                      <option value="Medical escort">Medical escort</option>
                      <option value="Legal / advocacy">Legal / advocacy</option>
                      <option value="Other">Other</option>
                    </select>
                    {visitForm.purpose !== undefined && visitForm.purpose !== '' && !['Family visit', 'Support visit', 'Birthday / celebration', 'Medical escort', 'Legal / advocacy'].includes(visitForm.purpose) && (
                      <input
                        type="text"
                        required
                        placeholder="Specify other purpose..."
                        className="w-full mt-2 px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-50 transition-all"
                        value={visitForm.purpose}
                        onChange={e => setVisitForm(f => ({ ...f, purpose: e.target.value }))}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-gray-100" />

              {/* Section: Time & Date */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-xs font-bold">2</div>
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Time &amp; Date</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-3 sm:col-span-1">
                    <label className="block text-xs text-gray-500 mb-1">Date <span className="text-red-400">*</span></label>
                    <input
                      type="date"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                      value={visitForm.date}
                      onChange={e => setVisitForm(f => ({ ...f, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Time In <span className="text-red-400">*</span></label>
                    <input
                      type="time"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                      value={visitForm.timeIn}
                      onChange={e => setVisitForm(f => ({ ...f, timeIn: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Time Out <span className="text-red-400">*</span></label>
                    <input
                      type="time"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                      value={visitForm.timeOut}
                      onChange={e => setVisitForm(f => ({ ...f, timeOut: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Live duration pill */}
                {visitForm.timeIn && visitForm.timeOut && calcHours(visitForm.timeIn, visitForm.timeOut) > 0 && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-purple-700 bg-purple-50 border border-purple-100 rounded-xl px-4 py-2.5">
                    <Timer size={14} className="text-purple-400 shrink-0" />
                    <span>Visit duration: <strong>{calcHours(visitForm.timeIn, visitForm.timeOut)} hour{calcHours(visitForm.timeIn, visitForm.timeOut) !== 1 ? 's' : ''}</strong></span>
                  </div>
                )}
                {visitForm.timeIn && visitForm.timeOut && calcHours(visitForm.timeIn, visitForm.timeOut) <= 0 && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>Time Out must be after Time In</span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-gray-100" />

              {/* Section: Staff & Notes */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-emerald-100 rounded flex items-center justify-center text-emerald-600 text-xs font-bold">3</div>
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Staff &amp; Notes</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Signed In By</label>
                    <select
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 bg-white transition-all"
                      value={visitForm.signedInBy}
                      onChange={e => setVisitForm(f => ({ ...f, signedInBy: e.target.value }))}
                    >
                      <option value="">Select staff member...</option>
                      <option>Mary Thompson</option>
                      <option>John Davies</option>
                      <option>Sarah Williams</option>
                      <option>James Mitchell</option>
                      <option>Lisa Anderson</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Notes <span className="text-gray-400">(optional)</span></label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 resize-none transition-all"
                      placeholder="Any observations, items brought in, mood of service user during visit..."
                      value={visitForm.notes}
                      onChange={e => setVisitForm(f => ({ ...f, notes: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/60 rounded-b-2xl shrink-0">
              <p className="text-xs text-gray-400"><span className="text-red-400">*</span> Required fields</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setShowLogVisit(false); setVisitForm({ visitorName: '', relation: '', date: '', timeIn: '', timeOut: '', purpose: '', signedInBy: '', notes: '' }); }}
                  className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitVisitLog}
                  disabled={
                    !visitForm.visitorName ||
                    visitForm.visitorName === '__other__' ||
                    !visitForm.date ||
                    !visitForm.timeIn ||
                    !visitForm.timeOut ||
                    calcHours(visitForm.timeIn, visitForm.timeOut) <= 0
                  }
                  className="flex items-center gap-2 px-5 py-2 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <Save size={14} /> Save Visit
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
