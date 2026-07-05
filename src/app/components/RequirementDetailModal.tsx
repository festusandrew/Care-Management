import { X, Calendar, User, Shield, Edit, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

type AuditRow = { date: string; auditor: string; result: string; score: number };
type ActionRow = { id: number; action: string; assignee: string; dueDate: string; status: 'in-progress' | 'pending' | 'completed' };

interface Requirement {
  id: number;
  name: string;
  legislation: string;
  client: string;
  category: string;
  status: string;
  risk: string;
  progress: number;
  nextReview: string;
  description?: string;
  keyObligations?: string[];
  auditHistory?: AuditRow[];
  actionItems?: ActionRow[];
}

interface RequirementDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  requirement: Requirement | null;
  onSave?: (updated: Requirement) => void;
}

const DEFAULT_OBLIGATIONS = [
  'Maintain up-to-date documentation and records',
  'Ensure all staff are trained on relevant procedures',
  'Conduct periodic reviews and assessments',
  'Report any breaches or incidents promptly',
  'Implement corrective actions within mandated timeframes',
];

function defaultDescription(r: Requirement) {
  return `This compliance requirement covers the obligations under ${r.legislation} as applicable to ${r.client}. It encompasses all related policies, procedures, documentation, and training requirements necessary to maintain full regulatory compliance.\n\nRegular reviews are conducted to ensure ongoing adherence. Any non-compliance issues identified are logged as compliance gaps and tracked through to resolution.`;
}
function defaultAudit(r: Requirement): AuditRow[] {
  return [
    { date: '15 Jan 2026', auditor: 'Sarah Williams', result: 'Partial Compliance', score: r.progress },
    { date: '15 Oct 2025', auditor: 'James Mitchell', result: 'At Risk', score: Math.max(r.progress - 15, 30) },
    { date: '15 Jul 2025', auditor: 'Sarah Williams', result: 'Non-Compliant', score: Math.max(r.progress - 30, 20) },
  ];
}
function defaultActions(): ActionRow[] {
  return [
    { id: 1, action: 'Complete outstanding documentation', assignee: 'Sarah Williams', dueDate: '10 Mar 2026', status: 'in-progress' },
    { id: 2, action: 'Staff training on updated procedures', assignee: 'Mary Thompson',  dueDate: '20 Mar 2026', status: 'pending' },
    { id: 3, action: 'Submit evidence to regulatory body', assignee: 'James Mitchell',  dueDate: '1 Apr 2026',  status: 'pending' },
  ];
}

