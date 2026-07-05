import { useState, useMemo } from 'react';
import { X, Search, ChevronRight, ChevronLeft, Check, Plus, Tag } from 'lucide-react';
import svgPaths from '../imports/svg-epep64l0za';

interface NewCarePlanModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (data: { serviceUser: ServiceUser; planType: string; priority: string; notes: string }) => void;
}

interface ServiceUser {
  id: string;
  name: string;
  userId: string;
  location?: string;
}

const serviceUsers: ServiceUser[] = [
  { id: 'SU001', name: 'Sarah Johnson', userId: 'SU001', location: 'Riverside House' },
  { id: 'SU002', name: 'Michael Chen', userId: 'SU002', location: 'Oak Tree Lodge' },
  { id: 'SU003', name: 'Emily Williams', userId: 'SU003', location: 'Riverside House' },
  { id: 'SU004', name: 'Robert Taylor', userId: 'SU004', location: 'Meadow View' },
  { id: 'SU005', name: 'Jessica Martinez', userId: 'SU005', location: 'Oak Tree Lodge' },
  { id: 'SU006', name: 'Lucas Parker', userId: 'SU006', location: 'Meadow View' },
];

interface PlanType {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  color: string;
  bg: string;
}

const planCategories = ['Core Plans', 'Health & Clinical', 'Behaviour & Mental Health', 'Daily Living', 'Custom'];

