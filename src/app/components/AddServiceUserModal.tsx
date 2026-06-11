import { useState, useRef, useCallback } from 'react';
import { X, User, Phone, Mail, MapPin, Heart, Stethoscope, Briefcase, Users, DollarSign, CheckCircle2, ChevronRight, ChevronLeft, Plus, Trash2, Shield, Home, UserCheck, Camera, Upload } from 'lucide-react';

interface AddServiceUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'personal' | 'contacts' | 'care' | 'medical' | 'visitors';

const STEPS: { key: Step; label: string; icon: React.ReactNode }[] = [
  { key: 'personal',  label: 'Personal Details',      icon: <User size={15} /> },
  { key: 'contacts',  label: 'Contacts & Support',    icon: <Phone size={15} /> },
  { key: 'care',      label: 'Care & Funding',        icon: <Briefcase size={15} /> },
  { key: 'medical',   label: 'Medical History',       icon: <Stethoscope size={15} /> },
  { key: 'visitors',  label: 'Visitors & Notes',      icon: <Users size={15} /> },
];

const INPUT  = "w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors";
const LABEL  = "block text-xs text-gray-500 mb-1";

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-sm text-gray-800 mb-4">
        <span className="text-gray-400">{icon}</span>{title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, className = '', children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className={LABEL}>{label}</label>
      {children}
    </div>
  );
}

