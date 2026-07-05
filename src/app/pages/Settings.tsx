import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { AddUserModal } from '../components/AddUserModal';
import { EditUserModal } from '../components/EditUserModal';
import { EditPermissionsModal } from '../components/EditPermissionsModal';
import { 
  User,
  Building,
  Bell,
  Shield,
  Key,
  Globe,
  Users,
  Database,
  Palette,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Save,
  X,
  Check,
  Upload,
  Download,
  Trash2,
  Edit,
  Plus,
  Settings as SettingsIcon,
  AlertCircle
} from 'lucide-react';
import { useState, useRef } from 'react';
import { useBranding } from '../context/BrandingContext';

export default function Settings() {
  const [activeSection, setActiveSection] = useState<'profile' | 'organization' | 'notifications' | 'security' | 'users' | 'system'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showEditPermissions, setShowEditPermissions] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@mpoweredcare.com',
    phone: '+44 7700 900123',
    jobTitle: 'Care Manager',
    department: 'Clinical Services',
    employeeId: 'EMP-001',
  });

  const { clientLogoUrl, setClientLogoUrl, clientName, setClientName, sidebarColor, setSidebarColor } = useBranding();
  const logoFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setClientLogoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const [organizationData, setOrganizationData] = useState({
    facilityName: 'MpoweredCare Residential Services',
    address: '123 Care Street, London',
    postcode: 'SW1A 1AA',
    phone: '+44 20 7946 0958',
    email: 'info@mpoweredcare.com',
    registrationNumber: 'CQC-12345678',
    capacity: '24',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailIncidents: true,
    emailMedication: true,
    emailCompliance: true,
    emailSchedule: false,
    smsUrgent: true,
    smsIncidents: true,
    smsMedication: false,
    inAppAll: true,
    inAppIncidents: true,
    inAppMedication: true,
    inAppSchedule: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5',
  });

  const staffUsers = [
    { id: 1, name: 'Mary Thompson', email: 'mary.t@mpoweredcare.com', role: 'Senior Support Worker', status: 'active', lastLogin: '7 Dec 2025, 09:15' },
    { id: 2, name: 'John Davies', email: 'john.d@mpoweredcare.com', role: 'Support Worker', status: 'active', lastLogin: '7 Dec 2025, 08:30' },
    { id: 3, name: 'Sarah Williams', email: 'sarah.w@mpoweredcare.com', role: 'Care Manager', status: 'active', lastLogin: '7 Dec 2025, 10:00' },
    { id: 4, name: 'James Mitchell', email: 'james.m@mpoweredcare.com', role: 'Support Worker', status: 'active', lastLogin: '6 Dec 2025, 18:45' },
    { id: 5, name: 'Emily Roberts', email: 'emily.r@mpoweredcare.com', role: 'Admin', status: 'active', lastLogin: '7 Dec 2025, 07:30' },
    { id: 6, name: 'David Brown', email: 'david.b@mpoweredcare.com', role: 'Support Worker', status: 'inactive', lastLogin: '1 Dec 2025, 16:20' },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile:', profileData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveOrganization = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving organization:', organizationData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving notifications:', notificationSettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving security:', securitySettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddUser = (data: any) => {
    console.log('Adding user:', data);
    // In a real app, this would create a new user account
  };

  const handleEditUser = (data: any) => {
    console.log('Editing user:', data);
    // In a real app, this would update the user account
  };

  const handleEditPermissions = (data: any) => {
    console.log('Updating permissions:', data);
    // In a real app, this would update role permissions
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Settings" />
      <TopBar />
      
      <main className="ml-0 md:ml-64 pt-20 px-4 md:px-8 pb-8 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl text-gray-900">Settings</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your account, organization, and system preferences</p>
            </div>
            {saveSuccess && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                <Check size={18} className="text-green-600" />
                <span className="text-sm text-green-900">Settings saved successfully</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar Navigation */}
            <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                    activeSection === 'profile' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User size={18} />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => setActiveSection('organization')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                    activeSection === 'organization' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Building size={18} />
                  <span>Organization</span>
                </button>
                <button
                  onClick={() => setActiveSection('notifications')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                    activeSection === 'notifications' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Bell size={18} />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setActiveSection('security')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                    activeSection === 'security' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Shield size={18} />
                  <span>Security</span>
                </button>
                <button
                  onClick={() => setActiveSection('users')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                    activeSection === 'users' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Users size={18} />
                  <span>User Management</span>
                </button>
                <button
                  onClick={() => setActiveSection('system')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                    activeSection === 'system' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Database size={18} />
                  <span>System & Data</span>
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl text-gray-900">Personal Information</h2>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Upload size={16} />
                      Upload Photo
                    </button>
                  </div>

                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-2xl text-blue-700">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </div>
                    <div>
                      <div className="text-lg text-gray-900">{profileData.firstName} {profileData.lastName}</div>
                      <div className="text-sm text-gray-600">{profileData.jobTitle}</div>
                      <div className="text-sm text-gray-600">{profileData.department}</div>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Job Title</label>
                        <input
                          type="text"
                          value={profileData.jobTitle}
                          onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Department</label>
                        <select
                          value={profileData.department}
                          onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value="Clinical Services">Clinical Services</option>
                          <option value="Care Planning">Care Planning</option>
                          <option value="Safeguarding">Safeguarding</option>
                          <option value="Administration">Administration</option>
                          <option value="Facilities">Facilities</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                    </div>
                  </form>
                </Card>

                {/* Change Password */}
                <Card>
                  <h2 className="text-xl text-gray-900 mb-6">Change Password</h2>
                  <form>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">New Password</label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Confirm New Password</label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={16} className="text-blue-600 mt-0.5" />
                        <div className="text-xs text-blue-900">
                          Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Lock size={16} />
                        Update Password
                      </button>
                    </div>
                  </form>
                </Card>
              </div>
            )}

            {/* Organization Section */}
            {activeSection === 'organization' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-xl text-gray-900 mb-6">Facility Information</h2>
                  <form onSubmit={handleSaveOrganization}>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="col-span-2">
                        <label className="block text-sm text-gray-700 mb-2">Facility Name</label>
                        <input
                          type="text"
                          value={organizationData.facilityName}
                          onChange={(e) => setOrganizationData({ ...organizationData, facilityName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm text-gray-700 mb-2">Address</label>
                        <input
                          type="text"
                          value={organizationData.address}
                          onChange={(e) => setOrganizationData({ ...organizationData, address: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Postcode</label>
                        <input
                          type="text"
                          value={organizationData.postcode}
                          onChange={(e) => setOrganizationData({ ...organizationData, postcode: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={organizationData.phone}
                          onChange={(e) => setOrganizationData({ ...organizationData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={organizationData.email}
                          onChange={(e) => setOrganizationData({ ...organizationData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">CQC Registration Number</label>
                        <input
                          type="text"
                          value={organizationData.registrationNumber}
                          onChange={(e) => setOrganizationData({ ...organizationData, registrationNumber: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Bed Capacity</label>
                        <input
                          type="number"
                          value={organizationData.capacity}
                          onChange={(e) => setOrganizationData({ ...organizationData, capacity: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                    </div>
                  </form>
                </Card>

                {/* Branding */}
                <Card>
                  <h2 className="text-xl text-gray-900 mb-6">Branding & Appearance</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Organization Logo</label>
                      <p className="text-xs text-gray-500 mb-3">This is the logo shown at the top of the sidebar for everyone in your organisation.</p>
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                          {clientLogoUrl ? (
                            <img src={clientLogoUrl} alt="Organization logo" className="max-w-full max-h-full object-contain" />
                          ) : (
                            <Building size={48} className="text-gray-300" />
                          )}
                        </div>
                        <div>
                          <input ref={logoFileInputRef} type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleLogoUpload} className="hidden" />
                          <button
                            onClick={() => logoFileInputRef.current?.click()}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-2"
                          >
                            <Upload size={16} />
                            {clientLogoUrl ? 'Replace Logo' : 'Upload Logo'}
                          </button>
                          {clientLogoUrl && (
                            <button
                              onClick={() => setClientLogoUrl(null)}
                              className="block text-xs text-red-500 hover:text-red-700 hover:underline mb-2"
                            >
                              Remove logo
                            </button>
                          )}
                          <p className="text-xs text-gray-500">PNG, JPG or SVG (max 2MB)</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Organization Display Name</label>
                      <p className="text-xs text-gray-500 mb-2">Shown next to the logo in the sidebar.</p>
                      <input
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                        placeholder="e.g. Riverside Care Group"
                        className="w-full max-w-md px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Sidebar Color</label>
                      <p className="text-xs text-gray-500 mb-3">Pick a background colour for the navigation sidebar.</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <input
                          type="color"
                          value={sidebarColor}
                          onChange={e => setSidebarColor(e.target.value)}
                          className="w-16 h-10 border border-gray-200 rounded cursor-pointer"
                        />
                        <span className="text-sm text-gray-600 font-mono">{sidebarColor.toUpperCase()}</span>
                        <div className="flex items-center gap-2 ml-2 flex-wrap">
                          {[
                            { name: 'Slate',   value: '#111827' },
                            { name: 'Ink',     value: '#0B1220' },
                            { name: 'Navy',    value: '#0F172A' },
                            { name: 'Forest',  value: '#064E3B' },
                            { name: 'Wine',    value: '#7C2D12' },
                            { name: 'Indigo',  value: '#312E81' },
                          ].map(p => (
                            <button
                              key={p.value}
                              onClick={() => setSidebarColor(p.value)}
                              title={p.name}
                              className={`w-7 h-7 rounded-full border-2 transition-all ${sidebarColor.toLowerCase() === p.value.toLowerCase() ? 'border-blue-500 scale-110' : 'border-gray-200 hover:border-gray-400'}`}
                              style={{ backgroundColor: p.value }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-xl text-gray-900 mb-6">Email Notifications</h2>
                  <form onSubmit={handleSaveNotifications}>
                    <div className="space-y-3 mb-6">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Mail size={18} className="text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-900">Incident Reports</div>
                            <div className="text-xs text-gray-600">Receive email notifications for new incidents</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailIncidents}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, emailIncidents: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Mail size={18} className="text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-900">Medication Alerts</div>
                            <div className="text-xs text-gray-600">Alerts for missed doses and medication errors</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailMedication}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, emailMedication: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Mail size={18} className="text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-900">Compliance Updates</div>
                            <div className="text-xs text-gray-600">Training renewals and certification expirations</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailCompliance}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, emailCompliance: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Mail size={18} className="text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-900">Schedule Changes</div>
                            <div className="text-xs text-gray-600">Notifications when shifts are modified</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailSchedule}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, emailSchedule: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </label>
                    </div>

                    <h3 className="text-lg text-gray-900 mb-4 mt-8">SMS Notifications</h3>
                    <div className="space-y-3 mb-6">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Phone size={18} className="text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-900">Urgent Alerts Only</div>
                            <div className="text-xs text-gray-600">Critical incidents and emergencies</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.smsUrgent}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, smsUrgent: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Phone size={18} className="text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-900">All Incidents</div>
                            <div className="text-xs text-gray-600">SMS for all incident reports</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.smsIncidents}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, smsIncidents: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Phone size={18} className="text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-900">Medication Alerts</div>
                            <div className="text-xs text-gray-600">SMS for medication issues</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.smsMedication}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, smsMedication: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </label>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save size={16} />
                        Save Preferences
                      </button>
                    </div>
                  </form>
                </Card>
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-xl text-gray-900 mb-6">Security Settings</h2>
                  <form onSubmit={handleSaveSecurity}>
                    <div className="space-y-6 mb-6">
                      {/* Two-Factor Authentication */}
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Shield size={20} className="text-blue-600" />
                            <div>
                              <div className="text-sm text-gray-900">Two-Factor Authentication</div>
                              <div className="text-xs text-gray-600">Add an extra layer of security to your account</div>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={securitySettings.twoFactorEnabled}
                              onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorEnabled: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        {securitySettings.twoFactorEnabled && (
                          <button className="text-sm text-blue-600 hover:text-blue-700">
                            Configure 2FA Settings
                          </button>
                        )}
                      </div>

                      {/* Session Settings */}
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Session Timeout (minutes)</label>
                        <select
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                          <option value="240">4 hours</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Password Expiry (days)</label>
                        <select
                          value={securitySettings.passwordExpiry}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value="30">30 days</option>
                          <option value="60">60 days</option>
                          <option value="90">90 days</option>
                          <option value="180">180 days</option>
                          <option value="never">Never expire</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Maximum Login Attempts</label>
                        <select
                          value={securitySettings.loginAttempts}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, loginAttempts: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value="3">3 attempts</option>
                          <option value="5">5 attempts</option>
                          <option value="10">10 attempts</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save size={16} />
                        Save Security Settings
                      </button>
                    </div>
                  </form>
                </Card>

                {/* Active Sessions */}
                <Card>
                  <h2 className="text-xl text-gray-900 mb-6">Active Sessions</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm text-gray-900">Current Session - Chrome on Windows</div>
                        <div className="text-xs text-gray-600">IP: 192.168.1.100 • London, UK • Active now</div>
                      </div>
                      <Badge variant="green">Current</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm text-gray-900">Mobile - Safari on iPhone</div>
                        <div className="text-xs text-gray-600">IP: 192.168.1.105 • London, UK • 2 hours ago</div>
                      </div>
                      <button className="text-sm text-red-600 hover:text-red-700">End Session</button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* User Management Section */}
            {activeSection === 'users' && (
              <div className="space-y-6">
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl text-gray-900">User Accounts</h2>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => setShowAddUser(true)}>
                      <Plus size={16} />
                      Add User
                    </button>
                  </div>

                  <div className="space-y-2">
                    {staffUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-700">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-600">{user.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-900">{user.role}</div>
                            <div className="text-xs text-gray-600">Last login: {user.lastLogin}</div>
                          </div>
                          <Badge variant={user.status === 'active' ? 'green' : 'gray'}>
                            {user.status}
                          </Badge>
                          <button className="p-2 hover:bg-gray-200 rounded transition-colors" onClick={() => {setShowEditUser(true); setSelectedUser(user);}}>
                            <Edit size={16} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Roles & Permissions */}
                <Card>
                  <h2 className="text-xl text-gray-900 mb-6">Roles & Permissions</h2>
                  <div className="space-y-3">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-900">Admin</div>
                        <button className="text-sm text-blue-600 hover:text-blue-700" onClick={() => {setShowEditPermissions(true); setSelectedRole('Admin');}}>
                          Edit Permissions
                        </button>
                      </div>
                      <div className="text-xs text-gray-600">Full system access, user management, all modules</div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-900">Care Manager</div>
                        <button className="text-sm text-blue-600 hover:text-blue-700" onClick={() => {setShowEditPermissions(true); setSelectedRole('Care Manager');}}>
                          Edit Permissions
                        </button>
                      </div>
                      <div className="text-xs text-gray-600">Service users, care plans, medications, compliance</div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-900">Senior Support Worker</div>
                        <button className="text-sm text-blue-600 hover:text-blue-700" onClick={() => {setShowEditPermissions(true); setSelectedRole('Senior Support Worker');}}>
                          Edit Permissions
                        </button>
                      </div>
                      <div className="text-xs text-gray-600">Daily logs, medications, activities, incidents</div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-900">Support Worker</div>
                        <button className="text-sm text-blue-600 hover:text-blue-700" onClick={() => {setShowEditPermissions(true); setSelectedRole('Support Worker');}}>
                          Edit Permissions
                        </button>
                      </div>
                      <div className="text-xs text-gray-600">Daily logs, view medications, activities</div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* System & Data Section */}
            {activeSection === 'system' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-xl text-gray-900 mb-6">Data Management</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="text-sm text-gray-900">Export All Data</div>
                        <div className="text-xs text-gray-600">Download a complete backup of all system data</div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Download size={16} />
                        Export
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="text-sm text-gray-900">Import Data</div>
                        <div className="text-xs text-gray-600">Upload data from CSV or JSON files</div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        <Upload size={16} />
                        Import
                      </button>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h2 className="text-xl text-gray-900 mb-6">Audit Trail</h2>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">Sarah Williams updated profile settings</span>
                        <span className="text-xs text-gray-600">7 Dec 2025, 10:15</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">John Davies logged in from new device</span>
                        <span className="text-xs text-gray-600">7 Dec 2025, 08:30</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">Emily Roberts added new service user</span>
                        <span className="text-xs text-gray-600">6 Dec 2025, 16:45</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="border-l-4 border-red-600">
                  <h2 className="text-xl text-gray-900 mb-4">Danger Zone</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div>
                        <div className="text-sm text-red-900">Clear All Cache</div>
                        <div className="text-xs text-red-700">This will clear all cached data and temporary files</div>
                      </div>
                      <button className="px-4 py-2 text-sm border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        Clear Cache
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div>
                        <div className="text-sm text-red-900">Reset System Settings</div>
                        <div className="text-xs text-red-700">Restore all settings to factory defaults</div>
                      </div>
                      <button className="px-4 py-2 text-sm border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        Reset Settings
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 text-xs text-gray-500 border-t border-gray-100 mt-8">
          Powered by MployUs
        </div>
      </div>
    </main>

      {/* Modals */}
      <AddUserModal
        isOpen={showAddUser}
        onClose={() => setShowAddUser(false)}
        onSave={handleAddUser}
      />
      <EditUserModal
        isOpen={showEditUser}
        onClose={() => setShowEditUser(false)}
        user={selectedUser}
        onSave={handleEditUser}
      />
      <EditPermissionsModal
        isOpen={showEditPermissions}
        onClose={() => setShowEditPermissions(false)}
        role={{ name: selectedRole }}
        onSave={handleEditPermissions}
      />
    </div>
  );
}
