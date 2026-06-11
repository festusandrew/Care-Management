import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { useState } from 'react';
import {
  Download, Calendar, TrendingUp, TrendingDown, Users, Clock,
  AlertCircle, CheckCircle, Pill, Activity, BarChart3, RefreshCw,
  ChevronDown, ArrowUpRight, ArrowDownRight, FileText, Shield, Plus
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart,
  Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend
} from 'recharts';

type AnalyticsTab = 'overview' | 'staffing' | 'care' | 'medication' | 'incidents' | 'regulatory';

const staffingTrend = [
  { month: 'Jan', filled: 92, agency: 8, absent: 5 },
  { month: 'Feb', filled: 88, agency: 12, absent: 7 },
  { month: 'Mar', filled: 94, agency: 6, absent: 4 },
  { month: 'Apr', filled: 90, agency: 10, absent: 6 },
  { month: 'May', filled: 96, agency: 4, absent: 3 },
  { month: 'Jun', filled: 94, agency: 6, absent: 4 },
];

const visitCompletionData = [
  { month: 'Jan', completed: 94, missed: 6 },
  { month: 'Feb', completed: 91, missed: 9 },
  { month: 'Mar', completed: 96, missed: 4 },
  { month: 'Apr', completed: 93, missed: 7 },
  { month: 'May', completed: 97, missed: 3 },
  { month: 'Jun', completed: 95, missed: 5 },
];

const medicationCompliance = [
  { month: 'Jan', administered: 97, missed: 2, refused: 1 },
  { month: 'Feb', administered: 96, missed: 3, refused: 1 },
  { month: 'Mar', administered: 98, missed: 1, refused: 1 },
  { month: 'Apr', administered: 95, missed: 4, refused: 1 },
  { month: 'May', administered: 98, missed: 1, refused: 1 },
  { month: 'Jun', administered: 97, missed: 2, refused: 1 },
];

const incidentTrend = [
  { month: 'Jan', total: 12, serious: 2, minor: 10 },
  { month: 'Feb', total: 15, serious: 3, minor: 12 },
  { month: 'Mar', total: 9, serious: 1, minor: 8 },
  { month: 'Apr', total: 11, serious: 2, minor: 9 },
  { month: 'May', total: 8, serious: 1, minor: 7 },
  { month: 'Jun', total: 6, serious: 0, minor: 6 },
];

const serviceUsersByRisk = [
  { name: 'High Risk', value: 6, color: '#EF4444' },
  { name: 'Medium Risk', value: 10, color: '#F59E0B' },
  { name: 'Low Risk', value: 8, color: '#10B981' },
];

const trainingCompliance = [
  { subject: 'Safeguarding', score: 96 },
  { subject: 'Fire Safety', score: 78 },
  { subject: 'First Aid', score: 88 },
  { subject: 'Medication', score: 92 },
  { subject: 'Moving & Handling', score: 85 },
  { subject: 'Mental Health', score: 80 },
];

