import { X, ListChecks, Calendar, User, Shield, FileText, Clock, Edit, Download, CheckCircle, AlertTriangle } from 'lucide-react';

interface RequirementDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  requirement: {
    id: number;
    name: string;
    legislation: string;
    client: string;
    category: string;
    status: string;
    risk: string;
    progress: number;
    nextReview: string;
  } | null;
}

export function RequirementDetailModal({ isOpen, onClose, requirement }: RequirementDetailModalProps) {
  if (!isOpen || !requirement) return null;

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
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${styles[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getRiskBadge = (risk: string) => {
    const styles: Record<string, string> = {
      'critical': 'bg-red-100 text-red-800 border-red-300',
      'high': 'bg-red-50 text-red-700 border-red-200',
      'medium': 'bg-amber-50 text-amber-700 border-amber-200',
      'low': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${styles[risk] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)}
      </span>
    );
  };

  const getProgressColor = (p: number) => {
    if (p >= 100) return 'bg-emerald-500';
    if (p >= 70) return 'bg-blue-500';
    if (p >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  // Mock detailed data based on the requirement
  const auditHistory = [
    { date: '15 Jan 2026', auditor: 'Sarah Williams', result: 'Partial Compliance', score: requirement.progress },
    { date: '15 Oct 2025', auditor: 'James Mitchell', result: 'At Risk', score: Math.max(requirement.progress - 15, 30) },
    { date: '15 Jul 2025', auditor: 'Sarah Williams', result: 'Non-Compliant', score: Math.max(requirement.progress - 30, 20) },
  ];

  const actionItems = [
    { id: 1, action: 'Complete outstanding documentation', assignee: 'Sarah Williams', dueDate: '10 Mar 2026', status: 'in-progress' },
    { id: 2, action: 'Staff training on updated procedures', assignee: 'Mary Thompson', dueDate: '20 Mar 2026', status: 'pending' },
    { id: 3, action: 'Submit evidence to regulatory body', assignee: 'James Mitchell', dueDate: '1 Apr 2026', status: 'pending' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {getStatusBadge(requirement.status)}
              {getRiskBadge(requirement.risk)}
            </div>
            <h2 className="text-lg text-gray-900">{requirement.name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{requirement.legislation}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                <User size={12} />
                <span className="text-xs">Client</span>
              </div>
              <div className="text-sm text-gray-900">{requirement.client}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                <Shield size={12} />
                <span className="text-xs">Category</span>
              </div>
              <div className="text-sm text-gray-900">{requirement.category}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                <Calendar size={12} />
                <span className="text-xs">Next Review</span>
              </div>
              <div className="text-sm text-gray-900">{requirement.nextReview}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                <CheckCircle size={12} />
                <span className="text-xs">Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div className={`${getProgressColor(requirement.progress)} h-1.5 rounded-full`} style={{ width: `${requirement.progress}%` }} />
                </div>
                <span className="text-sm text-gray-900">{requirement.progress}%</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm text-gray-900 mb-2">Description</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p>This compliance requirement covers the obligations under <strong>{requirement.legislation}</strong> as applicable to <strong>{requirement.client}</strong>. It encompasses all related policies, procedures, documentation, and training requirements necessary to maintain full regulatory compliance.</p>
              <p className="mt-2">Regular reviews are conducted to ensure ongoing adherence. Any non-compliance issues identified are logged as compliance gaps and tracked through to resolution.</p>
            </div>
          </div>

          {/* Key Obligations */}
          <div>
            <h3 className="text-sm text-gray-900 mb-2">Key Obligations</h3>
            <div className="space-y-1.5">
              {[
                'Maintain up-to-date documentation and records',
                'Ensure all staff are trained on relevant procedures',
                'Conduct periodic reviews and assessments',
                'Report any breaches or incidents promptly',
                'Implement corrective actions within mandated timeframes',
              ].map((obligation, i) => (
                <div key={i} className="flex items-start gap-2.5 px-4 py-2.5 bg-gray-50 rounded-lg">
                  <CheckCircle size={14} className={`mt-0.5 shrink-0 ${requirement.progress >= (i + 1) * 20 ? 'text-emerald-500' : 'text-gray-300'}`} />
                  <span className="text-sm text-gray-700">{obligation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audit History */}
          <div>
            <h3 className="text-sm text-gray-900 mb-2">Audit History</h3>
            <div className="space-y-1.5">
              {auditHistory.map((audit, i) => (
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

          {/* Outstanding Actions */}
          <div>
            <h3 className="text-sm text-gray-900 mb-2">Outstanding Actions ({actionItems.length})</h3>
            <div className="space-y-1.5">
              {actionItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3 border border-gray-100 rounded-lg">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-gray-800">{item.action}</span>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">{item.assignee}</span>
                  <span className="text-xs text-gray-400 shrink-0">{item.dueDate}</span>
                  <span className={`text-xs px-2 py-0.5 rounded shrink-0 ${item.status === 'in-progress' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-600'}`}>
                    {item.status === 'in-progress' ? 'In Progress' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 shrink-0">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Edit size={14} />
            Edit
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Close
            </button>
            <button className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
              Mark as Reviewed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
