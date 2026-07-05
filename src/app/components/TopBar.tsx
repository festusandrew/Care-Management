import { Search, Bell, User, Menu } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export function TopBar() {
  const { isSidebarOpen, setIsSidebarOpen } = useNavigation();
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white border-b border-gray-200 z-10 px-4 md:px-8 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
        {/* Left Side: Hamburguer & Search */}
        <div className="flex-1 max-w-2xl flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 mr-2 hover:bg-gray-100 rounded-lg md:hidden transition-colors shrink-0"
            aria-label="Toggle Sidebar"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Right Side - Date, Notifications, Profile */}
        <div className="flex items-center gap-3 md:gap-6 ml-4 md:ml-8 shrink-0">
          {/* Date */}
          <span className="text-sm text-gray-600 hidden sm:inline">{today}</span>

          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <button className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
            <User size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}