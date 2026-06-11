import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { ReportIncidentModal } from '../components/ReportIncidentModal';
import { IncidentDetailsModal } from '../components/IncidentDetailsModal';
import { 
  Search,
  Filter,
  Plus,
  Download,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  AlertCircle,
  XCircle,
  CheckCircle,
  Eye,
  Edit,
  MoreVertical,
  TrendingDown,
  Shield,
  FileText,
  Bell,
  Flag,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function Incidents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showReportIncident, setShowReportIncident] = useState(false);
  const [showIncidentDetails, setShowIncidentDetails] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'all' | 'open' | 'closed'>('open');
  const [filterSeverity, setFilterSeverity] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [dismissAlert, setDismissAlert] = useState(false);

  const incidents = [
    {
      id: 1,
      incidentNumber: 'INC-2025-001',
      title: 'Verbal Aggression Towards Staff',
      type: 'Behavioral',
      severity: 'high',
      serviceUser: 'James Rodriguez',
      userId: 4,
      date: '7 Dec 2025',
      time: '14:30',
      location: 'Common Room',
      reportedBy: 'John Davies',
      status: 'under-investigation',
      description: 'Service user became agitated during group activity and directed verbal aggression towards support worker.',
      immediateAction: 'Service user removed from group, offered one-to-one support, de-escalation techniques applied successfully.',
      witnesses: ['Mary Thompson', 'Sarah Williams'],
      injuriesReported: false,
      policeNotified: false,
      familyNotified: true,
      followUpRequired: true,
    },
    {
      id: 2,
      incidentNumber: 'INC-2025-002',
      title: 'Medication Error - Missed Dose',
      type: 'Medication',
      severity: 'medium',
      serviceUser: 'Sarah Johnson',
      userId: 1,
      date: '7 Dec 2025',
      time: '08:00',
      location: 'Main House',
      reportedBy: 'Mary Thompson',
      status: 'resolved',
      description: 'Morning medication dose was not administered due to service user being off-site for medical appointment.',
      immediateAction: 'Medication administered upon return at 10:30. Medical team notified. No adverse effects observed.',
      witnesses: [],
      injuriesReported: false,
      policeNotified: false,
      familyNotified: false,
      followUpRequired: false,
    },
    {
      id: 3,
      incidentNumber: 'INC-2025-003',
      title: 'Fall in Bathroom',
      type: 'Accident/Injury',
      severity: 'medium',
      serviceUser: 'Emma Wilson',
      userId: 3,
      date: '6 Dec 2025',
      time: '19:45',
      location: 'Bathroom - Main House',
      reportedBy: 'Sarah Williams',
      status: 'closed',
      description: 'Service user slipped on wet floor in bathroom. Minor bruising to left knee observed.',
      immediateAction: 'First aid administered. Ice pack applied. Injury documented with photos. Medical assessment completed - no further treatment required.',
      witnesses: ['David Brown'],
      injuriesReported: true,
      policeNotified: false,
      familyNotified: true,
      followUpRequired: false,
    },
    {
      id: 4,
      incidentNumber: 'INC-2025-004',
      title: 'Unauthorized Leave from Premises',
      type: 'Safeguarding',
      severity: 'high',
      serviceUser: 'Michael Chen',
      userId: 2,
      date: '6 Dec 2025',
      time: '15:20',
      location: 'Main Entrance',
      reportedBy: 'James Mitchell',
      status: 'closed',
      description: 'Service user left premises without permission during unsupervised period. Returned safely after 45 minutes.',
      immediateAction: 'Police notified immediately. Service user located at local park by staff. Returned to facility safely. Risk assessment updated.',
      witnesses: ['Emily Roberts'],
      injuriesReported: false,
      policeNotified: true,
      familyNotified: true,
      followUpRequired: true,
    },
    {
      id: 5,
      incidentNumber: 'INC-2025-005',
      title: 'Property Damage - Broken Window',
      type: 'Property Damage',
      severity: 'low',
      serviceUser: 'James Rodriguez',
      userId: 4,
      date: '5 Dec 2025',
      time: '16:30',
      location: 'Recreation Room',
      reportedBy: 'David Brown',
      status: 'closed',
      description: 'Window broken during recreational activity. Service user accidentally threw ball through window.',
      immediateAction: 'Area secured. Glass cleaned up safely. Temporary board fitted. Maintenance team notified for repair.',
      witnesses: ['John Davies', 'Sarah Johnson'],
      injuriesReported: false,
      policeNotified: false,
      familyNotified: false,
      followUpRequired: false,
    },
    {
      id: 6,
      incidentNumber: 'INC-2025-006',
      title: 'Allegation of Peer Bullying',
      type: 'Safeguarding',
      severity: 'high',
      serviceUser: 'Emma Wilson',
      userId: 3,
      date: '4 Dec 2025',
      time: '11:00',
      location: 'Dining Area',
      reportedBy: 'Lisa Anderson',
      status: 'under-investigation',
      description: 'Service user reported being verbally bullied by another service user during meal time.',
      immediateAction: 'Both service users separated. Individual interviews conducted. Safeguarding team notified. Investigation ongoing.',
      witnesses: ['Mary Thompson'],
      injuriesReported: false,
      policeNotified: false,
      familyNotified: true,
      followUpRequired: true,
    },
    {
      id: 7,
      incidentNumber: 'INC-2025-007',
      title: 'Allergic Reaction to Food',
      type: 'Medical',
      severity: 'medium',
      serviceUser: 'Sarah Johnson',
      userId: 1,
      date: '3 Dec 2025',
      time: '13:15',
      location: 'Dining Area',
      reportedBy: 'Emily Roberts',
      status: 'closed',
      description: 'Service user experienced mild allergic reaction after consuming food containing undisclosed allergen.',
      immediateAction: 'Antihistamine administered as per care plan. Symptoms subsided within 30 minutes. Medical team consulted. Kitchen processes reviewed.',
      witnesses: ['James Mitchell'],
      injuriesReported: false,
      policeNotified: false,
      familyNotified: true,
      followUpRequired: true,
    },
    {
      id: 8,
      incidentNumber: 'INC-2025-008',
      title: 'Self-Harm Incident',
      type: 'Safeguarding',
      severity: 'high',
      serviceUser: 'Michael Chen',
      userId: 2,
      date: '2 Dec 2025',
      time: '21:30',
      location: 'Bedroom',
      reportedBy: 'Sarah Williams',
      status: 'open',
      description: 'Service user found with superficial scratches on forearm. Self-harming behavior suspected.',
      immediateAction: 'First aid administered. Mental health crisis team contacted. Enhanced observations implemented. Therapeutic support scheduled.',
      witnesses: [],
      injuriesReported: true,
      policeNotified: false,
      familyNotified: true,
      followUpRequired: true,
    },
  ];

  const stats = {
    totalIncidents: 28,
    openIncidents: 3,
    underInvestigation: 2,
    closedThisMonth: 23,
    highSeverity: 4,
    averageResolutionTime: 3.2,
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.serviceUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.incidentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === '' || incident.severity === filterSeverity;
    const matchesType = filterType === '' || incident.type === filterType;
    const matchesView = 
      viewMode === 'open' ? incident.status === 'open' || incident.status === 'under-investigation' :
      viewMode === 'closed' ? incident.status === 'closed' || incident.status === 'resolved' :
      true;
    return matchesSearch && matchesSeverity && matchesType && matchesView;
  });

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'high':
        return <Badge variant="red">High</Badge>;
      case 'medium':
        return <Badge variant="amber">Medium</Badge>;
      case 'low':
        return <Badge variant="green">Low</Badge>;
      default:
        return <Badge variant="gray">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open':
        return <Badge variant="red">Open</Badge>;
      case 'under-investigation':
        return <Badge variant="amber">Under Investigation</Badge>;
      case 'resolved':
        return <Badge variant="blue">Resolved</Badge>;
      case 'closed':
        return <Badge variant="gray">Closed</Badge>;
      default:
        return <Badge variant="gray">{status}</Badge>;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case 'high':
        return <AlertTriangle size={20} className="text-red-600" />;
      case 'medium':
        return <AlertCircle size={20} className="text-amber-600" />;
      case 'low':
        return <CheckCircle size={20} className="text-green-600" />;
      default:
        return <AlertCircle size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Incidents" />
      <TopBar />
      
      <main className="ml-64 pt-24 px-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl text-gray-900">Incident Reporting & Management</h1>
            <p className="text-sm text-gray-600 mt-1">Track, investigate, and resolve incidents to ensure safety and compliance</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => {
                const data = JSON.stringify(incidents, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `incidents-report-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download size={18} className="text-gray-600" />
              <span className="text-sm text-gray-700">Export Report</span>
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => setShowReportIncident(true)}
            >
              <Plus size={20} />
              Report Incident
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Incidents</div>
                <div className="text-2xl text-gray-900">{stats.totalIncidents}</div>
              </div>
              <FileText size={32} className="text-blue-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Open</div>
                <div className="text-2xl text-gray-900">{stats.openIncidents}</div>
              </div>
              <AlertCircle size={32} className="text-red-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Investigating</div>
                <div className="text-2xl text-gray-900">{stats.underInvestigation}</div>
              </div>
              <Eye size={32} className="text-amber-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Closed (Month)</div>
                <div className="text-2xl text-gray-900">{stats.closedThisMonth}</div>
              </div>
              <CheckCircle size={32} className="text-green-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">High Severity</div>
                <div className="text-2xl text-gray-900">{stats.highSeverity}</div>
              </div>
              <AlertTriangle size={32} className="text-red-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Avg Resolution</div>
                <div className="text-2xl text-gray-900">{stats.averageResolutionTime}d</div>
              </div>
              <TrendingDown size={32} className="text-blue-600" />
            </div>
          </Card>
        </div>

        {/* Alerts Banner */}
        {stats.openIncidents > 0 && !dismissAlert && (
          <Card className="mb-6 border-l-4 border-red-600 bg-red-50">
            <div className="flex items-center gap-3">
              <Bell size={24} className="text-red-600 shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-red-900">
                  <span className="font-medium">{stats.openIncidents} open incident(s)</span> and{' '}
                  <span className="font-medium">{stats.underInvestigation} under investigation</span>{' '}
                  require immediate attention.
                </div>
              </div>
              <button onClick={() => setDismissAlert(true)} className="p-1.5 hover:bg-red-100 rounded-lg transition-colors shrink-0">
                <X size={16} className="text-red-600" />
              </button>
            </div>
          </Card>
        )}

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
            <button 
              className={`px-4 py-2 text-sm rounded ${viewMode === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setViewMode('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded ${viewMode === 'open' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setViewMode('open')}
            >
              Open & Investigating
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded ${viewMode === 'closed' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setViewMode('closed')}
            >
              Closed & Resolved
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <Card className="mb-6">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by incident number, title, or service user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Severity Filter */}
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">All Severity</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Medication">Medication</option>
              <option value="Accident/Injury">Accident/Injury</option>
              <option value="Safeguarding">Safeguarding</option>
              <option value="Property Damage">Property Damage</option>
              <option value="Medical">Medical</option>
            </select>

            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={18} className="text-gray-600" />
            </button>
          </div>
        </Card>

        {/* Incidents List */}
        <div className="space-y-4 mb-6">
          {filteredIncidents.map((incident) => (
            <Card key={incident.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                {/* Severity Icon */}
                <div className="pt-1">
                  {getSeverityIcon(incident.severity)}
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-900">{incident.title}</h3>
                        {getSeverityBadge(incident.severity)}
                        {getStatusBadge(incident.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-mono text-blue-600">{incident.incidentNumber}</span>
                        <span className="text-gray-300">•</span>
                        <span>{incident.type}</span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-gray-400" />
                          {incident.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} className="text-gray-400" />
                          {incident.time}
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <button 
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        onClick={() => setOpenDropdown(openDropdown === incident.id ? null : incident.id)}
                      >
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
                      {openDropdown === incident.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-100 shadow-lg z-10">
                          <button 
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => {
                              setOpenDropdown(null);
                              setSelectedIncident(incident);
                              setShowIncidentDetails(true);
                            }}
                          >
                            <Eye size={16} />
                            View Details
                          </button>
                          <button 
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => {
                              console.log('Edit incident:', incident.id);
                              setOpenDropdown(null);
                            }}
                          >
                            <Edit size={16} />
                            Edit Incident
                          </button>
                          <button 
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => {
                              console.log('Update status:', incident.id);
                              setOpenDropdown(null);
                            }}
                          >
                            <Flag size={16} />
                            Update Status
                          </button>
                          <button 
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100"
                            onClick={() => {
                              console.log('Export PDF:', incident.id);
                              setOpenDropdown(null);
                            }}
                          >
                            <Download size={16} />
                            Export as PDF
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Service User & Location */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-700">{incident.serviceUser}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{incident.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Reported by: {incident.reportedBy}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">{incident.description}</p>

                  {/* Key Indicators */}
                  <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-6 text-xs text-gray-600">
                      {incident.injuriesReported && (
                        <div className="flex items-center gap-1">
                          <AlertTriangle size={14} className="text-red-600" />
                          <span>Injuries Reported</span>
                        </div>
                      )}
                      {incident.policeNotified && (
                        <div className="flex items-center gap-1">
                          <Shield size={14} className="text-blue-600" />
                          <span>Police Notified</span>
                        </div>
                      )}
                      {incident.familyNotified && (
                        <div className="flex items-center gap-1">
                          <Bell size={14} className="text-green-600" />
                          <span>Family Notified</span>
                        </div>
                      )}
                      {incident.followUpRequired && (
                        <div className="flex items-center gap-1">
                          <Flag size={14} className="text-amber-600" />
                          <span>Follow-up Required</span>
                        </div>
                      )}
                      {incident.witnesses.length > 0 && (
                        <div className="flex items-center gap-1">
                          <User size={14} className="text-gray-400" />
                          <span>{incident.witnesses.length} Witness(es)</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-auto">
                      <button 
                        className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        onClick={() => {
                          setSelectedIncident(incident);
                          setShowIncidentDetails(true);
                        }}
                      >
                        View Full Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredIncidents.length === 0 && (
          <Card className="text-center py-12">
            <AlertCircle size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No incidents found</h3>
            <p className="text-sm text-gray-600">
              Try adjusting your filters or search criteria
            </p>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center py-6 text-xs text-gray-500 border-t border-gray-100 mt-8">
          MpoweredCare © 2025 — Internal Use Only
        </div>
      </main>

      {/* Modals */}
      <ReportIncidentModal
        isOpen={showReportIncident}
        onClose={() => setShowReportIncident(false)}
      />
      {selectedIncident && (
        <IncidentDetailsModal
          isOpen={showIncidentDetails}
          onClose={() => setShowIncidentDetails(false)}
          incident={selectedIncident}
        />
      )}
    </div>
  );
}
