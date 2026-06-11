import { X, User, Calendar, Clock, MapPin, Users, Search, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface AssignStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: any;
  onAssign: (data: any) => void;
}

export function AssignStaffModal({ isOpen, onClose, shift, onAssign }: AssignStaffModalProps) {
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifyStaff, setNotifyStaff] = useState(true);

  if (!isOpen || !shift) return null;

  // Mock available staff
  const availableStaff = [
    {
      id: 1,
      name: 'Mary Thompson',
      role: 'Support Worker',
      photo: 'MT',
      availability: 'Available',
      hoursThisWeek: 32,
      maxHours: 40,
      qualifications: ['Level 3 Diploma', 'First Aid', 'Medication Admin'],
      lastShift: '6 Dec 2025',
      rating: 4.8
    },
    {
      id: 2,
      name: 'John Davies',
      role: 'Senior Support Worker',
      photo: 'JD',
      availability: 'Available',
      hoursThisWeek: 28,
      maxHours: 40,
      qualifications: ['Level 5 Diploma', 'First Aid', 'Safeguarding Lead'],
      lastShift: '6 Dec 2025',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Sarah Williams',
      role: 'Support Worker',
      photo: 'SW',
      availability: 'Available',
      hoursThisWeek: 36,
      maxHours: 40,
      qualifications: ['Level 3 Diploma', 'First Aid'],
      lastShift: '5 Dec 2025',
      rating: 4.7
    },
    {
      id: 4,
      name: 'James Mitchell',
      role: 'Care Manager',
      photo: 'JM',
      availability: 'Partially Available',
      hoursThisWeek: 38,
      maxHours: 40,
      qualifications: ['Level 5 Diploma', 'Registered Manager', 'Safeguarding'],
      lastShift: '6 Dec 2025',
      rating: 5.0
    },
    {
      id: 5,
      name: 'Emily Roberts',
      role: 'Support Worker',
      photo: 'ER',
      availability: 'On Leave',
      hoursThisWeek: 0,
      maxHours: 40,
      qualifications: ['Level 3 Diploma', 'First Aid'],
      lastShift: '1 Dec 2025',
      rating: 4.6
    }
  ];

  const filteredStaff = availableStaff.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedStaff) {
      onAssign({
        shiftId: shift.id,
        staffId: selectedStaff.id,
        staffName: selectedStaff.name,
        notifyStaff
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-lg p-3 shadow-md">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Assign Staff to Shift</h2>
                <p className="text-sm text-gray-600 mt-1">Select a staff member for this shift</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Calendar size={12} />
                    {shift.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Clock size={12} />
                    {shift.startTime} - {shift.endTime}
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

        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Staff List */}
        <div className="overflow-y-auto max-h-[calc(90vh-300px)] p-6">
          <div className="space-y-3">
            {filteredStaff.map((staff) => {
              const isAvailable = staff.availability === 'Available';
              const isPartial = staff.availability === 'Partially Available';
              const hoursRemaining = staff.maxHours - staff.hoursThisWeek;
              
              return (
                <div
                  key={staff.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedStaff?.id === staff.id
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : isAvailable || isPartial
                      ? 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                      : 'border-gray-200 opacity-50'
                  }`}
                  onClick={() => isAvailable || isPartial ? setSelectedStaff(staff) : null}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {staff.photo}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm font-bold text-gray-900">{staff.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            isAvailable ? 'bg-green-100 text-green-700' :
                            isPartial ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {staff.availability}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-xs text-gray-600">{staff.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{staff.role}</p>
                        
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div>
                            <p className="text-xs text-gray-600">Hours This Week</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    staff.hoursThisWeek >= staff.maxHours ? 'bg-red-500' :
                                    staff.hoursThisWeek >= staff.maxHours * 0.9 ? 'bg-amber-500' :
                                    'bg-green-500'
                                  }`}
                                  style={{ width: `${(staff.hoursThisWeek / staff.maxHours) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-gray-900">
                                {staff.hoursThisWeek}/{staff.maxHours}h
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Last Shift</p>
                            <p className="text-xs font-medium text-gray-900">{staff.lastShift}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 mb-1">Qualifications</p>
                          <div className="flex flex-wrap gap-1">
                            {staff.qualifications.map((qual, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                {qual}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {selectedStaff?.id === staff.id && (
                      <CheckCircle className="text-blue-600 ml-3" size={24} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyStaff}
                onChange={(e) => setNotifyStaff(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Send notification to staff member</span>
            </label>
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={!selectedStaff}
              className={`px-4 py-2 text-white rounded-lg transition-colors ${
                selectedStaff
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Assign to Shift
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