export function RequirementDetailModal({ isOpen, onClose, requirement, onSave }: RequirementDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Requirement | null>(null);

  useEffect(() => {
    if (requirement) {
      setForm({
        ...requirement,
        description: requirement.description ?? defaultDescription(requirement),
        keyObligations: requirement.keyObligations ?? DEFAULT_OBLIGATIONS,
        auditHistory: requirement.auditHistory ?? defaultAudit(requirement),
        actionItems: requirement.actionItems ?? defaultActions(),
      });
    }
    setIsEditing(false);
  }, [requirement, isOpen]);

  if (!isOpen || !requirement || !form) return null;

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'compliant': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'at-risk': 'bg-red-50 text-red-700 border-red-200',
      'non-compliant': 'bg-red-50 text-red-800 border-red-300',
      'pending-review': 'bg-amber-50 text-amber-700 border-amber-200',
    };
    const labels: Record<string, string> = {
      'compliant': 'Compliant', 'at-risk': 'At Risk', 'non-compliant': 'Non-Compliant', 'pending-review': 'Pending Review',
    };
    return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${styles[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>{labels[status] || status}</span>;
  };

  const getRiskBadge = (risk: string) => {
    const styles: Record<string, string> = {
      'critical': 'bg-red-100 text-red-800 border-red-300',
      'high': 'bg-red-50 text-red-700 border-red-200',
      'medium': 'bg-amber-50 text-amber-700 border-amber-200',
      'low': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
    return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${styles[risk] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>{risk.charAt(0).toUpperCase() + risk.slice(1)}</span>;
  };

  const progressColor = (p: number) => p >= 100 ? 'bg-emerald-500' : p >= 70 ? 'bg-blue-500' : p >= 40 ? 'bg-amber-500' : 'bg-red-500';

  const view = form; // rendering source (form mirrors requirement)

  const saveChanges = () => {
    if (onSave) onSave(form);
    setIsEditing(false);
  };

  const updateAudit = (i: number, patch: Partial<AuditRow>) =>
    setForm(f => f ? { ...f, auditHistory: (f.auditHistory ?? []).map((r, ix) => ix === i ? { ...r, ...patch } : r) } : f);
  const updateAction = (i: number, patch: Partial<ActionRow>) =>
    setForm(f => f ? { ...f, actionItems: (f.actionItems ?? []).map((r, ix) => ix === i ? { ...r, ...patch } : r) } : f);

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {getStatusBadge(view.status)}
              {getRiskBadge(view.risk)}
            </div>
            <h2 className="text-lg text-gray-900">{view.name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{view.legislation}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Display */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-gray-500 mb-1"><User size={12} /><span className="text-xs">Client</span></div>
              <div className="text-sm text-gray-900">{view.client}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-gray-500 mb-1"><Shield size={12} /><span className="text-xs">Category</span></div>
              <div className="text-sm text-gray-900">{view.category}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-gray-500 mb-1"><Calendar size={12} /><span className="text-xs">Next Review</span></div>
              <div className="text-sm text-gray-900">{view.nextReview}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-gray-500 mb-1"><CheckCircle size={12} /><span className="text-xs">Progress</span></div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div className={`${progressColor(view.progress)} h-1.5 rounded-full`} style={{ width: `${view.progress}%` }} />
                </div>
                <span className="text-sm text-gray-900">{view.progress}%</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-900 mb-2">Description</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 whitespace-pre-wrap">{view.description}</div>
          </div>

          <div>
            <h3 className="text-sm text-gray-900 mb-2">Key Obligations</h3>
            <div className="space-y-1.5">
              {(view.keyObligations ?? []).map((obligation, i) => (
                <div key={i} className="flex items-start gap-2.5 px-4 py-2.5 bg-gray-50 rounded-lg">
                  <CheckCircle size={14} className={`mt-0.5 shrink-0 ${view.progress >= (i + 1) * (100 / Math.max(1, (view.keyObligations ?? []).length)) ? 'text-emerald-500' : 'text-gray-300'}`} />
                  <span className="text-sm text-gray-700">{obligation}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-900 mb-2">Audit History</h3>
            <div className="space-y-1.5">
              {(view.auditHistory ?? []).map((audit, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-500 w-20">{audit.date}</div>
                    <div className="text-sm text-gray-800">{audit.result}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{audit.auditor}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${audit.score >= 80 ? 'bg-emerald-50 text-emerald-700' : audit.score >= 50 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                      {audit.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-900 mb-2">Outstanding Actions ({(view.actionItems ?? []).length})</h3>
            <div className="space-y-1.5">
              {(view.actionItems ?? []).map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3 border border-gray-100 rounded-lg">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${item.status === 'in-progress' ? 'bg-blue-500' : item.status === 'completed' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-gray-800">{item.action}</span>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">{item.assignee}</span>
                  <span className="text-xs text-gray-400 shrink-0">{item.dueDate}</span>
                  <span className={`text-xs px-2 py-0.5 rounded shrink-0 ${
                    item.status === 'in-progress' ? 'bg-blue-50 text-blue-700'
                    : item.status === 'completed' ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-gray-50 text-gray-600'
                  }`}>
                    {item.status === 'in-progress' ? 'In Progress' : item.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 shrink-0">
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Edit size={14} />
            Edit
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Close</button>
            <button className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">Mark as Reviewed</button>
          </div>
        </div>

        {/* Edit overlay */}
        {isEditing && (
          <div className="absolute inset-0 bg-white flex flex-col rounded-xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Edit Requirement</h2>
                <p className="text-xs text-gray-500 mt-0.5">Update every section shown on the requirement</p>
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
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Requirement Name</label>
                  <input value={form.name} onChange={e => setForm(f => f && { ...f, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Legislation</label>
                  <input value={form.legislation} onChange={e => setForm(f => f && { ...f, legislation: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Client</label>
                    <input value={form.client} onChange={e => setForm(f => f && { ...f, client: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Category</label>
                    <input value={form.category} onChange={e => setForm(f => f && { ...f, category: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Status</label>
                    <select value={form.status} onChange={e => setForm(f => f && { ...f, status: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                      <option value="compliant">Compliant</option>
                      <option value="at-risk">At Risk</option>
                      <option value="non-compliant">Non-Compliant</option>
                      <option value="pending-review">Pending Review</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Risk Level</label>
                    <select value={form.risk} onChange={e => setForm(f => f && { ...f, risk: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Progress (%)</label>
                    <input type="number" min="0" max="100" value={form.progress} onChange={e => setForm(f => f && { ...f, progress: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Next Review</label>
                    <input value={form.nextReview} onChange={e => setForm(f => f && { ...f, nextReview: e.target.value })} placeholder="e.g. 15 Apr 2026" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                </div>
              </section>

              {/* Description */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Description</h3>
                <textarea value={form.description ?? ''} onChange={e => setForm(f => f && { ...f, description: e.target.value })} rows={5} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
              </section>

              {/* Key Obligations */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Key Obligations</h3>
                  <button onClick={() => setForm(f => f && { ...f, keyObligations: [...(f.keyObligations ?? []), ''] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Plus size={12} /> Add obligation
                  </button>
                </div>
                <div className="space-y-2">
                  {(form.keyObligations ?? []).map((ob, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        value={ob}
                        onChange={e => setForm(f => f && { ...f, keyObligations: (f.keyObligations ?? []).map((x, ix) => ix === i ? e.target.value : x) })}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                      />
                      <button
                        onClick={() => setForm(f => f && { ...f, keyObligations: (f.keyObligations ?? []).filter((_, ix) => ix !== i) })}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                      ><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Audit History */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Audit History</h3>
                  <button onClick={() => setForm(f => f && { ...f, auditHistory: [...(f.auditHistory ?? []), { date: '', auditor: '', result: '', score: 0 }] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Plus size={12} /> Add audit
                  </button>
                </div>
                <div className="space-y-3">
                  {(form.auditHistory ?? []).map((a, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 grid grid-cols-3 gap-2">
                          <input value={a.date} onChange={e => updateAudit(i, { date: e.target.value })} placeholder="Date" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                          <input value={a.auditor} onChange={e => updateAudit(i, { auditor: e.target.value })} placeholder="Auditor" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                          <input type="number" min="0" max="100" value={a.score} onChange={e => updateAudit(i, { score: Number(e.target.value) })} placeholder="Score" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        </div>
                        <button
                          onClick={() => setForm(f => f && { ...f, auditHistory: (f.auditHistory ?? []).filter((_, ix) => ix !== i) })}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                        ><Trash2 size={14} /></button>
                      </div>
                      <input value={a.result} onChange={e => updateAudit(i, { result: e.target.value })} placeholder="Result / summary" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Outstanding Actions */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Outstanding Actions</h3>
                  <button
                    onClick={() => setForm(f => f && { ...f, actionItems: [...(f.actionItems ?? []), { id: Date.now(), action: '', assignee: '', dueDate: '', status: 'pending' }] })}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                  ><Plus size={12} /> Add action</button>
                </div>
                <div className="space-y-3">
                  {(form.actionItems ?? []).map((it, i) => (
                    <div key={it.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <input value={it.action} onChange={e => updateAction(i, { action: e.target.value })} placeholder="Action" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <button
                          onClick={() => setForm(f => f && { ...f, actionItems: (f.actionItems ?? []).filter((_, ix) => ix !== i) })}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                        ><Trash2 size={14} /></button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <input value={it.assignee} onChange={e => updateAction(i, { assignee: e.target.value })} placeholder="Assignee" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <input value={it.dueDate} onChange={e => updateAction(i, { dueDate: e.target.value })} placeholder="Due date" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <select value={it.status} onChange={e => updateAction(i, { status: e.target.value as ActionRow['status'] })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
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
