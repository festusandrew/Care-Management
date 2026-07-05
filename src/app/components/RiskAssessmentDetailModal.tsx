import { X, TrendingUp, TrendingDown, CheckCircle, AlertTriangle, Clock, Edit, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

type Control = { id: number; name: string; effectiveness: 'effective' | 'partially-effective' | 'ineffective'; lastTested: string };
type Gap = { id: number; title: string; severity: 'low' | 'medium' | 'high'; daysOpen: number };
type HistoryEntry = { date: string; score: number; assessor: string };

interface Risk {
  id?: number;
  area: string;
  riskLevel: string;
  score: number;
  trend: string;
  lastAssessed: string;
  controls: number;
  gaps: number;
  description?: string;
  controlItems?: Control[];
  gapItems?: Gap[];
  history?: HistoryEntry[];
}

interface RiskAssessmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  risk: Risk | null;
  onSave?: (updated: Risk) => void;
}

function defaultDescription(r: Risk) {
  const base = `This risk area covers all compliance obligations related to ${r.area}. The current risk score of ${r.score}/10 reflects the overall exposure considering existing controls, identified gaps, and the likelihood and impact of non-compliance.`;
  return r.score >= 7 ? `${base}\n\nThis is a high-priority risk area requiring immediate management attention and remediation actions.` : base;
}
function defaultControls(r: Risk): Control[] {
  return [
    { id: 1, name: 'Policy documentation maintained', effectiveness: 'effective', lastTested: '5 Feb 2026' },
    { id: 2, name: 'Staff training programme in place', effectiveness: 'partially-effective', lastTested: '10 Feb 2026' },
    { id: 3, name: 'Regular compliance audits conducted', effectiveness: 'effective', lastTested: '15 Jan 2026' },
    { id: 4, name: 'Incident reporting procedures', effectiveness: 'effective', lastTested: '20 Jan 2026' },
    { id: 5, name: 'Management review and oversight', effectiveness: r.gaps > 0 ? 'ineffective' : 'effective', lastTested: '1 Feb 2026' },
  ];
}
function defaultGaps(r: Risk): Gap[] {
  if (r.gaps <= 0) return [];
  const all: Gap[] = [
    { id: 1, title: 'Incomplete documentation', severity: 'high',   daysOpen: 14 },
    { id: 2, title: 'Staff training overdue',    severity: 'medium', daysOpen: 7 },
    { id: 3, title: 'Procedure review outstanding', severity: 'high', daysOpen: 21 },
  ];
  return all.slice(0, r.gaps);
}
function defaultHistory(r: Risk): HistoryEntry[] {
  return [
    { date: r.lastAssessed, score: r.score, assessor: 'Sarah Williams' },
    { date: '10 Nov 2025',  score: Math.max(r.score - 1.2, 1), assessor: 'James Mitchell' },
    { date: '10 Aug 2025',  score: Math.max(r.score - 0.8, 1), assessor: 'Sarah Williams' },
    { date: '10 May 2025',  score: Math.max(r.score - 2.0, 1), assessor: 'James Mitchell' },
  ];
}

