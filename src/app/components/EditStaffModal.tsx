import { useState, useEffect } from 'react';
import { X, User, Save } from 'lucide-react';

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: any;
  onSave?: (updated: any) => void;
}

const INPUT = "w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 transition-colors";
const LABEL = "block text-xs text-gray-500 mb-1 font-medium";

type Tab = 'personal' | 'employment' | 'contract' | 'kin';

export function EditStaffModal({ isOpen, onClose, staff, onSave }: EditStaffModalProps) {
  const [form, setForm] = useState<any>({});
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (staff) {
      setForm({
        employeeId: staff.employeeId || '',
        name: staff.name || '',
        role: staff.role || '',
        status: staff.status || 'Active',
        email: staff.email || '',
        phone: staff.phone || '',
        location: staff.location || '',
        joinDate: staff.joinDate || '',
        avatarUrl: staff.avatarUrl || '',
        lineManager: staff.lineManager || '',
        contractType: staff.contractType || 'Full-time Permanent',
        contractEndDate: staff.contractEndDate || '',
        payrollNumber: staff.payrollNumber || '',
        nextAppraisal: staff.nextAppraisal || '',
        contractedHours: staff.contractedHours ?? 37.5,
        actualHours: staff.actualHours ?? 0,
        complianceRate: staff.complianceRate ?? 100,
        daysEmployed: staff.daysEmployed ?? 0,
        annualLeaveHours: staff.annualLeaveHours ?? 224,
        nextOfKin: staff.nextOfKin || '',
        nextOfKinPhone: staff.nextOfKinPhone || '',
        emergencyContact: staff.emergencyContact || '',
        emergencyPhone: staff.emergencyPhone || '',
        bankReference: staff.bankReference || '',
      });
      setActiveTab('personal');
      setShowErrors(false);
    }
  }, [staff, isOpen]);

  if (!isOpen || !staff) return null;

  const requiredFilled = form.name && form.role && form.email && form.phone && form.location;

  const handleSave = () => {
    if (!requiredFilled) {
      setShowErrors(true);
      return;
    }
    const updated = { ...staff, ...form };
    if (onSave) onSave(updated);
    onClose();
  };

  const set = (patch: any) => setForm((f: any) => ({ ...f, ...patch }));

  const tabs: { key: Tab; label: string }[] = [
    { key: 'personal',   label: 'Personal' },
    { key: 'employment', label: 'Employment' },
    { key: 'contract',   label: 'Contract & Hours' },
    { key: 'kin',        label: 'Next of Kin & Bank' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <User size={17} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-gray-900">Edit Staff Profile</h2>
            <p className="text-xs text-gray-500">{form.name || staff.name} · {form.employeeId || staff.employeeId}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0.5 px-4 pt-3 border-b border-gray-100 shrink-0">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === t.key
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {activeTab === 'personal' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Full Name *</label>
                  <input value={form.name} onChange={e => set({ name: e.target.value })} className={`${INPUT} ${showErrors && !form.name ? 'border-red-400' : ''}`} />
                </div>
                <div>
                  <label className={LABEL}>Status</label>
                  <select value={form.status} onChange={e => set({ status: e.target.value })} className={`${INPUT} bg-white`}>
                    <option>Active</option>
                    <option>On Leave</option>
                    <option>Suspended</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Email *</label>
                  <input type="email" value={form.email} onChange={e => set({ email: e.target.value })} className={`${INPUT} ${showErrors && !form.email ? 'border-red-400' : ''}`} />
                </div>
                <div>
                  <label className={LABEL}>Phone *</label>
                  <input type="tel" value={form.phone} onChange={e => set({ phone: e.target.value })} className={`${INPUT} ${showErrors && !form.phone ? 'border-red-400' : ''}`} />
                </div>
              </div>
              <div>
                <label className={LABEL}>Avatar URL</label>
                <input value={form.avatarUrl} onChange={e => set({ avatarUrl: e.target.value })} className={INPUT} placeholder="https://..." />
              </div>
            </>
          )}

          {activeTab === 'employment' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Employee ID</label>
                  <input value={form.employeeId} onChange={e => set({ employeeId: e.target.value })} className={INPUT} />
                </div>
                <div>
                  <label className={LABEL}>Payroll Number</label>
                  <input value={form.payrollNumber} onChange={e => set({ payrollNumber: e.target.value })} className={INPUT} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Role *</label>
                  <input value={form.role} onChange={e => set({ role: e.target.value })} className={`${INPUT} ${showErrors && !form.role ? 'border-red-400' : ''}`} />
                </div>
                <div>
                  <label className={LABEL}>Primary Location *</label>
                  <input value={form.location} onChange={e => set({ location: e.target.value })} className={`${INPUT} ${showErrors && !form.location ? 'border-red-400' : ''}`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Line Manager</label>
                  <input value={form.lineManager} onChange={e => set({ lineManager: e.target.value })} className={INPUT} />
                </div>
                <div>
                  <label className={LABEL}>Join Date</label>
                  <input value={form.joinDate} onChange={e => set({ joinDate: e.target.value })} placeholder="e.g. 12 Jan 2023" className={INPUT} />
                </div>
              </div>
              <div>
                <label className={LABEL}>Next Appraisal</label>
                <input value={form.nextAppraisal} onChange={e => set({ nextAppraisal: e.target.value })} placeholder="e.g. 12 May 2026" className={INPUT} />
              </div>
            </>
          )}

          {activeTab === 'contract' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Contract Type</label>
                  <select value={form.contractType} onChange={e => set({ contractType: e.target.value })} className={`${INPUT} bg-white`}>
                    <option>Full-time Permanent</option>
                    <option>Part-time Permanent</option>
                    <option>Fixed-term</option>
                    <option>Zero-hours</option>
                    <option>Agency / Locum</option>
                  </select>
                </div>
                <div>
                  <label className={LABEL}>Contract End Date</label>
                  <input value={form.contractEndDate} onChange={e => set({ contractEndDate: e.target.value })} placeholder="e.g. N/A (Permanent) or 12 Dec 2026" className={INPUT} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={LABEL}>Weekly Hours</label>
                  <input type="number" step="0.5" value={form.contractedHours} onChange={e => set({ contractedHours: Number(e.target.value) })} className={INPUT} />
                </div>
                <div>
                  <label className={LABEL}>Actual Hours (this wk)</label>
                  <input type="number" step="0.5" value={form.actualHours} onChange={e => set({ actualHours: Number(e.target.value) })} className={INPUT} />
                </div>
                <div>
                  <label className={LABEL}>Annual Leave (hrs)</label>
                  <input type="number" value={form.annualLeaveHours} onChange={e => set({ annualLeaveHours: Number(e.target.value) })} className={INPUT} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Compliance Rate (%)</label>
                  <input type="number" min="0" max="100" value={form.complianceRate} onChange={e => set({ complianceRate: Number(e.target.value) })} className={INPUT} />
                </div>
                <div>
                  <label className={LABEL}>Days Employed</label>
                  <input type="number" value={form.daysEmployed} onChange={e => set({ daysEmployed: Number(e.target.value) })} className={INPUT} />
                </div>
              </div>
            </>
          )}

          {activeTab === 'kin' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Next of Kin</label>
                  <input value={form.nextOfKin} onChange={e => set({ nextOfKin: e.target.value })} className={INPUT} />
                </div>
                <div>
                  <label className={LABEL}>Next of Kin Phone</label>
                  <input type="tel" value={form.nextOfKinPhone} onChange={e => set({ nextOfKinPhone: e.target.value })} className={INPUT} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Emergency Contact</label>
                  <input value={form.emergencyContact} onChange={e => set({ emergencyContact: e.target.value })} className={INPUT} />
                </div>
                <div>
                  <label className={LABEL}>Emergency Phone</label>
                  <input type="tel" value={form.emergencyPhone} onChange={e => set({ emergencyPhone: e.target.value })} className={INPUT} />
                </div>
              </div>
              <div>
                <label className={LABEL}>Bank Reference</label>
                <input value={form.bankReference} onChange={e => set({ bankReference: e.target.value })} placeholder="•••• 4521" className={`${INPUT} font-mono`} />
              </div>
            </>
          )}

          {showErrors && !requiredFilled && (
            <p className="text-xs text-red-600">Please complete all required (*) fields.</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
