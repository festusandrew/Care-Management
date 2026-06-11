import { Modal } from './Modal';
import { useState } from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

interface QuickLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userId: number;
}

export function QuickLogModal({ isOpen, onClose, userName, userId }: QuickLogModalProps) {
  const [formData, setFormData] = useState({
    mood: '',
    behavior: '',
    activities: '',
    meals: '',
    sleep: '',
    notes: '',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quick log submitted:', { userId, ...formData });
    // Handle form submission
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const moods = [
    { value: 'happy', label: 'Happy', icon: Smile, color: 'text-green-600', bg: 'bg-green-100' },
    { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-amber-600', bg: 'bg-amber-100' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Quick Log - ${userName}`} size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Timestamp */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">Date & Time *</label>
          <input
            type="datetime-local"
            name="timestamp"
            value={formData.timestamp}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Mood Selection */}
        <div>
          <label className="block text-sm text-gray-700 mb-3">Mood *</label>
          <div className="grid grid-cols-3 gap-3">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, mood: mood.value })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.mood === mood.value
                      ? `${mood.bg} border-current ${mood.color}`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon size={32} className={`mx-auto mb-2 ${formData.mood === mood.value ? mood.color : 'text-gray-400'}`} />
                  <div className={`text-sm ${formData.mood === mood.value ? mood.color : 'text-gray-600'}`}>
                    {mood.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Behavior */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">Behavior</label>
          <select
            name="behavior"
            value={formData.behavior}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">Select behavior</option>
            <option value="cooperative">Cooperative</option>
            <option value="calm">Calm</option>
            <option value="engaged">Engaged</option>
            <option value="withdrawn">Withdrawn</option>
            <option value="agitated">Agitated</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>

        {/* Activities */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">Activities Participated</label>
          <input
            type="text"
            name="activities"
            value={formData.activities}
            onChange={handleChange}
            placeholder="e.g., Group therapy, Art class, Outdoor play"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Meals */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">Meals & Appetite</label>
          <select
            name="meals"
            value={formData.meals}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">Select appetite</option>
            <option value="ate-all">Ate all meals</option>
            <option value="ate-most">Ate most meals</option>
            <option value="ate-some">Ate some meals</option>
            <option value="poor-appetite">Poor appetite</option>
            <option value="refused">Refused meals</option>
          </select>
        </div>

        {/* Sleep */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">Sleep Quality</label>
          <select
            name="sleep"
            value={formData.sleep}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">Select sleep quality</option>
            <option value="excellent">Excellent (8+ hours)</option>
            <option value="good">Good (6-8 hours)</option>
            <option value="fair">Fair (4-6 hours)</option>
            <option value="poor">Poor (&lt; 4 hours)</option>
            <option value="restless">Restless night</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Any observations, concerns, or notable events"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Log Entry
          </button>
        </div>
      </form>
    </Modal>
  );
}