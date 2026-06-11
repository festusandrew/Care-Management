import { useState } from 'react';
import { 
  X, 
  CalendarDays, 
  Clock, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import { Badge } from './Badge';

interface StaffTimesheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: any;
}

export function StaffTimesheetModal({ isOpen, onClose, staff }: StaffTimesheetModalProps) {
  const [period, setPeriod] = useState('December 1 - 14, 2025');

  if (!isOpen || !staff) return null;

  // Mock timesheet entries
  const timesheetEntries = [
    { id: 1, date: 'Mon, 1 Dec', scheduled: '07:00 - 15:00', clockIn: '06:55', clockOut: '15:05', break: '30m', total: '7.5h', status: 'verified' },
    { id: 2, date: 'Tue, 2 Dec', scheduled: '07:00 - 15:00', clockIn: '06:58', clockOut: '15:02', break: '30m', total: '7.5h', status: 'verified' },
    { id: 3, date: 'Wed, 3 Dec', scheduled: '07:00 - 15:00', clockIn: '07:15', clockOut: '15:30', break: '30m', total: '7.75h', status: 'exception', note: 'Late arrival - Traffic' },
    { id: 4, date: 'Thu, 4 Dec', scheduled: 'Day Off', clockIn: '-', clockOut: '-', break: '-', total: '-', status: 'off' },
    { id: 5, date: 'Fri, 5 Dec', scheduled: '15:00 - 23:00', clockIn: '14:50', clockOut: '23:15', break: '30m', total: '7.75h', status: 'verified' },
    { id: 6, date: 'Sat, 6 Dec', scheduled: '15:00 - 23:00', clockIn: '14:55', clockOut: '23:05', break: '30m', total: '7.5h', status: 'verified' },
    { id: 7, date: 'Sun, 7 Dec', scheduled: 'Day Off', clockIn: '-', clockOut: '-', break: '-', total: '-', status: 'off' },
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'verified':
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'exception':
        return <AlertCircle size={16} className="text-amber-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'exception':
        return 'bg-amber-50';
      case 'off':
        return 'text-gray-400 bg-gray-50/50';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Timesheet</h2>
              <p className="text-sm text-gray-600">{staff.name} • {staff.role}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Period Selector & Export */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-1">
              <button className="p-2 hover:bg-gray-50 rounded-md transition-colors text-gray-600">
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-2 px-2 text-sm font-medium text-gray-900">
                <CalendarDays size={16} className="text-gray-400" />
                {period}
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-md transition-colors text-gray-600">
                <ChevronRight size={18} />
              </button>
            </div>
            
            <Badge variant="blue">Status: Pending Approval</Badge>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Regular Hours</div>
              <div className="text-2xl font-bold text-gray-900">38.0h</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Overtime</div>
              <div className="text-2xl font-bold text-gray-900">0.0h</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="text-sm text-blue-800 mb-1 font-medium">Total Hours</div>
              <div className="text-2xl font-bold text-blue-900">38.0h</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Exceptions</div>
              <div className="text-2xl font-bold text-amber-600 flex items-center gap-2">
                1 <AlertCircle size={20} />
              </div>
            </div>
          </div>

          {/* Timesheet Table */}
          <div className="border border-gray-200 rounded-xl overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-700">Scheduled</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-700">Clock In</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-700">Clock Out</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-700">Break</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-right">Total</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {timesheetEntries.map((entry) => (
                  <tr key={entry.id} className={`hover:bg-gray-50/50 transition-colors ${getStatusClass(entry.status)}`}>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900 text-sm">{entry.date}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{entry.scheduled}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm ${entry.status === 'exception' ? 'text-amber-600 font-medium' : 'text-gray-900'}`}>
                        {entry.clockIn}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{entry.clockOut}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{entry.break}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">{entry.total}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col items-center gap-1">
                        {getStatusIcon(entry.status)}
                        {entry.note && (
                          <span className="text-[10px] text-amber-600 font-medium max-w-[100px] text-center leading-tight">
                            {entry.note}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50/50 rounded-lg border border-blue-100 flex items-start gap-3">
            <Clock className="text-blue-600 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-blue-800">
              <strong>Manager Note:</strong> Please review the exception on Dec 3rd regarding late arrival before approving this timesheet.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            <Download size={18} />
            Export PDF
          </button>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
              <CheckCircle2 size={18} />
              Approve Timesheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}