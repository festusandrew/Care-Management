import { useState } from 'react';
import { X, Plus, Trash2, Pill, Save, AlertCircle } from 'lucide-react';

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

type MedEntry = {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  prescribedBy: string;
  prescriptionNumber: string;
  prescriptionDate: string;
  startDate: string;
  expiryDate: string;
  endDate: string;
  pharmacyName: string;
  sideEffects: string;
  specialInstructions: string;
  notes: string;
};

const blank = (): MedEntry => ({
  id: Date.now() + Math.random(),
  name: '', dosage: '', frequency: '', route: '',
  prescribedBy: '', prescriptionNumber: '',
  prescriptionDate: '', startDate: '', expiryDate: '', endDate: '',
  pharmacyName: '', sideEffects: '', specialInstructions: '', notes: '',
});

const INPUT  = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white";
const LABEL  = "block text-xs text-gray-500 mb-1";

function MedCard({
  entry, index, total,
  onChange, onRemove,
}: {
  entry: MedEntry; index: number; total: number;
  onChange: (id: number, field: keyof MedEntry, value: string) => void;
  onRemove: (id: number) => void;
}) {
  const set = (field: keyof MedEntry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    onChange(entry.id, field, e.target.value);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-3 bg-blue-50 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs shrink-0">
            {index + 1}
          </div>
          <span className="text-sm text-blue-900">
            {entry.name ? entry.name : `Medication ${index + 1}`}
          </span>
        </div>
        {total > 1 && (
          <button
            type="button"
            onClick={() => onRemove(entry.id)}
            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <div className="p-5 space-y-5 bg-white">
        {/* Medication Details */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Medication Details</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <label className={LABEL}>Medication Name *</label>
              <input type="text" className={INPUT} placeholder="e.g. Sertraline" value={entry.name} onChange={set('name')} />
            </div>
            <div>
              <label className={LABEL}>Dosage *</label>
              <input type="text" className={INPUT} placeholder="e.g. 50mg" value={entry.dosage} onChange={set('dosage')} />
            </div>
            <div>
              <label className={LABEL}>Frequency *</label>
              <select className={INPUT} value={entry.frequency} onChange={set('frequency')}>
                <option value="">Select...</option>
                <option>Once daily (morning)</option>
                <option>Once daily (evening)</option>
                <option>Twice daily</option>
                <option>Three times daily</option>
                <option>Four times daily</option>
                <option>As needed (PRN)</option>
                <option>Weekly</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={LABEL}>Route *</label>
              <select className={INPUT} value={entry.route} onChange={set('route')}>
                <option value="">Select...</option>
                <option>Oral</option>
                <option>Sublingual</option>
                <option>Topical</option>
                <option>Inhalation</option>
                <option>Injection</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prescription Information */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Prescription Information</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL}>Prescribed By *</label>
              <select className={INPUT} value={entry.prescribedBy} onChange={set('prescribedBy')}>
                <option value="">Select prescriber...</option>
                <option>Dr. Emily Carter</option>
                <option>Sarah Williams</option>
                <option>James Mitchell</option>
                <option>External Doctor</option>
              </select>
            </div>
            <div>
              <label className={LABEL}>Prescription Number</label>
              <input type="text" className={INPUT} placeholder="e.g. RX-123456" value={entry.prescriptionNumber} onChange={set('prescriptionNumber')} />
            </div>
            <div>
              <label className={LABEL}>Prescription Date *</label>
              <input type="date" className={INPUT} value={entry.prescriptionDate} onChange={set('prescriptionDate')} />
            </div>
            <div>
              <label className={LABEL}>Prescription Expiry Date</label>
              <input type="date" className={INPUT} min={entry.prescriptionDate} value={entry.expiryDate} onChange={set('expiryDate')} />
            </div>
            <div>
              <label className={LABEL}>Start Date *</label>
              <input type="date" className={INPUT} value={entry.startDate} onChange={set('startDate')} />
            </div>
            <div>
              <label className={LABEL}>End Date (if applicable)</label>
              <input type="date" className={INPUT} min={entry.startDate} value={entry.endDate} onChange={set('endDate')} />
            </div>
            <div className="col-span-2">
              <label className={LABEL}>Pharmacy</label>
              <input type="text" className={INPUT} placeholder="e.g. Boots Pharmacy, Bristol" value={entry.pharmacyName} onChange={set('pharmacyName')} />
            </div>
          </div>
        </div>

        {/* Additional */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Additional Information</p>
          <div className="space-y-3">
            <div>
              <label className={LABEL}>Known Side Effects</label>
              <input type="text" className={INPUT} placeholder="e.g. Drowsiness, nausea" value={entry.sideEffects} onChange={set('sideEffects')} />
            </div>
            <div>
              <label className={LABEL}>Special Instructions</label>
              <textarea className={INPUT + ' resize-none'} rows={2} placeholder="e.g. Take with food, avoid dairy" value={entry.specialInstructions} onChange={set('specialInstructions')} />
            </div>
            <div>
              <label className={LABEL}>Notes</label>
              <textarea className={INPUT + ' resize-none'} rows={2} placeholder="Any other relevant information" value={entry.notes} onChange={set('notes')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddMedicationModal({ isOpen, onClose, userName }: AddMedicationModalProps) {
  const [entries, setEntries] = useState<MedEntry[]>([blank()]);

  const addEntry = () => setEntries(es => [...es, blank()]);

  const removeEntry = (id: number) => setEntries(es => es.filter(e => e.id !== id));

  const updateEntry = (id: number, field: keyof MedEntry, value: string) =>
    setEntries(es => es.map(e => e.id === id ? { ...e, [field]: value } : e));

  const handleClose = () => {
    setEntries([blank()]);
    onClose();
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    console.log('Medications submitted:', entries);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[92vh] mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <Pill size={17} className="text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base text-gray-900">Add Medication</h2>
            <p className="text-xs text-gray-500 truncate">{userName}</p>
          </div>
          <button onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Scrollable body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

            {entries.length > 1 && (
              <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5">
                <AlertCircle size={13} className="shrink-0" />
                Adding {entries.length} medications for {userName}. Each will be saved separately.
              </div>
            )}

            {entries.map((entry, i) => (
              <MedCard
                key={entry.id}
                entry={entry}
                index={i}
                total={entries.length}
                onChange={updateEntry}
                onRemove={removeEntry}
              />
            ))}

            {/* Add another */}
            <button
              type="button"
              onClick={addEntry}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/30 transition-colors"
            >
              <Plus size={16} /> Add Another Medication
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
            <span className="text-xs text-gray-400">
              {entries.length} medication{entries.length !== 1 ? 's' : ''} to add
            </span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={handleClose} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Save size={14} /> Save {entries.length > 1 ? `${entries.length} Medications` : 'Medication'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
