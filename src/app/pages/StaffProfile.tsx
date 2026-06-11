import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Badge } from '../components/Badge';
import { useNavigation } from '../context/NavigationContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { StaffTimesheetModal } from '../components/StaffTimesheetModal';
import {
  ArrowLeft, Mail, Phone, MapPin, Briefcase,
  CalendarDays, Clock, FileText, Activity, AlertCircle,
  CheckCircle2, Plus, Download, Edit, CheckCircle, Shield,
  Calendar as CalendarIcon, List, Hash
} from 'lucide-react';

type ProfileTab = 'overview' | 'schedule' | 'compliance';

interface StaffProfileProps {
  id?: number;
  showTimesheet?: boolean;
}

export default function StaffProfile({ id, showTimesheet = false }: StaffProfileProps) {
  const { setCurrentPage } = useNavigation();
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [scheduleViewMode, setScheduleViewMode] = useState<'list' | 'calendar'>('calendar');
  const [selectedMonth, setSelectedMonth] = useState('December 2025');
  const [showTimesheetModal, setShowTimesheetModal] = useState(showTimesheet);

  // Mock individual data
  const staffId = id || 1;
  const staff = {
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
    }
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
      
      <main className="ml-64 pt-24 px-8 pb-8">
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
          <div className="flex items-start justify-between">
            {/* Left: Avatar + Info */}
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <ImageWithFallback 
                  src={staff.avatarUrl}
                  alt={staff.name}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
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
                  <button className="flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium">
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
                <button className="flex items-center gap-2 text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  <Plus size={14} />
                  Add Document
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {staff.qualifications.map((qual, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-white hover:border-blue-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{qual}</div>
                          <div className="text-xs text-emerald-600 flex items-center gap-1 mt-0.5">
                            <CheckCircle2 size={12} /> Verified
                          </div>
                        </div>
                      </div>
                      <button className="text-sm text-blue-600 font-medium hover:underline">View</button>
                    </div>
                  ))}
                  
                  {/* Simulated expiring qualification */}
                  <div className="flex items-center justify-between p-4 border border-amber-200 rounded-xl bg-amber-50 hover:bg-amber-100/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                        <AlertCircle size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Manual Handling</div>
                        <div className="text-xs text-amber-600 flex items-center gap-1 mt-0.5">
                          Expires in 14 days
                        </div>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 font-medium hover:underline">Renew</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
      
      <StaffTimesheetModal 
        isOpen={showTimesheetModal} 
        onClose={() => setShowTimesheetModal(false)} 
        staff={staff} 
      />
    </div>
  );
}