const planTypes: PlanType[] = [
  // Core Plans
  { id: 'person-centred', name: 'Person-Centred Care Plan', description: 'Holistic, individualised care built around the person\'s preferences and goals', icon: '🧑‍🤝‍🧑', category: 'Core Plans', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  { id: 'needs-assessment', name: 'Needs Assessment', description: 'Comprehensive assessment of support needs across all domains', icon: '📋', category: 'Core Plans', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  { id: 'goals-outcomes', name: 'Goals & Outcomes Plan', description: 'Defines measurable goals, milestones and desired outcomes', icon: '🎯', category: 'Core Plans', color: 'text-violet-700', bg: 'bg-violet-50 border-violet-200' },
  { id: 'support-plan', name: 'Support Plan', description: 'Light-touch support requirements for lower-need individuals', icon: '🤲', category: 'Core Plans', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' },
  { id: 'risk-management', name: 'Risk Management Plan', description: 'Identifies, assesses and mitigates risks to the individual', icon: '⚠️', category: 'Core Plans', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  { id: 'daily-support', name: 'Daily Support Instructions', description: 'Step-by-step daily routines and staff guidance for each shift', icon: '📅', category: 'Core Plans', color: 'text-cyan-700', bg: 'bg-cyan-50 border-cyan-200' },

  // Health & Clinical
  { id: 'medication-support', name: 'Medication Support Plan', description: 'Manages medication routines, administration and PRN guidance', icon: '💊', category: 'Health & Clinical', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
  { id: 'nutrition', name: 'Nutrition & Hydration Plan', description: 'Dietary requirements, food textures, fluid intake and mealtime support', icon: '🥗', category: 'Health & Clinical', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  { id: 'mobility', name: 'Mobility & Moving Plan', description: 'Manual handling, mobility aids, repositioning and transfer guidance', icon: '🦽', category: 'Health & Clinical', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  { id: 'continence', name: 'Continence Support Plan', description: 'Continence management, toileting routines and skin integrity', icon: '🏥', category: 'Health & Clinical', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
  { id: 'sleep', name: 'Sleep Support Plan', description: 'Sleep patterns, night-time routines and staff overnight guidance', icon: '🌙', category: 'Health & Clinical', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  { id: 'personal-care', name: 'Personal Care Plan', description: 'Hygiene, grooming, dressing and personal care preferences', icon: '🛁', category: 'Health & Clinical', color: 'text-sky-700', bg: 'bg-sky-50 border-sky-200' },

  // Behaviour & Mental Health
  { id: 'behaviour-support', name: 'Behaviour Support Plan', description: 'Positive behaviour strategies, triggers, de-escalation and interventions', icon: '🧠', category: 'Behaviour & Mental Health', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
  { id: 'mental-health', name: 'Mental Health Support Plan', description: 'Mental health needs, crisis plans, therapeutic support and wellbeing goals', icon: '💙', category: 'Behaviour & Mental Health', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  { id: 'crisis-plan', name: 'Crisis & Contingency Plan', description: 'Emergency protocols, crisis contacts, escalation pathways', icon: '🚨', category: 'Behaviour & Mental Health', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
  { id: 'communication', name: 'Communication Plan', description: 'Preferred communication styles, AAC, language needs and social interaction', icon: '💬', category: 'Behaviour & Mental Health', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' },

  // Daily Living
  { id: 'education-employment', name: 'Education & Employment Plan', description: 'Learning goals, vocational interests and community participation', icon: '📚', category: 'Daily Living', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  { id: 'leisure-activities', name: 'Leisure & Activities Plan', description: 'Hobbies, interests, community activities and social opportunities', icon: '🎨', category: 'Daily Living', color: 'text-pink-700', bg: 'bg-pink-50 border-pink-200' },
  { id: 'financial', name: 'Financial & Independence Plan', description: 'Money management, budgeting support and financial safeguarding', icon: '💰', category: 'Daily Living', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200' },
  { id: 'transition', name: 'Transition Plan', description: 'Planned transitions between placements, services or life stages', icon: '🔄', category: 'Daily Living', color: 'text-violet-700', bg: 'bg-violet-50 border-violet-200' },
];

const emojiOptions = ['📄','🗂️','🧩','🌟','🔵','🟢','🟡','🟠','🔴','🩺','🏠','🤝','💡','📌','🛡️','⚡','🌿','🔧','🎓','🧭'];

export function NewCarePlanModal({ show, onClose, onCreate }: NewCarePlanModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<ServiceUser | null>(null);
  const [selectedPlanType, setSelectedPlanType] = useState<PlanType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Core Plans');
  const [priority, setPriority] = useState<'routine' | 'urgent' | 'immediate'>('routine');
  const [notes, setNotes] = useState('');
  const [typeSearch, setTypeSearch] = useState('');

  // State for visual error feedback
  const [showErrors, setShowErrors] = useState(false);

  // Validation per step
  const isStepValid = useMemo(() => {
    if (step === 1) return !!selectedPlanType;
    if (step === 2) return !!selectedUser && !!selectedPlanType;
    return true;
  }, [step, selectedPlanType, selectedUser]);

  // Handler for Continue (step 1)
  const handleContinue = () => {
    if (selectedPlanType) {
      setStep(2);
      setShowErrors(false);
    } else {
      setShowErrors(true);
    }
  };

  // Handler for final Create (step 2)
  const handleCreatePlan = () => {
    if (selectedUser && selectedPlanType) {
      onCreate({ serviceUser: selectedUser, planType: selectedPlanType.name, priority, notes });
      handleClose();
    } else {
      setShowErrors(true);
    }
  };

  // Custom plan type creation
  const [customTypes, setCustomTypes] = useState<PlanType[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeDesc, setNewTypeDesc] = useState('');
  const [newTypeCategory, setNewTypeCategory] = useState('Custom');
  const [newTypeIcon, setNewTypeIcon] = useState('📄');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const allTypes = [...planTypes, ...customTypes];

  const filteredUsers = serviceUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.userId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTypes = allTypes.filter(t =>
    typeSearch
      ? t.name.toLowerCase().includes(typeSearch.toLowerCase()) || t.description.toLowerCase().includes(typeSearch.toLowerCase())
      : t.category === selectedCategory
  );

  const handleSaveCustomType = () => {
    if (!newTypeName.trim()) return;
    const newType: PlanType = {
      id: `custom-${Date.now()}`,
      name: newTypeName.trim(),
      description: newTypeDesc.trim() || 'Custom care plan type',
      icon: newTypeIcon,
      category: newTypeCategory,
      color: 'text-gray-700',
      bg: 'bg-gray-50 border-gray-200',
    };
    setCustomTypes(prev => [...prev, newType]);
    setSelectedPlanType(newType);
    setSelectedCategory(newTypeCategory);
    setShowCreateForm(false);
    setNewTypeName('');
    setNewTypeDesc('');
    setNewTypeCategory('Custom');
    setNewTypeIcon('📄');
    setShowEmojiPicker(false);
  };

  const handleClose = () => {
    setStep(1);
    setSearchQuery('');
    setSelectedUser(null);
    setSelectedPlanType(null);
    setSelectedCategory('Core Plans');
    setPriority('routine');
    setNotes('');
    setTypeSearch('');
    setShowCreateForm(false);
    setNewTypeName('');
    setNewTypeDesc('');
    setNewTypeCategory('Custom');
    setNewTypeIcon('📄');
    setShowEmojiPicker(false);
    onClose();
  };

  const handleSubmit = () => {
    if (selectedUser && selectedPlanType) {
      onCreate({ serviceUser: selectedUser, planType: selectedPlanType.name, priority, notes });
      handleClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p2041c0f0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p35746cc0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M9 9H6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M18 13H6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M18 17H6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h2 className="text-base text-gray-900">Create New Care Plan</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Step {step} of 2 — {step === 1 ? 'Choose plan type' : 'Select service user & details'}
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 px-6 pt-4">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                step > s ? 'bg-blue-600 text-white' : step === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {step > s ? <Check size={12} /> : s}
              </div>
              <span className={`text-xs ${step >= s ? 'text-gray-700' : 'text-gray-400'}`}>
                {s === 1 ? 'Plan Type' : 'Details'}
              </span>
              {s < 2 && <div className="w-8 h-px bg-gray-200 mx-1" />}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* ── STEP 1: Choose plan type ── */}
          {step === 1 && (
            <div>
              {/* Search across all types */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-100 mb-4">
                <Search size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search plan types..."
                  value={typeSearch}
                  onChange={e => setTypeSearch(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none text-gray-700"
                />
                {typeSearch && (
                  <button onClick={() => setTypeSearch('')} className="text-gray-400 hover:text-gray-600">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Category tabs */}
              {!typeSearch && (
                <div className="flex gap-1 mb-4 flex-wrap">
                  {planCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs rounded-full transition-colors border ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {typeSearch && (
                <p className="text-xs text-gray-500 mb-3">{filteredTypes.length} result{filteredTypes.length !== 1 ? 's' : ''} for "{typeSearch}"</p>
              )}

              {/* Create new plan type form */}
              {showCreateForm ? (
                <div className="mb-4 p-4 border-2 border-blue-200 bg-blue-50 rounded-xl space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-blue-900">New Plan Type</span>
                    <button onClick={() => { setShowCreateForm(false); setShowEmojiPicker(false); }} className="p-1 hover:bg-blue-100 rounded-lg transition-colors">
                      <X size={14} className="text-blue-600" />
                    </button>
                  </div>

                  {/* Icon picker */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">Icon</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(p => !p)}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                      >
                        <span className="text-xl leading-none">{newTypeIcon}</span>
                        <span className="text-xs text-gray-500">Change icon</span>
                      </button>
                      {showEmojiPicker && (
                        <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 flex flex-wrap gap-1 w-56">
                          {emojiOptions.map(e => (
                            <button
                              key={e}
                              onClick={() => { setNewTypeIcon(e); setShowEmojiPicker(false); }}
                              className={`w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-lg transition-colors ${newTypeIcon === e ? 'bg-blue-100' : ''}`}
                            >
                              {e}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={newTypeName}
                      onChange={e => setNewTypeName(e.target.value)}
                      placeholder="e.g. End of Life Care Plan"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">Description</label>
                    <input
                      type="text"
                      value={newTypeDesc}
                      onChange={e => setNewTypeDesc(e.target.value)}
                      placeholder="Brief description of this plan type..."
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">Category</label>
                    <select
                      value={newTypeCategory}
                      onChange={e => setNewTypeCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-blue-400 transition-colors"
                    >
                      {planCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleSaveCustomType}
                      disabled={!newTypeName.trim()}
                      className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Check size={13} /> Save & Select
                    </button>
                    <button
                      onClick={() => { setShowCreateForm(false); setShowEmojiPicker(false); }}
                      className="px-4 py-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setShowCreateForm(true); setTypeSearch(''); }}
                  className="w-full flex items-center gap-2 px-4 py-3 mb-4 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  <Plus size={16} />
                  Create a new plan type
                </button>
              )}

              {/* Plan type grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedPlanType(type)}
                    className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-sm ${
                      selectedPlanType?.id === type.id
                        ? 'border-blue-600 bg-blue-50 shadow-sm'
                        : `border-gray-200 hover:border-blue-200 bg-white`
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl shrink-0 leading-none mt-0.5">{type.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-900">{type.name}</span>
                          {selectedPlanType?.id === type.id && (
                            <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                              <Check size={10} className="text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{type.description}</p>
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          {typeSearch && (
                            <span className={`px-2 py-0.5 text-xs rounded-full border ${type.bg} ${type.color}`}>
                              {type.category}
                            </span>
                          )}
                          {customTypes.some(c => c.id === type.id) && (
                            <span className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-violet-50 border border-violet-200 text-violet-700">
                              <Tag size={9} /> Custom
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {filteredTypes.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <Search size={28} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No plan types match your search</p>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: Service user + details ── */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Selected plan type summary */}
              {selectedPlanType && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <span className="text-2xl">{selectedPlanType.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-blue-900">{selectedPlanType.name}</div>
                    <div className="text-xs text-blue-600">{selectedPlanType.category}</div>
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs text-blue-600 hover:text-blue-800 underline shrink-0">
                    Change
                  </button>
                </div>
              )}

              {/* Service user */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Service User <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-100 mb-2">
                  <Search size={16} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none text-gray-700"
                  />
                </div>
                {showErrors && !selectedUser && (
                  <p className="text-xs text-red-600 mt-1">Please select a service user.</p>
                )}
                <div className="border border-gray-100 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                  {filteredUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors ${
                        selectedUser?.id === user.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-xs text-blue-700">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.userId} · {user.location}</p>
                      </div>
                      {selectedUser?.id === user.id && (
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                          <Check size={11} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                  {filteredUsers.length === 0 && (
                    <div className="px-4 py-6 text-center text-gray-400 text-sm">No service users found</div>
                  )}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Priority</label>
                <div className="flex gap-2">
                  {([
                    { value: 'routine', label: 'Routine', color: 'border-gray-200 text-gray-700', active: 'border-blue-600 bg-blue-50 text-blue-700' },
                    { value: 'urgent', label: 'Urgent', color: 'border-gray-200 text-gray-700', active: 'border-amber-500 bg-amber-50 text-amber-700' },
                    { value: 'immediate', label: 'Immediate', color: 'border-gray-200 text-gray-700', active: 'border-red-500 bg-red-50 text-red-700' },
                  ] as const).map(p => (
                    <button
                      key={p.value}
                      onClick={() => setPriority(p.value)}
                      className={`flex-1 py-2.5 text-sm border-2 rounded-xl transition-all ${
                        priority === p.value ? p.active : p.color + ' hover:border-gray-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Initial Notes <span className="text-gray-400">(optional)</span></label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Any initial context, triggers, or background for this care plan..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 resize-none outline-none focus:border-blue-300 transition-colors"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <button
            onClick={step === 1 ? handleClose : () => setStep(1)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {step === 2 && <ChevronLeft size={16} />}
            {step === 1 ? 'Cancel' : 'Back'}
          </button>

          {step === 1 ? (
            <>
              <button
                onClick={handleContinue}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition-colors"
              >
                Continue
                <ChevronRight size={16} />
              </button>
              {showErrors && !selectedPlanType && (
                <p className="text-xs text-red-600 mt-2">Please select a plan type before continuing.</p>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleCreatePlan}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Check size={16} />
                Create Care Plan
              </button>
              {showErrors && (!selectedUser || !selectedPlanType) && (
                <p className="text-xs text-red-600 mt-2">Please select a service user and plan type before creating the care plan.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
