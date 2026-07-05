import { Search, Bell, User, Menu, X, AlertCircle, CheckCircle, Pill, ClipboardList, CalendarRange, Shield } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';

const mockNotifications = [
  { id: 1, icon: Pill, iconColor: 'text-red-500', bg: 'bg-red-50', title: 'Missed medication', description: 'Michael Thompson — Methylphenidate not administered at 08:00', time: '2 min ago' },
  { id: 2, icon: ClipboardList, iconColor: 'text-amber-600', bg: 'bg-amber-50', title: 'Care plan review due', description: "Sarah Johnson's plan expires in 5 days", time: '35 min ago' },
  { id: 3, icon: AlertCircle, iconColor: 'text-orange-600', bg: 'bg-orange-50', title: 'Incident reported', description: 'New incident logged for Lucas Chen at Meadow View', time: '2 hrs ago' },
  { id: 4, icon: CalendarRange, iconColor: 'text-blue-600', bg: 'bg-blue-50', title: 'New leave request', description: 'Mary Thompson has requested 40 hrs annual leave', time: '4 hrs ago' },
  { id: 5, icon: Shield, iconColor: 'text-emerald-600', bg: 'bg-emerald-50', title: 'Compliance renewal', description: 'DBS check for John Davies expires in 30 days', time: 'Yesterday' },
];

export function TopBar() {
  const { isSidebarOpen, setIsSidebarOpen } = useNavigation();
  const [showNotifications, setShowNotifications] = useState(false);
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white border-b border-gray-200 z-10 px-4 md:px-8 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
        <div className="flex-1 max-w-2xl flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 mr-2 hover:bg-gray-100 rounded-lg md:hidden transition-colors shrink-0"
            aria-label="Toggle Sidebar"
          >
            <Menu size={20} className="text-gray-600" />
          </button>

          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-4 md:ml-8 shrink-0">
          <span className="text-sm text-gray-600 hidden sm:inline">{today}</span>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(v => !v)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-50 text-red-600 font-medium">{mockNotifications.length}</span>
                    </div>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Close notifications"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
                    {mockNotifications.map(n => {
                      const Icon = n.icon;
                      return (
                        <div key={n.id} className="px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg ${n.bg} flex items-center justify-center shrink-0`}>
                              <Icon size={15} className={n.iconColor} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900">{n.title}</div>
                              <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.description}</div>
                              <div className="text-[11px] text-gray-400 mt-1">{n.time}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Mark all as read</button>
                    <button className="text-xs text-gray-500 hover:text-gray-700">View all</button>
                  </div>
                </div>
              </>
            )}
          </div>

          <button className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
            <User size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
