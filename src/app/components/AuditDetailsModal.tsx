import { X, Calendar, User, Shield, FileText, CheckCircle, Download, Edit, ClipboardCheck, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

type Finding = { id: number; severity: 'major' | 'minor' | 'observation'; area: string; finding: string; recommendation: string; status: 'open' | 'resolved' };
type ActionItem = { id: number; action: string; assignedTo: string; dueDate: string; priority: 'low' | 'medium' | 'high'; status: 'pending' | 'in-progress' | 'completed' };
type DocItem = { id: number; name: string; type: string; uploadedBy: string; date: string };

interface Audit {
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
  scopeSummary?: string;
  objectives?: string[];
  notes?: string;
  findingItems?: Finding[];
  actionItemList?: ActionItem[];
  documents?: DocItem[];
}

interface AuditDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  audit: Audit;
  onSave?: (updated: Audit) => void;
}

const DEFAULT_SCOPE = 'Assess effectiveness of procedures and ensure compliance with regulatory requirements and organisational policies.';
const DEFAULT_OBJECTIVES = [
  'Review records for accuracy and completeness',
  'Verify proper storage and controls',
  'Assess staff competency',
  'Review ordering and stock management procedures',
];
const DEFAULT_NOTES = 'Comprehensive review of procedures. All records reviewed for accuracy and completeness.';
const DEFAULT_FINDINGS: Finding[] = [
  { id: 1, severity: 'minor',       area: 'Documentation', finding: 'Two records had missing signatures for evening rounds on 1st Dec', recommendation: 'Reinforce signing procedures with all staff. Implement double-check system.', status: 'open' },
  { id: 2, severity: 'observation', area: 'Storage',       finding: 'Temperature log shows one reading slightly outside acceptable range', recommendation: 'Monitor temperature more closely. Consider maintenance check if issue persists.', status: 'resolved' },
];
const DEFAULT_ACTIONS: ActionItem[] = [
  { id: 1, action: 'Update signing procedures in staff handbook',    assignedTo: 'Sarah Williams',     dueDate: '15 Mar 2026', priority: 'medium', status: 'in-progress' },
  { id: 2, action: 'Conduct refresher training on record completion', assignedTo: 'Mary Thompson',     dueDate: '20 Mar 2026', priority: 'high',   status: 'pending' },
  { id: 3, action: 'Schedule equipment maintenance check',            assignedTo: 'James Mitchell',    dueDate: '10 Mar 2026', priority: 'medium', status: 'completed' },
  { id: 4, action: 'Review and update monitoring procedures',         assignedTo: 'Dr. Sarah Mitchell', dueDate: '18 Mar 2026', priority: 'low',    status: 'pending' },
  { id: 5, action: 'Implement double-check system for record completion', assignedTo: 'John Davies',   dueDate: '12 Mar 2026', priority: 'high',   status: 'in-progress' },
];
const DEFAULT_DOCS: DocItem[] = [
  { id: 1, name: 'Audit Checklist',    type: 'PDF', uploadedBy: 'Sarah Williams', date: '5 Feb 2026' },
  { id: 2, name: 'Evidence Photos',    type: 'ZIP', uploadedBy: 'Sarah Williams', date: '5 Feb 2026' },
  { id: 3, name: 'Audit Report Final', type: 'PDF', uploadedBy: 'Sarah Williams', date: '6 Feb 2026' },
];

