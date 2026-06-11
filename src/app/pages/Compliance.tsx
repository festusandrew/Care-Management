import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Badge } from '../components/Badge';
import { AddAuditModal } from '../components/AddAuditModal';
import { AuditDetailsModal } from '../components/AuditDetailsModal';
import { RenewTrainingModal } from '../components/RenewTrainingModal';
import { AssignTrainingModal } from '../components/AssignTrainingModal';
import { AddCertificateModal } from '../components/AddCertificateModal';
import { ViewAllRenewalsModal } from '../components/ViewAllRenewalsModal';
import { AddRequirementModal } from '../components/AddRequirementModal';
import { RequirementDetailModal } from '../components/RequirementDetailModal';
import { ResolveGapModal } from '../components/ResolveGapModal';
import { RiskAssessmentDetailModal } from '../components/RiskAssessmentDetailModal';
import { ExportReportModal } from '../components/ExportReportModal';
import {
  Search,
  Filter,
  Plus,
  Download,
  Calendar,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Award,
  BookOpen,
  Eye,
  TrendingUp,
  TrendingDown,
  BarChart3,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Info,
  ListChecks,
  Scale,
  ClipboardCheck,
  MoreVertical,
  User,
  Bell
} from 'lucide-react';
import { useState } from 'react';

type TabType = 'overview' | 'requirements' | 'audits' | 'compliance-gaps' | 'risk-assessment' | 'reports' | 'legislation';

