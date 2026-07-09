import { useState, useRef, useCallback } from 'react';
import { X, User, Mail, Phone, MapPin, Briefcase, Clock, CalendarDays, CheckCircle2, Shield, Plus, Trash2, AlertCircle, ChevronRight, ChevronLeft, Camera, Upload } from 'lucide-react';
import { api } from '../services/api';

interface AddStaffMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newStaff: any) => void;
}

type Step = 'personal' | 'employment' | 'compliance';

const STEPS: { key: Step; label: string; icon: React.ReactNode }[] = [
  { key: 'personal', label: 'Personal Details', icon: <User size={16} /> },
  { key: 'employment', label: 'Employment', icon: <Briefcase size={16} /> },
  { key: 'compliance', label: 'Qualifications & Compliance', icon: <Shield size={16} /> },
];

const INPUT = "w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors";
const ICON_INPUT = "w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors";
const LABEL = "block text-sm font-medium text-gray-700 mb-1";

export function AddStaffMemberModal({ isOpen, onClose, onSuccess }: AddStaffMemberModalProps) {
  const [step, setStep] = useState<Step>('personal');

  // Photo
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => setPhotoUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handlePhotoFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handlePhotoFile(file);
  };

  // Personal
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('');

  // Employment
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [contractType, setContractType] = useState('');
  const [contractedHours, setContractedHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [lineManager, setLineManager] = useState('');
  const [payrollNumber, setPayrollNumber] = useState('');
  const [nextAppraisal, setNextAppraisal] = useState('');
  const [employeeStatus, setEmployeeStatus] = useState('Active');
  const [rateType, setRateType] = useState<'hourly' | 'monthly'>('hourly');
  const [rateAmount, setRateAmount] = useState('');

  // Compliance
  const [qualifications, setQualifications] = useState([
    { id: 1, name: '', issueDate: '', expiryDate: '', verified: false },
  ]);

  const addQualification = () =>
    setQualifications(q => [...q, { id: Date.now(), name: '', issueDate: '', expiryDate: '', verified: false }]);

  const removeQualification = (id: number) =>
    setQualifications(q => q.filter(x => x.id !== id));

  const updateQualification = (id: number, field: string, value: string | boolean) =>
    setQualifications(q => q.map(x => x.id === id ? { ...x, [field]: value } : x));

  const stepIndex = STEPS.findIndex(s => s.key === step);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;

  const handleClose = () => {
    setStep('personal');
    setPhotoUrl(null);
    setRateType('hourly');
    setRateAmount('');
    onClose();
  };

  const handleCreate = async () => {
    const newStaff = {
      employeeId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: `${firstName} ${lastName}`.trim() || 'Anonymous Staff',
      role: role || 'Support Worker',
      status: employeeStatus || 'Active',
      email: email || 'staff@mpoweredcare.com',
      phone: phone || '+44 7700 900000',
      location: location || 'Main House',
      avatarUrl: photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60',
      nextShift: 'TBD',
      qualifications: qualifications.map(q => q.name).filter(Boolean),
      rateType,
      rateAmount: rateAmount ? parseFloat(rateAmount) : undefined,
    };
    try {
      const created = await api.addStaffMember(newStaff);
      if (onSuccess) onSuccess(created);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden max-h-[92vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Add Staff Member</h2>
              <p className="text-xs text-gray-500">Complete all sections to create the profile</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center px-6 py-3 border-b border-gray-100 bg-white shrink-0 gap-1">
          {STEPS.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setStep(s.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                step === s.key
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : i < stepIndex
                  ? 'text-green-600 hover:bg-gray-50'
                  : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              {i < stepIndex ? <CheckCircle2 size={15} className="text-green-500" /> : s.icon}
              <span className="hidden sm:inline">{s.label}</span>
              {i < STEPS.length - 1 && <ChevronRight size={14} className="text-gray-300 ml-1" />}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ── Step 1: Personal Details ── */}
          {step === 'personal' && (
            <>
              {/* Photo upload */}
              <Section icon={<Camera size={15} />} title="Profile Photo">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFilePick}
                />
                <div className="flex items-center gap-6">
                  {/* Avatar preview */}
                  <div className="relative shrink-0">
                    <div
                      className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {photoUrl ? (
                        <img src={photoUrl} alt="Staff photo" className="w-full h-full object-cover" />
                      ) : (
                        <User size={32} className="text-gray-300" />
                      )}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors"
                    >
                      <Camera size={14} />
                    </button>
                  </div>

                  {/* Drop zone */}
                  <div
                    onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex-1 border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
                      isDragOver
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <Upload size={20} className={`mx-auto mb-2 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
                    <p className="text-sm text-gray-600">
                      <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — max 5 MB</p>
                  </div>

                  {/* Remove button */}
                  {photoUrl && (
                    <button
                      onClick={() => { setPhotoUrl(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors shrink-0"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </Section>

              <hr className="border-gray-100" />

              <Section icon={<User size={15} />} title="Basic Information">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name *">
                    <input type="text" className={INPUT} placeholder="Jane" value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </Field>
                  <Field label="Last Name *">
                    <input type="text" className={INPUT} placeholder="Doe" value={lastName} onChange={e => setLastName(e.target.value)} />
                  </Field>
                  <Field label="Date of Birth">
                    <input type="date" className={INPUT} value={dob} onChange={e => setDob(e.target.value)} />
                  </Field>
                  <Field label="Gender">
                    <select className={INPUT}>
                      <option value="">Select...</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </select>
                  </Field>
                  <Field label="Nationality" className="col-span-2">
                    <input type="text" className={INPUT} placeholder="e.g. British, Nigerian, Indian" />
                  </Field>
                </div>
              </Section>

              <hr className="border-gray-100" />

              <Section icon={<Mail size={15} />} title="Contact Details">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Email Address *">
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" className={ICON_INPUT} placeholder="name@mpoweredcare.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                  </Field>
                  <Field label="Phone Number *">
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="tel" className={ICON_INPUT} placeholder="+44 7700 900000" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                  </Field>
                  <Field label="Home Address" className="col-span-2">
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3 top-3 text-gray-400" />
                      <textarea rows={2} className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none" placeholder="123 Example Street, City, Postcode" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                  </Field>
                </div>
              </Section>

              <hr className="border-gray-100" />

              <Section icon={<AlertCircle size={15} />} title="Emergency Contact">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Full Name">
                    <input type="text" className={INPUT} placeholder="Contact name" value={emergencyName} onChange={e => setEmergencyName(e.target.value)} />
                  </Field>
                  <Field label="Relationship">
                    <input type="text" className={INPUT} placeholder="e.g. Spouse, Parent" value={emergencyRelation} onChange={e => setEmergencyRelation(e.target.value)} />
                  </Field>
                  <Field label="Phone Number" className="col-span-2">
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="tel" className={ICON_INPUT} placeholder="+44 7700 900000" value={emergencyPhone} onChange={e => setEmergencyPhone(e.target.value)} />
                    </div>
                  </Field>
                </div>
              </Section>
            </>
          )}

          {/* ── Step 2: Employment ── */}
          {step === 'employment' && (
            <>
              <Section icon={<Briefcase size={15} />} title="Role & Location">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Job Role *">
                    <select className={INPUT} value={role} onChange={e => setRole(e.target.value)}>
                      <option value="">Select a role...</option>
                      <option>Care Manager</option>
                      <option>Senior Support Worker</option>
                      <option>Support Worker</option>
                      <option>Nurse</option>
                      <option>Activities Coordinator</option>
                      <option>Team Leader</option>
                    </select>
                  </Field>
                  <Field label="Primary Location *">
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select className={ICON_INPUT} value={location} onChange={e => setLocation(e.target.value)}>
                        <option value="">Select location...</option>
                        <option>Main House</option>
                        <option>Annex Building</option>
                        <option>Riverside House</option>
                      </select>
                    </div>
                  </Field>
                  <Field label="Employment Status">
                    <select className={INPUT} value={employeeStatus} onChange={e => setEmployeeStatus(e.target.value)}>
                      <option>Active</option>
                      <option>On Leave</option>
                      <option>Suspended</option>
                      <option>Probation</option>
                    </select>
                  </Field>
                  <Field label="Line Manager">
                    <input type="text" className={INPUT} placeholder="e.g. Sarah Williams" value={lineManager} onChange={e => setLineManager(e.target.value)} />
                  </Field>
                </div>
              </Section>

              <hr className="border-gray-100" />

              <Section icon={<Clock size={15} />} title="Contract Details">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Contract Type">
                    <select className={INPUT} value={contractType} onChange={e => setContractType(e.target.value)}>
                      <option value="">Select...</option>
                      <option>Full-time Permanent</option>
                      <option>Part-time Permanent</option>
                      <option>Fixed Term</option>
                      <option>Zero Hours</option>
                      <option>Bank / Agency</option>
                    </select>
                  </Field>
                  <Field label="Contracted Hours (Weekly)">
                    <div className="relative">
                      <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="number" className={ICON_INPUT} placeholder="e.g. 37.5" value={contractedHours} onChange={e => setContractedHours(e.target.value)} />
                    </div>
                  </Field>
                  <Field label="Start Date *">
                    <div className="relative">
                      <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="date" className={ICON_INPUT} value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </div>
                  </Field>
                  <Field label="Next Appraisal Date">
                    <div className="relative">
                      <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="date" className={ICON_INPUT} value={nextAppraisal} onChange={e => setNextAppraisal(e.target.value)} />
                    </div>
                  </Field>
                  <Field label="Tax Number (NI Number)">
                    <input type="text" className={INPUT} placeholder="e.g. AB 12 34 56 C" value={payrollNumber} onChange={e => setPayrollNumber(e.target.value)} />
                  </Field>
                  <Field label="Rate Type">
                    <select className={INPUT} value={rateType} onChange={e => setRateType(e.target.value as 'hourly' | 'monthly')}>
                      <option value="hourly">Hourly Rate (£)</option>
                      <option value="monthly">Monthly Salary (£)</option>
                    </select>
                  </Field>
                  <Field label="Rate Amount">
                    <input type="number" step="0.01" className={INPUT} placeholder={rateType === 'hourly' ? "e.g. 13.50" : "e.g. 3000.00"} value={rateAmount} onChange={e => setRateAmount(e.target.value)} />
                  </Field>
                </div>
              </Section>
            </>
          )}

          {/* ── Step 3: Qualifications & Compliance ── */}
          {step === 'compliance' && (
            <>
              <Section icon={<Shield size={15} />} title="Qualifications & Training">
                <p className="text-xs text-gray-500 mb-4">Add all current qualifications, certifications, and mandatory training records.</p>
                <div className="space-y-3">
                  {qualifications.map((q, i) => (
                    <div key={q.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Qualification {i + 1}</span>
                        {qualifications.length > 1 && (
                          <button onClick={() => removeQualification(q.id)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Qualification / Training Name" className="col-span-2">
                          <input type="text" className={INPUT} placeholder="e.g. Care Certificate, First Aid, NVQ Level 3" value={q.name} onChange={e => updateQualification(q.id, 'name', e.target.value)} />
                        </Field>
                        <Field label="Issue Date">
                          <input type="date" className={INPUT} value={q.issueDate} onChange={e => updateQualification(q.id, 'issueDate', e.target.value)} />
                        </Field>
                        <Field label="Expiry Date">
                          <input type="date" className={INPUT} value={q.expiryDate} onChange={e => updateQualification(q.id, 'expiryDate', e.target.value)} />
                        </Field>
                        <div className="col-span-2 flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`verified-${q.id}`}
                            checked={q.verified}
                            onChange={e => updateQualification(q.id, 'verified', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                          />
                          <label htmlFor={`verified-${q.id}`} className="text-sm text-gray-700 cursor-pointer">Mark as verified</label>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addQualification}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/30 transition-colors"
                  >
                    <Plus size={15} />
                    Add Another Qualification
                  </button>
                </div>
              </Section>

              <hr className="border-gray-100" />

              <Section icon={<AlertCircle size={15} />} title="DBS & Right to Work">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="DBS Check Type">
                    <select className={INPUT}>
                      <option value="">Select...</option>
                      <option>Enhanced DBS</option>
                      <option>Standard DBS</option>
                      <option>Basic DBS</option>
                    </select>
                  </Field>
                  <Field label="DBS Issue Date">
                    <input type="date" className={INPUT} />
                  </Field>
                  <Field label="Right to Work Verified">
                    <select className={INPUT}>
                      <option value="">Select...</option>
                      <option>Yes — documents checked</option>
                      <option>Pending verification</option>
                    </select>
                  </Field>
                  <Field label="Visa / Work Permit Expiry">
                    <input type="date" className={INPUT} />
                  </Field>
                </div>
              </Section>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
          <button
            onClick={() => !isFirst && setStep(STEPS[stepIndex - 1].key)}
            disabled={isFirst}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 border border-gray-200 bg-white hover:bg-gray-50'}`}
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <div className="flex items-center gap-2">
            <button onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            {isLast ? (
              <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                <CheckCircle2 size={16} />
                Create Staff Profile
              </button>
            ) : (
              <button onClick={() => setStep(STEPS[stepIndex + 1].key)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Next
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
        <span className="text-gray-400">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className={LABEL}>{label}</label>
      {children}
    </div>
  );
}
