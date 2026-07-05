import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { useState, useEffect, useRef } from 'react';
import {
  Plus, Search, Filter, Download, Upload, CheckCircle, Clock,
  AlertCircle, XCircle, ChevronRight, MoreVertical, FileText,
  Calendar, TrendingUp, TrendingDown, DollarSign, CreditCard,
  Briefcase, Users, ArrowUpRight, ArrowDownRight,
  RefreshCw, Eye, Edit, Printer, Send, CheckSquare, Circle, Building2, X, Save, Mail, Phone, MapPin, PoundSterling, ChevronDown
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type FinancialTab = 'overview' | 'invoices' | 'timesheets' | 'payroll' | 'funding';

interface Invoice {
  id: string;
  client: string;
  service: string;
  period: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  dueDate: string;
  issuedDate: string;
}

interface Timesheet {
  id: number;
  staff: string;
  role: string;
  period: string;
  hours: number;
  overtime: number;
  rate: number;
  total: number;
  status: 'approved' | 'pending' | 'awaiting-invoice';
}

const invoices: Invoice[] = [
  { id: 'INV-2026-089', client: 'Bristol City Council', service: 'Residential Care — Riverside House', period: 'May 2026', amount: 12450.00, status: 'paid', dueDate: '15 Jun 2026', issuedDate: '1 Jun 2026' },
  { id: 'INV-2026-090', client: 'South Glos NHS Trust', service: 'Supported Living — Oak Tree Lodge', period: 'May 2026', amount: 8320.00, status: 'pending', dueDate: '20 Jun 2026', issuedDate: '3 Jun 2026' },
  { id: 'INV-2026-091', client: 'Mr & Mrs Thompson (Private)', service: 'Domiciliary Care — Weekly', period: 'W/E 7 Jun 2026', amount: 640.00, status: 'pending', dueDate: '14 Jun 2026', issuedDate: '8 Jun 2026' },
  { id: 'INV-2026-092', client: 'Birmingham City Council', service: 'Residential Care — Meadow View', period: 'May 2026', amount: 9875.00, status: 'overdue', dueDate: '1 Jun 2026', issuedDate: '10 May 2026' },
  { id: 'INV-2026-088', client: 'NHS England Funded Care', service: 'CHC — Multiple Service Users', period: 'Apr 2026', amount: 22100.00, status: 'paid', dueDate: '15 May 2026', issuedDate: '1 May 2026' },
  { id: 'INV-2026-093', client: 'Bristol City Council', service: 'Residential Care — Riverside House', period: 'Jun 2026', amount: 12450.00, status: 'draft', dueDate: '15 Jul 2026', issuedDate: '—' },
];

const timesheets = [
  { id: 1, staff: 'Mary Thompson', role: 'Support Worker', period: 'W/E 7 Jun 2026', hours: 40, overtime: 5, rate: 13.50, total: 607.50, status: 'approved' },
  { id: 2, staff: 'James Mitchell', role: 'Team Leader', period: 'W/E 7 Jun 2026', hours: 37, overtime: 0, rate: 17.50, total: 647.50, status: 'pending' },
  { id: 3, staff: 'Sarah Williams', role: 'Senior Carer', period: 'W/E 7 Jun 2026', hours: 40, overtime: 3, rate: 15.00, total: 645.00, status: 'pending' },
  { id: 4, staff: 'Tom Adeyemi', role: 'Team Leader', period: 'W/E 7 Jun 2026', hours: 38, overtime: 2, rate: 17.50, total: 697.50, status: 'approved' },
  { id: 5, staff: 'Amara Osei', role: 'Support Worker', period: 'W/E 7 Jun 2026', hours: 32, overtime: 0, rate: 13.50, total: 432.00, status: 'pending' },
  { id: 6, staff: 'Night Cover (Agency)', role: 'Agency', period: 'W/E 7 Jun 2026', hours: 24, overtime: 0, rate: 22.00, total: 528.00, status: 'awaiting-invoice' },
];

const revenueData = [
  { month: 'Jan', revenue: 52000, expenses: 38000 },
  { month: 'Feb', revenue: 49000, expenses: 36000 },
  { month: 'Mar', revenue: 55000, expenses: 39000 },
  { month: 'Apr', revenue: 58000, expenses: 40000 },
  { month: 'May', revenue: 63200, expenses: 44000 },
  { month: 'Jun', revenue: 61000, expenses: 43000 },
];

const fundingBreakdown = [
  { name: 'Local Authority', value: 52, color: '#1D4ED8' },
  { name: 'NHS / CHC', value: 28, color: '#10B981' },
  { name: 'Private Pay', value: 12, color: '#F59E0B' },
  { name: 'Other', value: 8, color: '#6366F1' },
];

const statusConfig = {
  paid:             { label: 'Paid',            bg: 'bg-green-100',  color: 'text-green-700' },
  pending:          { label: 'Pending',          bg: 'bg-amber-100',  color: 'text-amber-700' },
  overdue:          { label: 'Overdue',          bg: 'bg-red-100',    color: 'text-red-700' },
  draft:            { label: 'Draft',            bg: 'bg-gray-100',   color: 'text-gray-600' },
  approved:         { label: 'Approved',         bg: 'bg-green-100',  color: 'text-green-700' },
  'awaiting-invoice':{ label: 'Awaiting Invoice', bg: 'bg-blue-100', color: 'text-blue-700' },
};

function fmt(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);
}

