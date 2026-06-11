import { X } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterPanel({ isOpen, onClose }: FilterPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/20"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative bg-white w-96 h-full shadow-lg overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Risk Level */}
          <div>
            <h3 className="text-sm text-gray-900 mb-3">Risk Level</h3>
            <div className="space-y-2">
              {['High Risk', 'Medium Risk', 'Low Risk'].map((level) => (
                <label key={level} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm text-gray-900 mb-3">Location</h3>
            <div className="space-y-2">
              {['Riverside House', 'Oak Tree Lodge', 'Meadow View'].map((location) => (
                <label key={location} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{location}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Care Manager */}
          <div>
            <h3 className="text-sm text-gray-900 mb-3">Care Manager</h3>
            <div className="space-y-2">
              {['Dr. Emily Carter', 'Sarah Williams', 'James Mitchell'].map((manager) => (
                <label key={manager} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{manager}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Age Range */}
          <div>
            <h3 className="text-sm text-gray-900 mb-3">Age Range</h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min"
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Review Status */}
          <div>
            <h3 className="text-sm text-gray-900 mb-3">Review Status</h3>
            <div className="space-y-2">
              {['Due This Week', 'Due This Month', 'Overdue'].map((status) => (
                <label key={status} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Recent Incidents */}
          <div>
            <h3 className="text-sm text-gray-900 mb-3">Recent Incidents</h3>
            <div className="space-y-2">
              {['Within 24 Hours', 'Within 1 Week', 'Within 1 Month', 'No Recent Incidents'].map((timeframe) => (
                <label key={timeframe} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{timeframe}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