export function AddServiceUserModal({ isOpen, onClose }: AddServiceUserModalProps) {
  const [step, setStep] = useState<Step>('personal');

  /* ── Photo ── */
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

  /* ── Personal ── */
  const [firstName,   setFirstName]   = useState('');
  const [lastName,    setLastName]    = useState('');
  const [dob,         setDob]         = useState('');
  const [gender,      setGender]      = useState('');
  const [nationality, setNationality] = useState('');
  const [nhsNumber,   setNhsNumber]   = useState('');
  const [phone,       setPhone]       = useState('');
  const [email,       setEmail]       = useState('');
  const [address,     setAddress]     = useState('');

  /* ── Next of Kin ── */
  const [nokName,     setNokName]     = useState('');
  const [nokRelation, setNokRelation] = useState('');
  const [nokPhone,    setNokPhone]    = useState('');
  const [nokEmail,    setNokEmail]    = useState('');
  const [nokAddress,  setNokAddress]  = useState('');

  /* ── GP ── */
  const [gpName,     setGpName]     = useState('');
  const [gpPractice, setGpPractice] = useState('');
  const [gpPhone,    setGpPhone]    = useState('');
  const [gpEmail,    setGpEmail]    = useState('');
  const [gpAddress,  setGpAddress]  = useState('');

  /* ── Personal Carer ── */
  const [carerName,    setCarerName]    = useState('');
  const [carerAgency,  setCarerAgency]  = useState('');
  const [carerPhone,   setCarerPhone]   = useState('');
  const [carerEmail,   setCarerEmail]   = useState('');
  const [carerAddress, setCarerAddress] = useState('');

  /* ── Care Setup ── */
  const [location,    setLocation]    = useState('');
  const [careManager, setCareManager] = useState('');
  const [keyWorker,   setKeyWorker]   = useState('');
  const [riskLevel,   setRiskLevel]   = useState('green');
  const [admissionDate, setAdmissionDate] = useState('');

  /* ── Funding ── */
  const [funderType,   setFunderType]   = useState('');
  const [funderName,   setFunderName]   = useState('');
  const [funderRef,    setFunderRef]    = useState('');
  const [weeklyRate,   setWeeklyRate]   = useState('');
  const [socialWorker, setSocialWorker] = useState('');

  /* ── Medical History ── */
  const [conditions,   setConditions]   = useState('');
  const [allergies,    setAllergies]    = useState('');
  const [bloodType,    setBloodType]    = useState('');
  const [dnacpr,       setDnacpr]       = useState('not-applicable');
  const [currentMeds,  setCurrentMeds]  = useState('');
  const [hospitalHistory, setHospitalHistory] = useState([
    { id: 1, hospital: '', reason: '', date: '', treatedBy: '' }
  ]);

  const addHospital = () =>
    setHospitalHistory(h => [...h, { id: Date.now(), hospital: '', reason: '', date: '', treatedBy: '' }]);
  const removeHospital = (id: number) =>
    setHospitalHistory(h => h.filter(x => x.id !== id));
  const updateHospital = (id: number, field: string, value: string) =>
    setHospitalHistory(h => h.map(x => x.id === id ? { ...x, [field]: value } : x));

  /* ── Visitors ── */
  const [visitors, setVisitors] = useState([{ id: 1, name: '', relation: '', phone: '' }]);
  const addVisitor = () =>
    setVisitors(v => [...v, { id: Date.now(), name: '', relation: '', phone: '' }]);
  const removeVisitor = (id: number) =>
    setVisitors(v => v.filter(x => x.id !== id));
  const updateVisitor = (id: number, field: string, value: string) =>
    setVisitors(v => v.map(x => x.id === id ? { ...x, [field]: value } : x));

  const [additionalNotes, setAdditionalNotes] = useState('');

  const stepIndex = STEPS.findIndex(s => s.key === step);
  const isFirst = stepIndex === 0;
  const isLast  = stepIndex === STEPS.length - 1;

  const handleClose = () => {
    setStep('personal');
    setPhotoUrl(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden max-h-[92vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">Add New Service User</h2>
              <p className="text-xs text-gray-500">Step {stepIndex + 1} of {STEPS.length} — {STEPS[stepIndex].label}</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center px-6 py-3 border-b border-gray-100 bg-white shrink-0 gap-1 overflow-x-auto">
          {STEPS.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setStep(s.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors whitespace-nowrap ${
                step === s.key
                  ? 'bg-emerald-50 text-emerald-700'
                  : i < stepIndex
                  ? 'text-emerald-600 hover:bg-gray-50'
                  : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              {i < stepIndex ? <CheckCircle2 size={13} className="text-emerald-500" /> : s.icon}
              <span className="hidden sm:inline">{s.label}</span>
              {i < STEPS.length - 1 && <ChevronRight size={12} className="text-gray-300 ml-1" />}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ── Step 1: Personal Details ── */}
          {step === 'personal' && (
            <>
              <Section icon={<Camera size={15} />} title="Profile Photo">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFilePick} />
                <div className="flex items-center gap-6">
                  {/* Avatar preview */}
                  <div className="relative shrink-0">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-24 h-24 rounded-full overflow-hidden bg-emerald-100 border-2 border-dashed border-emerald-300 flex items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors"
                    >
                      {photoUrl
                        ? <img src={photoUrl} alt="Service user" className="w-full h-full object-cover" />
                        : <User size={32} className="text-emerald-300" />
                      }
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-700 transition-colors"
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
                      isDragOver ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                    }`}
                  >
                    <Upload size={20} className={`mx-auto mb-2 ${isDragOver ? 'text-emerald-500' : 'text-gray-400'}`} />
                    <p className="text-sm text-gray-600">
                      <span className="text-emerald-600 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — max 5 MB</p>
                  </div>

                  {photoUrl && (
                    <button
                      type="button"
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
                  <Field label="Date of Birth *">
                    <input type="date" className={INPUT} value={dob} onChange={e => setDob(e.target.value)} />
                  </Field>
                  <Field label="Gender">
                    <select className={INPUT} value={gender} onChange={e => setGender(e.target.value)}>
                      <option value="">Select...</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </select>
                  </Field>
                  <Field label="Nationality">
                    <input type="text" className={INPUT} placeholder="e.g. British" value={nationality} onChange={e => setNationality(e.target.value)} />
                  </Field>
                  <Field label="NHS Number">
                    <input type="text" className={INPUT} placeholder="000 000 0000" value={nhsNumber} onChange={e => setNhsNumber(e.target.value)} />
                  </Field>
                </div>
              </Section>

              <hr className="border-gray-100" />

              <Section icon={<Phone size={15} />} title="Contact Details">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Phone">
                    <input type="tel" className={INPUT} placeholder="+44 7700 900000" value={phone} onChange={e => setPhone(e.target.value)} />
                  </Field>
                  <Field label="Email">
                    <input type="email" className={INPUT} placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </Field>
                  <Field label="Home Address" className="col-span-2">
                    <textarea rows={2} className={INPUT + ' resize-none'} placeholder="Street, City, Postcode" value={address} onChange={e => setAddress(e.target.value)} />
                  </Field>
                </div>
              </Section>
            </>
          )}

          {/* ── Step 2: Contacts & Support ── */}
          {step === 'contacts' && (
            <>
              <Section icon={<Heart size={15} />} title="Next of Kin">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Full Name *">
                    <input type="text" className={INPUT} placeholder="Jane Doe" value={nokName} onChange={e => setNokName(e.target.value)} />
                  </Field>
                  <Field label="Relationship *">
                    <input type="text" className={INPUT} placeholder="e.g. Mother, Brother" value={nokRelation} onChange={e => setNokRelation(e.target.value)} />
                  </Field>
                  <Field label="Phone *">
                    <input type="tel" className={INPUT} placeholder="+44 7700 900000" value={nokPhone} onChange={e => setNokPhone(e.target.value)} />
                  </Field>
                  <Field label="Email">
                    <input type="email" className={INPUT} placeholder="nok@example.com" value={nokEmail} onChange={e => setNokEmail(e.target.value)} />
                  </Field>
                  <Field label="Address" className="col-span-2">
                    <textarea rows={2} className={INPUT + ' resize-none'} placeholder="Street, City, Postcode" value={nokAddress} onChange={e => setNokAddress(e.target.value)} />
                  </Field>
                </div>
              </Section>

              <hr className="border-gray-100" />

              <Section icon={<Stethoscope size={15} />} title="GP / Medical Professional">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="GP / Doctor Name">
                    <input type="text" className={INPUT} placeholder="Dr. A. Smith" value={gpName} onChange={e => setGpName(e.target.value)} />
                  </Field>
                  <Field label="Practice / Hospital">
                    <input type="text" className={INPUT} placeholder="Riverside Medical Centre" value={gpPractice} onChange={e => setGpPractice(e.target.value)} />
                  </Field>
                  <Field label="Phone">
                    <input type="tel" className={INPUT} placeholder="0117 000 0000" value={gpPhone} onChange={e => setGpPhone(e.target.value)} />
                  </Field>
                  <Field label="Email">
                    <input type="email" className={INPUT} placeholder="gp@nhs.net" value={gpEmail} onChange={e => setGpEmail(e.target.value)} />
                  </Field>
                  <Field label="Practice Address" className="col-span-2">
                    <textarea rows={2} className={INPUT + ' resize-none'} placeholder="Street, City, Postcode" value={gpAddress} onChange={e => setGpAddress(e.target.value)} />
                  </Field>
                </div>
              </Section>

              <hr className="border-gray-100" />

              <Section icon={<UserCheck size={15} />} title="Personal Carer">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Carer Name">
                    <input type="text" className={INPUT} placeholder="Full name" value={carerName} onChange={e => setCarerName(e.target.value)} />
                  </Field>
                  <Field label="Agency / Organisation">
                    <input type="text" className={INPUT} placeholder="e.g. MpoweredCare, Agency name" value={carerAgency} onChange={e => setCarerAgency(e.target.value)} />
                  </Field>
                  <Field label="Phone">
                    <input type="tel" className={INPUT} placeholder="+44 7700 900000" value={carerPhone} onChange={e => setCarerPhone(e.target.value)} />
                  </Field>
                  <Field label="Email">
                    <input type="email" className={INPUT} placeholder="carer@example.com" value={carerEmail} onChange={e => setCarerEmail(e.target.value)} />
                  </Field>
                  <Field label="Address" className="col-span-2">
                    <textarea rows={2} className={INPUT + ' resize-none'} placeholder="Street, City, Postcode" value={carerAddress} onChange={e => setCarerAddress(e.target.value)} />
                  </Field>
                </div>
              </Section>
            </>
          )}

          {/* ── Step 3: Care & Funding ── */}
          {step === 'care' && (
            <>
              <Section icon={<Home size={15} />} title="Care Placement">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Location *">
                    <select className={INPUT} value={location} onChange={e => setLocation(e.target.value)}>
                      <option value="">Select location...</option>
                      <option>Riverside House</option>
                      <option>Oak Tree Lodge</option>
                      <option>Meadow View</option>
                    </select>
                  </Field>
                  <Field label="Admission Date">
                    <input type="date" className={INPUT} value={admissionDate} onChange={e => setAdmissionDate(e.target.value)} />
                  </Field>
                  <Field label="Care Manager *">
                    <select className={INPUT} value={careManager} onChange={e => setCareManager(e.target.value)}>
                      <option value="">Select...</option>
                      <option>Dr. Emily Carter</option>
                      <option>Sarah Williams</option>
                      <option>James Mitchell</option>
                    </select>
                  </Field>
                  <Field label="Key Worker">
                    <select className={INPUT} value={keyWorker} onChange={e => setKeyWorker(e.target.value)}>
                      <option value="">Select...</option>
                      <option>Mary Thompson</option>
                      <option>John Davies</option>
                      <option>Lisa Anderson</option>
                    </select>
                  </Field>
                  <Field label="Social Worker">
                    <input type="text" className={INPUT} placeholder="Social worker name" value={socialWorker} onChange={e => setSocialWorker(e.target.value)} />
                  </Field>
                  <Field label="Risk Level *">
                    <select className={INPUT} value={riskLevel} onChange={e => setRiskLevel(e.target.value)}>
                      <option value="green">Low Risk</option>
                      <option value="amber">Medium Risk</option>
                      <option value="red">High Risk</option>
                    </select>
                  </Field>
                </div>
              </Section>

              <hr className="border-gray-100" />

              <Section icon={<DollarSign size={15} />} title="Funding & Finances">
                <p className="text-xs text-gray-500 mb-4">Record who is funding the care — this will appear in the Finances section of the service user profile.</p>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Funding Type *" className="col-span-2">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'local-authority', label: 'Local Authority' },
                        { value: 'nhs',             label: 'NHS / CHC' },
                        { value: 'private-family',  label: 'Private / Family' },
                      ].map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFunderType(opt.value)}
                          className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl border text-xs transition-colors ${funderType === opt.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Funder Name">
                    <input type="text" className={INPUT} placeholder="e.g. Bristol City Council" value={funderName} onChange={e => setFunderName(e.target.value)} />
                  </Field>
                  <Field label="Reference / Contract No.">
                    <input type="text" className={INPUT} placeholder="e.g. BCC-2026-0042" value={funderRef} onChange={e => setFunderRef(e.target.value)} />
                  </Field>
                  <Field label="Weekly Rate (£)">
                    <input type="number" className={INPUT} placeholder="e.g. 1250.00" value={weeklyRate} onChange={e => setWeeklyRate(e.target.value)} />
                  </Field>
                </div>
              </Section>
            </>
          )}

          {/* ── Step 4: Medical History ── */}
          {step === 'medical' && (
            <>
              <Section icon={<Shield size={15} />} title="Conditions & Allergies">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Diagnoses / Conditions" className="col-span-2">
                    <input type="text" className={INPUT} placeholder="e.g. Autism, ADHD, Anxiety (comma-separated)" value={conditions} onChange={e => setConditions(e.target.value)} />
                  </Field>
                  <Field label="Allergies" className="col-span-2">
                    <input type="text" className={INPUT} placeholder="e.g. Peanuts, Penicillin (comma-separated)" value={allergies} onChange={e => setAllergies(e.target.value)} />
                  </Field>
                  <Field label="Blood Type">
                    <select className={INPUT} value={bloodType} onChange={e => setBloodType(e.target.value)}>
                      <option value="">Unknown</option>
                      {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="DNACPR Status">
                    <select className={INPUT} value={dnacpr} onChange={e => setDnacpr(e.target.value)}>
                      <option value="not-applicable">Not Applicable</option>
                      <option value="in-place">In Place</option>
                      <option value="not-in-place">Not in Place</option>
                    </select>
                  </Field>
                  <Field label="Current Medications" className="col-span-2">
                    <textarea rows={3} className={INPUT + ' resize-none'} placeholder="List medications and dosages, one per line" value={currentMeds} onChange={e => setCurrentMeds(e.target.value)} />
                  </Field>
                </div>
              </Section>

              <hr className="border-gray-100" />

              <Section icon={<Stethoscope size={15} />} title="Hospital & Treatment History">
                <p className="text-xs text-gray-500 mb-4">Record past hospital visits, treatments, and the medical professionals involved.</p>
                <div className="space-y-3">
                  {hospitalHistory.map((h, i) => (
                    <div key={h.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Visit {i + 1}</span>
                        {hospitalHistory.length > 1 && (
                          <button type="button" onClick={() => removeHospital(h.id)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Hospital / Clinic">
                          <input type="text" className={INPUT} placeholder="Hospital name" value={h.hospital} onChange={e => updateHospital(h.id, 'hospital', e.target.value)} />
                        </Field>
                        <Field label="Date">
                          <input type="date" className={INPUT} value={h.date} onChange={e => updateHospital(h.id, 'date', e.target.value)} />
                        </Field>
                        <Field label="Reason / Condition Treated" className="col-span-2">
                          <input type="text" className={INPUT} placeholder="e.g. Fractured wrist, Anxiety assessment" value={h.reason} onChange={e => updateHospital(h.id, 'reason', e.target.value)} />
                        </Field>
                        <Field label="Treated By (Doctor / Specialist)" className="col-span-2">
                          <input type="text" className={INPUT} placeholder="e.g. Dr. James Wright, Consultant Psychiatrist" value={h.treatedBy} onChange={e => updateHospital(h.id, 'treatedBy', e.target.value)} />
                        </Field>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addHospital}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-xs text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/30 transition-colors"
                  >
                    <Plus size={14} /> Add Another Visit
                  </button>
                </div>
              </Section>
            </>
          )}

          {/* ── Step 5: Visitors & Notes ── */}
          {step === 'visitors' && (
            <>
              <Section icon={<Users size={15} />} title="Approved Visitors">
                <p className="text-xs text-gray-500 mb-4">List all persons approved to visit this service user. These will appear on the profile for staff reference.</p>
                <div className="space-y-3">
                  {visitors.map((v, i) => (
                    <div key={v.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Visitor {i + 1}</span>
                        {visitors.length > 1 && (
                          <button type="button" onClick={() => removeVisitor(v.id)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <Field label="Full Name">
                          <input type="text" className={INPUT} placeholder="Visitor name" value={v.name} onChange={e => updateVisitor(v.id, 'name', e.target.value)} />
                        </Field>
                        <Field label="Relationship">
                          <input type="text" className={INPUT} placeholder="e.g. Aunt" value={v.relation} onChange={e => updateVisitor(v.id, 'relation', e.target.value)} />
                        </Field>
                        <Field label="Phone">
                          <input type="tel" className={INPUT} placeholder="07700 000000" value={v.phone} onChange={e => updateVisitor(v.id, 'phone', e.target.value)} />
                        </Field>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addVisitor}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-xs text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/30 transition-colors"
                  >
                    <Plus size={14} /> Add Visitor
                  </button>
                </div>
              </Section>

              <hr className="border-gray-100" />

              <Section icon={<Briefcase size={15} />} title="Additional Notes">
                <textarea
                  rows={5}
                  className={INPUT + ' resize-none'}
                  placeholder="Any additional background, preferences, or information relevant to the service user's care..."
                  value={additionalNotes}
                  onChange={e => setAdditionalNotes(e.target.value)}
                />
              </Section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => !isFirst && setStep(STEPS[stepIndex - 1].key)}
            disabled={isFirst}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 border border-gray-200 bg-white hover:bg-gray-50'}`}
          >
            <ChevronLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-2">
            <button type="button" onClick={handleClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            {isLast ? (
              <button type="button" onClick={handleClose} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                <CheckCircle2 size={16} /> Create Profile
              </button>
            ) : (
              <button type="button" onClick={() => setStep(STEPS[stepIndex + 1].key)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