export function RiskAssessmentDetailModal({ isOpen, onClose, risk, onSave }: RiskAssessmentDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Risk | null>(null);

  useEffect(() => {
    if (risk) {
      setForm({
        ...risk,
        description:  risk.description  ?? defaultDescription(risk),
        controlItems: risk.controlItems ?? defaultControls(risk),
        gapItems:     risk.gapItems     ?? defaultGaps(risk),
        history:      risk.history      ?? defaultHistory(risk),
      });
    }
    setIsEditing(false);
  }, [risk, isOpen]);

  if (!isOpen || !form) return null;

  const view = form;

  const getRiskBadge = (level: string) => {
    const styles: Record<string, string> = {
      'critical': 'bg-red-100 text-red-800 border-red-300',
      'high': 'bg-red-50 text-red-700 border-red-200',
      'medium': 'bg-amber-50 text-amber-700 border-amber-200',
      'low': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
    return <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs border ${styles[level] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>{level.charAt(0).toUpperCase() + level.slice(1)}</span>;
  };

  const controls = view.controlItems ?? [];
  const gapItems = view.gapItems ?? [];
  const history = view.history ?? [];

  const updControl = (i: number, patch: Partial<Control>) => setForm(f => f ? { ...f, controlItems: (f.controlItems ?? []).map((c, ix) => ix === i ? { ...c, ...patch } : c) } : f);
  const updGap     = (i: number, patch: Partial<Gap>)     => setForm(f => f ? { ...f, gapItems:     (f.gapItems ?? []).map((c, ix) => ix === i ? { ...c, ...patch } : c) } : f);
  const updHist    = (i: number, patch: Partial<HistoryEntry>) => setForm(f => f ? { ...f, history: (f.history ?? []).map((c, ix) => ix === i ? { ...c, ...patch } : c) } : f);

  const saveChanges = () => {
    const updated: Risk = {
      ...form,
      controls: (form.controlItems ?? []).length,
      gaps: (form.gapItems ?? []).length,
    };
    if (onSave) onSave(updated);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {getRiskBadge(view.riskLevel)}
              {view.trend === 'up' && (<span className="flex items-center gap-1 text-xs text-red-500"><TrendingUp size={12} /> Increasing</span>)}
              {view.trend === 'down' && (<span className="flex items-center gap-1 text-xs text-emerald-500"><TrendingDown size={12} /> Decreasing</span>)}
              {view.trend === 'stable' && (<span className="text-xs text-gray-500">— Stable</span>)}
            </div>
            <h2 className="text-lg text-gray-900">{view.area}</h2>
            <p className="text-xs text-gray-500 mt-0.5">Last assessed: {view.lastAssessed}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Display */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className={`text-2xl ${view.score >= 7 ? 'text-red-600' : view.score >= 4 ? 'text-amber-600' : 'text-emerald-600'}`}>{view.score}</div>
              <div className="text-xs text-gray-500 mt-0.5">Risk Score /10</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl text-blue-600">{controls.length}</div>
              <div className="text-xs text-gray-500 mt-0.5">Controls</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className={`text-2xl ${gapItems.length > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{gapItems.length}</div>
              <div className="text-xs text-gray-500 mt-0.5">Open Gaps</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl text-gray-700">
                {controls.filter(c => c.effectiveness === 'effective').length}/{controls.length}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Effective Controls</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-900 mb-2">Risk Description</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 whitespace-pre-wrap">{view.description}</div>
          </div>

          <div>
            <h3 className="text-sm text-gray-900 mb-2">Controls ({controls.length})</h3>
            <div className="space-y-1.5">
              {controls.map((control) => (
                <div key={control.id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2.5">
                    {control.effectiveness === 'effective' && <CheckCircle size={14} className="text-emerald-500" />}
                    {control.effectiveness === 'partially-effective' && <AlertTriangle size={14} className="text-amber-500" />}
                    {control.effectiveness === 'ineffective' && <AlertTriangle size={14} className="text-red-500" />}
                    <span className="text-sm text-gray-800">{control.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{control.lastTested}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      control.effectiveness === 'effective' ? 'bg-emerald-50 text-emerald-700' :
                      control.effectiveness === 'partially-effective' ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {control.effectiveness === 'effective' ? 'Effective' : control.effectiveness === 'partially-effective' ? 'Partial' : 'Ineffective'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {gapItems.length > 0 && (
            <div>
              <h3 className="text-sm text-gray-900 mb-2">Open Gaps ({gapItems.length})</h3>
              <div className="space-y-1.5">
                {gapItems.map((gap) => (
                  <div key={gap.id} className="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${gap.severity === 'high' ? 'bg-red-500' : gap.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                      <span className="text-sm text-gray-800">{gap.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-gray-500"><Clock size={10} /> {gap.daysOpen}d open</span>
                      <span className={`text-xs px-2 py-0.5 rounded border ${
                        gap.severity === 'high' ? 'bg-red-50 text-red-700 border-red-200'
                        : gap.severity === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {gap.severity.charAt(0).toUpperCase() + gap.severity.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm text-gray-900 mb-2">Assessment History</h3>
            <div className="space-y-1.5">
              {history.map((entry, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-800">{entry.date}</div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{entry.assessor}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${entry.score >= 7 ? 'bg-red-50 text-red-700' : entry.score >= 4 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {entry.score.toFixed(1)}/10
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 shrink-0">
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Edit size={14} />
            Edit Assessment
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Close</button>
            <button className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">Reassess Now</button>
          </div>
        </div>

        {/* Edit overlay */}
        {isEditing && (
          <div className="absolute inset-0 bg-white flex flex-col rounded-xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Edit Risk Assessment</h2>
                <p className="text-xs text-gray-500 mt-0.5">Update every section shown on the assessment</p>
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
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Risk Area</label>
                  <input value={form.area} onChange={e => setForm(f => f && { ...f, area: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Risk Level</label>
                    <select value={form.riskLevel} onChange={e => setForm(f => f && { ...f, riskLevel: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Trend</label>
                    <select value={form.trend} onChange={e => setForm(f => f && { ...f, trend: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                      <option value="up">Increasing</option>
                      <option value="stable">Stable</option>
                      <option value="down">Decreasing</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Score (0–10)</label>
                    <input type="number" step="0.1" min="0" max="10" value={form.score} onChange={e => setForm(f => f && { ...f, score: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Last Assessed</label>
                    <input value={form.lastAssessed} onChange={e => setForm(f => f && { ...f, lastAssessed: e.target.value })} placeholder="e.g. 12 Feb 2026" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                </div>
              </section>

              {/* Description */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Risk Description</h3>
                <textarea value={form.description ?? ''} onChange={e => setForm(f => f && { ...f, description: e.target.value })} rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
              </section>

              {/* Controls */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Controls</h3>
                  <button onClick={() => setForm(f => f && { ...f, controlItems: [...(f.controlItems ?? []), { id: Date.now(), name: '', effectiveness: 'effective', lastTested: '' }] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Plus size={12} /> Add control
                  </button>
                </div>
                <div className="space-y-2">
                  {(form.controlItems ?? []).map((c, i) => (
                    <div key={c.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <input value={c.name} onChange={e => updControl(i, { name: e.target.value })} placeholder="Control name" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <button onClick={() => setForm(f => f && { ...f, controlItems: (f.controlItems ?? []).filter((_, ix) => ix !== i) })} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <select value={c.effectiveness} onChange={e => updControl(i, { effectiveness: e.target.value as Control['effectiveness'] })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                          <option value="effective">Effective</option>
                          <option value="partially-effective">Partially Effective</option>
                          <option value="ineffective">Ineffective</option>
                        </select>
                        <input value={c.lastTested} onChange={e => updControl(i, { lastTested: e.target.value })} placeholder="Last tested (e.g. 5 Feb 2026)" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Gaps */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Open Gaps</h3>
                  <button onClick={() => setForm(f => f && { ...f, gapItems: [...(f.gapItems ?? []), { id: Date.now(), title: '', severity: 'medium', daysOpen: 0 }] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Plus size={12} /> Add gap
                  </button>
                </div>
                <div className="space-y-2">
                  {(form.gapItems ?? []).map((g, i) => (
                    <div key={g.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <input value={g.title} onChange={e => updGap(i, { title: e.target.value })} placeholder="Gap title" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <button onClick={() => setForm(f => f && { ...f, gapItems: (f.gapItems ?? []).filter((_, ix) => ix !== i) })} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <select value={g.severity} onChange={e => updGap(i, { severity: e.target.value as Gap['severity'] })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                        <input type="number" min="0" value={g.daysOpen} onChange={e => updGap(i, { daysOpen: Number(e.target.value) })} placeholder="Days open" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* History */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Assessment History</h3>
                  <button onClick={() => setForm(f => f && { ...f, history: [...(f.history ?? []), { date: '', score: 0, assessor: '' }] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Plus size={12} /> Add entry
                  </button>
                </div>
                <div className="space-y-2">
                  {(form.history ?? []).map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <input value={h.date} onChange={e => updHist(i, { date: e.target.value })} placeholder="Date" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <input value={h.assessor} onChange={e => updHist(i, { assessor: e.target.value })} placeholder="Assessor" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <input type="number" step="0.1" min="0" max="10" value={h.score} onChange={e => updHist(i, { score: Number(e.target.value) })} placeholder="Score" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      </div>
                      <button onClick={() => setForm(f => f && { ...f, history: (f.history ?? []).filter((_, ix) => ix !== i) })} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
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
