export type ClockEvent = {
  staffId: number;
  name: string;
  employeeId: string;
  avatarUrl: string;
  clockIn: string | null;
  clockOut: string | null;
  scheduledIn: string;
  scheduledOut: string;
  location: string;
  role: string;
};

export type LeaveStatus = 'pending' | 'approved' | 'declined';
export type LeaveRequest = {
  id: number;
  staffId: number;
  name: string;
  employeeId: string;
  avatarUrl: string;
  role: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  submittedOn: string;
  status: LeaveStatus;
  adminNote: string;
};

export type HistoryRecord = ClockEvent & {
  date: string;
  hoursWorked: number | null;
};

export type ServiceUser = {
  id: number;
  name: string;
  age: number;
  photo: string;
  status: string;
  riskLevel: 'red' | 'amber' | 'green';
  mood: string;
  location: string;
  careManager: string;
  lastIncident: string;
  upcomingReview: string;
  conditions: string[];
  phone: string;
};

export type StaffMember = {
  id: number;
  employeeId: string;
  name: string;
  role: string;
  status: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  nextShift: string;
  qualifications: string[];
};

export type Alert = {
  type: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  icon: 'medication' | 'review' | 'incident' | 'compliance';
};

export type MedicationRecord = {
  id: number;
  serviceUser: string;
  userId: number;
  userPhoto: string;
  medication: string;
  dosage: string;
  time: string;
  route: string;
  status: string;
  administeredBy: string;
  administeredAt: string;
  notes: string;
  riskLevel: 'red' | 'amber' | 'green';
};

// --- In-Memory Database State ---

let alerts: Alert[] = [
  {
    type: 'medication',
    title: 'Missed Medication',
    description: '3 missed MAR entries',
    severity: 'critical',
    icon: 'medication'
  },
  {
    type: 'review',
    title: 'Care Plan Reviews',
    description: '2 care plans overdue',
    severity: 'warning',
    icon: 'review'
  },
  {
    type: 'incident',
    title: 'Unresolved Incidents',
    description: '2 incidents pending review',
    severity: 'warning',
    icon: 'incident'
  },
  {
    type: 'compliance',
    title: 'Compliance Updates',
    description: '5 items require attention',
    severity: 'info',
    icon: 'compliance'
  }
];

let serviceUsers: ServiceUser[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 14,
    photo: '👧',
    status: 'active',
    riskLevel: 'amber',
    mood: '😊',
    location: 'Riverside House',
    careManager: 'Dr. Emily Carter',
    lastIncident: '3 days ago',
    upcomingReview: '5 days',
    conditions: ['Autism', 'Anxiety'],
    phone: '07700 900123',
  },
  {
    id: 2,
    name: 'Michael Thompson',
    age: 16,
    photo: '👦',
    status: 'active',
    riskLevel: 'red',
    mood: '😰',
    location: 'Oak Tree Lodge',
    careManager: 'Sarah Williams',
    lastIncident: '12 hours ago',
    upcomingReview: '2 weeks',
    conditions: ['ADHD', 'Behavioral'],
    phone: '07700 900456',
  },
  {
    id: 3,
    name: 'Emma Roberts',
    age: 12,
    photo: '👧',
    status: 'active',
    riskLevel: 'green',
    mood: '😌',
    location: 'Riverside House',
    careManager: 'Dr. Emily Carter',
    lastIncident: '2 weeks ago',
    upcomingReview: '1 month',
    conditions: ['None'],
    phone: '07700 900789',
  },
  {
    id: 4,
    name: 'Oliver Parker',
    age: 15,
    photo: '👦',
    status: 'active',
    riskLevel: 'amber',
    mood: '😐',
    location: 'Meadow View',
    careManager: 'James Mitchell',
    lastIncident: '1 week ago',
    upcomingReview: '10 days',
    conditions: ['Depression'],
    phone: '07700 900321',
  },
  {
    id: 5,
    name: 'Sophie Martinez',
    age: 13,
    photo: '👧',
    status: 'active',
    riskLevel: 'green',
    mood: '😊',
    location: 'Oak Tree Lodge',
    careManager: 'Sarah Williams',
    lastIncident: '1 month ago',
    upcomingReview: '3 weeks',
    conditions: ['None'],
    phone: '07700 900654',
  },
  {
    id: 6,
    name: 'Lucas Chen',
    age: 14,
    photo: '👦',
    status: 'active',
    riskLevel: 'red',
    mood: '😢',
    location: 'Meadow View',
    careManager: 'James Mitchell',
    lastIncident: '6 hours ago',
    upcomingReview: '1 week',
    conditions: ['PTSD', 'Anxiety'],
    phone: '07700 900987',
  }
];

