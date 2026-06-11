import {
  LayoutDashboard,
  Users,
  UserCog,
  FileText,
  Pill,
  Calendar,
  Activity,
  AlertCircle,
  Shield,
  Settings,
  ClipboardList,
  UserPlus,
  MessageSquare,
  DollarSign,
  BarChart3,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useState } from 'react';

interface NavItem {
  icon: any;
  label: string;
  page: string;
  children?: NavItem[];
}

export function Sidebar({ activeItem = 'Dashboard' }: { activeItem?: string }) {
  const { setCurrentPage } = useNavigation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Care', 'Workforce']);

  const navGroups: { group: string; items: NavItem[] }[] = [
    {
      group: 'Core',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', page: 'dashboard' },
      ]
    },
    {
      group: 'Care',
      items: [
        { icon: Users, label: 'Service Users', page: 'service-users' },
        { icon: ClipboardList, label: 'Care Plans', page: 'care-plans' },
        { icon: FileText, label: 'Daily Logs', page: 'daily-logs' },
        { icon: Pill, label: 'Medications (MAR)', page: 'medications' },
        { icon: Activity, label: 'Activities', page: 'activities' },
        { icon: AlertCircle, label: 'Incidents', page: 'incidents' },
      ]
    },
    {
      group: 'Workforce',
      items: [
        { icon: UserCog, label: 'Staff Management', page: 'staff' },
        { icon: Calendar, label: 'Scheduling', page: 'scheduling' },
        { icon: UserPlus, label: 'Recruitment', page: 'recruitment' },
      ]
    },
    {
      group: 'Operations',
      items: [
        { icon: MessageSquare, label: 'Communication', page: 'communication' },
        { icon: DollarSign, label: 'Financial', page: 'financial' },
        { icon: BarChart3, label: 'Analytics', page: 'analytics' },
        { icon: Shield, label: 'Compliance', page: 'compliance' },
      ]
    },
    {
      group: 'System',
      items: [
        { icon: Settings, label: 'Settings', page: 'settings' },
      ]
    }
  ];

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev =>
      prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
    );
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col z-30">
      <div className="p-5 border-b border-gray-700 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-base text-white">MpoweredCare</h1>
            <p className="text-xs text-gray-400">Care Management Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {navGroups.map((group) => {
          const isExpanded = group.group === 'Core' || expandedGroups.includes(group.group);
          const hasActive = group.items.some(item => item.label === activeItem);

          return (
            <div key={group.group} className="mb-1">
              {group.group !== 'Core' && (
                <button
                  onClick={() => toggleGroup(group.group)}
                  className="w-full px-4 py-2 flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider hover:text-gray-300 transition-colors"
                >
                  <span>{group.group}</span>
                  {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </button>
              )}
              {isExpanded && group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.label === activeItem;
                return (
                  <button
                    key={item.label}
                    onClick={() => setCurrentPage(item.page)}
                    className={`w-full px-4 py-2.5 flex items-center gap-3 transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white border-r-2 border-blue-400'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700 shrink-0">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
            AM
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-white truncate">Admin Manager</div>
            <div className="text-xs text-gray-400 truncate">Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
}
