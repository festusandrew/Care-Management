import { X, Calendar, User, Shield, FileText, CheckCircle, AlertTriangle, Download, Edit, Flag, ClipboardCheck, Eye, Clock, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface AuditDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  audit: {
    id: number;
    auditNumber: string;
    title: string;
    type: string;
    auditor: string;
    scheduledDate: string;
    status: string;
    department: string;
    findings: number;
    actionItems: number;
    completionDate?: string;
    overallRating?: string;
  };
}

export function AuditDetailsModal({ isOpen, onClose, audit }: AuditDetailsModalProps) {
  const [auditNotes, setAuditNotes] = useState('Comprehensive review of procedures. All records reviewed for accuracy and completeness.');

  const findings = [
    {
      id: 1,
      severity: 'minor',
      area: 'Documentation',
      finding: 'Two records had missing signatures for evening rounds on 1st Dec',
      recommendation: 'Reinforce signing procedures with all staff. Implement double-check system.',
      status: 'open',
    },
    {
      id: 2,
      severity: 'observation',
      area: 'Storage',
      finding: 'Temperature log shows one reading slightly outside acceptable range',
      recommendation: 'Monitor temperature more closely. Consider maintenance check if issue persists.',
      status: 'resolved',
    },
  ];

  const actionItems = [
    { id: 1, action: 'Update signing procedures in staff handbook', assignedTo: 'Sarah Williams', dueDate: '15 Mar 2026', priority: 'medium', status: 'in-progress' },
    { id: 2, action: 'Conduct refresher training on record completion', assignedTo: 'Mary Thompson', dueDate: '20 Mar 2026', priority: 'high', status: 'pending' },
    { id: 3, action: 'Schedule equipment maintenance check', assignedTo: 'James Mitchell', dueDate: '10 Mar 2026', priority: 'medium', status: 'completed' },
    { id: 4, action: 'Review and update monitoring procedures', assignedTo: 'Dr. Sarah Mitchell', dueDate: '18 Mar 2026', priority: 'low', status: 'pending' },
    { id: 5, action: 'Implement double-check system for record completion', assignedTo: 'John Davies', dueDate: '12 Mar 2026', priority: 'high', status: 'in-progress' },
  ];

  const documents = [
    { id: 1, name: 'Audit Checklist', type: 'PDF', uploadedBy: 'Sarah Williams', date: '5 Feb 2026' },
    { id: 2, name: 'Evidence Photos', type: 'ZIP', uploadedBy: 'Sarah Williams', date: '5 Feb 2026' },
    { id: 3, name: 'Audit Report Final', type: 'PDF', uploadedBy: 'Sarah Williams', date: '6 Feb 2026' },
  ];

  if (!isOpen) return null;

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'in-progress': 'bg-blue-50 text-blue-700 border-blue-200',
      'scheduled': 'bg-gray-50 text-gray-600 border-gray-200',
      'pending': 'bg-gray-50 text-gray-600 border-gray-200',
      'open': 'bg-amber-50 text-amber-700 border-amber-200',
      'resolved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
    const labels: Record<string, string> = {
      'completed': 'Completed', 'in-progress': 'In Progress', 'scheduled': 'Scheduled',
      'pending': 'Pending', 'open': 'Open', 'resolved': 'Resolved',
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${styles[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const styles: Record<string, string> = {
      'major': 'bg-red-50 text-red-700 border-red-200',
      'minor': 'bg-amber-50 text-amber-700 border-amber-200',
      'observation': 'bg-blue-50 text-blue-700 border-blue-200',
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${styles[severity] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  const getPriorityDot = (priority: string) => {
    const colors: Record<string, string> = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-blue-500' };
    return <span className={`inline-block w-2 h-2 rounded-full ${colors[priority] || 'bg-gray-400'}`} />;
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{audit.auditNumber}</span>
              {getStatusBadge(audit.status)}
              {audit.overallRating && (
                <span className={`text-xs px-2 py-0.5 rounded ${
                  audit.overallRating === 'Excellent' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  {audit.overallRating}
                </span>
              )}
            </div>
            <h2 className="text-xl text-gray-900">{audit.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Shield size={14} />
                <span className="text-xs">Type</span>
              </div>
              <div className="text-sm text-gray-900">{audit.type}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <User size={14} />
                <span className="text-xs">Lead Auditor</span>
              </div>
              <div className="text-sm text-gray-900">{audit.auditor}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Calendar size={14} />
                <span className="text-xs">Scheduled</span>
              </div>
              <div className="text-sm text-gray-900">{audit.scheduledDate}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <ClipboardCheck size={14} />
                <span className="text-xs">Department</span>
              </div>
              <div className="text-sm text-gray-900">{audit.department}</div>
            </div>
          </div>

          {/* Completion Summary */}
          {audit.status === 'completed' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-sm text-emerald-800">
                  Audit completed successfully on {audit.completionDate}. Overall, procedures are robust with only minor areas for improvement identified. All action items have been assigned and are being tracked.
                </div>
              </div>
            </div>
          )}

          {/* Scope & Objectives */}
          <div>
            <h3 className="text-sm text-gray-900 mb-2">Scope & Objectives</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-2">
              <p>Assess effectiveness of procedures and ensure compliance with regulatory requirements and organisational policies.</p>
              <ul className="list-disc list-inside space-y-1 text-gray-500">
                <li>Review records for accuracy and completeness</li>
                <li>Verify proper storage and controls</li>
                <li>Assess staff competency</li>
                <li>Review ordering and stock management procedures</li>
              </ul>
            </div>
          </div>

          {/* Audit Notes */}
          <div>
            <h3 className="text-sm text-gray-900 mb-2">Audit Notes</h3>
            <textarea
              value={auditNotes}
              onChange={(e) => setAuditNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Add audit observations and notes..."
            />
          </div>

          {/* Findings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-900">Findings ({findings.length})</h3>
              <button className="text-xs text-blue-600 hover:text-blue-700">+ Add Finding</button>
            </div>
            {findings.length === 0 ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
                <CheckCircle size={32} className="text-emerald-500 mx-auto mb-2" />
                <p className="text-sm text-emerald-700">No issues identified during this audit.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {findings.map((finding) => (
                  <div key={finding.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {getSeverityBadge(finding.severity)}
                      {getStatusBadge(finding.status)}
                      <span className="text-xs text-gray-400 ml-auto">{finding.area}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{finding.finding}</p>
                    <div className="bg-blue-50 rounded-md px-3 py-2">
                      <p className="text-xs text-blue-700"><span className="text-blue-800">Recommendation:</span> {finding.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h3 className="text-sm text-gray-900">Action Items ({actionItems.length})</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {actionItems.filter(a => a.status === 'completed').length} done</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {actionItems.filter(a => a.status === 'in-progress').length} in progress</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400" /> {actionItems.filter(a => a.status === 'pending').length} pending</span>
                </div>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-700">+ Add Action</button>
            </div>
            <div className="space-y-1.5">
              {actionItems.map((item) => (
                <div key={item.id} className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${item.status === 'completed' ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100'}`}>
                  {getPriorityDot(item.priority)}
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm ${item.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {item.action}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-gray-500">{item.assignedTo}</span>
                    <span className="text-xs text-gray-400">{item.dueDate}</span>
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-900">Documentation ({documents.length})</h3>
              <button className="text-xs text-blue-600 hover:text-blue-700">+ Upload</button>
            </div>
            <div className="space-y-1.5">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-800">{doc.name}</span>
                      <span className="text-xs text-gray-400 ml-2">{doc.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{doc.uploadedBy} · {doc.date}</span>
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                      <Download size={14} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={14} />
              Export
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Edit size={14} />
              Edit
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Close
            </button>
            <button className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
