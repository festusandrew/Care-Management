import { X, AlertTriangle, Shield, Calendar, User, Clock, CheckCircle2, Edit, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import svgPaths from '../imports/svg-x3gk7n5peu';

interface CarePlanDetailModalProps {
  show: boolean;
  onClose: () => void;
  carePlan: any;
  onSave?: (updated: any) => void;
}

type Risk = { title: string; level: 'low' | 'medium' | 'high'; summary: string; precautions: string[] };
type Goal = { goal: string; progress: string; target: string; description: string };
type RoutineItem = { time: string; activity: string };
type TeamMember = { role: string; name: string; responsibilities: string[] };
type Review = { date: string; reviewer: string; status: string; notes: string };

type PlanData = {
  id: string;
  serviceUserName: string;
  dob: string;
  diagnosis: string;
  nhsNumber: string;
  communication: string;
  mobility: string;
  dietary: string;
  planType: string;
  version: string;
  status: 'Active' | 'Review Due' | 'Draft';
  lastReviewed: string;
  nextReview: string;
  lastUpdated: string;
  updatedBy: string;
  risks: Risk[];
  goals: Goal[];
  routine: RoutineItem[];
  team: TeamMember[];
  reviews: Review[];
};

const DEFAULT_PLAN: PlanData = {
  id: '',
  serviceUserName: '',
  dob: '15 March 1985',
  diagnosis: 'Autism Spectrum Disorder, Anxiety',
  nhsNumber: '485 657 3827',
  communication: 'Verbal with some support needed. Uses visual aids and communication cards when anxious.',
  mobility: 'Fully mobile, no assistance required.',
  dietary: 'No specific dietary restrictions. Prefers vegetarian options. Dislikes strong-smelling foods.',
  planType: '',
  version: 'v2.1',
  status: 'Active',
  lastReviewed: '',
  nextReview: '',
  lastUpdated: '1 Dec 2025',
  updatedBy: 'Emma Thompson',
  risks: [
    { title: 'Falls Risk', level: 'low', summary: 'Low risk - fully mobile with good balance', precautions: [
      'Clear pathways maintained in living areas',
      'Good lighting throughout residence',
      'Non-slip mats in bathroom',
      'Regular mobility assessments every 6 months'
    ]},
    { title: 'Medication Management', level: 'medium', summary: 'Medium risk - requires supervised administration', precautions: [
      'All medications stored in locked cabinet',
      'Staff to administer and record all medications',
      'Weekly medication reviews with key worker',
      'Monthly pharmacy consultation',
      'Emergency contact card carried at all times'
    ]},
    { title: 'Anxiety & Behavioral Support', level: 'high', summary: 'Requires proactive monitoring and intervention strategies', precautions: [
      'Regular routine maintained to minimize anxiety',
      'Advanced notice given for any changes to schedule',
      'Quiet space available for de-escalation',
      'Staff trained in de-escalation techniques',
      'Use visual anxiety scale to monitor stress levels',
      'Calming activities available (music, art, sensory items)',
      'Weekly psychology sessions'
    ]},
  ],
  goals: [
    { goal: 'Increase independence in daily living skills', progress: 'In Progress', target: 'June 2026',
      description: 'Sarah will prepare at least 3 simple meals independently per week with minimal prompting.' },
    { goal: 'Develop social connections', progress: 'On Track', target: 'December 2025',
      description: 'Attend community group activities twice per month and initiate conversation with at least one peer.' },
    { goal: 'Manage anxiety symptoms', progress: 'In Progress', target: 'Ongoing',
      description: 'Use coping strategies independently when experiencing mild anxiety, reducing escalation incidents.' },
  ],
  routine: [
    { time: '7:00 AM', activity: 'Wake up, personal care routine' },
    { time: '8:00 AM', activity: 'Breakfast (prefers cereal or toast)' },
    { time: '9:00 AM', activity: 'Medication administration' },
    { time: '10:00 AM', activity: 'Structured activity or community outing' },
    { time: '12:30 PM', activity: 'Lunch' },
    { time: '2:00 PM', activity: 'Quiet time / personal interests' },
    { time: '5:00 PM', activity: 'Evening meal preparation support' },
    { time: '6:00 PM', activity: 'Dinner' },
    { time: '8:00 PM', activity: 'Evening medication' },
    { time: '9:00 PM', activity: 'Wind-down routine' },
    { time: '10:00 PM', activity: 'Bedtime' },
  ],
  team: [
    { role: 'Lead Support Worker', name: 'Emma Thompson', responsibilities: ['Primary point of contact', 'Coordinate care delivery', 'Monthly care plan reviews'] },
    { role: 'Care Manager', name: 'Dr. James Wilson', responsibilities: ['Overall care oversight', 'Quarterly reviews', 'Family liaison'] },
    { role: 'Clinical Psychologist', name: 'Sarah Martinez', responsibilities: ['Weekly therapy sessions', 'Behavioral support strategies', 'Crisis intervention planning'] },
  ],
  reviews: [
    { date: '1 Dec 2025', reviewer: 'Emma Thompson', status: 'Completed', notes: 'All goals reviewed and updated. Sarah making good progress.' },
    { date: '1 Sep 2025', reviewer: 'Dr. James Wilson', status: 'Completed', notes: 'Quarterly review completed. Minor adjustments to anxiety management strategies.' },
  ],
};

function extractName(carePlan: any): string {
  if (!carePlan) return '';
  if (typeof carePlan.serviceUser === 'string') return carePlan.serviceUser;
  return carePlan?.serviceUser?.name || '';
}

export function CarePlanDetailModal({ show, onClose, carePlan, onSave }: CarePlanDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [plan, setPlan] = useState<PlanData>(DEFAULT_PLAN);

  useEffect(() => {
    if (carePlan) {
      setPlan({
        ...DEFAULT_PLAN,
        ...carePlan,
        id: carePlan.id || '',
        serviceUserName: extractName(carePlan),
        planType: carePlan.planType || DEFAULT_PLAN.planType,
        version: carePlan.version || DEFAULT_PLAN.version,
        status: carePlan.status || DEFAULT_PLAN.status,
        lastReviewed: carePlan.lastReviewed || DEFAULT_PLAN.lastReviewed,
        nextReview: carePlan.nextReview || DEFAULT_PLAN.nextReview,
        risks: carePlan.risks || DEFAULT_PLAN.risks,
        goals: carePlan.goals && Array.isArray(carePlan.goals) ? carePlan.goals : DEFAULT_PLAN.goals,
        routine: carePlan.routine || DEFAULT_PLAN.routine,
        team: carePlan.team || DEFAULT_PLAN.team,
        reviews: carePlan.reviews || DEFAULT_PLAN.reviews,
      });
    }
    setIsEditing(false);
  }, [carePlan, show]);

  if (!show || !carePlan) return null;

  const saveChanges = () => {
    const updated = {
      ...carePlan,
      ...plan,
      serviceUser: typeof carePlan.serviceUser === 'string'
        ? plan.serviceUserName
        : { ...(carePlan.serviceUser || {}), name: plan.serviceUserName },
    };
    if (onSave) onSave(updated);
    setIsEditing(false);
  };

  const goalStatusOptions = ['Not Started', 'On Track', 'In Progress', 'At Risk', 'Achieved'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 rounded-lg p-3 shadow-md">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p2041c0f0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p35746cc0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M9 9H6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M18 13H6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M18 17H6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-900">Care Plan</h2>
                <span className="px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-600">{plan.version}</span>
              </div>
              <p className="text-sm text-gray-600">{plan.id} • {plan.planType}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          {/* Basic Information */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Basic Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-600 mb-1">Service User</p><p className="text-sm font-medium text-gray-900">{plan.serviceUserName}</p></div>
              <div><p className="text-xs text-gray-600 mb-1">Date of Birth</p><p className="text-sm font-medium text-gray-900">{plan.dob}</p></div>
              <div><p className="text-xs text-gray-600 mb-1">Primary Diagnosis</p><p className="text-sm font-medium text-gray-900">{plan.diagnosis}</p></div>
              <div><p className="text-xs text-gray-600 mb-1">NHS Number</p><p className="text-sm font-medium text-gray-900">{plan.nhsNumber}</p></div>
            </div>
          </section>

          {/* Medical & Personal */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Medical & Personal Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div><p className="text-xs text-gray-600 mb-1">Communication</p><p className="text-sm text-gray-900">{plan.communication}</p></div>
              <div><p className="text-xs text-gray-600 mb-1">Mobility</p><p className="text-sm text-gray-900">{plan.mobility}</p></div>
              <div><p className="text-xs text-gray-600 mb-1">Dietary Requirements</p><p className="text-sm text-gray-900">{plan.dietary}</p></div>
            </div>
          </section>

          {/* Risk Assessments */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Risk Assessments</h3>
              <button onClick={() => setIsEditing(true)} className="text-blue-600 text-sm hover:underline">Edit</button>
            </div>
            {plan.risks.map((risk, i) => {
              const cls = risk.level === 'high'
                ? { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'bg-amber-600', dot: 'bg-amber-600', I: AlertTriangle }
                : risk.level === 'medium'
                ? { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-600', dot: 'bg-green-600', I: Shield }
                : { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-600', dot: 'bg-blue-600', I: Shield };
              const I = cls.I;
              return (
                <div key={i} className={`${cls.bg} border ${cls.border} rounded-lg p-4 mb-3`}>
                  <div className="flex items-start gap-3">
                    <div className={`${cls.icon} rounded-full p-1.5 mt-0.5`}>
                      <I className="text-white" size={14} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900 mb-1">{risk.title}</h4>
                      <p className="text-xs text-gray-700 mb-2">{risk.summary}</p>
                      <div className="space-y-1.5">
                        {risk.precautions.map((p, pi) => (
                          <div key={pi} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${cls.dot} mt-1.5 flex-shrink-0`} />
                            <p className="text-xs text-gray-700">{p}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Goals */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Goals and Objectives</h3>
              <button onClick={() => setIsEditing(true)} className="text-blue-600 text-sm hover:underline">Edit Goals</button>
            </div>
            <div className="space-y-3">
              {plan.goals.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 mt-0.5" size={16} />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900">{item.goal}</h4>
                      <p className="text-xs text-gray-700 mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Status:</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">{item.progress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-gray-500" />
                      <span className="text-xs text-gray-600">Target: {item.target}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Daily Routine */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Daily Routine</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {plan.routine.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 py-1">
                  <Clock size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">{item.time}</p>
                    <p className="text-xs text-gray-700">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Care Team */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Care Team & Responsibilities</h3>
            <div className="space-y-3">
              {plan.team.map((member, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="bg-blue-100 rounded-full p-2">
                      <User className="text-blue-600" size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{member.role}</h4>
                      <p className="text-xs text-gray-600">{member.name}</p>
                    </div>
                  </div>
                  <div className="ml-11">
                    <p className="text-xs text-gray-600 mb-1.5">Responsibilities:</p>
                    <ul className="space-y-1">
                      {member.responsibilities.map((r, ri) => (
                        <li key={ri} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                          <p className="text-xs text-gray-700">{r}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Review & Audit */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Review & Audit History</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {plan.reviews.map((review, idx) => (
                <div key={idx} className="pb-2 border-b border-gray-200 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-gray-900">{review.date}</p>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">{review.status}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Reviewer: {review.reviewer}</p>
                  <p className="text-xs text-gray-700">{review.notes}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50 sticky bottom-0">
          <div className="text-xs text-gray-600">Last updated: {plan.lastUpdated} by {plan.updatedBy}</div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">Close</button>
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Edit size={18} />
              Edit Care Plan
            </button>
          </div>
        </div>

        {/* ── Edit overlay ── */}
        {isEditing && (
          <div className="absolute inset-0 bg-white flex flex-col rounded-xl">
            <div className="bg-blue-50 border-b border-gray-200 px-6 py-5 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Edit Care Plan</h2>
                <p className="text-xs text-gray-600 mt-0.5">{plan.id} · {plan.serviceUserName}</p>
              </div>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-white/60 rounded-lg transition-colors">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
              {/* Basic Information */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Basic Information</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Service User" value={plan.serviceUserName} onChange={v => setPlan(p => ({ ...p, serviceUserName: v }))} />
                  <Field label="Date of Birth" value={plan.dob} onChange={v => setPlan(p => ({ ...p, dob: v }))} />
                  <Field label="Primary Diagnosis" value={plan.diagnosis} onChange={v => setPlan(p => ({ ...p, diagnosis: v }))} />
                  <Field label="NHS Number" value={plan.nhsNumber} onChange={v => setPlan(p => ({ ...p, nhsNumber: v }))} />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Plan Type</label>
                    <select value={plan.planType} onChange={e => setPlan(p => ({ ...p, planType: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                      <option>Person-Centred Care Plan</option>
                      <option>Complex Care Plan</option>
                      <option>Support Plan</option>
                      <option>Behavior Support Plan</option>
                      <option>End of Life Care Plan</option>
                    </select>
                  </div>
                  <Field label="Version" value={plan.version} onChange={v => setPlan(p => ({ ...p, version: v }))} />
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Status</label>
                    <select value={plan.status} onChange={e => setPlan(p => ({ ...p, status: e.target.value as any }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                      <option value="Active">Active</option>
                      <option value="Review Due">Review Due</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                  <Field label="Last Reviewed" value={plan.lastReviewed} onChange={v => setPlan(p => ({ ...p, lastReviewed: v }))} />
                  <Field label="Next Review" value={plan.nextReview} onChange={v => setPlan(p => ({ ...p, nextReview: v }))} />
                </div>
              </section>

              {/* Medical & Personal */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Medical & Personal</h3>
                <div className="space-y-3">
                  <TextArea label="Communication" value={plan.communication} onChange={v => setPlan(p => ({ ...p, communication: v }))} />
                  <TextArea label="Mobility" value={plan.mobility} onChange={v => setPlan(p => ({ ...p, mobility: v }))} />
                  <TextArea label="Dietary Requirements" value={plan.dietary} onChange={v => setPlan(p => ({ ...p, dietary: v }))} />
                </div>
              </section>

              {/* Risks */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Risk Assessments</h3>
                  <button onClick={() => setPlan(p => ({ ...p, risks: [...p.risks, { title: '', level: 'low', summary: '', precautions: [] }] }))} className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Plus size={12} /> Add risk</button>
                </div>
                <div className="space-y-3">
                  {plan.risks.map((r, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 grid grid-cols-3 gap-2">
                          <input value={r.title} onChange={e => updateRisk(setPlan, i, { title: e.target.value })} placeholder="Risk title" className="col-span-2 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                          <select value={r.level} onChange={e => updateRisk(setPlan, i, { level: e.target.value as any })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                        <button onClick={() => setPlan(p => ({ ...p, risks: p.risks.filter((_, ix) => ix !== i) }))} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                      <input value={r.summary} onChange={e => updateRisk(setPlan, i, { summary: e.target.value })} placeholder="Summary" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      <ListEditor
                        label="Precautions"
                        items={r.precautions}
                        onChange={items => updateRisk(setPlan, i, { precautions: items })}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Goals */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Goals and Objectives</h3>
                  <button onClick={() => setPlan(p => ({ ...p, goals: [...p.goals, { goal: '', progress: 'Not Started', target: '', description: '' }] }))} className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Plus size={12} /> Add goal</button>
                </div>
                <div className="space-y-3">
                  {plan.goals.map((g, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <input value={g.goal} onChange={e => updateGoal(setPlan, i, { goal: e.target.value })} placeholder="Goal title" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        <button onClick={() => setPlan(p => ({ ...p, goals: p.goals.filter((_, ix) => ix !== i) }))} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                      <textarea value={g.description} onChange={e => updateGoal(setPlan, i, { description: e.target.value })} placeholder="Description / measurable outcome" rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
                      <div className="grid grid-cols-2 gap-2">
                        <select value={g.progress} onChange={e => updateGoal(setPlan, i, { progress: e.target.value })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                          {goalStatusOptions.map(o => <option key={o}>{o}</option>)}
                        </select>
                        <input value={g.target} onChange={e => updateGoal(setPlan, i, { target: e.target.value })} placeholder="Target (e.g. Jun 2026)" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Daily Routine */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Daily Routine</h3>
                  <button onClick={() => setPlan(p => ({ ...p, routine: [...p.routine, { time: '', activity: '' }] }))} className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Plus size={12} /> Add item</button>
                </div>
                <div className="space-y-2">
                  {plan.routine.map((it, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input value={it.time} onChange={e => updateRoutine(setPlan, i, { time: e.target.value })} placeholder="7:00 AM" className="w-28 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      <input value={it.activity} onChange={e => updateRoutine(setPlan, i, { activity: e.target.value })} placeholder="Activity" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      <button onClick={() => setPlan(p => ({ ...p, routine: p.routine.filter((_, ix) => ix !== i) }))} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Care Team */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Care Team</h3>
                  <button onClick={() => setPlan(p => ({ ...p, team: [...p.team, { role: '', name: '', responsibilities: [] }] }))} className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Plus size={12} /> Add member</button>
                </div>
                <div className="space-y-3">
                  {plan.team.map((m, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <input value={m.role} onChange={e => updateTeam(setPlan, i, { role: e.target.value })} placeholder="Role" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                          <input value={m.name} onChange={e => updateTeam(setPlan, i, { name: e.target.value })} placeholder="Name" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                        </div>
                        <button onClick={() => setPlan(p => ({ ...p, team: p.team.filter((_, ix) => ix !== i) }))} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                      <ListEditor
                        label="Responsibilities"
                        items={m.responsibilities}
                        onChange={items => updateTeam(setPlan, i, { responsibilities: items })}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Review & Audit History</h3>
                  <button onClick={() => setPlan(p => ({ ...p, reviews: [...p.reviews, { date: '', reviewer: '', status: 'Completed', notes: '' }] }))} className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Plus size={12} /> Add review</button>
                </div>
                <div className="space-y-3">
                  {plan.reviews.map((r, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 grid grid-cols-3 gap-2">
                          <input value={r.date} onChange={e => updateReview(setPlan, i, { date: e.target.value })} placeholder="Date" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                          <input value={r.reviewer} onChange={e => updateReview(setPlan, i, { reviewer: e.target.value })} placeholder="Reviewer" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                          <select value={r.status} onChange={e => updateReview(setPlan, i, { status: e.target.value })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                            <option>Completed</option>
                            <option>Scheduled</option>
                            <option>Overdue</option>
                          </select>
                        </div>
                        <button onClick={() => setPlan(p => ({ ...p, reviews: p.reviews.filter((_, ix) => ix !== i) }))} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                      <textarea value={r.notes} onChange={e => updateReview(setPlan, i, { notes: e.target.value })} placeholder="Notes" rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={saveChanges} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1 font-medium">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1 font-medium">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
    </div>
  );
}

function ListEditor({ label, items, onChange }: { label: string; items: string[]; onChange: (items: string[]) => void }) {
  const [draft, setDraft] = useState('');
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1 font-medium">{label}</p>
      <div className="space-y-1.5">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2">
            <input value={it} onChange={e => onChange(items.map((x, ix) => ix === i ? e.target.value : x))} className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400" />
            <button onClick={() => onChange(items.filter((_, ix) => ix !== i))} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"><Trash2 size={12} /></button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && draft.trim()) { onChange([...items, draft.trim()]); setDraft(''); } }} placeholder="Add item and press Enter…" className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400" />
          <button onClick={() => { if (draft.trim()) { onChange([...items, draft.trim()]); setDraft(''); } }} className="px-2.5 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Plus size={12} /></button>
        </div>
      </div>
    </div>
  );
}

function updateRisk(setter: any, i: number, patch: Partial<Risk>) {
  setter((p: PlanData) => ({ ...p, risks: p.risks.map((r, ix) => ix === i ? { ...r, ...patch } : r) }));
}
function updateGoal(setter: any, i: number, patch: Partial<Goal>) {
  setter((p: PlanData) => ({ ...p, goals: p.goals.map((g, ix) => ix === i ? { ...g, ...patch } : g) }));
}
function updateRoutine(setter: any, i: number, patch: Partial<RoutineItem>) {
  setter((p: PlanData) => ({ ...p, routine: p.routine.map((r, ix) => ix === i ? { ...r, ...patch } : r) }));
}
function updateTeam(setter: any, i: number, patch: Partial<TeamMember>) {
  setter((p: PlanData) => ({ ...p, team: p.team.map((m, ix) => ix === i ? { ...m, ...patch } : m) }));
}
function updateReview(setter: any, i: number, patch: Partial<Review>) {
  setter((p: PlanData) => ({ ...p, reviews: p.reviews.map((r, ix) => ix === i ? { ...r, ...patch } : r) }));
}
