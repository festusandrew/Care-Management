import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { AddMedicationModal } from '../components/AddMedicationModal';
import { MedicationDetailModal } from '../components/MedicationDetailModal';
import { AdministerMedicationModal } from '../components/AdministerMedicationModal';
import { MarkMedicationModal } from '../components/MarkMedicationModal';
import { EditMedicationScheduleModal } from '../components/EditMedicationScheduleModal';
import { 
  Search,
  Filter,
  Plus,
  Download,
  Calendar,
  Clock,
  User,
  Pill,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  MoreVertical,
  Bell,
  TrendingUp,
  Activity,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { MedicationRecord, ServiceUser } from '../mockData/mockStore';

export default function Medications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [showMedicationDetail, setShowMedicationDetail] = useState(false);
  const [showAdministerModal, setShowAdministerModal] = useState(false);
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [showEditSchedule, setShowEditSchedule] = useState(false);
  const [markModalType, setMarkModalType] = useState<'refused' | 'missed'>('refused');
  const [selectedMedication, setSelectedMedication] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'today' | 'week' | 'all'>('today');
  const [dismissAlert, setDismissAlert] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterTime, setFilterTime] = useState<string>('');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [serviceUsersList, setServiceUsersList] = useState<ServiceUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [meds, users] = await Promise.all([
          api.getMedications(),
          api.getServiceUsers()
        ]);
        setMedications(meds);
        setServiceUsersList(users);
      } catch (err) {
        console.error('Failed to load medications data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalDue = medications.filter(m => m.status === 'due' || m.status === 'pending').length;
  const administered = medications.filter(m => m.status === 'administered').length;
  const pending = medications.filter(m => m.status === 'pending').length;
  const missed = medications.filter(m => m.status === 'missed').length;
  const refused = medications.filter(m => m.status === 'refused').length;
  const complianceRate = (administered + missed + refused) > 0 
    ? Math.round((administered / (administered + missed + refused)) * 100) 
    : 100;

  const stats = {
    totalDue,
    administered,
    pending,
    missed,
    refused,
    complianceRate,
  };

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.serviceUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         med.medication.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === '' || med.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'administered':
        return <Badge variant="green">Administered</Badge>;
      case 'due':
        return <Badge variant="amber">Due Now</Badge>;
      case 'pending':
        return <Badge variant="gray">Pending</Badge>;
      case 'missed':
        return <Badge variant="red">Missed</Badge>;
      case 'refused':
        return <Badge variant="red">Refused</Badge>;
      default:
        return <Badge variant="gray">{status}</Badge>;
    }
  };

  const handleAdminister = (medId: number) => {
    const medication = medications.find(m => m.id === medId);
    if (medication) {
      setSelectedMedication(medication);
      setShowAdministerModal(true);
    }
  };

  const handleAdministerConfirm = async (data: any) => {
    try {
      let notes = data.notes || '';
      if (data.bloodPressure || data.heartRate || data.temperature) {
        const vitals = [];
        if (data.bloodPressure) vitals.push(`BP: ${data.bloodPressure}`);
        if (data.heartRate) vitals.push(`HR: ${data.heartRate}`);
        if (data.temperature) vitals.push(`Temp: ${data.temperature}`);
        notes += (notes ? '; ' : '') + `Vitals: ${vitals.join(', ')}`;
      }
      if (data.adverseReaction) {
        notes += (notes ? '; ' : '') + `ADVERSE REACTION: ${data.reactionDetails}`;
      }

      await api.administerMedication(data.medicationId, 'Mary Thompson', notes);
      const list = await api.getMedications();
      setMedications(list);
    } catch (err) {
      console.error('Failed to administer medication:', err);
    }
  };

  const handleMarkConfirm = async (data: any) => {
    try {
      let notes = `Reason: ${data.reason}; Action: ${data.actionTaken}`;
      if (data.notifiedCareManager) notes += '; Notified Care Manager';
      if (data.notifiedPhysician) notes += '; Notified Physician';
      if (data.followUpRequired) notes += `; Follow-up plan: ${data.followUpNotes}`;

      await api.updateMedicationStatus(data.medicationId, data.type, notes);
      const list = await api.getMedications();
      setMedications(list);
    } catch (err) {
      console.error('Failed to update medication status:', err);
    }
  };

  const handleEditScheduleSave = async (data: any) => {
    try {
      const scheduleUpdates: Partial<MedicationRecord> = {
        medication: data.medicationName,
        dosage: data.dosage,
        route: data.route,
        time: data.times && data.times.length > 0 ? data.times[0] : '08:00',
        notes: `Instructions: ${data.instructions}; Prescriber: ${data.prescriber}`
      };
      await api.updateMedicationSchedule(data.medicationId, scheduleUpdates);
      const list = await api.getMedications();
      setMedications(list);
    } catch (err) {
      console.error('Failed to update medication schedule:', err);
    }
  };

  const handleSaveMedications = async (entries: any[]) => {
    try {
      const targetUser = (selectedUser && selectedUser.id !== 0)
        ? selectedUser
        : (serviceUsersList[0] || { id: 1, name: 'Sarah Johnson', photo: '👧' });

      const newMeds = entries.map(entry => {
        let time = '08:00';
        if (entry.frequency.includes('evening')) {
          time = '20:00';
        } else if (entry.frequency.includes('afternoon') || entry.frequency.includes('12:00')) {
          time = '12:00';
        }

        return {
          serviceUser: targetUser.name,
          userId: targetUser.id,
          userPhoto: targetUser.photo || '👧',
          medication: entry.name,
          dosage: entry.dosage,
          time,
          route: entry.route || 'Oral',
          riskLevel: 'green' as const
        };
      });

      await api.addMedications(newMeds);
      const list = await api.getMedications();
      setMedications(list);
    } catch (err) {
      console.error('Failed to add medications:', err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Medications (MAR)" />
      <TopBar />
      
      <main className="ml-0 md:ml-64 pt-20 px-4 md:px-8 pb-8 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl text-gray-900">Medication Administration Records (MAR)</h1>
              <p className="text-sm text-gray-600 mt-1">Track and manage medication administration for all service users</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-700 font-medium"
                onClick={() => {
                  const data = JSON.stringify(medications, null, 2);
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `medication-records-${new Date().toISOString().slice(0, 10)}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <Download size={18} className="text-gray-600" />
                <span>Export MAR</span>
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm"
                onClick={() => setShowAddMedication(true)}
              >
                <Plus size={20} />
                <span>Add Medication</span>
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total Due Today</div>
                  <div className="text-2xl text-gray-900">{stats.totalDue}</div>
                </div>
                <Pill size={32} className="text-blue-600" />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Administered</div>
                  <div className="text-2xl text-gray-900">{stats.administered}</div>
                </div>
                <CheckCircle size={32} className="text-green-600" />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Pending</div>
                  <div className="text-2xl text-gray-900">{stats.pending}</div>
                </div>
                <Clock size={32} className="text-gray-600" />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Missed</div>
                  <div className="text-2xl text-gray-900">{stats.missed}</div>
                </div>
                <XCircle size={32} className="text-red-600" />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Refused</div>
                  <div className="text-2xl text-gray-900">{stats.refused}</div>
                </div>
                <AlertCircle size={32} className="text-red-600" />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Compliance</div>
                  <div className="text-2xl text-gray-900">{stats.complianceRate}%</div>
                </div>
                <TrendingUp size={32} className="text-green-600" />
              </div>
            </Card>
          </div>

          {/* Alerts Banner */}
          {stats.missed > 0 && !dismissAlert && (
            <Card className="mb-6 border-l-4 border-red-600 bg-red-50">
              <div className="flex items-center gap-3">
                <Bell size={24} className="text-red-600 shrink-0" />
                <div className="flex-1">
                  <div className="text-sm text-red-900">
                    <span className="font-medium">{stats.missed} missed medication(s)</span> require attention. Please review and document.
                  </div>
                </div>
                <button onClick={() => setDismissAlert(true)} className="p-1.5 hover:bg-red-100 rounded-lg transition-colors shrink-0">
                  <X size={16} className="text-red-600" />
                </button>
              </div>
            </Card>
          )}

          {/* Filters & Search */}
          <Card className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by service user or medication..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Filters row wrapping */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Time Filter */}
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                  <button 
                    className={`px-3 py-1 text-sm rounded ${viewMode === 'today' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
                    onClick={() => setViewMode('today')}
                  >
                    Today
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded ${viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
                    onClick={() => setViewMode('week')}
                  >
                    This Week
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded ${viewMode === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
                    onClick={() => setViewMode('all')}
                  >
                    All
                  </button>
                </div>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="due">Due Now</option>
                  <option value="pending">Pending</option>
                  <option value="administered">Administered</option>
                  <option value="missed">Missed</option>
                  <option value="refused">Refused</option>
                </select>

                {/* Time Slot Filter */}
                <select
                  value={filterTime}
                  onChange={(e) => setFilterTime(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Times</option>
                  <option value="morning">Morning (06:00-12:00)</option>
                  <option value="afternoon">Afternoon (12:00-18:00)</option>
                  <option value="evening">Evening (18:00-00:00)</option>
                  <option value="night">Night (00:00-06:00)</option>
                </select>

                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </Card>

          {/* Medications Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Service User</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Medication</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Dosage</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Time</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Route</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Administered By</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedications.map((med) => (
                    <tr key={med.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                            {med.userPhoto}
                          </div>
                          <div>
                            <div className="text-sm text-gray-900">{med.serviceUser}</div>
                            <Badge variant={med.riskLevel as any} className="text-xs">
                              {med.riskLevel === 'red' ? 'High' : med.riskLevel === 'amber' ? 'Medium' : 'Low'}
                            </Badge>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{med.medication}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{med.dosage}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <Clock size={14} className="text-gray-400" />
                          {med.time}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-700">{med.route}</div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(med.status)}
                      </td>
                      <td className="py-4 px-4">
                        {med.administeredBy ? (
                          <div>
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-700">{med.administeredBy}</span>
                            </div>
                            <div className="text-xs text-gray-500">{med.administeredAt}</div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 min-w-[200px]">
                        <div className="flex items-center gap-2">
                          {/* Primary action — varies by status */}
                          {(med.status === 'due' || med.status === 'pending') && (
                            <button
                              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 active:scale-95 transition-all shadow-sm"
                              onClick={() => handleAdminister(med.id)}
                            >
                              <CheckCircle size={14} />
                              Administer
                            </button>
                          )}
                          {med.status === 'administered' && (
                            <button
                              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                              onClick={() => { setSelectedMedication(med); setShowMedicationDetail(true); }}
                            >
                              <Eye size={14} />
                              View Record
                            </button>
                          )}
                          {(med.status === 'missed' || med.status === 'refused') && (
                            <button
                              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                              onClick={() => { setSelectedMedication(med); setShowMedicationDetail(true); }}
                            >
                              <AlertCircle size={14} />
                              View Detail
                            </button>
                          )}

                          {/* Overflow menu */}
                          <div className="relative">
                            <button
                              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              onClick={() => setOpenDropdown(openDropdown === med.id ? null : med.id)}
                            >
                              <MoreVertical size={15} />
                            </button>
                            {openDropdown === med.id && (
                              <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl border border-gray-100 shadow-xl z-20 py-1">
                                <button
                                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                  onClick={() => { setSelectedMedication(med); setShowMedicationDetail(true); setOpenDropdown(null); }}
                                >
                                  <Eye size={14} className="text-gray-400" />
                                  View Detail
                                </button>
                                <button
                                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                  onClick={() => { setSelectedMedication(med); setShowEditSchedule(true); setOpenDropdown(null); }}
                                >
                                  <Edit size={14} className="text-gray-400" />
                                  Edit Schedule
                                </button>
                                {(med.status === 'due' || med.status === 'pending') && (
                                  <>
                                    <div className="my-1 border-t border-gray-100" />
                                    <button
                                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-amber-600 hover:bg-amber-50"
                                      onClick={() => { setSelectedMedication(med); setMarkModalType('refused'); setShowMarkModal(true); setOpenDropdown(null); }}
                                    >
                                      <XCircle size={14} />
                                      Mark as Refused
                                    </button>
                                    <button
                                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                      onClick={() => { setSelectedMedication(med); setMarkModalType('missed'); setShowMarkModal(true); setOpenDropdown(null); }}
                                    >
                                      <AlertCircle size={14} />
                                      Mark as Missed
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                Showing {filteredMedications.length} of {medications.length} medications
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                  1
                </button>
                <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center py-6 text-xs text-gray-500 border-t border-gray-100 mt-8">
            Powered by MployUs
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedUser && (
        <AddMedicationModal
          isOpen={showAddMedication}
          onClose={() => {
            setShowAddMedication(false);
            setSelectedUser(null);
          }}
          userName={selectedUser.name}
          onConfirm={handleSaveMedications}
        />
      )}
      {selectedMedication && (
        <MedicationDetailModal
          isOpen={showMedicationDetail}
          onClose={() => {
            setShowMedicationDetail(false);
            setSelectedMedication(null);
          }}
          medication={selectedMedication}
        />
      )}
      {selectedMedication && (
        <AdministerMedicationModal
          isOpen={showAdministerModal}
          onClose={() => {
            setShowAdministerModal(false);
            setSelectedMedication(null);
          }}
          medication={selectedMedication}
          onConfirm={handleAdministerConfirm}
        />
      )}
      {selectedMedication && (
        <MarkMedicationModal
          isOpen={showMarkModal}
          onClose={() => {
            setShowMarkModal(false);
            setSelectedMedication(null);
          }}
          medication={selectedMedication}
          type={markModalType}
          onConfirm={handleMarkConfirm}
        />
      )}
      {selectedMedication && (
        <EditMedicationScheduleModal
          isOpen={showEditSchedule}
          onClose={() => {
            setShowEditSchedule(false);
            setSelectedMedication(null);
          }}
          medication={selectedMedication}
          onSave={handleEditScheduleSave}
        />
      )}
    </div>
  );
}