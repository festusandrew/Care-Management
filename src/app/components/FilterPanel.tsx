import { X } from 'lucide-react';

type FilterSection = { key: string; label: string; options: string[] };
type FilterValues = Record<string, string[]>;

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sections?: FilterSection[];
  values?: FilterValues;
  onChange?: (values: FilterValues) => void;
  title?: string;
}

const DEFAULT_SECTIONS: FilterSection[] = [
  { key: 'riskLevel', label: 'Risk Level', options: ['High Risk', 'Medium Risk', 'Low Risk'] },
  { key: 'location',  label: 'Location',   options: ['Riverside House', 'Oak Tree Lodge', 'Meadow View'] },
  { key: 'careManager', label: 'Care Manager', options: ['Dr. Emily Carter', 'Sarah Williams', 'James Mitchell'] },
];

export function FilterPanel({ isOpen, onClose, sections, values, onChange, title = 'Filters' }: FilterPanelProps) {
  if (!isOpen) return null;
  const activeSections = sections && sections.length ? sections : DEFAULT_SECTIONS;
  const activeValues = values ?? {};

  const toggle = (sectionKey: string, option: string) => {
    if (!onChange) return;
    const current = activeValues[sectionKey] ?? [];
    const next = current.includes(option) ? current.filter(x => x !== option) : [...current, option];
    onChange({ ...activeValues, [sectionKey]: next });
  };

  const totalSelected = Object.values(activeValues).reduce((sum, arr) => sum + (arr?.length ?? 0), 0);

  const clearAll = () => {
    if (!onChange) { onClose(); return; }
    const cleared: FilterValues = {};
    activeSections.forEach(s => { cleared[s.key] = []; });
    onChange(cleared);
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-gray-900/20" onClick={onClose} />
      <div className="relative bg-white w-96 h-full shadow-lg overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {totalSelected > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">{totalSelected}</span>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeSections.map(section => (
            <div key={section.key}>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{section.label}</h3>
              <div className="space-y-2">
                {section.options.map(option => {
                  const checked = (activeValues[section.key] ?? []).includes(option);
                  return (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(section.key, option)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 shrink-0">
          <div className="flex gap-3">
            <button onClick={clearAll} className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">Clear All</button>
            <button onClick={onClose} className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  );
}
