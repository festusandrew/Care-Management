import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { useState, useRef, useEffect } from 'react';
import {
  Plus, Search, Grid3x3, List, ArrowRight, Circle,
  Mail, Phone, MapPin, Calendar, CheckCircle, XCircle,
  AlertCircle, FileText, Download, Upload, Star, MoreVertical,
  Briefcase, Eye, Edit, ChevronDown, X, Save, DollarSign, Send, Ban
} from 'lucide-react';

type Stage = 'applied' | 'screening' | 'interview' | 'offer' | 'onboarding' | 'hired' | 'rejected';
type ViewMode = 'kanban' | 'list';

interface Candidate {
  id: number;
  name: string;
  initials: string;
  color: string;
  role: string;
  stage: Stage;
  appliedDate: string;
  location: string;
  email: string;
  phone: string;
  experience: string;
  rating: number;
  dbsStatus: 'clear' | 'pending' | 'not-started';
  rightToWork: boolean;
  references: number;
  referencesRequired: number;
  tags: string[];
  notes: string;
}

interface JobPosting {
  id: number;
  title: string;
  type: string;
  location: string;
  salary: string;
  applications: number;
  deadline: string;
  status: 'active' | 'paused' | 'closed';
  description: string;
  requirements: string[];
}

const stageConfig: Record<Stage, { label: string; color: string; bg: string; border: string }> = {
  applied:    { label: 'Applied',     color: 'text-gray-600',   bg: 'bg-gray-100',    border: 'border-gray-300' },
  screening:  { label: 'Screening',   color: 'text-blue-600',   bg: 'bg-blue-100',    border: 'border-blue-300' },
  interview:  { label: 'Interview',   color: 'text-purple-600', bg: 'bg-purple-100',  border: 'border-purple-300' },
  offer:      { label: 'Offer Sent',  color: 'text-amber-600',  bg: 'bg-amber-100',   border: 'border-amber-300' },
  onboarding: { label: 'Onboarding',  color: 'text-teal-600',   bg: 'bg-teal-100',    border: 'border-teal-300' },
  hired:      { label: 'Hired',       color: 'text-green-600',  bg: 'bg-green-100',   border: 'border-green-300' },
  rejected:   { label: 'Rejected',    color: 'text-red-600',    bg: 'bg-red-50',      border: 'border-red-200' },
};

const stages: Stage[] = ['applied', 'screening', 'interview', 'offer', 'onboarding', 'hired', 'rejected'];

const initialCandidates: Candidate[] = [
  { id: 1, name: 'Amara Osei', initials: 'AO', color: 'bg-purple-500', role: 'Support Worker', stage: 'onboarding', appliedDate: '2 Jun 2026', location: 'Bristol', email: 'amara.osei@email.com', phone: '07700 900111', experience: '4 years', rating: 5, dbsStatus: 'clear', rightToWork: true, references: 2, referencesRequired: 2, tags: ['Adult Care', 'Learning Disabilities'], notes: 'Strong candidate, references complete.' },
  { id: 2, name: 'James Okafor', initials: 'JO', color: 'bg-blue-500', role: 'Senior Carer', stage: 'interview', appliedDate: '30 May 2026', location: 'Birmingham', email: 'james.okafor@email.com', phone: '07700 900222', experience: '7 years', rating: 4, dbsStatus: 'pending', rightToWork: true, references: 1, referencesRequired: 2, tags: ['Mental Health', 'Challenging Behaviour'], notes: 'Interview scheduled 12 Jun.' },
  { id: 3, name: 'Priya Sharma', initials: 'PS', color: 'bg-rose-500', role: 'Care Coordinator', stage: 'screening', appliedDate: '4 Jun 2026', location: 'Manchester', email: 'priya.sharma@email.com', phone: '07700 900333', experience: '5 years', rating: 4, dbsStatus: 'not-started', rightToWork: true, references: 0, referencesRequired: 2, tags: ['Domiciliary Care', 'NVQ Level 3'], notes: 'Phone screen booked.' },
  { id: 4, name: 'David Nkrumah', initials: 'DN', color: 'bg-amber-500', role: 'Support Worker', stage: 'applied', appliedDate: '7 Jun 2026', location: 'Leeds', email: 'david.n@email.com', phone: '07700 900444', experience: '2 years', rating: 3, dbsStatus: 'not-started', rightToWork: false, references: 0, referencesRequired: 2, tags: ['Children Services'], notes: 'Right to work docs required.' },
  { id: 5, name: 'Sarah Mensah', initials: 'SM', color: 'bg-teal-500', role: 'Night Support Worker', stage: 'offer', appliedDate: '25 May 2026', location: 'Bristol', email: 's.mensah@email.com', phone: '07700 900555', experience: '3 years', rating: 4, dbsStatus: 'clear', rightToWork: true, references: 2, referencesRequired: 2, tags: ['Residential Care', 'Night Shifts'], notes: 'Offer letter sent 6 Jun.' },
  { id: 6, name: 'Tom Adeyemi', initials: 'TA', color: 'bg-indigo-500', role: 'Team Leader', stage: 'hired', appliedDate: '10 May 2026', location: 'Bristol', email: 'tom.a@email.com', phone: '07700 900666', experience: '8 years', rating: 5, dbsStatus: 'clear', rightToWork: true, references: 2, referencesRequired: 2, tags: ['Leadership', 'Complex Needs'], notes: 'Start date: 16 Jun 2026.' },
  { id: 7, name: 'Fatima Al-Hassan', initials: 'FA', color: 'bg-pink-500', role: 'Support Worker', stage: 'screening', appliedDate: '6 Jun 2026', location: 'London', email: 'fatima.h@email.com', phone: '07700 900777', experience: '1 year', rating: 3, dbsStatus: 'not-started', rightToWork: true, references: 0, referencesRequired: 2, tags: ['Entry Level'], notes: '' },
];

