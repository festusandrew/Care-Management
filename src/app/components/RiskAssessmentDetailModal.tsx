import { X, Shield, TrendingUp, TrendingDown, CheckCircle, AlertTriangle, Clock, Edit } from 'lucide-react';

interface RiskAssessmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  risk: {
    area: string;
    riskLevel: string;
    score: number;
    trend: string;
    lastAssessed: string;
    controls: number;
    gaps: number;
  } | null;
}

export function RiskAssessmentDetailModal({ isOpen, onClose, risk }: RiskAssessmentDetailModalProps) {
  if (!isOpen || !risk) return null;

  const getRiskBadge = (level: string) => {
    const styles: Record<string, string> = {
      'critical': 'bg-red-100 text-red-800 border-red-300',
      'high': 'bg-red-50 text-red-700 border-red-200',
      'medium': 'bg-amber-50 text-amber-700 border-amber-200',
      'low': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs border ${styles[level] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </span>
    );
  };

  // Mock controls data
  const controls = [
    { id: 1, name: 'Policy documentation maintained', effectiveness: 'effective', lastTested: '5 Feb 2026' },
    { id: 2, name: 'Staff training programme in place', effectiveness: 'partially-effective', lastTested: '10 Feb 2026' },
    { id: 3, name: 'Regular compliance audits conducted', effectiveness: 'effective', lastTested: '15 Jan 2026' },
    { id: 4, name: 'Incident reporting procedures', effectiveness: 'effective', lastTested: '20 Jan 2026' },
    { id: 5, name: 'Management review and oversight', effectiveness: risk.gaps > 0 ? 'ineffective' : 'effective', lastTested: '1 Feb 2026' },
  ];

  const gapItems = risk.gaps > 0 ? [
    { id: 1, title: 'Incomplete documentation', severity: 'high', daysOpen: 14 },
    { id: 2, title: 'Staff training overdue', severity: 'medium', daysOpen: 7 },
    ...(risk.gaps > 2 ? [{ id: 3, title: 'Procedure review outstanding', severity: 'high', daysOpen: 21 }] : []),
  ].slice(0, risk.gaps) : [];

  const historyEntries = [
    { date: risk.lastAssessed, score: risk.score, assessor: 'Sarah Williams' },
    { date: '10 Nov 2025', score: Math.max(risk.score - 1.2, 1), assessor: 'James Mitchell' },
    { date: '10 Aug 2025', score: Math.max(risk.score - 0.8, 1), assessor: 'Sarah Williams' },
    { date: '10 May 2025', score: Math.max(risk.score - 2.0, 1), assessor: 'James Mitchell' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {getRiskBadge(risk.riskLevel)}
              {risk.trend === 'up' && (
                <span className="flex items-center gap-1 text-xs text-red-500">
                  <TrendingUp size={12} /> Increasing
                </span>
              )}
              {risk.trend === 'down' && (
                <span className="flex items-center gap-1 text-xs text-emerald-500">
                  <TrendingDown size={12} /> Decreasing
                </span>
              )}
              {risk.trend === 'stable' && (
                <span className="text-xs text-gray-500">— Stable</span>
              )}
            </div>
            <h2 className="text-lg text-gray-900">{risk.area}</h2>
            <p className="text-xs text-gray-500 mt-0.5">Last assessed: {risk.lastAssessed}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          {/* Score Summary */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className={`text-2xl ${risk.score >= 7 ? 'text-red-600' : risk.score >= 4 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {risk.score}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Risk Score /10</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl text-blue-600">{risk.controls}</div>
              <div className="text-xs text-gray-500 mt-0.5">Controls</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className={`text-2xl ${risk.gaps > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{risk.gaps}</div>
              <div className="text-xs text-gray-500 mt-0.5">Open Gaps</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl text-gray-700">
                {controls.filter(c => c.effectiveness === 'effective').length}/{controls.length}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Effective Controls</div>
            </div>
          </div>

          {/* Risk Description */}
          <div>
            <h3 className="text-sm text-gray-900 mb-2">Risk Description</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p>This risk area covers all compliance obligations related to <strong>{risk.area}</strong>. The current risk score of <strong>{risk.score}/10</strong> reflects the overall exposure considering existing controls, identified gaps, and the likelihood and impact of non-compliance.</p>
              {risk.score >= 7 && (
                <p className="mt-2 text-red-600">This is a high-priority risk area requiring immediate management attention and remediation actions.</p>
              )}
            </div>
          </div>

          {/* Controls */}
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
                      {control.effectiveness === 'effective' ? 'Effective' :
                       control.effectiveness === 'partially-effective' ? 'Partial' : 'Ineffective'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Gaps */}
          {gapItems.length > 0 && (
            <div>
              <h3 className="text-sm text-gray-900 mb-2">Open Gaps ({gapItems.length})</h3>
              <div className="space-y-1.5">
                {gapItems.map((gap) => (
                  <div key={gap.id} className="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${gap.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'}`} />
                      <span className="text-sm text-gray-800">{gap.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={10} /> {gap.daysOpen}d open
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded border ${
                        gap.severity === 'high' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {gap.severity.charAt(0).toUpperCase() + gap.severity.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assessment History */}
          <div>
            <h3 className="text-sm text-gray-900 mb-2">Assessment History</h3>
            <div className="space-y-1.5">
              {historyEntries.map((entry, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-800">{entry.date}</div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{entry.assessor}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      entry.score >= 7 ? 'bg-red-50 text-red-700' : entry.score >= 4 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
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
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Edit size={14} />
            Edit Assessment
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Close
            </button>
            <button className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
              Reassess Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
