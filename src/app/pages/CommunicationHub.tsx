import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { useState, useRef } from 'react';
import {
  MessageSquare, Users, Bell, Phone, Search, Plus,
  Send, Paperclip, Smile, MoreVertical, CheckCheck, Check,
  Archive, ChevronRight,
  AlertCircle, Info, Volume2, Pin, Hash, Lock,
  UserCheck, Calendar, FileText, X, Save, ChevronDown, Edit
} from 'lucide-react';

type TabType = 'messages' | 'announcements' | 'family' | 'notifications';

interface Thread {
  id: number;
  name: string;
  initials: string;
  color: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  pinned?: boolean;
  type: 'direct' | 'group' | 'family';
}

interface Message {
  id: number;
  sender: string;
  initials: string;
  color: string;
  content: string;
  time: string;
  read: boolean;
  mine: boolean;
}

const threads: Thread[] = [
  { id: 1, name: 'Dr. Emily Carter', initials: 'EC', color: 'bg-purple-500', role: 'Care Manager', lastMessage: 'Sarah\'s review notes have been updated...', time: '10:42', unread: 2, pinned: true, type: 'direct' },
  { id: 2, name: 'Riverside House Team', initials: 'RH', color: 'bg-blue-500', role: 'Group Channel', lastMessage: 'Handover notes for tonight\'s shift', time: '09:15', unread: 5, pinned: true, type: 'group' },
  { id: 3, name: 'Mary Thompson', initials: 'MT', color: 'bg-teal-500', role: 'Key Worker', lastMessage: 'Can you cover the 6pm shift on Friday?', time: 'Yesterday', unread: 0, type: 'direct' },
  { id: 4, name: 'Jane Johnson (Sarah\'s Mum)', initials: 'JJ', color: 'bg-rose-500', role: 'Family / NOK', lastMessage: 'Thank you for the update about the trip', time: 'Yesterday', unread: 1, type: 'family' },
  { id: 5, name: 'All Staff — Bristol', initials: 'AS', color: 'bg-indigo-500', role: 'Broadcast', lastMessage: 'Training reminder: Fire Safety due 15 Jun', time: 'Mon', unread: 0, type: 'group' },
  { id: 6, name: 'James Mitchell', initials: 'JM', color: 'bg-amber-500', role: 'Team Leader', lastMessage: 'Incident report has been submitted', time: 'Mon', unread: 0, type: 'direct' },
  { id: 7, name: 'Thompson Family', initials: 'TF', color: 'bg-green-500', role: 'Family / NOK', lastMessage: 'We\'ll visit on Saturday at 2pm', time: 'Sun', unread: 0, type: 'family' },
];

const conversation: Message[] = [
  { id: 1, sender: 'Dr. Emily Carter', initials: 'EC', color: 'bg-purple-500', content: 'Hi, I\'ve completed the updated care plan review for Sarah Johnson. Could you check the medication section and confirm the new dosage with the pharmacy?', time: '10:30', read: true, mine: false },
  { id: 2, sender: 'You', initials: 'AM', color: 'bg-blue-600', content: 'Thanks Emily, I\'ll review it now and follow up with the pharmacy this afternoon.', time: '10:35', read: true, mine: true },
  { id: 3, sender: 'Dr. Emily Carter', initials: 'EC', color: 'bg-purple-500', content: 'Perfect. Also, her next multi-agency review is scheduled for 20 June — I\'ll circulate the agenda shortly. Sarah\'s review notes have been updated in the system.', time: '10:42', read: false, mine: false },
];

interface Announcement {
  id: number;
  title: string;
  body: string;
  author: string;
  date: string;
  priority: 'high' | 'normal' | 'low';
  pinned: boolean;
  archived: boolean;
}

