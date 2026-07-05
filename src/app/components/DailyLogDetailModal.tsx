import { X, User, Calendar, Clock, Smile, Meh, Frown, FileText, Utensils, Moon, Activity, AlertCircle, CheckCircle2, Edit } from 'lucide-react';

interface DailyLogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: any;
  onEdit?: () => void;
}

export function DailyLogDetailModal({ isOpen, onClose, log, onEdit }: DailyLogDetailModalProps) {
  if (!isOpen || !log) return null;

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy':
        return <Smile className="text-green-600" size={24} />;
      case 'neutral':
        return <Meh className="text-amber-600" size={24} />;
      case 'sad':
        return <Frown className="text-red-600" size={24} />;
      default:
        return <Meh className="text-gray-600" size={24} />;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy':
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' };
      case 'neutral':
        return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' };
      case 'sad':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700' };
    }
  };

  const moodColors = getMoodColor(log.mood);

  // Prefer edited fields on the log, fall back to sensible defaults for older records
  const detailedLog = {
    ...log,
    medicationTaken: log.medicationTaken ?? (log.type === 'Medication' ? [
      { name: 'Sertraline 50mg', time: '08:00 AM', status: 'Taken' },
      { name: 'Vitamin D 1000IU', time: '08:00 AM', status: 'Taken' }
    ] : null),
    mealDetails: log.mealDetails ?? {
      breakfast: { consumed: '100%', time: '08:30 AM', notes: 'Full portion of cereal and toast' },
      lunch: { consumed: '80%', time: '12:30 PM', notes: 'Most of sandwich, left some salad' },
      dinner: { consumed: '90%', time: '18:00 PM', notes: 'Enjoyed pasta dish' },
      snacks: { consumed: 'Yes', notes: 'Apple in afternoon, biscuit in evening' }
    },
    sleepDetails: log.sleepDetails ?? {
      bedtime: '22:00',
      wakeTime: '07:00',
      quality: log.sleep?.includes('Good') || log.sleep?.includes('Excellent') ? 'Good' : 'Fair',
      interruptions: log.sleep?.includes('Good') || log.sleep?.includes('Excellent') ? 'None' : 'Woke 2 times',
      notes: 'Settled well. No disturbances.'
    },
    activitiesDetailed: log.activitiesDetailed ?? [
      { time: '10:00 AM', activity: 'Group therapy session', duration: '60 mins', participation: 'Active' },
      { time: '14:00 PM', activity: 'Art class', duration: '90 mins', participation: 'Engaged' },
      { time: '16:00 PM', activity: 'Free time / Reading', duration: '60 mins', participation: 'Independent' }
    ],
    behaviorObservations: log.behaviorObservations ?? [
      { time: '09:00 AM', observation: 'Calm and cooperative during morning routine', level: 'positive' },
      { time: '11:30 AM', observation: 'Showed good engagement in therapy', level: 'positive' },
      { time: '15:00 PM', observation: 'Slight frustration during art activity but managed well', level: 'neutral' }
    ],
    vitalSigns: log.vitalSigns ?? (log.type === 'Medication' ? {
      bloodPressure: '120/80',
      heartRate: '72 bpm',
      temperature: '36.5°C',
      timeChecked: '08:00 AM'
    } : null),
    communicationNotes: log.communicationNotes ?? 'Verbal communication clear. Expressed feelings appropriately. Used calming strategies when needed.',
    staffObservations: log.staffObservations ?? 'Overall positive day. Sarah demonstrated good self-regulation skills and engaged well with structured activities.',
    followUpRequired: (log.followUpRequired && log.followUpRequired.length > 0) ? log.followUpRequired
      : (log.riskLevel === 'amber' || log.riskLevel === 'red') ? [
        'Monitor mood patterns over next few days',
        'Continue with current activity schedule',
        'Review progress in next care team meeting'
      ] : null
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-md">
                {log.userPhoto}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{log.serviceUser}</h2>
                <p className="text-sm text-gray-600 mt-1">Daily Log Entry</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Calendar size={14} />
                    {log.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Clock size={14} />
                    {log.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <User size={14} />
                    {log.staff}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          {/* Mood & Behavior Summary */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Mood & Behavior Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className={`${moodColors.bg} border ${moodColors.border} rounded-lg p-4`}>
                <div className="flex items-center gap-3 mb-2">
                  {getMoodIcon(log.mood)}
                  <div>
                    <p className="text-xs text-gray-600">Current Mood</p>
                    <p className={`text-sm font-bold ${moodColors.text} capitalize`}>{log.mood}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-700 mt-2">
                  {log.mood === 'happy' ? 'Positive mood observed throughout the day' : 
                   log.mood === 'neutral' ? 'Stable mood, no significant concerns' :
                   'May require additional support and monitoring'}
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="text-blue-600" size={24} />
                  <div>
                    <p className="text-xs text-gray-600">Behavior</p>
                    <p className="text-sm font-bold text-gray-900">{log.behavior}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-700 mt-2">{detailedLog.staffObservations}</p>
              </div>
            </div>
          </section>

          {/* Medication (if applicable) */}
          {detailedLog.medicationTaken && (
            <section className="mb-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Medication Administration</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="space-y-3">
                  {detailedLog.medicationTaken.map((med: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between pb-3 border-b border-green-200 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{med.name}</p>
                        <p className="text-xs text-gray-600">Administered at {med.time}</p>
                      </div>
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle2 size={14} />
                        {med.status}
                      </span>
                    </div>
                  ))}
                </div>
                {detailedLog.vitalSigns && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <p className="text-xs font-medium text-gray-900 mb-2">Vital Signs (checked at {detailedLog.vitalSigns.timeChecked})</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-gray-600">Blood Pressure</p>
                        <p className="text-sm font-medium text-gray-900">{detailedLog.vitalSigns.bloodPressure}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Heart Rate</p>
                        <p className="text-sm font-medium text-gray-900">{detailedLog.vitalSigns.heartRate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Temperature</p>
                        <p className="text-sm font-medium text-gray-900">{detailedLog.vitalSigns.temperature}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Meals & Nutrition */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Meals & Nutrition</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(detailedLog.mealDetails).map(([mealType, details]: [string, any]) => (
                  <div key={mealType} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Utensils className="text-blue-600" size={16} />
                      <p className="text-sm font-bold text-gray-900 capitalize">{mealType}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Consumed:</span> {details.consumed}
                      </p>
                      {details.time && (
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Time:</span> {details.time}
                        </p>
                      )}
                      <p className="text-xs text-gray-700">{details.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sleep */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Sleep Pattern</h3>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="grid grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Bedtime</p>
                  <div className="flex items-center gap-1.5">
                    <Moon className="text-indigo-600" size={16} />
                    <p className="text-sm font-medium text-gray-900">{detailedLog.sleepDetails.bedtime}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Wake Time</p>
                  <div className="flex items-center gap-1.5">
                    <Clock className="text-indigo-600" size={16} />
                    <p className="text-sm font-medium text-gray-900">{detailedLog.sleepDetails.wakeTime}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Quality</p>
                  <p className="text-sm font-medium text-gray-900">{detailedLog.sleepDetails.quality}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Interruptions</p>
                  <p className="text-sm font-medium text-gray-900">{detailedLog.sleepDetails.interruptions}</p>
                </div>
              </div>
              <p className="text-xs text-gray-700 bg-white rounded p-2 border border-indigo-200">{detailedLog.sleepDetails.notes}</p>
            </div>
          </section>

          {/* Activities */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Daily Activities</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="space-y-3">
                {detailedLog.activitiesDetailed.map((activity: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-2">
                        <Clock className="text-blue-600 mt-0.5" size={16} />
                        <div>
                          <p className="text-sm font-bold text-gray-900">{activity.activity}</p>
                          <p className="text-xs text-gray-600">Started at {activity.time} • Duration: {activity.duration}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {activity.participation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Behavioral Observations */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Behavioral Observations</h3>
            <div className="space-y-2">
              {detailedLog.behaviorObservations.map((obs: any, idx: number) => (
                <div key={idx} className={`rounded-lg p-3 border ${
                  obs.level === 'positive' ? 'bg-green-50 border-green-200' :
                  obs.level === 'negative' ? 'bg-red-50 border-red-200' :
                  'bg-amber-50 border-amber-200'
                }`}>
                  <div className="flex items-start gap-2">
                    <Clock size={14} className="text-gray-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">{obs.time}</p>
                      <p className="text-sm text-gray-900">{obs.observation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Communication */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Communication & Interaction</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-900">{detailedLog.communicationNotes}</p>
            </div>
          </section>

          {/* Staff Notes */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Staff Notes</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <FileText className="text-gray-500 mt-0.5" size={18} />
                <p className="text-sm text-gray-900">{log.notes}</p>
              </div>
            </div>
          </section>

          {/* Follow-up Required */}
          {detailedLog.followUpRequired && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-4">Follow-up Actions Required</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="text-amber-600 mt-0.5" size={18} />
                  <p className="text-sm font-medium text-gray-900">The following actions are recommended:</p>
                </div>
                <ul className="space-y-2 ml-9">
                  {detailedLog.followUpRequired.map((action: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-900">{action}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50 sticky bottom-0">
          <div className="text-xs text-gray-600">
            Log ID: DL-{log.id.toString().padStart(6, '0')} • Recorded by {log.staff} on {log.date} at {log.time}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => { onClose(); onEdit?.(); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit size={18} />
              Edit Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}