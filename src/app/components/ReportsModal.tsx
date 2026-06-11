import { X, FileText, Download, Calendar, TrendingUp, Users, Clock, Pill, AlertTriangle, FileCheck } from 'lucide-react';
import { useState } from 'react';

interface ReportsModalProps {
  show: boolean;
  onClose: () => void;
}

const reportCategories = [
  {
    id: 'care-hours',
    title: 'Care Hours Report',
    description: 'Detailed breakdown of care hours delivered by staff and service user',
    icon: Clock,
    color: 'blue',
    available: ['weekly', 'monthly', 'quarterly']
  },
  {
    id: 'medications',
    title: 'Medication Administration Report',
    description: 'MAR completion rates, missed administrations, and compliance metrics',
    icon: Pill,
    color: 'green',
    available: ['weekly', 'monthly']
  },
  {
    id: 'incidents',
    title: 'Incident Analysis Report',
    description: 'Incident trends, types, resolution times, and prevention measures',
    icon: AlertTriangle,
    color: 'amber',
    available: ['monthly', 'quarterly', 'annual']
  },
  {
    id: 'compliance',
    title: 'Compliance Report',
    description: 'Training completion, document reviews, and regulatory compliance status',
    icon: FileCheck,
    color: 'purple',
    available: ['monthly', 'quarterly']
  },
  {
    id: 'service-users',
    title: 'Service User Progress Report',
    description: 'Goal completion, care plan updates, and individual progress tracking',
    icon: Users,
    color: 'indigo',
    available: ['monthly', 'quarterly']
  },
  {
    id: 'performance',
    title: 'Performance Metrics Report',
    description: 'Key performance indicators across all care management areas',
    icon: TrendingUp,
    color: 'emerald',
    available: ['monthly', 'quarterly', 'annual']
  }
];

export function ReportsModal({ show, onClose }: ReportsModalProps) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  if (!show) return null;

  const getColorClasses = (color: string) => {
    const colors: any = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-50' },
      green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-50' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600', hover: 'hover:bg-amber-50' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-50' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', hover: 'hover:bg-indigo-50' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', hover: 'hover:bg-emerald-50' }
    };
    return colors[color] || colors.blue;
  };

  const handleGenerate = () => {
    console.log('Generating report:', { selectedReport, selectedPeriod, dateRange });
    // In a real application, this would generate and download the report
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-lg p-3 shadow-md">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Generate Reports</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Select a report type and configure options to generate comprehensive care management reports
                </p>
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Report Selection */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Select Report Type</h3>
            <div className="grid grid-cols-2 gap-4">
              {reportCategories.map((report) => {
                const colors = getColorClasses(report.color);
                const Icon = report.icon;
                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`text-left p-4 border-2 rounded-lg transition-all ${
                      selectedReport === report.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`${colors.bg} rounded-lg p-2`}>
                        <Icon className={colors.text} size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">{report.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{report.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {report.available.map((period) => (
                        <span
                          key={period}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs capitalize"
                        >
                          {period}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Report Configuration */}
          {selectedReport && (
            <>
              <section className="mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-4">Report Period</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {reportCategories
                      .find((r) => r.id === selectedReport)
                      ?.available.map((period) => (
                        <button
                          key={period}
                          onClick={() => setSelectedPeriod(period)}
                          className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                            selectedPeriod === period
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                  </div>

                  {/* Custom Date Range */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-900 mb-3">Or select custom date range:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">End Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Export Format */}
              <section className="mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-4">Export Format</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-3 gap-3">
                    {['PDF', 'Excel', 'CSV'].map((format) => (
                      <button
                        key={format}
                        className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Preview Data */}
              <section>
                <h3 className="text-base font-bold text-gray-900 mb-4">Report Preview</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Total Records</p>
                      <p className="text-xl font-bold text-gray-900">247</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Service Users</p>
                      <p className="text-xl font-bold text-gray-900">42</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Staff Members</p>
                      <p className="text-xl font-bold text-gray-900">28</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Date Range</p>
                      <p className="text-xs font-medium text-gray-900">
                        {selectedPeriod === 'monthly' ? 'Dec 2024' : 'Last 3 months'}
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-900">
                      <span className="font-bold">Note:</span> This report will include data from all active service users 
                      and staff members during the selected period. All personally identifiable information will be 
                      included for internal use only.
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50">
          <p className="text-xs text-gray-600">
            Reports are generated in real-time and may take a few moments to compile
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              disabled={!selectedReport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