let staffMembers: StaffMember[] = [
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

let clockEvents: ClockEvent[] = [
  { staffId: 1, name: 'Mary Thompson',  employeeId: 'EMP-0001', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60', clockIn: '07:02', clockOut: null,    scheduledIn: '07:00', scheduledOut: '15:00', location: 'Main House',     role: 'Support Worker' },
  { staffId: 2, name: 'John Davies',    employeeId: 'EMP-0002', avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&auto=format&fit=crop&q=60', clockIn: '06:58', clockOut: '15:01', scheduledIn: '07:00', scheduledOut: '15:00', location: 'Annex Building', role: 'Senior Support Worker' },
  { staffId: 7, name: 'Lisa Anderson',  employeeId: 'EMP-0007', avatarUrl: 'https://images.unsplash.com/photo-1594824419266-9b16414777a8?w=800&auto=format&fit=crop&q=60', clockIn: '07:59', clockOut: '16:03', scheduledIn: '08:00', scheduledOut: '16:00', location: 'Main House',     role: 'Nurse' },
  { staffId: 4, name: 'James Mitchell', employeeId: 'EMP-0004', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60', clockIn: '09:14', clockOut: null,    scheduledIn: '09:00', scheduledOut: '17:00', location: 'Office',         role: 'Care Manager' },
  { staffId: 3, name: 'Sarah Williams', employeeId: 'EMP-0003', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60', clockIn: null,    clockOut: null,    scheduledIn: '15:00', scheduledOut: '23:00', location: 'Main House',     role: 'Support Worker' },
];

let leaveRequests: LeaveRequest[] = [
  { id: 1, staffId: 1, name: 'Mary Thompson',  employeeId: 'EMP-0001', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60', role: 'Support Worker',        type: 'Annual Leave',    from: '23 Jun 2026', to: '27 Jun 2026', days: 5, reason: 'Family holiday booked in advance.',          submittedOn: '8 Jun 2026',  status: 'pending',  adminNote: '' },
  { id: 2, staffId: 4, name: 'James Mitchell',  employeeId: 'EMP-0004', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60', role: 'Care Manager',          type: 'Medical Leave',   from: '15 Jun 2026', to: '16 Jun 2026', days: 2, reason: 'GP appointment and recovery.',               submittedOn: '9 Jun 2026',  status: 'pending',  adminNote: '' },
  { id: 3, staffId: 2, name: 'John Davies',     employeeId: 'EMP-0002', avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&auto=format&fit=crop&q=60', role: 'Senior Support Worker', type: 'Annual Leave',    from: '30 Jun 2026', to: '4 Jul 2026',  days: 5, reason: 'Pre-booked holiday abroad.',                submittedOn: '5 Jun 2026',  status: 'approved', adminNote: 'Cover arranged with agency.' },
  { id: 4, staffId: 7, name: 'Lisa Anderson',   employeeId: 'EMP-0007', avatarUrl: 'https://images.unsplash.com/photo-1594824419266-9b16414777a8?w=800&auto=format&fit=crop&q=60', role: 'Nurse',                 type: 'Emergency Leave', from: '11 Jun 2026', to: '11 Jun 2026', days: 1, reason: 'Family emergency — urgent travel required.', submittedOn: '10 Jun 2026', status: 'approved', adminNote: '' },
  { id: 5, staffId: 3, name: 'Sarah Williams',  employeeId: 'EMP-0003', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60', role: 'Support Worker',        type: 'Annual Leave',    from: '14 Jun 2026', to: '14 Jun 2026', days: 1, reason: 'Personal appointment.',                     submittedOn: '7 Jun 2026',  status: 'declined', adminNote: 'Insufficient cover on that date.' },
];

let attendanceHistory: HistoryRecord[] = [
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

let medications: MedicationRecord[] = [
  {
    id: 1,
    serviceUser: 'Sarah Johnson',
    userId: 1,
    userPhoto: '👧',
    medication: 'Sertraline',
    dosage: '50mg',
    time: '08:00',
    route: 'Oral',
    status: 'administered',
    administeredBy: 'Mary Thompson',
    administeredAt: '08:05',
    notes: '',
    riskLevel: 'amber',
  },
  {
    id: 2,
    serviceUser: 'Michael Thompson',
    userId: 2,
    userPhoto: '👦',
    medication: 'Methylphenidate',
    dosage: '20mg',
    time: '08:00',
    route: 'Oral',
    status: 'due',
    administeredBy: '',
    administeredAt: '',
    notes: '',
    riskLevel: 'green',
  },
  {
    id: 3,
    serviceUser: 'Emma Roberts',
    userId: 3,
    userPhoto: '👧',
    medication: 'Fluoxetine',
    dosage: '20mg',
    time: '08:00',
    route: 'Oral',
    status: 'administered',
    administeredBy: 'John Davies',
    administeredAt: '08:10',
    notes: '',
    riskLevel: 'green',
  },
  {
    id: 4,
    serviceUser: 'Oliver Parker',
    userId: 4,
    userPhoto: '👦',
    medication: 'Risperidone',
    dosage: '2mg',
    time: '09:00',
    route: 'Oral',
    status: 'due',
    administeredBy: '',
    administeredAt: '',
    notes: '',
    riskLevel: 'red',
  },
  {
    id: 5,
    serviceUser: 'Sarah Johnson',
    userId: 1,
    userPhoto: '👧',
    medication: 'Paracetamol (PRN)',
    dosage: '500mg',
    time: '10:30',
    route: 'Oral',
    status: 'refused',
    administeredBy: 'Mary Thompson',
    administeredAt: '10:30',
    notes: 'Patient refused, said feeling better',
    riskLevel: 'amber',
  },
  {
    id: 6,
    serviceUser: 'Michael Thompson',
    userId: 2,
    userPhoto: '👦',
    medication: 'Melatonin',
    dosage: '3mg',
    time: '19:00',
    route: 'Oral',
    status: 'pending',
    administeredBy: '',
    administeredAt: '',
    notes: '',
    riskLevel: 'green',
  },
  {
    id: 7,
    serviceUser: 'Emma Roberts',
    userId: 3,
    userPhoto: '👧',
    medication: 'Vitamin D',
    dosage: '1000 IU',
    time: '12:00',
    route: 'Oral',
    status: 'administered',
    administeredBy: 'Sarah Williams',
    administeredAt: '12:05',
    notes: '',
    riskLevel: 'green',
  },
  {
    id: 8,
    serviceUser: 'Oliver Parker',
    userId: 4,
    userPhoto: '👦',
    medication: 'Lorazepam (PRN)',
    dosage: '1mg',
    time: '11:00',
    route: 'Oral',
    status: 'missed',
    administeredBy: '',
    administeredAt: '',
    notes: 'Service user was off-site',
    riskLevel: 'red',
  },
  {
    id: 9,
    serviceUser: 'Sarah Johnson',
    userId: 1,
    userPhoto: '👧',
    medication: 'Sertraline',
    dosage: '50mg',
    time: '20:00',
    route: 'Oral',
    status: 'pending',
    administeredBy: '',
    administeredAt: '',
    notes: '',
    riskLevel: 'amber',
  },
  {
    id: 10,
    serviceUser: 'Michael Thompson',
    userId: 2,
    userPhoto: '👦',
    medication: 'Methylphenidate',
    dosage: '20mg',
    time: '12:00',
    route: 'Oral',
    status: 'administered',
    administeredBy: 'James Mitchell',
    administeredAt: '12:03',
    notes: '',
    riskLevel: 'green',
  },
];

// --- Database Helpers / Accessors ---

export const mockStore = {
  getAlerts: () => [...alerts],
  
  getServiceUsers: () => [...serviceUsers],
  
  getServiceUserById: (id: number) => serviceUsers.find(u => u.id === id),
  
  addServiceUser: (user: Omit<ServiceUser, 'id'>) => {
    const newId = serviceUsers.length > 0 ? Math.max(...serviceUsers.map(u => u.id)) + 1 : 1;
    const newUser: ServiceUser = { ...user, id: newId };
    serviceUsers.push(newUser);
    return newUser;
  },

  getStaffMembers: () => [...staffMembers],
  
  addStaffMember: (staff: Omit<StaffMember, 'id'>) => {
    const newId = staffMembers.length > 0 ? Math.max(...staffMembers.map(s => s.id)) + 1 : 1;
    const newStaff: StaffMember = { ...staff, id: newId };
    staffMembers.push(newStaff);
    
    // Add an initial clock event for the new staff member as well
    const newEvent: ClockEvent = {
      staffId: newId,
      name: newStaff.name,
      employeeId: newStaff.employeeId,
      avatarUrl: newStaff.avatarUrl,
      clockIn: null,
      clockOut: null,
      scheduledIn: '09:00',
      scheduledOut: '17:00',
      location: newStaff.location,
      role: newStaff.role
    };
    clockEvents.push(newEvent);
    
    return newStaff;
  },

  getClockEvents: () => [...clockEvents],
  
  clockOutStaff: (staffId: number, note?: string) => {
    const nowStr = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    let updatedEvent: ClockEvent | null = null;
    clockEvents = clockEvents.map(e => {
      if (e.staffId === staffId) {
        updatedEvent = { ...e, clockOut: nowStr };
        return updatedEvent;
      }
      return e;
    });
    return updatedEvent;
  },

  getLeaveRequests: () => [...leaveRequests],
  
  updateLeaveRequestStatus: (id: number, status: LeaveStatus, note?: string) => {
    let updatedRequest: LeaveRequest | null = null;
    leaveRequests = leaveRequests.map(r => {
      if (r.id === id) {
        updatedRequest = { ...r, status, adminNote: note || '' };
        return updatedRequest;
      }
      return r;
    });
    return updatedRequest;
  },

  logLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'submittedOn'>) => {
    const newId = Date.now();
    const submittedOn = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const newRequest: LeaveRequest = {
      ...request,
      id: newId,
      submittedOn
    };
    leaveRequests.unshift(newRequest);
    return newRequest;
  },

  getAttendanceHistory: () => [...attendanceHistory],

  getMedications: () => [...medications],

  addMedications: (newMeds: Omit<MedicationRecord, 'id' | 'status' | 'administeredBy' | 'administeredAt' | 'notes'>[]) => {
    const added: MedicationRecord[] = [];
    newMeds.forEach(med => {
      const newId = medications.length > 0 ? Math.max(...medications.map(m => m.id)) + 1 : 1;
      const newRecord: MedicationRecord = {
        ...med,
        id: newId,
        status: 'due',
        administeredBy: '',
        administeredAt: '',
        notes: ''
      };
      medications.push(newRecord);
      added.push(newRecord);
    });
    return added;
  },

  administerMedication: (id: number, administeredBy: string, notes?: string) => {
    const nowStr = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    let updated: MedicationRecord | null = null;
    medications = medications.map(m => {
      if (m.id === id) {
        updated = {
          ...m,
          status: 'administered',
          administeredBy,
          administeredAt: nowStr,
          notes: notes || ''
        };
        return updated;
      }
      return m;
    });
    return updated;
  },

  updateMedicationStatus: (id: number, status: string, notes?: string) => {
    let updated: MedicationRecord | null = null;
    medications = medications.map(m => {
      if (m.id === id) {
        updated = {
          ...m,
          status,
          notes: notes || ''
        };
        return updated;
      }
      return m;
    });
    return updated;
  },

  updateMedicationSchedule: (id: number, schedule: Partial<MedicationRecord>) => {
    let updated: MedicationRecord | null = null;
    medications = medications.map(m => {
      if (m.id === id) {
        updated = {
          ...m,
          ...schedule
        };
        return updated;
      }
      return m;
    });
    return updated;
  }
};