const initialAnnouncements: Announcement[] = [
  { id: 1, title: 'Mandatory Fire Safety Training — 15 June 2026', body: 'All staff must complete the Fire Safety refresher module before 15 June. This is a CQC compliance requirement. Access via the Training portal.', author: 'HR & Compliance Team', date: '9 Jun 2026', priority: 'high', pinned: true, archived: false },
  { id: 2, title: 'New Medication Administration Policy — Effective 12 June', body: 'Updated MAR procedures are now in effect. Please read the revised policy document before your next shift. Key changes include controlled drug witnessing requirements.', author: 'Clinical Lead', date: '8 Jun 2026', priority: 'high', pinned: false, archived: false },
  { id: 3, title: 'Summer Holiday Cover — Request by 20 June', body: 'Please submit your holiday requests for July and August by 20 June. Use the Leave Management section in Staff Management.', author: 'Rota Team', date: '7 Jun 2026', priority: 'normal', pinned: false, archived: false },
  { id: 4, title: 'New Service User Arriving — 16 June 2026', body: 'Please welcome Lucas Bennett (16) who will be moving into Oak Tree Lodge on 16 June. His care plan and risk assessment are available in the Service Users section.', author: 'Management', date: '6 Jun 2026', priority: 'normal', pinned: false, archived: false },
  { id: 5, title: 'Payroll Deadline — Timesheets Due 13 June', body: 'All timesheets for the pay period ending 12 June must be submitted and approved by COB 13 June.', author: 'Payroll Team', date: '5 Jun 2026', priority: 'low', pinned: false, archived: false },
];

interface Notification {
  id: number;
  type: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  dismissible: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, type: 'alert', icon: AlertCircle, color: 'text-red-500 bg-red-50', title: 'Missed Medication Alert', body: 'Lucas Chen missed evening medication (08 Jun, 20:00). Action required.', time: '1h ago', read: false, dismissible: true },
  { id: 2, type: 'review', icon: Calendar, color: 'text-amber-500 bg-amber-50', title: 'Care Plan Review Overdue', body: 'Oliver Parker\'s care plan was due for review on 5 June. Please assign a reviewer.', time: '3h ago', read: false, dismissible: true },
  { id: 3, type: 'message', icon: MessageSquare, color: 'text-blue-500 bg-blue-50', title: 'New Family Message', body: 'Jane Johnson has sent a message regarding Sarah Johnson\'s weekend visit arrangements.', time: '4h ago', read: false, dismissible: false },
  { id: 4, type: 'staff', icon: UserCheck, color: 'text-purple-500 bg-purple-50', title: 'Shift Confirmation', body: 'Mary Thompson has confirmed the overnight shift for 10 June 2026.', time: '6h ago', read: true, dismissible: true },
  { id: 5, type: 'incident', icon: AlertCircle, color: 'text-red-500 bg-red-50', title: 'Incident Report Submitted', body: 'James Mitchell filed an incident report for Michael Thompson (08 Jun). Pending manager review.', time: '8h ago', read: true, dismissible: true },
  { id: 6, type: 'compliance', icon: FileText, color: 'text-teal-500 bg-teal-50', title: 'DBS Renewal Due', body: 'Sarah Williams\' DBS certificate expires in 30 days. Please initiate renewal process.', time: '1d ago', read: true, dismissible: true },
  { id: 7, type: 'training', icon: Info, color: 'text-indigo-500 bg-indigo-50', title: 'Training Assigned', body: 'Mandatory First Aid training has been assigned to 8 staff members. Deadline: 30 June 2026.', time: '1d ago', read: true, dismissible: true },
];