export function AuditDetailsModal({ isOpen, onClose, audit, onSave }: AuditDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Audit | null>(null);

  useEffect(() => {
    if (audit) {
      setForm({
        ...audit,
        scopeSummary:   audit.scopeSummary   ?? DEFAULT_SCOPE,
        objectives:     audit.objectives     ?? DEFAULT_OBJECTIVES,
        notes:          audit.notes          ?? DEFAULT_NOTES,
        findingItems:   audit.findingItems   ?? DEFAULT_FINDINGS,
        actionItemList: audit.actionItemList ?? DEFAULT_ACTIONS,
        documents:      audit.documents      ?? DEFAULT_DOCS,
      });
    }
    setIsEditing(false);
  }, [audit, isOpen]);

  if (!isOpen || !form) return null;

  const view = form;

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'in-progress': 'bg-blue-50 text-blue-700 border-blue-200',
      'scheduled': 'bg-gray-50 text-gray-600 border-gray-200',
      'pending': 'bg-gray-50 text-gray-600 border-gray-200',
      'open': 'bg-amber-50 text-amber-700 border-amber-200',
      'resolved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'overdue': 'bg-red-50 text-red-700 border-red-200',
    };
    const labels: Record<string, string> = {
      'completed': 'Completed', 'in-progress': 'In Progress', 'scheduled': 'Scheduled',
      'pending': 'Pending', 'open': 'Open', 'resolved': 'Resolved', 'overdue': 'Overdue',
    };
    return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${styles[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>{labels[status] || status}</span>;
  };

  const getSeverityBadge = (severity: string) => {
    const styles: Record<string, string> = {
      'major': 'bg-red-50 text-red-700 border-red-200',
      'minor': 'bg-amber-50 text-amber-700 border-amber-200',
      'observation': 'bg-blue-50 text-blue-700 border-blue-200',
    };
    return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${styles[severity] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>{severity.charAt(0).toUpperCase() + severity.slice(1)}</span>;
  };

  const getPriorityDot = (priority: string) => {
    const colors: Record<string, string> = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-blue-500' };
    return <span className={`inline-block w-2 h-2 rounded-full ${colors[priority] || 'bg-gray-400'}`} />;
  };

  const saveChanges = () => {
    const updated: Audit = {
      ...form,
      // sync count fields with list lengths
      findings: (form.findingItems ?? []).length,
      actionItems: (form.actionItemList ?? []).length,
    };
    if (onSave) onSave(updated);
    setIsEditing(false);
  };

  const findings = view.findingItems ?? [];
  const actionItems = view.actionItemList ?? [];
  const documents = view.documents ?? [];

  const updF = (i: number, patch: Partial<Finding>) => setForm(f => f ? { ...f, findingItems: (f.findingItems ?? []).map((r, ix) => ix === i ? { ...r, ...patch } : r) } : f);
  const updA = (i: number, patch: Partial<ActionItem>) => setForm(f => f ? { ...f, actionItemList: (f.actionItemList ?? []).map((r, ix) => ix === i ? { ...r, ...patch } : r) } : f);
  const updD = (i: number, patch: Partial<DocItem>) => setForm(f => f ? { ...f, documents: (f.documents ?? []).map((r, ix) => ix === i ? { ...r, ...patch } : r) } : f);
  const updO = (i: number, val: string) => setForm(f => f ? { ...f, objectives: (f.objectives ?? []).map((r, ix) => ix === i ? val : r) } : f);

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{view.auditNumber}</span>
              {getStatusBadge(view.status)}
              {view.overallRating && (
                <span className={`text-xs px-2 py-0.5 rounded ${view.overallRating === 'Excellent' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                  {view.overallRating}
                </span>
              )}
            </div>
            <h2 className="text-xl text-gray-900">{view.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Display */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 mb-1"><Shield size={14} /><span className="text-xs">Type</span></div>
              <div className="text-sm text-gray-900">{view.type}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 mb-1"><User size={14} /><span className="text-xs">Lead Auditor</span></div>
              <div className="text-sm text-gray-900">{view.auditor}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 mb-1"><Calendar size={14} /><span className="text-xs">Scheduled</span></div>
              <div className="text-sm text-gray-900">{view.scheduledDate}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 mb-1"><ClipboardCheck size={14} /><span className="text-xs">Department</span></div>
              <div className="text-sm text-gray-900">{view.department}</div>
            </div>
          </div>

          {view.status === 'completed' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-sm text-emerald-800">
                  Audit completed successfully on {view.completionDate}. Overall, procedures are robust with only minor areas for improvement identified. All action items have been assigned and are being tracked.
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm text-gray-900 mb-2">Scope & Objectives</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-2">
              <p>{view.scopeSummary}</p>
              <ul className="list-disc list-inside space-y-1 text-gray-500">
                {(view.objectives ?? []).map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-900 mb-2">Audit Notes</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">{view.notes}</div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-900">Findings ({findings.length})</h3>
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
            </div>
            <div className="space-y-1.5">
              {actionItems.map((item) => (
                <div key={item.id} className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${item.status === 'completed' ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100'}`}>
                  {getPriorityDot(item.priority)}
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm ${item.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{item.action}</span>
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

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-900">Documentation ({documents.length})</h3>
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
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Edit size={14} />
              Edit
            </button>
          </div>
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Close</button>
        </div>

        {/* Edit overlay */}
        {isEditing && (
          <div className="absolute inset-0 bg-white flex flex-col rounded-xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Edit Audit</h2>
                <p className="text-xs text-gray-500 mt-0.5">{view.auditNumber}</p>
              </div>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
              {/* Basics */}
              <section className="space-y-3">
                <h3 className="text-sm font-bold text-gray-900">Basics</h3>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Audit Title</label>
                  <input value={form.title} onChange={e => setForm(f => f && { ...f, title: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Audit Number</label>
                    <input value={form.auditNumber} onChange={e => setForm(f => f && { ...f, auditNumber: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Type</label>
                    <input value={form.type} onChange={e => setForm(f => f && { ...f, type: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Lead Auditor</label>
                    <input value={form.auditor} onChange={e => setForm(f => f && { ...f, auditor: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Department</label>
                    <input value={form.department} onChange={e => setForm(f => f && { ...f, department: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Scheduled Date</label>
                    <input value={form.scheduledDate} onChange={e => setForm(f => f && { ...f, scheduledDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Completion Date</label>
                    <input value={form.completionDate ?? ''} onChange={e => setForm(f => f && { ...f, completionDate: e.target.value })} placeholder="e.g. 6 Feb 2026" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Status</label>
                    <select value={form.status} onChange={e => setForm(f => f && { ...f, status: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                      <option value="scheduled">Scheduled</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Overall Rating</label>
                    <select value={form.overallRating ?? ''} onChange={e => setForm(f => f && { ...f, overallRating: e.target.value || undefined })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                      <option value="">Not set</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Satisfactory">Satisfactory</option>
                      <option value="Needs Improvement">Needs Improvement</option>
                      <option value="Unsatisfactory">Unsatisfactory</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Scope & Objectives */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Scope & Objectives</h3>
                <div className="space-y-3">
                  <textarea value={form.scopeSummary ?? ''} onChange={e => setForm(f => f && { ...f, scopeSummary: e.target.value })} rows={3} placeholder="Scope summary" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-500 font-medium">Objectives</p>
                      <button onClick={() => setForm(f => f && { ...f, objectives: [...(f.objectives ?? []), ''] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                        <Plus size={12} /> Add objective
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(form.objectives ?? []).map((o, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input value={o} onChange={e => updO(i, e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                          <button onClick={() => setForm(f => f && { ...f, objectives: (f.objectives ?? []).filter((_, ix) => ix !== i) })} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Notes */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Audit Notes</h3>
                <textarea value={form.notes ?? ''} onChange={e => setForm(f => f && { ...f, notes: e.target.value })} rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
              </section>

              {/* Findings */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Findings</h3>
                  <button onClick={() => setForm(f => f && { ...f, findingItems: [...(f.findingItems ?? []), { id: Date.now(), severity: 'observation', area: '', finding: '', recommendation: '', status: 'open' }] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Plus size={12} /> Add finding
                  </button>
                </div>
                <div className="space-y-3">
                  {(form.findingItems ?? []).map((fnd, i) => (
                    <div key={fnd.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 grid grid-cols-3 gap-2">
                          <select value={fnd.severity} onChange={e => updF(i, { severity: e.target.value as Finding['severity'] })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                            <option value="major">Major</option>
                            <option value="minor">Minor</option>
                            <option value="observation">Observation</option>
                          </select>
                          <input value={fnd.area} onChange={e => updF(i, { area: e.target.value })} placeholder="Area" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                          <select value={fnd.status} onChange={e => updF(i, { status: e.target.value as Finding['status'] })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                            <option value="open">Open</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                        <button onClick={() => setForm(f => f && { ...f, findingItems: (f.findingItems ?? []).filter((_, ix) => ix !== i) })} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                      <textarea value={fnd.finding} onChange={e => updF(i, { finding: e.target.value })} placeholder="Finding" rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
                      <textarea value={fnd.recommendation} onChange={e => updF(i, { recommendation: e.target.value })} placeholder="Recommendation" rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Action Items */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Action Items</h3>
                  <button onClick={() => setForm(f => f && { ...f, actionItemList: [...(f.actionItemList ?? []), { id: Date.now(), action: '', assignedTo: '', dueDate: '', priority: 'medium', status: 'pending' }] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Plus size={12} /> Add action
                  </button>
                </div>
                <div className="space-y-3">
                  {(form.actionItemList ?? []).map((it, i) => (
                    <div key={it.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <input value={it.action} onChange={e => updA(i, { action: e.target.value })} placeholder="Action" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <button onClick={() => setForm(f => f && { ...f, actionItemList: (f.actionItemList ?? []).filter((_, ix) => ix !== i) })} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <input value={it.assignedTo} onChange={e => updA(i, { assignedTo: e.target.value })} placeholder="Assigned to" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <input value={it.dueDate} onChange={e => updA(i, { dueDate: e.target.value })} placeholder="Due date" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <select value={it.priority} onChange={e => updA(i, { priority: e.target.value as ActionItem['priority'] })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                        <select value={it.status} onChange={e => updA(i, { status: e.target.value as ActionItem['status'] })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Documents */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Documentation</h3>
                  <button onClick={() => setForm(f => f && { ...f, documents: [...(f.documents ?? []), { id: Date.now(), name: '', type: 'PDF', uploadedBy: '', date: '' }] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Plus size={12} /> Add document
                  </button>
                </div>
                <div className="space-y-2">
                  {(form.documents ?? []).map((d, i) => (
                    <div key={d.id} className="flex items-start gap-2">
                      <div className="flex-1 grid grid-cols-4 gap-2">
                        <input value={d.name} onChange={e => updD(i, { name: e.target.value })} placeholder="Document name" className="col-span-2 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <select value={d.type} onChange={e => updD(i, { type: e.target.value })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                          <option>PDF</option>
                          <option>DOCX</option>
                          <option>XLSX</option>
                          <option>ZIP</option>
                          <option>IMG</option>
                        </select>
                        <input value={d.date} onChange={e => updD(i, { date: e.target.value })} placeholder="Date" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <input value={d.uploadedBy} onChange={e => updD(i, { uploadedBy: e.target.value })} placeholder="Uploaded by" className="col-span-3 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      </div>
                      <button onClick={() => setForm(f => f && { ...f, documents: (f.documents ?? []).filter((_, ix) => ix !== i) })} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 shrink-0 bg-gray-50/50">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={saveChanges} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
