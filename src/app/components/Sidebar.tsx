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
  ChevronRight,
  ChevronLeft,
  CalendarRange
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useBranding } from '../context/BrandingContext';
import { useState } from 'react';

interface NavItem {
  icon: any;
  label: string;
  page: string;
  children?: NavItem[];
}

export function Sidebar({ activeItem = 'Dashboard' }: { activeItem?: string }) {
  const { setCurrentPage, isSidebarOpen, setIsSidebarOpen, isSidebarCollapsed, setIsSidebarCollapsed } = useNavigation();
  const { clientLogoUrl, clientName, clientTagline, sidebarColor } = useBranding();
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
        { icon: CalendarRange, label: 'Leave Requests', page: 'leave-requests' },
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
    <>
      {/* Backdrop overlay for mobile */}
      <div
        className={`fixed inset-0 bg-gray-900/40 z-20 md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div style={{ backgroundColor: sidebarColor }} className={`text-white h-screen fixed left-0 top-0 flex flex-col z-30 transition-all duration-300 ease-in-out md:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        isSidebarCollapsed ? 'w-[4.5rem]' : 'w-64'
      }`}>
        {/* Floating Collapse/Expand Button */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden md:flex w-6 h-6 bg-gray-900 border border-gray-700 text-gray-400 hover:text-white rounded-full items-center justify-center absolute -right-3 top-5 z-40 transition-all duration-300 shadow cursor-pointer"
          aria-label={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isSidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* Client identity — primary workspace brand */}
        <div className="p-4 border-b border-white/10 shrink-0">
          {!isSidebarCollapsed ? (
            <div className="flex items-center gap-3 min-w-0">
              {clientLogoUrl ? (
                <img src={clientLogoUrl} alt={clientName} className="w-11 h-11 rounded-lg object-contain bg-white p-1 shrink-0" />
              ) : (
                <div className="w-11 h-11 rounded-lg border border-dashed border-gray-500 bg-white/5 flex items-center justify-center text-[9px] text-gray-400 tracking-wide uppercase shrink-0">
                  Logo
                </div>
              )}
              <div className="min-w-0">
                <h1 className="text-sm text-white font-semibold truncate">{clientName}</h1>
                <p className="text-[10px] text-gray-300 truncate opacity-80">{clientTagline}</p>
              </div>
            </div>
          ) : (
            clientLogoUrl ? (
              <img src={clientLogoUrl} alt={clientName} className="w-9 h-9 mx-auto rounded-lg object-contain bg-white p-1" />
            ) : (
              <div className="w-9 h-9 mx-auto rounded-lg border border-dashed border-gray-500 bg-white/5 flex items-center justify-center text-[8px] text-gray-400 tracking-wide uppercase">
                Logo
              </div>
            )
          )}
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {navGroups.map((group) => {
            const isExpanded = group.group === 'Core' || expandedGroups.includes(group.group);
            
            return (
              <div key={group.group} className="mb-1">
                {group.group !== 'Core' && (
                  isSidebarCollapsed ? (
                    <div className="border-t border-gray-800 my-2 mx-4" />
                  ) : (
                    <button
                      onClick={() => toggleGroup(group.group)}
                      className="w-full px-4 py-2 flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider hover:text-gray-300 transition-colors"
                    >
                      <span>{group.group}</span>
                      {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </button>
                  )
                )}
                {isExpanded && group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.label === activeItem;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setCurrentPage(item.page)}
                      title={isSidebarCollapsed ? item.label : undefined}
                      className={`w-full px-4 py-2.5 flex items-center transition-colors ${
                        isSidebarCollapsed ? 'justify-center' : 'gap-3'
                      } ${
                        isActive
                          ? 'bg-blue-600 text-white border-r-2 border-blue-400'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <Icon size={18} className="shrink-0" />
                      {!isSidebarCollapsed && <span className="text-sm">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-gray-700 shrink-0">
          <div className="p-4">
            <div className={`flex items-center rounded-lg hover:bg-gray-800 cursor-pointer transition-colors ${
              isSidebarCollapsed ? 'justify-center p-1' : 'gap-3 px-2 py-2'
            }`}>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white shrink-0">
                AM
              </div>
              {!isSidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white truncate font-semibold">Admin Manager</div>
                  <div className="text-xs text-gray-400 truncate">Administrator</div>
                </div>
              )}
            </div>
          </div>
          {!isSidebarCollapsed && (
            <div className="px-4 pb-3 flex items-center justify-center gap-1.5">
              <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center shrink-0">
                <Shield size={9} className="text-white" />
              </div>
              <span className="text-[10px] text-gray-500 tracking-wide">
                Powered by <span className="text-gray-400 font-medium">MpoweredCare</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
