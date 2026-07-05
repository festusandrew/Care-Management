import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { AddServiceUserModal } from '../components/AddServiceUserModal';
import { QuickLogModal } from '../components/QuickLogModal';
import { FilterPanel } from '../components/FilterPanel';
import { ServiceUserProfile } from './ServiceUserProfile';
import { 
  Search,
  Filter,
  Plus,
  User,
  Calendar,
  AlertCircle,
  Clock,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  MapPin,
  Phone,
  Mail,
  Grid3x3,
  List,
  Edit,
  Trash2,
  FileText,
  Eye
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ServiceUser } from '../mockData/mockStore';

export default function ServiceUsers() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [profileUserId, setProfileUserId] = useState<number | null>(null);
  const [serviceUsers, setServiceUsers] = useState<ServiceUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const USERS_PER_PAGE = 8;

  const totalPages = Math.ceil(serviceUsers.length / USERS_PER_PAGE);
  const paginatedUsers = serviceUsers.slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE);

  useEffect(() => {
    let active = true;
    api.getServiceUsers().then(data => {
      if (active) {
        setServiceUsers(data);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  if (showProfile && profileUserId) {
    return (
      <ServiceUserProfile 
        userId={profileUserId} 
        onBack={() => {
          setShowProfile(false);
          setProfileUserId(null);
        }} 
      />
    );
  }

  const activeCount = serviceUsers.length;
  const highRiskCount = serviceUsers.filter(u => u.riskLevel === 'red').length;
  const mediumRiskCount = serviceUsers.filter(u => u.riskLevel === 'amber').length;
  const reviewsDue = 8;

  const stats = [
    { label: 'Total Service Users', value: activeCount.toString(), trend: '+2 this month' },
    { label: 'High Risk', value: highRiskCount.toString(), color: 'text-red-600' },
    { label: 'Medium Risk', value: mediumRiskCount.toString(), color: 'text-amber-600' },
    { label: 'Reviews Due', value: reviewsDue.toString(), color: 'text-blue-600' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Service Users" />
      <TopBar />
      
      <main className="ml-0 md:ml-64 pt-20 px-4 md:px-8 pb-8 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl text-gray-900">Service Users</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and monitor all children in care</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm self-start sm:self-auto" onClick={() => setShowAddModal(true)}>
              <Plus size={20} />
              <span>Add New Service User</span>
            </button>
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

        {/* Search and Filters */}
        <Card className="mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 border border-gray-100">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID, or location..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setShowFilters(true)}
            >
              <Filter size={18} className="text-gray-600" />
              <span className="text-sm text-gray-700">Filters</span>
            </button>
            <select className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <option>All Locations</option>
              <option>Riverside House</option>
              <option>Oak Tree Lodge</option>
              <option>Meadow View</option>
            </select>
            <select className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <option>All Risk Levels</option>
              <option>High Risk</option>
              <option>Medium Risk</option>
              <option>Low Risk</option>
            </select>
            <div className="flex items-center gap-1">
              <button
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </Card>

        {/* Service Users Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedUsers.map((user) => (
              <Card 
                key={user.id} 
                className="hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer flex flex-col justify-between p-5 bg-white border border-gray-150 rounded-2xl relative"
                onClick={() => {
                  setProfileUserId(user.id);
                  setShowProfile(true);
                }}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-100/60 rounded-full flex items-center justify-center text-2xl shadow-sm">
                        {user.photo}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 leading-tight">{user.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5 font-medium">Age {user.age} · ID: SU-{user.id.toString().padStart(4, '0')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <Badge variant={user.riskLevel}>
                        {user.riskLevel === 'red' ? 'High Risk' : user.riskLevel === 'amber' ? 'Medium Risk' : 'Low Risk'}
                      </Badge>
                      <div className="relative">
                        <button 
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                        >
                          <MoreVertical size={15} className="text-gray-400" />
                        </button>
                        {openDropdown === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-lg z-10 py-1">
                            <button 
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => {
                                setProfileUserId(user.id);
                                setShowProfile(true);
                                setOpenDropdown(null);
                              }}
                            >
                              <Eye size={15} />
                              View Profile
                            </button>
                            <button 
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => {
                                console.log('Edit user:', user.id);
                                setOpenDropdown(null);
                              }}
                            >
                              <Edit size={15} />
                              Edit Details
                            </button>
                            <button 
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => {
                                console.log('View care plan:', user.id);
                                setOpenDropdown(null);
                              }}
                            >
                              <FileText size={15} />
                              Care Plan
                            </button>
                            <button 
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100 mt-1"
                              onClick={() => {
                                console.log('Delete user:', user.id);
                                setOpenDropdown(null);
                              }}
                            >
                              <Trash2 size={15} />
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Info list */}
                  <div className="space-y-2 mb-4 border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      <MapPin size={14} className="text-gray-400 shrink-0" />
                      <span className="truncate">{user.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      <User size={14} className="text-gray-400 shrink-0" />
                      <span className="truncate">Manager: {user.careManager}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      <Phone size={14} className="text-gray-400 shrink-0" />
                      <span>{user.phone}</span>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="mb-4">
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-1.5">Conditions</div>
                    <div className="flex flex-wrap gap-1.5">
                      {user.conditions.map((condition, idx) => (
                        <span key={idx} className="inline-block text-[11px] px-2.5 py-0.5 font-semibold bg-gray-100 text-gray-600 rounded-full">{condition}</span>
                      ))}
                    </div>
                  </div>

                  {/* Current Mood & Last Incident Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50/50 border border-gray-100 rounded-xl">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">Current Mood</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xl">{user.mood}</span>
                        <span className="text-xs font-bold text-gray-700 capitalize">{user.mood === '😊' ? 'happy' : user.mood === '😐' ? 'neutral' : 'unhappy'}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">Last Incident</div>
                      <div className="text-xs font-bold text-gray-700 truncate mt-1">{user.lastIncident || 'None'}</div>
                    </div>
                  </div>

                  {/* Review Alert */}
                  <div 
                    className="flex items-center justify-between p-2.5 bg-blue-50/50 hover:bg-blue-50 border border-blue-100/50 rounded-xl cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('View review for:', user.id);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Calendar size={15} className="text-blue-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[10px] font-semibold text-blue-500 uppercase tracking-wider">Review Due</div>
                        <div className="text-xs font-bold text-blue-700 truncate">{user.upcomingReview}</div>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-blue-500 shrink-0" />
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="grid grid-cols-2 gap-2 mt-5 border-t border-gray-50 pt-4" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="px-3 py-2 text-xs text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors font-bold"
                    onClick={() => {
                      setProfileUserId(user.id);
                      setShowProfile(true);
                    }}
                  >
                    View Profile
                  </button>
                  <button 
                    className="px-3 py-2 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-bold shadow-sm"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowQuickLog(true);
                    }}
                  >
                    Quick Log
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {viewMode === 'grid' && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border border-gray-100 bg-white rounded-xl shadow-sm mt-6">
            <span className="text-xs text-gray-500 font-semibold">
              Showing {Math.min((page - 1) * USERS_PER_PAGE + 1, serviceUsers.length)}–
              {Math.min(page * USERS_PER_PAGE, serviceUsers.length)} of {serviceUsers.length} service users
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-3 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-md font-semibold min-w-[48px] text-center">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Service Users List View */}
        {viewMode === 'list' && (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Service User</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Risk</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Location</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Care Manager</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Conditions</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Mood</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Last Incident</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Review Due</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setProfileUserId(user.id);
                        setShowProfile(true);
                      }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                            {user.photo}
                          </div>
                          <div>
                            <div className="text-sm text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-600">Age {user.age} • SU-{user.id.toString().padStart(4, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={user.riskLevel}>
                          {user.riskLevel === 'red' ? 'High' : user.riskLevel === 'amber' ? 'Medium' : 'Low'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin size={14} className="text-gray-400" />
                          {user.location}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <User size={14} className="text-gray-400" />
                          {user.careManager}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {user.conditions.map((condition, idx) => (
                            <Badge key={idx} variant="gray">{condition}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-2xl">{user.mood}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-700">{user.lastIncident}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-blue-600" />
                          <span className="text-sm text-gray-700">{user.upcomingReview}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button 
                            className="px-3 py-1 text-xs text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                            onClick={() => {
                              setProfileUserId(user.id);
                              setShowProfile(true);
                            }}
                          >
                            View
                          </button>
                          <button 
                            className="px-3 py-1 text-xs text-gray-700 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowQuickLog(true);
                            }}
                          >
                            Log
                          </button>
                          <div className="relative">
                            <button 
                              className="p-1 hover:bg-gray-100 rounded"
                              onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                            >
                              <MoreVertical size={16} className="text-gray-400" />
                            </button>
                            {openDropdown === user.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-100 shadow-lg z-10">
                                <button 
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                  onClick={() => {
                                    console.log('Edit user:', user.id);
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <Edit size={16} />
                                  Edit Details
                                </button>
                                <button 
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                  onClick={() => {
                                    console.log('View care plan:', user.id);
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <FileText size={16} />
                                  Care Plan
                                </button>
                                <button 
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                                  onClick={() => {
                                    console.log('Delete user:', user.id);
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <Trash2 size={16} />
                                  Remove
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
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 bg-white">
                <span className="text-xs text-gray-500 font-semibold">
                  Showing {Math.min((page - 1) * USERS_PER_PAGE + 1, serviceUsers.length)}–
                  {Math.min(page * USERS_PER_PAGE, serviceUsers.length)} of {serviceUsers.length} service users
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="px-3 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-md font-semibold min-w-[48px] text-center">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Footer */}
        <div className="text-center py-6 text-xs text-gray-500 border-t border-gray-100 mt-8">
          Powered by MployUs
        </div>
      </div>
    </main>

      {/* Modals */}
      <AddServiceUserModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={(newUser) => setServiceUsers(prev => [...prev, newUser])}
      />
      
      {selectedUser && (
        <QuickLogModal
          isOpen={showQuickLog}
          onClose={() => {
            setShowQuickLog(false);
            setSelectedUser(null);
          }}
          userName={selectedUser.name}
          userId={selectedUser.id}
        />
      )}

      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
      />
    </div>
  );
}