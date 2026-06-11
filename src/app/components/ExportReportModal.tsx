import { X, Download, FileText, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle?: string;
}

export function ExportReportModal({ isOpen, onClose, reportTitle }: ExportReportModalProps) {
  const [format, setFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('last-30');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [includeOptions, setIncludeOptions] = useState({
    summary: true,
    details: true,
    charts: true,
    actionItems: true,
    auditTrail: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsGenerating(false);
      setIsComplete(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsComplete(true);
    }, 1500);
  };

  const handleDownload = () => {
    console.log('Downloading report:', { reportTitle, format, dateRange, includeOptions });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <Download size={18} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">{reportTitle ? 'Generate Report' : 'Export Report'}</h2>
              <p className="text-xs text-gray-500">{reportTitle || 'Compliance data export'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {isComplete ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-gray-900 mb-1">Report Ready</h3>
              <p className="text-sm text-gray-500 mb-6">
                Your {reportTitle || 'compliance'} report has been generated successfully.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center gap-3">
                <FileText size={20} className="text-gray-400" />
                <div className="flex-1 text-left">
                  <div className="text-sm text-gray-900">{reportTitle || 'Compliance Report'}.{format}</div>
                  <div className="text-xs text-gray-400">Generated just now · {format.toUpperCase()} format</div>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm mx-auto"
              >
                <Download size={16} />
                Download Report
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Format */}
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Export Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'pdf', label: 'PDF' },
                    { value: 'csv', label: 'CSV' },
                    { value: 'xlsx', label: 'Excel' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormat(opt.value)}
                      className={`px-4 py-2.5 text-sm rounded-lg border transition-colors ${
                        format === opt.value
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="last-7">Last 7 days</option>
                  <option value="last-30">Last 30 days</option>
                  <option value="last-90">Last 90 days</option>
                  <option value="last-year">Last 12 months</option>
                  <option value="ytd">Year to date</option>
                  <option value="all">All time</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>

              {dateRange === 'custom' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1.5">From</label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1.5">To</label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Include Sections */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Include in Report</label>
                <div className="space-y-1.5">
                  {[
                    { key: 'summary' as const, label: 'Executive Summary' },
                    { key: 'details' as const, label: 'Detailed Requirements & Status' },
                    { key: 'charts' as const, label: 'Charts & Visualisations' },
                    { key: 'actionItems' as const, label: 'Action Items & Deadlines' },
                    { key: 'auditTrail' as const, label: 'Full Audit Trail' },
                  ].map((opt) => (
                    <label key={opt.key} className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={includeOptions[opt.key]}
                        onChange={(e) => setIncludeOptions({ ...includeOptions, [opt.key]: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isComplete && (
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 shrink-0">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download size={14} />
                  Generate Report
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
