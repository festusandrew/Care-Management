import { X, AlertTriangle, XCircle, Clock, CheckCircle } from 'lucide-react';

interface ViewAllRenewalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  renewals: Array<{
    id: number;
    item: string;
    dueDate: string;
    daysLeft: number;
    priority: string;
  }>;
  onRenew: (renewal: any) => void;
}

export function ViewAllRenewalsModal({ isOpen, onClose, renewals, onRenew }: ViewAllRenewalsModalProps) {
  if (!isOpen) return null;

  const overdueItems = renewals.filter(r => r.priority === 'overdue');
  const highPriority = renewals.filter(r => r.priority === 'high');
  const mediumPriority = renewals.filter(r => r.priority === 'medium');
  const lowPriority = renewals.filter(r => r.priority === 'low');

  const PrioritySection = ({ title, icon: Icon, items, iconColor, badgeStyle, buttonStyle }: any) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-5 last:mb-0">
        <div className="flex items-center gap-2 mb-2">
          <Icon size={16} className={iconColor} />
          <span className="text-sm text-gray-900">{title} ({items.length})</span>
        </div>
        <div className="space-y-1.5">
          {items.map((renewal: any) => (
            <div key={renewal.id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Icon size={16} className={`${iconColor} shrink-0`} />
                <div className="min-w-0">
                  <div className="text-sm text-gray-800 truncate">{renewal.item}</div>
                  <div className="text-xs text-gray-500">Due: {renewal.dueDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                {renewal.priority === 'overdue' ? (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${badgeStyle}`}>
                    {Math.abs(renewal.daysLeft)}d overdue
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">{renewal.daysLeft}d left</span>
                )}
                <button
                  className={`px-3 py-1.5 text-xs text-white rounded-lg transition-colors ${buttonStyle}`}
                  onClick={() => { onClose(); onRenew(renewal); }}
                >
                  {renewal.priority === 'overdue' ? 'Renew Now' : 'Schedule'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg text-gray-900">All Renewals & Deadlines</h2>
            <p className="text-xs text-gray-500">{renewals.length} items requiring attention</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-3 px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <div className="text-xl text-red-600">{overdueItems.length}</div>
            <div className="text-xs text-gray-600">Overdue</div>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 text-center">
            <div className="text-xl text-amber-600">{highPriority.length}</div>
            <div className="text-xs text-gray-600">High</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-xl text-blue-600">{mediumPriority.length}</div>
            <div className="text-xs text-gray-600">Medium</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3 text-center">
            <div className="text-xl text-emerald-600">{lowPriority.length}</div>
            <div className="text-xs text-gray-600">Low</div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <PrioritySection
            title="Overdue"
            icon={XCircle}
            items={overdueItems}
            iconColor="text-red-600"
            badgeStyle="bg-red-100 text-red-700 border border-red-200"
            buttonStyle="bg-red-600 hover:bg-red-700"
          />
          <PrioritySection
            title="High Priority"
            icon={AlertTriangle}
            items={highPriority}
            iconColor="text-amber-600"
            badgeStyle="bg-amber-100 text-amber-700"
            buttonStyle="bg-amber-600 hover:bg-amber-700"
          />
          <PrioritySection
            title="Medium Priority"
            icon={Clock}
            items={mediumPriority}
            iconColor="text-blue-600"
            badgeStyle="bg-blue-100 text-blue-700"
            buttonStyle="bg-blue-700 hover:bg-blue-800"
          />
          <PrioritySection
            title="Low Priority"
            icon={CheckCircle}
            items={lowPriority}
            iconColor="text-emerald-600"
            badgeStyle="bg-emerald-100 text-emerald-700"
            buttonStyle="bg-emerald-600 hover:bg-emerald-700"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
