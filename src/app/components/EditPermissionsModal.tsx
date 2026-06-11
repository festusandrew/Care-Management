import { X, Shield, Check, AlertTriangle, Save, Users, FileText, Calendar, Activity, AlertCircle, Settings, Eye, Lock, Database } from 'lucide-react';
import { useState } from 'react';

interface EditPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: any;
  onSave: (data: any) => void;
}

export function EditPermissionsModal({ isOpen, onClose, role, onSave }: EditPermissionsModalProps) {
  const [permissions, setPermissions] = useState({
    // Dashboard
    viewDashboard: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker' || role?.name === 'Support Worker',
    
    // Service Users
    viewServiceUsers: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker' || role?.name === 'Support Worker',
    createServiceUsers: role?.name === 'Admin' || role?.name === 'Care Manager',
    editServiceUsers: role?.name === 'Admin' || role?.name === 'Care Manager',
    deleteServiceUsers: role?.name === 'Admin',
    
    // Care Plans
    viewCarePlans: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker',
    createCarePlans: role?.name === 'Admin' || role?.name === 'Care Manager',
    editCarePlans: role?.name === 'Admin' || role?.name === 'Care Manager',
    approveCarePlans: role?.name === 'Admin' || role?.name === 'Care Manager',
    
    // Daily Logs
    viewDailyLogs: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker' || role?.name === 'Support Worker',
    createDailyLogs: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker' || role?.name === 'Support Worker',
    editDailyLogs: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker',
    deleteDailyLogs: role?.name === 'Admin' || role?.name === 'Care Manager',
    
    // Medications
    viewMedications: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker' || role?.name === 'Support Worker',
    administerMedications: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker',
    editMedicationSchedule: role?.name === 'Admin' || role?.name === 'Care Manager',
    viewMARReports: role?.name === 'Admin' || role?.name === 'Care Manager',
    
    // Activities
    viewActivities: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker' || role?.name === 'Support Worker',
    createActivities: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker',
    editActivities: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker',
    recordAttendance: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker',
    
    // Incidents
    viewIncidents: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker' || role?.name === 'Support Worker',
    reportIncidents: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker' || role?.name === 'Support Worker',
    editIncidents: role?.name === 'Admin' || role?.name === 'Care Manager',
    approveIncidents: role?.name === 'Admin' || role?.name === 'Care Manager',
    
    // Scheduling
    viewSchedule: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker' || role?.name === 'Support Worker',
    createShifts: role?.name === 'Admin' || role?.name === 'Care Manager',
    editShifts: role?.name === 'Admin' || role?.name === 'Care Manager',
    assignStaff: role?.name === 'Admin' || role?.name === 'Care Manager',
    
    // Compliance
    viewCompliance: role?.name === 'Admin' || role?.name === 'Care Manager' || role?.name === 'Senior Support Worker',
    editCompliance: role?.name === 'Admin' || role?.name === 'Care Manager',
    viewAuditLogs: role?.name === 'Admin' || role?.name === 'Care Manager',
    exportReports: role?.name === 'Admin' || role?.name === 'Care Manager',
    
    // User Management
    viewUsers: role?.name === 'Admin',
    createUsers: role?.name === 'Admin',
    editUsers: role?.name === 'Admin',
    deactivateUsers: role?.name === 'Admin',
    managePermissions: role?.name === 'Admin',
    
    // System Settings
    viewSettings: role?.name === 'Admin' || role?.name === 'Care Manager',
    editOrganization: role?.name === 'Admin',
    editSystemSettings: role?.name === 'Admin',
    manageIntegrations: role?.name === 'Admin',
  });

  if (!isOpen || !role) return null;

  const togglePermission = (key: string) => {
    setPermissions({ ...permissions, [key]: !permissions[key] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ roleName: role.name, permissions });
    onClose();
  };

  const permissionGroups = [
    {
      name: 'Dashboard',
      icon: Activity,
      color: 'bg-blue-100 text-blue-600',
      permissions: [
        { key: 'viewDashboard', label: 'View Dashboard' }
      ]
    },
    {
      name: 'Service Users',
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
      permissions: [
        { key: 'viewServiceUsers', label: 'View' },
        { key: 'createServiceUsers', label: 'Create' },
        { key: 'editServiceUsers', label: 'Edit' },
        { key: 'deleteServiceUsers', label: 'Delete' }
      ]
    },
    {
      name: 'Care Plans',
      icon: FileText,
      color: 'bg-indigo-100 text-indigo-600',
      permissions: [
        { key: 'viewCarePlans', label: 'View' },
        { key: 'createCarePlans', label: 'Create' },
        { key: 'editCarePlans', label: 'Edit' },
        { key: 'approveCarePlans', label: 'Approve' }
      ]
    },
    {
      name: 'Daily Logs',
      icon: FileText,
      color: 'bg-teal-100 text-teal-600',
      permissions: [
        { key: 'viewDailyLogs', label: 'View' },
        { key: 'createDailyLogs', label: 'Create' },
        { key: 'editDailyLogs', label: 'Edit' },
        { key: 'deleteDailyLogs', label: 'Delete' }
      ]
    },
    {
      name: 'Medications',
      icon: AlertCircle,
      color: 'bg-red-100 text-red-600',
      permissions: [
        { key: 'viewMedications', label: 'View' },
        { key: 'administerMedications', label: 'Administer' },
        { key: 'editMedicationSchedule', label: 'Edit Schedule' },
        { key: 'viewMARReports', label: 'MAR Reports' }
      ]
    },
    {
      name: 'Activities',
      icon: Calendar,
      color: 'bg-pink-100 text-pink-600',
      permissions: [
        { key: 'viewActivities', label: 'View' },
        { key: 'createActivities', label: 'Create' },
        { key: 'editActivities', label: 'Edit' },
        { key: 'recordAttendance', label: 'Attendance' }
      ]
    },
    {
      name: 'Incidents',
      icon: AlertTriangle,
      color: 'bg-orange-100 text-orange-600',
      permissions: [
        { key: 'viewIncidents', label: 'View' },
        { key: 'reportIncidents', label: 'Report' },
        { key: 'editIncidents', label: 'Edit' },
        { key: 'approveIncidents', label: 'Approve' }
      ]
    },
    {
      name: 'Scheduling',
      icon: Calendar,
      color: 'bg-cyan-100 text-cyan-600',
      permissions: [
        { key: 'viewSchedule', label: 'View' },
        { key: 'createShifts', label: 'Create Shifts' },
        { key: 'editShifts', label: 'Edit Shifts' },
        { key: 'assignStaff', label: 'Assign Staff' }
      ]
    },
    {
      name: 'Compliance',
      icon: Shield,
      color: 'bg-green-100 text-green-600',
      permissions: [
        { key: 'viewCompliance', label: 'View' },
        { key: 'editCompliance', label: 'Edit' },
        { key: 'viewAuditLogs', label: 'Audit Logs' },
        { key: 'exportReports', label: 'Export' }
      ]
    },
    {
      name: 'User Management',
      icon: Users,
      color: 'bg-violet-100 text-violet-600',
      permissions: [
        { key: 'viewUsers', label: 'View' },
        { key: 'createUsers', label: 'Create' },
        { key: 'editUsers', label: 'Edit' },
        { key: 'deactivateUsers', label: 'Deactivate' },
        { key: 'managePermissions', label: 'Permissions' }
      ]
    },
    {
      name: 'System Settings',
      icon: Settings,
      color: 'bg-gray-100 text-gray-600',
      permissions: [
        { key: 'viewSettings', label: 'View' },
        { key: 'editOrganization', label: 'Organization' },
        { key: 'editSystemSettings', label: 'System' },
        { key: 'manageIntegrations', label: 'Integrations' }
      ]
    }
  ];

  const enabledCount = Object.values(permissions).filter(Boolean).length;
  const totalCount = Object.keys(permissions).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-lg p-3 shadow-md">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Edit Role Permissions</h2>
                <p className="text-sm text-gray-600 mt-1">{role.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-xs text-gray-600">
                    {enabledCount} of {totalCount} permissions enabled
                  </div>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden max-w-xs">
                    <div 
                      className="h-full bg-blue-600 transition-all"
                      style={{ width: `${(enabledCount / totalCount) * 100}%` }}
                    />
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
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          {/* Permissions Grid */}
          <div className="grid grid-cols-3 gap-4">
            {permissionGroups.map((group, groupIdx) => {
              const GroupIcon = group.icon;
              const groupPermissions = group.permissions.map(p => permissions[p.key as keyof typeof permissions]);
              const enabledInGroup = groupPermissions.filter(Boolean).length;
              const totalInGroup = group.permissions.length;
              
              return (
                <div key={groupIdx} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  {/* Card Header */}
                  <div className={`${group.color} p-4 border-b border-gray-200`}>
                    <div className="flex items-center gap-3 mb-2">
                      <GroupIcon size={20} />
                      <h3 className="text-sm font-bold text-gray-900">{group.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gray-900/30 transition-all"
                          style={{ width: `${(enabledInGroup / totalInGroup) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{enabledInGroup}/{totalInGroup}</span>
                    </div>
                  </div>
                  
                  {/* Permissions */}
                  <div className="p-3 space-y-2">
                    {group.permissions.map((perm, permIdx) => {
                      const isEnabled = permissions[perm.key as keyof typeof permissions];
                      return (
                        <label
                          key={permIdx}
                          className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                            isEnabled ? 'bg-blue-50' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              checked={isEnabled}
                              onChange={() => togglePermission(perm.key)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                            />
                            {isEnabled && (
                              <Check className="absolute left-0 top-0 text-blue-600 pointer-events-none" size={16} />
                            )}
                          </div>
                          <span className={`text-sm flex-1 ${isEnabled ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                            {perm.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warning */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-600 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-900">Permission Changes</p>
                <p className="text-xs text-gray-700 mt-1">
                  Changes to role permissions will apply to all users with this role. Users may need to log out and back in for changes to take effect.
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Current users with this role: <span className="font-medium text-gray-900">
                {role.name === 'Admin' ? '1' : 
                 role.name === 'Care Manager' ? '3' : 
                 role.name === 'Senior Support Worker' ? '2' : 
                 role.name === 'Support Worker' ? '8' : '0'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={18} />
                Save Permissions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
