import { X, User, Calendar, Clock, MapPin, Users, FileText, CheckCircle, Star, Phone, Mail } from 'lucide-react';

interface ShiftDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: any;
}

export function ShiftDetailModal({ isOpen, onClose, shift }: ShiftDetailModalProps) {
  if (!isOpen || !shift) return null;

  // Mock detailed shift data
  const shiftDetails = {
    ...shift,
    staffContact: {
      phone: '+44 7700 900123',
      email: shift.staffName ? shift.staffName.toLowerCase().replace(' ', '.') + '@mpoweredcare.com' : '',
      emergencyContact: '+44 7700 900456'
    },
    checkInTime: shift.status === 'confirmed' || shift.status === 'scheduled' ? '07:02' : null,
    checkOutTime: null,
    actualHours: null,
    breakTaken: '30 min',
    tasks: [
      { task: 'Morning medication round', status: 'pending', time: '08:00' },
      { task: 'Breakfast support', status: 'pending', time: '08:30' },
      { task: 'Personal care assistance', status: 'pending', time: '09:30' },
      { task: 'Activity planning', status: 'pending', time: '11:00' },
      { task: 'Lunch preparation and support', status: 'pending', time: '12:30' },
      { task: 'Documentation and handover notes', status: 'pending', time: '14:30' }
    ],
    previousShifts: [
      { date: '6 Dec 2025', duration: '8h', rating: 5, notes: 'Excellent shift, all tasks completed' },
      { date: '5 Dec 2025', duration: '8h', rating: 5, notes: 'Good communication with team' },
      { date: '4 Dec 2025', duration: '8h', rating: 4, notes: 'Slight delay in documentation' }
    ],
    supervisor: 'James Mitchell',
    costCenter: 'Main House - Day Shift',
    hourlyRate: '£12.50'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'scheduled':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'unfilled':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-lg shadow-md">
                {shift.staffName ? shift.staffName.split(' ').map((n: string) => n[0]).join('') : '?'}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {shift.staffName || 'Unassigned Shift'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{shift.role}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Calendar size={12} />
                    {shift.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Clock size={12} />
                    {shift.startTime} - {shift.endTime} ({shift.duration})
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin size={12} />
                    {shift.location}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          {/* Status & Basic Info */}
          <section className="mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(shift.status)}`}>
                  {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Supervisor</p>
                <p className="text-sm font-medium text-gray-900">{shiftDetails.supervisor}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Cost Center</p>
                <p className="text-sm font-medium text-gray-900">{shiftDetails.costCenter}</p>
              </div>
            </div>
          </section>

          {/* Staff Contact Information */}
          {shift.staffName && (
            <section className="mb-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="text-blue-600" size={18} />
                    <div>
                      <p className="text-xs text-gray-600">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{shiftDetails.staffContact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-blue-600" size={18} />
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="text-sm font-medium text-gray-900">{shiftDetails.staffContact.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Time Tracking */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Time Tracking</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Scheduled Start</p>
                  <p className="text-sm font-bold text-gray-900">{shift.startTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Check-In Time</p>
                  <p className="text-sm font-bold text-gray-900">
                    {shiftDetails.checkInTime || <span className="text-gray-400">Not checked in</span>}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Check-Out Time</p>
                  <p className="text-sm font-bold text-gray-900">
                    {shiftDetails.checkOutTime || <span className="text-gray-400">Not checked out</span>}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Break Duration</p>
                  <p className="text-sm font-bold text-gray-900">{shiftDetails.breakTaken}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Service Users */}
          {shift.serviceUsers && shift.serviceUsers.length > 0 && (
            <section className="mb-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Assigned Service Users</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                  {shift.serviceUsers.map((user: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                        {user.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user}</p>
                        <p className="text-xs text-gray-600">Active care plan</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Shift Tasks */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Shift Tasks</h3>
            <div className="space-y-2">
              {shiftDetails.tasks.map((task: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <Clock className="text-gray-400 mt-0.5" size={16} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{task.task}</p>
                        <p className="text-xs text-gray-600 mt-1">Scheduled: {task.time}</p>
                      </div>
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                        {task.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Previous Performance */}
          {shift.staffName && (
            <section className="mb-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Recent Performance</h3>
              <div className="space-y-3">
                {shiftDetails.previousShifts.map((prev: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{prev.date}</p>
                        <p className="text-xs text-gray-600">Duration: {prev.duration}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < prev.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-700">{prev.notes}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Shift Notes */}
          {shift.notes && (
            <section className="mb-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Shift Notes</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <FileText className="text-gray-500 mt-0.5" size={18} />
                  <p className="text-sm text-gray-900">{shift.notes}</p>
                </div>
              </div>
            </section>
          )}

          {/* Financial Information */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-4">Financial Details</h3>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Hourly Rate</p>
                  <p className="text-sm font-bold text-gray-900">{shiftDetails.hourlyRate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Shift Duration</p>
                  <p className="text-sm font-bold text-gray-900">{shift.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Estimated Cost</p>
                  <p className="text-sm font-bold text-gray-900">
                    £{(parseFloat(shiftDetails.hourlyRate.replace('£', '')) * parseInt(shift.duration)).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50">
          <div className="text-xs text-gray-600">
            Shift ID: SH-{shift.id.toString().padStart(6, '0')}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Print Shift Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
