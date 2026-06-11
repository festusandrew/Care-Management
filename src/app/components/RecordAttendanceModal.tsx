import { X, CheckCircle, Users, User, Calendar, Clock, MapPin, Star, AlertTriangle, ThumbsUp, ThumbsDown, Meh, Smile, Frown, Save } from 'lucide-react';
import { useState } from 'react';

interface RecordAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: any;
  onSave: (data: any) => void;
}

export function RecordAttendanceModal({ isOpen, onClose, activity, onSave }: RecordAttendanceModalProps) {
  const [attendanceData, setAttendanceData] = useState<any>({});
  const [overallNotes, setOverallNotes] = useState('');
  const [activityCompleted, setActivityCompleted] = useState(true);
  const [completionNotes, setCompletionNotes] = useState('');

  if (!isOpen || !activity) return null;

  const initializeAttendance = (userId: string) => {
    if (!attendanceData[userId]) {
      setAttendanceData({
        ...attendanceData,
        [userId]: {
          attended: true,
          engagement: 'high',
          mood: 'positive',
          participation: 5,
          notes: '',
          behaviours: [],
          achievements: ''
        }
      });
    }
  };

  const updateAttendance = (userId: string, field: string, value: any) => {
    setAttendanceData({
      ...attendanceData,
      [userId]: {
        ...(attendanceData[userId] || {}),
        [field]: value
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      activityId: activity.id,
      attendanceData,
      overallNotes,
      activityCompleted,
      completionNotes,
      recordedAt: new Date().toISOString()
    });
    onClose();
  };

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-700 border-green-300';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'low': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'positive': return <Smile className="text-green-600" size={18} />;
      case 'neutral': return <Meh className="text-amber-600" size={18} />;
      case 'negative': return <Frown className="text-red-600" size={18} />;
      default: return <Meh className="text-gray-400" size={18} />;
    }
  };

  const attendedCount = Object.values(attendanceData).filter((a: any) => a.attended).length;
  const totalParticipants = activity.participants?.length || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-green-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-lg p-3 shadow-md">
                <CheckCircle className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Record Attendance</h2>
                <p className="text-sm text-gray-600 mt-1">{activity.name}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Calendar size={12} />
                    {activity.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Clock size={12} />
                    {activity.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin size={12} />
                    {activity.location}
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

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          {/* Activity Status */}
          <section className="mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activityCompleted}
                  onChange={(e) => setActivityCompleted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-green-600 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Activity Completed Successfully</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Uncheck if the activity was cancelled, interrupted, or not completed as planned
                  </p>
                  {!activityCompleted && (
                    <textarea
                      value={completionNotes}
                      onChange={(e) => setCompletionNotes(e.target.value)}
                      className="w-full mt-3 px-3 py-2 border border-blue-300 rounded-lg resize-none text-sm"
                      rows={2}
                      placeholder="Please explain why the activity was not completed..."
                      required
                    />
                  )}
                </div>
              </label>
            </div>
          </section>

          {/* Attendance Summary */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Attendance Summary</h3>
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{attendedCount}</span> / {totalParticipants} attended
              </div>
            </div>
          </section>

          {/* Individual Attendance Records */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Individual Attendance & Engagement</h3>
            <div className="space-y-4">
              {activity.participants?.map((participant: string, index: number) => {
                const userAttendance = attendanceData[participant] || {
                  attended: true,
                  engagement: 'high',
                  mood: 'positive',
                  participation: 5,
                  notes: '',
                  behaviours: [],
                  achievements: ''
                };

                if (!attendanceData[participant]) {
                  initializeAttendance(participant);
                }

                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    {/* Participant Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                          {participant.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{participant}</h4>
                          <p className="text-xs text-gray-600">Service User ID: SU-{(index + 1).toString().padStart(4, '0')}</p>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={userAttendance.attended}
                          onChange={(e) => updateAttendance(participant, 'attended', e.target.checked)}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Attended</span>
                      </label>
                    </div>

                    {userAttendance.attended && (
                      <div className="space-y-4 pl-13">
                        {/* Engagement Level */}
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Engagement Level
                          </label>
                          <div className="flex items-center gap-2">
                            {['high', 'medium', 'low'].map((level) => (
                              <button
                                key={level}
                                type="button"
                                onClick={() => updateAttendance(participant, 'engagement', level)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                  userAttendance.engagement === level
                                    ? getEngagementColor(level)
                                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Mood */}
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Mood During Activity
                          </label>
                          <div className="flex items-center gap-2">
                            {[
                              { value: 'positive', label: 'Positive', icon: Smile },
                              { value: 'neutral', label: 'Neutral', icon: Meh },
                              { value: 'negative', label: 'Negative', icon: Frown }
                            ].map((mood) => (
                              <button
                                key={mood.value}
                                type="button"
                                onClick={() => updateAttendance(participant, 'mood', mood.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                  userAttendance.mood === mood.value
                                    ? mood.value === 'positive' ? 'bg-green-100 text-green-700 border-green-300' :
                                      mood.value === 'neutral' ? 'bg-amber-100 text-amber-700 border-amber-300' :
                                      'bg-red-100 text-red-700 border-red-300'
                                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                <mood.icon size={16} />
                                {mood.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Participation Rating */}
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Participation Rating
                          </label>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  type="button"
                                  onClick={() => updateAttendance(participant, 'participation', rating)}
                                  className="transition-transform hover:scale-110"
                                >
                                  <Star
                                    size={24}
                                    className={rating <= userAttendance.participation
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-gray-300'
                                    }
                                  />
                                </button>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {userAttendance.participation}/5
                            </span>
                          </div>
                        </div>

                        {/* Observable Behaviours */}
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Observable Behaviours
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {['Cooperative', 'Engaged', 'Focused', 'Disruptive', 'Withdrawn', 'Enthusiastic', 'Anxious'].map((behaviour) => {
                              const isSelected = userAttendance.behaviours?.includes(behaviour) || false;
                              return (
                                <button
                                  key={behaviour}
                                  type="button"
                                  onClick={() => {
                                    const currentBehaviours = userAttendance.behaviours || [];
                                    const newBehaviours = isSelected
                                      ? currentBehaviours.filter((b: string) => b !== behaviour)
                                      : [...currentBehaviours, behaviour];
                                    updateAttendance(participant, 'behaviours', newBehaviours);
                                  }}
                                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                    isSelected
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                  }`}
                                >
                                  {behaviour}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Achievements / Highlights */}
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Achievements / Highlights
                          </label>
                          <input
                            type="text"
                            value={userAttendance.achievements}
                            onChange={(e) => updateAttendance(participant, 'achievements', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Any notable achievements or positive moments"
                          />
                        </div>

                        {/* Individual Notes */}
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Additional Notes
                          </label>
                          <textarea
                            value={userAttendance.notes}
                            onChange={(e) => updateAttendance(participant, 'notes', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none text-sm"
                            rows={2}
                            placeholder="Any additional observations or concerns"
                          />
                        </div>
                      </div>
                    )}

                    {!userAttendance.attended && (
                      <div className="pl-13">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <p className="text-xs text-amber-800">
                            Participant marked as absent. Please document the reason in the overall activity notes.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Overall Activity Notes */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Overall Activity Notes</h3>
            <textarea
              value={overallNotes}
              onChange={(e) => setOverallNotes(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
              rows={4}
              placeholder="General observations about the activity, group dynamics, any issues encountered, modifications made, etc."
            />
          </section>

          {/* Warning */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-green-600 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-900">Attendance record will be finalized</p>
                <p className="text-xs text-gray-700 mt-1">
                  This information will be added to each participant's care record and cannot be edited after submission.
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Facilitator: <span className="font-medium text-gray-900">{activity.facilitator}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save size={18} />
                Save Attendance Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