const COLORS = ['#1D4ED8', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('overview');
  const [dateRange, setDateRange] = useState('last-6-months');

  const kpis = [
    { label: 'Care Delivery Rate', value: '96.4%', trend: '+1.2%', positive: true, icon: CheckCircle },
    { label: 'Med Compliance', value: '97.8%', trend: '+0.5%', positive: true, icon: Pill },
    { label: 'Staff Fill Rate', value: '94%', trend: '-2%', positive: false, icon: Users },
    { label: 'Incidents (Jun)', value: '6', trend: '-25%', positive: true, icon: AlertCircle },
    { label: 'Avg Carer Hours', value: '38.2h', trend: '+0.8h', positive: null, icon: Clock },
    { label: 'Compliance Score', value: '89%', trend: '+4%', positive: true, icon: Shield },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Analytics" />
      <TopBar />

      <main className="ml-64 pt-24 px-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl text-gray-900">Analytics & Reporting</h1>
            <p className="text-sm text-gray-600 mt-1">KPI dashboards, trends, and regulatory reporting</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700"
            >
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-6-months">Last 6 Months</option>
              <option value="year-to-date">Year to Date</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <RefreshCw size={16} /> Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <Card key={i}>
                <div className="flex items-center justify-between mb-2">
                  <Icon size={16} className={kpi.positive === false ? 'text-red-500' : kpi.positive ? 'text-green-500' : 'text-blue-500'} />
                  <span className={`text-xs flex items-center gap-0.5 ${kpi.positive === false ? 'text-red-500' : kpi.positive ? 'text-green-500' : 'text-gray-500'}`}>
                    {kpi.positive !== null && (kpi.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />)}
                    {kpi.trend}
                  </span>
                </div>
                <div className="text-xl text-gray-900">{kpi.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{kpi.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
          {(['overview', 'staffing', 'care', 'medication', 'incidents', 'regulatory'] as AnalyticsTab[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab === 'regulatory' ? 'Regulatory' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="text-sm text-gray-600 mb-4">Visit Completion Rate (%)</div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart id="visit-completion-chart" data={visitCompletionData}>
                  <CartesianGrid key="visit-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis key="visit-x" dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis key="visit-y" domain={[80, 100]} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={v => `${v}%`} />
                  <Tooltip key="visit-tooltip" formatter={(v: any) => `${v}%`} />
                  <Area key="visit-area-completed" type="monotone" dataKey="completed" stroke="#10B981" fill="#D1FAE5" name="Completed" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <div className="text-sm text-gray-600 mb-4">Service User Risk Distribution</div>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="50%" height={200}>
                  <PieChart id="risk-distribution-chart">
                    <Pie key="risk-pie" data={serviceUsersByRisk} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={3}>
                      {serviceUsersByRisk.map((entry, i) => <Cell key={`risk-cell-${i}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip key="risk-tooltip" />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 flex-1">
                  {serviceUsersByRisk.map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                        <span className="text-sm text-gray-600">{r.name}</span>
                      </div>
                      <span className="text-sm text-gray-900">{r.value}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total</span>
                      <span className="text-sm text-gray-900">24</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-sm text-gray-600 mb-4">Incident Trend</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart id="incident-trend-chart" data={incidentTrend}>
                  <CartesianGrid key="incident-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis key="incident-x" dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis key="incident-y" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip key="incident-tooltip" />
                  <Bar key="incident-bar-serious" dataKey="serious" stackId="a" fill="#EF4444" radius={[0, 0, 0, 0]} name="Serious" />
                  <Bar key="incident-bar-minor" dataKey="minor" stackId="a" fill="#FCA5A5" radius={[4, 4, 0, 0]} name="Minor" />
                  <Legend key="incident-legend" wrapperStyle={{ fontSize: '12px' }} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <div className="text-sm text-gray-600 mb-4">Training Compliance by Module (%)</div>
              <div className="space-y-3 mt-2">
                {trainingCompliance.map((t, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{t.subject}</span>
                      <span className={`text-sm ${t.score >= 90 ? 'text-green-600' : t.score >= 80 ? 'text-amber-600' : 'text-red-600'}`}>{t.score}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${t.score >= 90 ? 'bg-green-500' : t.score >= 80 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${t.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Staffing Tab */}
        {activeTab === 'staffing' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Headcount', value: '38', sub: 'Full & part time' },
                { label: 'Vacancy Rate', value: '6%', sub: '3 open positions' },
                { label: 'Agency Usage', value: '8%', sub: 'This month' },
                { label: 'Turnover (YTD)', value: '12%', sub: 'vs 18% last year' },
              ].map((s, i) => (
                <Card key={i}>
                  <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                  <div className="text-2xl text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <div className="text-sm text-gray-600 mb-4">Staff Fill Rate vs Agency Usage (%)</div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart id="staffing-fill-chart" data={staffingTrend}>
                    <CartesianGrid key="staffing-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis key="staffing-x" dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <YAxis key="staffing-y" tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={v => `${v}%`} />
                    <Tooltip key="staffing-tooltip" formatter={(v: any) => `${v}%`} />
                    <Bar key="staffing-bar-filled" dataKey="filled" fill="#1D4ED8" radius={[4, 4, 0, 0]} name="Permanent Fill Rate" />
                    <Bar key="staffing-bar-agency" dataKey="agency" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Agency Usage" />
                    <Legend key="staffing-legend" wrapperStyle={{ fontSize: '12px' }} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <div className="text-sm text-gray-600 mb-4">Absence Rate (%)</div>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart id="absence-rate-chart" data={staffingTrend}>
                    <CartesianGrid key="absence-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis key="absence-x" dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <YAxis key="absence-y" tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={v => `${v}%`} />
                    <Tooltip key="absence-tooltip" formatter={(v: any) => `${v}%`} />
                    <Line key="absence-line-absent" type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 4 }} name="Absence Rate" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="lg:col-span-2">
                <div className="text-sm text-gray-600 mb-4">Staff Distribution by Role</div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-4 text-xs text-gray-500">Role</th>
                        <th className="text-right py-2 px-4 text-xs text-gray-500">Headcount</th>
                        <th className="text-right py-2 px-4 text-xs text-gray-500">FTE</th>
                        <th className="text-right py-2 px-4 text-xs text-gray-500">Vacancies</th>
                        <th className="text-left py-2 px-4 text-xs text-gray-500">Fill Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { role: 'Support Worker', headcount: 18, fte: 16.2, vacancies: 2, fill: 90 },
                        { role: 'Senior Carer', headcount: 8, fte: 7.6, vacancies: 1, fill: 88 },
                        { role: 'Team Leader', headcount: 4, fte: 4.0, vacancies: 0, fill: 100 },
                        { role: 'Care Coordinator', headcount: 3, fte: 3.0, vacancies: 0, fill: 100 },
                        { role: 'Night Support', headcount: 5, fte: 4.5, vacancies: 1, fill: 83 },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">{row.role}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 text-right">{row.headcount}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 text-right">{row.fte}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={`text-sm ${row.vacancies > 0 ? 'text-amber-600' : 'text-gray-400'}`}>{row.vacancies}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${row.fill >= 95 ? 'bg-green-500' : row.fill >= 85 ? 'bg-amber-500' : 'bg-red-500'}`}
                                  style={{ width: `${row.fill}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-600 w-8">{row.fill}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Care Tab */}
        {activeTab === 'care' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Active Service Users', value: '24', sub: '+2 this month' },
                { label: 'Visits Completed', value: '1,248', sub: 'This month' },
                { label: 'Care Plans Due Review', value: '8', sub: '2 overdue' },
                { label: 'Avg Satisfaction', value: '4.7/5', sub: 'Family feedback' },
              ].map((s, i) => (
                <Card key={i}>
                  <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                  <div className="text-2xl text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <div className="text-sm text-gray-600 mb-4">Visit Completion vs Missed Visits</div>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart id="visit-completion-detail-chart" data={visitCompletionData}>
                    <CartesianGrid key="visit-detail-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis key="visit-detail-x" dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <YAxis key="visit-detail-y" tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={v => `${v}%`} />
                    <Tooltip key="visit-detail-tooltip" formatter={(v: any) => `${v}%`} />
                    <Area key="visit-detail-area-completed" type="monotone" dataKey="completed" stroke="#10B981" fill="#D1FAE5" name="Completed" />
                    <Area key="visit-detail-area-missed" type="monotone" dataKey="missed" stroke="#EF4444" fill="#FEE2E2" name="Missed" />
                    <Legend key="visit-detail-legend" wrapperStyle={{ fontSize: '12px' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <div className="text-sm text-gray-600 mb-4">Care Plan Review Status</div>
                <div className="space-y-3">
                  {[
                    { user: 'Sarah Johnson', reviewer: 'Dr. Emily Carter', due: '20 Jun 2026', status: 'scheduled', daysLeft: 11 },
                    { user: 'Michael Thompson', reviewer: 'Sarah Williams', due: '5 Jun 2026', status: 'overdue', daysLeft: -4 },
                    { user: 'Oliver Parker', reviewer: 'James Mitchell', due: '8 Jun 2026', status: 'overdue', daysLeft: -1 },
                    { user: 'Emma Roberts', reviewer: 'Dr. Emily Carter', due: '1 Jul 2026', status: 'upcoming', daysLeft: 22 },
                    { user: 'Lucas Chen', reviewer: 'Sarah Williams', due: '15 Jun 2026', status: 'upcoming', daysLeft: 6 },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <div className="text-sm text-gray-900">{r.user}</div>
                        <div className="text-xs text-gray-500">{r.reviewer}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{r.due}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          r.status === 'overdue' ? 'bg-red-100 text-red-700' :
                          r.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {r.status === 'overdue' ? `${Math.abs(r.daysLeft)}d overdue` :
                           r.status === 'scheduled' ? 'Scheduled' :
                           `${r.daysLeft}d`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Medication Tab */}
        {activeTab === 'medication' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'MAR Compliance', value: '97.8%', sub: '+0.5% this month', color: 'text-green-600' },
                { label: 'Missed Doses', value: '6', sub: 'This month', color: 'text-amber-600' },
                { label: 'PRN Administrations', value: '42', sub: 'This month', color: 'text-blue-600' },
                { label: 'Prescriptions Expiring', value: '3', sub: 'Within 30 days', color: 'text-red-600' },
              ].map((s, i) => (
                <Card key={i}>
                  <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                  <div className={`text-2xl ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
                </Card>
              ))}
            </div>

            <Card>
              <div className="text-sm text-gray-600 mb-4">MAR Compliance Trend (%)</div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart id="medication-compliance-chart" data={medicationCompliance}>
                  <CartesianGrid key="medication-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis key="medication-x" dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis key="medication-y" domain={[90, 100]} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={v => `${v}%`} />
                  <Tooltip key="medication-tooltip" formatter={(v: any) => `${v}%`} />
                  <Line key="medication-line-administered" type="monotone" dataKey="administered" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 4 }} name="Administered" />
                  <Line key="medication-line-missed" type="monotone" dataKey="missed" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 4 }} name="Missed" />
                  <Legend key="medication-legend" wrapperStyle={{ fontSize: '12px' }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* Incidents Tab */}
        {activeTab === 'incidents' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Incidents (Jun)', value: '6', sub: '-25% vs May', color: 'text-green-600' },
                { label: 'Serious Incidents', value: '0', sub: 'None this month', color: 'text-green-600' },
                { label: 'Pending Review', value: '2', sub: 'Manager action required', color: 'text-amber-600' },
                { label: 'Avg Resolution Time', value: '3.2d', sub: 'vs 4.1d last month', color: 'text-blue-600' },
              ].map((s, i) => (
                <Card key={i}>
                  <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                  <div className={`text-2xl ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <div className="text-sm text-gray-600 mb-4">Incident Trend (6 months)</div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart id="incident-trend-detail-chart" data={incidentTrend}>
                    <CartesianGrid key="incident-detail-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis key="incident-detail-x" dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <YAxis key="incident-detail-y" tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <Tooltip key="incident-detail-tooltip" />
                    <Bar key="incident-detail-bar-serious" dataKey="serious" stackId="a" fill="#EF4444" name="Serious" />
                    <Bar key="incident-detail-bar-minor" dataKey="minor" stackId="a" fill="#FCA5A5" radius={[4, 4, 0, 0]} name="Minor" />
                    <Legend key="incident-detail-legend" wrapperStyle={{ fontSize: '12px' }} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <div className="text-sm text-gray-600 mb-4">Incident Types (Jun 2026)</div>
                <div className="space-y-3 mt-2">
                  {[
                    { type: 'Behaviour / Aggression', count: 2, pct: 33 },
                    { type: 'Falls / Accidents', count: 1, pct: 17 },
                    { type: 'Self-harm', count: 1, pct: 17 },
                    { type: 'Property Damage', count: 1, pct: 17 },
                    { type: 'Medication Error', count: 1, pct: 17 },
                  ].map((t, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{t.type}</span>
                        <span className="text-sm text-gray-900">{t.count}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 rounded-full" style={{ width: `${t.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Regulatory Tab */}
        {activeTab === 'regulatory' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Overall Compliance', value: '89%', sub: '+4% this quarter', color: 'text-green-600' },
                { label: 'CQC Readiness', value: '87%', sub: '3 items outstanding', color: 'text-amber-600' },
                { label: 'Staff DBS Valid', value: '97%', sub: '1 renewal pending', color: 'text-green-600' },
                { label: 'Training Complete', value: '84%', sub: '6 staff outstanding', color: 'text-amber-600' },
              ].map((s, i) => (
                <Card key={i}>
                  <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                  <div className={`text-2xl ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <div className="text-sm text-gray-600 mb-4">CQC Key Lines of Enquiry (KLOEs)</div>
                <div className="space-y-3">
                  {[
                    { kloe: 'Safe', score: 88, status: 'good' },
                    { kloe: 'Effective', score: 91, status: 'good' },
                    { kloe: 'Caring', score: 95, status: 'outstanding' },
                    { kloe: 'Responsive', score: 87, status: 'good' },
                    { kloe: 'Well-led', score: 82, status: 'good' },
                  ].map((k, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-700">{k.kloe}</div>
                      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${k.score >= 90 ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${k.score}%` }}
                        />
                      </div>
                      <div className="w-10 text-sm text-gray-900 text-right">{k.score}%</div>
                      <span className={`px-2 py-0.5 text-xs rounded-full w-24 text-center ${
                        k.status === 'outstanding' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {k.status === 'outstanding' ? 'Outstanding' : 'Good'}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="text-sm text-gray-600 mb-4">Regulatory Actions Required</div>
                <div className="space-y-3">
                  {[
                    { action: 'Update Safeguarding Policy', priority: 'high', due: '15 Jun 2026', owner: 'Dr. Emily Carter' },
                    { action: 'Complete staff supervision records', priority: 'medium', due: '20 Jun 2026', owner: 'All Team Leaders' },
                    { action: 'Fire Risk Assessment renewal', priority: 'medium', due: '30 Jun 2026', owner: 'Facilities Manager' },
                    { action: 'Medication policy review', priority: 'low', due: '31 Jul 2026', owner: 'Clinical Lead' },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${a.priority === 'high' ? 'bg-red-500' : a.priority === 'medium' ? 'bg-amber-500' : 'bg-gray-300'}`} />
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">{a.action}</div>
                        <div className="text-xs text-gray-500">{a.owner} • Due {a.due}</div>
                      </div>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        a.priority === 'high' ? 'bg-red-100 text-red-700' :
                        a.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {a.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">Statutory Reports</div>
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus size={12} /> Generate Report
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-4 text-xs text-gray-500">Report</th>
                      <th className="text-left py-2 px-4 text-xs text-gray-500">Frequency</th>
                      <th className="text-left py-2 px-4 text-xs text-gray-500">Last Generated</th>
                      <th className="text-left py-2 px-4 text-xs text-gray-500">Next Due</th>
                      <th className="text-right py-2 px-4 text-xs text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { report: 'CQC Provider Information Return', frequency: 'Annual', last: 'Apr 2026', next: 'Apr 2027' },
                      { report: 'Safeguarding Referral Log', frequency: 'Monthly', last: 'May 2026', next: 'Jun 2026' },
                      { report: 'Medication Administration Report', frequency: 'Monthly', last: 'May 2026', next: 'Jun 2026' },
                      { report: 'Notifiable Incidents (Regulation 18)', frequency: 'As required', last: 'Mar 2026', next: 'As required' },
                      { report: 'Staffing Levels Report', frequency: 'Monthly', last: 'May 2026', next: 'Jun 2026' },
                    ].map((r, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{r.report}</td>
                        <td className="py-3 px-4 text-sm text-gray-500">{r.frequency}</td>
                        <td className="py-3 px-4 text-sm text-gray-500">{r.last}</td>
                        <td className="py-3 px-4 text-sm text-gray-500">{r.next}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="px-3 py-1 text-xs text-blue-600 bg-blue-50 rounded hover:bg-blue-100">Generate</button>
                            <button className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200"><Download size={12} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        <div className="text-center py-6 text-xs text-gray-400 border-t border-gray-100 mt-8">
          MpoweredCare © 2025 — Internal Use Only
        </div>
      </main>
    </div>
  );
}

