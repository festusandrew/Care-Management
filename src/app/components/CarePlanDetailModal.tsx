import { X, FileText, AlertTriangle, Shield, Calendar, User, Users, Pill, Clock, CheckCircle2, Edit } from 'lucide-react';
import svgPaths from '../imports/svg-x3gk7n5peu';

interface CarePlanDetailModalProps {
  show: boolean;
  onClose: () => void;
  carePlan: any;
}

export function CarePlanDetailModal({ show, onClose, carePlan }: CarePlanDetailModalProps) {
  if (!show || !carePlan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
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
                <span className="px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-600">v2.1</span>
              </div>
              <p className="text-sm text-gray-600">{carePlan.id} • {carePlan.planType}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          {/* Basic Information */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Basic Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Service User</p>
                <p className="text-sm font-medium text-gray-900">{carePlan.serviceUser}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Date of Birth</p>
                <p className="text-sm font-medium text-gray-900">15 March 1985</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Primary Diagnosis</p>
                <p className="text-sm font-medium text-gray-900">Autism Spectrum Disorder, Anxiety</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">NHS Number</p>
                <p className="text-sm font-medium text-gray-900">485 657 3827</p>
              </div>
            </div>
          </section>

          {/* Medical & Personal Information */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Medical & Personal Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Communication</p>
                <p className="text-sm text-gray-900">Verbal with some support needed. Uses visual aids and communication cards when anxious.</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Mobility</p>
                <p className="text-sm text-gray-900">Fully mobile, no assistance required.</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Dietary Requirements</p>
                <p className="text-sm text-gray-900">No specific dietary restrictions. Prefers vegetarian options. Dislikes strong-smelling foods.</p>
              </div>
            </div>
          </section>

          {/* Risk Assessments */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Risk Assessments</h3>
              <button className="text-blue-600 text-sm hover:underline">View All</button>
            </div>
            
            {/* Low Risk */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 rounded-full p-1.5 mt-0.5">
                  <Shield className="text-white" size={14} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Falls Risk</h4>
                  <p className="text-xs text-gray-700 mb-2">Low risk - fully mobile with good balance</p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Clear pathways maintained in living areas</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Good lighting throughout residence</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Non-slip mats in bathroom</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Regular mobility assessments every 6 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Risk */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
              <div className="flex items-start gap-3">
                <div className="bg-green-600 rounded-full p-1.5 mt-0.5">
                  <Shield className="text-white" size={14} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Medication Management</h4>
                  <p className="text-xs text-gray-700 mb-2">Medium risk - requires supervised administration</p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">All medications stored in locked cabinet</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Staff to administer and record all medications</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Weekly medication reviews with key worker</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Monthly pharmacy consultation</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Emergency contact card carried at all times</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* High Risk */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-600 rounded-full p-1.5 mt-0.5">
                  <AlertTriangle className="text-white" size={14} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Anxiety & Behavioral Support</h4>
                  <p className="text-xs text-gray-700 mb-2">Requires proactive monitoring and intervention strategies</p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Regular routine maintained to minimize anxiety</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Advanced notice given for any changes to schedule</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Quiet space available for de-escalation</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Staff trained in de-escalation techniques</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Use visual anxiety scale to monitor stress levels</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Calming activities available (music, art, sensory items)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Weekly psychology sessions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Goals and Objectives */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Goals and Objectives</h3>
              <button className="text-blue-600 text-sm hover:underline">Edit Goals</button>
            </div>
            <div className="space-y-3">
              {[
                {
                  goal: 'Increase independence in daily living skills',
                  progress: 'In Progress',
                  target: 'June 2026',
                  description: 'Sarah will prepare at least 3 simple meals independently per week with minimal prompting.'
                },
                {
                  goal: 'Develop social connections',
                  progress: 'On Track',
                  target: 'December 2025',
                  description: 'Attend community group activities twice per month and initiate conversation with at least one peer.'
                },
                {
                  goal: 'Manage anxiety symptoms',
                  progress: 'In Progress',
                  target: 'Ongoing',
                  description: 'Use coping strategies independently when experiencing mild anxiety, reducing escalation incidents.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="text-blue-600 mt-0.5" size={16} />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{item.goal}</h4>
                        <p className="text-xs text-gray-700 mt-1">{item.description}</p>
                      </div>
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
              {[
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
                { time: '10:00 PM', activity: 'Bedtime' }
              ].map((item, idx) => (
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

          {/* Care Team & Responsibilities */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Care Team & Responsibilities</h3>
            <div className="space-y-3">
              {[
                {
                  role: 'Lead Support Worker',
                  name: 'Emma Thompson',
                  responsibilities: ['Primary point of contact', 'Coordinate care delivery', 'Monthly care plan reviews']
                },
                {
                  role: 'Care Manager',
                  name: 'Dr. James Wilson',
                  responsibilities: ['Overall care oversight', 'Quarterly reviews', 'Family liaison']
                },
                {
                  role: 'Clinical Psychologist',
                  name: 'Sarah Martinez',
                  responsibilities: ['Weekly therapy sessions', 'Behavioral support strategies', 'Crisis intervention planning']
                }
              ].map((member, idx) => (
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
                      {member.responsibilities.map((resp, ridx) => (
                        <li key={ridx} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                          <p className="text-xs text-gray-700">{resp}</p>
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
              {[
                { date: '1 Dec 2025', reviewer: 'Emma Thompson', status: 'Completed', notes: 'All goals reviewed and updated. Sarah making good progress.' },
                { date: '1 Sep 2025', reviewer: 'Dr. James Wilson', status: 'Completed', notes: 'Quarterly review completed. Minor adjustments to anxiety management strategies.' }
              ].map((review, idx) => (
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
          <div className="text-xs text-gray-600">
            Last updated: {carePlan.lastUpdated} by {carePlan.updatedBy}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Close
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Edit size={18} />
              Edit Care Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}