/* ─── Post / Edit Announcement Modal ─── */
function AnnouncementModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: Announcement;
  onClose: () => void;
  onSave: (data: Omit<Announcement, 'id' | 'archived'>) => void;
}) {
  const isEdit = !!initial;
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const [form, setForm] = useState({
    title: initial?.title ?? '',
    body: initial?.body ?? '',
    author: initial?.author ?? '',
    priority: initial?.priority ?? ('normal' as 'high' | 'normal' | 'low'),
    pinned: initial?.pinned ?? false,
    date: initial?.date ?? today,
  });

  const handleSave = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    onSave(form);
    onClose();
  };

  const priorityOptions: { value: 'high' | 'normal' | 'low'; label: string; color: string }[] = [
    { value: 'high', label: 'High Priority', color: 'bg-red-100 text-red-700 border-red-300' },
    { value: 'normal', label: 'Standard', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { value: 'low', label: 'Info', color: 'bg-gray-100 text-gray-600 border-gray-300' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg text-gray-900">{isEdit ? 'Edit Announcement' : 'Post New Announcement'}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Title *</label>
            <input
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Mandatory Training Reminder"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">Priority</label>
            <div className="flex gap-2">
              {priorityOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm(f => ({ ...f, priority: opt.value }))}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${form.priority === opt.value ? opt.color : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Message *</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none"
              rows={5}
              value={form.body}
              onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
              placeholder="Write the announcement content..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Posted By</label>
              <input
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                value={form.author}
                onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                placeholder="e.g. HR & Compliance Team"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date</label>
              <input
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.pinned}
              onChange={e => setForm(f => ({ ...f, pinned: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 accent-blue-600"
            />
            <span className="text-sm text-gray-700">Pin this announcement to the top</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Save size={14} /> {isEdit ? 'Save Changes' : 'Post Announcement'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── New Message Modal ─── */
function NewMessageModal({ 
  defaultType = 'direct',
  onClose,
  onSend
}: { 
  defaultType?: 'direct' | 'group' | 'family';
  onClose: () => void;
  onSend: (message: { recipient: string; messageType: 'direct' | 'group' | 'family'; subject: string; body: string }) => void;
}) {
  const [form, setForm] = useState({
    recipient: '',
    messageType: defaultType,
    subject: '',
    body: '',
  });

  const handleSend = () => {
    if (!form.recipient.trim() || !form.body.trim()) return;
    onSend(form);
    onClose();
  };

  const staffOptions = [
    'Dr. Emily Carter - Care Manager',
    'Mary Thompson - Key Worker',
    'James Mitchell - Team Leader',
    'Sarah Williams - Support Worker',
    'David Johnson - Night Staff',
  ];

  const groupOptions = [
    'Riverside House Team',
    'All Staff — Bristol',
    'Management Team',
    'Clinical Team',
    'Night Shift Team',
  ];

  const familyOptions = [
    'Jane Johnson (Sarah\'s Mum)',
    'Thompson Family',
    'Oliver Parker\'s Dad',
    'Lucas Chen Family',
  ];

  const recipientOptions = 
    form.messageType === 'direct' ? staffOptions :
    form.messageType === 'group' ? groupOptions :
    familyOptions;

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg text-gray-900">New Message</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-2">Message Type</label>
            <div className="flex gap-2">
              {[
                { value: 'direct' as const, label: 'Direct Message', icon: MessageSquare },
                { value: 'group' as const, label: 'Group Channel', icon: Hash },
                { value: 'family' as const, label: 'Family Member', icon: Users },
              ].map(opt => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setForm(f => ({ ...f, messageType: opt.value, recipient: '' }))}
                    className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition-colors ${
                      form.messageType === opt.value
                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={14} /> {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              {form.messageType === 'direct' ? 'Recipient (Staff)' : form.messageType === 'group' ? 'Group Channel' : 'Family Member'} *
            </label>
            <div className="relative">
              <select
                className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 appearance-none bg-white"
                value={form.recipient}
                onChange={e => setForm(f => ({ ...f, recipient: e.target.value }))}
              >
                <option value="">Select...</option>
                {recipientOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {form.messageType === 'family' && (
            <div className="flex items-center gap-2 px-3 py-2 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-600">
              <Lock size={13} /> Family messages are GDPR-compliant and encrypted
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-500 mb-1">Subject (Optional)</label>
            <input
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
              value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              placeholder="e.g. Weekend visit arrangements"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Message *</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none"
              rows={6}
              value={form.body}
              onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
              placeholder="Type your message here..."
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
              <Paperclip size={14} /> Attach Files
            </button>
            <span className="text-xs text-gray-400">Max 10MB per file</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSend}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send size={14} /> Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommunicationHub() {
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [threadsList, setThreadsList] = useState<Thread[]>(threads);
  const [activeThread, setActiveThread] = useState<Thread | null>(threads[0]);
  const [messageText, setMessageText] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'direct' | 'group' | 'family'>('all');
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [showPostAnnouncement, setShowPostAnnouncement] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [defaultNewMsgType, setDefaultNewMsgType] = useState<'direct' | 'group' | 'family'>('direct');

  const [conversationsMap, setConversationsMap] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, sender: 'Dr. Emily Carter', initials: 'EC', color: 'bg-purple-500', content: "Hi, I've completed the updated care plan review for Sarah Johnson. Could you check the medication section and confirm the new dosage with the pharmacy?", time: '10:30', read: true, mine: false },
      { id: 2, sender: 'You', initials: 'AM', color: 'bg-blue-600', content: "Thanks Emily, I'll review it now and follow up with the pharmacy this afternoon.", time: '10:35', read: true, mine: true },
      { id: 3, sender: 'Dr. Emily Carter', initials: 'EC', color: 'bg-purple-500', content: "Perfect. Also, her next multi-agency review is scheduled for 20 June — I'll circulate the agenda shortly. Sarah's review notes have been updated in the system.", time: '10:42', read: false, mine: false },
    ],
    4: [
      { id: 1, sender: "Jane Johnson (Sarah's Mum)", initials: 'JJ', color: 'bg-rose-500', content: "Hi there, is it okay if we take Sarah out for a few hours this Sunday?", time: 'Yesterday, 14:20', read: true, mine: false },
      { id: 2, sender: 'You', initials: 'AM', color: 'bg-blue-600', content: "Hi Jane! Yes, that should be fine. Please ensure she returns by 5 PM for her medication review.", time: 'Yesterday, 14:30', read: true, mine: true },
      { id: 3, sender: "Jane Johnson (Sarah's Mum)", initials: 'JJ', color: 'bg-rose-500', content: "Thank you for the update about the trip. We will make sure she's back on time.", time: 'Yesterday, 15:10', read: false, mine: false },
    ],
    7: [
      { id: 1, sender: 'You', initials: 'AM', color: 'bg-blue-600', content: "Hi Thompson Family, just checking if you are coming for the weekend visit?", time: 'Sun, 10:15', read: true, mine: true },
      { id: 2, sender: 'Thompson Family', initials: 'TF', color: 'bg-green-500', content: "Yes, we'll visit on Saturday at 2pm. Looking forward to it!", time: 'Sun, 11:02', read: true, mine: false },
    ]
  });

  const [outboundNotifications, setOutboundNotifications] = useState([
    { type: 'SMS', recipient: "Jane Johnson (Sarah's Mum)", content: "Visit reminder: Tomorrow 14:00 at Riverside House", sent: '8 Jun, 09:00', status: 'delivered' },
    { type: 'Email', recipient: 'thompson.family@email.com', content: 'Monthly care update for Michael Thompson — June 2026', sent: '7 Jun, 11:30', status: 'opened' },
    { type: 'SMS', recipient: "Oliver Parker's Dad", content: 'Care plan review scheduled: 20 June 2026 at 14:00', sent: '6 Jun, 14:15', status: 'delivered' },
    { type: 'Email', recipient: 'sofia.martinez@email.com', content: "Sophie's quarterly update — May 2026", sent: '1 Jun, 10:00', status: 'delivered' },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 3000);
  };

  const totalUnread = threadsList.reduce((sum, t) => sum + t.unread, 0);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const filteredThreads = filterType === 'all' ? threadsList : threadsList.filter(t => t.type === filterType);

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeThread) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: 'You',
      initials: 'AM',
      color: 'bg-blue-600',
      content: messageText.trim(),
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      mine: true
    };
    
    setConversationsMap(prev => ({
      ...prev,
      [activeThread.id]: [...(prev[activeThread.id] || []), newMsg]
    }));
    
    setThreadsList(prev => prev.map(t => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          lastMessage: messageText.trim(),
          time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          unread: 0
        };
      }
      return t;
    }));
    
    setMessageText('');
  };

  const handleNewMessageSent = (data: { recipient: string; messageType: 'direct' | 'group' | 'family'; subject: string; body: string }) => {
    const cleanedRecipient = data.recipient.split(' - ')[0];
    let existing = threadsList.find(t => t.name === cleanedRecipient && t.type === data.messageType);
    let threadId = existing ? existing.id : Date.now();
    
    if (!existing) {
      const initials = cleanedRecipient.split(/\s+/).map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const colors = ['bg-blue-500', 'bg-purple-500', 'bg-rose-500', 'bg-teal-500', 'bg-emerald-500', 'bg-amber-500'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const newThread: Thread = {
        id: threadId,
        name: cleanedRecipient,
        initials,
        color,
        role: data.messageType === 'family' ? 'Family / NOK' : data.messageType === 'group' ? 'Group Channel' : 'Staff Member',
        lastMessage: data.body,
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        unread: 0,
        type: data.messageType
      };
      
      setThreadsList(prev => [newThread, ...prev]);
      setActiveThread(newThread);
    } else {
      setThreadsList(prev => prev.map(t => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: data.body,
            time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            unread: 0
          };
        }
        return t;
      }));
      setActiveThread(existing);
    }
    
    const newMsg: Message = {
      id: Date.now(),
      sender: 'You',
      initials: 'AM',
      color: 'bg-blue-600',
      content: data.body,
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      read: true,
      mine: true
    };
    
    setConversationsMap(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newMsg]
    }));
    
    setActiveTab('messages');
    triggerToast(`Message sent to ${cleanedRecipient}`);
  };

  const handleMarkAllRead = () => {
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));
  };

  const handleMarkRead = (id: number) => {
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDismissNotification = (id: number) => {
    setNotifications(ns => ns.filter(n => n.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Communication" />
      <TopBar />

      <main className="ml-0 md:ml-64 pt-20 px-4 md:px-8 pb-8 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl text-gray-900">Communication Hub</h1>
              <p className="text-sm text-gray-600 mt-1">Secure internal messaging, announcements, and family communications</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                <Bell size={16} /> {unreadNotifs > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{unreadNotifs}</span>}
                Notifications
              </button>
              <button
                onClick={() => {
                  setDefaultNewMsgType('direct');
                  setShowNewMessage(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm animate-pulse"
              >
                <Plus size={16} /> New Message
              </button>
            </div>
          </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Unread Messages', value: totalUnread.toString(), color: 'text-blue-600', icon: MessageSquare },
            { label: 'Active Announcements', value: '5', color: 'text-amber-600', icon: Volume2 },
            { label: 'Family Messages', value: '2', color: 'text-rose-600', icon: Users },
            { label: 'Unread Notifications', value: unreadNotifs.toString(), color: 'text-red-600', icon: Bell },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <Card key={i}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                    <div className={`text-2xl ${s.color}`}>{s.value}</div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.color.replace('text-', 'bg-').replace('600', '100')}`}>
                    <Icon size={18} className={s.color} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
          {(['messages', 'announcements', 'family', 'notifications'] as TabType[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm capitalize border-b-2 transition-colors flex items-center gap-2 ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab === 'messages' ? 'Messages' : tab === 'announcements' ? 'Announcements' : tab === 'family' ? 'Family Comms' : 'Notifications'}
              {tab === 'messages' && totalUnread > 0 && <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">{totalUnread}</span>}
              {tab === 'notifications' && unreadNotifs > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{unreadNotifs}</span>}
            </button>
          ))}
        </div>

        {/* Messages Tab — Split Layout */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Thread List */}
            <div className="flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100 mb-3">
                  <Search size={16} className="text-gray-400" />
                  <input type="text" placeholder="Search messages..." className="flex-1 bg-transparent text-sm outline-none text-gray-700" />
                </div>
                <div className="flex gap-2">
                  {(['all', 'direct', 'group', 'family'] as const).map(f => (
                    <button key={f} onClick={() => setFilterType(f)}
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${filterType === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {f === 'all' ? 'All' : f === 'direct' ? 'Direct' : f === 'group' ? 'Groups' : 'Family'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredThreads.map(thread => (
                  <button key={thread.id} onClick={() => setActiveThread(thread)}
                    className={`w-full flex items-start gap-3 p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left ${activeThread?.id === thread.id ? 'bg-blue-50 border-l-2 border-l-blue-600' : ''}`}>
                    <div className="relative shrink-0">
                      <div className={`w-10 h-10 rounded-full ${thread.color} flex items-center justify-center text-white text-xs`}>{thread.initials}</div>
                      {thread.type === 'group' && <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center"><Hash size={8} className="text-white" /></div>}
                      {thread.type === 'family' && <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center"><Users size={8} className="text-white" /></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1.5">
                          {thread.pinned && <Pin size={10} className="text-amber-500" />}
                          <span className={`text-sm ${thread.unread > 0 ? 'text-gray-900' : 'text-gray-700'}`}>{thread.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">{thread.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 truncate">{thread.lastMessage}</span>
                        {thread.unread > 0 && (
                          <span className="ml-2 shrink-0 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">{thread.unread}</span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation Panel */}
            {activeThread ? (
              <div className="lg:col-span-2 flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${activeThread.color} flex items-center justify-center text-white text-xs`}>{activeThread.initials}</div>
                    <div>
                      <div className="text-sm text-gray-900">{activeThread.name}</div>
                      <div className="text-xs text-gray-500">{activeThread.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Phone size={16} className="text-gray-500" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Search size={16} className="text-gray-500" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><MoreVertical size={16} className="text-gray-500" /></button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {activeThread.type === 'family' && (
                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 rounded-full text-xs text-rose-600">
                        <Lock size={12} /> Secure family communication channel
                      </div>
                    </div>
                  )}
                  {(conversationsMap[activeThread.id] || []).map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.mine ? 'flex-row-reverse' : ''}`}>
                      {!msg.mine && (
                        <div className={`w-8 h-8 rounded-full ${msg.color} flex items-center justify-center text-white text-xs shrink-0`}>{msg.initials}</div>
                      )}
                      <div className={`max-w-[70%] ${msg.mine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                        <div className={`px-4 py-3 rounded-2xl text-sm ${msg.mine ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>
                          {msg.content}
                        </div>
                        <div className={`flex items-center gap-1 text-xs text-gray-400 ${msg.mine ? 'flex-row-reverse' : ''}`}>
                          <span>{msg.time}</span>
                          {msg.mine && (msg.read ? <CheckCheck size={12} className="text-blue-500" /> : <Check size={12} />)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Compose */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-end gap-3 bg-gray-50 rounded-xl border border-gray-200 p-3">
                    <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors"><Paperclip size={18} className="text-gray-500" /></button>
                    <textarea
                      value={messageText}
                      onChange={e => setMessageText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent text-sm text-gray-700 outline-none resize-none max-h-32"
                      rows={1}
                    />
                    <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors"><Smile size={18} className="text-gray-500" /></button>
                    <button onClick={handleSendMessage} className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                      <Send size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-2 flex items-center justify-center bg-white rounded-xl border border-gray-100 shadow-sm text-gray-400 text-sm">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  {announcements.filter(a => !a.archived).length} active announcement{announcements.filter(a => !a.archived).length !== 1 ? 's' : ''}
                </div>
                {announcements.some(a => a.archived) && (
                  <button
                    onClick={() => setShowArchived(v => !v)}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Archive size={13} />
                    {showArchived ? 'Hide' : 'Show'} archived ({announcements.filter(a => a.archived).length})
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowPostAnnouncement(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus size={16} /> Post Announcement
              </button>
            </div>

            {/* Active announcements */}
            {announcements.filter(a => !a.archived).map(ann => (
              <Card key={ann.id} className={`hover:border-blue-200 transition-colors ${ann.pinned ? 'border-l-4 border-l-amber-400' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      ann.priority === 'high' ? 'bg-red-100' : ann.priority === 'normal' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {ann.priority === 'high'
                        ? <AlertCircle size={18} className="text-red-600" />
                        : <Info size={18} className={ann.priority === 'normal' ? 'text-blue-600' : 'text-gray-600'} />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        {ann.pinned && <Pin size={12} className="text-amber-500" />}
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          ann.priority === 'high' ? 'bg-red-100 text-red-700' :
                          ann.priority === 'normal' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {ann.priority === 'high' ? 'High Priority' : ann.priority === 'normal' ? 'Standard' : 'Info'}
                        </span>
                        <span className="text-xs text-gray-400">{ann.date}</span>
                      </div>
                      <h3 className="text-sm text-gray-900 mb-2">{ann.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{ann.body}</p>
                      <div className="mt-3 text-xs text-gray-400">Posted by: {ann.author}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditingAnnouncement(ann)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Edit size={13} /> Edit
                    </button>
                    <button
                      onClick={() => setAnnouncements(as => as.map(a => a.id === ann.id ? { ...a, archived: true } : a))}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                    >
                      <Archive size={13} /> Archive
                    </button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Archived announcements */}
            {showArchived && announcements.some(a => a.archived) && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Archive size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-500">Archived Announcements</span>
                </div>
                {announcements.filter(a => a.archived).map(ann => (
                  <Card key={ann.id} className="mb-3 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-gray-100">
                          <Archive size={16} className="text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500">Archived</span>
                            <span className="text-xs text-gray-400">{ann.date}</span>
                          </div>
                          <h3 className="text-sm text-gray-700 mb-1">{ann.title}</h3>
                          <div className="text-xs text-gray-400">Posted by: {ann.author}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setAnnouncements(as => as.map(a => a.id === ann.id ? { ...a, archived: false } : a))}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors shrink-0"
                      >
                        Restore
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Family Comms Tab */}
        {activeTab === 'family' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg text-gray-900">Family Conversations</h2>
                <button 
                  onClick={() => {
                    setDefaultNewMsgType('family');
                    setShowNewMessage(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm animate-pulse"
                >
                  <Plus size={16} /> New Message
                </button>
              </div>
              <div className="space-y-3">
                {threadsList.filter(t => t.type === 'family').map(t => (
                  <Card 
                    key={t.id} 
                    className="hover:border-blue-200 transition-colors cursor-pointer"
                    onClick={() => {
                      setActiveThread(t);
                      setActiveTab('messages');
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-xs`}>{t.initials}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-900">{t.name}</span>
                          <span className="text-xs text-gray-400">{t.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{t.lastMessage}</p>
                      </div>
                      {t.unread > 0 && <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">{t.unread}</span>}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg text-gray-900 mb-4">SMS & Email Notifications</h2>
              <Card>
                <div className="space-y-4">
                  {outboundNotifications.map((n, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0">
                      <div className={`px-2 py-0.5 text-xs rounded shrink-0 mt-0.5 ${n.type === 'SMS' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {n.type}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 mb-0.5">{n.recipient}</div>
                        <div className="text-xs text-gray-500 mb-1 truncate">{n.content}</div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>{n.sent}</span>
                          <span className={`${n.status === 'delivered' ? 'text-green-600' : 'text-blue-600'}`}>{n.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">{unreadNotifs} unread notifications</div>
              <button className="text-sm text-blue-600 hover:text-blue-800" onClick={handleMarkAllRead}>Mark all as read</button>
            </div>
            {notifications.map(n => {
              const Icon = n.icon;
              return (
                <Card key={n.id} className={`transition-colors ${!n.read ? 'border-l-4 border-l-blue-500' : ''} hover:border-gray-300`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.color.split(' ')[1]}`}>
                      <Icon size={18} className={n.color.split(' ')[0]} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm ${!n.read ? 'text-gray-900' : 'text-gray-700'}`}>{n.title}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">{n.time}</span>
                          {!n.read && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{n.body}</p>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-2 mt-3">
                        {!n.read && (
                          <button
                            onClick={() => handleMarkRead(n.id)}
                            className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            Mark as read
                          </button>
                        )}
                        {n.dismissible && (
                          <>
                            {!n.read && <span className="text-gray-300">•</span>}
                            <button
                              onClick={() => handleDismissNotification(n.id)}
                              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <X size={12} /> Dismiss
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors shrink-0">
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  </div>
                </Card>
              );
            })}
            {notifications.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Bell size={24} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">All caught up!</p>
                <p className="text-xs text-gray-400 mt-1">You have no notifications</p>
              </div>
            )}
          </div>
        )}

        <div className="text-center py-6 text-xs text-gray-400 border-t border-gray-100 mt-8">
          Powered by MployUs
        </div>
      </div>
    </main>

      {showPostAnnouncement && (
        <AnnouncementModal
          onClose={() => setShowPostAnnouncement(false)}
          onSave={data => setAnnouncements(as => [{ ...data, id: Date.now(), archived: false }, ...as])}
        />
      )}
      {editingAnnouncement && (
        <AnnouncementModal
          initial={editingAnnouncement}
          onClose={() => setEditingAnnouncement(null)}
          onSave={data => setAnnouncements(as => as.map(a => a.id === editingAnnouncement.id ? { ...a, ...data } : a))}
        />
      )}
      {showNewMessage && (
        <NewMessageModal
          defaultType={defaultNewMsgType}
          onClose={() => setShowNewMessage(false)}
          onSend={handleNewMessageSent}
        />
      )}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">
          <CheckCircle size={15} className="text-green-400" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}