export default function Compliance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddAudit, setShowAddAudit] = useState(false);
  const [showAuditDetails, setShowAuditDetails] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [showRenewTraining, setShowRenewTraining] = useState(false);
  const [selectedRenewal, setSelectedRenewal] = useState<any>(null);
  const [showAssignTraining, setShowAssignTraining] = useState(false);
  const [showAddCertificate, setShowAddCertificate] = useState(false);
  const [showAllRenewals, setShowAllRenewals] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('requirements');
  const [showAddRequirement, setShowAddRequirement] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterRisk, setFilterRisk] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [selectedRequirement, setSelectedRequirement] = useState<any>(null);
  const [showRequirementDetail, setShowRequirementDetail] = useState(false);
  const [selectedGap, setSelectedGap] = useState<any>(null);
  const [showResolveGap, setShowResolveGap] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<any>(null);
  const [showRiskDetail, setShowRiskDetail] = useState(false);
  const [showExportReport, setShowExportReport] = useState(false);
  const [exportReportTitle, setExportReportTitle] = useState('');

  const stats = {
    complianceRate: 58,
    requirementsMet: 7,
    totalRequirements: 12,
    complianceChange: '+5%',
    auditsDue: 2,
    auditsOverdue: 1,
    auditsTotal: 8,
    complianceGaps: 7,
    gapsCritical: 2,
    gapsTotal: 7,
    gapsChange: '+2',
    avgAuditScore: 91,
    completedAudits: 6,
    auditScoreChange: '+8%',
  };

  const requirements = [
    {
      id: 1,
      name: 'GDPR Data Protection Impact Assessment',
      legislation: 'GDPR Article 35 / Data Protection Act 2018',
      client: 'Crestfield Technologies DAC',
      category: 'GDPR & Data Protection',
      status: 'at-risk' as const,
      risk: 'high' as const,
      progress: 65,
      nextReview: '15 Apr 2026',
    },
    {
      id: 2,
      name: 'Working Time Act Compliance Review',
      legislation: 'Organisation of Working Time Act 1997',
      client: 'Harbour Fresh Foods Ltd',
      category: 'Working Time',
      status: 'compliant' as const,
      risk: 'low' as const,
      progress: 100,
      nextReview: '20 Jul 2026',
    },
    {
      id: 3,
      name: 'Safety Statement & Risk Assessments',
      legislation: 'Safety, Health and Welfare at Work Act 2005',
      client: 'Stronghold Construction Group Ltd',
      category: 'Health & Safety',
      status: 'non-compliant' as const,
      risk: 'critical' as const,
      progress: 45,
      nextReview: '15 Feb 2026',
    },
    {
      id: 4,
      name: 'Employment Equality Acts Compliance',
      legislation: 'Employment Equality Acts 1998-2015',
      client: 'Crestfield Technologies DAC',
      category: 'Employee Equality',
      status: 'compliant' as const,
      risk: 'low' as const,
      progress: 100,
      nextReview: '28 Apr 2026',
    },
    {
      id: 5,
      name: 'PAYE Modernisation Compliance',
      legislation: 'Finance Act 2017 (PAYE)',
      client: 'Harbour Fresh Foods Ltd',
      category: 'Payroll & Revenue',
      status: 'compliant' as const,
      risk: 'medium' as const,
      progress: 100,
      nextReview: '1 Aug 2026',
    },
    {
      id: 6,
      name: 'Unfair Dismissals Acts Compliance',
      legislation: 'Unfair Dismissals Acts 1977-2015',
      client: 'Stronghold Construction Group Ltd',
      category: 'WRC & Employment Law',
      status: 'pending-review' as const,
      risk: 'medium' as const,
      progress: 80,
      nextReview: '10 Feb 2026',
    },
    {
      id: 7,
      name: 'Terms of Employment Information Act',
      legislation: 'Terms of Employment (Information) Acts 1994-2014',
      client: 'Crestfield Technologies DAC',
      category: 'WRC & Employment Law',
      status: 'compliant' as const,
      risk: 'low' as const,
      progress: 100,
      nextReview: '25 Jul 2026',
    },
    {
      id: 8,
      name: 'Industrial Relations Acts Compliance',
      legislation: 'Industrial Relations Acts 1946-2015',
      client: 'Harbour Fresh Foods Ltd',
      category: 'Industrial Relations',
      status: 'at-risk' as const,
      risk: 'high' as const,
      progress: 70,
      nextReview: '4 May 2026',
    },
    {
      id: 9,
      name: 'National Minimum Wage Act Compliance',
      legislation: 'National Minimum Wage Act 2000',
      client: 'Harbour Fresh Foods Ltd',
      category: 'Payroll & Revenue',
      status: 'compliant' as const,
      risk: 'low' as const,
      progress: 100,
      nextReview: '18 Jun 2026',
    },
    {
      id: 10,
      name: 'GDPR Data Subject Access Requests',
      legislation: 'GDPR Article 15 / Data Protection Act 2018',
      client: 'Crestfield Technologies DAC',
      category: 'GDPR & Data Protection',
      status: 'compliant' as const,
      risk: 'medium' as const,
      progress: 100,
      nextReview: '3 May 2026',
    },
    {
      id: 11,
      name: 'HSA Construction Regulations',
      legislation: 'Safety, Health and Welfare at Work (Construction) Regulations 2013',
      client: 'Stronghold Construction Group Ltd',
      category: 'Health & Safety',
      status: 'at-risk' as const,
      risk: 'high' as const,
      progress: 60,
      nextReview: '20 Feb 2026',
    },
    {
      id: 12,
      name: 'Parental Leave and Benefit Acts',
      legislation: 'Parental Leave Acts 1998-2019',
      client: 'Crestfield Technologies DAC',
      category: 'WRC & Employment Law',
      status: 'compliant' as const,
      risk: 'low' as const,
      progress: 100,
      nextReview: '22 Jul 2026',
    },
  ];

  const audits = [
    {
      id: 1,
      auditNumber: 'AUD-2026-001',
      title: 'GDPR Compliance Audit',
      type: 'External',
      auditor: 'Data Protection Commission',
      scheduledDate: '15 Mar 2026',
      status: 'scheduled',
      department: 'Data Protection',
      findings: 0,
      actionItems: 0,
    },
    {
      id: 2,
      auditNumber: 'AUD-2026-002',
      title: 'Health & Safety Inspection',
      type: 'External',
      auditor: 'HSA Inspector',
      scheduledDate: '10 Feb 2026',
      status: 'in-progress',
      department: 'Health & Safety',
      findings: 3,
      actionItems: 3,
    },
    {
      id: 3,
      auditNumber: 'AUD-2026-003',
      title: 'Employment Law Compliance Review',
      type: 'Internal',
      auditor: 'Sarah Williams',
      scheduledDate: '5 Feb 2026',
      status: 'completed',
      department: 'HR & Employment',
      findings: 1,
      actionItems: 2,
      completionDate: '5 Feb 2026',
      overallRating: 'Good',
    },
    {
      id: 4,
      auditNumber: 'AUD-2026-004',
      title: 'Fire Safety Assessment',
      type: 'External',
      auditor: 'Fire Authority',
      scheduledDate: '20 Jan 2026',
      status: 'completed',
      department: 'Facilities',
      findings: 0,
      actionItems: 1,
      completionDate: '21 Jan 2026',
      overallRating: 'Excellent',
    },
    {
      id: 5,
      auditNumber: 'AUD-2026-005',
      title: 'Payroll & Revenue Compliance',
      type: 'Internal',
      auditor: 'James Mitchell',
      scheduledDate: '28 Feb 2026',
      status: 'scheduled',
      department: 'Finance',
      findings: 0,
      actionItems: 0,
    },
  ];

  const complianceGaps = [
    {
      id: 1,
      title: 'GDPR Impact Assessment Incomplete',
      requirement: 'GDPR Data Protection Impact Assessment',
      severity: 'critical' as const,
      daysOpen: 45,
      assignee: 'Sarah Williams',
      dueDate: '28 Feb 2026',
      description: 'DPIA not completed for new service user management system processing.',
    },
    {
      id: 2,
      title: 'Safety Statement Outdated',
      requirement: 'Safety Statement & Risk Assessments',
      severity: 'critical' as const,
      daysOpen: 30,
      assignee: 'James Mitchell',
      dueDate: '15 Mar 2026',
      description: 'Safety statement has not been reviewed following workplace changes.',
    },
    {
      id: 3,
      title: 'Fire Safety Training Records Gap',
      requirement: 'HSA Construction Regulations',
      severity: 'high' as const,
      daysOpen: 21,
      assignee: 'Mary Thompson',
      dueDate: '10 Mar 2026',
      description: '3 staff members missing mandatory fire safety refresher training.',
    },
    {
      id: 4,
      title: 'Employment Contract Updates Pending',
      requirement: 'Terms of Employment Information Act',
      severity: 'medium' as const,
      daysOpen: 14,
      assignee: 'John Davies',
      dueDate: '20 Mar 2026',
      description: 'New EU Transparent Working Conditions Directive changes not yet reflected.',
    },
    {
      id: 5,
      title: 'Dismissal Procedures Documentation',
      requirement: 'Unfair Dismissals Acts Compliance',
      severity: 'medium' as const,
      daysOpen: 10,
      assignee: 'Sarah Williams',
      dueDate: '25 Mar 2026',
      description: 'Disciplinary and grievance procedures require updating for WRC compliance.',
    },
    {
      id: 6,
      title: 'Industrial Relations Policy Gap',
      requirement: 'Industrial Relations Acts Compliance',
      severity: 'high' as const,
      daysOpen: 18,
      assignee: 'James Mitchell',
      dueDate: '12 Mar 2026',
      description: 'Collective bargaining procedures not formally documented.',
    },
    {
      id: 7,
      title: 'Risk Assessment Review Overdue',
      requirement: 'Safety Statement & Risk Assessments',
      severity: 'high' as const,
      daysOpen: 25,
      assignee: 'Mary Thompson',
      dueDate: '1 Mar 2026',
      description: 'Quarterly risk assessment review not completed for Q4.',
    },
  ];

  const legislationGuide = [
    {
      id: 1,
      name: 'General Data Protection Regulation (GDPR)',
      jurisdiction: 'EU',
      category: 'Data Protection',
      description: 'Regulation on data protection and privacy for all individuals within the EU and EEA.',
      lastUpdated: '25 May 2018',
      relevantArticles: ['Article 5 - Principles', 'Article 6 - Lawfulness', 'Article 15 - Right of Access', 'Article 35 - DPIA'],
      link: '#',
    },
    {
      id: 2,
      name: 'Data Protection Act 2018',
      jurisdiction: 'UK/IE',
      category: 'Data Protection',
      description: 'UK implementation of GDPR, supplementing and tailoring EU GDPR provisions.',
      lastUpdated: '23 May 2018',
      relevantArticles: ['Part 2 - General Processing', 'Part 3 - Law Enforcement', 'Schedule 1 - Conditions'],
      link: '#',
    },
    {
      id: 3,
      name: 'Safety, Health and Welfare at Work Act 2005',
      jurisdiction: 'IE',
      category: 'Health & Safety',
      description: 'Principal legislation governing occupational health and safety in Ireland.',
      lastUpdated: '1 Sep 2005',
      relevantArticles: ['Section 8 - General Duties', 'Section 19 - Hazard Identification', 'Section 20 - Safety Statement'],
      link: '#',
    },
    {
      id: 4,
      name: 'Employment Equality Acts 1998-2015',
      jurisdiction: 'IE',
      category: 'Employment Law',
      description: 'Prohibits discrimination across nine grounds including gender, age, disability, and race.',
      lastUpdated: '2015',
      relevantArticles: ['Section 6 - Discriminatory Grounds', 'Section 8 - Employment', 'Section 14 - Harassment'],
      link: '#',
    },
    {
      id: 5,
      name: 'Working Time Regulations 1998',
      jurisdiction: 'UK',
      category: 'Employment Law',
      description: 'Implements the EU Working Time Directive, regulating working hours, rest, and annual leave.',
      lastUpdated: '1 Oct 1998',
      relevantArticles: ['Reg 4 - Maximum Weekly Working Time', 'Reg 10 - Daily Rest', 'Reg 13 - Annual Leave'],
      link: '#',
    },
    {
      id: 6,
      name: 'Health and Safety at Work etc. Act 1974',
      jurisdiction: 'UK',
      category: 'Health & Safety',
      description: 'Primary piece of legislation covering occupational health and safety in Great Britain.',
      lastUpdated: '31 Jul 1974',
      relevantArticles: ['Section 2 - Duties of Employers', 'Section 3 - Duties to Non-employees', 'Section 7 - Duties of Employees'],
      link: '#',
    },
  ];

  const riskAssessments = [
    { area: 'Data Protection & GDPR', riskLevel: 'high' as const, score: 7.2, trend: 'up' as const, lastAssessed: '10 Feb 2026', controls: 12, gaps: 3 },
    { area: 'Health & Safety', riskLevel: 'critical' as const, score: 8.5, trend: 'up' as const, lastAssessed: '5 Feb 2026', controls: 18, gaps: 5 },
    { area: 'Employment Law', riskLevel: 'medium' as const, score: 4.8, trend: 'down' as const, lastAssessed: '12 Feb 2026', controls: 15, gaps: 2 },
    { area: 'Financial Compliance', riskLevel: 'low' as const, score: 2.1, trend: 'stable' as const, lastAssessed: '8 Feb 2026', controls: 10, gaps: 0 },
    { area: 'Equality & Diversity', riskLevel: 'low' as const, score: 1.8, trend: 'down' as const, lastAssessed: '15 Feb 2026', controls: 8, gaps: 0 },
    { area: 'Industrial Relations', riskLevel: 'high' as const, score: 6.9, trend: 'up' as const, lastAssessed: '3 Feb 2026', controls: 6, gaps: 3 },
  ];

  const upcomingRenewals = [
    { id: 1, item: 'GDPR Impact Assessment - Crestfield Technologies', dueDate: '15 Apr 2026', daysLeft: 50, priority: 'high' },
    { id: 2, item: 'Safety Statement Review - Stronghold Construction', dueDate: '15 Feb 2026', daysLeft: -9, priority: 'overdue' },
    { id: 3, item: 'HSA Inspection Prep - Stronghold Construction', dueDate: '20 Feb 2026', daysLeft: -4, priority: 'overdue' },
    { id: 4, item: 'Industrial Relations Policy - Harbour Fresh Foods', dueDate: '4 May 2026', daysLeft: 69, priority: 'medium' },
    { id: 5, item: 'Unfair Dismissals Review - Stronghold Construction', dueDate: '10 Feb 2026', daysLeft: -14, priority: 'overdue' },
    { id: 6, item: 'PAYE Compliance Check - Harbour Fresh Foods', dueDate: '1 Aug 2026', daysLeft: 158, priority: 'low' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Compliant</span>;
      case 'at-risk':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-red-50 text-red-700 border border-red-200">At Risk</span>;
      case 'non-compliant':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-red-50 text-red-800 border border-red-300">Non-Compliant</span>;
      case 'pending-review':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-amber-50 text-amber-700 border border-amber-200">Pending Review</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Completed</span>;
      case 'in-progress':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-blue-50 text-blue-700 border border-blue-200">In Progress</span>;
      case 'scheduled':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-gray-50 text-gray-600 border border-gray-200">Scheduled</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-gray-50 text-gray-600 border border-gray-200">{status}</span>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'critical':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-red-100 text-red-800 border border-red-300">Critical</span>;
      case 'high':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-red-50 text-red-700 border border-red-200">High</span>;
      case 'medium':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-amber-50 text-amber-700 border border-amber-200">Medium</span>;
      case 'low':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Low</span>;
      default:
        return null;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-emerald-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getProgressDotColor = (progress: number) => {
    if (progress >= 100) return 'bg-emerald-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const filteredRequirements = requirements.filter((req) => {
    const matchesSearch =
      searchQuery === '' ||
      req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.legislation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === '' || req.status === filterStatus;
    const matchesRisk = filterRisk === '' || req.risk === filterRisk;
    const matchesCategory = filterCategory === '' || req.category === filterCategory;
    const reqDate = req.nextReview ? new Date(req.nextReview.split(' ').reverse().join('-')) : null;
    const matchesDateFrom = !filterDateFrom || (reqDate && reqDate >= new Date(filterDateFrom));
    const matchesDateTo   = !filterDateTo   || (reqDate && reqDate <= new Date(filterDateTo));
    return matchesSearch && matchesStatus && matchesRisk && matchesCategory && matchesDateFrom && matchesDateTo;
  });

  const tabs: { key: TabType; label: string; icon: any }[] = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'requirements', label: 'Requirements', icon: ListChecks },
    { key: 'audits', label: 'Audits', icon: ClipboardCheck },
    { key: 'compliance-gaps', label: 'Compliance Gaps', icon: AlertTriangle },
    { key: 'risk-assessment', label: 'Risk Assessment', icon: Shield },
    { key: 'reports', label: 'Reports', icon: FileText },
    { key: 'legislation', label: 'Legislation Guide', icon: Scale },
  ];

  const categories = [...new Set(requirements.map((r) => r.category))];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Compliance" />
      <TopBar />

      <main className="ml-64 pt-24 px-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Shield size={20} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl text-gray-900">Compliance & Risk Management</h1>
              <p className="text-sm text-gray-500">Regulatory compliance tracking and audit management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
              onClick={() => {
                setExportReportTitle('');
                setShowExportReport(true);
              }}
            >
              <Download size={16} />
              Export Report
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm"
              onClick={() => setShowAddAudit(true)}
            >
              <Calendar size={16} />
              Schedule Audit
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Overall Compliance Rate */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle size={20} className="text-emerald-600" />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-xs">
                <TrendingUp size={14} />
                <span>{stats.complianceChange}</span>
              </div>
            </div>
            <div className="text-3xl text-gray-900 mb-1">{stats.complianceRate}%</div>
            <div className="text-sm text-gray-500">Overall Compliance Rate</div>
            <div className="text-xs text-gray-400 mt-0.5">{stats.requirementsMet}/{stats.totalRequirements} requirements met</div>
          </div>

          {/* Audits Due/In Progress */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Calendar size={20} className="text-blue-600" />
              </div>
              <div className="text-gray-400">
                <BarChart3 size={14} />
              </div>
            </div>
            <div className="text-3xl text-gray-900 mb-1">{stats.auditsDue}</div>
            <div className="text-sm text-gray-500">Audits Due/In Progress</div>
            <div className="text-xs text-gray-400 mt-0.5">{stats.auditsOverdue} overdue · {stats.auditsTotal} total</div>
          </div>

          {/* Open Compliance Gaps */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <div className="flex items-center gap-1 text-red-600 text-xs">
                <TrendingDown size={14} />
                <span>{stats.gapsChange}</span>
              </div>
            </div>
            <div className="text-3xl text-gray-900 mb-1">{stats.complianceGaps}</div>
            <div className="text-sm text-gray-500">Open Compliance Gaps</div>
            <div className="text-xs text-gray-400 mt-0.5">{stats.gapsCritical} critical · {stats.gapsTotal} total</div>
          </div>

          {/* Avg. Audit Score */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <BarChart3 size={20} className="text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-xs">
                <TrendingUp size={14} />
                <span>{stats.auditScoreChange}</span>
              </div>
            </div>
            <div className="text-3xl text-gray-900 mb-1">{stats.avgAuditScore}</div>
            <div className="text-sm text-gray-500">Avg. Audit Score</div>
            <div className="text-xs text-gray-400 mt-0.5">Last {stats.completedAudits} completed audits</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search compliance requirements, audits, legislation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm transition-colors ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              <Filter size={16} />
              Filters
            </button>
          </div>
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="compliant">Compliant</option>
                  <option value="at-risk">At Risk</option>
                  <option value="non-compliant">Non-Compliant</option>
                  <option value="pending-review">Pending Review</option>
                </select>
                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Risk Levels</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Date range filter */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={13} className="text-gray-400" />
                  Next Review Date:
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500">From</label>
                  <input
                    type="date"
                    value={filterDateFrom}
                    onChange={e => setFilterDateFrom(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500">To</label>
                  <input
                    type="date"
                    min={filterDateFrom}
                    value={filterDateTo}
                    onChange={e => setFilterDateTo(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                {(filterDateFrom || filterDateTo) && (
                  <button
                    onClick={() => { setFilterDateFrom(''); setFilterDateTo(''); }}
                    className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2"
                  >
                    Clear dates
                  </button>
                )}
                {filterDateFrom && filterDateTo && (
                  <span className="text-xs text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                    {new Date(filterDateFrom).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} — {new Date(filterDateTo).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>

              {(filterStatus || filterRisk || filterCategory || filterDateFrom || filterDateTo) && (
                <button
                  onClick={() => { setFilterStatus(''); setFilterRisk(''); setFilterCategory(''); setFilterDateFrom(''); setFilterDateTo(''); }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-700 text-blue-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== OVERVIEW TAB ===== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Upcoming Renewals */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Upcoming Renewals & Deadlines</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700" onClick={() => setShowAllRenewals(true)}>
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {upcomingRenewals.map((renewal) => (
                  <div key={renewal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {renewal.priority === 'overdue' && <XCircle size={18} className="text-red-600" />}
                      {renewal.priority === 'high' && <AlertTriangle size={18} className="text-amber-600" />}
                      {renewal.priority === 'medium' && <Clock size={18} className="text-blue-600" />}
                      {renewal.priority === 'low' && <CheckCircle size={18} className="text-green-600" />}
                      <div>
                        <div className="text-sm text-gray-900">{renewal.item}</div>
                        <div className="text-xs text-gray-500">Due: {renewal.dueDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {renewal.priority === 'overdue' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-red-50 text-red-700 border border-red-200">{Math.abs(renewal.daysLeft)} days overdue</span>
                      ) : (
                        <span className="text-sm text-gray-500">{renewal.daysLeft} days left</span>
                      )}
                      <button
                        className="px-3 py-1.5 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                        onClick={() => {
                          setSelectedRenewal(renewal);
                          setShowRenewTraining(true);
                        }}
                      >
                        Renew
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance by Area */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-gray-900 mb-4">Compliance by Area</h3>
              <div className="space-y-4">
                {[
                  { name: 'Data Protection & GDPR', compliance: 72, color: 'bg-amber-500' },
                  { name: 'Health & Safety', compliance: 52, color: 'bg-red-500' },
                  { name: 'Employment Law', compliance: 90, color: 'bg-emerald-500' },
                  { name: 'Financial / Payroll', compliance: 100, color: 'bg-emerald-500' },
                  { name: 'Equality & Diversity', compliance: 100, color: 'bg-emerald-500' },
                  { name: 'Industrial Relations', compliance: 70, color: 'bg-amber-500' },
                ].map((area) => (
                  <div key={area.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-700">{area.name}</span>
                      <span className="text-sm text-gray-500">{area.compliance}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`${area.color} h-2 rounded-full transition-all`}
                        style={{ width: `${area.compliance}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Audits */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Recent Audit Activity</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700" onClick={() => setActiveTab('audits')}>
                  View All Audits
                </button>
              </div>
              <div className="space-y-2">
                {audits.slice(0, 3).map((audit) => (
                  <div key={audit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-blue-600">{audit.auditNumber}</span>
                        <span className="text-sm text-gray-900">{audit.title}</span>
                        {getStatusBadge(audit.status)}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{audit.type}</span>
                        <span>·</span>
                        <span>{audit.auditor}</span>
                        <span>·</span>
                        <span>{audit.scheduledDate}</span>
                      </div>
                    </div>
                    <button
                      className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setSelectedAudit(audit);
                        setShowAuditDetails(true);
                      }}
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== REQUIREMENTS TAB ===== */}
        {activeTab === 'requirements' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                Showing {filteredRequirements.length} of {requirements.length} requirements
              </span>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm"
                onClick={() => setShowAddRequirement(!showAddRequirement)}
              >
                <Plus size={16} />
                Add Requirement
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Requirement</th>
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Risk</th>
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Next Review</th>
                    <th className="text-center px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequirements.map((req) => (
                    <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="text-sm text-gray-900">{req.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{req.legislation}</div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">{req.client}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{req.category}</td>
                      <td className="px-5 py-4">{getStatusBadge(req.status)}</td>
                      <td className="px-5 py-4">{getRiskBadge(req.risk)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getProgressDotColor(req.progress)}`} />
                          <span className="text-sm text-gray-700">{req.progress}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">{req.nextReview}</td>
                      <td className="px-5 py-4 text-center">
                        <button
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => {
                            setSelectedRequirement(req);
                            setShowRequirementDetail(true);
                          }}
                        >
                          <Eye size={16} className="text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== AUDITS TAB ===== */}
        {activeTab === 'audits' && (
          <div className="space-y-4">
            {audits.map((audit) => (
              <div key={audit.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{audit.auditNumber}</span>
                      <h3 className="text-gray-900">{audit.title}</h3>
                      {getStatusBadge(audit.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Shield size={14} />
                        <span>{audit.type}</span>
                      </div>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{audit.auditor}</span>
                      </div>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{audit.scheduledDate}</span>
                      </div>
                      <span>·</span>
                      <span>{audit.department}</span>
                    </div>
                    {audit.status === 'completed' && (
                      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
                        <div className="text-sm">
                          <span className="text-gray-500">Rating: </span>
                          <span className={`${audit.overallRating === 'Excellent' ? 'text-emerald-600' : 'text-blue-600'}`}>
                            {audit.overallRating}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Findings: </span>
                          <span className="text-gray-700">{audit.findings}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Actions: </span>
                          <span className="text-gray-700">{audit.actionItems}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setSelectedAudit(audit);
                      setShowAuditDetails(true);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== COMPLIANCE GAPS TAB ===== */}
        {activeTab === 'compliance-gaps' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">
                {complianceGaps.length} open gaps · {complianceGaps.filter((g) => g.severity === 'critical').length} critical
              </span>
            </div>
            {complianceGaps.map((gap) => (
              <div key={gap.id} className={`bg-white rounded-xl border p-5 ${gap.severity === 'critical' ? 'border-red-200' : 'border-gray-100'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-900">{gap.title}</h3>
                      {getRiskBadge(gap.severity)}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{gap.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FileText size={12} />
                        <span>{gap.requirement}</span>
                      </div>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        <span>{gap.assignee}</span>
                      </div>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>Open {gap.daysOpen} days</span>
                      </div>
                      <span>·</span>
                      <span>Due: {gap.dueDate}</span>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setSelectedGap(gap);
                      setShowResolveGap(true);
                    }}
                  >
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== RISK ASSESSMENT TAB ===== */}
        {activeTab === 'risk-assessment' && (
          <div>
            <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Risk Area</th>
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Risk Level</th>
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Trend</th>
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Controls</th>
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Gaps</th>
                    <th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Last Assessed</th>
                    <th className="text-center px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {riskAssessments.map((risk, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4 text-sm text-gray-900">{risk.area}</td>
                      <td className="px-5 py-4">{getRiskBadge(risk.riskLevel)}</td>
                      <td className="px-5 py-4">
                        <span className={`text-sm ${risk.score >= 7 ? 'text-red-600' : risk.score >= 4 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {risk.score}/10
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {risk.trend === 'up' && (
                          <div className="flex items-center gap-1 text-red-500 text-xs">
                            <TrendingUp size={14} />
                            <span>Increasing</span>
                          </div>
                        )}
                        {risk.trend === 'down' && (
                          <div className="flex items-center gap-1 text-emerald-500 text-xs">
                            <TrendingDown size={14} />
                            <span>Decreasing</span>
                          </div>
                        )}
                        {risk.trend === 'stable' && (
                          <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <span>—</span>
                            <span>Stable</span>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700">{risk.controls}</td>
                      <td className="px-5 py-4">
                        <span className={`text-sm ${risk.gaps > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                          {risk.gaps}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">{risk.lastAssessed}</td>
                      <td className="px-5 py-4 text-center">
                        <button
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => {
                            setSelectedRisk(risk);
                            setShowRiskDetail(true);
                          }}
                        >
                          <Eye size={16} className="text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== REPORTS TAB ===== */}
        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              { title: 'Compliance Summary Report', description: 'Full overview of all compliance requirements and their current status across all areas.', icon: FileText, lastGenerated: '20 Feb 2026' },
              { title: 'Audit Trail Report', description: 'Complete audit trail showing all changes, reviews, and assessments performed.', icon: ClipboardCheck, lastGenerated: '18 Feb 2026' },
              { title: 'Gap Analysis Report', description: 'Detailed analysis of compliance gaps with recommended remediation actions.', icon: AlertTriangle, lastGenerated: '15 Feb 2026' },
              { title: 'Risk Register Report', description: 'Comprehensive risk register with scoring, trends, and mitigation controls.', icon: Shield, lastGenerated: '22 Feb 2026' },
              { title: 'Regulatory Change Log', description: 'Track legislative and regulatory changes that impact your compliance obligations.', icon: Scale, lastGenerated: '24 Feb 2026' },
              { title: 'Training Compliance Report', description: 'Staff training status, completion rates, and upcoming certification renewals.', icon: Award, lastGenerated: '19 Feb 2026' },
            ].map((report, idx) => {
              const Icon = report.icon;
              return (
                <div key={idx} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{report.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{report.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Last generated: {report.lastGenerated}</span>
                        <button
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                          onClick={() => {
                            setExportReportTitle(report.title);
                            setShowExportReport(true);
                          }}
                        >
                          <Download size={14} />
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ===== LEGISLATION GUIDE TAB ===== */}
        {activeTab === 'legislation' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{legislationGuide.length} legislative references</span>
            </div>
            {legislationGuide.map((leg) => (
              <div key={leg.id} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-900">{leg.name}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                        leg.jurisdiction === 'EU' ? 'bg-blue-50 text-blue-700' :
                        leg.jurisdiction === 'UK' ? 'bg-indigo-50 text-indigo-700' :
                        'bg-emerald-50 text-emerald-700'
                      }`}>
                        {leg.jurisdiction}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                        {leg.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{leg.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {leg.relevantArticles.map((article, idx) => (
                        <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-gray-50 text-gray-600 border border-gray-100">
                          {article}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-400 mt-3">Last updated: {leg.lastUpdated}</div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ExternalLink size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-6 text-xs text-gray-400 border-t border-gray-100 mt-8">
          MpoweredCare © 2026 — Internal Use Only
        </div>
      </main>

      {/* Modals */}
      <AddAuditModal isOpen={showAddAudit} onClose={() => setShowAddAudit(false)} />
      {selectedAudit && (
        <AuditDetailsModal
          isOpen={showAuditDetails}
          onClose={() => setShowAuditDetails(false)}
          audit={selectedAudit}
        />
      )}
      {selectedRenewal && (
        <RenewTrainingModal
          isOpen={showRenewTraining}
          onClose={() => setShowRenewTraining(false)}
          renewal={selectedRenewal}
        />
      )}
      <AssignTrainingModal isOpen={showAssignTraining} onClose={() => setShowAssignTraining(false)} />
      <AddCertificateModal isOpen={showAddCertificate} onClose={() => setShowAddCertificate(false)} />
      <ViewAllRenewalsModal
        isOpen={showAllRenewals}
        onClose={() => setShowAllRenewals(false)}
        renewals={upcomingRenewals}
        onRenew={(renewal) => {
          setSelectedRenewal(renewal);
          setShowRenewTraining(true);
        }}
      />
      <AddRequirementModal isOpen={showAddRequirement} onClose={() => setShowAddRequirement(false)} />
      {selectedRequirement && (
        <RequirementDetailModal
          isOpen={showRequirementDetail}
          onClose={() => setShowRequirementDetail(false)}
          requirement={selectedRequirement}
        />
      )}
      {selectedGap && (
        <ResolveGapModal
          isOpen={showResolveGap}
          onClose={() => setShowResolveGap(false)}
          gap={selectedGap}
        />
      )}
      {selectedRisk && (
        <RiskAssessmentDetailModal
          isOpen={showRiskDetail}
          onClose={() => setShowRiskDetail(false)}
          risk={selectedRisk}
        />
      )}
      <ExportReportModal
        isOpen={showExportReport}
        onClose={() => setShowExportReport(false)}
        reportTitle={exportReportTitle}
      />
    </div>
  );
}