const initialJobs: JobPosting[] = [
  { id: 1, title: 'Support Worker', type: 'Full Time', location: 'Bristol, BS1', salary: '£22,000–£25,000', applications: 14, deadline: '20 Jun 2026', status: 'active', description: 'We are looking for a compassionate and dedicated Support Worker to join our team in Bristol. You will provide high-quality care and support to adults with learning disabilities and complex needs.', requirements: ['NVQ Level 2 in Health & Social Care (or working towards)', 'Enhanced DBS (or willingness to obtain)', 'Minimum 1 year experience in a care setting', 'Full UK driving licence preferred', 'Excellent communication skills'] },
  { id: 2, title: 'Senior Carer', type: 'Full Time', location: 'Birmingham, B1', salary: '£26,000–£29,000', applications: 7, deadline: '25 Jun 2026', status: 'active', description: 'An experienced Senior Carer is required to lead a small team providing residential care to adults with mental health needs.', requirements: ['NVQ Level 3 in Health & Social Care', 'Minimum 3 years care experience', 'Previous supervisory experience desirable', 'Enhanced DBS required'] },
  { id: 3, title: 'Care Coordinator', type: 'Full Time', location: 'Manchester, M1', salary: '£28,000–£32,000', applications: 4, deadline: '30 Jun 2026', status: 'active', description: 'The Care Coordinator will oversee care planning and service delivery for a caseload of service users in the Manchester area.', requirements: ['Degree or equivalent in Health & Social Care', 'Experience in coordinating care packages', 'Strong IT and record-keeping skills'] },
  { id: 4, title: 'Night Support Worker', type: 'Part Time', location: 'Bristol, BS2', salary: '£13.50/hr', applications: 9, deadline: '18 Jun 2026', status: 'active', description: 'Part-time night support role working with adults in residential settings. Shifts are 10pm–8am.', requirements: ['Previous night-shift experience preferred', 'Ability to work independently', 'Enhanced DBS required'] },
  { id: 5, title: 'Team Leader', type: 'Full Time', location: 'Bristol, BS1', salary: '£32,000–£36,000', applications: 3, deadline: '15 Jun 2026', status: 'closed', description: 'Team Leader position to manage a team of support workers across two residential homes.', requirements: ['NVQ Level 4/5 or equivalent', 'Proven leadership in a care environment', 'Knowledge of CQC standards'] },
];

const onboardingTasks = [
  { id: 1, label: 'Offer Letter Signed', done: true },
  { id: 2, label: 'DBS Application Submitted', done: true },
  { id: 3, label: 'Right to Work Verified', done: true },
  { id: 4, label: 'References Received (2/2)', done: true },
  { id: 5, label: 'Contract Signed', done: false },
  { id: 6, label: 'Mandatory Training Assigned', done: false },
  { id: 7, label: 'IT & System Access Setup', done: false },
  { id: 8, label: 'Induction Day Scheduled', done: false },
];

function DbsBadge({ status }: { status: Candidate['dbsStatus'] }) {
  if (status === 'clear') return <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">DBS Clear</span>;
  if (status === 'pending') return <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">DBS Pending</span>;
  return <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">DBS Not Started</span>;
}