/* ─── View Invoice Modal ─── */
function ViewInvoiceModal({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) {
  const sc = statusConfig[invoice.status];
  
  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg text-gray-900">Invoice Details</h2>
            <p className="text-xs text-gray-500 mt-0.5">{invoice.id}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Status Banner */}
          <div className={`mb-6 px-4 py-3 rounded-xl border ${sc.bg} ${sc.color} border-current/20`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span className="text-sm">Invoice Status: {sc.label}</span>
              </div>
              <span className="text-sm">Issued: {invoice.issuedDate}</span>
            </div>
          </div>

          {/* Client Details */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
              <Building2 size={16} className="text-blue-600" /> Client / Funder Information
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Client Name</div>
                <div className="text-sm text-gray-900">{invoice.client}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Invoice #</div>
                <div className="text-sm text-blue-600">{invoice.id}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Contact</div>
                <div className="text-sm text-gray-700 flex items-center gap-1.5">
                  <Mail size={12} /> accounts@{invoice.client.toLowerCase().replace(/ /g, '')}.gov.uk
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Phone</div>
                <div className="text-sm text-gray-700 flex items-center gap-1.5">
                  <Phone size={12} /> 0117 555 {Math.floor(1000 + Math.random() * 9000)}
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
              <Users size={16} className="text-green-600" /> Service Information
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Service Type</div>
                  <div className="text-sm text-gray-900">{invoice.service}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Billing Period</div>
                  <div className="text-sm text-gray-900">{invoice.period}</div>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Service Users</div>
                <div className="flex flex-wrap gap-2">
                  {['Sarah Johnson (18)', 'Michael Thompson (16)', 'Oliver Parker (17)'].map(user => (
                    <span key={user} className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-lg text-gray-700">{user}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
              <FileText size={16} className="text-purple-600" /> Invoice Line Items
            </h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 text-xs text-gray-500">Description</th>
                    <th className="text-right px-4 py-2 text-xs text-gray-500">Qty</th>
                    <th className="text-right px-4 py-2 text-xs text-gray-500">Rate</th>
                    <th className="text-right px-4 py-2 text-xs text-gray-500">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3 text-sm text-gray-900">Residential Care — Full Board</td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-right">30 days</td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-right">£415.00</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{fmt(12450.00)}</td>
                  </tr>
                </tbody>
                <tfoot className="bg-gray-50 border-t border-gray-200">
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-sm text-gray-600 text-right">Subtotal</td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right">{fmt(invoice.amount)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-sm text-gray-600 text-right">VAT (0%)</td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right">£0.00</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td colSpan={3} className="px-4 py-3 text-sm text-gray-900 text-right">Total Amount</td>
                    <td className="px-4 py-3 text-lg text-blue-600 text-right">{fmt(invoice.amount)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <div className="text-xs text-amber-800 mb-1">Payment Terms</div>
              <div className="text-sm text-amber-900">Net 30 days</div>
              <div className="text-xs text-amber-700 mt-2">Due: {invoice.dueDate}</div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="text-xs text-blue-800 mb-1">Payment Method</div>
              <div className="text-sm text-blue-900">BACS Transfer</div>
              <div className="text-xs text-blue-700 mt-2">Sort: 12-34-56 | Acct: 12345678</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 sticky bottom-0">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Printer size={14} /> Print
          </button>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={14} /> Download PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Send size={14} /> Send to Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Send Invoice Modal ─── */
function SendInvoiceModal({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) {
  const [form, setForm] = useState({
    to: 'accounts@bristolcitycouncil.gov.uk',
    cc: '',
    subject: `Invoice ${invoice.id} — ${invoice.period}`,
    message: `Dear ${invoice.client},\n\nPlease find attached invoice ${invoice.id} for ${invoice.service} for the period of ${invoice.period}.\n\nInvoice Amount: ${fmt(invoice.amount)}\nDue Date: ${invoice.dueDate}\n\nPayment can be made via BACS transfer to:\nSort Code: 12-34-56\nAccount Number: 12345678\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nMpoweredCare Finance Team`,
    attachPDF: true,
    sendCopy: false,
  });

  const handleSend = () => {
    alert(`Invoice ${invoice.id} sent to ${form.to}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg text-gray-900">Send Invoice via Email</h2>
            <p className="text-xs text-gray-500 mt-0.5">{invoice.id} — {fmt(invoice.amount)}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">To *</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
              value={form.to}
              onChange={e => setForm(f => ({ ...f, to: e.target.value }))}
              placeholder="recipient@example.com"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">CC (Optional)</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
              value={form.cc}
              onChange={e => setForm(f => ({ ...f, cc: e.target.value }))}
              placeholder="cc@example.com (separate multiple with commas)"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Subject *</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
              value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Message *</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none"
              rows={10}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.attachPDF}
                onChange={e => setForm(f => ({ ...f, attachPDF: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 accent-blue-600"
              />
              <span className="text-sm text-gray-700">Attach invoice PDF</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.sendCopy}
                onChange={e => setForm(f => ({ ...f, sendCopy: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 accent-blue-600"
              />
              <span className="text-sm text-gray-700">Send me a copy</span>
            </label>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <Mail size={14} className="text-blue-600 mt-0.5" />
              <div className="text-xs text-blue-800">
                <div className="font-medium mb-1">Email Preview</div>
                <div className="text-blue-700">This email will be sent from: finance@mpoweredcare.co.uk</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send size={14} /> Send Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── View Timesheet Modal ─── */
function ViewTimesheetModal({ timesheet, onClose, onApprove }: { timesheet: Timesheet; onClose: () => void; onApprove?: () => void }) {
  const sc = statusConfig[timesheet.status as keyof typeof statusConfig];
  
  // Mock timesheet details
  const dailyBreakdown = [
    { date: '1 Jun', day: 'Mon', hours: 8, overtime: 0, location: 'Riverside House' },
    { date: '2 Jun', day: 'Tue', hours: 8, overtime: 0, location: 'Riverside House' },
    { date: '3 Jun', day: 'Wed', hours: 8, overtime: 1.5, location: 'Oak Tree Lodge' },
    { date: '4 Jun', day: 'Thu', hours: 8, overtime: 1.5, location: 'Riverside House' },
    { date: '5 Jun', day: 'Fri', hours: 8, overtime: 2, location: 'Riverside House' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg text-gray-900">Timesheet Details</h2>
            <p className="text-xs text-gray-500 mt-0.5">{timesheet.staff} — {timesheet.period}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Status Banner */}
          <div className={`mb-6 px-4 py-3 rounded-xl border ${sc?.bg} ${sc?.color} border-current/20`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="text-sm">Status: {sc?.label}</span>
              </div>
              <span className="text-sm">{timesheet.period}</span>
            </div>
          </div>

          {/* Staff Information */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
              <Users size={16} className="text-blue-600" /> Staff Information
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Staff Member</div>
                <div className="text-sm text-gray-900">{timesheet.staff}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Role</div>
                <div className="text-sm text-gray-900">{timesheet.role}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Hourly Rate</div>
                <div className="text-sm text-gray-900">£{timesheet.rate.toFixed(2)}/hour</div>
              </div>
            </div>
          </div>

          {/* Hours Summary */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
              <Clock size={16} className="text-green-600" /> Hours Summary
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                <div className="text-xs text-blue-800 mb-1">Regular Hours</div>
                <div className="text-2xl text-blue-600">{timesheet.hours}h</div>
              </div>
              <div className={`border rounded-xl p-4 text-center ${timesheet.overtime > 0 ? 'bg-amber-50 border-amber-100' : 'bg-gray-50 border-gray-100'}`}>
                <div className={`text-xs mb-1 ${timesheet.overtime > 0 ? 'text-amber-800' : 'text-gray-500'}`}>Overtime</div>
                <div className={`text-2xl ${timesheet.overtime > 0 ? 'text-amber-600' : 'text-gray-400'}`}>{timesheet.overtime}h</div>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
                <div className="text-xs text-purple-800 mb-1">Total Hours</div>
                <div className="text-2xl text-purple-600">{timesheet.hours + timesheet.overtime}h</div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
                <div className="text-xs text-green-800 mb-1">Total Pay</div>
                <div className="text-2xl text-green-600">{fmt(timesheet.total)}</div>
              </div>
            </div>
          </div>

          {/* Daily Breakdown */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
              <Calendar size={16} className="text-purple-600" /> Daily Breakdown
            </h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 text-xs text-gray-500">Date</th>
                    <th className="text-left px-4 py-2 text-xs text-gray-500">Day</th>
                    <th className="text-left px-4 py-2 text-xs text-gray-500">Location</th>
                    <th className="text-right px-4 py-2 text-xs text-gray-500">Regular</th>
                    <th className="text-right px-4 py-2 text-xs text-gray-500">Overtime</th>
                    <th className="text-right px-4 py-2 text-xs text-gray-500">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyBreakdown.map((day, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm text-gray-900">{day.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{day.day}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{day.location}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{day.hours}h</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <span className={day.overtime > 0 ? 'text-amber-600' : 'text-gray-400'}>
                          {day.overtime > 0 ? `${day.overtime}h` : '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{day.hours + day.overtime}h</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-sm text-gray-900">Total</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{timesheet.hours}h</td>
                    <td className="px-4 py-3 text-sm text-amber-600 text-right">{timesheet.overtime > 0 ? `${timesheet.overtime}h` : '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{timesheet.hours + timesheet.overtime}h</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment Calculation */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="text-sm text-blue-900 mb-3">Payment Calculation</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Regular ({timesheet.hours}h × £{timesheet.rate.toFixed(2)})</span>
                <span className="text-blue-900">{fmt(timesheet.hours * timesheet.rate)}</span>
              </div>
              {timesheet.overtime > 0 && (
                <div className="flex justify-between">
                  <span className="text-blue-700">Overtime ({timesheet.overtime}h × £{(timesheet.rate * 1.5).toFixed(2)})</span>
                  <span className="text-blue-900">{fmt(timesheet.overtime * timesheet.rate * 1.5)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-blue-200 flex justify-between">
                <span className="text-blue-900">Gross Pay</span>
                <span className="text-lg text-blue-600">{fmt(timesheet.total)}</span>
              </div>
            </div>
          </div>

          {timesheet.status === 'pending' && (
            <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-amber-600 mt-0.5" />
                <div className="text-xs text-amber-800">
                  <div className="font-medium mb-1">Approval Required</div>
                  <div className="text-amber-700">This timesheet is pending approval. Please review all hours and approve to include in payroll.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 sticky bottom-0">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Printer size={14} /> Print
          </button>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Close
            </button>
            {timesheet.status === 'pending' && onApprove && (
              <button
                onClick={() => {
                  onApprove();
                  onClose();
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle size={14} /> Approve Timesheet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Approve Timesheet Modal ─── */
function ApproveTimesheetModal({ timesheet, onClose, onConfirm }: { timesheet: Timesheet; onClose: () => void; onConfirm: () => void }) {
  const [notes, setNotes] = useState('');

  const handleApprove = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg text-gray-900">Approve Timesheet</h2>
            <p className="text-xs text-gray-500 mt-0.5">{timesheet.staff}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Timesheet Summary */}
          <div className="mb-6 bg-green-50 border border-green-100 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={18} className="text-green-600" />
              </div>
              <div>
                <div className="text-sm text-green-900">{timesheet.staff}</div>
                <div className="text-xs text-green-700">{timesheet.period}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-2.5 text-center">
                <div className="text-xs text-gray-500">Hours</div>
                <div className="text-sm text-gray-900">{timesheet.hours}h</div>
              </div>
              <div className="bg-white rounded-lg p-2.5 text-center">
                <div className="text-xs text-gray-500">Overtime</div>
                <div className="text-sm text-amber-600">{timesheet.overtime > 0 ? `${timesheet.overtime}h` : '—'}</div>
              </div>
              <div className="bg-white rounded-lg p-2.5 text-center">
                <div className="text-xs text-gray-500">Total Pay</div>
                <div className="text-sm text-green-600">{fmt(timesheet.total)}</div>
              </div>
            </div>
          </div>

          {/* Approval Notes */}
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">Approval Notes (Optional)</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none"
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add any notes about this approval..."
            />
          </div>

          {/* Confirmation Message */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <AlertCircle size={14} className="text-blue-600 mt-0.5" />
              <div className="text-xs text-blue-800">
                <div className="font-medium mb-1">Confirm Approval</div>
                <div className="text-blue-700">
                  By approving this timesheet, you confirm that all hours are correct and this will be included in the next payroll run.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleApprove}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <CheckCircle size={14} /> Approve Timesheet
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Run Payroll Modal ─── */
function RunPayrollModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    payPeriod: 'June 2026',
    payDate: '2026-06-25',
    includeStaff: [] as string[],
    confirmPayslips: false,
    confirmBankFile: false,
    confirmHMRC: false,
  });

  // Mock staff list from timesheets
  const staffList = [
    { name: 'Mary Thompson', role: 'Support Worker', gross: 607.50, net: 486.00, status: 'approved' },
    { name: 'James Mitchell', role: 'Team Leader', gross: 647.50, net: 518.00, status: 'pending' },
    { name: 'Sarah Williams', role: 'Senior Carer', gross: 645.00, net: 516.00, status: 'pending' },
    { name: 'Tom Adeyemi', role: 'Team Leader', gross: 697.50, net: 558.00, status: 'approved' },
    { name: 'Amara Osei', role: 'Support Worker', gross: 432.00, net: 345.60, status: 'pending' },
  ];

  const totalGross = staffList.reduce((sum, s) => sum + s.gross, 0);
  const totalNet = staffList.reduce((sum, s) => sum + s.net, 0);
  const totalDeductions = totalGross - totalNet;
  const pendingCount = staffList.filter(s => s.status === 'pending').length;

  const handleNext = () => {
    if (currentStep === 1) {
      if (pendingCount > 0) {
        alert('Please approve all pending timesheets before running payroll.');
        return;
      }
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleRunPayroll = () => {
    if (!form.confirmPayslips || !form.confirmBankFile || !form.confirmHMRC) {
      alert('Please confirm all required actions.');
      return;
    }
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg text-gray-900">Run Payroll</h2>
            <p className="text-xs text-gray-500 mt-0.5">Process payroll for {form.payPeriod}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: 'Review' },
              { num: 2, label: 'Confirm' },
              { num: 3, label: 'Process' },
            ].map((step, i) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                    currentStep >= step.num 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.num ? <CheckCircle size={16} /> : step.num}
                  </div>
                  <span className={`text-xs mt-1 ${currentStep >= step.num ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`w-24 h-0.5 mx-2 ${currentStep > step.num ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Review */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar size={16} className="text-blue-600" /> Payroll Period
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Pay Period</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                      value={form.payPeriod}
                      onChange={e => setForm(f => ({ ...f, payPeriod: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Pay Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                      value={form.payDate}
                      onChange={e => setForm(f => ({ ...f, payDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {pendingCount > 0 && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="text-amber-600 mt-0.5" />
                    <div className="text-xs text-amber-800">
                      <div className="font-medium mb-1">⚠️ Pending Timesheets</div>
                      <div className="text-amber-700">
                        You have {pendingCount} pending timesheet(s) that need approval before running payroll.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <Users size={16} className="text-green-600" /> Staff Included ({staffList.length})
                </h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2 text-xs text-gray-500">Staff Member</th>
                        <th className="text-left px-4 py-2 text-xs text-gray-500">Role</th>
                        <th className="text-right px-4 py-2 text-xs text-gray-500">Gross Pay</th>
                        <th className="text-right px-4 py-2 text-xs text-gray-500">Net Pay</th>
                        <th className="text-left px-4 py-2 text-xs text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffList.map((staff, i) => {
                        const sc = staff.status === 'approved' ? statusConfig.approved : statusConfig.pending;
                        return (
                          <tr key={i} className="border-t border-gray-100">
                            <td className="px-4 py-3 text-sm text-gray-900">{staff.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{staff.role}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-right">{fmt(staff.gross)}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-right">{fmt(staff.net)}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 text-xs rounded-full ${sc.bg} ${sc.color}`}>{sc.label}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                      <tr>
                        <td colSpan={2} className="px-4 py-3 text-sm text-gray-900">Total</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{fmt(totalGross)}</td>
                        <td className="px-4 py-3 text-sm text-green-600 text-right">{fmt(totalNet)}</td>
                        <td />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                  <div className="text-xs text-blue-800 mb-1">Total Gross</div>
                  <div className="text-xl text-blue-600">{fmt(totalGross)}</div>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
                  <div className="text-xs text-red-800 mb-1">Deductions</div>
                  <div className="text-xl text-red-600">{fmt(totalDeductions)}</div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
                  <div className="text-xs text-green-800 mb-1">Total Net</div>
                  <div className="text-xl text-green-600">{fmt(totalNet)}</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Confirm */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <RefreshCw size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-900">Payroll Summary</div>
                    <div className="text-xs text-blue-700">{form.payPeriod} — Pay Date: {new Date(form.payDate).toLocaleDateString('en-GB')}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-2.5 text-center">
                    <div className="text-xs text-gray-500">Staff</div>
                    <div className="text-sm text-gray-900">{staffList.length}</div>
                  </div>
                  <div className="bg-white rounded-lg p-2.5 text-center">
                    <div className="text-xs text-gray-500">Gross Pay</div>
                    <div className="text-sm text-blue-600">{fmt(totalGross)}</div>
                  </div>
                  <div className="bg-white rounded-lg p-2.5 text-center">
                    <div className="text-xs text-gray-500">Net Pay</div>
                    <div className="text-sm text-green-600">{fmt(totalNet)}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-900 mb-3">Confirm Payroll Actions</h3>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.confirmPayslips}
                      onChange={e => setForm(f => ({ ...f, confirmPayslips: e.target.checked }))}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-blue-600"
                    />
                    <div>
                      <div className="text-sm text-gray-900">Generate Payslips</div>
                      <div className="text-xs text-gray-500">Create PDF payslips for all {staffList.length} staff members</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.confirmBankFile}
                      onChange={e => setForm(f => ({ ...f, confirmBankFile: e.target.checked }))}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-blue-600"
                    />
                    <div>
                      <div className="text-sm text-gray-900">Create BACS Payment File</div>
                      <div className="text-xs text-gray-500">Generate bank file for {fmt(totalNet)} total net pay</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.confirmHMRC}
                      onChange={e => setForm(f => ({ ...f, confirmHMRC: e.target.checked }))}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-blue-600"
                    />
                    <div>
                      <div className="text-sm text-gray-900">Submit to HMRC</div>
                      <div className="text-xs text-gray-500">Send RTI submission for tax and NI deductions ({fmt(totalDeductions)})</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle size={14} className="text-amber-600 mt-0.5" />
                  <div className="text-xs text-amber-800">
                    <div className="font-medium mb-1">Important Notice</div>
                    <div className="text-amber-700">
                      Once payroll is processed, payments will be submitted and cannot be reversed. Please ensure all information is correct.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Process */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw size={32} className="text-blue-600" />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">Ready to Process Payroll</h3>
                <p className="text-sm text-gray-600 mb-6">
                  {staffList.length} staff members • {fmt(totalNet)} net pay • Pay date: {new Date(form.payDate).toLocaleDateString('en-GB')}
                </p>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <div className="text-sm text-green-900 mb-3">What will happen:</div>
                <div className="space-y-2">
                  {[
                    { icon: FileText, text: `Generate ${staffList.length} payslips (PDF)`, enabled: form.confirmPayslips },
                    { icon: Download, text: `Create BACS file (${fmt(totalNet)})`, enabled: form.confirmBankFile },
                    { icon: CheckCircle, text: `Submit RTI to HMRC (${fmt(totalDeductions)} deductions)`, enabled: form.confirmHMRC },
                    { icon: Mail, text: `Email payslips to staff`, enabled: form.confirmPayslips },
                    { icon: Save, text: 'Update payroll records', enabled: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {item.enabled ? (
                        <CheckCircle size={14} className="text-green-600" />
                      ) : (
                        <Circle size={14} className="text-gray-300" />
                      )}
                      <span className={`text-sm ${item.enabled ? 'text-green-700' : 'text-gray-400'}`}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-red-600 mt-0.5" />
                  <div className="text-xs text-red-800">
                    <div className="font-medium mb-1">⚠️ Final Confirmation Required</div>
                    <div className="text-red-700">
                      This action cannot be undone. Ensure all timesheets are approved and amounts are correct before proceeding.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 sticky bottom-0">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            {currentStep < 3 && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next <ChevronRight size={14} />
              </button>
            )}
            {currentStep === 3 && (
              <button
                onClick={handleRunPayroll}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <RefreshCw size={14} /> Process Payroll Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Add / Edit Funding Source Modal ─── */
function FundingModal({
  initial,
  onClose,
  onSave
}: {
  initial?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState({
    funder: initial?.funder || '',
    type: initial?.type || 'Local Authority',
    weeklyValue: initial?.weeklyValue || '',
    nextReview: initial?.nextReview && initial?.nextReview !== 'Rolling' ? new Date(initial.nextReview).toISOString().split('T')[0] : '',
    neverExpires: initial?.nextReview === 'Rolling' || false,
    contractStart: initial?.contractStart && initial?.contractStart !== 'Various' ? new Date(initial.contractStart).toISOString().split('T')[0] : '',
    contractEnd: initial?.contractEnd && initial?.contractEnd !== 'Ongoing' ? new Date(initial.contractEnd).toISOString().split('T')[0] : '',
    paymentTerms: initial?.paymentTerms || '30 days',
    notes: initial?.notes || '',
  });

  const handleSave = () => {
    if (!form.funder || !form.weeklyValue) return;
    onSave({
      id: initial?.id || Date.now(),
      funder: form.funder,
      type: form.type,
      serviceUsers: initial?.serviceUsers || 0,
      weeklyValue: Number(form.weeklyValue),
      status: initial?.status || 'active',
      nextReview: form.neverExpires ? 'Rolling' : form.nextReview ? new Date(form.nextReview).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Rolling',
      contractStart: form.contractStart ? new Date(form.contractStart).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '1 Apr 2026',
      contractEnd: form.neverExpires || !form.contractEnd ? 'Ongoing' : new Date(form.contractEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      paymentTerms: form.paymentTerms,
      notes: form.notes,
      trend: initial?.trend || '0%',
      lastInvoice: initial?.lastInvoice || '1 Jun 2026'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <Plus size={17} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-base text-gray-950 font-bold">{initial ? 'Edit Funding Source' : 'Add Funding Source'}</h2>
            <p className="text-xs text-gray-500">Record funder details and contract terms</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-semibold">Funder Name *</label>
            <input
              type="text"
              placeholder="e.g. Bristol City Council"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 font-medium"
              value={form.funder}
              onChange={e => setForm(f => ({ ...f, funder: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-semibold">Funder Type</label>
            <select
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            >
              <option>Local Authority</option>
              <option>CHC / NHS</option>
              <option>Self-funded</option>
              <option>Block Contract</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-semibold">Weekly Value (£) *</label>
            <input
              type="number"
              placeholder="e.g. 4200"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 font-medium"
              value={form.weeklyValue}
              onChange={e => setForm(f => ({ ...f, weeklyValue: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-semibold">Contract Start</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 font-medium"
                value={form.contractStart}
                onChange={e => setForm(f => ({ ...f, contractStart: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-semibold">Contract End</label>
              <input
                type="date"
                disabled={form.neverExpires}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 disabled:bg-gray-50 font-medium"
                value={form.contractEnd}
                onChange={e => setForm(f => ({ ...f, contractEnd: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-semibold">Payment Terms</label>
              <input
                type="text"
                placeholder="e.g. 30 days"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 font-medium"
                value={form.paymentTerms}
                onChange={e => setForm(f => ({ ...f, paymentTerms: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-semibold">Next Review Date</label>
              <input
                type="date"
                disabled={form.neverExpires}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 disabled:bg-gray-50 font-medium"
                value={form.nextReview}
                onChange={e => setForm(f => ({ ...f, nextReview: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="neverExpiresFunding"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={form.neverExpires}
              onChange={e => setForm(f => ({ ...f, neverExpires: e.target.checked, nextReview: e.target.checked ? '' : f.nextReview, contractEnd: e.target.checked ? '' : f.contractEnd }))}
            />
            <label htmlFor="neverExpiresFunding" className="text-xs text-gray-600 select-none font-medium">Rolling Contract / No Expiry</label>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-semibold">Notes</label>
            <textarea
              placeholder="Funder agreement terms..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 resize-none font-medium"
              rows={3}
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-semibold">Cancel</button>
          <button
            onClick={handleSave}
            disabled={!form.funder || !form.weeklyValue}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── View Funding Details Modal ─── */
function ViewFundingDetailsModal({ 
  funding, 
  onClose,
  onEdit,
  onTriggerToast,
  onViewInvoice
}: { 
  funding: any; 
  onClose: () => void;
  onEdit: (funding: any) => void;
  onTriggerToast: (msg: string) => void;
  onViewInvoice: (ref: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'serviceUsers' | 'payments' | 'documents'>(funding.defaultTab || 'overview');
  
  const monthlyValue = funding.weeklyValue * 4.33;
  const annualValue = funding.weeklyValue * 52;
  
  // Local state for linked service users
  const [serviceUsers, setServiceUsers] = useState([
    { name: 'Margaret Wilson', type: 'Residential', weeklyRate: 525, startDate: '15 Jan 2025', status: 'active' },
    { name: 'Robert Evans', type: 'Supported Living', weeklyRate: 480, startDate: '1 Mar 2025', status: 'active' },
    { name: 'Patricia Taylor', type: 'Day Services', weeklyRate: 320, startDate: '10 Apr 2024', status: 'active' },
  ]);
  
  // Local state for documents
  const [docs, setDocs] = useState([
    { name: 'Service Agreement 2024-2027.pdf', type: 'Contract', uploadDate: '1 Apr 2024', size: '2.4 MB' },
    { name: 'Rate Card June 2026.xlsx', type: 'Rates', uploadDate: '1 Jun 2026', size: '156 KB' },
    { name: 'Quality Assurance Report.pdf', type: 'Report', uploadDate: '15 May 2026', size: '892 KB' },
    { name: 'Insurance Certificate.pdf', type: 'Compliance', uploadDate: '1 Jan 2026', size: '245 KB' },
  ]);

  const [showLinkUserModal, setShowLinkUserModal] = useState(false);
  const [linkUserForm, setLinkUserForm] = useState({
    name: '',
    type: 'Supported Living',
    weeklyRate: '',
    startDate: new Date().toISOString().split('T')[0]
  });

  const handleLinkUserSubmit = () => {
    if (!linkUserForm.name || !linkUserForm.weeklyRate) return;
    const newSu = {
      name: linkUserForm.name,
      type: linkUserForm.type,
      weeklyRate: Number(linkUserForm.weeklyRate),
      startDate: new Date(linkUserForm.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'active'
    };
    setServiceUsers(prev => [...prev, newSu]);
    setShowLinkUserModal(false);
    setLinkUserForm({ name: '', type: 'Supported Living', weeklyRate: '', startDate: new Date().toISOString().split('T')[0] });
    onTriggerToast(`Linked service user "${newSu.name}" to funding source.`);
  };
  
  const paymentHistory = [
    { date: '1 Jun 2026', ref: 'INV-2026-0601', amount: 18200, status: 'paid', paidDate: '15 Jun 2026' },
    { date: '1 May 2026', ref: 'INV-2026-0501', amount: 18200, status: 'paid', paidDate: '14 May 2026' },
    { date: '1 Apr 2026', ref: 'INV-2026-0401', amount: 18200, status: 'paid', paidDate: '20 Apr 2026' },
    { date: '1 Mar 2026', ref: 'INV-2026-0301', amount: 18200, status: 'paid', paidDate: '12 Mar 2026' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <Building2 size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">{funding.funder}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{funding.type} • {funding.status}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4 border-b border-gray-100">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'serviceUsers', label: 'Service Users' },
            { id: 'payments', label: 'Payment History' },
            { id: 'documents', label: 'Documents' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Financial Summary */}
              <div>
                <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <PoundSterling size={16} className="text-green-600" /> Financial Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <div className="text-xs text-blue-700 mb-1">Weekly Value</div>
                    <div className="text-2xl text-blue-900">{fmt(funding.weeklyValue)}</div>
                    <div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                      {funding.trend.startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {funding.trend} vs last period
                    </div>
                  </div>
                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                    <div className="text-xs text-purple-700 mb-1">Monthly Value</div>
                    <div className="text-2xl text-purple-900">{fmt(monthlyValue)}</div>
                    <div className="text-xs text-purple-600 mt-1">~4.33 weeks</div>
                  </div>
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                    <div className="text-xs text-indigo-700 mb-1">Annual Value</div>
                    <div className="text-2xl text-indigo-900">{fmt(annualValue)}</div>
                    <div className="text-xs text-indigo-600 mt-1">52 weeks</div>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <div className="text-xs text-green-700 mb-1">Service Users</div>
                    <div className="text-2xl text-green-900">{funding.serviceUsers}</div>
                    <div className="text-xs text-green-600 mt-1">Active placements</div>
                  </div>
                </div>
              </div>

              {/* Contract Information */}
              <div>
                <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <FileText size={16} className="text-blue-600" /> Contract Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Contract Start Date</div>
                      <div className="text-sm text-gray-900">{funding.contractStart}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Contract End Date</div>
                      <div className="text-sm text-gray-900">{funding.contractEnd}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Payment Terms</div>
                      <div className="text-sm text-gray-900">{funding.paymentTerms}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Next Review Date</div>
                      <div className={`text-sm ${
                        new Date(funding.nextReview) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && funding.nextReview !== 'Rolling'
                          ? 'text-amber-600 font-medium'
                          : 'text-gray-900'
                      }`}>
                        {funding.nextReview}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Last Invoice Date</div>
                      <div className="text-sm text-gray-900">{funding.lastInvoice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Contract Status</div>
                      <div><span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Active</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes & Description */}
              <div>
                <h3 className="text-sm text-gray-900 mb-3">Notes & Description</h3>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-sm text-blue-900">{funding.notes}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button 
                  onClick={() => onEdit(funding)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                  <Edit size={14} /> Edit Funding Source
                </button>
                <button 
                  onClick={() => setShowLinkUserModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                >
                  <Plus size={14} /> Add Service User
                </button>
                <button 
                  onClick={() => onTriggerToast(`Downloading contract for ${funding.funder}...`)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <Download size={14} /> Download Contract
                </button>
              </div>
            </div>
          )}

          {/* Service Users Tab */}
          {activeTab === 'serviceUsers' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-900">{serviceUsers.length} Service Users Funded</h3>
                <button 
                  onClick={() => setShowLinkUserModal(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold"
                >
                  <Plus size={12} /> Link Service User
                </button>
              </div>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-250">
                    <tr>
                      <th className="px-4 py-3 text-xs text-gray-500 font-bold">Service User</th>
                      <th className="px-4 py-3 text-xs text-gray-500 font-bold">Care Type</th>
                      <th className="px-4 py-3 text-xs text-gray-500 font-bold text-right">Weekly Rate</th>
                      <th className="px-4 py-3 text-xs text-gray-500 font-bold">Start Date</th>
                      <th className="px-4 py-3 text-xs text-gray-500 font-bold">Status</th>
                      <th className="px-4 py-3 text-xs text-gray-500 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceUsers.map((su, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{su.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{su.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">{fmt(su.weeklyRate)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{su.startDate}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 text-[10px] bg-green-100 text-green-700 rounded-full font-bold">Active</span>
                        </td>
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => onTriggerToast(`Navigating to service user profile for ${su.name}...`)}
                            className="text-blue-600 hover:text-blue-700 text-xs font-semibold hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payment History Tab */}
          {activeTab === 'payments' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-900 font-semibold">Payment History</h3>
                <button 
                  onClick={() => onTriggerToast('Payment history exported as CSV.')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium"
                >
                  <Download size={12} /> Export CSV
                </button>
              </div>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-250">
                    <tr>
                      <th className="px-4 py-3 text-xs text-gray-500 font-bold">Invoice Date</th>
                      <th className="px-4 py-3 text-xs text-gray-500 font-bold">Reference</th>
                      <th className="px-4 py-3 text-xs text-gray-500 font-bold text-right">Amount</th>
                      <th className="px-4 py-3 text-xs text-gray-500 font-bold">Status</th>
                      <th className="px-4 py-3 text-xs text-gray-500 font-bold">Paid Date</th>
                      <th className="px-4 py-3 text-xs text-gray-500 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((p, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="px-4 py-3 text-sm text-gray-900">{p.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono">{p.ref}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">{fmt(p.amount)}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 text-[10px] bg-green-100 text-green-700 rounded-full font-bold">Paid</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{p.paidDate}</td>
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => onViewInvoice(p.ref)}
                            className="text-blue-600 hover:text-blue-700 text-xs font-semibold hover:underline"
                          >
                            View Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-900 font-semibold">Documents & Contracts</h3>
                <label className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs cursor-pointer font-semibold shadow-sm">
                  <Upload size={12} /> Upload Document
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const sizeStr = file.size > 1024 * 1024 
                          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
                          : `${(file.size / 1024).toFixed(0)} KB`;
                        const newDoc = {
                          name: file.name,
                          type: 'Attachment',
                          uploadDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                          size: sizeStr
                        };
                        setDocs(prev => [newDoc, ...prev]);
                        onTriggerToast(`Document "${file.name}" uploaded successfully.`);
                      }
                    }}
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {docs.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-900 font-medium">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.type} • {doc.uploadDate} • {doc.size}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onTriggerToast(`Viewing document: ${doc.name}`)}
                        className="p-2 hover:bg-white rounded-lg transition-colors border border-gray-150 text-gray-600 hover:text-blue-600"
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        onClick={() => onTriggerToast(`Downloading document: ${doc.name}`)}
                        className="p-2 hover:bg-white rounded-lg transition-colors border border-gray-150 text-gray-600 hover:text-green-600"
                        title="Download"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Link Service User Dialog Overlay */}
        {showLinkUserModal && (
          <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-950">Link Service User</h3>
                <button onClick={() => setShowLinkUserModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={16} className="text-gray-400" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">Service User Name *</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                    value={linkUserForm.name}
                    onChange={e => setLinkUserForm(f => ({ ...f, name: e.target.value }))}
                  >
                    <option value="">Select service user...</option>
                    <option>Margaret Wilson</option>
                    <option>Robert Evans</option>
                    <option>Patricia Taylor</option>
                    <option>Daniel Carter</option>
                    <option>Sophia Martinez</option>
                    <option>Oliver Parker</option>
                    <option>Lucas Bennett</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">Care Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
                    value={linkUserForm.type}
                    onChange={e => setLinkUserForm(f => ({ ...f, type: e.target.value }))}
                  >
                    <option>Supported Living</option>
                    <option>Residential</option>
                    <option>Day Services</option>
                    <option>Domiciliary Care</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">Weekly Rate (£) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 450"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 font-medium"
                    value={linkUserForm.weeklyRate}
                    onChange={e => setLinkUserForm(f => ({ ...f, weeklyRate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-semibold">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 font-medium"
                    value={linkUserForm.startDate}
                    onChange={e => setLinkUserForm(f => ({ ...f, startDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <button onClick={() => setShowLinkUserModal(false)} className="px-3.5 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                <button
                  onClick={handleLinkUserSubmit}
                  disabled={!linkUserForm.name || !linkUserForm.weeklyRate}
                  className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Link User
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 sticky bottom-0">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── New Invoice Modal ─── */
function NewInvoiceModal({ onClose }: { onClose: () => void }) {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  
  type LineItem = { description: string; qty: string; rate: string; amount: string };
  
  const [form, setForm] = useState({
    // Funder Details
    funderType: 'local-authority' as 'local-authority' | 'nhs' | 'private',
    funder: '',
    contactPerson: '',
    purchaseOrderRef: '',
    
    // Service Details
    serviceLocation: '',
    serviceType: 'residential' as 'residential' | 'supported-living' | 'domiciliary' | 'respite' | 'day-care',
    serviceUsers: [] as string[],
    
    // Billing Period
    billingPeriod: '',
    startDate: '',
    endDate: '',
    
    // Line Items
    items: [
      { description: '', qty: '', rate: '', amount: '' }
    ] as LineItem[],
    
    // Financial
    subtotal: 0,
    includeVAT: false,
    vatAmount: 0,
    totalAmount: 0,
    
    // Payment Terms
    paymentTerms: '30' as '7' | '14' | '30' | '60',
    dueDate: '',
    notes: '',
  });

  const funderOptions = {
    'local-authority': ['Bristol City Council', 'Birmingham City Council', 'South Gloucestershire Council', 'Bath & North East Somerset Council'],
    'nhs': ['South Glos NHS Trust', 'NHS England - Continuing Healthcare', 'Bristol CCG', 'Avon & Wiltshire MH Partnership'],
    'private': ['Mr & Mrs Thompson', 'Johnson Family', 'Parker Family', 'Chen Family', 'Martinez Family'],
  };

  const serviceLocations = ['Riverside House', 'Oak Tree Lodge', 'Meadow View', 'Community - Domiciliary', 'Day Centre - Bristol'];

  const serviceUsersList = ['Sarah Johnson (18)', 'Michael Thompson (16)', 'Oliver Parker (17)', 'Lucas Chen (19)', 'Sophie Martinez (15)', 'Emma Wilson (18)'];

  const addLineItem = () => {
    setForm(f => ({ ...f, items: [...f.items, { description: '', qty: '', rate: '', amount: '' }] }));
  };

  const removeLineItem = (index: number) => {
    setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== index) }));
  };

  const updateLineItem = (index: number, field: string, value: string) => {
    const newItems = [...form.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Auto-calculate amount
    if (field === 'qty' || field === 'rate') {
      const qty = parseFloat(field === 'qty' ? value : newItems[index].qty) || 0;
      const rate = parseFloat(field === 'rate' ? value : newItems[index].rate) || 0;
      newItems[index].amount = (qty * rate).toFixed(2);
    }
    
    // Calculate totals
    const subtotal = newItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const vatAmount = form.includeVAT ? subtotal * 0.2 : 0;
    const totalAmount = subtotal + vatAmount;
    
    setForm(f => ({ ...f, items: newItems, subtotal, vatAmount, totalAmount }));
  };

  const toggleVAT = (checked: boolean) => {
    const vatAmount = checked ? form.subtotal * 0.2 : 0;
    setForm(f => ({ ...f, includeVAT: checked, vatAmount, totalAmount: f.subtotal + vatAmount }));
  };

  const handleCreate = () => {
    if (!form.funder || !form.serviceLocation || form.serviceUsers.length === 0) {
      alert('Please complete all required fields');
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg text-gray-900">Create New Invoice</h2>
            <p className="text-xs text-gray-500 mt-0.5">Generate invoice for care services provided</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Funder Information */}
          <div>
            <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
              <Building2 size={16} className="text-blue-600" /> Funder / Commissioner Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Funder Type *</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: 'local-authority' as const, label: 'LA' },
                    { value: 'nhs' as const, label: 'NHS' },
                    { value: 'private' as const, label: 'Private' },
                  ]).map(opt => (
                    <button key={opt.value} onClick={() => setForm(f => ({ ...f, funderType: opt.value, funder: '' }))}
                      className={`px-3 py-2 text-xs rounded-lg border transition-colors ${form.funderType === opt.value ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Funder Name *</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 appearance-none bg-white"
                  value={form.funder} onChange={e => setForm(f => ({ ...f, funder: e.target.value }))}>
                  <option value="">Select funder...</option>
                  {funderOptions[form.funderType].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Contact Person</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                  value={form.contactPerson} onChange={e => setForm(f => ({ ...f, contactPerson: e.target.value }))} placeholder="e.g. Jane Smith" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Purchase Order / Ref</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                  value={form.purchaseOrderRef} onChange={e => setForm(f => ({ ...f, purchaseOrderRef: e.target.value }))} placeholder="PO-2026-1234" />
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div>
            <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
              <Users size={16} className="text-green-600" /> Service Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Service Location *</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 appearance-none bg-white"
                  value={form.serviceLocation} onChange={e => setForm(f => ({ ...f, serviceLocation: e.target.value }))}>
                  <option value="">Select location...</option>
                  {serviceLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">Service Type *</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: 'residential' as const, label: 'Residential' },
                    { value: 'supported-living' as const, label: 'Supported' },
                    { value: 'domiciliary' as const, label: 'Domiciliary' },
                  ]).map(opt => (
                    <button key={opt.value} onClick={() => setForm(f => ({ ...f, serviceType: opt.value }))}
                      className={`px-2 py-1.5 text-xs rounded-lg border transition-colors ${form.serviceType === opt.value ? 'bg-green-100 text-green-700 border-green-300' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs text-gray-500 mb-2">Service Users (Select all that apply) *</label>
              <div className="grid grid-cols-3 gap-2 max-h-24 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {serviceUsersList.map(user => (
                  <label key={user} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.serviceUsers.includes(user)}
                      onChange={e => setForm(f => ({ ...f, serviceUsers: e.target.checked ? [...f.serviceUsers, user] : f.serviceUsers.filter(u => u !== user) }))}
                      className="w-4 h-4 rounded border-gray-300 accent-blue-600" />
                    <span className="text-xs text-gray-700">{user}</span>
                  </label>
                ))}
              </div>
              {form.serviceUsers.length > 0 && <div className="mt-2 text-xs text-gray-500">{form.serviceUsers.length} service user(s) selected</div>}
            </div>
          </div>

          {/* Billing Period */}
          <div>
            <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
              <Calendar size={16} className="text-amber-600" /> Billing Period
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Period Description *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                  value={form.billingPeriod} onChange={e => setForm(f => ({ ...f, billingPeriod: e.target.value }))} placeholder="e.g. June 2026" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Date *</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                  value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Date *</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                  value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-900 flex items-center gap-2">
                <FileText size={16} className="text-purple-600" /> Invoice Line Items
              </h3>
              <button onClick={addLineItem} className="flex items-center gap-1 px-3 py-1.5 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Plus size={14} /> Add Line
              </button>
            </div>
            <div className="space-y-3">
              {form.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="col-span-5">
                    <label className="block text-xs text-gray-500 mb-1">Description / Service</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400"
                      value={item.description} onChange={e => updateLineItem(index, 'description', e.target.value)} placeholder="e.g. Residential Care - Full Board" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">Qty / Hours</label>
                    <input type="number" step="0.5" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400"
                      value={item.qty} onChange={e => updateLineItem(index, 'qty', e.target.value)} placeholder="0" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">Rate (£)</label>
                    <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400"
                      value={item.rate} onChange={e => updateLineItem(index, 'rate', e.target.value)} placeholder="0.00" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">Amount (£)</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-gray-100" value={item.amount} readOnly />
                  </div>
                  <div className="col-span-1 flex items-end">
                    {form.items.length > 1 && (
                      <button onClick={() => removeLineItem(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Terms & Total */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                <CreditCard size={16} className="text-indigo-600" /> Payment Terms
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Payment Terms</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['7', '14', '30', '60'] as const).map(days => (
                      <button key={days} onClick={() => setForm(f => ({ ...f, paymentTerms: days }))}
                        className={`px-3 py-2 text-xs rounded-lg border transition-colors ${form.paymentTerms === days ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
                        Net {days}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Due Date *</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs text-gray-500 mb-1">Invoice Notes</label>
                <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400 resize-none" rows={3}
                  value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Payment instructions, bank details, or notes..." />
              </div>
            </div>

            {/* Total Summary */}
            <div>
              <h3 className="text-sm text-gray-900 mb-3">Invoice Total</h3>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{fmt(form.subtotal)}</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer py-2">
                    <input type="checkbox" checked={form.includeVAT} onChange={e => toggleVAT(e.target.checked)} className="w-4 h-4 rounded border-gray-300 accent-blue-600" />
                    <span className="text-xs text-gray-700">Include VAT (20%)</span>
                  </label>
                  {form.includeVAT && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">VAT (20%)</span>
                      <span className="text-gray-900">{fmt(form.vatAmount)}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">Total Amount</span>
                      <span className="text-xl text-blue-600">{fmt(form.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="text-xs text-amber-800">
                  <div className="font-medium mb-1">Quick Check:</div>
                  <div className="space-y-1 text-amber-700">
                    <div>✓ Service users: {form.serviceUsers.length}</div>
                    <div>✓ Line items: {form.items.filter(i => i.description && i.amount).length}</div>
                    <div>✓ Period: {form.billingPeriod || 'Not set'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 sticky bottom-0">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText size={14} /> Save as Draft
          </button>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save size={14} /> Create & Send Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type TimeframeKey = 'this-month' | 'last-month' | '3-months' | '6-months' | 'this-year' | 'custom';

const TIMEFRAME_OPTIONS: { key: TimeframeKey; label: string }[] = [
  { key: 'this-month',  label: 'This Month' },
  { key: 'last-month',  label: 'Last Month' },
  { key: '3-months',    label: 'Last 3 Months' },
  { key: '6-months',    label: 'Last 6 Months' },
  { key: 'this-year',   label: 'This Year' },
  { key: 'custom',      label: 'Custom Range' },
];

// Maps invoice period strings to an approximate month index (0=Jan … 11=Dec) for filtering
function invoiceMonth(period: string): number {
  const months: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const match = period.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/);
  return match ? (months[match[1]] ?? 5) : 5;
}

export default function Financial() {
  const [activeTab, setActiveTab] = useState<FinancialTab>('overview');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [showQuickAction, setShowQuickAction] = useState<string | null>(null);
  const [showViewInvoice, setShowViewInvoice] = useState<Invoice | null>(null);
  const [showSendInvoice, setShowSendInvoice] = useState<Invoice | null>(null);
  const [showViewTimesheet, setShowViewTimesheet] = useState<Timesheet | null>(null);
  const [showApproveTimesheet, setShowApproveTimesheet] = useState<Timesheet | null>(null);
  const [showRunPayroll, setShowRunPayroll] = useState(false);
  const [showFundingDetails, setShowFundingDetails] = useState<any>(null);
  const [fundingOptionsMenu, setFundingOptionsMenu] = useState<number | null>(null);
  const [showAddFundingModal, setShowAddFundingModal] = useState(false);
  const [showEditFundingModal, setShowEditFundingModal] = useState<any | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframeKey>('this-month');
  
  const [fundingList, setFundingList] = useState([
    { id: 1, funder: 'Bristol City Council', type: 'Local Authority', serviceUsers: 8, weeklyValue: 4200, status: 'active', nextReview: '1 Aug 2026', notes: 'Section 47 placements', contractStart: '1 Apr 2024', contractEnd: '31 Mar 2027', paymentTerms: '30 days', lastInvoice: '1 Jun 2026', trend: '+5%' },
    { id: 2, funder: 'South Glos NHS Trust', type: 'CHC / NHS', serviceUsers: 4, weeklyValue: 2800, status: 'active', nextReview: '15 Jul 2026', notes: 'Continuing Healthcare', contractStart: '1 Jan 2025', contractEnd: '31 Dec 2026', paymentTerms: '14 days', lastInvoice: '3 Jun 2026', trend: '+2%' },
    { id: 3, funder: 'Birmingham City Council', type: 'Local Authority', serviceUsers: 5, weeklyValue: 2300, status: 'active', nextReview: '30 Jul 2026', notes: 'Supported living packages', contractStart: '15 Mar 2025', contractEnd: '14 Mar 2028', paymentTerms: '30 days', lastInvoice: '1 Jun 2026', trend: '0%' },
    { id: 4, funder: 'Private Clients', type: 'Self-funded', serviceUsers: 3, weeklyValue: 1600, status: 'active', nextReview: 'Rolling', notes: 'Domiciliary care', contractStart: 'Various', contractEnd: 'Ongoing', paymentTerms: '7 days', lastInvoice: '8 Jun 2026', trend: '-3%' },
    { id: 5, funder: 'NHS England', type: 'Block Contract', serviceUsers: 6, weeklyValue: 5100, status: 'active', nextReview: '31 Mar 2027', notes: 'Annual block contract', contractStart: '1 Apr 2026', contractEnd: '31 Mar 2029', paymentTerms: '14 days', lastInvoice: '1 Jun 2026', trend: '+8%' },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 3000);
  };

  const handleViewInvoiceFromRef = (ref: string) => {
    const inv = invoices.find(i => i.id === ref || i.id.replace('INV-', '') === ref.replace('INV-', ''));
    if (inv) {
      setShowViewInvoice(inv);
    } else {
      triggerToast(`Invoice details not found for reference ${ref}`);
    }
  };

  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  // Derive which month indices are "in range" for the selected timeframe
  const now = new Date(); // June 2026 in the demo
  const currentMonth = 5; // June = index 5
  const inRange = (monthIdx: number): boolean => {
    if (timeframe === 'this-month')  return monthIdx === currentMonth;
    if (timeframe === 'last-month')  return monthIdx === currentMonth - 1;
    if (timeframe === '3-months')    return monthIdx >= currentMonth - 2 && monthIdx <= currentMonth;
    if (timeframe === '6-months')    return monthIdx >= currentMonth - 5 && monthIdx <= currentMonth;
    if (timeframe === 'this-year')   return monthIdx >= 0 && monthIdx <= currentMonth;
    if (timeframe === 'custom')      return true; // show all for now; custom date input shown separately
    return true;
  };

  const filteredInvoices  = invoices.filter(i => inRange(invoiceMonth(i.period)));
  const filteredTimesheets = timesheets; // timesheets are all same period in mock data

  const totalRevenue  = filteredInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const pendingAmount = filteredInvoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
  const overdueAmount = filteredInvoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (fundingOptionsMenu !== null) {
        setFundingOptionsMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [fundingOptionsMenu]);
  const pendingTimesheets = timesheets.filter(t => t.status === 'pending').length;

  const handleQuickAction = (action: string) => {
    if (action === 'Approve Pending Timesheets') {
      setActiveTab('timesheets');
    } else if (action === 'Chase Overdue Invoices') {
      setActiveTab('invoices');
    } else if (action === 'Export Payroll (Jun)') {
      setActiveTab('payroll');
    } else if (action === 'Generate Monthly Report') {
      // Handle report generation
      alert('Monthly report generation started...');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Financial" />
      <TopBar />

      <main className="ml-0 md:ml-64 pt-20 px-4 md:px-8 pb-8 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl text-gray-900">Financial & Billing</h1>
              <p className="text-sm text-gray-600 mt-1">Invoices, timesheets, payroll exports, and funding management</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                <Download size={16} /> Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm" onClick={() => setShowNewInvoice(true)}>
                <Plus size={16} /> New Invoice
              </button>
            </div>
          </div>

        {/* Timeframe filter bar */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mr-1">
            <Calendar size={13} /> Period:
          </div>
          {TIMEFRAME_OPTIONS.filter(o => o.key !== 'custom').map(o => (
            <button
              key={o.key}
              onClick={() => { setTimeframe(o.key); setShowCustomPicker(false); }}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${timeframe === o.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {o.label}
            </button>
          ))}
          <button
            onClick={() => { setTimeframe('custom'); setShowCustomPicker(p => !p); }}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border transition-colors ${timeframe === 'custom' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
          >
            Custom Range <ChevronDown size={11} />
          </button>
          {timeframe === 'custom' && showCustomPicker && (
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                From
                <input type="date" value={customFrom} onChange={e => setCustomFrom(e.target.value)}
                  className="px-2 py-1 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                To
                <input type="date" value={customTo} min={customFrom} onChange={e => setCustomTo(e.target.value)}
                  className="px-2 py-1 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400" />
              </div>
              <button onClick={() => setShowCustomPicker(false)} className="text-xs text-blue-600 hover:text-blue-800 px-2">Apply</button>
            </div>
          )}
          <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-500 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg">
            <span className="text-blue-700">
              {TIMEFRAME_OPTIONS.find(o => o.key === timeframe)?.label}
            </span>
            <span>· {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Revenue This Month', value: fmt(63200), sub: '↑ 8.2% vs last month', positive: true, icon: TrendingUp },
            { label: 'Outstanding (Pending)', value: fmt(pendingAmount), sub: `${filteredInvoices.filter(i => i.status === 'pending').length} invoices`, positive: null, icon: Clock },
            { label: 'Overdue', value: fmt(overdueAmount), sub: 'Requires immediate action', positive: false, icon: AlertCircle },
            { label: 'Timesheets Pending', value: pendingTimesheets.toString(), sub: 'Approval required', positive: null, icon: CheckSquare },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <Card key={i}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                    <div className={`text-xl ${s.positive === false ? 'text-red-600' : s.positive ? 'text-green-600' : 'text-gray-900'}`}>{s.value}</div>
                    <div className={`text-xs mt-1 ${s.positive === false ? 'text-red-500' : s.positive ? 'text-green-500' : 'text-gray-400'}`}>{s.sub}</div>
                  </div>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${s.positive === false ? 'bg-red-100' : s.positive ? 'bg-green-100' : 'bg-blue-100'}`}>
                    <Icon size={16} className={s.positive === false ? 'text-red-600' : s.positive ? 'text-green-600' : 'text-blue-600'} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
          {(['overview', 'invoices', 'timesheets', 'payroll', 'funding'] as FinancialTab[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab === 'timesheets' ? 'Timesheets' : tab === 'funding' ? 'Funding' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="text-sm text-gray-600 mb-4">Revenue vs Expenses — 2026</div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart id="revenue-expenses-chart" data={revenueData}>
                    <CartesianGrid key="revenue-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis key="revenue-x" dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <YAxis key="revenue-y" tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={v => `£${(v/1000).toFixed(0)}k`} />
                    <Tooltip key="revenue-tooltip" formatter={(v: any) => fmt(v)} />
                    <Bar key="revenue-bar-revenue" dataKey="revenue" fill="#1D4ED8" radius={[4, 4, 0, 0]} name="Revenue" />
                    <Bar key="revenue-bar-expenses" dataKey="expenses" fill="#10B981" radius={[4, 4, 0, 0]} name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <div className="text-sm text-gray-600 mb-4">Recent Invoices</div>
                <div className="space-y-3">
                  {filteredInvoices.slice(0, 4).map(inv => {
                    const sc = statusConfig[inv.status];
                    return (
                      <div key={inv.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText size={14} className="text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-900">{inv.id}</div>
                            <div className="text-xs text-gray-500 truncate max-w-xs">{inv.client}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${sc.bg} ${sc.color}`}>{sc.label}</span>
                          <span className="text-sm text-gray-900">{fmt(inv.amount)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <div className="text-sm text-gray-600 mb-4">Funding Breakdown</div>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart id="funding-breakdown-chart">
                    <Pie key="funding-pie" data={fundingBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                      {fundingBreakdown.map((entry, i) => <Cell key={`funding-cell-${i}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip key="funding-tooltip" formatter={(v: any) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-2">
                  {fundingBreakdown.map((f, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: f.color }} />
                        <span className="text-xs text-gray-600">{f.name}</span>
                      </div>
                      <span className="text-xs text-gray-900">{f.value}%</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <div className="text-sm text-gray-600 mb-3">Quick Actions</div>
                <div className="space-y-2">
                  {[
                    { label: 'Approve Pending Timesheets', badge: `${pendingTimesheets}`, color: 'text-amber-600' },
                    { label: 'Chase Overdue Invoices', badge: '1', color: 'text-red-600' },
                    { label: 'Export Payroll (Jun)', badge: null, color: 'text-blue-600' },
                    { label: 'Generate Monthly Report', badge: null, color: 'text-gray-600' },
                  ].map((action, i) => (
                    <button key={i} className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left" onClick={() => handleQuickAction(action.label)}>
                      <span className={`text-sm ${action.color}`}>{action.label}</span>
                      <div className="flex items-center gap-2">
                        {action.badge && <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">{action.badge}</span>}
                        <ChevronRight size={14} className="text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <>
            <Card className="mb-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-48 flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 border border-gray-100">
                  <Search size={18} className="text-gray-400" />
                  <input type="text" placeholder="Search invoices..." className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700" />
                </div>
                <select className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700">
                  <option>All Statuses</option>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                  <option>Draft</option>
                </select>
                <select className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700">
                  <option>All Clients</option>
                  <option>Bristol City Council</option>
                  <option>NHS</option>
                  <option>Private</option>
                </select>
              </div>
            </Card>
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-xs text-gray-500">Invoice #</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500">Client</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500">Service</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500">Period</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500">Amount</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500">Due Date</th>
                      <th className="text-right py-3 px-4 text-xs text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map(inv => {
                      const sc = statusConfig[inv.status];
                      return (
                        <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedInvoice(inv)}>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <FileText size={14} className="text-blue-600" />
                              <span className="text-sm text-blue-600">{inv.id}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900">{inv.client}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{inv.service}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{inv.period}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">{fmt(inv.amount)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 text-xs rounded-full ${sc.bg} ${sc.color}`}>{sc.label}</span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{inv.dueDate}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                              <button 
                                onClick={() => setShowViewInvoice(inv)}
                                className="p-1.5 hover:bg-blue-50 rounded transition-colors group"
                                title="View Invoice"
                              >
                                <Eye size={14} className="text-gray-500 group-hover:text-blue-600" />
                              </button>
                              <button 
                                onClick={() => {
                                  alert(`Downloading ${inv.id}.pdf...`);
                                }}
                                className="p-1.5 hover:bg-green-50 rounded transition-colors group"
                                title="Download PDF"
                              >
                                <Download size={14} className="text-gray-500 group-hover:text-green-600" />
                              </button>
                              <button 
                                onClick={() => setShowSendInvoice(inv)}
                                className="p-1.5 hover:bg-purple-50 rounded transition-colors group"
                                title="Send Invoice"
                              >
                                <Send size={14} className="text-gray-500 group-hover:text-purple-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {/* Timesheets Tab */}
        {activeTab === 'timesheets' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Week ending 7 June 2026 — {timesheets.length} timesheets</div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <Download size={16} /> Export to Payroll
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                  <CheckCircle size={16} /> Approve All Pending
                </button>
              </div>
            </div>
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-xs text-gray-500">Staff Member</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500">Role</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500">Period</th>
                      <th className="text-right py-3 px-4 text-xs text-gray-500">Reg Hours</th>
                      <th className="text-right py-3 px-4 text-xs text-gray-500">Overtime</th>
                      <th className="text-right py-3 px-4 text-xs text-gray-500">Rate</th>
                      <th className="text-right py-3 px-4 text-xs text-gray-500">Total</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500">Status</th>
                      <th className="text-right py-3 px-4 text-xs text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timesheets.map(ts => {
                      const sc = statusConfig[ts.status as keyof typeof statusConfig];
                      return (
                        <tr key={ts.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="text-sm text-gray-900">{ts.staff}</div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{ts.role}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{ts.period}</td>
                          <td className="py-3 px-4 text-sm text-gray-900 text-right">{ts.hours}h</td>
                          <td className="py-3 px-4 text-right">
                            <span className={`text-sm ${ts.overtime > 0 ? 'text-amber-600' : 'text-gray-400'}`}>
                              {ts.overtime > 0 ? `+${ts.overtime}h` : '—'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 text-right">£{ts.rate.toFixed(2)}/h</td>
                          <td className="py-3 px-4 text-sm text-gray-900 text-right">{fmt(ts.total)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 text-xs rounded-full ${sc?.bg} ${sc?.color}`}>{sc?.label}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-2">
                              {ts.status === 'pending' && (
                                <button 
                                  onClick={() => setShowApproveTimesheet(ts)}
                                  className="px-3 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                                >
                                  Approve
                                </button>
                              )}
                              <button 
                                onClick={() => setShowViewTimesheet(ts)}
                                className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-200">
                      <td colSpan={6} className="py-3 px-4 text-sm text-gray-600">Total</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">
                        {fmt(timesheets.reduce((s, t) => s + t.total, 0))}
                      </td>
                      <td colSpan={2} />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Card>
          </>
        )}

        {/* Payroll Tab */}
        {activeTab === 'payroll' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <div className="text-sm text-gray-600 mb-4">Payroll Run — June 2026</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Gross Pay', value: fmt(42680), color: 'text-gray-900' },
                    { label: 'Deductions', value: fmt(8320), color: 'text-red-600' },
                    { label: 'Net Pay', value: fmt(34360), color: 'text-green-600' },
                  ].map((s, i) => (
                    <div key={i} className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                      <div className={`text-xl ${s.color}`}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    { step: 'Timesheets Approved', done: true },
                    { step: 'HMRC Calculation Generated', done: true },
                    { step: 'Payslips Generated', done: false },
                    { step: 'Bank File Created', done: false },
                    { step: 'Payroll Submitted', done: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {s.done ? <CheckCircle size={16} className="text-green-500" /> : <Circle size={16} className="text-gray-300" />}
                      <span className={`text-sm ${s.done ? 'text-gray-500' : 'text-gray-700'}`}>{s.step}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowRunPayroll(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <RefreshCw size={16} /> Run Payroll
                  </button>
                  <button 
                    onClick={() => alert('Bank file download started...')}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Download size={16} /> Download Bank File
                  </button>
                </div>
              </Card>
            </div>
            <div>
              <Card>
                <div className="text-sm text-gray-600 mb-4">Payroll Settings</div>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Pay Frequency', value: 'Monthly' },
                    { label: 'Pay Day', value: '25th of month' },
                    { label: 'Tax Year', value: '2025/2026' },
                    { label: 'PAYE Reference', value: '123/AB456' },
                    { label: 'Pension Scheme', value: 'NEST' },
                    { label: 'Auto-Enrolment', value: 'Active' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-gray-500">{s.label}</span>
                      <span className="text-gray-900">{s.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Funding Tab */}
        {activeTab === 'funding' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Building2 size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-700 font-semibold">Active Funders</div>
                    <div className="text-xl text-blue-900 font-bold">{fundingList.filter(f => f.status === 'active').length}</div>
                  </div>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Users size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-green-700 font-semibold">Funded Service Users</div>
                    <div className="text-xl text-green-900 font-bold">{fundingList.reduce((sum, f) => sum + (f.status === 'active' ? f.serviceUsers : 0), 0)}</div>
                  </div>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <PoundSterling size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-purple-700 font-semibold">Weekly Revenue</div>
                    <div className="text-xl text-purple-900 font-bold">{fmt(fundingList.reduce((sum, f) => sum + (f.status === 'active' ? f.weeklyValue : 0), 0))}</div>
                  </div>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                    <Calendar size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-700 font-semibold">Reviews Due</div>
                    <div className="text-xl text-amber-900 font-bold">
                      {fundingList.filter(f => f.status === 'active' && f.nextReview !== 'Rolling' && new Date(f.nextReview) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Funding Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {fundingList.map((f) => {
                const monthlyValue = f.weeklyValue * 4.33;
                const annualValue = f.weeklyValue * 52;
                
                return (
                  <Card key={f.id} className="hover:shadow-lg transition-all relative group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Building2 size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-900 mb-1">{f.funder}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{f.type}</span>
                            {f.trend && (
                              <span className={`text-xs flex items-center gap-0.5 ${
                                f.trend.startsWith('+') ? 'text-green-600' : f.trend.startsWith('-') ? 'text-red-600' : 'text-gray-500'
                              }`}>
                                {f.trend.startsWith('+') ? <TrendingUp size={10} /> : f.trend.startsWith('-') ? <TrendingDown size={10} /> : null}
                                {f.trend}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                        f.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {f.status === 'active' ? 'Active' : 'Ended'}
                      </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5">
                        <div className="text-xs text-blue-700 mb-0.5">Service Users</div>
                        <div className="text-lg text-blue-900">{f.serviceUsers}</div>
                      </div>
                      <div className="bg-green-50 border border-green-100 rounded-lg p-2.5">
                        <div className="text-xs text-green-700 mb-0.5">Weekly</div>
                        <div className="text-lg text-green-900">{fmt(f.weeklyValue)}</div>
                      </div>
                      <div className="bg-purple-50 border border-purple-100 rounded-lg p-2.5">
                        <div className="text-xs text-purple-700 mb-0.5">Monthly</div>
                        <div className="text-sm text-purple-900">{fmt(monthlyValue)}</div>
                      </div>
                      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-2.5">
                        <div className="text-xs text-indigo-700 mb-0.5">Annual</div>
                        <div className="text-sm text-indigo-900">{fmt(annualValue)}</div>
                      </div>
                    </div>

                    {/* Contract Details */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 flex items-center gap-1.5">
                          <FileText size={11} /> Contract Term
                        </span>
                        <span className="text-gray-900">{f.contractStart} — {f.contractEnd}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 flex items-center gap-1.5">
                          <Clock size={11} /> Payment Terms
                        </span>
                        <span className="text-gray-900">{f.paymentTerms}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 flex items-center gap-1.5">
                          <Calendar size={11} /> Next Review
                        </span>
                        <span className={`font-medium ${
                          new Date(f.nextReview) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && f.nextReview !== 'Rolling'
                            ? 'text-amber-600'
                            : 'text-gray-900'
                        }`}>
                          {f.nextReview}
                        </span>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-1">Notes</div>
                      <div className="text-xs text-gray-700 bg-blue-50 rounded px-2 py-1.5">{f.notes}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowFundingDetails(f)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Eye size={12} /> View Details
                      </button>
                      <button 
                        onClick={() => alert(`Download report for ${f.funder}`)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Download size={12} /> Report
                      </button>
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setFundingOptionsMenu(fundingOptionsMenu === f.id ? null : f.id);
                          }}
                          className="flex items-center justify-center px-2 py-2 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <MoreVertical size={12} />
                        </button>
                        
                        {/* Options Dropdown Menu */}
                        {fundingOptionsMenu === f.id && (
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
                          >
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  setFundingOptionsMenu(null);
                                  setShowEditFundingModal(f);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                              >
                                <Edit size={14} /> Edit Funding Source
                              </button>
                              <button
                                onClick={() => {
                                  setFundingOptionsMenu(null);
                                  setFundingList(prev => prev.map(item => {
                                    if (item.id === f.id) {
                                      const parts = item.contractEnd.split(' ');
                                      const newYear = parts.length === 3 ? parseInt(parts[2]) + 1 : 2027;
                                      const endStr = parts.length === 3 ? `${parts[0]} ${parts[1]} ${newYear}` : '31 Mar 2028';
                                      return {
                                        ...item,
                                        contractEnd: endStr
                                      };
                                    }
                                    return item;
                                  }));
                                  triggerToast(`Contract for ${f.funder} renewed successfully until next year.`);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                              >
                                <RefreshCw size={14} /> Renew Contract
                              </button>
                              <button
                                onClick={() => {
                                  setFundingOptionsMenu(null);
                                  setShowFundingDetails({ ...f, defaultTab: 'payments' });
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                              >
                                <FileText size={14} /> View Invoices
                              </button>
                              <button
                                onClick={() => {
                                  setFundingOptionsMenu(null);
                                  triggerToast(`Downloading contract for ${f.funder}...`);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                              >
                                <Download size={14} /> Download Contract
                              </button>
                              <div className="border-t border-gray-100 my-1" />
                              <button
                                onClick={() => {
                                  setFundingOptionsMenu(null);
                                  triggerToast(`Payment reminder email & SMS sent to ${f.funder}.`);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                              >
                                <Mail size={14} /> Send Payment Reminder
                              </button>
                              <button
                                onClick={() => {
                                  setFundingOptionsMenu(null);
                                  triggerToast(`Initiating contact dialing session with ${f.funder} representative...`);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                              >
                                <Phone size={14} /> Contact Funder
                              </button>
                              <div className="border-t border-gray-100 my-1" />
                              <button
                                onClick={() => {
                                  setFundingOptionsMenu(null);
                                  if (confirm(`Are you sure you want to end the contract with ${f.funder}?`)) {
                                    setFundingList(prev => prev.map(item => item.id === f.id ? { ...item, status: 'inactive' } : item));
                                    triggerToast(`Contract with ${f.funder} ended.`);
                                  }
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                              >
                                <XCircle size={14} /> End Contract
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Review Due Badge (if applicable) */}
                    {new Date(f.nextReview) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && f.nextReview !== 'Rolling' && (
                      <div className="absolute top-3 left-3 w-3 h-3 bg-amber-500 rounded-full animate-pulse" title="Review due soon" />
                    )}
                  </Card>
                );
              })}
            </div>

            {/* Add New Funder Button */}
            <div className="flex justify-center pt-4">
              <button 
                onClick={() => setShowAddFundingModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors font-semibold shadow-sm"
              >
                <Plus size={16} /> Add New Funding Source
              </button>
            </div>
          </div>
        )}

        <div className="text-center py-6 text-xs text-gray-400 border-t border-gray-100 mt-8">
          Powered by MployUs
        </div>
      </div>
    </main>

      {showNewInvoice && (
        <NewInvoiceModal onClose={() => setShowNewInvoice(false)} />
      )}
      
      {showViewInvoice && (
        <ViewInvoiceModal invoice={showViewInvoice} onClose={() => setShowViewInvoice(null)} />
      )}
      
      {showSendInvoice && (
        <SendInvoiceModal invoice={showSendInvoice} onClose={() => setShowSendInvoice(null)} />
      )}
      
      {showViewTimesheet && (
        <ViewTimesheetModal 
          timesheet={showViewTimesheet} 
          onClose={() => setShowViewTimesheet(null)}
          onApprove={showViewTimesheet.status === 'pending' ? () => {
            alert(`Timesheet for ${showViewTimesheet.staff} approved!`);
            setShowViewTimesheet(null);
          } : undefined}
        />
      )}
      
      {showApproveTimesheet && (
        <ApproveTimesheetModal 
          timesheet={showApproveTimesheet} 
          onClose={() => setShowApproveTimesheet(null)}
          onConfirm={() => {
            alert(`Timesheet for ${showApproveTimesheet.staff} approved and added to payroll!`);
          }}
        />
      )}
      
      {showRunPayroll && (
        <RunPayrollModal 
          onClose={() => setShowRunPayroll(false)}
          onConfirm={() => {
            alert('✅ Payroll processed successfully!\n\n• Payslips generated\n• BACS file created\n• HMRC submission sent\n• Staff notified via email');
          }}
        />
      )}
      
      {showFundingDetails && (
        <ViewFundingDetailsModal 
          funding={showFundingDetails}
          onClose={() => setShowFundingDetails(null)}
          onEdit={(f) => {
            setShowFundingDetails(null);
            setShowEditFundingModal(f);
          }}
          onTriggerToast={triggerToast}
          onViewInvoice={handleViewInvoiceFromRef}
        />
      )}

      {showAddFundingModal && (
        <FundingModal 
          onClose={() => setShowAddFundingModal(false)}
          onSave={(data) => {
            setFundingList(prev => [...prev, data]);
            triggerToast(`Funding source "${data.funder}" added successfully.`);
          }}
        />
      )}

      {showEditFundingModal && (
        <FundingModal 
          initial={showEditFundingModal}
          onClose={() => setShowEditFundingModal(null)}
          onSave={(data) => {
            setFundingList(prev => prev.map(item => item.id === data.id ? { ...item, ...data } : item));
            triggerToast(`Funding source "${data.funder}" updated successfully.`);
          }}
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