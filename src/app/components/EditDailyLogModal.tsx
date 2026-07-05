import { X, FileText, Smile, Meh, Frown, Save, Plus, Trash2, Utensils, Moon, Activity as ActivityIcon, AlertCircle, Pill } from 'lucide-react';
import { useState, useEffect } from 'react';

interface EditDailyLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: any;
  onSave: (updated: any) => void;
}

const MOODS = [
  { value: 'happy',   label: 'Happy',   emoji: '😊', icon: Smile, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  { value: 'neutral', label: 'Neutral', emoji: '😐', icon: Meh,   color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  { value: 'sad',     label: 'Sad',     emoji: '😢', icon: Frown, color: 'text-red-600',   bg: 'bg-red-50',   border: 'border-red-200' },
];

type Meal = { consumed: string; time: string; notes: string };
type MealDetails = { breakfast: Meal; lunch: Meal; dinner: Meal; snacks: Meal };
type SleepDetails = { bedtime: string; wakeTime: string; quality: string; interruptions: string; notes: string };
type ActivityItem = { time: string; activity: string; duration: string; participation: string };
type Observation = { time: string; observation: string; level: 'positive' | 'neutral' | 'negative' };
type Medication = { name: string; time: string; status: string };
type VitalSigns = { bloodPressure: string; heartRate: string; temperature: string; timeChecked: string };

const DEFAULT_MEAL: Meal = { consumed: '', time: '', notes: '' };
const DEFAULT_MEALS: MealDetails = {
  breakfast: { consumed: '100%', time: '08:30 AM', notes: 'Full portion of cereal and toast' },
  lunch:     { consumed: '80%',  time: '12:30 PM', notes: 'Most of sandwich, left some salad' },
  dinner:    { consumed: '90%',  time: '18:00 PM', notes: 'Enjoyed pasta dish' },
  snacks:    { consumed: 'Yes',  time: '',         notes: 'Apple in afternoon, biscuit in evening' },
};
const DEFAULT_SLEEP: SleepDetails = { bedtime: '22:00', wakeTime: '07:00', quality: 'Good', interruptions: 'None', notes: 'Settled well. No disturbances.' };

export function EditDailyLogModal({ isOpen, onClose, log, onSave }: EditDailyLogModalProps) {
  const [form, setForm] = useState<any>({});
  const [activeTab, setActiveTab] = useState<'basics' | 'meals' | 'sleep' | 'activities' | 'behavior' | 'medication' | 'notes'>('basics');

  useEffect(() => {
    if (log) {
      setForm({
        serviceUser: log.serviceUser || '',
        date: log.date || '',
        time: log.time || '',
        type: log.type || 'Daily Log',
        mood: log.mood || 'happy',
        behavior: log.behavior || '',
        activities: log.activities || '',
        meals: log.meals || '',
        sleep: log.sleep || '',
        notes: log.notes || '',
        staff: log.staff || '',
        riskLevel: log.riskLevel || 'green',
        mealDetails: log.mealDetails || DEFAULT_MEALS,
        sleepDetails: log.sleepDetails || DEFAULT_SLEEP,
        activitiesDetailed: log.activitiesDetailed || [
          { time: '10:00 AM', activity: 'Group therapy session', duration: '60 mins', participation: 'Active' },
          { time: '14:00 PM', activity: 'Art class', duration: '90 mins', participation: 'Engaged' },
          { time: '16:00 PM', activity: 'Free time / Reading', duration: '60 mins', participation: 'Independent' },
        ],
        behaviorObservations: log.behaviorObservations || [
          { time: '09:00 AM', observation: 'Calm and cooperative during morning routine', level: 'positive' },
          { time: '11:30 AM', observation: 'Showed good engagement in therapy', level: 'positive' },
          { time: '15:00 PM', observation: 'Slight frustration during art activity but managed well', level: 'neutral' },
        ] as Observation[],
        communicationNotes: log.communicationNotes || 'Verbal communication clear. Expressed feelings appropriately. Used calming strategies when needed.',
        staffObservations: log.staffObservations || 'Overall positive day. Demonstrated good self-regulation skills and engaged well with structured activities.',
        followUpRequired: log.followUpRequired || [],
        medicationTaken: log.medicationTaken || (log.type === 'Medication' ? [
          { name: 'Sertraline 50mg', time: '08:00 AM', status: 'Taken' },
          { name: 'Vitamin D 1000IU', time: '08:00 AM', status: 'Taken' },
        ] : []) as Medication[],
        vitalSigns: log.vitalSigns || (log.type === 'Medication' ? { bloodPressure: '120/80', heartRate: '72 bpm', temperature: '36.5°C', timeChecked: '08:00 AM' } : null),
      });
      setActiveTab('basics');
    }
  }, [log, isOpen]);

  if (!isOpen || !log) return null;

  const save = () => {
    const mood = MOODS.find(m => m.value === form.mood);
    onSave({
      ...log,
      ...form,
      moodEmoji: mood?.emoji || log.moodEmoji || '😐',
    });
    onClose();
  };

  const update = (patch: any) => setForm((f: any) => ({ ...f, ...patch }));
  const updateMeal = (which: keyof MealDetails, patch: Partial<Meal>) =>
    setForm((f: any) => ({ ...f, mealDetails: { ...f.mealDetails, [which]: { ...f.mealDetails[which], ...patch } } }));
  const updateSleep = (patch: Partial<SleepDetails>) => setForm((f: any) => ({ ...f, sleepDetails: { ...f.sleepDetails, ...patch } }));

  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: 'basics',     label: 'Basics' },
    { key: 'meals',      label: 'Meals' },
    { key: 'sleep',      label: 'Sleep' },
    { key: 'activities', label: 'Activities' },
    { key: 'behavior',   label: 'Behavior' },
    { key: 'medication', label: 'Medication' },
    { key: 'notes',      label: 'Notes & Follow-up' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <FileText size={17} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-gray-900">Edit Daily Log</h2>
            <p className="text-xs text-gray-500">{form.serviceUser} · {form.date} {form.time}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0.5 px-4 pt-3 border-b border-gray-100 overflow-x-auto shrink-0">
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
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {activeTab === 'basics' && (
            <>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Date *</label>
                  <input value={form.date} onChange={e => update({ date: e.target.value })} placeholder="e.g. 7 Dec 2025" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Time *</label>
                  <input value={form.time} onChange={e => update({ time: e.target.value })} placeholder="14:30" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Log Type</label>
                  <select value={form.type} onChange={e => update({ type: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                    <option>Daily Log</option>
                    <option>Shift Handover</option>
                    <option>Medication</option>
                    <option>Activity</option>
                    <option>Incident Follow-up</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Service User</label>
                  <input value={form.serviceUser} onChange={e => update({ serviceUser: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Staff Member</label>
                  <input value={form.staff} onChange={e => update({ staff: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Risk Level</label>
                  <select value={form.riskLevel} onChange={e => update({ riskLevel: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                    <option value="green">Low</option>
                    <option value="amber">Medium</option>
                    <option value="red">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2 font-medium">Mood</label>
                <div className="grid grid-cols-3 gap-2">
                  {MOODS.map(m => {
                    const Icon = m.icon;
                    const active = form.mood === m.value;
                    return (
                      <button key={m.value} type="button" onClick={() => update({ mood: m.value })} className={`p-3 rounded-lg border-2 transition-all ${active ? `${m.bg} ${m.border}` : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                        <Icon size={22} className={`mx-auto mb-1 ${active ? m.color : 'text-gray-400'}`} />
                        <div className={`text-xs font-medium ${active ? m.color : 'text-gray-600'}`}>{m.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Behavior (headline)</label>
                <input value={form.behavior} onChange={e => update({ behavior: e.target.value })} placeholder="e.g. Cooperative, Calm, Withdrawn..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Activities (summary)</label>
                <input value={form.activities} onChange={e => update({ activities: e.target.value })} placeholder="e.g. Group therapy, Art class" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Meals (summary)</label>
                  <input value={form.meals} onChange={e => update({ meals: e.target.value })} placeholder="Ate all meals" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Sleep (summary)</label>
                  <input value={form.sleep} onChange={e => update({ sleep: e.target.value })} placeholder="Good (7 hours)" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
              </div>
            </>
          )}

          {activeTab === 'meals' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500 flex items-center gap-1.5"><Utensils size={12} /> Detailed intake per meal</p>
              {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map(mealType => {
                const m = form.mealDetails?.[mealType] || DEFAULT_MEAL;
                return (
                  <div key={mealType} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Utensils className="text-blue-600" size={14} />
                      <span className="text-sm font-semibold text-gray-900 capitalize">{mealType}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input value={m.consumed} onChange={e => updateMeal(mealType, { consumed: e.target.value })} placeholder="Consumed (e.g. 100%, Yes)" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      <input value={m.time} onChange={e => updateMeal(mealType, { time: e.target.value })} placeholder="Time (e.g. 08:30 AM)" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                    </div>
                    <textarea value={m.notes} onChange={e => updateMeal(mealType, { notes: e.target.value })} placeholder="Notes about the meal..." rows={2} className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'sleep' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500 flex items-center gap-1.5"><Moon size={12} /> Sleep pattern details</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Bedtime</label>
                  <input value={form.sleepDetails?.bedtime || ''} onChange={e => updateSleep({ bedtime: e.target.value })} placeholder="22:00" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Wake Time</label>
                  <input value={form.sleepDetails?.wakeTime || ''} onChange={e => updateSleep({ wakeTime: e.target.value })} placeholder="07:00" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Quality</label>
                  <select value={form.sleepDetails?.quality || 'Good'} onChange={e => updateSleep({ quality: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                    <option>Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Interruptions</label>
                  <input value={form.sleepDetails?.interruptions || ''} onChange={e => updateSleep({ interruptions: e.target.value })} placeholder="e.g. None, Woke 2 times" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Notes</label>
                <textarea value={form.sleepDetails?.notes || ''} onChange={e => updateSleep({ notes: e.target.value })} rows={2} placeholder="Any observations..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 flex items-center gap-1.5"><ActivityIcon size={12} /> Timed activities with participation level</p>
                <button onClick={() => update({ activitiesDetailed: [...form.activitiesDetailed, { time: '', activity: '', duration: '', participation: 'Active' }] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                  <Plus size={12} /> Add activity
                </button>
              </div>
              {form.activitiesDetailed?.map((a: ActivityItem, i: number) => (
                <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <input value={a.time} onChange={e => update({ activitiesDetailed: form.activitiesDetailed.map((x: ActivityItem, ix: number) => ix === i ? { ...x, time: e.target.value } : x) })} placeholder="Time (e.g. 10:00 AM)" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      <input value={a.duration} onChange={e => update({ activitiesDetailed: form.activitiesDetailed.map((x: ActivityItem, ix: number) => ix === i ? { ...x, duration: e.target.value } : x) })} placeholder="Duration (e.g. 60 mins)" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      <select value={a.participation} onChange={e => update({ activitiesDetailed: form.activitiesDetailed.map((x: ActivityItem, ix: number) => ix === i ? { ...x, participation: e.target.value } : x) })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                        <option>Active</option>
                        <option>Engaged</option>
                        <option>Independent</option>
                        <option>With prompting</option>
                        <option>Declined</option>
                      </select>
                    </div>
                    <button onClick={() => update({ activitiesDetailed: form.activitiesDetailed.filter((_: any, ix: number) => ix !== i) })} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                  </div>
                  <input value={a.activity} onChange={e => update({ activitiesDetailed: form.activitiesDetailed.map((x: ActivityItem, ix: number) => ix === i ? { ...x, activity: e.target.value } : x) })} placeholder="Activity name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'behavior' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Timestamped behavior observations</p>
                <button onClick={() => update({ behaviorObservations: [...form.behaviorObservations, { time: '', observation: '', level: 'neutral' }] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                  <Plus size={12} /> Add observation
                </button>
              </div>
              {form.behaviorObservations?.map((o: Observation, i: number) => (
                <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input value={o.time} onChange={e => update({ behaviorObservations: form.behaviorObservations.map((x: Observation, ix: number) => ix === i ? { ...x, time: e.target.value } : x) })} placeholder="Time (e.g. 09:00 AM)" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      <select value={o.level} onChange={e => update({ behaviorObservations: form.behaviorObservations.map((x: Observation, ix: number) => ix === i ? { ...x, level: e.target.value as any } : x) })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                        <option value="positive">Positive</option>
                        <option value="neutral">Neutral</option>
                        <option value="negative">Negative</option>
                      </select>
                    </div>
                    <button onClick={() => update({ behaviorObservations: form.behaviorObservations.filter((_: any, ix: number) => ix !== i) })} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                  </div>
                  <textarea value={o.observation} onChange={e => update({ behaviorObservations: form.behaviorObservations.map((x: Observation, ix: number) => ix === i ? { ...x, observation: e.target.value } : x) })} placeholder="Observation..." rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
                </div>
              ))}

              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Communication Notes</label>
                <textarea value={form.communicationNotes} onChange={e => update({ communicationNotes: e.target.value })} rows={3} placeholder="How the service user communicated today..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
              </div>
            </div>
          )}

          {activeTab === 'medication' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 flex items-center gap-1.5"><Pill size={12} /> Medications administered</p>
                <button onClick={() => update({ medicationTaken: [...(form.medicationTaken || []), { name: '', time: '', status: 'Taken' }] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                  <Plus size={12} /> Add medication
                </button>
              </div>
              {(form.medicationTaken || []).map((med: Medication, i: number) => (
                <div key={i} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <input value={med.name} onChange={e => update({ medicationTaken: form.medicationTaken.map((x: Medication, ix: number) => ix === i ? { ...x, name: e.target.value } : x) })} placeholder="Medication + dose" className="col-span-2 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                      <input value={med.time} onChange={e => update({ medicationTaken: form.medicationTaken.map((x: Medication, ix: number) => ix === i ? { ...x, time: e.target.value } : x) })} placeholder="Time" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                    </div>
                    <button onClick={() => update({ medicationTaken: form.medicationTaken.filter((_: any, ix: number) => ix !== i) })} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                  </div>
                  <select value={med.status} onChange={e => update({ medicationTaken: form.medicationTaken.map((x: Medication, ix: number) => ix === i ? { ...x, status: e.target.value } : x) })} className="mt-2 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                    <option>Taken</option>
                    <option>Refused</option>
                    <option>Missed</option>
                    <option>PRN Given</option>
                  </select>
                </div>
              ))}

              {form.vitalSigns && (
                <div className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Vital Signs</span>
                    <button onClick={() => update({ vitalSigns: null })} className="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input value={form.vitalSigns.bloodPressure} onChange={e => update({ vitalSigns: { ...form.vitalSigns, bloodPressure: e.target.value } })} placeholder="Blood Pressure (120/80)" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                    <input value={form.vitalSigns.heartRate} onChange={e => update({ vitalSigns: { ...form.vitalSigns, heartRate: e.target.value } })} placeholder="Heart Rate (72 bpm)" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                    <input value={form.vitalSigns.temperature} onChange={e => update({ vitalSigns: { ...form.vitalSigns, temperature: e.target.value } })} placeholder="Temperature (36.5°C)" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                    <input value={form.vitalSigns.timeChecked} onChange={e => update({ vitalSigns: { ...form.vitalSigns, timeChecked: e.target.value } })} placeholder="Time checked" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" />
                  </div>
                </div>
              )}
              {!form.vitalSigns && (
                <button onClick={() => update({ vitalSigns: { bloodPressure: '', heartRate: '', temperature: '', timeChecked: '' } })} className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:bg-gray-50">
                  + Add vital signs
                </button>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Staff Notes (main entry)</label>
                <textarea value={form.notes} onChange={e => update({ notes: e.target.value })} rows={4} placeholder="Detailed observations, interactions, incidents..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Staff Observations (summary)</label>
                <textarea value={form.staffObservations} onChange={e => update({ staffObservations: e.target.value })} rows={3} placeholder="Overall assessment of the day..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs text-gray-500 font-medium flex items-center gap-1.5"><AlertCircle size={12} /> Follow-up Actions Required</label>
                  <button onClick={() => update({ followUpRequired: [...(form.followUpRequired || []), ''] })} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Plus size={12} /> Add action
                  </button>
                </div>
                <div className="space-y-1.5">
                  {(form.followUpRequired || []).map((a: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <input value={a} onChange={e => update({ followUpRequired: form.followUpRequired.map((x: string, ix: number) => ix === i ? e.target.value : x) })} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400" placeholder="Action item..." />
                      <button onClick={() => update({ followUpRequired: form.followUpRequired.filter((_: any, ix: number) => ix !== i) })} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"><Trash2 size={12} /></button>
                    </div>
                  ))}
                  {(!form.followUpRequired || form.followUpRequired.length === 0) && (
                    <p className="text-xs text-gray-400 italic">No follow-up actions.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={save} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
