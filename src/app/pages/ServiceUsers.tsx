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
      
      <main className="ml-64 pt-24 px-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl text-gray-900">Service Users</h1>
            <p className="text-sm text-gray-600 mt-1">Manage and monitor all children in care</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => setShowAddModal(true)}>
            <Plus size={20} />
            Add New Service User
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {serviceUsers.map((user) => (
              <Card 
                key={user.id} 
                className="hover:border-blue-200 transition-colors cursor-pointer"
                onClick={() => {
                  setProfileUserId(user.id);
                  setShowProfile(true);
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                      {user.photo}
                    </div>
                    <div>
                      <h3 className="text-base text-gray-900">{user.name}</h3>
                      <p className="text-xs text-gray-600">Age {user.age} • ID: SU-{user.id.toString().padStart(4, '0')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Badge variant={user.riskLevel}>
                      {user.riskLevel === 'red' ? 'High' : user.riskLevel === 'amber' ? 'Medium' : 'Low'}
                    </Badge>
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
                              setProfileUserId(user.id);
                              setShowProfile(true);
                              setOpenDropdown(null);
                            }}
                          >
                            <Eye size={16} />
                            View Profile
                          </button>
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
                </div>

                {/* Info Grid */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-gray-700">{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User size={16} className="text-gray-400" />
                    <span className="text-gray-700">{user.careManager}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-gray-700">{user.phone}</span>
                  </div>
                </div>

                {/* Conditions */}
                <div className="mb-4">
                  <div className="text-xs text-gray-600 mb-2">Conditions:</div>
                  <div className="flex flex-wrap gap-2">
                    {user.conditions.map((condition, idx) => (
                      <Badge key={idx} variant="gray">{condition}</Badge>
                    ))}
                  </div>
                </div>

                {/* Status Row */}
                <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-600">Current Mood</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl">{user.mood}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Last Incident</div>
                    <div className="text-sm text-gray-900 mt-1">{user.lastIncident}</div>
                  </div>
                </div>

                {/* Review Alert */}
                <div 
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => console.log('View review for:', user.id)}
                >
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    <div>
                      <div className="text-xs text-blue-900">Review due in</div>
                      <div className="text-sm text-blue-700">{user.upcomingReview}</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-blue-600" />
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button 
                    className="px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    onClick={() => {
                      setProfileUserId(user.id);
                      setShowProfile(true);
                    }}
                  >
                    View Profile
                  </button>
                  <button 
                    className="px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
                  {serviceUsers.map((user) => (
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
          </Card>
        )}

        {/* Footer */}
        <div className="text-center py-6 text-xs text-gray-500 border-t border-gray-100 mt-8">
          MpoweredCare © 2025 — Internal Use Only
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