function DbsBadgeLarge({ status }: { status: Candidate['dbsStatus'] }) {
  if (status === 'clear') return <div className="flex items-center gap-2 text-sm text-green-600"><CheckCircle size={14} /> DBS Clear</div>;
  if (status === 'pending') return <div className="flex items-center gap-2 text-sm text-amber-600"><AlertCircle size={14} /> DBS Pending</div>;
  return <div className="flex items-center gap-2 text-sm text-gray-500"><Circle size={14} /> DBS Not Started</div>;
}

/* ─── Post New Job Modal ─── */
function PostJobModal({ onClose, onSave }: { onClose: () => void; onSave: (job: JobPosting) => void }) {
  const [form, setForm] = useState({ title: '', type: 'Full Time', location: '', salaryType: 'range' as 'range' | 'hourly', salaryMin: '', salaryMax: '', salaryHourly: '', deadline: '', description: '', requirements: '' });

  const handleSubmit = () => {
    if (!form.title.trim() || !form.location.trim()) return;
    const salary = form.salaryType === 'hourly'
      ? `£${form.salaryHourly}/hr`
      : `£${form.salaryMin}–£${form.salaryMax}`;
    onSave({
      id: Date.now(),
      title: form.title,
      type: form.type,
      location: form.location,
      salary,
      applications: 0,
      deadline: form.deadline,
      status: 'active',
      description: form.description,
      requirements: form.requirements.split('\n').map(r => r.trim()).filter(Boolean),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg text-gray-900">Post New Job</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><X size={18} className="text-gray-500" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Job Title *</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Support Worker" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Contract Type</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Bank / Zero Hours</option>
                <option>Temporary</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Location *</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Bristol, BS1" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">Salary</label>
            <div className="flex gap-3 mb-2">
              <button onClick={() => setForm(f => ({ ...f, salaryType: 'range' }))} className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${form.salaryType === 'range' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}>Salary Range</button>
              <button onClick={() => setForm(f => ({ ...f, salaryType: 'hourly' }))} className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${form.salaryType === 'hourly' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}>Hourly Rate</button>
            </div>
            {form.salaryType === 'range' ? (
              <div className="flex gap-3">
                <input className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" placeholder="Min (e.g. 22000)" value={form.salaryMin} onChange={e => setForm(f => ({ ...f, salaryMin: e.target.value }))} />
                <input className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" placeholder="Max (e.g. 25000)" value={form.salaryMax} onChange={e => setForm(f => ({ ...f, salaryMax: e.target.value }))} />
              </div>
            ) : (
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" placeholder="Hourly rate (e.g. 13.50)" value={form.salaryHourly} onChange={e => setForm(f => ({ ...f, salaryHourly: e.target.value }))} />
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Application Deadline</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Job Description</label>
            <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the role and responsibilities..." />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Requirements <span className="text-gray-400">(one per line)</span></label>
            <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" rows={4} value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} placeholder={"NVQ Level 2 in Health & Social Care\nEnhanced DBS required\n..."} />
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"><Save size={14} /> Post Job</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Job View Modal ─── */
function JobViewModal({ job, onClose, onEdit }: { job: JobPosting; onClose: () => void; onEdit: () => void }) {
  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg text-gray-900">{job.title}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full ${job.status === 'active' ? 'bg-green-100 text-green-700' : job.status === 'paused' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>{job.status === 'active' ? 'Active' : job.status === 'paused' ? 'Paused' : 'Closed'}</span>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><X size={18} className="text-gray-500" /></button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-500">Contract Type</span><div className="text-gray-900 mt-0.5">{job.type}</div></div>
            <div><span className="text-gray-500">Location</span><div className="text-gray-900 mt-0.5">{job.location}</div></div>
            <div><span className="text-gray-500">Salary</span><div className="text-gray-900 mt-0.5">{job.salary}</div></div>
            <div><span className="text-gray-500">Application Deadline</span><div className="text-gray-900 mt-0.5">{job.deadline}</div></div>
            <div><span className="text-gray-500">Applications Received</span><div className="text-blue-600 mt-0.5">{job.applications}</div></div>
          </div>
          {job.description && (
            <div>
              <div className="text-sm text-gray-500 mb-2">Job Description</div>
              <p className="text-sm text-gray-700 leading-relaxed">{job.description}</p>
            </div>
          )}
          {job.requirements.length > 0 && (
            <div>
              <div className="text-sm text-gray-500 mb-2">Requirements</div>
              <ul className="space-y-1.5">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Close</button>
          <button onClick={onEdit} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"><Edit size={14} /> Edit Job</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Job Edit Modal ─── */
function JobEditModal({ job, onClose, onSave }: { job: JobPosting; onClose: () => void; onSave: (updated: JobPosting) => void }) {
  const [form, setForm] = useState({ ...job, requirements: job.requirements.join('\n') });

  const handleSave = () => {
    onSave({ ...form, requirements: form.requirements.split('\n').map(r => r.trim()).filter(Boolean) });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg text-gray-900">Edit Job Posting</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><X size={18} className="text-gray-500" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Job Title</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Contract Type</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option>Full Time</option><option>Part Time</option><option>Bank / Zero Hours</option><option>Temporary</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Location</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Salary</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Deadline</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Job Status</label>
            <div className="flex gap-2">
              {([
                { value: 'active', label: 'Active',     activeClass: 'bg-green-600 text-white border-green-600',  desc: 'Accepting applications' },
                { value: 'paused', label: 'Paused',     activeClass: 'bg-amber-500 text-white border-amber-500',  desc: 'Temporarily hidden' },
                { value: 'closed', label: 'Closed',     activeClass: 'bg-gray-700 text-white border-gray-700',    desc: 'No longer accepting' },
              ] as const).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm(f => ({ ...f, status: opt.value }))}
                  className={`flex-1 flex flex-col items-center gap-0.5 px-3 py-2.5 text-xs rounded-xl border transition-colors ${form.status === opt.value ? opt.activeClass : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  <span className="font-medium">{opt.label}</span>
                  <span className={`text-xs ${form.status === opt.value ? 'text-white/70' : 'text-gray-400'}`}>{opt.desc}</span>
                </button>
              ))}
            </div>
            {(form.status === 'paused' || form.status === 'closed') && (
              <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                {form.status === 'paused'
                  ? 'The job will be hidden from applicants. You can reopen it at any time.'
                  : 'The job will be permanently closed. Existing applications will remain accessible.'}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Job Description</label>
            <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Requirements <span className="text-gray-400">(one per line)</span></label>
            <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" rows={4} value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} />
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"><Save size={14} /> Save Changes</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Rejection Email Modal ─── */
function RejectionEmailModal({ candidate, onClose, onConfirm }: {
  candidate: Candidate;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const defaultSubject = `Your Application for ${candidate.role} – MpoweredCare`;
  const defaultBody = `Dear ${candidate.name.split(' ')[0]},

Thank you for taking the time to apply for the ${candidate.role} position at MpoweredCare and for your interest in joining our team.

After careful consideration of all applications received, we regret to inform you that we will not be progressing your application to the next stage on this occasion. This was a difficult decision, as we received a high number of strong applications.

We appreciate the time and effort you invested in your application, and we encourage you to apply for future vacancies that match your skills and experience.

We wish you every success in your job search.

Kind regards,
MpoweredCare Recruitment Team`;

  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => {
        onConfirm();
        onClose();
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
            <Ban size={17} className="text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base text-gray-900">Send Rejection Email</h2>
            <p className="text-xs text-gray-500 truncate">To: {candidate.name} &lt;{candidate.email}&gt;</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={28} className="text-green-600" />
            </div>
            <p className="text-sm text-gray-700">Rejection email sent to {candidate.name}</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
              Moving this candidate to <span className="font-semibold">Rejected</span> and sending an automatic rejection email. You can edit the message below before sending.
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Recipient</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-600">
                <Mail size={14} className="text-gray-400 shrink-0" />
                {candidate.name} &lt;{candidate.email}&gt;
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Subject</label>
              <input
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Message</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none"
                rows={12}
                value={body}
                onChange={e => setBody(e.target.value)}
              />
            </div>
          </div>
        )}

        {!sent && (
          <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-100">
            <button
              onClick={onConfirm}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
            >
              Reject without sending email
            </button>
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
              <button
                onClick={handleSend}
                disabled={sending}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {sending ? (
                  <><span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending…</>
                ) : (
                  <><Send size={14} /> Send Rejection Email</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Move Stage Dropdown ─── */
function MoveStageDropdown({ current, onMove, candidate, align = 'right' }: {
  current: Stage;
  onMove: (s: Stage) => void;
  candidate: Candidate;
  align?: 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const handleStageClick = (s: Stage) => {
    setOpen(false);
    if (s === 'rejected') {
      setShowRejectionModal(true);
    } else {
      onMove(s);
    }
  };

  return (
    <>
      <div ref={ref} className="relative">
        <button
          onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Move Stage <ChevronDown size={12} />
        </button>
        {open && (
          <div className={`absolute z-20 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 ${align === 'right' ? 'right-0' : 'left-0'}`}>
            {stages.filter(s => s !== current).map(s => {
              const cfg = stageConfig[s];
              return (
                <button
                  key={s}
                  onClick={e => { e.stopPropagation(); handleStageClick(s); }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 flex items-center gap-2 ${cfg.color} ${s === 'rejected' ? 'border-t border-gray-100 mt-1 pt-2' : ''}`}
                >
                  {s === 'rejected'
                    ? <Ban size={12} className="shrink-0" />
                    : <span className={`w-2 h-2 rounded-full ${cfg.bg} border ${cfg.border} inline-block shrink-0`} />
                  }
                  {cfg.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {showRejectionModal && (
        <RejectionEmailModal
          candidate={candidate}
          onClose={() => setShowRejectionModal(false)}
          onConfirm={() => { onMove('rejected'); setShowRejectionModal(false); }}
        />
      )}
    </>
  );
}

/* ─── Main Page ─── */
export default function Recruitment() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [jobs, setJobs] = useState<JobPosting[]>(initialJobs);
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [selectedStage, setSelectedStage] = useState<Stage | 'all'>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'onboarding' | 'jobs'>('pipeline');
  const [showPostJob, setShowPostJob] = useState(false);
  const [viewingJob, setViewingJob] = useState<JobPosting | null>(null);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);

  const moveStage = (id: number, stage: Stage) => {
    setCandidates(cs => cs.map(c => c.id === id ? { ...c, stage } : c));
    if (selectedCandidate?.id === id) setSelectedCandidate(c => c ? { ...c, stage } : c);
  };

  const stats = [
    { label: 'Active Applications', value: candidates.filter(c => c.stage !== 'hired' && c.stage !== 'rejected').length.toString(), color: 'text-blue-600', sub: '3 new this week' },
    { label: 'Interviews Scheduled', value: '4', color: 'text-purple-600', sub: 'This week' },
    { label: 'Offers Pending', value: '2', color: 'text-amber-600', sub: 'Awaiting response' },
    { label: 'Hired This Month', value: '3', color: 'text-green-600', sub: 'vs 2 last month' },
    { label: 'Time to Hire', value: '18d', color: 'text-gray-900', sub: 'Average' },
  ];

  const visibleCandidates = selectedStage === 'all' ? candidates : candidates.filter(c => c.stage === selectedStage);

  if (selectedCandidate) {
    return (
      <CandidateProfile
        candidate={selectedCandidate}
        onBack={() => setSelectedCandidate(null)}
        onMoveStage={(stage) => moveStage(selectedCandidate.id, stage)}
      />
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Recruitment" />
      <TopBar />

      <main className="ml-64 pt-24 px-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl text-gray-900">Recruitment & Onboarding</h1>
            <p className="text-sm text-gray-600 mt-1">Manage the full candidate lifecycle from application to hire</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <FileText size={16} /> Export
            </button>
            <button
              onClick={() => setShowPostJob(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus size={16} /> Post New Job
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {stats.map((s, i) => (
            <Card key={i}>
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className={`text-2xl ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
          {(['pipeline', 'onboarding', 'jobs'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab === 'pipeline' ? 'Candidate Pipeline' : tab === 'onboarding' ? 'Onboarding Tracker' : 'Job Postings'}
            </button>
          ))}
        </div>

        {/* Pipeline Tab */}
        {activeTab === 'pipeline' && (
          <>
            <Card className="mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-48 flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 border border-gray-100">
                  <Search size={18} className="text-gray-400" />
                  <input type="text" placeholder="Search candidates..." className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700" />
                </div>
                <select className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700" value={selectedStage} onChange={e => setSelectedStage(e.target.value as any)}>
                  <option value="all">All Stages</option>
                  {stages.map(s => <option key={s} value={s}>{stageConfig[s].label}</option>)}
                </select>
                <select className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700">
                  <option>All Roles</option>
                  <option>Support Worker</option>
                  <option>Senior Carer</option>
                  <option>Care Coordinator</option>
                  <option>Team Leader</option>
                </select>
                <div className="flex items-center gap-1">
                  <button onClick={() => setViewMode('kanban')} className={`p-2 rounded-lg ${viewMode === 'kanban' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'} transition-colors`}><Grid3x3 size={18} /></button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'} transition-colors`}><List size={18} /></button>
                </div>
              </div>
            </Card>

            {/* Kanban */}
            {viewMode === 'kanban' && (
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-max">
                  {stages.map(stage => {
                    const cfg = stageConfig[stage];
                    const stageCandidates = candidates.filter(c => c.stage === stage);
                    return (
                      <div key={stage} className="w-64 flex-shrink-0">
                        <div className={`flex items-center justify-between mb-3 px-3 py-2 rounded-lg border ${cfg.bg} ${cfg.border}`}>
                          <span className={`text-sm ${cfg.color}`}>{cfg.label}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>{stageCandidates.length}</span>
                        </div>
                        <div className="space-y-3">
                          {stageCandidates.map(c => (
                            <div key={c.id} className={`rounded-xl border p-4 shadow-sm transition-all ${c.stage === 'rejected' ? 'bg-red-50/50 border-red-100 opacity-70 hover:opacity-90' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'}`}>
                              <div className="flex items-start gap-3 mb-3">
                                <div className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center text-white text-xs shrink-0 ${c.stage === 'rejected' ? 'grayscale' : ''}`}>{c.initials}</div>
                                <div className="min-w-0">
                                  <div className={`text-sm truncate ${c.stage === 'rejected' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{c.name}</div>
                                  <div className="text-xs text-gray-500">{c.role}</div>
                                </div>
                              </div>
                              <div className="space-y-1.5 mb-3">
                                <div className="flex items-center gap-1.5 text-xs text-gray-500"><MapPin size={12} /> {c.location}</div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-500"><Briefcase size={12} /> {c.experience} experience</div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-500"><Calendar size={12} /> Applied {c.appliedDate}</div>
                              </div>
                              <div className="flex items-center justify-between mb-3">
                                <DbsBadge status={c.dbsStatus} />
                                <div className="flex gap-0.5">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={10} className={i < c.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                                  ))}
                                </div>
                              </div>
                              {c.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {c.tags.slice(0, 2).map(t => (
                                    <span key={t} className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{t}</span>
                                  ))}
                                </div>
                              )}
                              <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                                <button
                                  onClick={() => setSelectedCandidate(c)}
                                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                  <Eye size={12} /> View
                                </button>
                                <MoveStageDropdown current={c.stage} onMove={s => moveStage(c.id, s)} candidate={c} align="right" />
                              </div>
                            </div>
                          ))}
                          {stage !== 'rejected' && (
                            <button className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-xs text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
                              + Add candidate
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-4 text-xs text-gray-500">Candidate</th>
                        <th className="text-left py-3 px-4 text-xs text-gray-500">Role</th>
                        <th className="text-left py-3 px-4 text-xs text-gray-500">Stage</th>
                        <th className="text-left py-3 px-4 text-xs text-gray-500">Applied</th>
                        <th className="text-left py-3 px-4 text-xs text-gray-500">DBS</th>
                        <th className="text-left py-3 px-4 text-xs text-gray-500">Refs</th>
                        <th className="text-left py-3 px-4 text-xs text-gray-500">Rating</th>
                        <th className="py-3 px-4 text-xs text-gray-500 w-[180px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleCandidates.map(c => {
                        const cfg = stageConfig[c.stage];
                        return (
                          <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full ${c.color} flex items-center justify-center text-white text-xs`}>{c.initials}</div>
                                <div>
                                  <div className="text-sm text-gray-900">{c.name}</div>
                                  <div className="text-xs text-gray-500">{c.location}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">{c.role}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 text-xs rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">{c.appliedDate}</td>
                            <td className="py-3 px-4"><DbsBadge status={c.dbsStatus} /></td>
                            <td className="py-3 px-4">
                              <span className={`text-sm ${c.references >= c.referencesRequired ? 'text-green-600' : 'text-amber-600'}`}>
                                {c.references}/{c.referencesRequired}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} size={12} className={i < c.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4 w-[180px]">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setSelectedCandidate(c)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors w-[70px] justify-center"
                                >
                                  <Eye size={12} /> View
                                </button>
                                <MoveStageDropdown current={c.stage} onMove={s => moveStage(c.id, s)} candidate={c} align="right" />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </>
        )}

        {/* Onboarding Tab */}
        {activeTab === 'onboarding' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg text-gray-900 mb-2">Active Onboarding</h2>
              {candidates.filter(c => c.stage === 'onboarding' || c.stage === 'hired').map(c => (
                <Card key={c.id} className="hover:border-blue-200 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-full ${c.color} flex items-center justify-center text-white text-sm`}>{c.initials}</div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.role} • Start: 16 Jun 2026</div>
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${stageConfig[c.stage].bg} ${stageConfig[c.stage].color}`}>
                      {stageConfig[c.stage].label}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {onboardingTasks.map(task => (
                      <div key={task.id} className="flex items-center gap-3">
                        {task.done ? <CheckCircle size={16} className="text-green-500 shrink-0" /> : <Circle size={16} className="text-gray-300 shrink-0" />}
                        <span className={`text-sm ${task.done ? 'text-gray-500 line-through' : 'text-gray-700'}`}>{task.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Completion</span>
                      <span className="text-xs text-gray-700">4/8 tasks</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '50%' }} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div>
              <h2 className="text-lg text-gray-900 mb-4">Compliance Checklist</h2>
              <Card>
                <div className="space-y-3">
                  {[
                    { label: 'Enhanced DBS Check', status: 'complete', note: 'Received 1 Jun 2026' },
                    { label: 'Right to Work Documents', status: 'complete', note: 'Passport verified' },
                    { label: 'Professional References', status: 'complete', note: '2 of 2 received' },
                    { label: 'Qualifications Verified', status: 'complete', note: 'NVQ Level 3' },
                    { label: 'Contract Signed', status: 'pending', note: 'Awaiting signature' },
                    { label: 'Mandatory Training (6 modules)', status: 'pending', note: 'Not yet assigned' },
                    { label: 'Health Declaration', status: 'pending', note: 'Form not submitted' },
                    { label: 'Uniform & Equipment', status: 'not-started', note: 'To be arranged' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {item.status === 'complete' ? <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                        : item.status === 'pending' ? <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        : <Circle size={16} className="text-gray-300 shrink-0 mt-0.5" />}
                      <div>
                        <div className="text-sm text-gray-900">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Job Postings Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {jobs.map(job => (
              <Card key={job.id} className="hover:border-blue-200 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <Briefcase size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm text-gray-900">{job.title}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          job.status === 'active' ? 'bg-green-100 text-green-700' :
                          job.status === 'paused' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {job.status === 'active' ? 'Active' : job.status === 'paused' ? 'Paused' : 'Closed'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Briefcase size={12} /> {job.type}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                        <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> Deadline: {job.deadline}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xl text-blue-600">{job.applications}</div>
                      <div className="text-xs text-gray-500">Applications</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewingJob(job)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Eye size={13} /> View
                      </button>
                      {(job.status === 'paused' || job.status === 'closed') && (
                        <button
                          onClick={() => setJobs(js => js.map(j => j.id === job.id ? { ...j, status: 'active' } : j))}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <CheckCircle size={13} /> Reopen
                        </button>
                      )}
                      <button
                        onClick={() => setEditingJob(job)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Edit size={13} /> Edit
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {showPostJob && (
        <PostJobModal
          onClose={() => setShowPostJob(false)}
          onSave={job => setJobs(js => [job, ...js])}
        />
      )}
      {viewingJob && (
        <JobViewModal
          job={viewingJob}
          onClose={() => setViewingJob(null)}
          onEdit={() => { setEditingJob(viewingJob); setViewingJob(null); }}
        />
      )}
      {editingJob && (
        <JobEditModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={updated => setJobs(js => js.map(j => j.id === updated.id ? updated : j))}
        />
      )}
    </div>
  );
}

/* ─── Candidate Profile Page ─── */
function CandidateProfile({ candidate, onBack, onMoveStage }: {
  candidate: Candidate;
  onBack: () => void;
  onMoveStage: (stage: Stage) => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'notes'>('overview');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const cfg = stageConfig[candidate.stage];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Recruitment" />
      <TopBar />
      <main className="ml-64 pt-24 px-8 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowRight size={16} className="rotate-180" /> Back to Recruitment
          </button>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 text-xs rounded-lg border ${cfg.bg} ${cfg.color} ${cfg.border}`}>{cfg.label}</span>
            {candidate.stage !== 'rejected' && (
              <button
                onClick={() => setShowRejectModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Ban size={13} /> Reject
              </button>
            )}
            <MoveStageDropdown current={candidate.stage} onMove={onMoveStage} candidate={candidate} align="right" />
          </div>
        </div>

        {showRejectModal && (
          <RejectionEmailModal
            candidate={candidate}
            onClose={() => setShowRejectModal(false)}
            onConfirm={() => { onMoveStage('rejected'); setShowRejectModal(false); }}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card className="text-center">
              <div className={`w-16 h-16 rounded-full ${candidate.color} flex items-center justify-center text-white mx-auto mb-3`}>
                <span className="text-xl">{candidate.initials}</span>
              </div>
              <div className="text-base text-gray-900">{candidate.name}</div>
              <div className="text-sm text-gray-500 mb-3">{candidate.role}</div>
              <div className="flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < candidate.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                ))}
              </div>
            </Card>
            <Card>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600"><Mail size={14} className="text-gray-400" /> {candidate.email}</div>
                <div className="flex items-center gap-2 text-gray-600"><Phone size={14} className="text-gray-400" /> {candidate.phone}</div>
                <div className="flex items-center gap-2 text-gray-600"><MapPin size={14} className="text-gray-400" /> {candidate.location}</div>
                <div className="flex items-center gap-2 text-gray-600"><Briefcase size={14} className="text-gray-400" /> {candidate.experience} experience</div>
                <div className="flex items-center gap-2 text-gray-600"><Calendar size={14} className="text-gray-400" /> Applied {candidate.appliedDate}</div>
              </div>
            </Card>
            <Card>
              <div className="text-xs text-gray-500 mb-3">Compliance</div>
              <div className="space-y-2">
                <DbsBadgeLarge status={candidate.dbsStatus} />
                <div className={`flex items-center gap-2 text-sm ${candidate.rightToWork ? 'text-green-600' : 'text-red-600'}`}>
                  {candidate.rightToWork ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  Right to Work
                </div>
                <div className={`flex items-center gap-2 text-sm ${candidate.references >= candidate.referencesRequired ? 'text-green-600' : 'text-amber-600'}`}>
                  <FileText size={14} />
                  References {candidate.references}/{candidate.referencesRequired}
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex gap-1 mb-4 border-b border-gray-200">
              {(['overview', 'documents', 'notes'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-sm capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-4">
                <Card>
                  <div className="text-sm text-gray-500 mb-3">Skills & Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {candidate.tags.map(t => <span key={t} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">{t}</span>)}
                  </div>
                </Card>
                <Card>
                  <div className="text-sm text-gray-500 mb-3">Interview Notes</div>
                  <p className="text-sm text-gray-700">{candidate.notes || 'No notes added yet.'}</p>
                </Card>
                <Card>
                  <div className="text-sm text-gray-500 mb-3">Pipeline Stage</div>
                  {candidate.stage === 'rejected' ? (
                    <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                      <Ban size={16} className="text-red-500 shrink-0" />
                      <span className="text-sm text-red-700">Application rejected — rejection email sent</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-wrap">
                      {stages.filter(s => s !== 'rejected').map((s, i, arr) => {
                        const sCfg = stageConfig[s];
                        const isPast = arr.indexOf(candidate.stage as Stage) >= i;
                        return (
                          <div key={s} className="flex items-center gap-2">
                            <span className={`px-3 py-1.5 text-xs rounded-lg border ${isPast ? `${sCfg.bg} ${sCfg.color} ${sCfg.border}` : 'bg-gray-50 text-gray-400 border-gray-200'}`}>{sCfg.label}</span>
                            {i < arr.length - 1 && <ArrowRight size={14} className="text-gray-300" />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {activeTab === 'documents' && (
              <Card>
                <div className="text-sm text-gray-500 mb-4">Documents</div>
                <div className="space-y-3">
                  {[
                    { name: 'CV / Resume', uploaded: true, date: '2 Jun 2026' },
                    { name: 'Cover Letter', uploaded: true, date: '2 Jun 2026' },
                    { name: 'DBS Certificate', uploaded: candidate.dbsStatus === 'clear', date: candidate.dbsStatus === 'clear' ? '28 May 2026' : null },
                    { name: 'Passport / ID', uploaded: candidate.rightToWork, date: candidate.rightToWork ? '3 Jun 2026' : null },
                    { name: 'Reference 1', uploaded: candidate.references >= 1, date: candidate.references >= 1 ? '5 Jun 2026' : null },
                    { name: 'Reference 2', uploaded: candidate.references >= 2, date: candidate.references >= 2 ? '6 Jun 2026' : null },
                    { name: 'Qualifications', uploaded: false, date: null },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-3">
                        {doc.uploaded ? <CheckCircle size={16} className="text-green-500" /> : <Circle size={16} className="text-gray-300" />}
                        <div>
                          <div className="text-sm text-gray-900">{doc.name}</div>
                          {doc.date && <div className="text-xs text-gray-400">Uploaded {doc.date}</div>}
                        </div>
                      </div>
                      {doc.uploaded
                        ? <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"><Download size={12} /> Download</button>
                        : <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"><Upload size={12} /> Upload</button>
                      }
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'notes' && (
              <Card>
                <div className="text-sm text-gray-500 mb-4">Recruiter Notes</div>
                <textarea
                  className="w-full min-h-32 p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 resize-none outline-none focus:border-blue-300"
                  defaultValue={candidate.notes}
                  placeholder="Add notes about this candidate..."
                />
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">Save Notes</button>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
