import { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  FileEdit,
  Search, 
  Download, 
  Plus,
  Eye,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import svgPaths from '../imports/svg-0zuwwpstu7';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { NewCarePlanModal } from '../components/NewCarePlanModal';
import { CarePlanDetailModal } from '../components/CarePlanDetailModal';

interface CarePlan {
  id: string;
  serviceUser: {
    name: string;
    id: string;
  };
  planType: string;
  version: string;
  status: 'Active' | 'Review Due' | 'Draft';
  goals: number;
  lastReviewed: string;
  nextReview: string;
}

const initialCarePlans: CarePlan[] = [
  {
    id: 'CP-2024-001',
    serviceUser: { name: 'Sarah Johnson', id: 'SU001' },
    planType: 'Person-Centred Care Plan',
    version: 'v2.1',
    status: 'Active',
    goals: 5,
    lastReviewed: '15 Nov 2024',
    nextReview: '15 Feb 2025'
  },
  {
    id: 'CP-2024-002',
    serviceUser: { name: 'Michael Chen', id: 'SU002' },
    planType: 'Complex Care Plan',
    version: 'v3.0',
    status: 'Review Due',
    goals: 8,
    lastReviewed: '20 Sept 2024',
    nextReview: '20 Dec 2024'
  },
  {
    id: 'CP-2024-003',
    serviceUser: { name: 'Emily Williams', id: 'SU003' },
    planType: 'Support Plan',
    version: 'v1.2',
    status: 'Active',
    goals: 4,
    lastReviewed: '1 Dec 2024',
    nextReview: '1 Mar 2025'
  },
  {
    id: 'CP-2024-004',
    serviceUser: { name: 'Robert Taylor', id: 'SU004' },
    planType: 'Behavior Support Plan',
    version: 'v2.0',
    status: 'Active',
    goals: 6,
    lastReviewed: '28 Nov 2024',
    nextReview: '28 Feb 2025'
  },
  {
    id: 'CP-2024-005',
    serviceUser: { name: 'Jessica Martinez', id: 'SU005' },
    planType: 'Person-Centred Care Plan',
    version: 'v1.0',
    status: 'Draft',
    goals: 3,
    lastReviewed: 'Not set',
    nextReview: 'Not set'
  }
];

export function CarePlans() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showNewCarePlanModal, setShowNewCarePlanModal] = useState(false);
  const [showCarePlanDetailModal, setShowCarePlanDetailModal] = useState(false);
  const [selectedCarePlan, setSelectedCarePlan] = useState<CarePlan | null>(null);
  const [carePlans, setCarePlans] = useState<CarePlan[]>(initialCarePlans);

  const [planPage, setPlanPage] = useState(1);
  const PLAN_PER_PAGE = 4;

  const totalPlans = carePlans.length;
  const activePlans = carePlans.filter(p => p.status === 'Active').length;
  const reviewDue = carePlans.filter(p => p.status === 'Review Due').length;
  const draftPlans = carePlans.filter(p => p.status === 'Draft').length;

  const filteredPlans = carePlans.filter(plan => {
    const matchesSearch = 
      plan.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.serviceUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.serviceUser.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPlanPages = Math.max(1, Math.ceil(filteredPlans.length / PLAN_PER_PAGE));
  const currentPlanPage = Math.min(planPage, totalPlanPages);
  const pagedPlans = filteredPlans.slice(
    (currentPlanPage - 1) * PLAN_PER_PAGE,
    currentPlanPage * PLAN_PER_PAGE
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full"><CheckCircle2 size={14} /><span className="text-xs capitalize">active</span></div>;
      case 'Review Due':
        return <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full"><AlertTriangle size={14} /><span className="text-xs capitalize">review due</span></div>;
      case 'Draft':
        return <div className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-full"><FileEdit size={14} /><span className="text-xs capitalize">draft</span></div>;
      default:
        return null;
    }
  };

  const isReviewOverdue = (nextReview: string) => {
    if (nextReview === 'Not set') return false;
    return new Date(nextReview) < new Date();
  };

  const handleCreateCarePlan = (data: any) => { console.log('Creating care plan:', data); };

  const handleViewCarePlan = (plan: CarePlan) => {
    setSelectedCarePlan({ ...plan, serviceUser: plan.serviceUser.name, lastUpdated: plan.lastReviewed, updatedBy: 'Emma Thompson' } as any);
    setShowCarePlanDetailModal(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem="Care Plans" />
      <TopBar />
      <main className="ml-0 md:ml-64 pt-20 px-4 md:px-8 pb-8 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="mb-6">
            <h1 className="text-2xl mb-2">Care Plans</h1>
            <p className="text-gray-600">Strategic care planning documents defining individualized support approaches</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <div className="mt-0.5 animate-pulse">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                <path d={svgPaths.p232b1d80} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p3abdf300} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M8.33333 7.5H6.66667" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M13.3333 10.8333H6.66667" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M13.3333 14.1667H6.66667" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </svg>
            </div>
            <p className="text-sm text-blue-900"><span className="font-bold">Care Plans </span>define the strategic approach to supporting each service user. For detailed tracking of medications, daily logs, incidents, and activities, view the individual&apos;s full profile.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600 mb-1">Total Care Plans</p><p className="text-3xl">{totalPlans}</p></div><div className="bg-blue-500 rounded-lg p-3"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24"><path d={svgPaths.p1d2a1500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d={svgPaths.p27ca6d80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M12 11H8" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M16 13H8" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M16 17H8" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg></div></div></Card>
            <Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600 mb-1">Active Plans</p><p className="text-3xl">{activePlans}</p></div><div className="bg-green-500 rounded-lg p-3"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24"><path d={svgPaths.p1cc15700} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d={svgPaths.p1f2c5400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg></div></div></Card>
            <Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600 mb-1">Review Due</p><p className="text-3xl">{reviewDue}</p></div><div className="bg-amber-500 rounded-lg p-3"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24"><path d={svgPaths.p2d23b080} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M12 9V13" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M12 17H12.01" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg></div></div></Card>
            <Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600 mb-1">Draft Plans</p><p className="text-3xl">{draftPlans}</p></div><div className="bg-gray-500 rounded-lg p-3"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24"><path d={svgPaths.p2041c0f0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d={svgPaths.p35746cc0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M9 9H6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M18 13H6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M18 17H6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg></div></div></Card>
          </div>
          <Card className="p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 w-full">
                <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input type="text" placeholder="Search by service user or plan ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-colors" /></div>
                <div className="relative"><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="appearance-none w-full sm:w-auto px-5 py-2 pr-10 border border-gray-300 rounded-lg bg-white cursor-pointer outline-none focus:border-blue-500"><option>All Status</option><option>Active</option><option>Review Due</option><option>Draft</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} /></div>
              </div>
              <div className="flex items-center gap-3 w-full lg:w-auto justify-end shrink-0">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium"><Download size={20} className="text-gray-500" /><span>Export All</span></button>
                <button onClick={() => setShowNewCarePlanModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm"><Plus size={20} /><span>New Care Plan</span></button>
              </div>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-5 text-left text-sm font-bold text-gray-600">Plan ID</th>
                    <th className="px-4 py-5 text-left text-sm font-bold text-gray-600">Service User</th>
                    <th className="px-4 py-5 text-left text-sm font-bold text-gray-600">Plan Type</th>
                    <th className="px-4 py-5 text-left text-sm font-bold text-gray-600">Version</th>
                    <th className="px-4 py-5 text-left text-sm font-bold text-gray-600">Status</th>
                    <th className="px-4 py-5 text-left text-sm font-bold text-gray-600">Goals</th>
                    <th className="px-4 py-5 text-left text-sm font-bold text-gray-600">Last Reviewed</th>
                    <th className="px-4 py-5 text-left text-sm font-bold text-gray-600">Next Review</th>
                    <th className="px-4 py-5 text-left text-sm font-bold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pagedPlans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-6"><span className="text-blue-600 font-medium">{plan.id}</span></td>
                      <td className="px-4 py-6"><div className="flex items-center gap-2"><div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14.2344 14.2344"><path d={svgPaths.p16a00000} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1862" /><path d={svgPaths.p2d791d00} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1862" /></svg></div><div><p className="text-sm font-medium text-gray-900">{plan.serviceUser.name}</p><p className="text-xs text-gray-500">{plan.serviceUser.id}</p></div></div></td>
                      <td className="px-4 py-6"><span className="text-sm text-gray-900">{plan.planType}</span></td>
                      <td className="px-4 py-6"><span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{plan.version}</span></td>
                      <td className="px-4 py-6">{getStatusBadge(plan.status)}</td>
                      <td className="px-4 py-6"><span className="text-sm text-gray-900">{plan.goals} active</span></td>
                      <td className="px-4 py-6"><span className="text-sm text-gray-900">{plan.lastReviewed}</span></td>
                      <td className="px-4 py-6"><span className={`text-sm ${isReviewOverdue(plan.nextReview) ? 'text-red-600 font-medium' : 'text-gray-900'}`}>{isReviewOverdue(plan.nextReview) && <AlertTriangle className="inline-block mr-1 mb-0.5" size={14} />}{plan.nextReview}</span></td>
                      <td className="px-4 py-6"><div className="flex items-center gap-2"><button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="View Care Plan" onClick={() => handleViewCarePlan(plan)}><Eye size={18} className="text-gray-600" /></button><button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Open in Full View"><ExternalLink size={18} className="text-gray-600" /></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPlans.length === 0 && (<div className="text-center py-12"><FileText size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No care plans found matching your criteria</p></div>)}
            </div>
            {totalPlanPages > 1 && (
              <div className="flex items-center justify-between px-6 py-3.5 border-t border-gray-100 bg-gray-50/50">
                <span className="text-xs text-gray-500 font-medium">Showing {Math.min((currentPlanPage - 1) * PLAN_PER_PAGE + 1, filteredPlans.length)}–{Math.min(currentPlanPage * PLAN_PER_PAGE, filteredPlans.length)} of {filteredPlans.length} care plans</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setPlanPage(p => Math.max(1, p - 1))} disabled={currentPlanPage === 1} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronLeft size={16} /></button>
                  <span className="px-3 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-md font-semibold min-w-[48px] text-center">{currentPlanPage} / {totalPlanPages}</span>
                  <button onClick={() => setPlanPage(p => Math.min(totalPlanPages, p + 1))} disabled={currentPlanPage === totalPlanPages} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronRight size={16} /></button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
      <NewCarePlanModal show={showNewCarePlanModal} onClose={() => setShowNewCarePlanModal(false)} onCreate={handleCreateCarePlan} />
      <CarePlanDetailModal show={showCarePlanDetailModal} onClose={() => setShowCarePlanDetailModal(false)} carePlan={selectedCarePlan} onSave={(updated) => { setCarePlans(prev => prev.map(p => p.id === updated.id ? updated : p)); setSelectedCarePlan(updated); }} />
    </div>
  );
}